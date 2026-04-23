"use client"

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatFullCurrency } from "@/config/constants"
import type {
  VCAnalyticsData,
  VCDepartmentPerformance,
} from "@/types/client/store/vc.store.types"

function TooltipCard(props: {
  active?: boolean
  payload?: Array<{ value: number; name: string; color?: string }>
  label?: string
}) {
  if (!props.active || !props.payload?.length) return null

  return (
    <div className="rounded-xl border border-gold-500/10 bg-[#0d1321] px-3 py-2 text-xs">
      {props.label ? <p className="mb-1 text-gold-400">{props.label}</p> : null}
      {props.payload.map((entry) => (
        <p key={`${entry.name}-${entry.color}`} className="text-foreground">
          {entry.name}: {entry.value > 999 ? formatFullCurrency(entry.value) : entry.value}
        </p>
      ))}
    </div>
  )
}

function departmentChartData(departments: VCDepartmentPerformance[]) {
  return departments.map((department) => ({
    name: department.departmentCode,
    paid: department.paidStudents,
    defaulters: department.defaulters,
    collected: department.collectedAmount,
  }))
}

export default function VCAnalyticsPanels({
  data,
  onDepartmentSelect,
  onSemesterSelect,
}: {
  data: VCAnalyticsData
  onDepartmentSelect?: (departmentId: string) => void
  onSemesterSelect?: (semester: number) => void
}) {
  const chartData = departmentChartData(data.departmentPerformance)

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <Card className="border-white/[0.05] bg-[#0a0e1a] p-5 xl:col-span-2">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Collection Timeline</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data.collectionTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="label" tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${Math.round(value / 1000)}K`} />
            <Tooltip content={<TooltipCard />} />
            <Line type="monotone" dataKey="amount" name="Collected" stroke="#d4a843" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="border-white/[0.05] bg-[#0a0e1a] p-5">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Department Comparison</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} />
            <Tooltip content={<TooltipCard />} />
            <Bar dataKey="paid" name="Paid" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="defaulters" name="Defaulters" fill="#f43f5e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        {onDepartmentSelect ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {data.departmentPerformance.map((department) => (
              <Button
                key={department.departmentId}
                type="button"
                size="sm"
                variant="outline"
                className="h-7 border-white/[0.08] bg-transparent px-2 text-[11px]"
                onClick={() => onDepartmentSelect(department.departmentId)}
              >
                {department.departmentCode}
              </Button>
            ))}
          </div>
        ) : null}
      </Card>

      <Card className="border-white/[0.05] bg-[#0a0e1a] p-5">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Semester Collections</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data.semesterBreakdown}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="semester" tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${Math.round(value / 1000)}K`} />
            <Tooltip content={<TooltipCard />} />
            <Bar dataKey="paidAmount" name="Paid" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            <Bar dataKey="unpaidAmount" name="Outstanding" fill="#d4a843" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        {onSemesterSelect ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {data.semesterBreakdown.map((semester) => (
              <Button
                key={semester.semester}
                type="button"
                size="sm"
                variant="outline"
                className="h-7 border-white/[0.08] bg-transparent px-2 text-[11px]"
                onClick={() => onSemesterSelect(semester.semester)}
              >
                Sem {semester.semester}
              </Button>
            ))}
          </div>
        ) : null}
      </Card>

      {/* Month comparison removed from Analytics as requested */}

      <Card className="border-white/[0.05] bg-[#0a0e1a] p-5 xl:col-span-2">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Department Finance Summary</h3>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {data.departmentPerformance.map((department) => (
            <div
              key={department.departmentId}
              className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4"
            >
              <p className="text-sm font-semibold text-foreground">{department.departmentName}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {department.departmentCode}
              </p>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Collected</span>
                  <span className="text-emerald-400">{formatCurrency(department.collectedAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Outstanding</span>
                  <span className="text-gold-400">{formatCurrency(department.outstandingAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rate</span>
                  <span className="text-foreground">{department.paymentRate}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
