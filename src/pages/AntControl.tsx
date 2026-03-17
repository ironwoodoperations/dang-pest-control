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
    desc: 'Our skilled technicians will assess your property to identify the type of ants and locate their nests and entry points. We take an Integrated Pest Management (IPM) approach, looking at environmental and structural factors that contribute to the infestation. Ants that we commonly deal with in East Texas include Fire Ants, Carpenter Ants, Pharaoh Ants, Crazy Ants, Odorous House Ants, Rover Ants, and more!',
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img1.png',
  },
  {
    num: 'STEP 2',
    title: 'Customized Treatment Plan',
    desc: 'We create a tailored Integrated Pest Management Plan to target your specific ant problem. Our treatments include applying regulated insecticides to nests, entry points, and affected areas—both inside your home and throughout your outdoor space. These products are designed to be family and pet friendly, so you can rest easy.',
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img2.png',
  },
  {
    num: 'STEP 3',
    title: 'Long-Term Elimination',
    desc: "Our treatments don't just stop at the surface. Ants carry the product back to their colony, effectively eliminating the entire population. This method is far more effective than spot treatments that only handle visible problem areas.",
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img3.png',
  },
  {
    num: 'STEP 4',
    title: 'Ongoing Monitoring & Prevention',
    desc: 'We monitor the effectiveness of the treatment, evaluate the results, and provide preventative care tips to ensure your property remains ant-free.',
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img4.png',
  },
];

const whyCards = [
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Proven-Results.png',
    title: 'Proven Results',
    desc: 'We deliver results you can count on. Our expert treatments ensure thorough elimination of ants and safeguard your property from future infestations.',
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Comprehensive.png',
    title: 'Comprehensive Coverage',
    desc: 'We treat your entire yard, beds, and indoor spaces to create a no-ant zone. This holistic approach ensures every corner of your property is protected.',
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Safety.png',
    title: 'Family First',
    desc: 'Our insecticides are thoroughly regulated and can be used around your home, pets, and children. We uphold environmentally protective practices to give you peace of mind.',
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Guarantee.png',
    title: 'Ant-Free Guarantee',
    desc: 'We stand by our work with an ant-free guarantee. Enjoy your home and outdoor space without worrying about invasive ants.',
  },
];

const faqs = [
  {
    q: '1. Why are ants so bad in East Texas?',
    a: 'East Texas humidity, pine trees, and long warm seasons create the perfect breeding ground for ants. In Tyler and surrounding communities, we commonly see fire ants, carpenter ants, and odorous house ants thriving almost year-round.',
  },
  {
    q: '2. Are fire ants dangerous in Tyler yards?',
    a: 'Yes. Fire ants are extremely common in East Texas lawns and can deliver painful stings, especially to children and pets. Their mounds often appear after rainstorms, which we get plenty of here in the Piney Woods.',
  },
  {
    q: '3. Why do ants keep coming back inside my home?',
    a: "Ant colonies live outside but send scouts indoors for moisture and food. Because of our East Texas humidity, ants can stay active most of the year. That's why recurring pest control is the most effective solution.",
  },
  {
    q: '4. When is ant season in East Texas?',
    a: 'While spring and summer are peak seasons, ants in Tyler can remain active nearly year-round due to mild winters.',
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const AntControl = () => {
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
            ANT CONTROL
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
              src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/carpenter-ant.jpg"
              alt="Carpenter Ant Control Services Tyler TX"
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
              ANTS
            </p>
            <h2 style={{
              fontSize: 'clamp(26px, 2.8vw, 38px)',
              fontWeight: '800',
              marginBottom: '18px',
              marginTop: 0,
            }}>
              Ant Control Services
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              Ant infestations can disrupt your daily life and damage your property. Don't let them take over
              your home or yard. At{' '}
              <a href="/" style={{ color: '#000', textDecoration: 'underline' }}>Dang Pest Control</a>,
              we specialize in identifying, treating, and preventing ant infestations—giving you back your
              peace of mind. We serve Tyler, TX, and the surrounding areas. Call us today at{' '}
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
            Our Ant Control Process
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '50px', marginTop: 0 }}>
            Here's what you can expect from our ant pest control services:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
            {steps.map((step, i) => (
              <div
                key={i}
                style={{
                  background: '#fff',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{
                  padding: '24px 24px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontFamily: '"Bangers", cursive',
                      color: STEP_COLORS[i],
                      fontSize: '15px',
                      letterSpacing: '0.12em',
                      fontStyle: 'italic',
                      margin: '0 0 4px 0',
                    }}>
                      {step.num}
                    </p>
                    <h3 style={{ fontWeight: '800', fontSize: '17px', margin: 0 }}>{step.title}</h3>
                  </div>
                  <img
                    src={step.icon}
                    alt={step.title}
                    style={{
                      width: '58px',
                      height: '58px',
                      objectFit: 'contain',
                      background: STEP_COLORS[i],
                      borderRadius: '6px',
                      padding: '8px',
                      flexShrink: 0,
                    }}
                  />
                </div>
                <div style={{
                  flex: 1,
                  borderLeft: `4px solid ${STEP_COLORS[i]}`,
                  margin: '16px 24px 0 24px',
                  paddingLeft: '14px',
                  paddingBottom: '24px',
                }}>
                  <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#555', margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
                <div style={{ height: '5px', background: STEP_COLORS[i], marginTop: 'auto' }} />
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            <a
              href="/quote"
              style={{
                display: 'inline-block',
                padding: '16px 52px',
                background: 'hsl(28, 100%, 50%)',
                borderRadius: '50px',
                fontWeight: '700',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '16px',
              }}
            >
              Get Your Quote
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FIRE ANT TREATMENT & PREVENTION
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: 'white', padding: '70px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontWeight: '800', fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: '20px', marginTop: 0 }}>
            Fire Ant Treatment & Prevention
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', marginBottom: '16px', marginTop: 0 }}>
            At Dang Pest Control, we understand the dangers and disruptions fire ants can bring to your home and outdoor spaces. Their bites and stings can cause significant pain, itching, swelling, and even allergic reactions, such as dizziness, nausea, or difficulty breathing. If you experience an allergic reaction from a fire ant bite, seek emergency medical care immediately.
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', marginBottom: '16px', marginTop: 0 }}>
            Beyond their bites, fire ants can pose serious risks to your home. They are notorious for moving into walls, roofs, and floors, often causing electrical malfunctions by invading air conditioners, telephone wiring, and other machinery. These malfunctions increase the risk of financial damage and even potential fire hazards.
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', marginBottom: '16px', marginTop: 0 }}>
            With Dang Pest Control's professional ant control treatments, you'll regain your home and yard as a safe space, free from fire ants. Our advanced treatments target nests as well as problem areas. We apply solutions strategically, allowing ants to carry the product back to their colonies. This process eradicates the entire population, providing a far more effective solution than spot treatments or DIY methods that only address visible issues. Choosing Dang Pest Control means partnering with experienced professionals who save your time and energy, allowing you to fully enjoy your outdoor space without worrying about pests.
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', marginBottom: '16px', marginTop: 0 }}>
            Our pest management strategies are tailored to each client's specific needs, backed by our commitment to environmentally responsible practices. Our technicians specialize in Integrated Pest Management (IPM), which addresses root causes of pest issues, not just surface-level problems.
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', marginBottom: '32px', marginTop: 0 }}>
            Don't wait for fire ants to take over your property. Trust our ant-free guarantee and regain your peace of mind. Get your quote from Dang Pest Control today and protect your home, family, and outdoor spaces.
          </p>
          <div style={{ textAlign: 'center' }}>
            <a
              href="/quote"
              style={{
                display: 'inline-block',
                padding: '16px 52px',
                background: 'hsl(28, 100%, 50%)',
                borderRadius: '50px',
                fontWeight: '700',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '16px',
              }}
            >
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
              <img
                src={card.icon}
                alt={card.title}
                style={{ width: '56px', height: '56px', objectFit: 'contain', marginBottom: '14px', display: 'block' }}
              />
              <h3 style={{ fontWeight: '800', fontSize: '16px', marginBottom: '10px', marginTop: 0 }}>{card.title}</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#555', margin: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MORE THAN ANT CONTROL — text left, dotted image right
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '0 40px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', marginBottom: '20px', marginTop: 0 }}>
              More Than Just Ant Control
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              At Dang Pest Control, we also offer services to treat{' '}
              <a href="/spider-control" style={{ color: '#000', textDecoration: 'underline' }}>spiders</a>,{' '}
              <a href="/wasp-hornet-control" style={{ color: '#000', textDecoration: 'underline' }}>wasps and hornets</a>,{' '}
              <a href="/scorpion-control" style={{ color: '#000', textDecoration: 'underline' }}>scorpions</a>,{' '}
              <a href="/rodent-control" style={{ color: '#000', textDecoration: 'underline' }}>rodents</a>,{' '}
              <a href="/mosquito-control" style={{ color: '#000', textDecoration: 'underline' }}>mosquitos</a>,{' '}
              <a href="/flea-tick-control" style={{ color: '#000', textDecoration: 'underline' }}>fleas and ticks</a>,{' '}
              <a href="/roach-control" style={{ color: '#000', textDecoration: 'underline' }}>cockroaches</a>,{' '}
              <a href="/bed-bug-control" style={{ color: '#000', textDecoration: 'underline' }}>bed bugs</a>,
              and more. We even provide{' '}
              <a href="/termite-inspections" style={{ color: '#000', textDecoration: 'underline' }}>termite inspections</a>{' '}
              and{' '}
              <a href="/termite-control" style={{ color: '#000', textDecoration: 'underline' }}>termite treatments</a>.
            </p>
            <a
              href="/quote"
              style={{
                display: 'inline-block',
                padding: '14px 40px',
                background: 'hsl(28, 100%, 50%)',
                borderRadius: '50px',
                fontWeight: '700',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '16px',
              }}
            >
              Get Your Quote
            </a>
          </div>

          <div style={{ position: 'relative', padding: '20px' }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: '#fff',
              backgroundImage: 'radial-gradient(circle, #d0d0d0 1px, transparent 1px)',
              backgroundSize: '22px 22px',
              borderRadius: '8px',
              zIndex: 0,
            }} />
            <div style={{
              position: 'relative',
              zIndex: 1,
              border: '4px solid rgb(255, 213, 39)',
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: '8px 8px 0 rgba(0,0,0,0.1)',
            }}>
              <img
                src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/fire-ants.jpg"
                alt="Fire Ant Control Services in Tyler TX"
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ANT-FREE CTA — orange diagonal with clouds
      ══════════════════════════════════════════════════════ */}
      <style>{`
        .ant-cta-phone { background: hsl(28,100%,50%) !important; color: #fff !important; border: 2px solid hsl(28,100%,50%) !important; }
        .ant-cta-phone:hover { background: #fff !important; color: hsl(20,40%,12%) !important; }
        .ant-cta-quote { background: #fff !important; color: hsl(28,100%,50%) !important; border: 2px solid #fff !important; }
        .ant-cta-quote:hover { background: hsl(45,95%,52%) !important; color: #fff !important; }
      `}</style>
      <section style={{ position: 'relative', background: 'hsl(28, 100%, 50%)', padding: '100px 40px 260px', clipPath: 'polygon(0 0, 100% 8%, 100% 100%, 0 100%)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.12) 1.5px, transparent 1.5px)', backgroundSize: '18px 18px', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: '"Bangers", cursive', fontSize: 'clamp(36px, 5vw, 60px)', fontStyle: 'italic', color: 'hsl(45, 95%, 60%)', letterSpacing: '0.04em', marginBottom: '20px', marginTop: 0, lineHeight: 1.1, WebkitTextStroke: '3px #000000', textShadow: '3px 3px 0 #000000' }}>
            ANT-FREE LIVING STARTS HERE
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(0,0,0,0.72)', marginBottom: '28px', marginTop: 0 }}>
            Don't wait—restore comfort and peace to your home with professional ant control services from Dang Pest Control. Located in Tyler, TX, we proudly serve the surrounding areas, including{' '}
            <a href="/longview-tx" style={{ color: '#000' }}>Longview</a>,{' '}
            <a href="/jacksonville-tx" style={{ color: '#000' }}>Jacksonville</a>,{' '}
            <a href="/lindale-tx" style={{ color: '#000' }}>Lindale</a>,{' '}
            <a href="/bullard-tx" style={{ color: '#000' }}>Bullard</a>,{' '}
            <a href="/whitehouse-tx" style={{ color: '#000' }}>Whitehouse</a>, and more. Call us today at{' '}
            <a href="tel:(903) 871-0550" style={{ color: '#000', fontWeight: '700' }}>(903) 871-0550</a> and{' '}
            <a href="/quote" style={{ color: '#000' }}>get your quote</a>.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="tel:(903) 871-0550" className="ant-cta-phone" style={{ padding: '13px 28px', borderRadius: '50px', fontWeight: '700', textDecoration: 'none', fontSize: '15px', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>(903) 871-0550</a>
            <a href="/quote" className="ant-cta-quote" style={{ padding: '13px 28px', borderRadius: '50px', fontWeight: '700', textDecoration: 'none', fontSize: '15px', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>Get Your Quote</a>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
          <img src="/banner-img.png" alt="" style={{ width: '100%', display: 'block' }} />
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
      <section
        style={{
          position: 'relative',
          background: 'hsl(48, 100%, 50%)',
          padding: '100px 40px 90px',
          clipPath: 'polygon(0 9%, 100% 0, 100% 100%, 0 100%)',
          marginTop: '-30px',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.12) 1.5px, transparent 1.5px)',
          backgroundSize: '18px 18px',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '820px',
          margin: '0 auto',
          paddingTop: '20px',
        }}>
          <h2 style={{
            fontFamily: '"Bangers", cursive',
            fontSize: 'clamp(42px, 6vw, 76px)',
            fontStyle: 'italic',
            color: 'hsl(20, 40%, 12%)',
            letterSpacing: '0.04em',
            marginBottom: '24px',
            marginTop: 0,
            lineHeight: 1.1,
            textShadow: '2px 2px 0 rgba(0,0,0,0.15)',
          }}>
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

export default AntControl;
