"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
    CheckCircle2, Download, Mail, Printer,
    ArrowLeft, Check, Info, QrCode, Sparkles,
} from "lucide-react";
import { formatFullCurrency } from "@/config/constants";

const RECEIPT = {
    studentName: "Muhammad Ali",
    studentId: "GCUF-2024-CS-0042",
    department: "Computer Science",
    program: "BS Computer Science",
    semester: "4th Semester",
    session: "2024-2028",
    transactionId: "TXN-2026-00456",
    paymentMethod: "Stripe · Visa ****1234",
    dateTime: "February 26, 2026 · 12:45 PM",
    status: "VERIFIED",
};

const FEE_ITEMS = [
    { label: "Tuition Fee", amount: 35000 },
    { label: "Lab Fee", amount: 5000 },
    { label: "Library Fee", amount: 3000 },
    { label: "Sports Fee", amount: 2000 },
    { label: "Registration Fee", amount: 5000 },
];
const TOTAL = FEE_ITEMS.reduce((s, i) => s + i.amount, 0);

const NEXT_STEPS = [
    { done: true, text: "Fee payment confirmed" },
    { done: true, text: "Receipt saved to your account" },
    { done: true, text: "Email sent to ali@gcuf.edu.pk" },
    { done: false, text: "You now have full access to semester facilities", info: true },
];

/* ─── Animated Check Icon ─── */
function AnimatedCheck() {
    return (
        <div className="relative inline-flex">
            {/* Outer rings */}
            <span className="absolute inset-0 rounded-full bg-emerald-500/10 animate-[ping_2s_ease_infinite]" />
            <span className="absolute inset-2 rounded-full bg-emerald-500/8 animate-[ping_2s_ease_0.4s_infinite]" />

            {/* Icon container */}
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-700/10 border border-emerald-500/30 flex items-center justify-center shadow-2xl shadow-emerald-500/20 backdrop-blur-sm">
                <CheckCircle2 className="w-9 h-9 text-emerald-400" strokeWidth={1.8} />
            </div>

            {/* Sparkle */}
            <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-gold-400 animate-pulse" />
        </div>
    );
}

export default function PaymentSuccessPage() {
    const checkRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Entrance animation trigger
        if (checkRef.current) {
            checkRef.current.style.opacity = "1";
            checkRef.current.style.transform = "translateY(0) scale(1)";
        }
    }, []);

    return (
        <div className="max-w-2xl mx-auto pb-12 space-y-8">
            {/* ══════════ SUCCESS HEADER ══════════ */}
            <div
                ref={checkRef}
                className="text-center transition-all duration-700"
                style={{ opacity: 0, transform: "translateY(20px) scale(0.95)" }}
            >
                <div className="flex justify-center mb-5">
                    <AnimatedCheck />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-playfair)] bg-gradient-to-br from-foreground to-slate-400 bg-clip-text text-transparent mb-2">
                    Payment Successful
                </h1>
                <p className="text-slate-500 text-sm">
                    Your fee has been paid and verified by GCUF.
                </p>
            </div>

            {/* ══════════ OFFICIAL RECEIPT ══════════ */}
            <div className="relative rounded-2xl border border-white/[0.07] bg-[#0a0e1a] overflow-hidden shadow-2xl shadow-black/40">
                {/* Gold accent bar */}
                <div className="h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

                {/* PAID stamp */}
                <div
                    className="pointer-events-none select-none absolute top-6 right-6 text-emerald-500/10 font-black uppercase text-[64px] leading-none [transform:rotate(-15deg)] font-[family-name:var(--font-playfair)] tracking-wider"
                >
                    PAID
                </div>

                <div className="p-6 sm:p-8 relative">
                    {/* University Header */}
                    <div className="text-center mb-6 pb-6 border-b border-white/[0.06]">
                        <p className="text-[10px] text-gold-500/50 uppercase tracking-[0.25em] font-medium mb-1.5">
                            Government College University Faisalabad
                        </p>
                        <h2 className="text-base font-bold text-gold-400 font-[family-name:var(--font-playfair)] uppercase tracking-[0.12em]">
                            Fee Payment Receipt
                        </h2>
                    </div>

                    {/* Student Info Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 mb-6 pb-6 border-b border-white/[0.06]">
                        {[
                            { label: "Student Name", value: RECEIPT.studentName },
                            { label: "Student ID", value: RECEIPT.studentId },
                            { label: "Department", value: RECEIPT.department },
                            { label: "Program", value: RECEIPT.program },
                            { label: "Semester", value: RECEIPT.semester },
                            { label: "Session", value: RECEIPT.session },
                        ].map((f) => (
                            <div key={f.label}>
                                <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-0.5">{f.label}</p>
                                <p className="text-xs font-medium text-foreground">{f.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Fee Breakdown */}
                    <div className="space-y-1 mb-4">
                        {FEE_ITEMS.map((item) => (
                            <div
                                key={item.label}
                                className="flex justify-between text-sm py-2 border-b border-white/[0.03] last:border-0"
                            >
                                <span className="text-slate-500">{item.label}</span>
                                <span className="text-foreground">{formatFullCurrency(item.amount)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gold-500/5 border border-gold-500/10 mb-6">
                        <span className="text-sm font-bold text-gold-400">Total Paid</span>
                        <span className="text-xl font-bold text-gold-gradient font-[family-name:var(--font-playfair)]">
                            {formatFullCurrency(TOTAL)}
                        </span>
                    </div>

                    {/* Transaction Info */}
                    <div className="space-y-2 mb-6 pb-6 border-b border-white/[0.06]">
                        {[
                            { label: "Transaction ID", value: RECEIPT.transactionId },
                            { label: "Payment Method", value: RECEIPT.paymentMethod },
                            { label: "Date & Time", value: RECEIPT.dateTime },
                        ].map((f) => (
                            <div key={f.label} className="flex justify-between text-sm">
                                <span className="text-slate-500">{f.label}</span>
                                <span className="text-slate-300 font-mono text-xs">{f.value}</span>
                            </div>
                        ))}
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Status</span>
                            <span className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                                <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
                            </span>
                        </div>
                    </div>

                    {/* QR + Footer */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">Scan to verify</p>
                            <p className="text-[10px] text-slate-600 font-mono">{RECEIPT.transactionId}</p>
                        </div>
                        <div className="w-16 h-16 rounded-lg bg-white/5 border border-white/[0.08] flex items-center justify-center">
                            <QrCode className="w-9 h-9 text-gold-500/25" />
                        </div>
                    </div>

                    <p className="text-center text-[9px] text-slate-700 uppercase tracking-widest mt-5">
                        Official Digital Receipt — Government College University Faisalabad
                    </p>
                </div>
            </div>

            {/* ══════════ ACTION BUTTONS ══════════ */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    { icon: Download, label: "Download" },
                    { icon: Mail, label: "Email" },
                    { icon: Printer, label: "Print" },
                    { icon: ArrowLeft, label: "Dashboard", href: "/student" },
                ].map((btn) => {
                    const cls =
                        "flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] text-sm font-medium text-slate-400 hover:text-gold-400 hover:border-gold-500/20 hover:bg-gold-500/4 transition-all duration-200 w-full";
                    return btn.href ? (
                        <Link key={btn.label} href={btn.href} className={cls}>
                            <btn.icon className="w-4 h-4" /> {btn.label}
                        </Link>
                    ) : (
                        <button key={btn.label} className={cls}>
                            <btn.icon className="w-4 h-4" /> {btn.label}
                        </button>
                    );
                })}
            </div>

            {/* ══════════ WHAT'S NEXT ══════════ */}
            <div className="rounded-2xl border border-white/[0.06] bg-[#0a0e1a] p-6">
                <h3 className="text-sm font-bold text-foreground font-[family-name:var(--font-playfair)] mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold-400" />
                    What&apos;s Next
                </h3>
                <div className="space-y-3">
                    {NEXT_STEPS.map((step, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${step.info
                                        ? "bg-sky-500/10"
                                        : "bg-emerald-500/10"
                                    }`}
                            >
                                {step.info ? (
                                    <Info className="w-3 h-3 text-sky-400" />
                                ) : (
                                    <Check className="w-3 h-3 text-emerald-400" />
                                )}
                            </div>
                            <span className="text-sm text-slate-400">{step.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
