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
 
 // ── Mini Card Preview ──
 function CardPreview({ name, flipped, brand = "unknown" }: { name: string; flipped: boolean; brand?: string }) {
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
                             <p className="text-xs text-slate-300">**/**</p>
                         </div>
                     </div>
                 </div>
                 {/* Back */}
                 <div className="absolute inset-0 rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden bg-gradient-to-br from-[#1c2d4a] via-[#1a2940] to-[#0f1a2e] border border-gold-500/20 shadow-2xl shadow-black/40">
                     <div className="h-10 bg-slate-900 mt-5" />
                     <div className="px-5 mt-4 flex items-center gap-3">
                         <div className="flex-1 h-8 bg-slate-800 rounded border border-white/5 flex items-center justify-end px-2">
                             <div className="text-xs font-mono text-slate-400 italic">***</div>
                         </div>
                         <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                             <span className="text-slate-900 text-xs font-bold">CVC</span>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     );
 }
 
 // ── Stripe Input Wrapper ──
 function StripeInputWrapper({
     label, focused, children
 }: {
     label: string; focused: boolean; children: React.ReactNode;
 }) {
     return (
         <div className="relative">
             <div
                 className={`rounded-xl border bg-zinc-50/50 dark:bg-[#0d1321]/50 px-4 pt-3 pb-2.5 transition-all duration-200 ${focused ? "border-gold-500/40 shadow-[0_0_0_3px_rgba(212,168,67,0.06)]" : "border-zinc-200/50 dark:border-white/[0.07] hover:border-zinc-300 dark:hover:border-white/[0.12]"
                     }`}
             >
                 <label
                     className={`block text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 mb-1 pointer-events-none ${focused ? "text-gold-600 dark:text-gold-400" : "text-zinc-500 dark:text-muted-foreground"
                         }`}
                 >
                     {label}
                 </label>
                 <div className="w-full mt-2">
                     {children}
                 </div>
             </div>
         </div>
     );
 }
 
 // ── Main Form Components ──
 export function StripeCardForm({
     amountPkr,
     clientSecret,
     assignmentId,
     studentId,
     semester,
     programName
 }: {
     amountPkr: number;
     clientSecret: string;
     assignmentId: string;
     studentId: string;
     semester: number;
     programName: string;
 }) {
     const stripe = useStripe();
     const elements = useElements();
     const router = useRouter();
     const theme = useSelector((state: RootState) => state.ui.theme);
 
     const [processing, setProcessing] = useState(false);
     const [error, setError] = useState("");
 
     // State for preview / styling
     const [name, setName] = useState("");
     const [nameFocused, setNameFocused] = useState(false);
     
     // Focus states for wrappers
     const [numFocused, setNumFocused] = useState(false);
     const [expFocused, setExpFocused] = useState(false);
     const [cvcFocused, setCvcFocused] = useState(false);
     
     // Card brand for preview
     const [cardBrand, setCardBrand] = useState("unknown");
 
     const stripeOptions = useMemo(() => ({
         style: {
             base: {
                 iconColor: "#d4a843",
                 color: theme === 'dark' ? "#e2e8f0" : "#18181b",
                 fontWeight: "500",
                 fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                 fontSize: "14px",
                 fontSmoothing: "antialiased",
                 ":-webkit-autofill": { color: "#fce883" },
                 "::placeholder": { color: theme === 'dark' ? "#64748b" : "#a1a1aa" },
             },
             invalid: {
                 iconColor: "#f87171",
                 color: "#f87171",
             },
         },
     }), [theme]);
 
     const handlePay = async () => {
         if (!stripe || !elements) return;
         setError("");
 
         if (!name.trim()) {
             setError("Please enter the cardholder name.");
             return;
         }
 
         const cardElement = elements.getElement(CardNumberElement);
         if (!cardElement) return;
 
         setProcessing(true);
 
         const { error: submitError, paymentIntent } = await stripe.confirmCardPayment(
             clientSecret,
             {
                 payment_method: {
                     card: cardElement,
                     billing_details: { name },
                 },
             }
         );
 
         if (submitError) {
             setError(submitError.message ?? "An unexpected error occurred.");
             setProcessing(false);
         } else if (paymentIntent && paymentIntent.status === "succeeded") {
             const returnUrl = `/student/paymentsuccess?assignmentId=${assignmentId}&amount=${amountPkr}&semester=${semester}&program=${encodeURIComponent(programName)}&studentId=${studentId}`;
             router.push(returnUrl);
         } else {
             const returnUrl = `/student/paymentsuccess?assignmentId=${assignmentId}&amount=${amountPkr}&semester=${semester}&program=${encodeURIComponent(programName)}&studentId=${studentId}&payment_intent=${paymentIntent?.id}&redirect_status=${paymentIntent?.status}`;
             router.push(returnUrl);
         }
     };
 
     return (
         <div className="rounded-2xl border border-zinc-200/50 dark:border-white/[0.06] bg-white/40 dark:bg-[#0a0e1a]/40 backdrop-blur-md overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
             {/* Header */}
             <div className="px-6 pt-6 pb-4 border-b border-zinc-100 dark:border-white/[0.04]">
                 <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-[#635BFF]/10 flex items-center justify-center border border-[#635BFF]/20">
                         <CreditCard className="w-5 h-5 text-[#635BFF]" />
                     </div>
                     <div>
                         <h2 className="text-lg font-bold text-zinc-900 dark:text-foreground tracking-tight">
                             Pay with Stripe
                         </h2>
                         <p className="text-xs text-zinc-500 dark:text-muted-foreground">Secured with 256-bit TLS encryption</p>
                     </div>
                 </div>
             </div>
 
             <div className="p-6">
                 {/* Stripe branding accent */}
                 <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#635BFF]/5 border border-[#635BFF]/15 mb-6">
                     <div className="w-5 h-5 rounded bg-[#635BFF] flex items-center justify-center">
                         <span className="text-white text-[11px] font-bold">S</span>
                     </div>
                     <span className="text-xs text-[#635BFF] dark:text-[#A5A2FF] font-bold uppercase tracking-wider">Powered by Stripe</span>
                     <span className="ml-auto text-[11px] text-zinc-400 dark:text-muted-foreground/60">Visa, Mastercard, Amex</span>
                 </div>
 
                 {/* ── Card Form ── */}
                 <div className="space-y-3">
                     <CardPreview name={name} flipped={cvcFocused} brand={cardBrand} />
 
                     <StripeInputWrapper label="Card Number" focused={numFocused}>
                         <CardNumberElement
                             options={{ ...stripeOptions, showIcon: false }}
                             onFocus={() => setNumFocused(true)}
                             onBlur={() => setNumFocused(false)}
                             onChange={(e) => setCardBrand(e.brand)}
                         />
                     </StripeInputWrapper>
 
                     <div className="grid grid-cols-2 gap-3">
                         <StripeInputWrapper label="Expiry" focused={expFocused}>
                             <CardExpiryElement
                                 options={stripeOptions}
                                 onFocus={() => setExpFocused(true)}
                                 onBlur={() => setExpFocused(false)}
                             />
                         </StripeInputWrapper>
                         <StripeInputWrapper label="CVC" focused={cvcFocused}>
                             <CardCvcElement
                                 options={stripeOptions}
                                 onFocus={() => setCvcFocused(true)}
                                 onBlur={() => setCvcFocused(false)}
                             />
                         </StripeInputWrapper>
                     </div>
 
                     <div className="relative">
                         <div
                             className={`rounded-xl border bg-zinc-50/50 dark:bg-[#0d1321]/50 px-4 pt-3 pb-2.5 transition-all duration-200 ${nameFocused ? "border-gold-500/40 shadow-[0_0_0_3px_rgba(212,168,67,0.06)]" : "border-zinc-200/50 dark:border-white/[0.07] hover:border-zinc-300 dark:hover:border-white/[0.12]"
                                 }`}
                         >
                             <label
                                 className={`block text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 mb-1 ${nameFocused ? "text-gold-600 dark:text-gold-400" : "text-zinc-500 dark:text-muted-foreground"
                                     }`}
                             >
                                 Cardholder Name
                             </label>
                             <input
                                 type="text"
                                 value={name}
                                 onChange={(e) => setName(e.target.value.toUpperCase())}
                                 onFocus={() => setNameFocused(true)}
                                 onBlur={() => setNameFocused(false)}
                                 placeholder="AS ON CARD"
                                 autoComplete="cc-name"
                                 className="w-full bg-transparent text-sm text-zinc-900 dark:text-foreground placeholder:text-zinc-400 dark:placeholder:text-muted-foreground/60 outline-none font-mono"
                             />
                         </div>
                     </div>
                 </div>
 
                 {/* Error */}
                 {error && (
                     <div className="mt-4 flex items-start gap-2.5 px-4 py-3 rounded-xl bg-rose-50/50 dark:bg-rose-500/5 border border-rose-200/50 dark:border-rose-500/20 backdrop-blur-sm">
                         <AlertCircle className="w-4 h-4 text-rose-500 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                         <p className="text-sm text-rose-700 dark:text-rose-300">{error}</p>
                     </div>
                 )}
 
                 {/* Pay Button */}
                 <button
                     onClick={handlePay}
                     disabled={processing || !stripe || !elements}
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
 
                 {/* Trust Row */}
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
             </div>
         </div>
     );
 }
