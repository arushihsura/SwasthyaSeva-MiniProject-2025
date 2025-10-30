import Insight from "../models/Insight.js";

export const getInsights = async (req, res) => {
  const insights = await Insight.find({ profile: req.params.profileId });
  res.json(insights);
};

export const addInsight = async (req, res) => {
  const insight = await Insight.create(req.body);
  res.json(insight);
};
