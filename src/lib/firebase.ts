import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  getDocFromServer,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserProfile, UserRole } from '../types/auth';

export const ADMIN_EMAIL = 'ernanda.prasetyo12@gmail.com';
export const FIREBASE_PROJECT_ID = firebaseConfig.projectId;

export function formatFirebaseAuthError(err: any): {
  message: string;
  isUnauthorizedDomain: boolean;
  hostname: string;
} {
  const code = String(err?.code || '');
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  if (code === 'auth/popup-closed-by-user') {
    return {
      message: 'Popup login Google ditutup sebelum selesai. Silakan coba lagi.',
      isUnauthorizedDomain: false,
      hostname,
    };
  }
  if (code === 'auth/popup-blocked') {
    return {
      message: 'Popup diblokir browser. Izinkan popup untuk masuk dengan Google.',
      isUnauthorizedDomain: false,
      hostname,
    };
  }
  if (code === 'auth/unauthorized-domain' || String(err?.message || '').includes('auth/unauthorized-domain')) {
    return {
      message: `Domain "${hostname}" belum terdaftar di Authorized Domains Firebase Authentication (${FIREBASE_PROJECT_ID}). Tambahkan domain ini di Firebase Console → Authentication → Settings → Authorized domains, lalu refresh halaman.`,
      isUnauthorizedDomain: true,
      hostname,
    };
  }
  return {
    message: err?.message || 'Gagal otentikasi dengan Google. Pastikan koneksi stabil.',
    isUnauthorizedDomain: false,
    hostname,
  };
}

export function isStrictAdminEmail(
  email?: string | null,
  emailVerified?: boolean | null
): boolean {
  if (!email || emailVerified !== true) return false;
  return email.trim().toLowerCase() === ADMIN_EMAIL;
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData.map((provider) => ({
          providerId: provider.providerId,
          displayName: provider.displayName,
          email: provider.email,
          photoUrl: provider.photoURL,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration (client appears offline).');
    }
    // Permission error or missing test doc is expected on locked collections
  }
}
void testFirestoreConnection();

/**
 * Ensures avatarUrl fits within the Firestore 2048-char limit.
 */
export function sanitizeAvatarForFirestore(avatarUrl: string, username: string): string {
  const safeName = encodeURIComponent(username || 'Steve');
  const fallback = `https://mc-heads.net/avatar/${safeName}/100`;
  if (!avatarUrl || avatarUrl.length > 2048) {
    return fallback;
  }
  return avatarUrl;
}

export function buildUserProfileFromFirebase(
  firebaseUser: FirebaseUser,
  overrides?: Partial<UserProfile>
): UserProfile {
  const isAdmin = isStrictAdminEmail(firebaseUser.email, firebaseUser.emailVerified);
  const role: UserRole = isAdmin ? 'admin' : 'user';
  const defaultUsername =
    overrides?.username ||
    firebaseUser.displayName?.toLowerCase().replace(/[^a-z0-9_]+/g, '_').slice(0, 32) ||
    firebaseUser.email?.split('@')[0]?.slice(0, 32) ||
    'crafter';

  return {
    id: firebaseUser.uid,
    uid: firebaseUser.uid,
    provider: 'google',
    role,
    username: defaultUsername,
    displayName: overrides?.displayName || firebaseUser.displayName || defaultUsername,
    email: firebaseUser.email || undefined,
    emailVerified: firebaseUser.emailVerified,
    avatarUrl:
      overrides?.avatarUrl ||
      firebaseUser.photoURL ||
      `https://mc-heads.net/avatar/${encodeURIComponent(defaultUsername)}/100`,
    hasOfficialLicense: overrides?.hasOfficialLicense ?? false,
    hasElyBySkin: overrides?.hasElyBySkin ?? false,
    skinCapeName: overrides?.skinCapeName,
    joinedAt: overrides?.joinedAt || new Date().toLocaleDateString('id-ID'),
  };
}

/**
 * Signs in with Google via Firebase Auth and provisions / updates Firestore records.
 * Only ernanda.prasetyo12@gmail.com (verified) receives admin role.
 */
export async function signInWithGoogleFirebase(
  customOverrides?: Partial<UserProfile>
): Promise<UserProfile> {
  const result = await signInWithPopup(auth, googleProvider);
  const fbUser = result.user;
  const isAdmin = isStrictAdminEmail(fbUser.email, fbUser.emailVerified);
  const role: UserRole = isAdmin ? 'admin' : 'user';

  // Ensure admin entry exists for the sole verified admin
  if (isAdmin && fbUser.email) {
    const adminRef = doc(db, 'admins', fbUser.uid);
    try {
      const adminSnap = await getDoc(adminRef);
      if (!adminSnap.exists()) {
        await setDoc(adminRef, {
          uid: fbUser.uid,
          email: fbUser.email.toLowerCase(),
          grantedAt: serverTimestamp(),
        });
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `admins/${fbUser.uid}`);
    }
  }

  // Check if users_public already exists
  const publicRef = doc(db, 'users_public', fbUser.uid);
  let existingData: Record<string, any> | null = null;
  try {
    const snap = await getDoc(publicRef);
    if (snap.exists()) {
      existingData = snap.data();
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `users_public/${fbUser.uid}`);
  }

  const profile = buildUserProfileFromFirebase(fbUser, {
    username: customOverrides?.username || existingData?.username,
    displayName: customOverrides?.displayName || existingData?.displayName,
    avatarUrl: customOverrides?.avatarUrl || existingData?.avatarUrl,
    hasOfficialLicense:
      customOverrides?.hasOfficialLicense ?? existingData?.hasOfficialLicense ?? false,
    hasElyBySkin: customOverrides?.hasElyBySkin ?? existingData?.hasElyBySkin ?? false,
    skinCapeName: customOverrides?.skinCapeName || existingData?.skinCapeName,
    joinedAt: existingData?.joinedAt,
  });

  const firestoreAvatar = sanitizeAvatarForFirestore(profile.avatarUrl, profile.username);

  try {
    if (!existingData) {
      const publicPayload: Record<string, any> = {
        uid: fbUser.uid,
        username: profile.username.slice(0, 50),
        displayName: profile.displayName.slice(0, 80),
        avatarUrl: firestoreAvatar,
        provider: 'google',
        hasOfficialLicense: Boolean(profile.hasOfficialLicense),
        hasElyBySkin: Boolean(profile.hasElyBySkin),
        role,
        joinedAt: profile.joinedAt,
        updatedAt: serverTimestamp(),
      };
      if (profile.skinCapeName) {
        publicPayload.skinCapeName = profile.skinCapeName.slice(0, 100);
      }
      await setDoc(publicRef, publicPayload);
    } else {
      const updatePayload: Record<string, any> = {
        username: profile.username.slice(0, 50),
        displayName: profile.displayName.slice(0, 80),
        avatarUrl: firestoreAvatar,
        provider: 'google',
        hasOfficialLicense: Boolean(profile.hasOfficialLicense),
        hasElyBySkin: Boolean(profile.hasElyBySkin),
        updatedAt: serverTimestamp(),
      };
      if (profile.skinCapeName) {
        updatePayload.skinCapeName = profile.skinCapeName.slice(0, 100);
      }
      await updateDoc(publicRef, updatePayload);
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `users_public/${fbUser.uid}`);
  }

  // Sync PII email to users_private
  if (fbUser.email) {
    const privateRef = doc(db, 'users_private', fbUser.uid);
    try {
      await setDoc(
        privateRef,
        {
          uid: fbUser.uid,
          email: fbUser.email,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users_private/${fbUser.uid}`);
    }
  }

  return profile;
}

export async function syncProfileToFirestore(profile: UserProfile): Promise<void> {
  const fbUser = auth.currentUser;
  if (!fbUser || !fbUser.emailVerified || fbUser.uid !== profile.uid) {
    return;
  }

  const publicRef = doc(db, 'users_public', fbUser.uid);
  const firestoreAvatar = sanitizeAvatarForFirestore(profile.avatarUrl, profile.username);

  try {
    const payload: Record<string, any> = {
      username: profile.username.slice(0, 50),
      displayName: profile.displayName.slice(0, 80),
      avatarUrl: firestoreAvatar,
      provider: profile.provider,
      hasOfficialLicense: Boolean(profile.hasOfficialLicense),
      hasElyBySkin: Boolean(profile.hasElyBySkin),
      updatedAt: serverTimestamp(),
    };
    if (profile.skinCapeName) {
      payload.skinCapeName = profile.skinCapeName.slice(0, 100);
    }
    await updateDoc(publicRef, payload);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `users_public/${fbUser.uid}`);
  }
}

export async function signOutFirebase(): Promise<void> {
  try {
    await signOut(auth);
  } catch {
    // ignore signout error
  }
}
