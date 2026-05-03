"use client";
 
 import { useRef, useEffect } from "react";
 import Link from "next/link";
 import {
     CheckCircle2, Download, Mail, Printer,
     ArrowLeft, Check, Info, QrCode, Sparkles, Loader2,
     AlertCircle,
 } from "lucide-react";
 import { formatFullCurrency } from "@/config/constants";
 import { usePaymentSuccess } from "@/hooks/student/usePaymentSuccess";
 
 function AnimatedCheck() {
     return (
         <div className="relative inline-flex">
             <span className="absolute inset-0 rounded-full bg-emerald-500/10 animate-[ping_2s_ease_infinite]" />
             <span className="absolute inset-2 rounded-full bg-emerald-500/8 animate-[ping_2s_ease_0.4s_infinite]" />
             <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-700/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center shadow-2xl shadow-emerald-500/20 backdrop-blur-sm">
                 <CheckCircle2 className="w-9 h-9 text-emerald-600 dark:text-emerald-400" strokeWidth={1.8} />
             </div>
             <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-gold-500 animate-pulse" />
         </div>
     );
 }
 
 function SuccessLoading() {
     return (
         <div className="max-w-2xl mx-auto pb-12 flex items-center justify-center min-h-[400px]">
             <div className="flex flex-col items-center gap-3">
                 <Loader2 className="w-8 h-8 text-gold-500 animate-spin" />
                 <p className="text-sm text-zinc-500 dark:text-muted-foreground">Verifying your payment…</p>
             </div>
         </div>
     );
 }
 
 import { Suspense } from "react";
 
 function PaymentSuccessContent() {
     const checkRef = useRef<HTMLDivElement>(null);
     const {
         paidAssignment,
         isLoading,
         stripeRedirectFailed,
         studentName,
         studentIdStr,
         studentEmail,
         programName,
         semLabel,
         sessionName,
         departmentName,
         displayAmount,
         receiptNumber,
         formattedDate,
     } = usePaymentSuccess();
 
     // Entrance animation
     useEffect(() => {
         const el = checkRef.current;
         if (!el) return;
         const timer = setTimeout(() => {
             el.style.opacity = "1";
             el.style.transform = "translateY(0) scale(1)";
         }, 100);
         return () => clearTimeout(timer);
     }, []);
 
     if (isLoading) return <SuccessLoading />;
 
     if (stripeRedirectFailed) {
         return (
             <div className="max-w-2xl mx-auto pb-12 flex items-center justify-center min-h-[400px]">
                 <div className="flex flex-col items-center gap-4 text-center px-4">
                     <AlertCircle className="w-12 h-12 text-rose-500 dark:text-rose-400" />
                     <h2 className="text-lg font-bold text-zinc-900 dark:text-foreground">Payment Not Completed</h2>
                     <p className="text-sm text-zinc-500 dark:text-muted-foreground max-w-xs">
                         Your payment was not successful. No charge has been made.
                     </p>
                     <Link
                         href="/student/payfee"
                         className="px-6 py-2.5 rounded-xl bg-[#635BFF] text-white text-sm font-bold hover:bg-[#5249E0] transition-colors shadow-lg shadow-blue-500/20"
                     >
                         Try Again
                     </Link>
                 </div>
             </div>
         );
     }
 
     return (
         <div className="max-w-2xl mx-auto pb-12 pt-6 px-4 space-y-8">
             {/* Print CSS — only the receipt card renders when printing */}
             <style dangerouslySetInnerHTML={{ __html: `
                 @media print {
                     * { visibility: hidden !important; }
                     #receipt-print-area, #receipt-print-area * { visibility: visible !important; }
                     #receipt-print-area {
                         position: fixed !important;
                         inset: 0 !important;
                         padding: 20mm !important;
                         background-color: #ffffff !important;
                         border: none !important;
                         box-shadow: none !important;
                         border-radius: 0 !important;
                         --foreground: #111827;
                         --muted-foreground: #4b5563;
                         color: #111827 !important;
                     }
                     #receipt-print-area .text-muted-foreground { color: #4b5563 !important; }
                     #receipt-print-area .text-foreground { color: #111827 !important; }
                     #receipt-print-area .text-gold-400, #receipt-print-area .text-gold-gradient { color: #92650a !important; }
                     #receipt-print-area .text-gold-500\\/50 { color: #92650a !important; }
                     #receipt-print-area .text-emerald-400, #receipt-print-area .text-emerald-600 { color: #059669 !important; }
                     #receipt-print-area .text-slate-300, #receipt-print-area .text-zinc-800 { color: #374151 !important; }
                     #receipt-print-area .bg-gold-500\\/5, #receipt-print-area .bg-\\[\\#0a0e1a\\], #receipt-print-area .bg-white { background: transparent !important; }
                     #receipt-print-area .border-gold-500\\/10, #receipt-print-area .border-white\\/\\[0\\.07\\], #receipt-print-area .border-white\\/\\[0\\.06\\], #receipt-print-area .border-zinc-200 { border-color: #e5e7eb !important; }
                     #receipt-print-area .text-emerald-500\\/10 { background: transparent !important; }
                     @page { margin: 0; }
                 }
             ` }} />
 
             {/* ══ SUCCESS HEADER ══ */}
             <div
                 ref={checkRef}
                 className="text-center transition-all duration-700"
                 style={{ opacity: 0, transform: "translateY(20px) scale(0.95)" }}
             >
                 <div className="flex justify-center mb-5">
                     <AnimatedCheck />
                 </div>
                 <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-foreground mb-2 tracking-tight">
                     Payment Successful
                 </h1>
                 <p className="text-zinc-500 dark:text-muted-foreground text-sm font-medium">
                     Your fee has been paid and verified by the institution.
                 </p>
             </div>
 
             {/* ══ OFFICIAL RECEIPT ══ */}
             <div id="receipt-print-area" className="relative rounded-2xl border border-zinc-200 dark:border-white/[0.07] bg-white dark:bg-[#0a0e1a] overflow-hidden shadow-xl dark:shadow-2xl dark:shadow-black/40">
                 {/* Gold accent bar */}
                 <div className="h-0.5 bg-gradient-to-r from-transparent via-gold-500 dark:via-gold-400 to-transparent" />
 
                 {/* PAID watermark */}
                 <div
                     className="pointer-events-none select-none absolute top-6 right-6 text-emerald-500/[0.08] dark:text-emerald-500/10 font-black uppercase text-[64px] leading-none [transform:rotate(-15deg)] tracking-wider"
                     aria-hidden
                 >
                     PAID
                 </div>
 
                 <div className="p-6 sm:p-8 relative">
                     {/* University header */}
                     <div className="text-center mb-6 pb-6 border-b border-zinc-100 dark:border-white/[0.06]">
                         <p className="text-[11px] text-gold-600/50 dark:text-gold-500/50 uppercase tracking-[0.25em] font-bold mb-1.5">
                             Government College University Faisalabad
                         </p>
                         <h2 className="text-base font-bold text-gold-600 dark:text-gold-400 uppercase tracking-[0.12em]">
                             Fee Payment Receipt
                         </h2>
                     </div>
 
                     {/* Student info grid */}
                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 mb-6 pb-6 border-b border-zinc-100 dark:border-white/[0.06]">
                         {[
                             { label: "Student Name", value: studentName },
                             { label: "Student ID", value: studentIdStr },
                             { label: "Department", value: departmentName },
                             { label: "Program", value: programName },
                             { label: "Semester", value: `${semLabel} Semester` },
                             { label: "Session", value: sessionName },
                         ].map((f) => (
                             <div key={f.label}>
                                 <p className="text-[11px] text-zinc-500 dark:text-muted-foreground uppercase tracking-widest font-bold mb-0.5">
                                     {f.label}
                                 </p>
                                 <p className="text-xs font-bold text-zinc-900 dark:text-foreground">{f.value}</p>
                             </div>
                         ))}
                     </div>
 
                     {/* Fee breakdown */}
                     {paidAssignment && (
                         <div className="space-y-1 mb-4">
                             {[
                                 { label: "Tuition Fee", amount: paidAssignment.feeStructure.tuitionFee },
                                 { label: "Lab Fee", amount: paidAssignment.feeStructure.labFee },
                                 { label: "Library Fee", amount: paidAssignment.feeStructure.libraryFee },
                                 { label: "Sports Fee", amount: paidAssignment.feeStructure.sportsFee },
                                 { label: "Registration Fee", amount: paidAssignment.feeStructure.registrationFee },
                                 { label: "Examination Fee", amount: paidAssignment.feeStructure.examinationFee },
                             ]
                                 .filter((i) => i.amount > 0)
                                 .map((item) => (
                                     <div
                                         key={item.label}
                                         className="flex justify-between text-sm py-2 border-b border-zinc-50 dark:border-white/[0.03] last:border-0"
                                     >
                                         <span className="text-zinc-500 dark:text-muted-foreground">{item.label}</span>
                                         <span className="text-zinc-900 dark:text-foreground tabular-nums font-bold">
                                             {formatFullCurrency(item.amount)}
                                         </span>
                                     </div>
                                 ))}
                         </div>
                     )}
 
                     {/* Total */}
                     <div className="flex justify-between items-center py-3 px-4 rounded-xl bg-gold-50 dark:bg-gold-500/5 border border-gold-200 dark:border-gold-500/10 mb-6">
                         <span className="text-sm font-bold text-gold-600 dark:text-gold-400">Total Paid</span>
                         <span className="text-xl font-bold text-gold-600 dark:text-gold-gradient tracking-tight">
                             {formatFullCurrency(displayAmount)}
                         </span>
                     </div>
 
                     {/* Transaction info */}
                     <div className="space-y-2 mb-6 pb-6 border-b border-zinc-100 dark:border-white/[0.06]">
                         {[
                             { label: "Receipt No.", value: receiptNumber },
                             { label: "Payment Method", value: "Stripe · Card" },
                             { label: "Date & Time", value: formattedDate },
                         ].map((f) => (
                             <div key={f.label} className="flex justify-between text-sm">
                                 <span className="text-zinc-500 dark:text-muted-foreground">{f.label}</span>
                                 <span className="text-zinc-800 dark:text-slate-300 font-mono text-xs font-bold">{f.value}</span>
                             </div>
                         ))}
                         <div className="flex justify-between text-sm">
                             <span className="text-zinc-500 dark:text-muted-foreground">Status</span>
                             <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-black text-xs">
                                 <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
                             </span>
                         </div>
                     </div>
 
                     {/* QR + footer */}
                     <div className="flex items-center justify-between">
                         <div>
                             <p className="text-[11px] text-zinc-500 dark:text-muted-foreground uppercase tracking-widest font-bold mb-1">
                                 Scan to verify
                             </p>
                             <p className="text-[11px] text-zinc-400 dark:text-muted-foreground/60 font-mono">
                                 {receiptNumber}
                             </p>
                         </div>
                         <div className="w-16 h-16 rounded-lg bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/[0.08] flex items-center justify-center">
                             <QrCode className="w-9 h-9 text-zinc-400 dark:text-gold-500/25" />
                         </div>
                     </div>
 
                     <p className="text-center text-[11px] text-zinc-400 dark:text-muted-foreground/40 uppercase tracking-widest mt-5 font-bold">
                         Official Digital Receipt — Government College University Faisalabad
                     </p>
                 </div>
             </div>
 
             {/* ══ ACTIONS ══ */}
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                 {[
                     { icon: Download, label: "Download", onClick: () => window.print() },
                     { icon: Mail, label: "Email", onClick: undefined },
                     { icon: Printer, label: "Print", onClick: () => window.print() },
                     { icon: ArrowLeft, label: "Dashboard", href: "/student" },
                 ].map((btn) => {
                     const cls =
                         "flex items-center justify-center gap-2 py-2.5 rounded-xl border border-zinc-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] text-sm font-bold text-zinc-500 dark:text-muted-foreground hover:text-gold-600 dark:hover:text-gold-400 hover:border-gold-300 dark:hover:border-gold-500/20 hover:bg-gold-50 dark:hover:bg-gold-500/[0.04] transition-all duration-200 w-full shadow-sm";
                     return btn.href ? (
                         <Link key={btn.label} href={btn.href} className={cls}>
                             <btn.icon className="w-4 h-4" /> {btn.label}
                         </Link>
                     ) : (
                         <button key={btn.label} className={cls} onClick={btn.onClick}>
                             <btn.icon className="w-4 h-4" /> {btn.label}
                         </button>
                     );
                 })}
             </div>
 
             {/* ══ WHAT'S NEXT ══ */}
             <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-[#0a0e1a] p-6 shadow-sm">
                 <h3 className="text-sm font-bold text-zinc-900 dark:text-foreground tracking-tight mb-4 flex items-center gap-2">
                     <Sparkles className="w-4 h-4 text-gold-500 dark:text-gold-400" />
                     What&apos;s Next
                 </h3>
                 <div className="space-y-3">
                     {[
                         { done: true, text: `Fee payment confirmed for ${semLabel} Semester` },
                         { done: true, text: "Receipt saved to your account" },
                         { done: true, text: `Confirmation email sent to ${studentEmail}` },
                         { done: false, info: true, text: "You now have full access to semester facilities" },
                     ].map((step, i) => (
                         <div key={i} className="flex items-center gap-3">
                             <div
                                 className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${step.info ? "bg-sky-500/10" : "bg-emerald-500/10"
                                     }`}
                             >
                                 {step.info ? (
                                     <Info className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                                 ) : (
                                     <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                 )}
                             </div>
                             <span className="text-sm text-zinc-600 dark:text-muted-foreground font-medium">{step.text}</span>
                         </div>
                     ))}
                 </div>
             </div>
         </div>
     );
 }
 
 export default function PaymentSuccessPage() {
     return (
         <Suspense fallback={
             <div className="max-w-2xl mx-auto pb-12 flex items-center justify-center min-h-[400px]">
                 <Loader2 className="w-10 h-10 text-gold-500 animate-spin" />
             </div>
         }>
             <PaymentSuccessContent />
         </Suspense>
     );
 }
