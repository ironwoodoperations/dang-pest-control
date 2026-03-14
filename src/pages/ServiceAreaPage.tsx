import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useSiteConfig } from "@/hooks/useSiteConfig";

const areas = [
  { name: "Tyler, TX", slug: null, description: "Our home base — serving Tyler and surrounding neighborhoods with full pest control services." },
  { name: "Longview, TX", slug: "longview-tx", description: "Comprehensive pest management for Longview homes and businesses." },
  { name: "Jacksonville, TX", slug: "jacksonville-tx", description: "Professional pest control tailored to Jacksonville's unique environment." },
  { name: "Lindale, TX", slug: "lindale-tx", description: "Keeping Lindale homes pest-free with customized treatment plans." },
  { name: "Bullard, TX", slug: "bullard-tx", description: "Expert pest solutions for Bullard's diverse residential properties." },
  { name: "Whitehouse, TX", slug: "whitehouse-tx", description: "Reliable pest protection for Whitehouse families year-round." },
];

const ServiceAreaPage = () => (
  <div className="min-h-screen">
    <SEO
      title="Service Area"
      description="Dang Pest Control serves Tyler, Longview, Jacksonville, Lindale, Bullard, Whitehouse, and surrounding East Texas communities."
      canonical="/service-area"
    />
    <Navbar />

    <section className="hero-bg text-primary-foreground py-20 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-comic text-4xl md:text-5xl mb-4">Our Service Area</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">Proudly serving East Texas communities with professional pest control.</p>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area) => (
            <div key={area.name} className="card-service text-left">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="text-comic text-lg">{area.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{area.description}</p>
              {area.slug && (
                <Link to={`/${area.slug}`} className="text-sm text-primary font-semibold hover:underline">
                  Learn more →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-dark text-primary-foreground py-16 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-comic text-3xl mb-4">Don't See Your Area?</h2>
        <p className="opacity-90 mb-8">We may still be able to help. Give us a call to find out.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="tel:9038710550" className="btn-cta-outline"><Phone className="w-5 h-5 mr-2" /> (903) 871-0550</a>
          <Link to="/quote" className="btn-cta">Get Your Quote</Link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default ServiceAreaPage;
