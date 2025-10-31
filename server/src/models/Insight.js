// models/insightModel.js
import mongoose from "mongoose";

const insightSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  type: {
    type: String, // e.g., "stress", "sleep", "heart"
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  data: {
    type: Object, // can hold ML output or stats
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Insight", insightSchema);
