import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 text-white text-center relative overflow-hidden" style={{background: 'hsl(var(--primary))'}}>
      <div className="container mx-auto px-4">
        <h2 className="text-comic text-4xl md:text-5xl mb-4" style={{color: 'hsl(48, 100%, 50%)'}}>Get Your Quote Today</h2>
        <p className="text-base mb-8 text-white opacity-90 max-w-2xl mx-auto">
          Don't wait—restore comfort and peace to your home with professional pest control services from Dang Pest Control. Located in Tyler, TX, we proudly serve the surrounding areas, including{" "}
          {[
            { name: "Longview", slug: "longview-tx" },
            { name: "Jacksonville", slug: "jacksonville-tx" },
            { name: "Lindale", slug: "lindale-tx" },
            { name: "Bullard", slug: "bullard-tx" },
            { name: "Whitehouse", slug: "whitehouse-tx" },
          ].map((loc, i, arr) => (
            <span key={loc.slug}>
              <Link
                to={`/locations/${loc.slug}`}
                className="underline text-white hover:opacity-75 transition-opacity"
              >
                {loc.name}
              </Link>
              {i < arr.length - 1 ? ", " : ""}
            </span>
          ))}{" "}
          and more.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <a href="tel:9038710550" className="inline-flex items-center gap-2 font-bold rounded-full px-7 py-3 text-sm border-2 border-white text-white hover:bg-white hover:text-primary transition-all">
            <Phone className="w-5 h-5" /> (903) 871-0550
          </a>
          <Link to="/quote" className="inline-flex items-center justify-center font-bold rounded-full px-8 py-3 text-sm transition-all hover:brightness-110" style={{background: 'hsl(48, 100%, 50%)', color: 'hsl(20, 40%, 12%)'}}>Get Your Quote</Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
