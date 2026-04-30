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
import { HODRepository } from "@/lib/repositories/hod.repository"
import { ActivityLogRepository } from "@/lib/repositories/activityLog.repository"
import { InsightRepository } from "@/lib/repositories/insight.repository"
import { NotificationRepository } from "@/lib/repositories/notification.repository"
import { ApplicantRepository } from "@/lib/repositories/applicant.repository"
import { ImportBatchRepository } from "@/lib/repositories/importBatch.repository"

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
import { HODService } from "@/lib/services/hod.service"
import { NotificationService } from "@/lib/services/notification.service"
import { RegistrationService } from "@/lib/services/registration.service"

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
import { HODController } from "@/lib/controllers/hod.controller"
import { CronController } from "@/lib/controllers/cron.controller"
import { NotificationController } from "@/lib/controllers/notification.controller"
import { RegistrationController } from "@/lib/controllers/registration.controller"

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
const hodRepo = new HODRepository(prisma)
const activityLogRepo = new ActivityLogRepository(prisma)
const insightRepo = new InsightRepository(prisma)
const notificationRepo = new NotificationRepository(prisma)
const applicantRepo = new ApplicantRepository(prisma)
const importBatchRepo = new ImportBatchRepository(prisma)

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
const notificationService = new NotificationService(notificationRepo)
const feeAssignmentService = new FeeAssignmentService(studentRepo, feeStructureRepo, feeAssignmentRepo, auditService, notificationService)
const feeStructureService = new FeeStructureService(feeStructureRepo, programRepo, auditService, feeAssignmentService, feeAssignmentRepo, studentRepo)
const paymentService = new PaymentService(paymentRepo, studentRepo)
const webhookService = new WebhookService(paymentRepo, webhookRepo, studentRepo, activityLogRepo, notificationService, userRepo)
export const vcService = new VCService(vcRepo, insightRepo)
export const hodService = new HODService(hodRepo)
const registrationService = new RegistrationService(applicantRepo, importBatchRepo, activityLogRepo, insightRepo, sessionRepo)

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
export const hodController = new HODController(hodService)
export const cronController = new CronController(tenantService, vcService, registrationService)
export const notificationController = new NotificationController(notificationService)
export const registrationController = new RegistrationController(registrationService)
