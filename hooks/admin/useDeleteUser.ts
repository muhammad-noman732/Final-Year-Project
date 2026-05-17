import { toast } from "sonner"
import { useDeactivateUserMutation } from "@/store/api/admin/usersApi"

export function useDeleteUser() {
  const [deactivateUser, { isLoading }] = useDeactivateUserMutation()

  const handleDelete = async (userId: string, userName: string) => {
    try {
      await deactivateUser(userId).unwrap()
      toast.success(`${userName} has been deactivated`)
    } catch {
    }
  }

  return { handleDelete, isDeleting: isLoading }
}
