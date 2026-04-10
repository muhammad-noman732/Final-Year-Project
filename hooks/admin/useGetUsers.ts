import { useState } from "react"
import { useGetUsersQuery } from "@/store/api/admin/usersApi"
import type { ListUsersQueryParams } from "@/types/client/user.api.types"

type RoleFilter = "all" | "VC" | "HOD"

export function useGetUsers() {
  const [selectedRole, setSelectedRole] = useState<RoleFilter>("all")
  const [page, setPage] = useState(1)

  const queryParams: ListUsersQueryParams = {
    page,
    limit: 10,
    role: selectedRole !== "all" ? selectedRole : undefined,
  }

  const { data: response, isLoading, isFetching } = useGetUsersQuery(queryParams)
  const users = response?.data?.data ?? []
  const meta = response?.data?.meta ?? { total: 0, totalPages: 1, page: 1, limit: 10 }

  const handleRoleChange = (val: string) => {
    setSelectedRole(val as RoleFilter)
    setPage(1)
  }

  return {
    selectedRole, handleRoleChange,
    page, setPage,
    users, meta, isLoading, isFetching,
  }
}
