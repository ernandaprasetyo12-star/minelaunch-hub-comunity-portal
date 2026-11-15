import React from 'react';
import { LauncherItem } from '../data/launchers';
import {
  Download,
  ShieldAlert,
  Star,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Sparkles,
  Globe,
  Play,
} from 'lucide-react';
import { SafeImage } from './SafeImage';

interface LauncherCardProps {
  launcher: LauncherItem;
  onOpenDetails: (launcher: LauncherItem) => void;
  onOpenInvestigation: (launcher: LauncherItem) => void;
  onTriggerDownload: (launcher: LauncherItem) => void;
}

interface LauncherTileProps {
  launcher: LauncherItem;
  isHighlighted?: boolean;
  onOpenDetails: (launcher: LauncherItem) => void;
  onOpenInvestigation: (launcher: LauncherItem) => void;
  onTriggerDownload: (launcher: LauncherItem) => void;
}

export const LauncherTile: React.FC<LauncherTileProps> = ({
  launcher,
  isHighlighted = false,
  onOpenDetails,
  onOpenInvestigation,
  onTriggerDownload,
}) => {
  const isDangerous = launcher.category === 'dangerous';
  const isLicensed = launcher.category === 'licensed';

  const categoryShort = isDangerous
    ? 'Blacklist'
    : isLicensed
      ? 'Resmi'
      : 'Ely.by';

  const handleTileClick = () => {
    if (isDangerous) {
      onOpenInvestigation(launcher);
    } else {
      onOpenDetails(launcher);
    }
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDangerous) {
      onOpenInvestigation(launcher);
    } else {
      onTriggerDownload(launcher);
    }
  };

  return (
    <div
      onClick={handleTileClick}
      className={`group flex items-center justify-between gap-3 rounded-xl px-3.5 py-3 backdrop-blur-md border transition-all duration-150 cursor-pointer ${
        isDangerous
          ? 'bg-[#1b1416]/85 border-red-900/50 hover:border-red-500/80 hover:bg-[#241619]/90'
          : isHighlighted
            ? 'bg-[#161f1b]/90 border-emerald-500/80 ring-1 ring-emerald-500/30 hover:bg-[#1a2620]/95'
            : 'bg-[#16181e]/85 border-white/[0.08] hover:border-emerald-500/60 hover:bg-[#1c1f27]/95'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-11 w-11 rounded-lg overflow-hidden bg-neutral-950/90 border border-white/10 shrink-0">
          <SafeImage
            src={launcher.image}
            alt={launcher.name}
            className={`h-full w-full ${
              launcher.id === 'freesm-launcher' ? 'object-contain p-1' : 'object-cover'
            }`}
          />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-bold text-white truncate group-hover:text-emerald-300 transition-colors">
            {launcher.name}
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono truncate">
            <span
              className={
                isDangerous
                  ? 'text-red-400 font-semibold'
                  : isLicensed
                    ? 'text-emerald-400 font-semibold'
                    : 'text-sky-400 font-semibold'
              }
            >
              {categoryShort}
            </span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{launcher.minRam}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleActionClick}
        title={isDangerous ? `Investigasi bahaya ${launcher.name}` : `Unduh ${launcher.name}`}
        className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all shrink-0 cursor-pointer ${
          isDangerous
            ? 'text-red-400 hover:bg-red-500/20 hover:text-red-300'
            : 'text-[#22c55e] hover:bg-emerald-500/20 hover:text-emerald-300'
        }`}
      >
        {isDangerous ? (
          <ShieldAlert className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4 fill-current" />
        )}
      </button>
    </div>
  );
};

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
      onClick={() => (isDangerous ? onOpenInvestigation(launcher) : onOpenDetails(launcher))}
      className={`group relative flex flex-col rounded-2xl border backdrop-blur-md transition-all duration-200 overflow-hidden cursor-pointer ${
        isDangerous
          ? 'border-red-900/60 bg-[#1a1316]/85 hover:border-red-500/80'
          : isLicensed
            ? 'border-white/[0.08] bg-[#16181e]/80 hover:border-emerald-500/60 hover:bg-[#1a1d24]/90'
            : 'border-white/[0.08] bg-[#16181e]/80 hover:border-sky-500/60 hover:bg-[#1a1d24]/90'
      }`}
    >
      {/* Visual Header / Brand Artwork */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950/90">
        <SafeImage
          src={launcher.image}
          alt={`Brand visual dan screenshot untuk ${launcher.name}`}
          className={`h-full w-full ${
            launcher.id === 'freesm-launcher' ? 'object-contain p-2' : 'object-cover'
          } transition-transform duration-300 group-hover:scale-105`}
        />

        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#16181e] via-[#16181e]/35 to-transparent" />

        {/* Clean Top Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 text-[11px] font-semibold">
          {isDangerous ? (
            <div className="inline-flex items-center gap-1.5 rounded-lg bg-red-950/90 border border-red-700/70 px-2.5 py-1 text-red-200 backdrop-blur-sm">
              <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
              <span>Daftar Hitam</span>
            </div>
          ) : isLicensed ? (
            <div className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-950/85 border border-emerald-600/50 px-2.5 py-1 text-emerald-300 backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Lisensi Resmi</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-950/85 border border-sky-600/50 px-2.5 py-1 text-sky-300 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              <span>Non-Lisensi &amp; Ely.by</span>
            </div>
          )}

          <div
            className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 font-mono tabular-nums backdrop-blur-sm border ${
              launcher.safetyRating.level === 'SAFE'
                ? 'bg-neutral-950/85 border-emerald-700/60 text-emerald-300'
                : launcher.safetyRating.level === 'CAUTION'
                  ? 'bg-neutral-950/85 border-amber-700/60 text-amber-300'
                  : 'bg-red-950/90 border-red-700/70 text-red-300'
            }`}
            title={`Skor Keamanan Komunitas: ${launcher.safetyRating.score}/100`}
          >
            <span>Skor {launcher.safetyRating.score}%</span>
          </div>
        </div>

        {/* Supported Platforms at bottom edge of thumbnail */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-neutral-300">
          <span className="uppercase text-neutral-200 font-semibold tracking-wider">
            {launcher.platforms.join(' · ')}
          </span>
          <div className="flex items-center gap-1 text-amber-300 font-semibold tabular-nums">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span>{launcher.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5 space-y-3.5">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
            {launcher.name}
          </h3>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-neutral-400">
            <span>Oleh {launcher.developer}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">Min RAM: {launcher.minRam}</span>
          </div>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
          {launcher.tagline}
        </p>

        {/* License Requirement Callout */}
        <div
          className={`rounded-xl p-3 text-xs border ${
            isDangerous
              ? 'border-red-900/50 bg-red-950/30 text-red-200'
              : isLicensed
                ? 'border-white/[0.06] bg-neutral-950/50 text-neutral-300'
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
                <span className="text-emerald-400">Lisensi:</span>
                <span className="text-white">Akun Resmi Microsoft</span>
              </>
            ) : (
              <>
                <span className="text-sky-400">Lisensi:</span>
                <span className="text-emerald-300">Gratis (Ely.by &amp; Offline)</span>
              </>
            )}
          </div>
          <p className="text-[11px] text-neutral-400 line-clamp-2 leading-normal">
            {launcher.licenseExplanation}
          </p>
        </div>

        {/* Security Rating Details */}
        <div className="rounded-xl bg-neutral-950/45 px-3 py-2.5 border border-white/[0.06] text-[11px] space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span>Audit Antivirus</span>
            <span className={isDangerous ? 'text-red-400 font-medium' : 'text-emerald-400 font-medium'}>
              {launcher.safetyRating.antivirusScore}
            </span>
          </div>
          <div className="flex items-center justify-between text-neutral-400">
            <span>Privasi &amp; Hosts</span>
            <span className={isDangerous ? 'text-red-400 font-medium' : 'text-neutral-300'}>
              {launcher.safetyRating.privacyVerdict}
            </span>
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-auto pt-3 border-t border-white/[0.08] flex items-center gap-2">
          {isDangerous ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenInvestigation(launcher);
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-600/90 px-3 py-2.5 text-xs font-bold text-white hover:bg-red-500 transition-colors whitespace-nowrap cursor-pointer"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Investigasi Wikipedia</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetails(launcher);
                }}
                title="Lihat rincian bahaya"
                className="inline-flex items-center justify-center rounded-xl border border-red-900/80 bg-red-950/50 px-3 py-2.5 text-xs font-medium text-red-300 hover:bg-red-900/40 hover:text-white transition-colors cursor-pointer"
              >
                <AlertTriangle className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTriggerDownload(launcher);
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] px-3 py-2.5 text-xs font-bold text-neutral-950 transition-colors whitespace-nowrap shadow-sm cursor-pointer"
                title={`Unduh langsung ${launcher.name}`}
              >
                <Download className="h-3.5 w-3.5" />
                <span>Unduh Launcher</span>
              </button>

              <a
                href={launcher.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-neutral-900/90 px-3 py-2.5 text-xs font-semibold text-neutral-200 hover:border-emerald-500/60 hover:text-white transition-colors whitespace-nowrap"
                title={`Kunjungi website resmi ${launcher.name}`}
              >
                <Globe className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Situs</span>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
