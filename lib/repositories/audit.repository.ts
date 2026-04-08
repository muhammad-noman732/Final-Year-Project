import type { PrismaClient } from "@/app/generated/prisma/client"
import type { CreateAuditLogInput } from "@/types/server/auth.types"

export class AuditRepository {
  constructor(private readonly db: PrismaClient) { }

  async create(input: CreateAuditLogInput): Promise<void> {
    await this.db.auditLog.create({
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
  }
}
