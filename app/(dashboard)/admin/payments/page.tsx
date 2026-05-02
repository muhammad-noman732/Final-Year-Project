"use client";

import { useState, useEffect } from "react";
import { Banknote, TrendingUp, Clock, AlertTriangle, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatCurrency, formatFullCurrency, PAYMENT_METHOD_LABELS } from "@/config/constants";

const stats = [
    { label: "Total Collected", value: "PKR 62.5M", icon: Banknote, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Today's Collection", value: "PKR 450K", icon: TrendingUp, color: "text-gold-400", bg: "bg-gold-500/10" },
    { label: "Pending Verification", value: "12", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Failed Payments", value: "3", icon: AlertTriangle, color: "text-rose-400", bg: "bg-rose-500/10" },
];

const payments = [
    { id: "TXN-2026-00456", student: "Ahmed Hassan", department: "Computer Science", amount: 50000, method: "stripe", dateTime: "Feb 26, 2026 12:45 PM", status: "paid" },
    { id: "TXN-2026-00455", student: "Fatima Zahra", department: "Computer Science", amount: 50000, method: "jazzcash", dateTime: "Feb 26, 2026 12:30 PM", status: "paid" },
    { id: "TXN-2026-00454", student: "Usman Ali", department: "Biology", amount: 48000, method: "stripe", dateTime: "Feb 26, 2026 12:15 PM", status: "pending" },
    { id: "TXN-2026-00453", student: "Ayesha Khan", department: "Physics", amount: 52000, method: "easypaisa", dateTime: "Feb 26, 2026 11:58 AM", status: "paid" },
    { id: "TXN-2026-00452", student: "Bilal Ahmed", department: "Mathematics", amount: 48000, method: "bank", dateTime: "Feb 26, 2026 11:40 AM", status: "failed" },
    { id: "TXN-2026-00451", student: "Sara Malik", department: "Computer Science", amount: 52000, method: "stripe", dateTime: "Feb 26, 2026 11:22 AM", status: "paid" },
    { id: "TXN-2026-00450", student: "Omar Farooq", department: "Biology", amount: 45000, method: "jazzcash", dateTime: "Feb 26, 2026 11:05 AM", status: "paid" },
    { id: "TXN-2026-00449", student: "Hina Tariq", department: "Physics", amount: 48000, method: "stripe", dateTime: "Feb 26, 2026 10:48 AM", status: "paid" },
];

const liveEventPool = [
    { name: "Muhammad Rizwan", dept: "CS", amount: 50000, method: "Stripe" },
    { name: "Sana Fatima", dept: "BIO", amount: 48000, method: "JazzCash" },
    { name: "Ali Raza", dept: "PHY", amount: 52000, method: "EasyPaisa" },
    { name: "Noor Ul Ain", dept: "MATH", amount: 48000, method: "Stripe" },
    { name: "Hamza Tariq", dept: "CS", amount: 50000, method: "Bank" },
    { name: "Zainab Bibi", dept: "BIO", amount: 48000, method: "Stripe" },
];

export default function PaymentsPage() {
    const [liveEvents, setLiveEvents] = useState<Array<{ id: number; name: string; dept: string; amount: number; method: string; time: string; status: string }>>([]);

    useEffect(() => {
        const initial = liveEventPool.slice(0, 3).map((e, i) => ({
            ...e,
            id: i,
            time: `${i + 1}m ago`,
            status: "success",
        }));
        setLiveEvents(initial);

        let counter = 3;
        const interval = setInterval(() => {
            const event = liveEventPool[counter % liveEventPool.length];
            const isFailed = Math.random() < 0.1;
            setLiveEvents((prev) => [
                { ...event, id: counter, time: "Just now", status: isFailed ? "failed" : "success" },
                ...prev.slice(0, 9),
            ]);
            counter++;
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6 p-5 lg:p-8 pb-10">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[#0F172A] dark:text-foreground tracking-tight">Payments</h1>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
                {stats.map((stat) => (
                    <Card key={stat.label} className="glass-card glass-card-hover border-0 p-5 cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex items-start justify-between mb-3">
                            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-[#0F172A] dark:text-foreground tracking-tight">{stat.value}</p>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* ═══ LIVE FEED ═══ */}
                <Card className="glass-card border-0 lg:col-span-1 overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-200/80 dark:border-gold-500/5 flex items-center gap-2">
                        <div className="relative w-2 h-2">
                            <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                            <div className="relative w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">Live Payments</span>
                    </div>
                    <ScrollArea className="h-[480px]">
                        <div className="p-3 space-y-2">
                            {liveEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className={`p-3 rounded-lg border transition-all duration-500 ${event.status === "failed"
                                            ? "bg-rose-500/5 border-rose-500/15"
                                            : "bg-slate-50 dark:bg-navy-700/20 border-slate-200/70 dark:border-gold-500/5"
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium text-foreground">{event.name}</span>
                                        <span className="text-[11px] text-muted-foreground">{event.time}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">
                                            {event.dept} • {event.method}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gold-400">{formatFullCurrency(event.amount)}</span>
                                            <span className={`text-xs ${event.status === "failed" ? "text-rose-400" : "text-emerald-400"}`}>
                                                {event.status === "failed" ? "✗" : "✓"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </Card>

                {/* ═══ PAYMENTS TABLE ═══ */}
                <Card className="glass-card border-0 lg:col-span-2 overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-200/80 dark:border-gold-500/5 flex flex-wrap items-center gap-3">
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[120px] bg-white/80 dark:bg-navy-800/50 border-slate-200 dark:border-gold-500/10 text-sm h-8">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-navy-800 border-slate-200 dark:border-gold-500/10">
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[120px] bg-white/80 dark:bg-navy-800/50 border-slate-200 dark:border-gold-500/10 text-sm h-8">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-navy-800 border-slate-200 dark:border-gold-500/10">
                                <SelectItem value="all">All Methods</SelectItem>
                                <SelectItem value="stripe">Stripe</SelectItem>
                                <SelectItem value="jazzcash">JazzCash</SelectItem>
                                <SelectItem value="easypaisa">EasyPaisa</SelectItem>
                                <SelectItem value="bank">Bank</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-slate-200/80 dark:border-gold-500/5 hover:bg-transparent">
                                    <TableHead className="text-slate-500 dark:text-gold-500/60 text-xs uppercase tracking-wider">Transaction ID</TableHead>
                                    <TableHead className="text-slate-500 dark:text-gold-500/60 text-xs uppercase tracking-wider">Student</TableHead>
                                    <TableHead className="text-slate-500 dark:text-gold-500/60 text-xs uppercase tracking-wider">Department</TableHead>
                                    <TableHead className="text-slate-500 dark:text-gold-500/60 text-xs uppercase tracking-wider">Amount</TableHead>
                                    <TableHead className="text-slate-500 dark:text-gold-500/60 text-xs uppercase tracking-wider">Method</TableHead>
                                    <TableHead className="text-slate-500 dark:text-gold-500/60 text-xs uppercase tracking-wider">Date & Time</TableHead>
                                    <TableHead className="text-slate-500 dark:text-gold-500/60 text-xs uppercase tracking-wider">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payments.map((p) => (
                                    <TableRow key={p.id} className="border-slate-200/60 dark:border-gold-500/5 hover:bg-slate-50/80 dark:hover:bg-navy-700/20">
                                        <TableCell className="text-xs font-mono text-muted-foreground">{p.id}</TableCell>
                                        <TableCell className="text-sm font-medium">{p.student}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{p.department}</TableCell>
                                        <TableCell className="text-sm font-medium">{formatFullCurrency(p.amount)}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{PAYMENT_METHOD_LABELS[p.method]}</TableCell>
                                        <TableCell className="text-xs text-muted-foreground">{p.dateTime}</TableCell>
                                        <TableCell><StatusBadge status={p.status} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Card>
            </div>
        </div>
    );
}
