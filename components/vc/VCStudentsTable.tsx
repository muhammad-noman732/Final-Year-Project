"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import EmptyState from "@/components/shared/EmptyState"
import StatusBadge from "@/components/shared/StatusBadge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatFullCurrency } from "@/config/constants"
import type { VCPaginatedStudents } from "@/types/client/store/vc.store.types"

interface VCStudentsTableProps {
  data?: VCPaginatedStudents
  isLoading: boolean
  onPageChange: (page: number) => void
}

export default function VCStudentsTable({
  data,
  isLoading,
  onPageChange,
}: VCStudentsTableProps) {
  const rows = data?.data ?? []
  const meta = data?.meta

  return (
    <Card className="overflow-hidden border-white/[0.05] bg-[#0a0e1a]">
      <div className="border-b border-white/[0.04] px-5 py-4">
        <h3 className="text-sm font-semibold text-foreground">Paid / Defaulter Students</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Filter by department, session, semester, and status to inspect current fee positions.
        </p>
      </div>

      {isLoading && rows.length === 0 ? (
        <div className="px-5 py-10 text-sm text-muted-foreground">Loading student ledger...</div>
      ) : rows.length === 0 ? (
        <EmptyState
          icon="users"
          title="No students found"
          description="Adjust the filters to broaden the VC dashboard results."
        />
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/[0.05] hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Roll No</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount Due</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Outstanding</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.assignmentId} className="border-white/[0.05] hover:bg-white/[0.02]">
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium text-foreground">{row.studentName}</p>
                      <p className="text-[11px] text-muted-foreground">{row.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{row.rollNumber}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {row.departmentCode}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{row.programName}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{row.semester}</TableCell>
                  <TableCell>
                    <StatusBadge status={row.feeStatus.toLowerCase()} />
                  </TableCell>
                  <TableCell className="text-xs text-foreground">
                    {formatFullCurrency(row.amountDue)}
                  </TableCell>
                  <TableCell className="text-xs text-emerald-400">
                    {formatFullCurrency(row.amountPaid)}
                  </TableCell>
                  <TableCell className="text-xs text-gold-400">
                    {formatFullCurrency(row.outstandingAmount)}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    <div>
                      <p>{new Date(row.dueDate).toLocaleDateString()}</p>
                      {row.daysOverdue > 0 ? (
                        <p className="text-rose-400">{row.daysOverdue} days overdue</p>
                      ) : null}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {meta ? (
        <div className="flex items-center justify-between border-t border-white/[0.04] px-5 py-4">
          <p className="text-xs text-muted-foreground">
            Page {meta.page} of {meta.totalPages} · {meta.total} records
          </p>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 border-white/[0.06] bg-transparent text-xs"
              disabled={meta.page <= 1}
              onClick={() => onPageChange(meta.page - 1)}
            >
              <ChevronLeft className="mr-1 h-3.5 w-3.5" />
              Prev
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 border-white/[0.06] bg-transparent text-xs"
              disabled={meta.page >= meta.totalPages}
              onClick={() => onPageChange(meta.page + 1)}
            >
              Next
              <ChevronRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      ) : null}
    </Card>
  )
}
