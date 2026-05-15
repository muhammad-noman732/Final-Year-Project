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
    <section
      id="how-it-works"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #05080f 0%, #07090f 100%)" }}
    >
      {}
      <div
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
      {}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.2) 50%, transparent)" }} />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 lg:px-10">
        <FadeIn className="text-center max-w-[620px] mx-auto mb-20">
          <p className="text-[11px] text-[#d4a843] font-bold uppercase tracking-[0.22em] mb-4">
            How It Works
          </p>
          <h2 className="text-[2rem] md:text-[2.75rem] font-bold tracking-[-0.035em] leading-[1.1] text-white mb-5">
            Four steps to a fully digital institution.
          </h2>
          <p className="text-[16px] text-white/45 leading-[1.7]">
            The entire lifecycle — from onboarding your university to real-time
            financial reporting — fully automated.
          </p>
        </FadeIn>

        {}
        <div className="max-w-[960px] mx-auto">

          {}
          <div className="hidden md:block relative mb-10">
            <div
              className="absolute top-5 left-[calc(12.5%+5px)] right-[calc(12.5%+5px)] h-[2px] animate-dash-travel"
              style={{
                background:
                  "repeating-linear-gradient(90deg, rgba(212,168,67,0.5) 0, rgba(212,168,67,0.5) 6px, transparent 6px, transparent 14px)",
              }}
            />
            <div className="grid grid-cols-4 gap-6">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <FadeIn key={step.number} delay={i * 0.1}>
                    <div className="flex flex-col items-center text-center">
                      {}
                      <div
                        className="relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center mb-6"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          borderColor: `${step.accent}50`,
                          boxShadow: `0 0 0 4px ${step.accent}12`,
                        }}
                      >
                        <span
                          className="text-[11px] font-bold font-mono"
                          style={{ color: step.accent }}
                        >
                          {step.number}
                        </span>
                      </div>

                      {}
                      <div
                        className="w-12 h-12 rounded-[16px] flex items-center justify-center mb-4"
                        style={{
                          background: `${step.accent}12`,
                          border: `1px solid ${step.accent}25`,
                        }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: step.accent }}
                          strokeWidth={1.5}
                        />
                      </div>

                      <h3 className="text-[14px] font-semibold text-white tracking-[-0.01em] mb-2 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-[12px] text-white/40 leading-[1.7]">
                        {step.description}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>

          {}
          <div className="md:hidden space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeIn key={step.number} delay={i * 0.08}>
                  <div className="flex gap-5">
                    {}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 bg-white"
                        style={{
                          borderColor: `${step.accent}50`,
                          boxShadow: `0 0 0 4px ${step.accent}10`,
                        }}
                      >
                        <span
                          className="text-[11px] font-bold font-mono"
                          style={{ color: step.accent }}
                        >
                          {step.number}
                        </span>
                      </div>
                      {i < steps.length - 1 && (
                        <div className="stepper-vline flex-1 mt-2 min-h-[60px]" />
                      )}
                    </div>

                    {}
                    <div className="pb-10">
                      <div
                        className="w-11 h-11 rounded-[14px] flex items-center justify-center mb-3"
                        style={{
                          background: `${step.accent}10`,
                          border: `1px solid ${step.accent}22`,
                        }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: step.accent }}
                          strokeWidth={1.5}
                        />
                      </div>
                      <h3 className="text-[15px] font-semibold text-white tracking-[-0.01em] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[13px] text-white/40 leading-[1.75]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
