import { FadeIn } from "./FadeIn";
import { Building2, Users, CreditCard, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Building2,
    title: "Set up your university",
    description:
      "Create your institution in minutes. Configure departments, programs, academic sessions, and fee structures — all from one admin panel.",
    accent: "#d4a843",
  },
  {
    number: "02",
    icon: Users,
    title: "Register students & assign fees",
    description:
      "Bulk import students via CSV or register individually. Fees auto-assign based on program, semester, and session. No manual matching required.",
    accent: "#2563eb",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Students pay online — instantly verified",
    description:
      "Students log in, see their assigned fees, and pay with one click. Digital receipts generate automatically. Zero manual verification needed.",
    accent: "#059669",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Everyone sees results live",
    description:
      "From the Registrar to the Vice Chancellor, every dashboard updates the moment a payment completes. Collection rates, department breakdowns — always current.",
    accent: "#d4a843",
  },
];

export default function SolutionSection() {
  return (
    <section id="how-it-works" className="relative py-28 md:py-40 bg-[#0a0a0a] overflow-hidden">
      {/* Noise texture */}
      <div className="noise-overlay pointer-events-none" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 lg:px-10">
        <FadeIn className="text-center max-w-[620px] mx-auto mb-20">
          <p className="text-[11px] text-[#d4a843] font-semibold uppercase tracking-[0.2em] mb-4">
            How It Works
          </p>
          <h2 className="text-[2rem] md:text-[2.75rem] font-bold tracking-[-0.035em] leading-[1.1] text-white mb-5">
            Four steps to a fully digital institution.
          </h2>
          <p className="text-[16px] text-[#a3a3a3] leading-[1.7]">
            The entire lifecycle — from onboarding your university to
            real-time financial reporting — fully automated.
          </p>
        </FadeIn>

        {/* Steps grid */}
        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <FadeIn key={step.number} delay={i * 0.1}>
                <div className="group relative rounded-[20px] border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-8 hover:border-white/[0.10] hover:bg-white/[0.04] transition-all duration-300">
                  {/* Step number */}
                  <span className="text-[11px] font-bold font-mono tracking-[0.15em] text-[#525252] uppercase mb-4 block">
                    Step {step.number}
                  </span>

                  <div
                    className="w-11 h-11 rounded-[14px] flex items-center justify-center mb-5"
                    style={{
                      background: `${step.accent}12`,
                      border: `1px solid ${step.accent}20`,
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: step.accent }}
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3 className="text-[16px] font-semibold text-white tracking-[-0.01em] mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-[#a3a3a3] leading-[1.7]">
                    {step.description}
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
