import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import interiorService from "@/assets/interior-service.jpg";

const ExpertSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-comic text-3xl md:text-4xl mb-6">
            Expert Pest Control & Management Services around Tyler, TX
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            At Dang Pest Control, we know pest problems can seriously disrupt your life. That's why we offer a wide array of reliable pest control services tailored to meet your specific needs. Whether it's a small nuisance or a full-blown infestation, our licensed and experienced technicians provide professional solutions that eliminate issues and prevent their return.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="tel:9038710550" className="btn-cta-outline !border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground">
              <Phone className="w-5 h-5 mr-2" /> (903) 871-0550
            </a>
            <Link to="/quote" className="btn-cta">Get Your Quote</Link>
          </div>
        </div>
        <div className="cyan-border overflow-hidden">
          <img
            src={interiorService}
            alt="Pest Control Service Technician Spraying in Kitchen"
            className="w-full h-80 object-cover rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default ExpertSection;
