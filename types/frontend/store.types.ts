export interface AuthUser {
  id: string
  email: string
  role: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: AuthUser | null
}

export type ThemeMode = "light" | "dark" | "system"

export interface UiState {
  sidebarOpen: boolean
  theme: ThemeMode
}
