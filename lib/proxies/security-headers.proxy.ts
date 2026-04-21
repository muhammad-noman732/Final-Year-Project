import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function applySecurityHeaders(
  _request: NextRequest,
  response: NextResponse
): NextResponse {
  const isProd = process.env.NODE_ENV === "production"

  // ── Core security headers ─────────────────────────────────────────
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  // ── Permissions-Policy — disable unused browser APIs ──────────────
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  )

  // ── HSTS — only in production behind real TLS ─────────────────────
  if (isProd) {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    )
  }


  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://js.stripe.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://api.stripe.com https://js.stripe.com",
    "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ")

  response.headers.set("Content-Security-Policy", cspDirectives)

  return response
}
