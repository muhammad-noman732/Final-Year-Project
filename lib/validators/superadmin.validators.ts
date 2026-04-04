import { z } from "zod/v4"

// ─── Super Admin Validators ───────────────────────────────────────────────

export const onboardTenantSchema = z.object({
  universityName: z.string().min(3, "University name must be at least 3 characters"),
  shortName: z.string().min(2, "Short name is required (e.g. GCUF)"),
  domain: z.string().optional(),
  adminName: z.string().min(2, "Admin name is required"),
  adminEmail: z.string().email("Invalid admin email"),
})

export type OnboardTenantFormInput = z.infer<typeof onboardTenantSchema>
