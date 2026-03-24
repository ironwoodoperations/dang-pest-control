import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

const cities = [
  "Tyler", "Longview", "Lindale", "Bullard", "Whitehouse", "Jacksonville",
  "Arp", "Ben Wheeler", "Brownsboro", "Athens", "Canton", "Chandler",
  "Chappell Hill", "Edom", "Flint", "Gilmer", "Gladewater", "Hawkins",
  "Henderson", "Hideaway", "Holly Lake Ranch", "Kilgore", "Mineola",
  "Noonday", "Quitman", "Troup", "Van", "Winona",
];

const cityToSlug = (city: string) =>
  city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-tx';

const ServiceArea = () => {
  const [liveSlugs, setLiveSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    supabase
      .from('location_data')
      .select('slug')
      .eq('is_live', true)
      .then(({ data }) => {
        if (data) setLiveSlugs(new Set(data.map((r: { slug: string }) => r.slug)));
      });
  }, []);

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", color: 'hsl(20, 40%, 12%)', overflowX: 'hidden' }}>
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
            OUR SERVICE AREA
          </h1>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
          <img fetchPriority="high" width={1200} height={50} src="/banner-img.png" alt="" style={{ width: '100%', display: 'block' }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          GOOGLE MAP
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '60px 40px 0', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ border: '4px solid rgb(255, 213, 39)', borderRadius: '6px', overflow: 'hidden', boxShadow: '8px 8px 0 rgba(0,0,0,0.1)' }}>
          <iframe
            title="Dang Pest Control Service Area"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d419080.3!2d-95.3!3d32.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x863148f6997feacd%3A0x1a8a8a8a8a8a8a8a!2sTyler%2C%20TX!5e0!3m2!1sen!2sus!4v1"
            width="100%"
            height="500"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CITY GRID
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '60px 40px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '40px 20px',
          textAlign: 'center',
        }}>
          {cities.map((city) => {
            const slug = cityToSlug(city);
            const isLive = liveSlugs.has(slug);
            return (
              <div key={city} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 0C8.06 0 0 8.06 0 18C0 31.5 18 44 18 44C18 44 36 31.5 36 18C36 8.06 27.94 0 18 0ZM18 24C14.69 24 12 21.31 12 18C12 14.69 14.69 12 18 12C21.31 12 24 14.69 24 18C24 21.31 21.31 24 18 24Z" fill="hsl(28, 100%, 50%)"/>
                </svg>
                {isLive ? (
                  <a href={`/${slug}`} style={{ fontWeight: '700', fontSize: '16px', color: 'hsl(20, 40%, 12%)', textDecoration: 'underline' }}>
                    {city}, TX
                  </a>
                ) : (
                  <span style={{ fontWeight: '700', fontSize: '16px', color: 'hsl(20, 40%, 12%)' }}>
                    {city}, TX
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default ServiceArea;
