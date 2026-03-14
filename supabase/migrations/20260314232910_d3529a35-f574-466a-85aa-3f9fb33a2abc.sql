
DO $$
DECLARE
  t_id uuid := '1282b822-825b-4713-9dc9-6d14a2094d06';
BEGIN
  -- Fix tenant_id on newly inserted rows
  UPDATE public.site_config SET tenant_id = t_id WHERE key IN ('seo:pest-control', 'seo:wasp-hornet-control', 'seo:flea-tick-control', 'seo:roach-control', 'seo:snake-control') AND tenant_id IS NULL;

  -- Update existing rows with refined copy
  UPDATE public.site_config SET seo_title = 'Spider Control & Removal | Safe Residential Treatments', seo_description = 'Clear out dangerous spiders from your home. Targeted treatments for brown recluse, black widows, and common house spiders. Seasonal barrier protection included.', updated_at = now() WHERE key = 'seo:spider-control' AND tenant_id = t_id;

  UPDATE public.site_config SET seo_title = 'Texas Scorpion Control | Professional Exterminator', seo_description = 'Keep scorpions out of your home. Specialist barrier treatments designed for the tough East Texas bark scorpion. Safe for kids and pets.', updated_at = now() WHERE key = 'seo:scorpion-control' AND tenant_id = t_id;

  UPDATE public.site_config SET seo_title = 'Mosquito Control & Fogging | Reclaim Your Yard', seo_description = 'Seasonal mosquito barrier sprays. Reduce mosquito populations by up to 90%. Perfect for backyard parties and summer safety.', updated_at = now() WHERE key = 'seo:mosquito-control' AND tenant_id = t_id;

  UPDATE public.site_config SET seo_title = 'Discreet Bed Bug Treatment | Professional Removal', seo_description = 'Professional heat or chemical treatments to kill bed bugs at all life stages. Fast, thorough, and 100% confidential service.', updated_at = now() WHERE key = 'seo:bed-bug-control' AND tenant_id = t_id;

  UPDATE public.site_config SET seo_title = 'Rat & Mouse Extermination | Rodent Proofing TX', seo_description = 'Trapping, baiting, and full-home exclusion. We find the entry points and seal them so rodents can''t return. Fast, discreet service.', updated_at = now() WHERE key = 'seo:rodent-control' AND tenant_id = t_id;

END $$;
