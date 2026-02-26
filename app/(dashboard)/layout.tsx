"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { navItems } from "@/config/site";

interface NavItem {
    label: string;
    href: string;
    icon: string;
}

const roleConfig: Record<string, { items: NavItem[]; label: string; title: string; userName: string; showLive: boolean }> = {
    admin: { items: [...navItems.admin], label: "Administrator", title: "Admin Dashboard", userName: "Ahmed Khan", showLive: false },
    student: { items: [...navItems.student], label: "Student Portal", title: "Student Dashboard", userName: "Muhammad Ali", showLive: false },
    vc: { items: [...navItems.vc], label: "Vice Chancellor", title: "Vice Chancellor Dashboard", userName: "Prof. Dr. Iqbal", showLive: true },
    hod: { items: [...navItems.hod], label: "Head of Department", title: "HOD Dashboard", userName: "Dr. Fatima Noor", showLive: true },
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Determine role from pathname
    const role = pathname.split("/")[1] || "student";
    const config = roleConfig[role] || roleConfig.student;

    // Determine page title from current nav item
    const currentItem = config.items.find(
        (item) => pathname === item.href || (item.href !== `/${role}` && pathname.startsWith(item.href))
    );
    const pageTitle = currentItem?.label || config.title;

    return (
        <div className="min-h-screen flex">
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
                    userName={config.userName}
                    userRole={config.label}
                    onMenuClick={() => setSidebarOpen(true)}
                    showLiveIndicator={config.showLive}
                />
                <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
