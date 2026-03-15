import { Link } from "react-router-dom";

const services = [
  { name: "General Pest Control", slug: "pest-control", image: "https://www.dangpestcontrol.com/wp-content/uploads/2025/04/General.jpg" },
  { name: "Termite Control & Inspections", slug: "termite-inspections", image: "https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Termite.jpg" },
  { name: "Ant Pest Control", slug: "ant-control", image: "https://www.dangpestcontrol.com/wp-content/uploads/2025/04/ant.jpg" },
  { name: "Spider Pest Control", slug: "spider-control", image: "https://www.dangpestcontrol.com/wp-content/uploads/2025/04/spider.jpg" },
  { name: "Wasp & Hornet Control", slug: "wasp-hornet-control", image: "https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Wasps-Hornet.jpg" },
  { name: "Scorpion Pest Control", slug: "scorpion-control", image: "https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Scorpion.jpg" },
  { name: "Rodent Pest Control", slug: "rodent-control", image: "https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Rodent.jpg" },
  { name: "Mosquito Pest Control", slug: "mosquito-control", image: "https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Mosquito.jpg" },
  { name: "Flea & Tick Control", slug: "flea-tick-control", image: "https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Flea.jpg" },
  { name: "Roach Pest Control", slug: "roach-control", image: "https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Roach.jpg" },
  { name: "Bed Bug Pest Control", slug: "bed-bug-control", image: "https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Bed-Bug.jpg" },
];

const ServicesSection = () => {
  return (
    <section className="py-16" style={{ background: "hsl(45, 95%, 58%)" }}>
      <div className="container mx-auto px-4">
        <p className="text-comic text-sm text-center mb-2 italic" style={{ color: "hsl(var(--primary))" }}>
          OUR SERVICES
        </p>
        <h2 className="text-comic text-4xl md:text-5xl text-center mb-3" style={{ color: "hsl(20, 40%, 12%)" }}>
          Our Pest Control Services
        </h2>
        <p className="text-center text-sm mb-10 max-w-2xl mx-auto" style={{ color: "hsl(20, 30%, 20%)" }}>
          Using the latest industry techniques, we deliver tailored treatment plans that are highly effective while remaining friendly for your family, pets, and the environment.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/${service.slug}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm text-center flex flex-col hover:shadow-md transition-all duration-200"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-32 object-cover"
              />
              <h3 className="text-comic text-sm font-semibold p-3" style={{ color: "hsl(20, 40%, 12%)" }}>
                {service.name}
              </h3>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/quote"
            className="inline-flex items-center justify-center font-bold rounded-full px-10 py-3 text-white text-base transition-all hover:brightness-110"
            style={{ background: "hsl(28, 100%, 50%)" }}
          >
            Get Your Quote
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
