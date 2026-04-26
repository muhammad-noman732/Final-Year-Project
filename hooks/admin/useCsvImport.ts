"use client"

import { useState, useCallback } from "react"
import { useImportRegistrationCsvMutation } from "@/store/api/admin/registrationApi"
import type { ImportResult } from "@/types/server/registration.types"

export interface UseCsvImportReturn {
  isUploading: boolean
  result: ImportResult | null
  error: string | null
  upload: (file: File) => Promise<void>
  reset: () => void
}

export function useCsvImport(): UseCsvImportReturn {
  const [result, setResult] = useState<ImportResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [importCsv, { isLoading }] = useImportRegistrationCsvMutation()

  const upload = useCallback(
    async (file: File) => {
      setResult(null)
      setError(null)
      const formData = new FormData()
      formData.append("file", file)
      try {
        const res = await importCsv(formData).unwrap()
        if (res.data) setResult(res.data)
      } catch (err: unknown) {
        const msg =
          typeof err === "object" && err !== null && "data" in err
            ? ((err as { data?: { error?: { message?: string } } }).data?.error?.message ?? "Upload failed.")
            : "Upload failed. Check your connection and try again."
        setError(msg)
      }
    },
    [importCsv],
  )

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return { isUploading: isLoading, result, error, upload, reset }
}
