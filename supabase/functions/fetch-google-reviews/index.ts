import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const PLACE_ID = "ChIJq5K4j8_MR4YR0rDrPjJjJiM";
    const API_KEY = Deno.env.get("GOOGLE_PLACES_API_KEY");

    const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;
    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": API_KEY!,
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
      },
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
