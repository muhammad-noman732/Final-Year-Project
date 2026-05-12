import { FadeIn } from "./FadeIn";
import {
  Building2,
  Eye,
  BookOpen,
  GraduationCap,
  Crown,
} from "lucide-react";

const roles = [
  {
    icon: Crown,
    role: "Super Admin",
    scope: "Platform Owner",
    description:
      "Onboard new universities, manage subscription plans, and oversee the entire platform from a single control center.",
    accent: "#d4a843",
  },
  {
    icon: Building2,
    role: "Registrar / Admin",
    scope: "University Management",
    description:
      "Register students, configure fee structures, manage departments and staff, and monitor institution-wide collection in real-time.",
    accent: "#2563eb",
  },
  {
    icon: Eye,
    role: "Vice Chancellor",
    scope: "Executive Oversight",
    description:
      "View live financial summaries, department comparisons, and collection trends — all read-only, always up to date.",
    accent: "#059669",
  },
  {
    icon: BookOpen,
    role: "Head of Department",
    scope: "Department View",
    description:
      "Track your department's student enrollments, fee statuses, and collection rates without seeing other departments' data.",
    accent: "#dc6b20",
  },
  {
    icon: GraduationCap,
    role: "Student",
    scope: "Self-Service Portal",
    description:
      "View assigned fees, pay online with one click, download digital receipts, and access complete payment history.",
    accent: "#7c3aed",
  },
];

export default function RolesSection() {
  return (
    <section id="roles" className="relative py-28 md:py-40 bg-[#fafafa] overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 lg:px-10">
        <FadeIn className="text-center max-w-[620px] mx-auto mb-20">
          <p className="text-[11px] text-[#d4a843] font-semibold uppercase tracking-[0.2em] mb-4">
            Who It&apos;s For
          </p>
          <h2 className="text-[2rem] md:text-[2.75rem] font-bold tracking-[-0.035em] leading-[1.1] text-[#0a0a0a] mb-5">
            One platform, every stakeholder.
          </h2>
          <p className="text-[16px] text-[#737373] leading-[1.7]">
            Each role sees exactly what they need — data access is enforced
            at every level, not just hidden in the interface.
          </p>
        </FadeIn>

        {/* Roles grid — 2 top, 3 bottom for asymmetry */}
        <div className="max-w-[900px] mx-auto space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {roles.slice(0, 2).map((role, i) => (
              <RoleCard key={role.role} role={role} index={i} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {roles.slice(2).map((role, i) => (
              <RoleCard key={role.role} role={role} index={i + 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoleCard({
  role,
  index,
}: {
  role: (typeof roles)[number];
  index: number;
}) {
  const Icon = role.icon;
  return (
    <FadeIn delay={index * 0.07}>
      <div className="group rounded-[20px] border border-black/[0.04] bg-white p-7 hover:border-black/[0.08] hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-300 h-full">
        <div className="flex items-center gap-3.5 mb-4">
          <div
            className="w-10 h-10 rounded-[12px] flex items-center justify-center"
            style={{
              background: `${role.accent}0a`,
              border: `1px solid ${role.accent}14`,
            }}
          >
            <Icon
              className="w-[18px] h-[18px]"
              style={{ color: role.accent }}
              strokeWidth={1.5}
            />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#0a0a0a] tracking-[-0.01em]">
              {role.role}
            </h3>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.1em]"
              style={{ color: `${role.accent}aa` }}
            >
              {role.scope}
            </p>
          </div>
        </div>
        <p className="text-[13px] text-[#737373] leading-[1.7]">
          {role.description}
        </p>
      </div>
    </FadeIn>
  );
}
