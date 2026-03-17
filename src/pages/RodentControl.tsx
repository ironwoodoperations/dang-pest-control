import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ─── DATA ────────────────────────────────────────────────────────────────────

const STEP_COLORS = [
  'hsl(28, 100%, 50%)',
  'hsl(45, 95%, 52%)',
  'hsl(185, 65%, 42%)',
  'hsl(140, 55%, 42%)',
  'hsl(280, 55%, 45%)',
];

const steps = [
  {
    num: 'STEP 1',
    title: 'Thorough Inspection',
    desc: 'Our technicians carefully inspect your property to identify signs of infestation, entry points, and rodent activity.',
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img1.png',
  },
  {
    num: 'STEP 2',
    title: 'Integrated Pest Management (IPM) Plan',
    desc: 'We customize a strategy to address your rodent issue at its root with environmentally protective methods. This includes recommendations for exclusion work and customer-specific action steps.',
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img2.png',
  },
  {
    num: 'STEP 3',
    title: 'Effective Treatment',
    desc: 'We use a combination of exclusion, baiting, trapping, and other advanced methods to remove the infestation.',
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Process-img.png',
  },
  {
    num: 'STEP 4',
    title: 'Monitoring & Evaluation',
    desc: "Rodent control doesn't stop at eradication. We continuously monitor to ensure successful results and adapt your plan if needed.",
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img4.png',
  },
  {
    num: 'STEP 5',
    title: 'Preventative Care',
    desc: 'Our comprehensive service includes guidance on maintaining a rodent-free environment, from sealing up entry points to minimizing attractants.',
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img3.png',
  },
];

const whyCards = [
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Proven-Results.png',
    title: 'Experienced Professionals',
    desc: 'We are members of the National Pest Management Association (NPMA) and the Texas Pest Control Association (TPCA), so you can trust that our technicians meet the highest standards of quality.',
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Comprehensive.png',
    title: 'Comprehensive Rodent Management',
    desc: "Rodents are more than nuisances—they're destructive and dangerous. That's why we perform a full site evaluation and implement strategies beyond quick fixes, ensuring lasting protection.",
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Safety.png',
    title: 'Local Expertise',
    desc: 'Based in Tyler, TX, we know the common rodent threats in our area—including Roof Rats, Norway Rats, and House Mice—and how to fight them effectively.',
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Guarantee.png',
    title: 'Comprehensive Approach',
    desc: 'Our Integrated Pest Management approach prioritizes environmentally friendly solutions while effectively eliminating rodents from your property—we\'re not just a "spray and go" company.',
  },
];

const faqs = [
  {
    q: '1. Are rodents common in East Texas homes?',
    a: 'Yes. Older homes in Tyler, crawl spaces, and wooded properties provide easy access points for mice and rats.',
  },
  {
    q: '2. How small of an opening can a mouse fit through?',
    a: 'A mouse can squeeze through a hole the size of a dime. In East Texas homes with pier-and-beam foundations, this is especially common.',
  },
  {
    q: '3. When are rodents most active in Tyler?',
    a: 'Rodents seek shelter during colder months but can remain active year-round here due to mild winters.',
  },
  {
    q: '4. What attracts rodents in the Piney Woods area?',
    a: 'Pet food, bird feeders, fallen pecans, and dense landscaping around homes are major attractants.',
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const RodentControl = () => {
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
        {/* Halftone dot overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.18) 1.5px, transparent 1.5px)',
          backgroundSize: '18px 18px',
          pointerEvents: 'none',
        }} />

        {/* Page title */}
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
            RODENT CONTROL
          </h1>
        </div>

        {/* Cloud bottom image */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
          <img
            src="/banner-img.png"
            alt=""
            style={{ width: '100%', display: 'block' }}
          />
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
          {/* Rodent photo */}
          <div style={{
            border: '4px solid rgb(255, 213, 39)',
            borderRadius: '6px',
            overflow: 'hidden',
            boxShadow: '8px 8px 0 rgba(0,0,0,0.1)',
          }}>
            <img
              src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/norway-rat.jpg"
              alt="Norway Brown Rat Control Services in Tyler TX"
              style={{ width: '100%', display: 'block' }}
            />
          </div>

          {/* Text */}
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
              RODENTS
            </p>
            <h2 style={{
              fontSize: 'clamp(26px, 2.8vw, 38px)',
              fontWeight: '800',
              marginBottom: '18px',
              marginTop: 0,
            }}>
              Rodent Control Services
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              When it comes to pests, few are as concerning as rodents. Whether it's roof rats scaling your
              walls, Norway rats burrowing beneath your property, or house mice nesting near your food supply,
              the damage they cause can be significant. From property destruction to health hazards, rodent
              infestations demand immediate, effective action. At{' '}
              <a href="/" style={{ color: '#000', textDecoration: 'underline' }}>Dang Pest Control</a>,
              our comprehensive rodent control services are designed to eliminate the problem and prevent it
              from coming back. We serve Tyler, TX, and the surrounding areas. Call us today at{' '}
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
            Our Rodent Control Process
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '50px', marginTop: 0 }}>
            Here's what you can expect from our rodent pest control services:
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '28px',
          }}>
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

          {/* Habitats & Health Risks */}
          <div style={{ background: '#fff', borderRadius: '8px', padding: '40px', marginTop: '28px' }}>
            <h2 style={{ fontWeight: '800', fontSize: 'clamp(22px, 2.5vw, 30px)', marginBottom: '16px', marginTop: 0 }}>
              Rodent Habitats &amp; Harborage
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', marginBottom: '32px', marginTop: 0 }}>
              Mice and rats are experts at finding shelter, especially in human-made structures. These rodents thrive in dark, hidden spaces and can make their homes in attics, crawl spaces, basements, and even within wall voids. Outdoors, they are drawn to areas with dense ground cover, brushy hedges, and woodpiles. Roof rats, in particular, are notorious climbers often entering homes through trees touching rooftops, making attics a preferred nesting site. Norway rats, on the other hand, are burrowers, frequently found in basements, sewer systems, and other damp, dark areas. Blocking access to these harborage areas is essential for rodent management. At Dang Pest Control, our trained technicians specialize in identifying and sealing entry points, ensuring rodents no longer have easy access to your property.
            </p>
            <h2 style={{ fontWeight: '800', fontSize: 'clamp(22px, 2.5vw, 30px)', marginBottom: '16px', marginTop: 0 }}>
              Health Risks Related to Mice &amp; Rats
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', marginBottom: '12px', marginTop: 0 }}>
              Rodents pose the possibility of severe health threats to humans, often transmitting dangerous diseases. Here are some of the most critical health risks associated with rodents:
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', marginBottom: '10px', marginTop: 0 }}>
              <strong>Hantavirus:</strong> Spread through contact with droppings or urine, this disease can lead to severe respiratory issues and even death.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', marginBottom: '10px', marginTop: 0 }}>
              <strong>Leptospirosis:</strong> This bacterial infection is transmitted through rat urine and causes symptoms like fever and muscle aches.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', marginBottom: '10px', marginTop: 0 }}>
              <strong>Salmonellosis:</strong> Caused by exposure to rodent feces, this bacterial infection results in severe diarrhea and abdominal cramps.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', marginBottom: '10px', marginTop: 0 }}>
              <strong>Rat-bite Fever:</strong> Passed through bites or scratches, this infection leads to fever, joint pain, and chills.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', marginBottom: 0, marginTop: 0 }}>
              Additionally, rodent allergens such as droppings and urine can aggravate allergies and asthma, posing risks to children and those with respiratory conditions.
            </p>
          </div>

          {/* Centered CTA button */}
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
          WHY CHOOSE US — white bg, 4 gray cards
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '70px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', marginBottom: '36px', marginTop: 0 }}>
          Why Choose Us?
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
        }}>
          {whyCards.map((card, i) => (
            <div
              key={i}
              style={{
                background: '#f3f3f1',
                borderRadius: '8px',
                padding: '28px 20px',
              }}
            >
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
          MORE THAN RODENT CONTROL — text left, dotted image right
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '0 40px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
        }}>
          <div>
            <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', marginBottom: '20px', marginTop: 0 }}>
              More Than Rodent Control
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              Our{' '}
              <a href="/pest-control" style={{ color: '#000', textDecoration: 'underline' }}>expert pest control services</a>{' '}
              also cover{' '}
              <a href="/ant-control" style={{ color: '#000', textDecoration: 'underline' }}>ants</a>,{' '}
              <a href="/spider-control" style={{ color: '#000', textDecoration: 'underline' }}>spiders</a>,{' '}
              <a href="/wasp-hornet-control" style={{ color: '#000', textDecoration: 'underline' }}>wasps and hornets</a>,{' '}
              <a href="/scorpion-control" style={{ color: '#000', textDecoration: 'underline' }}>scorpions</a>,{' '}
              <a href="/mosquito-control" style={{ color: '#000', textDecoration: 'underline' }}>mosquitos</a>,{' '}
              <a href="/flea-tick-control" style={{ color: '#000', textDecoration: 'underline' }}>fleas and ticks</a>,{' '}
              <a href="/roach-control" style={{ color: '#000', textDecoration: 'underline' }}>cockroaches</a>,{' '}
              <a href="/bed-bug-control" style={{ color: '#000', textDecoration: 'underline' }}>bed bugs</a>,
              and more. Need{' '}
              <a href="/termite-inspections" style={{ color: '#000', textDecoration: 'underline' }}>termite inspections</a>{' '}
              or{' '}
              <a href="/termite-control" style={{ color: '#000', textDecoration: 'underline' }}>termite treatment</a>?
              We've got you covered!
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

          {/* House mouse image with dotted bg */}
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
                src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/house-mouse.jpg"
                alt="Eastern House Mouse Rodent Control Services in Tyler TX"
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          RODENT-FREE CTA — orange clipPath + halftone + clouds
      ══════════════════════════════════════════════════════ */}
      <style>{`
        .rodent-cta-phone { background: hsl(28,100%,50%) !important; color: #fff !important; border: 2px solid hsl(28,100%,50%) !important; }
        .rodent-cta-phone:hover { background: #fff !important; color: hsl(20,40%,12%) !important; }
        .rodent-cta-quote { background: #fff !important; color: hsl(28,100%,50%) !important; border: 2px solid #fff !important; }
        .rodent-cta-quote:hover { background: hsl(45,95%,52%) !important; color: #fff !important; }
      `}</style>
      <section style={{ position: 'relative', background: 'hsl(28, 100%, 50%)', padding: '100px 40px 260px', clipPath: 'polygon(0 0, 100% 8%, 100% 100%, 0 100%)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.12) 1.5px, transparent 1.5px)', backgroundSize: '18px 18px', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: '"Bangers", cursive', fontSize: 'clamp(36px, 5vw, 60px)', fontStyle: 'italic', color: 'hsl(45, 95%, 60%)', letterSpacing: '0.04em', marginBottom: '20px', marginTop: 0, lineHeight: 1.1, WebkitTextStroke: '3px #000000', textShadow: '3px 3px 0 #000000' }}>
            RODENT-FREE LIVING STARTS HERE
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(0,0,0,0.72)', marginBottom: '28px', marginTop: 0 }}>
            Don't let rodents wreak havoc in your home or business. With Dang Pest Control, you get tailored solutions that work, delivered by professionals you can trust. Located in Tyler, TX, we proudly serve homeowners and property managers throughout nearby areas, including <a href="/longview-tx" style={{ color: '#000' }}>Longview</a>, <a href="/jacksonville-tx" style={{ color: '#000' }}>Jacksonville</a>, <a href="/lindale-tx" style={{ color: '#000' }}>Lindale</a>, <a href="/bullard-tx" style={{ color: '#000' }}>Bullard</a>, <a href="/whitehouse-tx" style={{ color: '#000' }}>Whitehouse</a>, and more. Call us today at <a href="tel:(903) 871-0550" style={{ color: '#000', fontWeight: '700' }}>(903) 871-0550</a> and <a href="/quote" style={{ color: '#000' }}>get your quote</a>.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="tel:(903) 871-0550" className="rodent-cta-phone" style={{ padding: '13px 28px', borderRadius: '50px', fontWeight: '700', textDecoration: 'none', fontSize: '15px', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>(903) 871-0550</a>
            <a href="/quote" className="rodent-cta-quote" style={{ padding: '13px 28px', borderRadius: '50px', fontWeight: '700', textDecoration: 'none', fontSize: '15px', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>Get Your Quote</a>
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

export default RodentControl;
