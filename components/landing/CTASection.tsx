import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "./FadeIn";

export default function CTASection() {
  return (
    <section className="relative py-28 md:py-40 bg-[#0a0a0a] overflow-hidden">
      {/* Noise texture */}
      <div className="noise-overlay pointer-events-none" />

      {/* Ambient gold glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(212,168,67,0.06) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 max-w-[700px] mx-auto px-6 lg:px-10 text-center">
        <FadeIn>
          <h2 className="text-[2rem] md:text-[2.75rem] font-bold tracking-[-0.035em] leading-[1.1] text-white mb-5">
            Ready to replace paper
            <br />
            with precision?
          </h2>
          <p className="text-[16px] text-[#a3a3a3] leading-[1.7] max-w-[480px] mx-auto mb-10">
            Start automating your institution&apos;s registration and fee
            collection today. Setup takes minutes, not months.
          </p>
          <Link
            href="/login"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#d4a843] text-[#0a0a0a] text-[15px] font-semibold
              hover:bg-[#f5c542] transition-all duration-200 active:scale-[0.97]
              shadow-[0_0_32px_rgba(212,168,67,0.2)]"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4 opacity-70 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
