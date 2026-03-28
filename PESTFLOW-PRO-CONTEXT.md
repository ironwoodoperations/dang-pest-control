# PestFlow Pro — Full Project Context
## Migration & White-Label Reference Document
### Generated: March 2026 | Session 5 Complete

---

## Project Overview

- **Product:** PestFlow Pro (white-label SaaS for pest control companies)
- **Current Client Build:** Dang Pest Control (Tyler, TX)
- **Live URL:** https://dang-pest-control.vercel.app
- **Admin URL:** /admin/login
- **GitHub:** https://github.com/ironwoodoperations/dang-pest-control
- **Stack:** React 18 + TypeScript + Vite + Tailwind CSS + Supabase + Vercel
- **UI Library:** shadcn/ui (Radix primitives)
- **State:** React Query (TanStack), React Context (TenantProvider)
- **Auth:** Supabase Auth + custom `has_role()` RPC
- **AI:** Anthropic Claude API (browser-side, claude-sonnet-4-6)

---

## Full Database Schema

### Core Tables

| Table | Key Columns | Purpose |
|-------|------------|---------|
| `tenants` | id, company_name, owner_id | Multi-tenant root |
| `profiles` | id, tenant_id, full_name, role | User profiles linked to tenants |
| `user_roles` | user_id, role | Auth gating (admin/editor) via `has_role()` RPC |

### Content Tables

| Table | Key Columns | Purpose |
|-------|------------|---------|
| `page_content` | tenant_id, slug, title, subtitle, intro, video_url, video_type | Editable page content per route |
| `blog_posts` | tenant_id, title, slug, content, excerpt, featured_image, published, author | Blog CRUD |
| `location_data` | tenant_id, city, slug, hero_title, hero_description, intro, local_pest_description, map_embed_url, meta_title, meta_description, is_live | Dynamic location landing pages |
| `testimonials` | tenant_id, name, title, text, rating, is_featured, sort_order | Customer reviews (manual + Google import) |

### SEO Tables

| Table | Key Columns | Purpose |
|-------|------------|---------|
| `site_config` | tenant_id, key, value, seo_title, seo_description | All settings + per-page SEO (key: `seo:{slug}`) |
| `seo_meta` | tenant_id, page_slug, meta_title, meta_description, user_edited | Auto-generated SEO for blog/location pages |
| `keyword_placements` | tenant_id, keyword, page_slug, placement_type, suggested_text, applied | AI keyword auto-placement engine results |
| `page_snapshots` | tenant_id, page_slug, snapshot_type, snapshot_data | Original content/SEO snapshots for revert |

### Business Tables

| Table | Key Columns | Purpose |
|-------|------------|---------|
| `leads` | tenant_id, name, email, phone, services, message | Quote form submissions |
| `social_posts` | tenant_id, platform, caption, image_url, scheduled_for, published_at, facebook_post_id, status | Social media post history |

### Settings Keys (stored in `site_config.value` as JSONB)

| Key | Fields |
|-----|--------|
| `business_info` | company_name, phone, email, address, city, state, zip, hours, service_area |
| `business_extended` | license_number, insurance_status, npma_member, tpca_member, founded_year, num_technicians, service_radius, emergency_phone, tagline |
| `branding` | logo_url, favicon_url |
| `branding_extended` | primary_color, accent_color, email_footer |
| `hero_media` | hero_video_url, hero_video_type, hero_video_start, hero_video_end, meet_kirk_youtube_id |
| `holiday_mode` | enabled, holiday, greeting |
| `social_links` | facebook, instagram, google, yelp |
| `notification_email` | email |
| `notifications` | cc_email, monthly_report_email, notify_new_review, weekly_seo_digest |
| `integrations` | fb_access_token, fb_page_id, google_place_id, google_api_key |
| `seo_keywords` | [{keyword, volume, difficulty, notes}] |
| `seo_statuses` | {slug: "live"|"draft"} |
| `seo_master_keywords` | {keywords: [], updated} |

---

## Component Architecture

### Pages (`src/pages/`)

| File | Route | Type |
|------|-------|------|
| `Index.tsx` | `/` | Homepage with LocalBusiness JSON-LD |
| `SpiderControl.tsx` | `/spider-control` | **Master pest page template** (Service + FAQPage schema) |
| `MosquitoControl.tsx` | `/mosquito-control` | Pest page (same pattern) |
| `AntControl.tsx` | `/ant-control` | Pest page |
| `WaspHornetControl.tsx` | `/wasp-hornet-control` | Pest page |
| `RoachControl.tsx` | `/roach-control` | Pest page |
| `FleaTickControl.tsx` | `/flea-tick-control` | Pest page |
| `RodentControl.tsx` | `/rodent-control` | Pest page |
| `ScorpionControl.tsx` | `/scorpion-control` | Pest page |
| `BedBugControl.tsx` | `/bed-bug-control` | Pest page |
| `TermiteControl.tsx` | `/termite-control` | Pest page |
| `TermiteInspections.tsx` | `/termite-inspections` | Pest page |
| `PestControlPage.tsx` | `/pest-control` | General pest control |
| `LocationPage.tsx` | `/:slug` (dynamic) | Location landing pages |
| `BlogPage.tsx` | `/blog`, `/blog/:slug` | Blog with Article schema |
| `AdminPage.tsx` | `/admin` | Admin dashboard wrapper |
| `SlugRouter.tsx` | `/:slug` | Dynamic routing for services/locations |

### Admin Tabs (`src/components/admin/`)

| Tab | File | Features |
|-----|------|----------|
| Dashboard | `DashboardTab.tsx` | Overview stats |
| Leads | `LeadsTab.tsx` | Lead management |
| Content | `ContentTab.tsx` | Page content editor + **Revert to Original** |
| Blog | `BlogTab.tsx` | Blog CRUD + **auto-SEO generation** |
| Locations | `LocationsTab.tsx` | Location CRUD + **auto-SEO generation** |
| Testimonials | `TestimonialsTab.tsx` | Reviews + **Google import** |
| Social Media | `SocialTab.tsx` | AI composer + **real Facebook API** + image uploads + history |
| SEO | `SEOTab.tsx` | Pages table + keywords + **AIO tab** + **keyword auto-placement** + **revert** |
| Reports | `ReportsTab.tsx` | Monthly reports + **PDF download** |
| Settings | `SettingsTab.tsx` | 7 sections (branding, hero, media, campaigns, contact, notifications, integrations) |
| Team | `TeamTab.tsx` | Admin user management |

### Settings Sections (`src/components/admin/settings/`)

| Section | File | Fields |
|---------|------|--------|
| Branding | `SettingsBranding.tsx` | Logo, favicon, primary/accent colors, email footer |
| Hero Media | `SettingsHeroMedia.tsx` | Video URL, type, start/end times |
| Media Library | `SettingsMediaLibrary.tsx` | Supabase storage browser |
| Campaigns | `SettingsCampaigns.tsx` | Holiday mode toggle, holiday selector |
| Contact Info | `SettingsContact.tsx` | Company info + extended business fields + social links |
| Notifications | `SettingsNotifications.tsx` | Lead emails, CC, monthly reports, review alerts, SEO digest |
| Integrations | `SettingsIntegrations.tsx` | Facebook token/page ID, Google Place ID/API key |

### Shared Components

| Component | Purpose |
|-----------|---------|
| `Navbar.tsx` | Main navigation (React.memo for performance) |
| `Footer.tsx` | Site footer (React.memo) |
| `SEO.tsx` | Helmet-based meta tags + JSON-LD |
| `StructuredData.tsx` | Inline JSON-LD for additional schemas |
| `ProtectedRoute.tsx` | Auth guard with hasChecked ref (no flicker) |
| `PageHelpBanner.tsx` | Contextual help per admin tab |
| `KeywordPowerBox.tsx` | Bulk keyword sync + AI auto-placement |
| `seo/AIOTab.tsx` | Structured data status dashboard |
| `seo/KeywordResearch.tsx` | AI keyword research panel |

---

## API Integrations

### Anthropic Claude API (Browser-Side)
```javascript
headers: {
  "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
  "anthropic-version": "2023-06-01",
  "anthropic-dangerous-direct-browser-access": "true",
  "content-type": "application/json",
}
model: "claude-sonnet-4-6"
```
Used for: Social post generation, keyword research, keyword auto-placement

### Facebook Graph API
- Endpoint: `https://graph.facebook.com/v18.0/{pageId}/photos` (or `/feed`)
- Auth: Page Access Token stored in settings
- Features: Post with image, test connection

### Google Places API
- Endpoint: `https://maps.googleapis.com/maps/api/place/details/json`
- Auth: Google API Key stored in settings
- Features: Import reviews into testimonials

### Supabase
- Auth: `supabase.auth` + `has_role()` RPC
- Database: PostgreSQL via client SDK
- Storage: `social-uploads` bucket for image uploads, `videos` bucket for page videos

---

## Complete Feature List (Session 5)

### Phase 1 — Foundation & Stability
- [x] Fix page transition flicker (ProtectedRoute + React.memo)
- [x] Blog post auto-SEO on create/save (seo_meta upsert, user_edited flag)
- [x] Location page auto-SEO on create/save (city-specific meta)

### Phase 2 — SEO Automation Engine
- [x] Revert to Original (page_snapshots table, content + SEO revert)
- [x] AIO Structured Data (JSON-LD on all pages: LocalBusiness, Service, FAQPage, Blog, Article)
- [x] Keyword Auto-Placement Engine (Claude AI maps keywords to pages, apply to SEO fields)

### Phase 3 — Social Media Real Integration
- [x] Facebook Graph API posting with image uploads
- [x] Social posts history with status tracking
- [x] Settings > Integrations for API credentials

### Phase 4 — Google Reviews + Reporting
- [x] Google Reviews auto-import into testimonials
- [x] Monthly reports with PDF download (jsPDF)
- [x] Reports tab in admin sidebar

### Phase 5 — Settings Enhancement
- [x] Extended business info (license, insurance, certifications, service radius)
- [x] Brand colors with live swatches
- [x] Notifications section (lead CC, monthly reports, review alerts, SEO digest)

### Phase 6 — Migration Prep
- [x] This document (PESTFLOW-PRO-CONTEXT.md)

---

## Session Log

| Session | Date | Key Completions |
|---------|------|----------------|
| 1 | Mar 2026 | Initial build, core pages |
| 2 | Mar 2026 | Location pages, admin dashboard |
| 3 | Mar 2026 | All pest pages, blog, reviews |
| 4 | Mar 2026 | AI keyword research, social composer, holiday mode |
| 5 | Mar 2026 | Auth fix, auto-SEO, JSON-LD, keyword engine, Facebook API, Google reviews, reports, enhanced settings |

---

## How to Deploy for a New Client

### Checklist

1. **Fork/clone** the repository
2. **Create Supabase project** — new project with same schema
3. **Run migrations** — create all tables listed in schema section above
4. **Create admin user** — `node scripts/create-admin-user.mjs email@client.com password`
5. **Configure environment**:
   - `VITE_SUPABASE_URL` → new project URL
   - `VITE_SUPABASE_ANON_KEY` → new anon key
   - `VITE_ANTHROPIC_API_KEY` → Anthropic API key
6. **Insert tenant** — create row in `tenants` table, link to admin profile
7. **Customize branding** — logo URL, colors, company name in Settings
8. **Replace content**:
   - Update pest page text/images for local market
   - Create location pages for client's service area
   - Update phone number, address, social links
9. **Configure integrations** (optional):
   - Facebook Page Access Token + Page ID
   - Google Place ID + API Key
10. **Deploy to Vercel** — connect repo, set env vars
11. **Configure domain** — add custom domain in Vercel
12. **Generate sitemap** — `node scripts/generate-sitemap.mjs`

---

## SaaS Tier Feature Mapping

| Feature | Basic | Pro | Enterprise |
|---------|-------|-----|------------|
| Core pest pages | Yes | Yes | Yes |
| Location pages | 3 | Unlimited | Unlimited |
| Blog | Yes | Yes | Yes |
| Lead management | Yes | Yes | Yes |
| SEO dashboard | Basic | Full + AIO | Full + AIO |
| Keyword research (AI) | — | Yes | Yes |
| Keyword auto-placement | — | Yes | Yes |
| Auto-SEO generation | — | Yes | Yes |
| Revert to Original | — | Yes | Yes |
| JSON-LD structured data | — | Yes | Yes |
| Social media composer | — | Yes | Yes |
| Facebook real posting | — | — | Yes |
| Image uploads | — | Yes | Yes |
| Google Reviews import | — | — | Yes |
| Monthly PDF reports | — | Yes | Yes |
| Email reports | — | — | Yes |
| Holiday mode | Yes | Yes | Yes |
| Custom branding/colors | — | Yes | Yes |
| Multi-user team | — | Yes | Yes |
| API integrations panel | — | — | Yes |
| White-label removal | — | — | Yes |

### Suggested Pricing
- **Basic:** $49/mo — Core website + leads
- **Pro:** $149/mo — Full SEO + social + reports
- **Enterprise:** $299/mo — All features + API integrations + white-label
