import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { initWebSocket } from "./websocket.js"; // <- real-time accent changer handler

// route imports
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import aiRoutes from "./routes/ai.js";
import callRoutes from "./routes/calls.js";

dotenv.config();
const app = express();
const server = http.createServer(app); // create HTTP server for WebSocket use

// Middleware
app.use(cors({ origin: "*", methods: ["GET", "POST"], credentials: true }));
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.send("🟢 AccentShift API is running (WebSocket + REST)");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/calls", callRoutes);

// WebSocket Setup
initWebSocket(server); // initializes WebSocket server on same HTTP port

// Start server
const PORT = process.env.PORT || 10000;
server.listen(PORT, () =>
  console.log(`✅ AccentShift backend running on port ${PORT} (WebSocket + REST)`)
);
