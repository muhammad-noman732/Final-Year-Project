"use client";

import { LogOut, Menu } from "lucide-react";
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
        <header className="sticky top-0 z-30 w-full h-14 flex items-center justify-between px-5 lg:px-6 border-b border-slate-200 dark:border-slate-800/60 bg-white/80 dark:bg-[#07090f]/80 backdrop-blur-md transition-colors duration-300">
            {/* Left — menu + title */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-blue-500"
                    aria-label="Open navigation menu"
                >
                    <Menu className="w-4.5 h-4.5" />
                </button>
                <div className="flex items-center gap-2.5">
                    <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                        {title}
                    </h2>
                    {showLiveIndicator && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <div className="relative w-1.5 h-1.5">
                                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-70" />
                                <span className="relative block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            </div>
                            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase">Live</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Right — actions */}
            <div className="flex items-center gap-3">
                <ThemeToggle />
                <NotificationBell />

                <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1" aria-hidden="true" />

                <div className="hidden sm:flex items-center gap-3">
                    <Avatar className="w-8 h-8 ring-2 ring-blue-500/20 dark:ring-blue-400/20">
                        <AvatarFallback className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[11px] font-bold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:block text-left">
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-200 leading-tight">{userName}</p>
                    </div>
                </div>

                <Link href="/login" aria-label="Sign out">
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-red-500">
                        <LogOut className="w-4 h-4" />
                    </button>
                </Link>
            </div>
        </header>
    );
}
