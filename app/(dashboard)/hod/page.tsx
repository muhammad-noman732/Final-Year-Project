import { Suspense } from "react"
import { getTenantContext } from "@/lib/auth"
import { hodService } from "@/lib/di"
import HodDashboardClient from "@/components/hod/HodDashboardClient"

async function HodLoader() {
  const { tenantId, userId } = await getTenantContext()
  const initialData = await hodService.getDashboard(tenantId, userId, {})
  return <HodDashboardClient initialData={initialData} />
}

function HodSkeleton() {
  return (
    <div className="relative isolate space-y-6 pb-10 min-h-[calc(100dvh-3.5rem)] p-5 lg:p-8" style={{ backgroundColor: "var(--hod-bg, #F4F6FA)" }}>
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none bg-gradient-to-br from-[#E2E8F0] via-[#F1F5F9] to-[#E2E8F0] dark:from-[#050811] dark:via-[#0A0E1A] dark:to-[#050811]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#b8c6e5] dark:bg-[#312e81] rounded-full blur-[100px] opacity-40 dark:opacity-20" />
        <div className="absolute top-[20%] right-[10%] w-[45%] h-[50%] bg-[#f0e4c8] dark:bg-[#1e1b4b] rounded-full blur-[100px] opacity-40 dark:opacity-20" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[50%] bg-[#e5d4ed] dark:bg-[#3730a3] rounded-full blur-[100px] opacity-40 dark:opacity-20" />
      </div>

      <div className="flex items-start justify-between animate-pulse">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm" />
          <div className="space-y-2">
            <div className="h-6 w-48 rounded-lg bg-white/60 dark:bg-white/10" />
            <div className="h-4 w-32 rounded-md bg-white/40 dark:bg-white/5" />
          </div>
        </div>
        <div className="h-7 w-24 rounded-full bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-[148px] rounded-xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm"
            style={{ animationDelay: `${i * 60}ms` }}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px] animate-pulse">
        <div className="h-[300px] rounded-xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm" />
        <div className="h-[300px] rounded-xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-sm" />
      </div>
    </div>
  )
}

export default function HodPage() {
  return (
    <Suspense fallback={<HodSkeleton />}>
      <HodLoader />
    </Suspense>
  )
}
