"use client";

import { useState, useEffect, useCallback } from "react";
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

/* ─── Mock Data ─── */
const FEE_STATUS: "unpaid" | "paid" = "unpaid";

const feeBreakdown = [
    { label: "Tuition Fee", amount: 35000, icon: BookOpen },
    { label: "Lab Fee", amount: 5000, icon: Zap },
    { label: "Library Fee", amount: 3000, icon: BookOpen },
    { label: "Sports Fee", amount: 2000, icon: TrendingUp },
    { label: "Registration Fee", amount: 5000, icon: Shield },
];
const totalFee = feeBreakdown.reduce((s, i) => s + i.amount, 0);

const paymentHistory = [
    { semester: "1st Semester", amount: 48000, paidOn: "Aug 15, 2024", method: "Stripe", transactionId: "TXN-2024-00123", status: "paid" as const },
    { semester: "2nd Semester", amount: 48000, paidOn: "Jan 20, 2025", method: "Stripe", transactionId: "TXN-2025-00245", status: "paid" as const },
    { semester: "3rd Semester", amount: 50000, paidOn: "Aug 22, 2025", method: "Stripe", transactionId: "TXN-2025-00389", status: "paid" as const },
];

const DEADLINE = new Date("2026-03-15T23:59:59");
const START = new Date("2026-01-01");

/* ─── Countdown Hook ─── */
function useCountdown(target: Date) {
    const calc = useCallback(() => {
        const diff = target.getTime() - Date.now();
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return {
            days: Math.floor(diff / 86400000),
            hours: Math.floor((diff / 3600000) % 24),
            minutes: Math.floor((diff / 60000) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        };
    }, [target]);

    const [time, setTime] = useState(calc());
    useEffect(() => {
        setTime(calc());
        const t = setInterval(() => setTime(calc()), 1000);
        return () => clearInterval(t);
    }, [calc]);
    return time;
}

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

/* ─── Main ─── */
export default function StudentDashboard() {
    const countdown = useCountdown(DEADLINE);
    const [historyOpen, setHistoryOpen] = useState(false);

    const elapsed = Date.now() - START.getTime();
    const total = DEADLINE.getTime() - START.getTime();
    const progressPct = Math.min(100, Math.max(0, (elapsed / total) * 100));

    const isPaid = FEE_STATUS === "paid";

    return (
        <div className="space-y-6 pb-8 animate-in fade-in duration-500">

            {/* ═══════ FEE STATUS HERO ═══════ */}
            <div className={`relative rounded-2xl border overflow-hidden ${isPaid
                ? "border-emerald-500/15 bg-gradient-to-br from-emerald-500/5 via-[#0a0e1a] to-[#0a0e1a]"
                : "border-amber-500/15 bg-gradient-to-br from-amber-500/5 via-[#0a0e1a] to-[#0a0e1a]"
                }`}>

                {isPaid && <div className="stamp-paid">PAID</div>}

                <div className="relative p-6 sm:p-8">
                    {/* Status indicator */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isPaid ? "bg-emerald-500/10" : "bg-amber-500/10"}`}>
                            {isPaid
                                ? <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                : <AlertTriangle className="w-6 h-6 text-amber-400" />
                            }
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-foreground tracking-tight">
                                {isPaid ? "Fee Paid Successfully" : "Fee Payment Due"}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {isPaid
                                    ? "4th Semester - BS Computer Science"
                                    : "4th Semester fee is pending"}
                            </p>
                        </div>
                    </div>

                    {/* ─── Unpaid State ─── */}
                    {!isPaid && (
                        <>
                            {/* Amount + Countdown row */}
                            <div className="grid lg:grid-cols-2 gap-6 mb-6">
                                {/* Amount Card */}
                                <div className="rounded-xl border border-white/[0.05] bg-navy-900/50 p-5">
                                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">Total Amount Due</p>
                                    <p className="text-3xl sm:text-4xl font-bold text-gold-gradient tracking-tight mb-3">
                                        {formatFullCurrency(totalFee)}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>Due by <span className="text-amber-400 font-semibold">March 15, 2026</span></span>
                                    </div>
                                </div>

                                {/* Countdown */}
                                <div className="rounded-xl border border-white/[0.05] bg-navy-900/50 p-5">
                                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold mb-3">Time Remaining</p>
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
                            </div>

                            {/* Progress bar */}
                            <div className="mb-6">
                                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                                    <span>Semester started</span>
                                    <span className="text-amber-400 font-medium">{Math.round(progressPct)}% elapsed</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-gold-600 to-amber-400 transition-all duration-1000"
                                        style={{ width: `${progressPct}%` }}
                                    />
                                </div>
                            </div>

                            {/* Fee Breakdown */}
                            <div className="rounded-xl border border-white/[0.05] bg-navy-900/30 p-5 mb-6">
                                <h3 className="text-sm font-bold text-foreground tracking-tight mb-4 flex items-center gap-2">
                                    <Receipt className="w-4 h-4 text-gold-500/50" />
                                    Fee Breakdown
                                </h3>
                                <div className="space-y-2.5">
                                    {feeBreakdown.map((item) => (
                                        <div key={item.label} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center">
                                                    <item.icon className="w-3.5 h-3.5 text-muted-foreground" />
                                                </div>
                                                <span className="text-sm text-muted-foreground">{item.label}</span>
                                            </div>
                                            <span className="text-sm font-medium text-foreground tabular-nums">{formatFullCurrency(item.amount)}</span>
                                        </div>
                                    ))}
                                    <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/[0.05]">
                                        <span className="text-sm font-bold text-gold-400">Total</span>
                                        <span className="text-base font-bold text-gold-gradient tracking-tight">{formatFullCurrency(totalFee)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Pay Button — Stripe only */}
                            <Link href="/student/payfee">
                                <Button className="w-full h-12 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-navy-950 font-bold text-sm shadow-xl shadow-gold-500/20 hover:shadow-gold-500/30 transition-all duration-300 rounded-xl group">
                                    <CreditCard className="w-4.5 h-4.5 mr-2" />
                                    Pay with Stripe
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform duration-200" />
                                </Button>
                            </Link>

                            {/* Trust badges */}
                            <div className="flex items-center justify-center gap-6 mt-4">
                                {[
                                    { icon: Shield, text: "256-bit TLS" },
                                    { icon: CreditCard, text: "Stripe Secured" },
                                    { icon: CheckCircle2, text: "PCI Compliant" },
                                ].map((b) => (
                                    <div key={b.text} className="flex items-center gap-1.5 text-muted-foreground/60">
                                        <b.icon className="w-3 h-3" />
                                        <span className="text-[11px] uppercase tracking-wider font-medium">{b.text}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* ─── Paid State ─── */}
                    {isPaid && (
                        <>
                            <div className="grid sm:grid-cols-3 gap-3 mb-6">
                                {[
                                    { label: "Amount Paid", value: formatFullCurrency(totalFee), color: "text-emerald-400" },
                                    { label: "Paid On", value: "Feb 26, 2026", color: "text-foreground" },
                                    { label: "Transaction ID", value: "TXN-2026-00456", color: "text-foreground", mono: true },
                                ].map((s) => (
                                    <div key={s.label} className="rounded-xl border border-white/[0.05] bg-navy-900/50 p-4">
                                        <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold mb-1.5">{s.label}</p>
                                        <p className={`text-lg font-bold ${s.color} ${s.mono ? "font-mono text-sm" : "tracking-tight"}`}>{s.value}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Button variant="outline" className="border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/5">
                                    <Download className="w-4 h-4 mr-2" /> Download Receipt
                                </Button>
                                <Link href="/student/paymentsuccess">
                                    <Button variant="outline" className="border-gold-500/20 text-gold-400 hover:bg-gold-500/5">
                                        <Receipt className="w-4 h-4 mr-2" /> View Full Receipt
                                    </Button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* ═══════ QUICK STATS ═══════ */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 stagger-children">
                {[
                    { label: "Current Semester", value: "4th", sub: "BS Computer Science", icon: BookOpen, color: "text-sky-400", bg: "bg-sky-500/10" },
                    { label: "Session", value: "2024-28", sub: "Active enrollment", icon: Clock, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                    { label: "Total Paid", value: formatFullCurrency(146000), sub: "3 semesters", icon: Wallet, color: "text-gold-400", bg: "bg-gold-500/10" },
                    { label: "Fee Status", value: isPaid ? "Paid" : "Unpaid", sub: "4th Semester", icon: isPaid ? CheckCircle2 : AlertTriangle, color: isPaid ? "text-emerald-400" : "text-amber-400", bg: isPaid ? "bg-emerald-500/10" : "bg-amber-500/10" },
                ].map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-white/[0.05] bg-gradient-to-br from-[#0d1321] to-[#080c14] p-4 hover:border-white/[0.08] transition-all duration-200 group">
                        <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                            <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        </div>
                        <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold mb-0.5">{stat.label}</p>
                        <p className="text-xl font-bold text-foreground tracking-tight">{stat.value}</p>
                        <p className="text-xs text-muted-foreground/70 mt-0.5">{stat.sub}</p>
                    </div>
                ))}
            </div>

            {/* ═══════ PAYMENT HISTORY ═══════ */}
            <div className="rounded-2xl border border-white/[0.05] bg-[#0a0e1a] overflow-hidden">
                <button
                    onClick={() => setHistoryOpen(!historyOpen)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors duration-150"
                >
                    <div className="flex items-center gap-3">
                        <Receipt className="w-4.5 h-4.5 text-gold-500/50" />
                        <h3 className="text-sm font-bold text-foreground tracking-tight">Payment History</h3>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-gold-500/8 border border-gold-500/15 text-gold-400 font-semibold">
                            {paymentHistory.length}
                        </span>
                    </div>
                    {historyOpen
                        ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        : <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    }
                </button>

                {historyOpen && (
                    <div className="border-t border-white/[0.04] animate-in slide-in-from-top-2 duration-200">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-gold-500/5 hover:bg-transparent">
                                        <TableHead className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold px-6">Semester</TableHead>
                                        <TableHead className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold">Amount</TableHead>
                                        <TableHead className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold">Paid On</TableHead>
                                        <TableHead className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold">Method</TableHead>
                                        <TableHead className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold">Transaction</TableHead>
                                        <TableHead className="text-muted-foreground text-[11px] uppercase tracking-widest font-semibold">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paymentHistory.map((p) => (
                                        <TableRow key={p.transactionId} className="border-gold-500/5 hover:bg-white/[0.02] transition-colors duration-150">
                                            <TableCell className="text-sm font-medium px-6">{p.semester}</TableCell>
                                            <TableCell className="text-sm text-foreground tabular-nums">{formatFullCurrency(p.amount)}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{p.paidOn}</TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                                    <CreditCard className="w-3 h-3" /> {p.method}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-xs font-mono text-muted-foreground">{p.transactionId}</TableCell>
                                            <TableCell><StatusBadge status={p.status} /></TableCell>
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
