"use client";
import { useState } from "react";
import { Plus, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import StatusBadge from "@/components/shared/StatusBadge";
import { Skeleton } from "boneyard-js/react";
import { useGetUsers } from "@/hooks/admin/useGetUsers";
import { useAddUser } from "@/hooks/admin/useAddUser";
import { useDeleteUser } from "@/hooks/admin/useDeleteUser";
import type { AdminUserRole } from "@/types/client/user.api.types";

export default function UsersPage() {
    const {
        selectedRole, handleRoleChange,
        page, setPage,
        users, meta, isLoading, isFetching,
    } = useGetUsers();

    const [isAddOpen, setIsAddOpen] = useState(false);
    const { form, onSubmit, isLoading: isCreating, watchRole, departments } = useAddUser(() => setIsAddOpen(false));
    const { handleDelete, isDeleting } = useDeleteUser();

    const { register, formState: { errors }, setValue } = form;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">
                        Staff Management
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">{meta.total} staff accounts</p>
                </div>
                <Button
                    onClick={() => setIsAddOpen(true)}
                    className="bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-navy-950 font-semibold"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add Staff
                </Button>
            </div>

            <Card className="glass-card border-0 p-4">
                <div className="flex flex-wrap gap-2">
                    <Select value={selectedRole} onValueChange={handleRoleChange}>
                        <SelectTrigger className="w-[160px] bg-navy-800/50 border-gold-500/10">
                            <SelectValue placeholder="Role Filter" />
                        </SelectTrigger>
                        <SelectContent className="bg-navy-800 border-gold-500/10">
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="VC">VC</SelectItem>
                            <SelectItem value="HOD">HOD</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </Card>

            <Skeleton name="users-table" loading={isLoading}>
                <Card className="glass-card border-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-gold-500/5 hover:bg-transparent">
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Name</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Email</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Role</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Department</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Status</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                            No staff accounts found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.map((user) => (
                                        <TableRow key={user.id} className="border-gold-500/5 hover:bg-navy-700/20 transition-colors">
                                            <TableCell className="text-sm font-medium">{user.name}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                                            <TableCell>
                                                <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${user.role === "VC" ? "bg-sky-500/10 text-sky-400" : "bg-amber-500/10 text-amber-400"}`}>
                                                    {user.role}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {user.role === "HOD" && user.hodDepartment ? user.hodDepartment.name : "—"}
                                            </TableCell>
                                            <TableCell><StatusBadge status={user.isActive ? "active" : "inactive"} /></TableCell>
                                            <TableCell>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-muted-foreground hover:text-rose-400"
                                                    disabled={isDeleting}
                                                    onClick={() => handleDelete(user.id, user.name)}
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-between px-4 py-3 border-t border-gold-500/5">
                        <p className="text-xs text-muted-foreground">
                            Showing {users.length} of {meta.total} users
                        </p>
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

            {/* ═══ ADD USER SHEET ═══ */}
            <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
                <SheetContent className="bg-navy-900 border-l border-gold-500/10 w-full sm:max-w-[480px] overflow-y-auto">
                    <SheetHeader className="mb-6">
                        <SheetTitle className="text-xl font-bold text-foreground tracking-tight">
                            Add Staff Account
                        </SheetTitle>
                    </SheetHeader>
                    <form className="space-y-5" onSubmit={onSubmit}>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Full Name</Label>
                            <Input {...register("name")} placeholder="Dr. Ahmad Ali" className="bg-navy-800/50 border-gold-500/10" />
                            {errors.name && <p className="text-xs text-rose-400">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Email</Label>
                            <Input {...register("email")} type="email" placeholder="admin@gcuf.edu.pk" className="bg-navy-800/50 border-gold-500/10" />
                            {errors.email && <p className="text-xs text-rose-400">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Phone <span className="text-muted-foreground">(optional)</span></Label>
                            <Input {...register("phone")} placeholder="03001234567" className="bg-navy-800/50 border-gold-500/10" />
                            {errors.phone && <p className="text-xs text-rose-400">{errors.phone.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Role</Label>
                            <Select value={watchRole} onValueChange={(v) => setValue("role", v as AdminUserRole)}>
                                <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent className="bg-navy-800 border-gold-500/10">
                                    <SelectItem value="VC">Vice Chancellor (VC)</SelectItem>
                                    <SelectItem value="HOD">Head of Department (HOD)</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.role && <p className="text-xs text-rose-400">{errors.role.message}</p>}
                        </div>
                        {watchRole === "HOD" && (
                            <div className="space-y-2">
                                <Label className="text-sm text-foreground/80">Department</Label>
                                <Select onValueChange={(v) => setValue("hodDepartmentId", v)}>
                                    <SelectTrigger className="bg-navy-800/50 border-gold-500/10">
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-navy-800 border-gold-500/10">
                                        {departments.map((d) => (
                                            <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.hodDepartmentId && <p className="text-xs text-rose-400">{errors.hodDepartmentId.message}</p>}
                            </div>
                        )}
                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" className="flex-1 border-gold-500/20 text-muted-foreground" onClick={() => setIsAddOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isCreating} className="flex-1 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 font-semibold">
                                {isCreating ? "Creating..." : "Create Account"}
                            </Button>
                        </div>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    );
}
