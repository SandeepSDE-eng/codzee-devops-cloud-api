import express, { Application } from "express";
import cors from "cors";
import healthRoutes from "./routes/healthRoutes";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";
import { config } from "./config/environment";

const app: Application = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Observability and Health Probes
app.use("/health", healthRoutes);

// Auth & Tasks API Routes
app.use(`${config.apiPrefix}/auth`, authRoutes);
app.use(`${config.apiPrefix}/tasks`, taskRoutes);

// 404 Fallback Handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Resource not found" });
});

export default app;
