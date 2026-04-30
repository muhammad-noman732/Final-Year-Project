import { z } from "zod/v4"
import { paginationQuerySchema } from "@/lib/validators/shared.validators"

const hodFeeStatusSchema = z.enum(["ALL", "PAID", "UNPAID", "OVERDUE"])

export const hodFiltersSchema = z.object({
  semester: z.coerce.number().int().min(1).max(12).optional(),
  feeStatus: hodFeeStatusSchema.optional().default("ALL"),
  search: z.string().trim().min(1).max(120).optional(),
})

export const hodDashboardQuerySchema = hodFiltersSchema
export const hodStudentsQuerySchema = paginationQuerySchema.extend(hodFiltersSchema.shape)

export type HODFiltersInput = z.infer<typeof hodFiltersSchema>
export type HODStudentsQuery = z.infer<typeof hodStudentsQuerySchema>
