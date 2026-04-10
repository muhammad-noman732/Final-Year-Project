import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { useCreateStudentMutation } from "@/store/api/admin/studentsApi"

const addStudentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9+\-\s()]{7,20}$/, "Invalid phone").optional().or(z.literal("")),
  cnic: z.string().regex(/^\d{5}-\d{7}-\d$/, "CNIC format: 12345-1234567-1").optional().or(z.literal("")),
  studentId: z.string().min(3, "Student roll number is required").max(30),
  departmentId: z.string().min(1, "Department is required"),
  programId: z.string().min(1, "Program is required"),
  sessionId: z.string().min(1, "Session is required"),
  currentSemester: z.number().int().min(1, "Min semester is 1").max(12, "Max semester is 12"),
})

export type AddStudentFormValues = z.infer<typeof addStudentSchema>

export function useAddStudent(onSuccess?: () => void) {
  const form = useForm<AddStudentFormValues>({
    resolver: zodResolver(addStudentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cnic: "",
      studentId: "",
      departmentId: "",
      programId: "",
      sessionId: "",
      currentSemester: 1,
    },
  })

  const [createStudent, { isLoading }] = useCreateStudentMutation()

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      // Strip empty optional strings before sending
      const payload = {
        ...data,
        phone: data.phone || undefined,
        cnic: data.cnic || undefined,
      }

      await createStudent(payload).unwrap()
      toast.success("Student created successfully")
      form.reset()
      onSuccess?.()
    } catch (err: unknown) {
      const error = err as { data?: { error?: { fields?: Record<string, string[]> } } }
      const fields = error?.data?.error?.fields
      if (fields) {
        Object.entries(fields).forEach(([key, messages]) => {
          form.setError(key as keyof AddStudentFormValues, { message: messages[0] })
        })
      }
    }
  })

  return { form, onSubmit, isLoading }
}
