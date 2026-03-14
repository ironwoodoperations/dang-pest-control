import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const ContactPage = () => (
  <div className="min-h-screen">
    <SEO
      title="Contact Us"
      description="Contact Dang Pest Control in Tyler, TX. Call (903) 871-0550 or visit us for professional pest control services."
      canonical="/contact"
    />
    <Navbar />

    <section className="hero-bg text-primary-foreground py-20 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-comic text-4xl md:text-5xl mb-4">Contact Us</h1>
        <p className="text-lg opacity-90">We'd love to hear from you. Reach out anytime.</p>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-comic text-2xl mb-4">Get In Touch</h2>
            <a href="tel:9038710550" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold">(903) 871-0550</p>
                <p className="text-sm text-muted-foreground">Call us anytime</p>
              </div>
            </a>
            <a href="mailto:info@dangpestcontrol.com" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold">info@dangpestcontrol.com</p>
                <p className="text-sm text-muted-foreground">Email us</p>
              </div>
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold">Tyler, TX</p>
                <p className="text-sm text-muted-foreground">Serving East Texas</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold">Mon–Fri: 8am–5pm</p>
                <p className="text-sm text-muted-foreground">Emergency service available</p>
              </div>
            </div>
          </div>

          <div className="text-center flex flex-col items-center justify-center">
            <h2 className="text-comic text-2xl mb-4">Request a Quote</h2>
            <p className="text-muted-foreground mb-6">Fill out our quick form and we'll get back to you fast.</p>
            <Link to="/quote" className="btn-cta">Get Your Quote</Link>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default ContactPage;
