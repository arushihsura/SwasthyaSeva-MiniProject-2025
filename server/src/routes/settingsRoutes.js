import express from "express";
import {
  getSettings,
  updateSettings,
  resetSettings,
} from "../controllers/settingsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   GET /api/settings/get
router.get("/get", protect, getSettings);

// @route   PUT /api/settings/update
router.put("/update", protect, updateSettings);

// @route   DELETE /api/settings/reset
router.delete("/reset", protect, resetSettings);

export default router;
