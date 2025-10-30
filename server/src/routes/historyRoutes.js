import express from "express";
import { getHistory } from "../controllers/historyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   GET /api/history/profile/:profileId
router.get("/profile/:profileId", protect, getHistory);

export default router;
