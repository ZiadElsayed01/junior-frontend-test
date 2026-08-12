import { useAppDispatch } from "../redux/hooks";
import { deleteTask, toggleTask } from "../redux/tasksSlice";
import type { Task } from "../types/task";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
}

const priorityClasses: Record<Task["priority"], string> = {
  high: "bg-muted text-foreground border border-border",
  medium: "bg-secondary text-secondary-foreground border border-border",
  low: "bg-muted text-muted-foreground border border-border",
};

export default function TaskItem({ task, onEdit }: Props) {
  const d = useAppDispatch();

  return (
    <article
      className={
        task.completed
          ? "flex items-center gap-3.5 p-[15px] border border-border rounded-[14px] bg-muted max-[680px]:items-start"
          : "flex items-center gap-3.5 p-[15px] border border-border rounded-[14px] max-[680px]:items-start"
      }
    >
      <button
        type="button"
        className={
          task.completed
            ? "w-[26px] h-[26px] flex-[0_0_26px] border-2 border-primary bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold"
            : "w-[26px] h-[26px] flex-[0_0_26px] border-2 border-border bg-background rounded-full hover:border-primary transition-colors"
        }
        onClick={() => d(toggleTask(task.id))}
      >
        {task.completed ? "✓" : ""}
      </button>

      <div className="min-w-0 flex-1">
        <h3
          className={
            task.completed
              ? "m-0 mb-[7px] text-[15px] break-words line-through text-muted-foreground"
              : "m-0 mb-[7px] text-[15px] break-words font-semibold"
          }
        >
          {task.title}
        </h3>
        <span
          className={`inline-block px-2 py-1 rounded-full text-[11px] font-extrabold capitalize ${priorityClasses[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      <div className="flex gap-1.5 max-[680px]:flex-col">
        <button
          type="button"
          className="border-0 bg-secondary rounded-lg px-2.5 py-2 text-foreground text-xs font-bold hover:bg-muted transition-colors"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button
          type="button"
          className="border-0 bg-secondary rounded-lg px-2.5 py-2 text-destructive text-xs font-bold hover:bg-muted transition-colors"
          onClick={() => d(deleteTask(task.id))}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
