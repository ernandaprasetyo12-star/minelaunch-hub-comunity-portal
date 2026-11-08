import React from 'react';
import { LAUNCHERS, LauncherItem } from '../data/launchers';
import { Check, X, AlertTriangle, ShieldCheck, ExternalLink, HelpCircle } from 'lucide-react';

interface ComparisonTableProps {
  onOpenDetails: (launcher: LauncherItem) => void;
  onOpenInvestigation: (launcher: LauncherItem) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  onOpenDetails,
  onOpenInvestigation,
}) => {
  // Highlight top representative launchers for the comparison
  const sampleLauncherIds = [
    'official-minecraft-launcher',
    'prism-launcher',
    'xmcl',
    'sklauncher',
    'legacy-launcher',
    'tlauncher-malware',
  ];

  const comparedLaunchers = LAUNCHERS.filter((l) => sampleLauncherIds.includes(l.id));

  return (
    <section className="border-t border-neutral-800 bg-neutral-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Tabel Komparasi Head-to-Head
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Perbandingan Fitur, Lisensi & Keamanan Launcher
          </h2>
          <p className="text-sm text-neutral-300 max-w-2xl">
            Lihat perbedaan krusial antara launcher resmi berbayar, alternatif aman via Ely.by, dan launcher berisiko yang harus Anda hindari.
          </p>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950 text-neutral-300 font-semibold">
                <th className="py-4 px-4 sm:px-6">Nama Launcher</th>
                <th className="py-4 px-3 whitespace-nowrap">Wajib Beli Akun?</th>
                <th className="py-4 px-3 whitespace-nowrap">Dukung Ely.by?</th>
                <th className="py-4 px-3 whitespace-nowrap">Open Source?</th>
                <th className="py-4 px-3 whitespace-nowrap">Platform</th>
                <th className="py-4 px-3 whitespace-nowrap">Status Keamanan</th>
                <th className="py-4 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80 text-neutral-200">
              {comparedLaunchers.map((item) => {
                const isDangerous = item.category === 'dangerous';
                return (
                  <tr
                    key={item.id}
                    className={`transition-colors ${
                      isDangerous
                        ? 'bg-red-950/20 hover:bg-red-950/40 text-red-100'
                        : 'hover:bg-neutral-800/40'
                    }`}
                  >
                    {/* Name & Developer */}
                    <td className="py-4 px-4 sm:px-6 font-medium">
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-white text-sm">{item.name}</span>
                        {isDangerous && (
                          <span className="rounded bg-red-900/80 px-1.5 py-0.5 text-[10px] font-bold text-red-200">
                            BLACKLIST
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">{item.developer}</div>
                    </td>

                    {/* License Required */}
                    <td className="py-4 px-3">
                      {item.licenseRequired ? (
                        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                          <Check className="h-4 w-4" />
                          <span>Ya (Microsoft)</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-sky-400 font-semibold">
                          <Check className="h-4 w-4" />
                          <span>Tidak (Gratis/Offline)</span>
                        </div>
                      )}
                    </td>

                    {/* Ely.by Support */}
                    <td className="py-4 px-3">
                      {item.elyBySupport ? (
                        <div className="flex items-center gap-1 text-emerald-400 font-medium">
                          <Check className="h-4 w-4" />
                          <span>Ya</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-neutral-400">
                          <X className="h-4 w-4" />
                          <span>Tidak</span>
                        </div>
                      )}
                    </td>

                    {/* Open Source */}
                    <td className="py-4 px-3">
                      {item.isOpenSource ? (
                        <span className="text-emerald-400 font-mono">Ya (Transparan)</span>
                      ) : (
                        <span className="text-neutral-400 font-mono">Closed Source</span>
                      )}
                    </td>

                    {/* Platforms */}
                    <td className="py-4 px-3 uppercase text-[11px] font-medium text-neutral-300">
                      {item.platforms.join(', ')}
                    </td>

                    {/* Safety Status */}
                    <td className="py-4 px-3">
                      {isDangerous ? (
                        <div className="inline-flex items-center gap-1 text-red-400 font-bold">
                          <AlertTriangle className="h-4 w-4 shrink-0" />
                          <span>BAHAYA (SPYWARE)</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                          <ShieldCheck className="h-4 w-4 shrink-0" />
                          <span>100% Aman</span>
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      {isDangerous ? (
                        <button
                          onClick={() => onOpenInvestigation(item)}
                          className="inline-flex items-center gap-1 rounded-md bg-red-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-red-500 transition-colors shadow-sm"
                        >
                          <span>Investigasi</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onOpenDetails(item)}
                          className="inline-flex items-center gap-1 rounded-md border border-neutral-700 bg-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-200 hover:bg-neutral-700 hover:text-white transition-colors"
                        >
                          <span>Rincian</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
