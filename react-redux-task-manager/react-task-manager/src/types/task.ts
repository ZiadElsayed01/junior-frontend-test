export type TaskPriority = "high" | "medium" | "low";

export type PriorityFilter = "all" | TaskPriority;

export type StatusFilter = "all" | "active" | "completed";

export interface Task {
  id: string;
  title: string;
  priority: TaskPriority;
  completed: boolean;
}
