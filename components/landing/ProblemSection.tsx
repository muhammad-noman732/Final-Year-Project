import { FadeIn } from "./FadeIn";
import { FileX2, Clock, AlertTriangle, TrendingDown } from "lucide-react";

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
    <section className="relative py-28 md:py-40 bg-[#0a0a0a] overflow-hidden">
      {/* Noise texture overlay */}
      <div className="noise-overlay pointer-events-none" />

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(212,168,67,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 lg:px-10">
        <FadeIn className="max-w-[620px] mx-auto text-center mb-20">
          <p className="text-[11px] text-[#d4a843] font-semibold uppercase tracking-[0.2em] mb-4">
            The Problem
          </p>
          <h2 className="text-[2rem] md:text-[2.75rem] font-bold tracking-[-0.035em] leading-[1.1] text-white mb-5">
            Manual fee collection is costing your institution more than you realize.
          </h2>
          <p className="text-[16px] text-[#a3a3a3] leading-[1.7]">
            Every semester, the same cycle repeats — and every step is a
            chance for delay, error, or lost revenue.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[900px] mx-auto">
          {painPoints.map((point, i) => {
            const Icon = point.icon;
            return (
              <FadeIn key={point.title} delay={i * 0.08}>
                <div className="group rounded-[20px] border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-7 hover:border-white/[0.10] hover:bg-white/[0.04] transition-all duration-300">
                  <div className="w-10 h-10 rounded-[12px] bg-[#dc2626]/10 border border-[#dc2626]/10 flex items-center justify-center mb-4">
                    <Icon className="w-[18px] h-[18px] text-[#f87171]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[15px] font-semibold text-white tracking-[-0.01em] mb-2">
                    {point.title}
                  </h3>
                  <p className="text-[13px] text-[#a3a3a3] leading-[1.7]">
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
