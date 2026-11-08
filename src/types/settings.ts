export interface AppSettings {
  // Theme and Background
  themeMode: 'system' | 'dark' | 'light';
  backgroundWallpaper: string; // URL or preset id
  backgroundBlur: number; // in pixels (e.g. 16px)
  backgroundDim: number; // in percentage (0 - 100)
  enableVoxelParticles: boolean;
  
  // Android UI & Experience
  androidDeviceMode: 'auto' | 'phone' | 'tablet' | 'desktop';
  androidNavbarStyle: 'gestures' | '3-buttons' | 'hidden';
  hapticFeedback: boolean;
  soundEffects: boolean;
  fontSize: 'compact' | 'normal' | 'large';
  
  // Launcher Catalog preferences
  defaultCategoryView: 'all' | 'licensed' | 'non-licensed' | 'dangerous';
  showSecurityScoreBadge: boolean;
  autoCheckVirusTotal: boolean;
  
  // Custom Background upload or URL
  customBackgroundUrl?: string;
}

export const WALLPAPER_PRESETS = [
  {
    id: 'xmcl-acrylic',
    name: 'XMCL Acrylic Voxel',
    url: '/assets/images/mc_launchers_hero_1794042691092.jpg',
    description: 'Tampilan blur khas X Minecraft Launcher'
  },
  {
    id: 'minecraft-village',
    name: 'Minecraft Village Daylight',
    url: '/assets/minelaunch_hub_logo.png',
    description: 'Ilustrasi hangat desa Minecraft & roket'
  },
  {
    id: 'deep-nether',
    name: 'Obsidian & Nether Portal',
    url: '/assets/images/mc_security_warning_1794042692098.jpg',
    description: 'Nuansa gelap dramatis portal & fortress'
  },
  {
    id: 'elyby-aurora',
    name: 'Ely.by Sky Aurora',
    url: '/assets/images/elyby_custom_skin_1794042692330.jpg',
    description: 'Langit malam aurora & skin kustom'
  },
  {
    id: 'modern-dark',
    name: 'Dark Studio Minimalist',
    url: '/assets/images/prism_launcher_mockup_1794042691402.jpg',
    description: 'Tekstur gelap bersih dan elegan'
  }
];

export const DEFAULT_APP_SETTINGS: AppSettings = {
  themeMode: 'system',
  backgroundWallpaper: '/assets/images/mc_launchers_hero_1794042691092.jpg',
  backgroundBlur: 20, // 20px blur by default like XMCL acrylic
  backgroundDim: 65,  // 65% dark overlay
  enableVoxelParticles: true,
  androidDeviceMode: 'auto',
  androidNavbarStyle: 'gestures',
  hapticFeedback: true,
  soundEffects: true,
  fontSize: 'normal',
  defaultCategoryView: 'all',
  showSecurityScoreBadge: true,
  autoCheckVirusTotal: true,
};
