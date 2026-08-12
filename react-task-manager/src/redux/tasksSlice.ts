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

// Generate unique ID
const id = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

// Create tasks slice
const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Add a new task
    addTask: {
      // Reducer to add task to the beginning of the list
      reducer: (s, a: PayloadAction<Task>) => {
        s.items.unshift(a.payload);
      },
      // Prepare function to generate payload with unique ID
      prepare: (title: string, priority: TaskPriority) => ({
        payload: {
          id: id(),
          title: title.trim(),
          priority,
          completed: false,
        } satisfies Task,
      }),
    },

    // Update an existing task
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
    // Delete a task
    deleteTask: (s, a: PayloadAction<string>) => {
      s.items = s.items.filter((t) => t.id !== a.payload);
    },
    // Toggle task completion
    toggleTask: (s, a: PayloadAction<string>) => {
      const t = s.items.find((x) => x.id === a.payload);
      if (t) t.completed = !t.completed;
    },
    // Set priority filter
    setPriorityFilter: (s, a: PayloadAction<PriorityFilter>) => {
      s.priorityFilter = a.payload;
    },
    // Set status filter
    setStatusFilter: (s, a: PayloadAction<StatusFilter>) => {
      s.statusFilter = a.payload;
    },
    // Clear completed tasks
    clearCompleted: (s) => {
      s.items = s.items.filter((t) => !t.completed);
    },
  },
});

// Export actions
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
