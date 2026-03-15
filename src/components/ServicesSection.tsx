import { Link } from "react-router-dom";

const services = [
  { icon: "🐜", name: "General Pest Control", slug: "pest-control" },
  { icon: "🪳", name: "Termite Control & Inspections", slug: "termite-inspections" },
  { icon: "🐜", name: "Ant Pest Control", slug: "ant-control" },
  { icon: "🕷️", name: "Spider Pest Control", slug: "spider-control" },
  { icon: "🐝", name: "Wasp & Hornet Control", slug: "wasp-hornet-control" },
  { icon: "🦂", name: "Scorpion Pest Control", slug: "scorpion-control" },
  { icon: "🐀", name: "Rodent Pest Control", slug: "rodent-control" },
  { icon: "🦟", name: "Mosquito Pest Control", slug: "mosquito-control" },
  { icon: "🪲", name: "Flea & Tick Control", slug: "flea-tick-control" },
  { icon: "🪳", name: "Roach Pest Control", slug: "roach-control" },
  { icon: "🛏️", name: "Bed Bug Pest Control", slug: "bed-bug-control" },
];

const ServicesSection = () => {
  return (
    <section className="py-16" style={{background: 'hsl(45, 95%, 60%)'}}>
      <div className="container mx-auto px-4">
        <p className="text-comic text-sm text-center mb-2 italic" style={{color: 'hsl(var(--primary))'}}>OUR SERVICES</p>
        <h2 className="text-comic text-4xl md:text-5xl text-center mb-3" style={{color: 'hsl(20, 40%, 12%)'}}>Our Pest Control Services</h2>
        <p className="text-center text-sm mb-10 max-w-2xl mx-auto" style={{color: 'hsl(20, 30%, 20%)'}}>
          Using the latest industry techniques, we deliver tailored treatment plans that are highly effective while remaining friendly for your family, pets, and the environment.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service) => (
            <Link key={service.slug} to={`/${service.slug}`} className="bg-white rounded-2xl p-5 shadow-sm text-center flex flex-col items-center gap-3 hover:shadow-md transition-all duration-200">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-2 text-3xl" style={{background: 'hsl(var(--primary))'}}>
                {service.icon}
              </div>
              <h3 className="text-comic text-sm uppercase" style={{color: 'hsl(20, 40%, 12%)'}}>{service.name}</h3>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/quote" className="inline-flex items-center justify-center font-bold rounded-full px-10 py-3 text-white text-base transition-all hover:brightness-110 mt-8 mx-auto block w-fit" style={{background: 'hsl(var(--primary))'}}>Get Your Quote</Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
