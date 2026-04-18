import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer"; // adjust path if needed
import { authApi } from "../features/api/authApi";
import { courseApi } from "../features/api/courseApi";

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      courseApi.middleware
    ),
});

// ✅ TYPES
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;