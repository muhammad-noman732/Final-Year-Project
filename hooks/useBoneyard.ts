"use client"

import { useState, useEffect } from "react"

export function useBoneyard(): boolean {
  const [isBoneyard, setIsBoneyard] = useState(false)

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_BONEYARD_BYPASS === "true") {
      setIsBoneyard(true)
      return
    }
    const ua = navigator.userAgent.toLowerCase()
    setIsBoneyard(
      ua.includes("boneyard") ||
      ua.includes("headlesschrome") ||
      ua.includes("puppeteer")
    )
  }, [])

  return isBoneyard
}
