import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  ArrowLeft,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  LayoutGrid,
  LayoutList,
} from 'lucide-react';
import { LauncherItem } from '../data/launchers';
import { LauncherCard, LauncherTile } from './LauncherCard';
import { AppViewMode } from './Navbar';

interface DangerousPageProps {
  launchers: LauncherItem[];
  onNavigate: (view: AppViewMode) => void;
  onOpenDetail: (launcher: LauncherItem) => void;
  onOpenInvestigation: (launcher: LauncherItem) => void;
  onTriggerDownload: (launcher: LauncherItem) => void;
  onOpenSafetyChecklist: () => void;
}

export const DangerousPage: React.FC<DangerousPageProps> = ({
  launchers,
  onNavigate,
  onOpenDetail,
  onOpenInvestigation,
  onTriggerDownload,
  onOpenSafetyChecklist,
}) => {
  const [viewMode, setViewMode] = useState<'cards' | 'tiles'>('cards');

  const dangerousLaunchers = useMemo(() => {
    return launchers.filter((l) => l.category === 'dangerous');
  }, [launchers]);

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
              <ShieldAlert className="h-6 w-6 text-red-400 shrink-0" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Zona Bahaya: Investigasi &amp; Blacklist
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
              Daftar peluncur Minecraft Java yang di-blacklist komunitas global karena riwayat malware, spyware, pembajakan file hosts, atau kode tertutup mencurigakan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('non-licensed')}
              className="px-3.5 py-2 rounded-xl border border-white/[0.08] bg-[#16181e]/85 text-xs font-semibold text-sky-300 hover:border-sky-500/50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              <span>Alternatif XMCL / SK</span>
            </button>
            <button
              onClick={() => onNavigate('licensed')}
              className="px-3.5 py-2 rounded-xl border border-white/[0.08] bg-[#16181e]/85 text-xs font-semibold text-emerald-300 hover:border-emerald-500/50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Alternatif Resmi</span>
            </button>
            <div className="inline-flex items-center rounded-xl border border-white/[0.08] bg-[#16181e]/85 p-1 text-xs font-semibold">
              <button
                onClick={() => setViewMode('tiles')}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'tiles' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Ringkas</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'cards' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <LayoutList className="h-3.5 w-3.5" />
                <span>Detail</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Warning Alert Box */}
      <div className="rounded-2xl border border-red-700/60 bg-[#1f1316]/85 backdrop-blur-md p-5 sm:p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-900/70 text-red-200 border border-red-700 shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-red-100">
              Peringatan Keras Sebelum Memutuskan Mengunduh
            </h3>
            <p className="text-xs sm:text-sm text-red-200/85 leading-relaxed max-w-4xl">
              Mengklik launcher di bawah akan membuka <strong>Berkas Investigasi Format Wikipedia</strong> yang memaparkan bukti teknis, kronologi kontroversi, dan analisis keamanan.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenSafetyChecklist}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                <span>Cek Apakah PC Anda Terinfeksi</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <span className="text-xs text-red-300/90 font-medium">
                Ganti ke XMCL atau Prism Launcher untuk keamanan penuh.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Dangerous Launchers */}
      {viewMode === 'tiles' ? (
        <div className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {dangerousLaunchers.map((launcher) => (
            <LauncherTile
              key={launcher.id}
              launcher={launcher}
              onOpenDetails={onOpenDetail}
              onOpenInvestigation={onOpenInvestigation}
              onTriggerDownload={onTriggerDownload}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dangerousLaunchers.map((launcher) => (
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
