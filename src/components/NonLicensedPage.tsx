import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ArrowLeft,
  Search,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  HeartHandshake,
  LayoutGrid,
  LayoutList,
} from 'lucide-react';
import { LauncherItem } from '../data/launchers';
import { LauncherCard, LauncherTile } from './LauncherCard';
import { AppViewMode } from './Navbar';

interface NonLicensedPageProps {
  launchers: LauncherItem[];
  onNavigate: (view: AppViewMode) => void;
  onOpenDetail: (launcher: LauncherItem) => void;
  onOpenInvestigation: (launcher: LauncherItem) => void;
  onTriggerDownload: (launcher: LauncherItem) => void;
}

export const NonLicensedPage: React.FC<NonLicensedPageProps> = ({
  launchers,
  onNavigate,
  onOpenDetail,
  onOpenInvestigation,
  onTriggerDownload,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'cards' | 'tiles'>('cards');

  const nonLicensedLaunchers = useMemo(() => {
    return launchers.filter((l) => l.category === 'non-licensed');
  }, [launchers]);

  const filtered = useMemo(() => {
    return nonLicensedLaunchers.filter((l) => {
      if (platformFilter !== 'all' && !l.platforms.includes(platformFilter as any)) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = l.name.toLowerCase().includes(q);
        const matchDev = l.developer.toLowerCase().includes(q);
        const matchFeat = l.features.some((f) => f.toLowerCase().includes(q));
        if (!matchName && !matchDev && !matchFeat) return false;
      }
      return true;
    });
  }, [nonLicensedLaunchers, platformFilter, searchQuery]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Header & Breadcrumb */}
      <div className="space-y-4 border-b border-white/[0.08] pb-6">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-6 w-6 text-sky-400 shrink-0" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Launcher Non-Lisensi &amp; Dukungan Ely.by
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
              Peluncur Minecraft Java yang dapat dimainkan tanpa lisensi Microsoft, <strong>bebas spyware dan adware</strong>, serta mendukung skin kustom gratis melalui server Ely.by atau LittleSkin.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('licensed')}
              className="px-3.5 py-2 rounded-xl border border-white/[0.08] bg-[#16181e]/85 text-xs font-semibold text-emerald-300 hover:border-emerald-500/50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Lisensi Resmi</span>
            </button>
            <button
              onClick={() => onNavigate('dangerous')}
              className="px-3.5 py-2 rounded-xl border border-white/[0.08] bg-[#16181e]/85 text-xs font-semibold text-red-300 hover:border-red-500/50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldAlert className="h-3.5 w-3.5 text-red-400" />
              <span>Zona Bahaya</span>
            </button>
            <div className="inline-flex items-center rounded-xl border border-white/[0.08] bg-[#16181e]/85 p-1 text-xs font-semibold">
              <button
                onClick={() => setViewMode('tiles')}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'tiles' ? 'bg-[#22c55e] text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Ringkas</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'cards' ? 'bg-[#22c55e] text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <LayoutList className="h-3.5 w-3.5" />
                <span>Detail</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Banner */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#16181e]/80 backdrop-blur-md p-5 sm:p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
          <HeartHandshake className="h-4 w-4" />
          <span>Mengapa Launcher di Halaman Ini Bebas Virus &amp; Aman?</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-neutral-300">
          <div className="rounded-xl border border-white/[0.06] bg-neutral-950/50 p-3.5 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
              <span>Sistem Skin Ely.by Gratis</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Ely.by menggantikan server skin Mojang secara sah agar pemain non-lisensi tetap bisa memakai skin HD dan jubah keren.
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-neutral-950/50 p-3.5 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
              <span>Open Source &amp; Diaudit</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Launcher seperti XMCL, FreeSM, HMCL, dan Legacy Launcher memiliki kode sumber terbuka di GitHub yang diaudit komunitas.
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-neutral-950/50 p-3.5 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
              <span>Tidak Membajak File Hosts</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Menghormati privasi sistem operasi Windows, macOS, Linux, maupun Android tanpa memodifikasi konfigurasi jaringan.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter XMCL, SKLauncher, FreeSM..."
            className="w-full rounded-xl border border-white/[0.08] bg-[#16181e]/85 backdrop-blur-md pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:border-sky-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="flex-1 sm:flex-none rounded-xl border border-white/[0.08] bg-[#16181e]/85 px-3 py-2.5 text-xs sm:text-sm text-neutral-200 focus:border-sky-500 focus:outline-none"
          >
            <option value="all">Semua Sistem Operasi</option>
            <option value="windows">Windows</option>
            <option value="macos">macOS</option>
            <option value="linux">Linux</option>
            <option value="android">Android (HP)</option>
          </select>
          <span className="text-xs text-neutral-400 whitespace-nowrap font-mono">
            {filtered.length} launcher aman
          </span>
        </div>
      </div>

      {/* Grid of Non-Licensed Launchers */}
      {viewMode === 'tiles' ? (
        <div className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filtered.map((launcher, idx) => (
            <LauncherTile
              key={launcher.id}
              launcher={launcher}
              isHighlighted={idx === 0}
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
    </div>
  );
};
