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
        console.log("📦 Audio buffer received from frontend:", audioBuffer.length);

        const audioStream = Readable.from(audioBuffer);

        try {
          const transcript = await openai.audio.transcriptions.create({
            file: audioStream,
            model: "whisper-1"
          });

          const text = transcript.text;
          console.log("📝 Transcribed Text:", text);

          const tts = await elevenlabs.textToSpeech.convert({
            voiceId: 'EXAVITQu4vr4xnSDxMaL',
            modelId: "eleven_multilingual_v2",
            text,
            voiceSettings: {
              stability: 0.4,
              similarityBoost: 0.8
            }
          });

          const arrayBuffer = await tts.arrayBuffer();
          const audio = Buffer.from(arrayBuffer);
          console.log("✅ Sending audio buffer of size:", audio.length);

          socket.send(audio);
        } catch (error) {
          console.error('❌ Error during speech processing:', error.message);
          socket.send(JSON.stringify({ error: error.message }));
        }

        audioChunks = [];
      } else {
        audioChunks.push(message);
      }
    });

    socket.on('close', () => console.log('❌ WebSocket closed'));
  });
}
