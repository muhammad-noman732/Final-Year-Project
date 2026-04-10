"use client";
import { Users, Banknote, Clock, AlertTriangle, TrendingUp, TrendingDown, ArrowRight, Shield, Building2, GraduationCap, Calendar, Receipt, FileBarChart, LayoutGrid } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { formatCurrency } from "@/config/constants";

const stats = [
    { label: "Total Students", value: "1,247", change: "+12", trend: "up" as const, icon: Users, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20", glow: "group-hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]" },
    { label: "Total Fee Collected", value: formatCurrency(62500000), change: "+5.2%", trend: "up" as const, icon: Banknote, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", glow: "group-hover:shadow-[0_0_20px_rgba(52,211,153,0.15)]" },
    { label: "Pending Payments", value: "49", change: "-8", trend: "down" as const, icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", glow: "group-hover:shadow-[0_0_20px_rgba(251,191,36,0.15)]" },
    { label: "Defaulters", value: "15", change: "+3", trend: "up" as const, icon: AlertTriangle, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20", glow: "group-hover:shadow-[0_0_20px_rgba(251,113,133,0.15)]" },
];

const quickLinks = [
    { label: "Manage Students", href: "/admin/students", desc: "Enrollments & directory", col: "col-span-1 md:col-span-2 lg:col-span-2", icon: Users, gradient: "from-sky-500/10 via-transparent to-transparent", hoverGrad: "group-hover:from-sky-500/20", iconColor: "text-sky-400", border: "hover:border-sky-500/30", delay: "delay-[50ms]" },
    { label: "Fee Management", href: "/admin/fees", desc: "Structures & dues", col: "col-span-1 md:col-span-2 lg:col-span-2", icon: Banknote, gradient: "from-emerald-500/10 via-transparent to-transparent", hoverGrad: "group-hover:from-emerald-500/20", iconColor: "text-emerald-400", border: "hover:border-emerald-500/30", delay: "delay-[100ms]" },
    { label: "Staff", href: "/admin/users", desc: "VC, HOD profiles", col: "col-span-1", icon: Shield, gradient: "from-amber-500/10 via-transparent to-transparent", hoverGrad: "group-hover:from-amber-500/20", iconColor: "text-amber-400", border: "hover:border-amber-500/30", delay: "delay-[150ms]" },
    { label: "Departments", href: "/admin/departments", desc: "Academics", col: "col-span-1", icon: Building2, gradient: "from-purple-500/10 via-transparent to-transparent", hoverGrad: "group-hover:from-purple-500/20", iconColor: "text-purple-400", border: "hover:border-purple-500/30", delay: "delay-[200ms]" },
    { label: "Programs", href: "/admin/programs", desc: "Degrees offered", col: "col-span-1", icon: GraduationCap, gradient: "from-rose-500/10 via-transparent to-transparent", hoverGrad: "group-hover:from-rose-500/20", iconColor: "text-rose-400", border: "hover:border-rose-500/30", delay: "delay-[250ms]" },
    { label: "Sessions", href: "/admin/sessions", desc: "Academic terms", col: "col-span-1", icon: Calendar, gradient: "from-indigo-500/10 via-transparent to-transparent", hoverGrad: "group-hover:from-indigo-500/20", iconColor: "text-indigo-400", border: "hover:border-indigo-500/30", delay: "delay-[300ms]" },
    { label: "Payments", href: "/admin/payments", desc: "Transactions log", col: "col-span-1 md:col-span-2", icon: Receipt, gradient: "from-gold-500/10 via-transparent to-transparent", hoverGrad: "group-hover:from-gold-500/20", iconColor: "text-gold-400", border: "hover:border-gold-500/30", delay: "delay-[350ms]" },
    { label: "Reports", href: "/admin/reports", desc: "System analytics", col: "col-span-1 md:col-span-2", icon: FileBarChart, gradient: "from-blue-500/10 via-transparent to-transparent", hoverGrad: "group-hover:from-blue-500/20", iconColor: "text-blue-400", border: "hover:border-blue-500/30", delay: "delay-[400ms]" },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header Area */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground font-[family-name:var(--font-playfair)] tracking-tight">
                        Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-200">Overview</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                        <LayoutGrid className="w-4 h-4 text-gold-500/50" />
                        Comprehensive view of university administration
                    </p>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
                {stats.map((stat, i) => (
                    <Card key={stat.label} className={`group relative overflow-hidden bg-navy-900/50 backdrop-blur-xl border border-white/5 p-6 hover:-translate-y-1 transition-all duration-500 ${stat.glow} ${stat.border}`}>
                        {/* Subtle background flare */}
                        <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[50px] opacity-20 group-hover:opacity-50 transition-opacity duration-500 ${stat.bg}`} />
                        
                        <div className="relative z-10 flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.border} border flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${stat.trend === "up" && stat.label !== "Defaulters" ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10" : stat.label === "Defaulters" ? "text-rose-400 border-rose-500/20 bg-rose-500/10" : "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"}`}>
                                {stat.trend === "up" ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                                {stat.change}
                            </div>
                        </div>
                        <p className="relative z-10 text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1 opacity-80">{stat.label}</p>
                        <p className="relative z-10 text-3xl font-bold text-foreground font-[family-name:var(--font-playfair)] tracking-tight">
                            {stat.value}
                        </p>
                    </Card>
                ))}
            </div>

            {/* Bento Quick Links */}
            <div>
                <h2 className="text-lg font-semibold text-foreground/90 mb-4 flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-gold-500" /> Quick Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {quickLinks.map((link) => (
                        <Link key={link.href} href={link.href} className={`${link.col} transition-all duration-700 ease-out animate-in slide-in-from-bottom-4 ${link.delay}`}>
                            <Card className={`group relative h-full overflow-hidden bg-navy-900/40 backdrop-blur-md border border-white/5 p-6 cursor-pointer transition-all duration-500 ${link.border} hover:shadow-2xl hover:-translate-y-1`}>
                                {/* Gradient Hover Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br opacity-50 transition-colors duration-500 ${link.gradient} ${link.hoverGrad}`} />
                                
                                <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                                    <div className="flex items-start justify-between">
                                        <div className={`p-3 rounded-xl bg-navy-950/50 backdrop-blur-xl border border-white/5 group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                                            <link.icon className={`w-6 h-6 ${link.iconColor} drop-shadow-[0_0_8px_currentColor]`} />
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                                            <ArrowRight className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-1.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-colors">
                                            {link.label}
                                        </h3>
                                        <p className="text-sm text-muted-foreground/80 group-hover:text-muted-foreground transition-colors font-medium">
                                            {link.desc}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
