"use client"

import { useMemo } from "react"
import type { VCDashboardOverview, VCTrendPoint } from "@/types/server/vc.types"
import type { VCVelocityMetrics } from "@/types/client/ui/vc.ui.types"

export function useVCVelocity(
  overview: VCDashboardOverview | undefined,
  collectionTrend: VCTrendPoint[],
): VCVelocityMetrics | null {
  return useMemo(() => {
    if (!overview) return null

    const now = new Date()
    const hoursElapsed = Math.max(0.5, now.getHours() + now.getMinutes() / 60)

    const paymentsPerHourToday = overview.paymentsToday / hoursElapsed

    const yesterday = collectionTrend[collectionTrend.length - 2]
    const paymentsPerHourYesterday = yesterday ? yesterday.payments / 24 : 0

    const projectedDailyPayments = Math.round(paymentsPerHourToday * 24)

    const todayAmountPerHour = overview.collectedToday / hoursElapsed
    const projectedDailyAmount = Math.round(todayAmountPerHour * 24)

    const avgDailyAmount =
      collectionTrend.length > 0
        ? Math.round(
            collectionTrend.reduce((sum, p) => sum + p.amount, 0) /
              collectionTrend.length,
          )
        : 0

    const deltaPercent =
      paymentsPerHourYesterday > 0
        ? Number(
            (
              ((paymentsPerHourToday - paymentsPerHourYesterday) /
                paymentsPerHourYesterday) *
              100
            ).toFixed(1),
          )
        : 0

    const trend: VCVelocityMetrics["trend"] =
      deltaPercent >= 10
        ? "accelerating"
        : deltaPercent <= -10
          ? "slowing"
          : "stable"

    return {
      paymentsPerHourToday: Number(paymentsPerHourToday.toFixed(1)),
      paymentsPerHourYesterday: Number(paymentsPerHourYesterday.toFixed(1)),
      projectedDailyPayments,
      projectedDailyAmount,
      trend,
      deltaPercent,
      avgDailyAmount,
    }
  }, [overview, collectionTrend])
}
