import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowLeft, 
  ExternalLink, 
  Download,
  Info,
  Filter,
  CheckCircle2,
  Package,
  Layers,
  Cpu,
  Monitor
} from 'lucide-react';
import { MODS, ModItem } from '../data/mods';
import { AppViewMode } from './Navbar';
import { SafeImage } from './SafeImage';

interface ModsPageProps {
  onNavigate: (view: AppViewMode) => void;
}

export const ModsPage: React.FC<ModsPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'modrinth' | 'curseforge'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredMods = MODS.filter((mod) => {
    if (sourceFilter !== 'all' && mod.source !== sourceFilter) return false;
    if (categoryFilter !== 'all' && !mod.category.includes(categoryFilter)) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = mod.name.toLowerCase().includes(q);
      const matchSummary = mod.summary.toLowerCase().includes(q);
      const matchAuthor = mod.author.toLowerCase().includes(q);
      if (!matchName && !matchSummary && !matchAuthor) return false;
    }
    return true;
  });

  const categories = Array.from(new Set(MODS.flatMap(m => m.category))).sort();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Navigation Header */}
      <div className="space-y-4 border-b border-neutral-800 pb-6">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Beranda Utama</span>
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-950 text-orange-400 border border-orange-800/80 shadow-md">
                <Sparkles className="h-5 w-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Integrasi Mods & Addons (Modrinth & CurseForge)
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
              Jelajahi kumpulan modifikasi Minecraft Java Edition paling populer langsung dari repositori resmi <strong>Modrinth</strong> dan <strong>CurseForge</strong>. Optimalkan performa PC Anda atau tambahkan fitur gameplay baru.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a 
              href="https://modrinth.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl border border-emerald-900 bg-emerald-950/40 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/50 transition-all flex items-center gap-1.5"
            >
              <Package className="h-3.5 w-3.5" />
              <span>Modrinth.com</span>
            </a>
            <a 
              href="https://www.curseforge.com/minecraft" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl border border-orange-900 bg-orange-950/40 text-xs font-semibold text-orange-300 hover:bg-orange-900/50 transition-all flex items-center gap-1.5"
            >
              <Monitor className="h-3.5 w-3.5" />
              <span>CurseForge</span>
            </a>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col xl:flex-row items-center justify-between gap-4 bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800">
        <div className="relative w-full xl:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari mod, fitur, atau pembuat..."
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:border-orange-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full xl:w-auto overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setSourceFilter('all')}
            className={`px-3.5 py-2 rounded-xl border transition-all whitespace-nowrap ${
              sourceFilter === 'all'
                ? 'bg-neutral-800 border-neutral-600 text-white font-bold'
                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            Semua Sumber
          </button>

          <button
            onClick={() => setSourceFilter('modrinth')}
            className={`px-3.5 py-2 rounded-xl border transition-all whitespace-nowrap flex items-center gap-1.5 ${
              sourceFilter === 'modrinth'
                ? 'bg-emerald-950 border-emerald-700 text-emerald-300 font-bold'
                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Modrinth</span>
          </button>

          <button
            onClick={() => setSourceFilter('curseforge')}
            className={`px-3.5 py-2 rounded-xl border transition-all whitespace-nowrap flex items-center gap-1.5 ${
              sourceFilter === 'curseforge'
                ? 'bg-orange-950 border-orange-700 text-orange-300 font-bold'
                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            <span>CurseForge</span>
          </button>

          <div className="h-6 w-px bg-neutral-800 mx-1 hidden sm:block" />

          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-neutral-950 border border-neutral-800 text-neutral-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-orange-500"
          >
            <option value="all">Semua Kategori</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Mod Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredMods.map((mod) => (
          <div
            key={mod.id}
            className="group relative flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900/70 hover:border-orange-500/50 transition-all duration-200 overflow-hidden shadow-lg"
          >
            <div className="p-5 space-y-4 flex flex-col h-full">
              <div className="flex gap-4">
                <div className="h-14 w-14 rounded-xl bg-neutral-950 border border-neutral-800 p-2 shrink-0 flex items-center justify-center overflow-hidden">
                  <SafeImage src={mod.iconUrl} alt={mod.name} className="h-full w-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors truncate">
                    {mod.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-medium">
                    <span>by {mod.author}</span>
                  </div>
                  <div className="mt-1">
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      mod.source === 'modrinth' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60' : 'bg-orange-950 text-orange-400 border border-orange-800/60'
                    }`}>
                      {mod.source}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3 flex-1">
                {mod.summary}
              </p>

              <div className="flex flex-wrap gap-1">
                {mod.category.map((cat, i) => (
                  <span key={i} className="text-[9px] bg-neutral-950 text-neutral-400 border border-neutral-800 px-1.5 py-0.5 rounded">
                    {cat}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <Download className="h-3 w-3" />
                  <span className="text-[10px] font-bold">{mod.downloads}</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={mod.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                    title="Buka Halaman Proyek"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={mod.projectUrl + '/download'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-orange-600 hover:bg-orange-500 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all shadow-md shadow-orange-950/40"
                  >
                    <span>Unduh Mod</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CALLOUT BANNER FOR MORE MODS */}
      <div className="rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-orange-950/20 p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-widest">
            <Info className="h-4 w-4" />
            <span>Pustaka Mod Terbesar di Dunia</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
            Mau lebih banyak mod menarik lainnya?
          </h2>
          <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
            Database di atas hanyalah sebagian kecil dari jutaan modifikasi yang tersedia. Kunjungi situs resmi repositori mod terbesar untuk menemukan plugin, data pack, shader, dan mod keren lainnya.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <a
            href="https://modrinth.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white transition-all shadow-lg shadow-emerald-950/40 group"
          >
            <span>Kunjungi Modrinth</span>
            <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="https://www.curseforge.com/minecraft"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-500 px-6 py-3.5 text-sm font-bold text-white transition-all shadow-lg shadow-orange-950/40 group"
          >
            <span>Kunjungi CurseForge</span>
            <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};
