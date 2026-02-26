"use client";

import { Users, Banknote, Clock, AlertTriangle, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { formatCurrency } from "@/config/constants";

const stats = [
    { label: "Total Students", value: "1,247", change: "+12", trend: "up" as const, icon: Users, color: "text-sky-400", bg: "bg-sky-500/10" },
    { label: "Total Fee Collected", value: formatCurrency(62500000), change: "+5.2%", trend: "up" as const, icon: Banknote, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Pending Payments", value: "49", change: "-8", trend: "down" as const, icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Defaulters", value: "15", change: "+3", trend: "up" as const, icon: AlertTriangle, color: "text-rose-400", bg: "bg-rose-500/10" },
];

const quickLinks = [
    { label: "Manage Students", href: "/admin/students", desc: "Add, edit, search students" },
    { label: "Fee Management", href: "/admin/fees", desc: "Structures, assignments, defaulters" },
    { label: "Payments", href: "/admin/payments", desc: "Track all transactions" },
    { label: "Reports", href: "/admin/reports", desc: "Generate & export reports" },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
                {stats.map((stat) => (
                    <Card key={stat.label} className="glass-card glass-card-hover border-0 p-5 cursor-default transition-all duration-300">
                        <div className="flex items-start justify-between mb-3">
                            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-medium ${stat.trend === "up" && stat.label !== "Defaulters" ? "text-emerald-400" : stat.label === "Defaulters" ? "text-rose-400" : "text-emerald-400"}`}>
                                {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {stat.change}
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground font-[family-name:var(--font-playfair)]">{stat.value}</p>
                    </Card>
                ))}
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                        <Card className="glass-card glass-card-hover border-0 p-5 cursor-pointer group transition-all duration-300 h-full">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-base font-semibold text-foreground font-[family-name:var(--font-playfair)] mb-1">
                                        {link.label}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{link.desc}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gold-500/30 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
