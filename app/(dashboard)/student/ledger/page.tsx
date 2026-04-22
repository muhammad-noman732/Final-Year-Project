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
    TrendingUp
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
        <div className="max-w-6xl mx-auto space-y-10 pb-20 pt-4 animate-in fade-in duration-500 px-4 sm:px-6">
            
            {/* Page Header */}
            <header className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Financial Ledger</h1>
                <p className="text-sm text-muted-foreground max-w-[60ch]">
                    Track your complete payment history, active liabilities, and overall institutional financial summary.
                </p>
            </header>

            <Skeleton name="ledger-summary" loading={isLoading}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Total Cleared Card */}
                        <div className="rounded-[2rem] border border-white/[0.05] bg-gradient-to-br from-white/[0.02] to-transparent p-6 sm:p-8 flex items-center justify-between">
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-2">
                                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Total Cleared
                                </p>
                                <p className="text-3xl md:text-4xl font-bold text-foreground tabular-nums tracking-tight">
                                    {formatFullCurrency(summary?.totalPaid ?? 0)}
                                </p>
                            </div>
                            <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                            </div>
                        </div>

                        {/* Total Liability Card */}
                        <div className="rounded-[2rem] border border-white/[0.05] bg-gradient-to-br from-white/[0.02] to-transparent p-6 sm:p-8 flex items-center justify-between">
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-2">
                                    <TrendingDown className="w-3.5 h-3.5 text-rose-400" /> Outstanding Liability
                                </p>
                                <p className="text-3xl md:text-4xl font-bold text-foreground tabular-nums tracking-tight">
                                    {formatFullCurrency(summary?.totalOutstanding ?? 0)}
                                </p>
                            </div>
                            <div className="w-14 h-14 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                                <AlertTriangle className="w-6 h-6 text-rose-400" />
                            </div>
                        </div>
                    </div>
            </Skeleton>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* ══ LEFT COLUMN: Active Targets Layout (Card Format) ══ */}
                <div className="lg:col-span-5 space-y-6">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 px-1">
                        <ShieldAlert className="w-4 h-4 text-amber-500" /> Attention Required
                    </h3>

                    <Skeleton name="active-liabilities" loading={isLoading}>
                        {unpaidAssignments.length === 0 ? (
                            <div className="rounded-[2rem] border border-white/[0.05] bg-white/[0.01] p-10 flex flex-col items-center justify-center text-center h-[300px]">
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                </div>
                                <h4 className="font-bold text-foreground mb-1">Up to date</h4>
                                <p className="text-xs text-muted-foreground max-w-[25ch]">You have settled all your institutional fee cycles.</p>
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
                                                initial={{ opacity: 0, scale: 0.98 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className={`rounded-[2rem] p-6 border ${isOverdue ? 'border-rose-500/20 bg-rose-500/[0.02]' : 'border-white/[0.05] bg-white/[0.02]'}`}
                                            >
                                                <div className="flex justify-between items-start mb-6">
                                                    <div>
                                                        <div className="flex items-center gap-1.5 mb-2">
                                                            <span className={`w-2 h-2 rounded-full ${isOverdue ? 'bg-rose-500 animate-pulse' : 'bg-amber-400'}`} />
                                                            <span className={`text-[10px] uppercase font-bold tracking-widest ${isOverdue ? 'text-rose-400' : 'text-amber-400'}`}>
                                                                {isOverdue ? 'OVERDUE' : 'PENDING'}
                                                            </span>
                                                        </div>
                                                        <h4 className="font-bold text-foreground text-sm tracking-tight">{assignment?.feeStructure?.program?.name}</h4>
                                                        <p className="text-xs text-muted-foreground mt-0.5">Semester {assignment?.feeStructure?.semester}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Due Amount</p>
                                                        <p className="text-lg font-bold text-foreground tabular-nums tracking-tight">
                                                            {formatFullCurrency(assignment.amountDue - assignment.amountPaid)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/[0.02] mb-6 text-xs">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-muted-foreground" />
                                                        <span className="text-muted-foreground">Due By</span>
                                                    </div>
                                                    <span className="font-bold text-foreground">
                                                        {format(new Date(assignment.dueDate), "dd MMM, yyyy")}
                                                    </span>
                                                </div>

                                                <Button 
                                                    onClick={() => {
                                                        setNavigatingId(assignment.id);
                                                        window.location.href = `/student/payfee?assignmentId=${assignment.id}`;
                                                    }}
                                                    disabled={navigatingId !== null}
                                                    className={`w-full h-11 font-bold text-xs rounded-xl transition-all disabled:opacity-70 disabled:cursor-wait flex items-center justify-center ${isOverdue ? 'bg-rose-500 hover:bg-rose-600 text-white' : 'bg-white text-navy-950 hover:bg-white/90'}`}>
                                                    {navigatingId === assignment.id ? (
                                                        <>
                                                            <div className={`w-4 h-4 border-2 rounded-full animate-spin mr-2 flex-shrink-0 ${isOverdue ? 'border-white/30 border-t-white' : 'border-navy-950/20 border-t-navy-950'}`} />
                                                            Connecting...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Pay Now
                                                            <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
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

                {/* ══ RIGHT COLUMN: Transaction History Boxed List ══ */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                            <Receipt className="w-4 h-4 text-sky-400" /> Transaction Timeline
                        </h3>
                        
                        <div className="p-1 rounded-xl bg-white/[0.03] border border-white/[0.05] inline-flex">
                            {(["all", "completed", "pending"] as const).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                                        filter === f 
                                        ? 'bg-white/10 text-foreground shadow-sm' 
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Skeleton name="ledger-transactions" loading={isLoading}>
                        <div className="rounded-[2rem] border border-white/[0.05] bg-white/[0.01] overflow-hidden">
                            {filteredPayments.length === 0 ? (
                                <div className="h-[400px] flex flex-col items-center justify-center text-center opacity-70 p-6">
                                    <Receipt className="w-10 h-10 mb-4 text-muted-foreground" />
                                    <p className="text-sm font-bold">No Transaction Data</p>
                                    <p className="text-xs text-muted-foreground mt-2 max-w-[30ch]">
                                        There are no financial records matching your current filter.
                                    </p>
                                </div>
                            ) : (
                                <div className="divide-y divide-white/[0.05]">
                                    <AnimatePresence mode="popLayout">
                                        {filteredPayments.map((payment: any) => (
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                key={payment.id}
                                                className="p-5 sm:p-6 hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center flex-shrink-0">
                                                        {payment.method === 'STRIPE_CARD' ? (
                                                            <Wallet className="w-5 h-5 text-sky-400" />
                                                        ) : (
                                                            <Receipt className="w-5 h-5 text-emerald-400" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-foreground text-sm tracking-tight mb-1">{payment.assignmentLabel}</h4>
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                            <span className="font-mono uppercase">{payment.receiptNumber}</span>
                                                            <span className="w-1 h-1 rounded-full bg-white/20" />
                                                            <span>{format(new Date(payment.createdAt), "dd MMM yyyy")}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-6 sm:justify-end">
                                                    <div className="text-left sm:text-right">
                                                        <p className="font-bold text-foreground tabular-nums text-sm">
                                                            {formatFullCurrency(payment.amount)}
                                                        </p>
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
    );
}
