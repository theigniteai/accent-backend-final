import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { initWebSocket } from "./websocket.js";


// Route imports
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import aiRoutes from "./routes/ai.js";
import callRoutes from "./routes/calls.js";

dotenv.config();
const app = express();
const server = http.createServer(app); // For WebSocket

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => res.send("🟢 AccentShift API is running"));

// Mount routers
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/calls", callRoutes);

// Initialize WebSocket
initWebSocket(server);

const PORT = process.env.PORT || 10000;
server.listen(PORT, () =>
  console.log(`✅ API + WebSocket server listening on port ${PORT}`)
);
