import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { UiState, ThemeMode } from "@/types/frontend/store.types"

const initialState: UiState = {
  sidebarOpen: true,
  theme: "system",
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload
    },
  },
})

export const { toggleSidebar, setTheme } = uiSlice.actions
export default uiSlice.reducer
