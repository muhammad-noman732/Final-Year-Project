import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { useCreateUserMutation } from "@/store/api/admin/usersApi"
import { useGetDepartmentsQuery } from "@/store/api/admin/departmentsApi"

const addUserSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^[0-9+\-\s()]{7,20}$/, "Invalid phone").optional().or(z.literal("")),
    role: z.enum(["VC", "HOD"], { message: "Role must be VC or HOD" }),
    hodDepartmentId: z.string().optional(),
  })
  .refine((d) => d.role !== "HOD" || (d.hodDepartmentId && d.hodDepartmentId.length > 0), {
    message: "HOD must be assigned to a department",
    path: ["hodDepartmentId"],
  })

export type AddUserFormValues = z.infer<typeof addUserSchema>

export function useAddUser(onSuccess?: () => void) {
  const form = useForm<AddUserFormValues>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "VC",
      hodDepartmentId: "",
    },
  })

  // Departments for HOD assignment
  const { data: deptsRes } = useGetDepartmentsQuery({ limit: 100 })
  const departments = deptsRes?.data?.data ?? []

  const [createUser, { isLoading }] = useCreateUserMutation()

  const watchRole = form.watch("role")

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        role: data.role,
        hodDepartmentId: data.role === "HOD" ? data.hodDepartmentId : undefined,
      }

      await createUser(payload).unwrap()
      toast.success("Staff account created successfully")
      form.reset()
      onSuccess?.()
    } catch (err: unknown) {
      const error = err as { data?: { error?: { fields?: Record<string, string[]> } } }
      const fields = error?.data?.error?.fields
      if (fields) {
        Object.entries(fields).forEach(([key, messages]) => {
          form.setError(key as keyof AddUserFormValues, { message: messages[0] })
        })
      }
    }
  })

  return { form, onSubmit, isLoading, watchRole, departments }
}
