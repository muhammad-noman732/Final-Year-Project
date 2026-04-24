"use client";

import Link from "next/link";
import {
    AlertTriangle,
    CheckCircle2,
    Clock,
    Receipt,
    ArrowRight,
    TrendingUp,
    Clock3,
    History,
    BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFullCurrency } from "@/config/constants";
import { Skeleton } from "boneyard-js/react";
import { useStudentDashboard, ordinal } from "@/hooks/student/useStudentDashboard";

function formatDigit(value: number) {
    return String(value).padStart(2, "0");
}

function methodLabel(method: string) {
    if (method === "STRIPE_CARD") return "Card";
    if (method === "BANK_CHALLAN") return "Challan";
    if (method === "WAIVER") return "Waiver";
    return method;
}

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
        assignments,
        allPayments,
    } = useStudentDashboard();

    const paidCount = assignments.filter((a) => a.status === "PAID").length;

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in duration-700">
            {/* ═══════ HEADER ═══════ */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
                <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] font-black text-gold-500/60 mb-1.5 flex items-center gap-2">
                        <div className="w-4 h-[1px] bg-gold-500/40" /> Student Ledger
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground">
                        Financial <span className="text-gold-gradient">Overview</span>
                    </h1>
                </div>
                <Skeleton name="student-profile-header" loading={isLoading}>
                    <div className="flex items-center gap-3 bg-white/5 border border-white/[0.05] p-2 pr-4 rounded-2xl">
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
                                            <Clock className={`w-3.5 h-3.5 ${isOverdue ? "text-rose-400" : "text-amber-400"}`} />
                                            <span className="text-muted-foreground">Due Date:</span>
                                            <span className={isOverdue ? "text-rose-400" : "text-foreground"}>
                                                {new Date(current.dueDate).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="relative z-10 w-full md:w-auto flex-shrink-0">
                                        {!isOverdue ? (
                                            <div className="rounded-[1.5rem] border border-white/[0.05] bg-[#0a0f1a] p-5 shadow-inner">
                                                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-3 text-center sm:text-left">Liquidity Window</p>
                                                <div className="flex items-baseline justify-center sm:justify-start gap-4 text-gold-400 font-mono">
                                                    {[
                                                        { val: countdown.days, label: "Days" },
                                                        { val: countdown.hours, label: "Hrs" },
                                                        { val: countdown.minutes, label: "Min" },
                                                        { val: countdown.seconds, label: "Sec" },
                                                    ].map((t, i) => (
                                                        <div key={t.label} className="flex items-baseline gap-4">
                                                            {i > 0 && <span className="text-xl opacity-30 pb-4">:</span>}
                                                            <div className="flex flex-col items-center">
                                                                <span className={`text-3xl font-bold ${i === 3 ? "text-gold-400/50" : ""}`}>{formatDigit(t.val)}</span>
                                                                <span className="text-[9px] uppercase tracking-widest text-muted-foreground mt-1 font-sans">{t.label}</span>
                                                            </div>
                                                        </div>
                                                    ))}
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

                                <div className="mb-10 relative z-10 w-full max-w-2xl">
                                    <div className="flex justify-between text-[11px] text-muted-foreground mb-3 font-semibold uppercase tracking-widest">
                                        <span>Academic Term Progress</span>
                                        <span className="text-gold-400">{Math.round(progressPct)}% Elapsed</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-white/[0.03] overflow-hidden backdrop-blur-sm border border-white/[0.05]">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${isOverdue ? "bg-rose-500" : "bg-gradient-to-r from-gold-600 to-gold-400"}`}
                                            style={{ width: `${progressPct}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-5 mb-10 relative z-10">
                                    <div className="p-6 rounded-[1.5rem] bg-navy-900/40 border border-white/[0.05] shadow-inner space-y-4">
                                        <h3 className="text-[10px] font-bold text-gold-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                                            <Receipt className="w-3.5 h-3.5" /> Itemized Charges
                                        </h3>
                                        {[
                                            { label: "Tuition Fee", val: current.feeStructure.tuitionFee },
                                            { label: "Lab Fee", val: current.feeStructure.labFee },
                                            { label: "Library Fee", val: current.feeStructure.libraryFee },
                                        ].map((f) => (
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
                                        ].map((f) => (
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

                                <Link href="/student/payfee">
                                    <Button className="w-full h-14 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:via-gold-400 hover:to-gold-500 text-navy-950 font-bold text-base shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 rounded-2xl group active:scale-[0.98] border border-gold-400/20">
                                        Pay Now
                                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </>
                        )}

                        {/* ─── ALL PAID STATE ─── */}
                        {isPaid && (
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-[1.25rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/5">
                                        <BadgeCheck className="w-7 h-7 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-500/70 font-bold mb-1">Good Standing</p>
                                        <h3 className="text-xl font-bold text-foreground tracking-tight">All Fees Cleared</h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {paidCount} semester{paidCount !== 1 ? "s" : ""} paid
                                            {summary?.totalPaid ? (
                                                <> · Total <span className="text-emerald-400 font-mono font-bold">{formatFullCurrency(summary.totalPaid)}</span></>
                                            ) : null}
                                        </p>
                                    </div>
                                </div>
                                {latestPaidAssignment && (
                                    <div className="flex-shrink-0 text-right hidden sm:block">
                                        <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-1">Last paid semester</p>
                                        <p className="text-sm font-bold text-foreground">{ordinal(latestPaidAssignment.feeStructure.semester)} Semester</p>
                                        <p className="text-xs text-muted-foreground font-mono mt-0.5">
                                            {latestPaidAssignment.paidAt
                                                ? new Date(latestPaidAssignment.paidAt).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })
                                                : "—"}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ─── NO FEE STATE ─── */}
                        {hasNoFee && (
                            <div className="text-center py-16">
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

            {/* ═══════ PAYMENT HISTORY TABLE ═══════ */}
            {!isLoading && allPayments.length > 0 && (
                <section className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-2.5">
                            <History className="w-4 h-4 text-gold-500/50" />
                            <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold text-muted-foreground">
                                Payment History
                            </h2>
                        </div>
                        <span className="text-[10px] text-muted-foreground/50 bg-white/[0.03] border border-white/[0.05] px-2.5 py-1 rounded-full">
                            {allPayments.length} transaction{allPayments.length !== 1 ? "s" : ""}
                        </span>
                    </div>

                    <div className="rounded-[2rem] border border-white/[0.05] bg-gradient-to-br from-[#0d1321] to-[#080c14] overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                        {/* Column headers — desktop only */}
                        <div className="hidden sm:grid sm:grid-cols-[2fr_1.4fr_0.8fr_1.4fr_auto] gap-4 px-6 py-3.5 border-b border-white/[0.04] bg-white/[0.015]">
                            {["Semester", "Date", "Method", "Receipt No.", "Amount"].map((h) => (
                                <span key={h} className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/50 last:text-right">{h}</span>
                            ))}
                        </div>

                        {allPayments.map((payment) => (
                            <div
                                key={payment.id}
                                className="flex flex-col sm:grid sm:grid-cols-[2fr_1.4fr_0.8fr_1.4fr_auto] gap-1.5 sm:gap-4 px-6 py-4 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors"
                            >
                                {/* Semester */}
                                <div className="flex items-center gap-2.5">
                                    <div className="w-6 h-6 rounded-lg bg-gold-500/10 border border-gold-500/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-[9px] font-bold text-gold-400">{payment.assignmentSemester}</span>
                                    </div>
                                    <p className="text-sm font-medium text-foreground">{payment.assignmentLabel}</p>
                                </div>

                                {/* Date */}
                                <span className="text-xs text-muted-foreground self-center pl-8 sm:pl-0">
                                    {payment.paidAt
                                        ? new Date(payment.paidAt).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })
                                        : "—"}
                                </span>

                                {/* Method */}
                                <span className="text-xs text-muted-foreground/70 self-center font-medium pl-8 sm:pl-0">
                                    {methodLabel(payment.method)}
                                </span>

                                {/* Receipt number */}
                                <span className="text-[10px] text-muted-foreground/50 self-center font-mono pl-8 sm:pl-0">
                                    {payment.receiptNumber}
                                </span>

                                {/* Amount */}
                                <div className="flex flex-col items-start sm:items-end self-center pl-8 sm:pl-0">
                                    <span className="text-sm font-mono font-bold text-emerald-400">
                                        {formatFullCurrency(payment.amount)}
                                    </span>
                                    <span className="flex items-center gap-1 mt-0.5">
                                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500/60" />
                                        <span className="text-[9px] text-emerald-500/60 uppercase tracking-widest font-bold">Verified</span>
                                    </span>
                                </div>
                            </div>
                        ))}

                        {/* Summary row */}
                        {summary && (
                            <div className="flex items-center justify-between px-6 py-4 bg-white/[0.01] border-t border-white/[0.04]">
                                <span className="text-[11px] uppercase tracking-widest font-bold text-muted-foreground/50">Total Paid</span>
                                <span className="text-base font-mono font-bold text-gold-400">{formatFullCurrency(summary.totalPaid)}</span>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
}
