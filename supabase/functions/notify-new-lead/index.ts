const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const FROM_EMAIL = 'leads@pestflo.ai';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, service, message, form_type } = await req.json();

    // Get the notification email from site_config
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

    // If no Resend API key, log and skip
    if (!RESEND_API_KEY) {
      console.log(`📧 No RESEND_API_KEY set. Would notify ${notifyEmail} about lead from ${name}.`);
      return new Response(JSON.stringify({ skipped: true, reason: 'no_resend_api_key' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const isQuote = form_type === 'quote';
    const subject = isQuote
      ? `New Quote Request from ${name}`
      : `New Contact Form Submission from ${name}`;

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #E87800; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">
            ${isQuote ? '&#128027; New Quote Request' : '&#128236; New Contact Message'}
          </h1>
          <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0;">Dang Pest Control</p>
        </div>
        <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email || ''}" style="color: #E87800;">${email || '—'}</a></td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #E87800;">${phone}</a></td></tr>` : ''}
            ${service ? `<tr><td style="padding: 8px 0; color: #666;">Service</td><td style="padding: 8px 0;">${service}</td></tr>` : ''}
            ${message ? `<tr><td style="padding: 8px 0; color: #666; vertical-align: top;">Message</td><td style="padding: 8px 0;">${message}</td></tr>` : ''}
          </table>
          ${email ? `
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee;">
            <a href="mailto:${email}" style="background: #E87800; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600;">Reply to ${name}</a>
          </div>
          ` : ''}
        </div>
        <p style="text-align: center; color: #999; font-size: 12px; margin-top: 16px;">Sent via PestFlow Pro &middot; Dang Pest Control Dashboard</p>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: notifyEmail,
        reply_to: email || undefined,
        subject,
        html,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend API error:', data);
      return new Response(JSON.stringify({ success: false, error: data }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`📧 Email sent to ${notifyEmail} via Resend:`, data);

    return new Response(JSON.stringify({ success: true, data }), {
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
