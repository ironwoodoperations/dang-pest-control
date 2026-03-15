import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import interiorService from "@/assets/interior-service.jpg";

const ExpertSection = () => {
  return (
    <section className="py-16 text-white" style={{background: 'hsl(var(--primary))'}}>
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-comic text-3xl md:text-5xl mb-6 text-white">
            Expert Pest Control & Management Services around Tyler, TX
          </h2>
          <p className="text-base leading-relaxed mb-4 text-white opacity-90">
            At Dang Pest Control, we know pest problems can seriously disrupt your life. That's why we offer a wide array of reliable pest control services tailored to meet your specific needs. Whether it's a small nuisance or a full-blown infestation, our licensed and experienced technicians provide professional solutions that eliminate issues and prevent their return.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <a href="tel:9038710550" className="inline-flex items-center justify-center font-bold rounded-full px-8 py-3 text-base border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-200">
              <Phone className="w-5 h-5 mr-2" /> (903) 871-0550
            </a>
            <Link to="/quote" className="inline-flex items-center justify-center font-bold rounded-full px-8 py-3 text-base border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-200">
              Get Your Quote
            </Link>
          </div>
        </div>
        <div>
          <img
            src={interiorService}
            alt="Pest Control Service Technician Spraying in Kitchen"
            className="w-full rounded-2xl object-cover border-4 shadow-xl"
            style={{borderColor: 'hsl(185, 100%, 45%)'}}
          />
        </div>
      </div>
    </section>
  );
};

export default ExpertSection;
