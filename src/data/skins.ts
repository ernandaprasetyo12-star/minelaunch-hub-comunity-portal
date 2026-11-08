export interface PresetMinecraftSkin {
  id: string;
  name: string;
  category: 'classic' | 'pvp' | 'creature' | 'modern';
  avatarUrl: string; // 2D Head render
  bodyUrl?: string;   // Full body render
  description: string;
}

export const PRESET_MINECRAFT_SKINS: PresetMinecraftSkin[] = [
  {
    id: 'steve',
    name: 'Steve (Klasik)',
    category: 'classic',
    avatarUrl: 'https://mc-heads.net/avatar/MHF_Steve/100',
    bodyUrl: 'https://mc-heads.net/body/MHF_Steve/120',
    description: 'Karakter legendaris ikonik Minecraft'
  },
  {
    id: 'alex',
    name: 'Alex (Klasik)',
    category: 'classic',
    avatarUrl: 'https://mc-heads.net/avatar/MHF_Alex/100',
    bodyUrl: 'https://mc-heads.net/body/MHF_Alex/120',
    description: 'Karakter default rambut oranye klasik'
  },
  {
    id: 'noor',
    name: 'Noor (Default Modern)',
    category: 'modern',
    avatarUrl: 'https://mc-heads.net/avatar/Noor/100',
    bodyUrl: 'https://mc-heads.net/body/Noor/120',
    description: 'Skin resmi pembaruan 1.20 Trails & Tales'
  },
  {
    id: 'sunny',
    name: 'Sunny (Default Modern)',
    category: 'modern',
    avatarUrl: 'https://mc-heads.net/avatar/Sunny/100',
    bodyUrl: 'https://mc-heads.net/body/Sunny/120',
    description: 'Skin resmi penjelajah modern Mojang'
  },
  {
    id: 'creeper-hoodie',
    name: 'Creeper Green Hoodie',
    category: 'pvp',
    avatarUrl: 'https://mc-heads.net/avatar/Creeper/100',
    bodyUrl: 'https://mc-heads.net/body/Creeper/120',
    description: 'Gaya favorit pemain server Bedwars & Skywars'
  },
  {
    id: 'enderman-suit',
    name: 'Enderman Tuxedo',
    category: 'creature',
    avatarUrl: 'https://mc-heads.net/avatar/MHF_Enderman/100',
    bodyUrl: 'https://mc-heads.net/body/MHF_Enderman/120',
    description: 'Enderman keren dengan mata ungu'
  },
  {
    id: 'shadow-ninja',
    name: 'Shadow PvP Ninja',
    category: 'pvp',
    avatarUrl: 'https://mc-heads.net/avatar/Ninja/100',
    bodyUrl: 'https://mc-heads.net/body/Ninja/120',
    description: 'Kostum ninja gelap untuk PvP kompetitif'
  },
  {
    id: 'technoblade',
    name: 'King Crown Pig',
    category: 'pvp',
    avatarUrl: 'https://mc-heads.net/avatar/Technoblade/100',
    bodyUrl: 'https://mc-heads.net/body/Technoblade/120',
    description: 'Mahkota kerajaan emas legendaris'
  },
  {
    id: 'herobrine',
    name: 'Herobrine (Mata Putih)',
    category: 'creature',
    avatarUrl: 'https://mc-heads.net/avatar/MHF_Herobrine/100',
    bodyUrl: 'https://mc-heads.net/body/MHF_Herobrine/120',
    description: 'Mitos legenda misterius Minecraft'
  },
  {
    id: 'space-astronaut',
    name: 'Cyber Astronaut',
    category: 'modern',
    avatarUrl: 'https://mc-heads.net/avatar/Astro/100',
    bodyUrl: 'https://mc-heads.net/body/Astro/120',
    description: 'Helm luar angkasa dengan visor kaca'
  }
];
