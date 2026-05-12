import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "./FadeIn";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center bg-[#fafafa] overflow-hidden">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Warm ambient glow behind content */}
      <div
        className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[900px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(212,168,67,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 lg:px-10 pt-32 pb-20 lg:pt-36 lg:pb-28">
        {/* Single column center layout */}
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-black/[0.06] bg-white/70 backdrop-blur-sm mb-8 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#059669] opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669]" />
              </span>
              <span className="text-[12px] text-[#525252] font-medium tracking-wide">
                Trusted by university administrators
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="text-[2.75rem] md:text-[3.5rem] lg:text-[4.25rem] font-bold tracking-[-0.04em] leading-[1.05] text-[#0a0a0a] mb-6">
              University registration
              <br />
              & fee collection,{" "}
              <span className="text-gold-gradient">automated.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="text-[17px] md:text-[19px] text-[#737373] leading-[1.65] max-w-[560px] mx-auto mb-10">
              Replace paper vouchers and spreadsheet chaos with real-time
              dashboards, instant digital receipts, and live analytics for
              your entire institution.
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/login"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0a0a0a] text-white text-[14px] font-semibold
                  hover:bg-[#171717] transition-all duration-200 active:scale-[0.97]
                  shadow-[0_1px_3px_rgba(0,0,0,0.1),0_6px_24px_rgba(0,0,0,0.08)]"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 opacity-60 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-black/[0.08] text-[#0a0a0a] text-[14px] font-medium
                  bg-white/60 backdrop-blur-sm hover:bg-white hover:border-black/[0.12] transition-all duration-200"
              >
                See How It Works
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Product screenshot */}
        <FadeIn delay={0.35} className="mt-16 lg:mt-20">
          <div className="relative mx-auto max-w-[1000px]">
            {/* Glow behind image */}
            <div
              className="absolute -inset-8 rounded-[32px] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(212,168,67,0.06) 0%, transparent 60%)",
              }}
            />
            <div className="relative rounded-[20px] overflow-hidden border border-black/[0.06] shadow-[0_24px_80px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.03)] bg-white">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 bg-[#fafafa] px-5 py-3.5 border-b border-black/[0.04]">
                <div className="flex gap-[6px]">
                  <div className="w-[10px] h-[10px] rounded-full bg-black/[0.06]" />
                  <div className="w-[10px] h-[10px] rounded-full bg-black/[0.06]" />
                  <div className="w-[10px] h-[10px] rounded-full bg-black/[0.06]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white rounded-lg px-5 py-1.5 text-[11px] text-[#a3a3a3] border border-black/[0.04] min-w-[220px] text-center tracking-wide">
                    app.unisync.io/admin
                  </div>
                </div>
              </div>
              {/* Dashboard image */}
              <Image
                src="/dashboard-preview.png"
                alt="UniSync Admin Dashboard showing real-time student registration and fee collection analytics"
                width={1000}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* Floating badges */}
            <div className="absolute -left-4 top-[40%] bg-white rounded-2xl px-4 py-2.5 border border-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.06)] hidden lg:flex items-center gap-2.5 animate-float">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#059669] opacity-50" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#059669]" />
              </span>
              <span className="text-[11px] font-medium text-[#0a0a0a]">
                Dashboards update live
              </span>
            </div>

            <div className="absolute -right-4 top-[55%] bg-white rounded-2xl px-4 py-2.5 border border-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.06)] hidden lg:flex items-center gap-2.5 animate-float" style={{ animationDelay: "1.5s" }}>
              <span className="w-2.5 h-2.5 rounded-full bg-[#d4a843]" />
              <span className="text-[11px] font-medium text-[#0a0a0a]">
                Role-based access control
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
