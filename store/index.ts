import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

// Slices
import authReducer from "./slices/authSlice"
import uiReducer from "./slices/uiSlice"

// API
import { baseApi } from "./api/baseApi"
import { rtkQueryErrorLogger } from "./middleware/error.middleware"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, rtkQueryErrorLogger),
})

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
