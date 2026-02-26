"use client";

import { useState, useEffect } from "react";
import { Users, Banknote, TrendingUp, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatCurrency, formatFullCurrency, SEMESTERS } from "@/config/constants";
import {
    BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const DEPT_NAME = "Computer Science";

const stats = [
    { label: "Total Students", value: "450", icon: Users, color: "text-sky-400", bg: "bg-sky-500/10" },
    { label: "Fee Collected", value: formatCurrency(22050000), icon: Banknote, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Collection Rate", value: "98%", icon: TrendingUp, color: "text-gold-400", bg: "bg-gold-500/10" },
    { label: "Defaulters", value: "5", icon: AlertTriangle, color: "text-rose-400", bg: "bg-rose-500/10" },
];

const semesterBreakdown = [
    { semester: "2nd", paid: 4800000, unpaid: 200000, students: 60 },
    { semester: "4th", paid: 8100000, unpaid: 450000, students: 110 },
    { semester: "6th", paid: 5200000, unpaid: 150000, students: 80 },
    { semester: "8th", paid: 3950000, unpaid: 100000, students: 65 },
];

const students = [
    { id: "GCUF-2024-CS-0001", name: "Ahmed Hassan", program: "BS Computer Science", semester: "4th", feeStatus: "paid", amount: 50000 },
    { id: "GCUF-2024-CS-0002", name: "Fatima Zahra", program: "BS Software Engineering", semester: "4th", feeStatus: "paid", amount: 50000 },
    { id: "GCUF-2023-CS-0006", name: "Sara Malik", program: "MCS", semester: "4th", feeStatus: "unpaid", amount: 52000 },
    { id: "GCUF-2024-CS-0010", name: "Maryam Nawaz", program: "BS Information Technology", semester: "4th", feeStatus: "paid", amount: 50000 },
    { id: "GCUF-2024-CS-0011", name: "Hamza Iqbal", program: "BS Computer Science", semester: "6th", feeStatus: "overdue", amount: 52000 },
    { id: "GCUF-2024-CS-0012", name: "Raza Khan", program: "BS Software Engineering", semester: "2nd", feeStatus: "paid", amount: 48000 },
    { id: "GCUF-2024-CS-0013", name: "Anam Riaz", program: "BS Computer Science", semester: "8th", feeStatus: "paid", amount: 45000 },
    { id: "GCUF-2024-CS-0014", name: "Kashif Javed", program: "MCS", semester: "6th", feeStatus: "overdue", amount: 52000 },
];

const defaulters = [
    { name: "Sara Malik", program: "MCS", semester: "4th", amountDue: 52000, daysOverdue: 11 },
    { name: "Hamza Iqbal", program: "BS CS", semester: "6th", amountDue: 52000, daysOverdue: 11 },
    { name: "Kashif Javed", program: "MCS", semester: "6th", amountDue: 52000, daysOverdue: 8 },
    { name: "Umer Farooq", program: "BS SE", semester: "4th", amountDue: 50000, daysOverdue: 4 },
    { name: "Nadia Akram", program: "BS IT", semester: "2nd", amountDue: 48000, daysOverdue: 2 },
];

const livePool = [
    { name: "Ali Hassan", semester: "4th", amount: 50000 },
    { name: "Hira Naz", semester: "2nd", amount: 48000 },
    { name: "Bilal Shah", semester: "6th", amount: 52000 },
    { name: "Saba Riaz", semester: "8th", amount: 45000 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) => {
    if (!active || !payload) return null;
    return (
        <div className="glass-card rounded-lg px-3 py-2 border border-gold-500/15 text-xs">
            <p className="text-gold-400 font-medium mb-1">{label}</p>
            {payload.map((p, i) => (
                <p key={i} className="text-foreground">{p.name}: {formatFullCurrency(p.value)}</p>
            ))}
        </div>
    );
};

export default function HODDashboard() {
    const [liveEvents, setLiveEvents] = useState<Array<{ id: number; name: string; semester: string; amount: number; time: string }>>([]);
    const [lastUpdated, setLastUpdated] = useState("2 seconds ago");

    useEffect(() => {
        const init = livePool.slice(0, 2).map((e, i) => ({ ...e, id: i, time: `${i + 1}m ago` }));
        setLiveEvents(init);

        let counter = 2;
        const interval = setInterval(() => {
            const event = livePool[counter % livePool.length];
            setLiveEvents((prev) => [{ ...event, id: counter, time: "Just now" }, ...prev.slice(0, 7)]);
            counter++;
        }, 5000);

        let seconds = 2;
        const timer = setInterval(() => {
            seconds = seconds >= 10 ? 2 : seconds + 2;
            setLastUpdated(`${seconds} seconds ago`);
        }, 2000);

        return () => { clearInterval(interval); clearInterval(timer); };
    }, []);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-playfair)]">
                        {DEPT_NAME} — HOD Dashboard
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Updated {lastUpdated}</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <div className="relative w-2 h-2">
                        <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                        <div className="relative w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase">Live</span>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
                {stats.map((stat) => (
                    <Card key={stat.label} className="glass-card glass-card-hover border-0 p-5 transition-all duration-300">
                        <div className="flex items-start justify-between mb-3">
                            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground font-[family-name:var(--font-playfair)]">{stat.value}</p>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
                {/* Semester Breakdown Chart */}
                <Card className="glass-card border-0 p-5 lg:col-span-2">
                    <h3 className="text-sm font-semibold text-foreground font-[family-name:var(--font-playfair)] mb-4">
                        Semester-wise Collection
                    </h3>
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={semesterBreakdown}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,168,67,0.06)" />
                            <XAxis dataKey="semester" tick={{ fill: "#94a3b8", fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v} Sem`} />
                            <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="paid" name="Paid" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                            <Bar dataKey="unpaid" name="Unpaid" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                {/* Live Feed */}
                <Card className="glass-card border-0 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gold-500/5 flex items-center gap-2">
                        <div className="relative w-2 h-2">
                            <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                            <div className="relative w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">Dept Payments</span>
                    </div>
                    <ScrollArea className="h-[240px]">
                        <div className="p-3 space-y-2">
                            {liveEvents.map((event) => (
                                <div key={event.id} className="p-2.5 rounded-lg bg-navy-700/20 border border-gold-500/5">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className="text-xs font-medium text-foreground">{event.name}</span>
                                        <span className="text-[10px] text-muted-foreground">{event.time}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] text-muted-foreground">{event.semester} Sem</span>
                                        <span className="text-xs font-medium text-gold-400">{formatFullCurrency(event.amount)} ✓</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </Card>
            </div>

            {/* Student List */}
            <Card className="glass-card border-0 overflow-hidden">
                <div className="px-4 py-3 border-b border-gold-500/5 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground font-[family-name:var(--font-playfair)]">
                        Department Students
                    </h3>
                    <div className="flex gap-2">
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[130px] bg-navy-800/50 border-gold-500/10 text-sm h-8">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-navy-800 border-gold-500/10">
                                <SelectItem value="all">All Semesters</SelectItem>
                                {SEMESTERS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[120px] bg-navy-800/50 border-gold-500/10 text-sm h-8">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-navy-800 border-gold-500/10">
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="unpaid">Unpaid</SelectItem>
                                <SelectItem value="overdue">Overdue</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button size="sm" variant="outline" className="border-gold-500/10 text-gold-400 h-8">Export</Button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-gold-500/5 hover:bg-transparent">
                                <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Student ID</TableHead>
                                <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Name</TableHead>
                                <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Program</TableHead>
                                <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Semester</TableHead>
                                <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Fee Status</TableHead>
                                <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map((s) => (
                                <TableRow key={s.id} className="border-gold-500/5 hover:bg-navy-700/20">
                                    <TableCell className="text-xs font-mono text-muted-foreground">{s.id}</TableCell>
                                    <TableCell className="text-sm font-medium">{s.name}</TableCell>
                                    <TableCell className="text-xs text-muted-foreground">{s.program}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{s.semester}</TableCell>
                                    <TableCell><StatusBadge status={s.feeStatus} /></TableCell>
                                    <TableCell className="text-sm font-medium">{formatFullCurrency(s.amount)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>

            {/* Defaulters */}
            <Card className="glass-card border-0 overflow-hidden">
                <div className="px-4 py-3 border-b border-gold-500/5">
                    <h3 className="text-sm font-semibold text-foreground font-[family-name:var(--font-playfair)]">
                        Department Defaulters
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-gold-500/5 hover:bg-transparent">
                                <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Student Name</TableHead>
                                <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Program</TableHead>
                                <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Semester</TableHead>
                                <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Amount Due</TableHead>
                                <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Days Overdue</TableHead>
                                <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {defaulters.map((d) => (
                                <TableRow key={d.name} className="border-gold-500/5 hover:bg-navy-700/20">
                                    <TableCell className="text-sm font-medium">{d.name}</TableCell>
                                    <TableCell className="text-xs text-muted-foreground">{d.program}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{d.semester}</TableCell>
                                    <TableCell className="text-sm font-medium text-rose-400">{formatFullCurrency(d.amountDue)}</TableCell>
                                    <TableCell className={`text-sm font-medium ${d.daysOverdue > 7 ? "text-rose-400" : "text-amber-400"}`}>{d.daysOverdue} days</TableCell>
                                    <TableCell>
                                        <Button size="sm" variant="ghost" className="text-gold-400 text-xs hover:bg-gold-500/5">
                                            Send Reminder
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}
