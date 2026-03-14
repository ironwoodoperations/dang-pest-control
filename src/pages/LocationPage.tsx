import { useParams, Link } from "react-router-dom";
import { Phone, Shield, Heart, Award, Users, Settings } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const locationsData: Record<string, { city: string; intro: string; localNote: string; mapQuery: string }> = {
  "longview-tx": {
    city: "Longview",
    intro: "Your home should feel like a safe haven—but pests make that hard to achieve. At Dang Pest Control, we offer expert pest control solutions tailored to your needs, ensuring health, comfort, and the protection of your loved ones. Serving Longview, TX, and surrounding areas, our family-owned, local business is committed to making your life easier with services you can trust.",
    localNote: "The environment in Longview provides the perfect conditions for pests like termites, rodents, and mosquitos to thrive. Protecting your property from these nuisances means maintaining your family's comfort and health.",
    mapQuery: "Longview,TX",
  },
  "jacksonville-tx": {
    city: "Jacksonville",
    intro: "Pests are a common challenge for homeowners in Jacksonville, TX. At Dang Pest Control, we provide comprehensive pest management solutions designed for the unique conditions of East Texas. Our family-owned team delivers reliable, professional service you can count on.",
    localNote: "Jacksonville's warm, humid climate makes it a hotspot for a variety of pests. Our tailored treatment plans address the specific pest pressures in your area.",
    mapQuery: "Jacksonville,TX",
  },
  "lindale-tx": {
    city: "Lindale",
    intro: "Keep your Lindale home pest-free with professional pest control services from Dang Pest Control. We serve Lindale and surrounding communities with customized solutions that eliminate pests and prevent their return.",
    localNote: "Lindale's residential communities deserve the best in pest protection. We provide targeted treatments that address the local pest challenges unique to your neighborhood.",
    mapQuery: "Lindale,TX",
  },
  "bullard-tx": {
    city: "Bullard",
    intro: "Bullard homeowners trust Dang Pest Control for dependable, thorough pest management. Our licensed technicians deliver personalized service that targets pests at their source.",
    localNote: "From wooded properties to lakeside homes, Bullard's diverse landscapes present unique pest challenges. Our team has the expertise to handle them all.",
    mapQuery: "Bullard,TX",
  },
  "whitehouse-tx": {
    city: "Whitehouse",
    intro: "Protect your Whitehouse home and family from unwanted pests. Dang Pest Control offers expert pest control services with a personal touch, ensuring your property stays safe and comfortable year-round.",
    localNote: "Whitehouse families deserve peace of mind when it comes to pest control. Our integrated approach provides long-term solutions tailored to your home's specific needs.",
    mapQuery: "Whitehouse,TX",
  },
};

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
  const location = slug ? locationsData[slug] : null;

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
          <h1 className="text-comic text-4xl md:text-5xl mb-4">Pest Control Services in {location.city}, TX</h1>
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

      {/* Local Note CTA */}
      <section className="section-dark text-primary-foreground py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-comic text-3xl md:text-4xl mb-4">Protect Your {location.city} Home</h2>
          <p className="opacity-90 mb-8 max-w-2xl mx-auto">{location.localNote}</p>
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
            {Object.entries(locationsData)
              .filter(([key]) => key !== slug)
              .map(([key, loc]) => (
                <Link key={key} to={`/${key}`} className="text-primary font-semibold hover:underline">
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
