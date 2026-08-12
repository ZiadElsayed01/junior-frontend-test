import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import { saveTasks } from "../utils/storage";

// Configure the Redux store
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

// Define root state and dispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Subscribe to store changes to save tasks to localStorage
store.subscribe(() => saveTasks(store.getState().tasks.items));
