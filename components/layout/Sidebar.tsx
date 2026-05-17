"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Users, Banknote, Receipt, FileBarChart,
    CreditCard, User, TrendingUp, Activity, GraduationCap, X,
    Building2, UserCog, Calendar, Building, AlertTriangle,
    type LucideIcon, LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const iconMap: Record<string, LucideIcon> = {
    LayoutDashboard, Users, Banknote, Receipt, FileBarChart,
    CreditCard, User, TrendingUp, Activity, Building2, UserCog, Calendar, Building, AlertTriangle
};

interface NavItem { label: string; href: string; icon: string; }
interface SidebarProps { items: NavItem[]; role: string; roleLabel: string; open: boolean; onClose: () => void; }

const ROLE_BADGE: Record<string, string> = {
    student:    "bg-blue-50   border-blue-200   text-blue-700   dark:bg-blue-500/10  dark:border-blue-500/20  dark:text-blue-400",
    admin:      "bg-blue-50   border-blue-200   text-blue-700   dark:bg-blue-500/10  dark:border-blue-500/20  dark:text-blue-400",
    vc:         "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-400",
    hod:        "bg-sky-50    border-sky-200    text-sky-700    dark:bg-sky-500/10   dark:border-sky-500/20   dark:text-sky-400",
    superadmin: "bg-violet-50 border-violet-200 text-violet-700 dark:bg-violet-500/10 dark:border-violet-500/20 dark:text-violet-400",
};

export default function Sidebar({ items, role, roleLabel, open, onClose }: SidebarProps) {
    const pathname = usePathname();
    const { logout } = useAuth();
    const badge = ROLE_BADGE[role] ?? ROLE_BADGE.admin;

    return (
        <>
            {/* Mobile overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 flex flex-col",
                    "bg-white dark:bg-[#07090f]",
                    "border-r border-slate-200 dark:border-slate-800/60",
                    "transition-all duration-300 ease-in-out lg:relative lg:translate-x-0",
                    open ? "translate-x-0" : "-translate-x-full"
                )}
                role="navigation"
                aria-label="Main navigation"
            >
                {/* ── Logo ── */}
                <div className="h-14 px-5 flex items-center justify-between border-b border-slate-200 dark:border-slate-800/60">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/25 flex-shrink-0">
                            <GraduationCap className="w-4.5 h-4.5 text-white" />
                        </div>
                        <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100">
                            UniSync
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="lg:hidden w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150"
                        aria-label="Close navigation"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* ── Role badge ── */}
                <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800/60">
                    <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",
                        "text-[11px] font-bold uppercase tracking-widest border shadow-sm",
                        badge
                    )}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {roleLabel}
                    </span>
                </div>

                {/* ── Nav items ── */}
                <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                    {items.map((item) => {
                        const Icon = iconMap[item.icon] ?? LayoutDashboard;
                        const isActive =
                            pathname === item.href ||
                            (item.href !== `/${role}` && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={cn(
                                    "relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold group",
                                    "transition-all duration-200",
                                    "focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-1",
                                    isActive
                                        ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400"
                                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                                )}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {/* Active left indicator pill */}
                                {isActive && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-blue-500 dark:bg-blue-400" />
                                )}

                                <Icon className={cn(
                                    "w-4 h-4 flex-shrink-0 transition-colors duration-200",
                                    isActive
                                        ? "text-blue-500 dark:text-blue-400"
                                        : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                                )} />

                                <span className="truncate">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* ── Footer ── */}
                <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-800/60">
                    <button
                        onClick={() => logout()}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150 group focus-visible:outline-2 focus-visible:outline-red-500"
                    >
                        <LogOut className="w-4 h-4 flex-shrink-0 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-150" />
                        <span>Sign Out</span>
                    </button>
                    <p className="text-[11px] text-slate-400 dark:text-slate-600 text-center mt-3 tracking-widest uppercase font-medium">
                        v2.0.0 &middot; UniSync 2026
                    </p>
                </div>
            </aside>
        </>
    );
}
