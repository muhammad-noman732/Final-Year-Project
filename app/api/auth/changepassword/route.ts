// ═══════════════════════════════════════════════════════════════
//  POST /api/auth/changepassword
//
//  Handles two scenarios:
//  A) First-login forced password change (isFirstLogin === true)
//  B) Normal voluntary password change
//
//  After successful change:
//  - Updates passwordHash in DB
//  - Sets isFirstLogin = false
//  - Re-issues JWT (so the cookie doesn't have stale isFirstLogin)
//  - Creates audit log
//
//  Rule: Wrapped with withErrorHandler — no try/catch here.
// ═══════════════════════════════════════════════════════════════

import { type NextRequest } from "next/server"
import { withErrorHandler } from "@/lib/routeHandler"
import { authController } from "@/lib/di"

export const POST = withErrorHandler(async (req: NextRequest) => {
  return await authController.changePassword(req)
})
