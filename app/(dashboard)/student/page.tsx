"use client";

import { useState } from "react";
import Link from "next/link";
import {
    AlertTriangle,
    CheckCircle2,
    Clock,
    Download,
    CreditCard,
    ChevronDown,
    ChevronUp,
    BookOpen,
    Wallet,
    Receipt,
    ArrowRight,
    Zap,
    TrendingUp,
    Shield,
    Clock3,
    User,
    ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatFullCurrency } from "@/config/constants";
import { Skeleton } from "boneyard-js/react";
import { useStudentDashboard, ordinal, type FlatPayment } from "@/hooks/student/useStudentDashboard";

/* ─── Digit Block ─── */
function DigitBlock({ value, label }: { value: number; label: string }) {
    const str = String(value).padStart(2, "0");
    return (
        <div className="flex flex-col items-center gap-1.5">
            <div className="relative flex gap-1">
                {str.split("").map((d, i) => (
                    <div
                        key={i}
                        className="w-10 h-12 sm:w-12 sm:h-14 rounded-lg bg-gradient-to-b from-[#1a2640] to-[#111827] border border-gold-500/15 flex items-center justify-center shadow-lg shadow-black/30"
                    >
                        <span className="text-xl sm:text-2xl font-bold text-gold-300 tabular-nums tracking-tight">
                            {d}
                        </span>
                    </div>
                ))}
            </div>
            <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-medium">
                {label}
            </span>
        </div>
    );
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
        paidSemestersCount,
        latestPaidAssignment,
        allPayments,
        countdown,
        progressPct,
        isLoading,
        isError,
        historyOpen,
        setHistoryOpen,
    } = useStudentDashboard();

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <AlertTriangle className="w-12 h-12 text-amber-400" />
                <p className="text-sm text-muted-foreground italic">Failed to synchronize your academic ledger. Please refresh.</p>
                <Button variant="outline" onClick={() => window.location.reload()} className="border-gold-500/20 text-gold-400">
                    Retry Sync
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in duration-700">
            {/* ═══════ HEADER ═══════ */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] font-black text-gold-500/60 mb-1.5 flex items-center gap-2">
                        <div className="w-4 h-[1px] bg-gold-500/40" /> Student Ledger
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground">
                        Financial <span className="text-gold-gradient">Overview</span>
                    </h1>
                </div>
                {!isLoading && profile && (
                    <div className="flex items-center gap-3 bg-white/5 border border-white/[0.05] p-2 pr-4 rounded-2xl">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-navy-950 font-black text-sm shadow-lg shadow-gold-500/10">
                            {profile.user.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-foreground leading-tight">{profile.user.name}</span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{profile.studentId}</span>
                        </div>
                    </div>
                )}
            </header>

            {/* ═══════ FEE STATUS CARD ═══════ */}
            <Skeleton name="student-fee-card" loading={isLoading}>
                <div className="relative rounded-[2rem] border border-white/[0.05] bg-gradient-to-br from-[#0d1321] to-[#080c14] overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 blur-[100px] pointer-events-none" />

                    <div className="relative p-6 sm:p-10">
                        {/* ─── ACTIVE UNPAID / OVERDUE STATE ─── */}
                        {current && (
                            <>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                                    {/* Amount and Deadline */}
                                    <div>
                                        <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">Liability Outstanding</p>
                                        <p className="text-3xl sm:text-4xl font-bold text-gold-gradient tracking-tight mb-3">
                                            {formatFullCurrency(current.amountDue - current.amountPaid)}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Clock className={`w-3.5 h-3.5 ${isOverdue ? 'text-rose-400' : ''}`} />
                                            <span>Deadline: <span className={`${isOverdue ? 'text-rose-400' : 'text-amber-400'} font-semibold`}>
                                                {new Date(current.dueDate).toLocaleDateString("en-PK", { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span></span>
                                        </div>
                                    </div>

                                    {/* Countdown */}
                                    {!isOverdue && (
                                        <div className="rounded-xl border border-white/[0.05] bg-navy-900/50 p-5">
                                            <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold mb-3 text-center">Remaining Liquidity Period</p>
                                            <div className="flex items-center gap-3 sm:gap-4">
                                                <DigitBlock value={countdown.days} label="Days" />
                                                <span className="text-gold-500/30 text-xl font-bold pb-6">:</span>
                                                <DigitBlock value={countdown.hours} label="Hours" />
                                                <span className="text-gold-500/30 text-xl font-bold pb-6">:</span>
                                                <DigitBlock value={countdown.minutes} label="Mins" />
                                                <span className="text-gold-500/30 text-xl font-bold pb-6">:</span>
                                                <DigitBlock value={countdown.seconds} label="Secs" />
                                            </div>
                                        </div>
                                    )}
                                    {isOverdue && (
                                        <div className="flex items-center gap-4 bg-rose-500/10 border border-rose-500/20 px-6 py-4 rounded-2xl">
                                            <AlertTriangle className="w-8 h-8 text-rose-400 animate-pulse" />
                                            <div>
                                                <p className="text-sm font-bold text-rose-400">Payment Overdue</p>
                                                <p className="text-xs text-rose-300/60 font-medium">Fine accumulation active.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Progress */}
                                <div className="mb-8">
                                    <div className="flex justify-between text-xs text-muted-foreground mb-2 font-medium">
                                        <span>Institutional Term Cycles</span>
                                        <span className="text-amber-400">{Math.round(progressPct)}% Elapsed</span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${isOverdue ? 'bg-rose-500' : 'bg-gradient-to-r from-gold-600 to-amber-400'}`}
                                            style={{ width: `${progressPct}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Fee Breakdown Grid */}
                                <div className="grid md:grid-cols-2 gap-8 mb-10">
                                    <div className="space-y-3">
                                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <Receipt className="w-3.5 h-3.5" /> Itemized Charges
                                        </h3>
                                        {[
                                            { label: "Tuition Fee", val: current.feeStructure.tuitionFee, icon: BookOpen },
                                            { label: "Lab Fee", val: current.feeStructure.labFee, icon: Zap },
                                            { label: "Library Fee", val: current.feeStructure.libraryFee, icon: Receipt },
                                        ].map(f => (
                                            <div key={f.label} className="flex justify-between items-center text-sm">
                                                <span className="text-muted-foreground">{f.label}</span>
                                                <span className="font-medium text-foreground tabular-nums">{formatFullCurrency(f.val)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <TrendingUp className="w-3.5 h-3.5" /> Administrative
                                        </h3>
                                        {[
                                            { label: "Registration", val: current.feeStructure.registrationFee },
                                            { label: "Sports", val: current.feeStructure.sportsFee },
                                        ].map(f => (
                                            <div key={f.label} className="flex justify-between items-center text-sm">
                                                <span className="text-muted-foreground">{f.label}</span>
                                                <span className="font-medium text-foreground tabular-nums">{formatFullCurrency(f.val)}</span>
                                            </div>
                                        ))}
                                        {current.discountApplied > 0 && (
                                            <div className="flex justify-between items-center text-sm pt-2 border-t border-white/5">
                                                <span className="text-emerald-400 font-bold">Scholarship Waiver</span>
                                                <span className="font-bold text-emerald-400">-{formatFullCurrency(current.discountApplied)}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <Link href="/student/payfee">
                                    <Button className="w-full h-14 bg-gold-gradient hover:opacity-90 text-navy-950 font-bold text-base shadow-xl shadow-gold-500/10 transition-all rounded-2xl group active:scale-[0.98]">
                                        Pay
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
                                    <Link href="/student/paymentsuccess">
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

            {/* ═══════ QUICK STATS ═══════ */}
            <Skeleton name="student-fee-stats" loading={isLoading}>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                        { label: "Active Program", value: profile?.program.alias ?? "—", sub: profile?.program.name ?? "—", icon: BookOpen, color: "text-sky-400", bg: "bg-sky-500/10" },
                        { label: "Roll ID", value: profile?.studentId ?? "—", sub: "Institutional ID", icon: User, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                        { label: "Total Paid", value: summary ? formatFullCurrency(summary.totalPaid) : "—", sub: `${paidSemestersCount} Semesters`, icon: Wallet, color: "text-gold-400", bg: "bg-gold-500/10" },
                        { label: "Outstanding", value: summary ? formatFullCurrency(summary.totalOutstanding) : "—", sub: isOverdue ? "Overdue Alert" : "Settled", icon: isOverdue ? AlertTriangle : CheckCircle2, color: isOverdue ? "text-rose-400" : "text-emerald-400", bg: isOverdue ? "bg-rose-500/10" : "bg-emerald-500/10" },
                    ].map((stat) => (
                        <div key={stat.label} className="rounded-2xl border border-white/[0.05] bg-gradient-to-br from-[#0d1321] to-[#080c14] p-4 hover:border-white/[0.08] transition-all duration-200">
                            <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                            </div>
                            <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold mb-0.5">{stat.label}</p>
                            <p className="text-xl font-bold text-foreground tracking-tight">{stat.value}</p>
                            <p className="text-xs text-muted-foreground/70 mt-0.5 truncate">{stat.sub}</p>
                        </div>
                    ))}
                </div>
            </Skeleton>

            {/* ═══════ PAYMENT HISTORY ═══════ */}
            <div className="rounded-2xl border border-white/[0.05] bg-[#0a0e1a] overflow-hidden">
                <button
                    onClick={() => setHistoryOpen(!historyOpen)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <Receipt className="w-4.5 h-4.5 text-gold-500/50" />
                        <h3 className="text-sm font-bold text-foreground">Transaction Chronicle</h3>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-gold-500/8 border border-gold-500/15 text-gold-400 font-semibold">
                            {allPayments.length}
                        </span>
                    </div>
                    {historyOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </button>

                {historyOpen && (
                    <div className="border-t border-white/[0.04] animate-in slide-in-from-top-2 duration-200">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-white/5 hover:bg-transparent">
                                        <TableHead className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold px-6">Source</TableHead>
                                        <TableHead className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold">Volume</TableHead>
                                        <TableHead className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold">Timestamp</TableHead>
                                        <TableHead className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold">Gateway</TableHead>
                                        <TableHead className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold">Reference</TableHead>
                                        <TableHead className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {allPayments.map((p) => (
                                        <TableRow key={p.id} className="border-white/5 hover:bg-white/[0.01] transition-colors">
                                            <TableCell className="text-sm font-medium px-6">{p.assignmentLabel}</TableCell>
                                            <TableCell className="text-sm text-foreground tabular-nums">{formatFullCurrency(p.amount)}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground truncate">{new Date(p.createdAt).toLocaleDateString("en-PK", { day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                                                    <CreditCard className="w-3 h-3" /> {p.method === 'STRIPE_CARD' ? 'Stripe' : 'Challan'}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-xs font-mono text-muted-foreground">{p.receiptNumber}</TableCell>
                                            <TableCell><StatusBadge status={p.status === 'COMPLETED' ? 'active' : 'inactive'} /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
