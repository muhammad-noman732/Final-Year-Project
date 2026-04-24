import prisma from "@/lib/prisma"

// Repositories
import { UserRepository } from "@/lib/repositories/user.repository"
import { AuditRepository } from "@/lib/repositories/audit.repository"
import { TenantRepository } from "@/lib/repositories/tenant.repository"
import { DepartmentRepository } from "@/lib/repositories/department.repository"
import { ProgramRepository } from "@/lib/repositories/program.repository"
import { AcademicSessionRepository } from "@/lib/repositories/academicSession.repository"
import { StudentRepository } from "@/lib/repositories/student.repository"
import { FeeStructureRepository } from "@/lib/repositories/feeStructure.repository"
import { FeeAssignmentRepository } from "@/lib/repositories/feeAssignment.repository"
import { PaymentRepository } from "@/lib/repositories/payment.repository"
import { WebhookRepository } from "@/lib/repositories/webhook.repository"
import { VCRepository } from "@/lib/repositories/vc.repository"
import { ActivityLogRepository } from "@/lib/repositories/activityLog.repository"

// Services
import { AuditService } from "@/lib/services/audit.service"
import { EmailService } from "@/lib/services/email.service"
import { AuthService } from "@/lib/services/auth.service"
import { TenantService } from "@/lib/services/tenant.service"
import { DepartmentService } from "@/lib/services/department.service"
import { ProgramService } from "@/lib/services/program.service"
import { AcademicSessionService } from "@/lib/services/academicSession.service"
import { UserService } from "@/lib/services/user.service"
import { StudentService } from "@/lib/services/student.service"
import { FeeStructureService } from "@/lib/services/feeStructure.service"
import { StudentFeeService } from "@/lib/services/studentFee.service"
import { FeeAssignmentService } from "@/lib/services/feeAssignment.service"
import { PaymentService } from "@/lib/services/payment.service"
import { WebhookService } from "@/lib/services/webhook.service"
import { VCService } from "@/lib/services/vc.service"

// Controllers
import { AuthController } from "@/lib/controllers/auth.controller"
import { SuperAdminController } from "@/lib/controllers/superadmin.controller"
import { DepartmentController } from "@/lib/controllers/department.controller"
import { ProgramController } from "@/lib/controllers/program.controller"
import { AcademicSessionController } from "@/lib/controllers/academicSession.controller"
import { UserController } from "@/lib/controllers/user.controller"
import { StudentController } from "@/lib/controllers/student.controller"
import { FeeStructureController } from "@/lib/controllers/feeStructure.controller"
import { StudentFeeController } from "@/lib/controllers/studentFee.controller"
import { FeeAssignmentController } from "@/lib/controllers/feeAssignment.controller"
import { PaymentController } from "@/lib/controllers/payment.controller"
import { WebhookController } from "@/lib/controllers/webhook.controller"
import { VCController } from "@/lib/controllers/vc.controller"

// Repositories 
const userRepo = new UserRepository(prisma)
const auditRepo = new AuditRepository(prisma)
const tenantRepo = new TenantRepository(prisma)
const deptRepo = new DepartmentRepository(prisma)
const programRepo = new ProgramRepository(prisma)
const sessionRepo = new AcademicSessionRepository(prisma)
const studentRepo = new StudentRepository(prisma)
const feeStructureRepo = new FeeStructureRepository(prisma)
const feeAssignmentRepo = new FeeAssignmentRepository(prisma)
const paymentRepo = new PaymentRepository(prisma)
const webhookRepo = new WebhookRepository(prisma)
const vcRepo = new VCRepository(prisma)
const activityLogRepo = new ActivityLogRepository(prisma)

// Services
const auditService = new AuditService(auditRepo)
export const emailService = new EmailService()
const authService = new AuthService(userRepo, auditService)
export const tenantService = new TenantService(tenantRepo, emailService, auditService)
const deptService = new DepartmentService(deptRepo, auditService)
const programService = new ProgramService(programRepo, deptRepo, auditService)
const sessionService = new AcademicSessionService(sessionRepo, auditService)
const userService = new UserService(userRepo, deptRepo, tenantRepo, emailService, auditService)
const studentService = new StudentService(studentRepo, deptRepo, programRepo, sessionRepo, tenantRepo, emailService, auditService)
const studentFeeService = new StudentFeeService(studentRepo, feeAssignmentRepo)
const feeAssignmentService = new FeeAssignmentService(studentRepo, feeStructureRepo, feeAssignmentRepo, auditService)
const feeStructureService = new FeeStructureService(feeStructureRepo, programRepo, auditService, feeAssignmentService, feeAssignmentRepo, studentRepo)
const paymentService = new PaymentService(paymentRepo, studentRepo)
const webhookService = new WebhookService(paymentRepo, webhookRepo, studentRepo, activityLogRepo)
const vcService = new VCService(vcRepo)

// Controllers
export const authController = new AuthController(authService)
export const superAdminController = new SuperAdminController(tenantService)
export const departmentController = new DepartmentController(deptService)
export const programController = new ProgramController(programService)
export const sessionController = new AcademicSessionController(sessionService)
export const userController = new UserController(userService)
export const studentController = new StudentController(studentService)
export const feeStructureController = new FeeStructureController(feeStructureService)
export const studentFeeController = new StudentFeeController(studentFeeService)
export const feeAssignmentController = new FeeAssignmentController(feeAssignmentService)
export const paymentController = new PaymentController(paymentService)
export const webhookController = new WebhookController(webhookService)
export const vcController = new VCController(vcService)




















































