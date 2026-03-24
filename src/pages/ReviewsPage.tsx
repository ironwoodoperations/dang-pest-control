import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const allReviews = [
  { initials: 'EM', name: 'Evelyn M', date: 'Mar 13, 2026', stars: 5, text: "They're always so friendly and kind whenever they service us! Definitely recommend!", source: 'google' },
  { initials: 'EC', name: 'Efrain Chavez', date: 'Mar 11, 2026', stars: 5, text: 'Kirk was absolutely amazing. He came in and took care of everything within just a few visits. We are very happy with the customer service and the quality of service.', source: 'google' },
  { initials: 'N', name: 'Nick', date: 'Mar 02, 2026', stars: 5, text: "Kirk is an absolute professional. He's been taking care of my businesses regularly. Sometimes coming in two times a day or even between visits if I so needed. Would not use anyone else!", source: 'google' },
  { initials: 'AC', name: 'Ashley Carter', date: 'Feb 22, 2026', stars: 5, text: 'Two great guys came out and took care of our wasp issue, they were super accommodating for our time restraint and even came out same day with little notice.', source: 'google' },
  { initials: 'HG', name: 'Holden Gautreaux', date: 'Feb 21, 2026', stars: 5, text: 'Great guys and great company! All of us at Smittys car wash recommend dang pest control for any and all pest needs.', source: 'google' },
  { initials: 'BC', name: 'Brandon C.', date: 'Feb 11, 2026', stars: 5, text: 'Kirk was awesome! Came in, quickly identified our issues, developed a plan to attack them and we are ready to roll! Fast service, open lines of communication.', source: 'google' },
  { initials: 'LH', name: 'Lori Hayes', date: 'Feb 11, 2026', stars: 5, text: 'Great experience! They were fast, friendly, and very professional. Showed up on time, explained everything clearly, and got the job done quickly. Highly recommend!', source: 'google' },
  { initials: 'DR', name: 'Diana Rodriguez', date: 'Feb 10, 2026', stars: 5, text: 'Highly recommend Dang Pest Control. Kirk is going to meet your needs with quick results. German cockroaches. I saw huge results within the first 2 days.', source: 'google' },
  { initials: 'MP', name: 'Matthew Paul', date: 'Jan 23, 2026', stars: 5, text: 'Kirk is awesome! Great price but even better service! Straightforward, knowledgeable and honest. Gets the job done correctly. Highly recommended.', source: 'google' },
  { initials: 'JR', name: 'James Rubino', date: 'Jan 12, 2026', stars: 5, text: 'Dang Pest Control is extremely professional and explained exactly what was needed. They are extremely competitive in price and actually the best price around.', source: 'google' },
  { initials: 'MD', name: 'Matt Draffen', date: 'Dec 22, 2025', stars: 5, text: "Kirk is great! Extremely knowledgeable and professional. Will make sure and do a DANG good job!", source: 'google' },
  { initials: 'KC', name: 'Kathreen Cobb', date: 'Oct 27, 2025', stars: 5, text: "Very nice and pleasant person and did a fabulous job job will definitely be recommending to everyone I know!! Also his prices were very reasonable!", source: 'google' },
  { initials: 'LL', name: 'Lizzie Lunn', date: 'Oct 27, 2025', stars: 5, text: "About wonderful experience lovely person and very thorough with his job couldn't be happier! If I could give six stars, I most definitely would!!", source: 'google' },
  { initials: 'DM', name: 'Dena Mojica', date: 'Oct 14, 2025', stars: 5, text: 'Love working with Dang Pest Control! It was easy to reach a live person and receive service promptly. After his service, I received a nice detailing of what was done.', source: 'google' },
  { initials: 'LH', name: 'Lexi Hardin', date: 'Oct 08, 2025', stars: 5, text: 'Kirk was so thorough and full of knowledge. I felt as though pricing was fair. I am happy with my service and will recommend to friends and family!', source: 'google' },
  { initials: 'TB', name: 'Theresa Byrd', date: 'Sep 24, 2025', stars: 5, text: 'Dang good work! Dispatched my wasp problem (in my truck and catio!) in record time. Reasonable price and a very kind person!', source: 'google' },
];

const INITIAL_COUNT = 8;
const LOAD_MORE_COUNT = 8;

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const ReviewsPage = () => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visibleReviews = allReviews.slice(0, visibleCount);

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", color: 'hsl(20, 40%, 12%)', overflowX: 'hidden' }}>
      <Navbar />

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
            CUSTOMER REVIEWS
          </h1>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
          <img fetchPriority="high" width={1200} height={50} src="/banner-img.png" alt="" style={{ width: '100%', display: 'block' }} />
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section style={{ padding: '60px 40px 80px', maxWidth: '1300px', margin: '0 auto' }}>

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ fontWeight: '800', fontSize: 'clamp(20px, 2.2vw, 28px)', margin: 0 }}>
            What our clients say about us
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '48px', fontWeight: '800', lineHeight: 1 }}>5.00</div>
              <div style={{ display: 'flex', gap: '3px', margin: '4px 0' }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: 'hsl(28, 100%, 50%)', fontSize: '22px' }}>★</span>
                ))}
              </div>
              <div style={{ fontSize: '14px', color: 'hsl(28, 100%, 50%)', fontWeight: '600' }}>37 reviews</div>
            </div>
            <a
              href="https://g.page/r/review"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '14px 28px',
                background: 'hsl(207, 90%, 42%)',
                borderRadius: '6px',
                fontWeight: '700',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '15px',
                whiteSpace: 'nowrap',
              }}
            >
              Write a review
            </a>
          </div>
        </div>

        {/* Review cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {visibleReviews.map((review, i) => (
            <div key={i} style={{ background: '#f3f3f1', borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                {/* Stars + date */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: 'hsl(28, 100%, 50%)', fontWeight: '800', fontSize: '16px' }}>{review.stars}</span>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(review.stars)].map((_, j) => (
                        <span key={j} style={{ color: 'hsl(28, 100%, 50%)', fontSize: '14px' }}>★</span>
                      ))}
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', color: '#888' }}>{review.date}</span>
                </div>

                {/* Review text */}
                <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#444', margin: '0 0 16px' }}>{review.text}</p>
              </div>

              {/* Reviewer row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'hsl(207, 40%, 55%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '13px',
                    flexShrink: 0,
                  }}>
                    {review.initials}
                  </div>
                  <span style={{ fontWeight: '600', fontSize: '14px', color: 'hsl(20, 40%, 12%)' }}>{review.name}</span>
                </div>
                <GoogleIcon />
              </div>
            </div>
          ))}
        </div>

        {/* Load More + Powered by */}
        {visibleCount < allReviews.length && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <button
              onClick={() => setVisibleCount(v => Math.min(v + LOAD_MORE_COUNT, allReviews.length))}
              style={{
                padding: '12px 32px',
                background: 'none',
                border: '2px solid hsl(20, 40%, 12%)',
                borderRadius: '50px',
                fontWeight: '700',
                fontSize: '15px',
                cursor: 'pointer',
                color: 'hsl(20, 40%, 12%)',
              }}
            >
              Load More
            </button>
            <span style={{ fontSize: '13px', color: '#888' }}>Powered by <strong>LeadFusion Local</strong></span>
          </div>
        )}
        {visibleCount >= allReviews.length && (
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '13px', color: '#888' }}>Powered by <strong>LeadFusion Local</strong></span>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default ReviewsPage;
