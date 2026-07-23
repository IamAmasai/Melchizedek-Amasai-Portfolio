import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Terminal AI Endpoint
  app.post("/api/terminal", async (req, res) => {
    try {
      const { prompt, history } = req.body;
      
      const systemInstruction = `You are the Ansai Agent, a systems-engineering AI integrated into the developer portfolio of the Founder & CEO of Ansai Technologies.
Your communication style is concise, terminal-like, and highly technical. Use monospace formatting for emphasis where appropriate. 
Topics you are an expert on:
- EduManage (School DNA model, local-first data, strict structural compliance).
- Constitutional Governance for Autonomous Coding Agents (3-tier rule architecture, enforce-versus-know).
- Physical Edge Cloud (ZFS, 3-2-1 backup, mesh replication).
- Utu Engineering Protocol (human-centric resilience, designing for structural empathy and network loss).
Keep responses under 3 sentences unless specifically asked for a detailed breakdown.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: [
          { role: "user", parts: [{ text: systemInstruction }] },
          { role: "model", parts: [{ text: "Acknowledged. Grounding layer active." }] },
          // Include recent history for context
          ...history.map((msg: any) => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          })),
          { role: "user", parts: [{ text: prompt }] }
        ]
      });

      res.json({ reply: response.text });
    } catch (error) {
      console.error("AI Error:", error);
      res.status(500).json({ reply: "ERR_SYSTEM_FAULT: Unable to reach grounding layer." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
