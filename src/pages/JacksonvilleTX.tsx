import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ─── DATA ────────────────────────────────────────────────────────────────────

const services = [
  { name: 'General Pest Control', img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/General.jpg' },
  { name: 'Ant', img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/ant.jpg' },
  { name: 'Spider', img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/spider.jpg' },
  { name: 'Wasp & Hornet', img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Wasps-Hornet.jpg' },
  { name: 'Scorpion', img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Scorpion.jpg' },
  { name: 'Rodent', img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Rodent.jpg' },
  { name: 'Mosquito', img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Mosquito.jpg' },
  { name: 'Flea & Tick', img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Flea.jpg' },
  { name: 'Roach', img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Roach.jpg' },
  { name: 'Bed Bug', img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Bed-Bug.jpg' },
  { name: 'Termite Control', img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Termite.jpg' },
  { name: 'Termite Inspections', img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Termite.jpg' },
];

const whyChooseCards = [
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Proven-Results.png',
    title: 'Expertise You Can Rely On',
    desc: 'Our licensed and trained technicians bring years of experience to every job, ensuring effective and lasting pest solutions.',
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Comprehensive.png',
    title: 'Family & Pet Friendly Treatments',
    desc: 'We use products designed to be safe for your family and pets while effectively eliminating pests from your home.',
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Safety.png',
    title: 'Custom Solutions for Every Home',
    desc: 'Every home is different. We develop tailored treatment plans to address your specific pest challenges and prevent their return.',
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Guarantee.png',
    title: 'Super Powered Guarantee',
    desc: 'Pests persist? No problem. We provide free re-treatments between regularly scheduled visits to keep your home pest-free.',
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Super-Powered.png',
    title: 'Referral Program',
    desc: 'Love our service? Earn a free month of pest control for every new customer you refer to Dang Pest Control.',
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Custom-Plans.png',
    title: 'Preserving Property Value',
    desc: 'Protect your biggest investment. Our pest control services help maintain and preserve the value of your property.',
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const JacksonvilleTX = () => {
  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", color: 'hsl(20, 40%, 12%)', overflowX: 'hidden' }}>
      <Navbar />

      {/* ══════════════════════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════════════════════ */}
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
          <h1 style={{ fontFamily: '"Bangers", cursive', fontSize: 'clamp(56px, 9vw, 100px)', color: 'hsl(45, 95%, 60%)', fontStyle: 'italic', letterSpacing: '0.05em', WebkitTextStroke: '3px #000000', textShadow: '3px 3px 0 #000000', margin: 0, lineHeight: 1 }}>
            PEST CONTROL SERVICES IN JACKSONVILLE, TX
          </h1>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
          <img src="/banner-img.png" alt="" style={{ width: '100%', display: 'block' }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          INTRO — image left, text right
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 40px 60px', maxWidth: '1200px', margin: '0 auto', background: '#ffffff', backgroundImage: 'radial-gradient(circle, #d0d0d0 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div style={{ border: '4px solid rgb(255, 213, 39)', borderRadius: '6px', overflow: 'hidden', boxShadow: '8px 8px 0 rgba(0,0,0,0.1)' }}>
            <img
              src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/Exterior-Flow-Zone-Sprayer-scaled-e1746808085557.jpg"
              alt="Pest Control Technician Providing Services in Jacksonville TX"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
          <div>
            <p style={{ fontFamily: '"Bangers", cursive', color: 'hsl(28, 100%, 50%)', fontSize: '18px', letterSpacing: '0.12em', fontStyle: 'italic', marginBottom: '6px', marginTop: 0 }}>
              JACKSONVILLE, TX
            </p>
            <h2 style={{ fontSize: 'clamp(26px, 2.8vw, 38px)', fontWeight: '800', marginBottom: '18px', marginTop: 0 }}>
              Professional Pest & Termite Control Services in Jacksonville, TX
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              East Texas may be beautiful, but it's also the perfect environment for pests to thrive. Dang Pest Control is here to take care of the problem once and for all. Our experienced technicians use effective treatments to eliminate pests and prevent their return. Serving Jacksonville, TX, and surrounding areas, our family-owned, local business is committed to making your life easier with services you can trust. Call us today at{' '}
              <a href="tel:(903) 871-0550" style={{ color: '#000', fontWeight: '700' }}>(903) 871-0550</a>{' '}
              and{' '}
              <a href="/quote" style={{ color: '#000', textDecoration: 'underline' }}>get your quote</a>.
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

      {/* ══════════════════════════════════════════════════════
          OUR SERVICES INCLUDE — 4-column grid with orange images
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#f1f1ef', padding: '70px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontWeight: '800', fontSize: 'clamp(26px, 3vw, 40px)', marginBottom: '10px', marginTop: 0 }}>
            Our Services Include
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginTop: '40px' }}>
            {services.map((service, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ borderRadius: '8px', overflow: 'hidden', marginBottom: '12px' }}>
                  <img
                    src={service.img}
                    alt={service.name}
                    style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <p style={{ fontWeight: '700', fontSize: '15px', margin: 0 }}>{service.name}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '15px', lineHeight: 1.8, color: '#444', maxWidth: '800px', margin: '40px auto 0' }}>
            With our Integrated Pest Management Plans, we go beyond short-term fixes. By identifying environmental factors and pest habits, we tailor sustainable solutions to keep your home pest-free.
          </p>
          <div style={{ textAlign: 'center', paddingTop: '30px' }}>
            <a href="/quote" style={{ display: 'inline-block', padding: '16px 52px', background: 'hsl(28, 100%, 50%)', borderRadius: '50px', fontWeight: '700', color: '#fff', textDecoration: 'none', fontSize: '16px' }}>
              Get Your Quote
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY CHOOSE DANG PEST CONTROL? — 6 cards (4 top, 2 bottom)
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '70px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', marginBottom: '36px', marginTop: 0 }}>
          Why Choose Dang Pest Control?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {whyChooseCards.slice(0, 4).map((card, i) => (
            <div key={i} style={{ background: '#f3f3f1', borderRadius: '8px', padding: '28px 20px' }}>
              <img src={card.icon} alt={card.title} style={{ width: '56px', height: '56px', objectFit: 'contain', marginBottom: '14px', display: 'block' }} />
              <h3 style={{ fontWeight: '800', fontSize: '16px', marginBottom: '10px', marginTop: 0 }}>{card.title}</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#555', margin: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '20px' }}>
          {whyChooseCards.slice(4).map((card, i) => (
            <div key={i} style={{ background: '#f3f3f1', borderRadius: '8px', padding: '28px 20px' }}>
              <img src={card.icon} alt={card.title} style={{ width: '56px', height: '56px', objectFit: 'contain', marginBottom: '14px', display: 'block' }} />
              <h3 style={{ fontWeight: '800', fontSize: '16px', marginBottom: '10px', marginTop: 0 }}>{card.title}</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#555', margin: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTACT DANG PEST CONTROL TODAY — text left, dotted bg image right
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '0 40px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', marginBottom: '20px', marginTop: 0 }}>
              Contact Dang Pest Control Today
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              Don't spend another day worrying about pests in your home. Whether you need a one-time treatment or long-term prevention, Dang Pest Control has you covered. Located in Tyler, TX, we proudly serve the surrounding areas, including{' '}
              <a href="/jacksonville-tx" style={{ color: '#000', textDecoration: 'underline' }}>Jacksonville</a>,{' '}
              <a href="/longview-tx" style={{ color: '#000', textDecoration: 'underline' }}>Longview</a>,{' '}
              <a href="/lindale-tx" style={{ color: '#000', textDecoration: 'underline' }}>Lindale</a>,{' '}
              <a href="/bullard-tx" style={{ color: '#000', textDecoration: 'underline' }}>Bullard</a>,{' '}
              <a href="/whitehouse-tx" style={{ color: '#000', textDecoration: 'underline' }}>Whitehouse</a>, and more.
            </p>
            <a href="/quote" style={{ display: 'inline-block', padding: '14px 40px', background: 'hsl(28, 100%, 50%)', borderRadius: '50px', fontWeight: '700', color: '#fff', textDecoration: 'none', fontSize: '16px' }}>
              Get Your Quote
            </a>
          </div>
          <div style={{ position: 'relative', padding: '20px' }}>
            <div style={{ position: 'absolute', inset: 0, background: '#fff', backgroundImage: 'radial-gradient(circle, #d0d0d0 1px, transparent 1px)', backgroundSize: '22px 22px', borderRadius: '8px', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1, border: '4px solid rgb(255, 213, 39)', borderRadius: '6px', overflow: 'hidden', boxShadow: '8px 8px 0 rgba(0,0,0,0.1)' }}>
              <img
                src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/Exterior-Solo-Spreader-scaled-e1746808147308.jpg"
                alt="Home Pest and Termite Control in Jacksonville TX"
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JacksonvilleTX;
