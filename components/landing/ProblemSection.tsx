import { FadeIn } from "./FadeIn";
import { FileX2, Clock, AlertTriangle, TrendingDown } from "lucide-react";
import GlowCard from "./GlowCard";

const painPoints = [
  {
    icon: FileX2,
    title: "Paper vouchers disappear",
    description:
      "Students pay at the bank, carry a stamped voucher, hand it to a teacher. One misplaced slip means hours of manual reconciliation.",
  },
  {
    icon: Clock,
    title: "Staff waste hours verifying",
    description:
      "Department staff manually cross-check each voucher against bank records. Every semester, this eats into actual teaching time.",
  },
  {
    icon: AlertTriangle,
    title: "Spreadsheets breed errors",
    description:
      "Admins re-enter payment data by hand. Duplicates, typos, and missing entries compound until audit season reveals the chaos.",
  },
  {
    icon: TrendingDown,
    title: "Leadership flies blind",
    description:
      "The Vice Chancellor receives monthly reports that are already outdated. There is no way to know real-time collection status.",
  },
];

export default function ProblemSection() {
  return (
    <section
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #07090f 0%, #05080f 100%)" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.18) 50%, transparent)" }} />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 lg:px-10">
        <FadeIn className="max-w-[620px] mx-auto text-center mb-20">
          <p className="text-[11px] text-[#d4a843] font-bold uppercase tracking-[0.22em] mb-4">
            The Problem
          </p>
          <h2 className="text-[2rem] md:text-[2.75rem] font-bold tracking-[-0.035em] leading-[1.1] text-white mb-5">
            Manual fee collection is costing your institution more than you
            realize.
          </h2>
          <p className="text-[16px] text-white/45 leading-[1.7]">
            Every semester, the same cycle repeats — and every step is a chance
            for delay, error, or lost revenue.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px] mx-auto">
          {painPoints.map((point, i) => {
            const Icon = point.icon;
            return (
              <FadeIn key={point.title} delay={i * 0.08}>
                <div
                  className="h-full rounded-[20px] p-8 border border-white/[0.06] transition-all duration-300 hover:border-white/[0.1]"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  <div className="w-11 h-11 rounded-[14px] bg-[#3f1010]/60 border border-[#f43f5e]/20 flex items-center justify-center mb-5">
                    <Icon className="w-[18px] h-[18px] text-[#f43f5e]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[15px] font-semibold text-white tracking-[-0.01em] mb-2">
                    {point.title}
                  </h3>
                  <p className="text-[13px] text-white/40 leading-[1.75]">
                    {point.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
