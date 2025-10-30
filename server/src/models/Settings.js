import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  notificationsEnabled: { type: Boolean, default: true },
  theme: { type: String, enum: ["light", "dark"], default: "light" },
  syncEnabled: { type: Boolean, default: true },
  preferredLanguage: { type: String, default: "en" },
});

export default mongoose.model("Settings", settingsSchema);
