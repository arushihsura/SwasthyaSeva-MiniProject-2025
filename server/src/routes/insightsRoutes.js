import express from "express";
import {
  getInsights,
  addInsight,
  deleteInsight,
  getLatestInsight,
} from "../controllers/insightsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   GET /api/insights/profile/:profileId
router.get("/profile/:profileId", protect, getInsights);

// @route   GET /api/insights/latest/:profileId
router.get("/latest/:profileId", protect, getLatestInsight);

// @route   POST /api/insights/add
router.post("/add", protect, addInsight);

// @route   DELETE /api/insights/:insightId
router.delete("/:insightId", protect, deleteInsight);

export default router;
