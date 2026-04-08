export interface OnboardTenantPayload {
  universityName: string
  shortName: string
  domain?: string
  adminName: string
  adminEmail: string
}

export interface OnboardTenantResponse {
  tenantId: string
  slug: string
  adminEmail: string
}
