// models/historyModel.js

import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  heartRate: { type: Number, required: true },
  gsr: { type: Number, required: true },
  stressIndex: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("History", historySchema);
