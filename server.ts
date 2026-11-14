import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { censorProfanity } from './src/utils/profanityFilter';

dotenv.config();

const app = express();
app.use(express.json());

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
