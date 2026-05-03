"use client";
 
 import { useMemo } from "react";
 import { BookOpen, Clock, Info } from "lucide-react";
 import { formatFullCurrency } from "@/config/constants";
 import { ordinal } from "@/hooks/student/useStudentDashboard";
 import type { FeeAssignment } from "@/types/server/student.types";
 import { Skeleton } from "boneyard-js/react";
 
 interface OrderSummaryProps {
     targetAssignment: FeeAssignment | null;
     amountPkr: number;
     studentName: string;
     studentId: string;
     isLoading?: boolean;
 }
 
 export function OrderSummary({ targetAssignment, amountPkr, studentName, studentId, isLoading }: OrderSummaryProps) {
     const feeItems = useMemo(() => {
         if (!targetAssignment) return [];
         const fs = targetAssignment.feeStructure;
         return [
             { label: "Tuition Fee", amount: fs.tuitionFee },
             { label: "Lab Fee", amount: fs.labFee },
             { label: "Library Fee", amount: fs.libraryFee },
             { label: "Sports Fee", amount: fs.sportsFee },
             { label: "Registration Fee", amount: fs.registrationFee },
             { label: "Examination Fee", amount: fs.examinationFee },
             ...(fs.otherFee > 0 ? [{ label: "Other Fee", amount: fs.otherFee }] : []),
         ].filter(i => i.amount > 0);
     }, [targetAssignment]);
 
     return (
         <Skeleton name="order-summary" loading={!!isLoading}>
             <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-[#0a0e1a] overflow-hidden shadow-xl dark:shadow-2xl dark:shadow-black/30 sticky top-24 backdrop-blur-sm">
                 <div className="px-6 pt-6 pb-4 border-b border-zinc-100 dark:border-white/[0.04]">
                     <div className="flex items-center gap-3 mb-4">
                         <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center border border-gold-500/20">
                             <BookOpen className="w-5 h-5 text-gold-600 dark:text-gold-400" />
                         </div>
                         <div>
                             <h3 className="text-sm font-bold text-zinc-900 dark:text-foreground tracking-tight">
                                 {targetAssignment ? `${ordinal(targetAssignment.feeStructure.semester)} Semester` : "Loading..."}
                             </h3>
                             <p className="text-xs text-zinc-500 dark:text-muted-foreground">
                                 {targetAssignment?.feeStructure.program.name ?? "Calculating academic details..."}
                             </p>
                         </div>
                     </div>
                     <div className="space-y-1.5 text-xs">
                         {[
                             { l: "Student", v: studentName },
                             { l: "ID", v: studentId },
                         ].map((r) => (
                             <div key={r.l} className="flex justify-between">
                                 <span className="text-zinc-500 dark:text-muted-foreground">{r.l}</span>
                                 <span className="text-zinc-800 dark:text-slate-300 font-mono font-medium">{r.v || "..."}</span>
                             </div>
                         ))}
                     </div>
                 </div>
 
                 <div className="px-6 py-4 space-y-2.5">
                     {feeItems.map((item) => (
                         <div key={item.label} className="flex justify-between text-sm">
                             <span className="text-zinc-500 dark:text-muted-foreground">{item.label}</span>
                             <span className="text-zinc-900 dark:text-foreground tabular-nums font-medium">{formatFullCurrency(item.amount)}</span>
                         </div>
                     ))}
                 </div>
 
                 <div className="px-6 py-4 border-t border-zinc-100 dark:border-white/[0.04] bg-gold-50/50 dark:bg-gold-500/3">
                     <div className="flex justify-between items-center">
                         <span className="text-sm font-bold text-gold-600 dark:text-gold-400">Total</span>
                         <span className="text-2xl font-bold text-gold-gradient tracking-tight">
                             {formatFullCurrency(amountPkr)}
                         </span>
                     </div>
                 </div>
 
                 <div className="px-6 pb-4">
                     <div className="mt-3 flex items-center gap-2 px-3 py-2.5 rounded-lg bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/12">
                         <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                         <span className="text-xs text-amber-800/70 dark:text-amber-300/70">
                             {targetAssignment ? (
                                 <>Due <span className="text-amber-700 dark:text-amber-300 font-bold">{new Date(targetAssignment.dueDate).toLocaleDateString()}</span></>
                             ) : "Awaiting sync..."}
                         </span>
                     </div>
                     <div className="mt-2.5 flex items-start gap-2 px-3 py-2.5 rounded-lg bg-zinc-50 dark:bg-white/[0.02]">
                         <span className="flex-shrink-0 mt-0.5">
                             <Info className="w-3.5 h-3.5 text-zinc-400 dark:text-muted-foreground/50" />
                         </span>
                         <span className="text-[11px] text-zinc-500 dark:text-muted-foreground/60 leading-relaxed">
                             Payments are non-refundable. A digital receipt will be emailed to you immediately after payment.
                         </span>
                     </div>
                 </div>
             </div>
         </Skeleton>
     );
 }
