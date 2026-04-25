"use client";

import Link from "next/link";
import {
    AlertTriangle,
    CheckCircle2,
    Clock,
    ArrowRight,
    Receipt,
    Shield,
    BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFullCurrency } from "@/config/constants";
import { Skeleton } from "boneyard-js/react";
import { useStudentDashboard, ordinal } from "@/hooks/student/useStudentDashboard";

function pad(v: number) {
    return String(v).padStart(2, "0");
}

function methodLabel(method: string) {
    if (method === "STRIPE_CARD") return "Card";
    if (method === "BANK_CHALLAN") return "Challan";
    if (method === "WAIVER") return "Waiver";
    return method;
}

function fmt(d: string | Date | null | undefined) {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" });
}

export default function StudentDashboard() {
    const {
        profile, summary, current, isPaid, hasNoFee, isOverdue,
        latestPaidAssignment, countdown, progressPct, isLoading,
        assignments, allPayments,
    } = useStudentDashboard();

    const paidCount = assignments.filter((a) => a.status === "PAID").length;
    const outstanding = current ? current.amountDue - current.amountPaid : 0;

    return (
        <div className="relative">
            {/* Atmospheric depth — fixed, pointer-events-none, GPU-safe */}
            <div
                aria-hidden
                className="pointer-events-none fixed inset-0 -z-10"
                style={{
                    background: [
                        "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(212,168,67,0.04) 0%, transparent 60%)",
                        "radial-gradient(ellipse 50% 40% at 90% 100%, rgba(212,168,67,0.025) 0%, transparent 70%)",
                    ].join(", "),
                }}
            />

            <div className="max-w-6xl mx-auto space-y-8 pb-16">

                {/* ══════════════════════ HEADER ══════════════════════ */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-5 pt-1">
                    <div>
                        <p className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-zinc-500 font-medium mb-3">
                            <span className="h-px w-5 bg-zinc-700 flex-shrink-0" />
                            Student Ledger
                        </p>
                        <h1 className="text-[28px] sm:text-[32px] font-semibold tracking-tight text-zinc-50 leading-none">
                            Financial overview
                        </h1>
                        <p className="mt-2 text-[13.5px] text-zinc-400">
                            Fee schedule, payments, and receipts — all in one place.
                        </p>
                    </div>
                    <Skeleton name="student-profile-header" loading={isLoading}>
                        <div className="flex items-center gap-3 rounded-lg bg-white/[0.02] ring-1 ring-inset ring-white/[0.06] px-3 py-2 flex-shrink-0">
                            <div className="w-9 h-9 rounded-md bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 font-semibold text-sm flex-shrink-0">
                                {profile?.user.name.charAt(0) || "U"}
                            </div>
                            <div>
                                <p className="text-[13px] font-medium text-zinc-100 leading-tight">
                                    {profile?.user.name || "Loading…"}
                                </p>
                                <p className="text-[10.5px] font-mono tracking-wider text-zinc-500 mt-0.5">
                                    {profile?.studentId || "—"}
                                </p>
                            </div>
                        </div>
                    </Skeleton>
                </header>

                {/* ══════════════════════ STATUS CARD ══════════════════════ */}
                <Skeleton name="student-fee-card" loading={isLoading}>
                    <div className="rounded-xl bg-white/[0.015] ring-1 ring-inset ring-white/[0.06] overflow-hidden">

                        {/* ─── ACTIVE: UNPAID / OVERDUE ─── */}
                        {current && (
                            <div className="p-6 sm:p-8">

                                {/* Top: balance + countdown */}
                                <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
                                    {/* Balance */}
                                    <div>
                                        <p className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-zinc-500 font-medium">
                                            <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 animate-pulse ${isOverdue ? "bg-rose-400" : "bg-amber-400"}`} />
                                            Outstanding balance
                                        </p>
                                        <p className="mt-3 font-mono tabular-nums text-[40px] sm:text-[44px] font-medium text-zinc-50 tracking-tight leading-none">
                                            <span className="text-zinc-500 text-lg font-sans mr-2">PKR</span>
                                            {outstanding.toLocaleString()}
                                        </p>
                                        <div className="mt-4 flex items-center gap-3 text-[12.5px]">
                                            <span className="inline-flex items-center gap-1.5 text-zinc-400">
                                                <Clock className={`w-3.5 h-3.5 flex-shrink-0 ${isOverdue ? "text-rose-400" : "text-amber-400"}`} />
                                                Due
                                                <span className={`ml-1 ${isOverdue ? "text-rose-300" : "text-zinc-100"}`}>
                                                    {fmt(current.dueDate)}
                                                </span>
                                            </span>
                                            <span className="h-3 w-px bg-white/10 flex-shrink-0" />
                                            <span className="text-zinc-400">{ordinal(current.feeStructure.semester)} Semester</span>
                                        </div>
                                    </div>

                                    {/* Countdown / overdue notice */}
                                    {!isOverdue ? (
                                        <div className="rounded-lg bg-black/20 ring-1 ring-inset ring-white/[0.05] px-5 py-3.5 self-start">
                                            <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-500 font-medium mb-2.5">
                                                Time remaining
                                            </p>
                                            <div className="flex items-baseline gap-2 font-mono tabular-nums text-zinc-100">
                                                {[
                                                    { v: countdown.days, l: "d" },
                                                    { v: countdown.hours, l: "h" },
                                                    { v: countdown.minutes, l: "m" },
                                                    { v: countdown.seconds, l: "s" },
                                                ].map((t, i) => (
                                                    <div key={t.l} className="flex items-baseline gap-1.5">
                                                        {i > 0 && <span className="text-zinc-700 pb-0.5">:</span>}
                                                        <span className="text-[22px] font-medium">{pad(t.v)}</span>
                                                        <span className="text-[10px] uppercase tracking-widest text-zinc-500">{t.l}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3 rounded-lg ring-1 ring-inset ring-rose-500/20 bg-rose-500/[0.06] px-4 py-3 self-start">
                                            <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" strokeWidth={1.75} />
                                            <div>
                                                <p className="text-[13px] font-medium text-rose-200 leading-tight">Payment overdue</p>
                                                <p className="text-[11.5px] text-rose-300/70 mt-0.5">Late fee rules now apply.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Term progress */}
                                <div className="mt-8">
                                    <div className="flex items-baseline justify-between text-[10.5px] uppercase tracking-[0.18em] text-zinc-500 font-medium mb-2">
                                        <span>Term progress</span>
                                        <span className="font-mono text-zinc-300">{Math.round(progressPct)}%</span>
                                    </div>
                                    <div className="h-[3px] rounded-full bg-white/[0.05] overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ease-out ${isOverdue ? "bg-rose-500" : "bg-gold-400"}`}
                                            style={{ width: `${progressPct}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Fee breakdown — two panels */}
                                <div className="mt-8 grid md:grid-cols-2 gap-px bg-white/[0.04] rounded-lg overflow-hidden ring-1 ring-inset ring-white/[0.05]">
                                    <div className="bg-[#080c14] p-6">
                                        <p className="text-[10.5px] uppercase tracking-[0.18em] text-zinc-500 font-medium mb-4 flex items-center gap-1.5">
                                            <Receipt className="w-3 h-3" />
                                            Itemized charges
                                        </p>
                                        <dl className="divide-y divide-white/[0.04]">
                                            {[
                                                { label: "Tuition", val: current.feeStructure.tuitionFee },
                                                { label: "Lab", val: current.feeStructure.labFee },
                                                { label: "Library", val: current.feeStructure.libraryFee },
                                            ].map((f) => (
                                                <div key={f.label} className="flex justify-between items-baseline py-2.5 first:pt-0 last:pb-0 text-[13px]">
                                                    <dt className="text-zinc-400">{f.label}</dt>
                                                    <dd className="font-mono tabular-nums text-zinc-100">{f.val.toLocaleString()}</dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </div>
                                    <div className="bg-[#080c14] p-6">
                                        <p className="text-[10.5px] uppercase tracking-[0.18em] text-zinc-500 font-medium mb-4 flex items-center gap-1.5">
                                            <Shield className="w-3 h-3" />
                                            Administrative
                                        </p>
                                        <dl className="divide-y divide-white/[0.04]">
                                            {[
                                                { label: "Registration", val: current.feeStructure.registrationFee },
                                                { label: "Sports", val: current.feeStructure.sportsFee },
                                                { label: "Examination", val: current.feeStructure.examinationFee },
                                            ].map((f) => (
                                                <div key={f.label} className="flex justify-between items-baseline py-2.5 first:pt-0 last:pb-0 text-[13px]">
                                                    <dt className="text-zinc-400">{f.label}</dt>
                                                    <dd className="font-mono tabular-nums text-zinc-100">{f.val.toLocaleString()}</dd>
                                                </div>
                                            ))}
                                            {current.discountApplied > 0 && (
                                                <div className="flex justify-between items-baseline py-2.5 text-[13px]">
                                                    <dt className="text-emerald-400">Scholarship waiver</dt>
                                                    <dd className="font-mono tabular-nums text-emerald-400">−{current.discountApplied.toLocaleString()}</dd>
                                                </div>
                                            )}
                                        </dl>
                                    </div>
                                </div>

                                {/* CTA */}
                                <Link href="/student/payfee" className="block mt-6">
                                    <Button className="w-full h-11 bg-gold-400 hover:bg-gold-300 active:bg-gold-500 text-navy-950 font-medium text-[13.5px] rounded-lg group transition-colors duration-150">
                                        Pay outstanding balance
                                        <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* ─── ALL PAID ─── */}
                        {isPaid && (
                            <div className="p-6 sm:p-8">
                                <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-md bg-emerald-500/10 ring-1 ring-inset ring-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <BadgeCheck className="w-5 h-5 text-emerald-400" strokeWidth={1.75} />
                                        </div>
                                        <div>
                                            <p className="text-[10.5px] uppercase tracking-[0.18em] text-emerald-400/80 font-medium">
                                                Good standing
                                            </p>
                                            <h3 className="mt-1 text-[18px] font-semibold text-zinc-50 tracking-tight leading-tight">
                                                All fees cleared
                                            </h3>
                                            <p className="mt-1.5 text-[13px] text-zinc-400">
                                                {paidCount} semester{paidCount !== 1 ? "s" : ""} paid
                                                {summary?.totalPaid && (
                                                    <>
                                                        {" · "}Lifetime{" "}
                                                        <span className="font-mono tabular-nums text-emerald-400 font-medium">
                                                            {formatFullCurrency(summary.totalPaid)}
                                                        </span>
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    {latestPaidAssignment && (
                                        <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-white/[0.05] sm:pl-6 pt-4 sm:pt-0">
                                            <p className="text-[10.5px] uppercase tracking-[0.18em] text-zinc-500 font-medium">Last cleared</p>
                                            <p className="text-[13.5px] font-medium text-zinc-100 mt-1">
                                                {ordinal(latestPaidAssignment.feeStructure.semester)} Semester
                                            </p>
                                            <p className="text-[11.5px] text-zinc-500 font-mono tabular-nums mt-0.5">
                                                {fmt(latestPaidAssignment.paidAt)}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ─── NO FEE ASSIGNED ─── */}
                        {hasNoFee && (
                            <div className="px-6 sm:px-8 py-16 text-center">
                                <div className="w-10 h-10 rounded-md bg-white/[0.03] ring-1 ring-inset ring-white/[0.06] flex items-center justify-center mx-auto mb-4">
                                    <Clock className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-[15px] font-semibold text-zinc-100">Schedule pending</h3>
                                <p className="mt-1.5 text-[13px] text-zinc-400 max-w-[26ch] mx-auto leading-relaxed">
                                    Your fee schedule for the upcoming semester is being processed.
                                </p>
                            </div>
                        )}
                    </div>
                </Skeleton>

                {/* ══════════════════════ TRANSACTION HISTORY ══════════════════════ */}
                {!isLoading && allPayments.length > 0 && (
                    <section className="space-y-3">
                        <div className="flex items-baseline justify-between">
                            <p className="text-[10.5px] uppercase tracking-[0.22em] text-zinc-500 font-medium">
                                Transaction history
                            </p>
                            <span className="text-[11px] text-zinc-500 font-mono tabular-nums">
                                {allPayments.length} record{allPayments.length !== 1 ? "s" : ""}
                            </span>
                        </div>

                        <div className="rounded-xl bg-white/[0.015] ring-1 ring-inset ring-white/[0.06] overflow-hidden">

                            {/* Column headers — desktop only */}
                            <div className="hidden sm:grid sm:grid-cols-[2fr_1.2fr_0.8fr_1.4fr_1fr] gap-4 px-6 py-3 border-b border-white/[0.05]">
                                {["Semester", "Date", "Method", "Receipt no.", "Amount"].map((h, i) => (
                                    <span key={h} className={`text-[10px] uppercase tracking-[0.16em] text-zinc-500 font-medium ${i === 4 ? "text-right" : ""}`}>
                                        {h}
                                    </span>
                                ))}
                            </div>

                            {/* Rows */}
                            <div className="divide-y divide-white/[0.04]">
                                {allPayments.map((p) => (
                                    <div key={p.id} className="hover:bg-white/[0.01] transition-colors duration-100">

                                        {/* Desktop row */}
                                        <div className="hidden sm:grid sm:grid-cols-[2fr_1.2fr_0.8fr_1.4fr_1fr] gap-4 px-6 py-3.5 items-center text-[13px]">
                                            <div className="flex items-center gap-2.5">
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-white/[0.04] ring-1 ring-inset ring-white/[0.06] text-[10px] font-mono text-zinc-400 flex-shrink-0">
                                                    {p.assignmentSemester}
                                                </span>
                                                <span className="text-zinc-100 font-medium">{p.assignmentLabel}</span>
                                            </div>
                                            <span className="text-zinc-400 font-mono tabular-nums text-[12px]">{fmt(p.paidAt)}</span>
                                            <span className="text-zinc-400">{methodLabel(p.method)}</span>
                                            <span className="text-[11px] text-zinc-500 font-mono truncate">{p.receiptNumber}</span>
                                            <div className="flex flex-col items-end gap-0.5">
                                                <span className="font-mono tabular-nums font-medium text-zinc-50">
                                                    {formatFullCurrency(p.amount)}
                                                </span>
                                                <span className="inline-flex items-center gap-1 text-[9.5px] uppercase tracking-[0.12em] text-emerald-400/80 font-medium">
                                                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                                                    Paid
                                                </span>
                                            </div>
                                        </div>

                                        {/* Mobile row */}
                                        <div className="sm:hidden px-5 py-4 flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-white/[0.04] ring-1 ring-inset ring-white/[0.06] text-[9.5px] font-mono text-zinc-400 flex-shrink-0">
                                                        {p.assignmentSemester}
                                                    </span>
                                                    <span className="text-[13px] font-medium text-zinc-100">{p.assignmentLabel}</span>
                                                </div>
                                                <p className="text-[11.5px] text-zinc-500 pl-7">
                                                    <span className="font-mono tabular-nums">{fmt(p.paidAt)}</span>
                                                    <span className="mx-1.5 text-zinc-700">·</span>
                                                    <span>{methodLabel(p.method)}</span>
                                                </p>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="font-mono tabular-nums text-[13.5px] font-medium text-zinc-50">
                                                    {formatFullCurrency(p.amount)}
                                                </p>
                                                <p className="flex items-center gap-1 justify-end text-[9.5px] text-emerald-400/80 uppercase tracking-widest mt-0.5">
                                                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                                                    Paid
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Total summary */}
                            {summary && (
                                <div className="flex items-baseline justify-between px-6 py-3.5 border-t border-white/[0.06] bg-white/[0.01]">
                                    <span className="text-[10.5px] uppercase tracking-[0.18em] text-zinc-500 font-medium">
                                        Total paid
                                    </span>
                                    <span className="text-[15px] font-mono tabular-nums font-medium text-gold-400">
                                        {formatFullCurrency(summary.totalPaid)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
