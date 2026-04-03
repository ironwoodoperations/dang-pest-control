import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const services = [
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/General.jpg', title: 'General\nPest Control', desc: 'Keep common pests like ants, spiders, and cockroaches at bay with reliable treatments.', href: '/pest-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/ant.jpg', title: 'Ant\nPest Control', desc: 'Eradicate nuisance ants before they wreak havoc on your home or yard.', href: '/ant-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/spider.jpg', title: 'Spider\nPest Control', desc: 'Effectively eliminate dangerous and bothersome spiders.', href: '/spider-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Wasps-Hornet.jpg', title: 'Wasp & Hornet\nPest Control', desc: 'Protect your family from painful stings with expert removal.', href: '/wasp-hornet-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Scorpion.jpg', title: 'Scorpion\nPest Control', desc: 'Protect your home from these unwelcome invaders.', href: '/scorpion-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Rodent.jpg', title: 'Rodent\nPest Control', desc: 'Keep your property and food supply free from rats and mice.', href: '/rodent-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Mosquito.jpg', title: 'Mosquito\nPest Control', desc: 'Reclaim your outdoor spaces with professional mosquito reduction.', href: '/mosquito-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Flea.jpg', title: 'Flea & Tick\nPest Control', desc: 'Keep your pets and family protected from disease-carrying parasites.', href: '/flea-tick-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Roach.jpg', title: 'Roach\nPest Control', desc: 'Eliminate roaches before they carry diseases into your home.', href: '/roach-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Bed-Bug.jpg', title: 'Bed Bug\nPest Control', desc: 'Rest easy again with our expert bed bug treatments.', href: '/bed-bug-control' },
  { img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/04/Termite.jpg', title: 'Termite Control', desc: 'Prevent costly damage by identifying and treating termites early.', href: '/termite-control' },
];

const whyCards = [
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Proven-Results.png', title: 'Integrated Pest Management Approach', desc: 'We identify the sources of your pest problem and provide long-term solutions, not just temporary fixes.' },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Comprehensive.png', title: 'Custom Treatment Plans', desc: 'Every home is unique, and so is our approach. We tailor our solutions to fit your specific situation.' },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Safety.png', title: 'Super Powered Guarantee', desc: 'Enjoy free re-treatments between regular visits if pests persist. Your satisfaction is our priority.' },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Guarantee.png', title: 'Referral Program', desc: 'Earn money for each referral who signs up for recurring pest control services.' },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Super-Powered.png', title: 'Licensed & Insured Technicians', desc: 'Our highly trained professionals are courteous, respectful, and responsive to your needs.' },
  { icon: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Custom-Plans.png', title: 'Eco-Friendly Solutions', desc: 'We use methods and products that are environmentally protective and family friendly.' },
];

const LindaleTX = () => {
  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", color: 'hsl(20, 40%, 12%)', overflowX: 'hidden' }}>
      <Navbar />
      <main>

      {/* HERO */}
      <section style={{ position: 'relative', background: `url(/moblie_banner.webp) center/cover no-repeat, hsl(28, 100%, 50%)`, paddingTop: '80px', paddingBottom: '200px', minHeight: '420px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.18) 1.5px, transparent 1.5px)', backgroundSize: '18px 18px', pointerEvents: 'none' }} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 20px 30px' }}>
          <h1 style={{ fontFamily: '"Bangers", cursive', fontSize: 'clamp(42px, 7vw, 88px)', color: 'hsl(45, 95%, 60%)', fontStyle: 'italic', letterSpacing: '0.05em', WebkitTextStroke: '3px #000000', textShadow: '3px 3px 0 #000000', margin: 0, lineHeight: 1.05 }}>
            PEST &amp; TERMITE CONTROL<br />SERVICES IN LINDALE, TX
          </h1>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
          <img fetchPriority="high" width={1200} height={50} src="/banner-img.png" alt="" style={{ width: '100%', display: 'block' }} />
        </div>
      </section>

      {/* INTRO */}
      <section className="px-4 md:px-10" style={{ paddingTop: '80px', paddingBottom: '60px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div style={{ border: '4px solid rgb(255, 213, 39)', borderRadius: '6px', overflow: 'hidden', boxShadow: '8px 8px 0 rgba(0,0,0,0.1)' }}>
            <img loading="lazy" width={600} height={400} src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/Interior-Sprayer-Crevice-Stove-1-scaled-e1746808347179.jpg" alt="Expert Pest Control Service in Lindale TX" style={{ width: '100%', display: 'block' }} />
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: '800', marginBottom: '18px', marginTop: 0 }}>
              Comprehensive Pest &amp; Termite Control Services in Lindale, TX
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              East Texas offers a thriving environment for pests—but you don't have to live with them. At{' '}
              <a href="/" style={{ color: '#000', textDecoration: 'underline' }}>Dang Pest Control</a>,
              we specialize in protecting homes and properties from pests that bring disease, discomfort, and damage. Our licensed and insured technicians provide trusted service with a personal touch, ensuring your property is comfortable and pest-free. Serving Lindale, TX, and surrounding areas, our family-owned, local business is committed to making your life easier with services you can trust. Call us today at{' '}
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
      <section className="px-4 md:px-10" style={{ paddingTop: '60px', paddingBottom: '0', background: '#f3f3f1' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontWeight: '800', fontSize: 'clamp(24px, 2.5vw, 36px)', textAlign: 'center', marginBottom: '16px', marginTop: 0 }}>Services We Offer</h2>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#444', textAlign: 'center', marginBottom: '40px', marginTop: 0 }}>
            Whatever pest problem you're facing, Dang Pest Control has the expertise and tools to handle it. Our comprehensive services include:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <section className="px-4 md:px-10" style={{ paddingTop: '70px', paddingBottom: '70px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', alignItems: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', margin: 0 }}>Why Choose Dang Pest Control?</h2>
          <p style={{ fontSize: '16px', color: '#444', lineHeight: 1.7, margin: 0 }}>
            With years of experience serving Lindale, TX, and surrounding areas, Dang Pest Control stands out as a trusted leader in pest management. Here's why you can depend on us:
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ marginBottom: '20px' }}>
          {whyCards.slice(0, 4).map((card, i) => (
            <div key={i} style={{ background: '#f3f3f1', borderRadius: '8px', padding: '28px 20px' }}>
              <img loading="lazy" width={56} height={56} src={card.icon} alt={card.title} style={{ width: '56px', height: '56px', objectFit: 'contain', marginBottom: '14px', display: 'block' }} />
              <h3 style={{ fontWeight: '800', fontSize: '16px', marginBottom: '10px', marginTop: 0 }}>{card.title}</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#555', margin: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyCards.slice(4).map((card, i) => (
            <div key={i} style={{ background: '#f3f3f1', borderRadius: '8px', padding: '28px 20px' }}>
              <img loading="lazy" width={56} height={56} src={card.icon} alt={card.title} style={{ width: '56px', height: '56px', objectFit: 'contain', marginBottom: '14px', display: 'block' }} />
              <h3 style={{ fontWeight: '800', fontSize: '16px', marginBottom: '10px', marginTop: 0 }}>{card.title}</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#555', margin: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — text left, dotted image right */}
      <section className="px-4 md:px-10" style={{ paddingTop: '0', paddingBottom: '80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', marginBottom: '20px', marginTop: 0 }}>
              Call Us Today or Get Your Free Quote
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '28px', color: '#444', marginTop: 0 }}>
              Dang Pest Control is proud to serve the people of Lindale and surrounding areas, including Tyler,{' '}
              <a href="/longview-tx" style={{ color: '#000', textDecoration: 'underline' }}>Longview</a>,{' '}
              <a href="/jacksonville-tx" style={{ color: '#000', textDecoration: 'underline' }}>Jacksonville</a>,{' '}
              <a href="/bullard-tx" style={{ color: '#000', textDecoration: 'underline' }}>Bullard</a>, and{' '}
              <a href="/whitehouse-tx" style={{ color: '#000', textDecoration: 'underline' }}>Whitehouse</a>.
              Our local roots mean we understand the unique challenges pests create in East Texas—and we know exactly how to solve them. Take the first step toward a pest-free home today. Call us today at{' '}
              <a href="tel:(903) 871-0550" style={{ color: '#000', fontWeight: '700' }}>(903) 871-0550</a>{' '}
              and <a href="/quote" style={{ color: '#000', textDecoration: 'underline' }}>get your quote</a>.
            </p>
            <a href="/quote" style={{ display: 'inline-block', padding: '14px 40px', background: 'hsl(28, 100%, 50%)', borderRadius: '50px', fontWeight: '700', color: '#fff', textDecoration: 'none', fontSize: '16px' }}>Get Your Quote</a>
          </div>
          <div style={{ position: 'relative', padding: '20px' }}>
            <div style={{ position: 'absolute', inset: 0, background: '#fff', backgroundImage: 'radial-gradient(circle, #d0d0d0 1px, transparent 1px)', backgroundSize: '22px 22px', borderRadius: '8px', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1, border: '4px solid rgb(255, 213, 39)', borderRadius: '6px', overflow: 'hidden', boxShadow: '8px 8px 0 rgba(0,0,0,0.1)' }}>
              <img loading="lazy" width={600} height={400} src="https://www.dangpestcontrol.com/wp-content/uploads/2025/05/Exterior-Flow-Zone-Side-Arbor-scaled-e1746808489299.jpg" alt="Local Pest and Termite Control Company in Lindale TX" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default LindaleTX;
