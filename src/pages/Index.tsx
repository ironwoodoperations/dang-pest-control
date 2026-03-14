import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureStrip from "@/components/FeatureStrip";
import ServicesSection from "@/components/ServicesSection";
import ExpertSection from "@/components/ExpertSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useHolidayMode } from "@/hooks/useHolidayMode";
import { useEffect } from "react";

const Index = () => {
  const holidayMode = useHolidayMode();

  useEffect(() => {
    if (holidayMode) {
      document.documentElement.classList.add("holiday");
    } else {
      document.documentElement.classList.remove("holiday");
    }
    return () => document.documentElement.classList.remove("holiday");
  }, [holidayMode]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeatureStrip />
      <ServicesSection />
      <ExpertSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
