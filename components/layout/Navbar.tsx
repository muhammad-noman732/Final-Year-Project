"use client";

import { LogOut, Menu, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NotificationBell } from "@/components/layout/NotificationBell";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import Link from "next/link";

interface NavbarProps {
    title: string;
    userName: string;
    userRole: string;
    onMenuClick: () => void;
    showLiveIndicator?: boolean;
}

export default function Navbar({ title, userName, userRole, onMenuClick, showLiveIndicator = false }: NavbarProps) {
    const initials = userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

    return (
        <header className="sticky top-0 z-30 w-full h-14 flex items-center justify-between px-5 lg:px-6 border-b border-white/40 dark:border-white/[0.02] bg-white/60 dark:bg-[#050811]/60 backdrop-blur-md shadow-sm transition-colors duration-300">
            {/* ── Left ── */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#6366F1]"
                    aria-label="Open navigation menu"
                >
                    <Menu className="w-4.5 h-4.5" />
                </button>
                <div className="flex items-center gap-2.5">
                    <h2 className="text-sm font-bold text-[#0F172A] dark:text-slate-100 tracking-tight">
                        {title}
                    </h2>
                    {showLiveIndicator && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20">
                            <div className="relative w-1.5 h-1.5">
                                <span className="absolute inset-0 rounded-full bg-[#22C55E] animate-ping opacity-70" />
                                <span className="relative block w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                            </div>
                            <span className="text-[11px] font-bold text-[#22C55E] tracking-widest uppercase">Live</span>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Center Search ── */}
            <div className="hidden md:flex flex-1 max-w-xs mx-6">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#64748B] dark:text-slate-500" />
                    <input
                        placeholder="Search..."
                        className="w-full h-9 pl-9 pr-3 rounded-xl bg-white/40 dark:bg-slate-900/50 border border-white/60 dark:border-slate-800 text-sm text-[#0F172A] dark:text-slate-200 placeholder:text-[#64748B] dark:placeholder:text-slate-500 outline-none focus:border-[#6366F1]/50 dark:focus:border-indigo-500/50 focus:ring-2 focus:ring-[#6366F1]/20 dark:focus:ring-indigo-500/10 transition-all duration-200 font-medium shadow-sm"
                        aria-label="Search"
                    />
                </div>
            </div>

            {/* ── Right ── */}
            <div className="flex items-center gap-3">
                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Bell */}
                <NotificationBell />

                {/* Divider */}
                <div className="hidden sm:block w-px h-6 bg-slate-200/50 dark:bg-slate-800/50 mx-1" aria-hidden="true" />

                {/* User */}
                <div className="hidden sm:flex items-center gap-3">
                    <Avatar className="w-8 h-8 border border-white/60 dark:border-slate-800 shadow-sm">
                        <AvatarFallback className="bg-indigo-50 dark:bg-indigo-900/30 text-[#6366F1] dark:text-indigo-400 text-[11px] font-bold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:block text-left">
                        <p className="text-sm font-bold text-[#0F172A] dark:text-slate-200 leading-tight">{userName}</p>
                        <p className="text-[11px] font-semibold text-[#64748B] dark:text-slate-500 uppercase tracking-wider leading-tight mt-0.5">{userRole}</p>
                    </div>
                </div>

                {/* Logout */}
                <Link href="/login" aria-label="Sign out">
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] dark:text-slate-400 hover:text-[#EF4444] dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#EF4444]">
                        <LogOut className="w-4 h-4" />
                    </button>
                </Link>
            </div>
        </header>
    );
}
