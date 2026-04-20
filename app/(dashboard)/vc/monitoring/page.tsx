"use client";

import { useState, useEffect } from "react";
import { Activity, Users, CreditCard, AlertTriangle, Server, Wifi, Database, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatFullCurrency } from "@/config/constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const liveStreamPool = [
    { student: "Ali Raza", dept: "CS", amount: 50000, method: "Stripe", status: "success" },
    { student: "Sana Fatima", dept: "BIO", amount: 48000, method: "JazzCash", status: "success" },
    { student: "Kamran Ali", dept: "PHY", amount: 52000, method: "Stripe", status: "success" },
    { student: "Noor Ul Ain", dept: "MATH", amount: 48000, method: "EasyPaisa", status: "success" },
    { student: "Hamza Tariq", dept: "CS", amount: 50000, method: "Bank", status: "failed" },
    { student: "Zainab Bibi", dept: "BIO", amount: 48000, method: "Stripe", status: "success" },
    { student: "Faisal Khan", dept: "CS", amount: 50000, method: "JazzCash", status: "success" },
    { student: "Sadia Noor", dept: "PHY", amount: 52000, method: "Stripe", status: "success" },
];

export default function VCMonitoringPage() {
    const [activeSessions, setActiveSessions] = useState(47);
    const [paymentsThisHour, setPaymentsThisHour] = useState(23);
    const [hourAmount, setHourAmount] = useState(1150000);
    const [failedAttempts] = useState(2);
    const [todayTotal, setTodayTotal] = useState(450000);
    const [todayCount, setTodayCount] = useState(89);
    const [streamEvents, setStreamEvents] = useState<Array<{ id: number; student: string; dept: string; amount: number; method: string; status: string; time: string }>>([]);
    const [minuteData, setMinuteData] = useState<Array<{ minute: string; count: number }>>([]);

    useEffect(() => {
        // Initialize minute data
        const now = new Date();
        const initMinutes = Array.from({ length: 10 }, (_, i) => ({
            minute: `${now.getHours()}:${String(now.getMinutes() - 9 + i).padStart(2, "0")}`,
            count: Math.floor(1 + Math.random() * 6),
        }));
        setMinuteData(initMinutes);

        // Initialize stream events
        const initEvents = liveStreamPool.slice(0, 5).map((e, i) => ({
            ...e,
            id: i,
            time: new Date(Date.now() - i * 30000).toLocaleTimeString(),
        }));
        setStreamEvents(initEvents);

        let counter = 5;
        const interval = setInterval(() => {
            const event = liveStreamPool[counter % liveStreamPool.length];
            const newTime = new Date().toLocaleTimeString();
            setStreamEvents((prev) => [
                { ...event, id: counter, time: newTime },
                ...prev.slice(0, 19),
            ]);

            if (event.status === "success") {
                setTodayTotal((p) => p + event.amount);
                setTodayCount((p) => p + 1);
                setPaymentsThisHour((p) => p + 1);
                setHourAmount((p) => p + event.amount);
            }

            setActiveSessions((p) => p + Math.floor(Math.random() * 3) - 1);
            counter++;
        }, 3500);

        // Update minute chart
        const minuteInterval = setInterval(() => {
            const now2 = new Date();
            setMinuteData((prev) => [
                ...prev.slice(1),
                { minute: `${now2.getHours()}:${String(now2.getMinutes()).padStart(2, "0")}`, count: Math.floor(1 + Math.random() * 6) },
            ]);
        }, 60000);

        return () => { clearInterval(interval); clearInterval(minuteInterval); };
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground tracking-tight">
                    Real-Time Monitoring
                </h1>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <div className="relative w-2 h-2">
                        <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                        <div className="relative w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase">Live — Connected</span>
                </div>
            </div>

            {/* ═══ LIVE METRICS ROW ═══ */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
                <Card className="glass-card border-0 p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center">
                            <Users className="w-4.5 h-4.5 text-sky-400" />
                        </div>
                        <div>
                            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Active Sessions</p>
                            <p className="text-xl font-bold text-foreground tracking-tight">{activeSessions}</p>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">students online right now</p>
                </Card>
                <Card className="glass-card border-0 p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-gold-500/10 flex items-center justify-center">
                            <CreditCard className="w-4.5 h-4.5 text-gold-400" />
                        </div>
                        <div>
                            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Payments This Hour</p>
                            <p className="text-xl font-bold text-foreground tracking-tight">{paymentsThisHour}</p>
                        </div>
                    </div>
                    <p className="text-xs text-gold-400">{formatFullCurrency(hourAmount)}</p>
                </Card>
                <Card className="glass-card border-0 p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center">
                            <AlertTriangle className="w-4.5 h-4.5 text-rose-400" />
                        </div>
                        <div>
                            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Failed Attempts</p>
                            <p className="text-xl font-bold text-foreground tracking-tight">{failedAttempts}</p>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">this hour</p>
                </Card>
                <Card className="glass-card border-0 p-5">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-2">Server Status</p>
                    <p className="text-sm font-medium text-emerald-400 mb-3">All Systems Operational</p>
                    <div className="space-y-1.5">
                        {[
                            { icon: Server, label: "API Server", status: "online" },
                            { icon: Database, label: "Database", status: "online" },
                            { icon: Wifi, label: "Payment Gateway", status: "online" },
                            { icon: Shield, label: "Auth Service", status: "online" },
                        ].map((svc) => (
                            <div key={svc.label} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                <span className="text-[11px] text-muted-foreground">{svc.label}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
                {/* ═══ LIVE PAYMENT STREAM ═══ */}
                <Card className="glass-card border-0 overflow-hidden lg:col-span-2">
                    <div className="px-4 py-3 border-b border-gold-500/5 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-gold-400" />
                        <span className="text-sm font-semibold text-foreground">Live Payment Stream</span>
                    </div>
                    <ScrollArea className="h-[400px]">
                        <div className="p-3 space-y-1.5">
                            {streamEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className={`flex items-center gap-4 px-3 py-2.5 rounded-lg border transition-all duration-500 ${event.status === "failed"
                                            ? "bg-rose-500/5 border-rose-500/15"
                                            : "bg-navy-700/20 border-gold-500/5"
                                        }`}
                                >
                                    <span className="text-[11px] text-muted-foreground font-mono w-20 flex-shrink-0">{event.time}</span>
                                    <span className="text-sm font-medium text-foreground flex-1">{event.student}</span>
                                    <span className="text-xs text-muted-foreground w-12">{event.dept}</span>
                                    <span className="text-xs font-medium text-gold-400 w-24 text-right">{formatFullCurrency(event.amount)}</span>
                                    <span className="text-xs text-muted-foreground w-16">{event.method}</span>
                                    <span className={`text-xs font-bold w-8 text-right ${event.status === "failed" ? "text-rose-400" : "text-emerald-400"}`}>
                                        {event.status === "failed" ? "FAIL" : "OK"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </Card>

                {/* Right column */}
                <div className="space-y-4">
                    {/* Payments Per Minute */}
                    <Card className="glass-card border-0 p-5">
                        <h3 className="text-sm font-semibold text-foreground tracking-tight mb-3">
                            Payments Per Minute
                        </h3>
                        <ResponsiveContainer width="100%" height={140}>
                            <BarChart data={minuteData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,168,67,0.06)" />
                                <XAxis dataKey="minute" tick={{ fill: "#94a3b8", fontSize: 8 }} tickLine={false} axisLine={false} />
                                <YAxis tick={{ fill: "#94a3b8", fontSize: 9 }} tickLine={false} axisLine={false} />
                                <Bar dataKey="count" name="Payments" fill="#d4a843" radius={[3, 3, 0, 0]} barSize={14} fillOpacity={0.7} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>

                    {/* Today's Collection Counter */}
                    <Card className="glass-card border-0 p-6 text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Today&apos;s Collection</p>
                        <p className="text-3xl font-bold text-gold-gradient tracking-tight mb-2 animate-count">
                            {formatFullCurrency(todayTotal)}
                        </p>
                        <p className="text-sm text-muted-foreground">{todayCount} payments</p>
                    </Card>

                    {/* Critical Alerts */}
                    <Card className="glass-card border-0 p-5">
                        <h3 className="text-sm font-semibold text-foreground tracking-tight mb-3">
                            Critical Alerts
                        </h3>
                        <div className="space-y-2">
                            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-rose-500/5 border border-rose-500/10">
                                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-medium text-rose-400">2 Failed Payments</p>
                                    <p className="text-[11px] text-muted-foreground">Card declined — Hamza Tariq</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/10">
                                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-medium text-amber-400">15 Overdue Deadlines</p>
                                    <p className="text-[11px] text-muted-foreground">Students past Feb 15 deadline</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
