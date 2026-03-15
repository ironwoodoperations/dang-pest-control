import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

const CTA_BG_IMAGE = "https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Longview.png";

const CTASection = () => {
  return (
    <section
      className="py-20 text-white text-center relative overflow-hidden min-h-[320px] flex items-center justify-center"
      style={{
        backgroundImage: `url(${CTA_BG_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="container mx-auto px-4 relative z-10">
        <h2
          className="text-comic text-4xl md:text-5xl mb-4"
          style={{ color: "hsl(48, 100%, 50%)" }}
        >
          Get Your Quote Today
        </h2>
        <p className="text-base mb-8 text-white/95 max-w-2xl mx-auto">
          We proudly serve Tyler, TX and the surrounding areas including Longview, Jacksonville, Lindale, Bullard, Whitehouse, and more. Don't wait—restore comfort and peace to your home with professional pest control from Dang Pest Control.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="tel:9038710550"
            className="inline-flex items-center gap-2 font-bold rounded-full px-7 py-3 text-sm border-2 border-white text-white hover:bg-white hover:text-primary transition-all"
          >
            <Phone className="w-5 h-5" /> (903) 871-0550
          </a>
          <Link
            to="/quote"
            className="inline-flex items-center justify-center font-bold rounded-full px-8 py-3 text-sm transition-all hover:brightness-110"
            style={{ background: "hsl(48, 100%, 50%)", color: "hsl(20, 40%, 12%)" }}
          >
            Get Your Quote
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
