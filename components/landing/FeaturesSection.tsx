"use client";

import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
  IconChartBar,
  IconLock,
} from "@tabler/icons-react";
import { FadeIn } from "./FadeIn";

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 md:py-40 bg-black overflow-hidden border-t border-white/[0.05]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <FadeIn className="text-center max-w-[620px] mx-auto mb-20">
          <p className="text-[11px] text-[#d4a843] font-bold uppercase tracking-[0.22em] mb-4">
            Platform Capabilities
          </p>
          <h2 className="text-[2.25rem] md:text-[3rem] font-bold tracking-tight leading-[1.1] text-white mb-5">
            Everything you need, nothing you don't.
          </h2>
          <p className="text-[17px] text-white/50 leading-relaxed">
            Built from the ground up for modern institutions. Ditch the legacy systems and 
            experience the power of real-time financial synchronization.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <BentoGrid className="max-w-6xl mx-auto">
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
                className={i === 3 || i === 6 ? "md:col-span-2" : ""}
              />
            ))}
          </BentoGrid>
        </FadeIn>
      </div>
    </section>
  );
}

const Skeleton = ({ gradient }: { gradient: string }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl relative overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`} />
    <div className="absolute inset-0 bg-grid-white/[0.02]" />
    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
  </div>
);

const items = [
  {
    title: "Instant Reconciliation",
    description: "Payments are synced across all dashboards the second they happen.",
    header: <Skeleton gradient="from-[#d4a843] to-[#f5c542]" />,
    icon: <IconClipboardCopy className="h-5 w-5 text-[#d4a843]" />,
  },
  {
    title: "Multi-Tenant Architecture",
    description: "Deploy for multiple campuses with strict data isolation.",
    header: <Skeleton gradient="from-[#2563eb] to-[#3b82f6]" />,
    icon: <IconFileBroken className="h-5 w-5 text-[#3b82f6]" />,
  },
  {
    title: "Granular RBAC",
    description: "VCs, Registrars, and HODs only see exactly what they should.",
    header: <Skeleton gradient="from-[#059669] to-[#10b981]" />,
    icon: <IconLock className="h-5 w-5 text-[#10b981]" />,
  },
  {
    title: "Real-time Analytics Engine",
    description:
      "Stop waiting for month-end reports. Instantly track collection velocity, identify defaulters, and project revenue via interactive visualizations.",
    header: <Skeleton gradient="from-[#8b5cf6] to-[#a855f7]" />,
    icon: <IconChartBar className="h-5 w-5 text-[#a855f7]" />,
  },
  {
    title: "Automated Workflows",
    description: "Say goodbye to manual data entry.",
    header: <Skeleton gradient="from-[#ec4899] to-[#f472b6]" />,
    icon: <IconTableColumn className="h-5 w-5 text-[#f472b6]" />,
  },
  {
    title: "Digital Receipts",
    description: "Tamper-proof receipts generated automatically.",
    header: <Skeleton gradient="from-[#eab308] to-[#facc15]" />,
    icon: <IconSignature className="h-5 w-5 text-[#facc15]" />,
  },
];
