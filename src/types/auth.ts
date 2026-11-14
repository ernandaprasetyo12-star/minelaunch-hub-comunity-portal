export type AuthProvider = 'google' | 'microsoft' | 'elyby' | 'offline';
export type UserRole = 'admin' | 'user';

export interface UserProfile {
  id: string;
  uid?: string;
  provider: AuthProvider;
  role: UserRole;
  username: string;
  displayName: string;
  email?: string;
  emailVerified?: boolean;
  avatarUrl: string;
  hasOfficialLicense: boolean;
  hasElyBySkin: boolean;
  skinCapeName?: string;
  elybyUuid?: string;
  elybyProfileLink?: string;
  elybySsoVerified?: boolean;
  ssoExpiresAt?: number;
  joinedAt: string;
}
