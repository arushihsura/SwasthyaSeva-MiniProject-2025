// models/settingsModel.js
import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  theme: {
    type: String,
    enum: ["light", "dark"],
    default: "light",
  },
  notifications: {
    type: Boolean,
    default: true,
  },
  syncEnabled: {
    type: Boolean,
    default: true,
  },
  offlineMode: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Settings", settingsSchema);
