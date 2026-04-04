import type { PrismaClient } from "@/app/generated/prisma/client"
import type { UserWithTenant, UserBasic } from "@/types/server/auth.types"

export class UserRepository {
  constructor(private readonly db: PrismaClient) { }

  async findByEmail(email: string): Promise<UserWithTenant | null> {
    const user = await this.db.user.findFirst({
      where: { email, isActive: true },
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

  /**
   * Stamp lastLoginAt — called after successful login.
   */
  async updateLastLogin(userId: string): Promise<void> {
    await this.db.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    })
  }

  /**
   * Update password hash and clear isFirstLogin flag.
   * Called after successful password change.
   */
  async updatePassword(userId: string, passwordHash: string): Promise<void> {
    await this.db.user.update({
      where: { id: userId },
      data: {
        passwordHash,
        isFirstLogin: false,
      },
    })
  }
}
