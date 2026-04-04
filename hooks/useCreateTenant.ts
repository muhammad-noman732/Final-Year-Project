import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v4"
import { useOnboardTenantMutation } from "@/store/api/tenant/tenantApi"
import { useRouter } from "next/navigation"

const createTenantFormSchema = z.object({
  universityName: z.string().min(3, "Must be at least 3 characters"),
  shortName: z.string().min(2, "Required (e.g. GCUF)"),
  domain: z.string().optional(),
  adminName: z.string().min(2, "Required"),
  adminEmail: z.string().email("Invalid email address"),
})

export type CreateTenantFormValues = z.infer<typeof createTenantFormSchema>

export function useCreateTenant() {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Notice we now use the powerful RTK Query hook!
  const [onboardTenant, { isLoading }] = useOnboardTenantMutation()
  const router = useRouter()

  const form = useForm<CreateTenantFormValues>({
    resolver: zodResolver(createTenantFormSchema),
    defaultValues: {
      universityName: "", shortName: "", domain: "", adminName: "", adminEmail: "",
    }
  })

  const onSubmit = async (data: CreateTenantFormValues) => {
    setError(null)
    try {
      // RTK Query calls the API and unwraps the success payload (or throws automatically)
      await onboardTenant(data).unwrap()

      setOpen(false)
      form.reset()
      router.refresh() // Soft refresh server components to get newest DB updates
    } catch (err: any) {
      setError(err.data?.error?.message || err.message || "Failed to provision university")
    }
  }

  return { open, setOpen, loading: isLoading, error, form, onSubmit: form.handleSubmit(onSubmit) }
}
