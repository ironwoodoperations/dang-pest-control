import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";

const cities = [
  { name: "Tyler", slug: null },
  { name: "Longview", slug: "longview-tx" },
  { name: "Lindale", slug: "lindale-tx" },
  { name: "Bullard", slug: "bullard-tx" },
  { name: "Whitehouse", slug: "whitehouse-tx" },
  { name: "Jacksonville", slug: "jacksonville-tx" },
  { name: "Arp", slug: null },
  { name: "Ben Wheeler", slug: null },
  { name: "Brownsboro", slug: null },
  { name: "Athens", slug: null },
  { name: "Canton", slug: null },
  { name: "Chandler", slug: null },
  { name: "Chappell Hill", slug: null },
  { name: "Edom", slug: null },
  { name: "Flint", slug: null },
  { name: "Gilmer", slug: null },
  { name: "Gladewater", slug: null },
  { name: "Hawkins", slug: null },
  { name: "Henderson", slug: null },
  { name: "Hideaway", slug: null },
  { name: "Holly Lake Ranch", slug: null },
  { name: "Kilgore", slug: null },
  { name: "Mineola", slug: null },
  { name: "Noonday", slug: null },
  { name: "Quitman", slug: null },
  { name: "Troup", slug: null },
  { name: "Van", slug: null },
  { name: "Winona", slug: null },
];

const ServiceAreaPage = () => (
  <div className="min-h-screen">
    <SEO
      title="Service Area | Dang Pest Control"
      description="Dang Pest Control serves Tyler, TX and surrounding East Texas cities including Longview, Lindale, Bullard, Whitehouse, Jacksonville and more."
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
            <div key={city.name} className="flex items-center gap-2 p-4 rounded-xl border border-border bg-card">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              {city.slug ? (
                <Link to={`/${city.slug}`} className="font-semibold hover:text-primary transition-colors">
                  {city.name}, TX
                </Link>
              ) : (
                <span className="font-semibold">{city.name}, TX</span>
              )}
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