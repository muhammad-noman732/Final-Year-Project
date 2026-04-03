// ═══════════════════════════════════════════════════════════════
//  Dependency Injection Container (DI)
//  Wires up all repositories, services, and controllers.
//  API routes import instances from here.
// ═══════════════════════════════════════════════════════════════

import prisma from "@/lib/prisma"
import { env } from "@/lib/env"

// Repositories
import { UserRepository } from "@/lib/repositories/user.repository"
import { AuditRepository } from "@/lib/repositories/audit.repository"

// Services
import { AuditService } from "@/lib/services/audit.service"
import { EmailService } from "@/lib/services/email.service"
import { AuthService } from "@/lib/services/auth.service"

// Controllers
import { AuthController } from "@/lib/controllers/auth.controller"

// ─── Repositories ─────────────────────────────────────────────
const userRepo = new UserRepository(prisma)
const auditRepo = new AuditRepository(prisma)

// ─── Services ─────────────────────────────────────────────────
const auditService = new AuditService(auditRepo)
export const emailService = new EmailService({
  apiKey: env.SENDGRID_API_KEY,
  fromEmail: env.FROM_EMAIL,
  appUrl: env.NEXT_PUBLIC_APP_URL,
})
const authService = new AuthService(userRepo, auditService)

// ─── Controllers ──────────────────────────────────────────────
export const authController = new AuthController(authService)
