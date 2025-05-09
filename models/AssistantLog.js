// stores AI assistant logs
import mongoose from "mongoose";

const assistantLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  prompt: String,
  response: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("AssistantLog", assistantLogSchema);
