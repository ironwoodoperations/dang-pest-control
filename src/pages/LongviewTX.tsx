import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ─── DATA ────────────────────────────────────────────────────────────────────

const serviceCards = [
  {
    color: 'hsl(28, 100%, 50%)',
    title: 'General Pest Control',
    desc: <>Protect your home from <strong>ants</strong>, <strong>spiders</strong>, <strong>roaches</strong>, and other common pests with treatments designed to address the specific conditions in your area.</>,
    href: '/pest-control',
  },
  {
    color: 'hsl(45, 95%, 52%)',
    title: 'Mosquito Pest Control',
    desc: <>Don't let mosquitos ruin your outdoor spaces. We use proven methods to <strong>reduce mosquito populations</strong>, so you can enjoy your yard worry-free.</>,
    href: '/mosquito-control',
  },
  {
    color: 'hsl(185, 65%, 42%)',
    title: 'Termite Inspections & Control',
    desc: <>Termites can silently eat away at your home's structure and value. Whether you need a <strong>thorough termite inspection</strong> or <strong>effective termite treatment</strong>, we've got you covered.</>,
    href: '/termite-inspections',
  },
  {
    color: 'hsl(140, 55%, 42%)',
    title: 'Bed Bug Control',
    desc: <>Say goodbye to sleepless nights. Our expert team will <strong>eliminate bed bugs</strong> from your home quickly and effectively.</>,
    href: '/bed-bug-control',
  },
  {
    color: 'hsl(28, 100%, 50%)',
    title: 'Rodent Pest Control',
    desc: <>Mice and rats can cause damage and spread disease. Our <strong>rodent control plans</strong> will remove these unwanted guests and prevent them from coming back.</>,
    href: '/rodent-control',
  },
  {
    color: 'hsl(45, 95%, 52%)',
    title: 'Other Pest Solutions',
    desc: <>From <strong>fleas and ticks</strong> to <strong>wasps and hornets</strong>, and <strong>scorpions</strong>, we provide tailored solutions for a variety of pests that may invade your home.</>,
    href: '/pest-control',
  },
];

const whyCards = [
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Proven-Results.png', title: 'Family-Owned & Trusted Locally', desc: "We're not a big corporation—we're a family-owned business that cares deeply about the well-being of our neighbors in Longview." },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Comprehensive.png', title: 'Licensed & Highly Trained Technicians', desc: 'Our team of certified, insured technicians uses their expertise and cutting-edge methods to resolve pest issues effectively and responsibly.' },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Safety.png', title: 'Pet & Child Friendly Solutions', desc: 'Your family is our top priority. We use products designed to be child and pet friendly while effectively eliminating pests.' },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Guarantee.png', title: 'Custom Treatment Plans', desc: "We understand every home and pest problem is unique. That's why we develop tailored solutions to not only eradicate pests but also prevent their return." },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Super-Powered.png', title: 'Super Powered Guarantee', desc: "Pests persist? No problem. With our Super Powered Guarantee, we provide free re-treatments between regularly scheduled visits, ensuring peace of mind." },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Custom-Plans.png', title: 'Referral Program', desc: 'Get rewarded for your loyalty! Earn money for each new customer you refer who signs up for recurring services.' },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Family-Pets.png', title: 'Trusted Member of NPMA & TPCA', desc: 'As proud members of the National Pest Management Association and the Texas Pest Control Association, we are committed to the highest industry standards.' },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const LongviewTX = () => {
  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", color: 'hsl(20, 40%, 12%)', overflowX: 'hidden' }}>
      <Navbar />
      <main>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        background: `url(/moblie_banner.webp) center/cover no-repeat, hsl(28, 100%, 50%)`,
        paddingTop: '80px',
        paddingBottom: '200px',
        minHeight: '420px',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.18) 1.5px, transparent 1.5px)', backgroundSize: '18px 18px', pointerEvents: 'none' }} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 20px 30px' }}>
          <h1 style={{
            fontFamily: '"Bangers", cursive',
            fontSize: 'clamp(42px, 7vw, 88px)',
            color: 'hsl(45, 95%, 60%)',
            fontStyle: 'italic',
            letterSpacing: '0.05em',
            WebkitTextStroke: '3px #000000',
            textShadow: '3px 3px 0 #000000',
            margin: 0,
            lineHeight: 1.05,
          }}>
            PEST CONTROL SERVICES IN<br />LONGVIEW, TX
          </h1>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
          <img fetchPriority="high" width={1200} height={50} src="/banner-img.png" alt="" style={{ width: '100%', display: 'block' }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          INTRO — image left, text right
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 40px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div style={{ border: '4px solid rgb(255, 213, 39)', borderRadius: '6px', overflow: 'hidden', boxShadow: '8px 8px 0 rgba(0,0,0,0.1)' }}>
            <img
              loading="lazy"
              width={600}
              height={400}
              src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/Exterior-Eve-Pool-scaled-e1746807481885.jpg"
              alt="Pest Control Services in Longview TX"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: '800', marginBottom: '18px', marginTop: 0 }}>
              Local Pest &amp; Termite Control Services in Longview, TX
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              Your home should feel like a safe haven—but pests make that hard to achieve. At{' '}
              <a href="/" style={{ color: '#000', textDecoration: 'underline' }}>Dang Pest Control</a>,
              we offer{' '}
              <a href="/pest-control" style={{ color: '#000', textDecoration: 'underline' }}>expert pest control solutions</a>{' '}
              tailored to your needs, ensuring health, comfort, and the protection of your loved ones. Serving Longview, TX, and surrounding areas, our family-owned, local business is committed to making your life easier with services you can trust. Call us today at{' '}
              <a href="tel:(903) 871-0550" style={{ color: '#000', fontWeight: '700' }}>(903) 871-0550</a>{' '}
              and <a href="/quote" style={{ color: '#000', textDecoration: 'underline' }}>get your quote</a>.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="tel:(903) 871-0550" style={{ padding: '13px 28px', border: '2px solid hsl(20, 40%, 12%)', borderRadius: '50px', fontWeight: '700', color: 'hsl(20, 40%, 12%)', textDecoration: 'none', fontSize: '15px', whiteSpace: 'nowrap' }}>(903) 871-0550</a>
              <a href="/quote" style={{ padding: '13px 28px', background: 'hsl(28, 100%, 50%)', borderRadius: '50px', fontWeight: '700', color: '#fff', textDecoration: 'none', fontSize: '15px', whiteSpace: 'nowrap' }}>Get Your Quote</a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SERVICES WE OFFER — L-bracket cards
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '60px 40px', background: '#f3f3f1' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontWeight: '800', fontSize: 'clamp(24px, 2.5vw, 36px)', textAlign: 'center', marginBottom: '16px', marginTop: 0 }}>
            Services We Offer in Longview
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', textAlign: 'center', marginBottom: '48px', marginTop: 0, maxWidth: '900px', margin: '0 auto 48px' }}>
            Our comprehensive pest control services are designed to target the pests unique to the East Texas environment and prevent their return. Whether you're dealing with dangerous pests like scorpions or disease-carrying mosquitos, our skilled technicians will create a customized treatment plan to solve your problem.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {serviceCards.map((card, i) => (
              <a key={i} href={card.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: '#fff', borderRadius: '4px', padding: '28px 28px 0 28px', position: 'relative' }}>
                  <h3 style={{ fontWeight: '800', fontSize: '20px', marginBottom: '12px', marginTop: 0 }}>{card.title}</h3>
                  <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#444', marginBottom: '24px', marginTop: 0 }}>{card.desc}</p>
                  {/* L-bracket bottom-right */}
                  <div style={{ position: 'relative', height: '12px', marginLeft: '-28px', marginRight: '-28px' }}>
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      right: 0,
                      height: '4px',
                      background: card.color,
                      borderRadius: '0 0 4px 0',
                    }} />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: '4px',
                      height: '40px',
                      background: card.color,
                      transform: 'translateY(0)',
                    }} />
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <a href="/quote" style={{ display: 'inline-block', padding: '14px 40px', background: 'hsl(28, 100%, 50%)', borderRadius: '50px', fontWeight: '700', color: '#fff', textDecoration: 'none', fontSize: '16px' }}>Get Your Quote</a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY CHOOSE DANG PEST CONTROL — 7 cards (4+3)
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '70px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', alignItems: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', margin: 0 }}>Why Choose Dang Pest Control?</h2>
          <p style={{ fontSize: '16px', color: '#444', lineHeight: 1.7, margin: 0 }}>
            When it comes to protecting your home and family, you deserve a service you can rely on. Here's what sets us apart from the rest:
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '20px' }}>
          {whyCards.slice(0, 4).map((card, i) => (
            <div key={i} style={{ background: '#f3f3f1', borderRadius: '8px', padding: '28px 20px' }}>
              <img loading="lazy" width={56} height={56} src={card.icon} alt={card.title} style={{ width: '56px', height: '56px', objectFit: 'contain', marginBottom: '14px', display: 'block' }} />
              <h3 style={{ fontWeight: '800', fontSize: '16px', marginBottom: '10px', marginTop: 0 }}>{card.title}</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#555', margin: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {whyCards.slice(4).map((card, i) => (
            <div key={i} style={{ background: '#f3f3f1', borderRadius: '8px', padding: '28px 20px' }}>
              <img loading="lazy" width={56} height={56} src={card.icon} alt={card.title} style={{ width: '56px', height: '56px', objectFit: 'contain', marginBottom: '14px', display: 'block' }} />
              <h3 style={{ fontWeight: '800', fontSize: '16px', marginBottom: '10px', marginTop: 0 }}>{card.title}</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#555', margin: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROTECT YOUR HOME — text left, dotted image right
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '0 40px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', marginBottom: '20px', marginTop: 0 }}>
              Protect Your Home with Confidence
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '16px', color: '#444', marginTop: 0 }}>
              At Dang Pest Control, we understand that the environment in Longview provides the perfect conditions for pests like termites, rodents, and mosquitos to thrive. Protecting your property from these nuisances means maintaining your family's comfort and health.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              Whether you need to eliminate disease-carrying pests, preserve your property value, or simply enjoy your home worry-free, we'll design an effective plan tailored to your needs. Our proactive, environmentally protective approach ensures long-term solutions—not just temporary fixes. Located in Tyler, TX, Dang Pest Control serves clients throughout the area, including Longview,{' '}
              <a href="/jacksonville-tx" style={{ color: '#000', textDecoration: 'underline' }}>Jacksonville</a>,{' '}
              <a href="/lindale-tx" style={{ color: '#000', textDecoration: 'underline' }}>Lindale</a>,{' '}
              <a href="/bullard-tx" style={{ color: '#000', textDecoration: 'underline' }}>Bullard</a>,{' '}
              <a href="/whitehouse-tx" style={{ color: '#000', textDecoration: 'underline' }}>Whitehouse</a>,
              and more. Call us today at{' '}
              <a href="tel:(903) 871-0550" style={{ color: '#000', fontWeight: '700' }}>(903) 871-0550</a>{' '}
              and <a href="/quote" style={{ color: '#000', textDecoration: 'underline' }}>get your quote</a>.
            </p>
            <a href="/quote" style={{ display: 'inline-block', padding: '14px 40px', background: 'hsl(28, 100%, 50%)', borderRadius: '50px', fontWeight: '700', color: '#fff', textDecoration: 'none', fontSize: '16px' }}>Get Your Quote</a>
          </div>

          <div style={{ position: 'relative', padding: '20px' }}>
            <div style={{ position: 'absolute', inset: 0, background: '#fff', backgroundImage: 'radial-gradient(circle, #d0d0d0 1px, transparent 1px)', backgroundSize: '22px 22px', borderRadius: '8px', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1, border: '4px solid rgb(255, 213, 39)', borderRadius: '6px', overflow: 'hidden', boxShadow: '8px 8px 0 rgba(0,0,0,0.1)' }}>
              <img
                loading="lazy"
                width={600}
                height={400}
                src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/Interior-Pantry-Flashlight-with-Sprayer-scaled-e1746807757708.jpg"
                alt="Pest and Termite Control Services in Longview TX"
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default LongviewTX;
