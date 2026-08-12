import type { Task } from "../types/task";
const KEY = "fekra-task-manager-tasks";
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
export const getStoredTasks = (): Task[] => {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(isTask) : [];
  } catch {
    return [];
  }
};
export const saveTasks = (tasks: Task[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  } catch {}
};
