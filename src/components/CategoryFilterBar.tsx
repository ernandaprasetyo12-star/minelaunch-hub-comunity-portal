import React from 'react';
import { Search, X, Monitor, ShieldCheck, Download, AlertTriangle, Layers } from 'lucide-react';

interface CategoryFilterBarProps {
  currentCategory: string;
  onSelectCategory: (category: string) => void;
  selectedPlatform: string;
  onSelectPlatform: (platform: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  counts: {
    all: number;
    licensed: number;
    nonLicensed: number;
    dangerous: number;
  };
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  currentCategory,
  onSelectCategory,
  selectedPlatform,
  onSelectPlatform,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  counts,
}) => {
  return (
    <div id="launcher-catalog" className="space-y-4 pt-6 pb-2">
      {/* Primary Category Segmented Tabs */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Functional Segmented Button Control (Section 1.A DO) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
          <button
            onClick={() => onSelectCategory('all')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              currentCategory === 'all'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-neutral-400" />
            <span>Semua Launcher</span>
            <span className="font-mono text-[11px] text-neutral-400">({counts.all})</span>
          </button>

          <button
            onClick={() => onSelectCategory('licensed')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              currentCategory === 'licensed'
                ? 'bg-emerald-950 text-emerald-200 border border-emerald-800/80 shadow-sm'
                : 'text-neutral-400 hover:text-emerald-300 hover:bg-neutral-800/50'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Wajib Lisensi Resmi</span>
            <span className="font-mono text-[11px] text-emerald-400/80">({counts.licensed})</span>
          </button>

          <button
            onClick={() => onSelectCategory('non-licensed')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              currentCategory === 'non-licensed'
                ? 'bg-sky-950 text-sky-200 border border-sky-800/80 shadow-sm'
                : 'text-neutral-400 hover:text-sky-300 hover:bg-neutral-800/50'
            }`}
          >
            <Download className="h-3.5 w-3.5 text-sky-400" />
            <span>Non-Lisensi & Ely.by</span>
            <span className="font-mono text-[11px] text-sky-400/80">({counts.nonLicensed})</span>
          </button>

          <button
            onClick={() => onSelectCategory('dangerous')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              currentCategory === 'dangerous'
                ? 'bg-red-950 text-red-200 border border-red-800/80 shadow-sm'
                : 'text-red-400 hover:text-red-300 hover:bg-red-950/40'
            }`}
          >
            <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
            <span>Peringatan Bahaya & Blacklist</span>
            <span className="font-mono text-[11px] text-red-400/80">({counts.dangerous})</span>
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 shrink-0">
          <label htmlFor="sort-select" className="whitespace-nowrap font-medium">
            Urutkan:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-200 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="rating">Rating Tertinggi</option>
            <option value="name-asc">Nama (A - Z)</option>
            <option value="name-desc">Nama (Z - A)</option>
          </select>
        </div>
      </div>

      {/* Secondary Bar: OS Platforms and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        {/* OS Platform Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-neutral-400 mr-1 flex items-center gap-1 whitespace-nowrap shrink-0">
            <Monitor className="h-3.5 w-3.5" />
            <span>Sistem Operasi:</span>
          </span>
          {[
            { id: 'all', label: 'Semua OS' },
            { id: 'windows', label: 'Windows' },
            { id: 'macos', label: 'macOS' },
            { id: 'linux', label: 'Linux' },
            { id: 'android', label: 'Android/iOS' },
          ].map((platform) => (
            <button
              key={platform.id}
              onClick={() => onSelectPlatform(platform.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                selectedPlatform === platform.id
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              {platform.label}
            </button>
          ))}
        </div>

        {/* Search Bar with clear button */}
        <div className="relative min-w-[240px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari nama, fitur, atau Ely.by..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-neutral-800 bg-neutral-900/90 pl-9 pr-8 py-1.5 text-xs text-neutral-100 placeholder-neutral-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
