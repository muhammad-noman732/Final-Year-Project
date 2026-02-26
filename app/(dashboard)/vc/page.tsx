"use client";

import { useState, useEffect } from "react";
import {
    TrendingUp, Users, AlertTriangle, Filter,
    Activity, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatFullCurrency, DEPARTMENTS } from "@/config/constants";
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

/* ── Mock Data ── */
const trendData = Array.from({ length: 30 }, (_, i) => ({
    date: `${i + 1}`,
    amount: 150000 + Math.floor(Math.sin(i / 5) * 80000 + Math.random() * 120000),
}));

const todayVsYesterday = [
    { name: "Yesterday", amount: 390000 },
    { name: "Today", amount: 450000 },
];

const deptRate = [
    { department: "CS", fullName: "Computer Science", rate: 98, amount: 22050000 },
    { department: "BIO", fullName: "Biology", rate: 95, amount: 14250000 },
    { department: "PHY", fullName: "Physics", rate: 92, amount: 13800000 },
    { department: "MATH", fullName: "Mathematics", rate: 89, amount: 12400000 },
];

const payMethods = [
    { method: "Stripe", pct: 65, color: "#d4a843" },
    { method: "JazzCash", pct: 20, color: "#10b981" },
    { method: "EasyPaisa", pct: 10, color: "#0ea5e9" },
    { method: "Bank", pct: 5, color: "#f59e0b" },
];

const semData = [
    { s: "1st", paid: 5200000, unpaid: 300000 },
    { s: "2nd", paid: 8100000, unpaid: 450000 },
    { s: "3rd", paid: 4800000, unpaid: 200000 },
    { s: "4th", paid: 15600000, unpaid: 900000 },
    { s: "5th", paid: 3200000, unpaid: 150000 },
    { s: "6th", paid: 11400000, unpaid: 600000 },
    { s: "7th", paid: 2100000, unpaid: 100000 },
    { s: "8th", paid: 12100000, unpaid: 500000 },
];

const deptCards = [
    { name: "Computer Science", short: "CS", total: 450, collectible: 22500000, collected: 22050000, paid: 441, unpaid: 9, defaulters: 5, todayPay: 12, todayAmt: 150000, rate: 98 },
    { name: "Biology", short: "BIO", total: 300, collectible: 15000000, collected: 14250000, paid: 285, unpaid: 15, defaulters: 8, todayPay: 8, todayAmt: 96000, rate: 95 },
    { name: "Physics", short: "PHY", total: 280, collectible: 15000000, collected: 13800000, paid: 258, unpaid: 22, defaulters: 12, todayPay: 6, todayAmt: 72000, rate: 92 },
    { name: "Mathematics", short: "MATH", total: 217, collectible: 14000000, collected: 12400000, paid: 193, unpaid: 24, defaulters: 15, todayPay: 5, todayAmt: 60000, rate: 89 },
];

const livePool = [
    { name: "Hamza Shah", dept: "CS", sem: "4th", amount: 50000 },
    { name: "Aisha Noor", dept: "BIO", sem: "2nd", amount: 48000 },
    { name: "Tariq Mehmood", dept: "PHY", sem: "6th", amount: 52000 },
    { name: "Rabia Kanwal", dept: "MATH", sem: "4th", amount: 48000 },
    { name: "Faisal Khan", dept: "CS", sem: "2nd", amount: 50000 },
    { name: "Sadia Bibi", dept: "BIO", sem: "4th", amount: 48000 },
    { name: "Kamran Ali", dept: "CS", sem: "6th", amount: 52000 },
];

/* ── Custom Tooltip ── */
const Tip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color?: string }>; label?: string }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="px-3 py-2 rounded-xl border border-gold-500/15 bg-[#0d1321] shadow-xl text-xs backdrop-blur-sm">
            {label && <p className="text-gold-400/60 mb-1">{label}</p>}
            {payload.map((p, i) => (
                <p key={i} className="text-foreground">
                    <span style={{ color: p.color }} className="mr-1.5">●</span>
                    {p.name}: <span className="font-semibold">{typeof p.value === "number" && p.value > 999 ? formatFullCurrency(p.value) : `${p.value}%`}</span>
                </p>
            ))}
        </div>
    );
};

/* ── Glowing Stat Card ── */
function StatCard({ label, value, sub, icon: Icon, color, glowColor, trend }: {
    label: string; value: string; sub: string; icon: typeof TrendingUp;
    color: string; glowColor: string; trend?: "up" | "down" | "alert";
}) {
    return (
        <div className="relative rounded-2xl border border-white/[0.05] bg-gradient-to-br from-[#0d1321] to-[#080c14] p-5 overflow-hidden group hover:border-white/[0.08] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40">
            <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full blur-3xl opacity-20 transition-opacity duration-300 group-hover:opacity-35`} style={{ background: glowColor }} />
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border border-white/[0.04]`} style={{ background: `${glowColor}15` }}>
                <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-2xl font-bold text-foreground font-[family-name:var(--font-playfair)] leading-tight">{value}</p>
            <div className="flex items-center gap-1.5 mt-1.5">
                {trend === "up" && <ArrowUpRight className="w-3 h-3 text-emerald-400" />}
                {trend === "down" && <ArrowDownRight className="w-3 h-3 text-emerald-400" />}
                {trend === "alert" && <AlertTriangle className="w-3 h-3 text-rose-400" />}
                <p className={`text-xs ${trend === "alert" ? "text-rose-400" : "text-slate-500"}`}>{sub}</p>
            </div>
        </div>
    );
}

export default function VCDashboard() {
    const [lastUpdated, setLastUpdated] = useState(2);
    const [totalCollected, setTotalCollected] = useState(62500000);
    const [liveEvents, setLiveEvents] = useState<Array<{ id: number; name: string; dept: string; sem: string; amount: number; time: string; failed: boolean }>>([]);

    useEffect(() => {
        const initial = livePool.slice(0, 4).map((e, i) => ({ ...e, id: i, time: `${i + 1}m ago`, failed: false }));
        setLiveEvents(initial);

        let counter = 4;
        const feed = setInterval(() => {
            const e = livePool[counter % livePool.length];
            const failed = Math.random() < 0.08;
            setLiveEvents((p) => [{ ...e, id: counter, time: "Just now", failed }, ...p.slice(0, 11)]);
            if (!failed) setTotalCollected((p) => p + Math.floor(Math.random() * 8000 + 2000));
            counter++;
        }, 3000);

        const timer = setInterval(() => setLastUpdated((p) => (p >= 10 ? 2 : p + 2)), 2000);

        return () => { clearInterval(feed); clearInterval(timer); };
    }, []);

    return (
        <div className="space-y-5 pb-8">
            {/* ── Live indicator strip ── */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="relative w-2 h-2">
                        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
                        <span className="relative inline-block w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">Live</span>
                    <span className="text-xs text-slate-600">· Updated {lastUpdated}s ago</span>
                </div>
                <div className="flex gap-2">
                    {["PDF", "CSV", "Excel"].map((f) => (
                        <Button key={f} size="sm" variant="outline" className="h-7 text-[10px] px-2.5 border-white/[0.07] text-slate-500 hover:text-gold-400 hover:border-gold-500/20">
                            {f}
                        </Button>
                    ))}
                </div>
            </div>

            {/* ── HERO STATS ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 stagger-children">
                <StatCard label="Total Collected" value={formatCurrency(totalCollected)} sub="+PKR 450K today" icon={TrendingUp} color="#10b981" glowColor="#10b981" trend="up" />
                <StatCard label="Collection Rate" value="95.2%" sub="Target 90% · ↑ 2.1%" icon={TrendingUp} color="#d4a843" glowColor="#d4a843" trend="up" />
                <StatCard label="Students Paid" value="1,198 / 1,247" sub="96.1% of total" icon={Users} color="#0ea5e9" glowColor="#0ea5e9" trend="down" />
                <StatCard label="Defaulters" value="49 students" sub="15 past deadline" icon={AlertTriangle} color="#f43f5e" glowColor="#f43f5e" trend="alert" />
            </div>

            {/* ── FILTER BAR ── */}
            <div className="flex flex-wrap items-center gap-2 px-4 py-3 rounded-xl border border-white/[0.05] bg-[#0a0e1a]">
                <Filter className="w-3.5 h-3.5 text-slate-600" />
                {[
                    { placeholder: "All Departments", opts: ["All", ...DEPARTMENTS] },
                    { placeholder: "All Semesters", opts: ["All", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"] },
                    { placeholder: "This Month", opts: ["Today", "This Week", "This Month", "Custom"] },
                    { placeholder: "All Status", opts: ["All", "Paid", "Unpaid", "Overdue"] },
                ].map((s, i) => (
                    <Select key={i} defaultValue={s.opts[0]}>
                        <SelectTrigger className="h-8 text-xs min-w-[130px] bg-white/[0.02] border-white/[0.06] hover:border-gold-500/20 focus:border-gold-500/30 text-slate-400">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0d1321] border-white/[0.08]">
                            {s.opts.map((o) => <SelectItem key={o} value={o} className="text-xs text-slate-300">{o}</SelectItem>)}
                        </SelectContent>
                    </Select>
                ))}
                <button className="ml-auto text-xs text-slate-600 hover:text-gold-400 transition-colors">Reset</button>
            </div>

            {/* ── DEPARTMENT CARDS 2x2 ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deptCards.map((d) => (
                    <div key={d.name} className="rounded-2xl border border-white/[0.05] bg-gradient-to-br from-[#0d1321] to-[#080c14] p-5 hover:border-gold-500/12 transition-all duration-300 hover:-translate-y-0.5 group">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-foreground font-[family-name:var(--font-playfair)]">{d.name}</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] px-2 py-0.5 rounded-full border border-gold-500/20 text-gold-400 bg-gold-500/5 uppercase tracking-wider font-bold">{d.short}</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${d.rate >= 95 ? "text-emerald-400 bg-emerald-500/8 border border-emerald-500/15" : d.rate >= 90 ? "text-amber-400 bg-amber-500/8 border border-amber-500/15" : "text-rose-400 bg-rose-500/8 border border-rose-500/15"}`}>{d.rate}%</span>
                            </div>
                        </div>

                        {/* Numbers */}
                        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                            {[
                                { label: "Students", value: d.total.toString() },
                                { label: "Collectible", value: formatCurrency(d.collectible) },
                                { label: "Collected", value: formatCurrency(d.collected), green: true },
                            ].map((item) => (
                                <div key={item.label} className="rounded-lg bg-white/[0.02] border border-white/[0.04] py-2 px-1">
                                    <p className={`font-bold text-sm ${item.green ? "text-emerald-400" : "text-foreground"}`}>{item.value}</p>
                                    <p className="text-[9px] text-slate-600 uppercase tracking-wider mt-0.5">{item.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Progress */}
                        <div className="space-y-2 mb-3">
                            <div className="flex justify-between text-[10px] mb-0.5">
                                <span className="text-emerald-400">Paid: {d.paid} ({Math.round(d.paid / d.total * 100)}%)</span>
                                <span className="text-slate-500">Unpaid: {d.unpaid}</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                                <div className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000" style={{ width: `${d.paid / d.total * 100}%` }} />
                            </div>
                            {d.defaulters > 0 && (
                                <div className="flex items-center gap-1.5">
                                    <AlertTriangle className="w-3 h-3 text-rose-500" />
                                    <span className="text-[10px] text-rose-400">{d.defaulters} defaulters</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-white/[0.04] text-[11px]">
                            <span className="text-slate-500">Today: <span className="text-foreground font-medium">{d.todayPay} payments · {formatCurrency(d.todayAmt)}</span></span>
                            <button className="text-gold-400/60 hover:text-gold-400 transition-colors font-medium">View →</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── CHARTS ROW 1 ── */}
            <div className="grid lg:grid-cols-3 gap-4">
                {/* Line Chart */}
                <div className="lg:col-span-1 rounded-2xl border border-white/[0.05] bg-[#0a0e1a] p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-semibold text-foreground font-[family-name:var(--font-playfair)]">30-Day Trend</h4>
                        <Activity className="w-3.5 h-3.5 text-gold-500/30" />
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={trendData}>
                            <defs>
                                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#d4a843" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#d4a843" stopOpacity="1" />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                            <XAxis dataKey="date" tick={{ fill: "#475569", fontSize: 9 }} tickLine={false} axisLine={false} interval={6} />
                            <YAxis tick={{ fill: "#475569", fontSize: 9 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                            <Tooltip content={<Tip />} />
                            <Line type="monotone" dataKey="amount" name="Amount" stroke="url(#lineGrad)" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                        {[
                            { label: "Today", value: formatCurrency(450000) },
                            { label: "Peak", value: formatCurrency(620000) },
                            { label: "Avg", value: formatCurrency(320000) },
                        ].map((s) => (
                            <div key={s.label} className="rounded-lg bg-white/[0.02] py-1.5 px-1">
                                <p className="text-xs font-semibold text-gold-400">{s.value}</p>
                                <p className="text-[9px] text-slate-600 uppercase tracking-wider">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="lg:col-span-1 rounded-2xl border border-white/[0.05] bg-[#0a0e1a] p-5">
                    <h4 className="text-xs font-semibold text-foreground font-[family-name:var(--font-playfair)] mb-4">Today vs Yesterday</h4>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={todayVsYesterday} barGap={20}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                            <XAxis dataKey="name" tick={{ fill: "#475569", fontSize: 10 }} tickLine={false} axisLine={false} />
                            <YAxis tick={{ fill: "#475569", fontSize: 9 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                            <Tooltip content={<Tip />} />
                            <Bar dataKey="amount" name="Amount" radius={[8, 8, 0, 0]} barSize={54}>
                                <Cell fill="rgba(212,168,67,0.15)" />
                                <Cell fill="#d4a843" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="text-center mt-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                        <span className="text-xs text-emerald-400 font-semibold">▲ +15.4% from yesterday</span>
                    </div>
                </div>

                {/* Dept Rate Horizontal Bar */}
                <div className="lg:col-span-1 rounded-2xl border border-white/[0.05] bg-[#0a0e1a] p-5">
                    <h4 className="text-xs font-semibold text-foreground font-[family-name:var(--font-playfair)] mb-4">Collection Rate by Dept</h4>
                    <div className="space-y-4 mt-2">
                        {deptRate.map((d) => (
                            <div key={d.department}>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-slate-400">{d.department}</span>
                                    <span className={`font-bold ${d.rate >= 95 ? "text-emerald-400" : d.rate >= 90 ? "text-gold-400" : "text-amber-400"}`}>{d.rate}%</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${d.rate >= 95 ? "bg-emerald-500" : d.rate >= 90 ? "bg-gold-500" : "bg-amber-500"}`}
                                        style={{ width: `${d.rate}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Avg line indicator */}
                    <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-600">
                        <div className="flex-1 h-px border-t border-dashed border-slate-700" />
                        University avg: 93.5%
                        <div className="flex-1 h-px border-t border-dashed border-slate-700" />
                    </div>
                </div>
            </div>

            {/* ── CHARTS ROW 2 + LIVE FEED ── */}
            <div className="grid lg:grid-cols-3 gap-4">
                {/* Pie Chart */}
                <div className="rounded-2xl border border-white/[0.05] bg-[#0a0e1a] p-5">
                    <h4 className="text-xs font-semibold text-foreground font-[family-name:var(--font-playfair)] mb-2">Payment Methods</h4>
                    <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                            <Pie data={payMethods} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={4} dataKey="pct" nameKey="method">
                                {payMethods.map((e, i) => <Cell key={i} fill={e.color} stroke="transparent" />)}
                            </Pie>
                            <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: "#0d1321", border: "1px solid rgba(212,168,67,0.15)", borderRadius: 12, fontSize: 11 }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-1.5">
                        {payMethods.map((m) => (
                            <div key={m.method} className="flex items-center gap-2 text-[10px]">
                                <div className="w-2 h-2 rounded-full" style={{ background: m.color }} />
                                <span className="text-slate-500">{m.method}</span>
                                <span className="text-foreground font-medium ml-auto">{m.pct}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stacked Bar */}
                <div className="rounded-2xl border border-white/[0.05] bg-[#0a0e1a] p-5">
                    <h4 className="text-xs font-semibold text-foreground font-[family-name:var(--font-playfair)] mb-4">Collection by Semester</h4>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={semData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                            <XAxis dataKey="s" tick={{ fill: "#475569", fontSize: 9 }} tickLine={false} axisLine={false} />
                            <YAxis tick={{ fill: "#475569", fontSize: 9 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`} />
                            <Tooltip content={<Tip />} />
                            <Bar dataKey="paid" name="Paid" stackId="a" fill="#10b981" fillOpacity={0.8} />
                            <Bar dataKey="unpaid" name="Unpaid" stackId="a" fill="#f43f5e" fillOpacity={0.7} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Live Activity Feed */}
                <div className="rounded-2xl border border-white/[0.05] bg-[#0a0e1a] overflow-hidden">
                    <div className="px-4 py-3.5 border-b border-white/[0.04] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="relative w-2 h-2">
                                <span className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-70" />
                                <span className="relative block w-2 h-2 rounded-full bg-rose-400" />
                            </div>
                            <span className="text-xs font-bold text-foreground uppercase tracking-wider">Live Payments</span>
                        </div>
                        <span className="text-[10px] text-slate-600">every 3s</span>
                    </div>
                    <ScrollArea className="h-[280px]">
                        <div className="p-3 space-y-1.5">
                            {liveEvents.map((e) => (
                                <div
                                    key={e.id}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-500 ${e.failed
                                            ? "bg-rose-500/5 border-rose-500/12"
                                            : "bg-white/[0.02] border-white/[0.03]"
                                        }`}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${e.failed ? "bg-rose-400" : "bg-emerald-400"}`} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-foreground truncate">{e.name}</p>
                                        <p className="text-[10px] text-slate-500">{e.dept} · {e.sem} Sem</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-xs font-semibold text-gold-400">{formatFullCurrency(e.amount)}</p>
                                        <p className="text-[9px] text-slate-600">{e.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
