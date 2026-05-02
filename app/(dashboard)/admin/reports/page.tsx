"use client";

import { useState } from "react";
import { FileBarChart, Users, Building2, CreditCard, Download, Calendar, FileText, Table as TableIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DEPARTMENTS, SEMESTERS } from "@/config/constants";

const reportTypes = [
    { id: "collection", title: "Fee Collection Summary", desc: "Overview of all fee collections with breakdowns", icon: FileBarChart, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { id: "defaulters", title: "Defaulters Report", desc: "Students with pending or overdue payments", icon: Users, color: "text-rose-400", bg: "bg-rose-500/10" },
    { id: "department", title: "Department-wise Collection", desc: "Collection comparison across departments", icon: Building2, color: "text-sky-400", bg: "bg-sky-500/10" },
    { id: "payment-method", title: "Payment Method Analysis", desc: "Breakdown by payment channels", icon: CreditCard, color: "text-gold-400", bg: "bg-gold-500/10" },
];

const recentReports = [
    { name: "Fee Collection Summary — Feb 2026", generatedOn: "Feb 25, 2026 3:45 PM", format: "PDF", size: "2.4 MB" },
    { name: "Defaulters Report — Feb 2026", generatedOn: "Feb 24, 2026 11:20 AM", format: "Excel", size: "1.1 MB" },
    { name: "Department Collection — Jan 2026", generatedOn: "Feb 1, 2026 9:00 AM", format: "CSV", size: "540 KB" },
    { name: "Payment Method Analysis — Q4 2025", generatedOn: "Jan 15, 2026 2:30 PM", format: "PDF", size: "3.2 MB" },
];

export default function ReportsPage() {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [format, setFormat] = useState("pdf");

    return (
        <div className="space-y-6 p-5 lg:p-8 pb-10">
            <h1 className="text-2xl font-bold text-[#0F172A] dark:text-foreground tracking-tight">Reports</h1>

            {/* Report Type Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reportTypes.map((type) => (
                    <Card
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`glass-card glass-card-hover border-0 p-5 cursor-pointer transition-all duration-300 ${selectedType === type.id
                                ? "ring-2 ring-amber-400/30 dark:ring-gold-500/30 shadow-md shadow-amber-100 dark:shadow-gold-500/5"
                                : "hover:shadow-md"
                            }`}
                    >
                        <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl ${type.bg} flex items-center justify-center flex-shrink-0`}>
                                <type.icon className={`w-6 h-6 ${type.color}`} />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-foreground tracking-tight mb-1">
                                    {type.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">{type.desc}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Configuration Panel */}
            {selectedType && (
                <Card className="glass-card border-0 p-6 animate-count">
                    <h3 className="text-sm font-semibold text-foreground tracking-tight mb-5">
                        Configure Report
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">Start Date</Label>
                            <Input type="date" className="bg-white/80 dark:bg-navy-800/50 border-slate-200 dark:border-gold-500/10 focus:border-amber-400 dark:focus:border-gold-500/30" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">End Date</Label>
                            <Input type="date" className="bg-white/80 dark:bg-navy-800/50 border-slate-200 dark:border-gold-500/10 focus:border-amber-400 dark:focus:border-gold-500/30" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">Department</Label>
                            <Select>
                                <SelectTrigger className="bg-white/80 dark:bg-navy-800/50 border-slate-200 dark:border-gold-500/10">
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-navy-800 border-slate-200 dark:border-gold-500/10">
                                    <SelectItem value="all">All Departments</SelectItem>
                                    {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">Semester</Label>
                            <Select>
                                <SelectTrigger className="bg-white/80 dark:bg-navy-800/50 border-slate-200 dark:border-gold-500/10">
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-navy-800 border-slate-200 dark:border-gold-500/10">
                                    <SelectItem value="all">All Semesters</SelectItem>
                                    {SEMESTERS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Format Selector */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Format:</span>
                        {[
                            { val: "pdf", label: "PDF", icon: FileText },
                            { val: "csv", label: "CSV", icon: TableIcon },
                            { val: "excel", label: "Excel", icon: TableIcon },
                        ].map((f) => (
                            <Button
                                key={f.val}
                                size="sm"
                                variant={format === f.val ? "default" : "outline"}
                                onClick={() => setFormat(f.val)}
                                className={format === f.val
                                    ? "bg-gold-500/15 text-gold-400 border-gold-500/25 hover:bg-gold-500/20"
                                    : "border-gold-500/10 text-muted-foreground hover:text-gold-400 hover:border-gold-500/20"
                                }
                            >
                                <f.icon className="w-3.5 h-3.5 mr-1.5" /> {f.label}
                            </Button>
                        ))}
                    </div>

                    <Button className="bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 font-semibold shadow-lg shadow-gold-500/20">
                        <Download className="w-4 h-4 mr-2" /> Generate Report
                    </Button>
                </Card>
            )}

            {/* Recent Reports */}
            <Card className="glass-card border-0 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200/80 dark:border-gold-500/5">
                    <h3 className="text-sm font-semibold text-[#0F172A] dark:text-foreground tracking-tight">Recent Reports</h3>
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-200/80 dark:border-gold-500/5 hover:bg-transparent">
                                <TableHead className="text-slate-500 dark:text-gold-500/60 text-xs uppercase tracking-wider">Report Name</TableHead>
                                <TableHead className="text-slate-500 dark:text-gold-500/60 text-xs uppercase tracking-wider">Generated On</TableHead>
                                <TableHead className="text-slate-500 dark:text-gold-500/60 text-xs uppercase tracking-wider">Format</TableHead>
                                <TableHead className="text-slate-500 dark:text-gold-500/60 text-xs uppercase tracking-wider">Size</TableHead>
                                <TableHead className="text-slate-500 dark:text-gold-500/60 text-xs uppercase tracking-wider">Download</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentReports.map((report) => (
                                <TableRow key={report.name} className="border-slate-200/60 dark:border-gold-500/5 hover:bg-slate-50/80 dark:hover:bg-navy-700/20">
                                    <TableCell className="text-sm font-medium">{report.name}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{report.generatedOn}</TableCell>
                                    <TableCell>
                                        <span className="px-2 py-0.5 text-[11px] font-bold uppercase rounded bg-gold-500/10 text-gold-400 border border-gold-500/15">
                                            {report.format}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{report.size}</TableCell>
                                    <TableCell>
                                        <Button size="sm" variant="ghost" className="text-gold-400 hover:bg-gold-500/5">
                                            <Download className="w-3.5 h-3.5" />
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
