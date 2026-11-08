import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Gemini API client for Craft AI
// AI Studio automatically injects GEMINI_API_KEY environment variable.
const ai = new GoogleGenAI({
  apiKey: process.mainModule ? process.env.GEMINI_API_KEY : process.env.GEMINI_API_KEY
});

// API endpoint for Craft AI Minecraft Assistant
app.post('/api/craft-ai', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemInstruction = `
Kamu adalah "Craft AI", asisten AI resmi yang cerdas, ramah, dan ahli dalam ekosistem Minecraft Java Edition, peluncur (launcher) game, modding (Fabric, Forge, NeoForge, Quilt), optimasi FPS untuk laptop kentang (low-end PC), dan keamanan siber (mendeteksi TLauncher palsu, spyware, dan virus). 
Jawablah dengan bahasa Indonesia yang santai, akurat, informatif, dan membantu. Sediakan rekomendasi launcher terbaik seperti XMCL, SKLauncher, Prism Launcher, atau Modrinth sesuai kebutuhan pengguna.
`;

    // Construct contents with history
    const contents = [];
    if (history && Array.isArray(history)) {
      for (const h of history) {
        contents.push({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        });
      }
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    });

    const reply = response.text || 'Maaf, Craft AI sedang sibuk merajut balok Minecraft. Silakan coba lagi!';
    res.json({ reply });
  } catch (error: any) {
    console.error('Craft AI Error:', error);
    res.status(500).json({ 
      error: 'Gagal menghubungi Craft AI', 
      details: error.message || 'Unknown error' 
    });
  }
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(import.meta.dirname, 'dist')));
  }

  const PORT = Number(process.env.PORT || 3000);
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MineLaunch Hub Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
