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
  "@type": "LocalBusiness",
  name: "Dang Pest Control",
  "@id": "https://dangpestcontrol.com",
  url: "https://dangpestcontrol.com",
  telephone: "+19038710550",
  image: "https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Dang-Logo.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tyler",
    addressRegion: "TX",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 32.3513, longitude: -95.3011 },
  priceRange: "$$",
  areaServed: [
    { "@type": "City", name: "Tyler, TX" },
    { "@type": "City", name: "Longview, TX" },
    { "@type": "City", name: "Jacksonville, TX" },
    { "@type": "City", name: "Lindale, TX" },
    { "@type": "City", name: "Bullard, TX" },
    { "@type": "City", name: "Whitehouse, TX" },
  ],
  sameAs: [],
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
