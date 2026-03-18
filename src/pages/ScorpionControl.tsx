import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ─── DATA ────────────────────────────────────────────────────────────────────

const STEP_COLORS = [
  'hsl(28, 100%, 50%)',
  'hsl(45, 95%, 52%)',
  'hsl(185, 65%, 42%)',
  'hsl(140, 55%, 42%)',
];

const steps = [
  {
    num: 'STEP 1',
    title: 'Inspection & Identification',
    desc: 'Our experienced technicians will carefully inspect your home and yard, identifying scorpions and uncovering the sources of infestation. This critical step allows us to locate hiding spots and entry points, ensuring complete and targeted treatment.',
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img1.png',
  },
  {
    num: 'STEP 2',
    title: 'Integrated Pest Management Plan',
    desc: "Using a science-backed approach, we craft a tailored Integrated Pest Management Plan (IPMP) to address your unique circumstances. Our treatment doesn't end with spraying; rather, we combine eco-conscious pest control solutions with preventative measures for long-term results.",
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img2.png',
  },
  {
    num: 'STEP 3',
    title: 'Long-Term Elimination',
    desc: "We don't stop after treatment. Our team will ensure your home remains free of scorpions. Plus, we provide expert advice to help prevent future infestations.",
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img3.png',
  },
  {
    num: 'STEP 4',
    title: 'Ongoing Monitoring & Prevention',
    desc: 'We monitor the effectiveness of the treatment, evaluate the results, and provide preventative care tips to ensure your property remains free of scorpions.',
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img4.png',
  },
];

const whyCards = [
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Proven-Results.png',
    title: 'Expertise You Can Count On',
    desc: 'With experience and membership with the National Pest Management Association (NPMA) and Texas Pest Control Association (TPCA), Dang Pest Control is recognized for excellence in the pest control industry.',
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Comprehensive.png',
    title: 'Eco-Conscious Methods',
    desc: 'Our Integrated Pest Management approach prioritizes environmentally protective strategies, making us the responsible choice for pest control.',
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Safety.png',
    title: 'Reliable Solutions',
    desc: "We don't believe in temporary fixes. Our tailored treatments ensure long-lasting relief from scorpions and other pest issues.",
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Guarantee.png',
    title: 'Local Expertise, Trusted Results',
    desc: 'Based in Tyler, TX, we proudly serve the surrounding communities. We know the scorpion threats specific to East Texas and how to fight them effectively.',
  },
];

const faqs = [
  {
    q: '1. Are scorpions common in East Texas?',
    a: 'While more common in West Texas, scorpions — including Texas bark scorpions — are found in Tyler and surrounding wooded areas, especially near stacked wood and rock beds.',
  },
  {
    q: '2. When are scorpions most active in Tyler?',
    a: 'Scorpions are most active during hot summer months but may seek shelter indoors during heavy rains or cooler weather shifts.',
  },
  {
    q: '3. Are scorpion stings dangerous?',
    a: 'Most scorpion stings are painful but not life-threatening. However, children and pets may experience stronger reactions.',
  },
  {
    q: '4. How do scorpions get inside homes?',
    a: 'They squeeze through small foundation cracks, under doors, and around utility lines — common in older East Texas homes.',
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const ScorpionControl = () => {
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
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.18) 1.5px, transparent 1.5px)',
          backgroundSize: '18px 18px',
          pointerEvents: 'none',
        }} />

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 20px 30px' }}>
          <h1 style={{
            fontFamily: '"Bangers", cursive',
            fontSize: 'clamp(56px, 9vw, 100px)',
            color: 'hsl(45, 95%, 60%)',
            fontStyle: 'italic',
            letterSpacing: '0.05em',
            WebkitTextStroke: '3px #000000',
            textShadow: '3px 3px 0 #000000',
            margin: 0,
            lineHeight: 1,
          }}>
            SCORPION CONTROL
          </h1>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
          <img src="/banner-img.png" alt="" style={{ width: '100%', display: 'block' }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          INTRO — image left, text right
      ══════════════════════════════════════════════════════ */}
      <section style={{
        padding: '80px 40px 60px',
        maxWidth: '1200px',
        margin: '0 auto',
        background: '#ffffff',
        backgroundImage: 'radial-gradient(circle, #d0d0d0 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
        }}>
          <div style={{
            border: '4px solid rgb(255, 213, 39)',
            borderRadius: '6px',
            overflow: 'hidden',
            boxShadow: '8px 8px 0 rgba(0,0,0,0.1)',
          }}>
            <img
              src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/striped-bark-scorpion-1.jpg"
              alt="Scorpion Control Services in Tyler TX"
              style={{ width: '100%', display: 'block' }}
            />
          </div>

          <div>
            <p style={{
              fontFamily: '"Bangers", cursive',
              color: 'hsl(28, 100%, 50%)',
              fontSize: '18px',
              letterSpacing: '0.12em',
              fontStyle: 'italic',
              marginBottom: '6px',
              marginTop: 0,
            }}>
              SCORPIONS
            </p>
            <h2 style={{
              fontSize: 'clamp(26px, 2.8vw, 38px)',
              fontWeight: '800',
              marginBottom: '18px',
              marginTop: 0,
            }}>
              Scorpion Control Services
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              When scorpions invade your home or yard, they aren't just a nuisance—they can present a serious
              hazard to your family, pets, and property. At{' '}
              <a href="/" style={{ color: '#000', textDecoration: 'underline' }}>Dang Pest Control</a>,
              we specialize in delivering comprehensive scorpion pest control services designed to identify the
              root cause of the problem, eliminate scorpions effectively, and provide lasting prevention
              strategies. We serve Tyler, TX, and the surrounding areas. Call us today at{' '}
              <a href="tel:(903) 871-0550" style={{ color: '#000', fontWeight: '700' }}>(903) 871-0550</a>{' '}
              and{' '}
              <a href="/quote" style={{ color: '#000', textDecoration: 'underline' }}>get your quote</a>.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href="tel:(903) 871-0550"
                style={{
                  padding: '13px 28px',
                  border: '2px solid hsl(20, 40%, 12%)',
                  borderRadius: '50px',
                  fontWeight: '700',
                  color: 'hsl(20, 40%, 12%)',
                  textDecoration: 'none',
                  fontSize: '15px',
                  whiteSpace: 'nowrap',
                }}
              >
                (903) 871-0550
              </a>
              <a
                href="/quote"
                style={{
                  padding: '13px 28px',
                  background: 'hsl(28, 100%, 50%)',
                  borderRadius: '50px',
                  fontWeight: '700',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '15px',
                  whiteSpace: 'nowrap',
                }}
              >
                Get Your Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TREATMENT PROCESS — gray bg, 2×2 step grid
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#f1f1ef', padding: '70px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontWeight: '800',
            fontSize: 'clamp(26px, 3vw, 40px)',
            marginBottom: '10px',
            marginTop: 0,
          }}>
            Our Scorpion Control Process
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '50px', marginTop: 0 }}>
            Here's what you can expect from our scorpion pest control services:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
            {steps.map((step, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '24px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: '"Bangers", cursive', color: STEP_COLORS[i], fontSize: '15px', letterSpacing: '0.12em', fontStyle: 'italic', margin: '0 0 4px 0' }}>
                      {step.num}
                    </p>
                    <h3 style={{ fontWeight: '800', fontSize: '17px', margin: 0 }}>{step.title}</h3>
                  </div>
                  <img src={step.icon} alt={step.title} style={{ width: '58px', height: '58px', objectFit: 'contain', background: STEP_COLORS[i], borderRadius: '6px', padding: '8px', flexShrink: 0 }} />
                </div>
                <div style={{ flex: 1, borderLeft: `4px solid ${STEP_COLORS[i]}`, margin: '16px 24px 0 24px', paddingLeft: '14px', paddingBottom: '24px' }}>
                  <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#555', margin: 0 }}>{step.desc}</p>
                </div>
                <div style={{ height: '5px', background: STEP_COLORS[i], marginTop: 'auto' }} />
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            <a href="/quote" style={{ display: 'inline-block', padding: '16px 52px', background: 'hsl(28, 100%, 50%)', borderRadius: '50px', fontWeight: '700', color: '#fff', textDecoration: 'none', fontSize: '16px' }}>
              Get Your Quote
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY CHOOSE US — white bg, 4 gray cards
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '70px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', marginBottom: '36px', marginTop: 0 }}>
          Why Choose Us?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {whyCards.map((card, i) => (
            <div key={i} style={{ background: '#f3f3f1', borderRadius: '8px', padding: '28px 20px' }}>
              <img src={card.icon} alt={card.title} style={{ width: '56px', height: '56px', objectFit: 'contain', marginBottom: '14px', display: 'block' }} />
              <h3 style={{ fontWeight: '800', fontSize: '16px', marginBottom: '10px', marginTop: 0 }}>{card.title}</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#555', margin: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 40px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', marginBottom: '20px', marginTop: 0 }}>
              Don't Wait—Protect Your Home Today!
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              Located in Tyler, TX, Dang Pest Control serves clients across{' '}
              <a href="/longview-tx" style={{ color: '#000', textDecoration: 'underline' }}>Longview</a>,{' '}
              <a href="/jacksonville-tx" style={{ color: '#000', textDecoration: 'underline' }}>Jacksonville</a>,{' '}
              <a href="/lindale-tx" style={{ color: '#000', textDecoration: 'underline' }}>Lindale</a>,{' '}
              <a href="/bullard-tx" style={{ color: '#000', textDecoration: 'underline' }}>Bullard</a>,{' '}
              <a href="/whitehouse-tx" style={{ color: '#000', textDecoration: 'underline' }}>Whitehouse</a>, and neighboring areas. From identifying scorpions to eliminating and preventing infestations, we deliver results you can trust. Call us today at{' '}
              <a href="tel:(903) 871-0550" style={{ color: '#000', fontWeight: '700' }}>(903) 871-0550</a>{' '}
              and <a href="/quote" style={{ color: '#000', textDecoration: 'underline' }}>get your quote</a>.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="tel:(903) 871-0550" style={{ padding: '13px 28px', border: '2px solid hsl(20, 40%, 12%)', borderRadius: '50px', fontWeight: '700', color: 'hsl(20, 40%, 12%)', textDecoration: 'none', fontSize: '15px', whiteSpace: 'nowrap' }}>(903) 871-0550</a>
              <a href="/quote" style={{ padding: '13px 28px', background: 'hsl(28, 100%, 50%)', borderRadius: '50px', fontWeight: '700', color: '#fff', textDecoration: 'none', fontSize: '15px', whiteSpace: 'nowrap' }}>Get Your Quote</a>
            </div>
          </div>
          <div style={{ position: 'relative', padding: '20px' }}>
            <div style={{ position: 'absolute', inset: 0, background: '#fff', backgroundImage: 'radial-gradient(circle, #d0d0d0 1px, transparent 1px)', backgroundSize: '22px 22px', borderRadius: '8px', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1, border: '4px solid rgb(255, 213, 39)', borderRadius: '6px', overflow: 'hidden', boxShadow: '8px 8px 0 rgba(0,0,0,0.1)' }}>
              <img src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/striped-bark-scorpion-2.jpg" alt="Striped Bark Scorpion Control Services in Tyler TX" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '70px 40px 80px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', marginBottom: '36px', marginTop: 0 }}>
          Frequently Asked Questions
        </h2>
        {faqs.map((faq, i) => (
          <div key={i} style={{ marginBottom: '28px' }}>
            <h3 style={{ fontWeight: '700', fontSize: '18px', marginBottom: '8px', marginTop: 0 }}>{faq.q}</h3>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#444', margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </section>

      {/* ══════════════════════════════════════════════════════
          EAST TEXAS CTA — yellow diagonal section
      ══════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', background: 'hsl(48, 100%, 50%)', padding: '100px 40px 90px', clipPath: 'polygon(0 9%, 100% 0, 100% 100%, 0 100%)', marginTop: '-30px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.12) 1.5px, transparent 1.5px)', backgroundSize: '18px 18px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '820px', margin: '0 auto', paddingTop: '20px' }}>
          <h2 style={{ fontFamily: '"Bangers", cursive', fontSize: 'clamp(42px, 6vw, 76px)', fontStyle: 'italic', color: 'hsl(20, 40%, 12%)', letterSpacing: '0.04em', marginBottom: '24px', marginTop: 0, lineHeight: 1.1, textShadow: '2px 2px 0 rgba(0,0,0,0.15)' }}>
            PROTECT YOUR EAST TEXAS<br />HOME TODAY
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(0,0,0,0.72)', marginBottom: '12px', marginTop: 0 }}>
            East Texas heat, humidity, and piney woods conditions create the perfect environment for pests
            year-round. Don't wait until a small problem becomes a major infestation.
          </p>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(0,0,0,0.72)', margin: 0 }}>
            Dang Pest Control provides safe, effective, and recurring protection for homes across Tyler,
            Whitehouse, Bullard, Lindale, Flint, and surrounding communities.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ScorpionControl;
