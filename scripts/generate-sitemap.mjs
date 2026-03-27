// scripts/generate-sitemap.mjs
// Runs before `vite build` to regenerate public/sitemap.xml with live location pages.
import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = "https://bqavwwqebcsshsdrvczz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxYXZ3d3FlYmNzc2hzZHJ2Y3p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0OTY5ODksImV4cCI6MjA4OTA3Mjk4OX0.voZh3tRgJs1d45LbBmjU6JtgqRCpn4ZLcqQqCns0h8c";

const BASE = "https://dangpestcontrol.com";

const STATIC_URLS = `  <url><loc>${BASE}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${BASE}/about</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/quote</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/contact</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/service-area</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/reviews</loc><changefreq>weekly</changefreq><priority>0.6</priority></url>
  <url><loc>${BASE}/blog</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <url><loc>${BASE}/faq</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>${BASE}/accessibility</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>
  <url><loc>${BASE}/pest-control</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>${BASE}/ant-control</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/termite-control</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/termite-inspections</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/spider-control</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/wasp-hornet-control</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/scorpion-control</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/rodent-control</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/mosquito-control</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/flea-tick-control</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/roach-control</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${BASE}/bed-bug-control</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`;

async function generate() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const { data: locations, error } = await supabase
    .from("location_data")
    .select("slug")
    .eq("is_live", true);

  if (error) {
    console.warn("⚠️  Could not fetch locations from Supabase:", error.message);
    console.warn("Sitemap will be generated without dynamic location pages.");
  }

  const locationUrls = (locations || [])
    .map(
      (loc) =>
        `  <url><loc>${BASE}/${loc.slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC_URLS}
  <!-- Location Pages (auto-generated from Supabase is_live = true) -->
${locationUrls}
</urlset>`;

  const outPath = resolve(__dirname, "../public/sitemap.xml");
  writeFileSync(outPath, xml, "utf-8");
  console.log(`✅ sitemap.xml written with ${(locations || []).length} location page(s).`);
}

generate().catch((e) => {
  console.error("sitemap generation failed:", e);
  process.exit(1);
});
