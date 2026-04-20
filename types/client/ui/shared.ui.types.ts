export interface UsePaginationReturn {
  page: number
  limit: number
  setPage: (page: number) => void
  setLimit: (limit: number) => void
}
