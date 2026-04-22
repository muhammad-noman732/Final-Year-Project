import { toast } from "sonner"
import { useUpdateFeeStructureMutation } from "@/store/api/admin/feeStructuresApi"

export function useDeactivateFeeStructure() {
  const [updateFeeStructure, { isLoading }] = useUpdateFeeStructureMutation()

  const handleDeactivate = async (feeStructureId: string, label: string) => {

    try {
      await updateFeeStructure({
        id: feeStructureId,
        body: { isActive: false },
      }).unwrap()
      toast.success(`"${label}" has been deactivated`, {
        description: "This fee structure can be reactivated at any time.",
      })
    } catch {
      // RTK error middleware handles API error toasts
    }
  }

  return { handleDeactivate, isDeactivating: isLoading }
}
