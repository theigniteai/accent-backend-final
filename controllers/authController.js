// // signup, login, otp handlers
// export const signup = async (req, res) => {
//   // Save user to database (hash password, etc.)
//   res.status(201).json({ message: "User registered (demo)" });
// };

// export const login = async (req, res) => {
//   // Verify user and return token
//   res.status(200).json({ message: "Login success (demo)", token: "demo-token" });
// };

// export const sendOtp = async (req, res) => {
//   // Generate and send OTP via email/SMS
//   res.status(200).json({ message: "OTP sent (demo)" });
// };

import bcrypt from "bcrypt";
import User from "../models/User.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
};
