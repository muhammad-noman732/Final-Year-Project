"use client";

 import { useState, useMemo } from "react";
 import { useRouter } from "next/navigation";
 import {
     useStripe,
     useElements,
     CardNumberElement,
     CardExpiryElement,
     CardCvcElement,
 } from "@stripe/react-stripe-js";
 import {
     Lock, ShieldCheck, AlertCircle, CreditCard,
     CheckCircle2, Loader2,
 } from "lucide-react";
 import { formatFullCurrency } from "@/config/constants";
 import { useSelector } from "react-redux";
 import type { RootState } from "@/store";

 function CardPreview({ name, flipped, brand = "unknown" }: { name: string; flipped: boolean; brand?: string }) {
     return (
         <div className="perspective-1000 h-40 w-full max-w-xs mx-auto mb-6 [perspective:1000px]">
             <div
                 className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d]"
                 style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
             >
                 {}
                 <div className="absolute inset-0 rounded-2xl [backface-visibility:hidden] overflow-hidden bg-gradient-to-br from-[#1c2d4a] via-[#1a2940] to-[#0f1a2e] border border-gold-500/20 p-5 shadow-2xl shadow-black/40">
                     <div className="flex justify-between items-start mb-6">
                         <div className="flex gap-0.5">
                             <div className="w-6 h-6 rounded-full bg-gold-500/40" />
                             <div className="w-6 h-6 rounded-full bg-gold-400/25 -ml-2" />
                         </div>
                         {brand === "visa" ? (
                             <div className="text-white text-xs font-bold italic tracking-wider">VISA</div>
                         ) : brand === "mastercard" ? (
                             <div className="flex gap-0.5">
                                 <div className="w-6 h-6 rounded-full bg-rose-500/80 mix-blend-screen" />
                                 <div className="w-6 h-6 rounded-full bg-amber-500/80 mix-blend-screen -ml-3" />
                             </div>
                         ) : (
                             <div className="w-8 h-6 rounded-sm bg-gradient-to-r from-gold-400/40 to-gold-600/40 border border-gold-500/20" />
                         )}
                     </div>
                     <p className="font-mono text-sm text-gold-300/90 tracking-widest mb-3">
                         **** **** **** ****
                     </p>
                     <div className="flex justify-between items-end">
                         <div>
                             <p className="text-[11px] text-muted-foreground uppercase tracking-widest mb-0.5">Cardholder</p>
                             <p className="text-xs text-slate-300 uppercase truncate max-w-[120px]">{name || "FULL NAME"}</p>
                         </div>
                         <div>
                             <p className="text-[11px] text-muted-foreground uppercase tracking-widest mb-0.5">Expires</p>
                             <p className="text-xs text-slate-300">**