"use client";

import { useState } from "react";
import { Plus, AlertTriangle, Mail, Download, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, UserPlus, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatFullCurrency } from "@/config/constants";
import { Skeleton } from "boneyard-js/react";

import { useGetFeeStructures } from "@/hooks/admin/useGetFeeStructures";
import { useAddFeeStructure } from "@/hooks/admin/useAddFeeStructure";
import { useAssignFee } from "@/hooks/admin/useAssignFee";

const defaulters = [
    { id: "1", studentName: "Zain Abbas", department: "Mathematics", semester: "6th", amountDue: 52000, deadline: "Feb 15, 2026", daysOverdue: 11 },
    { id: "2", studentName: "Bilal Ahmed", department: "Mathematics", semester: "2nd", amountDue: 48000, deadline: "Feb 20, 2026", daysOverdue: 6 },
    { id: "3", studentName: "Kashif Raza", department: "Physics", semester: "4th", amountDue: 50000, deadline: "Feb 10, 2026", daysOverdue: 16 },
    { id: "4", studentName: "Nadia Shah", department: "Biology", semester: "4th", amountDue: 50000, deadline: "Feb 12, 2026", daysOverdue: 14 },
    { id: "5", studentName: "Hamza Iqbal", department: "Computer Science", semester: "6th", amountDue: 52000, deadline: "Feb 15, 2026", daysOverdue: 11 },
];

export default function FeesPage() {
    // --- Data Queries ---
    const {
        programs,
        semesters,
        sessions,
        page,
        setPage,
        feeStructures,
        meta,
        isLoading
    } = useGetFeeStructures();

    // --- Form Mutations ---
    const [createOpen, setCreateOpen] = useState(false);
    const { form, onSubmit, isLoading: isCreating, computedTotal } = useAddFeeStructure(() => setCreateOpen(false));
    const { register, formState: { errors }, setValue, watch } = form;

    const watchedProgramId = watch("programId");
    const watchedSemester = watch("semester");
    const watchedSessionYear = watch("sessionYear");

    // --- Assignment ---
    const { assignAll, isAssigning } = useAssignFee();
    const [assigningId, setAssigningId] = useState<string | null>(null);

    const handleAssign = async (feeStructureId: string) => {
        setAssigningId(feeStructureId);
        await assignAll(feeStructureId);
        setAssigningId(null);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
                Fee Management
            </h1>

            <Tabs defaultValue="structures" className="space-y-4">
                <TabsList className="bg-navy-800/50 border border-gold-500/8">
                    <TabsTrigger value="structures" className="data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-400">
                        Fee Structures
                    </TabsTrigger>
                    <TabsTrigger value="defaulters" className="data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-400">
                        Defaulters
                        <span className="ml-2 px-1.5 py-0.5 text-[11px] font-bold rounded-full bg-rose-500/15 text-rose-400">
                            {defaulters.length}
                        </span>
                    </TabsTrigger>
                </TabsList>

                {/* ═══ FEE STRUCTURES TAB ═══ */}
                <TabsContent value="structures">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-sm text-muted-foreground">{meta.total} structures</p>
                        <Button onClick={() => setCreateOpen(true)} className="bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 font-semibold shadow-lg shadow-gold-500/20">
                            <Plus className="w-4 h-4 mr-2" /> Create Fee Structure
                        </Button>
                    </div>

                    <Skeleton name="fee-structures-table" loading={isLoading}>
                        <Card className="glass-card border-0 overflow-hidden">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-gold-500/5 hover:bg-transparent">
                                            <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Program</TableHead>
                                            <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Semester</TableHead>
                                            <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Session</TableHead>
                                            <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Total Amount</TableHead>
                                            <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Deadline</TableHead>
                                            <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Students</TableHead>
                                            <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Status</TableHead>
                                            <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {feeStructures.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">No fee structures found.</TableCell>
                                            </TableRow>
                                        ) : (
                                            feeStructures.map((fs) => (
                                                <TableRow key={fs.id} className="border-gold-500/5 hover:bg-navy-700/20">
                                                    <TableCell className="text-sm text-muted-foreground">{fs.program.code}</TableCell>
                                                    <TableCell className="text-sm font-medium">{fs.semester} Semester</TableCell>
                                                    <TableCell className="text-sm text-muted-foreground">{fs.sessionYear}</TableCell>
                                                    <TableCell className="text-sm font-medium">{formatFullCurrency(fs.totalFee)}</TableCell>
                                                    <TableCell className="text-sm text-muted-foreground">{new Date(fs.dueDate).toLocaleDateString()}</TableCell>
                                                    <TableCell className="text-sm text-muted-foreground">{fs._count.assignments}</TableCell>
                                                    <TableCell><StatusBadge status={fs.isActive ? "active" : "inactive"} /></TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-1">
                                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-sky-400"><Eye className="w-3.5 h-3.5" /></Button>
                                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-gold-400"><Pencil className="w-3.5 h-3.5" /></Button>
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                title="Assign to Students"
                                                                disabled={isAssigning && assigningId === fs.id}
                                                                onClick={() => handleAssign(fs.id)}
                                                                className="h-8 w-8 text-muted-foreground hover:text-emerald-400"
                                                            >
                                                                {isAssigning && assigningId === fs.id
                                                                    ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                                    : <UserPlus className="w-3.5 h-3.5" />}
                                                            </Button>
                                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-rose-400"><Trash2 className="w-3.5 h-3.5" /></Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="flex items-center justify-between px-4 py-3 border-t border-gold-500/5">
                                <p className="text-xs text-muted-foreground">Showing {feeStructures.length} of {meta.total}</p>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant="outline" className="border-gold-500/10 text-muted-foreground" disabled={page === 1} onClick={() => setPage(page - 1)}>
                                        <ChevronLeft className="w-4 h-4" />
                                    </Button>
                                    <span className="text-sm text-muted-foreground mx-2">Page {page} of {meta.totalPages}</span>
                                    <Button size="sm" variant="outline" className="border-gold-500/10 text-muted-foreground" disabled={page >= meta.totalPages} onClick={() => setPage(page + 1)}>
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </Skeleton>
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
                                <p className="text-2xl font-bold text-foreground tracking-tight">{defaulters.length}</p>
                            </div>
                        </Card>
                        <Card className="glass-card border-0 p-5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-amber-400" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Outstanding</p>
                                <p className="text-2xl font-bold text-foreground tracking-tight">
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
                                            <input type="checkbox" className="w-4 h-4 rounded border-gold-500/20 bg-navy-800" readOnly />
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
                                                <input type="checkbox" className="w-4 h-4 rounded border-gold-500/20 bg-navy-800" readOnly />
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
                <DialogContent className="bg-navy-900 border border-gold-500/10 w-full sm:max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold tracking-tight">
                            Create Fee Structure
                        </DialogTitle>
                    </DialogHeader>
                    <form className="space-y-5 mt-4" onSubmit={onSubmit}>
                        
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Program</Label>
                            <Select value={watchedProgramId} onValueChange={(v) => setValue("programId", v, { shouldValidate: true })}>
                                <SelectTrigger className={`bg-navy-800/50 ${errors.programId ? "border-rose-500/50" : "border-gold-500/10"}`}>
                                    <SelectValue placeholder="Select Program" />
                                </SelectTrigger>
                                <SelectContent className="bg-navy-800 border-gold-500/10">
                                    {programs.map((p) => (
                                        <SelectItem key={p.id} value={p.id}>{p.code} - {p.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.programId && <p className="text-xs text-rose-400">{errors.programId.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm text-foreground/80">Semester</Label>
                                <Select value={String(watchedSemester)} onValueChange={(v) => setValue("semester", Number(v), { shouldValidate: true })}>
                                    <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-navy-800 border-gold-500/10">
                                        {semesters.map((s) => <SelectItem key={s} value={String(s)}>{s} Semester</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm text-foreground/80">Session Year</Label>
                                <Select value={String(watchedSessionYear)} onValueChange={(v) => setValue("sessionYear", Number(v), { shouldValidate: true })}>
                                    <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-navy-800 border-gold-500/10">
                                        {Array.from(new Set(sessions.flatMap(s => [s.startYear, s.endYear]))).sort().map((yr) => (
                                            <SelectItem key={yr} value={String(yr)}>{yr}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-3 p-4 rounded-xl bg-navy-800/30 border border-gold-500/5">
                            <p className="text-xs text-gold-500/60 uppercase tracking-wider font-medium mb-3">Fee Breakdown</p>
                            {[
                                { label: "Tuition Fee", name: "tuitionFee" },
                                { label: "Lab Fee", name: "labFee" },
                                { label: "Library Fee", name: "libraryFee" },
                                { label: "Sports Fee", name: "sportsFee" },
                                { label: "Registration Fee", name: "registrationFee" },
                                { label: "Examination Fee", name: "examinationFee" },
                                { label: "Other Fee", name: "otherFee" },
                            ].map((item) => (
                                <div key={item.name} className="flex items-center gap-3">
                                    <Label className="text-sm text-muted-foreground w-32 flex-shrink-0">{item.label}</Label>
                                    <div className="w-full">
                                        <Input
                                            type="number"
                                            {...register(item.name as keyof typeof form.getValues, { valueAsNumber: true })}
                                            className="bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30"
                                        />
                                        {errors[item.name as keyof typeof form.getValues] && (
                                            <p className="text-xs text-rose-400 mt-1">{(errors[item.name as keyof typeof form.getValues] as any)?.message}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="flex items-center justify-between pt-3 border-t border-gold-500/10">
                                <span className="text-sm font-bold text-gold-400">Total Setup</span>
                                <span className="text-lg font-bold text-gold-gradient tracking-tight">
                                    {formatFullCurrency(computedTotal)}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm text-foreground/80">Deadline</Label>
                                <Input type="date" {...register("dueDate")} className={`bg-navy-800/50 ${errors.dueDate ? "border-rose-500/50" : "border-gold-500/10"}`} />
                                {errors.dueDate && <p className="text-xs text-rose-400">{errors.dueDate.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm text-foreground/80">Late Fee (/day)</Label>
                                <Input type="number" {...register("lateFee", { valueAsNumber: true })} className="bg-navy-800/50 border-gold-500/10" />
                                {errors.lateFee && <p className="text-xs text-rose-400">{errors.lateFee.message}</p>}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button type="button" variant="outline" className="flex-1 border-gold-500/20 text-muted-foreground" onClick={() => setCreateOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isCreating} className="flex-1 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-navy-950 font-semibold shadow-gold">
                                {isCreating ? "Creating..." : "Create & Assign"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
