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
    { semester: "2nd Semester", amount: 48000, paidOn: "Jan 20, 2025", method: "JazzCash", transactionId: "TXN-2025-00245", status: "paid" as const },
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
                        <span className="text-xl sm:text-2xl font-bold text-gold-300 font-[family-name:var(--font-playfair)] tabular-nums">
                            {d}
                        </span>
                    </div>
                ))}
            </div>
            <span className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-medium">
                {label}
            </span>
        </div>
    );
}

/* ─── Main ─── */
export default function StudentDashboard() {
    const [showBreakdown, setShowBreakdown] = useState(false);
    const time = useCountdown(DEADLINE);

    const elapsed =
        ((Date.now() - START.getTime()) / (DEADLINE.getTime() - START.getTime())) * 100;
    const progress = Math.min(Math.max(elapsed, 0), 100);
    const urgency = progress > 85 ? "rose" : progress > 65 ? "amber" : "emerald";

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-8">
            {/* ═══════════════ HERO FEE CARD ═══════════════ */}
            {FEE_STATUS === "unpaid" ? (
                /* ── UNPAID STATE ── */
                <div className="relative rounded-2xl overflow-hidden border border-amber-500/15 shadow-2xl shadow-black/40">
                    {/* Top accent bar */}
                    <div className="h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

                    {/* Background mesh */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0d1321] via-[#0f1926] to-[#0a0e1a]" />
                    <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl" />
                    <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-gold-500/4 blur-3xl" />

                    <div className="relative p-6 sm:p-8 lg:p-10">
                        {/* Status pill */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/8 border border-amber-500/20 mb-6">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-[11px] font-semibold text-amber-300 tracking-[0.12em] uppercase">
                                Payment Due
                            </span>
                        </div>

                        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start">
                            {/* Left ── Amount + CTA */}
                            <div>
                                <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">
                                    4th Semester · BS Computer Science
                                </p>
                                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-playfair)] mb-6 bg-gradient-to-br from-gold-300 via-gold-400 to-amber-600 bg-clip-text text-transparent">
                                    {formatFullCurrency(totalFee)}
                                </h2>

                                {/* Meta row */}
                                <div className="flex flex-wrap gap-4 mb-8 text-sm text-slate-400">
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5 text-amber-400/60" />
                                        Deadline: <span className="text-amber-300 font-medium ml-1">March 15, 2026</span>
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Shield className="w-3.5 h-3.5 text-slate-500" />
                                        Session 2024–2028
                                    </span>
                                </div>

                                {/* Action buttons */}
                                <div className="flex flex-wrap gap-3">
                                    <Link href="/student/payfee">
                                        <Button className="h-11 px-6 bg-gradient-to-r from-gold-600 to-amber-500 hover:from-gold-500 hover:to-amber-400 text-[#050811] font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-amber-500/30">
                                            <CreditCard className="w-4 h-4 mr-2" />
                                            Pay Now
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        className="h-11 px-5 border border-gold-500/15 text-gold-400/80 hover:text-gold-300 hover:bg-gold-500/5 rounded-xl text-sm"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Challan PDF
                                    </Button>
                                </div>
                            </div>

                            {/* Right ── Countdown */}
                            <div className="flex flex-col items-center gap-4">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                    Time Remaining
                                </p>
                                <div className="flex items-start gap-2.5">
                                    <DigitBlock value={time.days} label="Days" />
                                    <span className="text-gold-500/40 text-2xl font-bold mt-2.5">:</span>
                                    <DigitBlock value={time.hours} label="Hours" />
                                    <span className="text-gold-500/40 text-2xl font-bold mt-2.5">:</span>
                                    <DigitBlock value={time.minutes} label="Min" />
                                    <span className="text-gold-500/40 text-2xl font-bold mt-2.5">:</span>
                                    <DigitBlock value={time.seconds} label="Sec" />
                                </div>

                                {/* Progress */}
                                <div className="w-full space-y-1.5 mt-2">
                                    <div className="flex justify-between text-[10px] text-slate-500">
                                        <span>Jan 1</span>
                                        <span className={urgency === "rose" ? "text-rose-400 font-medium" : urgency === "amber" ? "text-amber-400 font-medium" : "text-emerald-400 font-medium"}>
                                            {Math.round(progress)}% elapsed
                                        </span>
                                        <span>Mar 15</span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-[#1a2332] overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${urgency === "rose"
                                                    ? "bg-gradient-to-r from-amber-500 to-rose-500"
                                                    : urgency === "amber"
                                                        ? "bg-gradient-to-r from-emerald-500 to-amber-400"
                                                        : "bg-gradient-to-r from-emerald-500 to-emerald-400"
                                                }`}
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* ── PAID STATE ── */
                <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl shadow-black/40">
                    <div className="h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0d1321] via-[#0f1a18] to-[#0a0e1a]" />
                    <div className="stamp-paid pointer-events-none select-none">PAID</div>
                    <div className="relative p-6 sm:p-8 lg:p-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/8 border border-emerald-500/20 mb-6">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-[11px] font-semibold text-emerald-300 tracking-[0.12em] uppercase">
                                Fee Cleared
                            </span>
                        </div>
                        <h2 className="text-4xl font-bold font-[family-name:var(--font-playfair)] text-emerald-400 mb-3">
                            {formatFullCurrency(totalFee)}
                        </h2>
                        <div className="space-y-1.5 text-sm text-slate-400 mb-6">
                            <p>Paid on <span className="text-foreground font-medium">Jan 22, 2026 — 3:45 PM</span></p>
                            <p>Transaction <span className="text-foreground font-mono text-xs">TXN-2026-00456</span></p>
                            <p>Via <span className="text-foreground font-medium">Stripe (Visa ****1234)</span></p>
                        </div>
                        <div className="flex gap-3">
                            <Button className="h-10 px-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/15 rounded-xl text-sm">
                                <Download className="w-4 h-4 mr-2" /> Receipt
                            </Button>
                            <Button variant="ghost" className="h-10 px-5 border border-gold-500/15 text-gold-400/70 hover:text-gold-300 rounded-xl text-sm">
                                View Details
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* ═══════════════ STAT CARDS ═══════════════ */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    {
                        label: "Current Semester",
                        value: "4th",
                        sub: "BS Computer Science",
                        icon: BookOpen,
                        accent: "sky",
                    },
                    {
                        label: "Total Paid (All Semesters)",
                        value: formatFullCurrency(146000),
                        sub: "3 semesters completed",
                        icon: Wallet,
                        accent: "emerald",
                    },
                    {
                        label: "Due This Semester",
                        value: formatFullCurrency(totalFee),
                        sub: "Deadline Mar 15, 2026",
                        icon: Receipt,
                        accent: "amber",
                    },
                ].map((card, i) => (
                    <div
                        key={card.label}
                        className="relative rounded-xl border border-white/[0.04] bg-gradient-to-br from-[#0d1321] to-[#0a0e1a] p-5 overflow-hidden group hover:border-gold-500/15 transition-all duration-300"
                        style={{ animationDelay: `${i * 80}ms` }}
                    >
                        <div
                            className={`absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-30 ${card.accent === "sky"
                                    ? "bg-sky-500"
                                    : card.accent === "emerald"
                                        ? "bg-emerald-500"
                                        : "bg-amber-500"
                                }`}
                        />
                        <div
                            className={`w-9 h-9 rounded-xl mb-4 flex items-center justify-center ${card.accent === "sky"
                                    ? "bg-sky-500/10"
                                    : card.accent === "emerald"
                                        ? "bg-emerald-500/10"
                                        : "bg-amber-500/10"
                                }`}
                        >
                            <card.icon
                                className={`w-4.5 h-4.5 ${card.accent === "sky"
                                        ? "text-sky-400"
                                        : card.accent === "emerald"
                                            ? "text-emerald-400"
                                            : "text-amber-400"
                                    }`}
                            />
                        </div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1.5">{card.label}</p>
                        <p className="text-xl font-bold text-foreground font-[family-name:var(--font-playfair)] leading-tight mb-1">
                            {card.value}
                        </p>
                        <p className="text-xs text-slate-500">{card.sub}</p>
                    </div>
                ))}
            </div>

            {/* ═══════════════ FEE BREAKDOWN ═══════════════ */}
            <div className="rounded-xl border border-white/[0.04] bg-gradient-to-br from-[#0d1321] to-[#0a0e1a] overflow-hidden">
                <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-gold-500/10 flex items-center justify-center">
                            <Receipt className="w-3.5 h-3.5 text-gold-400" />
                        </div>
                        <span className="text-sm font-semibold text-foreground font-[family-name:var(--font-playfair)]">
                            Fee Breakdown — 4th Semester
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gold-400">{formatFullCurrency(totalFee)}</span>
                        {showBreakdown ? (
                            <ChevronUp className="w-4 h-4 text-slate-500" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                        )}
                    </div>
                </button>

                {showBreakdown && (
                    <div className="px-5 pb-5 border-t border-white/[0.04]">
                        <div className="pt-4 space-y-1">
                            {feeBreakdown.map((item) => {
                                const pct = Math.round((item.amount / totalFee) * 100);
                                return (
                                    <div key={item.label} className="py-2.5">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-sm text-slate-400">{item.label}</span>
                                            <span className="text-sm font-medium text-foreground">
                                                {formatFullCurrency(item.amount)}
                                            </span>
                                        </div>
                                        <div className="h-1 rounded-full bg-[#1a2332]">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-700"
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="flex justify-between items-center pt-3 border-t border-gold-500/10 mt-2">
                                <span className="text-sm font-bold text-gold-400">Total</span>
                                <span className="text-lg font-bold text-gold-gradient font-[family-name:var(--font-playfair)]">
                                    {formatFullCurrency(totalFee)}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ═══════════════ PAYMENT HISTORY ═══════════════ */}
            <div className="rounded-xl border border-white/[0.04] bg-gradient-to-br from-[#0d1321] to-[#0a0e1a] overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.04] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-sky-500/10 flex items-center justify-center">
                            <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
                        </div>
                        <span className="text-sm font-semibold text-foreground font-[family-name:var(--font-playfair)]">
                            Payment History
                        </span>
                    </div>
                    <span className="text-xs text-slate-500">{paymentHistory.length} records</span>
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/[0.04] hover:bg-transparent">
                                {["Semester", "Amount", "Paid On", "Method", "Transaction ID", "Status"].map(
                                    (h) => (
                                        <TableHead
                                            key={h}
                                            className="text-[10px] text-slate-500 uppercase tracking-widest font-medium"
                                        >
                                            {h}
                                        </TableHead>
                                    )
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paymentHistory.map((p) => (
                                <TableRow
                                    key={p.transactionId}
                                    className="border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                                >
                                    <TableCell className="text-sm font-medium">{p.semester}</TableCell>
                                    <TableCell className="text-sm font-semibold text-gold-400">
                                        {formatFullCurrency(p.amount)}
                                    </TableCell>
                                    <TableCell className="text-sm text-slate-400">{p.paidOn}</TableCell>
                                    <TableCell className="text-sm text-slate-400">{p.method}</TableCell>
                                    <TableCell className="text-xs font-mono text-slate-500">
                                        {p.transactionId}
                                    </TableCell>
                                    <TableCell>
                                        <StatusBadge status={p.status} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
