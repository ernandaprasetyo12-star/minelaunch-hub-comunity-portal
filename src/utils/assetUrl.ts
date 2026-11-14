export function resolvePublicAssetUrl(src: string): string {
  if (!src) return src;
  const trimmed = src.trim();

  // Keep external URLs, data URIs, blob URIs, or already-relative URLs untouched
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('./')
  ) {
    return trimmed;
  }

  let normalized = trimmed;
  if (normalized.startsWith('/public/')) {
    normalized = normalized.slice('/public/'.length);
  } else if (normalized.startsWith('public/')) {
    normalized = normalized.slice('public/'.length);
  } else if (normalized.startsWith('/')) {
    normalized = normalized.slice(1);
  }

  const base = import.meta.env.BASE_URL || './';
  return `${base.endsWith('/') ? base : `${base}/`}${normalized}`;
}
