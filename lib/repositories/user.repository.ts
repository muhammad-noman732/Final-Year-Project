import type { Prisma, PrismaClient, Role } from "@/app/generated/prisma/client"
import type { UserWithTenant, UserBasic } from "@/types/server/auth.types"

//Admin select shape (never includes passwordHash) 
const ADMIN_USER_SELECT = {
  id: true,
  name: true,
  email: true,
  phone: true,
  role: true,
  isActive: true,
  isFirstLogin: true,
  hodDepartmentId: true,
  createdAt: true,
  updatedAt: true,
  hodDepartment: {
    select: { id: true, name: true, code: true },
  },
} satisfies Prisma.UserSelect

export type AdminUserRow = Prisma.UserGetPayload<{ select: typeof ADMIN_USER_SELECT }>

export class UserRepository {
  constructor(private readonly db: PrismaClient) { }

  //  Auth methods (used by AuthService) 


  async findByEmail(email: string): Promise<UserWithTenant | null> {
    const user = await this.db.user.findUnique({
      where: { email },
      include: {
        tenant: {
          select: { id: true, slug: true, name: true, isActive: true },
        },
      },
    })
    return user as UserWithTenant | null
  }

  async findById(userId: string): Promise<UserBasic | null> {
    const user = await this.db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        passwordHash: true,
        role: true,
        tenantId: true,
        name: true,
        email: true,
      },
    })
    return user as UserBasic | null
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.db.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    })
  }

  async updatePassword(userId: string, passwordHash: string): Promise<void> {
    await this.db.user.update({
      where: { id: userId },
      data: { passwordHash, isFirstLogin: false },
    })
  }

  // ─── Admin management methods ──────────────────────────────────

  /**
   * Checks the @@unique([tenantId, email]) constraint.
   * Returns the user id if a conflict exists, null otherwise.
   */
  async adminFindByEmail(
    tenantId: string,
    email: string,
  ): Promise<{ id: string } | null> {
    return this.db.user.findFirst({
      where: { tenantId, email },
      select: { id: true },
    })
  }

  async adminFindById(
    tenantId: string,
    id: string,
  ): Promise<AdminUserRow | null> {
    return this.db.user.findFirst({
      where: { id, tenantId },
      select: ADMIN_USER_SELECT,
    })
  }

  async adminFindMany(params: {
    where: Prisma.UserWhereInput
    orderBy: Prisma.UserOrderByWithRelationInput[]
    skip: number
    take: number
  }): Promise<{ data: AdminUserRow[]; total: number }> {
    const [total, data] = await this.db.$transaction([
      this.db.user.count({ where: params.where }),
      this.db.user.findMany({
        where: params.where,
        select: ADMIN_USER_SELECT,
        orderBy: params.orderBy,
        skip: params.skip,
        take: params.take,
      }),
    ])
    return { data, total }
  }

  /** Never pass passwordHash through this return type — it is excluded by select. */
  async adminCreate(
    data: Prisma.UserUncheckedCreateInput,
  ): Promise<AdminUserRow> {
    return this.db.user.create({ data, select: ADMIN_USER_SELECT })
  }

  async adminUpdate(
    tenantId: string,
    id: string,
    data: Prisma.UserUncheckedUpdateInput,
  ): Promise<AdminUserRow> {
    return this.db.user.update({
      where: { id, tenantId },
      data,
      select: ADMIN_USER_SELECT,
    })
  }

  /** Returns user IDs for all active users with the given roles in a tenant. */
  async findIdsByRole(tenantId: string, roles: Role[]): Promise<string[]> {
    const users = await this.db.user.findMany({
      where: { tenantId, role: { in: roles }, isActive: true },
      select: { id: true },
    })
    return users.map((u) => u.id)
  }
}
