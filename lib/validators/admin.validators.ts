/**
 * admin.validators.ts
 *
 * User, Student, and Fee Structure validators.
 * Department/Program/Session validators have been split into their own files:
 *   - department.validators.ts
 *   - program.validators.ts
 *   - session.validators.ts
 */

import { z } from "zod/v4"
import { paginationQuerySchema } from "./shared.validators"

// Re-export for backward compat
export { paginationQuerySchema }
export type { PaginationQuery } from "./shared.validators"

// ─── User creation (VC or HOD — STUDENT goes through /admin/students) ──

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").toLowerCase(),
  phone: z
    .string()
    .regex(/^[0-9+\-\s()]{7,20}$/, "Invalid phone number")
    .optional(),
  role: z.enum(["VC", "HOD"], {
    error: "Role must be VC or HOD. Students are created through /admin/students",
  }),
  hodDepartmentId: z.string().optional(),
}).refine(
  (d) => d.role !== "HOD" || !!d.hodDepartmentId,
  {
    message: "HOD must be assigned to a department",
    path: ["hodDepartmentId"],
  }
)

export const updateUserSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  phone: z
    .string()
    .regex(/^[0-9+\-\s()]{7,20}$/)
    .optional(),
  isActive: z.boolean().optional(),
  hodDepartmentId: z.string().optional(),
})

export const listUsersQuerySchema = paginationQuerySchema.extend({
  role: z.enum(["VC", "HOD"]).optional(),
  isActive: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>

// ─── Student ───────────────────────────────────────────────────

export const createStudentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").toLowerCase(),
  phone: z
    .string()
    .regex(/^[0-9+\-\s()]{7,20}$/, "Invalid phone number")
    .optional(),
  cnic: z
    .string()
    .regex(/^\d{5}-\d{7}-\d$/, "CNIC format must be 12345-1234567-1")
    .optional(),
  studentId: z.string().min(3, "Student roll number is required").max(30),
  sessionId: z.string().min(1, "Academic session is required"),
  departmentId: z.string().min(1, "Department is required"),
  programId: z.string().min(1, "Program is required"),
  currentSemester: z.number().int().min(1).max(12),
})

export const updateStudentSchema = z.object({
  currentSemester: z.number().int().min(1).max(12).optional(),
  enrollmentStatus: z
    .enum(["ACTIVE", "SUSPENDED", "GRADUATED", "WITHDRAWN"])
    .optional(),
  cnic: z
    .string()
    .regex(/^\d{5}-\d{7}-\d$/)
    .optional(),
  phone: z
    .string()
    .regex(/^[0-9+\-\s()]{7,20}$/)
    .optional(),
})

export const listStudentsQuerySchema = paginationQuerySchema.extend({
  departmentId: z.string().optional(),
  programId: z.string().optional(),
  sessionId: z.string().optional(),
  semester: z.coerce.number().int().min(1).max(12).optional(),
  enrollmentStatus: z
    .enum(["ACTIVE", "SUSPENDED", "GRADUATED", "WITHDRAWN"])
    .optional(),
  feeStatus: z.enum(["UNPAID", "PARTIAL", "PAID", "OVERDUE", "WAIVED"]).optional(),
})

export type CreateStudentInput = z.infer<typeof createStudentSchema>
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>
export type ListStudentsQuery = z.infer<typeof listStudentsQuerySchema>

// ─── Fee Structure ─────────────────────────────────────────────

export const createFeeStructureSchema = z
  .object({
    programId: z.string().min(1, "Program is required"),
    semester: z.number().int().min(1).max(12),
    sessionYear: z.number().int().min(2000).max(2100),
    tuitionFee: z.number().int().min(0),
    labFee: z.number().int().min(0).default(0),
    libraryFee: z.number().int().min(0).default(0),
    sportsFee: z.number().int().min(0).default(0),
    registrationFee: z.number().int().min(0).default(0),
    examinationFee: z.number().int().min(0).default(0),
    otherFee: z.number().int().min(0).default(0),
    totalFee: z.number().int().min(1),
    dueDate: z.string().datetime({ message: "dueDate must be a valid ISO datetime" }),
    lateFee: z.number().int().min(0).default(0),
  })
  .refine(
    (d) => {
      const computed =
        d.tuitionFee +
        d.labFee +
        d.libraryFee +
        d.sportsFee +
        d.registrationFee +
        d.examinationFee +
        d.otherFee
      return computed === d.totalFee
    },
    {
      message: "totalFee must equal the sum of all individual fee components",
      path: ["totalFee"],
    }
  )

export const updateFeeStructureSchema = z
  .object({
    tuitionFee: z.number().int().min(0).optional(),
    labFee: z.number().int().min(0).optional(),
    libraryFee: z.number().int().min(0).optional(),
    sportsFee: z.number().int().min(0).optional(),
    registrationFee: z.number().int().min(0).optional(),
    examinationFee: z.number().int().min(0).optional(),
    otherFee: z.number().int().min(0).optional(),
    totalFee: z.number().int().min(0).optional(),
    dueDate: z.string().datetime().optional(),
    lateFee: z.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
  })

export const listFeeStructuresQuerySchema = paginationQuerySchema.extend({
  programId: z.string().optional(),
  semester: z.coerce.number().int().min(1).max(12).optional(),
  sessionYear: z.coerce.number().int().min(2000).optional(),
  isActive: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional(),
})

export type CreateFeeStructureInput = z.infer<typeof createFeeStructureSchema>
export type UpdateFeeStructureInput = z.infer<typeof updateFeeStructureSchema>
export type ListFeeStructuresQuery = z.infer<typeof listFeeStructuresQuerySchema>
