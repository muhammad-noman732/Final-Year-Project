import { useState, useEffect } from "react"
import { useGetUsersQuery } from "@/store/api/admin/usersApi"
import { useDebounce } from "@/hooks/useDebounce"
import type { ListUsersQueryParams } from "@/types/client/store/user.store.types"

type RoleFilter = "all" | "VC" | "HOD"

export function useGetUsers() {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearch] = useDebounce(searchQuery, 400)
  const [selectedRole, setSelectedRole] = useState<RoleFilter>("all")
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  const queryParams: ListUsersQueryParams = {
    page,
    limit: 10,
    role: selectedRole !== "all" ? selectedRole : undefined,
    search: debouncedSearch || undefined,
  }

  const { data: response, isLoading, isFetching } = useGetUsersQuery(queryParams)
  const users = response?.data?.data ?? []
  const meta = response?.data?.meta ?? { total: 0, totalPages: 1, page: 1, limit: 10 }

  const handleRoleChange = (val: string) => {
    setSelectedRole(val as RoleFilter)
    setPage(1)
  }

  return {
    searchQuery, setSearchQuery,
    selectedRole, handleRoleChange,
    page, setPage,
    users, meta, isLoading, isFetching,
  }
}
