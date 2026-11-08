import React from 'react';
import { LauncherItem } from '../data/launchers';
import { 
  Download, ExternalLink, ShieldAlert, Star, CheckCircle2, 
  XCircle, AlertTriangle, FileText, ShieldCheck, Sparkles, Globe 
} from 'lucide-react';

import { SafeImage } from './SafeImage';

interface LauncherCardProps {
  launcher: LauncherItem;
  onOpenDetails: (launcher: LauncherItem) => void;
  onOpenInvestigation: (launcher: LauncherItem) => void;
  onTriggerDownload: (launcher: LauncherItem) => void;
}

export const LauncherCard: React.FC<LauncherCardProps> = ({
  launcher,
  onOpenDetails,
  onOpenInvestigation,
  onTriggerDownload,
}) => {
  const isDangerous = launcher.category === 'dangerous';
  const isLicensed = launcher.category === 'licensed';

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border transition-all duration-200 overflow-hidden ${
        isDangerous
          ? 'border-red-900/60 bg-gradient-to-b from-neutral-900 to-red-950/20 hover:border-red-700/80 shadow-sm shadow-red-950/30'
          : isLicensed
          ? 'border-neutral-800 bg-neutral-900/60 hover:border-emerald-600/50 hover:bg-neutral-900/90'
          : 'border-neutral-800 bg-neutral-900/60 hover:border-sky-600/50 hover:bg-neutral-900/90'
      }`}
    >
      {/* Visual Header / Brand Artwork */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950">
        <SafeImage
          src={launcher.image}
          alt={`Brand visual dan screenshot untuk ${launcher.name}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

        {/* Brand Badge Overlay & Safety Score */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          {isDangerous ? (
            <div className="inline-flex items-center gap-1.5 rounded-md bg-red-950/90 border border-red-700/80 px-2.5 py-1 text-xs font-semibold text-red-200 backdrop-blur-sm">
              <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
              <span>Daftar Hitam</span>
            </div>
          ) : isLicensed ? (
            <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-950/90 border border-emerald-700/80 px-2.5 py-1 text-xs font-semibold text-emerald-200 backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Wajib Lisensi Resmi</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 rounded-md bg-sky-950/90 border border-sky-700/80 px-2.5 py-1 text-xs font-semibold text-sky-200 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              <span>Non-Lisensi & Ely.by</span>
            </div>
          )}

          {/* Security Rating Score */}
          <div
            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-bold font-mono tabular-nums backdrop-blur-sm border ${
              launcher.safetyRating.level === 'SAFE'
                ? 'bg-emerald-950/80 border-emerald-800 text-emerald-300'
                : launcher.safetyRating.level === 'CAUTION'
                ? 'bg-amber-950/80 border-amber-800 text-amber-300'
                : 'bg-red-950/90 border-red-800 text-red-300'
            }`}
            title={`Skor Keamanan Komunitas: ${launcher.safetyRating.score}/100`}
          >
            <ShieldCheck className="h-3 w-3" />
            <span>Skor: {launcher.safetyRating.score}%</span>
          </div>
        </div>

        {/* Supported Platforms at bottom edge of thumbnail */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-neutral-300">
          <div className="flex items-center gap-1.5 font-medium">
            <span>Platform:</span>
            <span className="uppercase text-neutral-200 font-semibold tracking-wider">
              {launcher.platforms.join(' / ')}
            </span>
          </div>
          <div className="flex items-center gap-1 text-amber-300 font-semibold">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span>{launcher.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5 space-y-4">
        {/* Title and Developer */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
              {launcher.name}
            </h3>
          </div>
          {/* Clean unboxed metadata separator */}
          <div className="mt-1 flex items-center gap-1.5 text-xs text-neutral-400">
            <span>Oleh {launcher.developer}</span>
            <span aria-hidden="true">·</span>
            <span>Min RAM: {launcher.minRam}</span>
          </div>
        </div>

        {/* Tagline / Value proposition */}
        <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
          {launcher.tagline}
        </p>

        {/* License Requirement Callout Box */}
        <div
          className={`rounded-xl p-3 text-xs border ${
            isDangerous
              ? 'border-red-900/60 bg-red-950/30 text-red-200'
              : isLicensed
              ? 'border-neutral-800 bg-neutral-950/60 text-neutral-300'
              : 'border-sky-900/40 bg-sky-950/20 text-sky-200'
          }`}
        >
          <div className="font-semibold text-xs mb-1 flex items-center gap-1.5">
            {isDangerous ? (
              <>
                <ShieldAlert className="h-3.5 w-3.5 text-red-400 shrink-0" />
                <span className="text-red-300">Status Keamanan: Berbahaya</span>
              </>
            ) : isLicensed ? (
              <>
                <span className="text-emerald-400 font-semibold">Butuh Lisensi?</span>
                <span className="text-white">YA (Akun Resmi Microsoft)</span>
              </>
            ) : (
              <>
                <span className="text-sky-400 font-semibold">Butuh Lisensi?</span>
                <span className="text-emerald-300">TIDAK (Mendukung Ely.by & Offline)</span>
              </>
            )}
          </div>
          <p className="text-[11px] text-neutral-400 line-clamp-2 leading-normal">
            {launcher.licenseExplanation}
          </p>
        </div>

        {/* Security Rating Details */}
        <div className="rounded-lg bg-neutral-950/50 p-2.5 border border-neutral-800/80 text-[11px] space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span>Audit Antivirus:</span>
            <span className={isDangerous ? 'text-red-400 font-medium' : 'text-emerald-400 font-medium'}>
              {launcher.safetyRating.antivirusScore}
            </span>
          </div>
          <div className="flex items-center justify-between text-neutral-400">
            <span>Privasi & Hosts:</span>
            <span className={isDangerous ? 'text-red-400 font-medium' : 'text-neutral-300'}>
              {launcher.safetyRating.privacyVerdict}
            </span>
          </div>
        </div>

        {/* Push actions to bottom */}
        <div className="mt-auto pt-3 border-t border-neutral-800/80 flex items-center gap-2">
          {isDangerous ? (
            <>
              {/* If dangerous: prominent Wikipedia-style investigation button */}
              <button
                onClick={() => onOpenInvestigation(launcher)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-600/90 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-red-500 transition-colors whitespace-nowrap"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Baca Investigasi Wikipedia</span>
              </button>

              <button
                onClick={() => onOpenDetails(launcher)}
                title="Lihat rincian bahaya"
                className="inline-flex items-center justify-center rounded-lg border border-red-900/80 bg-red-950/50 px-2.5 py-2 text-xs font-medium text-red-300 hover:bg-red-900/40 hover:text-white transition-colors"
              >
                <AlertTriangle className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            <>
              {/* Direct Website link as requested by user */}
              <a
                href={launcher.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white transition-colors whitespace-nowrap shadow-sm ${
                  isLicensed
                    ? 'bg-emerald-600 hover:bg-emerald-500'
                    : 'bg-sky-600 hover:bg-sky-500'
                }`}
                title={`Kunjungi website resmi ${launcher.name}`}
              >
                <Globe className="h-3.5 w-3.5" />
                <span>Website Resmi</span>
              </a>

              <button
                onClick={() => onOpenDetails(launcher)}
                className="inline-flex items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800/80 px-3 py-2 text-xs font-medium text-neutral-200 hover:bg-neutral-700 hover:text-white transition-colors whitespace-nowrap"
                title="Lihat spesifikasi & opsi download"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline ml-1">Unduh</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
