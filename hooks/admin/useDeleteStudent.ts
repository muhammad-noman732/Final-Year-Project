import { toast } from "sonner"
import { useDeactivateStudentMutation } from "@/store/api/admin/studentsApi"

export function useDeleteStudent() {
  const [deactivateStudent, { isLoading }] = useDeactivateStudentMutation()

  const handleDelete = async (studentId: string, studentName: string) => {

    try {
      await deactivateStudent(studentId).unwrap()
      toast.success(`${studentName} has been suspended`, {
        description: "The student can be reactivated at any time from the edit panel.",
      })
    } catch {
      // RTK error middleware handles API error toasts
    }
  }

  return { handleDelete, isDeleting: isLoading }
}
