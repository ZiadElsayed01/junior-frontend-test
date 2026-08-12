import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  Task,
  TaskPriority,
  PriorityFilter,
  StatusFilter,
} from "../types/task";
import { getStoredTasks } from "../utils/storage";

interface TasksState {
  items: Task[];
  priorityFilter: PriorityFilter;
  statusFilter: StatusFilter;
}

const initialState: TasksState = {
  items: getStoredTasks(),
  priorityFilter: "all",
  statusFilter: "all",
};

const id = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer: (s, a: PayloadAction<Task>) => {
        s.items.unshift(a.payload);
      },
      prepare: (title: string, priority: TaskPriority) => ({
        payload: {
          id: id(),
          title: title.trim(),
          priority,
          completed: false,
        } satisfies Task,
      }),
    },
    updateTask: (
      s,
      a: PayloadAction<{ id: string; title: string; priority: TaskPriority }>,
    ) => {
      const t = s.items.find((x) => x.id === a.payload.id);
      if (t) {
        t.title = a.payload.title.trim();
        t.priority = a.payload.priority;
      }
    },
    deleteTask: (s, a: PayloadAction<string>) => {
      s.items = s.items.filter((t) => t.id !== a.payload);
    },
    toggleTask: (s, a: PayloadAction<string>) => {
      const t = s.items.find((x) => x.id === a.payload);
      if (t) t.completed = !t.completed;
    },
    setPriorityFilter: (s, a: PayloadAction<PriorityFilter>) => {
      s.priorityFilter = a.payload;
    },
    setStatusFilter: (s, a: PayloadAction<StatusFilter>) => {
      s.statusFilter = a.payload;
    },
    clearCompleted: (s) => {
      s.items = s.items.filter((t) => !t.completed);
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTask,
  setPriorityFilter,
  setStatusFilter,
  clearCompleted,
} = slice.actions;
export default slice.reducer;
