
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL DEFAULT '',
  text text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  is_featured boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read testimonials" ON public.testimonials
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Authenticated users can insert testimonials" ON public.testimonials
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update testimonials" ON public.testimonials
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete testimonials" ON public.testimonials
  FOR DELETE TO authenticated USING (true);

-- Seed with existing hardcoded data
INSERT INTO public.testimonials (name, title, text, rating, sort_order) VALUES
  ('Cara D.', 'So Helpful!', 'Oh my gosh I love Dang so much! Kirk is always so helpful, informative and nice!', 5, 1),
  ('Murray S.', 'Professional & Super Friendly', 'Dang Pest Control is very professional and super friendly! I love that they always explain what they are doing and follow up after the service. Highly recommend!', 5, 2),
  ('Shelley H.', 'Quick Treatment & Suggestions', 'When we moved into our new Barndominium, we apparently brought German Cockroaches in with our moving boxes. Dang quickly discovered where they were coming from and treated them. We haven''t had any issues since!', 5, 3),
  ('Kelley S.', 'Friendly & Informative', 'Dang is so friendly and informative. We recommend everyone use them!', 5, 4);
