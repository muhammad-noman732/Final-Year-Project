"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Sidebar from "@/components/layout/Sidebar"
import Navbar from "@/components/layout/Navbar"
import { navItems } from "@/config/site"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
  icon: string
}

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { user, isLoading } = useAuth()

  const role = pathname.split("/")[1] || "student"
  const config = roleConfig[role] || roleConfig.student

  const currentItem = config.items.find(
    (item) =>
      pathname === item.href ||
      (item.href !== `/${role}` && pathname.startsWith(item.href))
  )
  let pageTitle = currentItem?.label || config.title
  if (pageTitle === "Dashboard") {
    if (role === "vc") pageTitle = "VC Dashboard"
    else if (role === "hod") pageTitle = "HOD Dashboard"
    else if (role === "admin") pageTitle = "Admin Dashboard"
    else if (role === "student") pageTitle = "Student Dashboard"
    else if (role === "superadmin") pageTitle = "Super Admin Dashboard"
  }

  const userName = isLoading ? "Loading..." : user?.name || "User"
  const userRole = config.label

  const isInteractive = role === "hod" || role === "vc" || role === "admin" || role === "student" || role === "superadmin"

  return (
    <div className="h-[100dvh] flex bg-[#F4F6FA] dark:bg-[#050811] overflow-hidden transition-colors duration-300 relative isolate">
      {}
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
        <main className="flex-1 overflow-y-auto scroll-smooth p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
