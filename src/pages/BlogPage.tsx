import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Calendar, User, ArrowLeft } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  author: string;
  published: boolean;
  created_at: string;
}

const BlogIndex = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setPosts(data as BlogPost[]);
        setLoading(false);
      });
  }, []);

  return (
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
          {loading ? (
            <p className="text-center text-muted-foreground">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground">No posts yet. Check back soon!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="card-service text-left group overflow-hidden">
                  {post.featured_image && (
                    <img src={post.featured_image} alt={post.title} className="w-full h-40 object-cover rounded-lg mb-4" loading="lazy" />
                  )}
                  <h3 className="text-comic text-base mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

const BlogPostView = ({ slug }: { slug: string }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setPost(data as BlogPost);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </section>
    );
  }

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
          <Link to="/blog" className="text-sm opacity-70 hover:opacity-100 mb-4 inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <h1 className="text-comic text-3xl md:text-4xl mb-4">{post.title}</h1>
          <div className="flex justify-center items-center gap-4 text-sm opacity-80">
            <span className="flex items-center gap-1"><User className="h-4 w-4" /> {post.author}</span>
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(post.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {post.featured_image && (
            <img src={post.featured_image} alt={post.title} className="w-full rounded-xl mb-8 shadow-lg" loading="lazy" />
          )}
          {post.content ? (
            <div
              className="prose prose-lg max-w-none text-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>{post.excerpt}</p>
              <p>Full content coming soon. Contact us at (903) 871-0550 for immediate assistance.</p>
            </div>
          )}
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
      {slug ? <BlogPostView slug={slug} /> : <BlogIndex />}
      <Footer />
    </div>
  );
};

export default BlogPage;
