import Hero from "@/components/landing/hero";
import LogoStrip from "@/components/landing/logo-strip";
import Features from "@/components/landing/features";
import Workflow from "@/components/landing/workflow";
import Showcase from "@/components/landing/showcase";
import Stats from "@/components/landing/stats";
import Testimonials from "@/components/landing/testimonials";
import Pricing from "@/components/landing/pricing";
import FAQ from "@/components/landing/faq";
import FinalCTA from "@/components/landing/cta";
import Footer from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="lumina-theme min-h-screen bg-background text-foreground">
      <Hero />
      <LogoStrip />
      <Features />
      <Workflow />
      <Showcase />
      <Stats />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
