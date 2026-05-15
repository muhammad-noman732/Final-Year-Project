import { Suspense } from "react"
import { Building2, LayoutDashboard } from "lucide-react"
import prisma from "@/lib/prisma"
import { CreateTenantModal } from "@/components/superadmin/CreateTenantModal"

export const dynamic = "force-dynamic"

async function getTenants() {
  return await prisma.tenant.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { users: true, students: true }
      }
    }
  })
}

export default async function UniversitiesPage() {
  const tenants = await getTenants()

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-500">

      {}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border/50 dark:border-white/[0.05]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
            University Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            Detailed list of all institutional tenants and their current status.
          </p>
        </div>
        <div className="shrink-0">
          <CreateTenantModal />
        </div>
      </header>

      {}
      <section className="space-y-4">
        {tenants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border/50 rounded-2xl bg-muted/30 dark:bg-navy-900/30">
            <Building2 className="h-10 w-10 text-primary/30 mb-4" />
            <p className="text-base font-bold text-foreground">No universities deployed</p>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-sm">
              You haven&apos;t onboarded any universities yet. Click the button above to provision your first tenant.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl glass-card border border-border/50 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border/50 dark:border-white/[0.05] bg-muted/30 dark:bg-white/[0.02] text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest">University</th>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest">Domain / Slug</th>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-center">Users</th>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-center">Students</th>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 dark:divide-white/[0.04]">
                  {tenants.map(tenant => (
                    <tr key={tenant.id} className="hover:bg-primary/[0.02] dark:hover:bg-white/[0.02] transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="font-bold text-foreground">{tenant.name}</div>
                        <div className="text-[11px] text-muted-foreground font-medium mt-0.5">{tenant.shortName}</div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-medium">
                        {tenant.domain || tenant.slug}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-mono text-xs font-bold text-muted-foreground">{tenant._count.users}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-mono text-xs font-bold text-muted-foreground">{tenant._count.students}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-tighter ${
                          tenant.isActive 
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
                            : 'bg-muted text-muted-foreground border border-border/50'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${tenant.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                          {tenant.isActive ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

    </div>
  )
}
