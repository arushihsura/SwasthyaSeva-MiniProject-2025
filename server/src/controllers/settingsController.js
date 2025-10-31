import Settings from "../models/Settings.js";


// ⚙️ Create or update user settings
export const updateSettings = async (req, res) => {
  try {
    const { theme, notifications, syncEnabled, offlineMode } = req.body;

    let settings = await Settings.findOne({ user: req.user.id });
    if (!settings) {
      settings = new Settings({
        user: req.user.id,
        theme: theme || "light",
        notifications: notifications || true,
        syncEnabled: syncEnabled || true,
        offlineMode: offlineMode || false,
      });
    } else {
      if (theme !== undefined) settings.theme = theme;
      if (notifications !== undefined) settings.notifications = notifications;
      if (syncEnabled !== undefined) settings.syncEnabled = syncEnabled;
      if (offlineMode !== undefined) settings.offlineMode = offlineMode;
    }

    await settings.save();
    res.status(200).json({ message: "Settings updated", data: settings });
  } catch (error) {
    console.error("Error updating settings:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📋 Get current user settings
export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne({ user: req.user.id });
    if (!settings) {
      return res.status(404).json({ message: "No settings found" });
    }
    res.status(200).json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🔄 Reset settings to default
export const resetSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({ user: req.user.id });
    if (!settings) {
      return res.status(404).json({ message: "No settings found to reset" });
    }

    settings.theme = "light";
    settings.notifications = true;
    settings.syncEnabled = true;
    settings.offlineMode = false;

    await settings.save();
    res.status(200).json({ message: "Settings reset to default", data: settings });
  } catch (error) {
    console.error("Error resetting settings:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
