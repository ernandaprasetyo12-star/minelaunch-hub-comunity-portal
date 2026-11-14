import { UserProfile } from '../types/auth';

export interface ElyBySsoUserData {
  id: number;
  uuid: string;
  username: string;
  email?: string;
  profileLink: string;
  preferredLanguage?: string;
}

export interface ElyBySsoPayload {
  authenticated: boolean;
  expiresAt?: number;
  hasRefreshToken?: boolean;
  user?: ElyBySsoUserData;
}

export interface ElyBySetupInfo {
  redirectUri: string;
  portalUrl: string;
  message: string;
}

export function buildElyByProfileFromSso(
  sso: ElyBySsoPayload,
  overrides?: { avatarUrl?: string }
): UserProfile {
  const u = sso.user!;
  const safeUsername = encodeURIComponent(u.username);
  return {
    id: `elyby-sso-${u.id}`,
    provider: 'elyby',
    role: 'user',
    username: u.username,
    displayName: `${u.username} (Ely.by SSO)`,
    email: u.email,
    emailVerified: false,
    avatarUrl: overrides?.avatarUrl || `https://mc-heads.net/avatar/${safeUsername}/100`,
    hasOfficialLicense: false,
    hasElyBySkin: true,
    skinCapeName: 'Ely.by SSO Verified Skin & Cape',
    elybyUuid: u.uuid,
    elybyProfileLink: u.profileLink,
    elybySsoVerified: true,
    ssoExpiresAt: sso.expiresAt,
    joinedAt: new Date().toLocaleDateString('id-ID'),
  };
}

export async function startElyByOAuthPopup(options: {
  onSuccess: (profile: UserProfile) => void;
  onNeedsSetup: (info: ElyBySetupInfo) => void;
  onError: (message: string) => void;
  onCancel?: () => void;
  avatarOverride?: string;
}): Promise<void> {
  const res = await fetch('/api/auth/elyby/url', { credentials: 'include' });
  const contentType = res.headers.get('content-type') || '';
  if (!res.ok || !contentType.includes('application/json')) {
    throw new Error('Server backend OAuth Ely.by tidak aktif pada deployment statis ini.');
  }

  const data = await res.json();
  if (!data.configured || !data.url) {
    options.onNeedsSetup({
      redirectUri: data.redirectUri || `${window.location.origin}/api/auth/elyby/callback`,
      portalUrl: data.portalUrl || 'https://account.ely.by/dev/applications',
      message: data.message || 'ELYBY_CLIENT_ID dan ELYBY_CLIENT_SECRET belum dikonfigurasi.',
    });
    return;
  }

  const popup = window.open(
    data.url,
    'elyby_oauth_popup',
    'width=600,height=720,scrollbars=yes,resizable=yes'
  );

  if (!popup) {
    options.onError('Popup diblokir browser. Harap izinkan popup untuk otorisasi Ely.by.');
    return;
  }

  let finished = false;
  let pollTimer: ReturnType<typeof setInterval> | null = null;

  const cleanup = () => {
    window.removeEventListener('message', handleMessage);
    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
  };

  const handleMessage = (event: MessageEvent) => {
    const origin = event.origin;
    if (
      origin !== window.location.origin &&
      !origin.endsWith('.run.app') &&
      !origin.includes('localhost')
    ) {
      return;
    }

    if (event.data?.type === 'ELYBY_OAUTH_SUCCESS' && event.data?.sso?.user) {
      finished = true;
      cleanup();
      const profile = buildElyByProfileFromSso(event.data.sso, {
        avatarUrl: options.avatarOverride,
      });
      options.onSuccess(profile);
    } else if (event.data?.type === 'ELYBY_OAUTH_ERROR') {
      finished = true;
      cleanup();
      options.onError(event.data?.error || 'Otorisasi Ely.by gagal.');
    }
  };

  window.addEventListener('message', handleMessage);

  pollTimer = setInterval(() => {
    if (popup.closed && !finished) {
      cleanup();
      options.onCancel?.();
    }
  }, 500);
}

export async function checkElyBySsoSession(): Promise<ElyBySsoPayload | null> {
  try {
    const res = await fetch('/api/auth/elyby/session', { credentials: 'include' });
    const ct = res.headers.get('content-type') || '';
    if (!res.ok || !ct.includes('application/json')) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function refreshElyBySsoSession(): Promise<ElyBySsoPayload | null> {
  try {
    const res = await fetch('/api/auth/elyby/refresh', {
      method: 'POST',
      credentials: 'include',
    });
    const ct = res.headers.get('content-type') || '';
    if (!res.ok || !ct.includes('application/json')) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function logoutElyBySso(): Promise<void> {
  try {
    await fetch('/api/auth/elyby/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch {
    // ignore offline/static
  }
}
