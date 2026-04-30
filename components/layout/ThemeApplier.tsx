"use client"

import { useEffect } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"

export function ThemeApplier() {
  const theme = useSelector((state: RootState) => state.ui.theme)

  useEffect(() => {
    const root = window.document.documentElement
    
    if (theme === "dark") {
      root.classList.add("dark")
    } else if (theme === "light") {
      root.classList.remove("dark")
    } else {
      // System preference
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      if (systemTheme === "dark") {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
    }
  }, [theme])

  return null
}
