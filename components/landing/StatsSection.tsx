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
    <section className="py-20 md:py-24 bg-[#fafafa] border-y border-black/[0.04]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0">
          {metrics.map((metric, i) => (
            <FadeIn key={metric.label} delay={i * 0.06}>
              <div
                className={`text-center px-4 ${
                  i > 0 ? "lg:border-l lg:border-black/[0.04]" : ""
                }`}
              >
                <p className="text-[2.5rem] md:text-[3.25rem] font-bold text-[#0a0a0a] tracking-[-0.04em] font-mono leading-none mb-2">
                  <AnimatedCounter
                    target={metric.value}
                    suffix={metric.suffix}
                    decimals={metric.decimals || 0}
                  />
                </p>
                <p className="text-[13px] text-[#737373] font-medium">
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
