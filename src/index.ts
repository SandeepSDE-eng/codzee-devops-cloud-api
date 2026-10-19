import app from "./app";
import { config } from "./config/environment";

const server = app.listen(config.port, () => {
  console.log(`[CloudAPI] Server running in ${config.env} mode on port ${config.port}`);
  console.log(`[CloudAPI] Health Check: http://localhost:${config.port}/health/ready`);
  console.log(`[CloudAPI] Task API: http://localhost:${config.port}${config.apiPrefix}/tasks`);
});

// Graceful Shutdown
process.on("SIGTERM", () => {
  console.log("[CloudAPI] SIGTERM received. Initiating graceful shutdown...");
  server.close(() => {
    console.log("[CloudAPI] HTTP server closed. Exiting process.");
    process.exit(0);
  });
});
