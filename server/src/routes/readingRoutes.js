import express from "express";
import {
  addReading,
  getReadings,
  getLatestReading,
  deleteReading,
  deleteProfileReadings,
} from "../controllers/readingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/readings/add
router.post("/add", protect, addReading);

// @route   GET /api/readings/profile/:profileId
router.get("/profile/:profileId", protect, getReadings);

// @route   GET /api/readings/latest/:profileId
router.get("/latest/:profileId", protect, getLatestReading);

// @route   DELETE /api/readings/:readingId
router.delete("/:readingId", protect, deleteReading);

// @route   DELETE /api/readings/profile/:profileId
router.delete("/profile/:profileId", protect, deleteProfileReadings);

export default router;
