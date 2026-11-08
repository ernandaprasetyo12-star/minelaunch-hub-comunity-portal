import React, { useState } from 'react';
import { 
  ShieldAlert, Compass, User, LogOut, Sparkles, ShieldCheck, 
  BookOpen, Layers, BarChart3, Menu, X, Settings,
  ArrowLeft, Server
} from 'lucide-react';
import { UserProfile } from '../types/auth';

export type AppViewMode = 'home' | 'catalog' | 'licensed' | 'non-licensed' | 'dangerous' | 'servers' | 'mods' | 'about' | 'comparison';

interface NavbarProps {
  currentView: AppViewMode;
  onChangeView: (view: AppViewMode) => void;
  onOpenSafetyGuide: () => void;
  onOpenTour: () => void;
  onOpenLogin: () => void;
  onOpenSettings: (tab?: 'appearance' | 'profile' | 'android' | 'security') => void;
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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:px-6 lg:px-8">
        {/* Zone 1: Brand title wordmark & Back Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2 text-left text-base sm:text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-90 whitespace-nowrap shrink-0 group"
          >
            <img
              src="/assets/minelaunch_hub_logo.png"
              alt="MineLaunch Hub Logo"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg object-contain p-0.5 bg-neutral-900 shadow-sm ring-1 ring-emerald-500/40 group-hover:ring-emerald-400 transition-all shrink-0"
            />
            <div className="flex flex-col text-left leading-none">
              <div className="flex items-center gap-1">
                <span className="text-emerald-400 font-extrabold tracking-tight">MineLaunch</span>
                <span className="text-neutral-200 font-bold">Hub</span>
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-amber-400 font-semibold mt-0.5">
                Community Portal
              </span>
            </div>
          </button>

          {/* Dedicated Back Button when not on home */}
          {currentView !== 'home' && (
            <button
              onClick={() => handleNavigate('home')}
              className="inline-flex items-center gap-1 rounded-xl border border-emerald-500/60 bg-emerald-950/70 px-2.5 py-1 text-xs font-bold text-emerald-300 hover:bg-emerald-900/80 hover:text-white transition-all shadow-sm shrink-0"
              title="Kembali ke Beranda Utama"
            >
              <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
              <span>Kembali</span>
            </button>
          )}
        </div>

        {/* Zone 2: Navigation Links (neatly aligned, non-cropped) */}
        <nav className="hidden xl:flex items-center gap-2.5 text-[11px] 2xl:text-xs font-semibold text-neutral-300 overflow-x-auto py-1">
          <button
            onClick={() => handleNavigate('home')}
            className={`transition-colors whitespace-nowrap shrink-0 px-2 py-1 rounded-lg ${
              currentView === 'home'
                ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 font-bold'
                : 'hover:text-white hover:bg-neutral-900'
            }`}
          >
            Beranda
          </button>

          <button
            onClick={() => handleNavigate('catalog')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 px-2 py-1 rounded-lg ${
              currentView === 'catalog'
                ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 font-bold'
                : 'hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Layers className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span>Katalog Lengkap</span>
          </button>

          <button
            onClick={() => handleNavigate('licensed')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 px-2 py-1 rounded-lg ${
              currentView === 'licensed'
                ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 font-bold'
                : 'hover:text-white hover:bg-neutral-900'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span>Lisensi Resmi</span>
          </button>

          <button
            onClick={() => handleNavigate('non-licensed')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 px-2 py-1 rounded-lg ${
              currentView === 'non-licensed'
                ? 'text-sky-400 bg-sky-950/60 border border-sky-800/80 font-bold'
                : 'hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-sky-400" />
            <span>Non-Lisensi &amp; Ely.by</span>
          </button>

          <button
            onClick={() => handleNavigate('servers')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 px-2 py-1 rounded-lg ${
              currentView === 'servers'
                ? 'text-amber-300 bg-amber-950/60 border border-amber-800/80 font-bold'
                : 'text-amber-300 hover:text-amber-200 hover:bg-neutral-900'
            }`}
          >
            <Server className="h-3.5 w-3.5 shrink-0 text-amber-400" />
            <span>Server Indo 🇮🇩</span>
          </button>

          <button
            onClick={() => handleNavigate('mods')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 px-2 py-1 rounded-lg ${
              currentView === 'mods'
                ? 'text-orange-400 bg-orange-950/60 border border-orange-800/80 font-bold'
                : 'text-orange-400 hover:text-orange-300 hover:bg-neutral-900'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-orange-400" />
            <span>Mods &amp; Addons</span>
          </button>

          <button
            onClick={() => handleNavigate('dangerous')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 px-2 py-1 rounded-lg ${
              currentView === 'dangerous'
                ? 'text-red-400 bg-red-950/60 border border-red-800/80 font-bold'
                : 'text-red-400/80 hover:text-red-300 hover:bg-neutral-900'
            }`}
          >
            <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-red-400" />
            <span>Zona Bahaya</span>
          </button>

          <button
            onClick={() => handleNavigate('about')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 px-2 py-1 rounded-lg ${
              currentView === 'about'
                ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 font-bold'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span>Tentang Minecraft</span>
          </button>

          <button
            onClick={() => handleNavigate('comparison')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 px-2 py-1 rounded-lg ${
              currentView === 'comparison'
                ? 'text-purple-400 bg-purple-950/60 border border-purple-800/80 font-bold'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5 shrink-0 text-purple-400" />
            <span>Komparasi</span>
          </button>

          <button
            onClick={onOpenTour}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-neutral-200 transition-colors whitespace-nowrap shrink-0 px-2 py-1 rounded-lg hover:bg-neutral-900"
          >
            <Compass className="h-3.5 w-3.5 shrink-0 text-amber-400" />
            <span>Tour</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action (User profile or Login button) + Settings + Mobile Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          {user ? (
            <div 
              onClick={() => onOpenSettings('profile')}
              className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/90 px-2.5 py-1.5 cursor-pointer hover:border-emerald-500/60 transition-all group shrink-0"
              title="Edit Profil & Skin Avatar"
            >
              <img
                src={user.avatarUrl}
                alt={user.displayName}
                className="h-6 w-6 rounded-md bg-neutral-800 object-contain p-[1px] border border-neutral-700 group-hover:scale-105 transition-transform shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="text-left hidden md:block">
                <div className="text-xs font-bold text-white flex items-center gap-1 truncate max-w-[100px]">
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
                <div className="text-[9px] text-neutral-400 capitalize font-mono">
                  {user.provider}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLogout();
                }}
                title="Keluar Akun"
                className="p-1 text-neutral-400 hover:text-red-400 transition-colors shrink-0"
              >
                <LogOut className="h-3.5 w-3.5 shrink-0" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0"
            >
              <User className="h-3.5 w-3.5 shrink-0" />
              <span>Masuk Akun</span>
            </button>
          )}

          <button
            onClick={() => onOpenSettings('appearance')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-900/90 px-2.5 py-1.5 text-xs font-bold text-neutral-200 hover:border-emerald-500 hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
            title="Buka Pengaturan Tampilan & Blur XMCL"
          >
            <Settings className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span className="hidden sm:inline">Pengaturan</span>
          </button>

          <button
            onClick={onOpenSafetyGuide}
            className="hidden lg:inline-flex items-center gap-1.5 rounded-xl border border-red-900/80 bg-red-950/60 px-2.5 py-1.5 text-xs font-bold text-red-300 hover:bg-red-900/40 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <ShieldAlert className="h-3.5 w-3.5 text-red-400 shrink-0" />
            <span>Cek Keamanan</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white shrink-0"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5 shrink-0" /> : <Menu className="h-5 w-5 shrink-0" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-neutral-800 bg-neutral-950/98 backdrop-blur-xl px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
          <button
            onClick={() => handleNavigate('home')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              currentView === 'home' ? 'bg-emerald-950 border border-emerald-800 text-emerald-400' : 'text-neutral-300 hover:bg-neutral-900'
            }`}
          >
            Beranda Utama
          </button>

          <button
            onClick={() => handleNavigate('catalog')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2.5 ${
              currentView === 'catalog' ? 'bg-emerald-950 border border-emerald-800 text-emerald-400' : 'text-neutral-300 hover:bg-neutral-900'
            }`}
          >
            <Layers className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>Katalog Lengkap (Semua Launcher)</span>
          </button>

          <button
            onClick={() => handleNavigate('licensed')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2.5 ${
              currentView === 'licensed' ? 'bg-emerald-950 border border-emerald-800 text-emerald-400' : 'text-neutral-300 hover:bg-neutral-900'
            }`}
          >
            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>Launcher Lisensi Resmi (Microsoft)</span>
          </button>

          <button
            onClick={() => handleNavigate('non-licensed')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2.5 ${
              currentView === 'non-licensed' ? 'bg-sky-950 border border-sky-800 text-sky-400' : 'text-neutral-300 hover:bg-neutral-900'
            }`}
          >
            <Sparkles className="h-4 w-4 shrink-0 text-sky-400" />
            <span>Launcher Non-Lisensi &amp; Ely.by</span>
          </button>

          <button
            onClick={() => handleNavigate('servers')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2.5 ${
              currentView === 'servers' ? 'bg-amber-950 border border-amber-800 text-amber-300' : 'text-amber-300 hover:bg-neutral-900'
            }`}
          >
            <Server className="h-4 w-4 shrink-0 text-amber-400" />
            <span>Server Minecraft Indonesia 🇮🇩</span>
          </button>

          <button
            onClick={() => handleNavigate('mods')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2.5 ${
              currentView === 'mods' ? 'bg-orange-950 border border-orange-800 text-orange-400' : 'text-orange-400 hover:bg-neutral-900'
            }`}
          >
            <Sparkles className="h-4 w-4 shrink-0 text-orange-400" />
            <span>Mods &amp; Addons (Modrinth / CurseForge)</span>
          </button>

          <button
            onClick={() => handleNavigate('dangerous')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2.5 ${
              currentView === 'dangerous' ? 'bg-red-950 border border-red-800 text-red-400' : 'text-red-400 hover:bg-neutral-900'
            }`}
          >
            <ShieldAlert className="h-4 w-4 shrink-0 text-red-400" />
            <span>Zona Bahaya &amp; Blacklist</span>
          </button>

          <button
            onClick={() => handleNavigate('about')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2.5 ${
              currentView === 'about' ? 'bg-emerald-950 border border-emerald-800 text-emerald-400' : 'text-neutral-300 hover:bg-neutral-900'
            }`}
          >
            <BookOpen className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>Tentang Minecraft &amp; Lisensi</span>
          </button>

          <button
            onClick={() => handleNavigate('comparison')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2.5 ${
              currentView === 'comparison' ? 'bg-purple-950 border border-purple-800 text-purple-400' : 'text-neutral-300 hover:bg-neutral-900'
            }`}
          >
            <BarChart3 className="h-4 w-4 shrink-0 text-purple-400" />
            <span>Matriks Komparasi</span>
          </button>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenSettings('appearance');
            }}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2.5 text-emerald-400 hover:bg-neutral-900 border border-emerald-900/60 bg-emerald-950/20"
          >
            <Settings className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>Pengaturan Tampilan &amp; Blur XMCL</span>
          </button>

          <div className="pt-2 border-t border-neutral-800 flex gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSafetyGuide();
              }}
              className="flex-1 text-center px-3 py-2 rounded-xl text-xs font-bold bg-red-950/80 text-red-300 border border-red-900"
            >
              Cek Keamanan PC
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenTour();
              }}
              className="flex-1 text-center px-3 py-2 rounded-xl text-xs font-bold bg-neutral-900 text-neutral-200 border border-neutral-800"
            >
              Buka Tour
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
