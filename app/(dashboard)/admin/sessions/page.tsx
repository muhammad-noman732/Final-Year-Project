"use client";

import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useGetSessionsQuery, useSetCurrentSessionMutation } from "@/store/api/admin/sessionsApi";
import { Skeleton } from "boneyard-js/react";
import { useAddSession } from "@/hooks/admin/useAddSession";
import { toast } from "sonner";

export default function SessionsPage() {
    const [page, setPage] = useState(1);
    const { data: response, isLoading, isFetching } = useGetSessionsQuery({ page, limit: 10 });
    const sessions = response?.data?.data ?? [];
    const meta = response?.data?.meta ?? { total: 0, totalPages: 1, page: 1, limit: 10 };

    const [isAddOpen, setIsAddOpen] = useState(false);
    const { form, onSubmit, isLoading: isCreating } = useAddSession(() => setIsAddOpen(false));
    const { register, formState: { errors } } = form;

    const [setCurrentSession, { isLoading: isSettingCurrent }] = useSetCurrentSessionMutation();

    const handleSetCurrent = async (id: string, name: string) => {
        try {
            await setCurrentSession(id).unwrap();
            toast.success(`${name} is now the current session`);
        } catch {
            // RTK middleware handles error toast
        }
    };

    return (
        <div className="space-y-6 p-5 lg:p-8 pb-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#0F172A] dark:text-foreground tracking-tight">Academic Sessions</h1>
                    <p className="text-sm text-muted-foreground mt-1">{meta.total} sessions</p>
                </div>
                <Button onClick={() => setIsAddOpen(true)} className="bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-navy-950 font-semibold">
                    <Plus className="w-4 h-4 mr-2" /> Add Session
                </Button>
            </div>

            <Skeleton name="sessions-table" loading={isLoading}>
                <Card className="glass-card border-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-gold-500/5 hover:bg-transparent">
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Name</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Start Year</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">End Year</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Current</TableHead>
                                    <TableHead className="text-gold-500/60 text-xs uppercase tracking-wider">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sessions.length === 0 ? (
                                    <TableRow><TableCell colSpan={5} className="h-24 text-center text-muted-foreground">No sessions found.</TableCell></TableRow>
                                ) : (
                                    sessions.map((session) => (
                                        <TableRow key={session.id} className="border-gold-500/5 hover:bg-navy-700/20 transition-colors">
                                            <TableCell className="text-sm font-medium">{session.name}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{session.startYear}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{session.endYear}</TableCell>
                                            <TableCell>
                                                {session.isCurrent ? (
                                                    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                                                        <Star className="w-3 h-3 fill-current" /> Current
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-muted-foreground">—</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {!session.isCurrent && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="border-gold-500/20 text-gold-400 hover:bg-gold-500/5 text-xs"
                                                        disabled={isSettingCurrent}
                                                        onClick={() => handleSetCurrent(session.id, session.name)}
                                                    >
                                                        Set Current
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3 border-t border-gold-500/5">
                        <p className="text-xs text-muted-foreground">Showing {sessions.length} of {meta.total}</p>
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
                        <SheetTitle className="text-xl font-bold text-foreground tracking-tight">Add Session</SheetTitle>
                    </SheetHeader>
                    <form className="space-y-5" onSubmit={onSubmit}>
                        <div className="space-y-2">
                            <Label className="text-sm text-foreground/80">Session Name</Label>
                            <Input {...register("name")} placeholder="2024-2028" className="bg-navy-800/50 border-gold-500/10" />
                            {errors.name && <p className="text-xs text-rose-400">{errors.name.message}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label className="text-sm text-foreground/80">Start Year</Label>
                                <Input {...register("startYear", { valueAsNumber: true })} type="number" className="bg-navy-800/50 border-gold-500/10" />
                                {errors.startYear && <p className="text-xs text-rose-400">{errors.startYear.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm text-foreground/80">End Year</Label>
                                <Input {...register("endYear", { valueAsNumber: true })} type="number" className="bg-navy-800/50 border-gold-500/10" />
                                {errors.endYear && <p className="text-xs text-rose-400">{errors.endYear.message}</p>}
                            </div>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" className="flex-1 border-gold-500/20 text-muted-foreground" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isCreating} className="flex-1 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 font-semibold">
                                {isCreating ? "Creating..." : "Create Session"}
                            </Button>
                        </div>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    );
}
