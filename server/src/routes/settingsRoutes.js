// routes/settingsRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  updateSettings,
  getSettings,
  resetSettings,
} from "../controllers/settingsController.js";

const router = express.Router();

router.get("/", protect, getSettings);
router.put("/", protect, updateSettings);
router.post("/reset", protect, resetSettings);

export default router;
