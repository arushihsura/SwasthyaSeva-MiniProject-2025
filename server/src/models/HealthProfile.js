import mongoose from "mongoose";

const healthProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  height: { type: Number, required: true }, // in cm
  weight: { type: Number, required: true }, // in kg
  healthConditions: [{ type: String }],
}, { timestamps: true });

export default mongoose.model("HealthProfile", healthProfileSchema);
