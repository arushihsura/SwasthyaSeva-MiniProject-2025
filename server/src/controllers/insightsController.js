// controllers/insightsController.js

import Insight from "../models/insight.js";
import Profile from "../models/HealthProfile.js";

// 🧠 Generate or add an insight (e.g. from ML model or stats)
export const addInsight = async (req, res) => {
  try {
    const { profileId, type, message, data } = req.body;

    if (!profileId || !type || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const insight = await Insight.create({
      profile: profileId,
      type,
      message,
      data,
      createdAt: new Date(),
    });

    res.status(201).json(insight);
  } catch (error) {
    console.error("Error adding insight:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📋 Get all insights for a profile
export const getInsightsByProfile = async (req, res) => {
  try {
    const { profileId } = req.params;

    const insights = await Insight.find({ profile: profileId }).sort({
      createdAt: -1,
    });

    res.status(200).json(insights);
  } catch (error) {
    console.error("Error fetching insights:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🧾 Get one insight by ID
export const getInsightById = async (req, res) => {
  try {
    const { id } = req.params;
    const insight = await Insight.findById(id);

    if (!insight) {
      return res.status(404).json({ message: "Insight not found" });
    }

    res.status(200).json(insight);
  } catch (error) {
    console.error("Error fetching insight:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ❌ Delete one insight
export const deleteInsight = async (req, res) => {
  try {
    const { id } = req.params;
    const insight = await Insight.findByIdAndDelete(id);

    if (!insight) {
      return res.status(404).json({ message: "Insight not found" });
    }

    res.status(200).json({ message: "Insight deleted successfully" });
  } catch (error) {
    console.error("Error deleting insight:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🧹 Delete all insights for a profile
export const deleteProfileInsights = async (req, res) => {
  try {
    const { profileId } = req.params;
    await Insight.deleteMany({ profile: profileId });
    res.status(200).json({ message: "All insights deleted for this profile" });
  } catch (error) {
    console.error("Error deleting profile insights:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
