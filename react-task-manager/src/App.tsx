import { useMemo, useState } from "react";
import { useAppSelector } from "./redux/hooks";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import type { Task } from "./types/task";

export default function App() {
  // State for editing task
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Selectors
  const tasks = useAppSelector((s) => s.tasks.items);

  // Stats
  const stats = useMemo(
    () => ({
      total: tasks.length,
      active: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
    }),
    [tasks],
  );

  return (
    <main className="w-[min(calc(100%-32px),980px)] mx-auto py-12">
      <header className="flex justify-between items-end gap-6 mb-7 max-[680px]:block">
        {/* Header content */}
        <div>
          <p className="text-foreground text-[12px] font-extrabold tracking-[0.12em] uppercase mb-2">
            Fekra Coding Test
          </p>
          <h1 className="m-0 text-[clamp(34px,6vw,54px)] font-bold leading-tight">
            Task Manager
          </h1>
        </div>

        {/* Stats */}
        <div className="flex gap-2.5 max-[680px]:mt-[18px]">
          {Object.entries(stats).map(([k, v]) => (
            <div
              key={k}
              className="min-w-[82px] p-3.5 bg-card border border-border text-center"
            >
              <strong className="block text-2xl">{v}</strong>
              <span className="block text-xs text-muted-foreground capitalize">
                {k}
              </span>
            </div>
          ))}
        </div>
      </header>

      {/* Task form */}
      <section className="bg-card border border-border p-[22px] mb-[18px] shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
        <TaskForm
          editingTask={editingTask}
          onFinishEdit={() => setEditingTask(null)}
        />
      </section>

      {/* Task list */}
      <section className="bg-card border border-border p-[22px] mb-[18px] shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
        <TaskFilters />
        <TaskList onEdit={setEditingTask} />
      </section>
    </main>
  );
}
