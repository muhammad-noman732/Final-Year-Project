"use client";

import { useState } from "react";
import {
    User, Mail, Phone, MapPin, GraduationCap, Calendar,
    Shield, Eye, EyeOff, BookOpen,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStudentProfile } from "@/hooks/student/useStudentProfile";
import { format } from "date-fns";
import { Skeleton } from "boneyard-js/react";

function ordinalSuffix(n: number) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}

type InfoField = { label: string; value: string | null | undefined };

function InfoPanel({ fields }: { fields: InfoField[] }) {
    return (
        <div className="rounded-xl bg-white/[0.015] ring-1 ring-inset ring-white/[0.06] overflow-hidden">
            <dl className="divide-y divide-white/[0.05]">
                {fields.map((f) => (
                    <div
                        key={f.label}
                        className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 px-6 py-3.5 hover:bg-white/[0.01] transition-colors duration-100"
                    >
                        <dt className="text-[11px] uppercase tracking-[0.12em] text-zinc-500 font-medium sm:py-0.5 flex-shrink-0">
                            {f.label}
                        </dt>
                        <dd className="text-[13.5px] font-medium text-zinc-100 truncate">
                            {f.value || "—"}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

export default function StudentProfilePage() {
    const [showPassword, setShowPassword] = useState(false);
    const { profile, isLoading, isError } = useStudentProfile();

    if (isError) {
        return (
            <div className="max-w-3xl mx-auto flex items-center justify-center min-h-[400px]">
                <p className="text-sm text-zinc-400">Failed to load profile. Please try again later.</p>
            </div>
        );
    }

    const initials = profile?.user?.name
        ? profile.user.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()
        : "";

    const enrollmentDateObj = profile?.createdAt ? new Date(profile.createdAt) : null;
    const formattedEnrollmentDate =
        enrollmentDateObj && !isNaN(enrollmentDateObj.getTime())
            ? format(enrollmentDateObj, "MMM dd, yyyy")
            : "N/A";

    const personalFields: InfoField[] = [
        { label: "Full name", value: profile?.user?.name },
        { label: "Email", value: profile?.user?.email },
        { label: "Phone", value: profile?.user?.phone || "Not provided" },
        { label: "CNIC", value: profile?.cnic || "Not provided" },
        { label: "Address", value: "Not on record" },
    ];

    const academicFields: InfoField[] = [
        { label: "Department", value: profile?.department?.name },
        { label: "Program", value: profile?.program?.name },
        {
            label: "Current semester",
            value: profile?.currentSemester ? `${ordinalSuffix(profile.currentSemester)} Semester` : "N/A",
        },
        { label: "Session", value: profile?.session?.name },
        { label: "Enrollment date", value: formattedEnrollmentDate },
        { label: "Student ID", value: profile?.studentId },
    ];

    return (
        <div className="relative">
            {/* Atmospheric depth */}
            <div
                aria-hidden
                className="pointer-events-none fixed inset-0 -z-10"
                style={{
                    background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(212,168,67,0.035), transparent 60%)",
                }}
            />

            <div className="max-w-3xl mx-auto space-y-6 pb-16">

                {/* ══════════════════════ PROFILE HEADER ══════════════════════ */}
                <Skeleton name="student-profile-header" loading={isLoading}>
                    <div className="rounded-xl bg-white/[0.015] ring-1 ring-inset ring-white/[0.06] overflow-hidden">
                        {/* Subtle banner */}
                        <div className="relative h-14 bg-gradient-to-b from-white/[0.03] to-transparent">
                            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                        </div>

                        {/* Avatar + identity */}
                        <div className="px-6 pb-6 -mt-5">
                            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                                {/* Avatar */}
                                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 font-semibold text-lg ring-[3px] ring-[#050811] flex-shrink-0">
                                    {initials || "—"}
                                </div>

                                {/* Name + badges */}
                                <div className="min-w-0 flex-1 pb-0.5">
                                    <h1 className="text-[20px] font-semibold text-zinc-50 tracking-tight leading-tight truncate">
                                        {profile?.user?.name ?? "—"}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                                        <span className="text-[10.5px] font-mono text-zinc-400 tracking-wider bg-white/[0.03] ring-1 ring-inset ring-white/[0.06] px-2 py-[3px] rounded">
                                            {profile?.studentId ?? "—"}
                                        </span>
                                        {profile?.enrollmentStatus && (
                                            <span className="text-[10px] font-medium uppercase tracking-widest text-emerald-400 bg-emerald-500/10 ring-1 ring-inset ring-emerald-500/20 px-2 py-[3px] rounded">
                                                {profile.enrollmentStatus.replace(/_/g, " ")}
                                            </span>
                                        )}
                                        {profile?.program?.code && (
                                            <span className="inline-flex items-center gap-1.5 text-[10.5px] font-medium text-zinc-400 bg-white/[0.03] ring-1 ring-inset ring-white/[0.06] px-2 py-[3px] rounded">
                                                <BookOpen className="w-3 h-3" strokeWidth={1.75} />
                                                {profile.program.code}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Skeleton>

                {/* ══════════════════════ TABS ══════════════════════ */}
                <Tabs defaultValue="personal" className="space-y-5">
                    <TabsList className="bg-white/[0.02] ring-1 ring-inset ring-white/[0.06] p-1 rounded-lg gap-0.5 w-full h-auto">
                        {[
                            { value: "personal", label: "Personal", Icon: User },
                            { value: "academic", label: "Academic", Icon: GraduationCap },
                            { value: "settings", label: "Settings", Icon: Shield },
                        ].map(({ value, label, Icon }) => (
                            <TabsTrigger
                                key={value}
                                value={value}
                                className="flex-1 data-[state=active]:bg-white/[0.05] data-[state=active]:text-gold-400 data-[state=active]:shadow-none rounded-md text-[12.5px] py-1.5 text-zinc-400 gap-1.5"
                            >
                                <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* ─── PERSONAL ─── */}
                    <TabsContent value="personal" className="mt-0">
                        <Skeleton name="student-profile-personal" loading={isLoading}>
                            <InfoPanel fields={personalFields} />
                        </Skeleton>
                    </TabsContent>

                    {/* ─── ACADEMIC ─── */}
                    <TabsContent value="academic" className="mt-0">
                        <Skeleton name="student-profile-academic" loading={isLoading}>
                            <InfoPanel fields={academicFields} />
                        </Skeleton>
                    </TabsContent>

                    {/* ─── SETTINGS ─── */}
                    <TabsContent value="settings" className="mt-0 space-y-4">

                        {/* Password */}
                        <div className="rounded-xl bg-white/[0.015] ring-1 ring-inset ring-white/[0.06] p-6">
                            <div className="mb-5">
                                <h3 className="text-[14px] font-semibold text-zinc-50 tracking-tight">Password</h3>
                                <p className="text-[12.5px] text-zinc-500 mt-0.5">Update your account login password.</p>
                            </div>
                            <div className="space-y-4 max-w-sm">
                                <div className="space-y-1.5">
                                    <Label className="text-[11.5px] text-zinc-400">Current password</Label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            className="h-9 bg-white/[0.02] border-white/[0.08] rounded-lg pr-9 text-[13px]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((v) => !v)}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors duration-150"
                                        >
                                            {showPassword
                                                ? <EyeOff className="w-3.5 h-3.5" />
                                                : <Eye className="w-3.5 h-3.5" />
                                            }
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[11.5px] text-zinc-400">New password</Label>
                                    <Input type="password" className="h-9 bg-white/[0.02] border-white/[0.08] rounded-lg text-[13px]" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[11.5px] text-zinc-400">Confirm new password</Label>
                                    <Input type="password" className="h-9 bg-white/[0.02] border-white/[0.08] rounded-lg text-[13px]" />
                                </div>
                                <Button className="h-9 px-4 bg-gold-400 hover:bg-gold-300 text-navy-950 font-medium text-[13px] rounded-lg">
                                    Update password
                                </Button>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="rounded-xl bg-white/[0.015] ring-1 ring-inset ring-white/[0.06] p-6">
                            <div className="mb-5">
                                <h3 className="text-[14px] font-semibold text-zinc-50 tracking-tight">Notifications</h3>
                                <p className="text-[12.5px] text-zinc-500 mt-0.5">
                                    Manage how we contact you about fees and receipts.
                                </p>
                            </div>
                            <div className="divide-y divide-white/[0.05]">
                                {[
                                    { label: "Email notifications", desc: "Payment confirmations and deadline reminders.", defaultChecked: true },
                                    { label: "SMS alerts", desc: "Text alerts for upcoming fee deadlines.", defaultChecked: true },
                                    { label: "Fee reminders", desc: "Heads-up 7 days before your due date.", defaultChecked: true },
                                    { label: "Auto-email receipts", desc: "Send receipts immediately after payment.", defaultChecked: false },
                                ].map((pref) => (
                                    <div
                                        key={pref.label}
                                        className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                                    >
                                        <div className="min-w-0">
                                            <p className="text-[13.5px] font-medium text-zinc-100">{pref.label}</p>
                                            <p className="text-[12px] text-zinc-500 mt-0.5">{pref.desc}</p>
                                        </div>
                                        <Switch defaultChecked={pref.defaultChecked} className="flex-shrink-0" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
