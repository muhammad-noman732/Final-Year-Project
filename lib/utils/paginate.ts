import type { PaginationMeta } from "@/types/server/admin.types"
const MAX_LIMIT = 100
const DEFAULT_LIMIT = 20

export function getPaginationParams(query: { page?: number | string; limit?: number | string }) {
  const page = Math.max(1, Number(query.page ?? 1))
  const limit = Math.min(MAX_LIMIT, Math.max(1, Number(query.limit ?? DEFAULT_LIMIT)))
  const skip = (page - 1) * limit
  return { page, limit, skip }
}

export function buildPaginationMeta(
  total: number,
  page: number,
  limit: number
): PaginationMeta {
  return {
    page,
    limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  }
}
