
INSERT INTO public.location_data (slug, city, hero_title, intro, local_pest_description, map_embed_url)
VALUES
  ('longview-tx', 'Longview', 'Pest Control Services in Longview, TX',
   'Your home should feel like a safe haven—but pests make that hard to achieve. At Dang Pest Control, we offer expert pest control solutions tailored to your needs, ensuring health, comfort, and the protection of your loved ones. Serving Longview, TX, and surrounding areas, our family-owned, local business is committed to making your life easier with services you can trust.',
   'The environment in Longview provides the perfect conditions for pests like termites, rodents, and mosquitos to thrive. Protecting your property from these nuisances means maintaining your family''s comfort and health.',
   'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000!2d-94.74!3d32.50!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8636b3b1a0000001%3A0x1!2sLongview%2C+TX!5e0!3m2!1sen!2sus!4v1'),
  ('jacksonville-tx', 'Jacksonville', 'Pest Control Services in Jacksonville, TX',
   'Pests are a common challenge for homeowners in Jacksonville, TX. At Dang Pest Control, we provide comprehensive pest management solutions designed for the unique conditions of East Texas. Our family-owned team delivers reliable, professional service you can count on.',
   'Jacksonville''s warm, humid climate makes it a hotspot for a variety of pests. Our tailored treatment plans address the specific pest pressures in your area.',
   'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000!2d-95.27!3d31.96!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8636b3b1a0000001%3A0x1!2sJacksonville%2C+TX!5e0!3m2!1sen!2sus!4v1'),
  ('lindale-tx', 'Lindale', 'Pest Control Services in Lindale, TX',
   'Keep your Lindale home pest-free with professional pest control services from Dang Pest Control. We serve Lindale and surrounding communities with customized solutions that eliminate pests and prevent their return.',
   'Lindale''s residential communities deserve the best in pest protection. We provide targeted treatments that address the local pest challenges unique to your neighborhood.',
   'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000!2d-95.41!3d32.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8636b3b1a0000001%3A0x1!2sLindale%2C+TX!5e0!3m2!1sen!2sus!4v1'),
  ('bullard-tx', 'Bullard', 'Pest Control Services in Bullard, TX',
   'Bullard homeowners trust Dang Pest Control for dependable, thorough pest management. Our licensed technicians deliver personalized service that targets pests at their source.',
   'From wooded properties to lakeside homes, Bullard''s diverse landscapes present unique pest challenges. Our team has the expertise to handle them all.',
   'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000!2d-95.32!3d32.13!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8636b3b1a0000001%3A0x1!2sBullard%2C+TX!5e0!3m2!1sen!2sus!4v1'),
  ('whitehouse-tx', 'Whitehouse', 'Pest Control Services in Whitehouse, TX',
   'Protect your Whitehouse home and family from unwanted pests. Dang Pest Control offers expert pest control services with a personal touch, ensuring your property stays safe and comfortable year-round.',
   'Whitehouse families deserve peace of mind when it comes to pest control. Our integrated approach provides long-term solutions tailored to your home''s specific needs.',
   'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000!2d-95.22!3d32.22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8636b3b1a0000001%3A0x1!2sWhitehouse%2C+TX!5e0!3m2!1sen!2sus!4v1')
ON CONFLICT (slug) DO NOTHING;
