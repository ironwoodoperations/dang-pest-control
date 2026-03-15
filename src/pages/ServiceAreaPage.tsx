import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";

const cities = [
  "Tyler", "Longview", "Lindale", "Flint", "Bullard",
  "Whitehouse", "Hideaway", "Chandler", "Mineola", "Canton",
  "Jacksonville", "Henderson", "Kilgore", "Gladewater", "Marshall"
];

const ServiceAreaPage = () => (
  <div className="min-h-screen">
    <SEO
      title="Service Area | Dang Pest Control"
      description="Dang Pest Control serves Tyler, TX and surrounding East Texas cities. Check if we service your area."
      canonical="/service-area"
    />
    <Navbar />

    <section className="hero-bg text-primary-foreground py-20 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-comic text-4xl md:text-6xl mb-4">Service Area</h1>
        <p className="text-lg opacity-90">Proudly serving Tyler and all of East Texas.</p>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-comic text-3xl mb-8 text-center">Cities We Serve</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {cities.map((city) => (
            <div key={city} className="flex items-center gap-2 p-4 rounded-xl border border-border bg-card">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="font-semibold">{city}, TX</span>
            </div>
          ))}
        </div>

        <div className="text-center bg-muted rounded-2xl p-8">
          <h3 className="text-comic text-2xl mb-3">Don't See Your City?</h3>
          <p className="text-muted-foreground mb-6">Give us a call — we may still be able to help.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:9038710550" className="btn-cta">
              <Phone className="w-5 h-5 mr-2" /> (903) 871-0550
            </a>
            <Link to="/quote" className="btn-cta-outline !border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground">
              Get Your Quote
            </Link>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default ServiceAreaPage;