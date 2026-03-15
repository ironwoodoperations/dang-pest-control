import { Link } from "react-router-dom";
import { Phone, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useSiteConfig } from "@/hooks/useSiteConfig";

const ReviewsPage = () => {
  const { seoTitle, seoDescription } = useSiteConfig("/reviews");

  const reviews = [
    { name: "Cara D.", title: "So Helpful!", text: "Oh my gosh I love Dang so much! Kirk is always so helpful, informative and nice!", rating: 5 },
    { name: "Murray S.", title: "Professional & Super Friendly", text: "Dang Pest Control is very professional and super friendly! I love that they always explain what they are doing and follow up after the service. Highly recommend!", rating: 5 },
    { name: "Shelley H.", title: "Quick Treatment & Suggestions", text: "When we moved into our new Barndominium, we apparently brought German Cockroaches in with our moving boxes. Dang quickly discovered where they were coming from and treated them. We haven't had any issues since!", rating: 5 },
    { name: "Kelley S.", title: "Friendly & Informative", text: "Dang is so friendly and informative. We recommend everyone use them!", rating: 5 },
    { name: "John T.", title: "Best in Tyler!", text: "Kirk and his team are the best pest control company in Tyler. Fast, professional, and thorough.", rating: 5 },
    { name: "Sarah M.", title: "Highly Recommend", text: "We have used Dang Pest Control for over a year and have had zero issues. They are always on time and very professional.", rating: 5 },
  ];

  return (
  <div className="min-h-screen">
    <SEO
      title={seoTitle || "Reviews"}
      description={seoDescription || "See what our customers say about Dang Pest Control. Read real reviews from Tyler, TX homeowners."}
      canonical="/reviews"
    />
    <Navbar />

    <section className="hero-bg text-white py-20 text-center relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h1 className="text-comic text-4xl md:text-6xl mb-4 text-white">Customer Reviews</h1>
        <p className="text-lg text-white opacity-90 max-w-xl mx-auto">Real feedback from real customers across East Texas.</p>
      </div>
    </section>

    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8" style={{ color: 'hsl(48, 100%, 50%)' }} />
            ))}
          </div>
          <p
            className="max-w-xl mx-auto mb-4 text-sm"
            style={{ color: 'hsl(20, 20%, 35%)' }}
          >
            Our customers consistently rate us 5 stars. Here are just a few of the kind words they've shared.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 hover:border-primary transition-all"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4" style={{ color: 'hsl(48, 100%, 50%)' }} />
                ))}
              </div>
              <p
                className="italic text-sm mb-4"
                style={{ color: 'hsl(20, 20%, 30%)' }}
              >
                "{review.text}"
              </p>
              <div>
                <p
                  className="font-bold"
                  style={{ color: 'hsl(20, 40%, 12%)' }}
                >
                  {review.name}
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'hsl(20, 20%, 45%)' }}
                >
                  {review.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="py-16 text-center mt-16 rounded-2xl"
          style={{ background: 'hsl(28, 100%, 50%)' }}
        >
          <h2
            className="text-comic text-3xl mb-3"
            style={{ color: 'hsl(48, 100%, 50%)' }}
          >
            Leave Us a Review
          </h2>
          <p
            className="mb-8"
            style={{ color: '#ffffff' }}
          >
            We'd love to hear about your experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://g.page/r/dangpestcontrol/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-bold rounded-full px-8 py-3 text-base border border-white text-white transition-all hover:bg-white hover:text-orange-600"
            >
              Google Reviews
            </a>
            <Link
              to="/quote"
              className="inline-flex items-center justify-center font-bold rounded-full px-8 py-3 text-base text-black"
              style={{ background: 'hsl(48, 100%, 50%)' }}
            >
              Get Your Quote
            </Link>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
  );
};

export default ReviewsPage;
