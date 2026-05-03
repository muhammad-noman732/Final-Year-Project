"use client";
 
 import {
     Elements,
 } from "@stripe/react-stripe-js";
 import { stripePromise } from "@/lib/stripe/stripe.client";
 import { usePayFee } from "@/hooks/student/usePayFee";
 import {
     AlertCircle,
     ArrowLeft,
     Loader2
 } from "lucide-react";
 import { CheckoutForm } from "@/components/student/payfee/CheckoutForm";
 import { OrderSummary } from "@/components/student/payfee/OrderSummary";
 import { Skeleton } from "boneyard-js/react";
 import { useSelector } from "react-redux";
 import type { RootState } from "@/store";
 
 import { Suspense } from "react";
 
 function PayFeeContent() {
     const {
         feeProfile,
         targetAssignment,
         clientSecret,
         intentAmount,
         isLoading,
         isError,
         errorMessage
     } = usePayFee();
     const theme = useSelector((state: RootState) => state.ui.theme);
 
 
     const isActuallyLoading = isLoading || Boolean(!clientSecret && targetAssignment && !isError);
 
     if (!isLoading && (isError || !targetAssignment)) {
         return (
             <div className="max-w-5xl mx-auto pb-10 pt-6 px-4">
                 <a href="/student" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-gold-600 dark:hover:text-gold-400 text-sm mb-6 transition-colors">
                     <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
                 </a>
                 <div className="flex flex-col items-center justify-center min-h-[300px] border border-rose-200 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/5 rounded-2xl p-8 text-center shadow-sm">
                     <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
                     <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Payment Failed to Initialize</h2>
                     <p className="text-rose-600 dark:text-rose-300/80 max-w-md font-bold">{errorMessage || "No active fee assignments found."}</p>
                     <a href="/student" className="mt-6 px-6 py-2 rounded-xl bg-rose-100 dark:bg-rose-500/20 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-500/30 transition-all font-bold text-sm">
                         Return to Dashboard
                     </a>
                 </div>
             </div>
         );
     }
 
     return (
         <div className="max-w-5xl mx-auto pb-10 pt-6 px-4 animate-in fade-in duration-500">
             <a href="/student" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-gold-600 dark:hover:text-gold-400 text-sm mb-6 transition-colors font-bold">
                 <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
             </a>
 
             <div className="grid lg:grid-cols-[1fr_420px] gap-6">
                 <div className="order-2 lg:order-1">
                         {clientSecret && targetAssignment ? (
                             <Elements
                                 stripe={stripePromise}
                                 options={{
                                     clientSecret,
                                     appearance: { theme: theme === 'dark' ? 'night' : 'stripe' },
                                 }}
                             >
                                 <CheckoutForm
                                     amountPkr={intentAmount}
                                     targetAssignment={targetAssignment}
                                     studentName={feeProfile?.student.user.name ?? ""}
                                     studentId={feeProfile?.student.studentId ?? ""}
                                     clientSecret={clientSecret}
                                 />
                             </Elements>
                         ) : (
                             <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-[#0a0e1a] p-6 shadow-xl dark:shadow-2xl relative overflow-hidden">
                                 <div className="absolute inset-0 pointer-events-none opacity-50 bg-gradient-to-br from-zinc-500/[0.02] dark:from-white/[0.01] to-transparent" />
 
                                 {/* Header Skeleton */}
                                 <div className="pb-4 border-b border-zinc-100 dark:border-white/[0.04] mb-6 flex gap-3 items-center animate-pulse">
                                     <div className="w-10 h-10 rounded-xl bg-[#635BFF]/10 border border-[#635BFF]/10 shrink-0" />
                                     <div className="space-y-2.5 flex-1">
                                         <div className="w-32 h-4 rounded-md bg-zinc-200 dark:bg-white/[0.05]" />
                                         <div className="w-48 h-2.5 rounded-md bg-zinc-100 dark:bg-white/[0.03]" />
                                     </div>
                                 </div>
 
                                 <div className="space-y-4 animate-pulse">
                                     {/* Fake Card Preview */}
                                     <div className="w-full h-[180px] rounded-xl bg-gradient-to-br from-zinc-100 dark:from-white/[0.04] to-zinc-50 dark:to-white/[0.01] border border-zinc-200 dark:border-white/[0.02] mb-6" />
 
                                     {/* Fake Inputs */}
                                     <div className="space-y-4">
                                         <div className="w-full h-12 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.02]" />
                                         <div className="grid grid-cols-2 gap-3">
                                             <div className="w-full h-12 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.02]" />
                                             <div className="w-full h-12 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.02]" />
                                         </div>
                                         <div className="w-full h-12 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.02]" />
                                     </div>
 
                                     {/* Fake Pay Button */}
                                     <div className="w-full h-14 rounded-xl bg-[#635BFF]/20 border border-[#635BFF]/20 mt-6" />
                                 </div>
                             </div>
                         )}
                 </div>
                 <div className="order-1 lg:order-2">
                     <OrderSummary
                         targetAssignment={targetAssignment}
                         amountPkr={intentAmount}
                         studentName={feeProfile?.student.user.name ?? ""}
                         studentId={feeProfile?.student.studentId ?? ""}
                         isLoading={isActuallyLoading}
                     />
                 </div>
             </div>
         </div>
     );
 }
 
 export default function PayFeePage() {
     return (
         <Suspense fallback={
             <div className="max-w-5xl mx-auto pb-10 flex items-center justify-center min-h-[400px]">
                 <Loader2 className="w-10 h-10 text-gold-500 animate-spin" />
             </div>
         }>
             <PayFeeContent />
         </Suspense>
     );
 }
