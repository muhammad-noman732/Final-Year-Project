"use client"

import { Filter, RotateCcw, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import type { VCFeeStatus, VCTimeRange } from "@/types/client/store/vc.store.types"
import type { VCFilterState, VCSelectOption } from "@/types/client/ui/vc.ui.types"

export type { VCFilterState, VCSelectOption }

interface VCFilterBarProps {
  filters: VCFilterState
  departments: VCSelectOption[]
  programs: VCSelectOption[]
  sessions: VCSelectOption[]
  onChange: (key: keyof VCFilterState, value: string) => void
  onReset: () => void
  onExport?: () => void
  showFeeStatus?: boolean
  showSearch?: boolean
}

const semesterOptions = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  label: `Semester ${i + 1}`,
}))

const feeStatusOptions: Array<{ id: VCFeeStatus; label: string }> = [
  { id: "ALL", label: "All Statuses" },
  { id: "PAID", label: "Paid" },
  { id: "UNPAID", label: "Unpaid" },
  { id: "PARTIAL", label: "Partial" },
  { id: "OVERDUE", label: "Defaulters" },
  { id: "WAIVED", label: "Waived" },
]

const rangeOptions: Array<{ id: VCTimeRange; label: string }> = [
  { id: "today", label: "Today" },
  { id: "7d", label: "Last 7 Days" },
  { id: "30d", label: "Last 30 Days" },
  { id: "90d", label: "Last 90 Days" },
  { id: "custom", label: "Custom Range" },
]

function SelectField(props: {
  value: string
  placeholder: string
  options: VCSelectOption[]
  includeAllOption?: boolean
  onValueChange: (value: string) => void
}) {
  return (
    <Select value={props.value} onValueChange={props.onValueChange}>
      <SelectTrigger className="h-8 border-white/[0.07] bg-white/[0.03] text-xs text-slate-300 focus:ring-gold-500/30">
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent className="border-white/[0.08] bg-navy-800 text-slate-200">
        {props.includeAllOption !== false && (
          <SelectItem value="all" className="text-xs">All</SelectItem>
        )}
        {props.options.map((opt) => (
          <SelectItem key={opt.id} value={opt.id} className="text-xs">
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default function VCFilterBar({
  filters,
  departments,
  programs,
  sessions,
  onChange,
  onReset,
  onExport,
  showFeeStatus = true,
  showSearch = true,
}: VCFilterBarProps) {
  return (
    <div className="rounded-xl border border-white/[0.05] bg-navy-900 p-4">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-gold-400" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Filters
          </span>
        </div>
        <div className="flex items-center gap-1">
          {onExport && (
            <Button
              type="button" variant="ghost" size="sm"
              className="h-7 px-2.5 text-[11px] text-muted-foreground hover:text-emerald-400"
              onClick={onExport}
            >
              <Download className="mr-1.5 h-3 w-3" />
              Export
            </Button>
          )}
          <Button
            type="button" variant="ghost" size="sm"
            className="h-7 px-2.5 text-[11px] text-muted-foreground hover:text-gold-400"
            onClick={onReset}
          >
            <RotateCcw className="mr-1.5 h-3 w-3" />
            Reset
          </Button>
        </div>
      </div>

      <Separator className="bg-white/[0.04] mb-3" />

      {/* Filters grid */}
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        <SelectField
          value={filters.departmentId || "all"}
          placeholder="Department"
          options={departments}
          onValueChange={(v) => onChange("departmentId", v === "all" ? "" : v)}
        />
        <SelectField
          value={filters.programId || "all"}
          placeholder="Program"
          options={programs}
          onValueChange={(v) => onChange("programId", v === "all" ? "" : v)}
        />
        <SelectField
          value={filters.sessionId || "all"}
          placeholder="Session"
          options={sessions}
          onValueChange={(v) => onChange("sessionId", v === "all" ? "" : v)}
        />
        <SelectField
          value={filters.semester || "all"}
          placeholder="Semester"
          options={semesterOptions}
          onValueChange={(v) => onChange("semester", v === "all" ? "" : v)}
        />
        {showFeeStatus ? (
          <SelectField
            value={filters.feeStatus}
            placeholder="Status"
            options={feeStatusOptions}
            includeAllOption={false}
            onValueChange={(v) => onChange("feeStatus", v)}
          />
        ) : (
          <div className="flex items-center rounded-md border border-white/[0.05] bg-white/[0.02] px-2.5 py-1.5">
            <span className="text-[11px] text-muted-foreground">Status from tab</span>
          </div>
        )}
        <SelectField
          value={filters.range}
          placeholder="Range"
          options={rangeOptions}
          includeAllOption={false}
          onValueChange={(v) => onChange("range", v)}
        />
      </div>

      {/* Optional rows */}
      {showSearch && (
        <div className="mt-2">
          <Input
            value={filters.search}
            onChange={(e) => onChange("search", e.target.value)}
            placeholder="Search student, roll number, or email..."
            className="h-8 border-white/[0.07] bg-white/[0.03] text-xs placeholder:text-muted-foreground/50"
          />
        </div>
      )}
      {filters.range === "custom" && (
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Input
            type="date"
            value={filters.from}
            onChange={(e) => onChange("from", e.target.value)}
            className="h-8 border-white/[0.07] bg-white/[0.03] text-xs"
          />
          <Input
            type="date"
            value={filters.to}
            onChange={(e) => onChange("to", e.target.value)}
            className="h-8 border-white/[0.07] bg-white/[0.03] text-xs"
          />
        </div>
      )}
    </div>
  )
}
