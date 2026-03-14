import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

const CTASection = () => {
  return (
    <section className="section-dark text-primary-foreground py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-comic text-3xl md:text-4xl mb-4">Get Your Quote Today</h2>
        <p className="opacity-90 mb-6 max-w-2xl mx-auto">
          Don't wait—restore comfort and peace to your home with professional pest control services from Dang Pest Control. Located in Tyler, TX, we proudly serve the surrounding areas.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            { name: "Longview", slug: "longview-tx" },
            { name: "Jacksonville", slug: "jacksonville-tx" },
            { name: "Lindale", slug: "lindale-tx" },
            { name: "Bullard", slug: "bullard-tx" },
            { name: "Whitehouse", slug: "whitehouse-tx" },
          ].map((loc) => (
            <Link
              key={loc.slug}
              to={`/locations/${loc.slug}`}
              className="text-sm underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
            >
              {loc.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="tel:9038710550" className="btn-cta-outline">
            <Phone className="w-5 h-5 mr-2" /> (903) 871-0550
          </a>
          <Link to="/quote" className="btn-cta">Get Your Quote</Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
