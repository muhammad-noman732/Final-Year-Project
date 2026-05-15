
import * as process from 'node:process'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
globalThis['__dirname'] = path.dirname(fileURLToPath(import.meta.url))

import * as runtime from "@prisma/client/runtime/client"
import * as $Enums from "./enums"
import * as $Class from "./internal/class"
import * as Prisma from "./internal/prismaNamespace"

export * as $Enums from './enums'
export * from "./enums"
export const PrismaClient = $Class.getPrismaClientClass()
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>
export { Prisma }

export type Tenant = Prisma.TenantModel
export type User = Prisma.UserModel
export type RefreshToken = Prisma.RefreshTokenModel
export type PasswordResetToken = Prisma.PasswordResetTokenModel
export type AcademicSession = Prisma.AcademicSessionModel
export type Department = Prisma.DepartmentModel
export type Program = Prisma.ProgramModel
export type Student = Prisma.StudentModel
export type FeeStructure = Prisma.FeeStructureModel
export type FeeAssignment = Prisma.FeeAssignmentModel
export type Payment = Prisma.PaymentModel
export type WebhookEvent = Prisma.WebhookEventModel
export type EmailLog = Prisma.EmailLogModel
export type Notification = Prisma.NotificationModel
export type AuditLog = Prisma.AuditLogModel
export type Subscription = Prisma.SubscriptionModel
export type ActivityLog = Prisma.ActivityLogModel
export type Insight = Prisma.InsightModel
export type Applicant = Prisma.ApplicantModel
export type ImportBatch = Prisma.ImportBatchModel
