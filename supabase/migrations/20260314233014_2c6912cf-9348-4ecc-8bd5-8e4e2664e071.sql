
UPDATE public.site_config 
SET value = '{"email": "info@dangpestcontrol.com"}'::jsonb, updated_at = now()
WHERE key = 'notification_email';
