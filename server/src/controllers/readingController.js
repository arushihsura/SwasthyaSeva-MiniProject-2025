// controllers/readingController.js

import Reading from "../models/Reading.js";
import Profile from "../models/HealthProfile.js";

// ➕ Add a new reading
export const addReading = async (req, res) => {
  try {
    const { profileId, type, value } = req.body;

    if (!profileId || !type || value === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Optional: verify user owns the profile (if auth is implemented)
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const reading = await Reading.create({
      profile: profileId,
      type,
      value,
      timestamp: new Date(),
    });

    res.status(201).json(reading);
  } catch (error) {
    console.error("Error adding reading:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📄 Get all readings for a profile
export const getReadings = async (req, res) => {
  try {
    const readings = await Reading.find({ profile: req.params.profileId }).sort({
      timestamp: -1,
    });
    res.status(200).json(readings);
  } catch (error) {
    console.error("Error fetching readings:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🔍 Get the latest reading for a profile
export const getLatestReading = async (req, res) => {
  try {
    const latest = await Reading.findOne({ profile: req.params.profileId })
      .sort({ timestamp: -1 })
      .limit(1);
    res.status(200).json(latest || {});
  } catch (error) {
    console.error("Error fetching latest reading:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ❌ Delete a single reading
export const deleteReading = async (req, res) => {
  try {
    const { readingId } = req.params;
    const reading = await Reading.findByIdAndDelete(readingId);
    if (!reading) {
      return res.status(404).json({ message: "Reading not found" });
    }
    res.status(200).json({ message: "Reading deleted successfully" });
  } catch (error) {
    console.error("Error deleting reading:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🧹 Delete all readings for a profile
export const deleteProfileReadings = async (req, res) => {
  try {
    const { profileId } = req.params;
    await Reading.deleteMany({ profile: profileId });
    res.status(200).json({ message: "All readings deleted for this profile" });
  } catch (error) {
    console.error("Error deleting profile readings:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
