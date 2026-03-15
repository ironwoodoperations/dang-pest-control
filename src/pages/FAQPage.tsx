import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What areas do you serve?", a: "We serve Tyler, Longview, Jacksonville, Lindale, Bullard, Whitehouse, and surrounding East Texas communities." },
  { q: "Are your treatments safe for pets and children?", a: "Yes. We use EPA-approved, family-safe products and Integrated Pest Management methods that prioritize safety." },
  { q: "Do you offer free estimates?", a: "Yes! Call us at (903) 871-0550 or fill out our online quote form for a free, no-obligation estimate." },
  { q: "How often should I schedule pest control?", a: "We recommend quarterly treatments for year-round protection. Some pests may require monthly visits initially." },
  { q: "What is your Super Powered Guarantee?", a: "If pests persist between scheduled visits, we'll re-treat for free. If you're still not satisfied, we'll refund your money." },
  { q: "Do you handle termite inspections?", a: "Absolutely. Our licensed inspectors provide thorough termite inspections and treatment plans." },
  { q: "What should I do to prepare for a treatment?", a: "We'll provide specific preparation instructions based on the type of treatment. Generally, clearing countertops and moving items away from walls helps." },
  { q: "Are you licensed and insured?", a: "Yes. We are fully licensed, bonded, and insured. We're proud members of the NPMA and TPCA." },
];

const FAQPage = () => (
  <div className="min-h-screen">
    <SEO
      title="Frequently Asked Questions"
      description="Get answers to common pest control questions. Learn about our services, safety, pricing, and guarantee."
      canonical="/faq"
    />
    <Navbar />

    <section className="hero-bg text-white py-20 text-center relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h1 className="text-comic text-4xl md:text-6xl mb-4 text-white">Frequently Asked Questions</h1>
        <p className="text-lg text-white opacity-90 max-w-xl mx-auto">Everything you need to know about our pest control services.</p>
      </div>
    </section>

    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b border-orange-100 px-6">
              <AccordionTrigger className="text-left font-bold py-4 text-base hover:text-primary transition-colors" style={{color: 'hsl(20, 40%, 12%)'}}>{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed pb-4" style={{color: 'hsl(20, 20%, 35%)'}}>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>

    <section className="py-16 text-white text-center" style={{background: 'hsl(var(--primary))'}}>
      <div className="container mx-auto px-4">
        <h2 className="text-comic text-3xl mb-4 text-white">Still Have Questions?</h2>
        <p className="opacity-90 mb-8 text-white">We're here to help. Reach out anytime.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="tel:9038710550" className="btn-cta-outline"><Phone className="w-5 h-5 mr-2" /> (903) 871-0550</a>
          <Link to="/quote" className="btn-cta">Get Your Quote</Link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default FAQPage;
