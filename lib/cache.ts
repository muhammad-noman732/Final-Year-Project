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

/**
 * Per-student fee tag — scoped to both tenant AND user so each student's
 * cache is invalidated independently when their fee status changes.
 */
export function studentFeeTag(tenantId: string, userId: string) {
  return `student-fee-${tenantId}-${userId}`
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

export function revalidateStudentFee(tenantId: string, userId: string) {
  revalidateTag(studentFeeTag(tenantId, userId), "max")
}

/**
 * Tenant-wide tag that covers every student's fee cache entry.
 * Add this tag alongside studentFeeTag on any cached fee query so a single
 * revalidateAllStudentFees() call busts all of them at once (e.g. after a
 * fee-structure update that affects multiple students).
 */
export function allStudentFeesTag(tenantId: string) {
  return `all-student-fees-${tenantId}`
}

export function revalidateAllStudentFees(tenantId: string) {
  revalidateTag(allStudentFeesTag(tenantId), "max")
}
