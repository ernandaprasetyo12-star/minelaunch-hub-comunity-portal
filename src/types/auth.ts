export type AuthProvider = 'google' | 'microsoft' | 'elyby' | 'offline';

export interface UserProfile {
  id: string;
  provider: AuthProvider;
  username: string;
  displayName: string;
  email?: string;
  avatarUrl: string;
  hasOfficialLicense: boolean;
  hasElyBySkin: boolean;
  skinCapeName?: string;
  joinedAt: string;
}
