import { WebSocketServer } from 'ws';
import { Readable } from 'stream';
import { ElevenLabsClient } from 'elevenlabs';
import OpenAI from 'openai';

const elevenlabs = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export function initWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (socket) => {
    console.log('🔌 WebSocket connected');

    let audioChunks = [];

    socket.on('message', async (message) => {
      if (message === 'stop') {
        console.log('🛑 Received stop signal');
        const audioBuffer = Buffer.concat(audioChunks);
        const audioStream = Readable.from(audioBuffer);

        try {
          const transcript = await openai.audio.transcriptions.create({
            file: audioStream,
            model: "whisper-1",
          });

          const text = transcript.text;
          console.log("🎙️ Transcribed Text:", text);

          const tts = await elevenlabs.textToSpeech.convert({
            voiceId: 'EXAVITQu4vr4xnSDxMaL', // Replace with your voice ID
            text,
          });

          const audio = Buffer.from(await tts.arrayBuffer());

          // Send audio as base64 string
          socket.send(
            JSON.stringify({
              type: 'audio',
              audio: audio.toString('base64'),
            })
          );

        } catch (error) {
          console.error("❌ Error:", error.message);
          socket.send(JSON.stringify({ type: "error", message: error.message }));
        }

        audioChunks = [];
      } else {
        audioChunks.push(message);
      }
    });

    socket.on('close', () => console.log('❌ WebSocket closed'));
  });
}
