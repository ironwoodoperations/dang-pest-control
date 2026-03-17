import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ─── DATA ────────────────────────────────────────────────────────────────────

const STEP_COLORS = [
  'hsl(28, 100%, 50%)',   // orange
  'hsl(45, 95%, 52%)',    // yellow
  'hsl(185, 65%, 42%)',   // teal
  'hsl(140, 55%, 42%)',   // green
];

const steps = [
  {
    num: 'STEP 1',
    title: 'Property Assessment & Identification',
    desc: 'Our expert technicians will inspect your property to identify mosquito habitats, breeding sites, and entry points. By deeply understanding mosquito behavior, we ensure that our Integrated Pest Management Plan addresses the root cause.',
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img1.png',
  },
  {
    num: 'STEP 2',
    title: 'Customized Mosquito Treatment',
    desc: 'We implement a multi-step plan to target mosquitos at every stage of their lifecycle. From outdoor treatments and mechanical barriers to vegetation management, our solutions are comprehensive and effective. You can count on routine treatments every three weeks to keep mosquito populations under control.',
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img2.png',
  },
  {
    num: 'STEP 3',
    title: 'Long-Term Reduction',
    desc: "We don't just spray and leave. We actively monitor the effectiveness of our treatments, adjust our strategies if needed.",
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img3.png',
  },
  {
    num: 'STEP 4',
    title: 'Ongoing Monitoring & Prevention',
    desc: "If mosquitos persist between treatments, we'll come back and retreat for free—guaranteed. We also provide preventative care tips to ensure your property remains mosquito-free.",
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img4.png',
  },
];

const whyCards = [
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Proven-Results.png',
    title: 'Expert Knowledge',
    desc: "We're part of the National Pest Management Association and the Texas Pest Control Association, ensuring the highest standards in pest control practices.",
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Comprehensive.png',
    title: 'Environmentally Conscious',
    desc: 'We design eco-friendly solutions that target mosquitos while protecting beneficial insects and the environment.',
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Safety.png',
    title: 'Guaranteed Results',
    desc: "We promise a noticeable reduction in mosquitos so you can enjoy your yard with peace of mind—or we'll retreat for free.",
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Guarantee.png',
    title: 'Comprehensive Services',
    desc: 'Our technicians handle all types of pests—spiders, wasps & hornets, scorpions, rodents, fleas & ticks, cockroaches, bed bugs, and more. We also offer termite inspections and treatments.',
  },
];

const faqs = [
  {
    q: '1. Why are mosquitoes so aggressive in East Texas?',
    a: 'Our heat, humidity, and frequent rain create ideal breeding conditions. Mosquitoes can lay eggs in as little as a bottle cap of standing water.',
  },
  {
    q: '2. When does mosquito season start in Tyler?',
    a: 'Mosquito activity often begins as early as March and can last into November depending on temperatures.',
  },
  {
    q: '3. Do backyard treatments really work?',
    a: 'Yes. Targeted treatments significantly reduce adult mosquito populations and breeding areas. Ongoing treatments are especially effective during peak East Texas summer months.',
  },
  {
    q: '4. Why do mosquitoes seem worse after a mild winter?',
    a: 'East Texas winters are often not cold enough to significantly reduce mosquito populations, allowing more to survive into spring.',
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const MosquitoControl = () => {
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
          paddingTop: '170px',
          paddingBottom: '70px',
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
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, padding: '0 20px 30px' }}>
          <h1 style={{
            fontFamily: '"Bangers", cursive',
            fontSize: 'clamp(56px, 9vw, 100px)',
            color: 'hsl(45, 95%, 60%)',
            fontStyle: 'italic',
            letterSpacing: '0.05em',
            WebkitTextStroke: '2px rgba(0,0,0,0.65)',
            textShadow: '4px 4px 0 rgba(0,0,0,0.35)',
            margin: 0,
            lineHeight: 1,
          }}>
            MOSQUITO CONTROL
          </h1>
        </div>

        {/* Cloud bottom cutout */}
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
      <section style={{ padding: '80px 40px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
        }}>
          {/* Mosquito photo */}
          <div style={{
            border: '4px solid rgb(255, 213, 39)',
            borderRadius: '6px',
            overflow: 'hidden',
            boxShadow: '8px 8px 0 rgba(0,0,0,0.1)',
          }}>
            <img
              src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/aedes-mosquito.jpg"
              alt="Aedes Mosquito Control Service in Tyler TX"
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
              MOSQUITOS
            </p>
            <h2 style={{
              fontSize: 'clamp(26px, 2.8vw, 38px)',
              fontWeight: '800',
              marginBottom: '18px',
              marginTop: 0,
            }}>
              Mosquito Control Service
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              At{' '}
              <a href="/" style={{ color: '#000', textDecoration: 'underline' }}>Dang Pest Control</a>,
              we understand how frustrating mosquitos can be—interrupting your peaceful evenings, ruining family
              barbecues, and putting your health at risk. That's why we offer professional mosquito control services
              tailored to your specific needs. We serve Tyler, TX, and the surrounding areas. Call us today at{' '}
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
            Our Mosquito Treatment Process
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '50px' }}>
            Here's what you can expect from our mosquito treatment process:
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
                {/* Card top: step label + icon */}
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

                {/* Description with left accent */}
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

                {/* Bottom color bar */}
                <div style={{ height: '5px', background: STEP_COLORS[i], marginTop: 'auto' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          IN2CARE STATIONS — text left, video right
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '70px 40px 0', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '50px',
          alignItems: 'center',
          marginBottom: '60px',
        }}>
          <div>
            <h2 style={{ fontWeight: '800', fontSize: 'clamp(22px, 2.5vw, 34px)', marginBottom: '18px', marginTop: 0 }}>
              In2Care Stations Mosquito Treatments
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '16px', color: '#444', marginTop: 0 }}>
              Our In2Care mosquito stations provide an innovative and eco-friendly solution for long-term mosquito
              control. These strategically placed stations attract egg-laying mosquitos, which become carriers of a
              special bio-active treatment. As they move between breeding sites, they spread the treatment,
              effectively contaminating and eliminating larvae before they can develop into biting adults.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', marginTop: 0, marginBottom: 0 }}>
              The In2Care system also targets adult mosquitos, reducing their ability to spread diseases like West
              Nile virus and Zika. Proven friendly for people, pets, and beneficial insects, this low-maintenance
              solution offers continuous protection, making it a powerful defense against mosquito infestations on
              your home.
            </p>
          </div>

          {/* Video */}
          <div style={{
            border: '4px solid hsl(185, 100%, 45%)',
            borderRadius: '6px',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0, 180, 200, 0.25)',
          }}>
            <video
              src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/In2Care_V1_Dang-Pest-Control-WEBSITE.mp4"
              poster="https://www.dangpestcontrol.com/wp-content/uploads/2025/06/Picture1-e1749056859859.png"
              controls
              preload="metadata"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        </div>

        {/* ── MISTING — image left, text right ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '50px',
          alignItems: 'center',
          marginBottom: '50px',
        }}>
          {/* Misting photo */}
          <div style={{
            border: '4px solid rgb(255, 213, 39)',
            borderRadius: '6px',
            overflow: 'hidden',
            boxShadow: '8px 8px 0 rgba(0,0,0,0.1)',
          }}>
            <img
              src="https://www.dangpestcontrol.com/wp-content/uploads/2025/06/MosquitoMist1-rotated-e1751059236354.jpg"
              alt="Mosquito Misting Treatments in Tyler TX"
              style={{ width: '100%', display: 'block' }}
            />
          </div>

          <div>
            <h2 style={{ fontWeight: '800', fontSize: 'clamp(22px, 2.5vw, 34px)', marginBottom: '18px', marginTop: 0 }}>
              Mosquito Fogging/Misting Treatments
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '16px', color: '#444', marginTop: 0 }}>
              Using a professional-grade fogger, we disperse a fine mist of EPA-approved insecticide onto foliage,
              where mosquitos rest during the day. This treatment provides immediate knockdown of adult mosquitos,
              making it an ideal solution for quick relief before outdoor events or during peak mosquito season.
              The fog penetrates dense vegetation and hard-to-reach areas, ensuring maximum coverage.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', marginTop: 0, marginBottom: 0 }}>
              Environmentally, family and pet friendly when applied by our trained technicians, fogging helps
              create a more comfortable, bite-free environment for you and your family. Rest assured we will
              evaluate every property and take all reasonable steps to protect our valuable pollinators.
            </p>
          </div>
        </div>

        {/* Centered CTA button */}
        <div style={{ textAlign: 'center', paddingBottom: '70px' }}>
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
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY CHOOSE US — white bg, 4 gray cards
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '0 40px 70px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '40px',
          alignItems: 'center',
          marginBottom: '36px',
        }}>
          <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', margin: 0 }}>
            Why Choose Us?
          </h2>
          <p style={{ fontSize: '16px', color: '#444', lineHeight: 1.7, margin: 0 }}>
            When it comes to mosquito pest control, not all services are created equal. Here's what sets us apart:
          </p>
        </div>

        {/* 4 cards */}
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
          PROTECT HOME & FAMILY — full-width text block
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '0 40px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontWeight: '800', fontSize: 'clamp(22px, 2.5vw, 34px)', marginBottom: '18px', marginTop: 0 }}>
          Protect Your Home &amp; Family from Mosquitos
        </h2>
        <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '14px', color: '#444', marginTop: 0 }}>
          Mosquitos aren't just a nuisance; they're a serious health threat. With 176 mosquito species in the U.S.
          and over 3,000 worldwide, these pests are responsible for spreading diseases like West Nile virus,
          encephalitis, dengue, and even malaria. Alarming statistics from the Texas Department of Health and Human
          Services reveal 154 cases of West Nile disease and 79 cases of dengue in Texas in 2023 alone.
        </p>
        <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '40px', color: '#444', marginTop: 0 }}>
          Mosquitos are also a primary cause of heartworm in pets, making year-round prevention essential. At Dang
          Pest Control, we're here to help you protect your loved ones and reduce the risks associated with these
          dangerous pests.
        </p>

        <h2 style={{ fontWeight: '800', fontSize: 'clamp(22px, 2.5vw, 34px)', marginBottom: '18px', marginTop: 0 }}>
          Prevention Tips to Reduce Mosquitos
        </h2>
        <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '14px', color: '#444', marginTop: 0 }}>
          While nothing can eliminate mosquitos entirely, adopting effective prevention methods can drastically
          reduce their presence. Here are our top tips to keep mosquitos at bay:
        </p>
        {[
          ['Wear Protective Clothing', 'Cover as much skin as possible by wearing long sleeves and pants to create a physical barrier against mosquito bites.'],
          ['Apply EPA-Approved Repellents', 'Use insect repellents containing DEET, picaridin, oil of lemon eucalyptus, or other recommended ingredients to protect yourself outdoors.'],
          ['Eliminate Standing Water', 'Mosquitos need still water to lay their eggs. Regularly empty items like buckets, trash cans, plant pots, toys, tires, and clogged gutters to deny them breeding grounds.'],
          ["Maintain Your Home's Defenses", 'Ensure your home is mosquito-proof by repairing any damaged window and door screens and keeping outdoor areas free from clutter. Using air conditioning indoors also helps keep mosquitos away.'],
        ].map(([label, body], i) => (
          <p key={i} style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '12px', color: '#444', marginTop: 0 }}>
            <strong>{label}:</strong> {body}
          </p>
        ))}
        <p style={{ fontSize: '15px', lineHeight: 1.8, marginTop: '16px', color: '#444', marginBottom: 0 }}>
          At Dang Pest Control, we understand the challenges you face when dealing with mosquitos. Our expert
          technicians use an Integrated Pest Management (IPM) approach to deliver customized mosquito control
          treatments that are both effective and environmentally responsible. If mosquitos are still causing
          trouble between visits, we'll retreat your property at no additional cost. With Dang Pest Control,
          your satisfaction is our priority.
        </p>
      </section>

      {/* ══════════════════════════════════════════════════════
          GET YOUR QUOTE TODAY — text left, dotted image right
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '20px 40px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
        }}>
          {/* Text */}
          <div>
            <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', marginBottom: '20px', marginTop: 0 }}>
              Get Your Quote Today
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              Mosquitos aren't just an annoyance—they're a threat to your health and well-being. They carry
              diseases like West Nile virus, Zika virus, and dengue fever. Protect your family, pets, and property
              today with expert mosquito pest control services that deliver real results. Serving Tyler, TX, and
              surrounding areas including{' '}
              <a href="/longview-tx" style={{ color: '#000', textDecoration: 'underline' }}>Longview</a>,{' '}
              <a href="/jacksonville-tx" style={{ color: '#000', textDecoration: 'underline' }}>Jacksonville</a>,{' '}
              <a href="/lindale-tx" style={{ color: '#000', textDecoration: 'underline' }}>Lindale</a>,{' '}
              <a href="/bullard-tx" style={{ color: '#000', textDecoration: 'underline' }}>Bullard</a>,{' '}
              <a href="/whitehouse-tx" style={{ color: '#000', textDecoration: 'underline' }}>Whitehouse</a>,
              and more, Dang Pest Control is the trusted name for effective pest management. Call us today at{' '}
              <a href="tel:(903) 871-0550" style={{ color: '#000', fontWeight: '700' }}>(903) 871-0550</a>{' '}
              and{' '}
              <a href="/quote" style={{ color: '#000', textDecoration: 'underline' }}>get your quote</a>.
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

          {/* Image with dotted bg */}
          <div style={{ position: 'relative', padding: '20px' }}>
            {/* Dotted background layer */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: '#fff',
              backgroundImage: 'radial-gradient(circle, #d0d0d0 1px, transparent 1px)',
              backgroundSize: '22px 22px',
              borderRadius: '8px',
              zIndex: 0,
            }} />
            {/* Photo */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              border: '4px solid rgb(255, 213, 39)',
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: '8px 8px 0 rgba(0,0,0,0.1)',
            }}>
              <img
                src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/culex-mosquito.jpg"
                alt="Culex Mosquito Control Services in Tyler TX"
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '0 40px 80px', maxWidth: '900px', margin: '0 auto' }}>
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
        {/* Halftone dots */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.12) 1.5px, transparent 1.5px)',
          backgroundSize: '18px 18px',
          pointerEvents: 'none',
        }} />

        {/* Sunburst rays — CSS conic gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: [
            'conic-gradient(from 0deg at 50% 50%,',
            Array.from({ length: 18 }, (_, i) =>
              `transparent ${i * 20}deg, rgba(255,255,255,0.06) ${i * 20 + 10}deg, transparent ${(i + 1) * 20}deg`
            ).join(', '),
            ')',
          ].join(''),
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

export default MosquitoControl;
