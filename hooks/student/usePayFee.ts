import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { useGetMyFeeProfileQuery, useCreatePaymentIntentMutation } from "@/store/api/student/studentApi"

export function usePayFee() {
  const searchParams = useSearchParams()
  const feeAssignmentIdFromUrl = searchParams.get("assignmentId")

  const { data: feeProfile, isLoading: profileLoading, isError: profileError } = useGetMyFeeProfileQuery()
  const [createPaymentIntent, { isLoading: isCreatingIntent }] = useCreatePaymentIntentMutation()

  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [intentAmount, setIntentAmount] = useState<number>(0)
  const [intentError, setIntentError] = useState<string | null>(null)

  const intentCreatedRef = useRef(false)

  const targetAssignment = feeProfile?.assignments.find(a =>
    feeAssignmentIdFromUrl
      ? a.id === feeAssignmentIdFromUrl
      : a.status === "UNPAID" || a.status === "OVERDUE"
  ) ?? null

  useEffect(() => {
    if (!targetAssignment || clientSecret || intentCreatedRef.current) return
    intentCreatedRef.current = true

    createPaymentIntent({ feeAssignmentId: targetAssignment.id })
      .unwrap()
      .then(({ clientSecret: cs, amountPkr }) => {
        setClientSecret(cs)
        setIntentAmount(amountPkr)
      })
      .catch((err) => {
        intentCreatedRef.current = false 
        setIntentError(
          err?.data?.error?.message ?? "Failed to initialize payment. Please try again."
        )
      })

  }, [targetAssignment, clientSecret])

  return {
    feeProfile,
    targetAssignment,
    clientSecret,
    intentAmount,
    isLoading: profileLoading || isCreatingIntent || !!(!clientSecret && targetAssignment),
    isError: profileError || !!intentError,
    errorMessage: intentError ?? (profileError ? "Failed to load fee profile." : null),
  }
}

