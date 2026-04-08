import { z } from "zod/v4"
import { paginationQuerySchema } from "./shared.validators"

export const createProgramSchema = z.object({
  departmentId: z.string().min(1, "Department is required"),
  name: z.string().min(2, "Program name must be at least 2 characters").max(100),
  code: z
    .string()
    .min(2)
    .max(10)
    .regex(/^[A-Za-z0-9]+$/, "Code must be alphanumeric only"),
  degreeType: z.enum(["BS", "MS", "MCS", "PhD", "BE", "MBA", "BBA"], {
    error: "Degree type must be one of: BS, MS, MCS, PhD, BE, MBA, BBA",
  }),
  durationYears: z.number().int().min(1).max(6),
  totalSemesters: z.number().int().min(2).max(12),
})

export const updateProgramSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  degreeType: z.enum(["BS", "MS", "MCS", "PhD", "BE", "MBA", "BBA"]).optional(),
  durationYears: z.number().int().min(1).max(6).optional(),
  totalSemesters: z.number().int().min(2).max(12).optional(),
  isActive: z.boolean().optional(),
})

export const listProgramsQuerySchema = paginationQuerySchema.extend({
  search: z.string().max(100).optional(),
  departmentId: z.string().optional(),
  degreeType: z.enum(["BS", "MS", "MCS", "PhD", "BE", "MBA", "BBA"]).optional(),
  isActive: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional(),
  sortBy: z.enum(["name", "code", "createdAt"]).optional().default("name"),
  sortDir: z.enum(["asc", "desc"]).optional().default("asc"),
})

export type CreateProgramInput = z.infer<typeof createProgramSchema>
export type UpdateProgramInput = z.infer<typeof updateProgramSchema>
export type ListProgramsQuery = z.infer<typeof listProgramsQuerySchema>
