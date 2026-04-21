"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStripe, useElements, CardNumberElement } from "@stripe/react-stripe-js";
import type { FeeAssignment } from "@/types/server/student.types";

export function useConfirmPayment(
    clientSecret: string,
    targetAssignment: FeeAssignment,
    amountPkr: number,
    studentId: string
) {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();

    const [processing, setProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const confirmPayment = async (cardName: string) => {
        if (!stripe || !elements) return;

        setErrorMessage(null);
        setProcessing(true);

        const returnUrl = `${window.location.origin}/student/paymentsuccess?assignmentId=${targetAssignment.id}&amount=${amountPkr}&semester=${targetAssignment.feeStructure.semester}&program=${encodeURIComponent(targetAssignment.feeStructure.program.name)}&studentId=${studentId}`;

        const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardNumberElement)!,
                billing_details: {
                    name: cardName,
                }
            }
        });

        if (confirmError) {
            setErrorMessage(confirmError.message ?? "An unexpected error occurred.");
            setProcessing(false);
        } else {
            router.push(returnUrl);
        }
    };

    return {
        confirmPayment,
        processing,
        errorMessage,
        stripe,
        elements
    };
}
