"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Sidebar from "@/components/layout/Sidebar"
import Navbar from "@/components/layout/Navbar"
import { navItems } from "@/config/site"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"

// ─── Nav item shape (shared with Sidebar) ─────────────────────

interface NavItem {
  label: string
  href: string
  icon: string
}

// ─── Role config — maps role prefix to nav items & labels ─────

const roleConfig: Record<
  string,
  { items: NavItem[]; label: string; title: string; showLive: boolean }
> = {
  superadmin: {
    items: [
      { label: "Dashboard", href: "/superadmin", icon: "LayoutDashboard" },
      { label: "Universities", href: "/superadmin/universities", icon: "Building2" },
    ],
    label: "Super Admin",
    title: "Super Admin Dashboard",
    showLive: false,
  },
  admin: {
    items: [...navItems.admin],
    label: "Administrator",
    title: "Admin Dashboard",
    showLive: false,
  },
  student: {
    items: [...navItems.student],
    label: "Student Portal",
    title: "Student Dashboard",
    showLive: false,
  },
  vc: {
    items: [...navItems.vc],
    label: "Vice Chancellor",
    title: "Vice Chancellor Dashboard",
    showLive: true,
  },
  hod: {
    items: [...navItems.hod],
    label: "Head of Department",
    title: "HOD Dashboard",
    showLive: true,
  },
}

// ═══════════════════════════════════════════════════════════════

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Read real user from /api/auth/me via our useAuth hook
  const { user, isLoading } = useAuth()

  // Determine role from URL pathname (middleware already ensures correct access)
  const role = pathname.split("/")[1] || "student"
  const config = roleConfig[role] || roleConfig.student

  // Determine page title from current nav item
  const currentItem = config.items.find(
    (item) =>
      pathname === item.href ||
      (item.href !== `/${role}` && pathname.startsWith(item.href))
  )
  const pageTitle = currentItem?.label || config.title

  // Use real user name if available, otherwise fallback
  const userName = isLoading ? "Loading..." : user?.name || "User"
  const userRole = config.label
  
  // Specific styling for HOD, VC, Admin, and Student routes to give full-width background with mesh gradients
  const isInteractive = role === "hod" || role === "vc" || role === "admin" || role === "student"

  return (
    <div className="h-[100dvh] flex bg-[#F4F6FA] dark:bg-[#050811] overflow-hidden transition-colors duration-300 relative isolate">
      {/* Fantasy UI Mesh Gradient Background for Interactive Panels */}
      {isInteractive && (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none bg-gradient-to-br from-[#E2E8F0] via-[#F1F5F9] to-[#E2E8F0] dark:from-[#050811] dark:via-[#0A0E1A] dark:to-[#050811]">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#b8c6e5] dark:bg-[#312e81] rounded-full blur-[100px] opacity-40 dark:opacity-20" />
          <div className="absolute top-[20%] right-[10%] w-[45%] h-[50%] bg-[#f0e4c8] dark:bg-[#1e1b4b] rounded-full blur-[100px] opacity-40 dark:opacity-20" />
          <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[50%] bg-[#e5d4ed] dark:bg-[#3730a3] rounded-full blur-[100px] opacity-40 dark:opacity-20" />
        </div>
      )}
      <Sidebar
        items={config.items}
        role={role}
        roleLabel={config.label}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          title={pageTitle}
          userName={userName}
          userRole={userRole}
          onMenuClick={() => setSidebarOpen(true)}
          showLiveIndicator={config.showLive}
        />
        <main className={cn(
          "flex-1 overflow-y-auto scroll-smooth",
          isInteractive ? "" : "p-5 lg:p-8 bg-slate-50 dark:bg-slate-950"
        )}>
          {children}
        </main>
      </div>
    </div>
  )
}
