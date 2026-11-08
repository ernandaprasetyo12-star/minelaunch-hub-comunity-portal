import React, { useState } from 'react';
import { 
  Globe, Copy, Check, Server, ShieldCheck, Sparkles, 
  Search, ArrowLeft, ExternalLink, Users, Wifi 
} from 'lucide-react';
import { INDO_SERVERS, MINECRAFT_MP_URL, ServerItem } from '../data/servers';
import { AppViewMode } from './Navbar';
import { SafeImage } from './SafeImage';

interface ServersPageProps {
  onNavigate: (view: AppViewMode) => void;
  onOpenTour: () => void;
}

export const ServersPage: React.FC<ServersPageProps> = ({ onNavigate }) => {
  const [copiedIp, setCopiedIp] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'id' | 'cracked'>('all');
  const [customIps, setCustomIps] = useState<Record<string, string>>({});

  const getEffectiveIp = (server: ServerItem) => {
    return customIps[server.id] !== undefined ? customIps[server.id] : server.ip;
  };

  const handleCopyIp = (server: ServerItem) => {
    const ipToCopy = getEffectiveIp(server);
    navigator.clipboard.writeText(ipToCopy);
    setCopiedIp(server.id);
    setTimeout(() => setCopiedIp(null), 2500);
  };

  const handleIpChange = (serverId: string, newIp: string) => {
    setCustomIps((prev) => ({
      ...prev,
      [serverId]: newIp,
    }));
  };

  const filteredServers = INDO_SERVERS.filter((server) => {
    if (typeFilter === 'id' && server.country !== 'ID') return false;
    if (typeFilter === 'cracked' && server.isOfficialOnly) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const currentIp = getEffectiveIp(server).toLowerCase();
      const matchName = server.name.toLowerCase().includes(q);
      const matchIp = currentIp.includes(q);
      const matchModes = server.modes.some((m) => m.toLowerCase().includes(q));
      if (!matchName && !matchIp && !matchModes) return false;
    }
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Navigation Header */}
      <div className="space-y-4 border-b border-neutral-800 pb-6">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Beranda Utama</span>
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/80 shadow-md">
                <Server className="h-5 w-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Server Minecraft Java Edition Indonesia
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
              Daftar server lokal Indonesia terpopuler: Kaizen Network, MineGens, Alwination, Valoria SMP, dan ZEETEZ LEGENDS. Salin IP langsung dalam 1 klik dan mainkan menggunakan launcher XMCL, SKLauncher, atau Prism.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('non-licensed')}
              className="px-3.5 py-2 rounded-xl border border-sky-900 bg-sky-950/40 text-xs font-semibold text-sky-300 hover:bg-sky-900/50 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              <span>Launcher Ely.by / Non-Lisensi</span>
            </button>
            <button
              onClick={() => onNavigate('licensed')}
              className="px-3.5 py-2 rounded-xl border border-emerald-900 bg-emerald-950/40 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/50 transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Launcher Lisensi Resmi</span>
            </button>
          </div>
        </div>
      </div>

      {/* MINECRAFT-MP INDONESIA CALLOUT BANNER */}
      <div className="rounded-2xl border border-sky-800/80 bg-gradient-to-r from-sky-950/80 via-neutral-900 to-neutral-950 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative shadow-xl">
        <div className="flex flex-col sm:flex-row items-center gap-5 z-10">
          <SafeImage
            src="/assets/aistudio/image_fcffa648.png"
            alt="Minecraft MP Indonesia Servers"
            className="h-20 w-auto rounded-xl border border-sky-500/40 object-cover shadow-lg shrink-0"
          />
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 bg-sky-950/90 border border-sky-800 px-2.5 py-0.5 rounded-full">
              <Globe className="h-3.5 w-3.5" />
              <span>DIREKTORI SERVER INDONESIA LENGKAP</span>
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">
              Mau Server Indonesia Yang Lebih Lengkap?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
              Kunjungi situs <strong className="text-sky-300 font-mono">https://minecraft-mp.com/country/indonesia/</strong> untuk melihat ratusan server Minecraft Java Edition Indonesia terpopuler lainnya dengan voting realtime.
            </p>
          </div>
        </div>

        <a
          href={MINECRAFT_MP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-500 px-6 py-3 text-xs sm:text-sm font-bold text-white transition-all shadow-lg shadow-sky-950 shrink-0 z-10 group"
        >
          <span>Kunjungi Minecraft-MP.com 🇮🇩</span>
          <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama server, IP, atau mode (Slimefun, Gens)..."
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-3.5 py-2 rounded-xl border transition-all whitespace-nowrap ${
              typeFilter === 'all'
                ? 'bg-emerald-950 border-emerald-700 text-emerald-300 font-bold'
                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            Semua Server ({INDO_SERVERS.length})
          </button>

          <button
            onClick={() => setTypeFilter('id')}
            className={`px-3.5 py-2 rounded-xl border transition-all whitespace-nowrap flex items-center gap-1.5 ${
              typeFilter === 'id'
                ? 'bg-emerald-950 border-emerald-700 text-emerald-300 font-bold'
                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <span>🇮🇩 Server Indonesia</span>
          </button>

          <button
            onClick={() => setTypeFilter('cracked')}
            className={`px-3.5 py-2 rounded-xl border transition-all whitespace-nowrap flex items-center gap-1.5 ${
              typeFilter === 'cracked'
                ? 'bg-sky-950 border-sky-700 text-sky-300 font-bold'
                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            <span>Mendukung Ely.by & Offline</span>
          </button>
        </div>
      </div>

      {/* Grid of Server Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServers.map((server) => (
          <div
            key={server.id}
            className="group relative flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900/70 hover:border-emerald-500/60 transition-all duration-200 overflow-hidden shadow-lg hover:shadow-emerald-950/40"
          >
            {/* Header Image Banner */}
            <div className="relative aspect-[16/7] w-full overflow-hidden bg-neutral-950">
              <SafeImage src={server.image} alt={server.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />

              {server.featuredTag && (
                <div className="absolute top-3 left-3 bg-neutral-950/90 border border-emerald-500/60 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm">
                  {server.featuredTag}
                </div>
              )}

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  <span>{server.countryFlag}</span>
                  <span>{server.country === 'ID' ? 'Host Indonesia' : 'Global'}</span>
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/90 border border-emerald-800 px-2 py-0.5 rounded flex items-center gap-1">
                  <Wifi className="h-3 w-3 animate-pulse" />
                  <span>{server.playerCountEst}</span>
                </span>
              </div>
            </div>

            {/* Server Details Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                    {server.name}
                  </h3>
                  <div className="text-xs text-neutral-400 mt-1 flex items-center gap-2">
                    <span>Versi: <strong className="text-neutral-200 font-mono">{server.versionRange}</strong></span>
                    <span>·</span>
                    {server.isOfficialOnly ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" />
                        <span>Wajib Microsoft Resmi</span>
                      </span>
                    ) : (
                      <span className="text-sky-400 font-semibold flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        <span>Bisa Ely.by / Offline</span>
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
                  {server.description}
                </p>

                {/* Game Modes Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {server.modes.map((mode, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold bg-neutral-950 text-neutral-300 border border-neutral-800 px-2 py-0.5 rounded-md"
                    >
                      {mode}
                    </span>
                  ))}
                </div>
              </div>

              {/* Server IP Editable & Copy Box */}
              <div className="pt-3 border-t border-neutral-800/80 space-y-2">
                <div className="text-[11px] text-neutral-400 font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span>Alamat IP Java &amp; Bedrock:</span>
                    <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
                      Bisa Diedit
                    </span>
                  </span>
                  {copiedIp === server.id && (
                    <span className="text-emerald-400 font-bold animate-pulse">IP Disalin! ✓</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={getEffectiveIp(server)}
                    onChange={(e) => handleIpChange(server.id, e.target.value)}
                    title="Ubah IP server jika Anda menggunakan domain/port kustom"
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 font-mono text-xs text-emerald-400 font-bold focus:border-emerald-500 focus:outline-none select-all"
                  />
                  <button
                    onClick={() => handleCopyIp(server)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-all shadow-md shadow-emerald-950 shrink-0"
                    title="Salin IP Server ke Clipboard"
                  >
                    {copiedIp === server.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span>{copiedIp === server.id ? 'Disalin' : 'Salin IP'}</span>
                  </button>
                </div>

                <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                  <span>Port Java: <strong>25565</strong> | Bedrock: <strong>{server.bedrockPort || 19132}</strong></span>
                  {server.websiteUrl && (
                    <a
                      href={server.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-emerald-400 flex items-center gap-1 font-sans font-semibold"
                    >
                      <span>Web Server</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Guide: Cara Connect ke Server */}
      <div className="rounded-2xl border border-neutral-800 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-emerald-950/30 p-6 space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Server className="h-5 w-5 text-emerald-400" />
          <span>Cara Bergabung ke Server Minecraft Indonesia via Launcher</span>
        </h3>
        <ol className="text-xs sm:text-sm text-neutral-300 space-y-2 list-decimal list-inside leading-relaxed">
          <li>Buka launcher pilihan Anda (misalnya <strong>XMCL, SKLauncher, atau Prism Launcher</strong>).</li>
          <li>Jalankan Minecraft Java Edition dengan versi yang didukung (seperti <code>1.20.4</code> atau <code>1.16.5</code>).</li>
          <li>Masuk ke menu utama Minecraft &rarr; pilih <strong>Multiplayer</strong> &rarr; klik <strong>Add Server</strong>.</li>
          <li>Klik tombol <strong>Salin IP</strong> pada server di atas, lalu tempel (*Paste*) pada kolom <strong>Server Address</strong>.</li>
          <li>Klik <strong>Done</strong> lalu pilih server untuk mulai bermain bersama komunitas Indonesia!</li>
        </ol>
      </div>
    </div>
  );
};
