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
  
  // Specific styling for HOD route to give it full-width light background without layout padding
  const isHOD = role === "hod"

  return (
    <div className="h-[100dvh] flex bg-[#F4F6FA] dark:bg-[#050811] overflow-hidden transition-colors duration-300">
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
          isHOD ? "" : "p-5 lg:p-8 bg-slate-50 dark:bg-slate-950"
        )}>
          {children}
        </main>
      </div>
    </div>
  )
}
