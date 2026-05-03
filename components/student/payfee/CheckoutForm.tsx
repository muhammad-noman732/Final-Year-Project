"use client";
 
 import { useState, useMemo } from "react";
 import { 
     CardNumberElement, 
     CardExpiryElement, 
     CardCvcElement 
 } from "@stripe/react-stripe-js";
 import type { 
     StripeCardNumberElementChangeEvent,
 } from "@stripe/stripe-js";
 import { CreditCard, AlertCircle, Loader2, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
 import { PayInput } from "./PayInput";
 import { CardPreview } from "./CardPreview";
 import { useConfirmPayment } from "@/hooks/student/useConfirmPayment";
 import { formatFullCurrency } from "@/config/constants";
 import type { FeeAssignment } from "@/types/server/student.types";
 import { useSelector } from "react-redux";
 import type { RootState } from "@/store";
 
 interface CheckoutFormProps {
     amountPkr: number;
     targetAssignment: FeeAssignment;
     studentName: string;
     studentId: string;
     clientSecret: string;
 }
 
 export function CheckoutForm({ amountPkr, targetAssignment, studentName, studentId, clientSecret }: CheckoutFormProps) {
     const theme = useSelector((state: RootState) => state.ui.theme);
     const { 
         confirmPayment, 
         processing, 
         errorMessage, 
         stripe 
     } = useConfirmPayment(
         clientSecret,
         targetAssignment,
         amountPkr,
         studentId
     );
 
     const [cardName, setCardName] = useState("");
     const [cardLabel, setCardLabel] = useState("");
     const [last4, setLast4] = useState("");
     const [expiryStr, setExpiryStr] = useState("");
     const [cvcFocused, setCvcFocused] = useState(false);
     const [focusedField, setFocusedField] = useState<string | null>(null);
 
     const elementOptions = useMemo(() => ({
         style: {
             base: {
                 color: theme === 'dark' ? "#e2e8f0" : "#18181b",
                 fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                 fontSize: "14px",
                 "::placeholder": {
                     color: theme === 'dark' ? "rgba(100, 116, 139, 0.6)" : "rgba(161, 161, 170, 0.8)",
                 },
             },
             invalid: {
                 color: "#f87171",
             },
         },
     }), [theme]);
 
     const handleSubmit = async (e: React.FormEvent) => {
         e.preventDefault();
         await confirmPayment(cardName);
     };
 
     return (
         <div className="rounded-2xl border border-zinc-200/50 dark:border-white/[0.06] bg-white/40 dark:bg-[#0a0e1a]/40 backdrop-blur-md overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
             <div className="px-6 pt-6 pb-4 border-b border-zinc-100 dark:border-white/[0.04]">
                 <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-[#635BFF]/10 flex items-center justify-center border border-[#635BFF]/20">
                         <CreditCard className="w-5 h-5 text-[#635BFF]" />
                     </div>
                     <div>
                         <h2 className="text-lg font-bold text-zinc-900 dark:text-foreground tracking-tight">Pay with Stripe</h2>
                         <p className="text-xs text-zinc-500 dark:text-muted-foreground">Secured with 256-bit TLS encryption</p>
                     </div>
                 </div>
             </div>
 
             <form onSubmit={handleSubmit} className="p-6">
                 <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#635BFF]/5 border border-[#635BFF]/15 mb-6">
                     <div className="w-5 h-5 rounded bg-[#635BFF] flex items-center justify-center">
                         <span className="text-white text-[11px] font-bold">S</span>
                     </div>
                     <span className="text-xs text-[#635BFF] dark:text-[#A5A2FF] font-bold uppercase tracking-wider">Powered by Stripe</span>
                     <span className="ml-auto text-[11px] text-zinc-400 dark:text-muted-foreground/60">Visa, Mastercard, Amex</span>
                 </div>
 
                 <CardPreview
                     number={last4 ? `**** **** **** ${last4}` : ""}
                     name={cardName}
                     expiry={expiryStr}
                     brand={cardLabel}
                     flipped={cvcFocused}
                 />
 
                 <div className="space-y-4">
                     <PayInput label="Card Number" focused={focusedField === "num"}>
                         <CardNumberElement
                             options={elementOptions}
                             className="w-full"
                             onFocus={() => setFocusedField("num")}
                             onBlur={() => setFocusedField(null)}
                             onChange={(e: StripeCardNumberElementChangeEvent) => {
                                 setCardLabel(e.brand);
                                 setLast4(e.complete ? (e as any).value : "");
                             }}
                         />
                     </PayInput>
 
                     <div className="grid grid-cols-2 gap-3">
                         <PayInput label="Expiry" focused={focusedField === "exp"}>
                             <CardExpiryElement
                                 options={elementOptions}
                                 className="w-full"
                                 onFocus={() => setFocusedField("exp")}
                                 onBlur={() => setFocusedField(null)}
                             />
                         </PayInput>
                         <PayInput label="CVC" focused={focusedField === "cvc"}>
                             <CardCvcElement
                                 options={elementOptions}
                                 className="w-full"
                                 onFocus={() => { setFocusedField("cvc"); setCvcFocused(true); }}
                                 onBlur={() => { setFocusedField(null); setCvcFocused(false); }}
                             />
                         </PayInput>
                     </div>
 
                     <div className="relative">
                         <div className={`rounded-xl border bg-zinc-50/50 dark:bg-[#0d1321]/50 px-4 pt-3 pb-2.5 transition-all duration-200 ${focusedField === "name" ? "border-gold-500/40 shadow-[0_0_0_3px_rgba(212,168,67,0.06)]" : "border-zinc-200/50 dark:border-white/[0.07] hover:border-zinc-300 dark:hover:border-white/[0.12]"}`}>
                             <label className={`block text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 mb-1 ${focusedField === "name" ? "text-gold-600 dark:text-gold-400" : "text-zinc-500 dark:text-muted-foreground"}`}>
                                 Cardholder Name
                             </label>
                             <input
                                 type="text"
                                 placeholder="As on card"
                                 value={cardName}
                                 onChange={(e) => setCardName(e.target.value.toUpperCase())}
                                 onFocus={() => setFocusedField("name")}
                                 onBlur={() => setFocusedField(null)}
                                 className="w-full bg-transparent text-sm text-zinc-900 dark:text-foreground placeholder:text-zinc-400 dark:placeholder:text-muted-foreground/60 outline-none font-mono"
                             />
                         </div>
                     </div>
                 </div>
 
                 {errorMessage && (
                     <div className="mt-4 flex items-start gap-2.5 px-4 py-3 rounded-xl bg-rose-50/50 dark:bg-rose-500/5 border border-rose-200/50 dark:border-rose-500/20 backdrop-blur-sm">
                         <AlertCircle className="w-4 h-4 text-rose-500 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                         <p className="text-sm text-rose-700 dark:text-rose-300">{errorMessage}</p>
                     </div>
                 )}
 
                 <button
                     type="submit"
                     disabled={processing || !stripe}
                     className="mt-6 w-full h-13 rounded-xl font-bold text-base text-white bg-[#635BFF] hover:bg-[#5249E0] disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_8px_16px_rgba(99,91,255,0.2)] hover:shadow-[0_8px_24px_rgba(99,91,255,0.3)] transition-all duration-300 flex items-center justify-center gap-3 py-4"
                 >
                     {processing ? (
                         <>
                             <Loader2 className="w-5 h-5 animate-spin" />
                             Processing...
                         </>
                     ) : (
                         <>
                             <Lock className="w-4 h-4" />
                             Pay {formatFullCurrency(amountPkr)}
                         </>
                     )}
                 </button>
 
                 <div className="mt-5 flex items-center justify-center gap-6">
                     {[
                         { icon: Lock, label: "SSL Secured" },
                         { icon: ShieldCheck, label: "PCI DSS" },
                         { icon: CheckCircle2, label: "Stripe" },
                     ].map((b) => (
                         <div key={b.label} className="flex items-center gap-1.5 text-zinc-400 dark:text-muted-foreground/50">
                             <b.icon className="w-3.5 h-3.5" />
                             <span className="text-[11px] uppercase tracking-wider font-bold">{b.label}</span>
                         </div>
                     ))}
                 </div>
             </form>
         </div>
     );
 }
