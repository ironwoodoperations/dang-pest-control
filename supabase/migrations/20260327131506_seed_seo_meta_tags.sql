INSERT INTO site_config (tenant_id, key, value, seo_title, seo_description)
SELECT t.id, k.key, '{}'::jsonb, k.seo_title, k.seo_description
FROM (VALUES
  ('seo:/pest-control',        'Local Pest Control Services in Tyler, TX | Dang Pest Control',           'Dang Pest Control provides expert general pest control in Tyler, TX & East Texas. Family-owned, licensed & insured. Call (903) 871-0550.'),
  ('seo:/termite-control',     'Termite Control Services in Tyler, TX | Dang Pest Control',              'Professional termite control & treatment in Tyler, TX. Protect your home from termite damage. Call Dang Pest Control at (903) 871-0550.'),
  ('seo:/termite-inspections', 'Termite Inspections in Tyler, TX | Dang Pest Control',                  'Licensed termite inspections in Tyler, TX & East Texas. Fast, thorough, and affordable. Call Dang Pest Control at (903) 871-0550.'),
  ('seo:/ant-control',         'Ant Control Services in Tyler, TX | Dang Pest Control',                 'Get rid of ants fast with professional ant control in Tyler, TX. Family-safe treatments & guaranteed results. Call (903) 871-0550.'),
  ('seo:/spider-control',      'Spider Control Services in Tyler, TX | Dang Pest Control',              'Expert spider control in Tyler, TX including black widow & brown recluse removal. Call Dang Pest Control at (903) 871-0550.'),
  ('seo:/wasp-hornet-control', 'Wasp & Hornet Control in Tyler, TX | Dang Pest Control',               'Safe, fast wasp and hornet removal in Tyler, TX & East Texas. Licensed technicians, family-safe treatments. Call (903) 871-0550.'),
  ('seo:/scorpion-control',    'Scorpion Control Services in Tyler, TX | Dang Pest Control',            'Professional scorpion pest control in Tyler, TX. Protect your family from dangerous scorpions. Call Dang Pest Control (903) 871-0550.'),
  ('seo:/rodent-control',      'Rodent Control Services in Tyler, TX | Dang Pest Control',              'Expert mouse & rat control in Tyler, TX. We eliminate rodents and seal entry points. Call Dang Pest Control at (903) 871-0550.'),
  ('seo:/mosquito-control',    'Mosquito Control Services in Tyler, TX | Dang Pest Control',            'Enjoy your yard again with professional mosquito control in Tyler, TX. Seasonal & year-round plans. Call (903) 871-0550.'),
  ('seo:/flea-tick-control',   'Flea & Tick Control in Tyler, TX | Dang Pest Control',                 'Get rid of fleas and ticks fast in Tyler, TX. Safe for kids & pets. Call Dang Pest Control at (903) 871-0550.'),
  ('seo:/roach-control',       'Cockroach Control Services in Tyler, TX | Dang Pest Control',          'Expert cockroach extermination in Tyler, TX. We eliminate German roaches, American roaches & more. Call (903) 871-0550.'),
  ('seo:/bed-bug-control',     'Bed Bug Control Services in Tyler, TX | Dang Pest Control',            'Professional bed bug treatment in Tyler, TX. Fast, effective, discreet service. Call Dang Pest Control at (903) 871-0550.'),
  ('seo:/longview-tx',         'Pest Control in Longview, TX | Dang Pest Control',                     'Expert pest & termite control in Longview, TX. Family-owned, licensed & insured. Call Dang Pest Control at (903) 871-0550.'),
  ('seo:/jacksonville-tx',     'Pest Control in Jacksonville, TX | Dang Pest Control',                 'Professional pest control services in Jacksonville, TX. Locally owned & operated. Call Dang Pest Control at (903) 871-0550.'),
  ('seo:/lindale-tx',          'Pest Control in Lindale, TX | Dang Pest Control',                      'Trusted pest & termite control in Lindale, TX. Family-safe treatments & guaranteed results. Call (903) 871-0550.'),
  ('seo:/bullard-tx',          'Pest Control in Bullard, TX | Dang Pest Control',                      'Local pest control experts in Bullard, TX. We eliminate pests and prevent their return. Call (903) 871-0550.'),
  ('seo:/whitehouse-tx',       'Pest Control in Whitehouse, TX | Dang Pest Control',                   'Professional pest control in Whitehouse, TX. Licensed, insured, family-owned. Call Dang Pest Control at (903) 871-0550.'),
  ('seo:/tyler-tx',            'Pest Control in Tyler, TX | Dang Pest Control',                        'Top-rated pest & termite control in Tyler, TX. Family-owned, Super Powered Guarantee. Call Dang Pest Control at (903) 871-0550.')
) AS k(key, seo_title, seo_description)
CROSS JOIN (SELECT id FROM tenants LIMIT 1) t
ON CONFLICT (tenant_id, key) DO NOTHING;
