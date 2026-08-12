import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../types/user";
const API = "https://jsonplaceholder.typicode.com/users",
  KEY = "@fekra/users";
interface Result {
  users: User[];
  fromCache: boolean;
}
interface State {
  items: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  fromCache: boolean;
  visibleCount: number;
}

const initialState: State = {
  items: [],
  status: "idle",
  error: null,
  fromCache: false,
  visibleCount: 5,
};

export const fetchUsers = createAsyncThunk<
  Result,
  void,
  { rejectValue: string }
>("users/fetch", async (_, api) => {
  try {
    const r = await fetch(API);
    if (!r.ok) throw new Error(`Request failed with status ${r.status}`);
    const users = (await r.json()) as User[];
    await AsyncStorage.setItem(KEY, JSON.stringify(users));
    return { users, fromCache: false };
  } catch (e) {
    try {
      const c = await AsyncStorage.getItem(KEY);
      if (c) return { users: JSON.parse(c) as User[], fromCache: true };
    } catch {}
    return api.rejectWithValue(
      e instanceof Error ? e.message : "Unable to load users.",
    );
  }
});

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loadMore: (s) => {
      s.visibleCount += 5;
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchUsers.pending, (s) => {
      s.status = "loading";
      s.error = null;
    })
      .addCase(fetchUsers.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.items = a.payload.users;
        s.fromCache = a.payload.fromCache;
        s.visibleCount = Math.min(5, a.payload.users.length);
      })
      .addCase(fetchUsers.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload ?? "Unable to load users.";
      });
  },
});

export const { loadMore } = slice.actions;
export default slice.reducer;
