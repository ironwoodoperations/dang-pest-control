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

    <section className="hero-bg text-white py-20 text-center relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h1 className="text-comic text-4xl md:text-6xl mb-4 text-white">Contact Us</h1>
        <p className="text-lg text-white opacity-90 max-w-xl mx-auto">We'd love to hear from you. Reach out anytime.</p>
      </div>
    </section>

    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-comic text-2xl mb-4" style={{color: 'hsl(20, 40%, 12%)'}}>Get In Touch</h2>
            <a href="tel:9038710550" className="flex items-center gap-3 hover:text-primary transition-colors">
              <Phone className="w-5 h-5" style={{color: 'hsl(var(--primary))'}} />
              <div>
                <p className="font-semibold" style={{color: 'hsl(20, 40%, 12%)'}}>(903) 871-0550</p>
                <p className="text-sm" style={{color: 'hsl(20, 20%, 40%)'}}>Call us anytime</p>
              </div>
            </a>
            <a href="mailto:info@dangpestcontrol.com" className="flex items-center gap-3 hover:text-primary transition-colors">
              <Mail className="w-5 h-5" style={{color: 'hsl(var(--primary))'}} />
              <div>
                <p className="font-semibold" style={{color: 'hsl(20, 40%, 12%)'}}>info@dangpestcontrol.com</p>
                <p className="text-sm" style={{color: 'hsl(20, 20%, 40%)'}}>Email us</p>
              </div>
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-0.5" style={{color: 'hsl(var(--primary))'}} />
              <div>
                <p className="font-semibold" style={{color: 'hsl(20, 40%, 12%)'}}>Tyler, TX</p>
                <p className="text-sm" style={{color: 'hsl(20, 20%, 40%)'}}>Serving East Texas</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 mt-0.5" style={{color: 'hsl(var(--primary))'}} />
              <div>
                <p className="font-semibold" style={{color: 'hsl(20, 40%, 12%)'}}>Mon–Fri: 8am–5pm</p>
                <p className="text-sm" style={{color: 'hsl(20, 20%, 40%)'}}>Emergency service available</p>
              </div>
            </div>
          </div>

          <div className="text-center flex flex-col items-center justify-center">
            <h2 className="text-comic text-2xl mb-4" style={{color: 'hsl(20, 40%, 12%)'}}>Request a Quote</h2>
            <p className="mb-6" style={{color: 'hsl(20, 20%, 35%)'}}>Fill out our quick form and we'll get back to you fast.</p>
            <Link to="/quote" className="btn-cta">Get Your Quote</Link>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default ContactPage;
