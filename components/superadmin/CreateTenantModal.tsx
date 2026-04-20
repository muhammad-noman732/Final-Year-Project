"use client"

import { Building2, Loader2, Plus } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useCreateTenant } from "@/hooks/useCreateTenant"

export function CreateTenantModal() {
  const { open, setOpen, loading, error, form, onSubmit } = useCreateTenant()
  const { register, formState: { errors } } = form

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          <Plus className="mr-2 h-4 w-4" />
          Add University
        </button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px] border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-900 dark:text-white">
            Provision University
          </DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400">
            Create a new isolated tenant. An email will be sent to the administrator to set their password.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6 pt-4">
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground/50 dark:text-slate-300">
                University Name
              </label>
              <Input
                {...register("universityName")}
                placeholder="e.g. Government College University Faisalabad"
                className="w-full bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800"
              />
              {errors.universityName && <p className="text-xs text-red-500">{errors.universityName.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground/50 dark:text-slate-300">
                  Short Name
                </label>
                <Input
                  {...register("shortName")}
                  placeholder="e.g. GCUF"
                  className="w-full bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800"
                />
                {errors.shortName && <p className="text-xs text-red-500">{errors.shortName.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-muted-foreground/50 dark:text-slate-300">
                  Domain <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <Input
                  {...register("domain")}
                  placeholder="fee.gcuf.edu.pk"
                  className="w-full bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800"
                />
              </div>
            </div>

            <div className="pt-2">
              <div className="h-px bg-slate-200 dark:bg-slate-800 w-full mb-4" />
              <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-4">Initial Administrator</h4>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm text-muted-foreground/60 dark:text-slate-400">
                    Full Name
                  </label>
                  <Input
                    {...register("adminName")}
                    placeholder="e.g. Ahmed Khan"
                    className="w-full bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800"
                  />
                  {errors.adminName && <p className="text-xs text-red-500">{errors.adminName.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm text-muted-foreground/60 dark:text-slate-400">
                    Email Address
                  </label>
                  <Input
                    {...register("adminEmail")}
                    placeholder="admin@gcuf.edu.pk"
                    className="w-full bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800"
                  />
                  {errors.adminEmail && <p className="text-xs text-red-500">{errors.adminEmail.message}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 dark:bg-white px-6 text-sm font-medium text-white dark:text-slate-900 shadow-sm transition-colors hover:bg-slate-800 dark:hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Deploy Tenant"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
