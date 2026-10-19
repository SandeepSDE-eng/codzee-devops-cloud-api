import { Router, Request, Response } from "express";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ success: false, message: "Email and password are required" });
    return;
  }

  // Generate mock JWT token for evaluation
  const token = email.includes("admin") ? "jwt-token-admin-role-sample" : "jwt-token-dev-role-sample";
  res.status(200).json({
    success: true,
    message: "Authentication successful",
    token,
    user: { email, role: email.includes("admin") ? "ADMIN" : "DEVELOPER" },
  });
});

export default router;
