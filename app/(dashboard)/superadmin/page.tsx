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
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/[0.05]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
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

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
        <div className="glass-card glass-card-hover rounded-xl p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Active Universities</p>
              <h3 className="text-2xl font-bold text-foreground">{stats.tenantsCount}</h3>
            </div>
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-xl p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Total Admin/Staff</p>
              <h3 className="text-2xl font-bold text-foreground">{stats.usersCount}</h3>
            </div>
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-xl p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Enrolled Students</p>
              <h3 className="text-2xl font-bold text-foreground">{stats.studentsCount}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Tenants Table */}
      <section className="space-y-4">
        <h2 className="text-base font-bold tracking-tight text-foreground">
          Deployed Universities
        </h2>

        {tenants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-white/[0.08] rounded-xl bg-navy-900/30">
            <LayoutDashboard className="h-10 w-10 text-gold-500/30 mb-4" />
            <p className="text-base font-semibold text-foreground/80">No universities deployed</p>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-sm">
              You haven&apos;t onboarded any universities yet. Click the button above to provision your first tenant.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl glass-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/[0.05] text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-widest">University</th>
                    <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-widest">Domain / Slug</th>
                    <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-widest">Users</th>
                    <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-widest">Students</th>
                    <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {tenants.map(tenant => (
                    <tr key={tenant.id} className="hover:bg-white/[0.02] transition-colors duration-150">
                      <td className="px-5 py-3.5">
                        <div className="font-medium text-foreground">{tenant.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{tenant.shortName}</div>
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground">
                        {tenant.domain || tenant.slug}
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground font-mono text-xs">
                        {tenant._count.users}
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground font-mono text-xs">
                        {tenant._count.students}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          tenant.isActive 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-white/[0.04] text-muted-foreground border border-white/[0.06]'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${tenant.isActive ? 'bg-emerald-400' : 'bg-slate-500'}`} />
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
