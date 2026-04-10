import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { useCreateDepartmentMutation } from "@/store/api/admin/departmentsApi"

const addDepartmentSchema = z.object({
  name: z.string().min(3, "Department name must be at least 3 characters").max(100),
  code: z
    .string()
    .min(3, "Code must be at least 3 characters")
    .max(10)
    .regex(/^[A-Za-z0-9]+$/, "Code must be alphanumeric only"),
})

export type AddDepartmentFormValues = z.infer<typeof addDepartmentSchema>

export function useAddDepartment(onSuccess?: () => void) {
  const form = useForm<AddDepartmentFormValues>({
    resolver: zodResolver(addDepartmentSchema),
    defaultValues: { name: "", code: "" },
  })

  const [createDepartment, { isLoading }] = useCreateDepartmentMutation()

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await createDepartment(data).unwrap()
      toast.success("Department created successfully")
      form.reset()
      onSuccess?.()
    } catch (err: unknown) {
      const error = err as { data?: { error?: { fields?: Record<string, string[]> } } }
      const fields = error?.data?.error?.fields
      if (fields) {
        Object.entries(fields).forEach(([key, messages]) => {
          form.setError(key as keyof AddDepartmentFormValues, { message: messages[0] })
        })
      }
    }
  })

  return { form, onSubmit, isLoading }
}
