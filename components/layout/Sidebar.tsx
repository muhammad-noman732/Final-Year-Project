"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Users, Banknote, Receipt, FileBarChart,
    CreditCard, User, TrendingUp, Activity, GraduationCap, X,
    type LucideIcon, LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
    LayoutDashboard, Users, Banknote, Receipt, FileBarChart,
    CreditCard, User, TrendingUp, Activity,
};

interface NavItem { label: string; href: string; icon: string; }
interface SidebarProps { items: NavItem[]; role: string; roleLabel: string; open: boolean; onClose: () => void; }

const ROLE_PALETTE: Record<string, { accent: string; bg: string; badge: string }> = {
    student: { accent: "text-sky-400", bg: "bg-sky-500/10", badge: "bg-sky-500/8 border-sky-500/20 text-sky-400" },
    admin: { accent: "text-gold-400", bg: "bg-gold-500/10", badge: "bg-gold-500/8 border-gold-500/20 text-gold-400" },
    vc: { accent: "text-violet-400", bg: "bg-violet-500/10", badge: "bg-violet-500/8 border-violet-500/20 text-violet-400" },
    hod: { accent: "text-emerald-400", bg: "bg-emerald-500/10", badge: "bg-emerald-500/8 border-emerald-500/20 text-emerald-400" },
};

export default function Sidebar({ items, role, roleLabel, open, onClose }: SidebarProps) {
    const pathname = usePathname();
    const palette = ROLE_PALETTE[role] || ROLE_PALETTE.admin;

    return (
        <>
            {/* Mobile overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={cn(
                "fixed top-0 left-0 z-50 h-full w-[252px] flex flex-col transition-transform duration-300 ease-in-out",
                "border-r border-white/[0.05]",
                "bg-[#070b14]",
                "lg:translate-x-0 lg:static lg:z-auto",
                open ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* ── Logo ── */}
                <div className="px-5 py-5 border-b border-white/[0.05]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Icon */}
                            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center shadow-lg shadow-gold-500/25 flex-shrink-0">
                                <GraduationCap className="w-4.5 h-4.5 text-[#050811]" />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                            <div>
                                <h1 className="text-sm font-bold text-gold-400 font-[family-name:var(--font-playfair)] tracking-wide leading-tight">
                                    GCUF
                                </h1>
                                <p className="text-[9px] text-slate-600 uppercase tracking-[0.18em] leading-tight">
                                    Fee Management
                                </p>
                            </div>
                        </div>
                        <button onClick={onClose} className="lg:hidden w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-300 hover:bg-white/[0.05] transition-all">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* ── Role Badge ── */}
                <div className="px-5 py-3 border-b border-white/[0.04]">
                    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest border", palette.badge)}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {roleLabel}
                    </span>
                </div>

                {/* ── Navigation ── */}
                <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
                    {items.map((item) => {
                        const Icon = iconMap[item.icon] || LayoutDashboard;
                        const isActive = pathname === item.href || (item.href !== `/${role}` && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={cn(
                                    "relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                                    isActive
                                        ? "bg-white/[0.05] text-foreground"
                                        : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]"
                                )}
                            >
                                {/* Active indicator line */}
                                {isActive && (
                                    <span className={cn("absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full", palette.accent.replace("text-", "bg-"))} />
                                )}

                                <Icon className={cn(
                                    "w-4 h-4 flex-shrink-0 transition-colors",
                                    isActive ? palette.accent : "text-slate-600 group-hover:text-slate-400"
                                )} />
                                <span className="truncate">{item.label}</span>

                                {isActive && (
                                    <div className={cn("ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0 shadow-sm", palette.accent.replace("text-", "bg-"))} />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* ── Footer ── */}
                <div className="px-4 py-4 border-t border-white/[0.04]">
                    <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-slate-600 hover:text-rose-400 hover:bg-rose-500/5 transition-all duration-200 group">
                        <LogOut className="w-4 h-4 flex-shrink-0 group-hover:text-rose-400 transition-colors" />
                        <span>Sign Out</span>
                    </button>
                    <p className="text-[9px] text-slate-700 text-center mt-2 tracking-wider uppercase">
                        v2.0.0 &middot; GCUF 2026
                    </p>
                </div>
            </aside>
        </>
    );
}
