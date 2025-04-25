import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeatureSection from "@/components/FeatureSection";
import HowItWorks from "@/components/How-It-Works";
import TestimonialSection from "@/components/TestimonialSection";
import FAQSection from "@/components/FAQSection";
import BottomCTASection from "@/components/BottomCTASection";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100">
      {/* Header : Already implemented in layout.tsx*/}

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <FeatureSection />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <BottomCTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}