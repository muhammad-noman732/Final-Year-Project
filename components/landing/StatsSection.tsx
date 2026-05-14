import { FadeIn } from "./FadeIn";
import AnimatedCounter from "./AnimatedCounter";

const metrics = [
  { value: 12847, suffix: "+", label: "Students Registered" },
  { value: 94.7, suffix: "%", decimals: 1, label: "Collection Rate" },
  { value: 3, suffix: "x", label: "Faster Than Manual" },
  { value: 0, suffix: "", label: "Paper Vouchers" },
];

export default function StatsSection() {
  return (
    <section
      className="relative py-16 md:py-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #05080f 0%, #07090f 100%)", borderTop: "1px solid rgba(212,168,67,0.12)", borderBottom: "1px solid rgba(212,168,67,0.12)" }}
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-y-0">
          {metrics.map((metric, i) => (
            <FadeIn key={metric.label} delay={i * 0.06}>
              <div
                className={`text-center px-4 ${
                  i > 0 ? "lg:border-l lg:border-white/[0.05]" : ""
                }`}
              >
                <p className="text-[2.5rem] md:text-[3.25rem] font-bold tracking-[-0.04em] font-mono leading-none mb-2"
                  style={{ background: "linear-gradient(135deg, #f5c542, #d4a843)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                >
                  <AnimatedCounter
                    target={metric.value}
                    suffix={metric.suffix}
                    decimals={metric.decimals || 0}
                  />
                </p>
                <p className="text-[13px] text-white/35 font-medium">
                  {metric.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
