import React, { useState } from 'react';
import { 
  X, ShieldAlert, CheckCircle2, AlertTriangle, Terminal, 
  Trash2, ShieldCheck, ArrowRight, ExternalLink 
} from 'lucide-react';

interface SafetyChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSafeAlternative: (id: string) => void;
}

export const SafetyChecklistModal: React.FC<SafetyChecklistModalProps> = ({
  isOpen,
  onClose,
  onSelectSafeAlternative,
}) => {
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  if (!isOpen) return null;

  const toggleStep = (step: number) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [step]: !prev[step],
    }));
  };

  const steps = [
    {
      id: 1,
      title: 'Cek Apakah TLauncher Terinstal di Komputer',
      desc: 'Buka Control Panel > Programs and Features, cari program bernama "TLauncher". Jika ada, lakukan Uninstall sekarang juga.',
      command: 'Control Panel > Uninstall a Program',
    },
    {
      id: 2,
      title: 'Hapus Sisa Cache & Eksekusi di Folder %appdata%',
      desc: 'Tekan tombol Windows + R, ketik %appdata% lalu tekan Enter. Cari folder bernama ".tlauncher" dan hapus seluruh folder tersebut.',
      command: '%appdata%\\.tlauncher',
    },
    {
      id: 3,
      title: 'Periksa File Hosts Windows dari Pembajakan DNS',
      desc: 'TLauncher dilaporkan menyuntikkan pengalihan domain ke file hosts. Buka Notepad dengan mode "Run as Administrator", lalu buka file C:\\Windows\\System32\\drivers\\etc\\hosts. Pastikan tidak ada baris yang mencantumkan nama domain ely.by, mojang.com, atau tlaun.ch.',
      command: 'C:\\Windows\\System32\\drivers\\etc\\hosts',
    },
    {
      id: 4,
      title: 'Jalankan Full Scan Antivirus',
      desc: 'Buka Windows Security (Windows Defender) > Virus & threat protection > Scan options > Full scan untuk mendeteksi apakah ada payload mencurigakan yang tertinggal.',
      command: 'Windows Defender Full Scan',
    },
    {
      id: 5,
      title: 'Ganti ke Launcher yang Diaudit Bebas Virus',
      desc: 'Gunakan launcher resmi berlisensi (Prism / Official) atau launcher non-lisensi aman (XMCL / SKLauncher / Legacy Launcher buatan Turikhay asli).',
      command: 'Rekomendasi: XMCL / Legacy Launcher',
    },
  ];

  const completedCount = Object.values(checkedSteps).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-950 text-red-400 border border-red-800/80">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                Checklist Keamanan PC dari Launcher Berbahaya
              </h2>
              <div className="text-xs text-neutral-400">
                Langkah mandiri mendeteksi dan membersihkan malware/spyware
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 text-xs sm:text-sm">
          {/* Progress Banner */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/80 p-4 flex items-center justify-between gap-4">
            <div>
              <div className="font-semibold text-white">Status Pemeriksaan Sistem Anda:</div>
              <div className="text-xs text-neutral-400 mt-0.5">
                {completedCount} dari {steps.length} langkah selesai dilakukan
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-lg font-bold text-emerald-400">
                {Math.round((completedCount / steps.length) * 100)}%
              </span>
            </div>
          </div>

          {/* Interactive Steps */}
          <div className="space-y-3">
            {steps.map((step) => {
              const isDone = !!checkedSteps[step.id];
              return (
                <div
                  key={step.id}
                  onClick={() => toggleStep(step.id)}
                  className={`rounded-xl border p-4 cursor-pointer transition-all ${
                    isDone
                      ? 'border-emerald-800/80 bg-emerald-950/20'
                      : 'border-neutral-800 bg-neutral-950/40 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => {}}
                      className="mt-1 h-4 w-4 rounded border-neutral-700 bg-neutral-900 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`font-bold text-xs sm:text-sm ${isDone ? 'text-emerald-300 line-through' : 'text-white'}`}>
                          {step.title}
                        </span>
                        <span className="font-mono text-[11px] text-neutral-500">
                          #{step.id}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {step.desc}
                      </p>
                      <div className="inline-flex items-center gap-1.5 rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5 font-mono text-[11px] text-emerald-400">
                        <Terminal className="h-3 w-3" />
                        <span>{step.command}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Recommendations */}
          <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/30 p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              <span>Sudah Bersih? Pilih Launcher Aman Berikutnya</span>
            </div>
            <p className="text-xs text-neutral-300">
              Jangan ulangi mengunduh dari situs tlauncher.org. Pilihlah launcher open-source yang terverifikasi aman oleh komunitas:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => {
                  onClose();
                  onSelectSafeAlternative('legacy-launcher');
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors shadow-sm"
              >
                <span>Legacy Launcher (TL Asli Turikhay)</span>
                <ArrowRight className="h-3 w-3" />
              </button>
              <button
                onClick={() => {
                  onClose();
                  onSelectSafeAlternative('xmcl');
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition-colors"
              >
                <span>XMCL (Dukungan Ely.by Penuh)</span>
                <ArrowRight className="h-3 w-3" />
              </button>
              <button
                onClick={() => {
                  onClose();
                  onSelectSafeAlternative('prism-launcher');
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition-colors"
              >
                <span>Prism Launcher (Resmi)</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-800 bg-neutral-950 px-5 py-3 flex items-center justify-between text-xs text-neutral-400">
          <span>Panduan Keamanan Mandiri Komunitas Minecraft</span>
          <button
            onClick={onClose}
            className="text-neutral-300 hover:text-white font-medium"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
