import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { StructuredData } from '@/components/StructuredData';
import { supabase } from '@/integrations/supabase/client';
import { VideoImage } from '@/components/VideoImage';

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
    desc: 'We begin by pinpointing the source of your flea or tick problem. This includes identifying the pests, where they are harboring, and what factors may be encouraging their presence.',
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img1.png',
  },
  {
    num: 'STEP 2',
    title: 'Integrated Pest Management Plan',
    desc: 'Once the issue is assessed, we create a tailored plan for your property using eco-friendly and pet-friendly applications, focusing on long-term solutions, not just short-term fixes.',
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img2.png',
  },
  {
    num: 'STEP 3',
    title: 'Treatment & Application',
    desc: 'Our flea and tick treatments target problem areas both indoors and outdoors, creating a barrier against reinfestations. We handle everything from indoor flea treatment to outdoor tick prevention.',
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img3.png',
  },
  {
    num: 'STEP 4',
    title: 'Monitoring & Evaluation',
    desc: 'After treatment, we follow up to evaluate the results and make any necessary adjustments to ensure the pests are eliminated for good.',
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img4.png',
  },
];

const whyCards = [
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Proven-Results.png',
    title: 'Expert Technicians',
    desc: 'Our skilled technicians have extensive knowledge of flea and tick behaviors, allowing us to provide the most effective solutions.',
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Comprehensive.png',
    title: 'Comprehensive Approach',
    desc: "We don't believe in quick fixes. Our Integrated Pest Management Plan ensures long-term results by addressing the root cause of the pest issue.",
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Safety.png',
    title: 'Eco-Friendly Methods',
    desc: 'All treatments are specially formulated to be child, pet, and environmentally friendly.',
  },
  {
    icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Guarantee.png',
    title: 'Proven Results',
    desc: 'Our treatments are designed to keep fleas and ticks away, reducing the risk of diseases such as Lyme disease and Rocky Mountain spotted fever.',
  },
];

const faqs = [
  {
    q: '1. Why are fleas so bad in East Texas?',
    a: 'East Texas humidity creates ideal breeding conditions. Fleas reproduce rapidly in shaded yards and on pets.',
  },
  {
    q: '2. Are ticks common in Tyler?',
    a: 'Yes. Ticks thrive in tall grass, wooded areas, and properties near the Piney Woods. They are active most of the year here.',
  },
  {
    q: '3. Can fleas live in my yard without pets?',
    a: 'Yes. Wildlife such as raccoons, squirrels, and stray animals can introduce fleas into East Texas yards.',
  },
  {
    q: '4. When is flea and tick season in Tyler?',
    a: 'Peak activity runs from spring through fall, but mild winters allow survival year-round.',
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const FleaTickControl = () => {
  const [pageVideo, setPageVideo] = useState<{ video_url: string | null; video_type: string | null } | null>(null);

  useEffect(() => {
    supabase
      .from('page_content')
      .select('video_url, video_type')
      .eq('tenant_id', '1282b822-825b-4713-9dc9-6d14a2094d06')
      .eq('slug', 'flea-tick-control')
      .maybeSingle()
      .then(({ data }) => { if (data) setPageVideo(data); });
  }, []);

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", color: 'hsl(20, 40%, 12%)', overflowX: 'hidden' }}>
      <SEO
        title="Flea & Tick Control in Tyler, TX"
        description="Professional flea and tick control in Tyler, TX. Effective elimination and prevention. Licensed technicians with a Super Powered Guarantee. Call (903) 871-0550."
        canonical="/flea-tick-control"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Flea & Tick Control",
          provider: { "@type": "LocalBusiness", name: "Dang Pest Control", telephone: "+19038710550" },
          areaServed: { "@type": "City", name: "Tyler", addressRegion: "TX" },
          description: "Professional flea and tick control services including elimination and prevention.",
        }}
      />
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q.replace(/^\d+\.\s*/, ""),
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }} />
      <Navbar />
      <main>

      {/* ══════════════════════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          background: `url(/moblie_banner.webp) center/cover no-repeat, hsl(28, 100%, 50%)`,
          paddingTop: '80px',
          paddingBottom: '200px',
          minHeight: '420px',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.18) 1.5px, transparent 1.5px)', backgroundSize: '18px 18px', pointerEvents: 'none' }} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 20px 30px' }}>
          <h1 style={{
            fontFamily: '"Bangers", cursive',
            fontSize: 'clamp(52px, 8.5vw, 96px)',
            color: 'hsl(45, 95%, 60%)',
            fontStyle: 'italic',
            letterSpacing: '0.05em',
            WebkitTextStroke: '3px #000000',
            textShadow: '3px 3px 0 #000000',
            margin: 0,
            lineHeight: 1,
          }}>
            FLEA & TICK CONTROL
          </h1>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
          <img fetchPriority="high" width={1200} height={50} src="/banner-img.png" alt="" style={{ width: '100%', display: 'block' }} />
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div style={{ border: '4px solid rgb(255, 213, 39)', borderRadius: '6px', overflow: 'hidden', boxShadow: '8px 8px 0 rgba(0,0,0,0.1)' }}>
            <VideoImage
              src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/tick.jpg"
              alt="Tick Control Services in Tyler TX"
              className=""
              videoUrl={pageVideo?.video_url}
              videoType={pageVideo?.video_type}
            />
          </div>
          <div>
            <p style={{ fontFamily: '"Bangers", cursive', color: 'hsl(28, 100%, 50%)', fontSize: '18px', letterSpacing: '0.12em', fontStyle: 'italic', marginBottom: '6px', marginTop: 0 }}>
              FLEAS & TICKS
            </p>
            <h2 style={{ fontSize: 'clamp(26px, 2.8vw, 38px)', fontWeight: '800', marginBottom: '18px', marginTop: 0 }}>
              Flea & Tick Control Service
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              Fleas and ticks are more than just an annoyance—they're a threat to your family's comfort and
              enjoyment outdoors. At{' '}
              <a href="/" style={{ color: '#000', textDecoration: 'underline' }}>Dang Pest Control</a>,
              we provide professional flea and tick pest control services that effectively eliminate these
              pests and help you maintain a healthy, itch-free environment. Our customized treatments will
              eliminate any existing fleas and ticks and will also prevent future intrusions. We serve Tyler,
              TX, and the surrounding areas. Call us today at{' '}
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
          TREATMENT PROCESS — gray bg, 2×2 step grid
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#f1f1ef', padding: '70px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontWeight: '800', fontSize: 'clamp(26px, 3vw, 40px)', marginBottom: '10px', marginTop: 0 }}>
            Comprehensive Flea & Tick Control Process
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '50px', marginTop: 0 }}>
            At Dang Pest Control, our technicians take a thorough, integrated approach to handle flea and tick infestations. Here's how we ensure your family stays protected:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
            {steps.map((step, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '24px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: '"Bangers", cursive', color: STEP_COLORS[i], fontSize: '15px', letterSpacing: '0.12em', fontStyle: 'italic', margin: '0 0 4px 0' }}>{step.num}</p>
                    <h3 style={{ fontWeight: '800', fontSize: '17px', margin: 0 }}>{step.title}</h3>
                  </div>
                  <img loading="lazy" width={58} height={58} src={step.icon} alt={step.title} style={{ width: '58px', height: '58px', objectFit: 'contain', background: STEP_COLORS[i], borderRadius: '6px', padding: '8px', flexShrink: 0 }} />
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
              <img loading="lazy" width={56} height={56} src={card.icon} alt={card.title} style={{ width: '56px', height: '56px', objectFit: 'contain', marginBottom: '14px', display: 'block' }} />
              <h3 style={{ fontWeight: '800', fontSize: '16px', marginBottom: '10px', marginTop: 0 }}>{card.title}</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#555', margin: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DON'T WAIT — text left, pet image right
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '0 40px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', marginBottom: '20px', marginTop: 0 }}>
              Don't Wait—Get Protected Today
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '16px', color: '#444', marginTop: 0 }}>
              It's time to protect your family, pets, and property with professional,{' '}
              <a href="/pest-control" style={{ color: '#000', textDecoration: 'underline' }}>dependable pest control services</a>.
              Fleas and ticks don't just go away on their own. Take action now to protect your home and loved ones.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              Located in Tyler, TX, we proudly serve the surrounding areas, including{' '}
              <a href="/longview-tx" style={{ color: '#000', textDecoration: 'underline' }}>Longview</a>,{' '}
              <a href="/jacksonville-tx" style={{ color: '#000', textDecoration: 'underline' }}>Jacksonville</a>,{' '}
              <a href="/lindale-tx" style={{ color: '#000', textDecoration: 'underline' }}>Lindale</a>,{' '}
              <a href="/bullard-tx" style={{ color: '#000', textDecoration: 'underline' }}>Bullard</a>,{' '}
              <a href="/whitehouse-tx" style={{ color: '#000', textDecoration: 'underline' }}>Whitehouse</a>, and more.
              Call us today at{' '}
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
          <div style={{ position: 'relative', padding: '20px' }}>
            <div style={{ position: 'absolute', inset: 0, background: '#fff', backgroundImage: 'radial-gradient(circle, #d0d0d0 1px, transparent 1px)', backgroundSize: '22px 22px', borderRadius: '8px', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1, border: '4px solid rgb(255, 213, 39)', borderRadius: '6px', overflow: 'hidden', boxShadow: '8px 8px 0 rgba(0,0,0,0.1)' }}>
              <img
                loading="lazy"
                width={600}
                height={400}
                src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/Pets-Marvel-Outside-scaled-e1746459229132.jpg"
                alt="Pet and Dog Flea Control Services in Tyler TX"
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FLEA & TICK-FREE CTA — orange banner with clouds
      ══════════════════════════════════════════════════════ */}
      <style>{`
        .ft-cta-phone { background: hsl(28,100%,50%) !important; color: #fff !important; border: 2px solid hsl(28,100%,50%) !important; }
        .ft-cta-quote { background: #fff !important; color: hsl(28,100%,50%) !important; border: 2px solid #fff !important; }
      `}</style>
      <section style={{ position: 'relative', background: 'hsl(28, 100%, 50%)', padding: '100px 40px 260px', clipPath: 'polygon(0 0, 100% 8%, 100% 100%, 0 100%)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.12) 1.5px, transparent 1.5px)', backgroundSize: '18px 18px', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: '"Bangers", cursive', fontSize: 'clamp(36px, 5vw, 60px)', fontStyle: 'italic', color: 'hsl(45, 95%, 60%)', letterSpacing: '0.04em', marginBottom: '20px', marginTop: 0, lineHeight: 1.1, WebkitTextStroke: '3px #000000', textShadow: '3px 3px 0 #000000' }}>
            FLEA & TICK-FREE LIVING STARTS HERE
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(0,0,0,0.72)', marginBottom: '28px', marginTop: 0 }}>
            Reclaim your home or property with Dang Pest Control's expert flea and tick pest control services.
            Whether you're dealing with a minor issue or a full infestation, our proven methods ensure effective
            and lasting results. Located in Tyler, TX, we proudly serve homeowners throughout nearby areas,
            including <a href="/longview-tx" style={{ color: '#000' }}>Longview</a>,{' '}
            <a href="/jacksonville-tx" style={{ color: '#000' }}>Jacksonville</a>,{' '}
            <a href="/lindale-tx" style={{ color: '#000' }}>Lindale</a>,{' '}
            <a href="/bullard-tx" style={{ color: '#000' }}>Bullard</a>,{' '}
            <a href="/whitehouse-tx" style={{ color: '#000' }}>Whitehouse</a>, and more. Call us today at{' '}
            <a href="tel:(903) 871-0550" style={{ color: '#000', fontWeight: '700' }}>(903) 871-0550</a> and{' '}
            <a href="/quote" style={{ color: '#000' }}>get your quote</a>.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="tel:(903) 871-0550" className="ft-cta-phone" style={{ padding: '13px 28px', borderRadius: '50px', fontWeight: '700', textDecoration: 'none', fontSize: '15px', whiteSpace: 'nowrap' }}>(903) 871-0550</a>
            <a href="/quote" className="ft-cta-quote" style={{ padding: '13px 28px', borderRadius: '50px', fontWeight: '700', textDecoration: 'none', fontSize: '15px', whiteSpace: 'nowrap' }}>Get Your Quote</a>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
          <img loading="lazy" width={1200} height={50} src="/banner-img.png" alt="" style={{ width: '100%', display: 'block' }} />
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
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.12) 1.5px, transparent 1.5px)', backgroundSize: '18px 18px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '820px', margin: '0 auto', paddingTop: '20px' }}>
          <h2 style={{ fontFamily: '"Bangers", cursive', fontSize: 'clamp(42px, 6vw, 76px)', fontStyle: 'italic', color: 'hsl(20, 40%, 12%)', letterSpacing: '0.04em', marginBottom: '24px', marginTop: 0, lineHeight: 1.1, textShadow: '2px 2px 0 rgba(0,0,0,0.15)' }}>
            PROTECT YOUR EAST TEXAS<br />HOME TODAY
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(0,0,0,0.72)', marginBottom: '12px', marginTop: 0 }}>
            East Texas heat, humidity, and piney woods conditions create the perfect environment for pests year-round. Don't wait until a small problem becomes a major infestation.
          </p>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(0,0,0,0.72)', margin: 0 }}>
            Dang Pest Control provides safe, effective, and recurring protection for homes across Tyler, Whitehouse, Bullard, Lindale, Flint, and surrounding communities.
          </p>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default FleaTickControl;
