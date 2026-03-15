import { Shield, Heart, Settings, Award, Gift } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Professional, Licensed & Highly Trained Technicians",
    description: "Our technicians bring years of expertise and know-how to deliver results you can trust. As proud members of the NPMA and TPCA, we hold ourselves to the highest industry standards.",
  },
  {
    icon: Heart,
    title: "Family & Pet Friendly",
    description: "Our environmentally-aware practices and products prioritize your loved ones, offering peace of mind with every service.",
  },
  {
    icon: Settings,
    title: "Custom Plans for Lasting Results",
    description: "We take an Integrated Pest Management approach, considering the factors contributing to the problem. Each plan is tailored to your home's specific needs.",
  },
  {
    icon: Award,
    title: "Super Powered Guarantee",
    description: "If pests persist between regularly scheduled visits, we'll return to re-treat your property free of charge. That's our commitment to your satisfaction.",
  },
  {
    icon: Gift,
    title: "How to Get Free Pest Service!",
    description: "For every person you refer that signs up, you'll get your next month free! There are no limits on referral credits—you could get free services for life!",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16" style={{background: 'hsl(30, 40%, 97%)'}}>
      <div className="container mx-auto px-4">
        <p className="text-comic text-sm italic text-center mb-2" style={{color: 'hsl(var(--primary))'}}>WHY CHOOSE US</p>
        <h2 className="text-comic text-3xl md:text-5xl text-center mb-12" style={{color: 'hsl(20, 40%, 12%)'}}>Why Choose Dang Pest Control?</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason) => (
            <div key={reason.title} className="flex flex-col items-center text-center gap-3 p-6 bg-white rounded-2xl shadow-sm border border-orange-100">
              <reason.icon className="w-12 h-12 text-primary flex-shrink-0" />
              <h3 className="text-comic text-lg" style={{color: 'hsl(20, 40%, 12%)'}}>{reason.title}</h3>
              <p className="text-sm leading-relaxed" style={{color: 'hsl(20, 20%, 40%)'}}>{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
