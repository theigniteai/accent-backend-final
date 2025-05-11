import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// route imports
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import aiRoutes   from "./routes/ai.js";
import callRoutes from "./routes/calls.js";

// import { initWebSocket } from "./websocket.js"; // ✅ IMPORTANT


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("🟢 AccentShift Stub API running");
});

// mount all routers under /api
app.use("/api/auth",       authRoutes);
app.use("/api/users",      userRoutes);
app.use("/api/ai",         aiRoutes);
app.use("/api/calls",      callRoutes);

const PORT = process.env.PORT || 10000;
const server = app.listen(PORT, () =>
  console.log(`✅ AccentShift backend running on port ${PORT}`)
);


