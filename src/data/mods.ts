export interface ModItem {
  id: string;
  name: string;
  summary: string;
  author: string;
  source: 'modrinth' | 'curseforge';
  category: string[];
  downloads: string;
  iconUrl: string;
  projectUrl: string;
  versions: string[];
  license: string;
}

export const MODS: ModItem[] = [
  {
    id: 'sodium',
    name: 'Sodium',
    summary: 'A modern rendering engine for Minecraft that greatly improves frame rates and reduces stuttering.',
    author: 'jellysquid3',
    source: 'modrinth',
    category: ['Optimization'],
    downloads: '30M+',
    iconUrl: 'https://cdn.modrinth.com/data/AAN0M55n/icon.png',
    projectUrl: 'https://modrinth.com/mod/sodium',
    versions: ['1.16.5', '1.18.2', '1.19.4', '1.20.1', '1.21'],
    license: 'LGPL-3.0'
  },
  {
    id: 'iris',
    name: 'Iris Shaders',
    summary: 'A modern shaders mod for Minecraft intended to be compatible with existing OptiFine shader packs.',
    author: 'coderbot',
    source: 'modrinth',
    category: ['Optimization', 'Visual'],
    downloads: '20M+',
    iconUrl: 'https://cdn.modrinth.com/data/yl67vHmb/icon.png',
    projectUrl: 'https://modrinth.com/mod/iris',
    versions: ['1.16.5', '1.18.2', '1.19.4', '1.20.1', '1.21'],
    license: 'LGPL-3.0'
  },
  {
    id: 'journeymap',
    name: 'JourneyMap',
    summary: 'Real-time mapping in-game or in a web browser as you explore.',
    author: 'techbrew',
    source: 'curseforge',
    category: ['Map', 'Utility'],
    downloads: '180M+',
    iconUrl: 'https://media.forgecdn.net/avatars/65/925/636142143926504416.png',
    projectUrl: 'https://www.curseforge.com/minecraft/mc-mods/journeymap',
    versions: ['1.12.2', '1.16.5', '1.18.2', '1.19.2', '1.20.1'],
    license: 'Custom'
  },
  {
    id: 'jei',
    name: 'Just Enough Items (JEI)',
    summary: 'A recipe and item viewing mod for Minecraft, built from the ground up for stability and performance.',
    author: 'mezz',
    source: 'curseforge',
    category: ['Utility', 'Items'],
    downloads: '250M+',
    iconUrl: 'https://media.forgecdn.net/avatars/41/498/635905187424177264.png',
    projectUrl: 'https://www.curseforge.com/minecraft/mc-mods/jei',
    versions: ['1.8.9', '1.12.2', '1.16.5', '1.18.2', '1.19.2', '1.20.1'],
    license: 'MIT'
  },
  {
    id: 'lithium',
    name: 'Lithium',
    summary: 'A general-purpose optimization mod for Minecraft which improves game physics, mob AI, and block ticking.',
    author: 'jellysquid3',
    source: 'modrinth',
    category: ['Optimization'],
    downloads: '15M+',
    iconUrl: 'https://cdn.modrinth.com/data/gv9M7j48/icon.png',
    projectUrl: 'https://modrinth.com/mod/lithium',
    versions: ['1.16.5', '1.18.2', '1.19.4', '1.20.1', '1.21'],
    license: 'LGPL-3.0'
  },
  {
    id: 'mouse-tweaks',
    name: 'Mouse Tweaks',
    summary: 'Enhances inventory management with various mouse-based shortcuts and features.',
    author: 'YaLTeR',
    source: 'curseforge',
    category: ['Utility'],
    downloads: '120M+',
    iconUrl: 'https://media.forgecdn.net/avatars/22/33/635338166540306354.png',
    projectUrl: 'https://www.curseforge.com/minecraft/mc-mods/mouse-tweaks',
    versions: ['1.7.10', '1.12.2', '1.16.5', '1.18.2', '1.19.2', '1.20.1'],
    license: 'MIT'
  },
  {
    id: 'appleskin',
    name: 'AppleSkin',
    summary: 'Food HUD improvements to help you manage your hunger and saturation.',
    author: 'squeek502',
    source: 'modrinth',
    category: ['Visual', 'HUD'],
    downloads: '40M+',
    iconUrl: 'https://cdn.modrinth.com/data/EsU8s7e8/icon.png',
    projectUrl: 'https://modrinth.com/mod/appleskin',
    versions: ['1.12.2', '1.16.5', '1.18.2', '1.19.4', '1.20.1', '1.21'],
    license: 'Unlicense'
  },
  {
    id: 'waystones',
    name: 'Waystones',
    summary: 'Adds waystone blocks that players can return to once they have been activated.',
    author: 'BlayTheNinth',
    source: 'curseforge',
    category: ['Magic', 'Transport'],
    downloads: '80M+',
    iconUrl: 'https://media.forgecdn.net/avatars/70/463/636181676609930773.png',
    projectUrl: 'https://www.curseforge.com/minecraft/mc-mods/waystones',
    versions: ['1.12.2', '1.16.5', '1.18.2', '1.19.2', '1.20.1'],
    license: 'MIT'
  }
];
