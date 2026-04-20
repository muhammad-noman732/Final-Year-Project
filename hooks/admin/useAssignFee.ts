"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useAssignFeeStructureMutation } from "@/store/api/admin/feeAssignmentApi"
import type { UseAssignFeeReturn } from "@/types/client/ui/fee.ui.types"

export function useAssignFee(): UseAssignFeeReturn {
  const [assignFeeStructure, { isLoading }] = useAssignFeeStructureMutation()
  const [lastResult, setLastResult] = useState<{ assigned: number; skipped: number } | null>(null)

  const assignAll = async (feeStructureId: string): Promise<void> => {
    try {
      const result = await assignFeeStructure({ feeStructureId }).unwrap()
      setLastResult(result)

      if (result.assigned === 0) {
        toast.info("No new students to assign", {
          description: `${result.skipped} student(s) were already assigned.`,
        })
      } else {
        toast.success(`Fee assigned to ${result.assigned} student(s)`, {
          description: result.skipped > 0
            ? `${result.skipped} student(s) were already assigned and skipped.`
            : "All eligible students have been assigned successfully.",
        })
      }
    } catch (err: unknown) {
      const error = err as { data?: { error?: { message?: string } } }
      toast.error("Assignment failed", {
        description: error?.data?.error?.message ?? "An unexpected error occurred.",
      })
    }
  }

  return { assignAll, isAssigning: isLoading, lastResult }
}
