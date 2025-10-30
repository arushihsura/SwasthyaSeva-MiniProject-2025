import mongoose from "mongoose";

const readingSchema = new mongoose.Schema({
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  type: { type: String, enum: ["heartRate", "gsr", "temperature"], required: true },
  value: Number,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Reading", readingSchema);
