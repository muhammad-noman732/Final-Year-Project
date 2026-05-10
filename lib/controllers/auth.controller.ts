import { type NextRequest } from "next/server"
import { loginSchema, changePasswordSchema } from "@/lib/validators/auth.validators"
import { successResponse } from "@/lib/utils/ApiResponse"
import { getAuthUser } from "@/lib/auth"
import { logger } from "@/lib/logger"
import { UnauthorizedError } from "@/lib/utils/AppError"
import type { AuthService } from "@/lib/services/auth.service"

const ACCESS_COOKIE = "auth-token"
const REFRESH_COOKIE = "refresh-token"

const COOKIE_BASE = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
}

const ACCESS_MAX_AGE = 15 * 60
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60

function attachTokenCookies(
  response: ReturnType<typeof successResponse>,
  accessToken: string,
  refreshToken: string,
): void {
  response.cookies.set(ACCESS_COOKIE, accessToken, {
    ...COOKIE_BASE,
    maxAge: ACCESS_MAX_AGE,
  })
  response.cookies.set(REFRESH_COOKIE, refreshToken, {
    ...COOKIE_BASE,
    maxAge: REFRESH_MAX_AGE,
  })
}

function clearTokenCookies(response: ReturnType<typeof successResponse>): void {
  response.cookies.set(ACCESS_COOKIE, "", { ...COOKIE_BASE, maxAge: 0 })
  response.cookies.set(REFRESH_COOKIE, "", { ...COOKIE_BASE, maxAge: 0 })
}

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(req: NextRequest) {
    const body = await req.json()
    const data = loginSchema.parse(body)

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"

    const result = await this.authService.login(data, ip)

    const response = successResponse({
      user: result.user,
      redirectTo: result.redirectTo,
    })

    attachTokenCookies(response, result.accessToken, result.refreshToken)
    return response
  }

  async refresh(req: NextRequest) {
    const oldRefreshToken = req.cookies.get(REFRESH_COOKIE)?.value

    if (!oldRefreshToken) {
      throw new UnauthorizedError("No refresh token provided.")
    }

    const result = await this.authService.refreshSession(oldRefreshToken)

    const response = successResponse({ message: "Session refreshed." })
    attachTokenCookies(response, result.accessToken, result.refreshToken)
    return response
  }

  async logout(req: NextRequest) {
    const refreshToken = req.cookies.get(REFRESH_COOKIE)?.value

    try {
      const user = await getAuthUser()
      logger.info(
        { event: "auth.logout", userId: user.userId, role: user.role },
        "User logged out",
      )
    } catch {
    }

    await this.authService.logout(refreshToken)

    const response = successResponse({ message: "Logged out successfully." })
    clearTokenCookies(response)
    return response
  }

  async changePassword(req: NextRequest) {
    const authUser = await getAuthUser()
    const body = await req.json()
    const data = changePasswordSchema.parse(body)

    const result = await this.authService.changePassword(authUser.userId, data)

    const response = successResponse({
      message: "Password changed successfully.",
      redirectTo: result.redirectTo,
    })

    attachTokenCookies(response, result.accessToken, result.refreshToken)
    return response
  }

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
