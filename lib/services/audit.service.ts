// ═══════════════════════════════════════════════════════════════
//  AuditService — Fire-and-forget audit logging
//  Rule: Audit logging NEVER crashes the main business operation.
// ═══════════════════════════════════════════════════════════════

import type { AuditRepository } from "@/lib/repositories/audit.repository"
import type { CreateAuditLogInput } from "@/types/server/auth.types"
import { logger } from "@/lib/logger"

export class AuditService {
  constructor(private readonly auditRepo: AuditRepository) {}

  /** Log an audit event. Swallows all errors. */
  log(input: CreateAuditLogInput): void {
    this.auditRepo.create(input).catch((error) => {
      logger.error({ err: error, action: input.action }, "Failed to create audit log")
    })
  }
}
