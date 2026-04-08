import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"
import { ROLE_ROUTES } from "@/types/shared"
import { handleCorsPreflight, applyCorsHeaders } from "@/lib/proxies/cors.proxy"
import { applySecurityHeaders } from "@/lib/proxies/security-headers.proxy"
import {
  injectRequestId,
  applyRequestIdToResponse,
  logRequestEntry,
} from "@/lib/proxies/request-context.proxy"

// ── Constants 
const AUTH_COOKIE = "auth-token"

const PUBLIC_PATHS = [
  "/login",
  "/api/auth/login",
  "/",
]

// ── Path helpers 
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

// Error response helper 
function jsonError(code: string, message: string, status: number): NextResponse {
  return NextResponse.json(
    { success: false, error: { code, message } },
    { status }
  )
}

// Finalize helper 

function finalizeResponse(
  request: NextRequest,
  response: NextResponse,
  requestId: string
): NextResponse {
  applySecurityHeaders(request, response)
  applyCorsHeaders(request, response)
  applyRequestIdToResponse(requestId, response)
  return response
}

//  Main proxy 
export async function authProxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl

  const preflightResponse = handleCorsPreflight(request)
  if (preflightResponse) {
    const rid = crypto.randomUUID()
    logRequestEntry(request, rid)
    applySecurityHeaders(request, preflightResponse)
    applyRequestIdToResponse(rid, preflightResponse)
    return preflightResponse
  }

  const requestHeaders = new Headers(request.headers)
  const requestId = injectRequestId(request, requestHeaders)
  logRequestEntry(request, requestId)

  //3. Public paths — no auth needed 
  if (isPublicPath(pathname)) {
    const response = NextResponse.next({ request: { headers: requestHeaders } })
    return finalizeResponse(request, response, requestId)
  }

  // 4. Auth token extraction 
  const token = request.cookies.get(AUTH_COOKIE)?.value

  if (!token) {
    if (isApiPath(pathname)) {
      const errRes = jsonError("UNAUTHORIZED", "Authentication required. Please log in.", 401)
      return finalizeResponse(request, errRes, requestId)
    }
    const redirectRes = NextResponse.redirect(new URL("/login", request.url))
    return finalizeResponse(request, redirectRes, requestId)
  }

  // ── 5. JWT verification ───────────────────────────────────────────
  let payload: Record<string, unknown>
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const result = await jwtVerify(token, secret)
    payload = result.payload as Record<string, unknown>
  } catch {
    if (isApiPath(pathname)) {
      const errRes = jsonError("UNAUTHORIZED", "Session expired. Please log in again.", 401)
      return finalizeResponse(request, errRes, requestId)
    }
    const redirectRes = NextResponse.redirect(new URL("/login", request.url))
    redirectRes.cookies.delete(AUTH_COOKIE)
    return finalizeResponse(request, redirectRes, requestId)
  }

  // ── 6. Extract JWT claims ─────────────────────────────────────────
  const userId = payload.userId as string
  const role = payload.role as string
  const tenantId = (payload.tenantId as string) || ""
  const name = (payload.name as string) || ""
  const email = (payload.email as string) || ""
  const isFirstLogin = payload.isFirstLogin === true

  // 7. First-login password-change enforcement 
  if (isFirstLogin) {
    const allowed =
      pathname === "/changepassword" ||
      pathname.startsWith("/api/auth/changepassword") ||
      pathname.startsWith("/api/auth/logout") ||
      pathname.startsWith("/api/auth/me")

    if (!allowed) {
      if (isApiPath(pathname)) {
        const errRes = jsonError(
          "PASSWORD_CHANGE_REQUIRED",
          "You must change your password before continuing.",
          403
        )
        return finalizeResponse(request, errRes, requestId)
      }
      const redirectRes = NextResponse.redirect(new URL("/changepassword", request.url))
      return finalizeResponse(request, redirectRes, requestId)
    }
  }

  // 8. Role-based dashboard route protection 
  if (isDashboardPath(pathname) && !isFirstLogin) {
    const allowedPrefix = ROLE_ROUTES[role as keyof typeof ROLE_ROUTES]
    if (!allowedPrefix || !pathname.startsWith(allowedPrefix)) {
      const correctPath = ROLE_ROUTES[role as keyof typeof ROLE_ROUTES] || "/login"
      const redirectRes = NextResponse.redirect(new URL(correctPath, request.url))
      return finalizeResponse(request, redirectRes, requestId)
    }
  }

  // 9. Inject user context headers for downstream route handlers 
  requestHeaders.set("x-user-id", userId)
  requestHeaders.set("x-user-role", role)
  requestHeaders.set("x-tenant-id", tenantId)
  requestHeaders.set("x-user-name", name)
  requestHeaders.set("x-user-email", email)
  requestHeaders.set("x-user-first-login", String(isFirstLogin))

  // 10. Final response with all headers applied 
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })
  return finalizeResponse(request, response, requestId)
}
