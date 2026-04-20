"use client";

import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import StatusBadge from "@/components/shared/StatusBadge";
import { Skeleton } from "boneyard-js/react";
import { useGetDepartmentsQuery } from "@/store/api/admin/departmentsApi";
import { useAddDepartment } from "@/hooks/admin/useAddDepartment";

export default function DepartmentsPage() {
    const [page, setPage] = useState(1);
    const { data: response, isLoading, isFetching } = useGetDepartmentsQuery({ page, limit: 10 });
    const departments = response?.data?.data ?? [];
    const meta = response?.data?.meta ?? { total: 0, totalPages: 1, page: 1, limit: 10 };

    const [isAddOpen, setIsAddOpen] = useState(false);
    const { form, onSubmit, isLoading: isCreating } = useAddDepartment(() => setIsAddOpen(false));
    const { register, formState: { errors } } = form;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">
                        Departments
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">{meta.total} departments</p>
                </div>
                <Button
                    onClick={() => setIsAddOpen(true)}
                    className="bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-navy-950 font-semibold"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add Department
                </Button>
            </div>

            <Skeleton name="departments-table" loading={isLoading}>
                <Card className="glass-card border-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-gold-500/5 hover:bg-transparent">
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Name</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Code</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Status</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Created</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {departments.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">No departments found.</TableCell>
                                    </TableRow>
                                ) : (
                                    departments.map((dept) => (
                                        <TableRow key={dept.id} className="border-gold-500/5 hover:bg-navy-700/20 transition-colors">
                                            <TableCell className="text-sm font-medium">{dept.name}</TableCell>
                                            <TableCell className="text-xs font-mono text-muted-foreground">{dept.code}</TableCell>
                                            <TableCell><StatusBadge status={dept.isActive ? "active" : "inactive"} /></TableCell>
                                            <TableCell className="text-xs text-muted-foreground">{new Date(dept.createdAt).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3 border-t border-gold-500/5">
                        <p className="text-xs text-muted-foreground">Showing {departments.length} of {meta.total}</p>
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
                <SheetContent className="bg-navy-900 border-l border-gold-500/10 w-full sm:max-w-[420px]">
                    <SheetHeader className="mb-6">
                        <SheetTitle className="text-xl font-bold text-foreground tracking-tight">
                            Add Department
                        </SheetTitle>
                    </SheetHeader>
                    <form className="space-y-5" onSubmit={onSubmit}>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Department Name</Label>
                            <Input {...register("name")} placeholder="Computer Science" className="bg-navy-800/50 border-gold-500/10" />
                            {errors.name && <p className="text-xs text-rose-400">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Code</Label>
                            <Input {...register("code")} placeholder="CS" className="bg-navy-800/50 border-gold-500/10" />
                            {errors.code && <p className="text-xs text-rose-400">{errors.code.message}</p>}
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" className="flex-1 border-gold-500/20 text-muted-foreground" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isCreating} className="flex-1 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 font-semibold">
                                {isCreating ? "Creating..." : "Create Department"}
                            </Button>
                        </div>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    );
}
