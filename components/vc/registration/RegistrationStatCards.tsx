"use client"

import { useEffect, useRef } from "react"
import CountUp from "react-countup"
import { motion } from "framer-motion"
import { Users, CalendarCheck, Upload, AlertTriangle } from "lucide-react"

interface StatCardData {
  label: string
  value: number
  suffix?: string
  icon: React.ElementType
  accentClass: string
  bgClass: string
  borderClass: string
  description: string
}

interface Props {
  totalRegistered: number
  registeredThisSession: number
  todayImports: number
  programsNearCapacity: number
  animateKey: number
}

function StatCard({
  card,
  index,
  animateKey,
}: {
  card: StatCardData
  index: number
  animateKey: number
}) {
  const prevRef = useRef(0)

  useEffect(() => {
    prevRef.current = card.value
  })

  const Icon = card.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 28, delay: index * 0.07 }}
      className={[
        "group relative overflow-hidden rounded-xl border p-5",
        "bg-gradient-to-br from-white/80 to-white/40 dark:from-[#080c18] dark:to-[#080c18] backdrop-blur-md transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg hover:from-white hover:to-white/60 dark:hover:from-[#0a0f1e] dark:hover:to-[#0a0f1e]",
        "border-white/60 dark:border-white/[0.05] hover:border-white/80 dark:hover:border-white/[0.10]",
        "shadow-sm dark:shadow-none",
      ].join(" ")}
    >
      {/* Ambient glow */}
      <div
        className={[
          "pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-[0.08] blur-2xl",
          card.bgClass,
        ].join(" ")}
      />

      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-muted-foreground/55">
            {card.label}
          </span>
          <div className={`text-3xl font-bold tabular-nums tracking-tight ${card.accentClass}`}>
            <CountUp
              key={`${animateKey}-${index}`}
              start={animateKey > 0 ? prevRef.current : 0}
              end={card.value}
              duration={1.4}
              separator=","
              suffix={card.suffix}
              useEasing
            />
          </div>
          <p className="text-[11px] font-medium text-slate-500 dark:text-muted-foreground/40 leading-tight mt-0.5">
            {card.description}
          </p>
        </div>

        <div
          className={[
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            card.bgClass,
            "bg-opacity-15 dark:bg-opacity-15",
          ].join(" ")}
        >
          <Icon className={`h-4 w-4 ${card.accentClass}`} strokeWidth={1.8} />
        </div>
      </div>
    </motion.div>
  )
}

export default function RegistrationStatCards({
  totalRegistered,
  registeredThisSession,
  todayImports,
  programsNearCapacity,
  animateKey,
}: Props) {
  const cards: StatCardData[] = [
    {
      label: "Total Registered",
      value: totalRegistered,
      icon: Users,
      accentClass: "text-violet-600 dark:text-violet-400",
      bgClass: "bg-violet-500",
      description: "All programs, all sessions",
    },
    {
      label: "This Session",
      value: registeredThisSession,
      icon: CalendarCheck,
      accentClass: "text-sky-600 dark:text-sky-400",
      bgClass: "bg-sky-500",
      description: "Current academic session",
    },
    {
      label: "Today's Imports",
      value: todayImports,
      icon: Upload,
      accentClass: "text-emerald-600 dark:text-emerald-400",
      bgClass: "bg-emerald-500",
      description: "Uploaded today via CSV",
    },
    {
      label: "Near Capacity",
      value: programsNearCapacity,
      suffix: " programs",
      icon: AlertTriangle,
      accentClass: programsNearCapacity > 0 ? "text-amber-600 dark:text-amber-400" : "text-slate-400 dark:text-muted-foreground/40",
      bgClass: programsNearCapacity > 0 ? "bg-amber-500" : "bg-slate-300 dark:bg-zinc-600",
      description: "Above 85% of seat capacity",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, i) => (
        <StatCard key={card.label} card={card} index={i} animateKey={animateKey} />
      ))}
    </div>
  )
}
