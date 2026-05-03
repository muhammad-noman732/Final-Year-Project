"use client";
 
 import Link from "next/link";
 import { useStudentLedger } from "@/hooks/student/useStudentLedger";
 import { formatFullCurrency } from "@/config/constants";
 import { Skeleton } from "boneyard-js/react";
 import StatusBadge from "@/components/shared/StatusBadge";
 import { format } from "date-fns";
 import { motion, AnimatePresence } from "framer-motion";
 import { Button } from "@/components/ui/button";
 
 import { 
     Clock, 
     ArrowRight, 
     CheckCircle2, 
     AlertTriangle,
     Receipt,
     Wallet,
     ShieldAlert,
     TrendingDown,
     TrendingUp,
     Layers
 } from "lucide-react";
 
 export default function StudentLedgerPage() {
     const {
         summary,
         isLoading,
         filter,
         setFilter,
         navigatingId,
         setNavigatingId,
         unpaidAssignments,
         filteredPayments,
     } = useStudentLedger();
 
     return (
         <div className="relative isolate space-y-6 pb-10 p-5 lg:p-8">
 
             <div className="max-w-6xl mx-auto space-y-8">
                 
                 {/* Page Header */}
                 <header className="space-y-2 px-1">
                     <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 mb-2">
                         <Receipt className="h-4.5 w-4.5 text-violet-500" />
                     </div>
                     <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Financial Ledger</h1>
                     <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-[60ch] font-bold">
                         Track your complete payment history, active liabilities, and overall institutional financial summary.
                     </p>
                 </header>
 
                 <Skeleton name="ledger-summary" loading={isLoading}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {/* Total Cleared Card */}
                         <div className="group relative rounded-2xl border border-zinc-200/50 dark:border-white/[0.05] bg-white/40 dark:bg-white/[0.015] p-6 sm:p-8 flex items-center justify-between shadow-sm backdrop-blur-md transition-all duration-300">
                             <div>
                                 <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-muted-foreground flex items-center gap-2 mb-2">
                                     <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Total Cleared
                                 </p>
                                 <p className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tabular-nums tracking-tight">
                                     {formatFullCurrency(summary?.totalPaid ?? 0)}
                                 </p>
                             </div>
                             <div className="w-14 h-14 rounded-xl bg-emerald-500/5 flex items-center justify-center border border-emerald-500/10 shadow-inner">
                                 <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                             </div>
                         </div>
 
                         {/* Total Liability Card */}
                         <div className="group relative rounded-2xl border border-zinc-200/50 dark:border-white/[0.05] bg-white/40 dark:bg-white/[0.015] p-6 sm:p-8 flex items-center justify-between shadow-sm backdrop-blur-md transition-all duration-300">
                             <div>
                                 <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-muted-foreground flex items-center gap-2 mb-2">
                                     <TrendingDown className="w-3.5 h-3.5 text-rose-500" /> Outstanding
                                 </p>
                                 <p className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tabular-nums tracking-tight">
                                     {formatFullCurrency(summary?.totalOutstanding ?? 0)}
                                 </p>
                             </div>
                             <div className="w-14 h-14 rounded-xl bg-rose-500/5 flex items-center justify-center border border-rose-500/10 shadow-inner">
                                 <AlertTriangle className="w-7 h-7 text-rose-500" />
                             </div>
                         </div>
                     </div>
                 </Skeleton>
 
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                     
                     {/* ══ LEFT COLUMN: Active Targets ══ */}
                     <div className="lg:col-span-5 space-y-6">
                         <div className="flex items-center gap-2 px-1">
                             <ShieldAlert className="w-4 h-4 text-amber-500" />
                             <h3 className="text-xs font-bold text-zinc-500 dark:text-muted-foreground uppercase tracking-widest">Active Liabilities</h3>
                         </div>
 
                         <Skeleton name="active-liabilities" loading={isLoading}>
                             {unpaidAssignments.length === 0 ? (
                                 <div className="rounded-2xl border border-zinc-200/50 dark:border-white/[0.05] bg-white/40 dark:bg-white/[0.01] p-10 flex flex-col items-center justify-center text-center h-[300px] shadow-sm backdrop-blur-md">
                                     <div className="w-12 h-12 bg-emerald-500/5 rounded-xl flex items-center justify-center mb-4 ring-1 ring-emerald-500/10">
                                         <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                     </div>
                                     <h4 className="font-bold text-zinc-900 dark:text-zinc-50 mb-1">Up to date</h4>
                                     <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-[25ch] font-bold">You have settled all your institutional fee cycles.</p>
                                 </div>
                             ) : (
                                 <div className="space-y-4">
                                     <AnimatePresence>
                                         {unpaidAssignments.map((assignment, i) => {
                                             const isOverdue = assignment.status === 'OVERDUE';
                                             return (
                                                 <motion.div
                                                     key={assignment.id}
                                                     layout
                                                     initial={{ opacity: 0, y: 8 }}
                                                     animate={{ opacity: 1, y: 0 }}
                                                     className={`rounded-2xl p-6 border shadow-sm backdrop-blur-md ${isOverdue ? 'border-rose-200 dark:border-rose-500/20 bg-rose-500/5' : 'border-zinc-200/50 dark:border-white/[0.05] bg-white/40 dark:bg-white/[0.02]'}`}
                                                 >
                                                     <div className="flex justify-between items-start mb-6">
                                                         <div>
                                                             <div className="flex items-center gap-1.5 mb-2">
                                                                 <span className={`w-2 h-2 rounded-full ${isOverdue ? 'bg-rose-500 animate-pulse' : 'bg-amber-400'}`} />
                                                                 <span className={`text-[10px] uppercase font-bold tracking-widest ${isOverdue ? 'text-rose-700 dark:text-rose-400' : 'text-amber-700 dark:text-amber-400'}`}>
                                                                     {isOverdue ? 'OVERDUE' : 'PENDING'}
                                                                 </span>
                                                             </div>
                                                             <h4 className="font-bold text-zinc-900 dark:text-zinc-50 text-sm tracking-tight leading-tight">{assignment?.feeStructure?.program?.name}</h4>
                                                             <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-bold mt-0.5">
                                                                 <Layers className="h-3 w-3" />
                                                                 Semester {assignment?.feeStructure?.semester}
                                                             </div>
                                                         </div>
                                                         <div className="text-right">
                                                             <p className="text-[10px] uppercase font-bold text-zinc-400 dark:text-muted-foreground mb-1">Due Amount</p>
                                                             <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tabular-nums tracking-tight">
                                                                 {formatFullCurrency(assignment.amountDue - assignment.amountPaid)}
                                                             </p>
                                                         </div>
                                                     </div>
 
                                                     <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/5 dark:bg-black/20 border border-zinc-200/50 dark:border-white/[0.02] mb-6 text-xs">
                                                         <div className="flex items-center gap-2">
                                                             <Clock className="w-4 h-4 text-zinc-400" />
                                                             <span className="text-zinc-500 dark:text-zinc-400 font-bold">Due By</span>
                                                         </div>
                                                         <span className="font-bold text-zinc-900 dark:text-zinc-100">
                                                             {format(new Date(assignment.dueDate), "dd MMM, yyyy")}
                                                         </span>
                                                     </div>
 
                                                     <Button 
                                                         onClick={() => {
                                                             setNavigatingId(assignment.id);
                                                             window.location.href = `/student/payfee?assignmentId=${assignment.id}`;
                                                         }}
                                                         disabled={navigatingId !== null}
                                                         className={`w-full h-11 font-bold text-xs rounded-xl transition-all duration-300 disabled:opacity-70 flex items-center justify-center shadow-md ${isOverdue ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20' : 'bg-gold-500 text-navy-950 hover:bg-gold-600 shadow-gold-500/20'}`}>
                                                         {navigatingId === assignment.id ? (
                                                             <>
                                                                 <div className="w-4 h-4 border-2 rounded-full animate-spin mr-2 border-current/20 border-t-current" />
                                                                 Connecting...
                                                             </>
                                                         ) : (
                                                             <>
                                                                 Pay Now
                                                                 <ArrowRight className="w-4 h-4 ml-2" />
                                                             </>
                                                         )}
                                                     </Button>
                                                 </motion.div>
                                             );
                                         })}
                                     </AnimatePresence>
                                 </div>
                             )}
                         </Skeleton>
                     </div>
 
                     {/* ══ RIGHT COLUMN: Transaction Timeline ══ */}
                     <div className="lg:col-span-7 space-y-6">
                         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
                             <div className="flex items-center gap-2">
                                 <Wallet className="w-4 h-4 text-sky-500" />
                                 <h3 className="text-xs font-bold text-zinc-500 dark:text-muted-foreground uppercase tracking-widest">Transaction Timeline</h3>
                             </div>
                             
                             <div className="p-1 rounded-xl bg-white/40 dark:bg-white/[0.03] border border-zinc-200/50 dark:border-white/[0.05] inline-flex shadow-sm backdrop-blur-md">
                                 {(["all", "completed", "pending"] as const).map((f) => (
                                     <button
                                         key={f}
                                         onClick={() => setFilter(f)}
                                         className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                                             filter === f 
                                             ? 'bg-zinc-900 dark:bg-white text-white dark:text-navy-950 shadow-sm' 
                                             : 'text-zinc-500 dark:text-muted-foreground hover:text-zinc-900 dark:hover:text-foreground'
                                         }`}
                                     >
                                         {f}
                                     </button>
                                 ))}
                             </div>
                         </div>
 
                         <Skeleton name="ledger-transactions" loading={isLoading}>
                             <div className="rounded-2xl border border-zinc-200/50 dark:border-white/[0.05] bg-white/40 dark:bg-white/[0.01] overflow-hidden shadow-sm backdrop-blur-md">
                                 {filteredPayments.length === 0 ? (
                                     <div className="h-[400px] flex flex-col items-center justify-center text-center p-6">
                                         <Receipt className="w-10 h-10 mb-4 text-zinc-300 dark:text-zinc-700" strokeWidth={1} />
                                         <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">No Transaction Data</p>
                                         <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 max-w-[30ch] font-bold">
                                             There are no financial records matching your current filter.
                                         </p>
                                     </div>
                                 ) : (
                                     <div className="divide-y divide-zinc-100 dark:divide-white/[0.05]">
                                         <AnimatePresence mode="popLayout">
                                             {filteredPayments.map((payment: any) => (
                                                 <motion.div
                                                     layout
                                                     initial={{ opacity: 0 }}
                                                     animate={{ opacity: 1 }}
                                                     key={payment.id}
                                                     className="p-5 sm:p-6 hover:bg-zinc-50/50 dark:hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                                                 >
                                                     <div className="flex items-center gap-4">
                                                         <div className="w-12 h-12 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/50 dark:border-white/[0.05] flex items-center justify-center flex-shrink-0 group-hover:bg-white dark:group-hover:bg-white/[0.05] transition-colors shadow-inner">
                                                             {payment.method === 'STRIPE_CARD' ? (
                                                                 <Wallet className="w-5 h-5 text-sky-500" />
                                                             ) : (
                                                                 <Receipt className="w-5 h-5 text-emerald-500" />
                                                             )}
                                                         </div>
                                                         <div>
                                                             <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm tracking-tight mb-1">{payment.assignmentLabel}</h4>
                                                             <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest">
                                                                 <span className="font-mono">{payment.receiptNumber}</span>
                                                                 <span className="w-1 h-1 rounded-full bg-zinc-200 dark:bg-white/20" />
                                                                 <span>{format(new Date(payment.createdAt), "dd MMM yyyy")}</span>
                                                             </div>
                                                         </div>
                                                     </div>
 
                                                     <div className="flex items-center gap-6 sm:justify-end">
                                                         <div className="text-left sm:text-right">
                                                             <p className="font-bold text-zinc-900 dark:text-zinc-50 tabular-nums text-sm tracking-tight">
                                                                 {formatFullCurrency(payment.amount)}
                                                             </p>
                                                             <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-0.5">Confirmed</p>
                                                         </div>
                                                         <div className="w-[100px] flex justify-end">
                                                             <StatusBadge status={payment.status === 'COMPLETED' ? 'active' : 'inactive'} />
                                                         </div>
                                                     </div>
                                                 </motion.div>
                                             ))}
                                         </AnimatePresence>
                                     </div>
                                 )}
                             </div>
                         </Skeleton>
                     </div>
                 </div>
             </div>
         </div>
     );
 }
