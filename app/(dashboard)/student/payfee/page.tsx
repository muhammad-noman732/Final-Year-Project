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

export default function PayFeePage() {
    const {
        feeProfile,
        targetAssignment,
        clientSecret,
        intentAmount,
        isLoading,
        isError,
        errorMessage
    } = usePayFee();

    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto pb-10 flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-10 h-10 animate-spin text-gold-500 mb-4" />
                <p className="text-muted-foreground animate-pulse">Initializing Secure Checkout...</p>
            </div>
        );
    }

    if (isError || !targetAssignment) {
        return (
            <div className="max-w-5xl mx-auto pb-10">
                <a href="/student" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-gold-400 text-sm mb-6">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
                </a>
                <div className="flex flex-col items-center justify-center min-h-[300px] border border-rose-500/20 bg-rose-500/5 rounded-2xl p-8 text-center">
                    <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
                    <h2 className="text-lg font-bold text-white mb-2">Payment Failed to Initialize</h2>
                    <p className="text-rose-300/80 max-w-md">{errorMessage || "No active fee assignments found."}</p>
                    <a href="/student" className="mt-6 px-6 py-2 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:bg-rose-500/30 transition-all">
                        Return to Dashboard
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto pb-10 animate-in fade-in duration-500">
            <a href="/student" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-gold-400 text-sm mb-6 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </a>

            {clientSecret ? (
                <div className="grid lg:grid-cols-[1fr_420px] gap-6">
                    <div className="order-2 lg:order-1">
                        <Elements
                            stripe={stripePromise}
                            options={{
                                clientSecret,
                                appearance: { theme: 'night' },
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
                    </div>
                    <div className="order-1 lg:order-2">
                        <OrderSummary
                            targetAssignment={targetAssignment}
                            amountPkr={intentAmount}
                            studentName={feeProfile?.student.user.name ?? ""}
                            studentId={feeProfile?.student.studentId ?? ""}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <Loader2 className="w-10 h-10 animate-spin text-gold-500" />
                </div>
            )}
        </div>
    );
}
