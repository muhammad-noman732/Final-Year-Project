import { z } from "zod/v4"

export const csvRowSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  program: z.string().min(1, "Program is required"),
  department: z.string().min(1, "Department is required"),
  session: z.string().min(1, "Session is required"),
  matricPercent: z.coerce.number().min(0).max(100),
  fscPercent: z.coerce.number().min(0).max(100),
  gender: z.string().optional(),
  city: z.string().optional(),
})

export type CsvRowInput = z.infer<typeof csvRowSchema>
