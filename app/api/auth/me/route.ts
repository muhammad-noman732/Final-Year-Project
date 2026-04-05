// ═══════════════════════════════════════════════════════════════
//  GET /api/auth/me
//
//  Returns the currently authenticated user's info.
//  Read from middleware-injected headers — no DB call needed.
//  Used by the frontend useAuth() hook to get user context.
// ═══════════════════════════════════════════════════════════════

import { withErrorHandler } from "@/lib/utils/routeHandler"
import { authController } from "@/lib/di"

export const GET = withErrorHandler(async () => {
  return await authController.me()
})
