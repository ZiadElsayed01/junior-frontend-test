import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import { saveTasks } from "../utils/storage";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => saveTasks(store.getState().tasks.items));
