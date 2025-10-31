import express from "express";
import {
  addReading,
  getReadings,
  getLatestReading,
  deleteReading,
  deleteProfileReadings,
} from "../controllers/readingController.js";

const router = express.Router();

router.post("/", addReading); // Add a new reading
router.get("/:profileId", getReadings); // Get all readings of profile
router.get("/latest/:profileId", getLatestReading); // Get latest
router.delete("/:readingId", deleteReading); // Delete one reading
router.delete("/profile/:profileId", deleteProfileReadings); // Delete all readings for a profile

export default router;
