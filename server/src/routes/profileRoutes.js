import express from "express";
import {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
} from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/profiles/create
router.post("/create", protect, createProfile);

// @route   GET /api/profiles/all
router.get("/all", protect, getProfiles);

// @route   GET /api/profiles/:id
router.get("/:id", protect, getProfileById);

// @route   PUT /api/profiles/:id
router.put("/:id", protect, updateProfile);

// @route   DELETE /api/profiles/:id
router.delete("/:id", protect, deleteProfile);

export default router;
