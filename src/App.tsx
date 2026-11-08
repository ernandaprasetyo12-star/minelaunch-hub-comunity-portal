/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { LAUNCHERS, LauncherItem } from './data/launchers';
import { UserProfile } from './types/auth';
import { Navbar, AppViewMode } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { CatalogPage } from './components/CatalogPage';
import { LicensedPage } from './components/LicensedPage';
import { NonLicensedPage } from './components/NonLicensedPage';
import { DangerousPage } from './components/DangerousPage';
import { WikipediaInvestigationModal } from './components/WikipediaInvestigationModal';
import { LauncherDetailModal } from './components/LauncherDetailModal';
import { SafetyChecklistModal } from './components/SafetyChecklistModal';
import { LicenseGuideSection } from './components/LicenseGuideSection';
import { ComparisonTable } from './components/ComparisonTable';
import { LoginModal } from './components/LoginModal';
import { InitialLoadingScreen } from './components/InitialLoadingScreen';
import { InitialLoginGatekeeper } from './components/InitialLoginGatekeeper';
import { FullScreenTourModal } from './components/FullScreenTourModal';
import { Footer } from './components/Footer';
import { ShieldCheck, Sparkles, Compass } from 'lucide-react';

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

  // Dedicated Navigation View State ('home' | 'catalog' | 'licensed' | 'non-licensed' | 'dangerous' | 'about' | 'comparison')
  const [currentView, setCurrentView] = useState<AppViewMode>('home');

  // Modals state
  const [detailLauncher, setDetailLauncher] = useState<LauncherItem | null>(null);
  const [investigationLauncher, setInvestigationLauncher] = useState<LauncherItem | null>(null);
  const [isSafetyChecklistOpen, setIsSafetyChecklistOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState<boolean>(false);

  // User state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('minelaunch_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleNavigate = (view: AppViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      setDetailLauncher(launcher);
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

  // STEP 1: INITIAL MINECRAFT LOADING SCREEN
  if (isLoadingInitial) {
    return <InitialLoadingScreen onFinished={() => setIsLoadingInitial(false)} />;
  }

  // STEP 2: INITIAL LOGIN GATEKEEPER
  if (!hasCompletedInitialLogin && !currentUser) {
    return <InitialLoginGatekeeper onLoginSuccess={handleInitialLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Navbar with View Toggles and Brand Logo */}
      <Navbar
        currentView={currentView}
        onChangeView={handleNavigate}
        onOpenSafetyGuide={() => setIsSafetyChecklistOpen(true)}
        onOpenTour={() => setIsTourModalOpen(true)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        user={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* User Account Bar if logged in */}
        {currentUser && (
          <div className="bg-neutral-900/60 border-b border-neutral-800 px-4 py-2">
            <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-neutral-400">Akun Aktif:</span>
                <strong className="text-white font-semibold">{currentUser.displayName}</strong>
                <span className="text-neutral-600">·</span>
                {currentUser.hasOfficialLicense && (
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Lisensi Resmi Mojang Terverifikasi</span>
                  </span>
                )}
                {currentUser.hasElyBySkin && (
                  <span className="inline-flex items-center gap-1 text-sky-400 font-medium">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Skin & Jubah Ely.by Aktif ({currentUser.skinCapeName})</span>
                  </span>
                )}
              </div>

              <div className="text-neutral-400 flex items-center gap-2">
                <button
                  onClick={() => setIsTourModalOpen(true)}
                  className="text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <Compass className="h-3 w-3" />
                  <span>Buka Panduan Tour</span>
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

        {/* PAGE 6: TENTANG SEMUA: APA ITU MINECRAFT & SISTEM LISENSI */}
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

        {/* PAGE 7: FULL COMPARISON TABLE */}
        {currentView === 'comparison' && (
          <div className="py-8">
            <ComparisonTable
              onOpenDetails={(item) => setDetailLauncher(item)}
              onOpenInvestigation={(item) => setInvestigationLauncher(item)}
            />
          </div>
        )}
      </main>

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

      {/* Footer with In-App Navigation */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSafetyGuide={() => setIsSafetyChecklistOpen(true)}
        onOpenTour={() => setIsTourModalOpen(true)}
      />
    </div>
  );
}
