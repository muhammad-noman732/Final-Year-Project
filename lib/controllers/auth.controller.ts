
import { type NextRequest } from "next/server"
import { loginSchema, changePasswordSchema } from "@/lib/validators/auth.validators"
import { successResponse } from "@/lib/utils/ApiResponse"
import { getAuthUser } from "@/lib/auth"
import { logger } from "@/lib/logger"
import type { AuthService } from "@/lib/services/auth.service"

const AUTH_COOKIE = "auth-token"

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
}

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60

export class AuthController {
  constructor(private readonly authService: AuthService) { }


  async login(req: NextRequest) {
    const body = await req.json()
    const data = loginSchema.parse(body)

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    const result = await this.authService.login(data, ip)

    const response = successResponse({
      user: result.user,
      redirectTo: result.redirectTo,
    })

    response.cookies.set(AUTH_COOKIE, result.token, {
      ...COOKIE_OPTIONS,
      maxAge: COOKIE_MAX_AGE,
    })

    return response
  }

  // POST /api/auth/logout 

  async logout() {
    const user = await getAuthUser()
    logger.info({ userId: user.userId, role: user.role }, "User logged out")

    const response = successResponse({ message: "Logged out successfully." })

    // Expire the cookie immediately
    response.cookies.set(AUTH_COOKIE, "", {
      ...COOKIE_OPTIONS,
      maxAge: 0,
    })

    return response
  }

  // POST /api/auth/changepassword 

  async changePassword(req: NextRequest) {
    const authUser = await getAuthUser()
    const body = await req.json()
    const data = changePasswordSchema.parse(body)

    const result = await this.authService.changePassword(authUser.userId, data)

    const response = successResponse({
      message: "Password changed successfully.",
      redirectTo: result.redirectTo,
    })

    // Re-issue cookie with updated JWT (isFirstLogin = false)
    response.cookies.set(AUTH_COOKIE, result.token, {
      ...COOKIE_OPTIONS,
      maxAge: COOKIE_MAX_AGE,
    })

    return response
  }

  // GET /api/auth/me 

  async me() {
    const user = await getAuthUser()

    return successResponse({
      id: user.userId,
      name: user.name,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
      isFirstLogin: user.isFirstLogin,
    })
  }
}
