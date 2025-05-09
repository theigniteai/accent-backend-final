// server.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import callRoutes from "./routes/callRoutes.js";

dotenv.config();

const app = express();

// ─── CORS CONFIGURATION ────────────────────────────────────────────────────────
// Frontend origin (must match exactly what you set on Vercel / Render)
const FRONTEND_URL =
  process.env.FRONTEND_URL ||
  "https://accent-frontend-dashboard.vercel.app";

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
// Handle preflight OPTIONS for all routes
app.options("*", cors());

// ─── MIDDLEWARES ────────────────────────────────────────────────────────────────
app.use(express.json());

// ─── DATABASE CONNECTION ────────────────────────────────────────────────────────
connectDB()
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ─── ROUTES ─────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => res.send("AccentShift API is running..."));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/calls", callRoutes);

// ─── START SERVER ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
