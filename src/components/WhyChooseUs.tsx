const LICENSED_ICON = "https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Professional-Licensed.png";
const FAMILY_ICON = "https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Family-Pets.png";
const CUSTOM_ICON = "https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Custom-Plans.png";
const GUARANTEE_ICON = "https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Super-Powered.png";
const REFERRAL_ICON = "https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Referral-Program.png";

const reasons = [
  {
    icon: LICENSED_ICON,
    title: "Professional, Licensed & Highly Trained Technicians",
    description:
      "Our technicians bring years of expertise and know-how to deliver results you can trust. As proud members of the National Pest Management Association (NPMA) and Texas Pest Control Association (TPCA), we hold ourselves to the highest industry standards.",
  },
  {
    icon: FAMILY_ICON,
    title: "Family & Pet Friendly",
    description:
      "Our environmentally-aware practices and products prioritize your loved ones, offering peace of mind with every service.",
  },
  {
    icon: CUSTOM_ICON,
    title: "Custom Plans for Lasting Results",
    description:
      "We take an Integrated Pest Management approach, considering the factors contributing to the problem. Each plan is tailored to your home's specific needs, focusing on eradicating pests and preventing future infestations.",
  },
  {
    icon: GUARANTEE_ICON,
    title: "Super Powered Guarantee",
    description:
      "If pests persist between regularly scheduled visits, we'll return to re-treat your property free of charge. That's our commitment to your satisfaction.",
  },
  {
    icon: REFERRAL_ICON,
    title: "How to Get Free Pest Service!",
    description:
      "Want to save money on the cost of your pest control service? For every person you refer to Dang Pest Control that signs up for our general pest control service, you'll get your next month free! There are no limits on referral credits, so you could potentially get free services for life!",
  },
];

const WHY_CHOOSE_BG = "https://aelitedigital.com/wp-dang/wp-content/uploads/2025/03/Professional-background-img.png";

const WhyChooseUs = () => {
  return (
    <section
      className="py-16"
      style={{
        backgroundImage: `url(${WHY_CHOOSE_BG})`,
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left column: eyebrow, heading, subtext */}
          <div className="flex flex-col justify-start pt-2">
            <p className="text-comic text-sm italic mb-2" style={{ color: "hsl(var(--primary))" }}>
              WHY CHOOSE US
            </p>
            <h2
              className="text-comic text-3xl md:text-4xl mb-4 leading-tight"
              style={{ color: "hsl(20, 40%, 12%)" }}
            >
              Why Choose Dang Pest Control?
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(20, 20%, 40%)" }}>
              We know you have options when it comes to pest control, but here's what sets us apart.
            </p>
          </div>

          {/* Right: 2-col grid of reason cards */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="rounded-2xl p-6 flex flex-col"
                style={{ background: "hsl(30, 20%, 93%)" }}
              >
                <img
                  src={reason.icon}
                  alt=""
                  className="w-12 h-12 object-contain mb-4"
                />
                <h3
                  className="text-comic text-base mb-3"
                  style={{ color: "hsl(20, 40%, 12%)" }}
                >
                  {reason.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(20, 20%, 40%)" }}>
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
