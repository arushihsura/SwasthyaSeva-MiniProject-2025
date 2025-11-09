import express from "express";
import {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
  setActiveProfile,
} from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// IMPORTANT: Specific routes MUST come BEFORE dynamic routes (:id)

// @route   POST /api/profiles/create
router.post("/create", protect, createProfile);

// @route   GET /api/profiles/all (MUST be before /:id)
router.get("/all", protect, getProfiles);

// @route   POST /api/profiles/:id/activate (MUST be before /:id)
router.post("/:id/activate", protect, setActiveProfile);

// Dynamic routes with :id come LAST
// @route   GET /api/profiles/:id
router.get("/:id", protect, getProfileById);

// @route   PUT /api/profiles/:id
router.put("/:id", protect, updateProfile);

// @route   DELETE /api/profiles/:id
router.delete("/:id", protect, deleteProfile);

export default router;