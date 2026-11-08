import React, { useState } from 'react';
import { 
  X, Compass, ShieldCheck, Sparkles, Download, 
  AlertTriangle, ArrowRight, ArrowLeft, CheckCircle2, User 
} from 'lucide-react';

interface WelcomeTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
  onSelectCategory: (category: string) => void;
}

export const WelcomeTourModal: React.FC<WelcomeTourModalProps> = ({
  isOpen,
  onClose,
  onOpenLogin,
  onSelectCategory,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: 'Selamat Datang di MineLaunch Hub!',
      subtitle: 'Memudahkan Anda Menemukan & Mengunduh Launcher Minecraft Java Edition',
      image: '/src/assets/images/mc_launchers_hero_1794042691092.jpg',
      badge: 'Panduan Awal Pengguna',
      badgeColor: 'text-emerald-400',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <p>
            Halo Crafter! Apakah Anda sering bingung mencari launcher Minecraft mana yang aman, mana yang butuh akun resmi, atau mana yang bisa menggunakan skin kustom secara gratis?
          </p>
          <p>
            <strong>MineLaunch Hub</strong> hadir sebagai pusat direktori dan panduan netral terpercaya untuk memudahkan Anda memilih, membandingkan spesifikasi, dan mengunduh langsung dari situs asli masing-masing pengembang.
          </p>
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3 text-xs text-neutral-400 space-y-1.5">
            <div className="font-semibold text-white">Apa yang akan Anda temukan di sini:</div>
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Katalog puluhan launcher resmi, non-lisensi (Ely.by), hingga PvP client</span>
            </div>
            <div className="flex items-center gap-2 text-sky-400">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Tautan unduhan asli 100% langsung ke situs developer resmi</span>
            </div>
            <div className="flex items-center gap-2 text-red-400">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Sistem peringkat keamanan & peringatan bahaya investigasi siber</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Pahami Kebutuhan Lisensi: Resmi vs Ely.by',
      subtitle: 'Ketahui Launcher Mana yang Butuh Beli Game dan Mana yang Gratis',
      image: '/src/assets/images/elyby_custom_skin_1794042692330.jpg',
      badge: 'Sistem Lisensi & Akun',
      badgeColor: 'text-sky-400',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <p>
            Di MineLaunch Hub, kami membedakan launcher berdasarkan kategori kebutuhan lisensi Anda:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/20 p-3 space-y-1">
              <div className="font-bold text-xs text-emerald-300 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Wajib Lisensi Resmi (Microsoft)</span>
              </div>
              <p className="text-[11px] text-neutral-300">
                Untuk Anda yang sudah membeli Minecraft asli. Termasuk <strong>Prism Launcher, Modrinth, Official, Lunar Client, CurseForge</strong>.
              </p>
            </div>

            <div className="rounded-xl border border-sky-900/60 bg-sky-950/20 p-3 space-y-1">
              <div className="font-bold text-xs text-sky-300 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-sky-400" />
                <span>Non-Lisensi via Ely.by & Offline</span>
              </div>
              <p className="text-[11px] text-neutral-300">
                Bisa main tanpa beli akun! Didukung fitur skin & jubah gratis lewat Ely.by. Contoh: <strong>XMCL, SKLauncher, Pinecone MC, Legacy Launcher</strong>.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Sistem Rating Keamanan & Peringatan Bahaya',
      subtitle: 'Waspada Sebelum Mengunduh: Investigasi Dossier Gaya Wikipedia',
      image: '/src/assets/images/mc_security_warning_1794042692098.jpg',
      badge: 'Perlindungan Komunitas',
      badgeColor: 'text-red-400',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <p>
            Keamanan komputer Anda adalah prioritas nomor satu. Kami memiliki skor keamanan transparan (0–100%) dan melabeli software berbahaya dengan tegas:
          </p>
          <div className="rounded-xl border border-red-900/80 bg-red-950/40 p-3 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-xs text-red-200">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span>Daftar Hitam: Kasus TLauncher (tlauncher.org)</span>
            </div>
            <p className="text-[11px] text-red-200/80 leading-relaxed">
              TLauncher diblacklist oleh komunitas global (r/Minecraft, TheMisterEpic) karena riwayat pembajakan file hosts sistem Windows, penyuntikan Java payload, dan pencurian merek dagang dari pembuat aslinya (Turikhay). Kami menyertakan laporan investigasi format Wikipedia lengkap agar Anda waspada!
            </p>
          </div>
          <p className="text-xs text-neutral-400">
            Jika Anda sudah terlanjur menginstalnya, kami juga menyediakan <strong>Checklist Pembersihan Mandiri</strong> di navbar.
          </p>
        </div>
      ),
    },
    {
      title: 'Hubungkan Akun Anda (Google, Microsoft, Ely.by)',
      subtitle: 'Personalisasi Profil & Pengalaman Menjelajah Anda',
      image: '/src/assets/images/xmcl_community_brand_1794043502660.jpg',
      badge: 'Fitur Akun Interaktif',
      badgeColor: 'text-amber-400',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <p>
            Anda sekarang bisa masuk menggunakan akun Google, akun Microsoft (verifikasi lisensi resmi), atau akun Ely.by untuk menampilkan avatar dan status skin Anda:
          </p>
          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={() => {
                onClose();
                onOpenLogin();
              }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-sm"
            >
              <User className="h-4 w-4" />
              <span>Pilih & Masuk Akun Anda Sekarang</span>
            </button>
            <p className="text-[11px] text-neutral-500 text-center">
              Atau Anda juga dapat melanjutkan sebagai tamu tanpa login sama sekali.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const current = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Visual Banner */}
        <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full overflow-hidden bg-neutral-950">
          <img
            src={current.image}
            alt={current.title}
            className="h-full w-full object-cover transition-all duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 rounded-lg bg-neutral-950/80 p-1.5 text-neutral-400 hover:text-white transition-colors border border-neutral-800"
            aria-label="Tutup Tour"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Step Pill & Indicators */}
          <div className="absolute top-3 left-4 flex items-center gap-2">
            <span className={`text-xs font-bold uppercase tracking-wider ${current.badgeColor} bg-neutral-950/80 px-2.5 py-0.5 rounded border border-neutral-800`}>
              {current.badge}
            </span>
          </div>

          <div className="absolute bottom-3 left-4 right-4">
            <div className="text-xs text-neutral-400 font-mono">
              Langkah {currentStep + 1} dari {steps.length}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white drop-shadow-sm mt-0.5">
              {current.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="text-xs text-emerald-400 font-medium">
            {current.subtitle}
          </div>
          {current.content}
        </div>

        {/* Navigation Footer */}
        <div className="border-t border-neutral-800 bg-neutral-950 px-5 py-3.5 flex items-center justify-between gap-3">
          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentStep ? 'w-6 bg-emerald-500' : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                }`}
                aria-label={`Lompat ke langkah ${idx + 1}`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="inline-flex items-center gap-1 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Sebelumnya</span>
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-sm"
              >
                <span>Lanjut</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-sm"
              >
                <span>Mulai Eksplorasi</span>
                <CheckCircle2 className="h-3.5 w-3.5" />
              </button>
            )}

            <button
              onClick={onClose}
              className="text-xs text-neutral-400 hover:text-white px-2 py-1"
            >
              Lewati
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
