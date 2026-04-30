"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { setTheme } from "@/store/slices/uiSlice"
import type { RootState } from "@/store"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.ui.theme)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dark:bg-[#0F172A] dark:border-slate-800">
        <DropdownMenuItem onClick={() => dispatch(setTheme("light"))} className="gap-2 cursor-pointer dark:hover:bg-slate-800 dark:text-slate-300">
          <Sun className="h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => dispatch(setTheme("dark"))} className="gap-2 cursor-pointer dark:hover:bg-slate-800 dark:text-slate-300">
          <Moon className="h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => dispatch(setTheme("system"))} className="gap-2 cursor-pointer dark:hover:bg-slate-800 dark:text-slate-300">
          <Monitor className="h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
