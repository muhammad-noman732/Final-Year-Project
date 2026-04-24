import Stripe from "stripe"
import type { Prisma } from "@/app/generated/prisma/client"
import { stripe } from "@/lib/stripe/stripe.server"
import type { PaymentRepository } from "@/lib/repositories/payment.repository"
import type { WebhookRepository } from "@/lib/repositories/webhook.repository"
import type { StudentRepository } from "@/lib/repositories/student.repository"
import type { ActivityLogRepository } from "@/lib/repositories/activityLog.repository"
import {
  InvalidWebhookSignatureError,
  PaymentAmountMismatchError,
} from "@/lib/utils/paymentError"
import type { StripePaymentMetadata } from "@/types/server/payment.types"
import { logger } from "@/lib/logger"
import { revalidateStudentFee } from "@/lib/cache"
import { broadcastPayment } from "@/lib/sse"

export class WebhookService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly webhookRepository: WebhookRepository,
    private readonly studentRepo: StudentRepository,
    private readonly activityLogRepo: ActivityLogRepository,
  ) {}

  async processWebhookEvent(rawBody: string, signature: string): Promise<void> {
    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!,
      )
    } catch {
      throw new InvalidWebhookSignatureError()
    }

    const existing = await this.webhookRepository.findWebhookEvent(event.id)

    if (existing?.processed) return

    const tenantId =
      (event.data.object as { metadata?: { tenantId?: string } })?.metadata?.tenantId ?? null

    if (!existing) {
      await this.webhookRepository.createWebhookEvent({
        stripeEventId: event.id,
        type: event.type,
        tenantId,
        rawPayload: rawBody,
      })
    }

    try {
      switch (event.type) {
        case "payment_intent.succeeded":
          await this.handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent)
          break
        case "payment_intent.payment_failed":
          await this.handlePaymentFailed(event.data.object as Stripe.PaymentIntent)
          break
        case "payment_intent.processing":
          await this.handlePaymentProcessing(event.data.object as Stripe.PaymentIntent)
          break
        case "charge.refunded":
          break
        default:
          logger.info(
            { event: "webhook.unhandled_type", type: event.type },
            `Unhandled event type: ${event.type}`,
          )
      }

      await this.webhookRepository.markWebhookProcessed(event.id)
    } catch (handlerError) {
      const reason =
        handlerError instanceof Error ? handlerError.message : "Unknown handler error"
      await this.webhookRepository.markWebhookFailed(event.id, reason)
      throw handlerError
    }
  }

  private async handlePaymentSucceeded(pi: Stripe.PaymentIntent): Promise<void> {
    const meta = pi.metadata as unknown as StripePaymentMetadata

    if (!meta.feeAssignmentId || !meta.studentId) {
      throw new Error(`payment_intent.succeeded: missing metadata on PI ${pi.id}`)
    }

    const payment = await this.paymentRepository.findPaymentByStripeIntentId(pi.id)
    if (!payment) {
      throw new Error(`payment_intent.succeeded: no Payment record found for PI ${pi.id}.`)
    }

    if (pi.amount !== payment.amount) {
      throw new PaymentAmountMismatchError(payment.amount, pi.amount)
    }

    await this.paymentRepository.fulfilPayment({
      paymentId: payment.id,
      feeAssignmentId: meta.feeAssignmentId,
      studentId: meta.studentId,
      amount: pi.amount,
      stripeResponse: pi as unknown as object,
      paidAt: new Date(),
    })

    logger.info(
      { event: "webhook.fulfilled", student: meta.studentRollNo, amount: pi.amount, pi: pi.id },
      `Payment fulfilled: student=${meta.studentRollNo} amount=PKR ${pi.amount} pi=${pi.id}`,
    )

    // Fetch student once for department name + cache revalidation
    let departmentName = ""
    try {
      const student = await this.studentRepo.findById(meta.tenantId, meta.studentId)
      departmentName = student?.department?.name ?? ""

      if (student?.user?.id) {
        void revalidateStudentFee(meta.tenantId, student.user.id)
      }
    } catch (err) {
      logger.error(
        { event: "webhook.student_lookup_failed", error: err },
        "Failed to look up student after fulfillment — department name will be empty",
      )
    }

    if (meta.tenantId) {
      // Broadcast real-time SSE event via Redis (fire-and-forget)
      void broadcastPayment(meta.tenantId, {
        type: "PaymentSuccess",
        payload: {
          studentName: meta.studentName,
          rollNumber: meta.studentRollNo,
          department: departmentName,
          program: meta.programName,
          semester: meta.semesterName,
          amount: pi.amount,
          paidAt: new Date().toISOString(),
        },
      })

      // Persist to ActivityLog so the VC feed has historical data on mount
      try {
        const activityMetadata: Prisma.InputJsonValue = {
          paymentId: payment.id,
          studentId: meta.studentId,
          rollNumber: meta.studentRollNo,
          amount: pi.amount,
          programName: meta.programName,
          departmentName,
        }
        await this.activityLogRepo.create({
          tenantId: meta.tenantId,
          type: "PAYMENT",
          message: `${meta.studentName} paid PKR ${pi.amount.toLocaleString()} — ${meta.semesterName}`,
          metadata: activityMetadata,
        })
      } catch (err) {
        logger.error(
          { event: "webhook.activity_log_failed", error: err },
          "Failed to write ActivityLog after payment fulfillment",
        )
      }
    }
  }

  private async handlePaymentFailed(pi: Stripe.PaymentIntent): Promise<void> {
    const payment = await this.paymentRepository.findPaymentByStripeIntentId(pi.id)
    if (!payment) return

    await this.paymentRepository.failPayment(payment.id)

    const failureReason = pi.last_payment_error?.message ?? "Unknown failure"
    logger.error(
      { event: "webhook.failed", pi: pi.id, reason: failureReason },
      `Payment failed: pi=${pi.id} reason=${failureReason}`,
    )
  }

  private async handlePaymentProcessing(pi: Stripe.PaymentIntent): Promise<void> {
    const payment = await this.paymentRepository.findPaymentByStripeIntentId(pi.id)
    if (!payment) return

    await this.paymentRepository.markPaymentProcessing(payment.id)
    logger.info({ event: "webhook.processing", pi: pi.id }, `Payment processing: pi=${pi.id}`)
  }
}
