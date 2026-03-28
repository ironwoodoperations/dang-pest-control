import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { StructuredData } from '@/components/StructuredData';

const allPosts = [
  {
    slug: 'stop-mosquitoes-at-the-source-eliminate-standing-water',
    img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/06/MosquitoMist1-rotated-e1751059236354.jpg',
    alt: 'Mosquito Misting Treatments in Tyler TX',
    title: 'Stop Mosquitoes at the Source: Eliminate Standing Water',
  },
  {
    slug: 'stop-rats-and-mice-before-they-take-over-your-home-or-business',
    img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/05/house-mouse.jpg',
    alt: 'Eastern House Mouse and Rodent Control Services Tyler TX',
    title: 'Stop Rats and Mice Before They Take Over Your Home or Business',
  },
  {
    slug: 'a-fresh-start-begins-with-professional-rodent-control-in-tyler',
    img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/05/norway-rat.jpg',
    alt: 'Norway Brown Rat Control Services in Tyler TX',
    title: 'A Fresh Start Begins With Professional Rodent Control in Tyler',
  },
  {
    slug: 'a-seasonal-guide-for-winter-bed-bug-treatments',
    img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/05/bed-bug-2.jpg',
    alt: 'Bed Bug Treatments Tyler TX',
    title: 'A Seasonal Guide For Winter Bed Bug Treatments',
  },
  {
    slug: '5-effective-rodent-control-tips-for-a-pest-free-home',
    img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/05/norway-rat.jpg',
    alt: 'Norway Brown Rat Control Services in Tyler TX',
    title: '5 Effective Rodent Control Tips for a Pest-Free Home',
  },
  {
    slug: 'say-goodbye-to-crickets-with-expert-cricket-control',
    img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/05/Exterior-Deweb-Azaleas-scaled-e1746809466723.jpg',
    alt: 'Providing Pest Control Services in Whitehouse TX',
    title: 'Say Goodbye to Crickets with Expert Cricket Control',
  },
  {
    slug: 'tyler-pest-control-services-that-work',
    img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/06/MosquitoMist1-rotated-e1751059236354.jpg',
    alt: 'Tyler Pest Control Services',
    title: 'Tyler Pest Control Services That Work',
  },
  {
    slug: 'why-are-there-so-many-pests-in-tyler-texas',
    img: 'https://www.dangpestcontrol.com/wp-content/uploads/2025/05/Pets-Marvel-Outside-scaled-e1746459229132.jpg',
    alt: 'Why Are There So Many Pests in Tyler Texas',
    title: 'Why Are There So Many Pests in Tyler, Texas?',
  },
];

const POSTS_PER_PAGE = 6;
const recentPosts = allPosts.slice(0, 3);

const BlogPage = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const pagePosts = allPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", color: 'hsl(20, 40%, 12%)', overflowX: 'hidden' }}>
      <SEO
        title="Blog"
        description="Pest control tips, guides, and news from Dang Pest Control in Tyler, TX. Learn about mosquitoes, rodents, bed bugs, and more."
        canonical="/blog"
      />
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Dang Pest Control Blog",
        url: "https://dangpestcontrol.com/blog",
        publisher: {
          "@type": "Organization",
          name: "Dang Pest Control",
          url: "https://dangpestcontrol.com",
        },
        blogPost: allPosts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          image: post.img,
          url: `https://www.dangpestcontrol.com/blog/${post.slug}/`,
          author: { "@type": "Organization", name: "Dang Pest Control" },
        })),
      }} />
      <Navbar />
      <main>

      {/* HERO */}
      <section style={{
        position: 'relative',
        background: `url(/moblie_banner.webp) center/cover no-repeat, hsl(28, 100%, 50%)`,
        paddingTop: '80px',
        paddingBottom: '200px',
        minHeight: '420px',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.18) 1.5px, transparent 1.5px)', backgroundSize: '18px 18px', pointerEvents: 'none' }} />
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
            BLOG
          </h1>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
          <img fetchPriority="high" width={1200} height={50} src="/banner-img.png" alt="" style={{ width: '100%', display: 'block' }} />
        </div>
      </section>

      {/* MAIN CONTENT + SIDEBAR */}
      <section style={{ padding: '60px 40px 80px', maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '48px', alignItems: 'start' }}>

          {/* LEFT — blog grid */}
          <div>
            <h2 style={{ fontWeight: '800', fontSize: 'clamp(22px, 2.5vw, 32px)', marginBottom: '32px', marginTop: 0 }}>
              Recent Blog Posts
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '36px' }}>
              {pagePosts.map((post, i) => (
                <a
                  key={i}
                  href={`https://www.dangpestcontrol.com/blog/${post.slug}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit', border: '1px solid #e5e5e5', borderRadius: '6px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                >
                  <img loading="lazy" width={400} height={220} src={post.img} alt={post.alt} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
                  <div style={{ padding: '18px' }}>
                    <h3 style={{ fontWeight: '700', fontSize: '16px', lineHeight: 1.4, marginBottom: '12px', marginTop: 0 }}>{post.title}</h3>
                    <span style={{ fontSize: '14px', color: 'hsl(28, 100%, 50%)', fontWeight: '600', textDecoration: 'underline' }}>Read More</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Pagination */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}>
              {page > 1 && (
                <button onClick={() => setPage(p => p - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'hsl(28, 100%, 50%)', fontWeight: '600', fontSize: '15px', padding: '4px 8px' }}>
                  « Previous
                </button>
              )}
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: page === i + 1 ? '800' : '400',
                    color: page === i + 1 ? 'hsl(28, 100%, 50%)' : 'hsl(20, 40%, 12%)',
                    fontSize: '15px',
                    padding: '4px 8px',
                    textDecoration: page === i + 1 ? 'underline' : 'none',
                  }}
                >
                  {i + 1}
                </button>
              ))}
              {page < totalPages && (
                <button onClick={() => setPage(p => p + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'hsl(28, 100%, 50%)', fontWeight: '600', fontSize: '15px', padding: '4px 8px' }}>
                  Next »
                </button>
              )}
            </div>
          </div>

          {/* RIGHT — sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Recent Posts */}
            <div style={{ background: '#f3f3f1', borderRadius: '8px', padding: '24px' }}>
              <h3 style={{ fontWeight: '800', fontSize: '18px', marginBottom: '20px', marginTop: 0 }}>Recent Posts</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {recentPosts.map((post, i) => (
                  <a
                    key={i}
                    href={`https://www.dangpestcontrol.com/blog/${post.slug}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: '12px', alignItems: 'flex-start' }}
                  >
                    <img loading="lazy" width={72} height={72} src={post.img} alt={post.alt} style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }} />
                    <div>
                      <p style={{ fontWeight: '700', fontSize: '14px', lineHeight: 1.4, marginBottom: '6px', marginTop: 0 }}>{post.title}</p>
                      <span style={{ fontSize: '13px', color: 'hsl(28, 100%, 50%)', fontWeight: '600', textDecoration: 'underline' }}>Read More</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Orange CTA */}
            <div style={{
              background: 'hsl(28, 100%, 50%)',
              borderRadius: '8px',
              padding: '32px 24px',
              textAlign: 'center',
            }}>
              <h3 style={{
                fontFamily: '"Bangers", cursive',
                fontSize: 'clamp(22px, 2.5vw, 30px)',
                fontStyle: 'italic',
                color: '#fff',
                letterSpacing: '0.04em',
                marginBottom: '20px',
                marginTop: 0,
                lineHeight: 1.2,
              }}>
                SUPER POWERED PEST CONTROL!
              </h3>
              <a
                href="tel:(903) 871-0550"
                style={{
                  display: 'inline-block',
                  padding: '12px 28px',
                  border: '2px solid #fff',
                  borderRadius: '50px',
                  fontWeight: '700',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '15px',
                }}
              >
                Call us now
              </a>
            </div>

          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
