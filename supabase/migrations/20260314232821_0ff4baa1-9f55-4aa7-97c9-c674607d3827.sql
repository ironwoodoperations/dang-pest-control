
DO $$
DECLARE
  t_id uuid;
BEGIN
  SELECT id INTO t_id FROM public.tenants WHERE company_name = 'Dang' LIMIT 1;

  -- NEW rows: pest-control, wasp-hornet-control, flea-tick-control, roach-control, snake-control
  INSERT INTO public.site_config (key, tenant_id, value, seo_title, seo_description) VALUES
    ('seo:pest-control', t_id, '{}'::jsonb, 'Professional General Pest Control Jacksonville TX', 'Complete pest management for your home and business. We eliminate ants, spiders, roaches, and more with pet-safe, eco-friendly treatments. Free inspections available.'),
    ('seo:wasp-hornet-control', t_id, '{}'::jsonb, 'Wasp, Hornet & Yellow Jacket Removal | Dang Pest Control', 'Dangerous nest removal made safe. We eliminate stinging insects and prevent them from rebuilding on your eaves and porch.'),
    ('seo:flea-tick-control', t_id, '{}'::jsonb, 'Flea & Tick Yard Treatments | Jacksonville TX', 'Stop the itch. Professional yard and home treatments to eliminate fleas and ticks. Protect your pets and family from biting insects.'),
    ('seo:roach-control', t_id, '{}'::jsonb, 'Emergency Roach Extermination | Fast Results', 'Complete elimination of German and American cockroaches. Advanced baiting and IGR treatments to break the breeding cycle.'),
    ('seo:snake-control', t_id, '{}'::jsonb, 'Safe Snake Removal & Repellent Services | East TX', 'Humane snake relocation and professional repellents to keep snakes away from your perimeter. Expert advice on habitat modification.');

  -- UPDATE existing rows with refined copy
  UPDATE public.site_config SET seo_title = 'Termite Treatment & Inspections | Dang Pest Control', seo_description = 'Protect your biggest investment. Our certified termite inspections and treatment plans eliminate colonies fast. WDI reports, liquid barriers, and bait systems available.', updated_at = now() WHERE key = 'seo:termite-control' AND tenant_id = t_id;

  UPDATE public.site_config SET seo_title = 'Professional Ant Extermination Jacksonville & Lindale', seo_description = 'Stop ant invasions at the source. We treat fire ants, carpenter ants, and sugar ants with targeted baiting and perimeter defense. Fast results guaranteed.', updated_at = now() WHERE key = 'seo:ant-control' AND tenant_id = t_id;

  UPDATE public.site_config SET seo_title = 'Spider Control & Removal | Safe Residential Treatments', seo_description = 'Clear out dangerous spiders from your home. Targeted treatments for brown recluse, black widows, and common house spiders. Seasonal barrier protection included.', updated_at = now() WHERE key = 'seo:spider-control' AND tenant_id = t_id;

  UPDATE public.site_config SET seo_title = 'Texas Scorpion Control | Professional Exterminator', seo_description = 'Keep scorpions out of your home. Specialist barrier treatments designed for the tough East Texas bark scorpion. Safe for kids and pets.', updated_at = now() WHERE key = 'seo:scorpion-control' AND tenant_id = t_id;

  UPDATE public.site_config SET seo_title = 'Rat & Mouse Extermination | Rodent Proofing TX', seo_description = 'Trapping, baiting, and full-home exclusion. We find the entry points and seal them so rodents can''t return. Fast, discreet service.', updated_at = now() WHERE key = 'seo:rodent-control' AND tenant_id = t_id;

  UPDATE public.site_config SET seo_title = 'Mosquito Control & Fogging | Reclaim Your Yard', seo_description = 'Seasonal mosquito barrier sprays. Reduce mosquito populations by up to 90%. Perfect for backyard parties and summer safety.', updated_at = now() WHERE key = 'seo:mosquito-control' AND tenant_id = t_id;

  UPDATE public.site_config SET seo_title = 'Discreet Bed Bug Treatment | Professional Removal', seo_description = 'Professional heat or chemical treatments to kill bed bugs at all life stages. Fast, thorough, and 100% confidential service.', updated_at = now() WHERE key = 'seo:bed-bug-control' AND tenant_id = t_id;

END $$;
