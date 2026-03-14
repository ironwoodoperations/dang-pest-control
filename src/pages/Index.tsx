import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HolidayBanner from "@/components/HolidayBanner";
import FeatureStrip from "@/components/FeatureStrip";
import ServicesSection from "@/components/ServicesSection";
import ExpertSection from "@/components/ExpertSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "PestControlService",
  name: "Dang Pest Control",
  telephone: "+19038710550",
  url: "https://dangpestcontrol.com",
  areaServed: {
    "@type": "City",
    name: "Tyler",
    addressRegion: "TX",
  },
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tyler",
    addressRegion: "TX",
  },
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Tyler, TX Pest Control Services"
        description="Family-owned pest control in Tyler, TX. Expert termite, rodent, mosquito & general pest control with a Super Powered Guarantee. Call (903) 871-0550."
        canonical="/"
        jsonLd={localBusinessJsonLd}
      />
      <HolidayBanner />
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
