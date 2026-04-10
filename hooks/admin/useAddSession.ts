import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { useCreateSessionMutation } from "@/store/api/admin/sessionsApi"

const addSessionSchema = z
  .object({
    name: z.string().min(4, "Session name required (e.g. 2024-2028)").max(20),
    startYear: z.number().int().min(2000).max(2100),
    endYear: z.number().int().min(2000).max(2100),
    isCurrent: z.boolean(),
  })
  .refine((d) => d.endYear > d.startYear, {
    message: "End year must be after start year",
    path: ["endYear"],
  })

export type AddSessionFormValues = z.infer<typeof addSessionSchema>

export function useAddSession(onSuccess?: () => void) {
  const form = useForm<AddSessionFormValues>({
    resolver: zodResolver(addSessionSchema),
    defaultValues: {
      name: "",
      startYear: new Date().getFullYear(),
      endYear: new Date().getFullYear() + 4,
      isCurrent: false,
    },
  })

  const [createSession, { isLoading }] = useCreateSessionMutation()

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await createSession(data).unwrap()
      toast.success("Session created successfully")
      form.reset()
      onSuccess?.()
    } catch (err: unknown) {
      const error = err as { data?: { error?: { fields?: Record<string, string[]> } } }
      const fields = error?.data?.error?.fields
      if (fields) {
        Object.entries(fields).forEach(([key, messages]) => {
          form.setError(key as keyof AddSessionFormValues, { message: messages[0] })
        })
      }
    }
  })

  return { form, onSubmit, isLoading }
}
