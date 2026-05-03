"use client"
 
 import Link from "next/link"
 import { motion, AnimatePresence } from "framer-motion"
 import {
   AlertTriangle, CheckCircle2, Clock, ArrowRight,
   Receipt, Shield, BadgeCheck, Layers, Calendar,
 } from "lucide-react"
 import { Button } from "@/components/ui/button"
 import { formatFullCurrency } from "@/config/constants"
 import { Skeleton } from "boneyard-js/react"
 import { useStudentDashboard, ordinal } from "@/hooks/student/useStudentDashboard"
 
 function pad(v: number) {
   return String(v).padStart(2, "0")
 }
 
 function methodLabel(method: string) {
   if (method === "STRIPE_CARD") return "Card"
   if (method === "BANK_CHALLAN") return "Challan"
   if (method === "WAIVER") return "Waiver"
   return method
 }
 
 function fmt(d: string | Date | null | undefined) {
   if (!d) return "—"
   return new Date(d).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })
 }
 
 function FeeRow({ label, value, accent }: { label: string; value: number; accent?: string }) {
   return (
     <div className="flex items-baseline justify-between py-2.5 border-b border-zinc-100 dark:border-white/[0.04] last:border-0">
       <span className={`text-[12.5px] font-medium ${accent ?? "text-zinc-500 dark:text-zinc-400"}`}>{label}</span>
       <span className={`font-mono tabular-nums text-[12.5px] font-bold ${accent ?? "text-zinc-900 dark:text-zinc-100"}`}>
         {value.toLocaleString()}
       </span>
     </div>
   )
 }
 
 export default function StudentDashboard() {
   const {
     profile, summary, current, isPaid, hasNoFee, isOverdue,
     latestPaidAssignment, countdown, progressPct, isLoading,
     assignments, allPayments,
   } = useStudentDashboard()
 
   const paidCount = assignments.filter((a) => a.status === "PAID").length
   const outstanding = current ? current.amountDue - current.amountPaid : 0
   const recentPayments = allPayments.slice(0, 3)
 
   return (
     <div className="relative isolate space-y-6 pb-10 p-5 lg:p-8">
 
       <div className="max-w-5xl mx-auto space-y-5">
 
         {/* ── HEADER ── */}
         <Skeleton name="student-profile-header" loading={isLoading}>
           <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <div className="flex items-center gap-4">
               <div className="relative flex-shrink-0">
                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-400/90 to-gold-600/90 flex items-center justify-center text-navy-950 font-bold text-lg shadow-lg shadow-gold-500/20">
                   {profile?.user.name.charAt(0) ?? "S"}
                 </div>
                 <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white dark:ring-navy-950">
                   <span className="h-1.5 w-1.5 rounded-full bg-white" />
                 </span>
               </div>
               <div>
                 <h1 className="text-[22px] font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
                   {profile?.user.name ?? "Loading…"}
                 </h1>
                 <div className="flex flex-wrap items-center gap-2 mt-1">
                   <span className="font-mono text-[11px] tracking-wider text-zinc-500 font-bold">
                     {profile?.studentId ?? "—"}
                   </span>
                   {profile?.department?.name && (
                     <>
                       <span className="h-3 w-px bg-zinc-200 dark:bg-zinc-700" />
                       <span className="text-[11.5px] text-zinc-500 dark:text-zinc-400 font-bold">{profile.department.name}</span>
                     </>
                   )}
                   {profile?.program?.name && (
                     <>
                       <span className="h-3 w-px bg-zinc-200 dark:bg-zinc-700" />
                       <span className="text-[11.5px] text-zinc-500 dark:text-zinc-400 font-bold">{profile.program.name}</span>
                     </>
                   )}
                 </div>
               </div>
             </div>
 
             <div className="flex flex-wrap items-center gap-2">
               {profile?.currentSemester && (
                 <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-white/[0.06] bg-white/50 dark:bg-white/[0.025] backdrop-blur-md px-2.5 py-1.5 shadow-sm">
                   <Layers className="h-3 w-3 text-sky-600 dark:text-sky-400" />
                   <span className="text-[11px] text-zinc-600 dark:text-zinc-300 font-bold">{ordinal(profile.currentSemester)} Sem</span>
                 </div>
               )}
               {profile?.session?.name && (
                 <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-white/[0.06] bg-white/50 dark:bg-white/[0.025] backdrop-blur-md px-2.5 py-1.5 shadow-sm">
                   <Calendar className="h-3 w-3 text-violet-600 dark:text-violet-400" />
                   <span className="text-[11px] text-zinc-600 dark:text-zinc-300 font-bold">{profile.session.name}</span>
                 </div>
               )}
               {paidCount > 0 && (
                 <div className="flex items-center gap-1.5 rounded-lg border border-emerald-200 dark:border-emerald-500/15 bg-emerald-500/5 dark:bg-emerald-500/10 backdrop-blur-md px-2.5 py-1.5 shadow-sm">
                   <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                   <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-bold">
                     {paidCount} cleared
                   </span>
                 </div>
               )}
             </div>
           </header>
         </Skeleton>
 
         {/* ── FEE STATUS HERO ── */}
         <Skeleton name="student-fee-card" loading={isLoading}>
 
           {/* UNPAID / OVERDUE */}
           {current && (
             <motion.div
               initial={{ opacity: 0, y: 8 }}
               animate={{ opacity: 1, y: 0 }}
               className={[
                 "rounded-2xl border overflow-hidden shadow-sm backdrop-blur-md",
                 isOverdue
                   ? "border-rose-200 dark:border-rose-500/20 bg-white/40 dark:bg-rose-950/[0.08]"
                   : "border-zinc-200/50 dark:border-white/[0.07] bg-white/40 dark:bg-white/[0.015]",
               ].join(" ")}
             >
               <div className={[
                 "flex items-center gap-2 px-6 py-2.5 border-b",
                 isOverdue
                   ? "border-rose-200 dark:border-rose-500/15 bg-rose-500/5"
                   : "border-amber-200 dark:border-amber-500/10 bg-amber-500/5",
               ].join(" ")}>
                 {isOverdue ? (
                   <AlertTriangle className="h-3.5 w-3.5 text-rose-500 dark:text-rose-400 flex-shrink-0" />
                 ) : (
                   <Clock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                 )}
                 <span className={`text-[11px] font-bold ${isOverdue ? "text-rose-700 dark:text-rose-300" : "text-amber-700 dark:text-amber-300"}`}>
                   {isOverdue ? "Payment overdue — late fee rules apply" : `Due ${fmt(current.dueDate)}`}
                 </span>
               </div>
 
               <div className="p-6 sm:p-8 space-y-7">
                 <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
                   <div className="space-y-1">
                     <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-bold mb-3">
                       <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${isOverdue ? "bg-rose-500" : "bg-amber-500"}`} />
                       Outstanding balance
                     </p>
                     <div className="flex items-baseline gap-2">
                       <span className="text-[13px] text-zinc-400 dark:text-zinc-500 font-bold">PKR</span>
                       <span className="font-mono tabular-nums text-[42px] sm:text-[48px] font-bold text-zinc-900 dark:text-zinc-50 tracking-tight leading-none">
                         {outstanding.toLocaleString()}
                       </span>
                     </div>
                     <p className="mt-2 text-[12.5px] text-zinc-500 dark:text-zinc-400 font-bold">
                       {ordinal(current.feeStructure.semester)} Semester ·{" "}
                       <span className="text-zinc-900 dark:text-zinc-300">{current.feeStructure.program?.name ?? "—"}</span>
                     </p>
                   </div>
 
                   {!isOverdue ? (
                     <div className="self-start rounded-xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50/50 dark:bg-black/30 px-5 py-4 shadow-sm backdrop-blur-md">
                       <p className="text-[9.5px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2.5">
                         Time remaining
                       </p>
                       <div className="flex items-baseline gap-1.5 font-mono tabular-nums text-zinc-900 dark:text-zinc-100">
                         {[
                           { v: countdown.days, l: "d" },
                           { v: countdown.hours, l: "h" },
                           { v: countdown.minutes, l: "m" },
                           { v: countdown.seconds, l: "s" },
                         ].map((t, i) => (
                           <div key={t.l} className="flex items-baseline gap-1">
                             {i > 0 && <span className="text-zinc-300 dark:text-zinc-700 pb-0.5">:</span>}
                             <div className="flex flex-col items-center">
                               <AnimatePresence mode="wait">
                                 <motion.span
                                   key={t.v}
                                   initial={{ y: -6, opacity: 0 }}
                                   animate={{ y: 0, opacity: 1 }}
                                   exit={{ y: 6, opacity: 0 }}
                                   transition={{ duration: 0.2 }}
                                   className="inline-block text-[24px] font-bold leading-none"
                                 >
                                   {pad(t.v)}
                                 </motion.span>
                               </AnimatePresence>
                               <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">{t.l}</span>
                             </div>
                           </div>
                         ))}
                       </div>
                     </div>
                   ) : (
                     <div className="self-start flex items-center gap-3 rounded-xl border border-rose-200/50 dark:border-rose-500/20 bg-rose-500/10 px-4 py-3.5 shadow-sm backdrop-blur-md">
                       <AlertTriangle className="h-4 w-4 text-rose-600 dark:text-rose-400 flex-shrink-0" strokeWidth={2} />
                       <div>
                         <p className="text-[12.5px] font-bold text-rose-800 dark:text-rose-200">Overdue</p>
                         <p className="text-[11px] text-rose-700/70 dark:text-rose-300/70 mt-0.5 font-bold">Late penalties active</p>
                       </div>
                     </div>
                   )}
                 </div>
 
                 <div>
                   <div className="flex justify-between text-[9.5px] uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600 font-bold mb-1.5">
                     <span>Term progress</span>
                     <span className="font-mono text-zinc-500 dark:text-zinc-400 font-bold">{Math.round(progressPct)}%</span>
                   </div>
                   <div className="h-[3px] rounded-full bg-zinc-100 dark:bg-white/[0.04] overflow-hidden">
                     <motion.div
                       className={`h-full rounded-full ${isOverdue ? "bg-rose-500" : "bg-gold-500 dark:bg-gold-400"}`}
                       initial={{ width: 0 }}
                       animate={{ width: `${progressPct}%` }}
                       transition={{ duration: 1.2, ease: "easeOut" }}
                     />
                   </div>
                 </div>
 
                 <div className="grid sm:grid-cols-2 gap-0.5 rounded-xl overflow-hidden border border-zinc-200 dark:border-white/[0.05] shadow-sm">
                   <div className="bg-zinc-50/50 dark:bg-[#080c14]/50 p-5">
                     <p className="flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-3">
                       <Receipt className="h-3 w-3" />
                       Academic fees
                     </p>
                     <FeeRow label="Tuition" value={current.feeStructure.tuitionFee} />
                     <FeeRow label="Lab" value={current.feeStructure.labFee} />
                     <FeeRow label="Library" value={current.feeStructure.libraryFee} />
                   </div>
                   <div className="bg-zinc-50/50 dark:bg-[#080c14]/50 p-5">
                     <p className="flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-3">
                       <Shield className="h-3 w-3" />
                       Administrative
                     </p>
                     <FeeRow label="Registration" value={current.feeStructure.registrationFee} />
                     <FeeRow label="Sports" value={current.feeStructure.sportsFee} />
                     <FeeRow label="Examination" value={current.feeStructure.examinationFee} />
                     {current.discountApplied > 0 && (
                       <FeeRow label="Scholarship waiver" value={-current.discountApplied} accent="text-emerald-600 dark:text-emerald-400" />
                     )}
                   </div>
                 </div>
 
                 <div className="flex items-center justify-between rounded-xl border border-zinc-200/50 dark:border-white/[0.05] bg-zinc-900 dark:bg-white/[0.03] px-5 py-3.5 shadow-sm">
                   <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500 font-bold">Total due</span>
                   <span className="font-mono tabular-nums text-[17px] font-bold text-white dark:text-zinc-50">
                     {formatFullCurrency(current.amountDue)}
                   </span>
                 </div>
 
                 <Link href="/student/payfee">
                   <Button className="w-full h-12 bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-[13.5px] rounded-xl group transition-all duration-150 active:scale-[0.99] shadow-lg shadow-gold-500/20">
                     Pay outstanding balance
                     <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                   </Button>
                 </Link>
               </div>
             </motion.div>
           )}
 
           {/* ALL PAID */}
           {isPaid && (
             <motion.div
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               className="rounded-2xl border border-zinc-200/50 dark:border-white/[0.07] bg-white/40 dark:bg-white/[0.015] backdrop-blur-md overflow-hidden shadow-sm"
             >
               <div className="flex items-center gap-2 px-6 py-2.5 border-b border-zinc-100 dark:border-white/[0.05] bg-emerald-500/5">
                 <span className="relative flex h-1.5 w-1.5">
                   <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                   <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                 </span>
                 <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">Account in good standing</span>
               </div>
               <div className="p-6 sm:p-8">
                 <div className="flex flex-col sm:flex-row items-start gap-6">
                   <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-inset ring-emerald-500/20 shadow-inner">
                     <BadgeCheck className="h-7 w-7 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-[10.5px] uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-500/80 font-bold">Fee status</p>
                     <h3 className="mt-1 text-[22px] font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">All fees cleared</h3>
                     <p className="mt-1.5 text-[13px] text-zinc-600 dark:text-zinc-400 font-bold">
                       {paidCount} semester{paidCount !== 1 ? "s" : ""} paid
                       {summary?.totalPaid ? (
                         <> · Lifetime{" "}
                           <span className="font-mono tabular-nums text-emerald-600 dark:text-emerald-400 font-bold">
                             {formatFullCurrency(summary.totalPaid)}
                           </span>
                         </>
                       ) : null}
                     </p>
                   </div>
                   {latestPaidAssignment && (
                     <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-zinc-100 dark:border-white/[0.06] sm:pl-6 pt-4 sm:pt-0 self-center">
                       <p className="text-[9.5px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Last cleared</p>
                       <p className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                         {ordinal(latestPaidAssignment.feeStructure.semester)} Semester
                       </p>
                       <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400 font-mono tabular-nums mt-0.5 font-bold">
                         {fmt(latestPaidAssignment.paidAt)}
                       </p>
                     </div>
                   )}
                 </div>
               </div>
             </motion.div>
           )}
 
           {/* NO FEE */}
           {hasNoFee && (
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="rounded-2xl border border-zinc-200/50 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.012] shadow-sm backdrop-blur-md"
             >
               <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                 <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-50/50 dark:bg-white/[0.03] ring-1 ring-inset ring-zinc-100 dark:ring-white/[0.07] shadow-sm">
                   <Clock className="h-5 w-5 text-zinc-400 dark:text-zinc-500" strokeWidth={1.5} />
                 </div>
                 <h3 className="text-[16px] font-bold text-zinc-900 dark:text-zinc-100">Schedule pending</h3>
                 <p className="mt-2 max-w-[28ch] text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-bold">
                   Your fee schedule for the upcoming semester is being processed by the admin.
                 </p>
               </div>
             </motion.div>
           )}
         </Skeleton>
 
         {/* ── BENTO STATS STRIP ── */}
         <Skeleton name="ledger-summary" loading={isLoading}>
           <motion.div
             initial={{ opacity: 0, y: 6 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.12, type: "spring", stiffness: 280, damping: 28 }}
             className="grid gap-4 grid-cols-1 sm:grid-cols-3"
           >
             {/* Total cleared */}
             <div className="rounded-xl border border-zinc-200/50 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.015] p-5 shadow-sm backdrop-blur-md">
               <p className="text-[9.5px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-1.5">
                 Total cleared
               </p>
               <p className="font-mono tabular-nums text-[20px] font-bold text-gold-600 dark:text-gold-400 leading-tight">
                 {summary?.totalPaid ? formatFullCurrency(summary.totalPaid) : "PKR 0"}
               </p>
             </div>
 
             {/* Semesters */}
             <div className="rounded-xl border border-zinc-200/50 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.015] p-5 shadow-sm backdrop-blur-md">
               <p className="text-[9.5px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">
                 Semesters
               </p>
               <div className="flex items-baseline gap-1.5 mb-3">
                 <span className="font-mono tabular-nums text-[28px] font-bold text-zinc-900 dark:text-zinc-50 leading-none">
                   {paidCount}
                 </span>
                 <span className="text-[12px] text-zinc-500 font-bold">of 8 cleared</span>
               </div>
               <div className="grid grid-cols-8 gap-1">
                 {Array.from({ length: 8 }).map((_, i) => (
                   <div
                     key={i}
                     className={[
                       "h-1.5 rounded-full",
                       i < paidCount ? "bg-emerald-500" : "bg-zinc-100 dark:bg-white/[0.07]",
                     ].join(" ")}
                   />
                 ))}
               </div>
             </div>
 
             {/* Account status */}
             <div className={[
               "rounded-xl border p-5 shadow-sm backdrop-blur-md",
               summary?.hasOverdue
                 ? "border-rose-200 dark:border-rose-500/20 bg-rose-500/5"
                 : isPaid
                 ? "border-emerald-200/50 dark:border-emerald-500/15 bg-emerald-500/5"
                 : "border-zinc-200/50 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.015]",
             ].join(" ")}>
               <p className="text-[9.5px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">
                 Account status
               </p>
               <div className="flex items-center gap-2 mb-1">
                 <span className={[
                   "h-2 w-2 rounded-full flex-shrink-0",
                   summary?.hasOverdue ? "bg-rose-500 animate-pulse" : isPaid ? "bg-emerald-500" : "bg-amber-500",
                 ].join(" ")} />
                 <span className={[
                   "text-[15px] font-bold",
                   summary?.hasOverdue ? "text-rose-700 dark:text-rose-300" : isPaid ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300",
                 ].join(" ")}>
                   {summary?.hasOverdue ? "Overdue" : isPaid ? "Clear" : "Pending"}
                 </span>
               </div>
               {summary && summary.totalOutstanding > 0 && (
                 <p className="font-mono tabular-nums text-[11.5px] text-zinc-500 dark:text-zinc-400 mt-1 font-bold">
                   {formatFullCurrency(summary.totalOutstanding)} outstanding
                 </p>
               )}
             </div>
           </motion.div>
         </Skeleton>
 
         {/* ── RECENT PAYMENTS ── */}
         <Skeleton name="ledger-transactions" loading={isLoading}>
           <motion.section
             initial={{ opacity: 0, y: 6 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2, type: "spring", stiffness: 280, damping: 30 }}
             className="space-y-3"
           >
             <div className="flex items-center justify-between">
               <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-500 font-bold">
                 Recent payments
               </p>
               <Link
                 href="/student/history"
                 className="flex items-center gap-1 text-[11.5px] text-zinc-500 font-bold hover:text-gold-600 dark:hover:text-gold-400 transition-colors duration-150 group"
               >
                 View all
                 <ArrowRight className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5" />
               </Link>
             </div>
 
             <div className="rounded-2xl border border-zinc-200/50 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.012] divide-y divide-zinc-100 dark:divide-white/[0.04] overflow-hidden shadow-sm backdrop-blur-md">
               {recentPayments.length > 0 ? (
                 recentPayments.map((p, idx) => (
                   <motion.div
                     key={p.id}
                     className="flex items-center justify-between px-5 py-3.5 hover:bg-zinc-50/50 dark:hover:bg-white/[0.013] transition-colors duration-100"
                   >
                     <div className="flex items-center gap-3 min-w-0">
                       <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-white/[0.04] ring-1 ring-inset ring-zinc-200/50 dark:ring-white/[0.06] text-[10px] font-mono text-zinc-500 dark:text-zinc-400 font-bold">
                         {p.assignmentSemester}
                       </span>
                       <div className="min-w-0">
                         <p className="text-[13px] font-bold text-zinc-900 dark:text-zinc-100 truncate">{p.assignmentLabel}</p>
                         <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono tabular-nums font-bold">{fmt(p.paidAt)}</p>
                       </div>
                     </div>
                     <div className="text-right shrink-0 ml-4">
                       <p className="font-mono tabular-nums font-bold text-zinc-900 dark:text-zinc-50 text-[13px]">
                         {formatFullCurrency(p.amount)}
                       </p>
                       <p className="flex items-center gap-1 justify-end text-[9px] uppercase tracking-[0.12em] text-emerald-600 dark:text-emerald-400/80 font-bold mt-0.5">
                         <span className="h-1 w-1 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                         {methodLabel(p.method)}
                       </p>
                     </div>
                   </motion.div>
                 ))
               ) : (
                 <div className="px-5 py-8 text-center text-zinc-400 text-sm font-bold">
                   No recent transactions found.
                 </div>
               )}
             </div>
           </motion.section>
         </Skeleton>
       </div>
     </div>
   )
 }
