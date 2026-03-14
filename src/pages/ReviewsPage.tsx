import { Link } from "react-router-dom";
import { Phone, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const ReviewsPage = () => (
  <div className="min-h-screen">
    <SEO
      title="Reviews"
      description="See what our customers say about Dang Pest Control. Read real reviews from Tyler, TX homeowners."
      canonical="/reviews"
    />
    <Navbar />

    <section className="hero-bg text-primary-foreground py-20 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-comic text-4xl md:text-5xl mb-4">Customer Reviews</h1>
        <p className="text-lg opacity-90">Real feedback from real customers across East Texas.</p>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-8 h-8 text-secondary fill-secondary" />
          ))}
        </div>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Our customers consistently rate us 5 stars. Check out our Google and Yelp reviews to see why families across East Texas trust Dang Pest Control.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="tel:9038710550" className="btn-cta-outline !border-primary !text-primary hover:!bg-primary hover:!text-primary-foreground">
            <Phone className="w-5 h-5 mr-2" /> (903) 871-0550
          </a>
          <Link to="/quote" className="btn-cta">Get Your Quote</Link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default ReviewsPage;
