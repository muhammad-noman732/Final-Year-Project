import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { useCreateFeeStructureMutation } from "@/store/api/admin/feeStructuresApi"

const addFeeStructureSchema = z.object({
  programId: z.string().min(1, "Program is required"),
  semester: z.number().int().min(1).max(12),
  sessionYear: z.number().int().min(2000).max(2100),
  tuitionFee: z.number().int().min(0, "Amount must be positive"),
  labFee: z.number().int().min(0),
  libraryFee: z.number().int().min(0),
  sportsFee: z.number().int().min(0),
  registrationFee: z.number().int().min(0),
  examinationFee: z.number().int().min(0),
  otherFee: z.number().int().min(0),
  dueDate: z.string().min(1, "Due date is required"),
  lateFee: z.number().int().min(0),
})

export type AddFeeStructureFormValues = z.infer<typeof addFeeStructureSchema>

export function useAddFeeStructure(onSuccess?: () => void) {
  const form = useForm<AddFeeStructureFormValues>({
    resolver: zodResolver(addFeeStructureSchema),
    defaultValues: {
      programId: "",
      semester: 1,
      sessionYear: new Date().getFullYear(),
      tuitionFee: 0,
      labFee: 0,
      libraryFee: 0,
      sportsFee: 0,
      registrationFee: 0,
      examinationFee: 0,
      otherFee: 0,
      dueDate: "",
      lateFee: 0,
    },
  })

  const [createFeeStructure, { isLoading }] = useCreateFeeStructureMutation()

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      // Auto compute total fee
      const totalFee = 
        data.tuitionFee + 
        data.labFee + 
        data.libraryFee + 
        data.sportsFee + 
        data.registrationFee + 
        data.examinationFee + 
        data.otherFee;

      // Transform dueDate to ISO string (as expected by backend API payload type)
      // Assuming dueDate from standard <input type="date"> is "YYYY-MM-DD"
      // We append a basic time to ensure valid ISO
      const isoDueDate = new Date(`${data.dueDate}T23:59:59Z`).toISOString()

      await createFeeStructure({
        ...data,
        totalFee,
        dueDate: isoDueDate,
      }).unwrap()

      toast.success("Fee structure created successfully")
      form.reset()
      onSuccess?.()
    } catch (err: unknown) {
      const error = err as { data?: { error?: { fields?: Record<string, string[]>, message?: string } } }
      const fields = error?.data?.error?.fields
      if (fields) {
        Object.entries(fields).forEach(([key, messages]) => {
          form.setError(key as keyof AddFeeStructureFormValues, { message: messages[0] })
        })
      } else if (error?.data?.error?.message) {
         toast.error(error.data.error.message)
      } else {
         toast.error("Failed to create fee structure")
      }
    }
  })

  // Watch values for live cost computation preview
  const tuitionFee = form.watch("tuitionFee") || 0
  const labFee = form.watch("labFee") || 0
  const libraryFee = form.watch("libraryFee") || 0
  const sportsFee = form.watch("sportsFee") || 0
  const registrationFee = form.watch("registrationFee") || 0
  const examinationFee = form.watch("examinationFee") || 0
  const otherFee = form.watch("otherFee") || 0

  const computedTotal = 
    tuitionFee + 
    labFee + 
    libraryFee + 
    sportsFee + 
    registrationFee + 
    examinationFee + 
    otherFee

  return { form, onSubmit, isLoading, computedTotal }
}
