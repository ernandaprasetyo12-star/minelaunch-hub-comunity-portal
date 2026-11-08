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
  Sliders
} from 'lucide-react';
import { AppViewMode } from './Navbar';
import { LauncherItem } from '../data/launchers';
import { SafeImage } from './SafeImage';

interface HomePageProps {
  onNavigate: (view: AppViewMode) => void;
  onOpenSafetyChecklist: () => void;
  onOpenTour: () => void;
  onOpenSettings?: () => void;
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
  onOpenInvestigation,
  onOpenDetail,
  sampleLaunchers
}) => {
  return (
    <div className="space-y-12 pb-16">
      {/* 1. HERO SECTION WITH MINELAUNCH HUB COMMUNITY BRANDING */}
      <section className="relative overflow-hidden border-b border-neutral-800 bg-neutral-950">
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity pointer-events-none">
          <img
            src="/src/assets/images/mc_launchers_hero_1794042691092.jpg"
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
                <img
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
                    className="w-full h-full object-cover"
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
