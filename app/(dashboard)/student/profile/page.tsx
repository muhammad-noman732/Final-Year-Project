"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, GraduationCap, Calendar, Shield, Bell, Eye, EyeOff, Save } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const profile = {
    name: "Muhammad Ali",
    email: "ali@gcuf.edu.pk",
    phone: "+92 300 1234567",
    cnic: "33100-1234567-1",
    address: "123 Main Street, Faisalabad",
    studentId: "GCUF-2024-CS-0042",
    department: "Computer Science",
    program: "BS Computer Science",
    semester: "4th Semester",
    session: "2024-2028",
    enrollmentDate: "Aug 15, 2024",
    guardianName: "Ahmed Ali",
    guardianPhone: "+92 301 7654321",
};

export default function StudentProfilePage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Profile Header */}
            <Card className="glass-card border-0 p-6">
                <div className="flex flex-col sm:flex-row items-center gap-5">
                    <Avatar className="w-20 h-20 border-2 border-gold-500/20">
                        <AvatarFallback className="bg-gradient-to-br from-gold-500/20 to-gold-700/20 text-gold-400 text-2xl font-bold font-[family-name:var(--font-playfair)]">
                            MA
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-playfair)]">
                            {profile.name}
                        </h1>
                        <p className="text-sm text-muted-foreground font-mono">{profile.studentId}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Active Student</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{profile.department}</span>
                        </div>
                    </div>
                </div>
            </Card>

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
                <TabsContent value="personal">
                    <Card className="glass-card border-0 p-6">
                        <h3 className="text-sm font-semibold text-foreground font-[family-name:var(--font-playfair)] mb-6">
                            Personal Information
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-5">
                            {[
                                { icon: User, label: "Full Name", value: profile.name },
                                { icon: Mail, label: "Email", value: profile.email },
                                { icon: Phone, label: "Phone", value: profile.phone },
                                { icon: Shield, label: "CNIC", value: profile.cnic },
                                { icon: User, label: "Guardian Name", value: profile.guardianName },
                                { icon: Phone, label: "Guardian Phone", value: profile.guardianPhone },
                            ].map((field) => (
                                <div key={field.label} className="space-y-2">
                                    <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
                                        <field.icon className="w-3 h-3" /> {field.label}
                                    </Label>
                                    <Input defaultValue={field.value} className="h-10 bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30" />
                                </div>
                            ))}
                            <div className="sm:col-span-2 space-y-2">
                                <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
                                    <MapPin className="w-3 h-3" /> Address
                                </Label>
                                <Input defaultValue={profile.address} className="h-10 bg-navy-800/50 border-gold-500/10 focus:border-gold-500/30" />
                            </div>
                        </div>
                        <Button className="mt-6 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 font-semibold">
                            <Save className="w-4 h-4 mr-2" /> Save Changes
                        </Button>
                    </Card>
                </TabsContent>

                {/* Academic Info */}
                <TabsContent value="academic">
                    <Card className="glass-card border-0 p-6">
                        <h3 className="text-sm font-semibold text-foreground font-[family-name:var(--font-playfair)] mb-6">
                            Academic Information
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-5">
                            {[
                                { icon: GraduationCap, label: "Department", value: profile.department },
                                { icon: GraduationCap, label: "Program", value: profile.program },
                                { icon: Calendar, label: "Current Semester", value: profile.semester },
                                { icon: Calendar, label: "Session", value: profile.session },
                                { icon: Calendar, label: "Enrollment Date", value: profile.enrollmentDate },
                                { icon: Shield, label: "Student ID", value: profile.studentId },
                            ].map((field) => (
                                <div key={field.label} className="space-y-2">
                                    <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
                                        <field.icon className="w-3 h-3" /> {field.label}
                                    </Label>
                                    <div className="h-10 px-3 flex items-center bg-navy-800/30 border border-gold-500/5 rounded-md text-sm text-muted-foreground">
                                        {field.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </TabsContent>

                {/* Settings */}
                <TabsContent value="settings">
                    <div className="space-y-4">
                        {/* Change Password */}
                        <Card className="glass-card border-0 p-6">
                            <h3 className="text-sm font-semibold text-foreground font-[family-name:var(--font-playfair)] mb-6">
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
                            <h3 className="text-sm font-semibold text-foreground font-[family-name:var(--font-playfair)] mb-6">
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
