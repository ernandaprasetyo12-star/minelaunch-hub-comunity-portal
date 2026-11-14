import express from 'express';
import http from 'http';
import crypto from 'crypto';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { censorProfanity } from './src/utils/profanityFilter';

dotenv.config();

const app = express();
app.use(express.json());

// ---------------------------------------------------------------------------
// Ely.by OAuth2 & SSO Session Management
// ---------------------------------------------------------------------------
const ELYBY_AUTHORIZE_URL = 'https://account.ely.by/oauth2/v1';
const ELYBY_TOKEN_URL = 'https://account.ely.by/api/oauth2/v1/token';
const ELYBY_ACCOUNT_INFO_URL = 'https://account.ely.by/api/account/v1/info';
const ELYBY_CALLBACK_PATH = '/api/auth/elyby/callback';
const ELYBY_COOKIE_NAME = 'elyby_sso_sid';

interface ElyBySsoSession {
  sid: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  user: {
    id: number;
    uuid: string;
    username: string;
    email?: string;
    profileLink: string;
    preferredLanguage?: string;
  };
}

// In-memory SSO state & session stores
const pendingOAuthStates = new Map<string, number>();
const elybySsoSessions = new Map<string, ElyBySsoSession>();

function getAppBaseUrl(): string {
  const raw = process.env.APP_URL || 'http://localhost:3000';
  return raw.replace(/\/+$/, '');
}

function getElyByRedirectUri(): string {
  return `${getAppBaseUrl()}${ELYBY_CALLBACK_PATH}`;
}

function parseCookies(cookieHeader?: string): Record<string, string> {
  const result: Record<string, string> = {};
  if (!cookieHeader) return result;
  for (const part of cookieHeader.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const val = part.slice(idx + 1).trim();
    if (key) result[key] = decodeURIComponent(val);
  }
  return result;
}

function setSsoCookie(res: express.Response, sid: string) {
  res.cookie(ELYBY_COOKIE_NAME, sid, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });
}

// 1. Get Ely.by OAuth2 Authorization URL
app.get('/api/auth/elyby/url', (_req, res) => {
  const clientId = process.env.ELYBY_CLIENT_ID?.trim();
  const clientSecret = process.env.ELYBY_CLIENT_SECRET?.trim();
  const redirectUri = getElyByRedirectUri();

  if (!clientId || !clientSecret) {
    return res.json({
      configured: false,
      redirectUri,
      portalUrl: 'https://account.ely.by/dev/applications',
      message: 'ELYBY_CLIENT_ID dan ELYBY_CLIENT_SECRET belum diatur di AI Studio Secrets.',
    });
  }

  const state = crypto.randomBytes(24).toString('hex');
  pendingOAuthStates.set(state, Date.now() + 10 * 60 * 1000);

  // Clean expired states
  const now = Date.now();
  for (const [k, exp] of pendingOAuthStates.entries()) {
    if (exp < now) pendingOAuthStates.delete(k);
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'account_info account_email offline_access',
    state,
  });

  return res.json({
    configured: true,
    url: `${ELYBY_AUTHORIZE_URL}?${params.toString()}`,
    redirectUri,
  });
});

// 2. OAuth2 Callback Handler (supports trailing slash variations)
const elybyCallbackHandler = async (req: express.Request, res: express.Response) => {
  const { code, state, error, error_description } = req.query;

  const renderPopupResult = (payload: Record<string, any>, heading: string, bodyText: string) => {
    const safeJson = JSON.stringify(payload).replace(/</g, '\\u003c');
    return res.send(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <title>Otorisasi Ely.by - MineLaunch Hub</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #0a0a0a; color: #f5f5f5; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 24px; text-align: center; }
    .card { max-width: 420px; border: 1px solid #262626; background: #171717; border-radius: 16px; padding: 24px; }
    h1 { font-size: 18px; margin: 0 0 8px; color: #38bdf8; }
    p { font-size: 13px; color: #d4d4d4; line-height: 1.5; margin: 0; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${heading}</h1>
    <p>${bodyText}</p>
  </div>
  <script>
    (function () {
      var data = ${safeJson};
      if (window.opener) {
        window.opener.postMessage(data, '*');
        setTimeout(function () { window.close(); }, 600);
      } else {
        window.location.href = '/';
      }
    })();
  </script>
</body>
</html>`);
  };

  if (error) {
    return renderPopupResult(
      {
        type: 'ELYBY_OAUTH_ERROR',
        error: String(error_description || error),
      },
      'Otorisasi Dibatalkan',
      'Otorisasi akun Ely.by dibatalkan atau ditolak. Jendela ini akan tertutup otomatis.'
    );
  }

  if (!code || typeof code !== 'string') {
    return renderPopupResult(
      { type: 'ELYBY_OAUTH_ERROR', error: 'Kode otorisasi tidak ditemukan.' },
      'Kode Otorisasi Hilang',
      'Parameter code dari Ely.by tidak valid.'
    );
  }

  if (!state || typeof state !== 'string' || !pendingOAuthStates.has(state)) {
    return renderPopupResult(
      { type: 'ELYBY_OAUTH_ERROR', error: 'State keamanan OAuth tidak valid atau kedaluwarsa.' },
      'Sesi OAuth Kedaluwarsa',
      'Silakan tutup jendela ini dan ulangi login Ely.by.'
    );
  }
  pendingOAuthStates.delete(state);

  const clientId = process.env.ELYBY_CLIENT_ID?.trim();
  const clientSecret = process.env.ELYBY_CLIENT_SECRET?.trim();
  if (!clientId || !clientSecret) {
    return renderPopupResult(
      { type: 'ELYBY_OAUTH_ERROR', error: 'ELYBY_CLIENT_ID / ELYBY_CLIENT_SECRET belum diset.' },
      'Konfigurasi Belum Lengkap',
      'Server belum memiliki kredensial OAuth Ely.by.'
    );
  }

  try {
    const tokenParams = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: getElyByRedirectUri(),
      grant_type: 'authorization_code',
      code,
    });

    const tokenResp = await fetch(ELYBY_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: tokenParams.toString(),
    });

    const tokenData: any = await tokenResp.json();
    if (!tokenResp.ok || !tokenData?.access_token) {
      throw new Error(tokenData?.error_description || tokenData?.error || 'Gagal menukar kode OAuth Ely.by');
    }

    const accountResp = await fetch(ELYBY_ACCOUNT_INFO_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: 'application/json',
      },
    });

    const accountData: any = await accountResp.json();
    if (!accountResp.ok || !accountData?.username) {
      throw new Error(accountData?.message || 'Gagal mengambil profil akun Ely.by');
    }

    const sid = crypto.randomBytes(32).toString('hex');
    const expiresInSec = Number(tokenData.expires_in) || 86400;
    const expiresAt = Date.now() + expiresInSec * 1000;

    const session: ElyBySsoSession = {
      sid,
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresAt,
      user: {
        id: Number(accountData.id),
        uuid: String(accountData.uuid || ''),
        username: String(accountData.username),
        email: accountData.email ? String(accountData.email) : undefined,
        profileLink: String(accountData.profileLink || `https://ely.by/u${accountData.id}`),
        preferredLanguage: accountData.preferredLanguage ? String(accountData.preferredLanguage) : undefined,
      },
    };

    elybySsoSessions.set(sid, session);
    setSsoCookie(res, sid);

    return renderPopupResult(
      {
        type: 'ELYBY_OAUTH_SUCCESS',
        sso: {
          authenticated: true,
          expiresAt,
          user: session.user,
        },
      },
      'Otorisasi Ely.by Berhasil!',
      `Akun ${session.user.username} berhasil terhubung dengan SSO Ely.by. Jendela ini akan tertutup otomatis.`
    );
  } catch (err: any) {
    console.error('Ely.by OAuth callback error:', err);
    return renderPopupResult(
      {
        type: 'ELYBY_OAUTH_ERROR',
        error: err?.message || 'Terjadi kesalahan saat otorisasi Ely.by.',
      },
      'Gagal Otorisasi Ely.by',
      String(err?.message || 'Terjadi kesalahan pada server.')
    );
  }
};

app.get([ELYBY_CALLBACK_PATH, `${ELYBY_CALLBACK_PATH}/`], elybyCallbackHandler);

// 3. Check Active Ely.by SSO Session
app.get('/api/auth/elyby/session', (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  const sid = cookies[ELYBY_COOKIE_NAME];
  if (!sid) {
    return res.json({ authenticated: false });
  }
  const session = elybySsoSessions.get(sid);
  if (!session) {
    return res.json({ authenticated: false });
  }
  if (session.expiresAt < Date.now() && !session.refreshToken) {
    elybySsoSessions.delete(sid);
    return res.json({ authenticated: false, expired: true });
  }
  return res.json({
    authenticated: true,
    expiresAt: session.expiresAt,
    hasRefreshToken: Boolean(session.refreshToken),
    user: session.user,
  });
});

// 4. Refresh Ely.by SSO Access Token using offline_access refresh_token
app.post('/api/auth/elyby/refresh', async (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  const sid = cookies[ELYBY_COOKIE_NAME];
  if (!sid) {
    return res.status(401).json({ error: 'Sesi SSO Ely.by tidak ditemukan.' });
  }
  const session = elybySsoSessions.get(sid);
  if (!session || !session.refreshToken) {
    return res.status(401).json({ error: 'Refresh token SSO Ely.by tidak tersedia.' });
  }

  const clientId = process.env.ELYBY_CLIENT_ID?.trim();
  const clientSecret = process.env.ELYBY_CLIENT_SECRET?.trim();
  if (!clientId || !clientSecret) {
    return res.status(503).json({ error: 'ELYBY_CLIENT_ID / ELYBY_CLIENT_SECRET belum diset.' });
  }

  try {
    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'refresh_token',
      refresh_token: session.refreshToken,
    });

    const tokenResp = await fetch(ELYBY_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: params.toString(),
    });
    const tokenData: any = await tokenResp.json();
    if (!tokenResp.ok || !tokenData?.access_token) {
      throw new Error(tokenData?.error_description || tokenData?.error || 'Gagal memperbarui token SSO Ely.by');
    }

    session.accessToken = tokenData.access_token;
    if (tokenData.refresh_token) session.refreshToken = tokenData.refresh_token;
    session.expiresAt = Date.now() + (Number(tokenData.expires_in) || 86400) * 1000;

    setSsoCookie(res, sid);
    return res.json({
      authenticated: true,
      expiresAt: session.expiresAt,
      user: session.user,
    });
  } catch (err: any) {
    return res.status(401).json({ error: err?.message || 'Gagal refresh SSO Ely.by' });
  }
});

// 5. Logout Ely.by SSO Session
app.post('/api/auth/elyby/logout', (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  const sid = cookies[ELYBY_COOKIE_NAME];
  if (sid) {
    elybySsoSessions.delete(sid);
  }
  res.clearCookie(ELYBY_COOKIE_NAME, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
  });
  return res.json({ success: true });
});

// Initialize Gemini API client for Craft AI
// AI Studio automatically injects GEMINI_API_KEY environment variable.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API endpoint for Craft AI (Google Gemini 4 Hydrogen + Google Search Grounding)
app.post('/api/craft-ai', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Pesan tidak boleh kosong' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY belum terkonfigurasi di server',
        details: 'Server membutuhkan GEMINI_API_KEY untuk menghubungi Google Gemini.',
      });
    }

    const systemInstruction = `
Kamu adalah "Craft AI", asisten AI resmi MineLaunch Hub yang ditenagai oleh Google Gemini dengan pengetahuan luas (broad knowledge).
Bidang keahlian utamamu meliputi:
1. Ekosistem Minecraft Java & Bedrock Edition secara menyeluruh (gameplay, Redstone, command block, datapack, resource pack, shader, server multiplayer, dan versi terbaru).
2. Semua launcher Minecraft Java (Prism Launcher, Modrinth App, CurseForge, XMCL, SKLauncher, FreeSM Launcher, PojavLauncher) serta analisis keamanan siber (mendeteksi TLauncher/TLMedia palsu, spyware, file hosts hijack, dan VirusTotal).
3. Modding & Modpack dari Modrinth dan CurseForge (Fabric, Forge, NeoForge, Quilt, Sodium, Iris, optimasi FPS laptop kentang/low-end PC, pembacaan crash log).
4. Komunitas Server Minecraft Indonesia (Kaizen Network mp.kaizenmc.id, MineGens, Alwination, Valoria SMP, ZEETEZ LEGENDS, serta direktori Minecraft-MP Indonesia).
5. Pengetahuan luas di luar Minecraft: hardware PC/laptop, jaringan & ping, pemrograman/coding (Java, JavaScript, TypeScript, script server), serta pertanyaan umum edukatif maupun teknologi lainnya.

Gunakan bahasa Indonesia yang ramah, cerdas, rapi, terstruktur, dan langsung menjawab inti pertanyaan dengan jelas dan ringkas (maksimal sekitar 3-5 paragraf atau poin-poin terstruktur kecuali diminta sangat mendetail). Jika kamu menggunakan hasil pencarian Google Search, berikan jawaban paling mutakhir dan akurat.
`.trim();

    // Construct contents with history
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
    if (history && Array.isArray(history)) {
      for (const h of history) {
        if (h && typeof h.text === 'string' && h.text.trim()) {
          contents.push({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }],
          });
        }
      }
    }
    contents.push({ role: 'user', parts: [{ text: message.trim() }] });

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents,
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
      },
    });

    const reply =
      response.text ||
      'Maaf, Craft AI belum bisa menghasilkan jawaban saat ini. Silakan coba tanyakan dengan kalimat lain.';

    // Extract Google Search grounding web sources if available
    const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const seenUrls = new Set<string>();
    const sources: Array<{ title: string; url: string }> = [];
    for (const chunk of rawChunks) {
      const uri = chunk?.web?.uri;
      if (uri && !seenUrls.has(uri)) {
        seenUrls.add(uri);
        sources.push({
          title: chunk?.web?.title || uri,
          url: uri,
        });
      }
    }

    res.json({ reply, sources });
  } catch (error: any) {
    console.error('Craft AI Error:', error);
    res.status(500).json({
      error: 'Gagal menghubungi Craft AI (Google Gemini)',
      details: error?.message || 'Unknown error',
    });
  }
});

// Server-side profanity check helper endpoint if needed
app.post('/api/chat/censor', (req, res) => {
  const { text } = req.body || {};
  if (typeof text !== 'string') {
    return res.status(400).json({ error: 'text must be a string' });
  }
  return res.json(censorProfanity(text));
});

type ChatRoom = 'general' | 'server-indo' | 'mods-help';

interface ConnectedPresence {
  ws: WebSocket;
  clientId: string;
  uid: string;
  displayName: string;
  avatarUrl: string;
  role: 'admin' | 'user';
  room: ChatRoom;
  isTyping: boolean;
}

const VALID_ROOMS: ChatRoom[] = ['general', 'server-indo', 'mods-help'];
const ADMIN_EMAIL_LOWER = 'ernanda.prasetyo12@gmail.com';

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(import.meta.dirname, 'dist')));
  }

  const httpServer = http.createServer(app);
  const wss = new WebSocketServer({ server: httpServer, path: '/ws/chat' });
  const clients = new Map<WebSocket, ConnectedPresence>();

  const broadcastRoomPresence = (room: ChatRoom) => {
    const uniqueUsers = new Map<
      string,
      { uid: string; displayName: string; avatarUrl: string; role: 'admin' | 'user'; isTyping: boolean }
    >();
    for (const c of clients.values()) {
      if (c.room === room) {
        uniqueUsers.set(c.uid, {
          uid: c.uid,
          displayName: c.displayName,
          avatarUrl: c.avatarUrl,
          role: c.role,
          isTyping: c.isTyping,
        });
      }
    }

    const payload = JSON.stringify({
      type: 'presence',
      room,
      onlineCount: uniqueUsers.size,
      users: Array.from(uniqueUsers.values()),
    });

    for (const c of clients.values()) {
      if (c.room === room && c.ws.readyState === WebSocket.OPEN) {
        c.ws.send(payload);
      }
    }
  };

  wss.on('connection', (ws) => {
    ws.on('message', (raw) => {
      try {
        const msg = JSON.parse(raw.toString());
        if (!msg || typeof msg !== 'object') return;

        if (msg.type === 'join') {
          const prevRoom = clients.get(ws)?.room;
          const room: ChatRoom = VALID_ROOMS.includes(msg.room) ? msg.room : 'general';
          const isVerifiedAdmin =
            typeof msg.email === 'string' &&
            msg.email.trim().toLowerCase() === ADMIN_EMAIL_LOWER &&
            msg.emailVerified === true;

          const presence: ConnectedPresence = {
            ws,
            clientId: String(msg.clientId || Date.now()),
            uid: String(msg.uid || `guest-${Date.now()}`).slice(0, 128),
            displayName: String(msg.displayName || 'Pemain').slice(0, 80),
            avatarUrl: String(msg.avatarUrl || '').slice(0, 2048),
            role: isVerifiedAdmin ? 'admin' : 'user',
            room,
            isTyping: false,
          };
          clients.set(ws, presence);
          if (prevRoom && prevRoom !== room) {
            broadcastRoomPresence(prevRoom);
          }
          broadcastRoomPresence(room);
        } else if (msg.type === 'typing') {
          const existing = clients.get(ws);
          if (!existing) return;
          existing.isTyping = Boolean(msg.isTyping);
          broadcastRoomPresence(existing.room);
        } else if (msg.type === 'chat:broadcast') {
          const existing = clients.get(ws);
          if (!existing || typeof msg.text !== 'string') return;

          // Authoritative server-side profanity censorship with ### and ***
          const filtered = censorProfanity(msg.text.slice(0, 1000));
          const payload = JSON.stringify({
            type: 'chat:message',
            id: String(msg.id || `ws-${Date.now()}`),
            room: existing.room,
            senderUid: existing.uid,
            senderName: existing.displayName,
            senderAvatar: existing.avatarUrl,
            senderRole: existing.role,
            text: filtered.sanitized,
            censored: filtered.hasProfanity,
            createdAt: Date.now(),
          });

          for (const c of clients.values()) {
            if (c.room === existing.room && c.ws.readyState === WebSocket.OPEN) {
              c.ws.send(payload);
            }
          }
        }
      } catch (err) {
        console.error('WebSocket message error:', err);
      }
    });

    ws.on('close', () => {
      const existing = clients.get(ws);
      if (existing) {
        const room = existing.room;
        clients.delete(ws);
        broadcastRoomPresence(room);
      }
    });
  });

  const PORT = Number(process.env.PORT || 3000);
  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`MineLaunch Hub Server + WebSocket running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
