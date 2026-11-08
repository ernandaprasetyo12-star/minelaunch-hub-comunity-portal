import React, { useState } from 'react';
import { UserProfile, AuthProvider } from '../types/auth';
import { 
  X, Check, ShieldCheck, Sparkles, User, 
  ArrowRight, KeyRound, Globe, AlertCircle 
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  initialProvider?: AuthProvider;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialProvider,
}) => {
  const [selectedProvider, setSelectedProvider] = useState<AuthProvider | null>(initialProvider || null);
  const [customUsername, setCustomUsername] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSelectGoogle = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const email = customEmail.trim() || 'gamer.minecraft@gmail.com';
      const name = customUsername.trim() || 'Pemain MineLaunch';
      const user: UserProfile = {
        id: `google-${Date.now()}`,
        provider: 'google',
        username: name.toLowerCase().replace(/\s+/g, '_'),
        displayName: name,
        email: email,
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`,
        hasOfficialLicense: false,
        hasElyBySkin: false,
        joinedAt: new Date().toLocaleDateString('id-ID'),
      };
      onLoginSuccess(user);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  const handleSelectMicrosoft = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const gamertag = customUsername.trim() || 'Alex_Crafter99';
      const user: UserProfile = {
        id: `ms-${Date.now()}`,
        provider: 'microsoft',
        username: gamertag,
        displayName: `${gamertag} (Xbox Live)`,
        email: `${gamertag.toLowerCase()}@outlook.com`,
        avatarUrl: `https://mc-heads.net/avatar/${gamertag}/100`,
        hasOfficialLicense: true,
        hasElyBySkin: false,
        skinCapeName: 'Jubah Migrator Resmi 2021',
        joinedAt: new Date().toLocaleDateString('id-ID'),
      };
      onLoginSuccess(user);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  const handleSelectElyBy = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const username = customUsername.trim() || 'Steve_ElyBy';
      const user: UserProfile = {
        id: `elyby-${Date.now()}`,
        provider: 'elyby',
        username: username,
        displayName: `${username} (Ely.by)`,
        email: `${username.toLowerCase()}@ely.by`,
        avatarUrl: `https://mc-heads.net/avatar/${username}/100`,
        hasOfficialLicense: false,
        hasElyBySkin: true,
        skinCapeName: 'Jubah Custom Ely.by Phoenix Wings',
        joinedAt: new Date().toLocaleDateString('id-ID'),
      };
      onLoginSuccess(user);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  const handleSelectOffline = () => {
    const username = customUsername.trim() || 'Player_Guest';
    const user: UserProfile = {
      id: `offline-${Date.now()}`,
      provider: 'offline',
      username: username,
      displayName: `${username} (Offline)`,
      avatarUrl: `https://mc-heads.net/avatar/${username}/100`,
      hasOfficialLicense: false,
      hasElyBySkin: false,
      joinedAt: new Date().toLocaleDateString('id-ID'),
    };
    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-100 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-sm shadow-sm">
              M
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Masuk ke MineLaunch Hub
              </h2>
              <p className="text-xs text-neutral-400">
                Pilih metode login akun Anda untuk pengalaman terbaik
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {!selectedProvider ? (
            /* Choose Provider Options */
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                Pilih Jenis Akun Anda:
              </div>

              {/* 1. Google Account */}
              <button
                onClick={() => setSelectedProvider('google')}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950/70 p-3.5 hover:border-emerald-500/60 hover:bg-neutral-950 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 border border-neutral-700 text-white">
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      Masuk dengan Akun Google
                    </div>
                    <div className="text-xs text-neutral-400">
                      Login cepat, simpan launcher favorit & riwayat unduhan
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-emerald-400 transition-colors" />
              </button>

              {/* 2. Microsoft Account */}
              <button
                onClick={() => setSelectedProvider('microsoft')}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950/70 p-3.5 hover:border-emerald-500/60 hover:bg-neutral-950 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                      <span>Masuk dengan Akun Microsoft</span>
                      <span className="text-[10px] bg-emerald-950 border border-emerald-800 text-emerald-300 px-1.5 py-0.2 rounded">
                        Lisensi Resmi
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400">
                      Verifikasi kepemilikan Minecraft Java berbayar resmi
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-emerald-400 transition-colors" />
              </button>

              {/* 3. Ely.by Account */}
              <button
                onClick={() => setSelectedProvider('elyby')}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950/70 p-3.5 hover:border-sky-500/60 hover:bg-neutral-950 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-950/80 border border-sky-800/80 text-sky-400">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors flex items-center gap-1.5">
                      <span>Masuk dengan Akun Ely.by</span>
                      <span className="text-[10px] bg-sky-950 border border-sky-800 text-sky-300 px-1.5 py-0.2 rounded">
                        Skin & Cape Gratis
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400">
                      Gunakan skin kustom di launcher seperti XMCL & SKLauncher
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-sky-400 transition-colors" />
              </button>

              {/* 4. Guest / Offline Username */}
              <button
                onClick={() => setSelectedProvider('offline')}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950/40 p-3.5 hover:border-neutral-700 hover:bg-neutral-950 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-300">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors">
                      Mode Tamu / Username Offline Saja
                    </div>
                    <div className="text-xs text-neutral-400">
                      Jelajahi tanpa password atau registrasi akun
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
              </button>
            </div>
          ) : (
            /* Configure Selected Provider Details */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedProvider(null)}
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
                >
                  ← Kembali ke pilihan akun
                </button>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  {selectedProvider.toUpperCase()}
                </span>
              </div>

              {selectedProvider === 'google' && (
                <div className="space-y-3">
                  <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-3">
                    <div className="text-xs text-neutral-300">
                      Masukkan nama atau email Google Anda untuk simulasi login instan:
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Nama Tampilan</label>
                      <input
                        type="text"
                        placeholder="Contoh: Budi Gamer"
                        value={customUsername}
                        onChange={(e) => setCustomUsername(e.target.value)}
                        className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Email Google</label>
                      <input
                        type="email"
                        placeholder="budi.craft@gmail.com"
                        value={customEmail}
                        onChange={(e) => setCustomEmail(e.target.value)}
                        className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSelectGoogle}
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{isSubmitting ? 'Menghubungkan ke Google...' : 'Konfirmasi Masuk Akun Google'}</span>
                  </button>
                </div>
              )}

              {selectedProvider === 'microsoft' && (
                <div className="space-y-3">
                  <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/20 p-4 space-y-3">
                    <div className="text-xs text-emerald-200">
                      Masukkan Gamertag Minecraft resmi Anda. Akun Anda akan diberi tanda centang lisensi resmi!
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Minecraft IGN / Xbox Gamertag</label>
                      <input
                        type="text"
                        placeholder="Contoh: Alex_Crafter"
                        value={customUsername}
                        onChange={(e) => setCustomUsername(e.target.value)}
                        className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSelectMicrosoft}
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>{isSubmitting ? 'Memverifikasi Lisensi Mojang...' : 'Masuk Sebagai Pemilik Lisensi Resmi'}</span>
                  </button>
                </div>
              )}

              {selectedProvider === 'elyby' && (
                <div className="space-y-3">
                  <div className="rounded-xl border border-sky-900/60 bg-sky-950/20 p-4 space-y-3">
                    <div className="text-xs text-sky-200">
                      Masukkan username akun Ely.by Anda. Skin dan jubah kustom Anda akan otomatis tersinkronisasi!
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Username Akun Ely.by</label>
                      <input
                        type="text"
                        placeholder="Contoh: Steve_ElyBy"
                        value={customUsername}
                        onChange={(e) => setCustomUsername(e.target.value)}
                        className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSelectElyBy}
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-sky-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-sky-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>{isSubmitting ? 'Menghubungkan ke Server Ely.by...' : 'Masuk dengan Akun Ely.by'}</span>
                  </button>
                </div>
              )}

              {selectedProvider === 'offline' && (
                <div className="space-y-3">
                  <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 space-y-3">
                    <div className="text-xs text-neutral-300">
                      Cukup tentukan nama pemain yang ingin Anda gunakan:
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Nama Pemain (Nickname)</label>
                      <input
                        type="text"
                        placeholder="Contoh: Gamer_Santai"
                        value={customUsername}
                        onChange={(e) => setCustomUsername(e.target.value)}
                        className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSelectOffline}
                    className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-neutral-700 transition-colors"
                  >
                    <span>Lanjut Jelajahi Sebagai Tamu</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-800 bg-neutral-950 px-5 py-3 text-[11px] text-neutral-500 text-center">
          MineLaunch Hub menghormati privasi Anda. Data profil hanya disimpan di browser lokal Anda.
        </div>
      </div>
    </div>
  );
};
