import React, { useState, useMemo } from 'react';
import { Layers, ArrowLeft, Search, Filter, ShieldCheck, Sparkles, ShieldAlert } from 'lucide-react';
import { LauncherItem } from '../data/launchers';
import { LauncherCard } from './LauncherCard';
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

  const filtered = useMemo(() => {
    return launchers.filter((l) => {
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
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      return 0;
    });
  }, [launchers, categoryFilter, platformFilter, searchQuery, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumb & Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div className="space-y-1">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Beranda Utama</span>
          </button>
          <div className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-emerald-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Katalog Lengkap Semua Launcher Minecraft Java
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400">
            Menampilkan seluruh peluncur di dunia (Resmi, Non-Lisensi Ely.by, dan Blacklist Berbahaya).
          </p>
        </div>

        {/* Quick jump tabs */}
        <div className="flex items-center gap-2 text-xs font-semibold shrink-0">
          <button
            onClick={() => onNavigate('licensed')}
            className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-emerald-400 hover:border-emerald-800 transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Lisensi Resmi</span>
          </button>
          <button
            onClick={() => onNavigate('non-licensed')}
            className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-sky-400 hover:border-sky-800 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            <span>Non-Lisensi</span>
          </button>
          <button
            onClick={() => onNavigate('dangerous')}
            className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-red-400 hover:border-red-800 transition-all flex items-center gap-1.5"
          >
            <ShieldAlert className="h-3.5 w-3.5 text-red-400" />
            <span>Zona Bahaya</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search box */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama launcher, pengembang, atau fitur..."
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Category filter */}
          <div className="md:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs sm:text-sm text-neutral-200 focus:border-emerald-500 focus:outline-none"
            >
              <option value="all">Semua Kategori ({launchers.length})</option>
              <option value="licensed">Lisensi Resmi Mojang/Microsoft</option>
              <option value="non-licensed">Non-Lisensi & Ely.by (Aman)</option>
              <option value="dangerous">⚠️ Zona Bahaya & Blacklist</option>
            </select>
          </div>

          {/* OS filter */}
          <div className="md:col-span-2">
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs sm:text-sm text-neutral-200 focus:border-emerald-500 focus:outline-none"
            >
              <option value="all">Semua OS</option>
              <option value="windows">Windows</option>
              <option value="macos">macOS</option>
              <option value="linux">Linux</option>
              <option value="android">Android (HP)</option>
            </select>
          </div>

          {/* Sort */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs sm:text-sm text-neutral-200 focus:border-emerald-500 focus:outline-none"
            >
              <option value="rating">Urutkan: Rating Tertinggi</option>
              <option value="name-asc">Nama: A - Z</option>
              <option value="name-desc">Nama: Z - A</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
          <span>Menampilkan <strong className="text-white">{filtered.length}</strong> dari total {launchers.length} launcher</span>
          {(searchQuery || categoryFilter !== 'all' || platformFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setPlatformFilter('all');
              }}
              className="text-emerald-400 hover:underline"
            >
              Reset Semua Filter
            </button>
          )}
        </div>
      </div>

      {/* Grid of Launcher Cards */}
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
    </div>
  );
};
