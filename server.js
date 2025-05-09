// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import callRoutes from "./routes/callRoutes.js";

import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Wrap startup in an async function
const startServer = async () => {
  try {
    // 1) Connect to MongoDB
    await connectDB();
    console.log("✅ MongoDB connected");

    // 2) Auto-seed default admin user
    const testEmail = "admin@accentshift.com";
    const testPassword = "Admin@123";
    const existing = await User.findOne({ email: testEmail });

    if (!existing) {
      const hash = await bcrypt.hash(testPassword, 10);
      await User.create({
        name: "Admin User",
        email: testEmail,
        password: hash,
      });
      console.log(`🛠 Created default user → ${testEmail} / ${testPassword}`);
    } else {
      console.log(`🔑 Default user already exists → ${testEmail}`);
    }

    // 3) Define routes
    app.get("/", (req, res) => res.send("AccentShift API is running..."));
    app.use("/api/auth", authRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/ai", aiRoutes);
    app.use("/api/calls", callRoutes);

    // 4) Start listening
    const PORT = process.env.PORT || 10000;
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
