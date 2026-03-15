import { Shield, Heart, Settings, Award, Gift, FileCheck } from "lucide-react";

const reasons = [
  {
    icon: FileCheck,
    title: "Professional, Licensed & Highly Trained Technicians",
    description:
      "Our technicians bring years of expertise and know-how to deliver results you can trust. As proud members of the National Pest Management Association (NPMA) and Texas Pest Control Association (TPCA), we hold ourselves to the highest industry standards.",
  },
  {
    icon: Shield,
    title: "Family & Pet Friendly",
    description:
      "Our environmentally-aware practices and products prioritize your loved ones, offering peace of mind with every service.",
  },
  {
    icon: Settings,
    title: "Custom Plans for Lasting Results",
    description:
      "We take an Integrated Pest Management approach, considering the factors contributing to the problem. Each plan is tailored to your home's specific needs, focusing on eradicating pests and preventing future infestations.",
  },
  {
    icon: Award,
    title: "Super Powered Guarantee",
    description:
      "If pests persist between regularly scheduled visits, we'll return to re-treat your property free of charge. That's our commitment to your satisfaction.",
  },
  {
    icon: Gift,
    title: "How to Get Free Pest Service!",
    description:
      "Want to save money on the cost of your pest control service? For every person you refer to Dang Pest Control that signs up for our general pest control service, you'll get your next month free! There are no limits on referral credits, so you could potentially get free services for life!",
  },
];

const WhyChooseUs = () => {
  return (
    <section
      className="py-16"
      style={{ background: "hsl(30, 40%, 97%)" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">

          {/* LEFT COLUMN — heading + subtext */}
          <div className="flex flex-col justify-start pt-2">
            <p
              className="text-comic text-sm italic mb-2"
              style={{ color: "hsl(var(--primary))" }}
            >
              WHY CHOOSE US
            </p>
            <h2
              className="text-comic text-3xl md:text-4xl mb-4 leading-tight"
              style={{ color: "hsl(20, 40%, 12%)" }}
            >
              Why Choose Dang Pest Control?
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "hsl(20, 20%, 40%)" }}
            >
              We know you have options when it comes to pest control,
              but here's what sets us apart.
            </p>
          </div>

          {/* RIGHT SIDE — 2-col card grid spanning 2 columns */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="rounded-2xl p-6"
                style={{ background: "hsl(30, 20%, 93%)" }}
              >
                <reason.icon
                  className="w-10 h-10 mb-4"
                  style={{ color: "hsl(var(--primary))" }}
                />
                <h3
                  className="text-comic text-base mb-3"
                  style={{ color: "hsl(20, 40%, 12%)" }}
                >
                  {reason.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "hsl(20, 20%, 40%)" }}
                >
                  {reason.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;