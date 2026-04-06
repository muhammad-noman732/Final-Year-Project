import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function injectRequestId(
  request: NextRequest,
  requestHeaders: Headers
): string {
  // Respect upstream proxy (Nginx) if it already set a request ID
  const existingId = request.headers.get("x-request-id")
  const requestId = existingId || crypto.randomUUID()

  requestHeaders.set("x-request-id", requestId)

  return requestId
}

/**
 * Copies the x-request-id onto the response headers so the client can correlate.
 */
export function applyRequestIdToResponse(
  requestId: string,
  response: NextResponse
): NextResponse {
  response.headers.set("x-request-id", requestId)
  return response
}


export function logRequestEntry(
  request: NextRequest,
  requestId: string
): void {
  if (process.env.NODE_ENV === "development") {
    const timestamp = new Date().toISOString()
    console.log(
      `[${timestamp}] ➜ ${request.method} ${request.nextUrl.pathname} | rid=${requestId}`
    )
  }
  // In production, structured logging (via pino) happens in withErrorHandler
  // where we have access to the full Node.js runtime, not the Edge runtime.
}
