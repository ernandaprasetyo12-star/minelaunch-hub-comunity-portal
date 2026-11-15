import React from 'react';
import { ShieldCheck, ShieldAlert, Sparkles, Layers, BookOpen, BarChart3, Compass, MessageSquare } from 'lucide-react';
import { AppViewMode } from './Navbar';
import { resolvePublicAssetUrl } from '../utils/assetUrl';

interface FooterProps {
  onNavigate: (view: AppViewMode) => void;
  onOpenSafetyGuide: () => void;
  onOpenTour: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenSafetyGuide,
  onOpenTour,
}) => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0e1015]/80 backdrop-blur-xl py-12 text-xs text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info with authentic Minelaunch Hub logo */}
          <div className="md:col-span-4 space-y-3">
            <button 
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 text-left group"
            >
              <img
                src={resolvePublicAssetUrl('/assets/minelaunch_hub_logo.png')}
                alt="MineLaunch Hub Logo"
                className="h-9 w-9 rounded-lg object-cover ring-1 ring-emerald-500/40 group-hover:ring-emerald-400 transition-all"
              />
              <div>
                <span className="text-base font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                  MineLaunch Hub
                </span>
                <span className="block text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
                  Community Portal
                </span>
              </div>
            </button>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Direktori independen dan portal panduan keamanan peluncur Minecraft Java Edition. Membantu komunitas memilih launcher resmi, non-lisensi aman via Ely.by, serta mewaspadai launcher berbahaya.
            </p>
          </div>

          {/* Navigation to Separated Pages */}
          <div className="md:col-span-4 space-y-2">
            <div className="font-semibold text-neutral-200 uppercase tracking-wider text-[11px]">
              Halaman Khusus
            </div>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Beranda Utama
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <Layers className="h-3 w-3" />
                  <span>Katalog Lengkap (25+ Launcher)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('licensed');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="h-3 w-3 text-emerald-400" />
                  <span>Launcher Lisensi Resmi (Prism, Modrinth, dll)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('non-licensed');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="h-3 w-3 text-sky-400" />
                  <span>Launcher Non-Lisensi & Ely.by (XMCL, SK, FreeSM)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('chat');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="h-3 w-3 text-teal-400" />
                  <span>Live Chat Komunitas (Real-Time)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('dangerous');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5"
                >
                  <ShieldAlert className="h-3 w-3 text-red-400" />
                  <span>Zona Bahaya & Blacklist (TLauncher, Salwyrr)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Guides & Security */}
          <div className="md:col-span-4 space-y-2">
            <div className="font-semibold text-neutral-200 uppercase tracking-wider text-[11px]">
              Ensiklopedia & Keamanan
            </div>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => {
                    onNavigate('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="h-3 w-3 text-emerald-400" />
                  <span>Tentang Minecraft & Sistem Lisensi</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('comparison');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
                >
                  <BarChart3 className="h-3 w-3 text-purple-400" />
                  <span>Matriks Komparasi Spek & RAM</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSafetyGuide}
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-red-400" />
                  <span>Tes Keamanan PC & Cek File Hosts</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTour}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Compass className="h-3.5 w-3.5 text-amber-400" />
                  <span>Buka Ulang Tour Panduan</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400 text-center sm:text-left">
          <div className="space-y-1">
            <div className="font-mono text-neutral-300">
              © 2025 Community Minecraft Hub. All rights reserved.
            </div>
            <div className="text-neutral-500">
              Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
            </div>
          </div>
          <div className="text-neutral-500 shrink-0">
            100% Netral · Bebas Iklan · Melindungi Komunitas Pemain
          </div>
        </div>
      </div>
    </footer>
  );
};
