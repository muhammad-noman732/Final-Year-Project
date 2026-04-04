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
    <div className="min-h-screen p-8 sm:p-12 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Platform Administration
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage universities, monitor usage, and supervise global systems.
          </p>
        </div>
        <div className="shrink-0">
          <CreateTenantModal />
        </div>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Universities</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stats.tenantsCount}</h3>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Admin/Staff</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stats.usersCount}</h3>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Enrolled Students</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stats.studentsCount}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Tenants Table */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Deployed Universities
        </h2>

        {tenants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50">
            <LayoutDashboard className="h-10 w-10 text-slate-400 mb-4" />
            <p className="text-base font-semibold text-slate-700 dark:text-slate-300">No universities deployed</p>
            <p className="text-sm text-slate-500 mt-1 max-w-sm">
              You haven't onboarded any universities yet. Click the button above to provision your first tenant.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">University</th>
                    <th className="px-6 py-4 font-medium">Domain / Slug</th>
                    <th className="px-6 py-4 font-medium">Users</th>
                    <th className="px-6 py-4 font-medium">Students</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {tenants.map(tenant => (
                    <tr key={tenant.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900 dark:text-white">{tenant.name}</div>
                        <div className="text-xs text-slate-500">{tenant.shortName}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        {tenant.domain || tenant.slug}
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        {tenant._count.users}
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        {tenant._count.students}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          tenant.isActive 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
                            : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
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
