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

const iconMap: Record<string, LucideIcon> = {
    LayoutDashboard, Users, Banknote, Receipt, FileBarChart,
    CreditCard, User, TrendingUp, Activity, Building2, UserCog, Calendar, Building, AlertTriangle
};

interface NavItem { label: string; href: string; icon: string; }
interface SidebarProps { items: NavItem[]; role: string; roleLabel: string; open: boolean; onClose: () => void; }

const ROLE_PALETTE: Record<string, { accent: string; bg: string; badge: string }> = {
    student: { accent: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-500/10", badge: "bg-sky-100 border-sky-200 text-sky-700 dark:bg-sky-500/10 dark:border-sky-500/20 dark:text-sky-400" },
    admin: { accent: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/10", badge: "bg-indigo-100 border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-400" },
    vc: { accent: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-500/10", badge: "bg-violet-100 border-violet-200 text-violet-700 dark:bg-violet-500/10 dark:border-violet-500/20 dark:text-violet-400" },
    hod: { accent: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10", badge: "bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400" },
};

export default function Sidebar({ items, role, roleLabel, open, onClose }: SidebarProps) {
    const pathname = usePathname();
    const palette = ROLE_PALETTE[role] || ROLE_PALETTE.admin;

    return (
        <>
            {/* Mobile overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-[#0F172A]/40 dark:bg-[#000]/60 backdrop-blur-sm lg:hidden transition-opacity duration-200"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 flex flex-col transform bg-white dark:bg-[#050811] transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 border-r border-slate-200 dark:border-white/5",
                    open ? "translate-x-0" : "-translate-x-full"
                )}
                role="navigation"
                aria-label="Main navigation"
            >
                {/* ── Logo ── */}
                <div className="px-5 h-14 flex items-center border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3 w-full">
                            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366F1] to-indigo-700 flex items-center justify-center shadow-md shadow-indigo-500/20 flex-shrink-0">
                                <GraduationCap className="w-4.5 h-4.5 text-white" />
                            </div>
                            <span className="text-sm font-bold tracking-tight text-[#0F172A] dark:text-slate-100 truncate">
                                GCUF Fees
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="lg:hidden w-7 h-7 rounded-lg flex items-center justify-center text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors duration-150"
                            aria-label="Close navigation"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* ── Role Badge ── */}
                <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800">
                    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest border shadow-sm", palette.badge)}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {roleLabel}
                    </span>
                </div>

                {/* ── Navigation ── */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {items.map((item) => {
                        const Icon = iconMap[item.icon] || LayoutDashboard;
                        const isActive = pathname === item.href || (item.href !== `/${role}` && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={cn(
                                    "relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold group",
                                    "transition-all duration-200",
                                    "focus-visible:outline-2 focus-visible:outline-[#6366F1] focus-visible:outline-offset-1",
                                    isActive
                                        ? "bg-white dark:bg-slate-900 text-[#6366F1] dark:text-indigo-400 shadow-sm border border-slate-100 dark:border-slate-800"
                                        : "text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                                )}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {/* Active indicator line */}
                                {isActive && (
                                    <span className={cn("absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-[#6366F1] dark:bg-indigo-500")} />
                                )}

                                <Icon className={cn(
                                    "w-4 h-4 flex-shrink-0 transition-colors duration-200",
                                    isActive ? "text-[#6366F1] dark:text-indigo-400" : "text-[#64748B] dark:text-slate-400 group-hover:text-[#6366F1] dark:group-hover:text-indigo-400"
                                )} />
                                <span className="truncate">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* ── Footer ── */}
                <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-800">
                    <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#64748B] dark:text-slate-400 hover:text-[#EF4444] dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150 group focus-visible:outline-2 focus-visible:outline-[#EF4444]">
                        <LogOut className="w-4 h-4 flex-shrink-0 group-hover:text-[#EF4444] transition-colors duration-150" />
                        <span>Sign Out</span>
                    </button>
                    <p className="text-[11px] text-[#64748B] dark:text-slate-500 text-center mt-3 tracking-wider uppercase font-medium">
                        v2.0.0 &middot; GCUF 2026
                    </p>
                </div>
            </aside>
        </>
    );
}
