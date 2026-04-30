import { Suspense } from "react"
import { getTenantContext } from "@/lib/auth"
import { hodService } from "@/lib/di"
import HodDefaultersClient from "@/components/hod/HodDefaultersClient"

async function DefaultersLoader() {
  const { tenantId, userId } = await getTenantContext()
  const initialData = await hodService.getDashboard(tenantId, userId, {})
  return <HodDefaultersClient initialData={initialData} />
}

function DefaultersSkeleton() {
  return (
    <div className="relative isolate min-h-[calc(100dvh-3.5rem)] p-5 lg:p-8" style={{ backgroundColor: "var(--hod-bg, #F4F6FA)" }}>
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none bg-gradient-to-br from-[#E2E8F0] via-[#F1F5F9] to-[#E2E8F0] dark:from-[#050811] dark:via-[#0A0E1A] dark:to-[#050811]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#b8c6e5] dark:bg-[#312e81] rounded-full blur-[100px] opacity-40 dark:opacity-20" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#f0e4c8] dark:bg-[#1e1b4b] rounded-full blur-[120px] opacity-40 dark:opacity-20" />
      </div>

      <div className="mb-6 animate-pulse">
        <div className="h-7 w-64 bg-white/60 dark:bg-white/10 rounded-lg mb-2" />
        <div className="h-4 w-48 bg-white/40 dark:bg-white/5 rounded-md" />
      </div>

      <div className="relative overflow-hidden bg-white/40 dark:bg-white/5 rounded-xl shadow-sm border border-white/60 dark:border-white/10 animate-pulse">
        <div className="px-6 py-5 border-b border-white/60 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800" />
            <div className="h-5 w-64 bg-slate-100 dark:bg-slate-800 rounded-md" />
          </div>
        </div>
        
        <div className="px-6 py-4 border-b border-white/40 dark:border-white/5 flex justify-between">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 w-20 bg-slate-50 dark:bg-slate-900 rounded" />
          ))}
        </div>

        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="px-6 py-5 border-b border-white/40 dark:border-white/5 flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded" />
              <div className="h-3 w-24 bg-slate-50 dark:bg-slate-900 rounded" />
            </div>
            <div className="h-4 w-40 bg-slate-50 dark:bg-slate-900 rounded" />
            <div className="h-4 w-8 bg-slate-50 dark:bg-slate-900 rounded" />
            <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded" />
            <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded" />
            <div className="h-6 w-24 bg-slate-100 dark:bg-slate-800 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DefaultersPage() {
  return (
    <Suspense fallback={<DefaultersSkeleton />}>
      <DefaultersLoader />
    </Suspense>
  )
}
