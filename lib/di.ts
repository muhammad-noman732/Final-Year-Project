import prisma from "@/lib/prisma"
import { env } from "@/lib/env"

// Repositories
import { UserRepository } from "@/lib/repositories/user.repository"
import { AuditRepository } from "@/lib/repositories/audit.repository"
import { TenantRepository } from "@/lib/repositories/tenant.repository"
import { DepartmentRepository } from "@/lib/repositories/department.repository"
import { ProgramRepository } from "@/lib/repositories/program.repository"
import { AcademicSessionRepository } from "@/lib/repositories/academicSession.repository"

// Services
import { AuditService } from "@/lib/services/audit.service"
import { EmailService } from "@/lib/services/email.service"
import { AuthService } from "@/lib/services/auth.service"
import { TenantService } from "@/lib/services/tenant.service"
import { DepartmentService } from "@/lib/services/department.service"
import { ProgramService } from "@/lib/services/program.service"
import { AcademicSessionService } from "@/lib/services/academicSession.service"

// Controllers
import { AuthController } from "@/lib/controllers/auth.controller"
import { SuperAdminController } from "@/lib/controllers/superadmin.controller"
import { DepartmentController } from "@/lib/controllers/department.controller"
import { ProgramController } from "@/lib/controllers/program.controller"
import { AcademicSessionController } from "@/lib/controllers/academicSession.controller"

// ─── Repositories ─────────────────────────────────────────────
const userRepo = new UserRepository(prisma)
const auditRepo = new AuditRepository(prisma)
const tenantRepo = new TenantRepository(prisma)
const deptRepo = new DepartmentRepository(prisma)
const programRepo = new ProgramRepository(prisma)
const sessionRepo = new AcademicSessionRepository(prisma)

// ─── Services ─────────────────────────────────────────────────
const auditService = new AuditService(auditRepo)
export const emailService = new EmailService()
const authService = new AuthService(userRepo, auditService)
export const tenantService = new TenantService(tenantRepo, emailService, auditService)
const deptService = new DepartmentService(deptRepo, auditService)
const programService = new ProgramService(programRepo, deptRepo, auditService)
const sessionService = new AcademicSessionService(sessionRepo, auditService)

// ─── Controllers ──────────────────────────────────────────────
export const authController = new AuthController(authService)
export const superAdminController = new SuperAdminController(tenantService)
export const departmentController = new DepartmentController(deptService)
export const programController = new ProgramController(programService)
export const sessionController = new AcademicSessionController(sessionService)
