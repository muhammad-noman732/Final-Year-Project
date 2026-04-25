export interface CreatePaymentIntentDTO {
  feeAssignmentId: string
  userId: string
  tenantId: string
}

export interface CreatePaymentIntentResult {
  clientSecret: string
  paymentIntentId: string
  amountPkr: number
}


export interface StripePaymentMetadata {
  tenantId: string
  studentId: string
  feeAssignmentId: string
  studentName: string
  studentEmail: string
  studentRollNo: string
  semesterName: string
  programName: string
}

export interface PaymentIntentApiResponse {
  clientSecret: string
  paymentIntentId: string
  amountPkr: number
}
