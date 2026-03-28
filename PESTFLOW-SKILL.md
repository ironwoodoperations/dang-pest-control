# PestFlow Pro — Claude Code Autonomous Dev Skill
## Version 2.0 | Session 5+

---

## HOW TO USE THIS SKILL

At the start of every Claude Code session:
1. Read this file fully
2. Read `TASKS.md` in the project root
3. Pick the first unchecked `[ ]` task
4. Execute it completely
5. Mark it `[x]` in TASKS.md
6. Run `git add . && git commit -m "[task description]" && git push`
7. Report what was done + move to next task unless told to stop

**You are autonomous. Do not ask for permission to proceed with tasks in TASKS.md. Just do them.**

---

## PROJECT IDENTITY

- **Product:** PestFlow Pro (white-label SaaS for pest control companies)
- **Current client build:** Dang Pest Control (Tyler, TX)
- **Live URL:** https://dang-pest-control.vercel.app
- **Admin URL:** /admin/login → admin@dangpestcontrol.com / dang123
- **GitHub:** https://github.com/ironwoodoperations/dang-pest-control.git
- **Codespace:** https://curly-space-dollop-v6xp6v7677ppf6p76.github.dev/
- **Stack:** React 18 + TypeScript + Vite + Tailwind + Supabase + Vercel

---

## DEV ENVIRONMENT

```bash
# Dev server
npm run dev  # → localhost:8080

# Push
git add . && git commit -m "description" && git push

# Install packages
npm install [package]

# Supabase admin user
node scripts/create-admin-user.mjs email@example.com password123

# Supabase migrations
npx supabase db push
```

**Environment files:**
- `.env.local` — local dev secrets (VITE_ANTHROPIC_API_KEY, SUPABASE_SERVICE_ROLE_KEY)
- Vercel env vars — production secrets (same keys)

---

## TECH SPECS

### Supabase
- **Project ID:** bqavwwqebcsshsdrvczz
- **Tenant ID:** `1282b822-825b-4713-9dc9-6d14a2094d06`
- **Auth:** `has_role()` RPC checks `public.user_roles` table (NOT profiles)
- **New admin users:** insert into BOTH `profiles` AND `user_roles`

### Anthropic API
- **Key:** `VITE_ANTHROPIC_API_KEY` (Vercel + .env.local)
- **Model:** `claude-sonnet-4-6` (always use this exact string)
- **Required browser headers:**
```javascript
{
  "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
  "anthropic-version": "2023-06-01",
  "anthropic-dangerous-direct-browser-access": "true",
  "content-type": "application/json"
}
```

---

## SUPABASE SCHEMA (current tables)

| Table | Key Columns | Purpose |
|-------|------------|---------|
| `profiles` | id, tenant_id, full_name, role | User profiles |
| `user_roles` | user_id, role | Auth gating (admin/editor) |
| `page_content` | tenant_id, page_slug, title, subtitle, intro, video_url | Editable page content |
| `seo_meta` | tenant_id, page_slug, meta_title, meta_description | SEO per page |
| `blog_posts` | tenant_id, title, slug, content, excerpt, published_at | Blog |
| `location_data` | tenant_id, city, slug, hero_title, is_live | Location pages |
| `testimonials` | tenant_id, author_name, review_text, featured | Reviews |
| `leads` | tenant_id, name, email, phone, services, message | Quote form submissions |
| `settings` | tenant_id, key, value | All business settings (JSONB) |
| `keyword_tracker` | tenant_id, keyword, page_slug, volume, difficulty | SEO keywords |

**Settings keys (stored in settings table):**
- `business_info` → {name, phone, email, address, hours, tagline, license, certifications}
- `branding` → {logo_url, favicon_url, primary_color, secondary_color}
- `hero_media` → {youtube_id, thumbnail_url}
- `holiday_mode` → {enabled, holiday, auto_schedule}
- `social_links` → {facebook, instagram, google}
- `notifications` → {lead_email, cc_email, monthly_report_email}
- `integrations` → {facebook_access_token, instagram_account_id, google_place_id, google_api_key}

---

## KEY FILE PATHS

```
src/
├── pages/
│   ├── Index.tsx                      ← Homepage
│   ├── SpiderControl.tsx              ← MASTER TEMPLATE (all pest pages)
│   ├── MosquitoControl.tsx            ← Template for pages with extra sections
│   ├── LocationPage.tsx               ← Dynamic location pages
│   ├── SlugRouter.tsx                 ← Routes /:slug
│   ├── BlogPage.tsx                   ← Blog listing
│   ├── AdminOnboarding.tsx            ← Admin setup wizard
│   └── [all other pages]
├── components/
│   ├── Navbar.tsx                     ← useRef close timer, 150ms delay
│   ├── Footer.tsx
│   ├── HolidayBanner.tsx              ← Halftone dots, Bangers font
│   ├── HolidayVideoWrapper.tsx        ← Ribbon badge top-right
│   └── admin/
│       ├── ContentTab.tsx             ← Page content editor
│       ├── BlogTab.tsx                ← Blog CRUD
│       ├── LocationsTab.tsx           ← Location CRUD
│       ├── SEOTab.tsx                 ← SEO + keywords
│       ├── SocialTab.tsx              ← Social media composer (demo→real)
│       ├── TestimonialsTab.tsx        ← Testimonials CRUD
│       ├── LeadsTab.tsx               ← Lead management
│       ├── TeamTab.tsx                ← Admin user management
│       ├── PageHelpBanner.tsx         ← Help banner (all tabs)
│       ├── KeywordPowerBox.tsx        ← Bulk keyword sync
│       ├── seo/
│       │   └── KeywordResearch.tsx    ← AI keyword research
│       └── settings/
│           ├── SettingsBranding.tsx
│           ├── SettingsBusinessInfo.tsx
│           ├── SettingsHolidayMode.tsx
│           ├── SettingsCampaigns.tsx
│           └── SettingsMediaLibrary.tsx
├── hooks/
│   └── useHolidayMode.ts
└── App.tsx                            ← Routes (specific routes BEFORE /:slug)

public/
├── banner-img.png                     ← Clouds overlay for hero sections
├── exterior-treatment.jpg             ← Location page fallback image
└── mid-page-video.webp                ← Video thumbnail

scripts/
├── create-admin-user.mjs
└── generate-sitemap.mjs               ← Runs at build time
```

---

## DESIGN SYSTEM

### Colors (CSS HSL variables)
```css
--primary: hsl(28, 100%, 50%)         /* orange */
--secondary: hsl(45, 95%, 52%)        /* yellow */
--admin-teal: hsl(185, 65%, 42%)      /* teal */
--admin-bg, --admin-card-bg, --admin-sidebar-border  /* admin dark theme */
```

### Step Colors
```
Step 1: hsl(28, 100%, 50%)  — orange
Step 2: hsl(45, 95%, 52%)   — yellow  
Step 3: hsl(185, 65%, 42%)  — teal
Step 4: hsl(140, 55%, 42%)  — green
```

### Fonts
- **Bangers** — hero titles, CTA headings
- **Body font** — standard sans-serif

### Image URLs (all from dangpestcontrol.com CDN)
```
Hero bg:        https://www.dangpestcontrol.com/wp-content/uploads/2025/06/moblie_banner.webp
Control icons:  https://www.dangpestcontrol.com/wp-content/uploads/2025/03/Control-Process-img[1-4].png
Why Choose Us:  https://www.dangpestcontrol.com/wp-content/uploads/2025/03/[Proven-Results|Comprehensive|Safety|Guarantee|Custom-Plans|Super-Powered].png
Intro photos:   https://www.dangpestcontrol.com/wp-content/uploads/2025/05/[filename]
```

---

## PEST PAGE TEMPLATE (SpiderControl.tsx pattern)

Section order (NEVER deviate):
1. Hero (orange bg + halftone + Bangers title + /banner-img.png clouds)
2. Intro (dotted bg, yellow-bordered photo left, text + 2 buttons right)
3. Treatment Process (gray #f1f1ef bg, 2×2 step grid)
4. Why Choose Us (white bg, 4 gray #f3f3f1 cards)
5. [page-specific sections from real site only]
6. CTA (text left + dotted bg image right)
7. FAQ (plain list, no accordion)
8. East Texas CTA (yellow diagonal clipPath)
9. Footer

**NEVER:**
- Add sections not in the real site
- Use more than 4 Why Choose Us cards (unless real site has more)
- Add yellow diagonal CTA to location pages (they use orange CTA)

---

## LOCATION PAGE TEMPLATE

Section order:
1. Hero (orange bg + halftone + Bangers title + /banner-img.png)
2. Intro (dotted bg, yellow-bordered photo left, text right + 2 buttons)
3. Services grid (6 service cards → pest pages)
4. Why Choose Us (4 gray cards)
5. Orange CTA (halftone dots, NO yellow diagonal)
6. We Also Serve (links to other live locations)
7. Footer

---

## ADMIN DASHBOARD PATTERNS

### Protected routes
All admin pages check `has_role()` via Supabase RPC. If not admin/editor → redirect to /admin/login.

### Tab structure
Each tab file exports a default React component. The main admin layout in `App.tsx` or a layout component renders tabs.

### PageHelpBanner
Every admin tab has `<PageHelpBanner tab="[tabname]" />` at the top. The banner is collapsible, shows "How to use" instructions per tab.

### Toast notifications
Use the existing toast system (likely `sonner` or similar) for success/error feedback.

### Supabase queries pattern
```typescript
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('tenant_id', TENANT_ID)
  .order('created_at', { ascending: false });
```

### Upsert pattern
```typescript
const { error } = await supabase
  .from('seo_meta')
  .upsert({ tenant_id: TENANT_ID, page_slug: slug, meta_title, meta_description },
    { onConflict: 'tenant_id,page_slug' });
```

---

## ANTHROPIC API CALL PATTERN (browser)

```typescript
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-direct-browser-access': 'true',
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-6',
    max_tokens: 1000,
    messages: [{ role: 'user', content: prompt }],
  }),
});
const data = await response.json();
const text = data.content[0].text;
```

---

## RULES

1. Routes in App.tsx MUST appear BEFORE the `/:slug` catch-all
2. Always use `claude-sonnet-4-6` as model string
3. `has_role()` checks `user_roles` table — always insert there for new admin users
4. Never add sections not in the real source page
5. Best Practices score varies by tool (Cloudflare cookie) — don't over-optimize for this
6. When modifying a file, read it first before editing
7. After every task: `git add . && git commit -m "..." && git push`
8. Never break existing functionality — test mentally before committing

---

## TASK EXECUTION PROTOCOL

```
1. Read TASKS.md
2. Find first [ ] task
3. Read relevant source files before editing
4. Make ONLY the changes listed for that task
5. Test logic mentally
6. git add . && git commit -m "[task name]" && git push
7. Update TASKS.md: [ ] → [x]
8. git add TASKS.md && git commit -m "mark task complete: [name]" && git push
9. Report: "✅ Completed: [task]. Next up: [next task]"
10. Proceed to next task automatically unless user says stop
```

---

## KNOWN ISSUES & GOTCHAS

- Page transition flicker: ProtectedRoute re-mounts on auth state changes
- Best Practices score varies by tool — Cloudflare cookie from remote images
- Longview duplicate was in SEO tab allSitePages array (fixed Session 4)
- Holiday auto-save: triggers on toggle/dropdown change, no manual Save needed
- `$5 Anthropic credit` — AI features may stop if balance hits zero (enable auto-reload)

---

## SESSION LOG

| Session | Date | Key Completions |
|---------|------|----------------|
| 1 | Mar 2026 | Initial build, core pages |
| 2 | Mar 2026 | Location pages, admin dashboard |
| 3 | Mar 2026 | All pest pages, blog, reviews |
| 4 | Mar 2026 | AI keyword research, social composer, holiday mode |
| 5 | Mar 2026 | [current session — see TASKS.md] |
