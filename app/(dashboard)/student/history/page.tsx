"use client"
 
 import { motion, AnimatePresence } from "framer-motion"
 import {
   CreditCard, Receipt, CheckCircle2,
   FileText, TrendingUp, Clock,
   Calendar,
   Layers
 } from "lucide-react"
 import { formatFullCurrency } from "@/config/constants"
 import { Skeleton } from "boneyard-js/react"
 import { useStudentLedger } from "@/hooks/student/useStudentLedger"
 
 function fmt(d: string | Date | null | undefined) {
   if (!d) return "—"
   return new Date(d).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })
 }
 
 function methodLabel(method: string) {
   if (method === "STRIPE_CARD") return "Card"
   if (method === "BANK_CHALLAN") return "Challan"
   if (method === "WAIVER") return "Waiver"
   return method
 }
 
 const METHOD_ICON = {
   STRIPE_CARD: CreditCard,
   BANK_CHALLAN: Receipt,
   WAIVER: CheckCircle2,
 } as const
 
 export default function StudentHistoryPage() {
   const {
     summary,
     allPayments,
     isLoading,
     filter,
     setFilter,
     filteredPayments,
   } = useStudentLedger()
 
   const completedCount = allPayments.filter((p) => p.status === "COMPLETED").length
 
   return (
     <div className="relative isolate space-y-6 pb-10 p-5 lg:p-8">
 
       <div className="max-w-4xl mx-auto space-y-8">
 
         {/* ── HEADER ── */}
         <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 px-1">
           <div className="space-y-2">
             <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 mb-2">
               <Clock className="h-4.5 w-4.5 text-sky-500" />
             </div>
             <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Payment History</h1>
             <p className="text-sm text-zinc-500 dark:text-zinc-400 font-bold">
               Complete record of all fee transactions across all semesters.
             </p>
           </div>
           <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-white/[0.04] text-[11px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest">
             <span className="font-mono tabular-nums">
               {allPayments.length} records
             </span>
           </div>
         </div>
 
         {/* ── SUMMARY STRIP ── */}
         <Skeleton name="ledger-summary" loading={isLoading}>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <div className="rounded-2xl border border-zinc-200/50 dark:border-white/[0.05] bg-white/40 dark:bg-white/[0.015] p-6 shadow-sm backdrop-blur-md">
               <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">
                 Total cleared
               </p>
               <p className="font-mono tabular-nums text-[22px] font-bold text-gold-600 dark:text-gold-400 leading-tight">
                 {summary?.totalPaid ? formatFullCurrency(summary.totalPaid) : "PKR 0"}
               </p>
             </div>
 
             <div className="rounded-2xl border border-zinc-200/50 dark:border-white/[0.05] bg-white/40 dark:bg-white/[0.015] p-6 shadow-sm backdrop-blur-md">
               <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2.5">
                 Transactions
               </p>
               <div className="flex items-baseline gap-2">
                 <span className="font-mono tabular-nums text-[32px] font-bold text-zinc-900 dark:text-zinc-50 leading-none">
                   {completedCount}
                 </span>
                 <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest">Confirmed</span>
               </div>
             </div>
 
             <div className={[
               "rounded-2xl border p-6 shadow-sm backdrop-blur-md",
               summary && summary.totalOutstanding > 0 
                 ? "border-amber-200/50 dark:border-amber-500/15 bg-amber-500/5" 
                 : "border-emerald-200/50 dark:border-emerald-500/15 bg-emerald-500/5"
             ].join(" ")}>
               <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">
                 Account state
               </p>
               {summary && summary.totalOutstanding > 0 ? (
                 <div className="space-y-1">
                   <p className="font-mono tabular-nums text-[20px] font-bold text-amber-600 dark:text-amber-400 leading-tight">
                     Pending Due
                   </p>
                   <p className="text-[11px] text-amber-700/70 dark:text-amber-300/70 font-bold uppercase tracking-widest">
                     Action required
                   </p>
                 </div>
               ) : (
                 <div className="flex items-center gap-2 py-1">
                   <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                   <span className="text-[18px] font-bold text-emerald-700 dark:text-emerald-300">Verified Clear</span>
                 </div>
               )}
             </div>
           </div>
         </Skeleton>
 
         {/* ── FILTER TABS ── */}
         <div className="p-1 rounded-xl bg-white/40 dark:bg-white/[0.03] border border-zinc-200/50 dark:border-white/[0.05] w-fit shadow-sm backdrop-blur-md inline-flex">
           {(["all", "completed", "pending"] as const).map((f) => (
             <button
               key={f}
               type="button"
               onClick={() => setFilter(f)}
               className={[
                 "rounded-lg px-5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all duration-300",
                 filter === f
                   ? "bg-zinc-900 dark:bg-white text-white dark:text-navy-950 shadow-sm"
                   : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50",
               ].join(" ")}
             >
               {f}
             </button>
           ))}
         </div>
 
         {/* ── TRANSACTION LIST ── */}
         <Skeleton name="ledger-transactions" loading={isLoading}>
           {filteredPayments.length === 0 ? (
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="rounded-2xl border border-dashed border-zinc-300 dark:border-white/[0.1] py-20 text-center backdrop-blur-sm"
             >
               <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-50/50 dark:bg-white/[0.03] ring-1 ring-zinc-200/50 dark:ring-white/[0.06]">
                 <FileText className="h-5 w-5 text-zinc-300 dark:text-zinc-600" strokeWidth={1.5} />
               </div>
               <p className="text-[15px] font-bold text-zinc-900 dark:text-zinc-200">No records found</p>
               <p className="mt-1 text-[12.5px] text-zinc-500 dark:text-zinc-400 font-bold">
                 Your search criteria did not match any transactions.
               </p>
             </motion.div>
           ) : (
             <div className="rounded-2xl border border-zinc-200/50 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.012] overflow-hidden shadow-sm backdrop-blur-md">
               <div className="divide-y divide-zinc-100 dark:divide-white/[0.04]">
                 <AnimatePresence mode="popLayout">
                   {filteredPayments.map((p, idx) => {
                     const MethodIcon = METHOD_ICON[p.method as keyof typeof METHOD_ICON] ?? Receipt
                     const isConfirmed = p.status === "COMPLETED"
                     return (
                       <motion.div
                         key={p.id}
                         layout
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         className="group flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-6 py-5 hover:bg-zinc-50/50 dark:hover:bg-white/[0.013] transition-all duration-100"
                       >
                         <div className="flex items-center gap-5 min-w-0">
                           <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-50 dark:bg-white/[0.03] ring-1 ring-inset ring-zinc-200/50 dark:ring-white/[0.06] group-hover:scale-105 group-hover:bg-gold-500/5 transition-all shadow-inner">
                             <MethodIcon className="h-5 w-5 text-zinc-500 group-hover:text-gold-500 transition-colors" strokeWidth={1.75} />
                           </div>
 
                           <div className="min-w-0 space-y-1">
                             <p className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100 truncate tracking-tight">{p.assignmentLabel}</p>
                             <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                               <span className="font-mono tabular-nums">{fmt(p.paidAt)}</span>
                               <span className="w-1 h-1 rounded-full bg-zinc-200 dark:bg-white/10" />
                               <span>{methodLabel(p.method)}</span>
                             </div>
                           </div>
                         </div>
 
                         <div className="flex items-center justify-between sm:justify-end gap-8 border-t sm:border-0 pt-4 sm:pt-0 border-zinc-100 dark:border-white/[0.03]">
                           <div className="sm:text-right">
                             <p className="font-mono tabular-nums font-bold text-zinc-900 dark:text-zinc-50 text-[16px] tracking-tight">
                               {formatFullCurrency(p.amount)}
                             </p>
                             <div className="flex items-center gap-1.5 sm:justify-end mt-1">
                               <span className={`h-1.5 w-1.5 rounded-full ${isConfirmed ? "bg-emerald-500" : "bg-amber-500"}`} />
                               <span className={`text-[10px] uppercase font-bold tracking-widest ${isConfirmed ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                                 {isConfirmed ? "Confirmed" : "Processing"}
                               </span>
                             </div>
                           </div>
                           <div className="flex items-center gap-4">
                             <div className="text-[10px] text-zinc-400 dark:text-zinc-600 font-mono hidden md:block">
                               {p.receiptNumber}
                             </div>
                           </div>
                         </div>
                       </motion.div>
                     )
                   })}
                 </AnimatePresence>
               </div>
 
               {/* Footer totals */}
               {summary && (
                 <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-100 dark:border-white/[0.05] bg-zinc-50/50 dark:bg-white/[0.01]">
                   <div className="flex items-center gap-2">
                     <TrendingUp className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400" />
                     <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400 font-bold">
                       Institutional cleared
                     </span>
                   </div>
                   <span className="font-mono tabular-nums text-[18px] font-bold text-gold-600 dark:text-gold-400">
                     {formatFullCurrency(summary.totalPaid)}
                   </span>
                 </div>
               )}
             </div>
           )}
         </Skeleton>
       </div>
     </div>
   )
 }
