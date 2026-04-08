import type { PrismaClient } from "@/app/generated/prisma/client"
import type { CreateTenantData } from "@/types/server/tenant.types"

export class TenantRepository {
  constructor(private readonly db: PrismaClient) { }

  async findAll() {
    return this.db.tenant.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { users: true, students: true },
        },
      },
    })
  }

  async findBySlug(slug: string) {
    return this.db.tenant.findUnique({
      where: { slug },
    })
  }

  async findById(id: string) {
    return this.db.tenant.findUnique({
      where: { id },
    })
  }

  async createWithAdmin(tenantData: CreateTenantData, adminEmail: string, adminName: string, adminPasswordHash: string) {
    // We must use a heavily nested Prisma create or an interactive transaction
    // to ensure BOTH the tenant and its initial admin are created together.
    return this.db.tenant.create({
      data: {
        name: tenantData.name,
        shortName: tenantData.shortName,
        slug: tenantData.slug,
        domain: tenantData.domain || null,
        users: {
          create: {
            email: adminEmail,
            name: adminName,
            role: "ADMIN",
            passwordHash: adminPasswordHash,
            isFirstLogin: true,
            isActive: true,
          },
        },
      },
      include: {
        users: true,
      },
    })
  }
}
