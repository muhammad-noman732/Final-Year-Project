"use client"

import { Download, Filter, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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


const semesterOptions = Array.from({ length: 12 }, (_, index) => ({
  id: String(index + 1),
  label: `Semester ${index + 1}`,
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
      <SelectTrigger className="h-9 min-w-[150px] border-white/[0.06] bg-white/[0.02] text-xs text-slate-300">
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent className="border-white/[0.08] bg-[#0d1321] text-slate-200">
        {props.includeAllOption !== false ? <SelectItem value="all">All</SelectItem> : null}
        {props.options.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {option.label}
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
    <div className="rounded-2xl border border-white/[0.05] bg-[#0a0e1a] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gold-400" />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            VC Filters
          </p>
        </div>
        <div className="flex items-center gap-2">
          {onExport ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs text-muted-foreground hover:text-emerald-400"
              onClick={onExport}
            >
              <Download className="mr-1 h-3.5 w-3.5" />
              Export CSV
            </Button>
          ) : null}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs text-muted-foreground hover:text-gold-400"
            onClick={onReset}
          >
            <RotateCcw className="mr-1 h-3.5 w-3.5" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <SelectField
          value={filters.departmentId || "all"}
          placeholder="Department"
          options={departments}
          onValueChange={(value) => onChange("departmentId", value === "all" ? "" : value)}
        />
        <SelectField
          value={filters.programId || "all"}
          placeholder="Program"
          options={programs}
          onValueChange={(value) => onChange("programId", value === "all" ? "" : value)}
        />
        <SelectField
          value={filters.sessionId || "all"}
          placeholder="Session"
          options={sessions}
          onValueChange={(value) => onChange("sessionId", value === "all" ? "" : value)}
        />
        <SelectField
          value={filters.semester || "all"}
          placeholder="Semester"
          options={semesterOptions}
          onValueChange={(value) => onChange("semester", value === "all" ? "" : value)}
        />
        {showFeeStatus ? (
          <SelectField
            value={filters.feeStatus}
            placeholder="Fee Status"
            options={feeStatusOptions}
            includeAllOption={false}
            onValueChange={(value) => onChange("feeStatus", value)}
          />
        ) : (
          <div className="rounded-md border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs text-muted-foreground">
            Fee status follows selected tracking tab
          </div>
        )}
        <SelectField
          value={filters.range}
          placeholder="Range"
          options={rangeOptions}
          includeAllOption={false}
          onValueChange={(value) => onChange("range", value)}
        />
        {showSearch ? (
          <Input
            value={filters.search}
            onChange={(event) => onChange("search", event.target.value)}
            placeholder="Search student / roll no / email"
            className="h-9 border-white/[0.06] bg-white/[0.02] text-xs"
          />
        ) : (
          <div />
        )}
        {filters.range === "custom" ? (
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="date"
              value={filters.from}
              onChange={(event) => onChange("from", event.target.value)}
              className="h-9 border-white/[0.06] bg-white/[0.02] text-xs"
            />
            <Input
              type="date"
              value={filters.to}
              onChange={(event) => onChange("to", event.target.value)}
              className="h-9 border-white/[0.06] bg-white/[0.02] text-xs"
            />
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
