import { z } from "zod/v4"
import { paginationQuerySchema } from "@/lib/validators/shared.validators"

const feeStatusSchema = z.enum(["ALL", "PAID", "UNPAID", "PARTIAL", "OVERDUE", "WAIVED"])
const rangeSchema = z.enum(["today", "7d", "30d", "90d", "custom"])

export const vcFiltersSchema = z.object({
  departmentId: z.string().optional(),
  programId: z.string().optional(),
  sessionId: z.string().optional(),
  semester: z.coerce.number().int().min(1).max(12).optional(),
  feeStatus: feeStatusSchema.optional().default("ALL"),
  range: rangeSchema.optional().default("30d"),
  from: z.string().date().optional(),
  to: z.string().date().optional(),
  search: z.string().trim().min(1).max(120).optional(),
}).superRefine((value, ctx) => {
  if (value.range === "custom" && (!value.from || !value.to)) {
    ctx.addIssue({
      code: "custom",
      message: "Custom range requires both from and to dates.",
      path: ["range"],
    })
  }
})

export const vcDashboardQuerySchema = vcFiltersSchema

export const vcStudentsQuerySchema = paginationQuerySchema.extend(vcFiltersSchema.shape)

export type VCFiltersInput = z.infer<typeof vcFiltersSchema>
export type VCDashboardQuery = z.infer<typeof vcDashboardQuerySchema>
export type VCStudentsQuery = z.infer<typeof vcStudentsQuerySchema>
