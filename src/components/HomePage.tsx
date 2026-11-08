import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Download, 
  ArrowRight, 
  HelpCircle, 
  Layers, 
  Sparkles, 
  ShieldAlert, 
  BookOpen, 
  BarChart3, 
  CheckSquare, 
  ExternalLink,
  ChevronRight,
  Info,
  Settings,
  Sliders,
  Cpu,
  Server,
  Copy,
  Check,
  Globe,
  Wifi
} from 'lucide-react';
import { AppViewMode } from './Navbar';
import { LauncherItem } from '../data/launchers';
import { SafeImage } from './SafeImage';
import { INDO_SERVERS, MINECRAFT_MP_URL, ServerItem } from '../data/servers';

interface HomePageProps {
  onNavigate: (view: AppViewMode) => void;
  onOpenSafetyChecklist: () => void;
  onOpenTour: () => void;
  onOpenSettings?: () => void;
  onOpenPotatoModal: () => void;
  onOpenCraftAi: () => void;
  onOpenInvestigation: (launcher: LauncherItem) => void;
  onOpenDetail: (launcher: LauncherItem) => void;
  sampleLaunchers: {
    prism: LauncherItem | undefined;
    xmcl: LauncherItem | undefined;
    freesm: LauncherItem | undefined;
    tlauncher: LauncherItem | undefined;
    salwyrr: LauncherItem | undefined;
  };
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenSafetyChecklist,
  onOpenTour,
  onOpenSettings,
  onOpenPotatoModal,
  onOpenCraftAi,
  onOpenInvestigation,
  onOpenDetail,
  sampleLaunchers
}) => {
  const [copiedIp, setCopiedIp] = React.useState<string | null>(null);
  const [customIps, setCustomIps] = React.useState<Record<string, string>>({});

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
  return (
    <div className="space-y-12 pb-16">
      {/* 1. HERO SECTION WITH MINELAUNCH HUB COMMUNITY BRANDING */}
      <section className="relative overflow-hidden border-b border-neutral-800 bg-neutral-950">
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity pointer-events-none">
          <SafeImage
            src="/assets/images/mc_launchers_hero_1794042691092.jpg"
            alt="Minecraft Background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Brand copy */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>MINELAUNCH HUB COMMUNITY PORTAL</span>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-400 font-normal">Java Edition 1.0 - 1.21+</span>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-400 font-normal">Panduan Lengkap & Terverifikasi</span>
              </div>

              <div className="flex items-start gap-4">
                <SafeImage
                  src="/assets/minelaunch_hub_logo.png"
                  alt="MineLaunch Hub Community"
                  className="hidden sm:block h-20 w-20 rounded-2xl object-cover ring-2 ring-emerald-500/40 shadow-xl shadow-emerald-950/50 shrink-0"
                />
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                    Pusat Unduh Launcher Minecraft Java
                  </h1>
                  <p className="text-sm sm:text-base text-neutral-300 mt-2 max-w-2xl leading-relaxed">
                    Setiap halaman kini dipisah dengan rapi: pilih launcher berlisensi resmi, non-lisensi aman via{' '}
                    <strong className="text-emerald-400 font-semibold">Ely.by</strong>, atau pelajari investigasi launcher berisiko sebelum Anda mengunduh.
                  </p>
                </div>
              </div>

              {/* Fast action button row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('catalog')}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/30 hover:bg-emerald-500 transition-all hover:scale-[1.02]"
                >
                  <Layers className="h-4 w-4" />
                  <span>Buka Katalog Semua Launcher</span>
                </button>

                <button
                  onClick={onOpenPotatoModal}
                  className="inline-flex items-center gap-2 rounded-xl border border-amber-500/80 bg-amber-950/50 px-4 py-2.5 text-sm font-bold text-amber-300 hover:bg-amber-900/60 transition-all shadow-md shadow-amber-950/40 animate-pulse"
                >
                  <Cpu className="h-4 w-4 text-amber-400" />
                  <span>💻 Laptop Kamu Kentang? (Pilih Ringan)</span>
                </button>


                <button
                  onClick={() => onNavigate('licensed')}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/90 px-4 py-2.5 text-sm font-semibold text-neutral-200 hover:bg-neutral-800 hover:text-white transition-all"
                >
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Lisensi Resmi</span>
                </button>

                <button
                  onClick={() => onNavigate('non-licensed')}
                  className="inline-flex items-center gap-2 rounded-xl border border-sky-800/80 bg-sky-950/40 px-4 py-2.5 text-sm font-semibold text-sky-300 hover:bg-sky-900/50 transition-all"
                >
                  <Sparkles className="h-4 w-4 text-sky-400" />
                  <span>Non-Lisensi & Ely.by</span>
                </button>

                <button
                  onClick={() => onNavigate('dangerous')}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-800/80 bg-red-950/40 px-4 py-2.5 text-sm font-semibold text-red-300 hover:bg-red-900/50 transition-all"
                >
                  <ShieldAlert className="h-4 w-4 text-red-400" />
                  <span>Zona Bahaya & Blacklist</span>
                </button>
              </div>
            </div>

            {/* Right: Quick warning preview */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-red-900/50 bg-gradient-to-br from-red-950/60 to-neutral-950 p-5 space-y-3">
                <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>Waspada Sebelum Mengunduh</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Investigasi Keamanan Launcher
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Banyak pemain awam tidak sengaja mengunduh launcher bajakan berbahaya seperti TLauncher (TLMedia) atau client tertutup yang memuat spyware dan membajak file hosts Windows.
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  {sampleUploadAlert(sampleLaunchers.tlauncher, onOpenInvestigation, 'Investigasi TLauncher')}
                  {sampleUploadAlert(sampleLaunchers.salwyrr, onOpenInvestigation, 'Investigasi Salwyrr Client')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED SECTIONS DIRECTORY (PORTAL MENU) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Pilih Halaman Yang Ingin Anda Kunjungi</span>
          </h2>
          <p className="text-sm text-neutral-400">
            Klik salah satu portal di bawah untuk langsung berpindah ke halaman khusus tersebut:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Portal 1: Katalog Lengkap */}
          <div 
            onClick={() => onNavigate('catalog')}
            className="group cursor-pointer rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 hover:border-emerald-500/60 hover:bg-neutral-900 transition-all hover:shadow-xl hover:shadow-emerald-950/30 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/80 group-hover:scale-105 transition-transform">
                  <Layers className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-neutral-400 bg-neutral-800/60 px-2.5 py-1 rounded-md">
                  25+ Launcher
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                Katalog Semua Launcher
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Daftar lengkap seluruh peluncur Minecraft Java di dunia dengan filter sistem operasi (Windows, Mac, Linux, Android), pencarian cepat, dan kebutuhan RAM.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:translate-x-0.5 transition-transform">
              <span>Masuk ke Halaman Katalog</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* Portal 2: Lisensi Resmi */}
          <div 
            onClick={() => onNavigate('licensed')}
            className="group cursor-pointer rounded-2xl border border-emerald-900/50 bg-neutral-900/60 p-6 hover:border-emerald-500 hover:bg-neutral-900 transition-all hover:shadow-xl hover:shadow-emerald-950/30 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/80 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-1 rounded-md">
                  Akun Microsoft
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                Halaman Lisensi Resmi
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Prism Launcher, Modrinth App, CurseForge, Lunar Client, Badlion, MultiMC, GDLauncher, FTB, LabyMod 4, Feather, dan Launcher Resmi Mojang.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:translate-x-0.5 transition-transform">
              <span>Buka Launcher Lisensi Resmi</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* Portal 3: Non-Lisensi & Ely.by */}
          <div 
            onClick={() => onNavigate('non-licensed')}
            className="group cursor-pointer rounded-2xl border border-sky-900/50 bg-neutral-900/60 p-6 hover:border-sky-500 hover:bg-neutral-900 transition-all hover:shadow-xl hover:shadow-sky-950/30 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-950 text-sky-400 border border-sky-800/80 group-hover:scale-105 transition-transform">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-sky-400 bg-sky-950/80 border border-sky-800 px-2.5 py-1 rounded-md">
                  Bebas & Ely.by
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">
                Halaman Non-Lisensi & Ely.by
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                XMCL, SKLauncher, FreeSM Launcher (Prism Fork Bebas), Pinecone MC, Legacy Launcher Turikhay, PojavLauncher (Android), HMCL, dan PollyMC.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-semibold text-sky-400 group-hover:translate-x-0.5 transition-transform">
              <span>Buka Launcher Non-Lisensi</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* Portal 4: Zona Bahaya & Blacklist */}
          <div 
            onClick={() => onNavigate('dangerous')}
            className="group cursor-pointer rounded-2xl border border-red-900/60 bg-neutral-900/60 p-6 hover:border-red-500 hover:bg-neutral-900 transition-all hover:shadow-xl hover:shadow-red-950/30 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-950 text-red-400 border border-red-800/80 group-hover:scale-105 transition-transform">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-800 px-2.5 py-1 rounded-md">
                  Peringatan Bahaya
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                Zona Bahaya & Investigasi
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Peringatan investigasi dossier format Wikipedia: TLauncher (TLMedia malware), Salwyrr Client (closed source & telemetri), PolyMC (compromised), Titan, Shiginima.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-semibold text-red-400 group-hover:translate-x-0.5 transition-transform">
              <span>Buka Halaman Investigasi Bahaya</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* Portal 5: Tentang Semua: Apa Itu Minecraft */}
          <div 
            onClick={() => onNavigate('about')}
            className="group cursor-pointer rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 hover:border-amber-500/60 hover:bg-neutral-900 transition-all hover:shadow-xl hover:shadow-amber-950/30 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-950 text-amber-400 border border-amber-800/80 group-hover:scale-105 transition-transform">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800 px-2.5 py-1 rounded-md">
                  Ensiklopedia
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                Tentang Minecraft & Lisensi
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Penjelasan komprehensif apa itu Minecraft Java Edition, perbedaan lisensi resmi Microsoft vs akun Ely.by bebas virus, dan cara kerja token keamanan.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:translate-x-0.5 transition-transform">
              <span>Baca Ensiklopedia Lengkap</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* Portal 6: Matriks Komparasi */}
          <div 
            onClick={() => onNavigate('comparison')}
            className="group cursor-pointer rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 hover:border-purple-500/60 hover:bg-neutral-900 transition-all hover:shadow-xl hover:shadow-purple-950/30 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950 text-purple-400 border border-purple-800/80 group-hover:scale-105 transition-transform">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-purple-400 bg-purple-950/80 border border-purple-800 px-2.5 py-1 rounded-md">
                  Tabel Side-by-Side
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                Matriks Komparasi Spek & RAM
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Bandingkan launcher berdampingan: kebutuhan memori RAM, konsumsi CPU, dukungan Modrinth, CurseForge, OptiFine, Fabric, dan skor keamanan.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-semibold text-purple-400 group-hover:translate-x-0.5 transition-transform">
              <span>Lihat Tabel Komparasi</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOWCASE SPOTLIGHT: REKOMENDASI TERBAIK TIAP KATEGORI */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-t border-neutral-800 pt-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Sorotan Launcher Paling Direkomendasikan
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Klik kartu di bawah untuk membuka halaman kategori atau melihat rincian lengkapnya
            </p>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>Semua Launcher</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Spotlight 1: Prism Launcher */}
          {sampleLaunchers.prism && (
            <div className="rounded-2xl border border-emerald-900/60 bg-neutral-900/70 p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="relative aspect-video rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
                  <SafeImage
                    src={sampleLaunchers.prism.image}
                    alt={sampleLaunchers.prism.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-emerald-950/90 border border-emerald-700/80 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">
                    TERBAIK RESMI (C++)
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{sampleLaunchers.prism.name}</h4>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                    {sampleLaunchers.prism.description}
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('licensed')}
                  className="text-xs font-semibold text-emerald-400 hover:underline"
                >
                  Buka Halaman Lisensi Resmi →
                </button>
                <button
                  onClick={() => onOpenDetail(sampleLaunchers.prism!)}
                  className="px-2.5 py-1 text-xs bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-medium"
                >
                  Detail
                </button>
              </div>
            </div>
          )}

          {/* Spotlight 2: XMCL / FreeSM */}
          {sampleLaunchers.xmcl && (
            <div className="rounded-2xl border border-sky-900/60 bg-neutral-900/70 p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="relative aspect-video rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
                  <SafeImage
                    src={sampleLaunchers.xmcl.image}
                    alt={sampleLaunchers.xmcl.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-sky-950/90 border border-sky-700/80 text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded">
                    TERBAIK ELY.BY & OFFLINE
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{sampleLaunchers.xmcl.name}</h4>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                    {sampleLaunchers.xmcl.description}
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('non-licensed')}
                  className="text-xs font-semibold text-sky-400 hover:underline"
                >
                  Buka Halaman Non-Lisensi →
                </button>
                <button
                  onClick={() => onOpenDetail(sampleLaunchers.xmcl!)}
                  className="px-2.5 py-1 text-xs bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-medium"
                >
                  Detail
                </button>
              </div>
            </div>
          )}

          {/* Spotlight 3: FreeSM Launcher */}
          {sampleLaunchers.freesm && (
            <div className="rounded-2xl border border-purple-900/60 bg-neutral-900/70 p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="relative aspect-video rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
                  <SafeImage
                    src={sampleLaunchers.freesm.image}
                    alt={sampleLaunchers.freesm.name}
                    className="w-full h-full object-contain p-1.5"
                  />
                  <div className="absolute top-2 left-2 bg-purple-950/90 border border-purple-700/80 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded">
                    PRISM FORK BEBAS (NEW)
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{sampleLaunchers.freesm.name}</h4>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                    {sampleLaunchers.freesm.description}
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('non-licensed')}
                  className="text-xs font-semibold text-purple-400 hover:underline"
                >
                  Buka Halaman Non-Lisensi →
                </button>
                <button
                  onClick={() => onOpenDetail(sampleLaunchers.freesm!)}
                  className="px-2.5 py-1 text-xs bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-medium"
                >
                  Detail
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3.5. LIST MINECRAFT SERVER JAVA EDITION (INDONESIA) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-t border-neutral-800 pt-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Server className="h-4 w-4" />
              <span>SERVER MINECRAFT JAVA INDONESIA 🇮🇩</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              List Minecraft Server Java Edition Indonesia
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1">
              Server Minecraft lokal terpopuler: Kaizen Network, MineGens, Alwination, Valoria SMP, dan ZEETEZ LEGENDS.
            </p>
          </div>
          <button
            onClick={() => onNavigate('servers')}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-950/80 border border-emerald-800 px-3.5 py-2 rounded-xl transition-all shrink-0"
          >
            <span>Lihat Semua Server</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Server Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDO_SERVERS.map((server) => (
            <div
              key={server.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/70 hover:border-emerald-500/60 transition-all overflow-hidden shadow-lg hover:shadow-emerald-950/40"
            >
              <div className="relative aspect-[16/7] w-full overflow-hidden bg-neutral-950">
                <SafeImage
                  src={server.image}
                  alt={server.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                <div className="absolute top-2.5 left-2.5 bg-black/80 border border-neutral-700 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {server.countryFlag} Host Indonesia
                </div>
                <div className="absolute top-2.5 right-2.5 bg-emerald-950/90 border border-emerald-800 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <Wifi className="h-3 w-3 animate-pulse" />
                  <span>{server.playerCountEst}</span>
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
                  <div className="flex flex-wrap gap-1 mt-2">
                    {server.modes.slice(0, 3).map((mode, i) => (
                      <span key={i} className="text-[10px] bg-neutral-950 text-neutral-300 border border-neutral-800 px-2 py-0.5 rounded">
                        {mode}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={getEffectiveIp(server)}
                      onChange={(e) => handleIpChange(server.id, e.target.value)}
                      title="Ubah IP server jika Anda menggunakan domain kustom"
                      className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 font-mono text-xs text-emerald-400 font-bold focus:border-emerald-500 focus:outline-none select-all"
                    />
                    <button
                      onClick={() => handleCopyIp(server)}
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 transition-all shrink-0"
                    >
                      {copiedIp === server.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedIp === server.id ? 'Disalin' : 'Salin IP'}</span>
                    </button>
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono flex items-center justify-between">
                    <span>Java: 25565 | Bedrock: {server.bedrockPort || 19132}</span>
                    <span className="text-emerald-400 font-sans font-semibold">✓ IP Resmi</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MINECRAFT-MP CALLOUT BANNER (Gambar fcffa648.png) */}
        <div className="rounded-2xl border border-sky-800/80 bg-gradient-to-r from-sky-950/80 via-neutral-900 to-neutral-950 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-5 z-10">
            <SafeImage
              src="/assets/aistudio/image_fcffa648.png"
              alt="Minecraft MP Indonesia Servers"
              className="h-20 w-auto rounded-xl border border-sky-500/40 object-cover shadow-lg shrink-0"
            />
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 bg-sky-950/90 border border-sky-800 px-2.5 py-0.5 rounded-full">
                <Globe className="h-3.5 w-3.5" />
                <span>DIREKTORI SERVER INDONESIA LENGKAP</span>
              </div>
              <h3 className="text-xl font-black text-white tracking-tight">
                Mau Server Indonesia Yang Lebih Lengkap?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
                Kunjungi situs <strong className="text-sky-300 font-mono">https://minecraft-mp.com/country/indonesia/</strong> untuk melihat ratusan server Minecraft Java Edition Indonesia terpopuler lainnya dengan sistem voting &amp; statistik player realtime.
              </p>
            </div>
          </div>

          <a
            href={MINECRAFT_MP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-500 px-6 py-3 text-xs sm:text-sm font-bold text-white transition-all shadow-lg shadow-sky-950 shrink-0 z-10 group"
          >
            <span>Kunjungi Minecraft-MP.com 🇮🇩</span>
            <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </section>

      {/* 4. SECURITY CHECKLIST BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-neutral-800 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-emerald-950/30 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <CheckSquare className="h-4 w-4" />
              <span>Checklist Keamanan PC 5 Langkah</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Khawatir Laptop Anda Sudah Terinfeksi Launcher Berbahaya?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Jalankan checklist interaktif untuk memeriksa apakah file <code className="text-amber-300 bg-neutral-950 px-1 py-0.5 rounded">C:\Windows\System32\drivers\etc\hosts</code> Anda dibajak oleh launcher pihak ketiga atau ada akun yang perlu diamankan.
            </p>
          </div>
          <button
            onClick={onOpenSafetyChecklist}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-950 hover:bg-emerald-500 transition-all shrink-0"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Mulai Tes Keamanan PC</span>
          </button>
        </div>
      </section>

      {/* 5. VIRUSTOTAL SECURITY CHECK BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-sky-900/60 bg-gradient-to-r from-sky-950/40 via-neutral-900 to-neutral-950 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
              <ExternalLink className="h-4 w-4" />
              <span>Pemeriksaan Antivirus Online</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Mau cek launcher aman? Kunjungi VirusTotal
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Anda dapat mengunggah berkas installer atau file .exe peluncur apa pun ke VirusTotal untuk dipindai oleh 70+ mesin antivirus engine dunia secara gratis.
            </p>
          </div>
          <a
            href="https://www.virustotal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-950 hover:bg-sky-500 transition-all shrink-0"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Kunjungi VirusTotal.com</span>
          </a>
        </div>
      </section>

      {/* Community Minecraft Hub Bottom Watermark */}
      <div className="pt-6 text-center text-xs font-mono text-neutral-400 tracking-wider uppercase border-t border-neutral-800/80">
        Community Minecraft Hub 2025 ©
      </div>
    </div>
  );
};

function sampleUploadAlert(
  launcher: LauncherItem | undefined,
  onOpenInvestigation: (launcher: LauncherItem) => void,
  buttonLabel: string
) {
  if (!launcher) return null;
  return (
    <button
      onClick={() => onOpenInvestigation(launcher)}
      className="w-full text-left p-2.5 rounded-lg border border-red-900/40 bg-red-950/40 hover:bg-red-900/30 flex items-center justify-between text-xs text-red-200 transition-colors"
    >
      <span className="font-semibold">{buttonLabel}</span>
      <ArrowRight className="h-3.5 w-3.5 text-red-400" />
    </button>
  );
}
