"use client"

import { Skeleton } from "boneyard-js/react"
import { Building2, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react"
import { useGetVCDashboardQuery } from "@/store/api/vc/vcApi"
import { buildVCQuery, defaultVCFilters } from "@/components/vc/vcFilters"
import VCDepartmentPage from "@/components/vc/VCDepartmentPage"

export default function VCDepartmentsPage() {
  const query = buildVCQuery(defaultVCFilters)
  const { data, isLoading } = useGetVCDashboardQuery(query, {
    refetchOnMountOrArgChange: true,
  })
  const dashboard = data?.data

  return (
    <div className="space-y-6 pb-8 p-5 lg:p-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
            <Building2 className="h-4 w-4 text-violet-400" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#0F172A] dark:text-foreground">Department Overview</h1>
        </div>
        <p className="text-sm font-medium text-slate-500 dark:text-muted-foreground ml-10">
          Payment collection performance across all academic departments.
        </p>
      </div>

      <Skeleton name="vc-dashboard-panels" loading={isLoading && !dashboard}>
        {dashboard ? (
          <VCDepartmentPage departments={dashboard.departmentPerformance} />
        ) : (
          <div className="rounded-xl border border-white/60 dark:border-white/[0.05] bg-white/40 dark:bg-[#080c18] backdrop-blur-md px-5 py-12 text-sm font-medium text-slate-500 dark:text-muted-foreground text-center shadow-sm dark:shadow-none">
            No department data available.
          </div>
        )}
      </Skeleton>
    </div>
  )
}
