import Stripe from "stripe"
import { stripe } from "@/lib/stripe/stripe.server"
import type { PaymentRepository } from "@/lib/repositories/payment.repository"
import type { WebhookRepository } from "@/lib/repositories/webhook.repository"
import {
  InvalidWebhookSignatureError,
  PaymentAmountMismatchError,
} from "@/lib/utils/paymentError"
import type { StripePaymentMetadata } from "@/types/server/payment.types"
import { logger } from "@/lib/logger"

export class WebhookService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly webhookRepository: WebhookRepository
  ) {}

  /**
   * Entry point for all incoming Stripe webhook events.
   */
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

    if (existing?.processed) {
      return
    }

    const tenantId =
      (
        event.data.object as {
          metadata?: { tenantId?: string }
        }
      )?.metadata?.tenantId ?? null

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
          await this.handlePaymentSucceeded(
            event.data.object as Stripe.PaymentIntent,
          )
          break

        case "payment_intent.payment_failed":
          await this.handlePaymentFailed(
            event.data.object as Stripe.PaymentIntent,
          )
          break

        case "payment_intent.processing":
          await this.handlePaymentProcessing(
            event.data.object as Stripe.PaymentIntent,
          )
          break

        case "charge.refunded":
          break

        default:
          logger.info({ event: "webhook.unhandled_type", type: event.type }, `Unhandled event type: ${event.type}`)
      }

      await this.webhookRepository.markWebhookProcessed(event.id)
    } catch (handlerError) {
      const reason =
        handlerError instanceof Error
          ? handlerError.message
          : "Unknown handler error"

      await this.webhookRepository.markWebhookFailed(event.id, reason)
      throw handlerError
    }
  }

  private async handlePaymentSucceeded(
    pi: Stripe.PaymentIntent,
  ): Promise<void> {
    const meta = pi.metadata as unknown as StripePaymentMetadata

    if (!meta.feeAssignmentId || !meta.studentId) {
      throw new Error(
        `payment_intent.succeeded: missing metadata on PI ${pi.id}`,
      )
    }

    const payment =
      await this.paymentRepository.findPaymentByStripeIntentId(pi.id)

    if (!payment) {
      throw new Error(
        `payment_intent.succeeded: no Payment record found for PI ${pi.id}.`,
      )
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
      `Payment fulfilled: student=${meta.studentRollNo} amount=PKR ${pi.amount} pi=${pi.id}`
    )
  }

  private async handlePaymentFailed(pi: Stripe.PaymentIntent): Promise<void> {
    const payment =
      await this.paymentRepository.findPaymentByStripeIntentId(pi.id)
    if (!payment) return

    await this.paymentRepository.failPayment(payment.id)

    const failureReason = pi.last_payment_error?.message ?? "Unknown failure"
    logger.error(
      { event: "webhook.failed", pi: pi.id, reason: failureReason },
      `Payment failed: pi=${pi.id} reason=${failureReason}`
    )
  }

  private async handlePaymentProcessing(
    pi: Stripe.PaymentIntent,
  ): Promise<void> {
    const payment =
      await this.paymentRepository.findPaymentByStripeIntentId(pi.id)
    if (!payment) return

    await this.paymentRepository.markPaymentProcessing(payment.id)
    logger.info({ event: "webhook.processing", pi: pi.id }, `Payment processing: pi=${pi.id}`)
  }
}
