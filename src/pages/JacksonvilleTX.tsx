import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ─── DATA ────────────────────────────────────────────────────────────────────

const services = [
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/General.jpg', title: 'General\nPest Control', desc: 'Reliable solutions for all common household pests.', href: '/pest-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/ant.jpg', title: 'Ant\nPest Control', desc: 'Keep ants out of your home for good.', href: '/ant-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/spider.jpg', title: 'Spider\nPest Control', desc: 'Removing dangerous and invasive spiders effectively.', href: '/spider-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Wasps-Hornet.jpg', title: 'Wasp & Hornet\nPest Control', desc: 'Fast, effective removal of nests near your home.', href: '/wasp-hornet-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Scorpion.jpg', title: 'Scorpion\nPest Control', desc: 'Specialized methods to handle scorpion infestations.', href: '/scorpion-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Rodent.jpg', title: 'Rodent\nPest Control', desc: 'Comprehensive strategies to protect your property from mice.', href: '/rodent-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Mosquito.jpg', title: 'Mosquito\nPest Control', desc: 'Enjoy your outdoor space without pesky mosquito bites.', href: '/mosquito-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Flea.jpg', title: 'Flea & Tick\nPest Control', desc: 'Protect your home and pets from these annoying pests.', href: '/flea-tick-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Roach.jpg', title: 'Roach\nPest Control', desc: 'Eliminate disease-carrying cockroaches from your home.', href: '/roach-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Bed-Bug.jpg', title: 'Bed Bug\nPest Control', desc: 'Thorough treatments to ensure your beds are pest-free.', href: '/bed-bug-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Termite.jpg', title: 'Termite Control', desc: 'Prevent damage and protect your property value with effective termite treatments.', href: '/termite-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Termite.jpg', title: 'Termite Inspections', desc: 'Early detection and prevention of costly termite damage.', href: '/termite-inspections' },
];

const whyCards = [
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Proven-Results.png', title: 'Expertise You Can Rely On', desc: 'Our licensed and highly trained technicians bring years of experience in pest control. Backed by membership in the National Pest Management Association (NPMA) and the Texas Pest Control Association (TPCA), we promise professional, effective services every time.' },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Comprehensive.png', title: 'Family & Pet Friendly Treatments', desc: 'Your family is our top priority. We use environmentally friendly products and methods to eliminate pests without putting your loved ones or pets at risk.' },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Safety.png', title: 'Custom Solutions for Every Home', desc: "Every pest problem is unique. That's why we create customized treatment plans to not only eliminate existing pests but prevent future infestations." },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Guarantee.png', title: 'Super Powered Guarantee', desc: "If pests persist between regularly scheduled treatments, we'll re-treat your home for free. That's our promise to keep your home pest-free—no excuses." },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Super-Powered.png', title: 'Referral Program', desc: 'Love our service? Refer friends or family and earn money for every customer who signs up for recurring services!' },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Custom-Plans.png', title: 'Preserving Property Value', desc: 'By controlling pests like termites and rodents, we help protect your property\'s value and prevent costly damage before it happens.' },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const JacksonvilleTX = () => {
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
            PEST CONTROL SERVICES IN<br />JACKSONVILLE, TX
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
              src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/Exterior-Flow-Zone-Sprayer-scaled-e1746808085557.jpg"
              alt="Pest Control Technician Providing Services in Jacksonville TX"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: '800', marginBottom: '18px', marginTop: 0 }}>
              Professional Pest &amp; Termite Control Services in Jacksonville, TX
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              East Texas may be beautiful, but it's also the perfect environment for pests to thrive.{' '}
              <a href="/" style={{ color: '#000', textDecoration: 'underline' }}>Dang Pest Control</a>{' '}
              is here to take care of the problem once and for all. Our experienced technicians use effective treatments to eliminate pests and prevent their return. Serving Jacksonville, TX, and surrounding areas, our family-owned, local business is committed to making your life easier with services you can trust. Call us today at{' '}
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
          OUR SERVICES INCLUDE
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '60px 40px 0', background: '#f3f3f1' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontWeight: '800', fontSize: 'clamp(24px, 2.5vw, 36px)', textAlign: 'center', marginBottom: '40px', marginTop: 0 }}>
            Our Services Include
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px 30px' }}>
            {services.map((s, i) => (
              <a key={i} href={s.href} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <img loading="lazy" width={120} height={120} src={s.img} alt={s.title.replace('\n', ' ')} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '4px', marginBottom: '14px', display: 'block' }} />
                <h3 style={{ fontWeight: '800', fontSize: '16px', marginBottom: '8px', marginTop: 0, lineHeight: 1.3 }}>
                  {s.title.split('\n').map((line, j) => <span key={j}>{line}{j === 0 && s.title.includes('\n') ? <br /> : ''}</span>)}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#555', margin: 0 }}>{s.desc}</p>
              </a>
            ))}
          </div>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', textAlign: 'center', marginTop: '40px', marginBottom: '28px' }}>
            With our Integrated Pest Management Plans, we go beyond short-term fixes. By identifying environmental factors and pest habits, we tailor sustainable solutions to keep your home pest-free.
          </p>
          <div style={{ textAlign: 'center', paddingBottom: '60px' }}>
            <a href="/quote" style={{ display: 'inline-block', padding: '14px 40px', background: 'hsl(28, 100%, 50%)', borderRadius: '50px', fontWeight: '700', color: '#fff', textDecoration: 'none', fontSize: '16px' }}>Get Your Quote</a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY CHOOSE DANG PEST CONTROL — 6 cards
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '70px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', alignItems: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', margin: 0 }}>Why Choose Dang Pest Control?</h2>
          <p style={{ fontSize: '16px', color: '#444', lineHeight: 1.7, margin: 0 }}>
            When it comes to protecting your property and loved ones, trust matters. Here's why homeowners and property managers across Jacksonville, TX, choose Dang Pest Control:
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
          CONTACT TODAY — text left, dotted image right
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '0 40px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', marginBottom: '20px', marginTop: 0 }}>
              Contact Dang Pest Control Today
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              Don't spend another day worrying about pests in your home. Whether you need a one-time treatment or long-term prevention, Dang Pest Control has you covered. Located in Tyler, TX, we proudly serve the surrounding areas, including Jacksonville,{' '}
              <a href="/longview-tx" style={{ color: '#000', textDecoration: 'underline' }}>Longview</a>,{' '}
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
                src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/Exterior-Solo-Spreader-scaled-e1746808147308.jpg"
                alt="Home Pest and Termite Control in Jacksonville TX"
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

export default JacksonvilleTX;
