import StickyNav from "@/components/landing/StickyNav";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";

import FeaturesSection from "@/components/landing/FeaturesSection";
import SolutionSection from "@/components/landing/SolutionSection";
import RolesSection from "@/components/landing/RolesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "UniSync | University Registration & Fee Management — Automated",
  description:
    "Replace paper vouchers and spreadsheets with real-time registration, instant payment processing, and intelligent dashboards for your entire institution.",
};

export default function LandingPage() {
  return (
    <main className="bg-[#05080f] min-h-[100dvh] antialiased selection:bg-[#d4a843]/30">
      <StickyNav />
      <HeroSection />
      <StatsSection />

      <FeaturesSection />
      <SolutionSection />
      <RolesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
