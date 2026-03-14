
DO $$
DECLARE
  t_id uuid := '1282b822-825b-4713-9dc9-6d14a2094d06';
BEGIN
  -- Contact page
  INSERT INTO public.site_config (key, tenant_id, value, seo_title, seo_description)
  VALUES ('seo:/contact', t_id, '{}'::jsonb,
    'Contact Dang Pest Control | Tyler & East TX',
    'Call (903) 871-0550 or visit us online. Professional pest control services in Tyler, Jacksonville, and East Texas. Fast response times.');

  -- Blog
  INSERT INTO public.site_config (key, tenant_id, value, seo_title, seo_description)
  VALUES ('seo:/blog', t_id, '{}'::jsonb,
    'Pest Control Tips & News | Dang Pest Control Blog',
    'Expert tips on pest prevention, seasonal pest guides, and East Texas pest control news from the team at Dang Pest Control.');

  -- FAQ
  INSERT INTO public.site_config (key, tenant_id, value, seo_title, seo_description)
  VALUES ('seo:/faq', t_id, '{}'::jsonb,
    'Pest Control FAQ | Common Questions Answered',
    'Answers to frequently asked questions about pest control services, pricing, safety, and scheduling. Get informed before you call.');

  -- Accessibility
  INSERT INTO public.site_config (key, tenant_id, value, seo_title, seo_description)
  VALUES ('seo:/accessibility', t_id, '{}'::jsonb,
    'Accessibility Statement | Dang Pest Control',
    'Our commitment to web accessibility. Learn about our efforts to make our website usable for everyone.');

  -- Termite Inspections (service slug without leading slash)
  INSERT INTO public.site_config (key, tenant_id, value, seo_title, seo_description)
  VALUES ('seo:termite-inspections', t_id, '{}'::jsonb,
    'Termite Inspections & WDI Reports | East TX',
    'Certified termite inspections for home buyers and sellers. Wood-Destroying Insect (WDI) reports available same-day. Protect your investment.');

END $$;
