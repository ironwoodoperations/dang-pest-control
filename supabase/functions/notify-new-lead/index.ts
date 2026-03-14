const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, service, message } = await req.json();

    // Get the notification email from site_config or use a default
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const configRes = await fetch(`${supabaseUrl}/rest/v1/site_config?key=eq.notification_email&select=value`, {
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
      },
    });
    const configData = await configRes.json();
    const notifyEmail = configData?.[0]?.value?.email;

    if (!notifyEmail) {
      console.log('No notification email configured in site_config. Skipping notification.');
      return new Response(JSON.stringify({ skipped: true, reason: 'no_notification_email' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Log notification (in production, integrate with an email service)
    console.log(`📧 New lead notification for ${notifyEmail}:`, {
      name, email, phone, service, message,
    });

    return new Response(JSON.stringify({ success: true, notified: notifyEmail }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in notify-new-lead:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
