import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { supabase } from "@/integrations/supabase/client";
import { VideoImage } from "@/components/VideoImage";

interface LocationData {
  slug: string;
  city: string;
  hero_title: string;
  hero_description: string;
  intro: string;
  local_pest_description: string;
  map_embed_url: string;
  local_testimonial_quote: string;
  meta_title: string;
  meta_description: string;
  is_live: boolean;
  intro_video_url?: string;
}

const servicesList = [
  { name: "General Pest Control", slug: "pest-control", description: "Reliable solutions for all common household pests." },
  { name: "Mosquito Control", slug: "mosquito-control", description: "Proven methods to reduce mosquito populations so you can enjoy your yard." },
  { name: "Termite Inspections & Control", slug: "termite-inspections", description: "Thorough inspections and effective treatments to protect your home's structure." },
  { name: "Spider Control", slug: "spider-control", description: "Removing dangerous and invasive spiders effectively." },
  { name: "Ant Control", slug: "ant-control", description: "Keep ants out of your home for good." },
  { name: "Rodent Control", slug: "rodent-control", description: "Comprehensive strategies to protect your property from rodents." },
];

const whyCards = [
  { icon: "https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Proven-Results.png", title: "Local Expertise", desc: "Family-owned and operated, we know East Texas pest pressures inside and out." },
  { icon: "https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Safety.png", title: "Safe for Families & Pets", desc: "EPA-approved products that are tough on pests but gentle for your home." },
  { icon: "https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Guarantee.png", title: "Super Powered Guarantee", desc: "Pests come back between visits? So do we — free of charge." },
  { icon: "https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Super-Powered.png", title: "Referral Rewards", desc: "Refer a neighbor and earn a free month of service." },
];

const LocationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { seoTitle, seoDescription } = useSiteConfig(`/${slug}`);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [allLocations, setAllLocations] = useState<{ slug: string; city: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const [{ data: loc }, { data: all }] = await Promise.all([
        supabase.from("location_data").select("*").eq("slug", slug!).eq("is_live", true).maybeSingle(),
        supabase.from("location_data").select("slug, city").eq("is_live", true),
      ]);
      if (loc) setLocation(loc as LocationData);
      if (all) setAllLocations(all as { slug: string; city: string }[]);
      setLoading(false);
    };
    if (slug) fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <Navbar />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '128px 0' }}>
          <p style={{ color: '#999' }}>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!location) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Navbar />
        <h1 style={{ fontFamily: '"Bangers", cursive', fontSize: '36px', marginBottom: '16px' }}>Location Not Found</h1>
        <a href="/" style={{ padding: '12px 32px', background: 'hsl(28, 100%, 50%)', borderRadius: '50px', fontWeight: '700', color: '#fff', textDecoration: 'none' }}>Return Home</a>
      </div>
    );
  }

  const defaultIntro = `Pests don't wait, and neither should you. Dang Pest Control understands the unique environment and pest pressures in East Texas. Whether it's termites, mosquitoes, or general pests, we have you covered with family-friendly solutions and a Super Powered Guarantee.`;

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", color: 'hsl(20, 40%, 12%)', overflowX: 'hidden' }}>
      <SEO
        title={location.meta_title || seoTitle || `Pest Control in ${location.city}, TX`}
        description={location.meta_description || seoDescription || `Professional pest control services in ${location.city}, TX. Family-owned, licensed & insured. Call (903) 871-0550 for a free quote.`}
        canonical={`/${slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "PestControlService",
          name: `Dang Pest Control - ${location.city}`,
          telephone: "+19038710550",
          areaServed: { "@type": "City", name: location.city, addressRegion: "TX" },
        }}
      />
      <Navbar />
      <main>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        background: `url(/moblie_banner.webp) center/cover no-repeat, hsl(28, 100%, 50%)`,
        paddingTop: '80px',
        paddingBottom: '200px',
        minHeight: '420px',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.18) 2px, transparent 2px)',
          backgroundSize: '20px 20px',
          pointerEvents: 'none',
        }} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 20px 30px' }}>
          <h1 style={{
            fontFamily: '"Bangers", cursive',
            fontSize: 'clamp(48px, 7vw, 90px)',
            color: 'hsl(45, 95%, 60%)',
            fontStyle: 'italic',
            letterSpacing: '0.05em',
            WebkitTextStroke: '3px #000',
            textShadow: '3px 3px 0 #000',
            margin: 0,
            lineHeight: 1.05,
          }}>
            PEST CONTROL SERVICES IN<br />{location.city.toUpperCase()}, TX
          </h1>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
          <img fetchPriority="high" width={1200} height={50} src="/banner-img.png" alt="" style={{ width: '100%', display: 'block' }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — INTRO (image left, text right)
      ══════════════════════════════════════════════════════ */}
      <section style={{
        background: '#ffffff',
        backgroundImage: 'radial-gradient(circle, #d0d0d0 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}>
        <div style={{ padding: '80px 40px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div style={{ border: '5px solid hsl(45, 95%, 60%)', borderRadius: '8px', overflow: 'hidden', boxShadow: '8px 8px 0 rgba(0,0,0,0.1)' }}>
              <VideoImage
                src={(location as any).intro_image_url || "/exterior-treatment.jpg"}
                alt={`Pest Control Technician Providing Services in ${location.city} TX`}
                className=""
                videoUrl={location.intro_video_url}
                videoType="youtube"
              />
            </div>
            <div>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: '800', marginBottom: '18px', marginTop: 0 }}>
                Professional Pest &amp; Termite Control Services in {location.city}, TX
              </h2>
              <p style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '28px', color: '#444', marginTop: 0 }}>
                {location.intro || defaultIntro}
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="tel:9038710550" style={{
                  padding: '13px 28px', border: '2px solid hsl(20, 40%, 12%)', borderRadius: '50px',
                  fontWeight: '700', color: 'hsl(20, 40%, 12%)', textDecoration: 'none', fontSize: '15px', whiteSpace: 'nowrap',
                }}>
                  (903) 871-0550
                </a>
                <a href="/quote" style={{
                  padding: '13px 28px', background: 'hsl(28, 100%, 50%)', borderRadius: '50px',
                  fontWeight: '700', color: '#fff', textDecoration: 'none', fontSize: '15px', whiteSpace: 'nowrap',
                }}>
                  Get Your Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — OUR SERVICES
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#f1f1ef', padding: '70px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: '"Bangers", cursive',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontStyle: 'italic',
            textAlign: 'center',
            marginBottom: '40px',
            marginTop: 0,
          }}>
            Services We Offer in {location.city}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {servicesList.map((service) => (
              <a
                key={service.slug}
                href={`/${service.slug}`}
                style={{
                  background: '#fff', border: '2px solid #e5e5e5', borderRadius: '10px',
                  padding: '24px', textDecoration: 'none', color: 'inherit',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'hsl(28, 100%, 50%)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e5e5'; }}
              >
                <h3 style={{ fontFamily: '"Bangers", cursive', fontSize: '18px', marginBottom: '8px', marginTop: 0 }}>
                  {service.name}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#555', margin: 0 }}>
                  {service.description}
                </p>
              </a>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <a href="/quote" style={{
              display: 'inline-block', padding: '14px 40px', background: 'hsl(28, 100%, 50%)',
              borderRadius: '50px', fontWeight: '700', color: '#fff', textDecoration: 'none', fontSize: '16px',
            }}>
              Get Your Quote
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — WHY CHOOSE US (4 cards)
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: '70px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontWeight: '800', fontSize: 'clamp(26px, 3vw, 38px)', textAlign: 'center', marginBottom: '40px', marginTop: 0 }}>
            Why Choose Dang Pest Control?
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
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — PROTECT YOUR HOME CTA
      ══════════════════════════════════════════════════════ */}
      <section style={{
        background: 'hsl(28, 100%, 50%)',
        padding: '80px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.18) 2px, transparent 2px)',
          backgroundSize: '20px 20px',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '760px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: '"Bangers", cursive',
            fontSize: 'clamp(36px, 5vw, 62px)',
            fontStyle: 'italic',
            color: 'hsl(45, 95%, 60%)',
            WebkitTextStroke: '2px #000',
            textShadow: '2px 2px 0 #000',
            marginBottom: '16px', marginTop: 0,
          }}>
            PROTECT YOUR {location.city.toUpperCase()} HOME TODAY
          </h2>
          <p style={{ fontSize: '16px', color: '#fff', marginBottom: '32px', lineHeight: 1.7 }}>
            {location.local_pest_description || `Don't let pests take over your ${location.city} home. Our licensed technicians deliver fast, effective service backed by our Super Powered Guarantee.`}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:9038710550" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 32px', borderRadius: '50px',
              border: '2px solid #fff', color: '#fff',
              fontWeight: '700', fontSize: '15px', textDecoration: 'none',
            }}>
              (903) 871-0550
            </a>
            <a href="/quote" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '14px 32px', borderRadius: '50px',
              background: 'hsl(45, 95%, 60%)', color: 'hsl(20, 40%, 12%)',
              fontWeight: '700', fontSize: '15px', textDecoration: 'none',
              border: '2px solid #000',
            }}>
              Get Your Quote
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — WE ALSO SERVE
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '60px 40px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h3 style={{ fontFamily: '"Bangers", cursive', fontSize: '22px', marginBottom: '20px', marginTop: 0 }}>We Also Serve</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
          {allLocations
            .filter((loc) => loc.slug !== slug)
            .map((loc) => (
              <Link
                key={loc.slug}
                to={`/${loc.slug}`}
                style={{ color: 'hsl(28, 100%, 50%)', fontWeight: '600', textDecoration: 'none' }}
                onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
                onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
              >
                {loc.city}, TX
              </Link>
            ))}
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default LocationPage;
