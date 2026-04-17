import { unstable_cache } from "next/cache"
import { revalidateTag } from "next/cache"

// Tenant-scoped cache tag builders
// Every tag is prefixed with tenantId to prevent cross-tenant data leaks.

export function deptTag(tenantId: string) {
  return `departments-${tenantId}`
}

export function programTag(tenantId: string) {
  return `programs-${tenantId}`
}

export function sessionTag(tenantId: string) {
  return `sessions-${tenantId}`
}

export function studentTag(tenantId: string) {
  return `students-${tenantId}`
}

export function userTag(tenantId: string) {
  return `users-${tenantId}`
}

export function feeStructureTag(tenantId: string) {
  return `fee-structures-${tenantId}`
}

// Cache builder
// Wraps unstable_cache with tenant-scoped tags and a default TTL.

export function buildCachedFn<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  keyParts: string[],
  tags: string[],
  revalidateSeconds = 120,
) {
  return unstable_cache(fn, keyParts, {
    tags,
    revalidate: revalidateSeconds,
  })
}

//  Revalidation helpers 

export function revalidateDepartments(tenantId: string) {
  revalidateTag(deptTag(tenantId), "max")
}

export function revalidatePrograms(tenantId: string) {
  revalidateTag(programTag(tenantId), "max")
}

export function revalidateSessions(tenantId: string) {
  revalidateTag(sessionTag(tenantId), "max")
}

export function revalidateStudents(tenantId: string) {
  revalidateTag(studentTag(tenantId), "max")
}

export function revalidateUsers(tenantId: string) {
  revalidateTag(userTag(tenantId), "max")
}

export function revalidateFeeStructures(tenantId: string) {
  revalidateTag(feeStructureTag(tenantId), "max")
}
