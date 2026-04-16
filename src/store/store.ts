import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { authApi } from "../features/api/authApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

// ✅ TYPES (THIS FIXES ALL useSelector ERRORS)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;