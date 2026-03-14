
SELECT cron.schedule(
  'weekly-seo-report',
  '0 8 * * 1',
  $$
  SELECT
    extensions.http_post(
      url := 'https://bqavwwqebcsshsdrvczz.supabase.co/functions/v1/weekly-seo-report',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxYXZ3d3FlYmNzc2hzZHJ2Y3p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0OTY5ODksImV4cCI6MjA4OTA3Mjk4OX0.voZh3tRgJs1d45LbBmjU6JtgqRCpn4ZLcqQqCns0h8c"}'::jsonb,
      body := '{"trigger": "cron"}'::jsonb
    );
  $$
);
