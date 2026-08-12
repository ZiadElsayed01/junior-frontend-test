import { useMemo } from "react";
import { useAppSelector } from "../redux/hooks";
import TaskItem from "./TaskItem";
import type { Task } from "../types/task";

export default function TaskList({ onEdit }: { onEdit: (task: Task) => void }) {
  // Selectors
  const { items, priorityFilter, statusFilter } = useAppSelector(
    (s) => s.tasks,
  );

  // Filter tasks based on priority and status
  const tasks = useMemo(
    () =>
      items.filter(
        (t) =>
          (priorityFilter === "all" || t.priority === priorityFilter) &&
          (statusFilter === "all" ||
            (statusFilter === "active" && !t.completed) ||
            (statusFilter === "completed" && t.completed)),
      ),
    [items, priorityFilter, statusFilter],
  );

  // No tasks found
  if (!tasks.length)
    return (
      <div className="text-center py-12 px-5">
        <div className="grid place-items-center w-12 h-12 mx-auto bg-secondary text-foreground font-black">
          ✓
        </div>
        <h3 className="mt-[14px] mb-1.5 font-bold">No tasks found</h3>
        <p className="text-muted-foreground">
          Add a task or change your filters.
        </p>
      </div>
    );

  return (
    <div className="grid gap-2.5">
      {/* Task items */}
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onEdit={onEdit} />
      ))}
    </div>
  );
}
