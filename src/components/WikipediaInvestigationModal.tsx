import React, { useState } from 'react';
import { LauncherItem } from '../data/launchers';
import { 
  X, AlertTriangle, ShieldCheck, ExternalLink, Check, 
  ArrowRight, Bookmark, BookOpen, AlertOctagon, Terminal, Trash2
} from 'lucide-react';

interface WikipediaInvestigationModalProps {
  launcher: LauncherItem;
  isOpen: boolean;
  onClose: () => void;
  onSelectSafeAlternative: (alternativeName: string) => void;
}

export const WikipediaInvestigationModal: React.FC<WikipediaInvestigationModalProps> = ({
  launcher,
  isOpen,
  onClose,
  onSelectSafeAlternative,
}) => {
  const [showDirectDownloadConfirm, setShowDirectDownloadConfirm] = useState(false);
  const [riskAcknowledged, setRiskAcknowledged] = useState(false);

  if (!isOpen) return null;

  const investigation = launcher.wikiInvestigation;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      {/* Container with Wikipedia theme styling */}
      <div 
        className="relative w-full max-w-4xl rounded-2xl border border-neutral-700 bg-neutral-900 text-neutral-100 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Wikipedia Header Ribbon */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-800 text-neutral-200 font-serif font-black text-sm border border-neutral-700">
              W
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Arsip Investigasi Keamanan Komunitas · Format Wikipedia
              </div>
              <div className="text-sm font-bold text-white">
                Dossier: Kasus Keamanan {launcher.name}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
            aria-label="Tutup investigasi"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-4 py-6 sm:px-8 space-y-6 text-sm leading-relaxed">
          {/* URGENT WARNING BANNER (Wikipedia Style Callout) */}
          <div className="rounded-xl border-2 border-red-600 bg-red-950/40 p-4 sm:p-5 shadow-lg shadow-red-950/20">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-md">
                <AlertOctagon className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-red-400 font-mono">
                    STATUS KEAMANAN: KRITIS / DAFTAR HITAM
                  </span>
                  <span className="text-xs text-neutral-400">·</span>
                  <span className="text-xs text-red-300">Dilarang di r/Minecraft & Komunitas Modding</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                  Peringatan Bahaya Siber Sebelum Mengunduh {launcher.name}
                </h2>
                <p className="text-xs sm:text-sm text-red-200/90 leading-relaxed">
                  Perangkat lunak ini dilaporkan oleh para peneliti keamanan independen dan kreator terkemuka (TheMisterEpic) karena riwayat pembajakan file hosts sistem Windows, pengunduhan file Java executable (.jar) tersembunyi yang berpotensi menjadi backdoor spyware, serta perebutan hak merek dagang dari pembuat aslinya (Arthur Kabalov / Turikhay).
                </p>
                
                {/* Fast Action for Alternative */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectSafeAlternative('legacy-launcher');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-sm"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Gunakan TL Asli yang Aman (Legacy Launcher)</span>
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectSafeAlternative('xmcl');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3.5 py-1.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition-colors"
                  >
                    <span>Pilihan Lain: XMCL (Open Source)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid: Wikipedia Prose + Sidebar Infobox */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Article Prose */}
            <div className="lg:col-span-8 space-y-6 text-neutral-200">
              {/* Lead Paragraph */}
              <div className="border-b border-neutral-800 pb-4">
                <p className="text-sm sm:text-base leading-relaxed text-neutral-300">
                  <strong className="text-white font-bold">{launcher.name}</strong>{' '}
                  (saat ini dikelola oleh entitas komersial <em>TLMedia</em>) adalah subjek dari skandal keamanan siber dan pelanggaran etika terbesar dalam sejarah komunitas Minecraft Java Edition. Meskipun dipromosikan secara luas kepada pemula sebagai &quot;launcher gratis&quot;, analisis teknis membuktikan adanya bahaya manipulasi file sistem operasi dan potensi risiko pencurian data pribadi.
                </p>
              </div>

              {/* Table of Contents (Wikipedia Box) */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 max-w-md">
                <div className="flex items-center gap-2 font-semibold text-xs text-neutral-300 uppercase tracking-wider mb-2">
                  <BookOpen className="h-4 w-4 text-emerald-400" />
                  <span>Daftar Isi Investigasi</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-xs text-emerald-400">
                  {investigation?.sections.map((section, idx) => (
                    <li key={idx}>
                      <a href={`#section-${idx}`} className="hover:underline text-neutral-300 hover:text-emerald-300">
                        {section.title}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="#referensi-bukti" className="hover:underline text-neutral-300 hover:text-emerald-300">
                      Referensi & Catatan Bukti Komunitas
                    </a>
                  </li>
                </ol>
              </div>

              {/* Sections */}
              {investigation?.sections.map((sec, idx) => (
                <div key={idx} id={`section-${idx}`} className="space-y-2 pt-2">
                  <h3 className="text-base font-bold text-white border-b border-neutral-800 pb-1.5 flex items-center gap-2">
                    <span className="text-emerald-400 font-mono text-sm">{idx + 1}.</span>
                    <span>{sec.title.replace(/^\d+\.\s*/, '')}</span>
                  </h3>
                  <div className="text-xs sm:text-sm text-neutral-300 whitespace-pre-line leading-relaxed space-y-2">
                    {sec.content}
                  </div>
                </div>
              ))}

              {/* Step-by-Step Cleanup Guide Box */}
              <div className="rounded-xl border border-amber-900/60 bg-amber-950/20 p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                  <Trash2 className="h-4 w-4 text-amber-400" />
                  <span>Panduan Menghapus TLauncher Secara Bersih dari Windows</span>
                </div>
                <div className="space-y-2 text-xs text-neutral-300">
                  <div className="flex items-start gap-2">
                    <span className="font-mono bg-neutral-800 px-1.5 py-0.5 rounded text-amber-300 text-[11px]">1</span>
                    <span>Hapus instalasi melalui <strong>Control Panel &gt; Programs &gt; Uninstall a program</strong>.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono bg-neutral-800 px-1.5 py-0.5 rounded text-amber-300 text-[11px]">2</span>
                    <span>Tekan <kbd className="bg-neutral-800 border border-neutral-700 px-1 py-0.5 rounded text-[10px]">Win + R</kbd>, ketik <code className="text-emerald-400 font-mono">%appdata%</code>, lalu hapus folder <code>.tlauncher</code>.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono bg-neutral-800 px-1.5 py-0.5 rounded text-amber-300 text-[11px]">3</span>
                    <span>Buka file <code>C:\Windows\System32\drivers\etc\hosts</code> dengan Notepad (Run as Admin) dan hapus baris yang memuat kata <em>ely.by</em> atau <em>minecraft</em>.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono bg-neutral-800 px-1.5 py-0.5 rounded text-amber-300 text-[11px]">4</span>
                    <span>Jalankan Full Antivirus Scan menggunakan Windows Defender atau Malwarebytes.</span>
                  </div>
                </div>
              </div>

              {/* Citations & References Section */}
              <div id="referensi-bukti" className="pt-4 border-t border-neutral-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Referensi & Bukti Investigasi Komunitas:
                </h4>
                <div className="space-y-2 text-xs text-neutral-400">
                  {investigation?.references.map((ref) => (
                    <div key={ref.id} className="flex items-start gap-2">
                      <span className="font-mono text-emerald-400 text-[11px]">[{ref.id}]</span>
                      <div>
                        <span className="text-neutral-200 font-medium">{ref.author}</span> ({ref.year}).{' '}
                        <span className="italic text-neutral-300">&quot;{ref.title}&quot;</span>.{' '}
                        <span className="text-neutral-400">{ref.source}</span>.
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Wikipedia Standard Infobox */}
            <div className="lg:col-span-4 rounded-xl border border-neutral-700 bg-neutral-950 p-4 space-y-4">
              <div className="text-center border-b border-neutral-800 pb-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Infobox Software Berisiko
                </div>
                <h4 className="text-base font-extrabold text-white mt-1">
                  {launcher.name}
                </h4>
              </div>

              {/* Danger Graphic in Infobox */}
              <div className="rounded-lg overflow-hidden border border-red-900/60 aspect-[16/9]">
                <img
                  src={launcher.image}
                  alt="Ilustrasi bahaya TLauncher"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Infobox Key-Values */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-neutral-800/80">
                  <span className="text-neutral-400">Pengembang Asli</span>
                  <span className="text-neutral-200 font-medium text-right">Arthur Kabalov (Turikhay)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800/80">
                  <span className="text-neutral-400">Operator Komersial</span>
                  <span className="text-neutral-200 font-medium text-right">TLMedia (Rusia)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800/80">
                  <span className="text-neutral-400">Klasifikasi Ancaman</span>
                  <span className="text-red-400 font-semibold text-right">Spyware / Hosts Hijacker</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800/80">
                  <span className="text-neutral-400">Status Komunitas</span>
                  <span className="text-red-400 font-bold text-right">DIBLACKLIST (r/Minecraft)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800/80">
                  <span className="text-neutral-400">Deteksi Antivirus</span>
                  <span className="text-amber-400 text-right">Trojan.Win32 / Riskware</span>
                </div>
              </div>

              {/* Safe Alternatives in Infobox */}
              <div className="pt-2 space-y-2">
                <div className="text-xs font-bold text-neutral-300">
                  Alternatif 100% Aman yang Disarankan:
                </div>
                <div className="space-y-1.5">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectSafeAlternative('legacy-launcher');
                    }}
                    className="w-full text-left p-2 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-xs text-emerald-200 hover:bg-emerald-900/60 transition-colors flex items-center justify-between"
                  >
                    <span>Legacy Launcher (TL Asli)</span>
                    <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectSafeAlternative('xmcl');
                    }}
                    className="w-full text-left p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 hover:bg-neutral-800 transition-colors flex items-center justify-between"
                  >
                    <span>XMCL (Open Source & Ely.by)</span>
                    <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectSafeAlternative('prism-launcher');
                    }}
                    className="w-full text-left p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 hover:bg-neutral-800 transition-colors flex items-center justify-between"
                  >
                    <span>Prism Launcher (Resmi)</span>
                    <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* User Download Decision / Confirmation Gatekeeper */}
          <div className="pt-6 border-t border-neutral-800 space-y-4">
            <div className="rounded-xl border border-red-900/80 bg-red-950/30 p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span>Konfirmasi Sebelum Mengunduh {launcher.name}</span>
                  </div>
                  <p className="text-xs text-neutral-300">
                    Apakah Anda tetap ingin mengunduh launcher berisiko ini meskipun telah membaca investigasi bahayanya?
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectSafeAlternative('legacy-launcher');
                    }}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap shadow-sm"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Pilih Alternatif Aman Saja</span>
                  </button>

                  <button
                    onClick={() => setShowDirectDownloadConfirm(!showDirectDownloadConfirm)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-800/80 bg-red-950/60 px-3 py-2 text-xs font-semibold text-red-300 hover:bg-red-900/50 hover:text-white transition-colors whitespace-nowrap"
                  >
                    <span>Tetap Buka Situs TLauncher</span>
                  </button>
                </div>
              </div>

              {/* 2-Step Confirmation Checkbox */}
              {showDirectDownloadConfirm && (
                <div className="mt-4 pt-4 border-t border-red-900/60 space-y-3">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-red-200">
                    <input
                      type="checkbox"
                      checked={riskAcknowledged}
                      onChange={(e) => setRiskAcknowledged(e.target.checked)}
                      className="mt-0.5 rounded border-red-700 bg-neutral-900 text-red-600 focus:ring-red-500"
                    />
                    <span>
                      Saya menyatakan bahwa saya telah membaca seluruh laporan investigasi di atas dan sepenuhnya memahami risiko keamanan (modifikasi file hosts, dugaan spyware, dan deteksi antivirus) pada komputer saya sendiri.
                    </span>
                  </label>

                  <div className="flex items-center gap-3">
                    <a
                      href={riskAcknowledged ? launcher.websiteUrl : '#'}
                      target={riskAcknowledged ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold text-white transition-all ${
                        riskAcknowledged
                          ? 'bg-red-600 hover:bg-red-500 cursor-pointer shadow-md'
                          : 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700'
                      }`}
                      onClick={(e) => {
                        if (!riskAcknowledged) e.preventDefault();
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Buka Situs Resmi TLauncher (Risiko Ditanggung Sendiri)</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-800 bg-neutral-950 px-4 py-3 sm:px-6 flex items-center justify-between text-xs text-neutral-400">
          <span>Kompilasi Data Keamanan Komunitas Minecraft 2024–2026</span>
          <button
            onClick={onClose}
            className="text-neutral-300 hover:text-white font-medium"
          >
            Tutup Jendela
          </button>
        </div>
      </div>
    </div>
  );
};
