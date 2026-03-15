import { Link } from "react-router-dom";
import { Phone, Users, Award, Shield, Heart, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import interiorService from "@/assets/interior-service.jpg";

const values = [
  {
    icon: Award,
    title: "Industry Leaders",
    description: "Proud members of the National Pest Management Association (NPMA) and Texas Pest Control Association (TPCA).",
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Our trained professionals use the latest Integrated Pest Management methods to protect your home or business.",
  },
  {
    icon: Heart,
    title: "Family & Pet Safe",
    description: "We prioritize your family and pets with environmentally responsible products and practices.",
  },
  {
    icon: Clock,
    title: "Fast Response Times",
    description: "Reliable service with fast communication and response when you need us most.",
  },
  {
    icon: Users,
    title: "Community Focused",
    description: "We're your neighbors. We live, work, and play in the Tyler community alongside you.",
  },
  {
    icon: Shield,
    title: "Super Powered Guarantee",
    description: "If our service doesn't deliver results, we'll treat it again for free. If still not satisfied, we'll refund your money!",
  },
];

const AboutPage = () => {
  const { seoTitle, seoDescription } = useSiteConfig("/about");
  return (
    <div className="min-h-screen">
      <SEO
        title={seoTitle || "About Us"}
        description={seoDescription || "Learn about Dang Pest Control — a family-owned, community-driven pest control company serving Tyler, TX for over 15 years."}
        canonical="/about"
      />

      <Navbar />
      <section className="hero-bg text-primary-foreground py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-comic text-4xl md:text-6xl mb-4">About Us</h1>
          <p className="text-lg opacity-90">Family-owned. Community-driven. Super powered pest control.</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-comic text-3xl md:text-4xl mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              We have been in the home services industry for over 15 years and love that our contribution to you is to bring peace and security to a place where you should feel the safest.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              At Dang Pest Control, we are a hands-on, personable, relationship-based, and family-owned company. We live, work, worship, and play in the Tyler community.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our innovative pest control practices help us stand out amongst our competitors. We promise fun, enjoyable interactions with clients while providing reliable and professional service every step of the way—from our fast communication practices to our extensive pest control plans. We stand by our work and guarantee satisfaction.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:9038710550" className="btn-cta-outline !border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground">
                <Phone className="w-5 h-5 mr-2" /> (903) 871-0550
              </a>
              <Link to="/quote" className="btn-cta">Get Your Quote</Link>
              <Link to="/service-area" className="btn-cta-outline !border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground">
                View Service Area
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <img src={interiorService} alt="Dang Pest Control Technician" className="w-full max-w-md rounded-2xl shadow-lg object-cover" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-orange text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-comic text-3xl md:text-4xl text-center mb-12">Expertise & Proven Results</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="flex gap-4">
                <value.icon className="w-8 h-8 flex-shrink-0 text-secondary" />
                <div>
                  <h3 className="text-comic text-lg mb-2">{value.title}</h3>
                  <p className="text-sm opacity-90">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark text-primary-foreground py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-comic text-3xl md:text-4xl mb-4">Ready to Get Started?</h2>
          <p className="opacity-90 mb-8">Contact us today for a free quote and experience the Dang difference.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:9038710550" className="btn-cta-outline">
              <Phone className="w-5 h-5 mr-2" /> (903) 871-0550
            </a>
            <Link to="/quote" className="btn-cta">Get Your Quote</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
