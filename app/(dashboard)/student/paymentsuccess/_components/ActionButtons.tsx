"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Printer, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react"
import { useSendReceiptEmailMutation } from "@/store/api/student/studentApi"

interface ActionButtonsProps {
  assignmentId: string | null
}

const BTN_BASE =
  "flex items-center justify-center gap-2 py-2.5 rounded-xl border border-zinc-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] text-sm font-bold text-zinc-500 dark:text-muted-foreground hover:text-gold-600 dark:hover:text-gold-400 hover:border-gold-300 dark:hover:border-gold-500/20 hover:bg-gold-50 dark:hover:bg-gold-500/[0.04] transition-all duration-200 w-full shadow-sm print:hidden disabled:opacity-50 disabled:cursor-not-allowed"

export default function ActionButtons({ assignmentId }: ActionButtonsProps) {
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null)
  const [sendReceipt, { isLoading: sending }] = useSendReceiptEmailMutation()

  const handleEmail = async () => {
    if (!assignmentId) return
    try {
      await sendReceipt({ assignmentId }).unwrap()
      setToast({ type: "success", msg: "Receipt email sent to your registered address." })
    } catch {
      setToast({ type: "error", msg: "Failed to send email. Please try again." })
    } finally {
      setTimeout(() => setToast(null), 4000)
    }
  }

  return (
    <div className="space-y-3 print:hidden">
      {toast && (
        <div
          className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium animate-in slide-in-from-top-2 fade-in duration-200 ${
            toast.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400"
              : "bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-400"
          }`}
        >
          {toast.type === "success" && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
          {toast.msg}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <button
          className={BTN_BASE}
          onClick={handleEmail}
          disabled={sending || !assignmentId}
        >
          {sending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Mail className="w-4 h-4" />
          )}
          {sending ? "Sending…" : "Email"}
        </button>

        <button className={BTN_BASE} onClick={() => window.print()}>
          <Printer className="w-4 h-4" /> Print
        </button>

        <Link href="/student" className={BTN_BASE}>
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>
      </div>
    </div>
  )
}
