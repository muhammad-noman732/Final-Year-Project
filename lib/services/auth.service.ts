import crypto from "crypto"
import bcrypt from "bcryptjs"
import { signJWT } from "@/lib/jwt"
import { logger } from "@/lib/logger"
import { UnauthorizedError, ValidationError } from "@/lib/utils/AppError"
import { ROLE_ROUTES } from "@/types/server/shared.types"
import type { Role } from "@/types/server/shared.types"
import type { UserRepository } from "@/lib/repositories/user.repository"
import type { RefreshTokenRepository } from "@/lib/repositories/refreshToken.repository"
import type { AuditService } from "@/lib/services/audit.service"
import type {
  JWTPayload,
  LoginInput,
  LoginResult,
  RefreshResult,
  ChangePasswordInput,
  ChangePasswordResult,
} from "@/types/server/auth.types"

const BCRYPT_ROUNDS = 12

export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly refreshTokenRepo: RefreshTokenRepository,
    private readonly auditService: AuditService,
  ) {}

  private async issueTokenPair(user: {
    id: string
    tenantId: string | null
    role: string
    name: string
    email: string
    isFirstLogin: boolean
  }): Promise<{ accessToken: string; refreshToken: string }> {
    const jwtPayload: JWTPayload = {
      userId: user.id,
      tenantId: user.tenantId,
      role: user.role as Role,
      name: user.name,
      email: user.email,
      isFirstLogin: user.isFirstLogin,
    }
    const accessToken = await signJWT(jwtPayload)
    const refreshToken = crypto.randomBytes(48).toString("hex")

    await this.refreshTokenRepo.save(refreshToken, user.id)

    return { accessToken, refreshToken }
  }

  async login(input: LoginInput, ipAddress: string): Promise<LoginResult> {
    const emailNormalized = input.email.toLowerCase().trim()
    const user = await this.userRepo.findByEmail(emailNormalized)

    if (!user) {
      throw new UnauthorizedError("Invalid email or password.")
    }

    if (user.role !== "SUPER_ADMIN" && user.tenant && !user.tenant.isActive) {
      throw new UnauthorizedError(
        "Your university account has been deactivated. Contact support.",
      )
    }

    const passwordValid = await bcrypt.compare(input.password, user.passwordHash)
    if (!passwordValid) {
      throw new UnauthorizedError("Invalid email or password.")
    }

    const { accessToken, refreshToken } = await this.issueTokenPair(user)

    this.userRepo.updateLastLogin(user.id).catch((err: unknown) => {
      logger.warn({ event: "auth.login.updateLastLogin.failed", userId: user.id, err }, "updateLastLogin failed")
    })

    this.auditService.log({
      tenantId: user.tenantId,
      userId: user.id,
      userEmail: user.email,
      userRole: user.role,
      action: "user.login",
      entity: "User",
      entityId: user.id,
      ipAddress,
    })

    logger.info(
      { event: "auth.login.success", userId: user.id, role: user.role, tenantId: user.tenantId },
      "User logged in",
    )

    const role = user.role as Role
    const redirectTo = user.isFirstLogin ? "/changepassword" : ROLE_ROUTES[role]

    return {
      accessToken,
      refreshToken,
      redirectTo,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isFirstLogin: user.isFirstLogin,
        tenantId: user.tenantId,
        tenantName: user.tenant?.name ?? null,
        tenantSlug: user.tenant?.slug ?? null,
      },
    }
  }

  async refreshSession(oldRefreshToken: string): Promise<RefreshResult> {
    const userId = await this.refreshTokenRepo.getUserId(oldRefreshToken)
    if (!userId) {
      logger.warn({ event: "auth.refresh.invalid_token" }, "Refresh token not found in Redis")
      throw new UnauthorizedError("Session expired. Please log in again.")
    }

    await this.refreshTokenRepo.revokeWithGrace(oldRefreshToken)

    const freshUser = await this.userRepo.findById(userId)
    if (!freshUser) {
      logger.warn({ event: "auth.refresh.user_not_found", userId }, "User not found during refresh")
      throw new UnauthorizedError("Session expired. Please log in again.")
    }

    const userShape = {
      id: freshUser.id,
      tenantId: freshUser.tenantId,
      role: freshUser.role,
      name: freshUser.name,
      email: freshUser.email,
      isFirstLogin: false,
    }

    const { accessToken, refreshToken } = await this.issueTokenPair(userShape)

    logger.info(
      { event: "auth.refresh.success", userId: freshUser.id, role: freshUser.role },
      "Session refreshed — new token pair issued",
    )

    return { accessToken, refreshToken }
  }

  async logout(refreshToken: string | undefined): Promise<void> {
    if (refreshToken) {
      await this.refreshTokenRepo.revoke(refreshToken).catch((err: unknown) => {
        logger.warn({ event: "auth.logout.revoke_failed", err }, "Could not revoke refresh token on logout")
      })
    }
  }

  async changePassword(
    userId: string,
    input: ChangePasswordInput,
  ): Promise<ChangePasswordResult> {
    const user = await this.userRepo.findById(userId)
    if (!user) {
      throw new UnauthorizedError("User not found.")
    }

    const currentValid = await bcrypt.compare(input.currentPassword, user.passwordHash)
    if (!currentValid) {
      throw new ValidationError("Current password is incorrect.", {
        currentPassword: ["Current password is incorrect"],
      })
    }

    const newHash = await bcrypt.hash(input.newPassword, BCRYPT_ROUNDS)
    await this.userRepo.updatePassword(user.id, newHash)

    await this.refreshTokenRepo.revokeAll(user.id).catch((err: unknown) => {
      logger.warn({ event: "auth.changePassword.revokeAll.failed", userId: user.id, err }, "revokeAll failed on password change")
    })

    const userShape = {
      id: user.id,
      tenantId: user.tenantId,
      role: user.role,
      name: user.name,
      email: user.email,
      isFirstLogin: false,
    }
    const { accessToken, refreshToken } = await this.issueTokenPair(userShape)

    this.auditService.log({
      tenantId: user.tenantId,
      userId: user.id,
      userEmail: user.email,
      userRole: user.role,
      action: "password.changed",
      entity: "User",
      entityId: user.id,
    })

    logger.info(
      { event: "auth.password.changed", userId: user.id, tenantId: user.tenantId },
      "Password changed — all prior refresh tokens revoked",
    )

    const role = user.role as Role
    return { accessToken, refreshToken, redirectTo: ROLE_ROUTES[role] }
  }
}
