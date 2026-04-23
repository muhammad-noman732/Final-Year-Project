import { stripe } from "@/lib/stripe/stripe.server"
import type { PaymentRepository } from "@/lib/repositories/payment.repository"
import {
  FeeAlreadyPaidError,
  FeeAssignmentNotFoundError,
  StudentSuspendedError,
} from "@/lib/utils/paymentError"
import { NotFoundError } from "@/lib/utils/AppError"
import { EnrollmentStatus, FeeStatus } from "@/app/generated/prisma/client"
import type {
  CreatePaymentIntentResult,
  StripePaymentMetadata,
} from "@/types/server/payment.types"
import type { CreatePaymentIntentPayload } from "@/lib/validators/payment.validators"
import Stripe from "stripe"
import { logger } from "@/lib/logger"
import { revalidateStudentFee } from "@/lib/cache"
import type { StudentRepository } from "../repositories/student.repository"

export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly studentRepo: StudentRepository,
  ) { }

  async createPaymentIntent(
    dto: CreatePaymentIntentPayload & { tenantId: string; userId: string },
  ): Promise<CreatePaymentIntentResult> {
    const student = await this.paymentRepository.getStudentByUserId(
      dto.tenantId,
      dto.userId,
    )
    if (!student) {
      throw new NotFoundError(
        "Student profile not found. Please contact your university admin.",
      )
    }

    const assignment = await this.paymentRepository.findFeeAssignmentForPayment(
      dto.feeAssignmentId,
      student.id,
      dto.tenantId,
    )
    if (!assignment) {
      throw new FeeAssignmentNotFoundError(dto.feeAssignmentId)
    }

    if (assignment.student.enrollmentStatus === EnrollmentStatus.SUSPENDED) {
      throw new StudentSuspendedError(student.id)
    }

    if (
      assignment.status === FeeStatus.PAID ||
      assignment.status === FeeStatus.WAIVED
    ) {
      throw new FeeAlreadyPaidError(dto.feeAssignmentId)
    }

    const existingPayment =
      await this.paymentRepository.findExistingPaymentForAssignment(
        dto.feeAssignmentId,
      )

    if (existingPayment?.stripePaymentIntentId) {
      try {
        const existingPI = await stripe.paymentIntents.retrieve(
          existingPayment.stripePaymentIntentId,
        )

        // If it's already succeeded but the status in our DB is not updated yet (due to localhost/no webhook),
        // we shouldn't create a new one. This prevents the 409 error.
        if (existingPI.status === "succeeded") {
          logger.info(
            { event: "payment.inline_fulfil", pi: existingPI.id },
            "PI succeeded on Stripe but DB was stale — fulfilling inline",
          )
          await this.paymentRepository.fulfilPayment({
            paymentId: existingPayment.id,
            feeAssignmentId: dto.feeAssignmentId,
            studentId: student.id,
            amount: existingPI.amount,
            stripeResponse: existingPI as unknown as object,
            paidAt: new Date(),
          })
          
          // Clear cache so the student dashboard is immediately correct
          void revalidateStudentFee(dto.tenantId, dto.userId)
          
          throw new FeeAlreadyPaidError(dto.feeAssignmentId)
        }

        // Reuse if still in a confirmable state
        if (
          existingPI.status === "requires_payment_method" ||
          existingPI.status === "requires_confirmation" ||
          existingPI.status === "requires_action"
        ) {
          return {
            clientSecret: existingPI.client_secret!,
            paymentIntentId: existingPI.id,
            amountPkr: existingPI.amount,
          }
        }
      } catch (err) {
        // Log error but continue to create new PI if retrieval fails
        console.error("[PaymentService] Failed to retrieve existing PI:", err)
      }
    }

    const metadata: StripePaymentMetadata = {
      tenantId: dto.tenantId,
      studentId: student.id,
      feeAssignmentId: dto.feeAssignmentId,
      studentName: assignment.student.user.name,
      studentEmail: assignment.student.user.email,
      studentRollNo: student.studentId,
      semesterName: `Semester ${assignment.feeStructure?.semester ?? ""}`,
      programName: assignment.student.program.name,
    }

    const idempotencyKey = `pi-create-${dto.feeAssignmentId}-${dto.tenantId}`

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: assignment.amountDue,
        currency: "pkr",
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: "never",
        },
        metadata: metadata as unknown as Stripe.MetadataParam,
        receipt_email: assignment.student.user.email,
        description: [
          assignment.student.program.name,
          `Semester ${assignment.feeStructure?.semester ?? ""}`,
          student.studentId,
        ].join(" — "),
        setup_future_usage: "off_session",
      },
      { idempotencyKey },
    )

    // If we have an existing payment record but we just got an idempotency hit (same PI ID),
    // we should NOT try to create it again.
    if (existingPayment?.stripePaymentIntentId === paymentIntent.id) {
      return {
        clientSecret: paymentIntent.client_secret!,
        paymentIntentId: paymentIntent.id,
        amountPkr: assignment.amountDue,
      }
    }

    const receiptNumber = await this.paymentRepository.generateReceiptNumber(
      dto.tenantId,
    )

    await this.paymentRepository.createPaymentRecord({
      tenantId: dto.tenantId,
      studentId: student.id,
      feeAssignmentId: dto.feeAssignmentId,
      stripePaymentIntentId: paymentIntent.id,
      amount: assignment.amountDue,
      receiptNumber,
    })

    return {
      clientSecret: paymentIntent.client_secret!,
      paymentIntentId: paymentIntent.id,
      amountPkr: assignment.amountDue,
    }
  }


}