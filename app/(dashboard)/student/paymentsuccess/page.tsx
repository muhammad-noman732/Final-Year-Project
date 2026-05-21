import { Suspense } from "react"
import PaymentSuccessContent from "./_components/PaymentSuccessContent"
import SuccessSkeleton from "./_components/SuccessSkeleton"

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<SuccessSkeleton />}>
      <PaymentSuccessContent />
    </Suspense>
  )
}
