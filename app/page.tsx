import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSolutionSection from "@/components/sections/ProblemSolutionSection";
import WalkthroughSection from "@/components/sections/WalkthroughSection";
import DemoSection from "@/components/sections/DemoSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import BenchmarkSection from "@/components/sections/BenchmarkSection";
import DashboardSection from "@/components/sections/DashboardSection";
import UseCasesSection from "@/components/sections/UseCasesSection";
import CostComparisonSection from "@/components/sections/CostComparisonSection";
import QuickstartSection from "@/components/sections/QuickstartSection";
import FAQSection from "@/components/sections/FAQSection";
import LicenseSection from "@/components/sections/LicenseSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] overflow-x-hidden">
      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Problem vs Solution */}
        <ProblemSolutionSection />

        {/* 3. Official Video Walkthrough */}
        <WalkthroughSection />

        {/* 4. Live Audio Demo */}
        <DemoSection />


        {/* 4. Bento Grid Key Features */}
        <FeaturesSection />

        {/* 5. Interactive Architecture Diagram */}
        <HowItWorksSection />

        {/* 6. Latency Benchmark Breakdown */}
        <BenchmarkSection />

        {/* 7. Web Dashboard Showcase */}
        <DashboardSection />

        {/* 8. Real-world Use Cases */}
        <UseCasesSection />

        {/* 9. Honest Cost Comparison Table */}
        <CostComparisonSection />

        {/* 10. Quickstart Installer & Pairing Stepper */}
        <QuickstartSection />

        {/* 11. FAQ & Tuning Guide */}
        <FAQSection />

        {/* 12. BSL 1.1 License & Commercial Model */}
        <LicenseSection />

        {/* 13. Final CTA Band */}
        <CTASection />
      </main>

      {/* Comprehensive Site Footer */}
      <Footer />
    </div>
  );
}
