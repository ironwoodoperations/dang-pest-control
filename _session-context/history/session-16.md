# Dang Pest Control — Session 16 Context

## PROJECT OVERVIEW
- **Live build:** https://dang-pest-control.vercel.app
- **GitHub:** https://github.com/ironwoodoperations/dang-pest-control.git
- **Codespace:** https://curly-space-dollop-v6xp6v7677ppf6p76.github.dev/?folder=%2Fworkspaces%2Fdang-pest-control
- **Stack:** React + TypeScript + Vite + Tailwind + Supabase + Vercel
- **Admin login:** admin@dangpestcontrol.com / dang123 → /admin/login

## HOW TO INTERACT
- Say "next" when ready for next task — just build it, no questions
- Keep responses short and action-focused
- All Claude Code prompts in a single copyable block
- App.tsx instructions always end with: "Do not make any other changes. Only make the exact changes listed above."
- Session context MD lives in repo at `_session-context/session-current.md`
- At end of every session: update session-current.md + copy to `_session-context/history/session-XX.md`

## WORKFLOW
- Claude.ai generates plans + prompts
- Claude Code in GitHub Codespaces executes
- **Claude Code must always end with `git push`**
- **Two Claude Code instances running:** one for `dang-pest-control`, one for `pestflow-platform` — always confirm which repo before running
- Session context MD lives in repo — Claude Code reads it at session start and updates it at session end

## START OF SESSION ROUTINE
At the start of every new session, Claude Code should:
```
cat _session-context/session-current.md
```
Then confirm what's built and what's pending before doing anything else.

## END OF SESSION ROUTINE
At the end of every session, Claude Code should:
1. Update `_session-context/session-current.md` with any new completed work
2. Copy to `_session-context/history/session-XX.md`
3. Include in the final `git push`

---

## ADMIN DASHBOARD — FILE STRUCTURE
```
src/components/admin/
  usePlan.tsx              ✅ React Context (PlanProvider) — reads settings.subscription.tier
  FeatureGate.tsx          ✅ Tier-gating wrapper with lock UI
  TierToggle.tsx           ✅ S/G/P/E pill toggle in sidebar footer
  DemoMode.tsx             ✅ useDemoMode hook + DemoBanner component
  DemoSeed.ts              ✅ seedDemoData() + resetToLive()
  ReportsTab.tsx           ✅ real charts, tier-gated analytics
  SEOTab.tsx               ✅ tier-2 full gate, tier-3 on Keywords + AIO; Vercel URL fallback for Lighthouse
  SocialTab.tsx            ✅ tier-2 full gate, tier-3 AI/Campaign/Connections, tier-4 Analytics
  LeadsTab.tsx             ✅ tap-to-contact links + sms: tap-to-text link + SMS consent badges
  SettingsTab.tsx          ✅ Demo Mode section added
  BlogTab.tsx              ✅
  ContentTab.tsx           ✅
  LocationsTab.tsx         ✅
  KeywordPowerBox.tsx      ✅
  PageHelpBanner.tsx       ✅
  TeamTab.tsx              ✅
  TestimonialsTab.tsx      ✅ real titles in demo seed, sort_order display removed
  ReviewsTab.tsx           ✅ LeadFusion Local, Elite gated, live Google reviews, Sync to Testimonials
  ClientOnboardingWizard.tsx ✅ 11-slide wizard, plan gating, MD export
  seo/
    AIOTab.tsx             ✅
    KeywordResearch.tsx    ✅

src/components/
  ScrollToTop.tsx          ✅ fixes sticky page navigation on route change

src/pages/
  AdminLogin.tsx
  AdminPage.tsx            ✅ Reviews + Client Setup tabs wired in
  QuotePage.tsx            ✅ TCPA dual consent; mobile fix (single col, 16px inputs)
  ReviewsPage.tsx          ✅ live Google reviews via edge function, fallback to static; responsive grid Session 15
  admin/
    Onboarding.tsx
```

## KEY ARCHITECTURAL NOTES
- **Sidebar + main layout file:** `AdminSidebar.tsx`
- **usePlan is a React Context** — PlanProvider wraps the admin layout. Never revert to standalone hook.
- **Tier stored in settings table, key = `subscription`** — value = `{ tier: 1|2|3|4, plan_name, monthly_price }`
- **DemoBanner** is placed in the main admin layout file above tab content area
- **Two Claude Code instances** — always confirm you are in `dang-pest-control` repo before running, not `pestflow-platform`
- **LeadsTab.tsx is the CRM lead detail file** — NOT AdminCrm.tsx (that file does not exist in this repo)
- **ScrollToTop** is placed as first child inside Router in App.tsx

---

## SUPABASE — DANG PEST CONTROL
- **Tenant ID:** `1282b822-825b-4713-9dc9-6d14a2094d06`
- **Key tables:** `leads`, `site_config`, `social_posts`, `blog_posts`, `location_data`, `testimonials`, `page_snapshots`, `seo_meta`, `settings`
- **leads table extra columns:** `sms_transactional_consent` boolean, `sms_marketing_consent` boolean
- **settings keys:**
  - `subscription` — `{ tier: 1|2|3|4, plan_name, monthly_price, upgraded_at }`
  - `demo_mode` — `{ active: true|false, seeded_at, went_live_at }`
- **Edge functions deployed:**
  - `notify-new-lead` — Resend, fires on contact + quote form submit
  - `weekly-seo-report` — weekly SEO digest
  - `send-sms-confirmation` — SimpleTexting, fires on quote submit if transactional consent
  - `fetch-google-reviews` — Places API (New), JWT disabled (public endpoint)

---

## GOOGLE PLACES — LEADFUSION LOCAL
- **Place ID:** `ChIJq5K4j8_MR4YR0rDrPjJjJiM`
- **Secret:** `GOOGLE_PLACES_API_KEY` in Supabase Edge Function Secrets
- **Confirmed:** 5.0 stars, 42 reviews

## PAGESPEED / LIGHTHOUSE
- **Vercel env var:** `VITE_PAGESPEED_API_KEY`
- **Fallback URL:** `https://dang-pest-control.vercel.app`

## SIMPLETEXTING — SMS
- **Sending number:** 9032181938
- **API endpoint:** https://api-app2.simpletexting.com/v2/api/messages
- **Secret:** `SIMPLETEXTING_API_KEY` in Supabase dashboard secrets

## VERCEL ENV VARS
- `RESEND_API_KEY`, `VITE_ANTHROPIC_API_KEY`, `VITE_PAGESPEED_API_KEY` — all environments

---

## COMPLETED WORK — ALL SESSIONS

### Sessions 1–7
- Full public site, admin dashboard, AI keyword research, social scheduler, location pages, onboarding wizard

### Session 8
- SEOTab 3-tab upgrade, SocialTab connections modal, LeadsTab tap-to-contact

### Session 9
- SocialTab campaign batch posting, plan gating system (usePlan + FeatureGate)

### Session 10
- usePlan → React Context, TierToggle, ReportsTab upgrade, Demo Mode system, Resend integration

### Session 11
- SMS tap-to-text, TCPA dual consent, SMS consent columns + badges, send-sms-confirmation edge function

### Session 12
- LeadFusion Local (fetch-google-reviews edge function), ReviewsTab (admin), ReviewsPage (public)

### Session 13
- ReviewsTab error fix, Testimonials fixes, ClientOnboardingWizard (11-slide), ScrollToTop, Lighthouse/PageSpeed, mobile first pass

### Session 14
- Visual QA performed against live dangpestcontrol.com — 9 mobile bugs documented

### Session 15 ✅ COMPLETED
- **29 files changed across 7 bug fixes:**
- BUG 1: Process step cards — converted inline `1fr 1fr` grids to `grid-cols-1 sm:grid-cols-2` across all 15+ service pages
- BUG 2: Why Choose Us cards — converted `repeat(4, 1fr)` to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` across all service pages
- BUG 3: Footer nav wrapping — added `whitespace-nowrap` to all footer nav links
- BUG 4: Demo seed testimonial leak — added `.neq('name', 'demo_seed')` to TestimonialsSection query
- BUG 5: About page duplicate heading — changed redundant "About Us" h2 to "Family-Owned, Community-Driven"
- BUG 6: Hero image hidden on mobile — changed HeroSection from fixed inline grid to `grid-cols-1 sm:grid-cols-[42fr_58fr]`
- BUG 7: Navbar "DANG!" text fallback — replaced with actual logo image on mobile
- **Bonus:** All section padding `40px` → responsive `px-4 md:px-10`; ReviewsPage, ServiceArea, BlogPage, ContactPage grids made responsive; fixed missing `jspdf` dependency

---

### Session 16 ✅ COMPLETED
- **Resend email integration verified** — `notify-new-lead` fires from both QuotePage and ContactPage; sends to `site_config.notification_email`; from `leads@pestflo.ai` via Resend API
- **SMS integration verified** — `send-sms-confirmation` fires from QuotePage when transactional consent checked; sends to lead's phone via SimpleTexting; from `9032181938`
- **Mobile audit completed** — remaining inline `gridTemplateColumns` cataloged
- **All remaining inline gridTemplateColumns converted to responsive Tailwind** — 9 files, 9 instances:
  - WhitehouseTX, LongviewTX, LindaleTX, JacksonvilleTX, TermiteInspections: `1fr 2fr` → `grid-cols-1 sm:grid-cols-[1fr_2fr]`
  - BlogPage: `1fr 340px` → `grid-cols-1 sm:grid-cols-[1fr_340px]`
  - LocationPage: `repeat(3, 1fr)` → `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
  - RoachControl: `auto-fit minmax` → `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
  - WhyChooseUs: `1fr 1fr 1fr` → `grid-cols-1 sm:grid-cols-3` (also removed explicit gridColumn/gridRow from children)
- **Build clean** — `3094 modules, built in 24.31s`, no errors

---

## PENDING — WHAT'S LEFT

| Item | Priority | Notes |
|---|---|---|
| Facebook token | Low | Social posting works in demo mode indefinitely |

---

## PRICING TIERS

| Feature | Starter $149 | Grow $249 | Pro $349 | Elite $499 |
|---|---|---|---|---|
| Professional website | ✅ | ✅ | ✅ | ✅ |
| Lead capture + CRM | ✅ | ✅ | ✅ | ✅ |
| Full SEO suite | 🔒 | ✅ | ✅ | ✅ |
| Blog / content mgmt | 🔒 | ✅ | ✅ | ✅ |
| Social scheduling | 🔒 | ✅ | ✅ | ✅ |
| AI keyword research | 🔒 | 🔒 | ✅ | ✅ |
| AI social + campaigns | 🔒 | 🔒 | ✅ | ✅ |
| Advanced reports | 🔒 | 🔒 | ✅ | ✅ |
| Social analytics | 🔒 | 🔒 | 🔒 | ✅ |
| Ayrshare posting | 🔒 | 🔒 | 🔒 | ✅ |
| LeadFusion live reviews | 🔒 | 🔒 | 🔒 | ✅ |

---

## SAFETY NET — REVERT PROMPT
```
git checkout 697d449 -- src/components/admin/SEOTab.tsx src/components/admin/SocialTab.tsx
git add -am "Revert: restore SEOTab and SocialTab" && git push
```

---

## KEY RULES — NEVER BREAK THESE
- Routes in App.tsx must appear before `/:slug` catch-all
- `exec_sql` RPC does not exist — SQL goes through Supabase MCP or Dashboard SQL Editor
- Anthropic model string must always be `claude-sonnet-4-6`
- Claude Code must always end with `git push`
- PageHelpBanner on every admin tab — never remove
- usePlan is a Context (PlanProvider) — never revert to standalone hook
- Always confirm which repo (dang vs pestflow-platform) before running Claude Code
- Session context MD lives in repo: `_session-context/session-current.md`
- LeadsTab.tsx is the CRM file — AdminCrm.tsx does not exist in this repo
- SimpleTexting base URL is https://api-app2.simpletexting.com (not api.simpletexting.com)
- ScrollToTop must remain as first child inside Router in App.tsx

---

## PESTFLOW PRO — BIGGER PICTURE
Dang is the proof-of-concept for **PestFlow Pro**, white-label multi-tenant SaaS. Repo: `ironwoodoperations/pestflow-platform`.
