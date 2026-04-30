"use client"

import { motion, type Variants } from "framer-motion"
import CountUp from "react-countup"
import { Users, Banknote, TrendingUp, AlertTriangle } from "lucide-react"
import { formatCurrency, formatFullCurrency } from "@/config/constants"
import type { HodStatsGridProps } from "@/types/client/ui/hod.ui.types"

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } },
}

const CARDS = [
  {
    key: "students",
    label: "Total Students",
    icon: Users,
    iconBg: "bg-[#22C55E]",
  },
  {
    key: "fee",
    label: "Fee Collected",
    icon: Banknote,
    iconBg: "bg-[#6366F1]",
  },
  {
    key: "rate",
    label: "Collection Rate",
    icon: TrendingUp,
    iconBg: "bg-amber-400",
  },
  {
    key: "defaulters",
    label: "Defaulters",
    icon: AlertTriangle,
    iconBg: "bg-[#EF4444]",
  },
]

export default function HodStatsGrid({ overview, sseConnected, newAmountCollected }: HodStatsGridProps) {
  const hasNewPayments = newAmountCollected > 0 && sseConnected

  const values = [
    {
      main: <CountUp end={overview.totalStudents} duration={1.2} separator="," />,
      sub: `${overview.paidStudents} paid · ${overview.unpaidStudents} unpaid`,
    },
    {
      main: (
        <CountUp
          end={overview.totalCollected}
          duration={1.4}
          formattingFn={(v) => formatCurrency(Math.round(v))}
        />
      ),
      sub: hasNewPayments
        ? `+${formatCurrency(newAmountCollected)} this session`
        : `${formatCurrency(overview.collectedToday)} today`,
    },
    {
      main: (
        <span className="flex items-baseline gap-0.5">
          <CountUp end={overview.paymentRate} duration={1.2} decimals={1} />
          <span className="text-sm text-[#64748B] font-normal">%</span>
        </span>
      ),
      sub: `${overview.paymentsToday} payments today`,
    },
    {
      main: <CountUp end={overview.defaulters} duration={1} />,
      sub: `${formatFullCurrency(overview.outstandingAmount)} outstanding`,
    },
  ]

  return (
    <motion.div variants={container} initial="hidden" animate="show"
      className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {CARDS.map((card, idx) => {
        const { main, sub } = values[idx]
        const Icon = card.icon
        return (
          <motion.div key={card.key} variants={item}>
            <div className="relative overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/60 dark:border-white/10 p-6 h-full transition-all duration-300 hover:bg-white/60 dark:hover:bg-slate-800/60 hover:-translate-y-1 hover:shadow-lg">
              
              <div className="flex items-start gap-4 mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center shadow-sm flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <div className="pt-0.5 text-left">
                   <p className="text-[10px] font-bold tracking-widest uppercase text-[#64748B] dark:text-slate-500 mb-1">
                    {card.label}
                  </p>
                  <div className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-slate-100 leading-none">
                    {main}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-white/5">
                <p className="text-xs text-[#64748B] dark:text-slate-400 font-medium truncate">{sub}</p>
              </div>

            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
