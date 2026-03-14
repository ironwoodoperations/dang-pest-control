import { useParams, Link } from "react-router-dom";
import { Phone, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceProcess from "@/components/service/ServiceProcess";
import ServiceWhyChoose from "@/components/service/ServiceWhyChoose";
import ServiceExtraSection from "@/components/service/ServiceExtraSection";
import ServiceFAQs from "@/components/service/ServiceFAQs";
import { servicesData, serviceKeys } from "@/data/servicesData";
import { useEffect } from "react";

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? servicesData[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Navbar />
        <h1 className="text-comic text-4xl mb-4">Service Not Found</h1>
        <Link to="/" className="btn-cta">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero with image */}
      <section className="relative">
        <div className="relative h-[400px] md:h-[500px]">
          <img src={service.heroImage} alt={service.heroAlt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-primary-foreground text-sm hover:underline z-10">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <span className="text-secondary text-sm font-bold uppercase tracking-wider">{service.subtitle}</span>
              <h1 className="text-comic text-3xl md:text-5xl text-primary-foreground mt-2 mb-4">{service.title}</h1>
              <p className="text-primary-foreground/90 max-w-2xl mb-6 leading-relaxed">{service.intro}</p>
              <div className="flex flex-wrap gap-4">
                <a href="tel:9038710550" className="btn-cta-outline">
                  <Phone className="w-5 h-5 mr-2" /> (903) 871-0550
                </a>
                <Link to="/quote" className="btn-cta">Get Your Quote</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <ServiceProcess title={service.processTitle} intro={service.processIntro} steps={service.steps} />

      {/* Extra Sections */}
      {service.extraSections?.map((section, i) => (
        <ServiceExtraSection key={i} section={section} index={i} />
      ))}

      {/* Why Choose Us */}
      <ServiceWhyChoose items={service.whyChooseUs} intro={service.whyChooseIntro} />

      {/* FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <ServiceFAQs faqs={service.faqs} />
      )}

      {/* Bottom CTA */}
      <section className="section-dark text-primary-foreground py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-comic text-3xl md:text-4xl mb-4">{service.bottomCTA.title}</h2>
            <p className="opacity-90 mb-8 leading-relaxed">{service.bottomCTA.text}</p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:9038710550" className="btn-cta-outline">
                <Phone className="w-5 h-5 mr-2" /> (903) 871-0550
              </a>
              <Link to="/quote" className="btn-cta">Get Your Quote</Link>
            </div>
          </div>

          {service.bottomImage && (
            <div>
              <img src={service.bottomImage} alt={service.bottomImageAlt || ""} className="w-full rounded-2xl shadow-lg" />
            </div>
          )}
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-comic text-3xl text-center mb-8">Additional Services</h2>
          <p className="text-center text-muted-foreground mb-8">We also provide specialized services for a wide range of pests:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {serviceKeys
              .filter((key) => key !== slug)
              .map((key) => {
                const s = servicesData[key];
                return (
                  <Link key={key} to={`/services/${key}`} className="card-service">
                    <h3 className="text-comic text-sm">{s.title}</h3>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicePage;
