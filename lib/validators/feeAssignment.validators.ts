import { z } from "zod"

export const assignFeeSchema = z.object({
  studentIds: z.array(z.string().cuid()).optional(),
})

export type AssignFeeBody = z.infer<typeof assignFeeSchema>

export const assignFeeInputSchema = z.object({
  feeStructureId: z.string().cuid(),
  studentIds: z.array(z.string().cuid()).optional(),
})

export type AssignFeeInput = z.infer<typeof assignFeeInputSchema>

export type AssignFeePayload = z.infer<typeof assignFeeSchema> & { feeStructureId: string }
