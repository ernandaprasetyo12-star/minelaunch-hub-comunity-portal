import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  HelpCircle, 
  Cpu, 
  ShieldCheck, 
  Minimize2, 
  Maximize2 
} from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface CraftAiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CraftAiModal: React.FC<CraftAiModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: 'Halo! Saya Craft AI, asisten virtual resmi MineLaunch Hub. Ada yang ingin kamu tanyakan seputar peluncur Minecraft, cara optimasi laptop kentang, atau tips menghindari malware?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const history = messages.slice(-6); // Keep last 3 turns of context
      const res = await fetch('/api/craft-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text, history }),
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch {
        // Not JSON (e.g. static hosting 404 HTML fallback)
      }

      if (res.ok && data && data.reply) {
        setMessages((prev) => [...prev, { role: 'model', text: data.reply }]);
      } else {
        // Intelligent offline / static deployment fallback responses
        const queryLower = text.toLowerCase();
        let fallbackReply = "Halo! Craft AI merespons dalam mode Offline/Statis (backend Node.js tidak aktif di hosting ini). Untuk kebutuhan Minecraft, gunakan Prism Launcher (resmi) atau XMCL / SKLauncher (Ely.by) yang aman dari malware.";
        
        if (queryLower.includes('ringan') || queryLower.includes('kentang') || queryLower.includes('ram')) {
          fallbackReply = "Untuk PC/laptop kentang (RAM 4GB), sangat disarankan menggunakan SKLauncher atau Feather Client dengan alokasi RAM 2GB serta menginstal mod Sodium (Fabric) untuk mendongkrak FPS secara drastis!";
        } else if (queryLower.includes('tlauncher') || queryLower.includes('bahaya') || queryLower.includes('virus')) {
          fallbackReply = "Waspada terhadap TLauncher (TLMedia)! Berdasarkan investigasi Wikipedia dan komunitas, launcher tersebut mencuri data sesi Minecraft dan membajak file hosts Windows. Gunakan alternatif bersih seperti XMCL atau SKLauncher.";
        } else if (queryLower.includes('ely') || queryLower.includes('skin')) {
          fallbackReply = "Akun Ely.by adalah solusi terbaik untuk bermain Minecraft non-lisensi dengan dukungan skin kustom, jubah (cape), dan sistem otorisasi yang aman tanpa risiko spyware.";
        }

        setMessages((prev) => [...prev, { role: 'model', text: fallbackReply }]);
      }
    } catch (err) {
      // Graceful offline fallback
      const fallbackReplies = [
        "Halo! Mode Craft AI Offline aktif. Pastikan Anda mengunduh launcher resmi seperti Prism Launcher atau XMCL untuk keamanan maksimal.",
        "Untuk laptop kentang, gunakan SKLauncher dengan mod Sodium agar game berjalan sangat mulus."
      ];
      const reply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
      setMessages((prev) => [...prev, { role: 'model', text: reply }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl rounded-3xl border border-emerald-500/30 bg-neutral-900/95 shadow-2xl backdrop-blur-2xl flex flex-col h-[85vh] sm:h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4 bg-neutral-950/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-600/30 overflow-hidden border border-emerald-500/50">
              <img src="/assets/aistudio/image_623e557a.png" alt="Craft AI" className="h-full w-full object-cover" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Craft AI Assistant</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800 font-mono">
                  Gemini 2.5 Flash
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Tanya apa saja tentang Minecraft, mod, optimasi, & keamanan launcher
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="bg-neutral-950/50 border-b border-neutral-800/60 px-4 py-2.5 flex items-center gap-2 overflow-x-auto shrink-0 text-xs">
          <span className="text-neutral-500 font-medium shrink-0">Contoh Tanya:</span>
          {[
            'Launcher apa yang paling ringan untuk laptop RAM 4GB?',
            'Apa bedanya TLauncher asli dan palsu (TLMedia)?',
            'Bagaimana cara pasang skin Ely.by di XMCL?',
            'Rekomendasi modpack ringan untuk survival'
          ].map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(suggestion)}
              className="rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-neutral-300 hover:border-emerald-500 hover:text-emerald-300 transition-all shrink-0 whitespace-nowrap"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-md overflow-hidden ${
                  msg.role === 'user'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-800 border border-neutral-700'
                }`}
              >
                {msg.role === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <img src="/assets/aistudio/image_623e557a.png" alt="Craft AI" className="h-full w-full object-cover" />
                )}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-neutral-800/90 border border-neutral-700/80 text-neutral-200 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-800 border border-neutral-700 overflow-hidden shadow-md">
                <img src="/assets/aistudio/image_623e557a.png" alt="Craft AI" className="h-full w-full object-cover" />
              </div>
              <div className="rounded-2xl rounded-tl-none bg-neutral-800/90 border border-neutral-700 px-4 py-3 text-xs text-neutral-400 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
                <span>Craft AI sedang meracik jawaban...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Footer Input Bar */}
        <div className="border-t border-neutral-800 bg-neutral-950 p-4 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Tanyakan soal launcher, spesifikasi, atau tips game..."
              className="flex-1 rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-950 shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <div className="text-[10px] text-neutral-500 text-center mt-2">
            Craft AI didukung oleh Google Gemini. Selalu verifikasi rekomendasi keamanan.
          </div>
        </div>
      </div>
    </div>
  );
};
