import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const blogPosts = [
  { slug: "stop-mosquitoes-at-the-source-eliminate-standing-water", title: "Stop Mosquitoes at the Source: Eliminate Standing Water", excerpt: "Learn how removing standing water around your property can drastically reduce mosquito populations." },
  { slug: "stop-rats-and-mice-before-they-take-over-your-home-or-business", title: "Stop Rats and Mice Before They Take Over Your Home or Business", excerpt: "Early signs and prevention tips for rodent infestations." },
  { slug: "a-fresh-start-begins-with-professional-rodent-control-in-tyler", title: "A Fresh Start Begins with Professional Rodent Control in Tyler", excerpt: "Why professional rodent control makes all the difference." },
  { slug: "a-seasonal-guide-for-winter-bed-bug-treatments", title: "A Seasonal Guide for Winter Bed Bug Treatments", excerpt: "Don't let bed bugs take advantage of winter — stay protected." },
  { slug: "5-effective-rodent-control-tips-for-a-pest-free-home", title: "5 Effective Rodent Control Tips for a Pest-Free Home", excerpt: "Simple steps you can take to keep rodents out." },
  { slug: "say-goodbye-to-crickets-with-expert-cricket-control", title: "Say Goodbye to Crickets with Expert Cricket Control", excerpt: "Professional cricket control solutions for East Texas homes." },
  { slug: "tyler-pest-control-services-that-work", title: "Tyler Pest Control Services That Work", excerpt: "Discover why Tyler homeowners choose Dang Pest Control." },
  { slug: "why-are-there-so-many-pests-in-tyler-texas", title: "Why Are There So Many Pests in Tyler, Texas?", excerpt: "Understanding the unique pest pressures of East Texas." },
];

const BlogIndex = () => (
  <>
    <SEO
      title="Blog"
      description="Pest control tips, guides, and news from Dang Pest Control in Tyler, TX."
      canonical="/blog"
    />
    <section className="hero-bg text-primary-foreground py-20 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-comic text-4xl md:text-5xl mb-4">Pest Control Blog</h1>
        <p className="text-lg opacity-90">Tips, guides, and news from your local pest experts.</p>
      </div>
    </section>
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="card-service text-left group">
              <h3 className="text-comic text-base mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-sm text-muted-foreground">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>
);

const BlogPost = ({ slug }: { slug: string }) => {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return (
      <section className="py-20 text-center">
        <h1 className="text-comic text-3xl mb-4">Post Not Found</h1>
        <Link to="/blog" className="btn-cta">Back to Blog</Link>
      </section>
    );
  }
  return (
    <>
      <SEO title={post.title} description={post.excerpt} canonical={`/blog/${slug}`} type="article" />
      <section className="hero-bg text-primary-foreground py-20 text-center">
        <div className="container mx-auto px-4">
          <Link to="/blog" className="text-sm opacity-70 hover:opacity-100 mb-4 inline-block">← Back to Blog</Link>
          <h1 className="text-comic text-3xl md:text-4xl mb-4">{post.title}</h1>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>
          <p className="text-muted-foreground leading-relaxed">
            Content coming soon. Check back for the full article or contact us at (903) 871-0550 for immediate assistance.
          </p>
        </div>
      </section>
    </>
  );
};

const BlogPage = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="min-h-screen">
      <Navbar />
      {slug ? <BlogPost slug={slug} /> : <BlogIndex />}
      <Footer />
    </div>
  );
};

export default BlogPage;
