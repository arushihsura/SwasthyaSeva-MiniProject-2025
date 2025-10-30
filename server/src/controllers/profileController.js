import HealthProfile from "../models/HealthProfile.js";

// Create a new profile
export const createProfile = async (req, res) => {
  try {
    const { name, age, gender, height, weight, healthConditions } = req.body;
    const profile = await HealthProfile.create({
      user: req.user._id,
      name,
      age,
      gender,
      height,
      weight,
      healthConditions,
    });
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all profiles for a user
export const getProfiles = async (req, res) => {
  try {
    const profiles = await HealthProfile.find({ user: req.user._id });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single profile by ID
export const getProfileById = async (req, res) => {
  try {
    const profile = await HealthProfile.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a profile
export const updateProfile = async (req, res) => {
  try {
    const { name, age, gender, height, weight, healthConditions } = req.body;

    const profile = await HealthProfile.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    profile.name = name || profile.name;
    profile.age = age || profile.age;
    profile.gender = gender || profile.gender;
    profile.height = height || profile.height;
    profile.weight = weight || profile.weight;
    profile.healthConditions = healthConditions || profile.healthConditions;

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a profile
export const deleteProfile = async (req, res) => {
  try {
    const profile = await HealthProfile.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    await HealthProfile.deleteOne({ _id: req.params.id });
    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Set active profile (store in user session or return profile data)
export const setActiveProfile = async (req, res) => {
  try {
    const profile = await HealthProfile.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Return the full profile data
    res.json({
      message: "Profile selected successfully",
      profile: profile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};