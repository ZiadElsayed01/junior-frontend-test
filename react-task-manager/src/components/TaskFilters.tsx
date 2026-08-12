import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  clearCompleted,
  setPriorityFilter,
  setStatusFilter,
} from "../redux/tasksSlice";
import type { PriorityFilter, StatusFilter } from "../types/task";

const priorities: Array<[PriorityFilter, string]> = [
  ["all", "All"],
  ["high", "High"],
  ["medium", "Medium"],
  ["low", "Low"],
];

const statuses: Array<[StatusFilter, string]> = [
  ["all", "All"],
  ["active", "Active"],
  ["completed", "Completed"],
];

export default function TaskFilters() {
  const d = useAppDispatch();
  const { priorityFilter, statusFilter, items } = useAppSelector(
    (s) => s.tasks,
  );

  return (
    <section className="flex items-end gap-6 flex-wrap pb-[18px] border-b border-border mb-[18px]">
      <div>
        <span className="block text-xs font-extrabold text-muted-foreground mb-2 uppercase">
          Priority
        </span>
        <div className="flex gap-1.5">
          {priorities.map(([v, l]) => (
            <button
              type="button"
              key={v}
              className={
                priorityFilter === v
                  ? "border border-primary bg-primary text-primary-foreground rounded-[9px] px-3 py-2 font-medium"
                  : "border border-border bg-background rounded-[9px] px-3 py-2 text-muted-foreground hover:bg-muted transition-colors"
              }
              onClick={() => d(setPriorityFilter(v))}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="block text-xs font-extrabold text-muted-foreground mb-2 uppercase">
          Status
        </span>
        <div className="flex gap-1.5">
          {statuses.map(([v, l]) => (
            <button
              type="button"
              key={v}
              className={
                statusFilter === v
                  ? "border border-primary bg-primary text-primary-foreground rounded-[9px] px-3 py-2 font-medium"
                  : "border border-border bg-background rounded-[9px] px-3 py-2 text-muted-foreground hover:bg-muted transition-colors"
              }
              onClick={() => d(setStatusFilter(v))}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {items.some((t) => t.completed) && (
        <button
          type="button"
          className="ml-auto border-0 bg-transparent text-destructive font-bold max-[680px]:ml-0 hover:opacity-80 transition-opacity"
          onClick={() => d(clearCompleted())}
        >
          Clear completed
        </button>
      )}
    </section>
  );
}
