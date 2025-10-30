import mongoose from "mongoose";

const insightSchema = new mongoose.Schema({
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  summary: String,
  recommendation: String,
  riskLevel: { type: String, enum: ["low", "medium", "high"] },
  generatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Insight", insightSchema);
