
-- Page content overrides for service/pest pages
CREATE TABLE public.page_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text,
  subtitle text,
  intro text,
  video_url text,
  video_type text DEFAULT 'youtube' CHECK (video_type IN ('youtube', 'upload')),
  custom_content jsonb DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read page_content" ON public.page_content
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Authenticated users can insert page_content" ON public.page_content
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update page_content" ON public.page_content
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete page_content" ON public.page_content
  FOR DELETE TO authenticated USING (true);

-- Storage bucket for uploaded videos
INSERT INTO storage.buckets (id, name, public) VALUES ('videos', 'videos', true);

CREATE POLICY "Anyone can read videos" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'videos');

CREATE POLICY "Authenticated users can upload videos" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Authenticated users can delete videos" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'videos');
