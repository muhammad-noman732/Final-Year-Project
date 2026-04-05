import bcrypt from "bcryptjs"
import crypto from "crypto"
import { AppError, ValidationError } from "@/lib/errors"
import { logger } from "@/lib/logger"
import type { TenantRepository } from "@/lib/repositories/tenant.repository"
import type { EmailService } from "@/lib/services/email.service"
import type { AuditService } from "@/lib/services/audit.service"
import type { OnboardTenantInput, CreateTenantData } from "@/types/server/tenant.types"

export class TenantService {
  constructor(
    private readonly tenantRepo: TenantRepository,
    private readonly emailService: EmailService,
    private readonly auditService: AuditService,
  ) { }

  async getAllTenants() {
    return this.tenantRepo.findAll()
  }

  async onboardNewUniversity(input: OnboardTenantInput, superAdminId: string) {
    const slug = input.shortName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")

    const existing = await this.tenantRepo.findBySlug(slug)
    if (existing) {
      throw new ValidationError("A university with this short name already exists.", { shortName: ["Already exists"] })
    }

    const tempPassword = crypto.randomBytes(8).toString("hex") + "X1!"
    const passwordHash = await bcrypt.hash(tempPassword, 12)

    const tenantData: CreateTenantData = {
      name: input.universityName,
      shortName: input.shortName,
      slug,
      domain: input.domain,
    }

    const adminEmailNormalized = input.adminEmail.toLowerCase().trim()

    const tenant = await this.tenantRepo.createWithAdmin(
      tenantData,
      adminEmailNormalized,
      input.adminName,
      passwordHash
    )

    const adminUser = tenant.users[0]

    this.emailService.sendWelcomeEmail({
      to: adminUser.email,
      name: adminUser.name,
      role: "ADMIN",
      tempPassword: tempPassword,
      universityName: tenant.name,
    }).catch(err => {
      logger.error({ err, tenantId: tenant.id }, "Failed to send welcome email to new admin")
    })

    //  Audit Log
    this.auditService.log({
      userId: superAdminId,
      userRole: "SUPER_ADMIN",
      action: "tenant.created",
      entity: "Tenant",
      entityId: tenant.id,
      newData: { name: tenant.name, adminEmail: adminUser.email },
    })

    logger.info({ tenantId: tenant.id, slug: tenant.slug }, "New university onboarded successfully")

    return {
      tenantId: tenant.id,
      slug: tenant.slug,
      adminEmail: adminUser.email,
    }
  }
}
