"use client"

import { useMemo } from "react"
import type { VCDashboardOverview, VCTrendPoint } from "@/types/server/vc.types"
import type { VCHealthScore } from "@/types/client/ui/vc.ui.types"

export function useVCHealthScore(
  overview: VCDashboardOverview | undefined,
  collectionTrend: VCTrendPoint[],
): VCHealthScore | null {
  return useMemo(() => {
    if (!overview) return null

    const paymentRate = overview.paymentRate ?? 0
    const defaulterRate =
      overview.totalStudents > 0
        ? (overview.defaulters / overview.totalStudents) * 100
        : 0

    const last7 = collectionTrend.slice(-7)
    const avg7dPayments =
      last7.length > 0
        ? last7.reduce((sum, p) => sum + p.payments, 0) / last7.length
        : 0

    const velocityScore =
      avg7dPayments > 0
        ? Math.min(100, (overview.paymentsToday / avg7dPayments) * 65)
        : overview.paymentsToday > 0
          ? 65
          : 0

    const score = Math.round(
      paymentRate * 0.45 +
        (100 - Math.min(100, defaulterRate)) * 0.3 +
        velocityScore * 0.25,
    )

    const tier: VCHealthScore["tier"] =
      score >= 75 ? "healthy" : score >= 50 ? "at-risk" : "critical"

    const reason =
      tier === "healthy"
        ? "Collection metrics on track"
        : defaulterRate > 25
          ? "Defaulter rate is elevated"
          : tier === "at-risk"
            ? "Payment velocity below average"
            : "Immediate attention required"

    return { score, tier, paymentRate, defaulterRate, velocityScore, reason }
  }, [overview, collectionTrend])
}
