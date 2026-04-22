"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, GraduationCap, Calendar, Shield, Bell, Eye, EyeOff, Save, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useStudentProfile } from "@/hooks/student/useStudentProfile";
import { format } from "date-fns";
import { Skeleton } from "boneyard-js/react";
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
        ? profile.user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        : "";

    const enrollmentDateObj = profile?.createdAt ? new Date(profile.createdAt) : null;
    const formattedEnrollmentDate = enrollmentDateObj && !isNaN(enrollmentDateObj.getTime()) ? format(enrollmentDateObj, "MMM dd, yyyy") : "N/A";

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Profile Header */}
            <Skeleton name="student-profile-header" loading={isLoading}>
                <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#0d1321] to-[#080c14] border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 blur-[100px] pointer-events-none rounded-full" />
                    
                    <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <Avatar className="w-24 h-24 border border-gold-500/20 shadow-xl shadow-gold-500/5">
                            <AvatarFallback className="bg-gradient-to-br from-navy-900 to-navy-950 text-gold-400 text-3xl font-bold tracking-tight">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-center sm:text-left mt-2">
                            <h1 className="text-3xl font-bold text-foreground tracking-tighter mb-1">
                                {profile?.user?.name}
                            </h1>
                            <p className="text-sm font-mono text-muted-foreground tracking-widest">{profile?.studentId}</p>
                            
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4">
                                {profile?.enrollmentStatus && (
                                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-inner">
                                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{profile.enrollmentStatus.replace(/_/g, ' ')}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium bg-white/5 py-1 px-3 rounded-full border border-white/5">
                                    <BookOpen className="w-3.5 h-3.5" />
                                    {profile?.program?.code || profile?.department?.name}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Skeleton>

            {/* Tabs */}
            <Tabs defaultValue="personal" className="space-y-4">
                <TabsList className="bg-navy-800/50 border border-gold-500/8 w-full">
                    <TabsTrigger value="personal" className="flex-1 data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-400">
                        <User className="w-4 h-4 mr-2" /> Personal
                    </TabsTrigger>
                    <TabsTrigger value="academic" className="flex-1 data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-400">
                        <GraduationCap className="w-4 h-4 mr-2" /> Academic
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex-1 data-[state=active]:bg-gold-500/10 data-[state=active]:text-gold-400">
                        <Shield className="w-4 h-4 mr-2" /> Settings
                    </TabsTrigger>
                </TabsList>

                {/* Personal Info */}
                <TabsContent value="personal" className="mt-6">
                    <Skeleton name="student-profile-personal" loading={isLoading}>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            { icon: User, label: "Full Name", value: profile?.user?.name },
                            { icon: Mail, label: "Email Address", value: profile?.user?.email },
                            { icon: Phone, label: "Phone Number", value: profile?.user?.phone || "Not Provided" },
                            { icon: Shield, label: "National ID (CNIC)", value: profile?.cnic || "Not Provided" },
                        ].map((field) => (
                            <div key={field.label} className="p-5 rounded-[1.5rem] bg-navy-900/30 border border-white/[0.05] flex flex-col gap-1.5 transition-all hover:bg-navy-900/50">
                                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                    <field.icon className="w-3.5 h-3.5 text-gold-500/70" />
                                    <span className="text-[11px] font-bold uppercase tracking-widest">{field.label}</span>
                                </div>
                                <div className="text-sm font-medium text-foreground tracking-tight pl-5">
                                    {field.value}
                                </div>
                            </div>
                        ))}
                        <div className="sm:col-span-2 p-5 rounded-[1.5rem] bg-navy-900/30 border border-white/[0.05] flex flex-col gap-1.5 transition-all hover:bg-navy-900/50">
                            <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                <MapPin className="w-3.5 h-3.5 text-gold-500/70" />
                                <span className="text-[11px] font-bold uppercase tracking-widest">Registered Address</span>
                            </div>
                            <div className="text-sm font-medium text-foreground tracking-tight pl-5">
                                Not provided in current system record.
                            </div>
                        </div>
                    </div>
                    </Skeleton>
                </TabsContent>

                {/* Academic Info */}
                <TabsContent value="academic" className="mt-6">
                    <Skeleton name="student-profile-academic" loading={isLoading}>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            { icon: GraduationCap, label: "Department", value: profile?.department?.name },
                            { icon: BookOpen, label: "Program Enrolled", value: profile?.program?.name },
                            { icon: Calendar, label: "Current Semester", value: profile?.currentSemester ? `${profile.currentSemester}${["st","nd","rd"][((profile.currentSemester+90)%100-10)%10-1]||"th"} Semester` : "N/A" },
                            { icon: Calendar, label: "Academic Session", value: profile?.session?.name },
                            { icon: Calendar, label: "Enrollment Date", value: formattedEnrollmentDate },
                            { icon: Shield, label: "Student Identification", value: profile?.studentId },
                        ].map((field) => (
                            <div key={field.label} className="p-5 rounded-[1.5rem] bg-navy-900/30 border border-white/[0.05] flex flex-col gap-1.5 transition-all hover:bg-navy-900/50">
                                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                    <field.icon className="w-3.5 h-3.5 text-gold-500/70" />
                                    <span className="text-[11px] font-bold uppercase tracking-widest">{field.label}</span>
                                </div>
                                <div className="text-sm font-medium text-foreground tracking-tight pl-5">
                                    {field.value}
                                </div>
                            </div>
                        ))}
                    </div>
                    </Skeleton>
                </TabsContent>

                {/* Settings */}
                <TabsContent value="settings">
                    <div className="space-y-4">
                        {/* Change Password */}
                        <Card className="glass-card border-0 p-6">
                            <h3 className="text-sm font-semibold text-foreground tracking-tight mb-6">
                                Change Password
                            </h3>
                            <div className="space-y-4 max-w-md">
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground">Current Password</Label>
                                    <div className="relative">
                                        <Input type={showPassword ? "text" : "password"} className="h-10 bg-navy-800/50 border-gold-500/10 pr-10" />
                                        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold-400">
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
                            <h3 className="text-sm font-semibold text-foreground tracking-tight mb-6">
                                Notification Preferences
                            </h3>
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
