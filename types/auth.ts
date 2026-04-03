// ═══════════════════════════════════════════════════════════════
//  Barrel re-export — backward compatibility
//  New code should import from:
//    @/types/shared          (Role, ROLE_ROUTES, ROLE_LABELS)
//    @/types/server/auth.types  (JWTPayload, AuthUser, etc.)
//    @/types/client/auth.types  (ClientUser, ApiResponse, etc.)
// ═══════════════════════════════════════════════════════════════

export { type Role, ROLE_ROUTES, ROLE_LABELS } from "@/types/shared"
export type { JWTPayload, AuthUser } from "@/types/server/auth.types"
