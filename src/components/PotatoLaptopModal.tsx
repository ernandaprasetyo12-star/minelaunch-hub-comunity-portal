import React from 'react';
import { Cpu, X, ShieldCheck, Sparkles, Download, ArrowRight, CheckCircle2 } from 'lucide-react';
import { LAUNCHERS, LauncherItem } from '../data/launchers';
import { SafeImage } from './SafeImage';

interface PotatoLaptopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDetail: (launcher: LauncherItem) => void;
  onNavigate: (view: 'licensed' | 'non-licensed' | 'catalog') => void;
}

export const PotatoLaptopModal: React.FC<PotatoLaptopModalProps> = ({
  isOpen,
  onClose,
  onOpenDetail,
  onNavigate,
}) => {
  if (!isOpen) return null;

  // Filter lightweight / low RAM launchers (< 2GB RAM required)
  const officialLight = LAUNCHERS.filter(
    (l) => l.category === 'licensed' && (l.minRam.includes('1') || l.minRam.includes('2'))
  );
  const nonLicensedLight = LAUNCHERS.filter(
    (l) => l.category === 'non-licensed' && (l.minRam.includes('1') || l.minRam.includes('1.5') || l.minRam.includes('2'))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl rounded-3xl border border-amber-500/40 bg-neutral-900/95 shadow-2xl backdrop-blur-2xl flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4 bg-neutral-950/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <Cpu className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Rekomendasi Khusus Laptop Kentang (Low-End PC)</span>
                <span className="text-[10px] bg-amber-950 text-amber-400 px-2 py-0.5 rounded-full border border-amber-800 font-mono">
                  Super Ringan & Hemat RAM
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Pilihan launcher paling efisien untuk RAM 2GB - 4GB tanpa ngelag
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Section 1: Resmi (Official) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Pilihan Resmi Berlisensi (Paling Ringan)</span>
              </h3>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('licensed');
                }}
                className="text-xs text-emerald-400 hover:underline"
              >
                Lihat Semua Resmi →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {officialLight.slice(0, 2).map((launcher) => (
                <div 
                  key={launcher.id}
                  onClick={() => {
                    onClose();
                    onOpenDetail(launcher);
                  }}
                  className="group cursor-pointer rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4 hover:border-emerald-500/60 hover:bg-neutral-900 transition-all flex items-center gap-3"
                >
                  <div className="h-14 w-14 rounded-xl overflow-hidden bg-neutral-900 shrink-0 border border-neutral-700">
                    <SafeImage src={launcher.image} alt={launcher.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300 truncate">
                      {launcher.name}
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">
                      RAM Minimal: <strong className="text-emerald-400">{launcher.minRam}</strong>
                    </div>
                    <div className="text-[10px] text-neutral-500 truncate mt-0.5">
                      {launcher.tagline}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Non-Lisensi via Ely.by */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Pilihan Via Ely.by & Offline (Super Enteng & Bebas Virus)</span>
              </h3>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('non-licensed');
                }}
                className="text-xs text-sky-400 hover:underline"
              >
                Lihat Semua Ely.by →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {nonLicensedLight.slice(0, 3).map((launcher) => (
                <div 
                  key={launcher.id}
                  onClick={() => {
                    onClose();
                    onOpenDetail(launcher);
                  }}
                  className="group cursor-pointer rounded-2xl border border-neutral-800 bg-neutral-950/60 p-3.5 hover:border-sky-500/60 hover:bg-neutral-900 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800">
                      <SafeImage src={launcher.image} alt={launcher.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-sky-300 truncate">
                        {launcher.name}
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        RAM Minimal: <strong className="text-sky-400">{launcher.minRam}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] text-sky-400 font-semibold">
                    <span>Detail Spek</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips for Potato PC */}
          <div className="rounded-2xl border border-amber-900/40 bg-amber-950/30 p-4 space-y-2">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              💡 Tips Tambahan untuk Laptop Kentang:
            </h4>
            <ul className="text-xs text-neutral-300 space-y-1 list-disc list-inside">
              <li>Gunakan mod optimasi performa seperti <strong className="text-white">Sodium</strong> (untuk Fabric) atau <strong className="text-white">Embeddium</strong> (untuk Forge) untuk mendongkrak FPS hingga 3x lipat.</li>
              <li>Alokasikan RAM secukupnya (misal 2GB dari total 4GB) agar sistem operasi tidak kehabisan memori.</li>
              <li>Hindari menggunakan shaderpack berat; gunakan resolusi tekstur default 16x16.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-neutral-800 px-6 py-3.5 bg-neutral-950">
          <span className="text-xs text-neutral-400">
            Rekomendasi diuji pada perangkat low-end 2024-2026
          </span>
          <button
            onClick={onClose}
            className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-500 transition-colors"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
