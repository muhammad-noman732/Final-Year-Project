import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"


const ALLOWED_METHODS = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
const ALLOWED_HEADERS = "Content-Type, Authorization, X-Request-Id"
const MAX_AGE = "86400" // preflight cache for 24 hours

function getAllowedOrigins(): string[] {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const origins = [appUrl]

  if (process.env.NODE_ENV === "development") {
    origins.push("http://localhost:3000", "http://localhost:3001")
  }

  return origins
}

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false
  return getAllowedOrigins().includes(origin)
}

export function handleCorsPreflight(request: NextRequest): NextResponse | null {
  // Only apply CORS to API routes not the pages 
  if (!request.nextUrl.pathname.startsWith("/api/")) {
    return null
  }

  const origin = request.headers.get("origin")

  // OPTIONS preflight → respond immediately
  if (request.method === "OPTIONS") {
    const response = new NextResponse(null, { status: 204 })

    if (origin && isAllowedOrigin(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin)
      response.headers.set("Access-Control-Allow-Methods", ALLOWED_METHODS)
      response.headers.set("Access-Control-Allow-Headers", ALLOWED_HEADERS)
      response.headers.set("Access-Control-Max-Age", MAX_AGE)
      response.headers.set("Access-Control-Allow-Credentials", "true")
    }

    return response
  }

  return null
}

/**
 * Applies CORS response headers to non-preflight API requests.
 */
export function applyCorsHeaders(
  request: NextRequest,
  response: NextResponse
): NextResponse {
  // Only apply CORS to API routes not pages
  if (!request.nextUrl.pathname.startsWith("/api/")) {
    return response
  }

  const origin = request.headers.get("origin")

  if (origin && isAllowedOrigin(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin)
    response.headers.set("Access-Control-Allow-Credentials", "true")
  }

  return response
}
