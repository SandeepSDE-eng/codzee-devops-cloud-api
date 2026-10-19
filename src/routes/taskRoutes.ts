import { Router } from "express";
import { taskController } from "../controllers/taskController";

const router = Router();

router.get("/", (req, res) => taskController.getTasks(req, res));
router.get("/:id", (req, res) => taskController.getTaskById(req, res));
router.post("/", (req, res) => taskController.createTask(req, res));
router.put("/:id", (req, res) => taskController.updateTask(req, res));
router.delete("/:id", (req, res) => taskController.deleteTask(req, res));

export default router;
