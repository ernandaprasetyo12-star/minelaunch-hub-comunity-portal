import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  MessageSquare,
  Send,
  Crown,
  User as UserIcon,
  Pin,
  PinOff,
  Trash2,
  ShieldAlert,
  ShieldCheck,
  Users,
  Megaphone,
  Clock,
  Sparkles,
  Server,
  Wrench,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Hash,
  Bot,
  Sliders,
} from 'lucide-react';
import {
  collection,
  doc,
  query,
  where,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { UserProfile } from '../types/auth';
import {
  auth,
  db,
  isStrictAdminEmail,
  signInWithGoogleFirebase,
  formatFirebaseAuthError,
  sanitizeAvatarForFirestore,
  handleFirestoreError,
  OperationType,
} from '../lib/firebase';
import { censorProfanity } from '../utils/profanityFilter';
import { AppViewMode } from './Navbar';

export type ChatRoom = 'general' | 'server-indo' | 'mods-help';

interface ChatMessageDoc {
  id: string;
  senderUid: string;
  senderName: string;
  senderAvatar: string;
  senderRole: 'admin' | 'user';
  text: string;
  censored: boolean;
  room: ChatRoom;
  isPinned: boolean;
  createdAt: Timestamp | number | null;
}

interface ChatConfigDoc {
  announcement: string;
  slowModeSeconds: number;
  updatedByUid: string;
}

interface OnlineUser {
  uid: string;
  displayName: string;
  avatarUrl: string;
  role: 'admin' | 'user';
  isTyping: boolean;
}

interface CommunityChatPageProps {
  user: UserProfile | null;
  initialRoom?: ChatRoom;
  onRoomChange?: (room: ChatRoom) => void;
  onLoginSuccess: (user: UserProfile) => void;
  onNavigate: (view: AppViewMode) => void;
  onOpenCraftAi: () => void;
  onOpenSettings: (tab?: 'appearance' | 'profile' | 'android' | 'security') => void;
}

const ROOMS: Array<{
  id: ChatRoom;
  name: string;
  slug: string;
  desc: string;
  icon: React.ReactNode;
}> = [
  {
    id: 'general',
    name: 'Obrolan Umum',
    slug: 'obrolan-umum',
    desc: 'Diskusi santai launcher, Minecraft Java, & tanya jawab',
    icon: <MessageSquare className="h-4 w-4 text-emerald-400 shrink-0" />,
  },
  {
    id: 'server-indo',
    name: 'Server Indonesia',
    slug: 'server-indo',
    desc: 'Cari party mabar Kaizen Network (mp.kaizenmc.id), MineGens, dll',
    icon: <Server className="h-4 w-4 text-amber-400 shrink-0" />,
  },
  {
    id: 'mods-help',
    name: 'Bantuan Mods',
    slug: 'bantuan-mods',
    desc: 'Modrinth, CurseForge, Fabric, Forge & optimasi FPS',
    icon: <Wrench className="h-4 w-4 text-sky-400 shrink-0" />,
  },
];

export const CommunityChatPage: React.FC<CommunityChatPageProps> = ({
  user,
  initialRoom = 'general',
  onRoomChange,
  onLoginSuccess,
  onNavigate,
  onOpenCraftAi,
  onOpenSettings,
}) => {
  const [activeRoom, setActiveRoom] = useState<ChatRoom>(initialRoom);
  const [messages, setMessages] = useState<ChatMessageDoc[]>([]);
  const [chatConfig, setChatConfig] = useState<ChatConfigDoc | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [showOnlineDrawerMobile, setShowOnlineDrawerMobile] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isVerifyingGoogle, setIsVerifyingGoogle] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [censorNotice, setCensorNotice] = useState(false);
  const [lastSentAt, setLastSentAt] = useState<number>(0);
  const [cooldownLeft, setCooldownLeft] = useState<number>(0);

  // Admin moderation controls state
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [announcementInput, setAnnouncementInput] = useState('');
  const [slowModeInput, setSlowModeInput] = useState<number>(0);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [configSavedNotice, setConfigSavedNotice] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveRoom(initialRoom);
  }, [initialRoom]);

  const handleSelectRoom = (room: ChatRoom) => {
    setActiveRoom(room);
    onRoomChange?.(room);
  };

  const fbUser = auth.currentUser;
  const isGoogleVerified = Boolean(
    fbUser && fbUser.emailVerified && user?.provider === 'google' && user?.uid === fbUser.uid
  );

  // Strict Admin check: ONLY ernanda.prasetyo12@gmail.com with verified Firebase Google Auth
  const isVerifiedAdmin = Boolean(
    isGoogleVerified &&
      user?.role === 'admin' &&
      isStrictAdminEmail(fbUser?.email, fbUser?.emailVerified)
  );

  const currentRoomMeta = useMemo(
    () => ROOMS.find((r) => r.id === activeRoom) || ROOMS[0],
    [activeRoom]
  );

  const draftCheck = useMemo(() => censorProfanity(inputText), [inputText]);

  // Slow-mode countdown ticker
  useEffect(() => {
    const slowSecs = chatConfig?.slowModeSeconds || 0;
    if (!slowSecs || isVerifiedAdmin || lastSentAt === 0) {
      setCooldownLeft(0);
      return;
    }
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - lastSentAt) / 1000);
      const remaining = Math.max(0, slowSecs - elapsed);
      setCooldownLeft(remaining);
      if (remaining === 0) clearInterval(interval);
    }, 300);
    return () => clearInterval(interval);
  }, [lastSentAt, chatConfig?.slowModeSeconds, isVerifiedAdmin]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, activeRoom]);

  // WebSocket real-time presence & typing connection
  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/chat`;
    let ws: WebSocket | null = null;
    let isCleanedUp = false;

    try {
      ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        if (isCleanedUp || !ws) return;
        ws.send(
          JSON.stringify({
            type: 'join',
            clientId: user?.id || 'guest',
            uid: user?.uid || user?.id || `guest-${Date.now()}`,
            displayName: user?.displayName || 'Pengunjung',
            avatarUrl: user?.avatarUrl || 'https://mc-heads.net/avatar/Steve/100',
            email: fbUser?.email || null,
            emailVerified: fbUser?.emailVerified || false,
            room: activeRoom,
          })
        );
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'presence' && data.room === activeRoom) {
            setOnlineUsers(Array.isArray(data.users) ? data.users : []);
          }
        } catch {
          // ignore malformed ws message
        }
      };

      ws.onerror = () => {
        // Silent fallback when running static build without WS backend
      };
    } catch {
      // Ignore WS connection errors in static environments
    }

    return () => {
      isCleanedUp = true;
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
      wsRef.current = null;
    };
  }, [activeRoom, user?.id, user?.uid, user?.displayName, user?.avatarUrl, fbUser?.email, fbUser?.emailVerified]);

  // Firestore real-time subscription for chat messages (when signed in to Firebase)
  useEffect(() => {
    if (!isGoogleVerified) {
      setMessages([]);
      return;
    }

    const q = query(
      collection(db, 'chat_messages'),
      where('room', '==', activeRoom),
      limit(100)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: ChatMessageDoc[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as ChatMessageDoc;
          const safe = censorProfanity(data.text || '');
          list.push({
            ...data,
            id: docSnap.id,
            text: safe.sanitized,
            censored: data.censored || safe.hasProfanity,
          });
        });

        list.sort((a, b) => {
          const getMs = (val: Timestamp | number | null) => {
            if (!val) return Date.now();
            if (typeof val === 'number') return val;
            if (typeof (val as Timestamp).toMillis === 'function') return (val as Timestamp).toMillis();
            return 0;
          };
          return getMs(a.createdAt) - getMs(b.createdAt);
        });

        setMessages(list);
      },
      (err) => {
        console.error('Chat messages listener error:', err);
        setErrorMsg('Gagal memuat pesan real-time dari Firestore.');
      }
    );

    return () => unsubscribe();
  }, [activeRoom, isGoogleVerified]);

  // Firestore real-time subscription for global chat config
  useEffect(() => {
    if (!isGoogleVerified) {
      setChatConfig(null);
      return;
    }

    const configRef = doc(db, 'chat_config', 'global');
    const unsubscribe = onSnapshot(
      configRef,
      (snap) => {
        if (snap.exists()) {
          const cfg = snap.data() as ChatConfigDoc;
          setChatConfig(cfg);
          setAnnouncementInput(cfg.announcement || '');
          setSlowModeInput(cfg.slowModeSeconds || 0);
        } else {
          setChatConfig(null);
        }
      },
      (err) => {
        console.debug('Chat config listener:', err?.message);
      }
    );

    return () => unsubscribe();
  }, [isGoogleVerified]);

  const handleTypingChange = (val: string) => {
    setInputText(val);
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'typing', isTyping: val.trim().length > 0 }));
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({ type: 'typing', isTyping: false }));
        }
      }, 2000);
    }
  };

  const handleVerifyWithGoogle = async () => {
    setIsVerifyingGoogle(true);
    setErrorMsg(null);
    try {
      const profile = await signInWithGoogleFirebase();
      onLoginSuccess(profile);
    } catch (err: any) {
      console.error('Google verification error:', err);
      const formatted = formatFirebaseAuthError(err);
      setErrorMsg(formatted.message);
    } finally {
      setIsVerifyingGoogle(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSending) return;
    if (!isGoogleVerified || !fbUser || !user) {
      setErrorMsg('Silakan masuk dengan Google terlebih dahulu untuk mengirim pesan.');
      return;
    }

    if (cooldownLeft > 0 && !isVerifiedAdmin) {
      setErrorMsg(`Slow mode aktif! Tunggu ${cooldownLeft} detik lagi sebelum mengirim pesan.`);
      return;
    }

    const rawText = inputText.trim().slice(0, 1000);
    const { sanitized, hasProfanity } = censorProfanity(rawText);

    if (!sanitized) return;

    setIsSending(true);
    setErrorMsg(null);

    if (hasProfanity) {
      setCensorNotice(true);
      setTimeout(() => setCensorNotice(false), 4000);
    }

    const msgId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const safeAvatar = sanitizeAvatarForFirestore(user.avatarUrl, user.username);
    const senderRole: 'admin' | 'user' = isVerifiedAdmin ? 'admin' : 'user';

    try {
      await setDoc(doc(db, 'chat_messages', msgId), {
        id: msgId,
        senderUid: fbUser.uid,
        senderName: (user.displayName || user.username || 'Crafter').slice(0, 80),
        senderAvatar: safeAvatar,
        senderRole,
        text: sanitized,
        censored: hasProfanity,
        room: activeRoom,
        isPinned: false,
        createdAt: serverTimestamp(),
      });

      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'typing', isTyping: false }));
      }

      setInputText('');
      setLastSentAt(Date.now());
    } catch (err: any) {
      console.error('Send chat error:', err);
      setErrorMsg('Gagal mengirim pesan. Pastikan akun Google terverifikasi.');
      try {
        handleFirestoreError(err, OperationType.CREATE, `chat_messages/${msgId}`);
      } catch {
        // error already logged
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleTogglePin = async (msg: ChatMessageDoc) => {
    if (!isVerifiedAdmin) return;
    try {
      await updateDoc(doc(db, 'chat_messages', msg.id), {
        isPinned: !msg.isPinned,
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `chat_messages/${msg.id}`);
    }
  };

  const handleDeleteMessage = async (msg: ChatMessageDoc) => {
    if (!isGoogleVerified || !fbUser) return;
    const canDelete = isVerifiedAdmin || msg.senderUid === fbUser.uid;
    if (!canDelete) return;

    try {
      await deleteDoc(doc(db, 'chat_messages', msg.id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `chat_messages/${msg.id}`);
    }
  };

  const handleSaveAdminConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerifiedAdmin || !fbUser) return;

    setIsSavingConfig(true);
    setErrorMsg(null);
    const safeAnnouncement = censorProfanity(announcementInput.trim().slice(0, 500)).sanitized;
    const safeSlowMode = Math.max(0, Math.min(300, Number(slowModeInput) || 0));

    try {
      await setDoc(doc(db, 'chat_config', 'global'), {
        announcement: safeAnnouncement,
        slowModeSeconds: safeSlowMode,
        updatedByUid: fbUser.uid,
        updatedAt: serverTimestamp(),
      });
      setConfigSavedNotice(true);
      setTimeout(() => setConfigSavedNotice(false), 3000);
    } catch (err) {
      console.error('Save admin config failed:', err);
      setErrorMsg('Gagal menyimpan konfigurasi moderasi.');
    } finally {
      setIsSavingConfig(false);
    }
  };

  const pinnedMessages = useMemo(
    () => messages.filter((m) => m.isPinned),
    [messages]
  );

  const typingUsers = useMemo(
    () =>
      onlineUsers.filter(
        (u) => u.isTyping && u.uid !== (user?.uid || user?.id)
      ),
    [onlineUsers, user?.uid, user?.id]
  );

  const formatMsgTime = (createdAt: Timestamp | number | null) => {
    if (!createdAt) return 'Baru saja';
    const date =
      typeof createdAt === 'number'
        ? new Date(createdAt)
        : typeof (createdAt as Timestamp).toDate === 'function'
        ? (createdAt as Timestamp).toDate()
        : new Date();
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Standalone Top Header — Completely Separated from Home Portal */}
      <header className="shrink-0 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-xl px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/60 bg-emerald-950/70 px-3 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-900/80 hover:text-white transition-all whitespace-nowrap shrink-0"
            title="Kembali ke Beranda MineLaunch Hub"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Kembali ke Home</span>
            <span className="sm:hidden">Home</span>
          </button>

          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-950 border border-teal-700/80 text-teal-300 shrink-0">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight truncate">
                  MineLaunch Live Chat
                </h1>
                <span className="hidden md:inline text-xs text-neutral-400">
                  · Ruang Terpisah
                </span>
              </div>
              <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 truncate">
                <Hash className="h-3 w-3 text-teal-400 shrink-0" />
                <span className="font-mono text-teal-300">{currentRoomMeta.slug}</span>
                <span>·</span>
                <span className="tabular-nums">{onlineUsers.length} online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Role Indicator */}
          {isVerifiedAdmin ? (
            <button
              onClick={() => setIsAdminPanelOpen(!isAdminPanelOpen)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold border transition-all whitespace-nowrap shrink-0 ${
                isAdminPanelOpen
                  ? 'bg-amber-600 text-white border-amber-400'
                  : 'bg-amber-950/70 text-amber-300 border-amber-600/70 hover:bg-amber-900/70'
              }`}
              title="Buka Panel Moderasi Admin"
            >
              <Crown className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline">Panel Admin</span>
            </button>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1 rounded-xl bg-neutral-900 border border-neutral-800 px-2.5 py-1.5 text-[11px] font-semibold text-neutral-300 whitespace-nowrap shrink-0">
              <UserIcon className="h-3 w-3 text-sky-400" />
              <span>User Biasa</span>
            </span>
          )}

          {/* Mobile Online Toggle */}
          <button
            onClick={() => setShowOnlineDrawerMobile(!showOnlineDrawerMobile)}
            className="lg:hidden inline-flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-900 px-2.5 py-2 text-xs font-semibold text-neutral-200 hover:border-teal-500 transition-colors shrink-0"
            title="Lihat Pengguna Online"
          >
            <Users className="h-3.5 w-3.5 text-emerald-400" />
            <span className="tabular-nums">{onlineUsers.length}</span>
          </button>

          {/* Craft AI quick trigger */}
          <button
            onClick={onOpenCraftAi}
            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-700/80 bg-emerald-950/60 px-2.5 sm:px-3 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-900/70 transition-colors whitespace-nowrap shrink-0"
            title="Tanya Craft AI (Google Gemini)"
          >
            <Bot className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden md:inline">Craft AI</span>
          </button>

          {/* Profile / Settings trigger */}
          {user && (
            <button
              onClick={() => onOpenSettings('profile')}
              className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-2 py-1.5 hover:border-emerald-500/60 transition-colors shrink-0"
              title="Profil & Pengaturan"
            >
              <img
                src={user.avatarUrl}
                alt={user.displayName}
                className="h-6 w-6 rounded-md object-cover bg-neutral-800"
                referrerPolicy="no-referrer"
              />
              <span className="hidden md:inline text-xs font-bold text-white max-w-[100px] truncate">
                {user.username}
              </span>
              <Sliders className="h-3.5 w-3.5 text-neutral-400 hidden sm:inline" />
            </button>
          )}
        </div>
      </header>

      {/* Mobile Chat Room Switcher Bar */}
      <div className="lg:hidden shrink-0 border-b border-neutral-800 bg-neutral-900/90 backdrop-blur-md px-3 py-2 flex items-center gap-2 overflow-x-auto">
        <span className="text-[11px] font-bold text-neutral-400 whitespace-nowrap shrink-0">
          Chat Room:
        </span>
        {ROOMS.map((room) => {
          const isActive = activeRoom === room.id;
          return (
            <button
              key={room.id}
              onClick={() => handleSelectRoom(room.id)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap shrink-0 border transition-all ${
                isActive
                  ? 'border-teal-500 bg-teal-950/80 text-teal-200 shadow-sm'
                  : 'border-neutral-800 bg-neutral-950/70 text-neutral-300 hover:border-neutral-700'
              }`}
            >
              {room.icon}
              <span>#{room.slug}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Online Users Collapse Panel */}
      {showOnlineDrawerMobile && (
        <div className="lg:hidden shrink-0 border-b border-neutral-800 bg-neutral-950/95 px-4 py-3 space-y-2 max-h-48 overflow-y-auto">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-300">
            <span>Online di #{currentRoomMeta.slug} ({onlineUsers.length})</span>
            <button
              onClick={() => setShowOnlineDrawerMobile(false)}
              className="text-neutral-400 hover:text-white"
            >
              Tutup
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {onlineUsers.map((u) => (
              <div
                key={u.uid}
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-xs"
              >
                <img
                  src={u.avatarUrl || 'https://mc-heads.net/avatar/Steve/100'}
                  alt={u.displayName}
                  className="h-4 w-4 rounded object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="text-white font-medium truncate max-w-[120px]">{u.displayName}</span>
                <span className={`text-[10px] font-bold ${u.role === 'admin' ? 'text-amber-400' : 'text-neutral-400'}`}>
                  {u.role === 'admin' ? 'ADMIN' : 'USER'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exclusive Admin Moderation Panel */}
      {isVerifiedAdmin && isAdminPanelOpen && (
        <form
          onSubmit={handleSaveAdminConfig}
          className="shrink-0 border-b border-amber-500/50 bg-neutral-950/95 px-4 sm:px-6 py-3.5 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs sm:text-sm">
              <Crown className="h-4 w-4 text-amber-400" />
              <span>Panel Moderasi Admin ({fbUser?.email})</span>
            </div>
            {configSavedNotice && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Tersimpan</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              type="text"
              value={announcementInput}
              onChange={(e) => setAnnouncementInput(e.target.value)}
              maxLength={500}
              placeholder="Pengumuman global di semua Chat Room..."
              className="md:col-span-2 rounded-xl border border-neutral-700 bg-neutral-900 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
            />
            <select
              value={slowModeInput}
              onChange={(e) => setSlowModeInput(Number(e.target.value))}
              className="rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
            >
              <option value={0}>Slow Mode: Mati (0 detik)</option>
              <option value={3}>Slow Mode: 3 detik</option>
              <option value={5}>Slow Mode: 5 detik</option>
              <option value={10}>Slow Mode: 10 detik</option>
              <option value={30}>Slow Mode: 30 detik</option>
            </select>
            <button
              type="submit"
              disabled={isSavingConfig}
              className="rounded-xl bg-amber-600 hover:bg-amber-500 px-4 py-2 text-xs font-bold text-white transition-colors disabled:opacity-50"
            >
              {isSavingConfig ? 'Menyimpan...' : 'Simpan Pengaturan'}
            </button>
          </div>
        </form>
      )}

      {/* Main Split Workspace: Left Chat Rooms Sidebar + Right Full-Height Chat Room */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        {/* Desktop Sidebar: Chat Rooms & Online Members */}
        <aside className="hidden lg:flex w-80 shrink-0 flex-col border-r border-neutral-800 bg-neutral-950/85 backdrop-blur-xl">
          <div className="p-4 space-y-3 border-b border-neutral-800">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-neutral-300">
                Daftar Chat Room
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                {ROOMS.length} room
              </span>
            </div>

            <div className="space-y-2">
              {ROOMS.map((room) => {
                const isActive = activeRoom === room.id;
                return (
                  <button
                    key={room.id}
                    onClick={() => handleSelectRoom(room.id)}
                    className={`w-full text-left rounded-xl p-3 border transition-all flex items-start gap-3 ${
                      isActive
                        ? 'border-teal-500/80 bg-teal-950/50 shadow-md shadow-teal-950/30'
                        : 'border-neutral-800/90 bg-neutral-900/60 hover:border-neutral-700 hover:bg-neutral-900'
                    }`}
                  >
                    <div className="mt-0.5">{room.icon}</div>
                    <div className="min-w-0">
                      <div className={`text-xs font-bold flex items-center gap-1 ${isActive ? 'text-teal-200' : 'text-white'}`}>
                        <span>#{room.slug}</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5 leading-snug">
                        {room.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Online Users List */}
          <div className="flex-1 min-h-0 flex flex-col p-4 space-y-3">
            <div className="flex items-center justify-between px-1 shrink-0">
              <span className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-emerald-400" />
                <span>Online di Room Ini</span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400 tabular-nums">
                {onlineUsers.length} aktif
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {onlineUsers.length === 0 ? (
                <div className="text-xs text-neutral-500 px-1 py-2">
                  Menghubungkan status online...
                </div>
              ) : (
                onlineUsers.map((u) => (
                  <div
                    key={u.uid}
                    className="flex items-center justify-between gap-2 rounded-xl border border-neutral-800/80 bg-neutral-900/60 px-3 py-2"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={u.avatarUrl || 'https://mc-heads.net/avatar/Steve/100'}
                          alt={u.displayName}
                          className="h-7 w-7 rounded-lg object-cover bg-neutral-800 border border-neutral-700"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-neutral-950" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white truncate">
                          {u.displayName}
                        </div>
                        {u.isTyping && (
                          <div className="text-[10px] text-emerald-400 animate-pulse">
                            sedang mengetik...
                          </div>
                        )}
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold shrink-0 ${
                        u.role === 'admin' ? 'text-amber-400' : 'text-neutral-400'
                      }`}
                    >
                      {u.role === 'admin' ? 'ADMIN' : 'USER'}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="shrink-0 pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 leading-relaxed">
              Sensor otomatis aktif: kata kasar diganti dengan <code className="text-amber-300 font-mono">###</code> &amp; <code className="text-amber-300 font-mono">***</code>.
            </div>
          </div>
        </aside>

        {/* Active Chat Room Main Area */}
        <section className="flex-1 min-w-0 flex flex-col bg-neutral-900/75 backdrop-blur-xl">
          {/* Room Banner: Title, Announcement, Pinned Message */}
          <div className="shrink-0 border-b border-neutral-800 bg-neutral-950/70 px-4 sm:px-6 py-3 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                {currentRoomMeta.icon}
                <h2 className="text-sm sm:text-base font-bold text-white truncate">
                  #{currentRoomMeta.slug} — {currentRoomMeta.name}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-neutral-400 shrink-0">
                {chatConfig && chatConfig.slowModeSeconds > 0 && (
                  <span className="inline-flex items-center gap-1 font-mono text-amber-300">
                    <Clock className="h-3 w-3" />
                    <span>Slow Mode {chatConfig.slowModeSeconds}d</span>
                  </span>
                )}
              </div>
            </div>

            {chatConfig?.announcement && (
              <div className="rounded-xl border border-amber-700/60 bg-amber-950/40 px-3.5 py-2 text-xs text-amber-200 flex items-start gap-2">
                <Megaphone className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300">Pengumuman Admin: </span>
                  <span>{censorProfanity(chatConfig.announcement).sanitized}</span>
                </div>
              </div>
            )}

            {pinnedMessages.length > 0 && (
              <div className="rounded-xl border border-emerald-800/70 bg-emerald-950/30 px-3.5 py-2 text-xs text-emerald-200 flex items-start gap-2">
                <Pin className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-emerald-300">
                    Disematkan ({pinnedMessages[pinnedMessages.length - 1].senderName}):{' '}
                  </span>
                  <span className="break-words">{pinnedMessages[pinnedMessages.length - 1].text}</span>
                </div>
              </div>
            )}
          </div>

          {/* Messages Stream OR Google Verification Prompt */}
          {!isGoogleVerified ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 shadow-lg">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div className="space-y-1.5 max-w-md">
                <h3 className="text-lg font-black text-white">
                  Masuk dengan Google Untuk Masuk Chat Room
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Chat Room MineLaunch terhubung secara real-time ke database komunitas. Silakan verifikasi akun Google Anda untuk membaca &amp; mengirim pesan.
                </p>
              </div>
              {errorMsg && (
                <div className="rounded-xl border border-red-700/80 bg-red-950/60 px-3.5 py-2 text-xs text-red-200 max-w-md">
                  {errorMsg}
                </div>
              )}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleVerifyWithGoogle}
                  disabled={isVerifyingGoogle}
                  className="inline-flex items-center gap-2.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs sm:text-sm px-5 py-3 shadow-xl transition-all disabled:opacity-60"
                >
                  {isVerifyingGoogle ? (
                    <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                  ) : (
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                  )}
                  <span>{isVerifyingGoogle ? 'Menghubungkan Google...' : 'Masuk / Verifikasi dengan Google'}</span>
                </button>
                <button
                  onClick={() => onNavigate('home')}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Kembali ke Beranda</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Messages Scroll Area */}
              <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-3">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-2 text-neutral-400">
                    <Sparkles className="h-8 w-8 text-teal-400/60" />
                    <p className="text-sm font-semibold text-neutral-200">
                      Belum ada pesan di Chat Room #{currentRoomMeta.slug}
                    </p>
                    <p className="text-xs text-neutral-500">
                      Kirim pesan pertamamu sekarang!
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isOwn = fbUser?.uid === msg.senderUid;
                    const isSenderAdmin = msg.senderRole === 'admin';
                    return (
                      <div
                        key={msg.id}
                        className={`group flex items-start gap-3 rounded-2xl p-3 transition-colors border ${
                          msg.isPinned
                            ? 'border-emerald-700/70 bg-emerald-950/25'
                            : isSenderAdmin
                            ? 'border-amber-700/50 bg-amber-950/15'
                            : isOwn
                            ? 'border-neutral-800 bg-neutral-900/90'
                            : 'border-transparent hover:bg-neutral-900/50'
                        }`}
                      >
                        <img
                          src={msg.senderAvatar || 'https://mc-heads.net/avatar/Steve/100'}
                          alt={msg.senderName}
                          className={`h-9 w-9 rounded-xl object-cover shrink-0 bg-neutral-800 border ${
                            isSenderAdmin ? 'border-amber-400 ring-2 ring-amber-500/30' : 'border-neutral-700'
                          }`}
                          referrerPolicy="no-referrer"
                        />

                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2 flex-wrap text-xs">
                              <span
                                className={`font-bold ${
                                  isSenderAdmin ? 'text-amber-300' : isOwn ? 'text-emerald-300' : 'text-white'
                                }`}
                              >
                                {msg.senderName}
                              </span>

                              <span
                                className={`text-[10px] font-bold ${
                                  isSenderAdmin ? 'text-amber-400' : 'text-neutral-400'
                                }`}
                              >
                                {isSenderAdmin ? 'ADMIN' : 'USER'}
                              </span>

                              <span className="text-neutral-600">·</span>

                              <span className="text-[11px] text-neutral-400 font-mono tabular-nums">
                                {formatMsgTime(msg.createdAt)}
                              </span>

                              {msg.isPinned && (
                                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-400">
                                  <Pin className="h-2.5 w-2.5" />
                                  <span>Disematkan</span>
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                              {isVerifiedAdmin && (
                                <button
                                  onClick={() => handleTogglePin(msg)}
                                  title={msg.isPinned ? 'Lepas Sematan' : 'Sematkan Pesan (Admin)'}
                                  className="p-1.5 rounded-lg text-neutral-400 hover:text-emerald-400 hover:bg-neutral-800 transition-colors"
                                >
                                  {msg.isPinned ? <PinOff className="h-3.5 w-3.5" /> : <Pin className="h-3.5 w-3.5" />}
                                </button>
                              )}
                              {(isVerifiedAdmin || isOwn) && (
                                <button
                                  onClick={() => handleDeleteMessage(msg)}
                                  title="Hapus Pesan"
                                  className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition-colors"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              )}
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed break-words whitespace-pre-wrap">
                            {msg.text}
                          </p>

                          {msg.censored && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-amber-400/90 font-mono">
                              <ShieldAlert className="h-3 w-3" />
                              <span>Disensor otomatis (### / ***)</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Typing & Profanity Notice Strip */}
              {(typingUsers.length > 0 || draftCheck.hasProfanity || censorNotice || errorMsg) && (
                <div className="shrink-0 px-4 sm:px-6 py-1.5 bg-neutral-950/80 border-t border-neutral-800/80 space-y-1">
                  {typingUsers.length > 0 && (
                    <div className="text-[11px] text-emerald-400 animate-pulse">
                      {typingUsers.map((u) => u.displayName).join(', ')} sedang mengetik...
                    </div>
                  )}

                  {draftCheck.hasProfanity && (
                    <div className="text-[11px] text-amber-300 flex items-center gap-1.5">
                      <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                      <span>
                        Kata kasar terdeteksi — otomatis disensor menjadi <strong className="font-mono">### / ***</strong> saat dikirim.
                      </span>
                    </div>
                  )}

                  {censorNotice && (
                    <div className="text-[11px] text-amber-300 flex items-center gap-1.5">
                      <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                      <span>Pesan Anda telah disensor otomatis dengan ### / ***.</span>
                    </div>
                  )}

                  {errorMsg && (
                    <div className="text-[11px] text-red-400 flex items-center gap-1.5">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Sticky Message Composer */}
              <form
                onSubmit={handleSendMessage}
                className="shrink-0 border-t border-neutral-800 bg-neutral-950/95 px-4 sm:px-6 py-3.5 flex items-center gap-2.5"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => handleTypingChange(e.target.value)}
                  maxLength={1000}
                  placeholder={
                    cooldownLeft > 0
                      ? `Slow mode aktif: tunggu ${cooldownLeft} detik...`
                      : `Kirim pesan di #${currentRoomMeta.slug}...`
                  }
                  className="flex-1 rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:border-teal-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSending || !inputText.trim() || cooldownLeft > 0}
                  className="inline-flex items-center gap-1.5 rounded-2xl bg-teal-600 hover:bg-teal-500 px-5 py-3 text-xs font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-950 shrink-0"
                >
                  {isSending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : cooldownLeft > 0 ? (
                    <span className="font-mono tabular-nums">{cooldownLeft}s</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Kirim</span>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </div>
  );
};
