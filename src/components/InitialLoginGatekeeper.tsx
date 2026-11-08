import React, { useState } from 'react';
import { UserProfile, AuthProvider } from '../types/auth';
import { 
  ShieldCheck, Sparkles, User, ArrowRight, CheckCircle2, 
  HelpCircle, Compass, ShieldAlert 
} from 'lucide-react';

interface InitialLoginGatekeeperProps {
  onLoginSuccess: (user: UserProfile) => void;
}

export const InitialLoginGatekeeper: React.FC<InitialLoginGatekeeperProps> = ({ onLoginSuccess }) => {
  const [selectedProvider, setSelectedProvider] = useState<AuthProvider | null>(null);
  const [customUsername, setCustomUsername] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    }, 500);
  };

  const handleSelectMicrosoft = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const gamertag = customUsername.trim() || 'Crafter_Pro99';
      const user: UserProfile = {
        id: `ms-${Date.now()}`,
        provider: 'microsoft',
        username: gamertag,
        displayName: `${gamertag} (Xbox Live)`,
        email: `${gamertag.toLowerCase()}@outlook.com`,
        avatarUrl: `https://mc-heads.net/avatar/${gamertag}/100`,
        hasOfficialLicense: true,
        hasElyBySkin: false,
        skinCapeName: 'Jubah Migrator Resmi',
        joinedAt: new Date().toLocaleDateString('id-ID'),
      };
      onLoginSuccess(user);
    }, 500);
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
        skinCapeName: 'Jubah Phoenix Ely.by',
        joinedAt: new Date().toLocaleDateString('id-ID'),
      };
      onLoginSuccess(user);
    }, 500);
  };

  const handleSelectOffline = () => {
    const username = customUsername.trim() || 'Tamu_Minecraft';
    const user: UserProfile = {
      id: `offline-${Date.now()}`,
      provider: 'offline',
      username: username,
      displayName: `${username} (Tamu)`,
      avatarUrl: `https://mc-heads.net/avatar/${username}/100`,
      hasOfficialLicense: false,
      hasElyBySkin: false,
      joinedAt: new Date().toLocaleDateString('id-ID'),
    };
    onLoginSuccess(user);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950 p-4 overflow-y-auto">
      {/* Background Ambience with Scrim */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img
          src="/src/assets/images/mc_launchers_hero_1794042691092.jpg"
          alt="Minecraft World Background"
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950" />
      </div>

      <div className="relative z-10 w-full max-w-xl rounded-2xl border border-neutral-800 bg-neutral-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
        {/* Brand Icon & Welcome Title */}
        <div className="space-y-3">
          <div className="mx-auto flex items-center justify-center">
            <img
              src="/assets/minelaunch_hub_logo.png"
              alt="MineLaunch Hub Logo"
              className="h-20 w-20 rounded-2xl object-cover ring-2 ring-emerald-500/50 shadow-xl shadow-emerald-500/20"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Selamat Datang di <span className="text-emerald-400">MineLaunch Hub</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
            Pintu gerbang direktori launcher Minecraft Java Edition nomor satu. Silakan masuk terlebih dahulu untuk memulai tur panduan lengkap dan menjelajahi puluhan launcher aman di dunia.
          </p>
        </div>

        {/* Dynamic Provider Form or Chooser */}
        {!selectedProvider ? (
          <div className="space-y-3 text-left">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 text-center">
              Pilih Jenis Akun Anda:
            </div>

            {/* Google */}
            <button
              onClick={() => setSelectedProvider('google')}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950/80 p-3.5 hover:border-emerald-500/60 hover:bg-neutral-950 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-800 border border-neutral-700">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Masuk dengan Akun Google
                  </div>
                  <div className="text-xs text-neutral-400">
                    Simpan riwayat unduhan & profil penjelajah Anda
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-emerald-400 transition-colors" />
            </button>

            {/* Microsoft */}
            <button
              onClick={() => setSelectedProvider('microsoft')}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950/80 p-3.5 hover:border-emerald-500/60 hover:bg-neutral-950 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                    <span>Masuk dengan Akun Microsoft Resmi</span>
                    <span className="text-[10px] bg-emerald-950 border border-emerald-800 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                      Mojang EULA
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400">
                    Verifikasi lisensi resmi Java Edition & main server premium
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-emerald-400 transition-colors" />
            </button>

            {/* Ely.by */}
            <button
              onClick={() => setSelectedProvider('elyby')}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950/80 p-3.5 hover:border-sky-500/60 hover:bg-neutral-950 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-950 border border-sky-800 text-sky-400">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors flex items-center gap-1.5">
                    <span>Masuk dengan Akun Ely.by</span>
                    <span className="text-[10px] bg-sky-950 border border-sky-800 text-sky-300 px-1.5 py-0.5 rounded font-mono">
                      Skin & Cape Gratis
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400">
                    Gunakan skin kustom di launcher XMCL, SKLauncher & Pinecone
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-sky-400 transition-colors" />
            </button>

            {/* Guest */}
            <button
              onClick={() => setSelectedProvider('offline')}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950/40 p-3.5 hover:border-neutral-700 hover:bg-neutral-950 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-300">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors">
                    Lanjut Sebagai Tamu / Mode Offline
                  </div>
                  <div className="text-xs text-neutral-400">
                    Tanpa password dan langsung eksplorasi direktori
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
            </button>
          </div>
        ) : (
          /* Input form for provider */
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <button
                onClick={() => setSelectedProvider(null)}
                className="text-xs text-neutral-400 hover:text-white"
              >
                ← Ganti pilihan akun
              </button>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {selectedProvider.toUpperCase()}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-neutral-300 block mb-1 font-medium">
                  {selectedProvider === 'microsoft'
                    ? 'Gamertag Minecraft / Xbox'
                    : selectedProvider === 'elyby'
                    ? 'Username Akun Ely.by'
                    : 'Nama Pemain (Nickname)'}
                </label>
                <input
                  type="text"
                  placeholder={
                    selectedProvider === 'microsoft'
                      ? 'Contoh: Alex_Crafter'
                      : selectedProvider === 'elyby'
                      ? 'Contoh: Steve_ElyBy'
                      : 'Contoh: Pemain_Minecraft'
                  }
                  value={customUsername}
                  onChange={(e) => setCustomUsername(e.target.value)}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {selectedProvider === 'google' && (
                <div>
                  <label className="text-xs text-neutral-300 block mb-1 font-medium">
                    Email Google
                  </label>
                  <input
                    type="email"
                    placeholder="nama.anda@gmail.com"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}
            </div>

            <button
              onClick={() => {
                if (selectedProvider === 'google') handleSelectGoogle();
                else if (selectedProvider === 'microsoft') handleSelectMicrosoft();
                else if (selectedProvider === 'elyby') handleSelectElyBy();
                else handleSelectOffline();
              }}
              disabled={isSubmitting}
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
            >
              <span>{isSubmitting ? 'Memproses Masuk...' : 'Lanjut & Buka Tour Panduan Lengkap'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Footer reassurance */}
        <div className="pt-2 text-[11px] text-neutral-500">
          MineLaunch Hub adalah platform independen. Kami tidak pernah meminta kata sandi akun resmi Anda.
        </div>
      </div>
    </div>
  );
};
