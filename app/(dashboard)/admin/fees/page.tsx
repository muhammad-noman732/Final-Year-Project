"use client";

import { useState } from "react";
import { Plus, AlertTriangle, Mail, Download, Eye, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StatusBadge from "@/components/shared/StatusBadge";
import { DEPARTMENTS, SEMESTERS, SESSIONS, formatFullCurrency } from "@/config/constants";

const feeStructures = [
    { id: "1", semester: "4th", session: "2024-2028", department: "All Departments", totalAmount: 50000, deadline: "Mar 15, 2026", studentsAssigned: 312, status: "active" },
    { id: "2", semester: "2nd", session: "2024-2028", department: "All Departments", totalAmount: 48000, deadline: "Mar 15, 2026", studentsAssigned: 285, status: "active" },
    { id: "3", semester: "6th", session: "2023-2027", department: "Computer Science", totalAmount: 52000, deadline: "Mar 15, 2026", studentsAssigned: 110, status: "active" },
    { id: "4", semester: "8th", session: "2022-2026", department: "All Departments", totalAmount: 45000, deadline: "Jan 31, 2026", studentsAssigned: 245, status: "expired" },
];

const defaulters = [
    { id: "1", studentName: "Zain Abbas", department: "Mathematics", semester: "6th", amountDue: 52000, deadline: "Feb 15, 2026", daysOverdue: 11 },
    { id: "2", studentName: "Bilal Ahmed", department: "Mathematics", semester: "2nd", amountDue: 48000, deadline: "Feb 20, 2026", daysOverdue: 6 },
    { id: "3", studentName: "Kashif Raza", department: "Physics", semester: "4th", amountDue: 50000, deadline: "Feb 10, 2026", daysOverdue: 16 },
    { id: "4", studentName: "Nadia Shah", department: "Biology", semester: "4th", amountDue: 50000, deadline: "Feb 12, 2026", daysOverdue: 14 },
    { id: "5", studentName: "Hamza Iqbal", department: "Computer Science", semester: "6th", amountDue: 52000, deadline: "Feb 15, 2026", daysOverdue: 11 },
];

export default function FeesPage() {
    const [createOpen, setCreateOpen] = useState(false);
    const [tuition, setTuition] = useState(35000);
    const [lab, setLab] = useState(5000);
    const [library, setLibrary] = useState(3000);
    const [sports, setSports] = useState(2000);
    const [registration, setRegistration] = useState(5000);
    const total = tuition + lab + library + sports + registration;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-playfair)]">
                Fee Management
            </h1>

            <Tabs defaultValue="structures" className="space-y-4">
                <TabsList className="bg-navy-800/50 border border-gold-500/8">
                    <TabsTrigger value="structures" className="data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-400">
                        Fee Structures
                    </TabsTrigger>
                    <TabsTrigger value="defaulters" className="data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-400">
                        Defaulters
                        <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-rose-500/15 text-rose-400">
                            {defaulters.length}
                        </span>
                    </TabsTrigger>
                </TabsList>

                {/* ═══ FEE STRUCTURES TAB ═══ */}
                <TabsContent value="structures">
                    <div className="flex justify-end mb-4">
                        <Button onClick={() => setCreateOpen(true)} className="bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 font-semibold shadow-lg shadow-gold-500/20">
                            <Plus className="w-4 h-4 mr-2" /> Create Fee Structure
                        </Button>
                    </div>
                    <Card className="glass-card border-0 overflow-hidden">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-gold-500/5 hover:bg-transparent">
                                        <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Semester</TableHead>
                                        <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Session</TableHead>
                                        <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Department</TableHead>
                                        <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Total Amount</TableHead>
                                        <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Deadline</TableHead>
                                        <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Students</TableHead>
                                        <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Status</TableHead>
                                        <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {feeStructures.map((fs) => (
                                        <TableRow key={fs.id} className="border-gold-500/5 hover:bg-navy-700/20">
                                            <TableCell className="text-sm font-medium">{fs.semester} Semester</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{fs.session}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{fs.department}</TableCell>
                                            <TableCell className="text-sm font-medium">{formatFullCurrency(fs.totalAmount)}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{fs.deadline}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{fs.studentsAssigned}</TableCell>
                                            <TableCell><StatusBadge status={fs.status} /></TableCell>
                                            <TableCell>
                                                <div className="flex gap-1">
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-sky-400"><Eye className="w-3.5 h-3.5" /></Button>
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-gold-400"><Pencil className="w-3.5 h-3.5" /></Button>
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-rose-400"><Trash2 className="w-3.5 h-3.5" /></Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </TabsContent>

                {/* ═══ DEFAULTERS TAB ═══ */}
                <TabsContent value="defaulters">
                    {/* Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <Card className="glass-card border-0 p-5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-rose-400" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Defaulters</p>
                                <p className="text-2xl font-bold text-foreground font-[family-name:var(--font-playfair)]">{defaulters.length}</p>
                            </div>
                        </Card>
                        <Card className="glass-card border-0 p-5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-amber-400" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Outstanding</p>
                                <p className="text-2xl font-bold text-foreground font-[family-name:var(--font-playfair)]">
                                    {formatFullCurrency(defaulters.reduce((s, d) => s + d.amountDue, 0))}
                                </p>
                            </div>
                        </Card>
                    </div>

                    <div className="flex gap-3 mb-4">
                        <Button className="bg-gold-500/10 text-gold-400 border border-gold-500/15 hover:bg-gold-500/15">
                            <Mail className="w-4 h-4 mr-2" /> Send Reminder Email
                        </Button>
                        <Button className="bg-gold-500/10 text-gold-400 border border-gold-500/15 hover:bg-gold-500/15">
                            <Download className="w-4 h-4 mr-2" /> Export
                        </Button>
                    </div>

                    <Card className="glass-card border-0 overflow-hidden">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-gold-500/5 hover:bg-transparent">
                                        <TableHead className="w-10">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gold-500/20 bg-navy-800" />
                                        </TableHead>
                                        <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Student Name</TableHead>
                                        <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Department</TableHead>
                                        <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Semester</TableHead>
                                        <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Amount Due</TableHead>
                                        <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Deadline</TableHead>
                                        <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Days Overdue</TableHead>
                                        <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {defaulters.map((d) => (
                                        <TableRow key={d.id} className="border-gold-500/5 hover:bg-navy-700/20">
                                            <TableCell>
                                                <input type="checkbox" className="w-4 h-4 rounded border-gold-500/20 bg-navy-800" />
                                            </TableCell>
                                            <TableCell className="text-sm font-medium">{d.studentName}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{d.department}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{d.semester}</TableCell>
                                            <TableCell className="text-sm font-medium text-rose-400">{formatFullCurrency(d.amountDue)}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{d.deadline}</TableCell>
                                            <TableCell>
                                                <span className={`text-sm font-medium ${d.daysOverdue > 10 ? "text-rose-400" : "text-amber-400"}`}>
                                                    {d.daysOverdue} days
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-gold-400">
                                                    <Mail className="w-3.5 h-3.5 mr-1.5" /> Remind
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* ═══ CREATE FEE STRUCTURE MODAL ═══ */}
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent className="bg-navy-900 border border-gold-500/10 max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold font-[family-name:var(--font-playfair)]">
                            Create Fee Structure
                        </DialogTitle>
                    </DialogHeader>
                    <form className="space-y-5 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm text-foreground/80">Semester</Label>
                                <Select>
                                    <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-navy-800 border-gold-500/10">
                                        {SEMESTERS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm text-foreground/80">Session</Label>
                                <Select>
                                    <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-navy-800 border-gold-500/10">
                                        {SESSIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Department</Label>
                            <Select>
                                <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                    <SelectValue placeholder="All departments" />
                                </SelectTrigger>
                                <SelectContent className="bg-navy-800 border-gold-500/10">
                                    <SelectItem value="all">All Departments</SelectItem>
                                    {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-3 p-4 rounded-xl bg-navy-800/30 border border-gold-500/5">
                            <p className="text-xs text-gold-500/60 uppercase tracking-wider font-medium mb-3">Fee Breakdown</p>
                            {[
                                { label: "Tuition Fee", value: tuition, setter: setTuition },
                                { label: "Lab Fee", value: lab, setter: setLab },
                                { label: "Library Fee", value: library, setter: setLibrary },
                                { label: "Sports Fee", value: sports, setter: setSports },
                                { label: "Registration Fee", value: registration, setter: setRegistration },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-3">
                                    <Label className="text-sm text-muted-foreground w-32 flex-shrink-0">{item.label}</Label>
                                    <Input
                                        type="number"
                                        value={item.value}
                                        onChange={(e) => item.setter(Number(e.target.value))}
                                        className="bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30"
                                    />
                                </div>
                            ))}
                            <div className="flex items-center justify-between pt-3 border-t border-gold-500/10">
                                <span className="text-sm font-bold text-gold-400">Total</span>
                                <span className="text-lg font-bold text-gold-gradient font-[family-name:var(--font-playfair)]">
                                    {formatFullCurrency(total)}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Deadline</Label>
                            <Input type="date" className="bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30" />
                        </div>

                        <div className="flex items-center justify-between py-2">
                            <Label className="text-sm text-foreground/80">Apply to all students in semester</Label>
                            <Switch defaultChecked />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button type="button" variant="outline" className="flex-1 border-gold-500/20 text-muted-foreground" onClick={() => setCreateOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="button" className="flex-1 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 font-semibold" onClick={() => setCreateOpen(false)}>
                                Create & Assign
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
