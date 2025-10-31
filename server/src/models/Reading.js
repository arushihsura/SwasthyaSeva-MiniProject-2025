import mongoose from "mongoose";

const readingSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  type: {
    type: String,
    enum: ["heartRate", "gsr", "temperature", "spo2", "other"],
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Reading", readingSchema);
