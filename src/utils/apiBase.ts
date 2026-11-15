export const SHARED_BACKEND_URL =
  'https://ais-pre-s7zlqywz6kbtz6zjcs5ugo-238097585383.asia-southeast1.run.app';

const STATIC_HOST_SUFFIXES = [
  '.github.io',
  '.netlify.app',
  '.pages.dev',
  '.vercel.app',
  '.surge.sh',
];

export function isStaticHosting(): boolean {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname.toLowerCase();
  return STATIC_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix));
}

export function getApiBaseUrl(): string {
  const configured = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');
  if (configured) return configured;
  if (isStaticHosting()) return SHARED_BACKEND_URL;
  return '';
}

export function getApiUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const base = getApiBaseUrl();
  return base ? `${base}${normalizedPath}` : normalizedPath;
}
