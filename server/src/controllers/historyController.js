// controllers/historyController.js

import History from "../models/historyModel.js";
import Profile from "../models/HealthProfile.js";

// 🩺 Create a new health record (Heart Rate, Stress, etc.)
export const addHistory = async (req, res) => {
  try {
    const { profileId, heartRate, gsr, stressIndex, timestamp } = req.body;

    if (!profileId || !heartRate || !gsr || !stressIndex) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Verify profile belongs to current user
    const profile = await Profile.findOne({ _id: profileId, user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found or unauthorized." });
    }

    const newRecord = new History({
      user: req.user.id,
      profile: profileId,
      heartRate,
      gsr,
      stressIndex,
      timestamp: timestamp || new Date(),
    });

    await newRecord.save();
    res.status(201).json({ message: "Health record added successfully", data: newRecord });
  } catch (error) {
    console.error("Error adding history:", error);
    res.status(500).json({ message: "Server error while adding history", error: error.message });
  }
};

// 📜 Fetch all history records for a given profile
export const getHistoryByProfile = async (req, res) => {
  try {
    const { profileId } = req.params;

    const profile = await Profile.findOne({ _id: profileId, user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found or unauthorized." });
    }

    const records = await History.find({ profile: profileId })
      .sort({ timestamp: -1 })
      .limit(50); // Limit to 50 recent entries

    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ message: "Error fetching health history", error: error.message });
  }
};

// 🧹 Delete a specific history record
export const deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await History.findOne({ _id: id, user: req.user.id });
    if (!record) {
      return res.status(404).json({ message: "Record not found or unauthorized." });
    }

    await record.deleteOne();
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting history:", error);
    res.status(500).json({ message: "Error deleting record", error: error.message });
  }
};
