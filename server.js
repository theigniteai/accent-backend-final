// server.js (in your _backend_ folder)

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

// ─── MANUAL CORS HEADERS ─────────────────────────────────────────────────────────
// Put this before any other middleware or routes
app.use((req, res, next) => {
  // Allow your frontend’s exact origin or '*' for testing
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://accent-frontend-dashboard.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization"
  );
  // If you need to send cookies/auth, also do:
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    // short-circuit preflight
    return res.sendStatus(204);
  }
  next();
});

// ─── EXPRESS & CORS ──────────────────────────────────────────────────────────────
app.use(cors());        // you can even remove your previous cors(...) block
app.use(express.json());

// ─── DB + ROUTES ────────────────────────────────────────────────────────────────
connectDB().then(() => console.log("✅ MongoDB connected"));

app.get("/", (req, res) => res.send("AccentShift API is running..."));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/calls", callRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
