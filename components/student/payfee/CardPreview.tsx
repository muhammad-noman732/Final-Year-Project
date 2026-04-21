"use client";

import { useMemo } from "react";
import { Sparkles } from "lucide-react";

interface CardPreviewProps {
    number: string;
    name: string;
    expiry: string;
    brand: string;
    flipped: boolean;
}

export function CardPreview({ number, name, expiry, brand, flipped }: CardPreviewProps) {
    const display = useMemo(() => {
        if (!number) return "____ ____ ____ ____";
        return (number + "________________").slice(0, 16).replace(/(\d{4})(?=.)/g, "$1 ");
    }, [number]);

    // Brand colors or icons
    const brandLabel = brand.toUpperCase() || "CARD";

    return (
        <div className="perspective-1000 h-40 w-full max-w-sm mx-auto mb-6 [perspective:1000px]">
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
                        <div className="flex flex-col items-end">
                            <div className="w-10 h-8 rounded-sm bg-gradient-to-r from-gold-400/40 to-gold-600/40 border border-gold-500/20 flex items-center justify-center text-[8px] text-white/80 font-bold overflow-hidden">
                                {brandLabel}
                            </div>
                        </div>
                    </div>
                    <p className="font-mono text-base text-gold-300/90 tracking-[0.2em] mb-4 text-center">{display}</p>
                    <div className="flex justify-between items-end">
                        <div className="flex-1 mr-4 overflow-hidden">
                            <p className="text-[11px] text-muted-foreground uppercase tracking-widest mb-0.5">Cardholder</p>
                            <p className="text-xs text-slate-300 uppercase truncate font-medium">{name || "FULL NAME"}</p>
                        </div>
                        <div className="flex-shrink-0">
                            <p className="text-[11px] text-muted-foreground uppercase tracking-widest mb-0.5 text-right">Expires</p>
                            <p className="text-xs text-slate-300 font-mono text-right">{expiry || "MM/YY"}</p>
                        </div>
                    </div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden bg-gradient-to-br from-[#1c2d4a] via-[#1a2940] to-[#0f1a2e] border border-gold-500/20 shadow-2xl shadow-black/40">
                    <div className="h-10 bg-slate-900 mt-5" />
                    <div className="px-5 mt-4">
                        <p className="text-[9px] text-muted-foreground/60 uppercase tracking-widest mb-2">Authorized Signature</p>
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-8 bg-slate-800 rounded border border-white/5" />
                            <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                                <span className="text-slate-900 text-xs font-bold font-mono">•••</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
