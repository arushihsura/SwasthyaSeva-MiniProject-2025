// routes/historyRoutes.js

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addHistory,
  getHistoryByProfile,
  deleteHistory,
} from "../controllers/historyController.js";

const router = express.Router();

router.post("/", protect, addHistory); // Add record
router.get("/:profileId", protect, getHistoryByProfile); // Fetch by profile
router.delete("/:id", protect, deleteHistory); // Delete record

export default router;
