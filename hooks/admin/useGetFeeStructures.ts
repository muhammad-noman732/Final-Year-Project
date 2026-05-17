import { useState, useEffect } from "react"
import { useGetFeeStructuresQuery } from "@/store/api/admin/feeStructuresApi"
import { useGetProgramsQuery } from "@/store/api/admin/programsApi"
import { useGetSessionsQuery } from "@/store/api/admin/sessionsApi"
import { useGetDepartmentsQuery } from "@/store/api/admin/departmentsApi"
import type { ListFeeStructuresQueryParams } from "@/types/client/store/fee.store.types"

export function useGetFeeStructures() {
  const [selectedDept, setSelectedDept] = useState("all")
  const [selectedProgram, setSelectedProgram] = useState("all")
  const [selectedSemester, setSelectedSemester] = useState("all")
  const [selectedSession, setSelectedSession] = useState("all")
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput)
      setPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchInput])

  const { data: deptsRes } = useGetDepartmentsQuery({ limit: 100 })
  const { data: progsRes } = useGetProgramsQuery({
    limit: 100,
    departmentId: selectedDept !== "all" ? selectedDept : undefined,
  })
  const { data: sessRes } = useGetSessionsQuery({ limit: 100 })

  const departments = deptsRes?.data?.data ?? []
  const programs = progsRes?.data?.data ?? []
  const sessions = sessRes?.data?.data ?? []
  const semesters = Array.from({ length: 12 }, (_, i) => i + 1)

  const queryParams: ListFeeStructuresQueryParams = {
    page,
    limit: 10,
    programId: selectedProgram !== "all" ? selectedProgram : undefined,
    semester: selectedSemester !== "all" ? parseInt(selectedSemester) : undefined,
    sessionYear: selectedSession !== "all" ? parseInt(selectedSession) : undefined,
    search: search || undefined,
  }

  const { data: response, isLoading, isFetching } = useGetFeeStructuresQuery(queryParams)
  const feeStructures = response?.data?.data ?? []
  const meta = response?.data?.meta ?? { total: 0, totalPages: 1, page: 1, limit: 10 }
  const stats = response?.data?.stats

  const handleDeptChange = (val: string) => {
    setSelectedDept(val)
    setSelectedProgram("all")
    setPage(1)
  }

  const handleProgramChange = (val: string) => {
    setSelectedProgram(val)
    setPage(1)
  }

  const handleSemesterChange = (val: string) => {
    setSelectedSemester(val)
    setPage(1)
  }

  const handleSessionChange = (val: string) => {
    setSelectedSession(val)
    setPage(1)
  }

  const resetFilters = () => {
    setSelectedDept("all")
    setSelectedProgram("all")
    setSelectedSemester("all")
    setSelectedSession("all")
    setSearchInput("")
    setSearch("")
    setPage(1)
  }

  return {
    selectedDept, handleDeptChange,
    selectedProgram, handleProgramChange,
    selectedSemester, handleSemesterChange,
    selectedSession, handleSessionChange,
    searchInput, setSearchInput,

    departments, programs, sessions, semesters,

    page, setPage,

    feeStructures, meta, stats, isLoading, isFetching,
    resetFilters,
  }
}
