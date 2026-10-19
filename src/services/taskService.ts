import { ITask, CreateTaskDTO, UpdateTaskDTO } from "../types";

export class TaskService {
  private tasks: Map<string, ITask> = new Map();

  constructor() {
    this.seedInitialTasks();
  }

  private seedInitialTasks(): void {
    const defaultTasks: ITask[] = [
      {
        id: "task-001",
        title: "Setup CI/CD Pipeline on AWS ECS",
        description: "Configure GitHub Actions deployment pipeline for staging and production ECS clusters.",
        priority: "HIGH",
        status: "IN_PROGRESS",
        assigneeEmail: "sandeepengineering03@gmail.com",
        tags: ["devops", "aws", "ecs", "ci-cd"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "task-002",
        title: "Implement API Rate Limiter & Security Headers",
        description: "Protect REST API routes against DDoS and header injection using Helmet and Redis-backed rate limiting.",
        priority: "CRITICAL",
        status: "TODO",
        assigneeEmail: "sandeepengineering03@gmail.com",
        tags: ["security", "nodejs", "express"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    defaultTasks.forEach((t) => this.tasks.set(t.id, t));
  }

  public async getAllTasks(filterStatus?: string): Promise<ITask[]> {
    const all = Array.from(this.tasks.values());
    if (filterStatus) {
      return all.filter((t) => t.status.toLowerCase() === filterStatus.toLowerCase());
    }
    return all;
  }

  public async getTaskById(id: string): Promise<ITask | null> {
    return this.tasks.get(id) || null;
  }

  public async createTask(dto: CreateTaskDTO): Promise<ITask> {
    const id = `task-${Date.now().toString(36)}`;
    const newTask: ITask = {
      id,
      title: dto.title,
      description: dto.description,
      priority: dto.priority || "MEDIUM",
      status: "TODO",
      assigneeEmail: dto.assigneeEmail,
      tags: dto.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.tasks.set(id, newTask);
    return newTask;
  }

  public async updateTask(id: string, dto: UpdateTaskDTO): Promise<ITask | null> {
    const existing = this.tasks.get(id);
    if (!existing) return null;

    const updated: ITask = {
      ...existing,
      ...dto,
      updatedAt: new Date(),
    };

    this.tasks.set(id, updated);
    return updated;
  }

  public async deleteTask(id: string): Promise<boolean> {
    return this.tasks.delete(id);
  }
}

export const taskService = new TaskService();
