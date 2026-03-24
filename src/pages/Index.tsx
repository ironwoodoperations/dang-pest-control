import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HolidayBanner from "@/components/HolidayBanner";
import FeatureStrip from "@/components/FeatureStrip";
import MidPageVideo from "@/components/MidPageVideo";
import PestExterminationSection from "@/components/PestExterminationSection";
import ServicesSection from "@/components/ServicesSection";
import ExpertSection from "@/components/ExpertSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useSiteConfig } from "@/hooks/useSiteConfig";

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

const DEFAULT_TITLE = "Dang Pest Control - Professional Pest Services";
const DEFAULT_DESC = "Family-owned pest control in Tyler, TX. Expert termite, rodent, mosquito & general pest control with a Super Powered Guarantee. Call (903) 871-0550.";

const Index = () => {
  const { seoTitle, seoDescription, heroVideoUrl, heroVideoType, heroVideoStart, heroVideoEnd } = useSiteConfig();

  return (
    <div className="min-h-screen">
      <SEO
        title={seoTitle || DEFAULT_TITLE}
        description={seoDescription || DEFAULT_DESC}
        canonical="/"
        jsonLd={localBusinessJsonLd}
      />
      <HolidayBanner />
      <Navbar />
      <main>
      <HeroSection dynamicVideoUrl={heroVideoUrl} dynamicVideoType={heroVideoType} videoStart={heroVideoStart} videoEnd={heroVideoEnd} />
      <FeatureStrip />
      <ExpertSection />
      <ServicesSection />
      <WhyChooseUs />
      <MidPageVideo />
      <PestExterminationSection />
      <TestimonialsSection />
      <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
