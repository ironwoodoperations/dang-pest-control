import { useParams, Link } from "react-router-dom";
import { Phone, Shield, Heart, Award, Users, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";

interface LocationData {
  slug: string;
  city: string;
  hero_title: string;
  intro: string;
  local_pest_description: string;
  map_embed_url: string;
  local_testimonial_quote: string;
}

const servicesList = [
  { name: "General Pest Control", slug: "pest-control", description: "Protect your home from ants, spiders, roaches, and other common pests." },
  { name: "Mosquito Control", slug: "mosquito-control", description: "Proven methods to reduce mosquito populations so you can enjoy your yard." },
  { name: "Termite Inspections & Control", slug: "termite-inspections", description: "Thorough inspections and effective treatments to protect your home's structure." },
  { name: "Bed Bug Control", slug: "bed-bug-control", description: "Expert elimination of bed bugs from your home quickly and effectively." },
  { name: "Rodent Control", slug: "rodent-control", description: "Remove mice and rats and prevent them from coming back." },
  { name: "Flea & Tick Control", slug: "flea-tick-control", description: "Tailored solutions for fleas, ticks, wasps, hornets, and scorpions." },
  { name: "Snake Control", slug: "snake-control", description: "Professional snake identification, removal, and prevention for venomous and non-venomous species." },
];

const whyChoose = [
  { icon: Users, title: "Family-Owned & Trusted Locally", description: "We're not a big corporation—we're a family-owned business that cares deeply about the well-being of our neighbors." },
  { icon: Shield, title: "Licensed & Highly Trained", description: "Our team of certified, insured technicians uses expertise and cutting-edge methods to resolve pest issues effectively." },
  { icon: Heart, title: "Pet & Child Friendly", description: "Your family is our top priority. We use products designed to be safe while effectively eliminating pests." },
  { icon: Settings, title: "Custom Treatment Plans", description: "We develop tailored solutions to not only eradicate pests but also prevent their return." },
  { icon: Award, title: "Super Powered Guarantee", description: "Pests persist? No problem. We provide free re-treatments between regularly scheduled visits." },
  { icon: Users, title: "Referral Program", description: "Get rewarded for your loyalty! Earn a free month for each new customer you refer." },
];

const LocationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [location, setLocation] = useState<LocationData | null>(null);
  const [allLocations, setAllLocations] = useState<{ slug: string; city: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const [{ data: loc }, { data: all }] = await Promise.all([
        supabase.from("location_data").select("*").eq("slug", slug!).maybeSingle(),
        supabase.from("location_data").select("slug, city"),
      ]);
      if (loc) setLocation(loc as LocationData);
      if (all) setAllLocations(all as { slug: string; city: string }[]);
      setLoading(false);
    };
    if (slug) fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Navbar />
        <h1 className="text-comic text-4xl mb-4">Location Not Found</h1>
        <Link to="/" className="btn-cta">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO
        title={`Pest Control in ${location.city}, TX`}
        description={`Professional pest control services in ${location.city}, TX. Family-owned, licensed & insured. Call (903) 871-0550 for a free quote.`}
        canonical={`/${slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "PestControlService",
          name: `Dang Pest Control - ${location.city}`,
          telephone: "+19038710550",
          areaServed: { "@type": "City", name: location.city, addressRegion: "TX" },
        }}
      />
      <Navbar />

      <section className="hero-bg text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-comic text-4xl md:text-5xl mb-4">{location.hero_title}</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">{location.intro}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:9038710550" className="btn-cta-outline">
              <Phone className="w-5 h-5 mr-2" /> (903) 871-0550
            </a>
            <Link to="/quote" className="btn-cta">Get Your Quote</Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-comic text-3xl md:text-4xl text-center mb-4">Services We Offer in {location.city}</h2>
          <p className="text-center text-muted-foreground mb-12">
            Our comprehensive pest control services are designed to target the pests unique to the East Texas environment and prevent their return.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((service) => (
              <Link key={service.slug} to={`/${service.slug}`} className="card-service text-left">
                <h3 className="text-comic text-lg mb-2">{service.name}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/quote" className="btn-cta">Get Your Quote</Link>
          </div>
        </div>
      </section>

      {/* Service Area Map */}
      {location.map_embed_url && (
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-comic text-3xl md:text-4xl text-center mb-4">Our Service Area in {location.city}</h2>
            <p className="text-center text-muted-foreground mb-8">
              We proudly serve {location.city} and the surrounding East Texas communities.
            </p>
            <div className="rounded-xl overflow-hidden shadow-lg max-w-4xl mx-auto aspect-video">
              <iframe
                title={`Map of ${location.city}, TX service area`}
                src={location.map_embed_url}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="section-orange text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-comic text-3xl md:text-4xl text-center mb-12">Why Choose Dang Pest Control?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChoose.map((item) => (
              <div key={item.title} className="flex gap-4">
                <item.icon className="w-8 h-8 flex-shrink-0 text-secondary" />
                <div>
                  <h3 className="text-comic text-lg mb-2">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Pest Description CTA */}
      <section className="section-dark text-primary-foreground py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-comic text-3xl md:text-4xl mb-4">Protect Your {location.city} Home</h2>
          <p className="opacity-90 mb-8 max-w-2xl mx-auto">{location.local_pest_description}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:9038710550" className="btn-cta-outline">
              <Phone className="w-5 h-5 mr-2" /> (903) 871-0550
            </a>
            <Link to="/quote" className="btn-cta">Get Your Quote</Link>
          </div>
        </div>
      </section>

      {/* Other Locations */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-comic text-xl mb-4">We Also Serve</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {allLocations
              .filter((loc) => loc.slug !== slug)
              .map((loc) => (
                <Link key={loc.slug} to={`/${loc.slug}`} className="text-primary font-semibold hover:underline">
                  {loc.city}, TX
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LocationPage;
