"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Lock, ShieldCheck, AlertCircle, CreditCard,
    BookOpen, Clock, Info, CheckCircle2, ArrowLeft, Loader2,
} from "lucide-react";
import { formatFullCurrency } from "@/config/constants";

const feeItems = [
    { label: "Tuition Fee", amount: 35000 },
    { label: "Lab Fee", amount: 5000 },
    { label: "Library Fee", amount: 3000 },
    { label: "Sports Fee", amount: 2000 },
    { label: "Registration Fee", amount: 5000 },
];
const total = feeItems.reduce((s, i) => s + i.amount, 0);

/* ─── Card Input Formatter ─── */
function formatCard(v: string) {
    return v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
}
function formatExpiry(v: string) {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
}

/* ─── Mini Card Preview ─── */
function CardPreview({ number, name, expiry, flipped }: { number: string; name: string; expiry: string; flipped: boolean }) {
    const display = (number.replace(/\s/g, "") + "________________").slice(0, 16).replace(/(\d{4})(?=.)/g, "$1 ");
    return (
        <div className="perspective-1000 h-40 w-full max-w-xs mx-auto mb-6 [perspective:1000px]">
            <div
                className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d]"
                style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
            >
                {/* Front */}
                <div className="absolute inset-0 rounded-2xl [backface-visibility:hidden] overflow-hidden bg-gradient-to-br from-[#1c2d4a] via-[#1a2940] to-[#0f1a2e] border border-gold-500/20 p-5 shadow-2xl shadow-black/40">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-0.5">
                            <div className="w-6 h-6 rounded-full bg-gold-500/40" />
                            <div className="w-6 h-6 rounded-full bg-gold-400/25 -ml-2" />
                        </div>
                        <div className="w-8 h-6 rounded-sm bg-gradient-to-r from-gold-400/40 to-gold-600/40 border border-gold-500/20" />
                    </div>
                    <p className="font-mono text-sm text-gold-300/90 tracking-widest mb-3">{display}</p>
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-[11px] text-muted-foreground uppercase tracking-widest mb-0.5">Cardholder</p>
                            <p className="text-xs text-slate-300 uppercase">{name || "FULL NAME"}</p>
                        </div>
                        <div>
                            <p className="text-[11px] text-muted-foreground uppercase tracking-widest mb-0.5">Expires</p>
                            <p className="text-xs text-slate-300">{expiry || "MM/YY"}</p>
                        </div>
                    </div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden bg-gradient-to-br from-[#1c2d4a] via-[#1a2940] to-[#0f1a2e] border border-gold-500/20 shadow-2xl shadow-black/40">
                    <div className="h-10 bg-slate-900 mt-5" />
                    <div className="px-5 mt-4 flex items-center gap-3">
                        <div className="flex-1 h-8 bg-slate-800 rounded" />
                        <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                            <span className="text-slate-900 text-xs font-bold">CVC</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Stripe-style Input ─── */
function PayInput({
    label, value, onChange, placeholder, type = "text", maxLen, autoComplete,
}: {
    label: string; value: string; onChange: (v: string) => void;
    placeholder?: string; type?: string; maxLen?: number; autoComplete?: string;
}) {
    const [focused, setFocused] = useState(false);
    return (
        <div className="relative">
            <div
                className={`rounded-xl border bg-[#0d1321] px-4 pt-3 pb-2.5 transition-all duration-200 ${focused ? "border-gold-500/40 shadow-[0_0_0_3px_rgba(212,168,67,0.06)]" : "border-white/[0.07] hover:border-white/[0.12]"
                    }`}
            >
                <label
                    className={`block text-[11px] font-semibold uppercase tracking-widest transition-colors duration-200 mb-1 ${focused ? "text-gold-400" : "text-muted-foreground"
                        }`}
                >
                    {label}
                </label>
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={placeholder}
                    maxLength={maxLen}
                    autoComplete={autoComplete}
                    className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none font-mono"
                />
            </div>
        </div>
    );
}

export default function PayFeePage() {
    const router = useRouter();
    const [cardNum, setCardNum] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [name, setName] = useState("");
    const [cvcFocused, setCvcFocused] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");

    function handlePay() {
        setError("");
        const digitsOnly = cardNum.replace(/\s/g, "");
        if (digitsOnly.length < 16) { setError("Please enter a valid 16-digit card number."); return; }
        if (expiry.length < 5) { setError("Please enter a valid expiry date (MM/YY)."); return; }
        if (cvc.length < 3) { setError("Please enter your 3-digit CVC."); return; }
        if (!name.trim()) { setError("Please enter the cardholder name."); return; }
        setProcessing(true);
        setTimeout(() => router.push("/student/paymentsuccess"), 2800);
    }

    return (
        <div className="max-w-5xl mx-auto pb-10 animate-in fade-in duration-500">
            {/* ── Back link ── */}
            <a href="/student" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-gold-400 text-sm mb-6 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-gold-500/50">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </a>

            <div className="grid lg:grid-cols-[1fr_420px] gap-6">
                {/* ══════════════════ PAYMENT PANEL ══════════════════ */}
                <div className="order-2 lg:order-1">
                    <div className="rounded-2xl border border-white/[0.06] bg-[#0a0e1a] overflow-hidden shadow-2xl shadow-black/30">
                        {/* Header */}
                        <div className="px-6 pt-6 pb-4 border-b border-white/[0.04]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#635BFF]/10 flex items-center justify-center border border-[#635BFF]/20">
                                    <CreditCard className="w-5 h-5 text-[#635BFF]" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-foreground tracking-tight">
                                        Pay with Stripe
                                    </h2>
                                    <p className="text-xs text-muted-foreground">Secured with 256-bit TLS encryption</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Stripe branding accent */}
                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#635BFF]/5 border border-[#635BFF]/15 mb-6">
                                <div className="w-5 h-5 rounded bg-[#635BFF] flex items-center justify-center">
                                    <span className="text-white text-[11px] font-bold">S</span>
                                </div>
                                <span className="text-xs text-[#A5A2FF] font-medium">Powered by Stripe</span>
                                <span className="ml-auto text-[11px] text-muted-foreground/60">Visa, Mastercard, Amex</span>
                            </div>

                            {/* ── Card Form ── */}
                            <div className="space-y-3">
                                <CardPreview number={cardNum} name={name} expiry={expiry} flipped={cvcFocused} />

                                <PayInput
                                    label="Card Number"
                                    value={formatCard(cardNum)}
                                    onChange={(v) => setCardNum(v.replace(/\s/g, ""))}
                                    placeholder="1234 5678 9012 3456"
                                    maxLen={19}
                                    autoComplete="cc-number"
                                />
                                <div className="grid grid-cols-2 gap-3">
                                    <PayInput
                                        label="Expiry"
                                        value={expiry}
                                        onChange={(v) => setExpiry(formatExpiry(v))}
                                        placeholder="MM / YY"
                                        maxLen={5}
                                        autoComplete="cc-exp"
                                    />
                                    <div
                                        onFocus={() => setCvcFocused(true)}
                                        onBlur={() => setCvcFocused(false)}
                                    >
                                        <PayInput
                                            label="CVC"
                                            value={cvc}
                                            onChange={setCvc}
                                            placeholder="123"
                                            type="password"
                                            maxLen={4}
                                            autoComplete="cc-csc"
                                        />
                                    </div>
                                </div>
                                <PayInput
                                    label="Cardholder Name"
                                    value={name}
                                    onChange={(v) => setName(v.toUpperCase())}
                                    placeholder="As on card"
                                    autoComplete="cc-name"
                                />
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="mt-4 flex items-start gap-2.5 px-4 py-3 rounded-xl bg-rose-500/5 border border-rose-500/20">
                                    <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-rose-300">{error}</p>
                                </div>
                            )}

                            {/* Pay Button */}
                            <button
                                onClick={handlePay}
                                disabled={processing}
                                className="mt-6 w-full h-13 rounded-xl font-bold text-base text-white bg-[#635BFF] hover:bg-[#5249E0] disabled:opacity-60 disabled:cursor-not-allowed shadow-2xl shadow-[#635BFF]/20 hover:shadow-[#635BFF]/30 transition-all duration-300 flex items-center justify-center gap-3 py-4"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing Payment...
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-4 h-4" />
                                        Pay {formatFullCurrency(total)}
                                    </>
                                )}
                            </button>

                            {/* Trust Row */}
                            <div className="mt-5 flex items-center justify-center gap-6">
                                {[
                                    { icon: Lock, label: "SSL Secured" },
                                    { icon: ShieldCheck, label: "PCI DSS" },
                                    { icon: CheckCircle2, label: "Stripe" },
                                ].map((b) => (
                                    <div key={b.label} className="flex items-center gap-1.5 text-muted-foreground/50">
                                        <b.icon className="w-3.5 h-3.5" />
                                        <span className="text-[11px] uppercase tracking-wider font-medium">{b.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ══════════════════ ORDER SUMMARY ══════════════════ */}
                <div className="order-1 lg:order-2">
                    <div className="rounded-2xl border border-white/[0.06] bg-[#0a0e1a] overflow-hidden shadow-2xl shadow-black/30 sticky top-24">
                        {/* Header */}
                        <div className="px-6 pt-6 pb-4 border-b border-white/[0.04]">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-gold-400" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-foreground tracking-tight">
                                        4th Semester
                                    </h3>
                                    <p className="text-xs text-muted-foreground">BS Computer Science</p>
                                </div>
                            </div>
                            {/* Student Info */}
                            <div className="space-y-1.5 text-xs">
                                {[
                                    { l: "Student", v: "Muhammad Ali" },
                                    { l: "ID", v: "GCUF-2024-CS-0042" },
                                    { l: "Email", v: "ali@gcuf.edu.pk" },
                                ].map((r) => (
                                    <div key={r.l} className="flex justify-between">
                                        <span className="text-muted-foreground">{r.l}</span>
                                        <span className="text-slate-300 font-mono">{r.v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Line Items */}
                        <div className="px-6 py-4 space-y-2.5">
                            {feeItems.map((item) => (
                                <div key={item.label} className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">{item.label}</span>
                                    <span className="text-foreground tabular-nums">{formatFullCurrency(item.amount)}</span>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="px-6 py-4 border-t border-white/[0.04] bg-gold-500/3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-gold-400">Total</span>
                                <span className="text-2xl font-bold text-gold-gradient tracking-tight">
                                    {formatFullCurrency(total)}
                                </span>
                            </div>
                        </div>

                        {/* Deadline */}
                        <div className="px-6 pb-4">
                            <div className="mt-3 flex items-center gap-2 px-3 py-2.5 rounded-lg bg-amber-500/5 border border-amber-500/12">
                                <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                                <span className="text-xs text-amber-300/70">
                                    Due <span className="text-amber-300 font-semibold">March 15, 2026</span> &middot; 17 days left
                                </span>
                            </div>
                            <div className="mt-2.5 flex items-start gap-2 px-3 py-2.5 rounded-lg bg-white/[0.02]">
                                <Info className="w-3.5 h-3.5 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                                <span className="text-[11px] text-muted-foreground/60 leading-relaxed">
                                    Payments are non-refundable. A digital receipt will be emailed to you immediately after payment.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
