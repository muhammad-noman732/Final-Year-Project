"use client";

import { useState } from "react";
import { Plus, Search, Download, Trash2, Mail, Eye, Pencil, ChevronLeft, ChevronRight, X, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import StatusBadge from "@/components/shared/StatusBadge";
import { Skeleton } from "boneyard-js/react";
import { useGetStudents } from "@/hooks/admin/useGetStudents";
import { useAddStudent } from "@/hooks/admin/useAddStudent";

export default function StudentsPage() {
    const {
        searchQuery, setSearchQuery,
        selectedDept, handleDeptChange,
        selectedProgram, handleProgramChange,
        selectedSemester, handleSemesterChange,
        selectedSession, handleSessionChange,
        departments, programs, sessions, semesters,
        page, setPage,
        students, meta, isLoading, isFetching,
        selectedRows, toggleRow, toggleAll, clearSelection,
    } = useGetStudents();

    const [isAddOpen, setIsAddOpen] = useState(false);
    const { form, onSubmit, isLoading: isCreating } = useAddStudent(() => setIsAddOpen(false));

    const { register, formState: { errors }, setValue, watch } = form;
    const watchDeptId = watch("departmentId");
    const watchProgramId = watch("programId");
    const watchSessionId = watch("sessionId");
    const watchCurrentSemester = watch("currentSemester");

    // Filter programs in the form based on selected department
    const formPrograms = watchDeptId
        ? programs.filter((p) => p.department.id === watchDeptId)
        : [];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">
                        Students Management
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">{meta.total} total students</p>
                </div>
                <Button
                    onClick={() => setIsAddOpen(true)}
                    className="bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-navy-950 font-semibold shadow-lg shadow-gold-500/20"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add New Student
                </Button>
            </div>

            {/* Filters */}
            <Card className="glass-card border-0 p-4">
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name or ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Select value={selectedDept} onValueChange={handleDeptChange}>
                            <SelectTrigger className="w-[160px] bg-navy-800/50 border-gold-500/10">
                                <Filter className="w-3 h-3 mr-2 text-muted-foreground" />
                                <SelectValue placeholder="Department" />
                            </SelectTrigger>
                            <SelectContent className="bg-navy-800 border-gold-500/10">
                                <SelectItem value="all">All Departments</SelectItem>
                                {departments.map((d) => (
                                    <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedProgram} onValueChange={handleProgramChange}>
                            <SelectTrigger className="w-[160px] bg-navy-800/50 border-gold-500/10">
                                <SelectValue placeholder="Program" />
                            </SelectTrigger>
                            <SelectContent className="bg-navy-800 border-gold-500/10">
                                <SelectItem value="all">All Programs</SelectItem>
                                {programs.map((p) => (
                                    <SelectItem key={p.id} value={p.id}>{p.code}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedSemester} onValueChange={handleSemesterChange}>
                            <SelectTrigger className="w-[140px] bg-navy-800/50 border-gold-500/10">
                                <SelectValue placeholder="Semester" />
                            </SelectTrigger>
                            <SelectContent className="bg-navy-800 border-gold-500/10">
                                <SelectItem value="all">All Semesters</SelectItem>
                                {semesters.map((s) => (
                                    <SelectItem key={String(s)} value={String(s)}>Semester {s}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedSession} onValueChange={handleSessionChange}>
                            <SelectTrigger className="w-[140px] bg-navy-800/50 border-gold-500/10">
                                <SelectValue placeholder="Session" />
                            </SelectTrigger>
                            <SelectContent className="bg-navy-800 border-gold-500/10">
                                <SelectItem value="all">All Sessions</SelectItem>
                                {sessions.map((s) => (
                                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </Card>

            {/* Bulk Actions */}
            {selectedRows.size > 0 && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gold-500/5 border border-gold-500/15 animate-count">
                    <span className="text-sm text-gold-400 font-medium">
                        {selectedRows.size} student{selectedRows.size > 1 ? "s" : ""} selected
                    </span>
                    <div className="flex-1" />
                    <Button size="sm" variant="outline" className="border-gold-500/20 text-gold-400 hover:bg-gold-500/5">
                        <Mail className="w-3.5 h-3.5 mr-1.5" /> Send Email
                    </Button>
                    <Button size="sm" variant="outline" className="border-gold-500/20 text-gold-400 hover:bg-gold-500/5">
                        <Download className="w-3.5 h-3.5 mr-1.5" /> Export
                    </Button>
                    <Button size="sm" variant="outline" className="border-rose-500/20 text-rose-400 hover:bg-rose-500/5">
                        <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
                    </Button>
                    <Button size="sm" variant="ghost" onClick={clearSelection} className="text-muted-foreground">
                        <X className="w-3.5 h-3.5" />
                    </Button>
                </div>
            )}

            {/* Table */}
            <Skeleton name="students-table" loading={isLoading}>
                <Card className="glass-card border-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-gold-500/5 hover:bg-transparent">
                                    <TableHead className="w-10">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.size === students.length && students.length > 0}
                                            onChange={toggleAll}
                                            className="w-4 h-4 rounded border-gold-500/20 bg-navy-800"
                                        />
                                    </TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Student ID</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Name</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Department</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Program</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Semester</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Session</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Status</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                                            No students found. Try adjusting your filters.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    students.map((student) => (
                                        <TableRow key={student.id} className="border-gold-500/5 hover:bg-navy-700/20 transition-colors">
                                            <TableCell>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.has(student.id)}
                                                    onChange={() => toggleRow(student.id)}
                                                    className="w-4 h-4 rounded border-gold-500/20 bg-navy-800"
                                                />
                                            </TableCell>
                                            <TableCell className="text-xs font-mono text-muted-foreground">{student.studentId}</TableCell>
                                            <TableCell className="text-sm font-medium">{student.user.name}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{student.department.code}</TableCell>
                                            <TableCell className="text-xs text-muted-foreground">{student.program.code}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{student.currentSemester}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{student.session.name}</TableCell>
                                            <TableCell><StatusBadge status={student.enrollmentStatus} /></TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-sky-400">
                                                        <Eye className="w-3.5 h-3.5" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-gold-400">
                                                        <Pencil className="w-3.5 h-3.5" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-rose-400">
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-4 py-3 border-t border-gold-500/5">
                        <p className="text-xs text-muted-foreground">
                            Showing {students.length} of {meta.total} students
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                className="border-gold-500/10 text-muted-foreground"
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <span className="text-sm text-muted-foreground mx-2">
                                Page {page} of {meta.totalPages}
                            </span>
                            <Button
                                size="sm"
                                variant="outline"
                                className="border-gold-500/10 text-muted-foreground"
                                disabled={page >= meta.totalPages}
                                onClick={() => setPage(page + 1)}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            </Skeleton>

            {/* ═══ ADD STUDENT SHEET ═══ */}
            <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
                <SheetContent className="bg-navy-900 border-l border-gold-500/10 w-full sm:max-w-[480px] overflow-y-auto">
                    <SheetHeader className="mb-6">
                        <SheetTitle className="text-xl font-bold text-foreground tracking-tight">
                            Add New Student
                        </SheetTitle>
                    </SheetHeader>
                    <form className="space-y-5" onSubmit={onSubmit}>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Full Name</Label>
                            <Input {...register("name")} placeholder="Ahmed Hassan" className="bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30" />
                            {errors.name && <p className="text-xs text-rose-400">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Email</Label>
                            <Input {...register("email")} type="email" placeholder="student@gcuf.edu.pk" className="bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30" />
                            {errors.email && <p className="text-xs text-rose-400">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Phone <span className="text-muted-foreground">(optional)</span></Label>
                            <Input {...register("phone")} placeholder="03001234567" className="bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30" />
                            {errors.phone && <p className="text-xs text-rose-400">{errors.phone.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">CNIC <span className="text-muted-foreground">(optional)</span></Label>
                            <Input {...register("cnic")} placeholder="33100-1234567-1" className="bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30" />
                            {errors.cnic && <p className="text-xs text-rose-400">{errors.cnic.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Student Roll Number</Label>
                            <Input {...register("studentId")} placeholder="GCUF-2024-CS-0001" className="bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30" />
                            {errors.studentId && <p className="text-xs text-rose-400">{errors.studentId.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Department</Label>
                            <Select value={watchDeptId || ""} onValueChange={(val) => { setValue("departmentId", val); setValue("programId", ""); }}>
                                <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent className="bg-navy-800 border-gold-500/10">
                                    {departments.map((d) => (
                                        <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.departmentId && <p className="text-xs text-rose-400">{errors.departmentId.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Program</Label>
                            <Select value={watchProgramId || ""} onValueChange={(val) => setValue("programId", val)}>
                                <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                    <SelectValue placeholder={watchDeptId ? "Select program" : "Select department first"} />
                                </SelectTrigger>
                                <SelectContent className="bg-navy-800 border-gold-500/10">
                                    {formPrograms.length === 0 ? (
                                        <SelectItem value="none" disabled>No programs available</SelectItem>
                                    ) : formPrograms.map((p) => (
                                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.programId && <p className="text-xs text-rose-400">{errors.programId.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Session</Label>
                            <Select value={watchSessionId || ""} onValueChange={(val) => setValue("sessionId", val)}>
                                <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                    <SelectValue placeholder="Select session" />
                                </SelectTrigger>
                                <SelectContent className="bg-navy-800 border-gold-500/10">
                                    {sessions.map((s) => (
                                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.sessionId && <p className="text-xs text-rose-400">{errors.sessionId.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Current Semester</Label>
                            <Select value={watchCurrentSemester ? String(watchCurrentSemester) : ""} onValueChange={(val) => setValue("currentSemester", parseInt(val))}>
                                <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                    <SelectValue placeholder="Select semester" />
                                </SelectTrigger>
                                <SelectContent className="bg-navy-800 border-gold-500/10">
                                    {semesters.map((s) => (
                                        <SelectItem key={s} value={String(s)}>Semester {s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.currentSemester && <p className="text-xs text-rose-400">{errors.currentSemester.message}</p>}
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" className="flex-1 border-gold-500/20 text-muted-foreground" onClick={() => setIsAddOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isCreating} className="flex-1 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 font-semibold">
                                {isCreating ? "Creating..." : "Create Student"}
                            </Button>
                        </div>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    );
}
