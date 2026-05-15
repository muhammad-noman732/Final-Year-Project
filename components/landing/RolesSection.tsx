"use client";

import { FadeIn } from "./FadeIn";
import { Building2, Eye, BookOpen, GraduationCap, Crown } from "lucide-react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

const roles = [
  {
    icon: Crown,
    role: "Super Admin",
    scope: "Platform Owner",
    description:
      "Onboard new universities, manage subscription plans, and oversee the entire platform from a single control center.",
    accent: "#d4a843",
    gradient: "from-[#d4a843]/20 via-[#d4a843]/5 to-transparent",
  },
  {
    icon: Building2,
    role: "Registrar / Admin",
    scope: "University Management",
    description:
      "Register students, configure fee structures, manage departments and staff, and monitor institution-wide collection in real-time.",
    accent: "#2563eb",
    gradient: "from-[#2563eb]/20 via-[#2563eb]/5 to-transparent",
  },
  {
    icon: Eye,
    role: "Vice Chancellor",
    scope: "Executive Oversight",
    description:
      "View live financial summaries, department comparisons, and collection trends — all read-only, always up to date.",
    accent: "#059669",
    gradient: "from-[#059669]/20 via-[#059669]/5 to-transparent",
  },
  {
    icon: BookOpen,
    role: "Head of Department",
    scope: "Department View",
    description:
      "Track your department's student enrollments, fee statuses, and collection rates without seeing other departments' data.",
    accent: "#dc6b20",
    gradient: "from-[#dc6b20]/20 via-[#dc6b20]/5 to-transparent",
  },
  {
    icon: GraduationCap,
    role: "Student",
    scope: "Self-Service Portal",
    description:
      "View assigned fees, pay online with one click, download digital receipts, and access complete payment history.",
    accent: "#7c3aed",
    gradient: "from-[#7c3aed]/20 via-[#7c3aed]/5 to-transparent",
  },
];

export default function RolesSection() {
  return (
    <section
      id="roles"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #07090f 0%, #05080f 100%)" }}
    >
      {}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px]"
          style={{
            background: "radial-gradient(ellipse, rgba(212,168,67,0.07) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: "30px 30px",
          }}
        />
        {}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.2) 50%, transparent)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 lg:px-10">
        <FadeIn className="text-center max-w-[620px] mx-auto mb-8">
          <p className="text-[11px] text-[#d4a843] font-bold uppercase tracking-[0.22em] mb-4">
            Who It&apos;s For
          </p>
          <h2 className="text-[2rem] md:text-[2.75rem] font-bold tracking-[-0.035em] leading-[1.1] text-white mb-5">
            One platform, every stakeholder.
          </h2>
          <p className="text-[16px] text-white/45 leading-[1.7]">
            Each role sees exactly what they need — data access is enforced at
            every level, not just hidden in the interface.
          </p>
        </FadeIn>

        {}
        <div className="max-w-[960px] mx-auto">
          {}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {roles.slice(0, 2).map((role, i) => (
              <FadeIn key={role.role} delay={i * 0.08}>
                <RoleCard3D role={role} />
              </FadeIn>
            ))}
          </div>
          {}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {roles.slice(2).map((role, i) => (
              <FadeIn key={role.role} delay={(i + 2) * 0.08}>
                <RoleCard3D role={role} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoleCard3D({ role }: { role: (typeof roles)[number] }) {
  const Icon = role.icon;
  return (
    <CardContainer containerClassName="py-4 px-2" className="">
      <CardBody
        className="relative rounded-[22px] border border-white/[0.08] w-full h-auto"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(12px)",
        }}
      >
        {}
        <CardItem translateZ={20} className="absolute inset-x-0 top-0 h-[2.5px] rounded-t-[22px]">
          <div
            style={{
              height: "2.5px",
              borderRadius: "22px 22px 0 0",
              background: `linear-gradient(90deg, ${role.accent}60 0%, ${role.accent} 50%, ${role.accent}60 100%)`,
            }}
          />
        </CardItem>

        {}
        <div
          className={`absolute inset-0 rounded-[22px] bg-gradient-to-br ${role.gradient} pointer-events-none opacity-40`}
        />

        <div className="relative p-7">
          {}
          <CardItem translateZ={60} className="mb-5">
            <div
              className="w-11 h-11 rounded-[13px] flex items-center justify-center"
              style={{
                background: `${role.accent}15`,
                border: `1px solid ${role.accent}30`,
                boxShadow: `0 4px 16px ${role.accent}20`,
              }}
            >
              <Icon
                className="w-5 h-5"
                style={{ color: role.accent }}
                strokeWidth={1.5}
              />
            </div>
          </CardItem>

          {}
          <CardItem translateZ={50} as="div" className="mb-1">
            <h3 className="text-[16px] font-bold text-white tracking-[-0.02em] leading-tight">
              {role.role}
            </h3>
          </CardItem>

          {}
          <CardItem translateZ={40} as="div" className="mb-4">
            <p
              className="text-[10px] font-black uppercase tracking-[0.12em]"
              style={{ color: `${role.accent}cc` }}
            >
              {role.scope}
            </p>
          </CardItem>

          {}
          <CardItem translateZ={30} as="p" className="text-[13px] text-white/45 leading-[1.75]">
            {role.description}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
