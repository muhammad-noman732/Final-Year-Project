export interface CreateTenantData {
  name: string
  shortName: string
  slug: string
  domain?: string
}

export interface OnboardTenantInput {
  universityName: string
  shortName: string
  domain?: string
  adminName: string
  adminEmail: string
}
