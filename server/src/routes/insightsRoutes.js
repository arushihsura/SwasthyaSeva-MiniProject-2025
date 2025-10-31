import express from "express";
import {
  addInsight,
  getInsightsByProfile,
  getInsightById,
  deleteInsight,
  deleteProfileInsights,
} from "../controllers/insightsController.js";

const router = express.Router();

router.post("/", addInsight); // Add an insight
router.get("/:profileId", getInsightsByProfile); // Get all insights for profile
router.get("/single/:id", getInsightById); // Get single insight
router.delete("/:id", deleteInsight); // Delete one insight
router.delete("/profile/:profileId", deleteProfileInsights); // Delete all for profile

export default router;
