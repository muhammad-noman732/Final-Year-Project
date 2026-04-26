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
import { withRetry } from "@/lib/utils/retry"
import { withTimeout } from "@/lib/utils/timeout"

const STRIPE_TIMEOUT_MS = 10_000

function isStripeRetryable(error: Error): boolean {
  if (error instanceof Stripe.errors.StripeConnectionError) return true
  if (error instanceof Stripe.errors.StripeError) {
    const code = error.statusCode ?? 0
    return code === 429 || code >= 500
  }
  const transient = ["ECONNRESET", "ECONNREFUSED", "ETIMEDOUT", "socket hang up"]
  return transient.some((msg) => error.message.includes(msg))
}

function isPrismaP2002(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code: string }).code === "P2002"
  )
}

export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly studentRepo: StudentRepository,
  ) {}

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
      // Retrieve the PI outside of try/catch so FeeAlreadyPaidError propagates normally
      let existingPI: Stripe.PaymentIntent | null = null
      try {
        existingPI = await withRetry(
          () =>
            withTimeout(
              stripe.paymentIntents.retrieve(existingPayment.stripePaymentIntentId!),
              STRIPE_TIMEOUT_MS,
              "stripe.paymentIntents.retrieve",
            ),
          "stripe.paymentIntents.retrieve",
          { shouldRetry: isStripeRetryable },
        )
      } catch (err) {
        logger.error(
          {
            event: "payment.retrieve_pi_failed",
            piId: existingPayment.stripePaymentIntentId,
            err,
          },
          "Failed to retrieve existing PI; will attempt to create a new PI",
        )
      }

      if (existingPI) {
        // PI already collected — fulfil inline if DB is stale (e.g. webhook missed on localhost)
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
          void revalidateStudentFee(dto.tenantId, dto.userId)
          throw new FeeAlreadyPaidError(dto.feeAssignmentId)
        }

        // Reuse if still confirmable — no new PI needed
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

    const paymentIntent = await withRetry(
      () =>
        withTimeout(
          stripe.paymentIntents.create(
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
          ),
          STRIPE_TIMEOUT_MS,
          "stripe.paymentIntents.create",
        ),
      "stripe.paymentIntents.create",
      { shouldRetry: isStripeRetryable },
    )

    // Stripe's idempotency key returned the same PI already in our DB — nothing to insert
    if (existingPayment?.stripePaymentIntentId === paymentIntent.id) {
      return {
        clientSecret: paymentIntent.client_secret!,
        paymentIntentId: paymentIntent.id,
        amountPkr: assignment.amountDue,
      }
    }

    const receiptNumber = await this.paymentRepository.generateReceiptNumber(
      dto.tenantId,
      paymentIntent.id,
    )

    try {
      await this.paymentRepository.createPaymentRecord({
        tenantId: dto.tenantId,
        studentId: student.id,
        feeAssignmentId: dto.feeAssignmentId,
        stripePaymentIntentId: paymentIntent.id,
        amount: assignment.amountDue,
        receiptNumber,
      })
    } catch (err) {
      // Concurrent request beat us to the insert — recover by returning the same PI payload
      if (isPrismaP2002(err)) {
        logger.info(
          {
            event: "payment.duplicate_insert_recovered",
            feeAssignmentId: dto.feeAssignmentId,
            piId: paymentIntent.id,
          },
          "P2002 on payment insert (concurrent request); returning existing PI payload",
        )
        const recovered = await this.paymentRepository.findPaymentByStripeIntentId(
          paymentIntent.id,
        )
        if (recovered) {
          return {
            clientSecret: paymentIntent.client_secret!,
            paymentIntentId: paymentIntent.id,
            amountPkr: assignment.amountDue,
          }
        }
      }
      throw err
    }

    return {
      clientSecret: paymentIntent.client_secret!,
      paymentIntentId: paymentIntent.id,
      amountPkr: assignment.amountDue,
    }
  }
}
