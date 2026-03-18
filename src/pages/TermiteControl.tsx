import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const whyCards = [
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Proven-Results.png',
    title: 'Termite Treatment Expertise',
    desc: 'Our certified technicians use proven termite control solutions for subterranean and drywood termites in Tyler, TX and surrounding areas.',
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Comprehensive.png',
    title: 'Integrated Pest Management',
    desc: 'We combine thorough inspections, targeted treatment, and preventative measures to stop termites now and protect your home long-term.',
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Safety.png',
    title: 'Family & Pet Safe Approach',
    desc: 'We prioritize low-impact, EPA-approved products applied with precise placement around your foundation and wood structures.',
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Guarantee.png',
    title: 'Reliability & Guarantee',
    desc: 'Dang Pest Control offers follow-up services and tailored maintenance plans to ensure termites do not return.',
  },
];

const TermiteControl = () => {
  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", color: 'hsl(20, 40%, 12%)', overflowX: 'hidden' }}>
      <Navbar />

      <section
        style={{
          position: 'relative',
          background: `url(https://www.dangpestcontrol.com/wp-content/uploads/2025/06/moblie_banner.webp) center/cover no-repeat, hsl(28, 100%, 50%)`,
          paddingTop: '80px',
          paddingBottom: '200px',
          minHeight: '420px',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.18) 1.5px, transparent 1.5px)', backgroundSize: '18px 18px', pointerEvents: 'none' }} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 20px 30px' }}>
          <h1 style={{ fontFamily: '"Bangers", cursive', fontSize: 'clamp(56px, 9vw, 100px)', color: 'hsl(45, 95%, 60%)', fontStyle: 'italic', letterSpacing: '0.05em', WebkitTextStroke: '3px #000', textShadow: '3px 3px 0 #000', margin: 0, lineHeight: 1 }}>
            TERMITE CONTROL
          </h1>
        </div>
        <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
          <img src="/banner-img.png" alt="" style={{ width: '100%', display: 'block' }} />
        </div>
      </section>

      <section style={{ padding: '80px 40px 60px', maxWidth: '1200px', margin: '0 auto', background: '#fff', backgroundImage: 'radial-gradient(circle, #d0d0d0 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div style={{ border: '4px solid rgb(255, 213, 39)', borderRadius: '6px', overflow: 'hidden', boxShadow: '8px 8px 0 rgba(0,0,0,0.1)' }}>
            <img src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/termite-treatment.jpg" alt="Termite Treatment in Tyler TX" style={{ width: '100%', display: 'block' }} />
          </div>

          <div>
            <p style={{ fontFamily: '"Bangers", cursive', color: 'hsl(28, 100%, 50%)', fontSize: '18px', letterSpacing: '0.12em', fontStyle: 'italic', marginBottom: '6px', marginTop: 0 }}>
              TERMITES
            </p>
            <h2 style={{ fontSize: 'clamp(26px, 2.8vw, 38px)', fontWeight: '800', marginBottom: '18px', marginTop: 0 }}>
              Powerful Termite Control Services
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              Termites can silently damage your home. Our termite control program combines inspection, targeted treatment, and ongoing prevention to protect your investment. Serving Tyler, TX and surrounding communities.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="tel:(903) 871-0550" style={{ padding: '13px 28px', border: '2px solid hsl(20, 40%, 12%)', borderRadius: '50px', fontWeight: '700', color: 'hsl(20, 40%, 12%)', textDecoration: 'none', fontSize: '15px', whiteSpace: 'nowrap' }}>
                (903) 871-0550
              </a>
              <a href="/quote" style={{ padding: '13px 28px', background: 'hsl(28, 100%, 50%)', borderRadius: '50px', fontWeight: '700', color: '#fff', textDecoration: 'none', fontSize: '15px', whiteSpace: 'nowrap' }}>
                Get Your Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '70px 40px 70px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontWeight: '800', fontSize: 'clamp(26px, 3vw, 42px)', marginTop: 0, marginBottom: '18px' }}>
          Our Termite Treatment Process
        </h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px', marginTop: 0 }}>
          We inspect, treat, and protect with a strategy built for long-term termite control.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '20px' }}>
          {['Inspect', 'Treat', 'Monitor', 'Prevent'].map((step, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 8px 20px rgba(0,0,0,0.08)', padding: '24px' }}>
              <h3 style={{ marginTop: 0, marginBottom: '8px', fontSize: '18px', fontWeight: '800' }}>{step}</h3>
              <p style={{ margin: 0, color: '#444', fontSize: '14px', lineHeight: 1.65 }}>
                {step === 'Inspect' && 'Full structural inspection for termite evidence and vulnerabilities.'}
                {step === 'Treat' && 'Targeted liquid and bait treatments at foundation, soil, and wood points.'}
                {step === 'Monitor' && 'Regular follow-ups to confirm treatment success and uncover future activity.'}
                {step === 'Prevent' && 'Sealing entry points and recommending moisture control and wood management.'}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 40px 70px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', marginTop: 0, marginBottom: '20px' }}>
          Why Choose Dang Pest Control?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '20px' }}>
          {whyCards.map((card, i) => (
            <div key={i} style={{ background: '#f8f8f6', borderRadius: '8px', padding: '22px' }}>
              <img src={card.icon} alt={card.title} style={{ width: '56px', height: '56px', objectFit: 'contain', marginBottom: '12px' }} />
              <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: '800' }}>{card.title}</h3>
              <p style={{ margin: 0, color: '#555', fontSize: '15px', lineHeight: 1.7 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '40px 40px 80px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(26px, 3vw, 34px)', marginBottom: '16px', marginTop: 0 }}>
          Ready to Stop Termites?
        </h2>
        <p style={{ color: '#444', fontSize: '16px', lineHeight: 1.7, marginBottom: '22px' }}>
          Contact us for a free termite assessment and tailored treatment plan.
        </p>
        <a href="/quote" style={{ display: 'inline-block', background: 'hsl(28, 100%, 50%)', color: '#fff', padding: '16px 50px', borderRadius: '50px', fontWeight: '700', textDecoration: 'none' }}>
          Get Your Quote
        </a>
      </section>

      <Footer />
    </div>
  );
};

export default TermiteControl;
