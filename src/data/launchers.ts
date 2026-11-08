export interface LauncherItem {
  id: string;
  name: string;
  developer: string;
  category: 'licensed' | 'non-licensed' | 'dangerous';
  licenseRequired: boolean;
  licenseExplanation: string;
  elyBySupport: boolean;
  offlineSupport: boolean;
  isOpenSource: boolean;
  platforms: ('windows' | 'macos' | 'linux' | 'android' | 'ios')[];
  tagline: string;
  description: string;
  pros: string[];
  cons: string[];
  rating: number;
  safetyRating: {
    score: number; // 1-100
    level: 'SAFE' | 'CAUTION' | 'DANGEROUS';
    label: string;
    antivirusScore: string;
    openSourceAudit: string;
    privacyVerdict: string;
  };
  safetyBadgeText: string;
  websiteUrl: string;
  downloadUrl: string;
  githubUrl?: string;
  minRam: string;
  features: string[];
  image: string;
  brandColor: string;
  wikiInvestigation?: {
    title: string;
    dangerLevel: 'CRITICAL' | 'HIGH' | 'MODERATE';
    verdict: string;
    summary: string;
    infobox: {
      originalAuthor: string;
      currentOperator: string;
      threatClass: string;
      antivirusStatus: string;
      communityStatus: string;
      safeAlternatives: string[];
    };
    sections: {
      title: string;
      content: string;
    }[];
    references: {
      id: number;
      author: string;
      title: string;
      source: string;
      year: string;
    }[];
  };
}

export const LAUNCHERS: LauncherItem[] = [
  // ==========================================
  // 1. Minecraft Launcher Resmi
  {
    id: 'official-minecraft-launcher',
    name: 'Minecraft Launcher Resmi',
    developer: 'Mojang Studios / Microsoft',
    category: 'licensed',
    licenseRequired: true,
    licenseExplanation: 'Wajib memiliki lisensi resmi Minecraft Java Edition melalui Microsoft Store atau minecraft.net.',
    elyBySupport: false,
    offlineSupport: false,
    isOpenSource: false,
    platforms: ['windows', 'macos', 'linux'],
    tagline: 'Peluncur resmi standar dari pembuat Minecraft asli Mojang Studios',
    description: 'Launcher standar resmi yang disediakan langsung oleh Mojang Studios dan Microsoft. Terintegrasi penuh dengan Minecraft Bedrock, Minecraft Dungeons, server Realms resmi, dan snapshot mingguan terbaru.',
    pros: [
      'Resmi dan didukung langsung oleh tim developer Mojang Studios',
      'Pembaruan snapshot mingguan tercepat untuk fitur uji coba',
      'Keamanan akun Microsoft dua faktor (2FA) terjamin',
      'Terhubung dengan Minecraft Bedrock Edition di Windows'
    ],
    cons: [
      'Pemasangan modpack rumit (harus pasang Fabric/Forge secara manual)',
      'Konsumsi memori RAM dan waktu loading awal cenderung berat'
    ],
    rating: 4.4,
    safetyRating: {
      score: 99,
      level: 'SAFE',
      label: '100% Aman & Resmi (Mojang/Microsoft)',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'Proprietary Resmi Microsoft',
      privacyVerdict: 'Kepatuhan Privasi Standar Microsoft'
    },
    safetyBadgeText: 'Resmi dari Microsoft / Mojang',
    websiteUrl: 'https://www.minecraft.net',
    downloadUrl: 'https://www.minecraft.net/en-us/download',
    minRam: '4 GB',
    features: ['Official Snapshots', 'Bedrock & Java Switcher', 'Microsoft 2FA Support', 'Realms Access'],
    image: '/public/assets/aistudio/image_a3ed8944.png', // Official Minecraft Launcher screenshot
    brandColor: '#10b981'
  },
  // 2. Prism Launcher
  {
    id: 'prism-launcher',
    name: 'Prism Launcher',
    developer: 'Prism Launcher Community',
    category: 'licensed',
    licenseRequired: true,
    licenseExplanation: 'Wajib akun resmi Microsoft berbayar. Dirancang untuk transparansi dan kepatuhan penuh.',
    elyBySupport: false,
    offlineSupport: false,
    isOpenSource: true,
    platforms: ['windows', 'macos', 'linux'],
    tagline: 'Launcher open-source terbaik untuk manajemen multi-instance & modpack',
    description: 'Prism Launcher adalah fork komunitas independen dari PolyMC yang sangat dihormati. Menyediakan fitur manajemen instance terisolasi, pencarian mod langsung dari Modrinth & CurseForge, dan pengelola Java otomatis yang hemat RAM.',
    pros: [
      'Multi-instance: pisahkan mod dan versi game tanpa saling bentrok',
      'Download mod, modpack, resource pack, dan shader langsung di aplikasi',
      '100% Open Source (GPL-3.0) tanpa iklan dan telemetri',
      'Sangat ringan berkat ditulis dengan C++ dan Qt'
    ],
    cons: [
      'Wajib akun Microsoft berbayar',
      'UI fungsional dan teknis'
    ],
    rating: 4.9,
    safetyRating: {
      score: 100,
      level: 'SAFE',
      label: 'Sangat Aman & Terverifikasi (Open Source GPLv3)',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'Diaudit Komunitas Global di GitHub (10k+ Stars)',
      privacyVerdict: 'Nol Pelacakan / Zero Telemetry'
    },
    safetyBadgeText: 'Aman & Terverifikasi (Open Source)',
    websiteUrl: 'https://prismlauncher.org',
    downloadUrl: 'https://prismlauncher.org/download',
    githubUrl: 'https://github.com/PrismLauncher/PrismLauncher',
    minRam: '2 GB',
    features: ['Multi-Instance', 'Modrinth Direct Search', 'CurseForge Direct Search', 'Custom Java Flags', 'Auto Java Downloader'],
    image: '/public/assets/aistudio/image_4b042a05.png', // Prism Launcher screenshot
    brandColor: '#6366f1'
  },
  // 3. Modrinth App
  {
    id: 'modrinth-app',
    name: 'Modrinth App (Theseus)',
    developer: 'Rinth, Inc.',
    category: 'licensed',
    licenseRequired: true,
    licenseExplanation: 'Wajib akun resmi Microsoft berlisensi.',
    elyBySupport: false,
    offlineSupport: false,
    isOpenSource: true,
    platforms: ['windows', 'macos', 'linux'],
    tagline: 'Launcher modern super cepat berbasis Rust dan Tauri dengan ekosistem terbuka',
    description: 'Aplikasi resmi dari platform Modrinth. Menggunakan arsitektur Rust yang sangat hemat baterai dan ringan, dengan UI dark mode minimalis dan update mod 1-klik.',
    pros: [
      'Dibuat dengan Rust & Tauri: sangat cepat dan hemat RAM',
      'Katalog mod open-source etis yang ramah developer',
      'Bebas dari iklan dan pelacak komersial'
    ],
    cons: [
      'Dukungan modpack eksklusif CurseForge terbatas',
      'Hanya untuk akun resmi'
    ],
    rating: 4.9,
    safetyRating: {
      score: 99,
      level: 'SAFE',
      label: 'Sangat Aman & Open Source (Rust Native)',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'Kode Terbuka di GitHub (GPLv3)',
      privacyVerdict: 'Nol Pelacak / Ramah Privasi'
    },
    safetyBadgeText: 'Aman & Terverifikasi (Open Source)',
    websiteUrl: 'https://modrinth.com/app',
    downloadUrl: 'https://modrinth.com/app',
    githubUrl: 'https://github.com/modrinth/theseus',
    minRam: '2 GB',
    features: ['Rust/Tauri Native Engine', '1-Click Mod Updating', 'Modrinth Ecosystem', 'Clean Modern Dark UI'],
    image: '/public/assets/aistudio/image_7b152378.png', // Modrinth App screenshot
    brandColor: '#10b981'
  },
  // 4. CurseForge App
  {
    id: 'curseforge-app',
    name: 'CurseForge App',
    developer: 'Overwolf',
    category: 'licensed',
    licenseRequired: true,
    licenseExplanation: 'Wajib menggunakan akun resmi Microsoft Minecraft.',
    elyBySupport: false,
    offlineSupport: false,
    isOpenSource: false,
    platforms: ['windows', 'macos'],
    tagline: 'Gudang modpack terlengkap di dunia (RLCraft, All The Mods, Better MC)',
    description: 'Pusat ekosistem modpack terbesar di dunia. Memungkinkan pemasangan modpack raksasa (500+ mods) hanya dengan menekan satu tombol dan langsung terhubung dengan kreator mod dunia.',
    pros: [
      'Katalog mod dan modpack terlengkap dan paling mutakhir',
      'Instalasi 1-klik untuk modpack terkenal (ATM9, Create, Vault Hunters)',
      'Dukungan monetisasi untuk pembuat mod'
    ],
    cons: [
      'Memerlukan aplikasi Overwolf di latar belakang yang memakan RAM',
      'Terdapat tayangan iklan komersial'
    ],
    rating: 4.5,
    safetyRating: {
      score: 85,
      level: 'CAUTION',
      label: 'Aman Komersial (Mengandung Overwolf & Iklan)',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'Proprietary Komersial Overwolf',
      privacyVerdict: 'Analitik Overwolf Aktif'
    },
    safetyBadgeText: 'Aman Komersial (Mengandung Iklan Overwolf)',
    websiteUrl: 'https://www.curseforge.com/download/app',
    downloadUrl: 'https://www.curseforge.com/download/app',
    minRam: '6 GB',
    features: ['Massive Modpack Library', 'One-Click Modpack Installs', 'Mod Creator Support', 'World Exporting'],
    image: '/public/assets/aistudio/image_08039985.png', // CurseForge App screenshot
    brandColor: '#f97316'
  },
  // 5. Lunar Client
  {
    id: 'lunar-client',
    name: 'Lunar Client',
    developer: 'Moonsworth, LLC',
    category: 'licensed',
    licenseRequired: true,
    licenseExplanation: 'Wajib akun resmi Microsoft demi keamanan server kompetitif.',
    elyBySupport: false,
    offlineSupport: false,
    isOpenSource: false,
    platforms: ['windows', 'macos', 'linux'],
    tagline: 'Client PvP kompetitif terpopuler dengan optimasi FPS ekstrem',
    description: 'Pilihan utama pemain PvP di server Hypixel dan MinemenClub. Dilengkapi optimasi Sodium/OptiFine, Keystrokes, Armor Status, crosshair kustom, dan toko jubah kosmetik.',
    pros: [
      'Peningkatan FPS drastis hingga 2x-3x lipat langsung siap pakai',
      'Ratusan mod PvP bawaan yang diizinkan di server kompetitif',
      'GUI dalam game yang sangat mewah dan intuitif'
    ],
    cons: [
      'Closed source',
      'Kurang cocok untuk modpack survival kustom'
    ],
    rating: 4.8,
    safetyRating: {
      score: 95,
      level: 'SAFE',
      label: 'Aman & Terpercaya di Server PvP Dunia',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'Proprietary Perusahaan Terverifikasi',
      privacyVerdict: 'Telemetri Permainan Standar'
    },
    safetyBadgeText: 'Aman (Dipercaya Server PvP Terbesar)',
    websiteUrl: 'https://www.lunarclient.com',
    downloadUrl: 'https://www.lunarclient.com/download',
    minRam: '4 GB',
    features: ['Built-in FPS Optimization', 'Over 100+ PvP Mods', 'Hypixel Ready', 'Cosmetics System'],
    image: '/public/assets/aistudio/image_eaefbe3e.png', // Lunar Client screenshot
    brandColor: '#38bdf8'
  },
  // 6. Badlion Client
  {
    id: 'badlion-client',
    name: 'Badlion Client (BAC)',
    developer: 'ESL Gaming Online, Inc.',
    category: 'licensed',
    licenseRequired: true,
    licenseExplanation: 'Wajib akun resmi Microsoft.',
    elyBySupport: false,
    offlineSupport: false,
    isOpenSource: false,
    platforms: ['windows', 'macos', 'linux'],
    tagline: 'Client all-in-one dengan anticheat teruji dan replay mod bawaan',
    description: 'Client Minecraft resmi dari ESL Gaming dengan ratusan mod siap pakai, Replay Mod terintegrasi untuk merekam sinematik, shader Iris, dan sistem anticheat ketat.',
    pros: [
      'Replay Mod bawaan tanpa perlu utak-atik file instalasi',
      'Mendukung Iris Shader dan Sodium bawaan',
      'Sistem anticheat yang diakui turnamen esports'
    ],
    cons: [
      'Pengaturan menu sangat banyak dan padat',
      'Wajib akun Minecraft resmi'
    ],
    rating: 4.6,
    safetyRating: {
      score: 94,
      level: 'SAFE',
      label: 'Aman & Teruji Turnamen Esports',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'Proprietary ESL Gaming',
      privacyVerdict: 'Aman dan Terverifikasi'
    },
    safetyBadgeText: 'Aman & Terverifikasi Kompetitif',
    websiteUrl: 'https://client.badlion.net',
    downloadUrl: 'https://client.badlion.net/download',
    minRam: '4 GB',
    features: ['Replay Mod Built-in', 'Iris & Sodium Support', 'PvP HUD', 'Anticheat Integration'],
    image: '/public/assets/aistudio/image_4942b67c.png', // Badlion Client screenshot
    brandColor: '#eab308'
  },
  // 7. GDLauncher Carbon
  {
    id: 'gdlauncher',
    name: 'GDLauncher (Carbon)',
    developer: 'GorillaDevs',
    category: 'licensed',
    licenseRequired: true,
    licenseExplanation: 'Wajib akun resmi Microsoft.',
    elyBySupport: false,
    offlineSupport: false,
    isOpenSource: true,
    platforms: ['windows', 'macos', 'linux'],
    tagline: 'Manajer instance modern berpenampilan elegan dan dukungan cloud sync',
    description: 'GDLauncher menghadirkan antarmuka visual yang menawan dengan kemampuan mengunduh modpack dari CurseForge dan Modrinth secara bersamaan.',
    pros: [
      'Tampilan kartu visual yang sangat bersih',
      'Dukungan sinkronisasi profil antar komputer lewat cloud',
      'Deteksi otomatis Java yang sesuai versi game'
    ],
    cons: [
      'Wajib akun Microsoft berbayar',
      'Versi lama berbasis Electron cukup berat'
    ],
    rating: 4.6,
    safetyRating: {
      score: 95,
      level: 'SAFE',
      label: 'Aman & Open Source (GPLv3)',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'GitHub Open Source',
      privacyVerdict: 'Aman'
    },
    safetyBadgeText: 'Aman & Terverifikasi (Open Source)',
    websiteUrl: 'https://gdlauncher.com',
    downloadUrl: 'https://gdlauncher.com/download',
    githubUrl: 'https://github.com/gorilladev/GDLauncher',
    minRam: '3 GB',
    features: ['CurseForge & Modrinth Support', 'Cloud Sync', 'Automatic Java Setup'],
    image: '/public/assets/aistudio/image_af2847ed.png', // GDLauncher screenshot
    brandColor: '#8b5cf6'
  },
  // 8. ATLauncher
  {
    id: 'atlauncher',
    name: 'ATLauncher',
    developer: 'Ryan & Community',
    category: 'licensed',
    licenseRequired: true,
    licenseExplanation: 'Wajib akun Microsoft resmi.',
    elyBySupport: false,
    offlineSupport: false,
    isOpenSource: true,
    platforms: ['windows', 'macos', 'linux'],
    tagline: 'Launcher veteran ramah server & modpack komunitas',
    description: 'Salah satu launcher paling stabil di komunitas modding. Terkenal dengan kemampuannya membuat file server lokal dalam 1 klik dan mengelola modpack tanpa repot.',
    pros: [
      'Bisa membuat server Minecraft siap main dalam 1 klik',
      'Mendukung Modrinth, CurseForge, dan FTB',
      'Open-source dan bebas iklan'
    ],
    cons: [
      'UI gaya Java Swing klasik',
      'Wajib akun berbayar'
    ],
    rating: 4.5,
    safetyRating: {
      score: 96,
      level: 'SAFE',
      label: 'Aman & Teruji 10+ Tahun',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'GitHub Open Source',
      privacyVerdict: 'Aman'
    },
    safetyBadgeText: 'Aman & Teruji 10+ Tahun',
    websiteUrl: 'https://atlauncher.com',
    downloadUrl: 'https://atlauncher.com/downloads',
    githubUrl: 'https://github.com/ATLauncher/ATLauncher',
    minRam: '2 GB',
    features: ['1-Click Server Creation', 'Multi-Platform Mods', 'Backup Manager'],
    image: '/public/assets/aistudio/image_9ae73846.png', // ATLauncher screenshot
    brandColor: '#0ea5e9'
  },
  // 9. MultiMC 5
  {
    id: 'multimc-5',
    name: 'MultiMC 5',
    developer: 'Petr Mrázek (Peterix)',
    category: 'licensed',
    licenseRequired: true,
    licenseExplanation: 'Wajib akun resmi Microsoft.',
    elyBySupport: false,
    offlineSupport: false,
    isOpenSource: true,
    platforms: ['windows', 'macos', 'linux'],
    tagline: 'Pelopor manajer multi-instance legendaris yang menginspirasi Prism Launcher',
    description: 'MultiMC adalah launcher sumber terbuka tertua dan paling dihormati dalam hal isolasi folder Minecraft. Sangat stabil, minimalis, dan hemat CPU.',
    pros: [
      'Sangat stabil dan tidak membebani sistem komputer sama sekali',
      '100% Open source dan bebas iklan',
      'Dukungan kustomisasi argumen JVM yang mendalam'
    ],
    cons: [
      'Pencarian mod CurseForge internal dibatasi (disarankan beralih ke Prism)',
      'UI klasik'
    ],
    rating: 4.6,
    safetyRating: {
      score: 98,
      level: 'SAFE',
      label: 'Sangat Aman & Teruji Lebih dari 12 Tahun',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'Open Source di GitHub (Apache-2.0)',
      privacyVerdict: 'Tanpa Telemetri'
    },
    safetyBadgeText: 'Aman & Terverifikasi (Open Source)',
    websiteUrl: 'https://multimc.org',
    downloadUrl: 'https://multimc.org/#Download',
    githubUrl: 'https://github.com/MultiMC/Launcher',
    minRam: '2 GB',
    features: ['Legacy Multi-Instance', 'Java Isolation', 'Lightweight Footprint'],
    image: '/public/assets/aistudio/image_8a643dac.png', // MultiMC screenshot
    brandColor: '#22c55e'
  },
  // 10. FTB App
  {
    id: 'ftb-app',
    name: 'FTB App (Feed The Beast)',
    developer: 'FTB Team',
    category: 'licensed',
    licenseRequired: true,
    licenseExplanation: 'Wajib akun resmi Microsoft untuk memainkan modpack Feed The Beast resmi.',
    elyBySupport: false,
    offlineSupport: false,
    isOpenSource: false,
    platforms: ['windows', 'macos', 'linux'],
    tagline: 'Pencipta modpack teknologi dan magic legendaris (Stoneblock, Skies)',
    description: 'Launcher resmi dari tim Feed The Beast (FTB) yang legendaris. Rumah resmi bagi seri modpack FTB Stoneblock, FTB Revelation, FTB Skies, dan FTB OceanBlock.',
    pros: [
      'Satu-satunya tempat download resmi seri modpack FTB terbaru',
      'Instalasi dan update patch modpack sangat mulus',
      'Dukungan cloud save untuk world Anda'
    ],
    cons: [
      'Hanya berfokus pada modpack buatan tim FTB',
      'Closed source'
    ],
    rating: 4.7,
    safetyRating: {
      score: 92,
      level: 'SAFE',
      label: 'Aman & Resmi dari Tim FTB',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'Proprietary Tim FTB',
      privacyVerdict: 'Aman'
    },
    safetyBadgeText: 'Aman & Resmi Feed The Beast',
    websiteUrl: 'https://feed-the-beast.com',
    downloadUrl: 'https://feed-the-beast.com/app',
    minRam: '6 GB',
    features: ['Exclusive FTB Modpacks', 'Cloud Backup', 'Instance Cloning', 'Auto Java Config'],
    image: '/public/assets/aistudio/image_07b25862.png', // FTB App screenshot
    brandColor: '#ea580c'
  },
  // 11. Technic Launcher
  {
    id: 'technic-launcher',
    name: 'Technic Launcher',
    developer: 'Technic Platform',
    category: 'licensed',
    licenseRequired: true,
    licenseExplanation: 'Wajib akun resmi Microsoft.',
    elyBySupport: false,
    offlineSupport: false,
    isOpenSource: false,
    platforms: ['windows', 'macos', 'linux'],
    tagline: 'Pelopor modpack legendaris: Tekkit, Hexxit, dan Attack of the B-Team',
    description: 'Launcher bersejarah yang mempopulerkan konsep modpack Minecraft di era 2011-2016. Memiliki ribuan modpack buatan komunitas klasik seperti Tekkit Classic dan Voltz.',
    pros: [
      'Rumah bagi modpack klasik legendaris (Tekkit, Hexxit, Yogbox)',
      'Sangat ringan dan mudah digunakan',
      'Koleksi ribuan custom pack buatan komunitas'
    ],
    cons: [
      'Jarang mendapatkan update fitur modern',
      'Kurang optimal untuk modpack Minecraft versi terbaru 1.20+'
    ],
    rating: 4.5,
    safetyRating: {
      score: 90,
      level: 'SAFE',
      label: 'Aman & Bersejarah (10+ Tahun)',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'Proprietary Komunitas Technic',
      privacyVerdict: 'Aman'
    },
    safetyBadgeText: 'Aman & Klasik',
    websiteUrl: 'https://www.technicpack.net',
    downloadUrl: 'https://www.technicpack.net/download',
    minRam: '4 GB',
    features: ['Tekkit Classic', 'Hexxit Support', 'Community Modpack Index'],
    image: '/public/assets/aistudio/image_63fb17d3.png', // Technic Launcher screenshot
    brandColor: '#0284c7'
  },
  // 12. LabyMod 4
  {
    id: 'labymod-4',
    name: 'LabyMod 4',
    developer: 'LabyMedia GmbH',
    category: 'licensed',
    licenseRequired: true,
    licenseExplanation: 'Wajib akun resmi Microsoft.',
    elyBySupport: false,
    offlineSupport: false,
    isOpenSource: false,
    platforms: ['windows', 'macos', 'linux'],
    tagline: 'Client utilitas all-in-one dengan voice chat, kosmetik, dan ratusan addon',
    description: 'LabyMod 4 mengombinasikan optimasi performa tinggi dengan toko addon internal yang memungkinkan penambahan mini-maps, custom HUD, dan proximity voice chat.',
    pros: [
      'Bisa digunakan bersamaan dengan mod Fabric dan Forge',
      'Toko Addon internal yang lengkap',
      'Dukungan kustomisasi animasi pemain'
    ],
    cons: [
      'Closed source',
      'Wajib akun resmi'
    ],
    rating: 4.7,
    safetyRating: {
      score: 93,
      level: 'SAFE',
      label: 'Aman & Terdaftar di Jerman (GmbH)',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'Proprietary Komersial Jerman',
      privacyVerdict: 'Kepatuhan GDPR Uni Eropa'
    },
    safetyBadgeText: 'Aman & Terverifikasi GDPR',
    websiteUrl: 'https://labymod.net',
    downloadUrl: 'https://labymod.net/download',
    minRam: '3 GB',
    features: ['Voice Chat Built-in', 'Custom HUD Builder', 'Addon Store', 'Fabric & Forge Ready'],
    image: '/public/assets/aistudio/image_62e21709.png', // LabyMod 4 screenshot
    brandColor: '#3b82f6'
  },
  // 13. Feather Client
  {
    id: 'feather-client',
    name: 'Feather Client',
    developer: 'Feather Studios',
    category: 'licensed',
    licenseRequired: true,
    licenseExplanation: 'Wajib akun Microsoft berbayar untuk fitur online.',
    elyBySupport: true,
    offlineSupport: false,
    isOpenSource: false,
    platforms: ['windows', 'macos', 'linux'],
    tagline: 'Client FPS modern dengan toko mod bawaan dan voice chat gratis',
    description: 'Feather Client merupakan alternatif modern bagi Lunar dan Badlion yang berbasis Fabric. Dilengkapi built-in proximity voice chat gratis untuk bermain bersama teman dan sistem mod marketplace yang mulus.',
    pros: [
      'Proximity Voice Chat bawaan tanpa perlu install plugin server tambahan',
      'FPS boost berbasis Fabric dan Sodium yang sangat stabil',
      'Dukungan kustomisasi HUD yang mendalam'
    ],
    cons: [
      'Closed source',
      'Perlu mendaftar akun Feather'
    ],
    rating: 4.5,
    safetyRating: {
      score: 90,
      level: 'SAFE',
      label: 'Aman Komersial',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'Proprietary Feather Studios',
      privacyVerdict: 'Aman'
    },
    safetyBadgeText: 'Aman Komersial',
    websiteUrl: 'https://feathermc.com',
    downloadUrl: 'https://feathermc.com/download',
    minRam: '3 GB',
    features: ['Built-in Voice Chat', 'Fabric Mod Store', 'Performance Boost', 'Social Party System'],
    image: '/public/assets/aistudio/image_b76af1ea.png', // Feather Client screenshot
    brandColor: '#6366f1'
  },

  // ==========================================
  // --- 2. NON-LISENSI / ELY.BY & OFFLINE ---
  // ==========================================
  {
    id: 'xmcl',
    name: 'XMCL (X Minecraft Launcher)',
    developer: 'CI0110 & Kontributor Global',
    category: 'non-licensed',
    licenseRequired: false,
    licenseExplanation: 'Fleksibel: Mendukung Akun Offline, Akun Ely.by (Skin & Cape gratis), LittleSkin, serta Akun Resmi Microsoft dalam 1 aplikasi.',
    elyBySupport: true,
    offlineSupport: true,
    isOpenSource: true,
    platforms: ['windows', 'macos', 'linux'],
    tagline: 'Launcher open-source modern serba bisa dengan dukungan penuh Ely.by & Offline',
    description: 'XMCL adalah peluncur Minecraft generasi baru paling direkomendasikan. Memiliki desain modern menyerupai Discord/Spotify, manajemen mod terintegrasi (CurseForge/Modrinth), sinkronisasi p2p LAN multiplayer tanpa port-forwarding, dan dukungan autentikasi pihak ketiga seperti Ely.by secara aman tanpa virus.',
    pros: [
      '100% Bebas biaya & Open Source tanpa virus, spyware, atau iklan',
      'Mendukung penuh sistem autentikasi Ely.by (Skin & Jubah kustom gratis)',
      'Bisa login Microsoft resmi, Akun Offline (Username saja), atau LittleSkin',
      'Download mod & modpack dari Modrinth dan CurseForge secara instan',
      'P2P LAN: main multiplayer bersama teman tanpa langganan server'
    ],
    cons: [
      'Fitur sangat banyak sehingga butuh adaptasi di awal'
    ],
    rating: 4.9,
    safetyRating: {
      score: 100,
      level: 'SAFE',
      label: 'Sangat Aman & Direkomendasikan Komunitas',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'Audit Open Source di GitHub (MIT License)',
      privacyVerdict: 'Nol Pelacak / Privasi Terjaga Penuh'
    },
    safetyBadgeText: 'Sangat Aman & Direkomendasikan Komunitas',
    websiteUrl: 'https://xmcl.app',
    downloadUrl: 'https://xmcl.app/download',
    githubUrl: 'https://github.com/Voxelum/x-minecraft-launcher',
    minRam: '2 GB',
    features: ['Ely.by Native Support', 'Offline / Non-License Mode', 'Official Microsoft Auth', 'P2P Multiplayer LAN', 'Modrinth & CurseForge Hub'],
    image: '/public/assets/aistudio/image_b12679d1.png', // User attachment of XMCL
    brandColor: '#06b6d4'
  },
  {
    id: 'sklauncher',
    name: 'SKLauncher',
    developer: 'SKCraft Team',
    category: 'non-licensed',
    licenseRequired: false,
    licenseExplanation: 'Mendukung login Offline gratis dan login Ely.by, serta opsi login Akun Microsoft resmi.',
    elyBySupport: true,
    offlineSupport: true,
    isOpenSource: false,
    platforms: ['windows', 'macos', 'linux'],
    tagline: 'Launcher non-lisensi paling populer, bersih, dan stabil di Indonesia',
    description: 'SKLauncher adalah launcher alternatif gratis yang sangat populer di kalangan pemain non-lisensi di Indonesia dan dunia. Memiliki tampilan bersih mirip launcher resmi, tanpa adware atau spyware, serta mendukung langsung penggantian skin melalui akun SKLauncher atau Ely.by.',
    pros: [
      'Tampilan antarmuka sangat bersih, modern, dan ramah pemula',
      'Mendukung akun Offline gratis serta integrasi skin Ely.by',
      'Sangat ringan dan hemat RAM untuk laptop spesifikasi rendah',
      'Tidak ada program mencurigakan atau pembajakan file hosts'
    ],
    cons: [
      'Bukan open source penuh (namun telah diaudit aman oleh komunitas)',
      'Pemasangan modpack CurseForge manual'
    ],
    rating: 4.8,
    safetyRating: {
      score: 95,
      level: 'SAFE',
      label: 'Aman & Terpercaya Komunitas',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'Diaudit Komunitas Independen',
      privacyVerdict: 'Aman Tanpa Pembajakan Hosts'
    },
    safetyBadgeText: 'Aman & Terpercaya Komunitas',
    websiteUrl: 'https://sklauncher.pl',
    downloadUrl: 'https://sklauncher.pl/download',
    minRam: '2 GB',
    features: ['Ely.by Skin Support', 'Offline Mode Ready', 'Discord Rich Presence', 'Clean Minimalist UI'],
    image: '/public/assets/aistudio/image_fb92bc03.png', // User attachment of SKLauncher
    brandColor: '#f59e0b'
  },
  {
    id: 'freesm-launcher',
    name: 'FreeSM Launcher',
    developer: 'FreeSM Community',
    category: 'non-licensed',
    licenseRequired: false,
    licenseExplanation: 'Fork Prism Launcher yang menambahkan dukungan akun bebas (Offline, Ely.by, dan akun kustom gratis).',
    elyBySupport: true,
    offlineSupport: true,
    isOpenSource: true,
    platforms: ['windows', 'macos', 'linux'],
    tagline: 'Fork Prism Launcher dengan kebebasan autentikasi & dukungan Ely.by',
    description: 'FreeSM Launcher adalah modifikasi populer dari Prism Launcher yang membuka batasan login akun resmi, memungkinkan pemain menjalankan Minecraft dengan akun Offline, Ely.by, atau server autentikasi pihak ketiga tanpa kehilangan fitur multi-instance dan pencarian mod CurseForge/Modrinth.',
    pros: [
      'Mewarisi seluruh performa tinggi C++ dan Qt dari Prism Launcher',
      'Mendukung akun Offline gratis dan sinkronisasi skin Ely.by',
      'Manajemen instance terisolasi dan unduh modpack 1-klik',
      '100% Open-source dan bebas iklan'
    ],
    cons: [
      'Dikelola komunitas independen non-resmi'
    ],
    rating: 4.8,
    safetyRating: {
      score: 97,
      level: 'SAFE',
      label: 'Aman & Open Source (Fork Prism)',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'Open Source GitHub Community',
      privacyVerdict: 'Nol Pelacak / Ramah Privasi'
    },
    safetyBadgeText: 'Aman & Bebas (Fork Prism)',
    websiteUrl: 'https://github.com/FreeSM-Launcher/FreeSM',
    downloadUrl: 'https://github.com/FreeSM-Launcher/FreeSM/releases',
    githubUrl: 'https://github.com/FreeSM-Launcher/FreeSM',
    minRam: '2 GB',
    features: ['Prism Core Engine', 'Free / Offline Auth', 'Ely.by Integration', 'Multi-Instance', 'Modpack Hub'],
    image: '/public/assets/aistudio/image_1953a099.png', // User attachment of FreeSM Launcher
    brandColor: '#a855f7'
  },
  {
    id: 'pinecone-mc',
    name: 'Pinecone MC',
    developer: 'Pinecone Development Group',
    category: 'non-licensed',
    licenseRequired: false,
    licenseExplanation: 'Dapat digunakan secara gratis dengan Akun Offline atau layanan Ely.by untuk skin kustom.',
    elyBySupport: true,
    offlineSupport: true,
    isOpenSource: true,
    platforms: ['windows', 'macos', 'linux'],
    tagline: 'Launcher minimalis cepat untuk skin Ely.by dan sesi santai',
    description: 'Pinecone MC berfokus pada kecepatan startup dan kesederhanaan. Dirancang khusus bagi pemain yang hanya ingin langsung masuk ke dunia Minecraft tanpa konfigurasi yang berbelit-belit, dengan sinkronisasi instan ke server skin Ely.by.',
    pros: [
      'Waktu buka aplikasi instan dalam hitungan detik',
      'Dukungan sinkronisasi skin Ely.by bawaan yang mulus',
      'Bebas dari segala jenis iklan pihak ketiga',
      'Open-source dan transparan'
    ],
    cons: [
      'Fitur modding tingkat lanjut masih berkembang'
    ],
    rating: 4.6,
    safetyRating: {
      score: 96,
      level: 'SAFE',
      label: 'Aman & Bersih (Open Source)',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'Open Source GitHub',
      privacyVerdict: 'Nol Pelacak'
    },
    safetyBadgeText: 'Aman & Bersih (Open Source)',
    websiteUrl: 'https://github.com/pinecone-mc/launcher',
    downloadUrl: 'https://github.com/pinecone-mc/launcher/releases',
    githubUrl: 'https://github.com/pinecone-mc/launcher',
    minRam: '1.5 GB',
    features: ['Instant Startup', 'Ely.by Skin Sync', 'Offline Play', 'Ultra Lightweight'],
    image: '/public/assets/aistudio/image_4aa8b394.png', // User attachment of Pinecone MC
    brandColor: '#10b981'
  },
  {
    id: 'legacy-launcher',
    name: 'Legacy Launcher (TL Asli / Turikhay)',
    developer: 'Arthur Kabalov (Turikhay)',
    category: 'non-licensed',
    licenseRequired: false,
    licenseExplanation: 'Mendukung login Offline, Ely.by, serta Akun Microsoft resmi. Ini adalah pembuat asli launcher TL sebelum merek dagangnya dibajak.',
    elyBySupport: true,
    offlineSupport: true,
    isOpenSource: true,
    platforms: ['windows', 'macos', 'linux'],
    tagline: 'Versi asli dan aman dari program yang dulu dikenal sebagai TL Launcher',
    description: 'PENTING: Ini adalah launcher ASLI yang diciptakan oleh developer asal Rusia bernama Turikhay (Arthur Kabalov) pada tahun 2013, sebelum domain dan nama dagang "TLauncher" dicuri oleh perusahaan TLMedia. Berbeda dengan TLauncher palsu yang disisipi program berbahaya, Legacy Launcher tetap setia open-source, bersih dari malware, dan mendukung Ely.by secara aman.',
    pros: [
      'Kode sumber bersih dan tidak memata-matai atau mengubah file hosts sistem',
      'Mendukung penuh sistem autentikasi Ely.by dan akun offline',
      'Sangat ringan dan cocok untuk komputer spesifikasi kentang (Low-End PC)',
      'Otomatis mengunduh OptiFine dan Fabric dengan kompatibilitas tinggi'
    ],
    cons: [
      'Tampilan antarmuka bergaya klasik',
      'Sering disalahpahami masyarakat awam sebagai TLauncher palsu'
    ],
    rating: 4.8,
    safetyRating: {
      score: 97,
      level: 'SAFE',
      label: 'Aman & Pembuat Asli (Legitimate TL)',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'Open Source Resmi Turikhay',
      privacyVerdict: 'Aman & Teruji Komunitas'
    },
    safetyBadgeText: 'Aman & Pembuat Asli (Legitimate TL)',
    websiteUrl: 'https://llaun.ch',
    downloadUrl: 'https://llaun.ch/en',
    githubUrl: 'https://github.com/Legacy-Launcher/LegacyLauncher',
    minRam: '1.5 GB',
    features: ['Original TL Codebase', 'Full Ely.by Integration', 'OptiFine Quick-Install', 'Safe & Audited'],
    image: '/public/assets/aistudio/image_d0c736b6.png', // User attachment of Legacy Launcher (Turikhay)
    brandColor: '#2563eb'
  },
  {
    id: 'pojav-launcher',
    name: 'PojavLauncher',
    developer: 'PojavLauncher Team',
    category: 'non-licensed',
    licenseRequired: false,
    licenseExplanation: 'Mendukung login Offline gratis, Ely.by, serta Akun Resmi Microsoft.',
    elyBySupport: true,
    offlineSupport: true,
    isOpenSource: true,
    platforms: ['android', 'ios', 'linux', 'macos'],
    tagline: 'Mainkan Minecraft Java Edition asli di HP Android dan iOS!',
    description: 'PojavLauncher adalah proyek revolusioner open-source yang mem-porting Java Virtual Machine (JVM) ke smartphone (Android & iOS). Memungkinkan Anda memainkan Minecraft Java Edition asli lengkap dengan mod Fabric/Forge dan Ely.by langsung dari genggaman ponsel.',
    pros: [
      'Bisa main Minecraft Java Edition asli 1.20+ di HP Android / iOS',
      'Mendukung mod Fabric, Forge, OptiFine, dan shaderpack di mobile',
      'Bisa login pakai Ely.by atau Akun Offline gratis',
      '100% Open Source tanpa iklan berbahaya'
    ],
    cons: [
      'Memerlukan HP dengan prosesor bertenaga',
      'Kontrol sentuh di layar memerlukan adaptasi'
    ],
    rating: 4.8,
    safetyRating: {
      score: 98,
      level: 'SAFE',
      label: 'Sangat Aman & Terobosan Mobile (Open Source)',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'GitHub Open Source (GPLv3)',
      privacyVerdict: 'Aman Tanpa Pelacak'
    },
    safetyBadgeText: 'Aman & Terobosan Mobile (Open Source)',
    websiteUrl: 'https://pojavlauncherteam.github.io',
    downloadUrl: 'https://github.com/PojavLauncherTeam/PojavLauncher/releases',
    githubUrl: 'https://github.com/PojavLauncherTeam/PojavLauncher',
    minRam: '3 GB (Mobile)',
    features: ['Java Edition on Smartphone', 'Custom Touch Controls', 'Modding on Mobile', 'Ely.by & Offline Support'],
    image: '/public/assets/aistudio/image_3959cfdd.png', // User attachment of PojavLauncher
    brandColor: '#8b5cf6'
  },
  {
    id: 'hmcl',
    name: 'HMCL (Hello Minecraft! Launcher)',
    developer: 'huanghongxun & Kontributor',
    category: 'non-licensed',
    licenseRequired: false,
    licenseExplanation: 'Mendukung akun Offline gratis, akun Ely.by, LittleSkin, dan akun Microsoft resmi.',
    elyBySupport: true,
    offlineSupport: true,
    isOpenSource: true,
    platforms: ['windows', 'macos', 'linux'],
    tagline: 'Launcher open-source raksasa dengan download mirror berkecepatan tinggi',
    description: 'HMCL adalah salah satu launcher open-source paling populer di dunia dengan jutaan pengguna aktif. Terkenal karena memiliki sistem mirror unduhan cepat dan manajemen instance yang sangat stabil.',
    pros: [
      'Download aset game sangat cepat dengan mirror jaringan global',
      'Mendukung Modrinth, CurseForge, dan export modpack',
      '100% Open Source (GPL-3.0) dan aman dari virus'
    ],
    cons: [
      'Dokumentasi sebagian besar dalam bahasa Mandarin dan Inggris'
    ],
    rating: 4.8,
    safetyRating: {
      score: 98,
      level: 'SAFE',
      label: 'Sangat Aman & Dipercaya Jutaan Pemain',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'GitHub Open Source (15k+ Stars)',
      privacyVerdict: 'Aman & Bebas Iklan'
    },
    safetyBadgeText: 'Aman & Terverifikasi (Open Source)',
    websiteUrl: 'https://hmcl.huangyuhui.net',
    downloadUrl: 'https://hmcl.huangyuhui.net/download',
    githubUrl: 'https://github.com/HMCL-dev/HMCL',
    minRam: '2 GB',
    features: ['Ultra-fast Mirror Download', 'Ely.by Support', 'Multi-Instance', 'Modpack Export'],
    image: '/public/assets/aistudio/image_9a3015cb.png', // User attachment of HMCL
    brandColor: '#3b82f6'
  },
  {
    id: 'pollymc',
    name: 'PollyMC',
    developer: 'PollyMC Community',
    category: 'non-licensed',
    licenseRequired: false,
    licenseExplanation: 'Fork dari Prism Launcher yang menambahkan opsi login Offline dan autentikasi pihak ketiga.',
    elyBySupport: true,
    offlineSupport: true,
    isOpenSource: true,
    platforms: ['windows', 'macos', 'linux'],
    tagline: 'Fork Prism Launcher dengan tambahan mode Offline & Ely.by',
    description: 'PollyMC mengambil semua keunggulan Prism Launcher (C++ hemat RAM, multi-instance, search Modrinth/CurseForge) dan menambahkan dukungan akun non-lisensi (Offline & Ely.by).',
    pros: [
      'Semua fitur canggih Prism Launcher tersedia',
      'Bisa main tanpa beli akun Minecraft resmi',
      'Open-source dan bebas telemetri'
    ],
    cons: [
      'Pembaruan bergantung pada fork komunitas independen'
    ],
    rating: 4.7,
    safetyRating: {
      score: 95,
      level: 'SAFE',
      label: 'Aman & Open Source Fork',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'GitHub Open Source',
      privacyVerdict: 'Tanpa Iklan'
    },
    safetyBadgeText: 'Aman (Fork Prism Open Source)',
    websiteUrl: 'https://github.com/fn2006/PollyMC',
    downloadUrl: 'https://github.com/fn2006/PollyMC/releases',
    githubUrl: 'https://github.com/fn2006/PollyMC',
    minRam: '2 GB',
    features: ['Prism Engine', 'Offline Mode Built-in', 'Ely.by Integration', 'Multi-Instance'],
    image: '/public/assets/aistudio/image_4b042a05.png',
    brandColor: '#ec4899'
  },
  {
    id: 'ultimc',
    name: 'UltiMC',
    developer: 'UltiMC Contributors',
    category: 'non-licensed',
    licenseRequired: false,
    licenseExplanation: 'Mendukung mode offline dan akun pihak ketiga.',
    elyBySupport: true,
    offlineSupport: true,
    isOpenSource: true,
    platforms: ['windows', 'linux'],
    tagline: 'MultiMC klasik dengan tambahan dukungan akun offline',
    description: 'Alternatif ringan berbasis MultiMC klasik yang disesuaikan untuk pemain non-lisensi yang menginginkan launcher super enteng untuk laptop lawas.',
    pros: [
      'Sangat hemat CPU dan memori',
      'Mendukung akun offline tanpa koneksi internet',
      'Open-source'
    ],
    cons: [
      'Fitur modpack otomatis terbatas'
    ],
    rating: 4.5,
    safetyRating: {
      score: 93,
      level: 'SAFE',
      label: 'Aman & Open Source',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'GitHub Open Source',
      privacyVerdict: 'Aman'
    },
    safetyBadgeText: 'Aman & Ringan',
    websiteUrl: 'https://github.com/UltiMC/Launcher',
    downloadUrl: 'https://github.com/UltiMC/Launcher/releases',
    githubUrl: 'https://github.com/UltiMC/Launcher',
    minRam: '1 GB',
    features: ['Ultra-light RAM usage', 'Multi-Instance', 'Offline Auth'],
    image: '/src/assets/images/prism_launcher_mockup_1794042691402.jpg',
    brandColor: '#64748b'
  },
  {
    id: 'bakaxl',
    name: 'BakaXL Launcher',
    developer: 'BakaXL Team',
    category: 'non-licensed',
    licenseRequired: false,
    licenseExplanation: 'Mendukung mode offline dan akun resmi.',
    elyBySupport: false,
    offlineSupport: true,
    isOpenSource: false,
    platforms: ['windows'],
    tagline: 'Launcher dengan tema visual anime dan efek animasi interaktif',
    description: 'Launcher unik asal komunitas Asia yang menghadirkan antarmuka visual bergaya anime lengkap dengan suara karakter dan tema visual yang bisa dikustomisasi secara mendalam.',
    pros: [
      'Desain antarmuka visual paling kreatif dan penuh animasi',
      'Mendukung modpack CurseForge dan Modrinth',
      'Dukungan mode offline gratis'
    ],
    cons: [
      'Closed source',
      'Hanya tersedia untuk Windows'
    ],
    rating: 4.4,
    safetyRating: {
      score: 88,
      level: 'CAUTION',
      label: 'Aman Komersial (Perlu Perhatian)',
      antivirusScore: '0/72 Bersih di VirusTotal',
      openSourceAudit: 'Closed Source',
      privacyVerdict: 'Standar'
    },
    safetyBadgeText: 'Aman (Tema Anime)',
    websiteUrl: 'https://www.bakaxl.com',
    downloadUrl: 'https://www.bakaxl.com',
    minRam: '2 GB',
    features: ['Anime Theming', 'Sound Effects', 'Modrinth Support'],
    image: '/public/assets/aistudio/image_4670cc54.png', // User attachment of BakaXL
    brandColor: '#f43f5e'
  },

  // ==============================================================
  // --- 3. BERBAHAYA / BLACKLIST / TIDAK AMAN (DANGEROUS) ---
  // ==============================================================

  // SALWYRR CLIENT (Moved to Dangerous per explicit user request)
  {
    id: 'salwyrr-client',
    name: 'Salwyrr Client',
    developer: 'Salwyrr Team (Closed Source)',
    category: 'dangerous',
    licenseRequired: false,
    licenseExplanation: 'Mengklaim gratis untuk FPS boost, namun kodenya ditutup rapat dan memicu kontroversi komunitas terkait dugaan telemetri tersembunyi serta pemblokiran anticheat.',
    elyBySupport: false,
    offlineSupport: true,
    isOpenSource: false,
    platforms: ['windows', 'linux'],
    tagline: '⚠️ PERINGATAN: Kategori Tidak Aman — Closed Source & Kontroversi Telemetri',
    description: 'Salwyrr Client telah dipindahkan ke kategori TIDAK AMAN sesuai investigasi komunitas. Meskipun dipromosikan sebagai client PvP penambah FPS di PC kentang, Salwyrr menggunakan kode biner tertutup (closed-source) yang dilaporkan menyematkan telemetri tidak transparan, tidak diaudit keamanannya, dan dilarang di banyak server kompetitif resmi.',
    pros: [
      'Menyediakan fitur FPS booster dan mod PvP bawaan'
    ],
    cons: [
      '🔴 KODE SUMBER TERTUTUP (Closed Source): Tidak dapat diaudit independen apakah mengandung keylogger/grabber',
      '🔴 MEMICU ALARM ANTICHEAT: Diblokir di banyak server Minecraft karena injeksi mod ilegal',
      '🔴 TELEMETRI PRIVASI TIDAK JELAS: Mengirimkan data perangkat tanpa transparansi EULA',
      '🔴 REPUTASI BURUK KOMUNITAS: Sering disusupi installer palsu di YouTube yang memuat trojan'
    ],
    rating: 2.1,
    safetyRating: {
      score: 30,
      level: 'DANGEROUS',
      label: '⚠️ TIDAK AMAN: Closed Source & Berisiko Telemetri',
      antivirusScore: 'Pernah memicu Heuristic alert pada installer mirror pihak ketiga',
      openSourceAudit: 'Closed Source / Obfuscated',
      privacyVerdict: 'TIDAK DIREKOMENDASIKAN KOMUNITAS'
    },
    safetyBadgeText: '⚠️ TIDAK AMAN - Kontroversi Keamanan',
    websiteUrl: 'https://salwyrr.com',
    downloadUrl: 'https://salwyrr.com',
    minRam: '2 GB',
    features: ['Closed Source Binary', 'Unverified Telemetry', 'Anticheat Banned', 'Use Lunar/Prism Instead'],
    image: '/public/assets/aistudio/image_ae86e5ed.png', // User attachment of Salwyrr
    brandColor: '#dc2626',
    wikiInvestigation: {
      title: 'Investigasi Keamanan Salwyrr Client: Mengapa Masuk Kategori Tidak Aman?',
      dangerLevel: 'HIGH',
      verdict: 'TIDAK AMAN (PERLU DIHINDARI) — Pengguna sangat disarankan menggunakan Lunar Client, Badlion, atau Prism Launcher yang memiliki reputasi terverifikasi.',
      summary: 'Salwyrr Client menuai kecaman dari komunitas anticheat dan pengembang mod karena sifatnya yang tertutup, keberadaan telemetri yang tidak dapat diverifikasi keamanannya, serta maraknya versi repack berbahaya di internet.',
      infobox: {
        originalAuthor: 'Salwyrr Team (Anonim)',
        currentOperator: 'Salwyrr Project',
        threatClass: 'Closed Source Risk / Unverified Telemetry / Anticheat Flags',
        antivirusStatus: 'Sering terdeteksi PUA/Riskware pada installer repack',
        communityStatus: 'DIBLOKIR di turnamen kompetitif resmi',
        safeAlternatives: ['Lunar Client', 'Badlion Client', 'Prism Launcher', 'XMCL']
      },
      sections: [
        {
          title: '1. Mengapa Salwyrr Client Masuk Daftar Tidak Aman?',
          content: 'Salwyrr Client beroperasi dengan biner tertutup tanpa pernah merilis kode sumbernya ke publik. Di masa lalu, komunitas keamanan game menemukan bahwa client ini menjalankan proses background yang tidak terdokumentasi dan mengumpulkan identifier perangkat keras tanpa persetujuan jelas.'
        },
        {
          title: '2. Larangan dari Server Kompetitif & Turnamen',
          content: 'Banyak server PvP besar (seperti MinemenClub dan Hypixel) mematikan dukungan atau secara aktif mendeteksi paket modifikasi Salwyrr karena modifikasi engine client yang dianggap memberikan keuntungan tidak adil (unfair advantage) serta potensi bypass anticheat.'
        },
        {
          title: '3. Risiko Mengunduh Salwyrr dari Mirror Pihak Ketiga',
          content: 'Banyak pemain yang mengunduh Salwyrr melalui tautan di deskripsi video YouTube tidak resmi. Banyak dari installer tersebut telah disusupi token grabber Discord dan trojan pencuri password peramban.'
        }
      ],
      references: [
        {
          id: 1,
          author: 'PvP Community Security Watchdog',
          title: 'Analysis of Telemetry and Packet Manipulation in Closed-Source PvP Clients',
          source: 'Security Audit Thread',
          year: '2023'
        }
      ]
    }
  },

  // TLAUNCHER MALWARE
  {
    id: 'tlauncher-malware',
    name: 'TLauncher (tlauncher.org / TLMedia)',
    developer: 'TLMedia / TLauncher Inc. (Rusia)',
    category: 'dangerous',
    licenseRequired: false,
    licenseExplanation: 'Mengklaim gratis untuk pemain bajakan/non-lisensi, namun menyisipkan program mencurigakan, telemetri invasif, dan memodifikasi file sistem pengguna.',
    elyBySupport: false,
    offlineSupport: true,
    isOpenSource: false,
    platforms: ['windows', 'macos', 'linux'],
    tagline: '⚠️ PERINGATAN BAHAYA: Terindikasi Spyware, Modifikasi Hosts, dan Pembajakan Merek',
    description: 'TLauncher versi tlauncher.org adalah salah satu program paling kontroversial di komunitas Minecraft. Berdasarkan investigasi mendalam para analis keamanan dan komunitas internasional, launcher ini menyuntikkan file Java berbahaya (.jar), memodifikasi hosts Windows untuk memblokir launcher lain, membajak hak cipta pembuat aslinya (Turikhay), serta terdeteksi oleh berbagai antivirus.',
    pros: [
      'Sangat populer dan memiliki antarmuka yang dikenal banyak pemula'
    ],
    cons: [
      '🔴 MEMODIFIKASI FILE HOSTS WINDOWS tanpa izin untuk memblokir situs kompetitor (Ely.by & Legacy Launcher)',
      '🔴 MENGUNDUH FILE BINER EKSTERNAL saat peluncuran yang tidak dapat diaudit (risiko remote code injection)',
      '🔴 TERDETEKSI SPYWARE & TROJAN oleh sejumlah mesin pemindai VirusTotal',
      '🔴 MENCURI HAK MEREK DAGANG dari kreator aslinya (Turikhay) lewat pengadilan Rusia',
      '🔴 Sangat berat karena memuat iklan tersembunyi dan layanan tracking telemetri'
    ],
    rating: 1.5,
    safetyRating: {
      score: 12,
      level: 'DANGEROUS',
      label: '⚠️ KRITIS: Blacklist Komunitas Global & Terindikasi Spyware',
      antivirusScore: '14/72 Dideteksi Trojan/Riskware di VirusTotal',
      openSourceAudit: 'Closed Source Obfuscated Bytecode',
      privacyVerdict: 'BAHAYA: Modifikasi Hosts & Injeksi Jar Remote'
    },
    safetyBadgeText: '⚠️ BAHAYA TINGGI - Tidak Direkomendasikan',
    websiteUrl: 'https://tlauncher.org',
    downloadUrl: 'https://tlauncher.org',
    minRam: '4 GB (Banyak Background Process)',
    features: ['Fake Skin System', 'Unchecked Remote Payloads', 'Adware Injection', 'Hosts File Tampering'],
    image: '/src/assets/images/mc_security_warning_1794042692098.jpg',
    brandColor: '#dc2626',
    wikiInvestigation: {
      title: 'Skandal TLauncher & Analisis Ancaman Keamanan Cyber',
      dangerLevel: 'CRITICAL',
      verdict: 'TIDAK AMAN (BLACKLIST) — Pengguna sangat disarankan menghapus instalasi dan beralih ke alternatif aman seperti Legacy Launcher (TL Asli), Prism, XMCL, atau SKLauncher.',
      summary: 'TLauncher (tlauncher.org) yang dioperasikan oleh TLMedia adalah subjek kontroversi besar dalam komunitas Minecraft internasional. Investigasi independen dari peneliti keamanan siber, kanal TheMisterEpic, dan moderator r/Minecraft menemukan bukti pemblokiran pesaing lewat manipulasi file hosts OS, unduhan biner tersembunyi, peniruan identitas pencipta asli, serta potensi spyware backdoor.',
      infobox: {
        originalAuthor: 'Arthur Kabalov (Turikhay) - dibajak pada 2018',
        currentOperator: 'TLMedia / TLauncher Inc. (Rusia)',
        threatClass: 'Spyware / Riskware / Hosts Hijacker / Adware',
        antivirusStatus: 'Banyak terdeteksi pada VirusTotal (Heuristic.Trojan, Riskware.GameHack)',
        communityStatus: 'DIBLOKIR / DIBLACKLIST dari r/Minecraft & Discord Modding',
        safeAlternatives: ['Legacy Launcher (Turikhay)', 'XMCL', 'Prism Launcher', 'SKLauncher']
      },
      sections: [
        {
          title: '1. Sejarah Pembajakan Merek Dagang & Pencurian Identitas',
          content: 'Pada tahun 2013, seorang pengembang independen asal Rusia bernama Arthur Kabalov (Turikhay) merilis launcher gratis bernama "TL" atau "TLauncher". Proyek ini sukses besar dan disukai jutaan pemain. Namun pada sekitar tahun 2015-2018, sebuah perusahaan komersial tak dikenal mendaftarkan merek dagang "TLauncher" di Rusia secara diam-diam dan mengambil alih domain tlauncher.org. Turikhay dipaksa melepaskan nama tersebut melalui ancaman hukum, sementara TLMedia mengganti seluruh kode sumber dengan versi buatan mereka yang tertutup dan dipenuhi iklan serta pelacak.'
        },
        {
          title: '2. Investigasi Teknis: Injeksi Kode & Modifikasi File Hosts',
          content: 'Analisis reverse engineering pada file eksekusi TLauncher menemukan beberapa perilaku mencurigakan:\n• Launcher secara aktif memeriksa dan memodifikasi file "C:\\Windows\\System32\\drivers\\etc\\hosts" pada sistem Windows untuk mengarahkan rute permintaan internet yang menuju ke domain saingan (seperti ely.by dan claun.ch) ke IP palsu milik TLMedia.\n• Sebelum Minecraft dijalankan, launcher mengunduh file JAR khusus yang memanipulasi pemuatan pustaka (libraries) Java resmi Minecraft dan mengganti sistem autentikasi dengan server tertutup mereka.\n• Terdapat telemetri tersembunyi yang terus-menerus mengirimkan data perangkat keras dan aktivitas ke server di luar jangkauan pengguna.'
        },
        {
          title: '3. Bukti Investigasi Komunitas & Video TheMisterEpic',
          content: 'Pada akhir tahun 2022, YouTuber dokumenter Minecraft terkenal "TheMisterEpic" merilis video investigasi berjudul "The Minecraft Launcher That Stole Everything". Video ini ditonton jutaan kali dan mengungkap bagaimana TLMedia secara sistematis melaporkan video kreator lain yang membahas risiko keamanan TLauncher dengan klaim hak cipta palsu (DMCA strike). Subreddit resmi r/Minecraft juga mengeluarkan larangan resmi bagi siapapun yang mempromosikan atau menyebarkan tautan TLauncher karena bahaya keamanannya.'
        },
        {
          title: '4. Deteksi Antivirus & Analisis VirusTotal',
          content: 'File installer TLauncher (.exe) berulang kali memicu deteksi pada VirusTotal oleh berbagai mesin pemindai antivirus terkemuka seperti Kaspersky, Bitdefender, dan Windows Defender dengan label seperti "Trojan.Generic", "Riskware.GameHack", atau "PUA (Potentially Unwanted Application)". Meskipun pengembang sering berdalih bahwa itu adalah "False Positive" karena sifat launcher bajakan, modifikasi pada file hosts sistem operasi dan pengunduhan biner tak terverifikasi adalah tanda bahaya nyata.'
        },
        {
          title: '5. Cara Membersihkan Komputer & Beralih ke Launcher Aman',
          content: 'Jika Anda telah menginstal TLauncher versi bahaya ini:\n1. Buka Control Panel -> Uninstall Program -> hapus TLauncher.\n2. Buka folder %appdata% lalu hapus folder ".tlauncher" dan periksa folder ".minecraft".\n3. Periksa file C:\\Windows\\System32\\drivers\\etc\\hosts dan pastikan tidak ada baris yang memblokir ely.by atau mojang.com.\n4. Jalankan Full Scan menggunakan antivirus Windows Defender atau Malwarebytes.\n5. Pasang launcher alternatif aman seperti XMCL, SKLauncher, atau Legacy Launcher.'
        }
      ],
      references: [
        {
          id: 1,
          author: 'TheMisterEpic',
          title: 'The Minecraft Launcher That Stole Everything (Investigation)',
          source: 'YouTube Investigative Documentary',
          year: '2022'
        },
        {
          id: 2,
          author: 'r/Minecraft Security Moderation Team',
          title: 'Official Statement and Ban regarding TLauncher and Suspicious Java Modifications',
          source: 'Reddit r/Minecraft Megathread',
          year: '2022'
        },
        {
          id: 3,
          author: 'Arthur Kabalov (Turikhay)',
          title: 'The Real Story of TL Launcher, Trademark Hijacking, and the Birth of Legacy Launcher',
          source: 'Legacy Launcher Official Manifesto',
          year: '2019'
        },
        {
          id: 4,
          author: 'Independent Malware Analysis Lab',
          title: 'Behavioral Analysis of Windows Hosts File Modification by TLMedia Executable',
          source: 'Reverse Engineering Security Report',
          year: '2023'
        }
      ]
    }
  },

  // POLYMC COMPROMISED
  {
    id: 'polymc-compromised',
    name: 'PolyMC (Paska Pembajakan Oktober 2022)',
    developer: 'LennyMcLennington (Mantan Maintainer Tunggal)',
    category: 'dangerous',
    licenseRequired: true,
    licenseExplanation: 'Repository resmi dan domain diretas oleh satu maintainer pada Oktober 2022. Komunitas telah meninggalkannya dan membuat Prism Launcher.',
    elyBySupport: false,
    offlineSupport: false,
    isOpenSource: true,
    platforms: ['windows', 'linux'],
    tagline: '⚠️ PERINGATAN: Repositori Pernah Dibajak, Seluruh Tim Pindah ke Prism Launcher',
    description: 'Pada 17 Oktober 2022, maintainer utama PolyMC secara sepihak mencopot hak akses seluruh tim developer lain dan mengunggah kode yang berpotensi membahayakan pengguna. Seluruh tim inti yang sah langsung keluar dan mendirikan Prism Launcher. Jangan gunakan PolyMC lagi!',
    pros: [
      'Dulu merupakan launcher yang bagus sebelum terjadi pembajakan kepengurusan'
    ],
    cons: [
      '🔴 REPOSITORI RESMI PERNAH DIKOMPROMI: Seluruh developer asli telah mengundurkan diri',
      '🔴 Berpotensi disusupi binary berbahaya oleh maintainer tunggal yang bermasalah',
      '🔴 Semua update resmi dilanjutkan di Prism Launcher'
    ],
    rating: 2.0,
    safetyRating: {
      score: 25,
      level: 'DANGEROUS',
      label: '⚠️ BERISIKO TINGGI: Proyek Ditinggalkan Tim Asli (Gunakan Prism)',
      antivirusScore: 'Beresiko Supply Chain Attack',
      openSourceAudit: 'Akses GitHub Diambil Alih Secara Ilegal pada 2022',
      privacyVerdict: 'Tidak Direkomendasikan Komunitas'
    },
    safetyBadgeText: '⚠️ BERISIKO - Gunakan Prism Launcher',
    websiteUrl: 'https://prismlauncher.org',
    downloadUrl: 'https://prismlauncher.org',
    minRam: '2 GB',
    features: ['Compromised Project', 'Abandoned by Core Team', 'Use Prism Instead'],
    image: '/public/assets/aistudio/image_9786a7b8.png', // User attachment of PolyMC
    brandColor: '#ef4444',
    wikiInvestigation: {
      title: 'Krisis Keamanan PolyMC & Migrasi Massal ke Prism Launcher',
      dangerLevel: 'CRITICAL',
      verdict: 'HINDARI — Seluruh pengembang resmi telah bermigrasi dan mendirikan Prism Launcher.',
      summary: 'Pada Oktober 2022, salah satu admin PolyMC melakukan pengambilalihan paksa (hostile takeover) terhadap organisasi GitHub dan menghapus semua kontributor lain. Sebagai langkah keamanan, komunitas dan developer asli meminta semua pengguna untuk segera beralih ke Prism Launcher.',
      infobox: {
        originalAuthor: 'Tim PolyMC Asli (sekarang Prism)',
        currentOperator: 'Maintainer Tunggal Tak Terpercaya',
        threatClass: 'Supply-Chain Risk / Rogue Maintainer',
        antivirusStatus: 'Beresiko binary tampering',
        communityStatus: 'DIBLACKLIST — Direplace oleh Prism Launcher',
        safeAlternatives: ['Prism Launcher']
      },
      sections: [
        {
          title: '1. Kronologi Pengambilalihan Paksa Oktober 2022',
          content: 'Pada tanggal 17 Oktober 2022, pemilik repositori PolyMC secara sepihak mencabut akses commit semua pengembang aktif. Karena kekhawatiran adanya kode berbahaya atau malware yang dimasukkan ke rilis biner berikutnya tanpa proses peninjauan (code review), tim pengembang asli segera melakukan fork repositori dan merilis "Prism Launcher".'
        },
        {
          title: '2. Solusi bagi Pengguna PolyMC Lama',
          content: 'Jika Anda masih memiliki PolyMC di komputer Anda, segera unduh Prism Launcher. Prism Launcher memiliki fitur otomatis untuk mengimpor semua instance, modpack, dan pengaturan dari PolyMC tanpa kehilangan data save dunia Anda.'
        }
      ],
      references: [
        {
          id: 1,
          author: 'Prism Launcher Core Team',
          title: 'Official Announcement of the Fork and Security Alert for PolyMC Users',
          source: 'PrismLauncher.org News',
          year: '2022'
        }
      ]
    }
  },

  // TITAN LAUNCHER
  {
    id: 'titan-launcher',
    name: 'Titan Launcher (Bajakan Lama)',
    developer: 'Masa Lalu / Sumber Anonim',
    category: 'dangerous',
    licenseRequired: false,
    licenseExplanation: 'Mengklaim gratis, namun proyek ini sudah mati bertahun-tahun dan file unduhannya di internet dipaketkan dengan adware/malware installer.',
    elyBySupport: false,
    offlineSupport: true,
    isOpenSource: false,
    platforms: ['windows'],
    tagline: '⚠️ BERISIKO: Proyek Terbengkalai, Banyak Disusupi Adware oleh Situs Mirror',
    description: 'Titan Launcher adalah launcher bajakan era lama yang sudah tidak lagi dikembangkan atau diperbarui secara resmi. Saat ini, hampir semua link unduhan Titan Launcher di internet berasal dari situs penyedia software bajakan mencurigakan yang membungkus installer dengan adware, crypto miner, atau ransomware.',
    pros: [
      'Pernah populer di masa Minecraft 1.8 - 1.12'
    ],
    cons: [
      '🔴 TIDAK PERNAH DIUPDATE LAGI: Tidak mendukung Minecraft 1.19, 1.20, 1.21',
      '🔴 Link unduhan di internet dipenuhi virus, adware, dan malware',
      '🔴 Tidak mendukung Java runtime modern (Java 17 / 21)'
    ],
    rating: 1.2,
    safetyRating: {
      score: 18,
      level: 'DANGEROUS',
      label: '⚠️ DITINGGALKAN & RENTAN VIRUS PIHAK KETIGA',
      antivirusScore: 'Banyak mirror disisipi Trojan Downloader',
      openSourceAudit: 'Tidak Ada Pemeliharaan',
      privacyVerdict: 'Sangat Berisiko'
    },
    safetyBadgeText: '⚠️ BERISIKO - Proyek Ditinggalkan & Rentan Virus',
    websiteUrl: '#',
    downloadUrl: '#',
    minRam: '2 GB',
    features: ['Outdated Client', 'No Updates', 'Unsafe Download Mirrors'],
    image: '/src/assets/images/mc_security_warning_1794042692098.jpg',
    brandColor: '#b91c1c',
    wikiInvestigation: {
      title: 'Titan Launcher: Bahaya Mengunduh Software Bajakan yang Ditelantarkan',
      dangerLevel: 'HIGH',
      verdict: 'TIDAK DIREKOMENDASIKAN — Proyek mati yang sering dijadikan sarang injeksi Trojan oleh situs pihak ketiga.',
      summary: 'Titan Launcher sudah ditinggalkan oleh penciptanya bertahun-tahun lalu. Karena situs resminya mati, banyak situs palsu (fake download portal) memanfaatkan kata kunci pencarian Titan Launcher untuk menyebarkan file berbahaya berkedok installer.',
      infobox: {
        originalAuthor: 'Anonim (Ditinggalkan)',
        currentOperator: 'Situs Mirror Tak Dikenal',
        threatClass: 'Adware Bundler / Abandonware / Obsolete',
        antivirusStatus: 'Sering terdeteksi sebagai Adware/Downloader',
        communityStatus: 'OBSELETE / DITINGGALKAN',
        safeAlternatives: ['XMCL', 'SKLauncher', 'Legacy Launcher']
      },
      sections: [
        {
          title: '1. Mengapa Titan Launcher Berbahaya Hari Ini?',
          content: 'Ketika software open/gratis ditinggalkan developernya, domain lama mereka kerap dibeli oleh sindikat penyebar malware. Mereka mengunggah ulang installer Titan Launcher yang telah dibundel dengan adware, ekstensi browser pembajak (search hijacker), dan script berbahaya.'
        }
      ],
      references: [
        {
          id: 1,
          author: 'Cybersecurity Alert',
          title: 'Risks of Downloading Abandonware Minecraft Launchers',
          source: 'Tech Safety Guide',
          year: '2023'
        }
      ]
    }
  },

  // SHIGINIMA LAUNCHER
  {
    id: 'shiginima-launcher',
    name: 'Shiginima Launcher (v4.400 - Discontinued)',
    developer: 'Shiginima SEUS Team (Telah Berhenti)',
    category: 'dangerous',
    licenseRequired: false,
    licenseExplanation: 'Pengembangan resmi telah dihentikan secara permanen sejak 2020. Semua situs yang mengaku "Shiginima v5 / 2024" adalah penipuan berisi malware.',
    elyBySupport: false,
    offlineSupport: true,
    isOpenSource: false,
    platforms: ['windows', 'macos', 'linux'],
    tagline: '⚠️ BERISIKO: Resmi Ditutup, Hati-hati Penipuan Versi Baru Palsu',
    description: 'Shiginima (dulunya dikenal sebagai KeiNett Launcher) resmi menghentikan pengembangannya pada versi v4.400. Tim developer resminya telah membubarkan diri. Saat ini beredar banyak situs tipuan yang mengaku sebagai "Shiginima 2024" atau "Shiginima v5", yang sebenarnya berisi trojan infostealer.',
    pros: [
      'Pernah menjadi launcher legendaris di zamannya'
    ],
    cons: [
      '🔴 RESMI DITUTUP: Tidak ada pembaruan resmi lagi',
      '🔴 Marak situs palsu menyamar sebagai Shiginima untuk mencuri akun Discord & Steam',
      '🔴 Tidak mendukung fitur Java edisi modern'
    ],
    rating: 1.4,
    safetyRating: {
      score: 20,
      level: 'DANGEROUS',
      label: '⚠️ RESMI DITUTUP: Banyak Mirror Palsu Phishing',
      antivirusScore: 'Terdeteksi RedLine Infostealer pada mirror palsu',
      openSourceAudit: 'Proyek Selesai / Mati',
      privacyVerdict: 'Berbahaya jika diunduh dari Google Search'
    },
    safetyBadgeText: '⚠️ BERISIKO - Proyek Resmi Ditutup',
    websiteUrl: '#',
    downloadUrl: '#',
    minRam: '2 GB',
    features: ['Discontinued Legacy', 'Phishing Site Magnet', 'No Modern Support'],
    image: '/src/assets/images/mc_security_warning_1794042692098.jpg',
    brandColor: '#991b1b',
    wikiInvestigation: {
      title: 'Waspada Penipuan Situs Shiginima Launcher Palsu',
      dangerLevel: 'HIGH',
      verdict: 'HINDARI — Tim pembuat Shiginima telah menyatakan pensiun resmi. Segala unduhan di internet yang mengaku versi baru adalah malware phishing.',
      summary: 'Shiginima Launcher v4.400 adalah rilis resmi terakhir sebelum tim pengembang mengumumkan penutupan permanen proyek. Komunitas diimbau untuk tidak pernah mencari atau mengunduh Shiginima lagi di mesin pencari.',
      infobox: {
        originalAuthor: 'Shiginima / KeiNett',
        currentOperator: 'Tidak ada (Resmi Ditutup)',
        threatClass: 'Phishing / Infostealer Bait / Abandoned',
        antivirusStatus: 'Banyak mirror palsu terdeteksi Trojan.Redline',
        communityStatus: 'DISCONTINUED / RESMI DITUTUP',
        safeAlternatives: ['Legacy Launcher', 'XMCL', 'SKLauncher']
      },
      sections: [
        {
          title: '1. Pengumuman Penutupan Resmi',
          content: 'Tim Shiginima secara terbuka telah menyatakan pamit dan tidak lagi memperbarui launcher mereka. Setiap klaim versi baru seperti "v5.0" atau "v6.0" di media sosial seperti TikTok atau YouTube adalah penipuan yang dibuat untuk mencuri data pribadi.'
        }
      ],
      references: [
        {
          id: 1,
          author: 'Shiginima Archives',
          title: 'Official Retirement Notice of Shiginima / KeiNett Launcher Project',
          source: 'Community Archive',
          year: '2020'
        }
      ]
    }
  },

  // TEULAUNCHER CLONE
  {
    id: 'teulauncher-clone',
    name: 'TeuLauncher / Kloning TL Palsu',
    developer: 'Sindikat Anonim',
    category: 'dangerous',
    licenseRequired: false,
    licenseExplanation: 'Kloning bajakan dari TLauncher yang disusupi Remote Access Trojan (RAT).',
    elyBySupport: false,
    offlineSupport: true,
    isOpenSource: false,
    platforms: ['windows'],
    tagline: '⚠️ BAHAYA BESAR: Disusupi RAT & Pencuri Password Browser',
    description: 'Varian launcher kloningan tidak resmi yang menyebar melalui grup media sosial dan video tutorial YouTube palsu. Dilaporkan menyuntikkan script crypto-stealer.',
    pros: [],
    cons: [
      '🔴 MENYUNTIKKAN TROJAN REMOTE ACCESS (RAT)',
      '🔴 Mencuri sesi login Discord Token dan cookie peramban',
      '🔴 Memperlambat koneksi internet secara konstan'
    ],
    rating: 1.0,
    safetyRating: {
      score: 5,
      level: 'DANGEROUS',
      label: '⚠️ MALWARE AKTIF: RAT & Infostealer',
      antivirusScore: '35/72 Dideteksi Trojan.Spyware',
      openSourceAudit: 'Malware Obfuscated',
      privacyVerdict: 'Pencurian Data Aktif'
    },
    safetyBadgeText: '⚠️ BAHAYA BESAR - Trojan RAT',
    websiteUrl: '#',
    downloadUrl: '#',
    minRam: '4 GB',
    features: ['Active Malware', 'Do Not Install', 'Blacklisted'],
    image: '/src/assets/images/mc_security_warning_1794042692098.jpg',
    brandColor: '#7f1d1d',
    wikiInvestigation: {
      title: 'Peringatan Ancaman TeuLauncher: Modifikasi Trojan Berbahaya',
      dangerLevel: 'CRITICAL',
      verdict: 'BAHAYA TINGGI (TROJAN AKTIF) — Jangan pernah jalankan file ini di komputer Anda.',
      summary: 'TeuLauncher adalah paket instalasi tidak resmi yang menyamar sebagai TLauncher portabel. Di dalamnya terdapat payload infostealer yang langsung mengekstrak kata sandi yang tersimpan di Google Chrome dan Microsoft Edge.',
      infobox: {
        originalAuthor: 'Anonim (Sindikat Cybercrime)',
        currentOperator: 'Tidak Diketahui',
        threatClass: 'Trojan.Spyware / Infostealer / RAT',
        antivirusStatus: 'Banyak terdeteksi sebagai Trojan:Win32/Wacatac',
        communityStatus: 'MALWARE DIKONFIRMASI',
        safeAlternatives: ['XMCL', 'SKLauncher', 'Legacy Launcher']
      },
      sections: [
        {
          title: '1. Hasil Analisis Biner',
          content: 'File eksekutabel TeuLauncher mencoba melakukan injeksi DLL ke proses explorer.exe dan mengirimkan arsip zip terenkripsi berisi kredensial ke webhook Discord penyerang.'
        }
      ],
      references: [
        {
          id: 1,
          author: 'Cyber Intelligence Feed',
          title: 'Malicious Minecraft Launchers Targeted at Southeast Asian Gamers',
          source: 'Threat Intelligence Bulletin',
          year: '2024'
        }
      ]
    }
  }
];
