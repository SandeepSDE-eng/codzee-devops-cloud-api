import express, { Application } from "express";
import cors from "cors";
import healthRoutes from "./routes/healthRoutes";
import taskRoutes from "./routes/taskRoutes";
import { config } from "./config/environment";
import { errorHandler } from "./middleware/errorHandler";
import { rateLimiter } from "./middleware/rateLimiter";

const app: Application = express();

// Security Headers Middleware
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  next();
});

// Rate limiting & CORS protection
app.use(rateLimiter);
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json({ limit: "10kb" })); // Body size limit to prevent memory exhaustion
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Observability and Health Probes
app.use("/health", healthRoutes);

// Core API Routes
app.use(`${config.apiPrefix}/tasks`, taskRoutes);

// 404 Fallback Handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Resource not found" });
});

// Centralized Error Handling Middleware (must be registered last)
app.use(errorHandler);

export default app;
