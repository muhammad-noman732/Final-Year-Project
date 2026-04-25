"use client"

import { motion } from "framer-motion"
import { GraduationCap, User, BookOpen, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useStudentProfile } from "@/hooks/student/useStudentProfile"
import { format } from "date-fns"
import { Skeleton } from "boneyard-js/react"
import { ordinal } from "@/hooks/student/useStudentDashboard"

type InfoField = { label: string; value: string | null | undefined }

function InfoRow({ field, index }: { field: InfoField; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, type: "spring", stiffness: 300, damping: 30 }}
      className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 px-6 py-3.5 hover:bg-white/[0.012] transition-colors duration-100 border-b border-white/[0.04] last:border-0"
    >
      <dt className="text-[10.5px] uppercase tracking-[0.14em] text-zinc-500 font-semibold sm:py-0.5 flex-shrink-0">
        {field.label}
      </dt>
      <dd className="text-[13.5px] font-medium text-zinc-100 truncate">
        {field.value || "—"}
      </dd>
    </motion.div>
  )
}

export default function StudentProfilePage() {
  const { profile, isLoading, isError } = useStudentProfile()

  if (isError) {
    return (
      <div className="max-w-3xl mx-auto flex items-center justify-center min-h-[400px]">
        <p className="text-sm text-zinc-400">Failed to load profile. Please try again later.</p>
      </div>
    )
  }

  const initials = profile?.user?.name
    ? profile.user.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()
    : ""

  const enrollmentDateObj = profile?.createdAt ? new Date(profile.createdAt) : null
  const formattedEnrollmentDate =
    enrollmentDateObj && !isNaN(enrollmentDateObj.getTime())
      ? format(enrollmentDateObj, "MMM dd, yyyy")
      : "N/A"

  const personalFields: InfoField[] = [
    { label: "Full name", value: profile?.user?.name },
    { label: "Email", value: profile?.user?.email },
    { label: "Phone", value: profile?.user?.phone || "Not provided" },
    { label: "CNIC", value: profile?.cnic || "Not provided" },
  ]

  const academicFields: InfoField[] = [
    { label: "Student ID", value: profile?.studentId },
    { label: "Department", value: profile?.department?.name },
    { label: "Program", value: profile?.program?.name },
    { label: "Degree type", value: profile?.program?.degreeType },
    {
      label: "Current semester",
      value: profile?.currentSemester ? `${ordinal(profile.currentSemester)} Semester` : "N/A",
    },
    { label: "Session", value: profile?.session?.name },
    { label: "Enrollment date", value: formattedEnrollmentDate },
  ]

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(212,168,67,0.035), transparent 60%)",
        }}
      />

      <div className="max-w-3xl mx-auto space-y-5 pb-16">

        {/* ── PROFILE HEADER ── */}
        <Skeleton name="student-profile-header" loading={isLoading}>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] overflow-hidden">
            {/* Banner */}
            <div className="relative h-16 bg-gradient-to-br from-gold-500/[0.06] to-transparent">
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            </div>

            {/* Avatar + identity */}
            <div className="px-6 pb-6 -mt-6">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 font-bold text-lg ring-[3px] ring-[#050811] shadow-lg shadow-gold-500/15 flex-shrink-0"
                >
                  {initials || "—"}
                </motion.div>

                <div className="min-w-0 flex-1 pb-0.5">
                  <h1 className="text-[20px] font-bold text-zinc-50 tracking-tight leading-tight truncate">
                    {profile?.user?.name ?? "—"}
                  </h1>
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="text-[10.5px] font-mono text-zinc-400 tracking-wider bg-white/[0.03] ring-1 ring-inset ring-white/[0.06] px-2 py-[3px] rounded-md">
                      {profile?.studentId ?? "—"}
                    </span>
                    {profile?.enrollmentStatus && (
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 ring-1 ring-inset ring-emerald-500/20 px-2 py-[3px] rounded-md">
                        {profile.enrollmentStatus.replace(/_/g, " ")}
                      </span>
                    )}
                    {profile?.program?.code && (
                      <span className="inline-flex items-center gap-1.5 text-[10.5px] font-medium text-zinc-400 bg-white/[0.03] ring-1 ring-inset ring-white/[0.06] px-2 py-[3px] rounded-md">
                        <BookOpen className="w-3 h-3" strokeWidth={1.75} />
                        {profile.program.code}
                      </span>
                    )}
                    {profile?.session?.name && (
                      <span className="inline-flex items-center gap-1.5 text-[10.5px] font-medium text-zinc-400 bg-white/[0.03] ring-1 ring-inset ring-white/[0.06] px-2 py-[3px] rounded-md">
                        <Calendar className="w-3 h-3" strokeWidth={1.75} />
                        {profile.session.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Skeleton>

        {/* ── TABS: PERSONAL + ACADEMIC ── */}
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="bg-white/[0.02] ring-1 ring-inset ring-white/[0.06] p-1 rounded-xl gap-0.5 w-full h-auto">
            {[
              { value: "personal", label: "Personal", Icon: User },
              { value: "academic", label: "Academic", Icon: GraduationCap },
            ].map(({ value, label, Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex-1 data-[state=active]:bg-white/[0.06] data-[state=active]:text-gold-400 data-[state=active]:shadow-none rounded-lg text-[12.5px] py-2 text-zinc-400 gap-1.5 transition-all duration-200"
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ─── PERSONAL ─── */}
          <TabsContent value="personal" className="mt-0">
            <Skeleton name="student-profile-personal" loading={isLoading}>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] overflow-hidden">
                <dl className="divide-y divide-white/[0.04]">
                  {personalFields.map((f, i) => (
                    <InfoRow key={f.label} field={f} index={i} />
                  ))}
                </dl>
              </div>
            </Skeleton>
          </TabsContent>

          {/* ─── ACADEMIC ─── */}
          <TabsContent value="academic" className="mt-0">
            <Skeleton name="student-profile-academic" loading={isLoading}>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] overflow-hidden">
                <dl className="divide-y divide-white/[0.04]">
                  {academicFields.map((f, i) => (
                    <InfoRow key={f.label} field={f} index={i} />
                  ))}
                </dl>
              </div>
            </Skeleton>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
