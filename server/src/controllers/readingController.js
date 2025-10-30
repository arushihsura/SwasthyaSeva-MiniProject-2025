import Reading from "../models/Reading.js";

export const addReading = async (req, res) => {
  const reading = await Reading.create(req.body);
  res.json(reading);
};

export const getReadings = async (req, res) => {
  const readings = await Reading.find({ profile: req.params.profileId });
  res.json(readings);
};
