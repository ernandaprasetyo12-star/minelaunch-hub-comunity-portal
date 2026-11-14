/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { LAUNCHERS, LauncherItem } from './data/launchers';
import { UserProfile } from './types/auth';
import { AppSettings, DEFAULT_APP_SETTINGS } from './types/settings';
import { Navbar, AppViewMode } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { CatalogPage } from './components/CatalogPage';
import { LicensedPage } from './components/LicensedPage';
import { NonLicensedPage } from './components/NonLicensedPage';
import { DangerousPage } from './components/DangerousPage';
import { WikipediaInvestigationModal } from './components/WikipediaInvestigationModal';
import { LauncherDetailModal } from './components/LauncherDetailModal';
import { SafetyChecklistModal } from './components/SafetyChecklistModal';
import { SettingsModal } from './components/SettingsModal';
import { AndroidSystemBar } from './components/AndroidSystemBar';
import { LicenseGuideSection } from './components/LicenseGuideSection';
import { ComparisonTable } from './components/ComparisonTable';
import { LoginModal } from './components/LoginModal';
import { InitialLoadingScreen } from './components/InitialLoadingScreen';
import { InitialLoginGatekeeper } from './components/InitialLoginGatekeeper';
import { FullScreenTourModal } from './components/FullScreenTourModal';
import { Footer } from './components/Footer';
import { PotatoLaptopModal } from './components/PotatoLaptopModal';
import { CraftAiModal } from './components/CraftAiModal';
import { MineLaunchDownloadModal } from './components/MineLaunchDownloadModal';
import { ServersPage } from './components/ServersPage';
import { ModsPage } from './components/ModsPage';
import { CommunityChatPage, ChatRoom } from './components/CommunityChatPage';
import { ShieldCheck, Sparkles, Compass, Crown, MessageSquare } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, isStrictAdminEmail, signOutFirebase } from './lib/firebase';
import {
  checkElyBySsoSession,
  buildElyByProfileFromSso,
  logoutElyBySso,
} from './lib/elybyOAuth';

export default function App() {
  // Initial Flow States
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [hasCompletedInitialLogin, setHasCompletedInitialLogin] = useState(() => {
    try {
      return !!localStorage.getItem('minelaunch_user');
    } catch {
      return false;
    }
  });

  // Settings State (persisted in localStorage)
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('minelaunch_settings');
      return saved ? { ...DEFAULT_APP_SETTINGS, ...JSON.parse(saved) } : DEFAULT_APP_SETTINGS;
    } catch {
      return DEFAULT_APP_SETTINGS;
    }
  });

  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('minelaunch_settings', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleResetSettings = () => {
    setSettings(DEFAULT_APP_SETTINGS);
    try {
      localStorage.setItem('minelaunch_settings', JSON.stringify(DEFAULT_APP_SETTINGS));
    } catch {
      // ignore
    }
  };

  // Dedicated Navigation View State ('home' | 'catalog' | 'licensed' | 'non-licensed' | 'dangerous' | 'servers' | 'mods' | 'chat' | 'about' | 'comparison')
  const [currentView, setCurrentView] = useState<AppViewMode>(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#live-chat')) {
      return 'chat';
    }
    return 'home';
  });

  const [activeChatRoom, setActiveChatRoom] = useState<ChatRoom>(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#live-chat/')) {
      const slug = window.location.hash.replace('#live-chat/', '') as ChatRoom;
      if (slug === 'general' || slug === 'server-indo' || slug === 'mods-help') {
        return slug;
      }
    }
    return 'general';
  });

  useEffect(() => {
    const syncFromHash = () => {
      const h = window.location.hash;
      if (h.startsWith('#live-chat')) {
        setCurrentView('chat');
        const slug = h.replace('#live-chat/', '') as ChatRoom;
        if (slug === 'general' || slug === 'server-indo' || slug === 'mods-help') {
          setActiveChatRoom(slug);
        }
      } else if (currentView === 'chat' && !h.startsWith('#live-chat')) {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', syncFromHash);
    window.addEventListener('popstate', syncFromHash);
    return () => {
      window.removeEventListener('hashchange', syncFromHash);
      window.removeEventListener('popstate', syncFromHash);
    };
  }, [currentView]);

  // Modals state
  const [detailLauncher, setDetailLauncher] = useState<LauncherItem | null>(null);
  const [investigationLauncher, setInvestigationLauncher] = useState<LauncherItem | null>(null);
  const [downloadLauncher, setDownloadLauncher] = useState<LauncherItem | null>(null);
  const [isSafetyChecklistOpen, setIsSafetyChecklistOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [settingsTab, setSettingsTab] = useState<'appearance' | 'profile' | 'android' | 'security'>('appearance');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState<boolean>(false);
  const [isPotatoModalOpen, setIsPotatoModalOpen] = useState<boolean>(false);
  const [isCraftAiOpen, setIsCraftAiOpen] = useState<boolean>(false);

  // User state (sanitize localStorage so role: 'admin' cannot be spoofed without Firebase Auth)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('minelaunch_user');
      if (!saved) return null;
      const parsed = JSON.parse(saved) as UserProfile;
      return {
        ...parsed,
        role:
          parsed.provider === 'google' && isStrictAdminEmail(parsed.email, parsed.emailVerified)
            ? 'admin'
            : 'user',
      };
    } catch {
      return null;
    }
  });

  // Synchronize Firebase Auth state with strict Admin RBAC check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setCurrentUser((prev) => {
        if (fbUser && fbUser.emailVerified) {
          const strictRole = isStrictAdminEmail(fbUser.email, fbUser.emailVerified)
            ? 'admin'
            : 'user';
          if (prev && prev.provider === 'google' && prev.uid === fbUser.uid) {
            const synced: UserProfile = {
              ...prev,
              role: strictRole,
              email: fbUser.email || prev.email,
              emailVerified: fbUser.emailVerified,
            };
            try {
              localStorage.setItem('minelaunch_user', JSON.stringify(synced));
            } catch {
              // ignore
            }
            return synced;
          }
          return prev;
        }
        // If no verified Firebase Google session, force role to 'user'
        if (prev && prev.role === 'admin') {
          const downgraded: UserProfile = { ...prev, role: 'user', emailVerified: false };
          try {
            localStorage.setItem('minelaunch_user', JSON.stringify(downgraded));
          } catch {
            // ignore
          }
          return downgraded;
        }
        return prev;
      });
    });
    return () => unsubscribe();
  }, []);

  // Verify active Ely.by SSO cookie session on boot
  useEffect(() => {
    let cancelled = false;
    void checkElyBySsoSession().then((sso) => {
      if (cancelled || !sso?.authenticated || !sso.user) return;
      setCurrentUser((prev) => {
        if (!prev) {
          const ssoUser = buildElyByProfileFromSso(sso);
          setHasCompletedInitialLogin(true);
          try {
            localStorage.setItem('minelaunch_user', JSON.stringify(ssoUser));
          } catch {
            // ignore
          }
          return ssoUser;
        }
        if (prev.provider === 'elyby' || prev.elybySsoVerified) {
          const updated: UserProfile = {
            ...prev,
            elybyUuid: sso.user!.uuid,
            elybyProfileLink: sso.user!.profileLink,
            elybySsoVerified: true,
            ssoExpiresAt: sso.expiresAt,
          };
          try {
            localStorage.setItem('minelaunch_user', JSON.stringify(updated));
          } catch {
            // ignore
          }
          return updated;
        }
        return prev;
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleOpenSettings = (tab: 'appearance' | 'profile' | 'android' | 'security' = 'appearance') => {
    setSettingsTab(tab);
    setIsSettingsOpen(true);
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setCurrentUser(updatedUser);
    try {
      localStorage.setItem('minelaunch_user', JSON.stringify(updatedUser));
    } catch {
      // ignore
    }
  };

  const handleNavigate = (view: AppViewMode) => {
    setCurrentView(view);
    if (view === 'chat') {
      window.history.pushState(null, '', `#live-chat/${activeChatRoom}`);
    } else if (window.location.hash.startsWith('#live-chat')) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChatRoomChange = (room: ChatRoom) => {
    setActiveChatRoom(room);
    window.history.replaceState(null, '', `#live-chat/${room}`);
  };

  const handleInitialLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setHasCompletedInitialLogin(true);
    try {
      localStorage.setItem('minelaunch_user', JSON.stringify(user));
    } catch {
      // ignore
    }
    // Launch Fullscreen Tour immediately after initial login
    setIsTourModalOpen(true);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setHasCompletedInitialLogin(true);
    try {
      localStorage.setItem('minelaunch_user', JSON.stringify(user));
    } catch {
      // ignore
    }
  };

  const handleLogout = () => {
    void signOutFirebase();
    void logoutElyBySso();
    setCurrentUser(null);
    setHasCompletedInitialLogin(false);
    try {
      localStorage.removeItem('minelaunch_user');
    } catch {
      // ignore
    }
  };

  // Sample launchers for Homepage Spotlight
  const sampleLaunchers = useMemo(() => {
    return {
      prism: LAUNCHERS.find((l) => l.id === 'prism-launcher'),
      xmcl: LAUNCHERS.find((l) => l.id === 'xmcl'),
      freesm: LAUNCHERS.find((l) => l.id === 'freesm-launcher'),
      tlauncher: LAUNCHERS.find((l) => l.id === 'tlauncher-malware'),
      salwyrr: LAUNCHERS.find((l) => l.id === 'salwyrr-client'),
    };
  }, []);

  // Handler when clicking download or card action
  const handleTriggerDownload = (launcher: LauncherItem) => {
    if (launcher.category === 'dangerous') {
      // Open Wikipedia warning dossier modal immediately!
      setInvestigationLauncher(launcher);
    } else {
      setDownloadLauncher(launcher);
    }
  };

  // Handler to select safe alternative from modal
  const handleSelectSafeAlternative = (launcherId: string) => {
    const target = LAUNCHERS.find((l) => l.id === launcherId);
    if (target) {
      setDetailLauncher(target);
      if (target.category === 'licensed') {
        handleNavigate('licensed');
      } else if (target.category === 'non-licensed') {
        handleNavigate('non-licensed');
      } else {
        handleNavigate('catalog');
      }
    }
  };

  // STEP 1: INITIAL MINECRAFT LOADING SCREEN (WITH XMCL ACRYLIC BLUR)
  if (isLoadingInitial) {
    return (
      <InitialLoadingScreen 
        onFinished={() => setIsLoadingInitial(false)}
        backgroundWallpaper={settings.backgroundWallpaper}
        backgroundBlur={settings.backgroundBlur}
        backgroundDim={settings.backgroundDim}
      />
    );
  }

  // STEP 2: INITIAL LOGIN GATEKEEPER
  if (!hasCompletedInitialLogin && !currentUser) {
    return <InitialLoginGatekeeper onLoginSuccess={handleInitialLoginSuccess} />;
  }

  return (
    <div className="relative min-h-screen text-neutral-100 flex flex-col font-sans overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* 
        XMCL ACRYLIC BLURRED BACKGROUND 
        Persis tampilan X Minecraft Launcher: gambar belakang burem dengan acrylic filter
      */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center transition-all duration-500 pointer-events-none scale-105"
        style={{
          backgroundImage: `url(${settings.backgroundWallpaper})`,
          filter: `blur(${settings.backgroundBlur}px)`,
          transform: 'scale(1.1)', // prevents white edges when blurred
        }}
      />
      {/* Dark Dim Overlay controlled by settings & themeMode */}
      <div 
        className="fixed inset-0 z-0 bg-black transition-opacity duration-300 pointer-events-none"
        style={{ 
          opacity: settings.themeMode === 'light' ? 0.3 : settings.backgroundDim / 100 
        }}
      />

      {/* Floating subtle voxel particles if enabled */}
      {settings.enableVoxelParticles && (
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px]" />
      )}

      {/* Main Container Wrapper: Completely separate Live Chat workspace vs Home/Directory Portal */}
      {currentView === 'chat' ? (
        <div className={`relative z-10 h-screen overflow-hidden ${settings.androidDeviceMode === 'phone' ? 'max-w-md mx-auto shadow-2xl border-x border-neutral-800' : ''}`}>
          <CommunityChatPage
            user={currentUser}
            initialRoom={activeChatRoom}
            onRoomChange={handleChatRoomChange}
            onLoginSuccess={handleLoginSuccess}
            onNavigate={handleNavigate}
            onOpenCraftAi={() => setIsCraftAiOpen(true)}
            onOpenSettings={(tab) => handleOpenSettings(tab || 'profile')}
          />
        </div>
      ) : (
        <div className={`relative z-10 flex flex-col min-h-screen ${settings.androidDeviceMode === 'phone' ? 'max-w-md mx-auto shadow-2xl border-x border-neutral-800' : ''}`}>
          {/* Navbar with View Toggles, Brand Logo, and Settings Trigger */}
          <Navbar
            currentView={currentView}
            onChangeView={handleNavigate}
            onOpenSafetyGuide={() => setIsSafetyChecklistOpen(true)}
            onOpenTour={() => setIsTourModalOpen(true)}
            onOpenLogin={() => setIsLoginModalOpen(true)}
            onOpenSettings={(tab) => handleOpenSettings(tab || 'appearance')}
            user={currentUser}
            onLogout={handleLogout}
          />

          {/* Main Content Area */}
          <main className="flex-1 pb-20">
            {/* User Account Bar if logged in */}
            {currentUser && (
              <div className="bg-neutral-900/60 border-b border-white/5 backdrop-blur-md px-4 py-2">
                <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-400">Akun Aktif:</span>
                    <button 
                      onClick={() => handleOpenSettings('profile')}
                      className="text-white font-semibold hover:text-emerald-400 hover:underline transition-colors flex items-center gap-1"
                      title="Buka Pengaturan Profil"
                    >
                      <span>{currentUser.displayName}</span>
                    </button>
                    {currentUser.role === 'admin' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-500/70 px-2 py-0.5 text-[10px] font-black text-amber-300">
                        <Crown className="h-3 w-3" />
                        <span>ADMIN</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-neutral-800 border border-neutral-700 px-2 py-0.5 text-[10px] font-semibold text-neutral-300">
                        USER BIASA
                      </span>
                    )}
                    <span className="text-neutral-600">·</span>
                    {currentUser.hasOfficialLicense && (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>Lisensi Resmi Mojang</span>
                      </span>
                    )}
                    {currentUser.hasElyBySkin && (
                      <span className="inline-flex items-center gap-1 text-sky-400 font-medium">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Skin & Jubah Ely.by ({currentUser.skinCapeName})</span>
                      </span>
                    )}
                    <button
                      onClick={() => handleNavigate('chat')}
                      className="inline-flex items-center gap-1 text-teal-300 hover:text-teal-200 font-semibold ml-1"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>Buka Live Chat</span>
                    </button>
                  </div>

                  <div className="text-neutral-400 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenSettings('profile')}
                      className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
                    >
                      <span>Edit Profil & Skin Avatar</span>
                    </button>
                    <span>·</span>
                    <button
                      onClick={() => setIsTourModalOpen(true)}
                      className="text-neutral-300 hover:text-white flex items-center gap-1"
                    >
                      <Compass className="h-3 w-3" />
                      <span>Panduan Tour</span>
                    </button>
                    <span>·</span>
                    <button
                      onClick={handleLogout}
                      className="text-red-400 hover:underline"
                    >
                      Ganti Akun
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 1: BERANDA UTAMA (HOME) */}
            {currentView === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onOpenSafetyChecklist={() => setIsSafetyChecklistOpen(true)}
                onOpenTour={() => setIsTourModalOpen(true)}
                onOpenSettings={() => setIsSettingsOpen(true)}
                onOpenPotatoModal={() => setIsPotatoModalOpen(true)}
                onOpenCraftAi={() => setIsCraftAiOpen(true)}
                onOpenInvestigation={(launcher) => setInvestigationLauncher(launcher)}
                onOpenDetail={(launcher) => setDetailLauncher(launcher)}
                sampleLaunchers={sampleLaunchers}
              />
            )}

            {/* PAGE 2: KATALOG LENGKAP (ALL LAUNCHERS) */}
            {currentView === 'catalog' && (
              <CatalogPage
                launchers={LAUNCHERS}
                onNavigate={handleNavigate}
                onOpenDetail={(launcher) => setDetailLauncher(launcher)}
                onOpenInvestigation={(launcher) => setInvestigationLauncher(launcher)}
                onTriggerDownload={handleTriggerDownload}
              />
            )}

            {/* PAGE 3: DEDICATED LISENSI RESMI (OFFICIAL MICROSOFT) */}
            {currentView === 'licensed' && (
              <LicensedPage
                launchers={LAUNCHERS}
                onNavigate={handleNavigate}
                onOpenDetail={(launcher) => setDetailLauncher(launcher)}
                onOpenInvestigation={(launcher) => setInvestigationLauncher(launcher)}
                onTriggerDownload={handleTriggerDownload}
              />
            )}

            {/* PAGE 4: DEDICATED NON-LISENSI & ELY.BY */}
            {currentView === 'non-licensed' && (
              <NonLicensedPage
                launchers={LAUNCHERS}
                onNavigate={handleNavigate}
                onOpenDetail={(launcher) => setDetailLauncher(launcher)}
                onOpenInvestigation={(launcher) => setInvestigationLauncher(launcher)}
                onTriggerDownload={handleTriggerDownload}
              />
            )}

            {/* PAGE 5: DEDICATED ZONA BAHAYA & BLACKLIST */}
            {currentView === 'dangerous' && (
              <DangerousPage
                launchers={LAUNCHERS}
                onNavigate={handleNavigate}
                onOpenDetail={(launcher) => setDetailLauncher(launcher)}
                onOpenInvestigation={(launcher) => setInvestigationLauncher(launcher)}
                onTriggerDownload={handleTriggerDownload}
                onOpenSafetyChecklist={() => setIsSafetyChecklistOpen(true)}
              />
            )}

            {/* PAGE 6: DEDICATED SERVER MINECRAFT INDONESIA */}
            {currentView === 'servers' && (
              <ServersPage
                onNavigate={handleNavigate}
                onOpenTour={() => setIsTourModalOpen(true)}
              />
            )}

            {/* PAGE 7: MODS & ADDONS INTEGRATION (MODRINTH / CURSEFORGE) */}
            {currentView === 'mods' && (
              <ModsPage
                onNavigate={handleNavigate}
              />
            )}

            {/* PAGE 8: TENTANG SEMUA: APA ITU MINECRAFT & SISTEM LISENSI */}
            {currentView === 'about' && (
              <div className="space-y-8 pb-12">
                <div className="border-b border-neutral-800 bg-neutral-900/50 py-10">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Ensiklopedia Komprehensif
                    </span>
                    <h1 className="text-3xl font-black text-white">
                      Tentang Semua: Apa Itu Minecraft, Lisensi Resmi & Keamanan Launcher
                    </h1>
                    <p className="text-sm text-neutral-300 max-w-3xl">
                      Pelajari seluk-beluk arsitektur Minecraft Java Edition, mengapa ada launcher yang butuh lisensi dan ada yang gratis via Ely.by, serta analisis mendalam bahaya software tidak resmi.
                    </p>
                  </div>
                </div>

                <LicenseGuideSection
                  onSelectCategory={(cat) => {
                    if (cat === 'licensed') handleNavigate('licensed');
                    else if (cat === 'non-licensed') handleNavigate('non-licensed');
                    else if (cat === 'dangerous') handleNavigate('dangerous');
                    else handleNavigate('catalog');
                  }}
                />
              </div>
            )}

            {/* PAGE 9: FULL COMPARISON TABLE */}
            {currentView === 'comparison' && (
              <div className="py-8">
                <ComparisonTable
                  onOpenDetails={(item) => setDetailLauncher(item)}
                  onOpenInvestigation={(item) => setInvestigationLauncher(item)}
                />
              </div>
            )}
          </main>

          {/* Footer with In-App Navigation */}
          <Footer
            onNavigate={handleNavigate}
            onOpenSafetyGuide={() => setIsSafetyChecklistOpen(true)}
            onOpenTour={() => setIsTourModalOpen(true)}
          />
        </div>
      )}

      {/* Android System Bar (Bottom Navigation & Gesture Bar) — Hidden inside standalone Live Chat */}
      {currentView !== 'chat' && (
        <AndroidSystemBar
          currentView={currentView}
          onNavigate={handleNavigate}
          onOpenSettings={() => handleOpenSettings('appearance')}
          settings={settings}
        />
      )}

      {/* Settings Modal (Pengaturan Latar Belakang, Profil & Blur XMCL) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onResetSettings={handleResetSettings}
        user={currentUser}
        onUpdateUser={handleUpdateUser}
        defaultTab={settingsTab}
      />

      {/* Wikipedia-Style Investigation Dossier Modal */}
      {investigationLauncher && (
        <WikipediaInvestigationModal
          launcher={investigationLauncher}
          isOpen={!!investigationLauncher}
          onClose={() => setInvestigationLauncher(null)}
          onSelectSafeAlternative={handleSelectSafeAlternative}
        />
      )}

      {/* Launcher Detail Modal */}
      {detailLauncher && (
        <LauncherDetailModal
          launcher={detailLauncher}
          isOpen={!!detailLauncher}
          onClose={() => setDetailLauncher(null)}
          onOpenInvestigation={(item) => {
            setDetailLauncher(null);
            setInvestigationLauncher(item);
          }}
          onTriggerDownload={(item) => {
            setDetailLauncher(null);
            setDownloadLauncher(item);
          }}
        />
      )}

      {/* MineLaunch Hub Verified Download Modal */}
      {downloadLauncher && (
        <MineLaunchDownloadModal
          launcher={downloadLauncher}
          isOpen={!!downloadLauncher}
          onClose={() => setDownloadLauncher(null)}
          onOpenInvestigation={(item) => {
            setDownloadLauncher(null);
            setInvestigationLauncher(item);
          }}
        />
      )}

      {/* Safety PC Checklist Modal */}
      <SafetyChecklistModal
        isOpen={isSafetyChecklistOpen}
        onClose={() => setIsSafetyChecklistOpen(false)}
        onSelectSafeAlternative={handleSelectSafeAlternative}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Fullscreen Guided Tour Modal */}
      <FullScreenTourModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
        onSelectCategory={(cat) => {
          setIsTourModalOpen(false);
          if (cat === 'licensed') handleNavigate('licensed');
          else if (cat === 'non-licensed') handleNavigate('non-licensed');
          else if (cat === 'dangerous') handleNavigate('dangerous');
          else handleNavigate('catalog');
        }}
      />

      {/* Potato Laptop Recommendations Modal */}
      <PotatoLaptopModal
        isOpen={isPotatoModalOpen}
        onClose={() => setIsPotatoModalOpen(false)}
        onOpenDetail={(launcher) => setDetailLauncher(launcher)}
        onNavigate={handleNavigate}
      />

      {/* Craft AI Assistant Modal */}
      <CraftAiModal
        isOpen={isCraftAiOpen}
        onClose={() => setIsCraftAiOpen(false)}
      />

      {/* Floating Action Button (FAB) for Craft AI — Hidden inside standalone Live Chat so it doesn't cover Send button */}
      {currentView !== 'chat' && (
        <div className="fixed bottom-20 right-5 z-40">
          <button
            onClick={() => setIsCraftAiOpen(true)}
            className="group relative flex items-center justify-center h-14 w-14 rounded-full bg-neutral-900 shadow-2xl shadow-emerald-950 hover:scale-110 active:scale-95 ring-4 ring-emerald-500/60 transition-all overflow-hidden"
            title="Tanya Craft AI"
          >
            <img
              src="/assets/aistudio/image_623e557a.png"
              alt="Craft AI"
              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay pointer-events-none" />
            <span className="absolute -top-8 bg-neutral-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-emerald-500/40">
              Tanya Craft AI 🤖
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
