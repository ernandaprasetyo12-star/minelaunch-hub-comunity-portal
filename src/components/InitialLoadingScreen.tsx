import React, { useEffect, useState } from 'react';
import { ShieldCheck, Sparkles, Terminal } from 'lucide-react';

interface InitialLoadingScreenProps {
  onFinished: () => void;
}

export const InitialLoadingScreen: React.FC<InitialLoadingScreenProps> = ({ onFinished }) => {
  const [progress, setProgress] = useState(15);
  const [statusMessage, setStatusMessage] = useState('Menginisialisasi direktori launcher...');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(45);
      setStatusMessage('Memuat database lisensi Mojang & server Ely.by...');
    }, 400);

    const timer2 = setTimeout(() => {
      setProgress(78);
      setStatusMessage('Mengaudit database keamanan siber & blacklist komunitas...');
    }, 900);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatusMessage('Memverifikasi katalog 30+ launcher dunia...');
    }, 1400);

    const timerFinish = setTimeout(() => {
      onFinished();
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timerFinish);
    };
  }, [onFinished]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950 text-white select-none px-4">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/50 via-neutral-950 to-neutral-950 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center space-y-6">
        {/* Animated Authentic Logo with Pulse Glow */}
        <div className="relative group">
          <div className="relative flex items-center justify-center">
            <img
              src="/assets/minelaunch_hub_logo.png"
              alt="MineLaunch Hub Community Logo"
              className="h-28 w-28 rounded-2xl object-cover ring-2 ring-emerald-500/50 shadow-2xl shadow-emerald-500/30 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-900 border border-neutral-700 text-emerald-400 shadow-md">
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
            <span>MineLaunch</span>
            <span className="text-emerald-400">Hub</span>
          </h1>
          <p className="text-xs text-neutral-400">
            Direktori Lengkap Launcher Minecraft Java Edition & Panduan Keamanan
          </p>
        </div>

        {/* Custom Minecraft Style Progress Bar */}
        <div className="w-full space-y-2">
          <div className="h-2.5 w-full rounded-full bg-neutral-900 border border-neutral-800 p-0.5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300 shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-neutral-400">
            <span className="flex items-center gap-1.5 truncate">
              <Terminal className="h-3 w-3 text-emerald-400 shrink-0" />
              <span>{statusMessage}</span>
            </span>
            <span className="font-mono font-bold text-emerald-400 shrink-0 ml-2">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
