import React from 'react';
import { 
  ChevronLeft, 
  Home, 
  Menu, 
  Settings, 
  Layers, 
  ShieldAlert, 
  Sparkles, 
  ShieldCheck, 
  Compass,
  Square,
  Circle,
  Triangle
} from 'lucide-react';
import { AppViewMode } from './Navbar';
import { AppSettings } from '../types/settings';

interface AndroidSystemBarProps {
  currentView: AppViewMode;
  onNavigate: (view: AppViewMode) => void;
  onOpenSettings: () => void;
  settings: AppSettings;
}

export const AndroidSystemBar: React.FC<AndroidSystemBarProps> = ({
  currentView,
  onNavigate,
  onOpenSettings,
  settings,
}) => {
  if (settings.androidNavbarStyle === 'hidden') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center pointer-events-none select-none">
      {/* Quick Action Navigation Dock (Android Pill Launcher Style) */}
      <div className="pointer-events-auto mb-1.5 flex items-center gap-1 sm:gap-2 rounded-full border border-white/10 bg-neutral-900/80 px-3 py-1.5 shadow-2xl backdrop-blur-2xl">
        <button
          onClick={() => onNavigate('home')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            currentView === 'home'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
              : 'text-neutral-300 hover:text-white hover:bg-white/10'
          }`}
          title="Beranda"
        >
          <Home className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Beranda</span>
        </button>

        <button
          onClick={() => onNavigate('catalog')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            currentView === 'catalog'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
              : 'text-neutral-300 hover:text-white hover:bg-white/10'
          }`}
          title="Katalog Semua Launcher"
        >
          <Layers className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Katalog</span>
        </button>

        <button
          onClick={() => onNavigate('licensed')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            currentView === 'licensed'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
              : 'text-neutral-300 hover:text-white hover:bg-white/10'
          }`}
          title="Lisensi Resmi Mojang"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Resmi</span>
        </button>

        <button
          onClick={() => onNavigate('non-licensed')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            currentView === 'non-licensed'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-950'
              : 'text-neutral-300 hover:text-white hover:bg-white/10'
          }`}
          title="Non-Lisensi & Ely.by"
        >
          <Sparkles className="h-3.5 w-3.5 text-sky-400" />
          <span className="hidden sm:inline">Ely.by</span>
        </button>

        <button
          onClick={() => onNavigate('dangerous')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            currentView === 'dangerous'
              ? 'bg-red-600 text-white shadow-md shadow-red-950'
              : 'text-red-400 hover:text-white hover:bg-red-950/40'
          }`}
          title="Zona Bahaya & Blacklist"
        >
          <ShieldAlert className="h-3.5 w-3.5 text-red-400" />
          <span className="hidden sm:inline">Bahaya</span>
        </button>

        <div className="h-4 w-px bg-neutral-700/60 mx-1" />

        <button
          onClick={onOpenSettings}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold text-neutral-300 hover:text-emerald-400 hover:bg-white/10 transition-all"
          title="Buka Pengaturan Tampilan & Blur XMCL"
        >
          <Settings className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-[11px] font-bold">Opsi</span>
        </button>
      </div>

      {/* Android Bottom Bar (Gestures or 3-Button Navigation) */}
      <div className="pointer-events-auto w-full bg-neutral-950/80 backdrop-blur-md border-t border-neutral-900/60 py-1 flex items-center justify-center">
        {settings.androidNavbarStyle === '3-buttons' ? (
          <div className="flex items-center justify-around w-full max-w-xs text-neutral-500 py-1">
            {/* Back Button */}
            <button
              onClick={() => onNavigate('home')}
              className="p-2 hover:text-white active:scale-90 transition-all"
              title="Kembali"
            >
              <Triangle className="h-4 w-4 -rotate-90 fill-current" />
            </button>
            {/* Home Button */}
            <button
              onClick={() => onNavigate('home')}
              className="p-2 hover:text-white active:scale-90 transition-all"
              title="Beranda"
            >
              <Circle className="h-4 w-4 fill-current" />
            </button>
            {/* Recents Button */}
            <button
              onClick={() => onNavigate('catalog')}
              className="p-2 hover:text-white active:scale-90 transition-all"
              title="Katalog Launcher"
            >
              <Square className="h-4 w-4 fill-current" />
            </button>
          </div>
        ) : (
          /* Gesture Bar Line (Android 14 / Material 3 Gesture Pill) */
          <div 
            onClick={() => onNavigate('home')}
            className="my-1 h-1.5 w-36 rounded-full bg-neutral-600/70 hover:bg-white active:scale-95 transition-all cursor-pointer"
            title="Android Gesture Bar (Ketuk untuk ke Beranda)"
          />
        )}
      </div>
    </div>
  );
};
