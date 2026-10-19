import { Router } from "express";
import { taskController } from "../controllers/taskController";
import { authenticateToken, requireRole } from "../middleware/authMiddleware";
import { validateCreateTaskInput } from "../schemas/taskSchema";

const router = Router();

// Public: list and read tasks
router.get("/", (req, res) => taskController.getTasks(req, res));
router.get("/:id", (req, res) => taskController.getTaskById(req, res));

// Protected: create task requires valid auth token and body validation
router.post(
  "/",
  authenticateToken,
  (req, res, next) => {
    const validation = validateCreateTaskInput(req.body);
    if (!validation.isValid) {
      res.status(400).json({ success: false, errors: validation.errors });
      return;
    }
    next();
  },
  (req, res) => taskController.createTask(req, res)
);

// Protected: update requires DEVELOPER or ADMIN
router.put("/:id", authenticateToken, requireRole(["ADMIN", "DEVELOPER"]), (req, res) =>
  taskController.updateTask(req, res)
);

// Protected: delete requires ADMIN role
router.delete("/:id", authenticateToken, requireRole(["ADMIN"]), (req, res) =>
  taskController.deleteTask(req, res)
);

export default router;
