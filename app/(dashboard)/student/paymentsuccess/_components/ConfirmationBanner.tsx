"use client"

import { Mail } from "lucide-react"

interface ConfirmationBannerProps {
  studentEmail: string
}

export default function ConfirmationBanner({ studentEmail }: ConfirmationBannerProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-sky-200/70 dark:border-sky-500/20 bg-sky-50/60 dark:bg-sky-500/[0.06] px-4 py-3 print:hidden">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-500/10 flex-shrink-0">
        <Mail className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
      </div>
      <p className="text-xs text-sky-700 dark:text-sky-300 font-medium">
        A confirmation email has been sent to{" "}
        <span className="font-bold">{studentEmail}</span>
      </p>
    </div>
  )
}
