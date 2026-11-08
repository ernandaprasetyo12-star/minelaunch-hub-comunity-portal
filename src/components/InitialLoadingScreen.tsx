import React, { useEffect, useState } from 'react';
import { Sparkles, Terminal, Cpu, HardDrive } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface InitialLoadingScreenProps {
  onFinished: () => void;
  backgroundWallpaper?: string;
  backgroundBlur?: number;
  backgroundDim?: number;
}

export const InitialLoadingScreen: React.FC<InitialLoadingScreenProps> = ({ 
  onFinished,
  backgroundWallpaper = '/assets/images/mc_launchers_hero_1794042691092.jpg',
  backgroundBlur = 24,
  backgroundDim = 70,
}) => {
  const [progress, setProgress] = useState(15);
  const [statusMessage, setStatusMessage] = useState('Menginisialisasi engine XMCL Acrylic...');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(40);
      setStatusMessage('Memuat database lisensi Mojang & skin server Ely.by...');
    }, 350);

    const timer2 = setTimeout(() => {
      setProgress(75);
      setStatusMessage('Mengaudit database keamanan siber & blacklist komunitas...');
    }, 750);

    const timer3 = setTimeout(() => {
      setProgress(98);
      setStatusMessage('Memverifikasi katalog 30+ launcher (Pojav, XMCL, Prism)...');
    }, 1200);

    const timerFinish = setTimeout(() => {
      onFinished();
    }, 1600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timerFinish);
    };
  }, [onFinished]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-white select-none overflow-hidden px-4">
      {/* 
        XMCL ACRYLIC BLUR BACKGROUND 
        Persis tampilan X Minecraft Launcher: wallpaper burem dengan filter blur & dim
      */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-out scale-110"
        style={{
          backgroundImage: `url(${backgroundWallpaper})`,
          filter: `blur(${backgroundBlur}px)`,
          transform: 'scale(1.15)', // prevents white edges when blurred
        }}
      />
      {/* Dark Dim Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-black transition-opacity duration-300"
        style={{ opacity: backgroundDim / 100 }}
      />

      {/* Floating subtle voxel grid pattern */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Android Status Bar Fake for Mobile Vibe */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-2.5 text-[11px] font-mono text-neutral-400">
        <span className="font-semibold text-emerald-400">MineLaunch OS</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Cpu className="h-3 w-3 text-neutral-400" />
            <span>JVM 21</span>
          </span>
          <span className="flex items-center gap-1">
            <HardDrive className="h-3 w-3 text-neutral-400" />
            <span>Ready</span>
          </span>
        </div>
      </div>

      {/* Center Modal Card */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center space-y-6 rounded-3xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
        {/* Animated Authentic Logo with Glow */}
        <div className="relative group">
          <div className="relative flex items-center justify-center">
            <SafeImage
              src="/assets/minelaunch_hub_logo.png"
              alt="MineLaunch Hub Community Logo"
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover ring-2 ring-emerald-500/50 shadow-2xl shadow-emerald-500/30 transition-transform duration-300"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-900 border border-neutral-700 text-emerald-400 shadow-md">
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center justify-center gap-1.5">
            <span>MineLaunch</span>
            <span className="text-emerald-400">Hub</span>
          </h1>
          <p className="text-xs text-neutral-300/90 font-medium">
            XMCL Acrylic Interface & Direktori Java Edition
          </p>
        </div>

        {/* Custom Minecraft / Android Pill Progress Bar */}
        <div className="w-full space-y-2.5">
          <div className="h-2.5 w-full rounded-full bg-neutral-950/80 border border-white/10 p-0.5 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 transition-all duration-300 shadow-sm shadow-emerald-400/50"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-neutral-300">
            <span className="flex items-center gap-1.5 truncate text-left max-w-[220px]">
              <Terminal className="h-3 w-3 text-emerald-400 shrink-0" />
              <span className="truncate">{statusMessage}</span>
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
