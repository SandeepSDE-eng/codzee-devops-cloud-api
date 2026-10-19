export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";

export interface ITask {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assigneeEmail?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskDTO {
  title: string;
  description: string;
  priority?: TaskPriority;
  assigneeEmail?: string;
  tags?: string[];
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  assigneeEmail?: string;
  tags?: string[];
}
