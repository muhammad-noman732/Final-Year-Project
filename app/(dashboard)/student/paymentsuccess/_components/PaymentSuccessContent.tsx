"use client"

import SuccessHero from "./SuccessHero"
import ReceiptCard from "./ReceiptCard"
import ActionButtons from "./ActionButtons"
import ConfirmationBanner from "./ConfirmationBanner"
import SuccessSkeleton from "./SuccessSkeleton"
import ErrorState from "./ErrorState"
import { usePaymentSuccess } from "@/hooks/student/usePaymentSuccess"

export default function PaymentSuccessContent() {
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
  } = usePaymentSuccess()

  if (isLoading) return <SuccessSkeleton />
  if (stripeRedirectFailed) return <ErrorState />

  const assignmentId = paidAssignment?.id ?? null
  const receiptDisplay = receiptNumber && receiptNumber !== "—" ? receiptNumber : null

  return (
    <div className="max-w-xl mx-auto px-4 pt-3 pb-10 space-y-4">
      <SuccessHero />

      <ReceiptCard
        studentName={studentName}
        studentIdStr={studentIdStr}
        departmentName={departmentName}
        programName={programName}
        semLabel={semLabel}
        sessionName={sessionName}
        paidAssignment={paidAssignment ?? null}
        displayAmount={displayAmount}
        receiptNumber={receiptDisplay}
        formattedDate={formattedDate}
      />

      <ActionButtons assignmentId={assignmentId} />

      <ConfirmationBanner studentEmail={studentEmail} />
    </div>
  )
}
