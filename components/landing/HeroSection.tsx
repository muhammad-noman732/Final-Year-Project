"use client";

import Link from "next/link";
import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { FadeIn } from "./FadeIn";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-[#05080f] overflow-hidden">
      {/* ── Background effects ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(212,168,67,0.1) 0%, transparent 60%)",
            filter: "blur(100px)",
            animation: "hero-orb-a 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 60%)",
            filter: "blur(120px)",
            animation: "hero-orb-b 24s ease-in-out infinite",
          }}
        />
      </div>

      <HeroHighlight containerClassName="h-auto bg-transparent items-start pt-20 md:pt-28 pb-0">
        <div className="flex flex-col items-center">
          <ContainerScroll
            titleComponent={
              <div className="flex flex-col items-center mb-12">
                <FadeIn>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] backdrop-blur-md mb-8 shadow-2xl">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4a843] opacity-60" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4a843]" />
                    </span>
                    <span className="text-[12px] text-white/70 font-medium tracking-wide">
                      UniSync 2.0 is now live
                    </span>
                  </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl tracking-tight leading-[1.1]">
                    University fee management,{" "}
                    <br className="hidden md:block" />
                    <Highlight className="text-black dark:text-white">
                      engineered for scale.
                    </Highlight>
                  </h1>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <p className="mt-8 text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
                    A financial operating system built exclusively for higher education. 
                    Replace manual ledgers and chaotic spreadsheets with real-time sync, automated workflows, and crystal-clear analytics.
                  </p>
                </FadeIn>

                <FadeIn delay={0.3} className="mt-10">
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <MagneticButton strength={0.4}>
                      <Link
                        href="/login"
                        className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-[15px] text-[#0a0a0a] transition-all duration-300 active:scale-[0.97]"
                        style={{
                          background: "linear-gradient(135deg, #f5c542 0%, #d4a843 50%, #c9952b 100%)",
                          boxShadow: "0 0 0 1px rgba(212,168,67,0.3), 0 8px 32px rgba(212,168,67,0.25), 0 2px 8px rgba(0,0,0,0.3)",
                        }}
                      >
                        Start building
                        <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform duration-200" />
                      </Link>
                    </MagneticButton>
                  </div>
                </FadeIn>
              </div>
            }
          >
            <Image
              src="/dashboard-preview.png"
              alt="UniSync Admin Dashboard Mockup"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-cover h-full object-left-top"
              draggable={false}
            />
          </ContainerScroll>
        </div>
      </HeroHighlight>
    </section>
  );
}
