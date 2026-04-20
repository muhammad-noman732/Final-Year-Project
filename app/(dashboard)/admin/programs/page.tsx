"use client";

import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import StatusBadge from "@/components/shared/StatusBadge";
import { Skeleton } from "boneyard-js/react";
import { useGetProgramsQuery } from "@/store/api/admin/programsApi";
import { useAddProgram } from "@/hooks/admin/useAddProgram";
import type { DegreeType } from "@/types/client/admin.api.types";

const DEGREE_TYPES: DegreeType[] = ["BS", "MS", "MCS", "PhD", "BE", "MBA", "BBA"];

export default function ProgramsPage() {
    const [page, setPage] = useState(1);
    const { data: response, isLoading, isFetching } = useGetProgramsQuery({ page, limit: 10 });
    const programs = response?.data?.data ?? [];
    const meta = response?.data?.meta ?? { total: 0, totalPages: 1, page: 1, limit: 10 };

    const [isAddOpen, setIsAddOpen] = useState(false);
    const { form, onSubmit, isLoading: isCreating, departments } = useAddProgram(() => setIsAddOpen(false));
    const { register, formState: { errors }, setValue, watch } = form;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">Programs</h1>
                    <p className="text-sm text-muted-foreground mt-1">{meta.total} programs</p>
                </div>
                <Button onClick={() => setIsAddOpen(true)} className="bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-navy-950 font-semibold">
                    <Plus className="w-4 h-4 mr-2" /> Add Program
                </Button>
            </div>

            <Skeleton name="programs-table" loading={isLoading}>
                <Card className="glass-card border-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-gold-500/5 hover:bg-transparent">
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Name</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Code</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Degree</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Department</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Duration</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {programs.length === 0 ? (
                                    <TableRow><TableCell colSpan={6} className="h-24 text-center text-muted-foreground">No programs found.</TableCell></TableRow>
                                ) : (
                                    programs.map((prog) => (
                                        <TableRow key={prog.id} className="border-gold-500/5 hover:bg-navy-700/20 transition-colors">
                                            <TableCell className="text-sm font-medium">{prog.name}</TableCell>
                                            <TableCell className="text-xs font-mono text-muted-foreground">{prog.code}</TableCell>
                                            <TableCell>
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400">{prog.degreeType}</span>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{prog.department.name}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{prog.durationYears}y / {prog.totalSemesters}s</TableCell>
                                            <TableCell><StatusBadge status={prog.isActive ? "active" : "inactive"} /></TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3 border-t border-gold-500/5">
                        <p className="text-xs text-muted-foreground">Showing {programs.length} of {meta.total}</p>
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

            <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
                <SheetContent className="bg-navy-900 border-l border-gold-500/10 w-full sm:max-w-[480px] overflow-y-auto">
                    <SheetHeader className="mb-6">
                        <SheetTitle className="text-xl font-bold text-foreground tracking-tight">Add Program</SheetTitle>
                    </SheetHeader>
                    <form className="space-y-5" onSubmit={onSubmit}>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Department</Label>
                            <Select value={watch("departmentId") || ""} onValueChange={(v) => setValue("departmentId", v)}>
                                <SelectTrigger className="bg-navy-800/50 border-gold-500/10"><SelectValue placeholder="Select department" /></SelectTrigger>
                                <SelectContent className="bg-navy-800 border-gold-500/10">
                                    {departments.map((d) => (<SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>))}
                                </SelectContent>
                            </Select>
                            {errors.departmentId && <p className="text-xs text-rose-400">{errors.departmentId.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Program Name</Label>
                            <Input {...register("name")} placeholder="BS Computer Science" className="bg-navy-800/50 border-gold-500/10" />
                            {errors.name && <p className="text-xs text-rose-400">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Code</Label>
                            <Input {...register("code")} placeholder="BSCS" className="bg-navy-800/50 border-gold-500/10" />
                            {errors.code && <p className="text-xs text-rose-400">{errors.code.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Degree Type</Label>
                            <Select value={watch("degreeType") || "BS"} onValueChange={(v) => setValue("degreeType", v as DegreeType)}>
                                <SelectTrigger className="bg-navy-800/50 border-gold-500/10"><SelectValue /></SelectTrigger>
                                <SelectContent className="bg-navy-800 border-gold-500/10">
                                    {DEGREE_TYPES.map((dt) => (<SelectItem key={dt} value={dt}>{dt}</SelectItem>))}
                                </SelectContent>
                            </Select>
                            {errors.degreeType && <p className="text-xs text-rose-400">{errors.degreeType.message}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label className="text-sm text-foreground/80">Duration (years)</Label>
                                <Input {...register("durationYears", { valueAsNumber: true })} type="number" defaultValue={4} className="bg-navy-800/50 border-gold-500/10" />
                                {errors.durationYears && <p className="text-xs text-rose-400">{errors.durationYears.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm text-foreground/80">Total Semesters</Label>
                                <Input {...register("totalSemesters", { valueAsNumber: true })} type="number" defaultValue={8} className="bg-navy-800/50 border-gold-500/10" />
                                {errors.totalSemesters && <p className="text-xs text-rose-400">{errors.totalSemesters.message}</p>}
                            </div>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" className="flex-1 border-gold-500/20 text-muted-foreground" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isCreating} className="flex-1 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 font-semibold">
                                {isCreating ? "Creating..." : "Create Program"}
                            </Button>
                        </div>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    );
}
