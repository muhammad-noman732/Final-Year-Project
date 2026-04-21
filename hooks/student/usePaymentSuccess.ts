"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
    useGetMyFeeProfileQuery,
    useInvalidateFeeProfileMutation,
} from "@/store/api/student/studentApi";
import { ordinal } from "@/hooks/student/useStudentDashboard";

export function usePaymentSuccess() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // URL params injected by the payfee page after Stripe confirms
    const assignmentId = searchParams.get("assignmentId");
    const amountParam = searchParams.get("amount");
    const semesterParam = searchParams.get("semester");
    const programParam = searchParams.get("program");
    const paymentIntentId = searchParams.get("payment_intent");
    const paymentStatus = searchParams.get("redirect_status"); // 'succeeded' | 'failed'

    // If the user landed here from a Stripe redirect (3DS), check for failure
    const stripeRedirectFailed = paymentStatus !== null && paymentStatus !== "succeeded";

    // Invalidate StudentFeeProfile cache so dashboard shows PAID
    const [invalidate, { isLoading: invalidating }] = useInvalidateFeeProfileMutation();
    const { data: feeProfile, isLoading: profileLoading } = useGetMyFeeProfileQuery();
    const [cacheInvalidated, setCacheInvalidated] = useState(false);

    useEffect(() => {
        if (stripeRedirectFailed) {
            router.replace("/student/payfee?error=payment_failed");
        }
    }, [stripeRedirectFailed, router]);

    useEffect(() => {
        if (!cacheInvalidated) {
            setCacheInvalidated(true);
            invalidate();
        }
    }, [cacheInvalidated, invalidate]);

    const isLoading = profileLoading || invalidating;

    // Resolve receipt data
    const semester = semesterParam ? parseInt(semesterParam, 10) : null;
    const program = programParam ? decodeURIComponent(programParam) : null;
    const amountPkr = amountParam ? parseInt(amountParam, 10) : null;

    const paidAssignment = assignmentId
        ? feeProfile?.assignments.find((a) => a.id === assignmentId)
        : feeProfile?.assignments.find((a) => a.status === "PAID");

    const studentName = feeProfile?.student.user.name ?? "—";
    const studentIdStr = feeProfile?.student.studentId ?? "—";
    const studentEmail = feeProfile?.student.user.email ?? "—";
    const programName = program ?? paidAssignment?.feeStructure.program.name ?? "—";
    const semesterNum = semester ?? paidAssignment?.feeStructure.semester ?? null;
    const semLabel = semesterNum ? ordinal(semesterNum) : "—";
    const sessionName = feeProfile?.student.session.name ?? "—";
    const departmentName = feeProfile?.student.department.name ?? "—";

    const displayAmount = amountPkr ?? paidAssignment?.amountDue ?? 0;

    const receiptNumber =
        paidAssignment?.payments.find((p) => p.status === "COMPLETED")
            ?.receiptNumber ?? paymentIntentId?.slice(-12).toUpperCase() ?? "—";

    const paidAt = paidAssignment?.payments.find((p) => p.status === "COMPLETED")?.paidAt;
    const formattedDate = paidAt
        ? new Date(paidAt).toLocaleDateString("en-PK", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
        : new Date().toLocaleDateString("en-PK", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

    return {
        feeProfile,
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
    };
}
