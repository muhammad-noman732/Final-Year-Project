import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { AuthState, AuthUser } from "@/types/frontend/store.types"

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: AuthUser }>
    ) => {
      state.isAuthenticated = true
      state.user = action.payload.user
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
