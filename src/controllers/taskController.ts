import { Request, Response } from "express";
import { taskService } from "../services/taskService";

export class TaskController {
  public async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.query;
      const tasks = await taskService.getAllTasks(status as string | undefined);
      res.status(200).json({ success: true, count: tasks.length, data: tasks });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  public async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const task = await taskService.getTaskById(id);
      if (!task) {
        res.status(404).json({ success: false, message: `Task not found with id: ${id}` });
        return;
      }
      res.status(200).json({ success: true, data: task });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  public async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, priority, assigneeEmail, tags } = req.body;
      if (!title || !description) {
        res.status(400).json({ success: false, message: "Title and description are required" });
        return;
      }

      const newTask = await taskService.createTask({ title, description, priority, assigneeEmail, tags });
      res.status(201).json({ success: true, data: newTask });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  public async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updated = await taskService.updateTask(id, req.body);
      if (!updated) {
        res.status(404).json({ success: false, message: `Task not found with id: ${id}` });
        return;
      }
      res.status(200).json({ success: true, data: updated });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  public async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await taskService.deleteTask(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: `Task not found with id: ${id}` });
        return;
      }
      res.status(200).json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
}

export const taskController = new TaskController();
