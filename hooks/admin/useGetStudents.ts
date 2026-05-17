import { useState } from "react"
import { useGetStudentsQuery } from "@/store/api/admin/studentsApi"
import { useGetDepartmentsQuery } from "@/store/api/admin/departmentsApi"
import { useGetProgramsQuery } from "@/store/api/admin/programsApi"
import { useGetSessionsQuery } from "@/store/api/admin/sessionsApi"
import { useDebounce } from "@/hooks/useDebounce"
import type { ListStudentsQueryParams } from "@/types/client/store/student.store.types"

export function useGetStudents() {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearch] = useDebounce(searchQuery, 400)

  const [selectedDept, setSelectedDept] = useState("all")
  const [selectedProgram, setSelectedProgram] = useState("all")
  const [selectedSemester, setSelectedSemester] = useState("all")
  const [selectedSession, setSelectedSession] = useState("all")
  const [page, setPage] = useState(1)

  const { data: deptsRes } = useGetDepartmentsQuery({ limit: 100 })
  const { data: progsRes } = useGetProgramsQuery({
    limit: 100,
    departmentId: selectedDept !== "all" ? selectedDept : undefined,
  })
  const { data: sessRes } = useGetSessionsQuery({ limit: 100 })

  const departments = deptsRes?.data?.data ?? []
  const programs = progsRes?.data?.data ?? []
  const sessions = sessRes?.data?.data ?? []
  const semesters = Array.from({ length: 8 }, (_, i) => i + 1)

  const baseQueryParams: ListStudentsQueryParams = {
    search: debouncedSearch || undefined,
    departmentId: selectedDept !== "all" ? selectedDept : undefined,
    programId: selectedProgram !== "all" ? selectedProgram : undefined,
    sessionId: selectedSession !== "all" ? selectedSession : undefined,
    semester: selectedSemester !== "all" ? parseInt(selectedSemester) : undefined,
  }

  const queryParams: ListStudentsQueryParams = {
    ...baseQueryParams,
    page,
    limit: 10,
  }

  const { data: response, isLoading, isFetching } = useGetStudentsQuery(queryParams)
  const { data: activeRes } = useGetStudentsQuery({ ...baseQueryParams, enrollmentStatus: "ACTIVE", limit: 1 })
  const { data: suspendedRes } = useGetStudentsQuery({ ...baseQueryParams, enrollmentStatus: "SUSPENDED", limit: 1 })

  const students = response?.data?.data ?? []
  const meta = response?.data?.meta ?? { total: 0, totalPages: 1, page: 1, limit: 10 }
  const activeCount = activeRes?.data?.meta?.total ?? 0
  const suspendedCount = suspendedRes?.data?.meta?.total ?? 0

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

  return {
    searchQuery, setSearchQuery,

    selectedDept, handleDeptChange,
    selectedProgram, handleProgramChange,
    selectedSemester, handleSemesterChange,
    selectedSession, handleSessionChange,
    departments, programs, sessions, semesters,

    page, setPage,

    students, meta, activeCount, suspendedCount, isLoading, isFetching,
  }
}
