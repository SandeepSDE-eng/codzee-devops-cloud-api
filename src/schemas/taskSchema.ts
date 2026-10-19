export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateCreateTaskInput = (body: any): ValidationResult => {
  const errors: string[] = [];

  if (!body.title || typeof body.title !== "string" || body.title.trim().length < 3) {
    errors.push("Title is required and must be at least 3 characters long.");
  }

  if (!body.description || typeof body.description !== "string" || body.description.trim().length < 10) {
    errors.push("Description is required and must be at least 10 characters long.");
  }

  const validPriorities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
  if (body.priority && !validPriorities.includes(body.priority)) {
    errors.push(`Priority must be one of: ${validPriorities.join(", ")}`);
  }

  if (body.assigneeEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.assigneeEmail)) {
    errors.push("Assignee email is not a valid email address.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
