import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  ShieldCheck,
  Sparkles,
  ShieldAlert,
  LayoutGrid,
  LayoutList,
} from 'lucide-react';
import { LauncherItem } from '../data/launchers';
import { LauncherCard, LauncherTile } from './LauncherCard';
import { AppViewMode } from './Navbar';

interface CatalogPageProps {
  launchers: LauncherItem[];
  onNavigate: (view: AppViewMode) => void;
  onOpenDetail: (launcher: LauncherItem) => void;
  onOpenInvestigation: (launcher: LauncherItem) => void;
  onTriggerDownload: (launcher: LauncherItem) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  launchers,
  onNavigate,
  onOpenDetail,
  onOpenInvestigation,
  onTriggerDownload,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState<'tiles' | 'cards'>('tiles');

  const filtered = useMemo(() => {
    return launchers
      .filter((l) => {
        if (categoryFilter !== 'all' && l.category !== categoryFilter) return false;
        if (platformFilter !== 'all' && !l.platforms.includes(platformFilter as any)) return false;
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchName = l.name.toLowerCase().includes(q);
          const matchDev = l.developer.toLowerCase().includes(q);
          const matchTag = l.tagline.toLowerCase().includes(q);
          const matchFeat = l.features.some((f) => f.toLowerCase().includes(q));
          if (!matchName && !matchDev && !matchTag && !matchFeat) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        return 0;
      });
  }, [launchers, categoryFilter, platformFilter, searchQuery, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Breadcrumb & Workbench Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div className="space-y-1.5">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Beranda</span>
          </button>
          <div className="flex items-center gap-2.5">
            <LayoutGrid className="h-6 w-6 text-[#22c55e] shrink-0" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Katalog Semua Launcher
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400">
            Menampilkan seluruh peluncur Minecraft Java Edition (Resmi, Non-Lisensi Ely.by, dan Blacklist).
          </p>
        </div>

        {/* Quick jump + View toggle */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold shrink-0">
          <button
            onClick={() => onNavigate('licensed')}
            className="px-3 py-2 rounded-xl border border-white/[0.08] bg-[#16181e]/85 text-neutral-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Lisensi Resmi</span>
          </button>
          <button
            onClick={() => onNavigate('non-licensed')}
            className="px-3 py-2 rounded-xl border border-white/[0.08] bg-[#16181e]/85 text-neutral-300 hover:text-sky-400 hover:border-sky-500/50 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            <span>Ely.by</span>
          </button>
          <button
            onClick={() => onNavigate('dangerous')}
            className="px-3 py-2 rounded-xl border border-white/[0.08] bg-[#16181e]/85 text-neutral-300 hover:text-red-400 hover:border-red-500/50 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldAlert className="h-3.5 w-3.5 text-red-400" />
            <span>Bahaya</span>
          </button>

          {/* Compact View Mode Toggle */}
          <div className="inline-flex items-center rounded-xl border border-white/[0.08] bg-[#16181e]/85 p-1">
            <button
              onClick={() => setViewMode('tiles')}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'tiles'
                  ? 'bg-[#22c55e] text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Tampilan Tile Ringkas"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Ringkas</span>
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-[#22c55e] text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Tampilan Kartu Detail"
            >
              <LayoutList className="h-3.5 w-3.5" />
              <span>Detail</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#16181e]/80 backdrop-blur-md p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter nama launcher, pengembang, atau fitur..."
              className="w-full rounded-xl border border-white/[0.08] bg-neutral-950/75 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:border-[#22c55e] focus:outline-none"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-neutral-950/75 px-3 py-2.5 text-xs sm:text-sm text-neutral-200 focus:border-[#22c55e] focus:outline-none"
            >
              <option value="all">Semua Kategori ({launchers.length})</option>
              <option value="licensed">Lisensi Resmi Mojang/Microsoft</option>
              <option value="non-licensed">Non-Lisensi &amp; Ely.by (Aman)</option>
              <option value="dangerous">Zona Bahaya &amp; Blacklist</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-neutral-950/75 px-3 py-2.5 text-xs sm:text-sm text-neutral-200 focus:border-[#22c55e] focus:outline-none"
            >
              <option value="all">Semua OS</option>
              <option value="windows">Windows</option>
              <option value="macos">macOS</option>
              <option value="linux">Linux</option>
              <option value="android">Android (HP)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-neutral-950/75 px-3 py-2.5 text-xs sm:text-sm text-neutral-200 focus:border-[#22c55e] focus:outline-none"
            >
              <option value="rating">Urutkan: Rating</option>
              <option value="name-asc">Nama: A - Z</option>
              <option value="name-desc">Nama: Z - A</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span>
            Menampilkan <strong className="text-white">{filtered.length}</strong> dari {launchers.length} launcher
          </span>
          {(searchQuery || categoryFilter !== 'all' || platformFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setPlatformFilter('all');
              }}
              className="text-[#22c55e] hover:underline font-semibold cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Grid of Launcher Tiles or Detail Cards */}
      {viewMode === 'tiles' ? (
        <div className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filtered.map((launcher, index) => (
            <LauncherTile
              key={launcher.id}
              launcher={launcher}
              isHighlighted={index === 0 && launcher.category !== 'dangerous'}
              onOpenDetails={onOpenDetail}
              onOpenInvestigation={onOpenInvestigation}
              onTriggerDownload={onTriggerDownload}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((launcher) => (
            <LauncherCard
              key={launcher.id}
              launcher={launcher}
              onOpenDetails={onOpenDetail}
              onOpenInvestigation={onOpenInvestigation}
              onTriggerDownload={onTriggerDownload}
            />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12 rounded-2xl border border-white/[0.08] bg-[#16181e]/75 text-neutral-400 text-sm">
          Tidak ditemukan launcher sesuai filter yang dipilih.
        </div>
      )}
    </div>
  );
};
