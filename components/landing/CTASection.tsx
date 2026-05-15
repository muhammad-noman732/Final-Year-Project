"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "./FadeIn";
import { MagneticButton } from "@/components/ui/magnetic-button";

export default function CTASection() {
  return (
    <section
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #07090f 0%, #05080f 100%)" }}
    >
      {}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(212,168,67,0.16) 0%, transparent 70%)",
            filter: "blur(100px)",
            animation: "hero-orb-a 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(220,107,32,0.10) 0%, transparent 70%)",
            filter: "blur(90px)",
            animation: "hero-orb-b 22s ease-in-out infinite",
          }}
        />
        {}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.45) 1px, transparent 0)`,
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

      <div className="relative z-10 max-w-[700px] mx-auto px-6 lg:px-10 text-center">
        <FadeIn>
          <p className="text-[11px] text-[#d4a843] font-bold uppercase tracking-[0.22em] mb-5">
            Get Started Today
          </p>

          <h2 className="text-[2rem] md:text-[2.75rem] font-bold tracking-[-0.035em] leading-[1.1] text-white mb-5">
            Ready to replace paper
            <br />
            with precision?
          </h2>
          <p className="text-[16px] text-white/45 leading-[1.7] max-w-[480px] mx-auto mb-10">
            Start automating your institution&apos;s registration and fee
            collection today. Setup takes minutes, not months.
          </p>

          <MagneticButton strength={0.5}>
            <Link
              href="/login"
              className="group inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-semibold text-[15px] text-[#0a0a0a] transition-all duration-300 active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, #f5c542 0%, #d4a843 50%, #c9952b 100%)",
                boxShadow: "0 0 0 1px rgba(212,168,67,0.3), 0 8px 32px rgba(212,168,67,0.3), 0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </MagneticButton>

          {}
          <p className="mt-6 text-[12px] text-white/25 font-medium">
            No credit card required · Set up in minutes · Cancel anytime
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
