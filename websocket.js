import { WebSocketServer } from "ws";
import http from "http";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { ElevenLabsClient } from "elevenlabs";

const elevenlabs = new ElevenLabsClient({ apiKey: process.env.ELEVEN_API_KEY });

export const initWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    let audioChunks = [];
    let selectedAccent = "us";

    ws.on("message", async (message) => {
      if (typeof message === "string") {
        const data = JSON.parse(message);
        if (data.type === "start") {
          selectedAccent = data.accent || "us";
        }
        if (data.type === "stop") {
          const wavFile = Buffer.concat(audioChunks);
          const mp3 = await elevenlabs.textToSpeech.convertFromRaw(wavFile, selectedAccent);
          ws.send(mp3);
        }
      } else {
        audioChunks.push(message);
      }
    });

    ws.on("close", () => {
      audioChunks = [];
    });
  });

  console.log("✅ WebSocket Server Initialized");
};
