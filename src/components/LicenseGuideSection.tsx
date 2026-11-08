import React, { useState } from 'react';
import { 
  ShieldCheck, Sparkles, AlertTriangle, Check, X, HelpCircle, 
  ArrowRight, Globe, Lock, Terminal, ShieldAlert, Cpu, HeartHandshake, BookOpen
} from 'lucide-react';

interface LicenseGuideSectionProps {
  onSelectCategory: (category: string) => void;
}

export const LicenseGuideSection: React.FC<LicenseGuideSectionProps> = ({ onSelectCategory }) => {
  const [activeTab, setActiveTab] = useState<'official' | 'elyby' | 'dangerous'>('official');

  return (
    <section id="license-guide" className="border-t border-neutral-800 bg-neutral-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <BookOpen className="h-4 w-4" />
            <span>PUSAT EDUKASI LISENSI & KEAMANAN MINECRAFT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Pahami Lisensi Resmi, Sistem Ely.by & Bahaya Launcher Palsu
          </h2>
          <p className="text-sm sm:text-base text-neutral-300">
            Panduan lengkap agar Anda tidak salah memilih launcher: ketahui kelebihan lisensi resmi Mojang, cara kerja Ely.by yang bebas virus, serta alasan teknis mengapa launcher seperti TLauncher berbahaya.
          </p>
        </div>

        {/* Interactive Segmented Selector for the 3 Core Topics */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl">
          <button
            onClick={() => setActiveTab('official')}
            className={`flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'official'
                ? 'bg-emerald-950 border border-emerald-700/80 text-emerald-200 shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>1. Minecraft Berlisensi Resmi</span>
          </button>

          <button
            onClick={() => setActiveTab('elyby')}
            className={`flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'elyby'
                ? 'bg-sky-950 border border-sky-700/80 text-sky-200 shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <Sparkles className="h-4 w-4 text-sky-400" />
            <span>2. Ely.by (Bebas Virus)</span>
          </button>

          <button
            onClick={() => setActiveTab('dangerous')}
            className={`flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'dangerous'
                ? 'bg-red-950 border border-red-700/80 text-red-200 shadow-sm'
                : 'text-red-400 hover:text-red-300 hover:bg-red-950/40'
            }`}
          >
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <span>3. Apa Itu Launcher Berbahaya?</span>
          </button>
        </div>

        {/* Tab 1: APA ITU MINECRAFT YANG MEMBUTUHKAN LISENSI RESMI? */}
        {activeTab === 'official' && (
          <div className="rounded-2xl border border-emerald-900/60 bg-neutral-900/70 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Definisi & Penjelasan Lengkap
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  Apa Itu Minecraft yang Membutuhkan Lisensi Resmi?
                </h3>
              </div>
              <div className="rounded-lg bg-emerald-950/80 border border-emerald-800 px-3 py-1.5 text-xs text-emerald-300 font-semibold">
                Status: Resmi Mojang Studios / Microsoft
              </div>
            </div>

            <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
              <p>
                <strong>Minecraft Berlisensi Resmi</strong> adalah salinan permainan Minecraft asli yang dibeli secara sah melalui situs resmi <code>minecraft.net</code> atau Microsoft Store seharga sekitar <strong>Rp 350.000 – Rp 450.000</strong> (pembelian satu kali seumur hidup, sudah mencakup Java Edition dan Bedrock Edition sekaligus).
              </p>
              <p>
                Ketika Anda membeli lisensi resmi, akun Microsoft Anda akan didaftarkan ke server autentikasi global Mojang Studios. Akun ini memiliki tanda kepemilikan digital yang diverifikasi setiap kali Anda login ke game.
              </p>
            </div>

            {/* Privilege Matrix Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-2">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Hak Istimewa Pemain Berlisensi Resmi:</span>
                </div>
                <ul className="space-y-2 text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span><strong>Akses ke Seluruh Server Resmi Terbesar di Dunia:</strong> Bebas masuk ke server Hypixel Network, Mineplex, MinemenClub, 2b2t, dan server resmi lain tanpa halangan verifikasi session.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span><strong>Skin & Jubah Resmi Global:</strong> Skin karakter dan jubah resmi yang Anda pasang di profil Mojang akan terlihat oleh jutaan pemain lain di mana pun Anda bermain.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span><strong>Akses Minecraft Realms:</strong> Dapat bermain di server cloud privat sewaan resmi Mojang bersama teman-teman dengan aman.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span><strong>Snapshot & Update Tercepat:</strong> Langsung mendapatkan uji coba fitur masa depan (Snapshot mingguan) tanpa menunggu rilis cracked.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-2">
                <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Launcher yang Wajib Lisensi Resmi:</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Launcher ini mematuhi standar hukum EULA Mojang dan <strong>tidak menyediakan mode cracked</strong> secara bawaan:
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Minecraft Launcher Resmi', 'Prism Launcher', 'Modrinth App', 'CurseForge App', 'Lunar Client', 'Badlion Client', 'GDLauncher', 'ATLauncher', 'MultiMC 5', 'FTB App'].map((name, i) => (
                    <span key={i} className="rounded-md bg-neutral-900 border border-neutral-800 px-2 py-1 text-xs text-emerald-300 font-medium">
                      {name}
                    </span>
                  ))}
                </div>
                <div className="pt-3">
                  <button
                    onClick={() => {
                      onSelectCategory('licensed');
                      const el = document.getElementById('launcher-catalog');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>Filter dan unduh launcher resmi di katalog</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: APA ITU MINECRAFT NON-LISENSI VIA ELY.BY TAPI BEBAS VIRUS? */}
        {activeTab === 'elyby' && (
          <div className="rounded-2xl border border-sky-900/60 bg-neutral-900/70 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  Solusi Alternatif Aman untuk Non-Lisensi
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  Apa Itu Minecraft Non-Lisensi via Ely.by tapi Bebas Virus?
                </h3>
              </div>
              <div className="rounded-lg bg-sky-950/80 border border-sky-800 px-3 py-1.5 text-xs text-sky-300 font-semibold">
                Status: Aman & Open-Source Audited
              </div>
            </div>

            <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
              <p>
                Banyak pemain yang belum memiliki kemampuan finansial untuk membeli akun resmi Minecraft (biasa disebut pemain <em>non-lisensi</em>, <em>cracked</em>, atau <em>offline</em>). Pada versi biasa, pemain non-lisensi hanya memiliki skin default (Steve atau Alex) dan tidak bisa memakai jubah.
              </p>
              <p>
                <strong>Ely.by</strong> (beroperasi di <code>https://ely.by</code>) adalah sistem autentikasi dan server skin pihak ketiga independen yang didirikan sejak tahun 2013. Layanan ini dibuat agar komunitas non-lisensi dapat memiliki identitas skin kustom dan jubah secara <strong>100% gratis</strong>.
              </p>
            </div>

            {/* Why is it Virus-Free & Safe? */}
            <div className="rounded-xl border border-sky-900/60 bg-sky-950/20 p-5 space-y-3">
              <h4 className="text-sm font-bold text-sky-200 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-sky-400" />
                <span>Mengapa Launcher Ely.by Seperti XMCL & SKLauncher 100% Bebas Virus?</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-neutral-300">
                <div className="rounded-lg bg-neutral-950 p-3 space-y-1">
                  <div className="font-semibold text-white">1. Protokol REST API Terbuka</div>
                  <p className="text-neutral-400">
                    Launcher seperti XMCL dan SKLauncher menggunakan koneksi HTTPS standar ke server Ely.by. Tidak ada file mencurigakan yang diunduh secara diam-diam.
                  </p>
                </div>
                <div className="rounded-lg bg-neutral-950 p-3 space-y-1">
                  <div className="font-semibold text-white">2. Tidak Mengubah File Sistem</div>
                  <p className="text-neutral-400">
                    Launcher ini <strong>TIDAK PERNAH</strong> memodifikasi file <code>C:\Windows\System32\drivers\etc\hosts</code> atau registry Windows Anda.
                  </p>
                </div>
                <div className="rounded-lg bg-neutral-950 p-3 space-y-1">
                  <div className="font-semibold text-white">3. Kode Sumber Terbuka (Open Source)</div>
                  <p className="text-neutral-400">
                    Kode XMCL, Pinecone MC, dan Legacy Launcher dapat diperiksa siapa saja di GitHub, bebas dari backdoors dan cryptocurrency miners.
                  </p>
                </div>
              </div>
            </div>

            {/* Safe Launcher Recommendations */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                Rekomendasi Launcher Non-Lisensi yang Mendukung Ely.by Tanpa Risiko Malware:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3 space-y-1">
                  <div className="font-bold text-white text-sm">XMCL</div>
                  <div className="text-emerald-400 font-mono text-[11px]">Open Source (MIT)</div>
                  <p className="text-neutral-400 text-[11px]">Paling modern, UI elegan, modpack Modrinth/CurseForge 1-klik, dan dukungan p2p LAN.</p>
                </div>
                <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3 space-y-1">
                  <div className="font-bold text-white text-sm">SKLauncher</div>
                  <div className="text-emerald-400 font-mono text-[11px]">Teruji Komunitas</div>
                  <p className="text-neutral-400 text-[11px]">Sangat bersih, ringan, tampilan mirip launcher resmi, sangat ramah pemula di Indonesia.</p>
                </div>
                <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3 space-y-1">
                  <div className="font-bold text-white text-sm">Legacy Launcher</div>
                  <div className="text-emerald-400 font-mono text-[11px]">Karya Asli Turikhay</div>
                  <p className="text-neutral-400 text-[11px]">Pencipta asli launcher TL sebelum mereknya dibajak oleh TLMedia. Aman dan stabil.</p>
                </div>
                <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3 space-y-1">
                  <div className="font-bold text-white text-sm">PojavLauncher</div>
                  <div className="text-emerald-400 font-mono text-[11px]">HP Android & iOS</div>
                  <p className="text-neutral-400 text-[11px]">Memungkinkan main Minecraft Java asli lengkap dengan skin Ely.by langsung di ponsel.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    onSelectCategory('non-licensed');
                    const el = document.getElementById('launcher-catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300"
                >
                  <span>Lihat semua launcher non-lisensi aman di katalog</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: APA ITU LAUNCHER BERBAHAYA? */}
        {activeTab === 'dangerous' && (
          <div className="rounded-2xl border border-red-900/80 bg-neutral-900/70 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                  Peringatan Investigasi Keamanan Siber Komunitas
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  Apa Itu Launcher Berbahaya? (Mengapa Ada Peringatan Virus?)
                </h3>
              </div>
              <div className="rounded-lg bg-red-950 border border-red-800 px-3 py-1.5 text-xs text-red-300 font-bold">
                Status: KRITIS / DAFTAR HITAM (BLACKLIST)
              </div>
            </div>

            <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
              <p>
                <strong>Launcher Berbahaya</strong> adalah peluncur tidak resmi yang menggunakan iming-iming &quot;Minecraft gratis&quot; untuk mengelabui pengguna awam, namun di balik layarnya menyisipkan perilaku berbahaya (malicious behavior), adware agresif, modifikasi sistem operasi tanpa izin, atau bahkan trojan pencuri data (infostealer).
              </p>
              <p>
                Salah satu contoh paling nyata yang menjadi sorotan dunia adalah <strong>TLauncher (tlauncher.org / TLMedia)</strong> dan situs-situs penyedia file bajakan lama (seperti Titan Launcher dan kloningan Shiginima palsu).
              </p>
            </div>

            {/* 4 Dangers Technical Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-red-900/60 bg-red-950/20 p-4 space-y-2">
                <div className="font-bold text-xs text-red-300 flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-red-400" />
                  <span>1. Pembajakan File Hosts Windows</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  TLauncher terbukti secara teknis mengubah file <code>C:\Windows\System32\drivers\etc\hosts</code> untuk memblokir domain pesaing (seperti ely.by dan skin server lain). Ini adalah pelanggaran serius terhadap integritas sistem operasi Windows Anda.
                </p>
              </div>

              <div className="rounded-xl border border-red-900/60 bg-red-950/20 p-4 space-y-2">
                <div className="font-bold text-xs text-red-300 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-red-400" />
                  <span>2. Injeksi Pustaka Java Tak Terverifikasi</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Sebelum permainan dijalankan, launcher mengunduh file JAR khusus yang memodifikasi pemuatan pustaka Java Minecraft. Kode ini tertutup (closed source) dan tidak dapat diaudit keamanannya oleh analis independen.
                </p>
              </div>

              <div className="rounded-xl border border-red-900/60 bg-red-950/20 p-4 space-y-2">
                <div className="font-bold text-xs text-red-300 flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-red-400" />
                  <span>3. Risiko Pencurian Data (Infostealer) pada Kloning Palsu</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Banyak situs pihak ketiga menyebarkan installer &quot;Shiginima v5&quot; atau &quot;Titan Launcher&quot; yang sebenarnya sudah ditinggalkan developernya. File tersebut sering disusupi trojan RedLine yang mencuri cookie browser, token Discord, dan akun Steam.
                </p>
              </div>

              <div className="rounded-xl border border-red-900/60 bg-red-950/20 p-4 space-y-2">
                <div className="font-bold text-xs text-red-300 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <span>4. Pembajakan Merek Dagang & Sensor Komunitas</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  TLMedia mencuri nama &quot;TLauncher&quot; dari Arthur Kabalov (Turikhay) melalui celah hukum merek dagang di Rusia, lalu melayangkan pemblokiran hak cipta (copyright strike) palsu terhadap YouTuber seperti TheMisterEpic yang mengungkap fakta keamanannya.
                </p>
              </div>
            </div>

            {/* Quick Summary Recommendation */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-white">
                  Sudah Terlanjur Menginstal TLauncher di Komputer Anda?
                </div>
                <p className="text-xs text-neutral-400">
                  Segera lakukan uninstall, hapus folder <code>.tlauncher</code> di <code>%appdata%</code>, dan periksa file hosts Anda menggunakan checklist kami.
                </p>
              </div>
              <button
                onClick={() => {
                  onSelectCategory('dangerous');
                  const el = document.getElementById('launcher-catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-500 transition-colors whitespace-nowrap shadow-sm"
              >
                <span>Lihat Daftar Hitam Launcher</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
