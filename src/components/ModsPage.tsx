import React, { useMemo, useState, useEffect } from 'react';
import {
  Search,
  ArrowLeft,
  ExternalLink,
  Download,
  Package,
  Flame,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Compass,
  Sparkles,
  Zap,
  Shield,
  Wand2,
  Map as MapIcon,
  Layers,
  Users,
  RefreshCw,
  ArrowRight,
  Box,
  Cpu,
} from 'lucide-react';
import { MODS, ModItem, ModLoaderType, ModSourceType } from '../data/mods';
import { AppViewMode } from './Navbar';
import { SafeImage } from './SafeImage';

interface ModsPageProps {
  onNavigate: (view: AppViewMode) => void;
}

type SortByOption = 'downloads' | 'name' | 'latest';

const SOURCE_OPTIONS: Array<{
  id: ModSourceType;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
}> = [
  {
    id: 'modrinth',
    label: 'Modrinth',
    subtitle: 'Open Ecosystem',
    icon: <Package className="h-5 w-5" />,
  },
  {
    id: 'curseforge',
    label: 'CurseForge',
    subtitle: 'Katalog Klasik',
    icon: <Flame className="h-5 w-5" />,
  },
  {
    id: 'ftb',
    label: 'FTB',
    subtitle: 'Modpack Kurasi',
    icon: <Layers className="h-5 w-5" />,
  },
];

const LOADER_OPTIONS: Array<{
  id: ModLoaderType;
  label: string;
  icon: React.ReactNode;
}> = [
  { id: 'fabric', label: 'Fabric', icon: <Layers className="h-3.5 w-3.5" /> },
  { id: 'forge', label: 'Forge', icon: <Cpu className="h-3.5 w-3.5" /> },
  { id: 'neoforge', label: 'NeoForge', icon: <Shield className="h-3.5 w-3.5" /> },
  { id: 'quilt', label: 'Quilt', icon: <Box className="h-3.5 w-3.5" /> },
];

const CATEGORY_OPTIONS: Array<{
  id: string;
  label: string;
  icon: React.ReactNode;
}> = [
  { id: 'Modpack', label: 'Modpack', icon: <Package className="h-3.5 w-3.5" /> },
  { id: 'Adventure', label: 'Petualangan', icon: <Compass className="h-3.5 w-3.5" /> },
  { id: 'Optimization', label: 'Optimalisasi', icon: <Zap className="h-3.5 w-3.5" /> },
  { id: 'Ringan', label: 'Ringan / FPS', icon: <Sparkles className="h-3.5 w-3.5" /> },
  { id: 'Visual', label: 'Visual / HUD', icon: <Layers className="h-3.5 w-3.5" /> },
  { id: 'Magic', label: 'Sihir & RPG', icon: <Wand2 className="h-3.5 w-3.5" /> },
  { id: 'Map', label: 'Peta Dunia', icon: <MapIcon className="h-3.5 w-3.5" /> },
  { id: 'Multiplayer', label: 'Multipemain', icon: <Users className="h-3.5 w-3.5" /> },
  { id: 'Utility', label: 'Utilitas', icon: <Box className="h-3.5 w-3.5" /> },
];

const GAME_VERSIONS = ['all', '1.21.1', '1.21', '1.20.4', '1.20.1', '1.19.4', '1.16.5', '1.12.2'];

export const ModsPage: React.FC<ModsPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<'all' | ModSourceType>('all');
  const [sortBy, setSortBy] = useState<SortByOption>('downloads');
  const [versionFilter, setVersionFilter] = useState<string>('all');
  const [loaderFilter, setLoaderFilter] = useState<'all' | ModLoaderType>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(true);

  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);

  const filteredMods = useMemo(() => {
    const items = MODS.filter((mod) => {
      if (sourceFilter !== 'all' && mod.source !== sourceFilter) return false;
      if (loaderFilter !== 'all' && !mod.loaders.includes(loaderFilter)) return false;
      if (versionFilter !== 'all' && !mod.versions.includes(versionFilter)) return false;
      if (categoryFilter !== 'all' && !mod.category.includes(categoryFilter)) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = mod.name.toLowerCase().includes(q);
        const matchSummary = mod.summary.toLowerCase().includes(q);
        const matchAuthor = mod.author.toLowerCase().includes(q);
        if (!matchName && !matchSummary && !matchAuthor) return false;
      }
      return true;
    });

    return [...items].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'latest') return b.latestVersion.localeCompare(a.latestVersion);
      return b.downloadsNumeric - a.downloadsNumeric;
    });
  }, [searchQuery, sourceFilter, sortBy, versionFilter, loaderFilter, categoryFilter]);

  const spotlightItems = useMemo(() => {
    const modpacksFirst = filteredMods.length > 0 ? filteredMods : MODS;
    const packs = modpacksFirst.filter((m) => m.kind === 'modpack');
    const rest = modpacksFirst.filter((m) => m.kind !== 'modpack');
    return [...packs, ...rest].slice(0, 6);
  }, [filteredMods]);

  useEffect(() => {
    setSpotlightIndex(0);
    setActiveThumbIndex(0);
  }, [sourceFilter, loaderFilter, versionFilter, categoryFilter, searchQuery]);

  const activeSpotlight: ModItem = spotlightItems[spotlightIndex % spotlightItems.length] || MODS[0];
  const heroImage =
    activeSpotlight.previewImages[activeThumbIndex] || activeSpotlight.previewImages[0];

  const handlePrevSpotlight = () => {
    setSpotlightIndex((prev) => (prev - 1 + spotlightItems.length) % spotlightItems.length);
    setActiveThumbIndex(0);
  };

  const handleNextSpotlight = () => {
    setSpotlightIndex((prev) => (prev + 1) % spotlightItems.length);
    setActiveThumbIndex(0);
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSourceFilter('all');
    setSortBy('downloads');
    setVersionFilter('all');
    setLoaderFilter('all');
    setCategoryFilter('all');
  };

  const hasActiveFilter =
    searchQuery.trim() !== '' ||
    sourceFilter !== 'all' ||
    versionFilter !== 'all' ||
    loaderFilter !== 'all' ||
    categoryFilter !== 'all';

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Compact Breadcrumb & Page Title Bar */}
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
              Modpacks &amp; Mods Browser
            </h1>
            <p className="text-xs text-neutral-400 truncate">
              Eksplorasi Modrinth, CurseForge, dan FTB untuk launcher pilihan Anda
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://modrinth.com/modpacks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#16181e]/85 px-3.5 py-2 text-xs font-semibold text-emerald-300 hover:border-emerald-500/50 transition-colors whitespace-nowrap"
          >
            <Package className="h-3.5 w-3.5" />
            <span>Modrinth</span>
            <ExternalLink className="h-3 w-3 opacity-70" />
          </a>
          <a
            href="https://www.curseforge.com/minecraft/modpacks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#16181e]/85 px-3.5 py-2 text-xs font-semibold text-orange-300 hover:border-orange-500/50 transition-colors whitespace-nowrap"
          >
            <Flame className="h-3.5 w-3.5" />
            <span>CurseForge</span>
            <ExternalLink className="h-3 w-3 opacity-70" />
          </a>
        </div>
      </div>

      {/* 2-Column XMCL Store / Modpacks Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT RAIL: Sumber, Sort, Versi Game, Mod Loader, Kategori */}
        <aside className="lg:col-span-4 xl:col-span-3 space-y-5">
          {/* SUMBER (3-Column Square Tiles) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                Sumber
              </span>
              {sourceFilter !== 'all' && (
                <button
                  onClick={() => setSourceFilter('all')}
                  className="text-[11px] font-semibold text-[#22c55e] hover:underline cursor-pointer"
                >
                  Tampilkan semua
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {SOURCE_OPTIONS.map((src) => {
                const isActive = sourceFilter === src.id;
                return (
                  <button
                    key={src.id}
                    onClick={() => setSourceFilter(isActive ? 'all' : src.id)}
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
              htmlFor="mods-sort-select"
              className="block text-xs font-bold uppercase tracking-wider text-neutral-300"
            >
              Urutkan Berdasarkan
            </label>
            <select
              id="mods-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortByOption)}
              className="w-full rounded-xl border border-white/[0.08] bg-[#16181e]/90 px-3.5 py-2.5 text-xs font-semibold text-white focus:border-[#22c55e] focus:outline-none cursor-pointer"
            >
              <option value="downloads">Jumlah unduhan</option>
              <option value="latest">Versi terbaru (1.21+)</option>
              <option value="name">Nama (A – Z)</option>
            </select>
          </div>

          {/* VERSI GAME */}
          <div className="space-y-2">
            <label
              htmlFor="mods-version-select"
              className="block text-xs font-bold uppercase tracking-wider text-neutral-300"
            >
              Versi Game
            </label>
            <select
              id="mods-version-select"
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

          {/* MOD LOADER PANEL */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#16181e]/85 backdrop-blur-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                Mod Loader
              </span>
              {loaderFilter !== 'all' && (
                <button
                  onClick={() => setLoaderFilter('all')}
                  className="text-[11px] font-semibold text-[#22c55e] hover:underline cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {LOADER_OPTIONS.map((loader) => {
                const isActive = loaderFilter === loader.id;
                return (
                  <button
                    key={loader.id}
                    onClick={() => setLoaderFilter(isActive ? 'all' : loader.id)}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'border-[#22c55e] bg-[#22c55e]/15 text-[#22c55e]'
                        : 'border-white/[0.05] bg-neutral-950/45 text-neutral-300 hover:border-white/15 hover:text-white'
                    }`}
                  >
                    {loader.icon}
                    <span>{loader.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* KATEGORI PANEL */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#16181e]/85 backdrop-blur-xl p-4 space-y-3">
            <button
              onClick={() => setIsCategoryExpanded((prev) => !prev)}
              className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Kategori</span>
              {isCategoryExpanded ? (
                <ChevronUp className="h-4 w-4 text-neutral-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-neutral-400" />
              )}
            </button>

            {isCategoryExpanded && (
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {CATEGORY_OPTIONS.map((cat) => {
                  const isActive = categoryFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategoryFilter(isActive ? 'all' : cat.id)}
                      className={`flex items-center gap-2 rounded-xl px-2.5 py-2 text-left text-xs font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#22c55e]/15 text-[#22c55e] font-semibold'
                          : 'text-neutral-300 hover:bg-white/[0.05] hover:text-white'
                      }`}
                    >
                      <span className="shrink-0 opacity-85">{cat.icon}</span>
                      <span className="truncate">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT WORKSPACE: Search Bar, Tren Spotlight, Koleksi & Mod Terbaru */}
        <div className="lg:col-span-8 xl:col-span-9 min-w-0 space-y-7">
          {/* Top Full-Width Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari modpack atau mod..."
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

          {/* SECTION 1: TREN SPOTLIGHT CAROUSEL */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg sm:text-xl font-extrabold text-white">
                <Flame className="h-5 w-5 text-orange-400" />
                <span>Tren</span>
              </h2>
              <span className="text-xs text-neutral-400 font-mono tabular-nums">
                {(spotlightIndex % spotlightItems.length) + 1} / {spotlightItems.length}
              </span>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#16181e]/85 backdrop-blur-xl overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 xl:grid-cols-12 items-stretch">
                {/* Main Featured Image Left */}
                <div className="xl:col-span-7 relative aspect-[16/10] xl:aspect-auto xl:min-h-[300px] bg-neutral-950 overflow-hidden group">
                  <SafeImage
                    src={heroImage}
                    alt={activeSpotlight.name}
                    className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15 pointer-events-none" />

                  {/* Prev / Next Arrows */}
                  <button
                    onClick={handlePrevSpotlight}
                    aria-label="Sorotan sebelumnya"
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 border border-white/15 text-white hover:bg-black/80 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNextSpotlight}
                    aria-label="Sorotan berikutnya"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 border border-white/15 text-white hover:bg-black/80 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Top-right gallery counter */}
                  <div className="absolute top-3 right-3 rounded-lg bg-black/60 border border-white/10 px-2 py-1 text-[11px] font-mono tabular-nums text-neutral-200 backdrop-blur-sm">
                    {activeThumbIndex + 1} / {activeSpotlight.previewImages.length}
                  </div>

                  {/* Overlay Title & Source Attribution */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#22c55e]">
                      <span>{activeSpotlight.source}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-neutral-300">
                        {activeSpotlight.kind === 'modpack' ? 'Modpack' : 'Mod'}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                      {activeSpotlight.name}
                    </h3>
                    <div className="text-xs text-neutral-300">
                      oleh <span className="font-semibold text-white">{activeSpotlight.author}</span>
                    </div>
                  </div>
                </div>

                {/* Right Gallery Thumbnails & Quick Action Panel */}
                <div className="xl:col-span-5 p-4 sm:p-5 flex flex-col justify-between gap-4 border-t xl:border-t-0 xl:border-l border-white/[0.08]">
                  {/* 2x2 Clickable Preview Thumbnails */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {activeSpotlight.previewImages.slice(0, 4).map((thumb, idx) => {
                      const isThumbActive = activeThumbIndex === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setActiveThumbIndex(idx)}
                          className={`relative aspect-[16/10] rounded-xl overflow-hidden border transition-all cursor-pointer ${
                            isThumbActive
                              ? 'border-[#22c55e] ring-2 ring-[#22c55e]/35'
                              : 'border-white/[0.08] opacity-75 hover:opacity-100'
                          }`}
                        >
                          <SafeImage
                            src={thumb}
                            alt={`${activeSpotlight.name} preview ${idx + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Summary & Unboxed Metadata */}
                  <div className="space-y-2.5">
                    <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
                      {activeSpotlight.summary}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-400">
                      <span className="capitalize text-neutral-200 font-semibold">
                        {activeSpotlight.loaders.join(' / ')}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{activeSpotlight.category.slice(0, 2).join(' · ')}</span>
                      <span aria-hidden="true">·</span>
                      <span>Lisensi {activeSpotlight.license}</span>
                    </div>
                  </div>

                  {/* Bottom Version / Downloads & Green Action */}
                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/[0.08]">
                    <div className="flex items-center gap-2.5 text-xs">
                      <span className="inline-flex items-center rounded-lg bg-[#22c55e]/20 border border-[#22c55e]/40 px-2.5 py-1 font-mono font-bold text-[#22c55e] tabular-nums">
                        {activeSpotlight.latestVersion}
                      </span>
                      <span className="font-mono font-bold text-neutral-300 tabular-nums">
                        {activeSpotlight.downloads} unduhan
                      </span>
                    </div>

                    <a
                      href={activeSpotlight.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] px-4 py-2 text-xs font-bold text-neutral-950 transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Telusuri</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Pagination Dots */}
            <div className="flex items-center justify-center gap-2">
              {spotlightItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSpotlightIndex(idx);
                    setActiveThumbIndex(0);
                  }}
                  aria-label={`Pilih sorotan ${item.name}`}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === spotlightIndex % spotlightItems.length
                      ? 'w-7 bg-[#22c55e]'
                      : 'w-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </section>

          {/* SECTION 2: DAFTAR MODPACK & MOD TERBARU */}
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Package className="h-5 w-5 text-[#22c55e]" />
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  Koleksi Modpack &amp; Mod Pilihan
                </h2>
                <span className="text-xs font-mono text-neutral-400 tabular-nums">
                  ({filteredMods.length})
                </span>
              </div>

              <button
                onClick={resetAllFilters}
                title="Muat ulang daftar filter"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#16181e]/85 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:border-white/20 hover:text-white transition-colors cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Segarkan</span>
              </button>
            </div>

            {filteredMods.length === 0 ? (
              <div className="rounded-2xl border border-white/[0.08] bg-[#16181e]/80 backdrop-blur-xl p-10 text-center space-y-3">
                <p className="text-sm font-semibold text-neutral-200">
                  Tidak ada modpack atau mod yang sesuai dengan kombinasi filter Anda.
                </p>
                <p className="text-xs text-neutral-400">
                  Coba ubah sumber, loader, atau versi game di panel samping kiri.
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
                {filteredMods.map((mod) => (
                  <div
                    key={mod.id}
                    className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#16181e]/80 backdrop-blur-xl p-4 hover:border-[#22c55e]/50 transition-colors space-y-3.5"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="h-12 w-12 rounded-xl border border-white/10 bg-neutral-950/80 overflow-hidden shrink-0 flex items-center justify-center">
                          <SafeImage
                            src={mod.iconUrl}
                            alt={mod.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-bold text-white group-hover:text-[#22c55e] transition-colors truncate">
                            {mod.name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mt-0.5 truncate">
                            <span>{mod.author}</span>
                            <span aria-hidden="true">·</span>
                            <span className="uppercase font-semibold text-neutral-300">
                              {mod.source}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
                        {mod.summary}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-neutral-400">
                        <span className="capitalize font-semibold text-neutral-200">
                          {mod.loaders.join(' / ')}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{mod.category.slice(0, 2).join(', ')}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-neutral-300">MC {mod.latestVersion}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-mono tabular-nums">
                        <Download className="h-3.5 w-3.5 text-neutral-400" />
                        <span>{mod.downloads}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={mod.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-neutral-950/60 p-2 text-neutral-300 hover:border-white/25 hover:text-white transition-colors"
                          title="Buka halaman proyek"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                        <a
                          href={mod.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] px-3.5 py-1.5 text-xs font-bold text-neutral-950 transition-colors whitespace-nowrap"
                        >
                          <span>Telusuri</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
