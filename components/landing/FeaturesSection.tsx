import { FadeIn } from "./FadeIn";
import { Zap, ShieldCheck, BarChart3, Globe } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Payment Verification",
    description:
      "The moment a student pays, every dashboard in your institution updates. No manual checking, no waiting for bank confirmations.",
    accent: "#d4a843",
  },
  {
    icon: ShieldCheck,
    title: "Complete Data Isolation",
    description:
      "Each university operates in its own secure space. Student records, fee data, and financial reports never cross institutional boundaries.",
    accent: "#059669",
  },
  {
    icon: BarChart3,
    title: "Intelligent Analytics",
    description:
      "Collection rates, department comparisons, semester trends, and overdue tracking — presented in dashboards that leadership actually wants to use.",
    accent: "#2563eb",
  },
  {
    icon: Globe,
    title: "Multi-University Ready",
    description:
      "Designed from day one to support multiple institutions on a single platform. Add a new university in minutes, not months.",
    accent: "#d4a843",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 md:py-40 bg-[#fafafa] overflow-hidden">
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
            Why UniSync
          </p>
          <h2 className="text-[2rem] md:text-[2.75rem] font-bold tracking-[-0.035em] leading-[1.1] text-[#0a0a0a] mb-5">
            Built for how universities actually work.
          </h2>
          <p className="text-[16px] text-[#737373] leading-[1.7]">
            Not another generic tool reshaped for education. UniSync was
            designed around real institutional workflows from the start.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[900px] mx-auto">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <FadeIn key={feature.title} delay={i * 0.08}>
                <div className="group rounded-[20px] border border-black/[0.04] bg-white p-8 hover:border-black/[0.08] hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-300">
                  <div
                    className="w-11 h-11 rounded-[14px] flex items-center justify-center mb-5"
                    style={{
                      background: `${feature.accent}0c`,
                      border: `1px solid ${feature.accent}14`,
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: feature.accent }}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#0a0a0a] tracking-[-0.01em] mb-2.5">
                    {feature.title}
                  </h3>
                  <p className="text-[14px] text-[#737373] leading-[1.7]">
                    {feature.description}
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
