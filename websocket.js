
import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";
import { ElevenLabsClient } from "elevenlabs";
import dotenv from "dotenv";

dotenv.config();

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVEN_API_KEY,
});

export const initWebSocket = (server) => {
  const wss = new WebSocketServer({ server });
  console.log("✅ WebSocket server initialized");

  wss.on("connection", (ws) => {
    const clientId = uuidv4();
    console.log("🔗 Client connected:", clientId);

    let userAccent = "us";
    let audioChunks = [];

    ws.on("message", async (message, isBinary) => {
      try {
        if (!isBinary) {
          const json = JSON.parse(message.toString());
          if (json.type === "start") {
            userAccent = json.accent || "us";
            audioChunks = [];
            return;
          }
          if (json.type === "stop") {
            const voiceId = getVoiceId(userAccent);
            const response = await elevenlabs.textToSpeech.convert({
              voiceId,
              modelId: "eleven_multilingual_v2",
              text: "This is your real-time accent response.",
              voiceSettings: {
                stability: 0.4,
                similarityBoost: 0.8,
              },
            });

            const buffer = Buffer.from(await response.arrayBuffer());
            ws.send(buffer);
            return;
          }
        }

        // Binary audio data
        audioChunks.push(message);
      } catch (error) {
        console.error("❌ WebSocket Error:", error.message);
        ws.send(JSON.stringify({ error: error.message }));
      }
    });

    ws.on("close", () => {
      console.log("❌ Client disconnected:", clientId);
    });
  });
};

function getVoiceId(accent) {
  switch (accent) {
    case "us":
      return "21m00Tcm4TlvDq8ikWAM";
    case "uk":
      return "TxGEqnHWrfWFTfGW9XjX";
    case "au":
    case "aus":
      return "EXAVITQu4vr4xnSDxMaL";
    case "in":
      return "mfFjJ73L9YOJqHiA1ogq"; // hypothetical Indian accent
    default:
      return "21m00Tcm4TlvDq8ikWAM";
  }
}
