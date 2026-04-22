"use client";

import { useState, useCallback } from "react";
import { Plus, Search, Trash2, Eye, Pencil, ChevronLeft, ChevronRight, X, Filter, GraduationCap, Users, UserX, ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import StatusBadge from "@/components/shared/StatusBadge";
import { Skeleton } from "boneyard-js/react";
import { useGetStudents } from "@/hooks/admin/useGetStudents";
import { useAddStudent } from "@/hooks/admin/useAddStudent";
import { useUpdateStudent } from "@/hooks/admin/useUpdateStudent";
import { useDeleteStudent } from "@/hooks/admin/useDeleteStudent";
import type { Student } from "@/types/client/store/student.store.types";

export default function StudentsPage() {
    const {
        searchQuery, setSearchQuery,
        selectedDept, handleDeptChange,
        selectedProgram, handleProgramChange,
        selectedSemester, handleSemesterChange,
        selectedSession, handleSessionChange,
        departments, programs, sessions, semesters,
        page, setPage,
        students, meta, isLoading,
        selectedRows, toggleRow, toggleAll, clearSelection,
    } = useGetStudents();

    // ── Add Student ───────────────────────────────────────────────
    const [isAddOpen, setIsAddOpen] = useState(false);
    const { form: addForm, onSubmit: addOnSubmit, isLoading: isCreating } = useAddStudent(() => setIsAddOpen(false));
    const { register: addRegister, formState: { errors: addErrors }, setValue: addSetValue, watch: addWatch } = addForm;
    const watchDeptId = addWatch("departmentId");
    const watchProgramId = addWatch("programId");
    const watchSessionId = addWatch("sessionId");
    const watchCurrentSemester = addWatch("currentSemester");
    const formPrograms = watchDeptId ? programs.filter((p) => p.department.id === watchDeptId) : [];

    // ── View Student ──────────────────────────────────────────────
    const [viewStudent, setViewStudent] = useState<Student | null>(null);

    // ── Edit Student ──────────────────────────────────────────────
    const [editStudent, setEditStudent] = useState<Student | null>(null);
    const { form: editForm, onSubmit: editOnSubmit, isLoading: isUpdating, populateForm } = useUpdateStudent(() => setEditStudent(null));
    const { register: editRegister, formState: { errors: editErrors }, setValue: editSetValue, watch: editWatch } = editForm;

    const openEdit = useCallback((student: Student) => {
        setEditStudent(student);
        populateForm(student);
    }, [populateForm]);

    // ── Delete Student ────────────────────────────────────────────
    const { handleDelete, isDeleting } = useDeleteStudent();
    const [deleteStudentState, setDeleteStudentState] = useState<{ id: string; name: string } | null>(null);

    // ── Summary Stats ─────────────────────────────────────────────
    const activeCount = students.filter(s => s.enrollmentStatus === "ACTIVE").length;
    const suspendedCount = students.filter(s => s.enrollmentStatus === "SUSPENDED").length;

    return (
        <div className="space-y-6">
            {/* ═══ HEADER ═══ */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">
                        Students Management
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">{meta.total} total students enrolled</p>
                </div>
                <Button
                    onClick={() => setIsAddOpen(true)}
                    className="bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-navy-950 font-semibold shadow-lg shadow-gold-500/20"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add New Student
                </Button>
            </div>

            {/* ═══ SUMMARY CARDS ═══ */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Card className="glass-card border-0 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-gold-400" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Total</p>
                        <p className="text-lg font-bold text-foreground">{meta.total}</p>
                    </div>
                </Card>
                <Card className="glass-card border-0 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Active</p>
                        <p className="text-lg font-bold text-emerald-400">{activeCount}</p>
                    </div>
                </Card>
                <Card className="glass-card border-0 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                        <UserX className="w-5 h-5 text-rose-400" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Suspended</p>
                        <p className="text-lg font-bold text-rose-400">{suspendedCount}</p>
                    </div>
                </Card>
                <Card className="glass-card border-0 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                        <ShieldAlert className="w-5 h-5 text-sky-400" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Page</p>
                        <p className="text-lg font-bold text-sky-400">{students.length}</p>
                    </div>
                </Card>
            </div>

            {/* ═══ FILTERS ═══ */}
            <Card className="glass-card border-0 p-4">
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name, roll number, or email..."
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

            {/* ═══ BULK ACTIONS ═══ */}
            {selectedRows.size > 0 && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gold-500/5 border border-gold-500/15 animate-count">
                    <span className="text-sm text-gold-400 font-medium">
                        {selectedRows.size} student{selectedRows.size > 1 ? "s" : ""} selected
                    </span>
                    <div className="flex-1" />
                    <Button size="sm" variant="outline" className="border-rose-500/20 text-rose-400 hover:bg-rose-500/5">
                        <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Suspend All
                    </Button>
                    <Button size="sm" variant="ghost" onClick={clearSelection} className="text-muted-foreground">
                        <X className="w-3.5 h-3.5" />
                    </Button>
                </div>
            )}

            {/* ═══ TABLE ═══ */}
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
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Email</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Department</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Program</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Semester</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Status</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} className="h-32 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <Users className="w-8 h-8 text-muted-foreground/30" />
                                                <p className="text-muted-foreground">No students found. Try adjusting your filters.</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    students.map((student) => (
                                        <TableRow
                                            key={student.id}
                                            className="border-gold-500/5 hover:bg-navy-700/20 transition-colors group"
                                        >
                                            <TableCell>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.has(student.id)}
                                                    onChange={() => toggleRow(student.id)}
                                                    className="w-4 h-4 rounded border-gold-500/20 bg-navy-800"
                                                />
                                            </TableCell>
                                            <TableCell className="text-xs font-mono text-gold-400/80">{student.studentId}</TableCell>
                                            <TableCell className="text-sm font-medium">{student.user.name}</TableCell>
                                            <TableCell className="text-xs text-muted-foreground">{student.user.email}</TableCell>
                                            <TableCell>
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-navy-700/50 text-muted-foreground">
                                                    {student.department.code}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-xs text-muted-foreground">{student.program.code}</TableCell>
                                            <TableCell>
                                                <span className="text-xs font-medium text-gold-400/70">{student.currentSemester}</span>
                                            </TableCell>
                                            <TableCell><StatusBadge status={student.enrollmentStatus.toLowerCase()} /></TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 text-muted-foreground hover:text-sky-400"
                                                        onClick={() => setViewStudent(student)}
                                                    >
                                                        <Eye className="w-3.5 h-3.5" />
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 text-muted-foreground hover:text-gold-400"
                                                        onClick={() => openEdit(student)}
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 text-muted-foreground hover:text-rose-400"
                                                        disabled={isDeleting || student.enrollmentStatus === "SUSPENDED"}
                                                        onClick={() => setDeleteStudentState({ id: student.id, name: student.user.name })}
                                                    >
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

            {/* ═══ VIEW STUDENT DIALOG ═══ */}
            <Dialog open={!!viewStudent} onOpenChange={(open) => !open && setViewStudent(null)}>
                <DialogContent className="bg-navy-900 border border-gold-500/10 w-full sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold tracking-tight">
                            Student Details
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground text-sm">
                            View complete profile for {viewStudent?.user.name}
                        </DialogDescription>
                    </DialogHeader>
                    {viewStudent && (
                        <div className="space-y-4 mt-2">
                            {/* Avatar + name header */}
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-navy-800/40 border border-gold-500/5">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/10 flex items-center justify-center text-lg font-bold text-gold-400 flex-shrink-0">
                                    {viewStudent.user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <p className="font-semibold text-foreground truncate">{viewStudent.user.name}</p>
                                    <p className="text-xs text-muted-foreground truncate">{viewStudent.user.email}</p>
                                    <p className="text-xs font-mono text-gold-400/70 mt-0.5">{viewStudent.studentId}</p>
                                </div>
                                <div className="ml-auto">
                                    <StatusBadge status={viewStudent.enrollmentStatus.toLowerCase()} />
                                </div>
                            </div>

                            {/* Details grid */}
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "Department", value: viewStudent.department.name },
                                    { label: "Program", value: `${viewStudent.program.code} — ${viewStudent.program.degreeType}` },
                                    { label: "Session", value: viewStudent.session.name },
                                    { label: "Current Semester", value: `Semester ${viewStudent.currentSemester}` },
                                    { label: "Phone", value: viewStudent.user.phone ?? "—" },
                                    { label: "CNIC", value: viewStudent.cnic ?? "—" },
                                    { label: "First Login", value: viewStudent.user.isFirstLogin ? "Pending" : "Completed" },
                                    { label: "Enrolled", value: new Date(viewStudent.createdAt).toLocaleDateString() },
                                ].map((item) => (
                                    <div key={item.label} className="p-3 rounded-lg bg-navy-800/30 border border-gold-500/5">
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{item.label}</p>
                                        <p className="text-sm font-medium text-foreground/90 truncate">{item.value}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button variant="outline" className="flex-1 border-gold-500/20 text-muted-foreground" onClick={() => setViewStudent(null)}>
                                    Close
                                </Button>
                                <Button className="flex-1 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 font-semibold" onClick={() => { setViewStudent(null); openEdit(viewStudent); }}>
                                    <Pencil className="w-3.5 h-3.5 mr-2" /> Edit Student
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* ═══ EDIT STUDENT SHEET ═══ */}
            <Sheet open={!!editStudent} onOpenChange={(open) => !open && setEditStudent(null)}>
                <SheetContent className="bg-navy-900 border-l border-gold-500/10 w-full sm:max-w-[480px] overflow-y-auto">
                    <SheetHeader className="mb-6">
                        <SheetTitle className="text-xl font-bold text-foreground tracking-tight">
                            Edit Student
                        </SheetTitle>
                        {editStudent && (
                            <p className="text-sm text-muted-foreground">{editStudent.user.name} — {editStudent.studentId}</p>
                        )}
                    </SheetHeader>
                    {editStudent && (
                        <form className="space-y-5" onSubmit={editOnSubmit(editStudent.id)}>
                            <div className="space-y-2">
                                <Label className="text-sm text-foreground/80">Current Semester</Label>
                                <Select
                                    value={String(editWatch("currentSemester") ?? editStudent.currentSemester)}
                                    onValueChange={(v) => editSetValue("currentSemester", parseInt(v), { shouldValidate: true })}
                                >
                                    <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-navy-800 border-gold-500/10">
                                        {semesters.map((s) => (
                                            <SelectItem key={s} value={String(s)}>Semester {s}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {editErrors.currentSemester && <p className="text-xs text-rose-400">{editErrors.currentSemester.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm text-foreground/80">Enrollment Status</Label>
                                <Select
                                    value={editWatch("enrollmentStatus") ?? editStudent.enrollmentStatus}
                                    onValueChange={(v) => editSetValue("enrollmentStatus", v as "ACTIVE" | "SUSPENDED" | "GRADUATED" | "WITHDRAWN", { shouldValidate: true })}
                                >
                                    <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-navy-800 border-gold-500/10">
                                        <SelectItem value="ACTIVE">Active</SelectItem>
                                        <SelectItem value="SUSPENDED">Suspended</SelectItem>
                                        <SelectItem value="GRADUATED">Graduated</SelectItem>
                                        <SelectItem value="WITHDRAWN">Withdrawn</SelectItem>
                                    </SelectContent>
                                </Select>
                                {editErrors.enrollmentStatus && <p className="text-xs text-rose-400">{editErrors.enrollmentStatus.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm text-foreground/80">CNIC <span className="text-muted-foreground">(optional)</span></Label>
                                <Input {...editRegister("cnic")} placeholder="33100-1234567-1" className="bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30" />
                                {editErrors.cnic && <p className="text-xs text-rose-400">{editErrors.cnic.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm text-foreground/80">Phone <span className="text-muted-foreground">(optional)</span></Label>
                                <Input {...editRegister("phone")} placeholder="03001234567" className="bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30" />
                                {editErrors.phone && <p className="text-xs text-rose-400">{editErrors.phone.message}</p>}
                            </div>
                            <div className="flex gap-3 pt-4">
                                <Button type="button" variant="outline" className="flex-1 border-gold-500/20 text-muted-foreground" onClick={() => setEditStudent(null)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isUpdating} className="flex-1 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 font-semibold">
                                    {isUpdating ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </form>
                    )}
                </SheetContent>
            </Sheet>

            {/* ═══ ADD STUDENT SHEET ═══ */}
            <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
                <SheetContent className="bg-navy-900 border-l border-gold-500/10 w-full sm:max-w-[480px] overflow-y-auto">
                    <SheetHeader className="mb-6">
                        <SheetTitle className="text-xl font-bold text-foreground tracking-tight">
                            Add New Student
                        </SheetTitle>
                    </SheetHeader>
                    <form className="space-y-5" onSubmit={addOnSubmit}>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Full Name</Label>
                            <Input {...addRegister("name")} placeholder="Ahmed Hassan" className="bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30" />
                            {addErrors.name && <p className="text-xs text-rose-400">{addErrors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Email</Label>
                            <Input {...addRegister("email")} type="email" placeholder="student@gcuf.edu.pk" className="bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30" />
                            {addErrors.email && <p className="text-xs text-rose-400">{addErrors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Phone <span className="text-muted-foreground">(optional)</span></Label>
                            <Input {...addRegister("phone")} placeholder="03001234567" className="bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30" />
                            {addErrors.phone && <p className="text-xs text-rose-400">{addErrors.phone.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">CNIC <span className="text-muted-foreground">(optional)</span></Label>
                            <Input {...addRegister("cnic")} placeholder="33100-1234567-1" className="bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30" />
                            {addErrors.cnic && <p className="text-xs text-rose-400">{addErrors.cnic.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Student Roll Number</Label>
                            <Input {...addRegister("studentId")} placeholder="GCUF-2024-CS-0001" className="bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30" />
                            {addErrors.studentId && <p className="text-xs text-rose-400">{addErrors.studentId.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Department</Label>
                            <Select value={watchDeptId || ""} onValueChange={(val) => { addSetValue("departmentId", val); addSetValue("programId", ""); }}>
                                <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent className="bg-navy-800 border-gold-500/10">
                                    {departments.map((d) => (
                                        <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {addErrors.departmentId && <p className="text-xs text-rose-400">{addErrors.departmentId.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Program</Label>
                            <Select value={watchProgramId || ""} onValueChange={(val) => addSetValue("programId", val)}>
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
                            {addErrors.programId && <p className="text-xs text-rose-400">{addErrors.programId.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Session</Label>
                            <Select value={watchSessionId || ""} onValueChange={(val) => addSetValue("sessionId", val)}>
                                <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                    <SelectValue placeholder="Select session" />
                                </SelectTrigger>
                                <SelectContent className="bg-navy-800 border-gold-500/10">
                                    {sessions.map((s) => (
                                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {addErrors.sessionId && <p className="text-xs text-rose-400">{addErrors.sessionId.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Current Semester</Label>
                            <Select value={watchCurrentSemester ? String(watchCurrentSemester) : ""} onValueChange={(val) => addSetValue("currentSemester", parseInt(val))}>
                                <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                    <SelectValue placeholder="Select semester" />
                                </SelectTrigger>
                                <SelectContent className="bg-navy-800 border-gold-500/10">
                                    {semesters.map((s) => (
                                        <SelectItem key={s} value={String(s)}>Semester {s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {addErrors.currentSemester && <p className="text-xs text-rose-400">{addErrors.currentSemester.message}</p>}
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

            <ConfirmDialog 
                open={!!deleteStudentState} 
                onOpenChange={(v) => !v && setDeleteStudentState(null)}
                title="Suspend Student"
                description={`Are you sure you want to suspend ${deleteStudentState?.name}? They will lose access to the fee payment portal.`}
                actionLabel="Suspend Student"
                isDestructive
                isPending={isDeleting}
                onAction={async () => {
                    if (deleteStudentState) {
                        await handleDelete(deleteStudentState.id, deleteStudentState.name);
                        setDeleteStudentState(null);
                    }
                }}
            />
        </div>
    );
}
