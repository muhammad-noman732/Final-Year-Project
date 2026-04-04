import prisma from "@/lib/prisma"
import { env } from "@/lib/env"

// Repositories
import { UserRepository } from "@/lib/repositories/user.repository"
import { AuditRepository } from "@/lib/repositories/audit.repository"
import { TenantRepository } from "@/lib/repositories/tenant.repository"

// Services
import { AuditService } from "@/lib/services/audit.service"
import { EmailService } from "@/lib/services/email.service"
import { AuthService } from "@/lib/services/auth.service"
import { TenantService } from "@/lib/services/tenant.service"

// Controllers
import { AuthController } from "@/lib/controllers/auth.controller"
import { SuperAdminController } from "@/lib/controllers/superadmin.controller"

// ─── Repositories ─────────────────────────────────────────────
const userRepo = new UserRepository(prisma)
const auditRepo = new AuditRepository(prisma)
const tenantRepo = new TenantRepository(prisma)

// ─── Services ─────────────────────────────────────────────────
const auditService = new AuditService(auditRepo)
export const emailService = new EmailService({
  apiKey: process.env.SENDGRID_API_KEY || "dummy",
  fromEmail: process.env.FROM_EMAIL || "noreply@gcuf.edu.pk",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
})
const authService = new AuthService(userRepo, auditService)
export const tenantService = new TenantService(tenantRepo, emailService, auditService)

// ─── Controllers ──────────────────────────────────────────────
export const authController = new AuthController(authService)
export const superAdminController = new SuperAdminController(tenantService)
