import { z } from "zod/v4"

export const createPaymentIntentSchema = z.object({
  feeAssignmentId: z.string().cuid("Invalid fee assignment ID"),
})

export type CreatePaymentIntentPayload = z.infer<typeof createPaymentIntentSchema>
