"use client"

import { useEffect } from "react"
import { useSelector } from "react-redux"
import { usePathname } from "next/navigation"
import type { RootState } from "@/store"

export function ThemeApplier() {
  const theme = useSelector((state: RootState) => state.ui.theme)

  const pathname = usePathname()

  useEffect(() => {
    const root = window.document.documentElement

    if (pathname?.startsWith("/login") || pathname?.startsWith("/changepassword")) {
      root.classList.remove("dark")
      return
    }

    if (theme === "dark") {
      root.classList.add("dark")
    } else if (theme === "light") {
      root.classList.remove("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [theme, pathname])

  return null
}
