import Settings from "../models/Settings.js";

export const getSettings = async (req, res) => {
  const settings = await Settings.findOne({ user: req.user._id });
  res.json(settings || {});
};

export const updateSettings = async (req, res) => {
  const settings = await Settings.findOneAndUpdate(
    { user: req.user._id },
    req.body,
    { new: true, upsert: true }
  );
  res.json(settings);
};
