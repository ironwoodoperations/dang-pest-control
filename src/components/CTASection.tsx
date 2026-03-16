import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

const locations = [
  { name: "Longview", slug: "longview-tx" },
  { name: "Jacksonville", slug: "jacksonville-tx" },
  { name: "Lindale", slug: "lindale-tx" },
  { name: "Bullard", slug: "bullard-tx" },
  { name: "Whitehouse", slug: "whitehouse-tx" },
];

const CTASection = () => {
  return (
    <section className="relative text-white text-center overflow-hidden" style={{ background: 'hsl(28, 100%, 50%)' }}>
      <div className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-comic uppercase mb-4" style={{ color: 'hsl(48, 100%, 50%)', fontSize: 'clamp(32px, 5vw, 56px)' }}>
            Get Your Quote Today
          </h2>
          <p className="text-base mb-8 text-white max-w-2xl mx-auto">
            Don't wait—restore comfort and peace to your home with professional pest control services from Dang Pest Control. Located in Tyler, TX, we proudly serve the surrounding areas, including{" "}
            {locations.map((loc, i) => (
              <span key={loc.slug}>
                <Link to={`/${loc.slug}`} className="underline text-white hover:opacity-75 transition-opacity">{loc.name}</Link>
                {i < locations.length - 1 ? ", " : ""}
              </span>
            ))}{" "}
            and more.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a href="tel:9038710550" className="inline-flex items-center gap-2 font-bold rounded-full px-7 py-3 text-sm border-2 border-white text-white transition-all hover:bg-white hover:text-primary">
              <Phone className="w-5 h-5" /> (903) 871-0550
            </a>
            <Link to="/quote" className="inline-flex items-center justify-center font-bold rounded-full px-8 py-3 text-sm transition-all hover:brightness-110" style={{ background: 'hsl(48, 100%, 50%)', color: 'hsl(20, 40%, 12%)' }}>
              Get Your Quote
            </Link>
          </div>
        </div>
      </div>
      <img src="https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Longview.png" alt="" className="w-full block" style={{ marginBottom: '-4px' }} />
    </section>
  );
};

export default CTASection;