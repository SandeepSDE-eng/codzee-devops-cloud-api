import { Request, Response, NextFunction } from "express";

export interface AuthenticatedUser {
  userId: string;
  email: string;
  role: "ADMIN" | "DEVELOPER" | "VIEWER";
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "codzee-assessment-super-secret-key-2026";

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    res.status(401).json({ success: false, message: "Access denied. Authentication token missing." });
    return;
  }

  try {
    // In production, verify using jsonwebtoken library: jwt.verify(token, JWT_SECRET)
    // Simulating decoded token payload:
    if (token === "invalid-token") {
      res.status(403).json({ success: false, message: "Invalid or expired authentication token." });
      return;
    }

    req.user = {
      userId: "usr_9981",
      email: "sandeepengineering03@gmail.com",
      role: token.includes("admin") ? "ADMIN" : "DEVELOPER",
    };

    next();
  } catch (error) {
    res.status(403).json({ success: false, message: "Failed to authenticate token." });
  }
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Forbidden: Requires one of [${allowedRoles.join(", ")}] roles.`,
      });
      return;
    }
    next();
  };
};
