// ═══════════════════════════════════════════════════════════════
//  Audit Log Helper
//  Rule: Every important action creates an AuditLog record.
//  This is append-only — records are NEVER updated or deleted.
// ═══════════════════════════════════════════════════════════════

import prisma from "@/lib/prisma"
import { logger } from "@/lib/logger"

interface AuditLogInput {
  tenantId?: string | null
  userId?: string | null
  userEmail?: string | null
  userRole?: string | null
  action: string        // e.g. "user.login", "password.changed", "tenant.created"
  entity: string        // e.g. "User", "Tenant", "Payment"
  entityId: string      // the ID of the record affected
  oldData?: unknown      // state BEFORE the change (null on CREATE)
  newData?: unknown      // state AFTER the change (null on DELETE)
  ipAddress?: string | null
  reason?: string | null // optional admin note for the action
}

export async function createAuditLog(input: AuditLogInput): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        tenantId: input.tenantId ?? undefined,
        userId: input.userId ?? undefined,
        userEmail: input.userEmail ?? undefined,
        userRole: input.userRole ?? undefined,
        action: input.action,
        entity: input.entity,
        entityId: input.entityId,
        oldData: input.oldData ? JSON.parse(JSON.stringify(input.oldData)) : undefined,
        newData: input.newData ? JSON.parse(JSON.stringify(input.newData)) : undefined,
        ipAddress: input.ipAddress ?? undefined,
        reason: input.reason ?? undefined,
      },
    })
  } catch (error) {
    // Audit logging should NEVER crash the main operation.
    // Log the error and move on.
    logger.error(
      {
        event: "audit.log.create_failed",
        err: error,
        action: input.action,
        tenantId: input.tenantId,
        entity: input.entity,
        entityId: input.entityId,
      },
      "Failed to create audit log"
    )
  }
}
