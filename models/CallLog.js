// stores call logs for accent changer
import mongoose from "mongoose";

const callLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  accentUsed: String,
  duration: Number,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("CallLog", callLogSchema);
