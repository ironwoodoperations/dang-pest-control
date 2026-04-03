import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { phone, firstName } = await req.json()
    if (!phone) return new Response(JSON.stringify({ error: 'No phone' }), { status: 400, headers: corsHeaders })

    const apiKey = Deno.env.get('SIMPLETEXTING_API_KEY')
    const fromNumber = '9032181938'

    // Normalize phone — digits only
    const digits = phone.replace(/\D/g, '')

    const message = `Hi ${firstName || 'there'}! Thanks for contacting Dang Pest Control. We received your request and will be in touch shortly. Reply STOP to opt out.`

    const response = await fetch('https://api.simpletexting.com/v2/api/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contactPhone: digits,
        text: message,
        accountPhone: fromNumber,
      }),
    })

    const result = await response.json()
    return new Response(JSON.stringify(result), { headers: corsHeaders })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders })
  }
})
