import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const services = [
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/General.jpg', title: 'General\nPest Control', href: '/pest-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/ant.jpg', title: 'Ant\nPest Control', href: '/ant-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/spider.jpg', title: 'Spider\nPest Control', href: '/spider-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Wasps-Hornet.jpg', title: 'Wasp & Hornet\nPest Control', href: '/wasp-hornet-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Scorpion.jpg', title: 'Scorpion\nPest Control', href: '/scorpion-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Rodent.jpg', title: 'Rodent\nPest Control', href: '/rodent-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Mosquito.jpg', title: 'Mosquito\nPest Control', href: '/mosquito-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Flea.jpg', title: 'Flea & Tick\nPest Control', href: '/flea-tick-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Roach.jpg', title: 'Cockroach\nControl', href: '/roach-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Bed-Bug.jpg', title: 'Bed Bug\nTreatments', href: '/bed-bug-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Termite.jpg', title: 'Termite\nInspections', href: '/termite-inspections' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Termite.jpg', title: 'Termite\nControl', href: '/termite-control' },
];

const whyCards = [
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Proven-Results.png', title: 'Family Owned & Local', desc: "We're proud to call Tyler, TX home, and we're committed to helping our neighbors in Bullard and the surrounding areas live in pest-free comfort. Being family-owned means you'll always receive friendly, respectful, and personalized service." },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Comprehensive.png', title: 'Family & Pet Friendly', desc: 'Our environmentally conscious treatment plans are designed to be child, pet, and planet friendly.' },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Safety.png', title: 'Expertise You Can Trust', desc: 'As members of the National Pest Management Association (NPMA) and the Texas Pest Control Association (TPCA), we adhere to the highest industry standards. Our highly trained technicians use advanced techniques to ensure your pest issues are resolved efficiently.' },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Guarantee.png', title: 'Super Powered Guarantee', desc: "Our work is backed by our Super Powered Guarantee: If pests return between regularly scheduled visits, we'll re-treat your property at no additional charge." },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Super-Powered.png', title: 'Prevention & Custom Solutions', desc: "Using an Integrated Pest Management approach, we don't just address the problem—we solve it at its source. By understanding the unique environmental factors in your home, our technicians design custom treatment plans that prevent pests from coming back." },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Custom-Plans.png', title: 'Referral Program', desc: "Love our service? Spread the word! When you refer a friend who signs up for recurring services, we'll pay you." },
];

const steps = [
  { num: 'STEP 1', title: 'Schedule an Inspection', img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img1.png', color: 'hsl(28, 100%, 50%)', desc: <>Get started by calling us at <a href="tel:(903) 871-0550" style={{ fontWeight: '700', color: 'inherit' }}>(903) 871-0550</a> or <a href="/quote" style={{ textDecoration: 'underline', color: 'inherit' }}>get your quote</a>.</> },
  { num: 'STEP 2', title: 'Receive a Custom Treatment Plan', img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img2.png', color: 'hsl(45, 95%, 52%)', desc: "Our licensed technicians will inspect your property, identify issues, and create a tailored treatment plan designed for your home's specific needs." },
  { num: 'STEP 3', title: 'Enjoy a Pest-Free Home', img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img3.png', color: 'hsl(185, 65%, 42%)', desc: 'Relax knowing your customized plan is working to eliminate pests and prevent them from coming back.' },
];

const faqs = [
  { q: 'Are your treatments pet and kid friendly?', a: 'Yes! All of our treatment products are carefully selected to be child and pet friendly while remaining highly effective against pests.' },
  { q: 'What happens if I see pests between visits?', a: "We've got you covered! With our Super Powered Guarantee, we'll re-treat your property for free if pests persist." },
  { q: 'How often will you need to treat my property?', a: 'Our services are tailored to your unique needs, but most clients benefit from regularly scheduled treatments to maintain a pest-free environment.' },
  { q: 'Do you only provide pest control for residential properties?', a: 'We offer pest control solutions for both residential and commercial properties in Bullard, Tyler, and the surrounding areas.' },
  { q: 'What areas do you serve?', a: 'We proudly serve clients in Tyler, Bullard, Jacksonville, Lindale, Whitehouse, Longview, and other surrounding areas.' },
];

const BullardTX = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", color: 'hsl(20, 40%, 12%)', overflowX: 'hidden' }}>
      <Navbar />

      {/* HERO */}
      <section style={{ position: 'relative', background: `url(/moblie_banner.webp) center/cover no-repeat, hsl(28, 100%, 50%)`, paddingTop: '80px', paddingBottom: '200px', minHeight: '420px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.18) 1.5px, transparent 1.5px)', backgroundSize: '18px 18px', pointerEvents: 'none' }} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 20px 30px' }}>
          <h1 style={{ fontFamily: '"Bangers", cursive', fontSize: 'clamp(42px, 7vw, 88px)', color: 'hsl(45, 95%, 60%)', fontStyle: 'italic', letterSpacing: '0.05em', WebkitTextStroke: '3px #000000', textShadow: '3px 3px 0 #000000', margin: 0, lineHeight: 1.05 }}>
            PEST CONTROL SERVICES IN<br />BULLARD, TX
          </h1>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
          <img fetchPriority="high" width={1200} height={50} src="/banner-img.png" alt="" style={{ width: '100%', display: 'block' }} />
        </div>
      </section>

      {/* INTRO */}
      <section style={{ padding: '80px 40px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div style={{ border: '4px solid rgb(255, 213, 39)', borderRadius: '6px', overflow: 'hidden', boxShadow: '8px 8px 0 rgba(0,0,0,0.1)' }}>
            <img loading="lazy" width={600} height={400} src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/Interior-Pantry-Spraying-1-scaled-e1746808727305.jpg" alt="Pest Control Technician Providing Services in Bullard TX" style={{ width: '100%', display: 'block' }} />
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: '800', marginBottom: '18px', marginTop: 0 }}>
              Expert Pest &amp; Termite Control Services in Bullard, TX
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              Protect your home and loved ones with pest control you can trust. At{' '}
              <a href="/" style={{ color: '#000', textDecoration: 'underline' }}>Dang Pest Control</a>,
              we provide effective and customized solutions to protect your property and ensure your peace of mind. Serving Bullard, TX, and surrounding areas, our family-owned, local business is committed to making your life easier with services you can trust. Call us today at{' '}
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

      {/* COMPREHENSIVE SERVICES */}
      <section style={{ padding: '20px 40px 0', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontWeight: '800', fontSize: 'clamp(24px, 2.5vw, 36px)', marginBottom: '16px', marginTop: 0 }}>Comprehensive Services Designed for You</h2>
        <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', marginTop: 0, marginBottom: 0, maxWidth: '900px', margin: '0 auto' }}>
          East Texas has its charm, but it also attracts unwanted guests—pests. Whether you're facing a single ant trail or a major rodent infestation, Dang Pest Control is here to help. Our services are tailored to address and eliminate pests effectively while ensuring they don't return.
        </p>
      </section>

      {/* SERVICES GRID */}
      <section style={{ padding: '40px 40px 0', background: '#f3f3f1', marginTop: '40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontWeight: '800', fontSize: 'clamp(24px, 2.5vw, 36px)', textAlign: 'center', marginBottom: '40px', marginTop: 0 }}>Our Services Include</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px 30px' }}>
            {services.map((s, i) => (
              <a key={i} href={s.href} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <img loading="lazy" width={120} height={120} src={s.img} alt={s.title.replace('\n', ' ')} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '4px', marginBottom: '14px', display: 'block' }} />
                <h3 style={{ fontWeight: '800', fontSize: '16px', marginBottom: '0', marginTop: 0, lineHeight: 1.3 }}>
                  {s.title.split('\n').map((line, j) => <span key={j}>{line}{j === 0 && s.title.includes('\n') ? <br /> : ''}</span>)}
                </h3>
              </a>
            ))}
          </div>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', textAlign: 'center', marginTop: '40px', marginBottom: '0' }}>
            With our team of licensed technicians, your pest problems will meet their match—quickly and efficiently.
          </p>
          <div style={{ textAlign: 'center', padding: '32px 0 60px' }}>
            <a href="/quote" style={{ display: 'inline-block', padding: '14px 40px', background: 'hsl(28, 100%, 50%)', borderRadius: '50px', fontWeight: '700', color: '#fff', textDecoration: 'none', fontSize: '16px' }}>Get Your Quote</a>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ padding: '70px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', marginBottom: '36px', marginTop: 0 }}>Why Choose Dang Pest Control?</h2>
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

      {/* 3 STEPS */}
      <section style={{ padding: '60px 40px', background: '#f3f3f1' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontWeight: '800', fontSize: 'clamp(24px, 2.8vw, 38px)', textAlign: 'center', marginBottom: '48px', marginTop: 0 }}>
            Leave Pests Behind in 3 Simple Steps
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {steps.slice(0, 2).map((step, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '4px', padding: '28px 28px 0 28px', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ background: step.color, borderRadius: '6px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '52px', height: '52px' }}>
                    <img loading="lazy" width={32} height={32} src={step.img} alt={step.title} style={{ width: '32px', height: '32px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: '"Bangers", cursive', color: step.color, fontSize: '16px', fontStyle: 'italic', letterSpacing: '0.08em' }}>{step.num}</div>
                    <h3 style={{ fontWeight: '800', fontSize: '18px', margin: 0, lineHeight: 1.2 }}>{step.title}</h3>
                  </div>
                </div>
                <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#444', marginBottom: '24px', marginTop: 0 }}>{step.desc}</p>
                <div style={{ position: 'relative', height: '8px', marginLeft: '-28px', marginRight: '-28px' }}>
                  <div style={{ position: 'absolute', bottom: 0, left: '50%', right: 0, height: '4px', background: step.color }} />
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: '4px', height: '36px', background: step.color }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '32px' }}>
            <div style={{ background: '#fff', borderRadius: '4px', padding: '28px 28px 0 28px', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ background: steps[2].color, borderRadius: '6px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '52px', height: '52px' }}>
                  <img loading="lazy" width={32} height={32} src={steps[2].img} alt={steps[2].title} style={{ width: '32px', height: '32px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                </div>
                <div>
                  <div style={{ fontFamily: '"Bangers", cursive', color: steps[2].color, fontSize: '16px', fontStyle: 'italic', letterSpacing: '0.08em' }}>{steps[2].num}</div>
                  <h3 style={{ fontWeight: '800', fontSize: '18px', margin: 0, lineHeight: 1.2 }}>{steps[2].title}</h3>
                </div>
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#444', marginBottom: '24px', marginTop: 0 }}>{steps[2].desc}</p>
              <div style={{ position: 'relative', height: '8px', marginLeft: '-28px', marginRight: '-28px' }}>
                <div style={{ position: 'absolute', bottom: 0, left: '50%', right: 0, height: '4px', background: steps[2].color }} />
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '4px', height: '36px', background: steps[2].color }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <a href="/quote" style={{ display: 'inline-block', padding: '14px 40px', background: 'hsl(28, 100%, 50%)', borderRadius: '50px', fontWeight: '700', color: '#fff', textDecoration: 'none', fontSize: '16px' }}>Get Your Quote</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '70px 40px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontWeight: '800', fontSize: 'clamp(24px, 2.5vw, 36px)', textAlign: 'center', marginBottom: '40px', marginTop: 0 }}>
          Frequently Asked Questions
        </h2>
        <div>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid #ddd' }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: '600', fontSize: '16px', color: 'hsl(20, 40%, 12%)' }}
              >
                {faq.q}
                <span style={{ fontSize: '20px', marginLeft: '16px', flexShrink: 0 }}>{openFaq === i ? '∧' : '∨'}</span>
              </button>
              {openFaq === i && (
                <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#555', marginTop: 0, marginBottom: '20px', paddingLeft: '4px' }}>{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA — text left, dotted image right */}
      <section style={{ padding: '0 40px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', marginBottom: '20px', marginTop: 0 }}>
              Your Trusted Partner in Pest Control
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              Located in Tyler, TX, Dang Pest Control is your local choice for effective and reliable{' '}
              <a href="/pest-control" style={{ color: '#000', textDecoration: 'underline' }}>pest control services</a>.
              We proudly serve Bullard and surrounding communities, including{' '}
              <a href="/longview-tx" style={{ color: '#000', textDecoration: 'underline' }}>Longview</a>,{' '}
              <a href="/jacksonville-tx" style={{ color: '#000', textDecoration: 'underline' }}>Jacksonville</a>,{' '}
              <a href="/lindale-tx" style={{ color: '#000', textDecoration: 'underline' }}>Lindale</a>,{' '}
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
              <img loading="lazy" width={600} height={400} src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/Exterior-Under-Eve-Flowers-scaled-e1746808919518.jpg" alt="Pest Control in Bullard TX" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BullardTX;
