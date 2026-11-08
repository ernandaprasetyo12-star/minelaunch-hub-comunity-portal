import React from 'react';
import { LauncherItem } from '../data/launchers';
import { 
  X, Download, ExternalLink, ShieldCheck, AlertTriangle, 
  CheckCircle2, XCircle, Github, Monitor, HardDrive, Cpu, 
  FileText
} from 'lucide-react';

interface LauncherDetailModalProps {
  launcher: LauncherItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenInvestigation: (launcher: LauncherItem) => void;
}

export const LauncherDetailModal: React.FC<LauncherDetailModalProps> = ({
  launcher,
  isOpen,
  onClose,
  onOpenInvestigation,
}) => {
  if (!isOpen || !launcher) return null;

  const isDangerous = launcher.category === 'dangerous';
  const isLicensed = launcher.category === 'licensed';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-3xl rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-5 py-3.5">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="font-semibold text-white">{launcher.name}</span>
            <span aria-hidden="true">·</span>
            <span>Spesifikasi & Unduhan</span>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Hero Banner / Preview */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
            <img
              src={launcher.image}
              alt={`Tampilan software ${launcher.name}`}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-2xl font-bold text-white drop-shadow-md">
                {launcher.name}
              </h2>
              <p className="text-xs text-neutral-300 mt-1 max-w-xl">
                {launcher.tagline}
              </p>
            </div>
          </div>

          {/* DANGEROUS WARNING CALLOUT */}
          {isDangerous && (
            <div className="rounded-xl border-2 border-red-600 bg-red-950/50 p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-red-200">
                <AlertTriangle className="h-5 w-5 text-red-400 shrink-0" />
                <span>Peringatan Keamanan Kritis Komunitas</span>
              </div>
              <p className="text-xs text-red-300/90 leading-relaxed">
                Launcher ini memiliki riwayat dugaan spyware, manipulasi file hosts Windows, dan terdeteksi oleh mesin antivirus. Disarankan tidak mengunduh launcher ini.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenInvestigation(launcher);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-red-500 transition-colors shadow-sm"
              >
                <FileText className="h-4 w-4" />
                <span>Buka Investigasi Wikipedia TLauncher Lengkap</span>
              </button>
            </div>
          )}

          {/* License & Authentication Requirements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Box 1: License Status */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Kebutuhan Lisensi Minecraft
              </div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                {isLicensed ? (
                  <>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs">✓</span>
                    <span>Wajib Akun Microsoft Resmi</span>
                  </>
                ) : (
                  <>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-950 text-sky-400 border border-sky-800 text-xs">✓</span>
                    <span>Bisa Tanpa Beli (Gratis / Offline)</span>
                  </>
                )}
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {launcher.licenseExplanation}
              </p>
            </div>

            {/* Box 2: Ely.by & Offline Support */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-4 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Dukungan Ely.by & Skin Gratis
              </div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                {launcher.elyBySupport ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <span className="text-emerald-300">Didukung Penuh</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-neutral-500" />
                    <span className="text-neutral-400">Tidak Didukung (Hanya Skin Resmi Mojang)</span>
                  </>
                )}
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {launcher.elyBySupport
                  ? 'Mendukung sinkronisasi skin dan jubah kustom Ely.by secara otomatis tanpa perlu mod tambahan.'
                  : 'Hanya menggunakan server skin resmi Microsoft/Mojang. Skin pemain Ely.by tidak akan tampil otomatis.'}
              </p>
            </div>
          </div>

          {/* Description Prose */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Penjelasan Lengkap
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {launcher.description}
            </p>
          </div>

          {/* Hardware & System Requirements */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
              Kebutuhan Sistem & Spesifikasi
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="space-y-1">
                <div className="text-neutral-400 flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5" />
                  <span>Min RAM</span>
                </div>
                <div className="font-semibold text-white font-mono">{launcher.minRam}</div>
              </div>

              <div className="space-y-1">
                <div className="text-neutral-400 flex items-center gap-1.5">
                  <Monitor className="h-3.5 w-3.5" />
                  <span>Platform</span>
                </div>
                <div className="font-semibold text-white uppercase">{launcher.platforms.join(', ')}</div>
              </div>

              <div className="space-y-1">
                <div className="text-neutral-400 flex items-center gap-1.5">
                  <HardDrive className="h-3.5 w-3.5" />
                  <span>Lisensi Kode</span>
                </div>
                <div className="font-semibold text-white">{launcher.isOpenSource ? 'Open Source' : 'Proprietary'}</div>
              </div>

              <div className="space-y-1">
                <div className="text-neutral-400 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Rating</span>
                </div>
                <div className="font-semibold text-amber-400 font-mono">★ {launcher.rating.toFixed(1)} / 5.0</div>
              </div>
            </div>
          </div>

          {/* Pros and Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pros */}
            <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/10 p-4 space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                <span>Kelebihan</span>
              </div>
              <ul className="space-y-1.5 text-xs text-neutral-300">
                {launcher.pros.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-4 space-y-2">
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <XCircle className="h-4 w-4 text-neutral-400" />
                <span>Kekurangan / Catatan</span>
              </div>
              <ul className="space-y-1.5 text-xs text-neutral-400">
                {launcher.cons.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Download Strip */}
          <div className="pt-4 border-t border-neutral-800 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Tautan Unduhan & Website Pengembang:
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {isDangerous ? (
                <button
                  onClick={() => {
                    onClose();
                    onOpenInvestigation(launcher);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-red-500 transition-colors shadow-sm"
                >
                  <FileText className="h-4 w-4" />
                  <span>Buka Investigasi Lengkap Kenapa Berbahaya</span>
                </button>
              ) : (
                <>
                  <a
                    href={launcher.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-sm"
                  >
                    <Download className="h-4 w-4" />
                    <span>Unduh di Situs Resmi ({launcher.name})</span>
                  </a>

                  <a
                    href={launcher.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3.5 py-2.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 hover:text-white transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Website</span>
                  </a>

                  {launcher.githubUrl && (
                    <a
                      href={launcher.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3.5 py-2.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 hover:text-white transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
