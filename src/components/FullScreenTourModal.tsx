import React, { useState } from 'react';
import { 
  X, ShieldCheck, Sparkles, AlertTriangle, ArrowRight, 
  ArrowLeft, CheckCircle2, BookOpen, Terminal, Check, Globe 
} from 'lucide-react';

interface FullScreenTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
}

export const FullScreenTourModal: React.FC<FullScreenTourModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const slides = [
    // Slide 1: Welcome & Mission
    {
      id: 'welcome',
      tag: 'PENGENALAN MINELAUNCH HUB',
      tagColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-800',
      title: 'Selamat Datang di MineLaunch Hub: Panduan Launcher Terlengkap Dunia',
      subtitle: 'Memudahkan Anda menemukan launcher Minecraft Java Edition yang aman, sesuai kebutuhan, dan langsung dari sumber aslinya.',
      image: '/src/assets/images/mc_launchers_hero_1794042691092.jpg',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <p>
            Di dunia <strong>Minecraft Java Edition</strong>, terdapat puluhan launcher yang dibuat oleh berbagai pengembang independen maupun komersial. Mulai dari launcher resmi buatan Mojang, launcher open-source dengan optimasi memori tinggi, client khusus PvP dengan FPS booster, hingga launcher non-lisensi dengan dukungan skin pihak ketiga.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3.5 space-y-1">
              <div className="font-bold text-white text-xs flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Navigasi Akurat</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-normal">
                Tautan unduhan asli 100% langsung mengarahkan Anda ke website resmi pengembang tanpa perantara palsu.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3.5 space-y-1">
              <div className="font-bold text-white text-xs flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-sky-400" />
                <span>Klasifikasi Lisensi Jelas</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-normal">
                Ketahui dengan pasti mana yang butuh akun resmi Microsoft dan mana yang gratis mendukung Ely.by.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3.5 space-y-1">
              <div className="font-bold text-white text-xs flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-red-400" />
                <span>Audit Keamanan Transparan</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-normal">
                Peringatan bahaya mendalam bagi launcher yang terindikasi spyware atau memodifikasi file sistem.
              </p>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 2: Licensed Minecraft in-depth
    {
      id: 'licensed',
      tag: 'TOPIK 1: LISENSI RESMI',
      tagColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-800',
      title: 'Apa Itu Minecraft yang Membutuhkan Lisensi Resmi?',
      subtitle: 'Game original berbayar dari Mojang Studios & Microsoft dengan hak akses tak terbatas.',
      image: '/public/assets/aistudio/image_4b042a05.png', // User attachment of Prism
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <p>
            <strong>Minecraft Berlisensi Resmi</strong> adalah akun yang dibeli secara sah di situs resmi <code>minecraft.net</code> seharga sekitar <strong>Rp 350.000 – Rp 450.000</strong>. Akun ini kini terintegrasi dengan Akun Microsoft dan dilindungi verifikasi dua langkah (2FA).
          </p>
          <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/20 p-4 space-y-2">
            <div className="font-bold text-xs text-emerald-300">Hak Istimewa Pemilik Akun Berlisensi Resmi:</div>
            <ul className="space-y-1.5 text-xs text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Akses ke Seluruh Server Resmi Terbesar di Dunia:</strong> Bebas bermain di Hypixel Network, 2b2t, MinemenClub, dan server internasional lainnya yang mewajibkan <em>online-mode=true</em>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Skin & Jubah Resmi Global:</strong> Skin karakter yang Anda pasang tersimpan di cloud Mojang dan terlihat oleh seluruh pemain di dunia.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Dukungan Launcher Resmi Paling Dipercaya:</strong> <strong>Prism Launcher, Modrinth App, Minecraft Launcher Resmi, Lunar Client, Badlion, CurseForge</strong>.</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    // Slide 3: Non-Licensed Ely.by in-depth
    {
      id: 'elyby',
      tag: 'TOPIK 2: ELY.BY NON-LISENSI BEBAS VIRUS',
      tagColor: 'text-sky-400 bg-sky-950/80 border-sky-800',
      title: 'Apa Itu Minecraft Non-Lisensi via Ely.by tapi Bebas Virus?',
      subtitle: 'Solusi aman dan gratis bagi pemain non-lisensi untuk memiliki skin kustom dan jubah tanpa risiko malware.',
      image: '/src/assets/images/elyby_custom_skin_1794042692330.jpg',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <p>
            Pemain yang belum mampu membeli game disebut pemain <em>non-lisensi</em> atau <em>cracked</em>. Secara bawaan, pemain non-lisensi hanya memiliki skin default Steve/Alex.
          </p>
          <p>
            <strong>Ely.by</strong> (<code>https://ely.by</code>) adalah sistem autentikasi dan server skin pihak ketiga independen yang aman dan gratis.
          </p>
          <div className="rounded-xl border border-sky-900/60 bg-sky-950/20 p-4 space-y-2">
            <div className="font-bold text-xs text-sky-300">Mengapa Ely.by di XMCL & SKLauncher 100% Bebas Virus?</div>
            <ul className="space-y-1.5 text-xs text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">•</span>
                <span><strong>Menggunakan REST API Standar:</strong> Hanya berkomunikasi via HTTPS publik ke server skin Ely.by.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">•</span>
                <span><strong>Tidak Mengubah File Hosts Windows:</strong> Berbeda dengan TLauncher yang memodifikasi file sistem, launcher seperti <strong>XMCL, SKLauncher, Pinecone MC, dan Legacy Launcher</strong> tidak pernah merusak konfigurasi jaringan komputer Anda.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">•</span>
                <span><strong>Diaudit Komunitas di GitHub:</strong> Kode sumbernya terbuka (open-source) dan dapat diperiksa oleh siapa saja.</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    // Slide 4: Dangerous Launchers (TLauncher, Salwyrr, etc.)
    {
      id: 'dangerous',
      tag: 'TOPIK 3: PERINGATAN LAUNCHER BERBAHAYA',
      tagColor: 'text-red-400 bg-red-950/80 border-red-800',
      title: 'Apa Itu Launcher Berbahaya? (Mengapa Masuk Daftar Hitam?)',
      subtitle: 'Waspadai program yang menyusupi file sistem, spyware tertutup, dan launcher kontroversial seperti TLauncher & Salwyrr.',
      image: '/src/assets/images/mc_security_warning_1794042692098.jpg',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <p>
            <strong>Launcher Berbahaya</strong> adalah peluncur yang memanfaatkan kata kunci &quot;Minecraft Gratis&quot; untuk menyusupkan program jahat ke komputer Anda.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-red-900/60 bg-red-950/20 p-3.5 space-y-1.5">
              <div className="font-bold text-xs text-red-300 flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span>Kasus TLauncher (tlauncher.org)</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-relaxed">
                Terbukti memodifikasi file <code>C:\Windows\System32\drivers\etc\hosts</code> untuk memblokir situs kompetitor, menyuntikkan file Java jar tak terverifikasi, dan mencuri nama merek dagang dari Turikhay.
              </p>
            </div>

            <div className="rounded-xl border border-red-900/60 bg-red-950/20 p-3.5 space-y-1.5">
              <div className="font-bold text-xs text-red-300 flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span>Kasus Salwyrr Client</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-relaxed">
                Dipindahkan ke kategori <strong>TIDAK AMAN</strong> karena menggunakan biner tertutup (closed-source), mengumpulkan telemetri tidak transparan, dan diblokir oleh berbagai server PvP besar.
              </p>
            </div>
          </div>
          <p className="text-xs text-neutral-400">
            Setiap kali Anda mengeklik launcher berbahaya di MineLaunch Hub, kami menampilkan <strong>Dossier Investigasi Bergaya Wikipedia</strong> agar Anda lebih berhati-hati sebelum memutuskan mengunduh!
          </p>
        </div>
      ),
    },

    // Slide 5: Ready to Explore
    {
      id: 'ready',
      tag: 'LANGKAH AKHIR',
      tagColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-800',
      title: 'Anda Siap Menjelajahi Direktori MineLaunch Hub!',
      subtitle: 'Gunakan filter kategori, sistem pencarian, dan tautan asli langsung ke website pengembang.',
      image: '/public/assets/aistudio/image_7b152378.png', // User attachment of Modrinth
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <p>
            Sekarang Anda telah memahami perbedaan krusial antara launcher resmi berbayar, alternatif aman via Ely.by, dan launcher berbahaya yang harus dihindari.
          </p>
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-2">
            <div className="font-bold text-white text-xs">Rangkuman Rekomendasi Cepat:</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                <span className="text-emerald-400 font-bold block mb-1">Punya Akun Resmi:</span>
                <span className="text-neutral-300 text-[11px]">Gunakan <strong>Prism Launcher</strong> (Modpack) atau <strong>Lunar Client</strong> (PvP).</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                <span className="text-sky-400 font-bold block mb-1">Belum Beli / Ely.by:</span>
                <span className="text-neutral-300 text-[11px]">Gunakan <strong>XMCL</strong> atau <strong>SKLauncher</strong> (Bebas Virus & Ada Skin).</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                <span className="text-amber-400 font-bold block mb-1">Laptop Kentang:</span>
                <span className="text-neutral-300 text-[11px]">Gunakan <strong>Legacy Launcher (TL Asli Turikhay)</strong>.</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const current = slides[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with Scrim */}
        <div className="relative aspect-[21/9] sm:aspect-[16/6] w-full overflow-hidden bg-neutral-950">
          <img
            src={current.image}
            alt={current.title}
            className="h-full w-full object-cover transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-xl bg-neutral-950/80 p-2 text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
            aria-label="Tutup Tour"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Tag and Slide Indicator */}
          <div className="absolute top-4 left-5 flex items-center gap-2">
            <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${current.tagColor}`}>
              {current.tag}
            </span>
          </div>

          <div className="absolute bottom-4 left-5 right-5">
            <div className="text-xs font-mono text-neutral-400">
              Langkah {currentStep + 1} dari {slides.length}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white drop-shadow-md mt-1">
              {current.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-4 flex-1">
          <div className="text-xs sm:text-sm text-emerald-400 font-semibold">
            {current.subtitle}
          </div>
          {current.content}
        </div>

        {/* Footer Navigation */}
        <div className="border-t border-neutral-800 bg-neutral-950 px-6 py-4 flex items-center justify-between gap-4">
          {/* Progress Indicators */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  idx === currentStep ? 'w-8 bg-emerald-500' : 'w-2.5 bg-neutral-800 hover:bg-neutral-600'
                }`}
                aria-label={`Pindah ke langkah ${idx + 1}`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Sebelumnya</span>
              </button>
            )}

            {currentStep < slides.length - 1 ? (
              <button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-md shadow-emerald-600/20"
              >
                <span>Lanjut</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-6 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-md shadow-emerald-600/20"
              >
                <span>Mulai Menjelajahi Direktori</span>
                <CheckCircle2 className="h-3.5 w-3.5" />
              </button>
            )}

            <button
              onClick={onClose}
              className="text-xs text-neutral-400 hover:text-white px-2 py-1"
            >
              Lewati Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
