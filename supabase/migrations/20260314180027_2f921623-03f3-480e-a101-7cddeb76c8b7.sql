
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  featured_image text,
  published boolean NOT NULL DEFAULT false,
  author text NOT NULL DEFAULT 'Dang Pest Control',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published blog posts" ON public.blog_posts
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Authenticated users can insert blog posts" ON public.blog_posts
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update blog posts" ON public.blog_posts
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blog posts" ON public.blog_posts
  FOR DELETE TO authenticated USING (true);

-- Seed existing blog posts
INSERT INTO public.blog_posts (slug, title, excerpt, published) VALUES
  ('stop-mosquitoes-at-the-source-eliminate-standing-water', 'Stop Mosquitoes at the Source: Eliminate Standing Water', 'Learn how removing standing water around your property can drastically reduce mosquito populations.', true),
  ('stop-rats-and-mice-before-they-take-over-your-home-or-business', 'Stop Rats and Mice Before They Take Over Your Home or Business', 'Early signs and prevention tips for rodent infestations.', true),
  ('a-fresh-start-begins-with-professional-rodent-control-in-tyler', 'A Fresh Start Begins with Professional Rodent Control in Tyler', 'Why professional rodent control makes all the difference.', true),
  ('a-seasonal-guide-for-winter-bed-bug-treatments', 'A Seasonal Guide for Winter Bed Bug Treatments', 'Don''t let bed bugs take advantage of winter — stay protected.', true),
  ('5-effective-rodent-control-tips-for-a-pest-free-home', '5 Effective Rodent Control Tips for a Pest-Free Home', 'Simple steps you can take to keep rodents out.', true),
  ('say-goodbye-to-crickets-with-expert-cricket-control', 'Say Goodbye to Crickets with Expert Cricket Control', 'Professional cricket control solutions for East Texas homes.', true),
  ('tyler-pest-control-services-that-work', 'Tyler Pest Control Services That Work', 'Discover why Tyler homeowners choose Dang Pest Control.', true),
  ('why-are-there-so-many-pests-in-tyler-texas', 'Why Are There So Many Pests in Tyler, Texas?', 'Understanding the unique pest pressures of East Texas.', true);
