import { Request, Response, NextFunction } from "express";

interface RateLimitStore {
  [ip: string]: { count: number; resetTime: number };
}

const memoryStore: RateLimitStore = {};
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100;

export const rateLimiter = (req: Request, res: Response, next: NextFunction): void => {
  const clientIp = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();

  if (!memoryStore[clientIp] || now > memoryStore[clientIp].resetTime) {
    memoryStore[clientIp] = { count: 1, resetTime: now + WINDOW_MS };
    res.setHeader("X-RateLimit-Limit", MAX_REQUESTS);
    res.setHeader("X-RateLimit-Remaining", MAX_REQUESTS - 1);
    return next();
  }

  memoryStore[clientIp].count += 1;
  const remaining = Math.max(0, MAX_REQUESTS - memoryStore[clientIp].count);
  res.setHeader("X-RateLimit-Limit", MAX_REQUESTS);
  res.setHeader("X-RateLimit-Remaining", remaining);

  if (memoryStore[clientIp].count > MAX_REQUESTS) {
    res.status(429).json({
      success: false,
      message: "Too many requests from this IP. Please try again after 15 minutes.",
      retryAfterSeconds: Math.ceil((memoryStore[clientIp].resetTime - now) / 1000),
    });
    return;
  }

  next();
};
