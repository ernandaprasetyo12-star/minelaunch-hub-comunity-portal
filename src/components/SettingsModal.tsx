import React, { useState, useEffect } from 'react';
import { 
  X, 
  Palette, 
  Smartphone, 
  Sliders, 
  ShieldCheck, 
  Image as ImageIcon, 
  Check, 
  RotateCcw,
  Volume2,
  Sparkles,
  Eye,
  Layers,
  Upload,
  SunMedium,
  CheckCircle2,
  User,
  Save,
  Shield
} from 'lucide-react';
import { AppSettings, WALLPAPER_PRESETS } from '../types/settings';
import { UserProfile } from '../types/auth';
import { SkinAvatarSelector } from './SkinAvatarSelector';
import { SafeImage } from './SafeImage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onResetSettings: () => void;
  user?: UserProfile | null;
  onUpdateUser?: (updatedUser: UserProfile) => void;
  defaultTab?: 'appearance' | 'profile' | 'android' | 'security';
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetSettings,
  user,
  onUpdateUser,
  defaultTab = 'appearance',
}) => {
  const [activeTab, setActiveTab] = useState<'appearance' | 'profile' | 'android' | 'security'>(defaultTab);
  const [customInputUrl, setCustomInputUrl] = useState(settings.customBackgroundUrl || '');
  const [customSaved, setCustomSaved] = useState(false);

  // Editable Profile States
  const [profileDisplayName, setProfileDisplayName] = useState(user?.displayName || '');
  const [profileUsername, setProfileUsername] = useState(user?.username || '');
  const [profileAvatarUrl, setProfileAvatarUrl] = useState(user?.avatarUrl || 'https://mc-heads.net/avatar/Steve/100');
  const [profileHasOfficial, setProfileHasOfficial] = useState(user?.hasOfficialLicense ?? true);
  const [profileHasElyBy, setProfileHasElyBy] = useState(user?.hasElyBySkin ?? true);
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileDisplayName(user.displayName);
      setProfileUsername(user.username);
      setProfileAvatarUrl(user.avatarUrl);
      setProfileHasOfficial(user.hasOfficialLicense);
      setProfileHasElyBy(user.hasElyBySkin);
    }
  }, [user]);

  useEffect(() => {
    if (isOpen && defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  if (!isOpen) return null;

  const handleApplyCustomUrl = () => {
    if (customInputUrl.trim()) {
      onUpdateSettings({
        backgroundWallpaper: customInputUrl.trim(),
        customBackgroundUrl: customInputUrl.trim(),
      });
      setCustomSaved(true);
      setTimeout(() => setCustomSaved(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl rounded-3xl border border-neutral-800 bg-neutral-900/95 shadow-2xl backdrop-blur-2xl flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Android Material You Style */}
        <div className="flex items-center justify-between border-b border-neutral-800/80 px-6 py-4.5 bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              <Sliders className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Pengaturan Sistem</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800 font-mono">
                  Android & XMCL
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Sesuaikan efek blur XMCL, latar belakang, & antarmuka perangkat
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
            aria-label="Tutup pengaturan"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab navigation pills (Android style) */}
        <div className="flex items-center gap-2 border-b border-neutral-800/80 px-6 py-2.5 bg-neutral-950/40 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('appearance')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all shrink-0 ${
              activeTab === 'appearance'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <Palette className="h-4 w-4" />
            <span>Tampilan & Latar Blur XMCL</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all shrink-0 ${
              activeTab === 'profile'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <User className="h-4 w-4" />
            <span>Profil Akun Saya</span>
          </button>

          <button
            onClick={() => setActiveTab('android')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all shrink-0 ${
              activeTab === 'android'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span>Mode Android UI</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all shrink-0 ${
              activeTab === 'security'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Preferensi Keamanan</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: APPEARANCE & BLUR BACKGROUND (XMCL ACRYLIC) */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              {/* Theme Mode Selector (Ikuti Sistem, Gelap, Terang) */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4.5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SunMedium className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-bold text-white">Tema Warna Aplikasi</span>
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">
                    {settings.themeMode === 'system' ? 'Ikuti Sistem' : settings.themeMode === 'dark' ? 'Gelap' : 'Terang'}
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  Pilih tema tampilan yang Anda sukai atau ikuti preferensi otomatis dari sistem perangkat Anda.
                </p>
                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  {[
                    { id: 'system', label: 'Ikuti Sistem', desc: 'Sesuai Pengaturan OS' },
                    { id: 'dark', label: 'Tema Gelap', desc: 'Dark Studio (Minecraft)' },
                    { id: 'light', label: 'Tema Terang', desc: 'Daylight Mode' },
                  ].map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => onUpdateSettings({ themeMode: theme.id as any })}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        settings.themeMode === theme.id
                          ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 ring-2 ring-emerald-500/30 font-bold'
                          : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{theme.label}</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">{theme.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Blur Slider */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4.5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SunMedium className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-bold text-white">Intensitas Efek Blur (XMCL Acrylic)</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    {settings.backgroundBlur}px
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  Mengatur seberapa buram gambar latar belakang di seluruh aplikasi dan saat loading, persis antarmuka X Minecraft Launcher.
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-neutral-500 font-mono">0px (Jelas)</span>
                  <input
                    type="range"
                    min="0"
                    max="45"
                    step="1"
                    value={settings.backgroundBlur}
                    onChange={(e) => onUpdateSettings({ backgroundBlur: Number(e.target.value) })}
                    className="flex-1 h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <span className="text-[11px] text-neutral-500 font-mono">45px (Sangat Burem)</span>
                </div>
              </div>

              {/* Background Dimness Slider */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4.5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-bold text-white">Tingkat Kegelapan Latar Belakang (Dim)</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    {settings.backgroundDim}%
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  Mengatur kontras overlay agar kartu launcher dan teks tetap terbaca tajam dan tidak silau.
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-neutral-500 font-mono">20% (Terang)</span>
                  <input
                    type="range"
                    min="20"
                    max="90"
                    step="5"
                    value={settings.backgroundDim}
                    onChange={(e) => onUpdateSettings({ backgroundDim: Number(e.target.value) })}
                    className="flex-1 h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <span className="text-[11px] text-neutral-500 font-mono">90% (Pekat)</span>
                </div>
              </div>

              {/* Wallpaper Presets */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                  <span>Pilihan Wallpaper Latar Belakang:</span>
                  <span className="text-emerald-400 font-normal">Klik untuk langsung ganti</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {WALLPAPER_PRESETS.map((preset) => {
                    const isSelected = settings.backgroundWallpaper === preset.url;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => onUpdateSettings({ backgroundWallpaper: preset.url })}
                        className={`group relative cursor-pointer rounded-2xl border p-3 transition-all flex items-center gap-3 overflow-hidden ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-950/30 ring-2 ring-emerald-500/30'
                            : 'border-neutral-800 bg-neutral-950/60 hover:border-neutral-700 hover:bg-neutral-900/60'
                        }`}
                      >
                        <div className="relative h-14 w-20 rounded-xl overflow-hidden shrink-0 border border-neutral-700 bg-neutral-900">
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-emerald-600/40 flex items-center justify-center">
                              <Check className="h-5 w-5 text-white stroke-[3]" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                            <span>{preset.name}</span>
                            {isSelected && (
                              <span className="text-[10px] text-emerald-400 font-medium">✓ Aktif</span>
                            )}
                          </div>
                          <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                            {preset.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Custom Image URL Option */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4.5 space-y-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-bold text-white">Gunakan URL Gambar Kustom Sendiri</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customInputUrl}
                    onChange={(e) => setCustomInputUrl(e.target.value)}
                    placeholder="https://contoh.com/wallpaper-minecraft.jpg"
                    className="flex-1 rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2 text-xs text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none"
                  />
                  <button
                    onClick={handleApplyCustomUrl}
                    className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shrink-0 flex items-center gap-1"
                  >
                    {customSaved ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
                    <span>{customSaved ? 'Terpasang!' : 'Pasang'}</span>
                  </button>
                </div>
              </div>

              {/* Voxel particles toggle */}
              <div className="flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4">
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                    <span>Efek Partikel Voxel Minecraft</span>
                  </span>
                  <p className="text-xs text-neutral-400">
                    Menampilkan partikel halus melayang di latar belakang seperti XMCL
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.enableVoxelParticles}
                  onChange={(e) => onUpdateSettings({ enableVoxelParticles: e.target.checked })}
                  className="h-5 w-5 accent-emerald-500 rounded cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB: USER PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Profile Card Header */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 rounded-2xl overflow-hidden border-2 border-emerald-500 bg-neutral-900 shadow-lg shrink-0">
                      <SafeImage
                        src={profileAvatarUrl || 'https://mc-heads.net/avatar/Steve/100'}
                        alt={profileDisplayName || 'User Avatar'}
                        className="h-full w-full object-contain p-0.5"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <span>{profileDisplayName || user?.displayName || 'Pemain Minecraft'}</span>
                        {profileHasOfficial && (
                          <span title="Lisensi Resmi Mojang">
                            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                          </span>
                        )}
                        {profileHasElyBy && (
                          <span title="Ely.by Skin Active">
                            <Sparkles className="h-4 w-4 text-sky-400 shrink-0" />
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-neutral-400 font-mono">
                        @{profileUsername || user?.username || 'player_mine'} · {user?.provider || 'Guest Session'}
                      </p>
                    </div>
                  </div>

                  {profileSaved && (
                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1.5 rounded-xl animate-in fade-in">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Profil Tersimpan!</span>
                    </div>
                  )}
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-800/80">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-300">
                      Nama Tampilan (Display Name):
                    </label>
                    <input
                      type="text"
                      value={profileDisplayName}
                      onChange={(e) => setProfileDisplayName(e.target.value)}
                      placeholder="Masukkan nama tampilan anda"
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-300">
                      Username / Gamertag Minecraft:
                    </label>
                    <input
                      type="text"
                      value={profileUsername}
                      onChange={(e) => setProfileUsername(e.target.value)}
                      placeholder="Contoh: Steve_Gamer123"
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Skin & Avatar Selector Component */}
                <div className="pt-2">
                  <SkinAvatarSelector
                    currentAvatarUrl={profileAvatarUrl}
                    onSelectAvatar={(url) => setProfileAvatarUrl(url)}
                    usernameHint={profileUsername}
                    isElyBy={profileHasElyBy}
                  />
                </div>

                {/* Account Type Badges & Status */}
                <div className="space-y-3 pt-2 border-t border-neutral-800/80">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Status Lisensi & Fitur Skin:
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div 
                      onClick={() => setProfileHasOfficial(!profileHasOfficial)}
                      className={`cursor-pointer rounded-2xl border p-3.5 transition-all flex items-center justify-between ${
                        profileHasOfficial 
                          ? 'border-emerald-500/80 bg-emerald-950/40 text-emerald-300' 
                          : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck className={`h-5 w-5 ${profileHasOfficial ? 'text-emerald-400' : 'text-neutral-500'}`} />
                        <div>
                          <div className="text-xs font-bold">Lisensi Resmi Mojang</div>
                          <div className="text-[10px] text-neutral-400">Minecraft Java / Bedrock Microsoft</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={profileHasOfficial}
                        onChange={(e) => setProfileHasOfficial(e.target.checked)}
                        className="h-4 w-4 accent-emerald-500 rounded cursor-pointer"
                      />
                    </div>

                    <div 
                      onClick={() => setProfileHasElyBy(!profileHasElyBy)}
                      className={`cursor-pointer rounded-2xl border p-3.5 transition-all flex items-center justify-between ${
                        profileHasElyBy 
                          ? 'border-sky-500/80 bg-sky-950/40 text-sky-300' 
                          : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Sparkles className={`h-5 w-5 ${profileHasElyBy ? 'text-sky-400' : 'text-neutral-500'}`} />
                        <div>
                          <div className="text-xs font-bold">Skin & Jubah Ely.by</div>
                          <div className="text-[10px] text-neutral-400">Kompatibel Prism & FreeSM Launcher</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={profileHasElyBy}
                        onChange={(e) => setProfileHasElyBy(e.target.checked)}
                        className="h-4 w-4 accent-sky-500 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Profile Button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      if (onUpdateUser && user) {
                        onUpdateUser({
                          ...user,
                          displayName: profileDisplayName.trim() || user.displayName,
                          username: profileUsername.trim() || user.username,
                          avatarUrl: profileAvatarUrl,
                          hasOfficialLicense: profileHasOfficial,
                          hasElyBySkin: profileHasElyBy,
                        });
                        setProfileSaved(true);
                        setTimeout(() => setProfileSaved(false), 2500);
                      } else if (onUpdateUser) {
                        onUpdateUser({
                          id: 'user_' + Date.now(),
                          displayName: profileDisplayName.trim() || 'Pemain MineLaunch',
                          username: profileUsername.trim() || 'steve_player',
                          avatarUrl: profileAvatarUrl,
                          hasOfficialLicense: profileHasOfficial,
                          hasElyBySkin: profileHasElyBy,
                          skinCapeName: 'Ely.by Original',
                          provider: 'offline',
                          joinedAt: new Date().toISOString(),
                        });
                        setProfileSaved(true);
                        setTimeout(() => setProfileSaved(false), 2500);
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-all shadow-md shadow-emerald-950"
                  >
                    <Save className="h-4 w-4" />
                    <span>Simpan Perubahan Profil</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ANDROID VIEW SETTINGS */}
          {activeTab === 'android' && (
            <div className="space-y-6">
              {/* Device Mode Selector */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Mode Tata Letak Tampilan:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'auto', label: 'Otomatis', desc: 'Sesuai Layar' },
                    { id: 'phone', label: 'HP Android', desc: 'Pojav / XMCL UI' },
                    { id: 'tablet', label: 'Tablet Android', desc: 'Layar Lebar' },
                    { id: 'desktop', label: 'Desktop PC', desc: 'Standar Web' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => onUpdateSettings({ androidDeviceMode: mode.id as any })}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        settings.androidDeviceMode === mode.id
                          ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 ring-2 ring-emerald-500/30'
                          : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{mode.label}</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">{mode.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Android Bottom Navigation Bar Style */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4.5 space-y-3">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-emerald-400" />
                  <span>Gaya Navigasi Bawah Android:</span>
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'gestures', label: 'Gesture Bar', desc: 'Minimalis modern' },
                    { id: '3-buttons', label: '3 Tombol', desc: 'Kembali, Home, Menu' },
                    { id: 'hidden', label: 'Sembunyikan', desc: 'Layar Penuh' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onUpdateSettings({ androidNavbarStyle: item.id as any })}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        settings.androidNavbarStyle === item.id
                          ? 'border-emerald-500 bg-emerald-950 text-emerald-300'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold">{item.label}</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sound & Haptics */}
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4">
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Volume2 className="h-4 w-4 text-emerald-400" />
                      <span>Efek Suara Klik Voxel</span>
                    </span>
                    <p className="text-xs text-neutral-400">
                      Suara klik tombol bergaya Minecraft saat tombol ditekan
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.soundEffects}
                    onChange={(e) => onUpdateSettings({ soundEffects: e.target.checked })}
                    className="h-5 w-5 accent-emerald-500 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4">
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Smartphone className="h-4 w-4 text-emerald-400" />
                      <span>Getaran Haptic Feedback (Di HP)</span>
                    </span>
                    <p className="text-xs text-neutral-400">
                      Getaran halus di layar sentuh saat membuka launcher
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.hapticFeedback}
                    onChange={(e) => onUpdateSettings({ hapticFeedback: e.target.checked })}
                    className="h-5 w-5 accent-emerald-500 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY PREFERENCES */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4">
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-white">
                    Tampilkan Skor Keamanan & VirusTotal
                  </span>
                  <p className="text-xs text-neutral-400">
                    Menampilkan nilai audit 0/72 di setiap kartu launcher
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showSecurityScoreBadge}
                  onChange={(e) => onUpdateSettings({ showSecurityScoreBadge: e.target.checked })}
                  className="h-5 w-5 accent-emerald-500 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4">
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-white">
                    Peringatan Otomatis Launcher Berisiko
                  </span>
                  <p className="text-xs text-neutral-400">
                    Membuka berkas investigasi Wikipedia jika launcher berbahaya diklik
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoCheckVirusTotal}
                  onChange={(e) => onUpdateSettings({ autoCheckVirusTotal: e.target.checked })}
                  className="h-5 w-5 accent-emerald-500 rounded cursor-pointer"
                />
              </div>

              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4 text-xs text-neutral-300 space-y-2">
                <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Komitmen Privasi MineLaunch Hub:</span>
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  Pengaturan Anda tersimpan 100% di peramban lokal (localStorage). Kami tidak menggunakan pelacak telemetri komersial pihak ketiga.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Reset and Done actions */}
        <div className="flex items-center justify-between border-t border-neutral-800/80 px-6 py-4 bg-neutral-950/80">
          <button
            onClick={onResetSettings}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Kembalikan ke Standar</span>
          </button>

          <button
            onClick={onClose}
            className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-950"
          >
            Selesai & Simpan
          </button>
        </div>
      </div>
    </div>
  );
};
