
-- Add unique constraint for upsert support
ALTER TABLE site_config ADD CONSTRAINT site_config_key_tenant_id_unique UNIQUE (key, tenant_id);

-- Bulk insert SEO data for Dang Pest Control tenant
INSERT INTO site_config (key, tenant_id, seo_title, seo_description, value) VALUES
  ('seo:/', '1282b822-825b-4713-9dc9-6d14a2094d06', 'Dang Pest Control | Professional Pest & Termite Services', 'Professional pest control & termite protection for your home. Fast response, pet-safe treatments, and guaranteed results. Call for a free inspection!', '{}'),
  ('seo:/about', '1282b822-825b-4713-9dc9-6d14a2094d06', 'About Dang Pest Control | Our Mission & Local Expertise', 'Learn why we are the most trusted name in local pest control. Family-owned expertise dedicated to keeping your home safe and pest-free.', '{}'),
  ('seo:/quote', '1282b822-825b-4713-9dc9-6d14a2094d06', 'Free Pest Inspection Quote | Fast & Affordable Pest Control', 'Get a fast, free quote for pest or termite services. Affordable pricing and transparent service plans tailored to your home''s specific needs.', '{}'),
  ('seo:/service-area', '1282b822-825b-4713-9dc9-6d14a2094d06', 'Pest Control Service Areas | Local Exterminators Near You', 'Proudly serving your local community with expert extermination services. See our full list of service areas and schedule your local visit today.', '{}'),
  ('seo:/reviews', '1282b822-825b-4713-9dc9-6d14a2094d06', 'Dang Pest Control Reviews | See What Our Customers Say', 'Read 5-star reviews from your neighbors. Discover why homeowners trust Dang Pest Control for reliable, honest, and effective pest management.', '{}'),
  ('seo:/jacksonville', '1282b822-825b-4713-9dc9-6d14a2094d06', 'Pest Control in Jacksonville, TX | Dang Pest Control', 'Expert pest control and termite extermination in Jacksonville, TX. Local pros providing safe, effective residential treatments. Schedule your free quote!', '{}'),
  ('seo:/lindale', '1282b822-825b-4713-9dc9-6d14a2094d06', 'Exterminator & Pest Control in Lindale, TX | Dang Pest Control', 'Need an exterminator in Lindale, TX? Dang Pest Control offers comprehensive pest management for ants, spiders, rodents, and termites.', '{}'),
  ('seo:/bullard', '1282b822-825b-4713-9dc9-6d14a2094d06', 'Bullard TX Pest Control & Termite Services | Dang Pest Control', 'Reliable pest control services for Bullard, TX homeowners. Protect your property from local pests with our seasonal treatment plans.', '{}'),
  ('seo:/whitehouse', '1282b822-825b-4713-9dc9-6d14a2094d06', 'Best Pest Control in Whitehouse, TX | Dang Pest Control', 'Professional, pet-friendly pest control in Whitehouse, TX. We eliminate infestations at the source. Call today for a bug-free home tomorrow!', '{}');
