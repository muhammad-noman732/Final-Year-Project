"use client";
import { useMemo, useState } from "react";
import { Users, Banknote, Clock, AlertTriangle, TrendingUp, TrendingDown, ArrowRight, Shield, Building2, GraduationCap, Calendar, Receipt, FileBarChart, LayoutGrid } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { formatCurrency } from "@/config/constants";
import { useGetStudentsQuery } from "@/store/api/admin/studentsApi";
import { useGetVCDashboardQuery, useGetVCStudentsQuery } from "@/store/api/vc/vcApi";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const quickLinks = [
    { label: "Manage Students", href: "/admin/students", desc: "Enrollments & directory", col: "col-span-1 md:col-span-2 lg:col-span-2", icon: Users, gradient: "from-sky-500/10 via-transparent to-transparent", hoverGrad: "group-hover:from-sky-500/20", iconColor: "text-sky-400", border: "hover:border-sky-500/20" },
    { label: "Fee Management", href: "/admin/fees", desc: "Structures & dues", col: "col-span-1 md:col-span-2 lg:col-span-2", icon: Banknote, gradient: "from-emerald-500/10 via-transparent to-transparent", hoverGrad: "group-hover:from-emerald-500/20", iconColor: "text-emerald-400", border: "hover:border-emerald-500/20" },
    { label: "Staff", href: "/admin/users", desc: "VC, HOD profiles", col: "col-span-1", icon: Shield, gradient: "from-amber-500/10 via-transparent to-transparent", hoverGrad: "group-hover:from-amber-500/20", iconColor: "text-amber-400", border: "hover:border-amber-500/20" },
    { label: "Departments", href: "/admin/departments", desc: "Academics", col: "col-span-1", icon: Building2, gradient: "from-purple-500/10 via-transparent to-transparent", hoverGrad: "group-hover:from-purple-500/20", iconColor: "text-purple-400", border: "hover:border-purple-500/20" },
    { label: "Programs", href: "/admin/programs", desc: "Degrees offered", col: "col-span-1", icon: GraduationCap, gradient: "from-rose-500/10 via-transparent to-transparent", hoverGrad: "group-hover:from-rose-500/20", iconColor: "text-rose-400", border: "hover:border-rose-500/20" },
    { label: "Sessions", href: "/admin/sessions", desc: "Academic terms", col: "col-span-1", icon: Calendar, gradient: "from-indigo-500/10 via-transparent to-transparent", hoverGrad: "group-hover:from-indigo-500/20", iconColor: "text-indigo-400", border: "hover:border-indigo-500/20" },
    { label: "Payments", href: "/admin/payments", desc: "Transactions log", col: "col-span-1 md:col-span-2", icon: Receipt, gradient: "from-gold-500/10 via-transparent to-transparent", hoverGrad: "group-hover:from-gold-500/20", iconColor: "text-gold-400", border: "hover:border-gold-500/20" },
    { label: "Reports", href: "/admin/reports", desc: "System analytics", col: "col-span-1 md:col-span-2", icon: FileBarChart, gradient: "from-blue-500/10 via-transparent to-transparent", hoverGrad: "group-hover:from-blue-500/20", iconColor: "text-blue-400", border: "hover:border-blue-500/20" },
];

export default function AdminDashboard() {
    const [statusTab, setStatusTab] = useState<"paid" | "unpaid" | "defaulters">("paid");
    const { data: studentsData } = useGetStudentsQuery({ page: 1, limit: 1 });
    const { data: vcData } = useGetVCDashboardQuery({ feeStatus: "ALL", range: "30d" });
    const studentsByStatus = useGetVCStudentsQuery({
        feeStatus: statusTab === "defaulters" ? "OVERDUE" : statusTab === "paid" ? "PAID" : "UNPAID",
        page: 1,
        limit: 8,
        range: "30d",
    });

    const totalStudents = studentsData?.data?.meta?.total ?? 0;
    const overview = vcData?.data?.overview;
    const totalCollected = overview?.totalCollected ?? 0;
    const outstanding = overview?.outstandingAmount ?? 0;
    const defaulters = overview?.defaulters ?? 0;
    const unpaid = overview?.studentsUnpaid ?? 0;
    const previewRows = studentsByStatus.data?.data?.data ?? [];
    const statusLabel = useMemo(
        () => (statusTab === "defaulters" ? "Defaulters" : statusTab === "paid" ? "Paid" : "Unpaid"),
        [statusTab],
    );

    const stats = [
        { label: "Total Students", value: String(totalStudents), change: "live", trend: "up" as const, icon: Users, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20", glow: "group-hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]" },
        { label: "Total Fee Collected", value: formatCurrency(totalCollected), change: "live", trend: "up" as const, icon: Banknote, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", glow: "group-hover:shadow-[0_0_20px_rgba(52,211,153,0.15)]" },
        { label: "Outstanding Amount", value: formatCurrency(outstanding), change: "live", trend: "down" as const, icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", glow: "group-hover:shadow-[0_0_20px_rgba(251,191,36,0.15)]" },
        { label: "Defaulters", value: String(defaulters), change: "live", trend: "up" as const, icon: AlertTriangle, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20", glow: "group-hover:shadow-[0_0_20px_rgba(251,113,133,0.15)]" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">
                        Platform <span className="text-gold-400">Overview</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1.5 flex items-center gap-2">
                        <LayoutGrid className="w-3.5 h-3.5 text-gold-500/50" />
                        Comprehensive view of university administration
                    </p>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
                {stats.map((stat) => (
                    <Card key={stat.label} className={`group relative overflow-hidden bg-navy-900/50 backdrop-blur-xl border border-white/5 p-5 hover:-translate-y-0.5 transition-all duration-300 ${stat.glow} ${stat.border}`}>
                        {/* Subtle background flare */}
                        <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${stat.bg}`} />
                        
                        <div className="relative z-10 flex items-start justify-between mb-3">
                            <div className={`w-11 h-11 rounded-2xl ${stat.bg} ${stat.border} border flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md border ${stat.trend === "up" && stat.label !== "Defaulters" ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10" : stat.label === "Defaulters" ? "text-rose-400 border-rose-500/20 bg-rose-500/10" : "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"}`}>
                                {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {stat.change}
                            </div>
                        </div>
                        <p className="relative z-10 text-[11px] text-muted-foreground uppercase tracking-widest font-semibold mb-1">{stat.label}</p>
                        <p className="relative z-10 text-2xl font-bold text-foreground tracking-tight">
                            {stat.value}
                        </p>
                    </Card>
                ))}
            </div>

            {/* Bento Quick Links */}
            <div>
                <h2 className="text-base font-bold text-foreground/90 mb-4 flex items-center gap-2 tracking-tight">
                    <ArrowRight className="w-4 h-4 text-gold-500" /> Quick Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 stagger-children">
                    {quickLinks.map((link) => (
                        <Link key={link.href} href={link.href} className={`${link.col}`}>
                            <Card className={`group relative h-full overflow-hidden bg-navy-900/40 backdrop-blur-md border border-white/5 p-5 cursor-pointer transition-all duration-300 ${link.border} hover:shadow-xl hover:-translate-y-0.5`}>
                                {/* Gradient Hover Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br opacity-50 transition-colors duration-300 ${link.gradient} ${link.hoverGrad}`} />
                                
                                <div className="relative z-10 flex flex-col h-full justify-between gap-5">
                                    <div className="flex items-start justify-between">
                                        <div className={`p-2.5 rounded-xl bg-navy-950/50 backdrop-blur-xl border border-white/5 group-hover:scale-105 transition-transform duration-300 shadow-inner`}>
                                            <link.icon className={`w-5 h-5 ${link.iconColor}`} />
                                        </div>
                                        <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-[-8px] group-hover:translate-x-0 transition-all duration-300">
                                            <ArrowRight className="w-3.5 h-3.5 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-foreground mb-1 tracking-tight">
                                            {link.label}
                                        </h3>
                                        <p className="text-sm text-muted-foreground/70 group-hover:text-muted-foreground transition-colors duration-200">
                                            {link.desc}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            <Card className="bg-navy-900/40 border border-white/5 p-5 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">Current Semester Student Status</h3>
                    <Tabs value={statusTab} onValueChange={(value) => setStatusTab(value as "paid" | "unpaid" | "defaulters")}>
                        <TabsList className="bg-white/[0.03]">
                            <TabsTrigger value="paid">Paid</TabsTrigger>
                            <TabsTrigger value="unpaid">Unpaid ({unpaid})</TabsTrigger>
                            <TabsTrigger value="defaulters">Defaulters ({defaulters})</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <div className="overflow-hidden rounded-xl border border-white/[0.06]">
                    <table className="w-full text-sm">
                        <thead className="bg-white/[0.03] text-muted-foreground">
                            <tr>
                                <th className="px-3 py-2 text-left font-medium">Student</th>
                                <th className="px-3 py-2 text-left font-medium">Roll No</th>
                                <th className="px-3 py-2 text-left font-medium">Department</th>
                                <th className="px-3 py-2 text-left font-medium">Semester</th>
                                <th className="px-3 py-2 text-left font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {previewRows.length === 0 ? (
                                <tr>
                                    <td className="px-3 py-4 text-muted-foreground" colSpan={5}>
                                        No {statusLabel.toLowerCase()} students in current scope.
                                    </td>
                                </tr>
                            ) : (
                                previewRows.map((row) => (
                                    <tr key={row.assignmentId} className="border-t border-white/[0.06]">
                                        <td className="px-3 py-2 text-foreground">{row.studentName}</td>
                                        <td className="px-3 py-2 text-muted-foreground">{row.rollNumber}</td>
                                        <td className="px-3 py-2 text-muted-foreground">{row.departmentCode}</td>
                                        <td className="px-3 py-2 text-muted-foreground">{row.semester}</td>
                                        <td className="px-3 py-2 text-foreground">{row.feeStatus}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
