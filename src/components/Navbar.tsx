import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldAlert, Compass, User, LogOut, Sparkles, ShieldCheck,
  BookOpen, Layers, BarChart3, Menu, X, Settings,
  ArrowLeft, Server, MessageSquare, Crown, ChevronDown, MoreHorizontal, Home
} from 'lucide-react';
import { UserProfile } from '../types/auth';
import { resolvePublicAssetUrl } from '../utils/assetUrl';

export type AppViewMode =
  | 'home'
  | 'catalog'
  | 'licensed'
  | 'non-licensed'
  | 'dangerous'
  | 'servers'
  | 'mods'
  | 'chat'
  | 'about'
  | 'comparison';

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

type DesktopDropdown = 'launchers' | 'more' | null;

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
  const [openDropdown, setOpenDropdown] = useState<DesktopDropdown>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (view: AppViewMode) => {
    onChangeView(view);
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isLauncherGroupActive =
    currentView === 'catalog' ||
    currentView === 'licensed' ||
    currentView === 'non-licensed' ||
    currentView === 'comparison';

  const isMoreGroupActive =
    currentView === 'dangerous' || currentView === 'about';

  return (
    <header
      ref={navContainerRef}
      className="sticky top-0 z-40 w-full border-b border-neutral-800/90 bg-neutral-950/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand & Contextual Back Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2.5 text-left transition-opacity hover:opacity-90 whitespace-nowrap shrink-0 group cursor-pointer"
          >
            <img
              src={resolvePublicAssetUrl('/assets/minelaunch_hub_logo.png')}
              alt="MineLaunch Hub Logo"
              className="h-9 w-9 rounded-xl object-contain p-0.5 bg-neutral-900 shadow-sm ring-1 ring-emerald-500/40 group-hover:ring-emerald-400 transition-all shrink-0"
            />
            <div className="flex flex-col text-left leading-none">
              <div className="flex items-center gap-1 text-base font-extrabold tracking-tight">
                <span className="text-emerald-400">MineLaunch</span>
                <span className="text-neutral-100">Hub</span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-amber-400/90 font-semibold mt-0.5">
                Community Portal
              </span>
            </div>
          </button>

          {currentView !== 'home' && (
            <button
              onClick={() => handleNavigate('home')}
              className="hidden sm:inline-flex items-center gap-1 rounded-xl border border-emerald-500/50 bg-emerald-950/60 px-2.5 py-1 text-xs font-bold text-emerald-300 hover:bg-emerald-900/70 hover:text-white transition-all shrink-0 cursor-pointer"
              title="Kembali ke Beranda Utama"
            >
              <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
              <span>Kembali</span>
            </button>
          )}
        </div>

        {/* Zone 2: Spacious, Uncrowded Center Navigation with Option Menus */}
        <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-neutral-300">
          <button
            onClick={() => handleNavigate('home')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
              currentView === 'home'
                ? 'text-emerald-300 bg-emerald-950/70 border border-emerald-700/80 font-bold'
                : 'hover:text-white hover:bg-neutral-900/90'
            }`}
          >
            <Home className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>Beranda</span>
          </button>

          {/* Dropdown 1: Launcher Options */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === 'launchers' ? null : 'launchers')
              }
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                isLauncherGroupActive || openDropdown === 'launchers'
                  ? 'text-emerald-300 bg-emerald-950/70 border border-emerald-700/80 font-bold'
                  : 'hover:text-white hover:bg-neutral-900/90'
              }`}
            >
              <Layers className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>Launcher</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-neutral-400 transition-transform duration-150 ${
                  openDropdown === 'launchers' ? 'rotate-180 text-emerald-400' : ''
                }`}
              />
            </button>

            {openDropdown === 'launchers' && (
              <div className="absolute left-0 mt-2 w-64 rounded-2xl border border-neutral-800 bg-neutral-900/98 backdrop-blur-xl p-2 shadow-2xl space-y-1 z-50">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  Kategori Launcher
                </div>
                <button
                  onClick={() => handleNavigate('catalog')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                    currentView === 'catalog'
                      ? 'bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-800/70'
                      : 'text-neutral-200 hover:bg-neutral-800/80'
                  }`}
                >
                  <Layers className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div>
                    <div>Katalog Lengkap</div>
                    <div className="text-[10px] text-neutral-400 font-normal">Semua 30+ launcher Java</div>
                  </div>
                </button>

                <button
                  onClick={() => handleNavigate('licensed')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                    currentView === 'licensed'
                      ? 'bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-800/70'
                      : 'text-neutral-200 hover:bg-neutral-800/80'
                  }`}
                >
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div>
                    <div>Lisensi Resmi</div>
                    <div className="text-[10px] text-neutral-400 font-normal">Akun Microsoft / Mojang</div>
                  </div>
                </button>

                <button
                  onClick={() => handleNavigate('non-licensed')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                    currentView === 'non-licensed'
                      ? 'bg-sky-950/80 text-sky-300 font-bold border border-sky-800/70'
                      : 'text-neutral-200 hover:bg-neutral-800/80'
                  }`}
                >
                  <Sparkles className="h-4 w-4 text-sky-400 shrink-0" />
                  <div>
                    <div>Non-Lisensi &amp; Ely.by</div>
                    <div className="text-[10px] text-neutral-400 font-normal">Skin kustom &amp; offline aman</div>
                  </div>
                </button>

                <button
                  onClick={() => handleNavigate('comparison')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                    currentView === 'comparison'
                      ? 'bg-purple-950/80 text-purple-300 font-bold border border-purple-800/70'
                      : 'text-neutral-200 hover:bg-neutral-800/80'
                  }`}
                >
                  <BarChart3 className="h-4 w-4 text-purple-400 shrink-0" />
                  <div>
                    <div>Matriks Komparasi</div>
                    <div className="text-[10px] text-neutral-400 font-normal">Bandingkan fitur &amp; keamanan</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavigate('servers')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
              currentView === 'servers'
                ? 'text-amber-300 bg-amber-950/70 border border-amber-700/80 font-bold'
                : 'text-amber-300/90 hover:text-amber-200 hover:bg-neutral-900/90'
            }`}
          >
            <Server className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span>Server Indo</span>
          </button>

          <button
            onClick={() => handleNavigate('mods')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
              currentView === 'mods'
                ? 'text-orange-300 bg-orange-950/70 border border-orange-700/80 font-bold'
                : 'text-orange-300/90 hover:text-orange-200 hover:bg-neutral-900/90'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-orange-400 shrink-0" />
            <span>Mods</span>
          </button>

          <button
            onClick={() => handleNavigate('chat')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
              currentView === 'chat'
                ? 'text-teal-300 bg-teal-950/70 border border-teal-700/80 font-bold'
                : 'text-teal-300/90 hover:text-teal-200 hover:bg-neutral-900/90'
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5 text-teal-400 shrink-0" />
            <span>Live Chat</span>
          </button>

          {/* Dropdown 2: Security, Info & Tools Options */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'more' ? null : 'more')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                isMoreGroupActive || openDropdown === 'more'
                  ? currentView === 'dangerous'
                    ? 'text-red-300 bg-red-950/70 border border-red-800/80 font-bold'
                    : 'text-emerald-300 bg-emerald-950/70 border border-emerald-700/80 font-bold'
                  : 'hover:text-white hover:bg-neutral-900/90'
              }`}
            >
              <MoreHorizontal className="h-4 w-4 text-neutral-400 shrink-0" />
              <span>Lainnya</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-neutral-400 transition-transform duration-150 ${
                  openDropdown === 'more' ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>

            {openDropdown === 'more' && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-neutral-800 bg-neutral-900/98 backdrop-blur-xl p-2 shadow-2xl space-y-1 z-50">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  Keamanan &amp; Panduan
                </div>

                <button
                  onClick={() => handleNavigate('dangerous')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                    currentView === 'dangerous'
                      ? 'bg-red-950/80 text-red-300 font-bold border border-red-800/70'
                      : 'text-red-300 hover:bg-red-950/50'
                  }`}
                >
                  <ShieldAlert className="h-4 w-4 text-red-400 shrink-0" />
                  <div>
                    <div>Investigasi Bahaya</div>
                    <div className="text-[10px] text-red-400/80 font-normal">Blacklist malware &amp; spyware</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setOpenDropdown(null);
                    onOpenSafetyGuide();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs text-neutral-200 hover:bg-neutral-800/80 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0" />
                  <div>
                    <div>Cek Keamanan PC</div>
                    <div className="text-[10px] text-neutral-400 font-normal">Checklist audit sistem</div>
                  </div>
                </button>

                <button
                  onClick={() => handleNavigate('about')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                    currentView === 'about'
                      ? 'bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-800/70'
                      : 'text-neutral-200 hover:bg-neutral-800/80'
                  }`}
                >
                  <BookOpen className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div>
                    <div>Tentang Minecraft</div>
                    <div className="text-[10px] text-neutral-400 font-normal">Edukasi lisensi &amp; arsitektur</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setOpenDropdown(null);
                    onOpenTour();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs text-neutral-200 hover:bg-neutral-800/80 transition-colors cursor-pointer"
                >
                  <Compass className="h-4 w-4 text-sky-400 shrink-0" />
                  <div>
                    <div>Panduan Tour</div>
                    <div className="text-[10px] text-neutral-400 font-normal">Tur interaktif fitur portal</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: User Profile, Settings & Mobile Toggle */}
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
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-white flex items-center gap-1 truncate max-w-[110px]">
                  <span className="truncate">{user.username}</span>
                  {user.role === 'admin' && (
                    <span title="Admin Terverifikasi">
                      <Crown className="h-3 w-3 text-amber-400 shrink-0" />
                    </span>
                  )}
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
                <div className="text-[9px] text-neutral-400 font-mono flex items-center gap-1">
                  <span className={user.role === 'admin' ? 'text-amber-400 font-bold' : ''}>
                    {user.role === 'admin' ? 'ADMIN' : 'USER'}
                  </span>
                  <span>·</span>
                  <span className="capitalize">{user.provider}</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLogout();
                }}
                title="Keluar Akun"
                className="p-1 text-neutral-400 hover:text-red-400 transition-colors shrink-0 cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5 shrink-0" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <User className="h-3.5 w-3.5 shrink-0" />
              <span>Masuk</span>
            </button>
          )}

          <button
            onClick={() => onOpenSettings('appearance')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/90 p-2 sm:px-2.5 sm:py-2 text-xs font-bold text-neutral-200 hover:border-emerald-500 hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Pengaturan Tampilan & Profil"
            aria-label="Buka Pengaturan"
          >
            <Settings className="h-4 w-4 text-emerald-400 shrink-0" />
            <span className="hidden xl:inline">Pengaturan</span>
          </button>

          {/* Mobile & Tablet menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white shrink-0 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5 shrink-0" /> : <Menu className="h-5 w-5 shrink-0" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-800 bg-neutral-950/98 backdrop-blur-xl px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
          <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
            Menu Utama
          </div>

          <button
            onClick={() => handleNavigate('home')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2.5 ${
              currentView === 'home' ? 'bg-emerald-950 border border-emerald-800 text-emerald-400' : 'text-neutral-300 hover:bg-neutral-900'
            }`}
          >
            <Home className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>Beranda Utama</span>
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
            onClick={() => handleNavigate('chat')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2.5 ${
              currentView === 'chat' ? 'bg-teal-950 border border-teal-800 text-teal-300' : 'text-teal-300 hover:bg-neutral-900'
            }`}
          >
            <MessageSquare className="h-4 w-4 shrink-0 text-teal-400" />
            <span>Live Chat Komunitas (Real-Time)</span>
          </button>

          <div className="px-2 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
            Kategori Launcher
          </div>

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
            onClick={() => handleNavigate('comparison')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2.5 ${
              currentView === 'comparison' ? 'bg-purple-950 border border-purple-800 text-purple-400' : 'text-neutral-300 hover:bg-neutral-900'
            }`}
          >
            <BarChart3 className="h-4 w-4 shrink-0 text-purple-400" />
            <span>Matriks Komparasi</span>
          </button>

          <div className="px-2 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
            Keamanan &amp; Lainnya
          </div>

          <button
            onClick={() => handleNavigate('dangerous')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2.5 ${
              currentView === 'dangerous' ? 'bg-red-950 border border-red-800 text-red-400' : 'text-red-400 hover:bg-neutral-900'
            }`}
          >
            <ShieldAlert className="h-4 w-4 shrink-0 text-red-400" />
            <span>Investigasi Bahaya &amp; Blacklist</span>
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
