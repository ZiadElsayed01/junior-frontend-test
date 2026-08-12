import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// Type-safe hooks for Redux
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
