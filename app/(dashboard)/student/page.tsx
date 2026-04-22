"use client";

import Link from "next/link";
import {
    AlertTriangle,
    CheckCircle2,
    Clock,
    Download,
    BookOpen,
    Receipt,
    ArrowRight,
    Zap,
    TrendingUp,
    Clock3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFullCurrency } from "@/config/constants";
import { Skeleton } from "boneyard-js/react";
import { useStudentDashboard, ordinal } from "@/hooks/student/useStudentDashboard";

// Internal helper for countdown formatting
function formatDigit(value: number) {
    return String(value).padStart(2, "0");
}

/* Main Component */
export default function StudentDashboard() {
    const {
        profile,
        summary,
        current,
        isPaid,
        hasNoFee,
        isOverdue,
        latestPaidAssignment,
        countdown,
        progressPct,
        isLoading,
        isError,
    } = useStudentDashboard();

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in duration-700">
            {/* ═══════ HEADER ═══════ */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
                <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] font-black text-gold-500/60 mb-1.5 flex items-center gap-2">
                        <div className="w-4 h-[1px] bg-gold-500/40" /> Student Ledger
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground">
                        Financial <span className="text-gold-gradient">History</span>
                    </h1>
                </div>
                {/* Profile Widget */}
                <Skeleton name="student-profile-header" loading={isLoading}>
                    <div className="flex items-center gap-3 bg-white/5 border border-white/[0.05] p-2 pr-4 rounded-2xl opacity-100">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-navy-950 font-black text-sm shadow-lg shadow-gold-500/10">
                            {profile?.user.name.charAt(0) || "U"}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-foreground leading-tight">{profile?.user.name || "Loading..."}</span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{profile?.studentId || "0000"}</span>
                        </div>
                    </div>
                </Skeleton>
            </header>

            {/* ═══════ FEE STATUS CARD ═══════ */}
            <Skeleton name="student-fee-card" loading={isLoading}>
                <div className="relative rounded-[2rem] border border-white/[0.05] bg-gradient-to-br from-[#0d1321] to-[#080c14] overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 blur-[120px] pointer-events-none rounded-full" />

                    <div className="relative p-6 sm:p-10">
                        {/* ─── ACTIVE UNPAID / OVERDUE STATE ─── */}
                        {current && (
                            <>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                                    {/* Amount and Deadline */}
                                    <div className="relative z-10 w-full md:w-auto">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Outstanding Balance</p>
                                        </div>
                                        <p className="text-4xl sm:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight mb-4">
                                            <span className="text-xl text-white/50 font-sans mr-1">PKR</span>
                                            {(current.amountDue - current.amountPaid).toLocaleString()}
                                        </p>
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs font-medium">
                                            <Clock className={`w-3.5 h-3.5 ${isOverdue ? 'text-rose-400' : 'text-amber-400'}`} />
                                            <span className="text-muted-foreground">Due Date:</span> 
                                            <span className={`${isOverdue ? 'text-rose-400' : 'text-foreground'}`}>
                                                {new Date(current.dueDate).toLocaleDateString("en-PK", { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Countdown / Overdue Alert */}
                                    <div className="relative z-10 w-full md:w-auto flex-shrink-0">
                                    {!isOverdue ? (
                                        <div className="rounded-[1.5rem] border border-white/[0.05] bg-[#0a0f1a] p-5 shadow-inner">
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-3 text-center sm:text-left">Liquidity Window</p>
                                            <div className="flex items-baseline justify-center sm:justify-start gap-4 text-gold-400 font-mono">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-3xl font-bold">{formatDigit(countdown.days)}</span>
                                                    <span className="text-[9px] uppercase tracking-widest text-muted-foreground mt-1 font-sans">Days</span>
                                                </div>
                                                <span className="text-xl opacity-30 pb-4">:</span>
                                                <div className="flex flex-col items-center">
                                                    <span className="text-3xl font-bold">{formatDigit(countdown.hours)}</span>
                                                    <span className="text-[9px] uppercase tracking-widest text-muted-foreground mt-1 font-sans">Hrs</span>
                                                </div>
                                                <span className="text-xl opacity-30 pb-4">:</span>
                                                <div className="flex flex-col items-center">
                                                    <span className="text-3xl font-bold">{formatDigit(countdown.minutes)}</span>
                                                    <span className="text-[9px] uppercase tracking-widest text-muted-foreground mt-1 font-sans">Min</span>
                                                </div>
                                                <span className="text-xl opacity-30 pb-4">:</span>
                                                <div className="flex flex-col items-center">
                                                    <span className="text-3xl font-bold text-gold-400/50">{formatDigit(countdown.seconds)}</span>
                                                    <span className="text-[9px] uppercase tracking-widest text-muted-foreground mt-1 font-sans">Sec</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-4 bg-gradient-to-r from-rose-500/20 to-rose-500/5 border border-rose-500/20 px-6 py-5 rounded-[1.5rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                                            <AlertTriangle className="w-10 h-10 text-rose-400" />
                                            <div>
                                                <p className="text-sm font-bold text-rose-400 uppercase tracking-widest">Payment Overdue</p>
                                                <p className="text-xs text-rose-300/80 mt-1">Late fee rules applied.</p>
                                            </div>
                                        </div>
                                    )}
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="mb-10 relative z-10 w-full max-w-2xl">
                                    <div className="flex justify-between text-[11px] text-muted-foreground mb-3 font-semibold uppercase tracking-widest">
                                        <span>Academic Term Progress</span>
                                        <span className="text-gold-400">{Math.round(progressPct)}% Elapsed</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-white/[0.03] overflow-hidden backdrop-blur-sm border border-white/[0.05]">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${isOverdue ? 'bg-rose-500' : 'bg-gradient-to-r from-gold-600 to-gold-400'}`}
                                            style={{ width: `${progressPct}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Fee Breakdown Grid (Bento Style) */}
                                <div className="grid md:grid-cols-2 gap-5 mb-10 relative z-10">
                                    <div className="p-6 rounded-[1.5rem] bg-navy-900/40 border border-white/[0.05] shadow-inner space-y-4">
                                        <h3 className="text-[10px] font-bold text-gold-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                                            <Receipt className="w-3.5 h-3.5" /> Itemized Charges
                                        </h3>
                                        {[
                                            { label: "Tuition Fee", val: current.feeStructure.tuitionFee },
                                            { label: "Lab Fee", val: current.feeStructure.labFee },
                                            { label: "Library Fee", val: current.feeStructure.libraryFee },
                                        ].map(f => (
                                            <div key={f.label} className="flex justify-between items-center text-sm border-b border-white/[0.03] pb-3 last:border-0 last:pb-0">
                                                <span className="text-muted-foreground">{f.label}</span>
                                                <span className="font-mono text-foreground">{f.val.toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-6 rounded-[1.5rem] bg-navy-900/40 border border-white/[0.05] shadow-inner space-y-4">
                                        <h3 className="text-[10px] font-bold text-gold-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                                            <TrendingUp className="w-3.5 h-3.5" /> Administrative
                                        </h3>
                                        {[
                                            { label: "Registration", val: current.feeStructure.registrationFee },
                                            { label: "Sports", val: current.feeStructure.sportsFee },
                                            { label: "Examination", val: current.feeStructure.examinationFee },
                                        ].map(f => (
                                            <div key={f.label} className="flex justify-between items-center text-sm border-b border-white/[0.03] pb-3 last:border-0 last:pb-0">
                                                <span className="text-muted-foreground">{f.label}</span>
                                                <span className="font-mono text-foreground">{f.val.toLocaleString()}</span>
                                            </div>
                                        ))}
                                        {current.discountApplied > 0 && (
                                            <div className="flex justify-between items-center text-sm pt-2">
                                                <span className="text-emerald-400 font-bold tracking-tight">Scholarship Waiver</span>
                                                <span className="font-mono font-bold text-emerald-400">-{current.discountApplied.toLocaleString()}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <Link href="/student/payfee">
                                    <Button className="w-full h-14 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:via-gold-400 hover:to-gold-500 text-navy-950 font-bold text-base shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 rounded-2xl group active:scale-[0.98] border border-gold-400/20">
                                        Pay Now
                                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </>
                        )}

                        {/* ─── ALL PAID STATE ─── */}
                        {isPaid && latestPaidAssignment && (
                            <div className="text-center py-12 stagger-children">
                                <div className="w-20 h-20 rounded-[2.5rem] bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mx-auto mb-6 shadow-2xl">
                                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground">Account Settled</h3>
                                <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                                    All financial obligations for the {ordinal(latestPaidAssignment.feeStructure.semester)} semester have been cleared.
                                </p>
                                <div className="flex justify-center gap-4 mt-10">
                                    <Button variant="outline" className="border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/5 h-12 rounded-xl">
                                        <Download className="w-4 h-4 mr-2" /> Receipt
                                    </Button>
                                    <Link href="/student/ledger">
                                        <Button variant="outline" className="border-gold-500/20 text-gold-400 hover:bg-gold-500/5 h-12 rounded-xl">
                                            <Receipt className="w-4 h-4 mr-2" /> Statement
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* ─── NO FEE STATE ─── */}
                        {hasNoFee && (
                            <div className="text-center py-16 stagger-children">
                                <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5 rotate-3">
                                    <Clock3 className="w-8 h-8 text-muted-foreground/30" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground">Schedule Pending</h3>
                                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                                    Your fee schedule for the upcoming semester is being processed.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </Skeleton>
        </div>
    );
}
