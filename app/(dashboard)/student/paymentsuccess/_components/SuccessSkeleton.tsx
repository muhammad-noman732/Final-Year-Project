"use client"

export default function SuccessSkeleton() {
  return (
    <div className="max-w-xl mx-auto px-4 pt-4 pb-10 space-y-5 animate-pulse">
      <div className="flex flex-col items-center gap-3 pt-2">
        <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-white/[0.06]" />
        <div className="h-7 w-48 rounded-lg bg-zinc-200 dark:bg-white/[0.06]" />
        <div className="h-4 w-64 rounded bg-zinc-100 dark:bg-white/[0.04]" />
      </div>
      <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.07] bg-zinc-50 dark:bg-white/[0.02] p-6 space-y-4">
        <div className="h-4 w-40 rounded bg-zinc-200 dark:bg-white/[0.06]" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-2.5 w-16 rounded bg-zinc-200 dark:bg-white/[0.06]" />
              <div className="h-3.5 w-24 rounded bg-zinc-100 dark:bg-white/[0.04]" />
            </div>
          ))}
        </div>
        <div className="h-px bg-zinc-100 dark:bg-white/[0.04]" />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className="h-3 w-24 rounded bg-zinc-100 dark:bg-white/[0.04]" />
              <div className="h-3 w-16 rounded bg-zinc-100 dark:bg-white/[0.04]" />
            </div>
          ))}
        </div>
        <div className="h-12 rounded-xl bg-zinc-100 dark:bg-white/[0.04]" />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 rounded-xl bg-zinc-100 dark:bg-white/[0.04]" />
        ))}
      </div>
    </div>
  )
}
