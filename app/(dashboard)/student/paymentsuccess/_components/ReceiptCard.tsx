"use client"

import { CheckCircle2, ShieldCheck } from "lucide-react"
import { formatFullCurrency } from "@/config/constants"
import type { FeeAssignment } from "@/types/server/student.types"

interface ReceiptCardProps {
  studentName: string
  studentIdStr: string
  departmentName: string
  programName: string
  semLabel: string
  sessionName: string
  paidAssignment: FeeAssignment | null
  displayAmount: number
  receiptNumber: string | null
  formattedDate: string
}

const PRINT_CSS = `
@media print {
  * { visibility: hidden !important; }
  #receipt-print-area, #receipt-print-area * { visibility: visible !important; }
  #receipt-print-area {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    border: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    background: #ffffff !important;
  }
  #receipt-print-area .text-muted-foreground,
  #receipt-print-area .dark\\:text-muted-foreground { color: #4b5563 !important; }
  #receipt-print-area .dark\\:text-foreground,
  #receipt-print-area .text-foreground { color: #111827 !important; }
  #receipt-print-area .dark\\:text-gold-400,
  #receipt-print-area .text-gold-600 { color: #92650a !important; }
  #receipt-print-area .dark\\:text-emerald-400,
  #receipt-print-area .text-emerald-600 { color: #059669 !important; }
  #receipt-print-area .dark\\:bg-white\\/\\[0\\.03\\],
  #receipt-print-area .dark\\:bg-gold-500\\/5 { background: transparent !important; }
  #receipt-print-area .dark\\:border-white\\/\\[0\\.06\\],
  #receipt-print-area .border-zinc-100 { border-color: #e5e7eb !important; }
  @page { margin: 15mm; size: A4 portrait; }
}
`

export default function ReceiptCard({
  studentName,
  studentIdStr,
  departmentName,
  programName,
  semLabel,
  sessionName,
  paidAssignment,
  displayAmount,
  receiptNumber,
  formattedDate,
}: ReceiptCardProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />

      <div
        id="receipt-print-area"
        className="relative rounded-2xl border border-zinc-200 dark:border-white/[0.07] bg-white dark:bg-[#0a0e1a] overflow-hidden shadow-xl dark:shadow-black/40"
      >
        <div className="h-0.5 bg-gradient-to-r from-transparent via-gold-500 dark:via-gold-400 to-transparent" />

        <div
          className="pointer-events-none select-none absolute top-4 right-5 text-emerald-500/[0.07] dark:text-emerald-500/[0.09] font-black uppercase text-[56px] leading-none tracking-wider"
          style={{ transform: "rotate(-15deg)" }}
          aria-hidden
        >
          PAID
        </div>

        <div className="p-5 sm:p-7 relative">
          <div className="text-center mb-5 pb-5 border-b border-zinc-100 dark:border-white/[0.06]">
            <p className="text-[10px] text-gold-600/50 dark:text-gold-500/50 uppercase tracking-[0.28em] font-bold mb-1">
              Government College University Faisalabad
            </p>
            <h2 className="text-sm font-bold text-gold-600 dark:text-gold-400 uppercase tracking-[0.14em]">
              Fee Payment Receipt
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-3.5 mb-5 pb-5 border-b border-zinc-100 dark:border-white/[0.06]">
            {[
              { label: "Student Name", value: studentName },
              { label: "Student ID", value: studentIdStr },
              { label: "Department", value: departmentName },
              { label: "Program", value: programName },
              { label: "Semester", value: `${semLabel} Semester` },
              { label: "Session", value: sessionName },
            ].map((f) => (
              <div key={f.label}>
                <p className="text-[10px] text-zinc-500 dark:text-muted-foreground uppercase tracking-widest font-bold mb-0.5">
                  {f.label}
                </p>
                <p className="text-xs font-bold text-zinc-900 dark:text-foreground">{f.value}</p>
              </div>
            ))}
          </div>

          {paidAssignment && (
            <div className="space-y-0.5 mb-4">
              {[
                { label: "Tuition Fee", amount: paidAssignment.feeStructure.tuitionFee },
                { label: "Lab Fee", amount: paidAssignment.feeStructure.labFee },
                { label: "Library Fee", amount: paidAssignment.feeStructure.libraryFee },
                { label: "Sports Fee", amount: paidAssignment.feeStructure.sportsFee },
                { label: "Registration Fee", amount: paidAssignment.feeStructure.registrationFee },
                { label: "Examination Fee", amount: paidAssignment.feeStructure.examinationFee },
              ]
                .filter((i) => i.amount > 0)
                .map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between text-sm py-1.5 border-b border-zinc-50 dark:border-white/[0.03] last:border-0"
                  >
                    <span className="text-zinc-500 dark:text-muted-foreground text-xs">{item.label}</span>
                    <span className="text-zinc-900 dark:text-foreground tabular-nums text-xs font-bold">
                      {formatFullCurrency(item.amount)}
                    </span>
                  </div>
                ))}
            </div>
          )}

          <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gold-50 dark:bg-gold-500/5 border border-gold-200 dark:border-gold-500/10 mb-5">
            <span className="text-sm font-bold text-gold-600 dark:text-gold-400">Total Paid</span>
            <span className="text-xl font-bold text-gold-600 dark:text-gold-gradient tracking-tight">
              {formatFullCurrency(displayAmount)}
            </span>
          </div>

          <div className="space-y-1.5 pb-5 border-b border-zinc-100 dark:border-white/[0.06]">
            {receiptNumber && (
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500 dark:text-muted-foreground text-xs">Receipt No.</span>
                <span className="text-zinc-800 dark:text-slate-300 font-mono text-xs font-bold">{receiptNumber}</span>
              </div>
            )}
            {[
              { label: "Payment Method", value: "Stripe · Card" },
              { label: "Date & Time", value: formattedDate },
            ].map((f) => (
              <div key={f.label} className="flex justify-between text-sm">
                <span className="text-zinc-500 dark:text-muted-foreground text-xs">{f.label}</span>
                <span className="text-zinc-800 dark:text-slate-300 font-mono text-xs font-bold">{f.value}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500 dark:text-muted-foreground text-xs">Status</span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-black text-xs">
                <CheckCircle2 className="w-3 h-3" /> VERIFIED
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-500/60 dark:text-gold-400/40 flex-shrink-0" />
              <p className="text-[10px] text-zinc-400 dark:text-muted-foreground/50 uppercase tracking-widest font-bold">
                Digitally Secured Receipt
              </p>
            </div>
          </div>

          <p className="text-center text-[10px] text-zinc-400 dark:text-muted-foreground/40 uppercase tracking-widest mt-4 font-bold">
            Official Digital Receipt — Government College University Faisalabad
          </p>
        </div>
      </div>
    </>
  )
}
