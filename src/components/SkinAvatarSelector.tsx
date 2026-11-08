import React, { useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  Link as LinkIcon, 
  Check, 
  User, 
  RotateCcw,
  Palette,
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';
import { PRESET_MINECRAFT_SKINS, PresetMinecraftSkin } from '../data/skins';
import { SafeImage } from './SafeImage';

interface SkinAvatarSelectorProps {
  currentAvatarUrl: string;
  onSelectAvatar: (url: string) => void;
  usernameHint?: string;
  isElyBy?: boolean;
}

export const SkinAvatarSelector: React.FC<SkinAvatarSelectorProps> = ({
  currentAvatarUrl,
  onSelectAvatar,
  usernameHint = '',
  isElyBy = false,
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'player_skin' | 'upload' | 'url'>('presets');
  const [skinUsernameInput, setSkinUsernameInput] = useState(usernameHint || '');
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [customPreview, setCustomPreview] = useState<string | null>(null);

  // Handle Fetch Skin from Username (mc-heads API works for Ely.by and Mojang usernames)
  const handleFetchSkinFromUsername = (e: React.FormEvent) => {
    e.preventDefault();
    if (skinUsernameInput.trim()) {
      const trimmed = skinUsernameInput.trim();
      const generatedUrl = `https://mc-heads.net/avatar/${encodeURIComponent(trimmed)}/100`;
      onSelectAvatar(generatedUrl);
    }
  };

  // Handle Local Image Upload (converts to base64 data url)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran file foto maksimal 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onSelectAvatar(result);
          setCustomPreview(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Direct Image URL
  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrlInput.trim()) {
      onSelectAvatar(customUrlInput.trim());
      setCustomPreview(customUrlInput.trim());
    }
  };

  return (
    <div className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-950/70 p-4">
      {/* Header Preview & Active Avatar */}
      <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3.5">
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 rounded-xl overflow-hidden border-2 border-emerald-500/50 bg-neutral-900 shadow-md">
            <SafeImage
              src={currentAvatarUrl}
              alt="Avatar Minecraft Terpilih"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-emerald-600/90 text-[9px] text-center font-bold text-white py-0.2">
              PP AKTIF
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Foto Profil & Skin Avatar</span>
              {isElyBy && (
                <span className="text-[10px] bg-sky-950 text-sky-400 border border-sky-800 px-1.5 py-0.2 rounded font-mono">
                  Ely.by Skin System
                </span>
              )}
            </div>
            <p className="text-[11px] text-neutral-400">
              Pilih dari skin Minecraft, masukkan username, atau upload foto sendiri
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 gap-1 rounded-xl bg-neutral-900/90 p-1 text-[11px] font-semibold text-neutral-400">
        <button
          type="button"
          onClick={() => setActiveTab('presets')}
          className={`py-1.5 rounded-lg transition-all ${
            activeTab === 'presets'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'hover:text-white'
          }`}
        >
          Preset Skin
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('player_skin')}
          className={`py-1.5 rounded-lg transition-all ${
            activeTab === 'player_skin'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'hover:text-white'
          }`}
        >
          Nama Skin
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`py-1.5 rounded-lg transition-all ${
            activeTab === 'upload'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'hover:text-white'
          }`}
        >
          Upload Foto
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`py-1.5 rounded-lg transition-all ${
            activeTab === 'url'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'hover:text-white'
          }`}
        >
          URL Gambar
        </button>
      </div>

      {/* TAB 1: PRESET SKINS */}
      {activeTab === 'presets' && (
        <div className="space-y-2">
          <div className="text-[11px] text-neutral-400 flex items-center justify-between">
            <span>Pilih salah satu skin Minecraft populer:</span>
            <span className="text-emerald-400">10 Pilihan</span>
          </div>
          <div className="grid grid-cols-5 gap-2 max-h-36 overflow-y-auto pr-1">
            {PRESET_MINECRAFT_SKINS.map((skin) => {
              const isSelected = currentAvatarUrl === skin.avatarUrl;
              return (
                <button
                  type="button"
                  key={skin.id}
                  onClick={() => onSelectAvatar(skin.avatarUrl)}
                  className={`group relative rounded-xl border p-1.5 transition-all flex flex-col items-center gap-1 text-center ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500'
                      : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 hover:bg-neutral-900'
                  }`}
                  title={`${skin.name} - ${skin.description}`}
                >
                  <div className="h-10 w-10 rounded-lg overflow-hidden bg-neutral-950 border border-neutral-800 shrink-0">
                    <SafeImage
                      src={skin.avatarUrl}
                      alt={skin.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[10px] font-medium text-neutral-300 truncate w-full">
                    {skin.name.split(' ')[0]}
                  </span>
                  {isSelected && (
                    <div className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check className="h-2.5 w-2.5 text-white stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: FETCH SKIN FROM MINECRAFT / ELY.BY USERNAME */}
      {activeTab === 'player_skin' && (
        <form onSubmit={handleFetchSkinFromUsername} className="space-y-3">
          <div>
            <label className="text-[11px] text-neutral-300 block mb-1 font-medium">
              Masukkan Username Minecraft / Ely.by:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Contoh: Dream, Technoblade, Notch, dsb"
                value={skinUsernameInput}
                onChange={(e) => setSkinUsernameInput(e.target.value)}
                className="flex-1 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shrink-0"
              >
                Ambil Skin
              </button>
            </div>
            <p className="text-[10px] text-neutral-400 mt-1">
              Sistem akan otomatis merender kepala 3D/2D skin dari server avatar resmi Minecraft.
            </p>
          </div>
        </form>
      )}

      {/* TAB 3: UPLOAD LOCAL PROFILE PICTURE */}
      {activeTab === 'upload' && (
        <div className="space-y-2.5">
          <label className="text-[11px] text-neutral-300 block font-medium">
            Upload Foto Profil Sendiri (PNG / JPG / WEBP):
          </label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-700 hover:border-emerald-500 rounded-xl p-4 bg-neutral-900/40 cursor-pointer transition-all group">
            <Upload className="h-6 w-6 text-neutral-400 group-hover:text-emerald-400 transition-colors mb-1" />
            <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
              Pilih Berkas Foto Anda
            </span>
            <span className="text-[10px] text-neutral-500 mt-0.5">
              Maksimal 2MB (Bisa foto asli, gambar anime, atau skin kustom)
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* TAB 4: DIRECT IMAGE URL */}
      {activeTab === 'url' && (
        <form onSubmit={handleApplyCustomUrl} className="space-y-2">
          <label className="text-[11px] text-neutral-300 block font-medium">
            Tempel Tautan URL Gambar / Foto Profil:
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://i.imgur.com/foto-anda.png"
              value={customUrlInput}
              onChange={(e) => setCustomUrlInput(e.target.value)}
              className="flex-1 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shrink-0"
            >
              Pasang
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
