import React, { useMemo, useState, useEffect } from 'react';
import {
  Globe,
  Copy,
  Check,
  Server,
  ShieldCheck,
  Sparkles,
  Search,
  ArrowLeft,
  ExternalLink,
  Wifi,
  Flame,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Swords,
  Compass,
  Coins,
  Layers,
  Shield,
  Users,
  RefreshCw,
} from 'lucide-react';
import { INDO_SERVERS, MINECRAFT_MP_URL, ServerItem } from '../data/servers';
import { AppViewMode } from './Navbar';
import { SafeImage } from './SafeImage';

interface ServersPageProps {
  onNavigate: (view: AppViewMode) => void;
  onOpenTour: () => void;
}

type ServerSortBy = 'popular' | 'name';

const ACCESS_SOURCES: Array<{
  id: 'all' | 'cracked' | 'id';
  label: string;
  icon: React.ReactNode;
}> = [
  { id: 'all', label: 'Semua', icon: <Server className="h-5 w-5" /> },
  { id: 'cracked', label: 'Ely.by', icon: <Sparkles className="h-5 w-5" /> },
  { id: 'id', label: 'Indonesia', icon: <Globe className="h-5 w-5" /> },
];

const SERVER_MODES: Array<{
  id: string;
  label: string;
  icon: React.ReactNode;
}> = [
  { id: 'Survival Mix', label: 'Survival Mix', icon: <Compass className="h-3.5 w-3.5" /> },
  { id: 'Lifesteal SMP', label: 'Lifesteal SMP', icon: <Swords className="h-3.5 w-3.5" /> },
  { id: 'Gens Tycoon', label: 'Gens Tycoon', icon: <Coins className="h-3.5 w-3.5" /> },
  { id: 'SkyBlock Tycoon', label: 'SkyBlock', icon: <Layers className="h-3.5 w-3.5" /> },
  { id: 'Slimefun', label: 'Slimefun', icon: <Sparkles className="h-3.5 w-3.5" /> },
  { id: 'Towny Economy', label: 'Towny SMP', icon: <Users className="h-3.5 w-3.5" /> },
  { id: 'Factions PvP', label: 'Factions PvP', icon: <Shield className="h-3.5 w-3.5" /> },
  { id: 'OneBlock', label: 'OneBlock', icon: <Server className="h-3.5 w-3.5" /> },
];

const GAME_VERSIONS = ['all', '1.21.x', '1.18.2', '1.16.5'];

export const ServersPage: React.FC<ServersPageProps> = ({ onNavigate }) => {
  const [copiedIp, setCopiedIp] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'id' | 'cracked'>('all');
  const [sortBy, setSortBy] = useState<ServerSortBy>('popular');
  const [versionFilter, setVersionFilter] = useState<string>('all');
  const [modeFilter, setModeFilter] = useState<string>('all');
  const [crossplayOnly, setCrossplayOnly] = useState(false);
  const [isModesExpanded, setIsModesExpanded] = useState(true);
  const [customIps, setCustomIps] = useState<Record<string, string>>({});
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  const getEffectiveIp = (server: ServerItem) =>
    customIps[server.id] !== undefined ? customIps[server.id] : server.ip;

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

  const filteredServers = useMemo(() => {
    const list = INDO_SERVERS.filter((server) => {
      if (typeFilter === 'id' && server.country !== 'ID') return false;
      if (typeFilter === 'cracked' && server.isOfficialOnly) return false;
      if (crossplayOnly && !server.bedrockPort) return false;
      if (versionFilter !== 'all' && !server.versionRange.includes(versionFilter.replace('.x', ''))) {
        return false;
      }
      if (modeFilter !== 'all' && !server.modes.includes(modeFilter)) return false;
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

    if (sortBy === 'name') {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [typeFilter, crossplayOnly, versionFilter, modeFilter, searchQuery, sortBy, customIps]);

  const spotlightServers = filteredServers.length > 0 ? filteredServers : INDO_SERVERS;
  const activeSpotlight = spotlightServers[spotlightIndex % spotlightServers.length] || INDO_SERVERS[0];

  useEffect(() => {
    setSpotlightIndex(0);
  }, [typeFilter, crossplayOnly, versionFilter, modeFilter, searchQuery]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setSortBy('popular');
    setVersionFilter('all');
    setModeFilter('all');
    setCrossplayOnly(false);
  };

  const hasActiveFilter =
    searchQuery.trim() !== '' ||
    typeFilter !== 'all' ||
    versionFilter !== 'all' ||
    modeFilter !== 'all' ||
    crossplayOnly;

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Compact Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#16181e]/85 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:border-emerald-500/40 hover:text-white transition-colors shrink-0 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Beranda</span>
          </button>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight truncate">
              Server Minecraft Java &amp; Bedrock Indonesia
            </h1>
            <p className="text-xs text-neutral-400 truncate">
              Salin IP 1-klik untuk XMCL, SKLauncher, Prism, maupun HP Bedrock
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('non-licensed')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#16181e]/85 px-3.5 py-2 text-xs font-semibold text-sky-300 hover:border-sky-500/50 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Launcher Ely.by</span>
          </button>
          <a
            href={MINECRAFT_MP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#16181e]/85 px-3.5 py-2 text-xs font-semibold text-emerald-300 hover:border-emerald-500/50 transition-colors whitespace-nowrap"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>Minecraft-MP</span>
            <ExternalLink className="h-3 w-3 opacity-70" />
          </a>
        </div>
      </div>

      {/* 2-Column XMCL Store-Inspired Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT FILTER RAIL */}
        <aside className="lg:col-span-4 xl:col-span-3 space-y-5">
          {/* TIPE SERVER (3-Column Square Tiles) */}
          <div className="space-y-2.5">
            <span className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
              Sumber Server
            </span>
            <div className="grid grid-cols-3 gap-2">
              {ACCESS_SOURCES.map((src) => {
                const isActive = typeFilter === src.id;
                return (
                  <button
                    key={src.id}
                    onClick={() => setTypeFilter(src.id)}
                    className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border px-2 py-3.5 text-center transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#22c55e] bg-[#22c55e]/15 text-white shadow-sm'
                        : 'border-white/[0.08] bg-[#16181e]/85 text-neutral-300 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span className={isActive ? 'text-[#22c55e]' : 'text-neutral-300'}>
                      {src.icon}
                    </span>
                    <span className="text-[11px] font-bold leading-none whitespace-nowrap">
                      {src.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* URUTKAN BERDASARKAN */}
          <div className="space-y-2">
            <label
              htmlFor="server-sort-select"
              className="block text-xs font-bold uppercase tracking-wider text-neutral-300"
            >
              Urutkan Berdasarkan
            </label>
            <select
              id="server-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as ServerSortBy)}
              className="w-full rounded-xl border border-white/[0.08] bg-[#16181e]/90 px-3.5 py-2.5 text-xs font-semibold text-white focus:border-[#22c55e] focus:outline-none cursor-pointer"
            >
              <option value="popular">Pemain terbanyak</option>
              <option value="name">Nama server (A – Z)</option>
            </select>
          </div>

          {/* VERSI GAME */}
          <div className="space-y-2">
            <label
              htmlFor="server-version-select"
              className="block text-xs font-bold uppercase tracking-wider text-neutral-300"
            >
              Versi Game
            </label>
            <select
              id="server-version-select"
              value={versionFilter}
              onChange={(e) => setVersionFilter(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-[#16181e]/90 px-3.5 py-2.5 text-xs font-semibold text-white focus:border-[#22c55e] focus:outline-none cursor-pointer"
            >
              <option value="all">Semua versi Java</option>
              {GAME_VERSIONS.filter((v) => v !== 'all').map((ver) => (
                <option key={ver} value={ver}>
                  Minecraft {ver}
                </option>
              ))}
            </select>
          </div>

          {/* DUKUNGAN & AKSES PANEL */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#16181e]/85 backdrop-blur-xl p-4 space-y-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
              Platform &amp; Akses
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setCrossplayOnly((prev) => !prev)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  crossplayOnly
                    ? 'border-[#22c55e] bg-[#22c55e]/15 text-[#22c55e]'
                    : 'border-white/[0.05] bg-neutral-950/45 text-neutral-300 hover:border-white/15 hover:text-white'
                }`}
              >
                <Globe className="h-3.5 w-3.5 shrink-0" />
                <span>Crossplay</span>
              </button>
              <button
                onClick={() => setTypeFilter(typeFilter === 'cracked' ? 'all' : 'cracked')}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  typeFilter === 'cracked'
                    ? 'border-[#22c55e] bg-[#22c55e]/15 text-[#22c55e]'
                    : 'border-white/[0.05] bg-neutral-950/45 text-neutral-300 hover:border-white/15 hover:text-white'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 shrink-0" />
                <span>Ely.by Free</span>
              </button>
            </div>
          </div>

          {/* MODE PERMAINAN PANEL */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#16181e]/85 backdrop-blur-xl p-4 space-y-3">
            <button
              onClick={() => setIsModesExpanded((prev) => !prev)}
              className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Mode Permainan</span>
              {isModesExpanded ? (
                <ChevronUp className="h-4 w-4 text-neutral-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-neutral-400" />
              )}
            </button>

            {isModesExpanded && (
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {SERVER_MODES.map((mode) => {
                  const isActive = modeFilter === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setModeFilter(isActive ? 'all' : mode.id)}
                      className={`flex items-center gap-2 rounded-xl px-2.5 py-2 text-left text-xs font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#22c55e]/15 text-[#22c55e] font-semibold'
                          : 'text-neutral-300 hover:bg-white/[0.05] hover:text-white'
                      }`}
                    >
                      <span className="shrink-0 opacity-85">{mode.icon}</span>
                      <span className="truncate">{mode.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT WORKSPACE: Search Bar, Spotlight Server Populer, Daftar Server */}
        <div className="lg:col-span-8 xl:col-span-9 min-w-0 space-y-7">
          {/* Top Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama server, IP address, atau mode permainan..."
              className="w-full rounded-2xl border border-white/[0.08] bg-[#16181e]/85 backdrop-blur-xl pl-11 pr-24 py-3 text-xs sm:text-sm text-white placeholder:text-neutral-400 focus:border-[#22c55e] focus:outline-none"
            />
            {hasActiveFilter && (
              <button
                onClick={resetAllFilters}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] px-2.5 py-1 text-[11px] font-semibold text-neutral-200 transition-colors cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          {/* SECTION 1: TREN / SERVER POPULER SPOTLIGHT */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg sm:text-xl font-extrabold text-white">
                <Flame className="h-5 w-5 text-orange-400" />
                <span>Server Populer Indonesia</span>
              </h2>
              <span className="text-xs text-neutral-400 font-mono tabular-nums">
                {(spotlightIndex % spotlightServers.length) + 1} / {spotlightServers.length}
              </span>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#16181e]/85 backdrop-blur-xl overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 xl:grid-cols-12 items-stretch">
                {/* Featured Server Banner Left */}
                <div className="xl:col-span-7 relative aspect-[16/10] xl:aspect-auto xl:min-h-[290px] bg-neutral-950 overflow-hidden group">
                  <SafeImage
                    src={activeSpotlight.image}
                    alt={activeSpotlight.name}
                    className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15 pointer-events-none" />

                  <button
                    onClick={() =>
                      setSpotlightIndex(
                        (prev) => (prev - 1 + spotlightServers.length) % spotlightServers.length
                      )
                    }
                    aria-label="Server sebelumnya"
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 border border-white/15 text-white hover:bg-black/80 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() =>
                      setSpotlightIndex((prev) => (prev + 1) % spotlightServers.length)
                    }
                    aria-label="Server berikutnya"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 border border-white/15 text-white hover:bg-black/80 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  <div className="absolute top-3 right-3 rounded-lg bg-black/60 border border-white/10 px-2.5 py-1 text-[11px] font-mono text-[#22c55e] flex items-center gap-1.5 backdrop-blur-sm">
                    <Wifi className="h-3 w-3" />
                    <span>{activeSpotlight.playerCountEst}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#22c55e]">
                      <span>{activeSpotlight.countryFlag} Host Indonesia</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-neutral-300">
                        {activeSpotlight.isOfficialOnly ? 'Lisensi Resmi' : 'Bisa Ely.by / Offline'}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                      {activeSpotlight.name}
                    </h3>
                    <div className="text-xs font-mono text-neutral-300">
                      {getEffectiveIp(activeSpotlight)} · Bedrock Port {activeSpotlight.bedrockPort || 19132}
                    </div>
                  </div>
                </div>

                {/* Right Quick Switcher Thumbnails & 1-Click IP Copy */}
                <div className="xl:col-span-5 p-4 sm:p-5 flex flex-col justify-between gap-4 border-t xl:border-t-0 xl:border-l border-white/[0.08]">
                  <div className="grid grid-cols-2 gap-2.5">
                    {spotlightServers.slice(0, 4).map((srv, idx) => {
                      const isActive = srv.id === activeSpotlight.id;
                      return (
                        <button
                          key={srv.id}
                          onClick={() => setSpotlightIndex(idx)}
                          className={`relative aspect-[16/10] rounded-xl overflow-hidden border text-left transition-all cursor-pointer ${
                            isActive
                              ? 'border-[#22c55e] ring-2 ring-[#22c55e]/35'
                              : 'border-white/[0.08] opacity-75 hover:opacity-100'
                          }`}
                        >
                          <SafeImage
                            src={srv.image}
                            alt={srv.name}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                          <span className="absolute bottom-1.5 left-2 right-2 text-[10px] font-bold text-white truncate">
                            {srv.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
                      {activeSpotlight.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-400">
                      <span className="font-mono text-neutral-200 font-semibold">
                        {activeSpotlight.versionRange}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{activeSpotlight.modes.slice(0, 3).join(' · ')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-white/[0.08]">
                    <input
                      type="text"
                      value={getEffectiveIp(activeSpotlight)}
                      onChange={(e) => handleIpChange(activeSpotlight.id, e.target.value)}
                      className="flex-1 min-w-0 rounded-xl border border-white/[0.08] bg-neutral-950/75 px-3 py-2 font-mono text-xs font-bold text-[#22c55e] focus:border-[#22c55e] focus:outline-none select-all"
                    />
                    <button
                      onClick={() => handleCopyIp(activeSpotlight)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] px-4 py-2 text-xs font-bold text-neutral-950 transition-colors shrink-0 cursor-pointer whitespace-nowrap"
                    >
                      {copiedIp === activeSpotlight.id ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span>{copiedIp === activeSpotlight.id ? 'Disalin' : 'Salin IP'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2">
              {spotlightServers.map((srv, idx) => (
                <button
                  key={srv.id}
                  onClick={() => setSpotlightIndex(idx)}
                  aria-label={`Pilih server ${srv.name}`}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === spotlightIndex % spotlightServers.length
                      ? 'w-7 bg-[#22c55e]'
                      : 'w-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </section>

          {/* SECTION 2: DAFTAR SERVER LENGKAP */}
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Server className="h-5 w-5 text-[#22c55e]" />
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  Daftar Server Indonesia
                </h2>
                <span className="text-xs font-mono text-neutral-400 tabular-nums">
                  ({filteredServers.length})
                </span>
              </div>

              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#16181e]/85 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:border-white/20 hover:text-white transition-colors cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Segarkan</span>
              </button>
            </div>

            {filteredServers.length === 0 ? (
              <div className="rounded-2xl border border-white/[0.08] bg-[#16181e]/80 backdrop-blur-xl p-10 text-center space-y-3">
                <p className="text-sm font-semibold text-neutral-200">
                  Tidak ada server yang cocok dengan filter Anda.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] px-4 py-2 text-xs font-bold text-neutral-950 transition-colors cursor-pointer"
                >
                  Reset Semua Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredServers.map((server) => (
                  <div
                    key={server.id}
                    className="group flex flex-col rounded-2xl border border-white/[0.08] bg-[#16181e]/80 backdrop-blur-xl hover:border-[#22c55e]/55 transition-all duration-200 overflow-hidden"
                  >
                    <div className="relative aspect-[16/8] w-full overflow-hidden bg-neutral-950">
                      <SafeImage
                        src={server.image}
                        alt={server.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#16181e] via-[#16181e]/35 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px]">
                        <span className="font-bold text-white">
                          {server.countryFlag} Host Indonesia
                        </span>
                        <span className="font-mono font-bold text-[#22c55e] flex items-center gap-1">
                          <Wifi className="h-3 w-3" />
                          <span>{server.playerCountEst}</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5">
                      <div className="space-y-2">
                        <div>
                          <h3 className="text-base font-bold text-white group-hover:text-[#22c55e] transition-colors truncate">
                            {server.name}
                          </h3>
                          <div className="text-[11px] text-neutral-400 mt-0.5 flex flex-wrap items-center gap-1.5">
                            <span className="font-mono text-neutral-200">{server.versionRange}</span>
                            <span aria-hidden="true">·</span>
                            {server.isOfficialOnly ? (
                              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                                <ShieldCheck className="h-3 w-3" />
                                <span>Resmi</span>
                              </span>
                            ) : (
                              <span className="text-sky-400 font-semibold flex items-center gap-1">
                                <Sparkles className="h-3 w-3" />
                                <span>Bisa Ely.by</span>
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
                          {server.description}
                        </p>

                        <div className="text-[11px] text-neutral-400 truncate">
                          {server.modes.slice(0, 4).join(' · ')}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/[0.08] space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={getEffectiveIp(server)}
                            onChange={(e) => handleIpChange(server.id, e.target.value)}
                            title="Ubah IP jika Anda memakai port/domain kustom"
                            className="flex-1 min-w-0 bg-neutral-950/75 border border-white/[0.08] rounded-xl px-3 py-2 font-mono text-xs text-[#22c55e] font-bold focus:border-[#22c55e] focus:outline-none select-all"
                          />
                          <button
                            onClick={() => handleCopyIp(server)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] px-3.5 py-2 text-xs font-bold text-neutral-950 transition-all shrink-0 cursor-pointer whitespace-nowrap"
                          >
                            {copiedIp === server.id ? (
                              <Check className="h-3.5 w-3.5" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                            <span>{copiedIp === server.id ? 'Disalin' : 'Salin IP'}</span>
                          </button>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                          <span>
                            Java 25565 · Bedrock {server.bedrockPort || 19132}
                          </span>
                          {server.websiteUrl && (
                            <a
                              href={server.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-neutral-300 hover:text-[#22c55e] flex items-center gap-1 font-sans font-semibold"
                            >
                              <span>Web</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Compact Join Guide + Minecraft-MP Directory Banner */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
            <div className="xl:col-span-7 rounded-2xl border border-white/[0.08] bg-[#16181e]/80 backdrop-blur-xl p-5 space-y-2.5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Server className="h-4 w-4 text-[#22c55e]" />
                <span>Cara Bergabung ke Server Indonesia</span>
              </h3>
              <ol className="text-xs text-neutral-300 space-y-1.5 list-decimal list-inside leading-relaxed">
                <li>Jalankan Minecraft Java Edition via XMCL, SKLauncher, atau Prism Launcher.</li>
                <li>Masuk ke menu <strong>Multiplayer</strong> lalu klik <strong>Add Server</strong>.</li>
                <li>Klik tombol <strong>Salin IP</strong> di atas lalu tempel ke kolom Server Address.</li>
              </ol>
            </div>

            <div className="xl:col-span-5 rounded-2xl border border-white/[0.08] bg-[#16181e]/80 backdrop-blur-xl p-5 flex flex-col justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
                  Direktori Lebih Lengkap
                </span>
                <h3 className="text-sm font-bold text-white">
                  Jelajahi Ratusan Server Indonesia di Minecraft-MP
                </h3>
                <p className="text-xs text-neutral-400">
                  Temukan server survival, skyblock, dan roleplay lokal aktif lainnya.
                </p>
              </div>
              <a
                href={MINECRAFT_MP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] px-4 py-2.5 text-xs font-bold text-neutral-950 transition-colors"
              >
                <span>Kunjungi Minecraft-MP.com</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
