import React, { useState, useMemo } from 'react';
import { ShieldCheck, ArrowLeft, Search, CheckCircle2, Lock, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { LauncherItem } from '../data/launchers';
import { LauncherCard } from './LauncherCard';
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header & Breadcrumb */}
      <div className="space-y-4 border-b border-neutral-800 pb-6">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Beranda Utama</span>
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Launcher Minecraft Java: Lisensi Resmi (Microsoft)
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
              Koleksi launcher yang mewajibkan kepemilikan akun Minecraft resmi yang dibeli melalui minecraft.net atau langganan Xbox Game Pass PC. Menjamin keamanan akun tingkat tertinggi dan akses ke server multiplayer resmi seperti Hypixel.
            </p>
          </div>

          {/* Quick jump to other sections */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('non-licensed')}
              className="px-3.5 py-2 rounded-xl border border-sky-900 bg-sky-950/40 text-xs font-semibold text-sky-300 hover:bg-sky-900/50 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              <span>Lihat Non-Lisensi (Ely.by)</span>
            </button>
            <button
              onClick={() => onNavigate('catalog')}
              className="px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-semibold text-neutral-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Semua Kategori</span>
            </button>
          </div>
        </div>
      </div>

      {/* Educational Banner: Apa Itu Lisensi Resmi & Mengapa Aman */}
      <div className="rounded-2xl border border-emerald-900/60 bg-gradient-to-r from-emerald-950/40 via-neutral-900 to-neutral-900 p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span>Fakta Keamanan Launcher Berlisensi Resmi</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-neutral-300">
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-3.5 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Autentikasi OAuth2 Microsoft</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Login dilakukan langsung di jendela browser resmi Microsoft. Launcher pihak ketiga seperti Prism dan Modrinth tidak pernah menyimpan kata sandi Anda.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-3.5 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Akses Penuh Server Global</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Dapat bermain di server besar dunia (Hypixel, 2b2t, TubNet) yang mewajibkan verifikasi online-mode=true oleh server autentikasi Mojang.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-3.5 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Skin & Jubah Resmi</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Skin dan jubah (cape) Anda terlihat oleh seluruh jutaan pemain di dunia tanpa memerlukan modifikasi client khusus.
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
            placeholder="Cari launcher berlisensi..."
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950 pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs sm:text-sm text-neutral-200 focus:border-emerald-500 focus:outline-none"
          >
            <option value="all">Semua Sistem Operasi</option>
            <option value="windows">Windows</option>
            <option value="macos">macOS</option>
            <option value="linux">Linux</option>
          </select>
          <span className="text-xs text-neutral-400 whitespace-nowrap">
            {filtered.length} launcher resmi
          </span>
        </div>
      </div>

      {/* Grid of Licensed Launcher Cards */}
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
