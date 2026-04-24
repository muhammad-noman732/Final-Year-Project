"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, GraduationCap, Calendar, Shield, Bell, Eye, EyeOff, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useStudentProfile } from "@/hooks/student/useStudentProfile";
import { format } from "date-fns";
import { Skeleton } from "boneyard-js/react";

function ordinalSuffix(n: number) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}

export default function StudentProfilePage() {
    const [showPassword, setShowPassword] = useState(false);
    const { profile, isLoading, isError } = useStudentProfile();

    if (isError) {
        return (
            <div className="max-w-3xl mx-auto flex items-center justify-center min-h-[400px]">
                <p className="text-muted-foreground">Failed to load profile. Please try again later.</p>
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

    return (
        <div className="max-w-3xl mx-auto space-y-6 pb-12">
            {/* ═══════ PROFILE HEADER ═══════ */}
            <Skeleton name="student-profile-header" loading={isLoading}>
                <div className="rounded-[2rem] border border-white/[0.05] overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                    {/* Cover banner */}
                    <div className="relative h-28 bg-gradient-to-br from-navy-800 via-[#0f1729] to-[#0a1020] overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(212,168,67,0.12)_0%,transparent_70%)]" />
                        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
                        {/* Decorative grid lines */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{
                            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }} />
                    </div>

                    {/* Content — avatar overlaps the banner */}
                    <div className="bg-gradient-to-br from-[#0d1321] to-[#080c14] px-6 sm:px-8 pb-8">
                        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10 mb-6">
                            {/* Avatar */}
                            <div className="w-20 h-20 rounded-[1.25rem] bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-navy-950 font-black text-2xl border-[3px] border-[#080c14] shadow-xl shadow-gold-500/10 flex-shrink-0">
                                {initials || "?"}
                            </div>

                            {/* Name / ID / Badges */}
                            <div className="pb-1 flex-1 min-w-0">
                                <h1 className="text-2xl font-bold text-foreground tracking-tighter leading-tight truncate">
                                    {profile?.user?.name ?? "—"}
                                </h1>
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                    <span className="text-[10px] font-mono text-muted-foreground tracking-widest bg-white/5 border border-white/[0.06] px-2.5 py-1 rounded-full">
                                        {profile?.studentId ?? "—"}
                                    </span>
                                    {profile?.enrollmentStatus && (
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                                            {profile.enrollmentStatus.replace(/_/g, " ")}
                                        </span>
                                    )}
                                    {profile?.program?.code && (
                                        <span className="text-[10px] font-medium text-muted-foreground bg-white/5 border border-white/[0.06] px-2.5 py-1 rounded-full flex items-center gap-1.5">
                                            <BookOpen className="w-3 h-3" />
                                            {profile.program.code}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Skeleton>

            {/* ═══════ TABS ═══════ */}
            <Tabs defaultValue="personal" className="space-y-4">
                <TabsList className="bg-navy-800/50 border border-white/[0.05] w-full gap-1 p-1">
                    <TabsTrigger value="personal" className="flex-1 data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-400 rounded-lg text-xs">
                        <User className="w-3.5 h-3.5 mr-1.5" /> Personal
                    </TabsTrigger>
                    <TabsTrigger value="academic" className="flex-1 data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-400 rounded-lg text-xs">
                        <GraduationCap className="w-3.5 h-3.5 mr-1.5" /> Academic
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex-1 data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-400 rounded-lg text-xs">
                        <Shield className="w-3.5 h-3.5 mr-1.5" /> Settings
                    </TabsTrigger>
                </TabsList>

                {/* ─── PERSONAL ─── */}
                <TabsContent value="personal">
                    <Skeleton name="student-profile-personal" loading={isLoading}>
                        <div className="rounded-[1.75rem] border border-white/[0.05] bg-gradient-to-br from-[#0d1321] to-[#080c14] overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                            {[
                                { icon: User, label: "Full Name", value: profile?.user?.name },
                                { icon: Mail, label: "Email Address", value: profile?.user?.email },
                                { icon: Phone, label: "Phone Number", value: profile?.user?.phone || "Not provided" },
                                { icon: Shield, label: "National ID (CNIC)", value: profile?.cnic || "Not provided" },
                                { icon: MapPin, label: "Registered Address", value: "Not provided in current system record" },
                            ].map((field, i, arr) => (
                                <div
                                    key={field.label}
                                    className={`flex items-start gap-4 px-6 py-4 ${i < arr.length - 1 ? "border-b border-white/[0.04]" : ""} hover:bg-white/[0.015] transition-colors`}
                                >
                                    <div className="w-7 h-7 rounded-lg bg-gold-500/8 border border-gold-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <field.icon className="w-3.5 h-3.5 text-gold-500/60" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-muted-foreground/60 mb-0.5">{field.label}</p>
                                        <p className="text-sm font-medium text-foreground truncate">{field.value ?? "—"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Skeleton>
                </TabsContent>

                {/* ─── ACADEMIC ─── */}
                <TabsContent value="academic">
                    <Skeleton name="student-profile-academic" loading={isLoading}>
                        <div className="rounded-[1.75rem] border border-white/[0.05] bg-gradient-to-br from-[#0d1321] to-[#080c14] overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                            {[
                                { icon: GraduationCap, label: "Department", value: profile?.department?.name },
                                { icon: BookOpen, label: "Program Enrolled", value: profile?.program?.name },
                                {
                                    icon: Calendar,
                                    label: "Current Semester",
                                    value: profile?.currentSemester ? `${ordinalSuffix(profile.currentSemester)} Semester` : "N/A",
                                },
                                { icon: Calendar, label: "Academic Session", value: profile?.session?.name },
                                { icon: Calendar, label: "Enrollment Date", value: formattedEnrollmentDate },
                                { icon: Shield, label: "Student ID", value: profile?.studentId },
                            ].map((field, i, arr) => (
                                <div
                                    key={field.label}
                                    className={`flex items-start gap-4 px-6 py-4 ${i < arr.length - 1 ? "border-b border-white/[0.04]" : ""} hover:bg-white/[0.015] transition-colors`}
                                >
                                    <div className="w-7 h-7 rounded-lg bg-gold-500/8 border border-gold-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <field.icon className="w-3.5 h-3.5 text-gold-500/60" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-muted-foreground/60 mb-0.5">{field.label}</p>
                                        <p className="text-sm font-medium text-foreground truncate">{field.value ?? "—"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Skeleton>
                </TabsContent>

                {/* ─── SETTINGS ─── */}
                <TabsContent value="settings">
                    <div className="space-y-4">
                        {/* Change Password */}
                        <Card className="glass-card border-0 p-6">
                            <h3 className="text-sm font-semibold text-foreground tracking-tight mb-6">Change Password</h3>
                            <div className="space-y-4 max-w-md">
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground">Current Password</Label>
                                    <div className="relative">
                                        <Input type={showPassword ? "text" : "password"} className="h-10 bg-navy-800/50 border-gold-500/10 pr-10" />
                                        <button
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold-400"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground">New Password</Label>
                                    <Input type="password" className="h-10 bg-navy-800/50 border-gold-500/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground">Confirm Password</Label>
                                    <Input type="password" className="h-10 bg-navy-800/50 border-gold-500/10" />
                                </div>
                                <Button className="bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 font-semibold">
                                    Update Password
                                </Button>
                            </div>
                        </Card>

                        {/* Notifications */}
                        <Card className="glass-card border-0 p-6">
                            <h3 className="text-sm font-semibold text-foreground tracking-tight mb-6">Notification Preferences</h3>
                            <div className="space-y-4">
                                {[
                                    { label: "Email Notifications", desc: "Receive payment confirmations and reminders", defaultChecked: true },
                                    { label: "SMS Notifications", desc: "Get SMS alerts for fee deadlines", defaultChecked: true },
                                    { label: "Fee Reminders", desc: "Reminder 7 days before deadline", defaultChecked: true },
                                    { label: "Payment Receipts", desc: "Auto-email receipts after payment", defaultChecked: false },
                                ].map((pref) => (
                                    <div key={pref.label} className="flex items-center justify-between py-2 border-b border-gold-500/5 last:border-0">
                                        <div className="flex items-start gap-3">
                                            <Bell className="w-4 h-4 text-gold-500/40 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-foreground">{pref.label}</p>
                                                <p className="text-xs text-muted-foreground">{pref.desc}</p>
                                            </div>
                                        </div>
                                        <Switch defaultChecked={pref.defaultChecked} />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
