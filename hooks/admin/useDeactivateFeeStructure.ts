import { toast } from "sonner"
import { useDeleteFeeStructureMutation } from "@/store/api/admin/feeStructuresApi"

export function useDeactivateFeeStructure() {
  const [deleteFeeStructure, { isLoading }] = useDeleteFeeStructureMutation()

  const handleDeactivate = async (feeStructureId: string, label: string) => {
    try {
      await deleteFeeStructure(feeStructureId).unwrap()
      toast.success(`"${label}" has been deleted`, {
        description: "All unpaid fee assignments have been removed.",
      })
    } catch {
      // RTK error middleware handles API error toasts
    }
  }

  return { handleDeactivate, isDeactivating: isLoading }
}
