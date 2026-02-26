"use client";

import { useState } from "react";
import { Plus, Search, Download, Trash2, Mail, Eye, Pencil, ChevronLeft, ChevronRight, X, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import StatusBadge from "@/components/shared/StatusBadge";
import { DEPARTMENTS, SEMESTERS, SESSIONS, PROGRAMS } from "@/config/constants";

const mockStudents = [
    { id: "GCUF-2024-CS-0001", name: "Ahmed Hassan", department: "Computer Science", program: "BS Computer Science", semester: "4th", session: "2024-2028", status: "active" },
    { id: "GCUF-2024-CS-0002", name: "Fatima Zahra", department: "Computer Science", program: "BS Software Engineering", semester: "4th", session: "2024-2028", status: "active" },
    { id: "GCUF-2024-BIO-0003", name: "Usman Ali", department: "Biology", program: "BS Biology", semester: "2nd", session: "2024-2028", status: "active" },
    { id: "GCUF-2023-PHY-0004", name: "Ayesha Khan", department: "Physics", program: "BS Physics", semester: "6th", session: "2023-2027", status: "active" },
    { id: "GCUF-2024-MATH-0005", name: "Bilal Ahmed", department: "Mathematics", program: "BS Mathematics", semester: "2nd", session: "2024-2028", status: "inactive" },
    { id: "GCUF-2023-CS-0006", name: "Sara Malik", department: "Computer Science", program: "MCS", semester: "4th", session: "2023-2027", status: "active" },
    { id: "GCUF-2022-BIO-0007", name: "Omar Farooq", department: "Biology", program: "BS Zoology", semester: "8th", session: "2022-2026", status: "graduated" },
    { id: "GCUF-2024-PHY-0008", name: "Hina Tariq", department: "Physics", program: "BS Applied Physics", semester: "2nd", session: "2024-2028", status: "active" },
    { id: "GCUF-2023-MATH-0009", name: "Zain Abbas", department: "Mathematics", program: "BS Applied Mathematics", semester: "6th", session: "2023-2027", status: "suspended" },
    { id: "GCUF-2024-CS-0010", name: "Maryam Nawaz", department: "Computer Science", program: "BS Information Technology", semester: "4th", session: "2024-2028", status: "active" },
];

export default function StudentsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDept, setSelectedDept] = useState("all");
    const [selectedSemester, setSelectedSemester] = useState("all");
    const [selectedSession, setSelectedSession] = useState("all");
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [addDept, setAddDept] = useState("");

    const filteredStudents = mockStudents.filter((s) => {
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = selectedDept === "all" || s.department === selectedDept;
        const matchesSem = selectedSemester === "all" || s.semester === selectedSemester;
        const matchesSess = selectedSession === "all" || s.session === selectedSession;
        return matchesSearch && matchesDept && matchesSem && matchesSess;
    });

    const toggleRow = (id: string) => {
        const next = new Set(selectedRows);
        next.has(id) ? next.delete(id) : next.add(id);
        setSelectedRows(next);
    };

    const toggleAll = () => {
        if (selectedRows.size === filteredStudents.length) {
            setSelectedRows(new Set());
        } else {
            setSelectedRows(new Set(filteredStudents.map((s) => s.id)));
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-playfair)]">
                        Students Management
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">{mockStudents.length} total students</p>
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
                        <Select value={selectedDept} onValueChange={setSelectedDept}>
                            <SelectTrigger className="w-[160px] bg-navy-800/50 border-gold-500/10">
                                <Filter className="w-3 h-3 mr-2 text-muted-foreground" />
                                <SelectValue placeholder="Department" />
                            </SelectTrigger>
                            <SelectContent className="bg-navy-800 border-gold-500/10">
                                <SelectItem value="all">All Departments</SelectItem>
                                {DEPARTMENTS.map((d) => (
                                    <SelectItem key={d} value={d}>{d}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                            <SelectTrigger className="w-[140px] bg-navy-800/50 border-gold-500/10">
                                <SelectValue placeholder="Semester" />
                            </SelectTrigger>
                            <SelectContent className="bg-navy-800 border-gold-500/10">
                                <SelectItem value="all">All Semesters</SelectItem>
                                {SEMESTERS.map((s) => (
                                    <SelectItem key={s} value={s.replace(/\D/g, '')}>{s}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedSession} onValueChange={setSelectedSession}>
                            <SelectTrigger className="w-[140px] bg-navy-800/50 border-gold-500/10">
                                <SelectValue placeholder="Session" />
                            </SelectTrigger>
                            <SelectContent className="bg-navy-800 border-gold-500/10">
                                <SelectItem value="all">All Sessions</SelectItem>
                                {SESSIONS.map((s) => (
                                    <SelectItem key={s} value={s}>{s}</SelectItem>
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
                    <Button size="sm" variant="ghost" onClick={() => setSelectedRows(new Set())} className="text-muted-foreground">
                        <X className="w-3.5 h-3.5" />
                    </Button>
                </div>
            )}

            {/* Table */}
            <Card className="glass-card border-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-gold-500/5 hover:bg-transparent">
                                <TableHead className="w-10">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.size === filteredStudents.length && filteredStudents.length > 0}
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
                            {filteredStudents.map((student) => (
                                <TableRow key={student.id} className="border-gold-500/5 hover:bg-navy-700/20 transition-colors">
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.has(student.id)}
                                            onChange={() => toggleRow(student.id)}
                                            className="w-4 h-4 rounded border-gold-500/20 bg-navy-800"
                                        />
                                    </TableCell>
                                    <TableCell className="text-xs font-mono text-muted-foreground">{student.id}</TableCell>
                                    <TableCell className="text-sm font-medium">{student.name}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{student.department}</TableCell>
                                    <TableCell className="text-xs text-muted-foreground">{student.program}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{student.semester}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{student.session}</TableCell>
                                    <TableCell><StatusBadge status={student.status} /></TableCell>
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
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-gold-500/5">
                    <p className="text-xs text-muted-foreground">
                        Showing {filteredStudents.length} of {mockStudents.length} students
                    </p>
                    <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="border-gold-500/10 text-muted-foreground" disabled>
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="bg-gold-500/10 text-gold-400 border border-gold-500/15 h-8 w-8 p-0">1</Button>
                        <Button size="sm" variant="outline" className="border-gold-500/10 text-muted-foreground h-8 w-8 p-0">2</Button>
                        <Button size="sm" variant="outline" className="border-gold-500/10 text-muted-foreground">
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </Card>

            {/* ═══ ADD STUDENT MODAL ═══ */}
            <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
                <SheetContent className="bg-navy-900 border-l border-gold-500/10 w-full sm:max-w-[480px] overflow-y-auto">
                    <SheetHeader className="mb-6">
                        <SheetTitle className="text-xl font-bold text-foreground font-[family-name:var(--font-playfair)]">
                            Add New Student
                        </SheetTitle>
                    </SheetHeader>
                    <form className="space-y-5">
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Full Name</Label>
                            <Input placeholder="Enter full name" className="bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Email</Label>
                            <Input type="email" placeholder="student@gcuf.edu.pk" className="bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">CNIC</Label>
                            <Input placeholder="33100-1234567-1" className="bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Department</Label>
                            <Select onValueChange={setAddDept}>
                                <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent className="bg-navy-800 border-gold-500/10">
                                    {DEPARTMENTS.map((d) => (
                                        <SelectItem key={d} value={d}>{d}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Program</Label>
                            <Select>
                                <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                    <SelectValue placeholder="Select program" />
                                </SelectTrigger>
                                <SelectContent className="bg-navy-800 border-gold-500/10">
                                    {(PROGRAMS[addDept] || ["Select department first"]).map((p) => (
                                        <SelectItem key={p} value={p}>{p}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Session</Label>
                            <Select>
                                <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                    <SelectValue placeholder="Select session" />
                                </SelectTrigger>
                                <SelectContent className="bg-navy-800 border-gold-500/10">
                                    {SESSIONS.map((s) => (
                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Current Semester</Label>
                            <Select>
                                <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                    <SelectValue placeholder="Select semester" />
                                </SelectTrigger>
                                <SelectContent className="bg-navy-800 border-gold-500/10">
                                    {SEMESTERS.map((s) => (
                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" className="flex-1 border-gold-500/20 text-muted-foreground" onClick={() => setIsAddOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="button" className="flex-1 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 font-semibold" onClick={() => setIsAddOpen(false)}>
                                Create Student
                            </Button>
                        </div>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    );
}
