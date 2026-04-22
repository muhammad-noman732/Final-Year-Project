import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { useUpdateFeeStructureMutation } from "@/store/api/admin/feeStructuresApi"
import type { FeeStructure } from "@/types/client/store/fee.store.types"

const updateFeeStructureSchema = z.object({
  tuitionFee: z.number().int().min(0),
  labFee: z.number().int().min(0),
  libraryFee: z.number().int().min(0),
  sportsFee: z.number().int().min(0),
  registrationFee: z.number().int().min(0),
  examinationFee: z.number().int().min(0),
  otherFee: z.number().int().min(0),
  dueDate: z.string().min(1, "Deadline is required"),
  lateFee: z.number().int().min(0),
  isActive: z.boolean(),
})

export type UpdateFeeStructureFormValues = z.infer<typeof updateFeeStructureSchema>

export function useUpdateFeeStructure(onSuccess?: () => void) {
  const [updateFeeStructure, { isLoading }] = useUpdateFeeStructureMutation()

  const form = useForm<UpdateFeeStructureFormValues>({
    resolver: zodResolver(updateFeeStructureSchema),
  })

  const populateForm = (fs: FeeStructure) => {
    form.reset({
      tuitionFee: fs.tuitionFee,
      labFee: fs.labFee,
      libraryFee: fs.libraryFee,
      sportsFee: fs.sportsFee,
      registrationFee: fs.registrationFee,
      examinationFee: fs.examinationFee,
      otherFee: fs.otherFee,
      dueDate: new Date(fs.dueDate).toISOString().split("T")[0],
      lateFee: fs.lateFee,
      isActive: fs.isActive,
    })
  }

  const computedTotal = (
    (form.watch("tuitionFee") || 0) +
    (form.watch("labFee") || 0) +
    (form.watch("libraryFee") || 0) +
    (form.watch("sportsFee") || 0) +
    (form.watch("registrationFee") || 0) +
    (form.watch("examinationFee") || 0) +
    (form.watch("otherFee") || 0)
  )

  const onSubmit = (feeStructureId: string) =>
    form.handleSubmit(async (data) => {
      try {
        const totalFee =
          data.tuitionFee + data.labFee + data.libraryFee +
          data.sportsFee + data.registrationFee + data.examinationFee + data.otherFee

        await updateFeeStructure({
          id: feeStructureId,
          body: {
            ...data,
            totalFee,
            dueDate: new Date(`${data.dueDate}T23:59:59.000Z`).toISOString(),
          },
        }).unwrap()

        toast.success("Fee structure updated successfully")
        onSuccess?.()
      } catch {
        // RTK error middleware handles API error toasts
      }
    })

  return { form, onSubmit, isLoading, populateForm, computedTotal }
}
