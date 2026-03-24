import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const services = [
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/General.jpg', title: 'General\nPest Control', desc: 'Eliminate common household pests once and for all.', href: '/pest-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/ant.jpg', title: 'Ant Control &\nSpider Control', desc: 'Protect your home from nuisance and potentially harmful pests.', href: '/ant-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Wasps-Hornet.jpg', title: 'Wasp & Hornet\nPest Control', desc: 'Enjoy your outdoor spaces more with effective wasp and hornet treatments.', href: '/wasp-hornet-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Scorpion.jpg', title: 'Scorpion\nPest Control', desc: 'Protect your family and pets from these dangerous invaders.', href: '/scorpion-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Rodent.jpg', title: 'Rodent\nPest Control', desc: 'Keep your house free of mice and rats with our proven methods.', href: '/rodent-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Mosquito.jpg', title: 'Mosquito\nPest Control', desc: 'Enjoy your outdoor spaces again with effective mosquito treatments.', href: '/mosquito-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Flea.jpg', title: 'Flea & Tick\nPest Control', desc: 'Protect your loved ones from these disease-carrying pests.', href: '/flea-tick-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Roach.jpg', title: 'Roach\nControl', desc: 'Get rid of cockroaches to prevent health risks and property damage.', href: '/roach-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Bed-Bug.jpg', title: 'Bed Bug\nControl', desc: 'Sleep peacefully knowing our solutions will effectively eliminate bed bugs.', href: '/bed-bug-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Termite.jpg', title: 'Termite Inspections\n& Termite Control', desc: "Preserve your property's value with comprehensive termite inspections and proactive treatments.", href: '/termite-inspections' },
];

const whyCards = [
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Proven-Results.png', title: 'Family-Owned & Local', desc: "We're proud to serve our community with care and commitment." },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Comprehensive.png', title: 'Tailored Solutions', desc: 'Our licensed and insured technicians provide customized treatment plans designed to eradicate existing pests and prevent their return.' },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Safety.png', title: 'Family & Pet Friendly', desc: 'We use only the approved products to protect your loved ones and the environment.' },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Guarantee.png', title: 'Responsive, Courteous Service', desc: "You'll always be treated with professionalism, respect, and kindness." },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Super-Powered.png', title: 'Super Powered Guarantee', desc: "If pests return between scheduled treatments, we'll re-treat your property free of charge." },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Custom-Plans.png', title: 'Referral Program', desc: "Refer a friend and earn money when they sign up for recurring services. It's our way of saying thank you for trusting us!" },
];

const WhitehouseTX = () => {
  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", color: 'hsl(20, 40%, 12%)', overflowX: 'hidden' }}>
      <Navbar />
      <main>

      {/* HERO */}
      <section style={{ position: 'relative', background: `url(/moblie_banner.webp) center/cover no-repeat, hsl(28, 100%, 50%)`, paddingTop: '80px', paddingBottom: '200px', minHeight: '420px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.18) 1.5px, transparent 1.5px)', backgroundSize: '18px 18px', pointerEvents: 'none' }} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 20px 30px' }}>
          <h1 style={{ fontFamily: '"Bangers", cursive', fontSize: 'clamp(42px, 7vw, 88px)', color: 'hsl(45, 95%, 60%)', fontStyle: 'italic', letterSpacing: '0.05em', WebkitTextStroke: '3px #000000', textShadow: '3px 3px 0 #000000', margin: 0, lineHeight: 1.05 }}>
            PEST CONTROL SERVICES IN<br />WHITEHOUSE, TX
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
            <img loading="lazy" width={600} height={400} src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/Interior-Attic-Inspectoin-scaled-e1746809087231.jpg" alt="Pest Inspection and Control Treatment Services in Whitehouse TX" style={{ width: '100%', display: 'block' }} />
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: '800', marginBottom: '18px', marginTop: 0 }}>
              Expert Pest &amp; Termite Control Services in Whitehouse, TX
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              Pests don't belong in your home or business. At{' '}
              <a href="/" style={{ color: '#000', textDecoration: 'underline' }}>Dang Pest Control</a>,
              we provide tailored, reliable{' '}
              <a href="/pest-control" style={{ color: '#000', textDecoration: 'underline' }}>pest control services</a>{' '}
              to protect your property, ensure your comfort, and preserve your peace of mind. Serving Whitehouse, TX, and surrounding areas, our family-owned, local business is committed to making your life easier with services you can trust. Call us today at{' '}
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

      {/* SERVICES */}
      <section style={{ padding: '60px 40px 0', background: '#f3f3f1' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontWeight: '800', fontSize: 'clamp(24px, 2.5vw, 36px)', textAlign: 'center', marginBottom: '16px', marginTop: 0 }}>Comprehensive Pest Control Services</h2>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', textAlign: 'center', marginBottom: '16px', marginTop: 0 }}>
            We specialize in eliminating and preventing a wide range of pests that thrive in East Texas. Whether you're dealing with disease-carrying pests, destructive termites, or pesky mosquitos, our expert technicians have you covered.
          </p>
          <h3 style={{ fontWeight: '800', fontSize: 'clamp(20px, 2vw, 28px)', textAlign: 'center', marginBottom: '40px', marginTop: '24px' }}>Our Services Include</h3>
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
          <div style={{ textAlign: 'center', padding: '48px 0 60px' }}>
            <a href="/quote" style={{ display: 'inline-block', padding: '14px 40px', background: 'hsl(28, 100%, 50%)', borderRadius: '50px', fontWeight: '700', color: '#fff', textDecoration: 'none', fontSize: '16px' }}>Get Your Quote</a>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ padding: '70px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', alignItems: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', margin: 0 }}>Why Choose Dang Pest Control?</h2>
          <p style={{ fontSize: '16px', color: '#444', lineHeight: 1.7, margin: 0 }}>
            When it comes to protecting your home or business, you need a partner you can trust. Here's why Whitehouse, TX, homeowners and property managers rely on Dang Pest Control:
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

      {/* CTA */}
      <section style={{ padding: '0 40px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', marginBottom: '20px', marginTop: 0 }}>
              Call Us Today &amp; Get Your Quote
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              Located in Tyler, TX, Dang Pest Control proudly serves Whitehouse,{' '}
              <a href="/longview-tx" style={{ color: '#000', textDecoration: 'underline' }}>Longview</a>,{' '}
              <a href="/jacksonville-tx" style={{ color: '#000', textDecoration: 'underline' }}>Jacksonville</a>,{' '}
              <a href="/lindale-tx" style={{ color: '#000', textDecoration: 'underline' }}>Lindale</a>,{' '}
              <a href="/bullard-tx" style={{ color: '#000', textDecoration: 'underline' }}>Bullard</a>,
              and surrounding East Texas communities. Protect your home and your peace of mind with professionals dedicated to your comfort and satisfaction. Call us today at{' '}
              <a href="tel:(903) 871-0550" style={{ color: '#000', fontWeight: '700' }}>(903) 871-0550</a>{' '}
              and <a href="/quote" style={{ color: '#000', textDecoration: 'underline' }}>get your quote</a>.
            </p>
            <a href="/quote" style={{ display: 'inline-block', padding: '14px 40px', background: 'hsl(28, 100%, 50%)', borderRadius: '50px', fontWeight: '700', color: '#fff', textDecoration: 'none', fontSize: '16px' }}>Get Your Quote</a>
          </div>
          <div style={{ position: 'relative', padding: '20px' }}>
            <div style={{ position: 'absolute', inset: 0, background: '#fff', backgroundImage: 'radial-gradient(circle, #d0d0d0 1px, transparent 1px)', backgroundSize: '22px 22px', borderRadius: '8px', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1, border: '4px solid rgb(255, 213, 39)', borderRadius: '6px', overflow: 'hidden', boxShadow: '8px 8px 0 rgba(0,0,0,0.1)' }}>
              <img loading="lazy" width={600} height={400} src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/Exterior-Deweb-Azaleas-scaled-e1746809466723.jpg" alt="Providing Pest Control Services in Whitehouse TX" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default WhitehouseTX;
