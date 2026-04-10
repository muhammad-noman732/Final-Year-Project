import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { useCreateProgramMutation } from "@/store/api/admin/programsApi"
import { useGetDepartmentsQuery } from "@/store/api/admin/departmentsApi"

const addProgramSchema = z.object({
  departmentId: z.string().min(1, "Department is required"),
  name: z.string().min(2, "Program name must be at least 2 characters").max(100),
  code: z
    .string()
    .min(2, "Code min 2 chars")
    .max(10)
    .regex(/^[A-Za-z0-9]+$/, "Code must be alphanumeric"),
  degreeType: z.enum(["BS", "MS", "MCS", "PhD", "BE", "MBA", "BBA"], {
    message: "Select a valid degree type",
  }),
  durationYears: z.number().int().min(1).max(6),
  totalSemesters: z.number().int().min(2).max(12),
})

export type AddProgramFormValues = z.infer<typeof addProgramSchema>

export function useAddProgram(onSuccess?: () => void) {
  const form = useForm<AddProgramFormValues>({
    resolver: zodResolver(addProgramSchema),
    defaultValues: {
      departmentId: "",
      name: "",
      code: "",
      degreeType: "BS",
      durationYears: 4,
      totalSemesters: 8,
    },
  })

  const { data: deptsRes } = useGetDepartmentsQuery({ limit: 100 })
  const departments = deptsRes?.data?.data ?? []

  const [createProgram, { isLoading }] = useCreateProgramMutation()

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await createProgram(data).unwrap()
      toast.success("Program created successfully")
      form.reset()
      onSuccess?.()
    } catch (err: unknown) {
      const error = err as { data?: { error?: { fields?: Record<string, string[]> } } }
      const fields = error?.data?.error?.fields
      if (fields) {
        Object.entries(fields).forEach(([key, messages]) => {
          form.setError(key as keyof AddProgramFormValues, { message: messages[0] })
        })
      }
    }
  })

  return { form, onSubmit, isLoading, departments }
}
