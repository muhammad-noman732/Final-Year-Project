"use client";

import { useMemo } from "react";
import { BookOpen, Clock, Info, Sparkles } from "lucide-react";
import { formatFullCurrency } from "@/config/constants";
import { ordinal } from "@/hooks/student/useStudentDashboard";
import type { FeeAssignment } from "@/types/server/student.types";

interface OrderSummaryProps {
    targetAssignment: FeeAssignment;
    amountPkr: number;
    studentName: string;
    studentId: string;
}

export function OrderSummary({ targetAssignment, amountPkr, studentName, studentId }: OrderSummaryProps) {
    const feeItems = useMemo(() => {
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
        <div className="rounded-2xl border border-white/[0.06] bg-[#0a0e1a] overflow-hidden shadow-2xl shadow-black/30 sticky top-24">
            <div className="px-6 pt-6 pb-4 border-b border-white/[0.04]">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                        < BookOpen className="w-5 h-5 text-gold-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-foreground tracking-tight">
                            {ordinal(targetAssignment.feeStructure.semester)} Semester
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            {targetAssignment.feeStructure.program.name}
                        </p>
                    </div>
                </div>
                <div className="space-y-1.5 text-xs">
                    {[
                        { l: "Student", v: studentName },
                        { l: "ID", v: studentId },
                    ].map((r) => (
                        <div key={r.l} className="flex justify-between">
                            <span className="text-muted-foreground">{r.l}</span>
                            <span className="text-slate-300 font-mono">{r.v}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-6 py-4 space-y-2.5">
                {feeItems.map((item) => (
                    <div key={item.label} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="text-foreground tabular-nums">{formatFullCurrency(item.amount)}</span>
                    </div>
                ))}
            </div>

            <div className="px-6 py-4 border-t border-white/[0.04] bg-gold-500/3">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gold-400">Total</span>
                    <span className="text-2xl font-bold text-gold-gradient tracking-tight">
                        {formatFullCurrency(amountPkr)}
                    </span>
                </div>
            </div>

            <div className="px-6 pb-4">
                <div className="mt-3 flex items-center gap-2 px-3 py-2.5 rounded-lg bg-amber-500/5 border border-amber-500/12">
                    <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span className="text-xs text-amber-300/70">
                        Due <span className="text-amber-300 font-semibold">{new Date(targetAssignment.dueDate).toLocaleDateString()}</span>
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
    );
}
