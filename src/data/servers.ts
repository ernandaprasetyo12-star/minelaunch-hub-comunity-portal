export interface ServerItem {
  id: string;
  name: string;
  ip: string;
  bedrockPort?: number;
  country: 'ID';
  countryFlag: string;
  isOfficialOnly: boolean; // true = Microsoft licensed only, false = Ely.by & Offline/Cracked supported
  versionRange: string;
  playerCountEst: string;
  modes: string[];
  description: string;
  websiteUrl?: string;
  discordUrl?: string;
  featuredTag?: string;
  bannerColor: string;
  image: string;
}

export const MINECRAFT_MP_URL = 'https://minecraft-mp.com/country/indonesia/';

export const INDO_SERVERS: ServerItem[] = [
  {
    id: 'kaizen-network',
    name: 'Kaizen Network Indonesia',
    ip: 'play.kaizenmc.id',
    bedrockPort: 19132,
    country: 'ID',
    countryFlag: '🇮🇩',
    isOfficialOnly: false,
    versionRange: '1.16.5 - 1.21.x',
    playerCountEst: '350+ Online',
    modes: ['Survival Mix', 'Slimefun', 'SkyBlock Tycoon', 'Gens', 'Creative'],
    description: 'Server Minecraft Java & Bedrock crossplay terbesar di Indonesia! Dilengkapi Slimefun, custom economy, event mingguan, dan dukungan penuh login Ely.by & Offline.',
    websiteUrl: 'https://kaizenmc.id',
    discordUrl: 'https://discord.gg/kaizenmc',
    featuredTag: '🔥 SERVER INDONESIA REAL #1',
    bannerColor: '#0ea5e9',
    image: '/assets/aistudio/image_1cbfc3f5.png'
  },
  {
    id: 'minegens-network',
    name: 'MineGens Network',
    ip: 'play.minegens.id',
    bedrockPort: 19132,
    country: 'ID',
    countryFlag: '🇮🇩',
    isOfficialOnly: false,
    versionRange: '1.16.5 - 1.21.x',
    playerCountEst: '250+ Online',
    modes: ['Gens Tycoon', 'Anarchy SMP', 'Bedwars', 'Survival Custom'],
    description: 'Pusat server game mode Gens Tycoon & Survival #1 di Indonesia. Rasakan sensasi generator kekayaan terkuat, perang antar clan, dan leaderboard bulanan.',
    websiteUrl: 'https://minegens.id',
    discordUrl: 'https://discord.gg/minegens',
    featuredTag: '⚡ BEST GENS TYCOON INDO',
    bannerColor: '#f59e0b',
    image: '/assets/aistudio/image_62e21709.png'
  },
  {
    id: 'alwination',
    name: 'AlwiNation Network',
    ip: 'play.alwination.id',
    bedrockPort: 19132,
    country: 'ID',
    countryFlag: '🇮🇩',
    isOfficialOnly: false,
    versionRange: '1.16.5 - 1.21.x',
    playerCountEst: '180+ Online',
    modes: ['Lifesteal SMP', 'Survival Economy', 'OneBlock', 'Prison'],
    description: 'Server Lifesteal & Survival SMP paling aktif di Indonesia! Sistem rebut jantung pemain, klaim pulau OneBlock, dan ekonomi antar-player yang stabil.',
    websiteUrl: 'https://alwination.id',
    discordUrl: 'https://discord.gg/alwination',
    featuredTag: '⚔️ LIFESTEAL & SURVIVAL REAL',
    bannerColor: '#10b981',
    image: '/assets/aistudio/image_07b25862.png'
  },
  {
    id: 'valoria-smp',
    name: 'Valoria SMP Indonesia',
    ip: 'valoriasmp.id',
    bedrockPort: 19132,
    country: 'ID',
    countryFlag: '🇮🇩',
    isOfficialOnly: false,
    versionRange: '1.18.2 - 1.21.x',
    playerCountEst: '160+ Online',
    modes: ['Friendly SMP', 'Towny Economy', 'Custom Quest', 'Slimefun'],
    description: 'Server SMP Survival berbasis komunitas dengan fitur Towny Nations dan klaim wilayah anti-griefing. Server ramah pemula dan 100% bebas lag.',
    websiteUrl: 'https://valoriasmp.id',
    discordUrl: 'https://discord.gg/valoriasmp',
    featuredTag: '🌟 COMMUNITY SMP REAL',
    bannerColor: '#8b5cf6',
    image: '/assets/aistudio/image_b12679d1.png'
  },
  {
    id: 'zeetez-legends',
    name: 'ZEETEZ LEGENDS (Zeetex)',
    ip: 'zeetex.my.id',
    bedrockPort: 19132,
    country: 'ID',
    countryFlag: '🇮🇩',
    isOfficialOnly: false,
    versionRange: '1.16.5 - 1.21.x',
    playerCountEst: '140+ Online',
    modes: ['Survival RPG', 'Factions PvP', 'Economy', 'Custom Dungeons'],
    description: 'Server RPG Adventure & Factions legendaris Indonesia. Jelajahi dungeon mistis, kumpulkan item epic, dan bertarung bersama guild Anda di arena PvP.',
    websiteUrl: 'https://zeetex.my.id',
    discordUrl: 'https://discord.gg/zeetex',
    featuredTag: '🛡️ RPG & FACTIONS REAL',
    bannerColor: '#ec4899',
    image: '/assets/aistudio/image_a3ed8944.png'
  }
];
