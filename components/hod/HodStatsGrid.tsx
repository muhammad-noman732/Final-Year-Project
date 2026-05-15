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
    iconBg: "bg-primary",
  },
  {
    key: "fee",
    label: "Fee Collected",
    icon: Banknote,
    iconBg: "bg-primary",
  },
  {
    key: "rate",
    label: "Collection Rate",
    icon: TrendingUp,
    iconBg: "bg-primary",
  },
  {
    key: "defaulters",
    label: "Defaulters",
    icon: AlertTriangle,
    iconBg: "bg-rose-500",
  },
]

export default function HodStatsGrid({ overview, sseConnected, newAmountCollected }: HodStatsGridProps) {
  const hasNewPayments = newAmountCollected > 0 && sseConnected

  return (
    <motion.div variants={container} initial="hidden" animate="show"
      className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {CARDS.map((card) => {
        const Icon = card.icon

        let displayValue: React.ReactNode = ""
        let sub = ""

        if (card.key === "students") {
          displayValue = overview.totalStudents.toLocaleString()
          sub = `${overview.paidStudents} paid · ${overview.unpaidStudents} unpaid`
        } else if (card.key === "fee") {
          displayValue = formatCurrency(Math.round(overview.totalCollected))
          sub = hasNewPayments
            ? `+${formatCurrency(newAmountCollected)} this session`
            : `${formatCurrency(overview.collectedToday)} today`
        } else if (card.key === "rate") {
          displayValue = (
            <span className="flex items-baseline gap-0.5">
              {overview.paymentRate.toFixed(1)}
              <span className="text-sm text-[#64748B] font-normal">%</span>
            </span>
          )
          sub = `${overview.paymentsToday} payments today`
        } else {
          displayValue = overview.defaulters.toLocaleString()
          sub = `${formatFullCurrency(overview.outstandingAmount)} outstanding`
        }

        return (
          <motion.div key={card.key} variants={item}>
            <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/10 p-4 h-full transition-all duration-300 hover:shadow-md">

              <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className={`w-9 h-9 rounded-lg ${card.iconBg} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div className="pt-0.5 text-left">
                   <p className="text-[10px] font-bold tracking-widest uppercase text-[#64748B] dark:text-slate-500 mb-1">
                    {card.label}
                  </p>
                  <div className="text-xl font-bold tracking-tight text-[#0F172A] dark:text-slate-100 leading-none">
                    {displayValue}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5">
                <p className="text-[11px] text-[#64748B] dark:text-slate-400 font-medium truncate">{sub}</p>
              </div>

            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
