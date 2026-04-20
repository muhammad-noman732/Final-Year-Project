import { z } from "zod/v4"
import { paginationQuerySchema } from "./shared.validators"

export const createSessionSchema = z
  .object({
    name: z.string().min(4, "Session name required (e.g. 2024-2028)").max(20),
    startYear: z.number().int().min(2000).max(2100),
    endYear: z.number().int().min(2000).max(2100),
    isCurrent: z.boolean().optional().default(false),
  })
  .refine((d) => d.endYear > d.startYear, {
    message: "End year must be after start year",
    path: ["endYear"],
  })

export const setCurrentSessionSchema = z.object({
  isCurrent: z.literal(true),
})

export const listSessionsQuerySchema = paginationQuerySchema.extend({
  isCurrent: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional(),
  sortBy: z.enum(["startYear", "name", "createdAt"]).optional().default("startYear"),
  sortDir: z.enum(["asc", "desc"]).optional().default("desc"),
})

export type CreateSessionInput = z.infer<typeof createSessionSchema>
export type ListSessionsQuery = z.infer<typeof listSessionsQuerySchema>

export type CreateSessionPayload = z.infer<typeof createSessionSchema>
export type UpdateSessionPayload = z.infer<typeof setCurrentSessionSchema>
