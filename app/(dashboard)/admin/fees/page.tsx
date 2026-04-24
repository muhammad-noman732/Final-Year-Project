"use client";

import { useState, useCallback } from "react";
import { Plus, AlertTriangle, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, UserPlus, Loader2, DollarSign, Calendar, BookOpen, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatFullCurrency } from "@/config/constants";
import { Skeleton } from "boneyard-js/react";

import { useGetFeeStructures } from "@/hooks/admin/useGetFeeStructures";
import { useAddFeeStructure } from "@/hooks/admin/useAddFeeStructure";
import { useUpdateFeeStructure } from "@/hooks/admin/useUpdateFeeStructure";
import { useDeactivateFeeStructure } from "@/hooks/admin/useDeactivateFeeStructure";
import { useAssignFee } from "@/hooks/admin/useAssignFee";
import type { FeeStructure } from "@/types/client/store/fee.store.types";

export default function FeesPage() {
    // ── Data Queries ──────────────────────────────────────────────
    const {
        programs, semesters, sessions,
        page, setPage,
        feeStructures, meta, isLoading,
    } = useGetFeeStructures();

    // ── Create ────────────────────────────────────────────────────
    const [createOpen, setCreateOpen] = useState(false);
    const { form: createForm, onSubmit: createOnSubmit, isLoading: isCreating, computedTotal: createTotal } = useAddFeeStructure(() => setCreateOpen(false));
    const { register: createRegister, formState: { errors: createErrors }, setValue: createSetValue, watch: createWatch } = createForm;
    const watchedProgramId = createWatch("programId");
    const watchedSemester = createWatch("semester");
    const watchedSessionYear = createWatch("sessionYear");

    // ── View ──────────────────────────────────────────────────────
    const [viewFs, setViewFs] = useState<FeeStructure | null>(null);

    // ── Edit ──────────────────────────────────────────────────────
    const [editFs, setEditFs] = useState<FeeStructure | null>(null);
    const {
        form: editForm, onSubmit: editOnSubmit, isLoading: isUpdating,
        populateForm: editPopulate, computedTotal: editTotal,
    } = useUpdateFeeStructure(() => setEditFs(null));
    const { register: editRegister, formState: { errors: editErrors }, setValue: editSetValue, watch: editWatch } = editForm;

    const openEdit = useCallback((fs: FeeStructure) => {
        setEditFs(fs);
        editPopulate(fs);
    }, [editPopulate]);

    // ── Deactivate ────────────────────────────────────────────────
    const { handleDeactivate, isDeactivating } = useDeactivateFeeStructure();
    const [deleteFeeState, setDeleteFeeState] = useState<{ id: string; label: string } | null>(null);

    // ── Assign ────────────────────────────────────────────────────
    const { assignAll, isAssigning } = useAssignFee();
    const [assigningId, setAssigningId] = useState<string | null>(null);

    const handleAssign = async (feeStructureId: string) => {
        setAssigningId(feeStructureId);
        await assignAll(feeStructureId);
        setAssigningId(null);
    };

    // ── Stats ─────────────────────────────────────────────────────
    const totalRevenue = feeStructures.reduce((s, fs) => s + (fs.totalFee * fs._count.assignments), 0);
    const totalAssigned = feeStructures.reduce((s, fs) => s + fs._count.assignments, 0);
    // Count only active structures from the current page — accurate after any hard-delete or deactivation
    const activeCount = feeStructures.filter(fs => fs.isActive).length;

    // ── Fee breakdown labels ─────────────────────────────────────
    const feeBreakdownFields = [
        { label: "Tuition Fee", name: "tuitionFee" },
        { label: "Lab Fee", name: "labFee" },
        { label: "Library Fee", name: "libraryFee" },
        { label: "Sports Fee", name: "sportsFee" },
        { label: "Registration Fee", name: "registrationFee" },
        { label: "Examination Fee", name: "examinationFee" },
        { label: "Other Fee", name: "otherFee" },
    ] as const;

    return (
        <div className="space-y-6">
            {/* ═══ HEADER ═══ */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">Fee Management</h1>
                    <p className="text-sm text-muted-foreground mt-1">Manage fee structures and track assignments</p>
                </div>
            </div>

            {/* ═══ SUMMARY CARDS ═══ */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Card className="glass-card border-0 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-gold-400" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Structures</p>
                        <p className="text-lg font-bold text-foreground">{meta.total}</p>
                    </div>
                </Card>
                <Card className="glass-card border-0 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Active</p>
                        <p className="text-lg font-bold text-emerald-400">{activeCount}</p>
                    </div>
                </Card>
                <Card className="glass-card border-0 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                        <UserPlus className="w-5 h-5 text-sky-400" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Assigned</p>
                        <p className="text-lg font-bold text-sky-400">{totalAssigned}</p>
                    </div>
                </Card>
                <Card className="glass-card border-0 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Expected</p>
                        <p className="text-lg font-bold text-amber-400">{formatFullCurrency(totalRevenue)}</p>
                    </div>
                </Card>
            </div>

            <Tabs defaultValue="structures" className="space-y-4">
                <TabsList className="bg-navy-800/50 border border-gold-500/8">
                    <TabsTrigger value="structures" className="data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-400">
                        Fee Structures
                    </TabsTrigger>
                    <TabsTrigger value="defaulters" className="data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-400">
                        Defaulters
                        <span className="ml-2 px-1.5 py-0.5 text-[11px] font-bold rounded-full bg-rose-500/15 text-rose-400">
                            0
                        </span>
                    </TabsTrigger>
                </TabsList>

                {/* ═══ FEE STRUCTURES TAB ═══ */}
                <TabsContent value="structures">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-sm text-muted-foreground">{meta.total} structures</p>
                        <Button onClick={() => setCreateOpen(true)} className="bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-navy-950 font-semibold shadow-lg shadow-gold-500/20">
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
                                                <TableCell colSpan={8} className="h-32 text-center">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <BookOpen className="w-8 h-8 text-muted-foreground/30" />
                                                        <p className="text-muted-foreground">No fee structures found.</p>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            feeStructures.map((fs) => {
                                                const isOverdue = new Date(fs.dueDate) < new Date();
                                                return (
                                                    <TableRow key={fs.id} className="border-gold-500/5 hover:bg-navy-700/20 transition-colors group">
                                                        <TableCell>
                                                            <div>
                                                                <span className="text-sm font-medium">{fs.program.code}</span>
                                                                <p className="text-[10px] text-muted-foreground">{fs.program.department.name}</p>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <span className="text-sm font-medium text-gold-400/80">Sem {fs.semester}</span>
                                                        </TableCell>
                                                        <TableCell className="text-sm text-muted-foreground">{fs.sessionYear}</TableCell>
                                                        <TableCell className="text-sm font-semibold">{formatFullCurrency(fs.totalFee)}</TableCell>
                                                        <TableCell>
                                                            <span className={`text-sm ${isOverdue ? "text-rose-400" : "text-muted-foreground"}`}>
                                                                {new Date(fs.dueDate).toLocaleDateString()}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell>
                                                            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400">
                                                                {fs._count.assignments}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell><StatusBadge status={fs.isActive ? "active" : "inactive"} /></TableCell>
                                                        <TableCell>
                                                            <div className="flex gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-sky-400" onClick={() => setViewFs(fs)}>
                                                                    <Eye className="w-3.5 h-3.5" />
                                                                </Button>
                                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-gold-400" onClick={() => openEdit(fs)}>
                                                                    <Pencil className="w-3.5 h-3.5" />
                                                                </Button>
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
                                                                <Button
                                                                    size="icon"
                                                                    variant="ghost"
                                                                    className="h-8 w-8 text-muted-foreground hover:text-rose-400"
                                                                    disabled={isDeactivating}
                                                                    onClick={() => setDeleteFeeState({ id: fs.id, label: `${fs.program.code} Sem ${fs.semester}` })}
                                                                >
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <Card className="glass-card border-0 p-5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-rose-400" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Defaulters</p>
                                <p className="text-2xl font-bold text-foreground tracking-tight">0</p>
                            </div>
                        </Card>
                        <Card className="glass-card border-0 p-5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-amber-400" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Outstanding</p>
                                <p className="text-2xl font-bold text-foreground tracking-tight">{formatFullCurrency(0)}</p>
                            </div>
                        </Card>
                    </div>
                    <Card className="glass-card border-0 p-8 text-center">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                                <AlertTriangle className="w-8 h-8 text-emerald-400" />
                            </div>
                            <p className="text-muted-foreground">No defaulters found. All students are up to date with their payments.</p>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* ═══ VIEW FEE STRUCTURE DIALOG ═══ */}
            <Dialog open={!!viewFs} onOpenChange={(open) => !open && setViewFs(null)}>
                <DialogContent className="bg-navy-900 border border-gold-500/10 w-full sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold tracking-tight">
                            Fee Structure Details
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground text-sm">
                            {viewFs?.program.code} — Semester {viewFs?.semester} — {viewFs?.sessionYear}
                        </DialogDescription>
                    </DialogHeader>
                    {viewFs && (
                        <div className="space-y-4 mt-2">
                            {/* Summary header */}
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-navy-800/40 border border-gold-500/5">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-600/10 flex items-center justify-center flex-shrink-0">
                                    <DollarSign className="w-7 h-7 text-gold-400" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-2xl font-bold text-gold-gradient tracking-tight">{formatFullCurrency(viewFs.totalFee)}</p>
                                    <p className="text-xs text-muted-foreground">{viewFs.program.name} • {viewFs.program.department.name}</p>
                                </div>
                                <div className="ml-auto">
                                    <StatusBadge status={viewFs.isActive ? "active" : "inactive"} />
                                </div>
                            </div>

                            {/* Fee breakdown */}
                            <div className="p-4 rounded-xl bg-navy-800/30 border border-gold-500/5 space-y-2">
                                <p className="text-xs text-gold-500/60 uppercase tracking-wider font-medium mb-3">Fee Breakdown</p>
                                {feeBreakdownFields.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">{item.label}</span>
                                        <span className="font-medium text-foreground/80">{formatFullCurrency(viewFs[item.name as keyof FeeStructure] as number)}</span>
                                    </div>
                                ))}
                                <div className="flex items-center justify-between pt-2 border-t border-gold-500/10">
                                    <span className="font-bold text-gold-400">Total</span>
                                    <span className="font-bold text-gold-400">{formatFullCurrency(viewFs.totalFee)}</span>
                                </div>
                            </div>

                            {/* Meta grid */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="p-3 rounded-lg bg-navy-800/30 border border-gold-500/5">
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Deadline</p>
                                    <p className="text-sm font-medium">{new Date(viewFs.dueDate).toLocaleDateString()}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-navy-800/30 border border-gold-500/5">
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Late Fee</p>
                                    <p className="text-sm font-medium">{formatFullCurrency(viewFs.lateFee)}/day</p>
                                </div>
                                <div className="p-3 rounded-lg bg-navy-800/30 border border-gold-500/5">
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Assigned</p>
                                    <p className="text-sm font-medium">{viewFs._count.assignments} students</p>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button variant="outline" className="flex-1 border-gold-500/20 text-muted-foreground" onClick={() => setViewFs(null)}>
                                    Close
                                </Button>
                                <Button className="flex-1 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 font-semibold" onClick={() => { setViewFs(null); openEdit(viewFs); }}>
                                    <Pencil className="w-3.5 h-3.5 mr-2" /> Edit Structure
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* ═══ EDIT FEE STRUCTURE SHEET ═══ */}
            <Sheet open={!!editFs} onOpenChange={(open) => !open && setEditFs(null)}>
                <SheetContent className="bg-navy-900 border-l border-gold-500/10 w-full sm:max-w-[480px] overflow-y-auto">
                    <SheetHeader className="mb-6">
                        <SheetTitle className="text-xl font-bold text-foreground tracking-tight">Edit Fee Structure</SheetTitle>
                        {editFs && (
                            <p className="text-sm text-muted-foreground">{editFs.program.code} — Semester {editFs.semester} — {editFs.sessionYear}</p>
                        )}
                    </SheetHeader>
                    {editFs && (
                        <form className="space-y-5" onSubmit={editOnSubmit(editFs.id)}>
                            {/* Fee breakdown */}
                            <div className="space-y-3 p-4 rounded-xl bg-navy-800/30 border border-gold-500/5">
                                <p className="text-xs text-gold-500/60 uppercase tracking-wider font-medium mb-3">Fee Breakdown</p>
                                {feeBreakdownFields.map((item) => (
                                    <div key={item.name} className="flex items-center gap-3">
                                        <Label className="text-sm text-muted-foreground w-32 flex-shrink-0">{item.label}</Label>
                                        <div className="w-full">
                                            <Input
                                                type="number"
                                                {...editRegister(item.name as keyof typeof editForm.getValues, { valueAsNumber: true })}
                                                className="bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div className="flex items-center justify-between pt-3 border-t border-gold-500/10">
                                    <span className="text-sm font-bold text-gold-400">Total</span>
                                    <span className="text-lg font-bold text-gold-gradient tracking-tight">{formatFullCurrency(editTotal)}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm text-foreground/80">Deadline</Label>
                                    <Input type="date" {...editRegister("dueDate")} className={`bg-navy-800/50 ${editErrors.dueDate ? "border-rose-500/50" : "border-gold-500/10"}`} />
                                    {editErrors.dueDate && <p className="text-xs text-rose-400">{editErrors.dueDate.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm text-foreground/80">Late Fee (/day)</Label>
                                    <Input type="number" {...editRegister("lateFee", { valueAsNumber: true })} className="bg-navy-800/50 border-gold-500/10" />
                                    {editErrors.lateFee && <p className="text-xs text-rose-400">{editErrors.lateFee.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm text-foreground/80">Status</Label>
                                <Select
                                    value={String(editWatch("isActive"))}
                                    onValueChange={(v) => editSetValue("isActive", v === "true", { shouldValidate: true })}
                                >
                                    <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-navy-800 border-gold-500/10">
                                        <SelectItem value="true">Active</SelectItem>
                                        <SelectItem value="false">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button type="button" variant="outline" className="flex-1 border-gold-500/20 text-muted-foreground" onClick={() => setEditFs(null)}>Cancel</Button>
                                <Button type="submit" disabled={isUpdating} className="flex-1 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-navy-950 font-semibold shadow-gold">
                                    {isUpdating ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </form>
                    )}
                </SheetContent>
            </Sheet>

            {/* ═══ CREATE FEE STRUCTURE DIALOG ═══ */}
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent className="bg-navy-900 border border-gold-500/10 w-full sm:max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold tracking-tight">
                            Create Fee Structure
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                            Define the fee breakdown for a program semester. Students will be auto-assigned.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-5 mt-4" onSubmit={createOnSubmit}>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Program</Label>
                            <Select value={watchedProgramId} onValueChange={(v) => createSetValue("programId", v, { shouldValidate: true })}>
                                <SelectTrigger className={`bg-navy-800/50 ${createErrors.programId ? "border-rose-500/50" : "border-gold-500/10"}`}>
                                    <SelectValue placeholder="Select Program" />
                                </SelectTrigger>
                                <SelectContent className="bg-navy-800 border-gold-500/10">
                                    {programs.map((p) => (
                                        <SelectItem key={p.id} value={p.id}>{p.code} - {p.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {createErrors.programId && <p className="text-xs text-rose-400">{createErrors.programId.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm text-foreground/80">Semester</Label>
                                <Select value={String(watchedSemester)} onValueChange={(v) => createSetValue("semester", Number(v), { shouldValidate: true })}>
                                    <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-navy-800 border-gold-500/10">
                                        {semesters.map((s) => <SelectItem key={s} value={String(s)}>Semester {s}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm text-foreground/80">Session Year</Label>
                                <Select value={String(watchedSessionYear)} onValueChange={(v) => createSetValue("sessionYear", Number(v), { shouldValidate: true })}>
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
                            {feeBreakdownFields.map((item) => (
                                <div key={item.name} className="flex items-center gap-3">
                                    <Label className="text-sm text-muted-foreground w-32 flex-shrink-0">{item.label}</Label>
                                    <div className="w-full">
                                        <Input
                                            type="number"
                                            {...createRegister(item.name as keyof typeof createForm.getValues, { valueAsNumber: true })}
                                            className="bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30"
                                        />
                                        {createErrors[item.name as keyof typeof createForm.getValues] && (
                                            <p className="text-xs text-rose-400 mt-1">{(createErrors[item.name as keyof typeof createForm.getValues] as { message?: string })?.message}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="flex items-center justify-between pt-3 border-t border-gold-500/10">
                                <span className="text-sm font-bold text-gold-400">Total</span>
                                <span className="text-lg font-bold text-gold-gradient tracking-tight">{formatFullCurrency(createTotal)}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm text-foreground/80">Deadline</Label>
                                <Input type="date" {...createRegister("dueDate")} className={`bg-navy-800/50 ${createErrors.dueDate ? "border-rose-500/50" : "border-gold-500/10"}`} />
                                {createErrors.dueDate && <p className="text-xs text-rose-400">{createErrors.dueDate.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm text-foreground/80">Late Fee (/day)</Label>
                                <Input type="number" {...createRegister("lateFee", { valueAsNumber: true })} className="bg-navy-800/50 border-gold-500/10" />
                                {createErrors.lateFee && <p className="text-xs text-rose-400">{createErrors.lateFee.message}</p>}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button type="button" variant="outline" className="flex-1 border-gold-500/20 text-muted-foreground" onClick={() => setCreateOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isCreating} className="flex-1 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-navy-950 font-semibold shadow-gold">
                                {isCreating ? "Creating..." : "Create & Assign"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <ConfirmDialog
                open={!!deleteFeeState}
                onOpenChange={(v) => !v && setDeleteFeeState(null)}
                title="Delete Fee Structure"
                description={`This will permanently delete "${deleteFeeState?.label}" and remove all unpaid assignments. Structures with existing payments cannot be deleted.`}
                actionLabel="Delete"
                isDestructive
                isPending={isDeactivating}
                onAction={async () => {
                    if (deleteFeeState) {
                        await handleDeactivate(deleteFeeState.id, deleteFeeState.label);
                        setDeleteFeeState(null);
                    }
                }}
            />
        </div>
    );
}
