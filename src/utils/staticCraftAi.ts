import { LAUNCHERS } from '../data/launchers';
import { INDO_SERVERS, MINECRAFT_MP_URL } from '../data/servers';

export interface StaticCraftAiResult {
  reply: string;
  sources?: Array<{ title: string; url: string }>;
}

function extractModSearchQuery(raw: string): string {
  const cleaned = raw
    .toLowerCase()
    .replace(
      /\b(cara|pasang|download|unduh|cari|carikan|rekomendasi|mod|mods|modpack|untuk|minecraft|java|edition|fabric|forge|di|yang|bagus|terbaik|apakah|tolong)\b/g,
      ' '
    )
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned) return 'sodium optimization';
  return cleaned.slice(0, 60);
}

async function searchModrinthLive(
  query: string
): Promise<Array<{ title: string; description: string; downloads: number; url: string }>> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4500);
    const url = `https://api.modrinth.com/v2/search?query=${encodeURIComponent(query)}&limit=4`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return [];
    const data: any = await res.json();
    const hits = Array.isArray(data?.hits) ? data.hits : [];
    return hits.map((h: any) => ({
      title: String(h.title || h.slug || 'Mod'),
      description: String(h.description || '').slice(0, 110),
      downloads: Number(h.downloads || 0),
      url: `https://modrinth.com/${h.project_type || 'mod'}/${h.slug}`,
    }));
  } catch {
    return [];
  }
}

export async function answerWithStaticCraftAi(message: string): Promise<StaticCraftAiResult> {
  const q = message.trim();
  const lower = q.toLowerCase();
  const sources: Array<{ title: string; url: string }> = [];

  // 1. Specific launcher lookup from verified catalog
  const matchedLaunchers = LAUNCHERS.filter((l) => {
    const nameLower = l.name.toLowerCase();
    const shortWords = nameLower.split(/[\s(]+/).filter((w) => w.length >= 4);
    return (
      lower.includes(nameLower) ||
      lower.includes(l.id.replace(/-/g, ' ')) ||
      shortWords.some((w) => lower.includes(w))
    );
  });

  if (matchedLaunchers.length > 0 && !lower.includes('mod')) {
    const items = matchedLaunchers.slice(0, 3);
    const lines = items.map((l) => {
      const status =
        l.category === 'dangerous'
          ? 'BERBAHAYA / BLACKLIST KOMUNITAS'
          : l.category === 'licensed'
          ? 'Aman (Lisensi Resmi Microsoft)'
          : 'Aman (Non-Lisensi / Ely.by)';
      return `• **${l.name}** — Status: **${status}**\n  Platform: ${l.platforms.join(', ')} · Min RAM: ${l.minRam}\n  Ringkasan: ${l.tagline} — ${l.description}`;
    });
    for (const l of items) {
      if (l.websiteUrl && l.category !== 'dangerous') {
        sources.push({ title: `${l.name} (${l.developer})`, url: l.websiteUrl });
      }
    }
    return {
      reply:
        `Berikut informasi terverifikasi dari katalog **MineLaunch Hub**:\n\n` +
        lines.join('\n\n') +
        `\n\nKamu bisa melihat detail lengkap atau analisis keamanannya langsung melalui menu **Launcher** di atas.`,
      sources,
    };
  }

  // 2. Crash / Exit Code troubleshooting
  if (lower.includes('exit code') || lower.includes('crash') || lower.includes('error')) {
    return {
      reply:
        `Panduan cepat mengatasi **Crash / Exit Code 1** di Minecraft Java:\n\n` +
        `1. **Cocokkan Versi Java**: Minecraft 1.20.5–1.21+ wajib **Java 21**, sedangkan 1.18–1.20.4 memakai **Java 17**.\n` +
        `2. **Cek Bentrok Mod / Loader**: Pastikan semua mod cocok dengan loader yang dipakai (Fabric vs Forge vs NeoForge) dan pasang library wajib (mis. Fabric API).\n` +
        `3. **Alokasi RAM**: Set alokasi RAM wajar (2–4 GB untuk vanilla/optimasi, 4–6 GB untuk modpack) agar tidak memicu crash memori.\n` +
        `4. **Driver GPU**: Perbarui driver Intel/NVIDIA/AMD jika crash terjadi saat inisialisasi OpenGL.`,
    };
  }

  // 3. Indonesian Minecraft Servers
  if (
    lower.includes('server') ||
    lower.includes('indo') ||
    lower.includes('kaizen') ||
    lower.includes('minegens') ||
    lower.includes('alwination') ||
    lower.includes('valoria') ||
    lower.includes('zeetez') ||
    lower.includes('ip')
  ) {
    const matchedServers = INDO_SERVERS.filter((s) =>
      lower.includes(s.name.toLowerCase().split(' ')[0])
    );
    const list = matchedServers.length > 0 ? matchedServers : INDO_SERVERS;
    const lines = list.map(
      (s) =>
        `• **${s.name}** — IP: \`${s.ip}\` (${s.versionRange})\n  Mode: ${s.modes.slice(0, 4).join(', ')} · ${s.isOfficialOnly ? 'Lisensi Resmi' : 'Support Non-Lisensi / Ely.by'}`
    );
    return {
      reply:
        `Daftar **Server Minecraft Java Indonesia** di MineLaunch Hub:\n\n` +
        lines.join('\n\n') +
        `\n\nBuka menu **Server Indo** untuk menyalin IP secara instan.`,
      sources: [
        {
          title: 'Daftar Server Indonesia - Minecraft-MP',
          url: MINECRAFT_MP_URL,
        },
      ],
    };
  }

  // 4. Potato PC / Low-end / RAM 4GB / Launcher Recommendations
  if (
    lower.includes('kentang') ||
    lower.includes('ringan') ||
    lower.includes('ram') ||
    lower.includes('4gb') ||
    lower.includes('ely.by') ||
    lower.includes('launcher') ||
    lower.includes('aman')
  ) {
    const wantsEly = lower.includes('ely') || lower.includes('gratis') || lower.includes('non');
    const picks = LAUNCHERS.filter((l) => {
      if (l.category === 'dangerous') return false;
      if (wantsEly) return l.category === 'non-licensed';
      return l.minRam.includes('1') || l.minRam.includes('2') || l.id === 'prism-launcher' || l.id === 'xmcl';
    }).slice(0, 4);

    const lines = picks.map(
      (l) =>
        `• **${l.name}** (${l.category === 'licensed' ? 'Lisensi Resmi' : 'Non-Lisensi & Ely.by'} · Min RAM ${l.minRam}) — ${l.tagline}`
    );

    return {
      reply:
        `Rekomendasi launcher ringan & aman terverifikasi:\n\n` +
        lines.join('\n\n') +
        `\n\n**Tips FPS Tinggi:** Gunakan mod **Sodium + Lithium + FerriteCore** via Modrinth agar penggunaan RAM jauh lebih hemat.`,
      sources: picks
        .filter((p) => p.websiteUrl)
        .map((p) => ({ title: p.name, url: p.websiteUrl })),
    };
  }

  // 5. Dangerous / Security warnings
  if (lower.includes('bahaya') || lower.includes('malware') || lower.includes('virus') || lower.includes('spyware')) {
    const risky = LAUNCHERS.filter((l) => l.category === 'dangerous').slice(0, 4);
    const lines = risky.map(
      (l) =>
        `• **${l.name}** (Risiko: ${l.wikiInvestigation?.dangerLevel || l.safetyRating.level}) — ${l.tagline}`
    );
    return {
      reply:
        `Daftar launcher yang masuk **Investigasi Bahaya / Blacklist Komunitas**:\n\n` +
        lines.join('\n\n') +
        `\n\nGunakan alternatif open-source atau terverifikasi seperti **Prism Launcher**, **XMCL**, atau **FreeSM Launcher** demi keamanan PC Anda.`,
    };
  }

  // 6. Live Modrinth API Search for mods / FPS / shader / fabric / forge queries
  if (
    lower.includes('mod') ||
    lower.includes('fps') ||
    lower.includes('sodium') ||
    lower.includes('iris') ||
    lower.includes('shader') ||
    lower.includes('fabric') ||
    lower.includes('forge') ||
    lower.includes('optifine') ||
    lower.includes('addon')
  ) {
    const searchTerm = extractModSearchQuery(q);
    const hits = await searchModrinthLive(searchTerm);
    if (hits.length > 0) {
      const lines = hits.map(
        (h) =>
          `• **${h.title}** (${h.downloads.toLocaleString('id-ID')} unduhan)\n  ${h.description}`
      );
      return {
        reply:
          `Hasil pencarian langsung dari **Modrinth API** untuk *"${searchTerm}"*:\n\n` +
          lines.join('\n\n') +
          `\n\nKlik tautan sumber di bawah untuk membuka halaman unduhan Modrinth resminya.`,
        sources: hits.map((h) => ({ title: `${h.title} (Modrinth)`, url: h.url })),
      };
    }
  }

  // 7. General greeting or broad fallback on static GitHub Pages
  const modHits = q.length >= 3 ? await searchModrinthLive(extractModSearchQuery(q)) : [];
  if (modHits.length > 0 && !/^(halo|hai|hi|hello|pagi|siang|sore|malam|tes|test)$/i.test(q)) {
    return {
      reply:
        `Saat ini halaman GitHub Pages berjalan dalam **Mode Statis** (tanpa server backend Gemini aktif), namun saya tetap menemukan referensi langsung dari **Modrinth** terkait pertanyaanmu:\n\n` +
        modHits
          .map((h) => `• **${h.title}** — ${h.description}`)
          .join('\n\n') +
        `\n\nKamu juga bisa menanyakan tentang **launcher ringan/RAM 4GB**, **keamanan TLauncher/Salwyrr**, **server Minecraft Indonesia**, atau **troubleshooting Exit Code 1**.`,
      sources: modHits.map((h) => ({ title: `${h.title} (Modrinth)`, url: h.url })),
    };
  }

  return {
    reply:
      `Halo! Saya **Craft AI** (saat ini aktif dalam **Mode Statis GitHub Pages** menggunakan database terverifikasi MineLaunch Hub & Modrinth API).\n\n` +
      `Kamu bisa langsung menanyakan:\n` +
      `• Rekomendasi **launcher aman & ringan untuk RAM 4GB** (Prism, XMCL, FreeSM, SKLauncher)\n` +
      `• Audit keamanan & bahaya **TLauncher / Salwyrr / launcher blacklist**\n` +
      `• Daftar IP **Server Minecraft Indonesia** (Kaizen Network, MineGens, Alwination, Valoria SMP, ZEETEZ)\n` +
      `• Pencarian **mod Fabric/Forge/FPS** langsung dari Modrinth & solusi **Crash Exit Code 1**\n\n` +
      `*(Untuk jawaban AI Google Gemini + Google Search tanpa batas topik, publikasikan backend server atau buka via AI Studio App URL.)*`,
  };
}
