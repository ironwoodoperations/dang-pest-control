import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const AccessibilityPage = () => (
  <div className="min-h-screen">
    <SEO
      title="Accessibility"
      description="Dang Pest Control is committed to making our website accessible to all users."
      canonical="/accessibility"
    />
    <Navbar />
    <main>

    <section className="hero-bg text-primary-foreground py-20 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-comic text-4xl md:text-5xl mb-4">Accessibility Statement</h1>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4 max-w-3xl prose prose-lg">
        <h2 className="text-comic text-2xl mb-4">Our Commitment</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Dang Pest Control is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
        </p>
        <h2 className="text-comic text-2xl mb-4">Measures Taken</h2>
        <ul className="text-muted-foreground space-y-2 mb-4 list-disc pl-6">
          <li>Semantic HTML structure throughout the website</li>
          <li>Alt text on all images</li>
          <li>Keyboard navigation support</li>
          <li>Sufficient color contrast ratios</li>
          <li>Responsive design for all device sizes</li>
        </ul>
        <h2 className="text-comic text-2xl mb-4">Contact Us</h2>
        <p className="text-muted-foreground leading-relaxed">
          If you encounter accessibility barriers on our website, please contact us at <a href="tel:9038710550" className="text-primary font-semibold">(903) 871-0550</a> or email us. We welcome your feedback.
        </p>
      </div>
    </section>

    </main>
    <Footer />
  </div>
);

export default AccessibilityPage;
