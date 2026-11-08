import React from 'react';
import { ShieldCheck, AlertTriangle, Download, ArrowRight, HelpCircle } from 'lucide-react';

interface HeroSectionProps {
  onSelectCategory: (category: string) => void;
  onOpenSafetyGuide: () => void;
  onOpenLicenseGuide: () => void;
  onOpenDangerDossier: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectCategory,
  onOpenSafetyGuide,
  onOpenLicenseGuide,
  onOpenDangerDossier,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800 bg-neutral-950">
      {/* Background Graphic with scrim */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity pointer-events-none">
        <img
          src="/src/assets/images/mc_launchers_hero_1794042691092.jpg"
          alt="Minecraft Java Edition Landscape & Launcher interface"
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed metadata (anti-pill discipline) */}
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
              <span className="text-emerald-400 font-semibold">Minecraft Java Edition</span>
              <span aria-hidden="true">·</span>
              <span>Katalog Launcher 2024-2026</span>
              <span aria-hidden="true">·</span>
              <span>17 Peluncur Terverifikasi</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
              Pusat Unduh Launcher Minecraft Java & Panduan Keamanan
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
              Ketahui launcher mana yang butuh akun resmi berbayar, mana yang mendukung sistem gratis{' '}
              <span className="text-emerald-400 font-semibold">Ely.by & Offline</span>, serta waspadai launcher berbahaya seperti{' '}
              <span className="text-red-400 font-semibold underline decoration-red-500/50 cursor-pointer" onClick={onOpenDangerDossier}>
                TLauncher
              </span>{' '}
              yang terindikasi spyware sebelum Anda mengunduh.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onSelectCategory('all');
                  const el = document.getElementById('launcher-catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                <Download className="h-4 w-4" />
                <span>Jelajahi Semua Launcher</span>
              </button>

              <button
                onClick={onOpenLicenseGuide}
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/80 px-4 py-2.5 text-sm font-medium text-neutral-200 hover:bg-neutral-800 hover:text-white transition-colors"
              >
                <HelpCircle className="h-4 w-4 text-emerald-400" />
                <span>Pahami Sistem Lisensi & Ely.by</span>
              </button>
            </div>

            {/* Quick Informational Notice Banner */}
            <div className="rounded-xl border border-red-900/60 bg-red-950/40 p-4 transition-all hover:bg-red-950/60">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-red-200">
                    Peringatan Komunitas: Waspada terhadap TLauncher (tlauncher.org)
                  </div>
                  <p className="text-xs text-red-300/80 leading-relaxed">
                    Launcher tlauncher.org diblacklist oleh komunitas global (r/Minecraft, TheMisterEpic) karena riwayat pembajakan file hosts sistem dan dugaan spyware. Kami menyediakan investigasi format Wikipedia lengkap dan alternatif yang 100% aman (Legacy Launcher, XMCL, SKLauncher).
                  </p>
                  <button
                    onClick={onOpenDangerDossier}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300 underline underline-offset-2 pt-1"
                  >
                    <span>Baca Investigasi Wikipedia TLauncher</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Visual Showcase / Fast Category Navigator */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5 backdrop-blur-sm">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Pilih Berdasarkan Kategori Kebutuhan
              </h2>

              <div className="mt-4 space-y-3">
                {/* Option 1: Licensed */}
                <button
                  onClick={() => {
                    onSelectCategory('licensed');
                    const el = document.getElementById('launcher-catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full text-left rounded-xl border border-neutral-800 bg-neutral-950/60 p-3.5 hover:border-emerald-500/50 hover:bg-neutral-950 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                          Wajib Lisensi Resmi (Microsoft)
                        </div>
                        <div className="text-xs text-neutral-400">
                          Prism, Modrinth, Official, Lunar, Badlion
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-emerald-400 transition-colors" />
                  </div>
                </button>

                {/* Option 2: Non-licensed & Ely.by */}
                <button
                  onClick={() => {
                    onSelectCategory('non-licensed');
                    const el = document.getElementById('launcher-catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full text-left rounded-xl border border-neutral-800 bg-neutral-950/60 p-3.5 hover:border-sky-500/50 hover:bg-neutral-950 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-950 text-sky-400 border border-sky-800/60">
                        <Download className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                          Non-Lisensi & Dukungan Ely.by
                        </div>
                        <div className="text-xs text-neutral-400">
                          XMCL, SKLauncher, Pinecone MC, Legacy Launcher
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-sky-400 transition-colors" />
                  </div>
                </button>

                {/* Option 3: Dangerous blacklist */}
                <button
                  onClick={() => {
                    onSelectCategory('dangerous');
                    const el = document.getElementById('launcher-catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full text-left rounded-xl border border-red-900/40 bg-neutral-950/60 p-3.5 hover:border-red-500/50 hover:bg-neutral-950 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-950 text-red-400 border border-red-800/60">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-red-300 transition-colors">
                          Launcher Berbahaya & Blacklist
                        </div>
                        <div className="text-xs text-neutral-400">
                          TLauncher (TLMedia), Titan Launcher, Shiginima
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-red-400 transition-colors" />
                  </div>
                </button>
              </div>

              {/* Fast reassurance metrics */}
              <div className="mt-5 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <span>Diperiksa Berdasarkan Riset Komunitas</span>
                <span className="font-semibold text-neutral-200">100% Gratis & Netral</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
