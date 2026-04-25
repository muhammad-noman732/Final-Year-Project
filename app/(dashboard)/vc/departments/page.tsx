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
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
            <Building2 className="h-4 w-4 text-violet-400" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Department Overview</h1>
        </div>
        <p className="text-sm text-muted-foreground ml-10">
          Payment collection performance across all academic departments.
        </p>
      </div>

      <Skeleton name="vc-dashboard-panels" loading={isLoading && !dashboard}>
        {dashboard ? (
          <VCDepartmentPage departments={dashboard.departmentPerformance} />
        ) : (
          <div className="rounded-xl border border-white/[0.05] bg-navy-900 px-5 py-12 text-sm text-muted-foreground text-center">
            No department data available.
          </div>
        )}
      </Skeleton>
    </div>
  )
}
