import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { addTask, updateTask } from "../redux/tasksSlice";
import type { Task, TaskPriority } from "../types/task";

interface Props {
  editingTask: Task | null;
  onFinishEdit: () => void;
}
interface Form {
  title: string;
  priority: TaskPriority;
}

const empty: Form = { title: "", priority: "medium" };

export default function TaskForm({ editingTask, onFinishEdit }: Props) {
  // Dispatch hook
  const dispatch = useAppDispatch();

  // State hooks
  const [form, setForm] = useState<Form>(empty);
  const [error, setError] = useState("");

  // Effect hook
  useEffect(() => {
    setForm(
      editingTask
        ? { title: editingTask.title, priority: editingTask.priority }
        : empty,
    );
    setError("");
  }, [editingTask]);

  // Form submit function
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = form.title.trim();
    if (!title) {
      setError("Task title is required.");
      return;
    }
    if (editingTask) {
      dispatch(
        updateTask({ id: editingTask.id, title, priority: form.priority }),
      );
      onFinishEdit();
    } else {
      dispatch(addTask(title, form.priority));
      setForm(empty);
    }
    setError("");
  };

  return (
    <form className="" onSubmit={submit}>
      {/* Form fields */}
      <div className="flex justify-between">
        {/* Task title field */}
        <label>
          Task title
          <input
            value={form.title}
            onChange={(e) => setForm((x) => ({ ...x, title: e.target.value }))}
            placeholder="e.g. Finish coding test"
            className="block border border-black px-2 py-1 my-2 w-full"
          />
        </label>

        {/* Priority dropdown */}
        <label className="flex gap-4 items-center">
          Priority
          <select
            value={form.priority}
            onChange={(e) =>
              setForm((x) => ({
                ...x,
                priority: e.target.value as TaskPriority,
              }))
            }
            className="block bg-black text-white  px-4 py-2 w-full"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Form actions */}
      <div className="form-actions">
        <button className="bg-black text-white px-4 py-2 my-3">
          {editingTask ? "Save changes" : "Add task"}
        </button>
        {editingTask && (
          <button
            type="button"
            className="bg-white text-black border border-black px-4 py-2 ml-3"
            onClick={onFinishEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
