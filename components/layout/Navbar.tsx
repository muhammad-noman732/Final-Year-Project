"use client";

import { LogOut, Menu, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NotificationBell } from "@/components/layout/NotificationBell";
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
        <header className="sticky top-0 z-30 w-full h-14 flex items-center justify-between px-5 lg:px-6 border-b border-white/[0.04] bg-[#070b14]/90 backdrop-blur-xl">
            {/* ── Left ── */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-white/[0.05] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-gold-500/50"
                    aria-label="Open navigation menu"
                >
                    <Menu className="w-4.5 h-4.5" />
                </button>
                <div className="flex items-center gap-2.5">
                    <h2 className="text-sm font-bold text-foreground tracking-tight">
                        {title}
                    </h2>
                    {showLiveIndicator && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/8 border border-emerald-500/15">
                            <div className="relative w-1.5 h-1.5">
                                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
                                <span className="relative block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            </div>
                            <span className="text-[11px] font-bold text-emerald-400 tracking-widest uppercase">Live</span>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Center Search ── */}
            <div className="hidden md:flex flex-1 max-w-xs mx-6">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                    <input
                        placeholder="Search..."
                        className="w-full h-8 pl-9 pr-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-foreground placeholder:text-slate-500 outline-none focus:border-gold-500/25 focus:ring-1 focus:ring-gold-500/10 transition-all duration-150"
                        aria-label="Search"
                    />
                </div>
            </div>

            {/* ── Right ── */}
            <div className="flex items-center gap-2">
                {/* Bell */}
                <NotificationBell />

                {/* Divider */}
                <div className="hidden sm:block w-px h-5 bg-white/[0.06] mx-0.5" aria-hidden="true" />

                {/* User */}
                <div className="hidden sm:flex items-center gap-2.5">
                    <Avatar className="w-7 h-7 border border-white/[0.08]">
                        <AvatarFallback className="bg-gold-500/15 text-gold-400 text-[11px] font-bold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:block">
                        <p className="text-xs font-medium text-foreground leading-tight">{userName}</p>
                        <p className="text-[11px] text-slate-500 uppercase tracking-wider leading-tight">{userRole}</p>
                    </div>
                </div>

                {/* Logout */}
                <Link href="/login" aria-label="Sign out">
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-rose-400 hover:bg-rose-500/5 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-rose-400/50">
                        <LogOut className="w-3.5 h-3.5" />
                    </button>
                </Link>
            </div>
        </header>
    );
}
