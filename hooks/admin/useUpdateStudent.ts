import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { useUpdateStudentMutation } from "@/store/api/admin/studentsApi"
import type { Student } from "@/types/client/store/student.store.types"

const updateStudentSchema = z.object({
  currentSemester: z.number().int().min(1).max(12),
  enrollmentStatus: z.enum(["ACTIVE", "SUSPENDED", "GRADUATED", "WITHDRAWN"]),
  cnic: z.string().regex(/^\d{5}-\d{7}-\d$/, "CNIC format: 12345-1234567-1").optional().or(z.literal("")),
  phone: z.string().regex(/^[0-9+\-\s()]{7,20}$/, "Invalid phone").optional().or(z.literal("")),
})

export type UpdateStudentFormValues = z.infer<typeof updateStudentSchema>

export function useUpdateStudent(onSuccess?: () => void) {
  const [updateStudent, { isLoading }] = useUpdateStudentMutation()

  const form = useForm<UpdateStudentFormValues>({
    resolver: zodResolver(updateStudentSchema),
  })

  const populateForm = (student: Student) => {
    form.reset({
      currentSemester: student.currentSemester,
      enrollmentStatus: student.enrollmentStatus,
      cnic: student.cnic ?? "",
      phone: student.user.phone ?? "",
    })
  }

  const onSubmit = (studentId: string) =>
    form.handleSubmit(async (data) => {
      try {
        const payload = {
          ...data,
          cnic: data.cnic || undefined,
          phone: data.phone || undefined,
        }
        await updateStudent({ id: studentId, body: payload }).unwrap()
        toast.success("Student updated successfully")
        onSuccess?.()
      } catch {
        // RTK error middleware handles API error toasts
      }
    })

  return { form, onSubmit, isLoading, populateForm }
}
