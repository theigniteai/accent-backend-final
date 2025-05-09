// user schema with assistantEnabled, voiceId
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  assistantEnabled: { type: Boolean, default: false },
  voiceId: String,
  subscription: { type: String, default: "Free" }
}, {
  timestamps: true
});

export default mongoose.model("User", userSchema);
