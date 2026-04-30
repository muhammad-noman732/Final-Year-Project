"use client"

import { Skeleton } from "boneyard-js/react"
import { useHodDashboard } from "@/hooks/hod/useHodDashboard"
import HodStudentsTable from "@/components/hod/HodStudentsTable"
import type { HodPaginatedStudents } from "@/types/server/hod.types"

export default function HodStudentsClient({ initialData }: { initialData: HodPaginatedStudents }) {
  const {
    students, studentsMeta, isStudentsLoading, isStudentsFetching,
    filters, handleFilterChange, studentsPage, handlePageChange,
  } = useHodDashboard(null, { fetchDashboard: false, fetchStudents: true }, initialData)

  return (
    <div className="relative isolate min-h-[calc(100dvh-3.5rem)] p-5 lg:p-8 transition-colors duration-300" style={{ backgroundColor: "var(--hod-bg, #F4F6FA)" }}>
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none bg-gradient-to-br from-[#E2E8F0] via-[#F1F5F9] to-[#E2E8F0] dark:from-[#050811] dark:via-[#0A0E1A] dark:to-[#050811]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#b8c6e5] dark:bg-[#312e81] rounded-full blur-[100px] opacity-40 dark:opacity-20" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#f0e4c8] dark:bg-[#1e1b4b] rounded-full blur-[120px] opacity-40 dark:opacity-20" />
      </div>

      <div className="mb-6 text-left">
        <h1 className="text-xl font-bold tracking-tight text-[#0F172A] dark:text-slate-100 leading-none">
          Students Directory
        </h1>
        <p className="text-sm text-[#64748B] dark:text-slate-400 mt-1.5 leading-none">
          View all department students and their fee status
        </p>
      </div>

      <Skeleton name="hod-students-table" loading={isStudentsLoading && students.length === 0}>
        <HodStudentsTable
          students={students}
          meta={studentsMeta}
          isLoading={isStudentsLoading}
          isFetching={isStudentsFetching}
          filters={filters}
          page={studentsPage}
          onFilterChange={handleFilterChange}
          onPageChange={handlePageChange}
        />
      </Skeleton>
    </div>
  )
}
