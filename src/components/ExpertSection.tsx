import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

const EXPERT_IMAGE_URL =
  "https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Interior-Sprayer-Crevice-Stove-scaled-e1745950906493.jpg";

const ExpertSection = () => {
  return (
    <section
      className="bg-white"
      style={{ padding: "40px 15px", height: "421px" }}
    >
      <div className="container mx-auto h-full">
        <div className="grid md:grid-cols-2 gap-12 items-stretch h-full">
          <div style={{ height: "243px" }}>
            <img
              src={EXPERT_IMAGE_URL}
              alt="Expert pest control technician"
              className="w-full h-full rounded-2xl object-cover"
              style={{ border: "6px solid hsl(28, 100%, 50%)" }}
            />
          </div>
          <div style={{ height: "341px", paddingLeft: "21.925px" }}>
            <h2
              className="text-comic text-3xl md:text-4xl mb-4"
              style={{ color: "hsl(20, 40%, 12%)" }}
            >
              Expert Pest Control & Management Services around Tyler, TX
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "hsl(20, 20%, 30%)" }}
            >
              At Dang Pest Control, we know pest problems can seriously disrupt your life. That's why we offer a wide array of reliable pest control services tailored to meet your specific needs. Whether it's a small nuisance or a full-blown infestation, our licensed and experienced technicians provide professional solutions that eliminate issues and prevent their return.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:9038710550"
                className="inline-flex items-center gap-2 font-bold rounded-full px-7 py-3 text-sm border-2 border-[hsl(20,40%,12%)] transition-all hover:bg-[hsl(20,40%,12%)] hover:text-white"
                style={{ color: "hsl(20, 40%, 12%)" }}
              >
                <Phone className="w-4 h-4" /> (903) 871-0550
              </a>
              <Link
                to="/quote"
                className="inline-flex items-center justify-center font-bold rounded-full px-7 py-3 text-sm text-white transition-all hover:brightness-110"
                style={{ background: "hsl(28, 100%, 50%)" }}
              >
                Get Your Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertSection;
