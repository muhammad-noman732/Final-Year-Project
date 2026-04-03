// ═══════════════════════════════════════════════════════════════
//  AuthService — Core authentication business logic
//
//  Responsibilities:
//  - Login (credential verification, JWT issuance)
//  - Password change (hash update, JWT re-issuance)
//
//  Rules:
//  - No HTTP concepts (req, res, cookies). That's the controller's job.
//  - All errors are thrown as AppError subclasses.
//  - Audit logging is fire-and-forget via AuditService.
// ═══════════════════════════════════════════════════════════════

import bcrypt from "bcryptjs"
import { signJWT } from "@/lib/jwt"
import { logger } from "@/lib/logger"
import { UnauthorizedError, ValidationError } from "@/lib/errors"
import { ROLE_ROUTES } from "@/types/shared"
import type { Role } from "@/types/shared"
import type { UserRepository } from "@/lib/repositories/user.repository"
import type { AuditService } from "@/lib/services/audit.service"
import type {
  JWTPayload,
  LoginInput,
  LoginResult,
  ChangePasswordInput,
  ChangePasswordResult,
} from "@/types/server/auth.types"

const BCRYPT_ROUNDS = 12

export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly auditService: AuditService,
  ) {}

  // ─── Login ──────────────────────────────────────────────────

  async login(input: LoginInput, ipAddress: string): Promise<LoginResult> {
    // 1. Find user by email (cross-tenant lookup)
    const user = await this.userRepo.findByEmail(input.email)

    // Never reveal whether email exists — always "Invalid credentials"
    if (!user) {
      throw new UnauthorizedError("Invalid email or password.")
    }

    // 2. Check tenant is active (non-SUPER_ADMIN only)
    if (user.role !== "SUPER_ADMIN" && user.tenant && !user.tenant.isActive) {
      throw new UnauthorizedError(
        "Your university account has been deactivated. Contact support."
      )
    }

    // 3. Verify password against stored bcrypt hash
    const passwordValid = await bcrypt.compare(input.password, user.passwordHash)
    if (!passwordValid) {
      throw new UnauthorizedError("Invalid email or password.")
    }

    // 4. Build JWT payload and sign
    const jwtPayload: JWTPayload = {
      userId:       user.id,
      tenantId:     user.tenantId,
      role:         user.role as Role,
      name:         user.name,
      email:        user.email,
      isFirstLogin: user.isFirstLogin,
    }

    const token = await signJWT(jwtPayload)

    // 5. Update last login timestamp
    await this.userRepo.updateLastLogin(user.id)

    // 6. Audit log (fire-and-forget)
    this.auditService.log({
      tenantId:  user.tenantId,
      userId:    user.id,
      userEmail: user.email,
      userRole:  user.role,
      action:    "user.login",
      entity:    "User",
      entityId:  user.id,
      ipAddress,
    })

    logger.info(
      { userId: user.id, role: user.role, tenantId: user.tenantId },
      "User logged in"
    )

    // 7. Determine redirect path
    const role = user.role as Role
    const redirectTo = user.isFirstLogin ? "/changepassword" : ROLE_ROUTES[role]

    return {
      token,
      redirectTo,
      user: {
        id:           user.id,
        name:         user.name,
        email:        user.email,
        role:         user.role,
        isFirstLogin: user.isFirstLogin,
        tenantId:     user.tenantId,
        tenantName:   user.tenant?.name || null,
        tenantSlug:   user.tenant?.slug || null,
      },
    }
  }

  // ─── Change Password ────────────────────────────────────────

  async changePassword(
    userId: string,
    input: ChangePasswordInput,
  ): Promise<ChangePasswordResult> {
    // 1. Fetch current user
    const user = await this.userRepo.findById(userId)
    if (!user) {
      throw new UnauthorizedError("User not found.")
    }

    // 2. Verify current password
    const currentValid = await bcrypt.compare(input.currentPassword, user.passwordHash)
    if (!currentValid) {
      throw new ValidationError("Current password is incorrect.", {
        currentPassword: ["Current password is incorrect"],
      })
    }

    // 3. Hash new password and persist
    const newHash = await bcrypt.hash(input.newPassword, BCRYPT_ROUNDS)
    await this.userRepo.updatePassword(user.id, newHash)

    // 4. Re-issue JWT with isFirstLogin = false
    const jwtPayload: JWTPayload = {
      userId:       user.id,
      tenantId:     user.tenantId,
      role:         user.role as Role,
      name:         user.name,
      email:        user.email,
      isFirstLogin: false,
    }

    const token = await signJWT(jwtPayload)

    // 5. Audit log
    this.auditService.log({
      tenantId:  user.tenantId,
      userId:    user.id,
      userEmail: user.email,
      userRole:  user.role,
      action:    "password.changed",
      entity:    "User",
      entityId:  user.id,
    })

    logger.info({ userId: user.id }, "Password changed")

    // 6. Return token + redirect
    const role = user.role as Role
    return { token, redirectTo: ROLE_ROUTES[role] }
  }
}
