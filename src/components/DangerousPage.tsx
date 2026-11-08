import React, { useState, useMemo } from 'react';
import { ShieldAlert, ArrowLeft, AlertTriangle, FileText, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Layers } from 'lucide-react';
import { LauncherItem } from '../data/launchers';
import { LauncherCard } from './LauncherCard';
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
  const dangerousLaunchers = useMemo(() => {
    return launchers.filter((l) => l.category === 'dangerous');
  }, [launchers]);

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
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-950 text-red-400 border border-red-800">
                <ShieldAlert className="h-5 w-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Zona Bahaya: Investigasi & Blacklist Launcher Minecraft
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
              Daftar peluncur Minecraft Java yang <strong>TIDAK DISARANKAN</strong> atau telah di-blacklist oleh komunitas global karena riwayat malware, spyware, pembajakan file hosts sistem, kepengurusan ilegal, atau kode tertutup yang mencurigakan.
            </p>
          </div>

          {/* Quick jump to safe alternatives */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('non-licensed')}
              className="px-3.5 py-2 rounded-xl border border-sky-900 bg-sky-950/40 text-xs font-semibold text-sky-300 hover:bg-sky-900/50 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              <span>Alternatif Aman (XMCL / SK)</span>
            </button>
            <button
              onClick={() => onNavigate('licensed')}
              className="px-3.5 py-2 rounded-xl border border-emerald-900 bg-emerald-950/40 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/50 transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Alternatif Resmi (Prism)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Critical Warning Alert Box */}
      <div className="rounded-2xl border-2 border-red-700/80 bg-gradient-to-r from-red-950/80 via-neutral-900 to-neutral-950 p-6 space-y-4 shadow-xl shadow-red-950/40">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-900/80 text-red-200 border border-red-700 shrink-0">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-red-100">
              Peringatan Keras Sebelum Memutuskan Mengunduh
            </h3>
            <p className="text-xs sm:text-sm text-red-200/90 leading-relaxed max-w-4xl">
              Jika Anda mengklik tombol unduh pada launcher di bawah, sistem kami akan <strong>secara otomatis menampilkan Berkas Investigasi Format Wikipedia</strong> terlebih dahulu untuk memaparkan bukti teknis, kronologi kontroversi, dan analisis keamanan agar Anda tidak menjadi korban malware.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenSafetyChecklist}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-900 text-xs font-bold text-white hover:bg-red-800 transition-colors"
              >
                <span>Cek Apakah PC Anda Sudah Terinfeksi</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <span className="text-xs text-red-400 font-medium">
                Solusi aman: Hapus launcher bermasalah dan ganti ke XMCL atau Prism Launcher.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Dangerous Launchers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dangerousLaunchers.map((launcher) => (
          <div key={launcher.id} className="relative">
            <LauncherCard
              launcher={launcher}
              onOpenDetails={onOpenDetail}
              onOpenInvestigation={onOpenInvestigation}
              onTriggerDownload={onTriggerDownload}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
