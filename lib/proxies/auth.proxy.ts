import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"
import { ROLE_ROUTES } from "@/types/shared"

const AUTH_COOKIE = "auth-token"

const PUBLIC_PATHS = [
  "/login",
  "/api/auth/login",
  "/",
]

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  )
}

function isDashboardPath(pathname: string): boolean {
  return Object.values(ROLE_ROUTES).some((prefix) =>
    pathname.startsWith(prefix)
  )
}

function isApiPath(pathname: string): boolean {
  return pathname.startsWith("/api/")
}

function jsonError(code: string, message: string, status: number): NextResponse {
  return NextResponse.json(
    { success: false, error: { code, message } },
    { status }
  )
}

export async function authProxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl

  if (isPublicPath(pathname)) {
    return NextResponse.next()
  }

  const token = request.cookies.get(AUTH_COOKIE)?.value

  if (!token) {
    if (isApiPath(pathname)) {
      return jsonError("UNAUTHORIZED", "Authentication required. Please log in.", 401)
    }
    return NextResponse.redirect(new URL("/login", request.url))
  }

  let payload: Record<string, unknown>
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const result = await jwtVerify(token, secret)
    payload = result.payload as Record<string, unknown>
  } catch {
    if (isApiPath(pathname)) {
      return jsonError("UNAUTHORIZED", "Session expired. Please log in again.", 401)
    }
    const response = NextResponse.redirect(new URL("/login", request.url))
    response.cookies.delete(AUTH_COOKIE)
    return response
  }

  const userId       = payload.userId as string
  const role         = payload.role as string
  const tenantId     = (payload.tenantId as string) || ""
  const name         = (payload.name as string) || ""
  const email        = (payload.email as string) || ""
  const isFirstLogin = payload.isFirstLogin === true

  if (isFirstLogin) {
    const allowed =
      pathname === "/changepassword" ||
      pathname.startsWith("/api/auth/changepassword") ||
      pathname.startsWith("/api/auth/logout") ||
      pathname.startsWith("/api/auth/me")

    if (!allowed) {
      if (isApiPath(pathname)) {
        return jsonError(
          "PASSWORD_CHANGE_REQUIRED",
          "You must change your password before continuing.",
          403
        )
      }
      return NextResponse.redirect(new URL("/changepassword", request.url))
    }
  }

  if (isDashboardPath(pathname) && !isFirstLogin) {
    const allowedPrefix = ROLE_ROUTES[role as keyof typeof ROLE_ROUTES]
    if (!allowedPrefix || !pathname.startsWith(allowedPrefix)) {
      const correctPath = ROLE_ROUTES[role as keyof typeof ROLE_ROUTES] || "/login"
      return NextResponse.redirect(new URL(correctPath, request.url))
    }
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-user-id", userId)
  requestHeaders.set("x-user-role", role)
  requestHeaders.set("x-tenant-id", tenantId)
  requestHeaders.set("x-user-name", name)
  requestHeaders.set("x-user-email", email)
  requestHeaders.set("x-user-first-login", String(isFirstLogin))

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}
