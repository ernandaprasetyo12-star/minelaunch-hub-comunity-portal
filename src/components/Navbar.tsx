import React, { useState } from 'react';
import { 
  ShieldAlert, Compass, User, LogOut, Sparkles, ShieldCheck, 
  BookOpen, Layers, CheckSquare, BarChart3, Menu, X, Settings 
} from 'lucide-react';
import { UserProfile } from '../types/auth';
import { SafeImage } from './SafeImage';

export type AppViewMode = 'home' | 'catalog' | 'licensed' | 'non-licensed' | 'dangerous' | 'about' | 'comparison';

interface NavbarProps {
  currentView: AppViewMode;
  onChangeView: (view: AppViewMode) => void;
  onOpenSafetyGuide: () => void;
  onOpenTour: () => void;
  onOpenLogin: () => void;
  onOpenSettings: () => void;
  user: UserProfile | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onChangeView,
  onOpenSafetyGuide,
  onOpenTour,
  onOpenLogin,
  onOpenSettings,
  user,
  onLogout,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (view: AppViewMode) => {
    onChangeView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand title wordmark with authentic uploaded Minelaunch Hub logo */}
        <button
          onClick={() => handleNavigate('home')}
          className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-90 whitespace-nowrap shrink-0 group"
        >
          <img
            src="/assets/minelaunch_hub_logo.png"
            alt="MineLaunch Hub Community Logo"
            className="h-10 w-10 rounded-lg object-cover shadow-sm ring-1 ring-emerald-500/30 group-hover:ring-emerald-400 transition-all"
          />
          <div className="flex flex-col text-left leading-none">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-extrabold tracking-tight">MineLaunch</span>
              <span className="text-neutral-200 font-bold">Hub</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold mt-0.5">
              Community Portal
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (single-line, hover underlines) */}
        <nav className="hidden lg:flex items-center gap-4 text-xs font-semibold text-neutral-300">
          <button
            onClick={() => handleNavigate('home')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              currentView === 'home'
                ? 'text-emerald-400 underline underline-offset-4 decoration-emerald-500 font-bold'
                : 'hover:text-white'
            }`}
          >
            Beranda
          </button>

          <button
            onClick={() => handleNavigate('catalog')}
            className={`flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 py-1 ${
              currentView === 'catalog'
                ? 'text-emerald-400 underline underline-offset-4 decoration-emerald-500 font-bold'
                : 'hover:text-white'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Katalog Lengkap</span>
          </button>

          <button
            onClick={() => handleNavigate('licensed')}
            className={`flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 py-1 ${
              currentView === 'licensed'
                ? 'text-emerald-400 underline underline-offset-4 decoration-emerald-500 font-bold'
                : 'hover:text-white'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Lisensi Resmi</span>
          </button>

          <button
            onClick={() => handleNavigate('non-licensed')}
            className={`flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 py-1 ${
              currentView === 'non-licensed'
                ? 'text-sky-400 underline underline-offset-4 decoration-sky-500 font-bold'
                : 'hover:text-white'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            <span>Non-Lisensi & Ely.by</span>
          </button>

          <button
            onClick={() => handleNavigate('dangerous')}
            className={`flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 py-1 ${
              currentView === 'dangerous'
                ? 'text-red-400 underline underline-offset-4 decoration-red-500 font-bold'
                : 'text-red-400/80 hover:text-red-300'
            }`}
          >
            <ShieldAlert className="h-3.5 w-3.5 text-red-400" />
            <span>Zona Bahaya</span>
          </button>

          <button
            onClick={() => handleNavigate('about')}
            className={`flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 py-1 ${
              currentView === 'about'
                ? 'text-emerald-400 underline underline-offset-4 decoration-emerald-500 font-bold'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
            <span>Tentang Minecraft</span>
          </button>

          <button
            onClick={() => handleNavigate('comparison')}
            className={`flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 py-1 ${
              currentView === 'comparison'
                ? 'text-emerald-400 underline underline-offset-4 decoration-emerald-500 font-bold'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5 text-emerald-400" />
            <span>Komparasi</span>
          </button>

          <button
            onClick={onOpenTour}
            className="flex items-center gap-1 text-neutral-400 hover:text-neutral-200 transition-colors whitespace-nowrap shrink-0 py-1 ml-1"
          >
            <Compass className="h-3.5 w-3.5 text-amber-400" />
            <span>Tour</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (User profile or Login button) + Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          {user ? (
            <div className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/90 px-2.5 py-1.5">
              <img
                src={user.avatarUrl}
                alt={user.displayName}
                className="h-6 w-6 rounded-md bg-neutral-800 object-cover border border-neutral-700"
                referrerPolicy="no-referrer"
              />
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-white flex items-center gap-1 truncate max-w-[110px]">
                  <span>{user.username}</span>
                  {user.hasOfficialLicense && (
                    <span title="Lisensi Resmi Mojang">
                      <ShieldCheck className="h-3 w-3 text-emerald-400 shrink-0" />
                    </span>
                  )}
                  {user.hasElyBySkin && (
                    <span title="Akun Ely.by Aktif">
                      <Sparkles className="h-3 w-3 text-sky-400 shrink-0" />
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-neutral-400 capitalize">
                  {user.provider}
                </div>
              </div>
              <button
                onClick={onLogout}
                title="Keluar Akun"
                className="p-1 text-neutral-400 hover:text-red-400 transition-colors ml-1"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
            >
              <User className="h-3.5 w-3.5" />
              <span>Masuk Akun</span>
            </button>
          )}

          <button
            onClick={onOpenSettings}
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-900/90 px-2.5 py-1.5 text-xs font-semibold text-neutral-200 hover:border-emerald-500 hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
            title="Buka Pengaturan Tampilan & Blur XMCL"
          >
            <Settings className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Pengaturan</span>
          </button>

          <button
            onClick={onOpenSafetyGuide}
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-red-900/80 bg-red-950/60 px-2.5 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-900/40 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <ShieldAlert className="h-3.5 w-3.5 text-red-400" />
            <span>Cek Keamanan</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-800 bg-neutral-950 px-4 py-4 space-y-2">
          <button
            onClick={() => handleNavigate('home')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
              currentView === 'home' ? 'bg-emerald-950 text-emerald-400' : 'text-neutral-300 hover:bg-neutral-900'
            }`}
          >
            Beranda Utama
          </button>

          <button
            onClick={() => handleNavigate('catalog')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
              currentView === 'catalog' ? 'bg-emerald-950 text-emerald-400' : 'text-neutral-300 hover:bg-neutral-900'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Katalog Lengkap (Semua Launcher)</span>
          </button>

          <button
            onClick={() => handleNavigate('licensed')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
              currentView === 'licensed' ? 'bg-emerald-950 text-emerald-400' : 'text-neutral-300 hover:bg-neutral-900'
            }`}
          >
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Launcher Lisensi Resmi (Microsoft)</span>
          </button>

          <button
            onClick={() => handleNavigate('non-licensed')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
              currentView === 'non-licensed' ? 'bg-sky-950 text-sky-400' : 'text-neutral-300 hover:bg-neutral-900'
            }`}
          >
            <Sparkles className="h-4 w-4 text-sky-400" />
            <span>Launcher Non-Lisensi & Ely.by</span>
          </button>

          <button
            onClick={() => handleNavigate('dangerous')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
              currentView === 'dangerous' ? 'bg-red-950 text-red-400' : 'text-red-400 hover:bg-neutral-900'
            }`}
          >
            <ShieldAlert className="h-4 w-4 text-red-400" />
            <span>Zona Bahaya & Blacklist (TLauncher / Salwyrr)</span>
          </button>

          <button
            onClick={() => handleNavigate('about')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
              currentView === 'about' ? 'bg-emerald-950 text-emerald-400' : 'text-neutral-300 hover:bg-neutral-900'
            }`}
          >
            <BookOpen className="h-4 w-4 text-emerald-400" />
            <span>Tentang Minecraft & Lisensi</span>
          </button>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenSettings();
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 text-emerald-400 hover:bg-neutral-900 border border-emerald-900/50"
          >
            <Settings className="h-4 w-4" />
            <span>Pengaturan Tampilan & Blur XMCL</span>
          </button>

          <button
            onClick={() => handleNavigate('comparison')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
              currentView === 'comparison' ? 'bg-emerald-950 text-emerald-400' : 'text-neutral-300 hover:bg-neutral-900'
            }`}
          >
            <BarChart3 className="h-4 w-4 text-emerald-400" />
            <span>Matriks Komparasi</span>
          </button>

          <div className="pt-2 border-t border-neutral-800 flex gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSafetyGuide();
              }}
              className="flex-1 text-center px-3 py-2 rounded-lg text-xs font-semibold bg-red-950/80 text-red-300 border border-red-900"
            >
              Cek Keamanan PC
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenTour();
              }}
              className="flex-1 text-center px-3 py-2 rounded-lg text-xs font-semibold bg-neutral-900 text-neutral-200 border border-neutral-800"
            >
              Buka Tour
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
