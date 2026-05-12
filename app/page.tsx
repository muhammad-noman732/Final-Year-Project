import StickyNav from "@/components/landing/StickyNav";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import ProblemSection from "@/components/landing/ProblemSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import SolutionSection from "@/components/landing/SolutionSection";
import RolesSection from "@/components/landing/RolesSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "UniSync | University Registration & Fee Management — Automated",
  description:
    "Replace paper vouchers and spreadsheets with real-time registration, instant payment processing, and intelligent dashboards for your entire institution.",
};

export default function LandingPage() {
  return (
    <main className="bg-[#FAFAF8] min-h-[100dvh]">
      <StickyNav />
      <HeroSection />
      <StatsSection />
      <ProblemSection />
      <FeaturesSection />
      <SolutionSection />
      <RolesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
