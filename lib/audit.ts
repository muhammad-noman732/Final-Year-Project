import prisma from "@/lib/prisma"
import { logger } from "@/lib/logger"

interface AuditLogInput {
  tenantId?: string | null
  userId?: string | null
  userEmail?: string | null
  userRole?: string | null
  action: string        
  entity: string        
  entityId: string      
  oldData?: unknown      
  newData?: unknown      
  ipAddress?: string | null
  reason?: string | null 
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
