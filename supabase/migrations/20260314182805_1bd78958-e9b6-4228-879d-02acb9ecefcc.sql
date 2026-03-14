
CREATE TABLE public.location_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  city text NOT NULL,
  hero_title text NOT NULL DEFAULT '',
  intro text NOT NULL DEFAULT '',
  local_pest_description text NOT NULL DEFAULT '',
  map_embed_url text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.location_data ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can read location_data"
  ON public.location_data FOR SELECT TO anon, authenticated
  USING (true);

-- Admin/editor write
CREATE POLICY "Admins and editors can insert location_data"
  ON public.location_data FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins and editors can update location_data"
  ON public.location_data FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins and editors can delete location_data"
  ON public.location_data FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
