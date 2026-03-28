# PestFlow Pro — Task Queue
## Auto-executed by Claude Code using PESTFLOW-SKILL.md

**Instructions for Claude Code:**
Read PESTFLOW-SKILL.md first. Then execute tasks top-to-bottom, one at a time.
Mark each task [x] and commit after completion. Auto-proceed unless user says stop.

---

## 🔴 PHASE 1 — Foundation & Stability (DO FIRST)

### Task 1.1 — Fix page transition flicker
- [x] **Fix page transition flicker/refresh bug**

**Problem:** Pages flicker or fully re-mount when navigating between routes.

**Root cause:** ProtectedRoute likely re-mounts child routes every time `onAuthStateChange` fires, even after auth is already confirmed.

**Fix:**
1. Open `src/components/ProtectedRoute.tsx` (or wherever the auth guard is defined)
2. Add a `loading` state initialized to `true`. Only set to `false` ONCE after first auth check completes (use a `hasChecked` ref to prevent the loading flicker on every nav)
3. While `loading === true`, render a minimal spinner or null — NOT a redirect
4. Once `loading === false`, render children if authed, redirect if not
5. Add `React.memo` to `Navbar` and `Footer` to prevent unnecessary re-renders on route changes
6. In App.tsx, verify the ProtectedRoute wrapper is NOT re-creating its state on every navigation — the auth user state should live in a stable context, not re-fetch on mount

After fix, navigation between Home → Spider Control → Admin should be instant with no flicker.

---

### Task 1.2 — Blog post auto-SEO on create/save
- [x] **Auto-generate SEO metadata when blog post is created or updated**

**Changes to `src/components/admin/BlogTab.tsx`:**

1. First, add `user_edited` column to seo_meta if it doesn't exist. Run this SQL via Supabase client on component mount (use a one-time migration check):
```sql
ALTER TABLE seo_meta ADD COLUMN IF NOT EXISTS user_edited boolean DEFAULT false;
```

2. Create helper function `upsertBlogSEO(post)`:
```typescript
async function upsertBlogSEO(post: { title: string; slug: string; excerpt?: string; content?: string }) {
  // Don't overwrite manually edited SEO
  const { data: existing } = await supabase
    .from('seo_meta')
    .select('user_edited')
    .eq('tenant_id', TENANT_ID)
    .eq('page_slug', `/blog/${post.slug}`)
    .single();
  
  if (existing?.user_edited) return; // User customized this — skip
  
  const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '');
  const rawDesc = stripHtml(post.excerpt || post.content || '');
  const meta_description = rawDesc.length > 155 
    ? rawDesc.substring(0, 152) + '...' 
    : rawDesc;
  
  await supabase.from('seo_meta').upsert({
    tenant_id: TENANT_ID,
    page_slug: `/blog/${post.slug}`,
    meta_title: `${post.title} | Dang Pest Control`,
    meta_description,
    user_edited: false,
  }, { onConflict: 'tenant_id,page_slug' });
}
```

3. Call `upsertBlogSEO(post)` after every successful blog post save/create

4. In SEOTab.tsx: when user manually edits and saves SEO for a blog post page, set `user_edited = true` on that row

5. Show toast: "SEO auto-generated ✓" after upsert succeeds

---

### Task 1.3 — Location page auto-SEO on create/save
- [x] **Auto-generate SEO metadata when location page is created or updated**

**Changes to `src/components/admin/LocationsTab.tsx`:**

1. Create helper `upsertLocationSEO(location)`:
```typescript
async function upsertLocationSEO(location: { city: string; slug: string }) {
  const { data: existing } = await supabase
    .from('seo_meta')
    .select('user_edited')
    .eq('tenant_id', TENANT_ID)
    .eq('page_slug', `/${location.slug}`)
    .single();
  
  if (existing?.user_edited) return;
  
  await supabase.from('seo_meta').upsert({
    tenant_id: TENANT_ID,
    page_slug: `/${location.slug}`,
    meta_title: `Pest Control in ${location.city}, TX | Dang Pest Control`,
    meta_description: `Professional pest control in ${location.city}, TX. Ants, spiders, mosquitoes, rodents & more. Licensed local technicians. Call for a free quote: (903) 871-0550.`,
    user_edited: false,
  }, { onConflict: 'tenant_id,page_slug' });
}
```

2. Call after every successful location save/create

3. Verify `src/pages/LocationPage.tsx` reads from seo_meta using the slug and injects into `<title>` and `<meta name="description">` tags via react-helmet or equivalent

4. Toast: "Location SEO generated ✓"

---

## 🔴 PHASE 2 — SEO Automation Engine

### Task 2.1 — Revert to Original button
- [x] **Add "Revert to Original" capability in Content + SEO tabs**

1. Create Supabase table:
```sql
CREATE TABLE IF NOT EXISTS page_snapshots (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id uuid NOT NULL,
  page_slug text NOT NULL,
  snapshot_type text NOT NULL DEFAULT 'content', -- 'content' | 'seo'
  snapshot_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(tenant_id, page_slug, snapshot_type)
);

ALTER TABLE page_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin_only" ON page_snapshots USING (true);
```

2. In `src/components/admin/ContentTab.tsx`:
   - On first page load for each page_slug, if no snapshot exists → save current page_content row as snapshot (INSERT only, never update the original)
   - Add "↺ Revert to Original" button (secondary/amber style) next to Save
   - On click: confirm dialog "Restore original content? Your changes will be lost."
   - On confirm: fetch snapshot_data, populate form fields, save to page_content

3. In `src/components/admin/SEOTab.tsx`:
   - Same pattern for SEO — snapshot original meta_title and meta_description per page
   - Add small "↺" icon button per page row in the SEO table
   - On click: restore original meta values, save, toast "Restored original SEO ✓"

---

### Task 2.2 — AIO Structured Data (AI Search Optimization)
- [x] **Add JSON-LD structured data to all public pages for AI search visibility**

1. Create `src/components/StructuredData.tsx`:
```typescript
interface StructuredDataProps { data: object }
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
    />
  );
}
```

2. In `src/pages/Index.tsx`, add `<StructuredData>` with LocalBusiness schema:
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Dang Pest Control",
  "@id": "https://dangpestcontrol.com",
  "url": "https://dangpestcontrol.com",
  "telephone": "+19038710550",
  "image": "https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Dang-Logo.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Tyler",
    "addressRegion": "TX",
    "addressCountry": "US"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 32.3513, "longitude": -95.3011 },
  "priceRange": "$$",
  "areaServed": [
    {"@type": "City", "name": "Tyler, TX"},
    {"@type": "City", "name": "Longview, TX"},
    {"@type": "City", "name": "Jacksonville, TX"}
  ],
  "sameAs": []
}
```

3. In each pest page (SpiderControl, MosquitoControl, etc.), add:
   - `Service` schema with the pest type and service area
   - `FAQPage` schema pulling from the page's `faqs` array

4. In blog post pages/components, add `Article` schema with title, datePublished, author

5. Create `src/components/admin/seo/AIOTab.tsx` — a new sub-section in SEOTab showing:
   - List of all pages
   - Schema status per page (✅ LocalBusiness / ✅ FAQ / ✅ Service / ✅ Article)
   - "Preview Schema" button that shows the JSON-LD in a modal
   - "Regenerate All" button that refreshes schema across all pages

---

### Task 2.3 — Keyword Auto-Placement Engine
- [x] **Automate keyword placement into correct pages and SEO fields**

1. Create Supabase table:
```sql
CREATE TABLE IF NOT EXISTS keyword_placements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id uuid NOT NULL,
  keyword text NOT NULL,
  page_slug text NOT NULL,
  placement_type text NOT NULL,
  suggested_text text,
  applied boolean DEFAULT false,
  placed_at timestamptz DEFAULT now(),
  UNIQUE(tenant_id, keyword, page_slug, placement_type)
);
```

2. Upgrade `src/components/admin/KeywordPowerBox.tsx`:
   - Add "🤖 Auto-Place Keywords" button
   - On click: call Claude API with this prompt:
```
Given these SEO keywords: [keywords list]
And these website pages: [page slugs with titles]

Map each keyword to the best page and placement. Return ONLY valid JSON:
{
  "placements": [
    {
      "keyword": "pest control tyler tx",
      "page_slug": "/tyler-tx",
      "placement_type": "meta_title",
      "suggested_text": "Pest Control Tyler TX | Dang Pest Control"
    }
  ]
}

Rules:
- Primary/money keywords → meta_title (include in page title)
- Secondary keywords → meta_description
- Long-tail local keywords → location pages
- Service keywords → corresponding pest service pages
- Match keyword to the most topically relevant page
- One keyword can appear on multiple pages if highly relevant
- placement_type must be one of: meta_title, meta_description, h1
```
   - Parse response, store in keyword_placements table with applied=false
   - Show preview table: Keyword | Page | Placement | Suggested Text | [Apply] checkbox
   - "Apply Selected" button: upserts into seo_meta for selected rows, marks applied=true
   - Show badge on SEO tab: "X auto-placements ready to apply"

3. In SEOTab pages table: show "Keywords" pill badge with count of applied placements per page

---

## 🟡 PHASE 3 — Social Media Real Integration

### Task 3.1 — Social Media with real API + photo uploads
- [ ] **Wire up real Meta Graph API and add image upload capability**

1. Create Supabase storage bucket via SQL:
```sql
INSERT INTO storage.buckets (id, name, public) VALUES ('social-uploads', 'social-uploads', true)
ON CONFLICT (id) DO NOTHING;
```

2. In `src/components/admin/settings/SettingsIntegrations.tsx` (create if doesn't exist):
   - Add "Integrations" sub-section to settings sidebar
   - Facebook Page Access Token field (password input) → saved to settings table key `integrations`
   - Facebook Page ID field → saved same
   - "Test Connection" button → calls `https://graph.facebook.com/v18.0/{pageId}?fields=name&access_token={token}`
   - Shows green ✓ "Connected as [Page Name]" or red ✗ error

3. In `src/components/admin/SocialTab.tsx` — replace demo post flow:

   **Add Image Step (new step between caption + preview):**
   - "Upload Image" → file picker → upload to Supabase `social-uploads` bucket → store public URL
   - "Use Image URL" → text input to paste any URL (Canva share link, Google Drive, etc.)
   - Image preview thumbnail with "Remove" button

   **Wire up real posting:**
   - If Facebook token + page ID in settings AND platform is Facebook:
     - POST to `https://graph.facebook.com/v18.0/{pageId}/photos`
     - Body: `{ message: caption, url: imageUrl, access_token: token }`
     - On success: show real post URL link
     - On error: show Meta API error message

   **Create social_posts table:**
```sql
CREATE TABLE IF NOT EXISTS social_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id uuid NOT NULL,
  platform text NOT NULL,
  caption text,
  image_url text,
  scheduled_for timestamptz,
  published_at timestamptz,
  facebook_post_id text,
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now()
);
```
   - Save every post attempt to social_posts table (even drafts)
   
   **Add Posts History tab** in SocialTab showing social_posts with status badges (Draft/Scheduled/Published/Failed)

---

## 🟡 PHASE 4 — Google Reviews + Reporting

### Task 4.1 — Google Reviews auto-import
- [ ] **Import Google reviews into testimonials via Places API**

1. Add columns to testimonials table:
```sql
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS source text DEFAULT 'manual';
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS google_review_id text UNIQUE;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS rating integer DEFAULT 5;
```

2. In Settings → Integrations (same file as Task 3.1):
   - Google Place ID field (with link: "Find your Place ID →")
   - Google API Key field (browser key with Places API enabled)

3. In `src/components/admin/TestimonialsTab.tsx`:
   - Add "Import from Google" button
   - On click: fetch `https://maps.googleapis.com/maps/api/place/details/json?place_id={id}&fields=reviews,rating&key={key}`
   - Map each review to testimonials upsert:
```typescript
{
  tenant_id: TENANT_ID,
  author_name: review.author_name,
  review_text: review.text,
  rating: review.rating,
  source: 'google',
  google_review_id: String(review.time),
  featured: false,
}
```
   - Use `onConflict: 'google_review_id'` to skip duplicates
   - Toast: "Imported 12 new reviews ✓" (or "Already up to date")

4. In `src/pages/ReviewsPage.tsx`: render star ratings using the `rating` field (show ★ icons, 1-5)

---

### Task 4.2 — Monthly reports + email
- [ ] **Generate PDF monthly reports and email automation**

1. Install: `npm install jspdf`

2. Create `src/components/admin/ReportsTab.tsx`:
   - Month/year selector (default: current month)
   - "Generate Report" button that fetches:
     - Leads this month (count + table)
     - New blog posts this month
     - Keywords added this month  
     - New locations added
     - New testimonials/reviews
   - Renders a clean preview in the UI
   - "Download PDF" button using jsPDF:
     - Header: Dang Pest Control + Month/Year
     - Section 1: Leads Summary
     - Section 2: SEO Activity
     - Section 3: Content Activity
   - "Email Report" button → calls Supabase Edge Function (or Resend via API route)

3. Add ReportsTab to admin navigation

4. Create Supabase Edge Function at `supabase/functions/send-report/index.ts`:
```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
serve(async (req) => {
  const { report_html, recipient_email, subject } = await req.json()
  // Call Resend API
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}` },
    body: JSON.stringify({
      from: 'reports@pestflowpro.com',
      to: recipient_email,
      subject,
      html: report_html,
    })
  })
  return new Response(JSON.stringify(await res.json()))
})
```

5. In Settings → Notifications:
   - "Auto-send monthly reports" toggle
   - Report recipient email field

---

## 🟢 PHASE 5 — Settings Enhancement

### Task 5.1 — Enhanced Settings
- [ ] **Expand settings with professional client controls**

**`src/components/admin/settings/SettingsBusinessInfo.tsx` — add fields:**
- Business license number
- Insurance/bonding status (text)
- NPMA Member checkbox
- TPCA Member checkbox
- Founded year
- Number of technicians
- Service radius (miles dropdown: 25/50/75/100)
- Emergency/after-hours phone
- Company tagline/slogan

**`src/components/admin/settings/SettingsBranding.tsx` — add:**
- Primary brand color (hex input + live color swatch preview)
- Accent color (hex input + swatch)
- Email footer signature textarea (with tokens: {phone}, {address}, {website})

**`src/components/admin/settings/SettingsNotifications.tsx` (create new):**
- Lead notification email (existing — move here from business info if duplicate)
- CC email for lead notifications
- Monthly report recipient email
- "Notify on new Google review" toggle
- "Weekly SEO digest email" toggle

All fields save to `settings` table as JSON under their respective keys.

---

## 🟢 PHASE 6 — Migration Prep

### Task 6.1 — Generate PestFlow Pro migration MD
- [ ] **Generate updated full project MD file for PestFlow Pro migration**

Read every key file in the project and generate a comprehensive `PESTFLOW-PRO-CONTEXT.md` that includes:
- Full updated schema (all tables + new ones from Sessions 5+)
- All component patterns and templates
- All API integrations and their config
- Updated session log
- Complete feature list for the white-label product
- "How to deploy for a new client" checklist
- Pricing / SaaS tier feature mapping

Save to project root as `PESTFLOW-PRO-CONTEXT.md` and commit.

---

## COMPLETED TASKS

*(moved here as tasks are finished)*

---

## HOW TO ADD NEW TASKS

Add a new entry in the appropriate phase section:
```
### Task X.X — Short description
- [ ] **Bold one-liner**

[Detailed implementation instructions]
```

Claude Code will pick it up automatically on next session start.
