import React, { useEffect } from 'react';
import { AlertTriangle, ShieldAlert, X, CheckCircle2, XCircle } from 'lucide-react';

interface DangerWarningConfirmModalProps {
  isOpen: boolean;
  targetName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DangerWarningConfirmModal: React.FC<DangerWarningConfirmModalProps> = ({
  isOpen,
  targetName,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="danger-warning-title"
      onClick={onCancel}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border-2 border-red-500/60 bg-neutral-900 shadow-2xl shadow-red-950/50 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Warning Header */}
        <div className="flex items-center justify-between border-b border-red-900/60 bg-gradient-to-r from-red-950/90 via-neutral-900 to-amber-950/40 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-500/20 border border-red-500/50 text-red-400">
              <AlertTriangle className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-red-400">
                Peringatan Keamanan
              </div>
              <h2 id="danger-warning-title" className="text-base font-extrabold text-white">
                Zona Investigasi Bahaya
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Tutup peringatan"
            className="rounded-xl p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Warning Body */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="rounded-2xl border border-amber-700/60 bg-amber-950/30 p-4 text-xs sm:text-sm text-amber-100 leading-relaxed flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <p>
                Halaman {targetName ? <strong>{targetName}</strong> : <strong>Investigasi Bahaya</strong>} berisi dokumentasi launcher berisiko tinggi (malware, adware, manipulasi file hosts, dan software tidak resmi yang masuk daftar hitam komunitas).
              </p>
              <p className="text-amber-300/90 text-xs">
                Informasi ini disediakan khusus untuk edukasi dan pencegahan agar perangkat Anda tetap aman.
              </p>
            </div>
          </div>

          <p className="text-center text-sm sm:text-base font-bold text-white pt-1">
            Apakah Anda yakin ingin melanjutkan?
          </p>

          {/* Action Buttons: Tidak & Ya */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 px-4 py-3 text-sm font-bold text-neutral-200 transition-colors cursor-pointer"
            >
              <XCircle className="h-4 w-4 text-neutral-400" />
              <span>Tidak</span>
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 hover:bg-red-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-red-950/50 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Ya</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
