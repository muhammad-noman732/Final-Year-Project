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
  studentId: string    // Student.id (not User.id)
  feeAssignmentId: string
  studentName: string
  studentEmail: string
  studentRollNo: string  // e.g. "GCUF-2024-CS-0042"
  semesterName: string   // e.g. "Semester 4"
  programName: string    // e.g. "BS Computer Science"
}

export interface PaymentIntentApiResponse {
  clientSecret: string
  paymentIntentId: string
  amountPkr: number
}
