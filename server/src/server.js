import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import readingRoutes from "./routes/readingRoutes.js";
import insightsRoutes from "./routes/insightsRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/readings", readingRoutes);
app.use("/api/insights", insightsRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/history", historyRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on http://0.0.0.0:${PORT}`)
);
