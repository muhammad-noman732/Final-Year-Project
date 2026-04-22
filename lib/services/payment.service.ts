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

export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) { }

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

    // ── Check for an existing PI we can reuse ──────────────────────────
    const existingPayment =
      await this.paymentRepository.findExistingPaymentForAssignment(
        dto.feeAssignmentId,
      )

    if (existingPayment?.stripePaymentIntentId) {
      try {
        const existingPI = await stripe.paymentIntents.retrieve(
          existingPayment.stripePaymentIntentId,
        )

        // PI already succeeded on Stripe but our DB missed the webhook.
        // Fulfil inline and inform the student.
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
          throw new FeeAlreadyPaidError(dto.feeAssignmentId)
        }

        // Still confirmable — reuse it
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

        // Terminal but NOT succeeded (canceled, etc.) — clean up DB record
        // and fall through to create a fresh PI.
        logger.info(
          { event: "payment.stale_pi_cleanup", pi: existingPI.id, status: existingPI.status },
          `Existing PI in terminal state '${existingPI.status}' — marking failed and creating new PI`,
        )
        await this.paymentRepository.failPayment(existingPayment.id)
      } catch (err) {
        // If it's our own FeeAlreadyPaidError, rethrow it
        if (err instanceof FeeAlreadyPaidError) throw err

        // Log error but continue to create new PI if retrieval fails
        logger.error(
          { event: "payment.pi_retrieve_failed", error: err instanceof Error ? err.message : String(err) },
          "Failed to retrieve existing PI from Stripe — will create new one",
        )
      }
    }

    // ── Create a fresh PaymentIntent ───────────────────────────────────
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
      },
      { idempotencyKey },
    )

    // Idempotency hit — same PI returned, don't create a duplicate DB record
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