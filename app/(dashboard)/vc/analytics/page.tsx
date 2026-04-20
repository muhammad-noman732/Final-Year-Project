"use client";

import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatCurrency, formatFullCurrency } from "@/config/constants";
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Cell,
} from "recharts";

/* ═══ MOCK DATA ═══ */
const cumulativeData = Array.from({ length: 12 }, (_, i) => ({
    month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
    amount: Math.floor(5000000 + Math.random() * 8000000 + i * 2000000),
}));

const dailyBreakdown = Array.from({ length: 28 }, (_, i) => ({
    day: `${i + 1}`,
    amount: Math.floor(100000 + Math.random() * 500000),
}));

const weekOverWeek = [
    { week: "Week 1", current: 2100000, previous: 1800000 },
    { week: "Week 2", current: 2400000, previous: 2100000 },
    { week: "Week 3", current: 2800000, previous: 2300000 },
    { week: "Week 4", current: 3100000, previous: 2600000 },
];

const defaultersByDept = [
    { department: "Mathematics", count: 15, amount: 720000 },
    { department: "Physics", count: 12, amount: 624000 },
    { department: "Biology", count: 8, amount: 384000 },
    { department: "Computer Science", count: 5, amount: 250000 },
];

const daysOverdueDistribution = [
    { range: "1-5 days", count: 12 },
    { range: "6-10 days", count: 8 },
    { range: "11-15 days", count: 15 },
    { range: "16-20 days", count: 6 },
    { range: "21-30 days", count: 5 },
    { range: "30+ days", count: 3 },
];

const detailedDefaulters = [
    { name: "Zain Abbas", department: "Mathematics", program: "BS Mathematics", semester: "6th", amount: 52000, daysOverdue: 25, risk: "critical" },
    { name: "Kashif Raza", department: "Physics", program: "BS Physics", semester: "4th", amount: 50000, daysOverdue: 16, risk: "high" },
    { name: "Nadia Shah", department: "Biology", program: "BS Biology", semester: "4th", amount: 50000, daysOverdue: 14, risk: "high" },
    { name: "Bilal Ahmed", department: "Mathematics", program: "BS Applied Math", semester: "2nd", amount: 48000, daysOverdue: 6, risk: "medium" },
    { name: "Hamza Iqbal", department: "Computer Science", program: "BS CS", semester: "6th", amount: 52000, daysOverdue: 11, risk: "high" },
    { name: "Rabia Kousar", department: "Physics", program: "BS Applied Physics", semester: "2nd", amount: 48000, daysOverdue: 3, risk: "low" },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color?: string }>; label?: string }) => {
    if (!active || !payload) return null;
    return (
        <div className="glass-card rounded-lg px-3 py-2 border border-gold-500/15 text-xs">
            <p className="text-gold-400 font-medium mb-1">{label}</p>
            {payload.map((p, i) => (
                <p key={i} className="text-foreground">{p.name}: {typeof p.value === 'number' && p.value > 1000 ? formatFullCurrency(p.value) : p.value}</p>
            ))}
        </div>
    );
};

export default function VCAnalyticsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground tracking-tight">
                    Analytics & Insights
                </h1>
                <div className="flex gap-2">
                    <Input type="date" className="w-36 bg-navy-800/50 border-gold-500/10 text-sm h-9" />
                    <Input type="date" className="w-36 bg-navy-800/50 border-gold-500/10 text-sm h-9" />
                </div>
            </div>

            {/* ═══ CUMULATIVE TIMELINE ═══ */}
            <Card className="glass-card border-0 p-5">
                <h3 className="text-sm font-semibold text-foreground tracking-tight mb-4">
                    Cumulative Collection Timeline
                </h3>
                <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={cumulativeData}>
                        <defs>
                            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#d4a843" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#d4a843" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,168,67,0.06)" />
                        <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 11 }} tickLine={false} axisLine={false} />
                        <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="amount" name="Amount" stroke="#d4a843" strokeWidth={2} fill="url(#goldGradient)" />
                    </AreaChart>
                </ResponsiveContainer>
            </Card>

            <div className="grid lg:grid-cols-2 gap-4">
                {/* Daily Breakdown */}
                <Card className="glass-card border-0 p-5">
                    <h3 className="text-sm font-semibold text-foreground tracking-tight mb-4">
                        Daily Collection — February 2026
                    </h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={dailyBreakdown}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,168,67,0.06)" />
                            <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 9 }} tickLine={false} axisLine={false} interval={2} />
                            <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="amount" name="Amount" fill="#d4a843" radius={[3, 3, 0, 0]} barSize={12} fillOpacity={0.7} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                {/* Week over Week */}
                <Card className="glass-card border-0 p-5">
                    <h3 className="text-sm font-semibold text-foreground tracking-tight mb-4">
                        Week-over-Week Comparison
                    </h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={weekOverWeek}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,168,67,0.06)" />
                            <XAxis dataKey="week" tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} />
                            <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="previous" name="Previous" fill="rgba(212,168,67,0.2)" radius={[4, 4, 0, 0]} barSize={24} />
                            <Bar dataKey="current" name="Current" fill="#d4a843" radius={[4, 4, 0, 0]} barSize={24} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
                {/* Defaulters by Dept */}
                <Card className="glass-card border-0 p-5">
                    <h3 className="text-sm font-semibold text-foreground tracking-tight mb-4">
                        Defaulters by Department
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={defaultersByDept} layout="vertical" barSize={16}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,168,67,0.06)" />
                            <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} />
                            <YAxis type="category" dataKey="department" tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} width={100} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="count" name="Count" fill="#f43f5e" radius={[0, 6, 6, 0]} fillOpacity={0.7} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                {/* Days Overdue Distribution */}
                <Card className="glass-card border-0 p-5">
                    <h3 className="text-sm font-semibold text-foreground tracking-tight mb-4">
                        Days Overdue Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={daysOverdueDistribution}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,168,67,0.06)" />
                            <XAxis dataKey="range" tick={{ fill: "#94a3b8", fontSize: 9 }} tickLine={false} axisLine={false} />
                            <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="count" name="Students" radius={[4, 4, 0, 0]} barSize={30}>
                                {daysOverdueDistribution.map((_, i) => (
                                    <Cell key={i} fill={i < 2 ? "#f59e0b" : i < 4 ? "#f43f5e" : "#dc2626"} fillOpacity={0.7} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* ═══ DETAILED DEFAULTERS TABLE ═══ */}
            <Card className="glass-card border-0 overflow-hidden">
                <div className="px-6 py-4 border-b border-gold-500/5">
                    <h3 className="text-sm font-semibold text-foreground tracking-tight">
                        Detailed Defaulters List
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-gold-500/5 hover:bg-transparent">
                                <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Student Name</TableHead>
                                <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Department</TableHead>
                                <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Program</TableHead>
                                <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Semester</TableHead>
                                <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Amount</TableHead>
                                <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Days Overdue</TableHead>
                                <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Risk Level</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {detailedDefaulters.map((d) => (
                                <TableRow key={d.name} className="border-gold-500/5 hover:bg-navy-700/20">
                                    <TableCell className="text-sm font-medium">{d.name}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{d.department}</TableCell>
                                    <TableCell className="text-xs text-muted-foreground">{d.program}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{d.semester}</TableCell>
                                    <TableCell className="text-sm font-medium text-rose-400">{formatFullCurrency(d.amount)}</TableCell>
                                    <TableCell className={`text-sm font-medium ${d.daysOverdue > 15 ? "text-rose-400" : d.daysOverdue > 7 ? "text-amber-400" : "text-foreground"}`}>{d.daysOverdue}</TableCell>
                                    <TableCell><StatusBadge status={d.risk} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}
