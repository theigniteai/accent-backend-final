// server.js (backend root)

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

// TEMPORARY: allow all origins for testing
app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));
app.options("*", cors());

app.use(express.json());
await connectDB();

app.get("/", (req, res) => res.send("API running"));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/calls", callRoutes);

const PORT = process.env.PORT||10000;
app.listen(PORT, ()=>console.log(`🚀 Listening on ${PORT}`));
