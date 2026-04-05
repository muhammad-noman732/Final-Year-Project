import type { AuditRepository } from "@/lib/repositories/audit.repository"
import type { CreateAuditLogInput } from "@/types/server/auth.types"
import { logger } from "@/lib/logger"

export class AuditService {
  constructor(private readonly auditRepo: AuditRepository) { }

  log(input: CreateAuditLogInput): void {
    this.auditRepo.create(input).catch((error: unknown) => {
      logger.error({ err: error, action: input.action }, "Failed to create audit log")
    })
  }
}
