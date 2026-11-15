import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  ArrowLeft,
  Search,
  CheckCircle2,
  Lock,
  Sparkles,
  Layers,
  LayoutGrid,
  LayoutList,
} from 'lucide-react';
import { LauncherItem } from '../data/launchers';
import { LauncherCard, LauncherTile } from './LauncherCard';
import { AppViewMode } from './Navbar';

interface LicensedPageProps {
  launchers: LauncherItem[];
  onNavigate: (view: AppViewMode) => void;
  onOpenDetail: (launcher: LauncherItem) => void;
  onOpenInvestigation: (launcher: LauncherItem) => void;
  onTriggerDownload: (launcher: LauncherItem) => void;
}

export const LicensedPage: React.FC<LicensedPageProps> = ({
  launchers,
  onNavigate,
  onOpenDetail,
  onOpenInvestigation,
  onTriggerDownload,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'cards' | 'tiles'>('cards');

  const licensedLaunchers = useMemo(() => {
    return launchers.filter((l) => l.category === 'licensed');
  }, [launchers]);

  const filtered = useMemo(() => {
    return licensedLaunchers.filter((l) => {
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
  }, [licensedLaunchers, platformFilter, searchQuery]);

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
              <ShieldCheck className="h-6 w-6 text-[#22c55e] shrink-0" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Launcher Lisensi Resmi (Microsoft)
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
              Koleksi launcher yang menggunakan autentikasi akun Minecraft resmi dari Microsoft / Game Pass PC dengan keamanan tingkat tertinggi dan akses server resmi global.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('non-licensed')}
              className="px-3.5 py-2 rounded-xl border border-white/[0.08] bg-[#16181e]/85 text-xs font-semibold text-sky-300 hover:border-sky-500/50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              <span>Non-Lisensi (Ely.by)</span>
            </button>
            <button
              onClick={() => onNavigate('catalog')}
              className="px-3.5 py-2 rounded-xl border border-white/[0.08] bg-[#16181e]/85 text-xs font-semibold text-neutral-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Semua Kategori</span>
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

      {/* Educational Acrylic Panel */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#16181e]/80 backdrop-blur-md p-5 sm:p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span>Fakta Keamanan Launcher Berlisensi Resmi</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-neutral-300">
          <div className="rounded-xl border border-white/[0.06] bg-neutral-950/50 p-3.5 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Autentikasi OAuth2 Microsoft</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Login langsung via jendela resmi Microsoft; launcher seperti Prism dan Modrinth tidak pernah menyimpan kata sandi Anda.
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-neutral-950/50 p-3.5 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Akses Penuh Server Global</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Dapat bermain di server besar dunia (Hypixel, 2b2t, TubNet) yang mewajibkan verifikasi online-mode=true.
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-neutral-950/50 p-3.5 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Skin &amp; Jubah Resmi</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Skin dan jubah Anda terlihat oleh seluruh pemain di dunia tanpa memerlukan modifikasi client tambahan.
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
            placeholder="Filter launcher berlisensi..."
            className="w-full rounded-xl border border-white/[0.08] bg-[#16181e]/85 backdrop-blur-md pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:border-[#22c55e] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="flex-1 sm:flex-none rounded-xl border border-white/[0.08] bg-[#16181e]/85 px-3 py-2.5 text-xs sm:text-sm text-neutral-200 focus:border-[#22c55e] focus:outline-none"
          >
            <option value="all">Semua Sistem Operasi</option>
            <option value="windows">Windows</option>
            <option value="macos">macOS</option>
            <option value="linux">Linux</option>
          </select>
          <span className="text-xs text-neutral-400 whitespace-nowrap font-mono">
            {filtered.length} launcher
          </span>
        </div>
      </div>

      {/* Grid of Licensed Launchers */}
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
