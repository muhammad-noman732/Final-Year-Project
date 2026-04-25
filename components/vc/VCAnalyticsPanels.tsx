"use client"

import {
  Bar, BarChart, CartesianGrid, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts"
import { TrendingUp, BarChart2, BookOpen } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { formatCurrency, formatFullCurrency } from "@/config/constants"
import type {
  VCAnalyticsData,
  VCDepartmentPerformance,
} from "@/types/client/store/vc.store.types"

function ChartTooltip(props: {
  active?: boolean
  payload?: Array<{ value: number; name: string; color?: string }>
  label?: string
}) {
  if (!props.active || !props.payload?.length) return null
  return (
    <div className="rounded-lg border border-white/[0.08] bg-navy-800 px-3 py-2 text-xs shadow-xl">
      {props.label ? <p className="mb-1.5 font-semibold text-foreground">{props.label}</p> : null}
      {props.payload.map((entry) => (
        <div key={`${entry.name}-${entry.color}`} className="flex items-center gap-2 text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: entry.color }} />
          <span>{entry.name}:</span>
          <span className="text-foreground font-medium">
            {entry.value > 999 ? formatFullCurrency(entry.value) : entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

function PanelHeader({
  icon: Icon,
  iconClass,
  title,
}: {
  icon: typeof TrendingUp
  iconClass: string
  title: string
}) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${iconClass}`}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
    </div>
  )
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
  const deptChartData = data.departmentPerformance.map((d) => ({
    name: d.departmentCode,
    paid: d.paidStudents,
    defaulters: d.defaulters,
  }))

  return (
    <div className="space-y-4">
      {/* Collection Timeline — full width */}
      <div className="rounded-xl border border-white/[0.05] bg-navy-900 p-5">
        <PanelHeader icon={TrendingUp} iconClass="bg-gold-500/10 text-gold-400" title="Collection Timeline" />
        {data.collectionTrend.length > 0 ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data.collectionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="label" tick={{ fill: "#6b7a99", fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis
                tick={{ fill: "#6b7a99", fontSize: 10 }} tickLine={false} axisLine={false}
                tickFormatter={(v) => `${Math.round(v / 1000)}K`}
              />
              <Tooltip content={<ChartTooltip />} />
              <Line
                type="monotone" dataKey="amount" name="Collected"
                stroke="#d4a843" strokeWidth={2} dot={false}
                activeDot={{ r: 4, fill: "#d4a843" }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-40 items-center justify-center">
            <p className="text-xs text-muted-foreground">No timeline data for selected range.</p>
          </div>
        )}
      </div>

      {/* Two-column: Department Comparison + Semester Collections */}
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-xl border border-white/[0.05] bg-navy-900 p-5">
          <PanelHeader icon={BarChart2} iconClass="bg-violet-500/10 text-violet-400" title="Department Comparison" />
          <div className="mb-3 flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-emerald-500" />Paid</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-rose-500" />Defaulters</span>
          </div>
          {deptChartData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={deptChartData} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "#6b7a99", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "#6b7a99", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                  <Bar dataKey="paid" name="Paid" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="defaulters" name="Defaulters" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              {onDepartmentSelect && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {data.departmentPerformance.map((d) => (
                    <button
                      key={d.departmentId} type="button"
                      onClick={() => onDepartmentSelect(d.departmentId)}
                      className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-gold-500/25 hover:text-gold-300"
                    >
                      {d.departmentCode}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex h-40 items-center justify-center">
              <p className="text-xs text-muted-foreground">No department data.</p>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-white/[0.05] bg-navy-900 p-5">
          <PanelHeader icon={BookOpen} iconClass="bg-sky-500/10 text-sky-400" title="Semester Collections" />
          <div className="mb-3 flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-sky-500" />Paid</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-gold-500" />Outstanding</span>
          </div>
          {data.semesterBreakdown.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data.semesterBreakdown} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="semester" tick={{ fill: "#6b7a99", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis
                    tick={{ fill: "#6b7a99", fontSize: 10 }} tickLine={false} axisLine={false}
                    tickFormatter={(v) => `${Math.round(v / 1000)}K`}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                  <Bar dataKey="paidAmount" name="Paid" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="unpaidAmount" name="Outstanding" fill="#d4a843" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              {onSemesterSelect && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {data.semesterBreakdown.map((s) => (
                    <button
                      key={s.semester} type="button"
                      onClick={() => onSemesterSelect(s.semester)}
                      className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-gold-500/25 hover:text-gold-300"
                    >
                      Sem {s.semester}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex h-40 items-center justify-center">
              <p className="text-xs text-muted-foreground">No semester data.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
