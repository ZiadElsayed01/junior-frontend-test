import type { Task } from "../types/task";

const KEY = "fekra-task-manager-tasks";

// Type guard for Task
const isTask = (v: unknown): v is Task => {
  if (!v || typeof v !== "object") return false;
  const x = v as Record<string, unknown>;
  return (
    typeof x.id === "string" &&
    typeof x.title === "string" &&
    typeof x.completed === "boolean" &&
    ["high", "medium", "low"].includes(x.priority as string)
  );
};

// Get stored tasks from localStorage
export const getStoredTasks = (): Task[] => {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(isTask) : [];
  } catch {
    return [];
  }
};

// Save tasks to localStorage
export const saveTasks = (tasks: Task[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  } catch {}
};
