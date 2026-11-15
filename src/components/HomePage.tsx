import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  ArrowRight,
  Layers,
  Sparkles,
  ShieldAlert,
  BookOpen,
  BarChart3,
  CheckSquare,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Cpu,
  Server,
  Copy,
  Check,
  Globe,
  Wifi,
  MessageSquare,
  Bot,
  Search,
  LayoutGrid,
  Lock,
  Settings,
  Shirt,
  Plus,
} from 'lucide-react';
import { AppViewMode } from './Navbar';
import { LAUNCHERS, LauncherItem } from '../data/launchers';
import { SafeImage } from './SafeImage';
import { INDO_SERVERS, MINECRAFT_MP_URL, ServerItem } from '../data/servers';
import { UserProfile } from '../types/auth';
import { LauncherTile } from './LauncherCard';

interface HomePageProps {
  user?: UserProfile | null;
  onNavigate: (view: AppViewMode) => void;
  onOpenSafetyChecklist: () => void;
  onOpenTour: () => void;
  onOpenSettings?: () => void;
  onOpenProfileSettings?: () => void;
  onOpenLogin?: () => void;
  onOpenPotatoModal: () => void;
  onOpenCraftAi: () => void;
  onOpenInvestigation: (launcher: LauncherItem) => void;
  onOpenDetail: (launcher: LauncherItem) => void;
  onTriggerDownload?: (launcher: LauncherItem) => void;
  sampleLaunchers: {
    prism: LauncherItem | undefined;
    xmcl: LauncherItem | undefined;
    freesm: LauncherItem | undefined;
    tlauncher: LauncherItem | undefined;
    salwyrr: LauncherItem | undefined;
  };
}

interface SpotlightSlide {
  id: string;
  kicker: string;
  dateLabel: string;
  title: string;
  summary: string;
  image: string;
  ctaLabel: string;
  accentBorder: string;
  action: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  user = null,
  onNavigate,
  onOpenSafetyChecklist,
  onOpenTour,
  onOpenSettings,
  onOpenProfileSettings,
  onOpenLogin,
  onOpenPotatoModal,
  onOpenCraftAi,
  onOpenInvestigation,
  onOpenDetail,
  onTriggerDownload,
}) => {
  const [copiedIp, setCopiedIp] = useState<string | null>(null);
  const [customIps, setCustomIps] = useState<Record<string, string>>({});
  const [slideIndex, setSlideIndex] = useState(0);
  const [quickCategory, setQuickCategory] = useState<'all' | 'licensed' | 'non-licensed' | 'dangerous'>('all');
  const [quickSearch, setQuickSearch] = useState('');
  const [selectedLauncherId, setSelectedLauncherId] = useState<string>('xmcl');

  const spotlightSlides: SpotlightSlide[] = [
    {
      id: 'portal',
      kicker: 'SOROTAN PORTAL',
      dateLabel: 'Java 1.0 – 1.21+',
      title: 'Pusat Unduh Launcher Minecraft Java Terverifikasi',
      summary:
        'Pilih peluncur resmi Microsoft, launcher non-lisensi aman berbasis Ely.by, atau periksa investigasi risiko sebelum mengunduh.',
      image: '/assets/images/mc_launchers_hero_1794042691092.jpg',
      ctaLabel: 'Buka Katalog Lengkap',
      accentBorder: 'border-emerald-500/50',
      action: () => onNavigate('catalog'),
    },
    {
      id: 'elyby',
      kicker: 'NON-LISENSI & SKIN',
      dateLabel: 'Ely.by · Open Source',
      title: 'Main Gratis dengan Skin HD Kustom Tanpa Spyware',
      summary:
        'Gunakan XMCL, SKLauncher, FreeSM, atau PojavLauncher dengan dukungan penuh autentikasi skin & jubah Ely.by yang aman.',
      image: '/assets/images/elyby_custom_skin_1794042692330.jpg',
      ctaLabel: 'Lihat Launcher Ely.by',
      accentBorder: 'border-sky-500/50',
      action: () => onNavigate('non-licensed'),
    },
    {
      id: 'danger',
      kicker: 'AUDIT KEAMANAN',
      dateLabel: 'Blacklist Komunitas',
      title: 'Waspada Launcher Pembajak Hosts & Spyware Tertutup',
      summary:
        'Pelajari bukti teknis mengenai TLauncher (TLMedia), Salwyrr Client, dan cara mengecek apakah file hosts Windows Anda aman.',
      image: '/assets/images/mc_security_warning_1794042692098.jpg',
      ctaLabel: 'Buka Investigasi Bahaya',
      accentBorder: 'border-red-500/50',
      action: () => onNavigate('dangerous'),
    },
    {
      id: 'servers',
      kicker: 'KOMUNITAS LOKAL',
      dateLabel: 'Server Indonesia',
      title: 'Daftar Server Java Indonesia & Pustaka Modrinth',
      summary:
        'Salin IP server lokal terpopuler (Kaizen Network, MineGens, Alwination) dan temukan mod optimasi FPS ringan.',
      image: '/assets/images/prism_launcher_mockup_1794042691402.jpg',
      ctaLabel: 'Jelajahi Server Indo',
      accentBorder: 'border-amber-500/50',
      action: () => onNavigate('servers'),
    },
  ];

  const activeSlide = spotlightSlides[slideIndex] || spotlightSlides[0];

  const filteredLaunchers = useMemo(() => {
    return LAUNCHERS.filter((item) => {
      if (quickCategory !== 'all' && item.category !== quickCategory) return false;
      if (quickSearch.trim() !== '') {
        const q = quickSearch.toLowerCase();
        const match =
          item.name.toLowerCase().includes(q) ||
          item.developer.toLowerCase().includes(q) ||
          item.minRam.toLowerCase().includes(q) ||
          item.tagline.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    }).slice(0, quickSearch.trim() || quickCategory !== 'all' ? 12 : 9);
  }, [quickCategory, quickSearch]);

  const getEffectiveIp = (server: ServerItem) => {
    return customIps[server.id] !== undefined ? customIps[server.id] : server.ip;
  };

  const handleCopyIp = (server: ServerItem) => {
    const ipToCopy = getEffectiveIp(server);
    navigator.clipboard.writeText(ipToCopy);
    setCopiedIp(server.id);
    setTimeout(() => setCopiedIp(null), 2500);
  };

  const handleIpChange = (serverId: string, newIp: string) => {
    setCustomIps((prev) => ({
      ...prev,
      [serverId]: newIp,
    }));
  };

  const skinPreviewUsername = user?.username || 'Steve';
  const skinBodyUrl = `https://mc-heads.net/body/${encodeURIComponent(skinPreviewUsername)}/160`;
  const accountStatusText = user
    ? user.hasOfficialLicense
      ? 'Lisensi Resmi'
      : user.hasElyBySkin
        ? 'Ely.by Aktif'
        : user.provider === 'google'
          ? 'Akun Google'
          : 'Offline / Lokal'
    : 'Mode Tamu';

  const handleTileDownload = (launcher: LauncherItem) => {
    if (onTriggerDownload) {
      onTriggerDownload(launcher);
    } else if (launcher.category === 'dangerous') {
      onOpenInvestigation(launcher);
    } else {
      onOpenDetail(launcher);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-10 pb-12">
      {/* 1. WORKBENCH SHELL: LEFT PROFILE & SKIN RAIL + RIGHT SPOTLIGHT & LAUNCHER GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT RAIL (Desktop Vertical Workbench Sidebar / Compact Strip on Mobile) */}
        <aside className="lg:col-span-3 space-y-4">
          {/* Account Card */}
          <div className="rounded-2xl bg-[#16181e]/80 backdrop-blur-xl border border-white/[0.08] p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 rounded-xl overflow-hidden bg-neutral-900 border border-white/10 shrink-0">
                <SafeImage
                  src={user?.avatarUrl || '/assets/minelaunch_hub_logo.png'}
                  alt={user?.displayName || 'MineLaunch User'}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-white truncate">
                  {user?.username || user?.displayName || 'Pemain Tamu'}
                </div>
                <div className="text-[11px] text-neutral-400 truncate">
                  {accountStatusText}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => (onOpenProfileSettings ? onOpenProfileSettings() : onOpenSettings?.())}
                className="p-2 rounded-lg text-neutral-400 hover:text-emerald-400 hover:bg-white/5 transition-colors cursor-pointer"
                title="Pengaturan Profil & Tampilan"
              >
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Skin & Character Preview Panel (Full on Desktop, Compact Action on Mobile) */}
          <div className="rounded-2xl bg-[#16181e]/75 backdrop-blur-xl border border-white/[0.08] p-4 flex flex-col items-center space-y-4">
            {/* Desktop full character card */}
            <div className="hidden lg:flex flex-col items-center w-full space-y-3 py-2">
              <span className="px-2.5 py-0.5 rounded-md bg-neutral-950/75 border border-white/10 text-[11px] font-mono text-neutral-200">
                {skinPreviewUsername}
              </span>
              <div className="relative flex items-center justify-center h-44 w-full rounded-xl bg-neutral-950/35 border border-white/[0.05] overflow-hidden">
                <SafeImage
                  src={skinBodyUrl}
                  alt={`Skin ${skinPreviewUsername}`}
                  className="h-36 w-auto object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.65)]"
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (!user && onOpenLogin) {
                  onOpenLogin();
                } else if (onOpenProfileSettings) {
                  onOpenProfileSettings();
                } else {
                  onOpenSettings?.();
                }
              }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/35 bg-emerald-950/45 hover:bg-emerald-900/50 px-4 py-2.5 text-xs font-bold text-emerald-300 transition-all cursor-pointer"
            >
              <Shirt className="h-4 w-4 text-emerald-400" />
              <span>{user ? 'Lemari Skin & Profil' : 'Masuk & Pilih Skin'}</span>
            </button>
          </div>

          {/* Bottom Connection / Quick Access Status Panel (Desktop) */}
          <div className="hidden lg:flex flex-col items-center text-center rounded-2xl bg-[#16181e]/60 backdrop-blur-xl border border-white/[0.06] p-4 space-y-3">
            <Lock className="h-5 w-5 text-neutral-500" />
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              {user
                ? 'Akun aktif. Anda dapat langsung membuka Live Chat komunitas atau menanyakan rekomendasi launcher ke Craft AI.'
                : 'Hubungkan akun Google atau Ely.by untuk fitur Live Chat komunitas & sinkronisasi profil.'}
            </p>
            <div className="w-full grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onNavigate('chat')}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-white/10 px-2.5 py-2 text-[11px] font-semibold text-neutral-200 transition-colors cursor-pointer"
              >
                <MessageSquare className="h-3.5 w-3.5 text-teal-400" />
                <span>Live Chat</span>
              </button>
              <button
                onClick={onOpenCraftAi}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-white/10 px-2.5 py-2 text-[11px] font-semibold text-neutral-200 transition-colors cursor-pointer"
              >
                <Bot className="h-3.5 w-3.5 text-emerald-400" />
                <span>Craft AI</span>
              </button>
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN WORKSPACE */}
        <div className="lg:col-span-9 space-y-6">
          {/* Top Workspace Subbar */}
          <div className="flex items-center justify-between gap-4 px-1">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-200">
              <LayoutGrid className="h-4 w-4 text-[#22c55e]" />
              <span>Sorotan Komunitas &amp; Portal</span>
            </div>
            <button
              onClick={onOpenTour}
              className="text-xs font-semibold text-neutral-400 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Panduan Tur
            </button>
          </div>

          {/* FEATURED SPOTLIGHT CAROUSEL BANNER */}
          <div className="relative rounded-2xl bg-[#14161c]/85 backdrop-blur-xl border border-white/[0.08] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center">
              {/* Left Framed Visual */}
              <div className="md:col-span-5 p-4 sm:p-5">
                <div className={`rounded-xl border ${activeSlide.accentBorder} bg-neutral-950/80 p-1.5 shadow-lg`}>
                  <div className="aspect-video w-full overflow-hidden rounded-lg bg-neutral-950">
                    <SafeImage
                      src={activeSlide.image}
                      alt={activeSlide.title}
                      className="h-full w-full object-cover transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Right Copy & Action */}
              <div className="md:col-span-7 px-5 pb-10 pt-1 md:py-6 md:pr-12 space-y-3">
                <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                  <span className="font-bold text-neutral-200">{activeSlide.kicker}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeSlide.dateLabel}</span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-[26px] font-black text-white leading-snug tracking-tight">
                  {activeSlide.title}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl">
                  {activeSlide.summary}
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-4">
                  <button
                    onClick={activeSlide.action}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#22c55e] hover:text-emerald-300 transition-colors cursor-pointer"
                  >
                    <span>{activeSlide.ctaLabel}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={onOpenPotatoModal}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
                  >
                    <Cpu className="h-3.5 w-3.5" />
                    <span>Rekomendasi PC Ringan</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={() =>
                setSlideIndex((prev) => (prev - 1 + spotlightSlides.length) % spotlightSlides.length)
              }
              aria-label="Slide sebelumnya"
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 items-center justify-center rounded-full bg-black/40 text-neutral-300 hover:bg-black/70 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setSlideIndex((prev) => (prev + 1) % spotlightSlides.length)}
              aria-label="Slide berikutnya"
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 items-center justify-center rounded-full bg-black/40 text-neutral-300 hover:bg-black/70 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {spotlightSlides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setSlideIndex(idx)}
                  aria-label={`Pilih sorotan ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === slideIndex
                      ? 'w-5 bg-[#22c55e]'
                      : 'w-2 bg-neutral-600 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* SECTION TOOLBAR HEADER ("Launcher Saat Ini" style) */}
          <div className="space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <LayoutGrid className="h-5 w-5 text-[#22c55e] shrink-0" />
                <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  Direktori Launcher Pilihan
                </h2>
              </div>

              {/* Right Toolbar: Category Switcher + Vivid Green CTA */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-1 rounded-xl bg-[#16181e]/85 border border-white/[0.08] p-1 text-xs">
                  {(
                    [
                      { id: 'all', label: 'Semua' },
                      { id: 'licensed', label: 'Resmi' },
                      { id: 'non-licensed', label: 'Ely.by' },
                      { id: 'dangerous', label: 'Bahaya' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setQuickCategory(tab.id)}
                      className={`px-2.5 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                        quickCategory === tab.id
                          ? tab.id === 'dangerous'
                            ? 'bg-red-600/80 text-white'
                            : 'bg-neutral-800 text-white'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={onOpenPotatoModal}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] px-3.5 py-2 text-xs font-bold text-neutral-950 shadow-sm transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Plus className="h-4 w-4" />
                  <span>Laptop Kentang</span>
                </button>
              </div>
            </div>

            {/* Filter Search Input */}
            <div className="relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="Filter nama launcher, pengembang, atau RAM..."
                className="w-full rounded-xl bg-[#16181e]/85 backdrop-blur-md border border-white/[0.08] pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:border-[#22c55e] focus:outline-none transition-colors"
              />
            </div>

            {/* Signature 3-Column Compact Launcher Tile Grid */}
            {filteredLaunchers.length > 0 ? (
              <div className="grid grid-cols-1 min-[520px]:grid-cols-2 xl:grid-cols-3 gap-3 pt-1">
                {filteredLaunchers.map((launcher) => (
                  <LauncherTile
                    key={launcher.id}
                    launcher={launcher}
                    isHighlighted={selectedLauncherId === launcher.id}
                    onOpenDetails={(item) => {
                      setSelectedLauncherId(item.id);
                      onOpenDetail(item);
                    }}
                    onOpenInvestigation={(item) => {
                      setSelectedLauncherId(item.id);
                      onOpenInvestigation(item);
                    }}
                    onTriggerDownload={(item) => {
                      setSelectedLauncherId(item.id);
                      handleTileDownload(item);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-[#16181e]/75 border border-white/[0.08] p-6 text-center text-xs text-neutral-400">
                Tidak ada launcher yang cocok dengan filter "{quickSearch}".
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
              <span className="text-neutral-400">
                Menampilkan {filteredLaunchers.length} dari {LAUNCHERS.length} launcher terdata
              </span>
              <button
                onClick={() => onNavigate('catalog')}
                className="inline-flex items-center gap-1 font-bold text-[#22c55e] hover:text-emerald-300 transition-colors cursor-pointer"
              >
                <span>Buka Katalog Lengkap ({LAUNCHERS.length} Launcher)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MENU HALAMAN KHUSUS (DARK ACRYLIC COMPACT CARDS) */}
      <section className="space-y-4 pt-2 border-t border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              Jelajahi Bagian Lainnya
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Akses cepat ke halaman terpisah: kategori lisensi, mods, server lokal, komparasi, dan investigasi.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {[
            {
              view: 'licensed' as AppViewMode,
              icon: ShieldCheck,
              iconColor: 'text-emerald-400',
              title: 'Lisensi Resmi',
              desc: 'Prism, Modrinth, CurseForge & akun Microsoft resmi',
              borderHover: 'hover:border-emerald-500/60',
            },
            {
              view: 'non-licensed' as AppViewMode,
              icon: Sparkles,
              iconColor: 'text-sky-400',
              title: 'Non-Lisensi & Ely.by',
              desc: 'XMCL, SKLauncher, FreeSM, Pojav & skin gratis',
              borderHover: 'hover:border-sky-500/60',
            },
            {
              view: 'mods' as AppViewMode,
              icon: Layers,
              iconColor: 'text-orange-400',
              title: 'Mods & Addons',
              desc: 'Pustaka Sodium, Iris, JEI dari Modrinth & CurseForge',
              borderHover: 'hover:border-orange-500/60',
            },
            {
              view: 'dangerous' as AppViewMode,
              icon: ShieldAlert,
              iconColor: 'text-red-400',
              title: 'Investigasi Bahaya',
              desc: 'Blacklist TLauncher, Salwyrr & analisis keamanan',
              borderHover: 'hover:border-red-500/60',
            },
            {
              view: 'servers' as AppViewMode,
              icon: Server,
              iconColor: 'text-amber-400',
              title: 'Server Indonesia',
              desc: 'Daftar IP server Java & Bedrock lokal aktif',
              borderHover: 'hover:border-amber-500/60',
            },
            {
              view: 'comparison' as AppViewMode,
              icon: BarChart3,
              iconColor: 'text-purple-400',
              title: 'Matriks Komparasi',
              desc: 'Bandingkan spek RAM, Ely.by & skor keamanan',
              borderHover: 'hover:border-purple-500/60',
            },
            {
              view: 'about' as AppViewMode,
              icon: BookOpen,
              iconColor: 'text-emerald-400',
              title: 'Tentang Lisensi',
              desc: 'Edukasi resmi Mojang, OAuth2 & file hosts',
              borderHover: 'hover:border-emerald-500/60',
            },
            {
              view: 'chat' as AppViewMode,
              icon: MessageSquare,
              iconColor: 'text-teal-400',
              title: 'Live Chat Komunitas',
              desc: 'Ruang obrolan real-time & cari teman mabar',
              borderHover: 'hover:border-teal-500/60',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.view}
                onClick={() => onNavigate(item.view)}
                className={`group text-left rounded-xl bg-[#16181e]/80 backdrop-blur-md border border-white/[0.08] ${item.borderHover} p-4 transition-all cursor-pointer flex flex-col justify-between gap-3`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-950/80 border border-white/10">
                      <Icon className={`h-4 w-4 ${item.iconColor}`} />
                    </div>
                    <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. SERVER MINECRAFT JAVA INDONESIA */}
      <section className="space-y-4 pt-2 border-t border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Server className="h-4 w-4" />
              <span>SERVER MINECRAFT JAVA INDONESIA</span>
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight mt-0.5">
              Server Lokal Terpopuler
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={MINECRAFT_MP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#16181e]/85 border border-white/[0.08] hover:border-sky-500/60 px-3.5 py-2 text-xs font-semibold text-sky-300 transition-colors"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Minecraft-MP.com</span>
            </a>
            <button
              onClick={() => onNavigate('servers')}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] px-3.5 py-2 text-xs font-bold text-neutral-950 transition-colors cursor-pointer"
            >
              <span>Lihat Semua Server</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDO_SERVERS.slice(0, 6).map((server) => (
            <div
              key={server.id}
              className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#16181e]/80 backdrop-blur-md hover:border-emerald-500/60 transition-all overflow-hidden"
            >
              <div className="relative aspect-[16/7] w-full overflow-hidden bg-neutral-950">
                <SafeImage
                  src={server.image}
                  alt={server.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16181e] via-[#16181e]/35 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-neutral-200">{server.countryFlag} Indonesia</span>
                  <span className="font-mono text-emerald-300 flex items-center gap-1 tabular-nums">
                    <Wifi className="h-3 w-3" />
                    {server.playerCountEst}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {server.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                    {server.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={getEffectiveIp(server)}
                      onChange={(e) => handleIpChange(server.id, e.target.value)}
                      title="Ubah IP server jika menggunakan domain kustom"
                      className="flex-1 min-w-0 bg-neutral-950/80 border border-white/10 rounded-lg px-2.5 py-1.5 font-mono text-xs text-emerald-400 font-bold focus:border-[#22c55e] focus:outline-none select-all"
                    />
                    <button
                      onClick={() => handleCopyIp(server)}
                      className="inline-flex items-center gap-1 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] px-3 py-1.5 text-xs font-bold text-neutral-950 transition-all shrink-0 cursor-pointer"
                    >
                      {copiedIp === server.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedIp === server.id ? 'Disalin' : 'Salin'}</span>
                    </button>
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono flex items-center justify-between">
                    <span>Java: 25565 · Bedrock: {server.bedrockPort || 19132}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SECURITY TOOLS ROW (HOSTS CHECKLIST + VIRUSTOTAL) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/[0.08]">
        <div className="rounded-2xl border border-white/[0.08] bg-[#16181e]/80 backdrop-blur-md p-5 sm:p-6 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <CheckSquare className="h-4 w-4" />
              <span>Checklist Keamanan PC</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Cek File Hosts &amp; Infeksi Launcher
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Periksa apakah berkas <code className="text-amber-300 bg-neutral-950/80 px-1 py-0.5 rounded">drivers\etc\hosts</code> Windows Anda dibajak oleh launcher pihak ketiga.
            </p>
          </div>
          <button
            onClick={onOpenSafetyChecklist}
            className="self-start inline-flex items-center gap-2 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] px-4 py-2.5 text-xs font-bold text-neutral-950 transition-colors cursor-pointer"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Mulai Tes Keamanan PC</span>
          </button>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#16181e]/80 backdrop-blur-md p-5 sm:p-6 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
              <ExternalLink className="h-4 w-4" />
              <span>Pemindaian Antivirus Online</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Pindai Installer .exe di VirusTotal
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Unggah installer peluncur apa pun ke VirusTotal untuk dipindai oleh 70+ mesin antivirus dunia secara gratis sebelum menjalankan aplikasi.
            </p>
          </div>
          <a
            href="https://www.virustotal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start inline-flex items-center gap-2 rounded-xl border border-sky-500/40 bg-sky-950/50 hover:bg-sky-900/60 px-4 py-2.5 text-xs font-bold text-sky-300 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Kunjungi VirusTotal.com</span>
          </a>
        </div>
      </section>

      {/* Community Minecraft Hub Bottom Watermark */}
      <div className="pt-6 px-4 text-center text-xs font-mono text-neutral-400 tracking-wide border-t border-white/[0.08] space-y-1.5 leading-relaxed">
        <div>© 2025 Community Minecraft Hub. All rights reserved.</div>
        <div className="text-[11px] font-sans text-neutral-500">
          Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
        </div>
      </div>
    </div>
  );
};
