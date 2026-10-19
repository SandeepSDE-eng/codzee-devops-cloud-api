import { Router, Request, Response } from "express";

const router = Router();

router.get("/live", (_req: Request, res: Response) => {
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});

router.get("/ready", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "READY",
    uptimeSeconds: Math.floor(process.uptime()),
    memoryUsageMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
  });
});

export default router;
