import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { logger } from "@/lib/logger"

export function injectRequestId(
  request: NextRequest,
  requestHeaders: Headers
): string {

  const existingId = request.headers.get("x-request-id")
  const requestId = existingId || crypto.randomUUID()

  requestHeaders.set("x-request-id", requestId)

  return requestId
}

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
  logger.debug(
    {
      event: "proxy.request.received",
      requestId,
      method: request.method,
      path: request.nextUrl.pathname,
    },
    "Proxy request received"
  )
}
