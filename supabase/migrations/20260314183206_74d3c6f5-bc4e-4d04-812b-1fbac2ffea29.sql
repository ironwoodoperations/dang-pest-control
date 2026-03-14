
-- Add the missing local_testimonial_quote column
ALTER TABLE public.location_data
  ADD COLUMN IF NOT EXISTS local_testimonial_quote text NOT NULL DEFAULT '';

-- Update existing rows with placeholder testimonial quotes
UPDATE public.location_data SET local_testimonial_quote = 'Dang Pest Control saved our home from a terrible ant infestation. Fast, professional, and affordable!' WHERE slug = 'longview-tx';
UPDATE public.location_data SET local_testimonial_quote = 'We had a rodent problem and they took care of it in one visit. Highly recommend!' WHERE slug = 'jacksonville-tx';
UPDATE public.location_data SET local_testimonial_quote = 'Best pest control service in Lindale. They really care about their customers.' WHERE slug = 'lindale-tx';
UPDATE public.location_data SET local_testimonial_quote = 'Our lakeside home had a serious mosquito issue. Dang Pest Control eliminated it completely!' WHERE slug = 'bullard-tx';
UPDATE public.location_data SET local_testimonial_quote = 'Friendly, reliable, and thorough. We won''t use anyone else for pest control.' WHERE slug = 'whitehouse-tx';
