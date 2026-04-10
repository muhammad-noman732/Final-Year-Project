import { toast } from "sonner"
import { useDeactivateUserMutation } from "@/store/api/admin/usersApi"

export function useDeleteUser() {
  const [deactivateUser, { isLoading }] = useDeactivateUserMutation()

  const handleDelete = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to deactivate ${userName}?`)) return

    try {
      await deactivateUser(userId).unwrap()
      toast.success(`${userName} has been deactivated`)
    } catch {
      // RTK error middleware handles API error toasts
    }
  }

  return { handleDelete, isDeleting: isLoading }
}
