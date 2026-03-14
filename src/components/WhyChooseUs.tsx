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
    <section className="section-orange text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-comic text-3xl md:text-4xl text-center mb-4">Why Choose Dang Pest Control?</h2>
        <p className="text-center opacity-90 mb-12 max-w-2xl mx-auto">
          We know you have options when it comes to pest control, but here's what sets us apart.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason) => (
            <div key={reason.title} className="flex gap-4">
              <reason.icon className="w-8 h-8 flex-shrink-0 text-secondary" />
              <div>
                <h3 className="text-comic text-lg mb-2">{reason.title}</h3>
                <p className="text-sm opacity-90">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
