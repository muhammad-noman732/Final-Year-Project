"use client";

import React from "react";

interface PayInputProps {
    label: string;
    children: React.ReactNode;
    focused: boolean;
}

export function PayInput({ label, children, focused }: PayInputProps) {
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
                <div className="min-h-[20px] flex items-center">
                    {children}
                </div>
            </div>
        </div>
    );
}
