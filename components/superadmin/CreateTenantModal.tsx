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
        <button className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 active:scale-95">
          <Plus className="mr-2 h-4 w-4" />
          Add University
        </button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px] border-border/50 bg-white dark:bg-navy-950 p-0 overflow-hidden shadow-2xl rounded-2xl">
        <div className="p-6 space-y-6">
            <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground font-heading">
                Provision University
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
                Create a new isolated tenant environment for an institution.
            </DialogDescription>
            </DialogHeader>

            <form onSubmit={onSubmit} className="space-y-6">
            {error && (
                <div className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20 font-medium">
                  {error}
                </div>
            )}

            <div className="space-y-4">
                <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                    University Name
                </label>
                <Input
                    {...register("universityName")}
                    placeholder="e.g. UniSync Global Academy"
                    className="h-11 rounded-lg bg-muted/20 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all text-sm"
                />
                {errors.universityName && <p className="text-xs font-medium text-destructive mt-1">{errors.universityName.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                    Short Name
                    </label>
                    <Input
                    {...register("shortName")}
                    placeholder="e.g. UniSync"
                    className="h-11 rounded-lg bg-muted/20 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all text-sm uppercase"
                    />
                    {errors.shortName && <p className="text-xs font-medium text-destructive mt-1">{errors.shortName.message}</p>}
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                    Domain <span className="text-muted-foreground/40 font-normal">(Optional)</span>
                    </label>
                    <Input
                    {...register("domain")}
                    placeholder="fee.unisync.com"
                    className="h-11 rounded-lg bg-muted/20 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all text-sm"
                    />
                </div>
                </div>

                <div className="pt-2 border-t border-border/50">
                <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/60 mb-4">Initial Administrator</h4>
                
                <div className="space-y-4">
                    <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                        Full Name
                    </label>
                    <Input
                        {...register("adminName")}
                        placeholder="e.g. Ahmed Khan"
                        className="h-11 rounded-lg bg-muted/20 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all text-sm"
                    />
                    {errors.adminName && <p className="text-xs font-medium text-destructive mt-1">{errors.adminName.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                        Email Address
                    </label>
                    <Input
                        {...register("adminEmail")}
                        placeholder="admin@unisync.com"
                        className="h-11 rounded-lg bg-muted/20 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all text-sm"
                    />
                    {errors.adminEmail && <p className="text-xs font-medium text-destructive mt-1">{errors.adminEmail.message}</p>}
                    </div>
                </div>
                </div>
            </div>

            <div className="flex justify-end pt-2 gap-3">
                <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-bold text-muted-foreground hover:bg-muted transition-all active:scale-95"
                >
                Cancel
                </button>
                <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold transition-all hover:opacity-90 disabled:opacity-50 disabled:pointer-events-none active:scale-95"
                >
                {loading ? (
                    <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Creating...</span>
                    </div>
                ) : (
                    "Deploy Tenant"
                )}
                </button>
            </div>
            </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
