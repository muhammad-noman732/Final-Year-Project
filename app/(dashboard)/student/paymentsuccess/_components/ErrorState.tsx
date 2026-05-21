"use client"

import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function ErrorState() {
  return (
    <div className="max-w-xl mx-auto px-4 pt-4 pb-10 flex items-center justify-center min-h-[360px]">
      <div className="flex flex-col items-center gap-4 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 dark:text-rose-400" />
        <h2 className="text-lg font-bold text-zinc-900 dark:text-foreground">Payment Not Completed</h2>
        <p className="text-sm text-zinc-500 dark:text-muted-foreground max-w-xs">
          Your payment was not successful. No charge has been made.
        </p>
        <Link
          href="/student/payfee"
          className="px-6 py-2.5 rounded-xl bg-[#635BFF] text-white text-sm font-bold hover:bg-[#5249E0] transition-colors shadow-lg shadow-blue-500/20"
        >
          Try Again
        </Link>
      </div>
    </div>
  )
}
