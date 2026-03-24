import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const cities = [
  "Tyler", "Longview", "Lindale", "Bullard", "Whitehouse", "Jacksonville",
  "Arp", "Ben Wheeler", "Brownsboro", "Athens", "Canton", "Chandler",
  "Chappell Hill", "Edom", "Flint", "Gilmer", "Gladewater", "Hawkins",
  "Henderson", "Hideaway", "Holly Lake Ranch", "Kilgore", "Mineola",
  "Noonday", "Quitman", "Troup", "Van", "Winona",
];

const ServiceAreaPage = () => {
  const [liveSlugs, setLiveSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    supabase
      .from("location_data")
      .select("slug")
      .eq("is_live", true)
      .then(({ data }) => {
        if (data) setLiveSlugs(new Set(data.map((r: { slug: string }) => r.slug)));
      });
  }, []);

  const cityToSlug = (city: string) =>
    city.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-tx";

  return (
  <div className="min-h-screen">
    <SEO
      title="Service Area | Dang Pest Control"
      description="Dang Pest Control serves Tyler, TX and surrounding East Texas cities including Longview, Lindale, Bullard, Whitehouse, Jacksonville and more."
      canonical="/service-area"
    />
    <Navbar />

    <section className="hero-bg text-white py-20 text-center relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h1 className="text-comic text-4xl md:text-6xl mb-4 text-white">Service Area</h1>
        <p className="text-lg text-white opacity-90 max-w-xl mx-auto">Proudly serving Tyler and all of East Texas.</p>
      </div>
    </section>

    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-comic text-3xl mb-8 text-center" style={{color: 'hsl(20, 40%, 12%)'}}>Cities We Serve</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {cities.map((city) => {
            const slug = cityToSlug(city);
            const isLive = liveSlugs.has(slug);
            return (
              <div key={city} className="flex items-center gap-2 p-4 rounded-xl border border-orange-100 bg-white hover:border-primary transition-colors">
                <MapPin className="w-4 h-4 flex-shrink-0" style={{color: 'hsl(var(--primary))'}} />
                {isLive ? (
                  <Link to={`/${slug}`} className="font-semibold hover:text-primary transition-colors" style={{color: 'hsl(20, 40%, 12%)'}}>
                    {city}, TX
                  </Link>
                ) : (
                  <span className="font-semibold" style={{color: 'hsl(20, 40%, 12%)'}}>{city}, TX</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center rounded-2xl p-8 mt-8" style={{background: 'hsl(30, 40%, 96%)'}}>
          <h3 className="text-comic text-2xl mb-3" style={{color: 'hsl(20, 40%, 12%)'}}>Don't See Your City?</h3>
          <p className="mb-6" style={{color: 'hsl(20, 20%, 35%)'}}>Give us a call — we may still be able to help.</p>
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
};

export default ServiceAreaPage;
