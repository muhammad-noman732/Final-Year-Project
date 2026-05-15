import { Suspense } from "react"
import { Building2, Users, GraduationCap, LayoutDashboard } from "lucide-react"
import prisma from "@/lib/prisma"
import { CreateTenantModal } from "@/components/superadmin/CreateTenantModal"

export const dynamic = "force-dynamic"

async function getStats() {
  const [tenantsCount, usersCount, studentsCount] = await Promise.all([
    prisma.tenant.count(),
    prisma.user.count(),
    prisma.student.count()
  ])
  return { tenantsCount, usersCount, studentsCount }
}

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

export default async function SuperAdminDashboard() {
  const stats = await getStats()
  const tenants = await getTenants()

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-500">

      {}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border/50 dark:border-white/[0.05]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
            Platform Administration
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            Manage universities, monitor usage, and supervise global systems.
          </p>
        </div>
        <div className="shrink-0">
          <CreateTenantModal />
        </div>
      </header>

      {}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
        <div className="glass-card glass-card-hover rounded-2xl p-6 border border-border/50">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Active Universities</p>
              <h3 className="text-2xl font-bold text-foreground tracking-tight">{stats.tenantsCount}</h3>
            </div>
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-2xl p-6 border border-border/50">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Total Admin/Staff</p>
              <h3 className="text-2xl font-bold text-foreground tracking-tight">{stats.usersCount}</h3>
            </div>
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-2xl p-6 border border-border/50">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Enrolled Students</p>
              <h3 className="text-2xl font-bold text-foreground tracking-tight">{stats.studentsCount}</h3>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight text-foreground font-heading">
          Deployed Universities
        </h2>

        {tenants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border/50 rounded-2xl bg-muted/30 dark:bg-navy-900/30">
            <LayoutDashboard className="h-10 w-10 text-primary/30 mb-4" />
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
                    <tr key={tenant.id} className="hover:bg-primary/[0.02] transition-colors duration-150">
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
                            ? 'bg-primary/10 text-primary border border-primary/20' 
                            : 'bg-muted text-muted-foreground border border-border/50'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${tenant.isActive ? 'bg-primary' : 'bg-slate-400'}`} />
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
