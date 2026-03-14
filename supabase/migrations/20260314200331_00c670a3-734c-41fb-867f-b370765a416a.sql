-- Fix existing orphaned tenant: set owner and link profile
UPDATE public.tenants SET owner_id = 'a0dec346-a558-4064-b49e-b0cd4b4d059d' WHERE id = '1282b822-825b-4713-9dc9-6d14a2094d06';
UPDATE public.profiles SET tenant_id = '1282b822-825b-4713-9dc9-6d14a2094d06' WHERE id = 'a0dec346-a558-4064-b49e-b0cd4b4d059d';