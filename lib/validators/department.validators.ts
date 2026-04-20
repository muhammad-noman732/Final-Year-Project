import { z } from "zod/v4"
import { paginationQuerySchema } from "./shared.validators"

//  Create 
export const createDepartmentSchema = z.object({
  name: z.string().min(3, "Department name must be at least 3 characters").max(100),
  code: z
    .string()
    .min(3, "Code must be at least 3 characters")
    .max(10)
    .regex(/^[A-Za-z0-9]+$/, "Code must be alphanumeric only"),
})

//  Update 
export const updateDepartmentSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  isActive: z.boolean().optional(),
})
//  List Query 
export const listDepartmentsQuerySchema = paginationQuerySchema.extend({
  search: z.string().max(100).optional(),
  isActive: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional(),
  sortBy: z.enum(["name", "code", "createdAt"]).optional().default("name"),
  sortDir: z.enum(["asc", "desc"]).optional().default("asc"),
})

//  Inferred types 
export type CreateDepartmentInput = z.infer<typeof createDepartmentSchema>
export type UpdateDepartmentInput = z.infer<typeof updateDepartmentSchema>
export type ListDepartmentsQuery = z.infer<typeof listDepartmentsQuerySchema>

export type CreateDepartmentPayload = z.infer<typeof createDepartmentSchema>
export type UpdateDepartmentPayload = z.infer<typeof updateDepartmentSchema>
