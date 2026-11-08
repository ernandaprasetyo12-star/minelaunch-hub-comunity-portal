import React, { useState, useMemo } from 'react';
import { Sparkles, ArrowLeft, Search, CheckCircle2, ShieldCheck, Layers, ShieldAlert, HeartHandshake } from 'lucide-react';
import { LauncherItem } from '../data/launchers';
import { LauncherCard } from './LauncherCard';
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
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-sky-400 border border-sky-800">
                <Sparkles className="h-5 w-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Launcher Non-Lisensi: Bebas Biaya & Dukungan Ely.by
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
              Daftar peluncur Minecraft Java yang dapat dimainkan tanpa membeli lisensi Microsoft, namun <strong>100% bebas dari virus, spyware, dan adware</strong>. Mendukung sistem skin kustom gratis melalui server Ely.by atau LittleSkin.
            </p>
          </div>

          {/* Quick jump to other sections */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('licensed')}
              className="px-3.5 py-2 rounded-xl border border-emerald-900 bg-emerald-950/40 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/50 transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Lihat Lisensi Resmi</span>
            </button>
            <button
              onClick={() => onNavigate('dangerous')}
              className="px-3.5 py-2 rounded-xl border border-red-900 bg-red-950/40 text-xs font-semibold text-red-300 hover:bg-red-900/50 transition-all flex items-center gap-1.5"
            >
              <ShieldAlert className="h-3.5 w-3.5 text-red-400" />
              <span>Lihat Zona Bahaya</span>
            </button>
          </div>
        </div>
      </div>

      {/* Educational Banner: Apa Itu Ely.by & Mengapa Aman */}
      <div className="rounded-2xl border border-sky-900/60 bg-gradient-to-r from-sky-950/40 via-neutral-900 to-neutral-900 p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
          <HeartHandshake className="h-4 w-4" />
          <span>Mengapa Launcher di Halaman Ini Bebas Virus & Legal Digunakan?</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-neutral-300">
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-3.5 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
              <span>Sistem Skin Ely.by Bebas Biaya</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Ely.by adalah jaringan server autentikasi pihak ketiga yang menggantikan API skin Mojang, sehingga pemain non-lisensi tetap dapat memakai skin HD dan jubah keren tanpa membayar lisensi.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-3.5 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
              <span>Kode Terbuka (Open Source) & Diaudit</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Launcher seperti XMCL, FreeSM, HMCL, dan Legacy Launcher memiliki kode sumber terbuka di GitHub. Siapa pun dapat memeriksa bahwa tidak ada trojan atau spyware di dalamnya.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-3.5 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
              <span>Tidak Membajak File Hosts Windows</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Berbeda dengan TLauncher palsu yang merusak file hosts sistem operasi Anda, launcher di sini menghormati privasi dan keamanan sistem komputer Anda.
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
            placeholder="Cari XMCL, SKLauncher, FreeSM..."
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950 pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:border-sky-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs sm:text-sm text-neutral-200 focus:border-sky-500 focus:outline-none"
          >
            <option value="all">Semua Sistem Operasi</option>
            <option value="windows">Windows</option>
            <option value="macos">macOS</option>
            <option value="linux">Linux</option>
            <option value="android">Android (HP)</option>
          </select>
          <span className="text-xs text-neutral-400 whitespace-nowrap">
            {filtered.length} launcher aman
          </span>
        </div>
      </div>

      {/* Grid of Non-Licensed Launcher Cards */}
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
