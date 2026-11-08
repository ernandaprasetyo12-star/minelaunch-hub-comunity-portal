import React, { useEffect, useState } from 'react';
import { 
  Download, X, ShieldCheck, CheckCircle2, ExternalLink, 
  FileText, HardDrive, RefreshCw, ArrowLeft 
} from 'lucide-react';
import { LauncherItem } from '../data/launchers';
import { SafeImage } from './SafeImage';

interface MineLaunchDownloadModalProps {
  launcher: LauncherItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenInvestigation?: (launcher: LauncherItem) => void;
}

export const MineLaunchDownloadModal: React.FC<MineLaunchDownloadModalProps> = ({
  launcher,
  isOpen,
  onClose,
  onOpenInvestigation,
}) => {
  const [downloadState, setDownloadState] = useState<'preparing' | 'downloading' | 'completed'>('preparing');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen && launcher) {
      setDownloadState('preparing');
      setProgress(0);

      // Simulate preparation progress bar
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setDownloadState('downloading');
            // Trigger actual download link from official release
            window.open(launcher.downloadUrl, '_blank');
            setTimeout(() => setDownloadState('completed'), 1000);
            return 100;
          }
          return prev + 25;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isOpen, launcher]);

  if (!isOpen || !launcher) return null;

  const getFileName = (item: LauncherItem) => {
    const cleanName = item.name.replace(/[^a-zA-Z0-9]/g, '_');
    if (item.platforms.includes('android')) return `${cleanName}_MineLaunch_Setup.apk`;
    if (item.platforms.includes('windows')) return `${cleanName}_MineLaunch_Setup.exe`;
    return `${cleanName}_MineLaunch_Installer.zip`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-3xl border border-emerald-500/40 bg-neutral-900 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800">
              <Download className="h-5 w-5 animate-bounce" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Pusat Unduhan MineLaunch Hub</span>
              </h2>
              <p className="text-[11px] text-neutral-400">
                Terverifikasi Aman & Langsung dari Sumber Resmi Developer
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {/* Launcher Info Card */}
          <div className="flex items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
            <div className="h-16 w-16 rounded-xl overflow-hidden bg-neutral-900 shrink-0 border border-neutral-800">
              <SafeImage src={launcher.image} alt={launcher.name} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white truncate">{launcher.name}</h3>
                <span className="text-[10px] font-bold bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 shrink-0">
                  {launcher.category === 'licensed' ? 'Lisensi Resmi' : 'Ely.by / Free'}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">Oleh {launcher.developer}</p>
              <div className="text-[11px] text-neutral-300 font-mono mt-1 flex items-center gap-1">
                <HardDrive className="h-3 w-3 text-emerald-400" />
                <span className="truncate">{getFileName(launcher)}</span>
              </div>
            </div>
          </div>

          {/* Download Progress Status */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-white flex items-center gap-1.5">
                {downloadState === 'preparing' && <RefreshCw className="h-3.5 w-3.5 text-amber-400 animate-spin" />}
                {downloadState === 'downloading' && <Download className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />}
                {downloadState === 'completed' && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                <span>
                  {downloadState === 'preparing' && 'Menyiapkan Berkas Unduhan di MineLaunch Hub...'}
                  {downloadState === 'downloading' && 'Memulai Unduhan Resmi di Browser...'}
                  {downloadState === 'completed' && 'Unduhan Berhasil Dimulai!'}
                </span>
              </span>
              <span className="text-emerald-400 font-mono">{progress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full rounded-full bg-neutral-900 overflow-hidden border border-neutral-800">
              <div 
                className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Berkas diunduh langsung dari server cermin resmi ({launcher.developer}). Bebas iklan pop-up dan virus.
            </p>
          </div>

          {/* Verification Badge */}
          <div className="rounded-xl border border-emerald-900/50 bg-emerald-950/20 p-3 flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-emerald-300">Jaminan Keamanan MineLaunch Hub</div>
              <div className="text-neutral-300 text-[11px] mt-0.5">
                Skor Keamanan: <strong>{launcher.safetyRating.score}% ({launcher.safetyRating.label})</strong>. Tautan diperiksa secara berkala.
              </div>
            </div>
          </div>

          {/* Manual Download Fallback & Actions */}
          <div className="space-y-2 pt-1">
            <button
              onClick={() => window.open(launcher.downloadUrl, '_blank')}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-950"
            >
              <Download className="h-4 w-4" />
              <span>Klik di Sini Jika Unduhan Tidak Berjalan Otomatis</span>
            </button>

            <div className="flex items-center justify-between gap-2 pt-2 text-xs">
              <a
                href="https://www.virustotal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:underline flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Cek Berkas di VirusTotal</span>
              </a>

              <button
                onClick={onClose}
                className="inline-flex items-center gap-1 text-neutral-400 hover:text-white font-semibold"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Kembali ke Hub</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
