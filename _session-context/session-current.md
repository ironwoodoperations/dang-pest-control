# Dang Pest Control — Session 12 Context

## PROJECT OVERVIEW
- **Live build:** https://dang-pest-control.vercel.app
- **GitHub:** https://github.com/ironwoodoperations/dang-pest-control.git
- **Codespace:** https://curly-space-dollop-v6xp6v7677ppf6p76.github.dev/?folder=%2Fworkspaces%2Fdang-pest-control
- **Stack:** React + TypeScript + Vite + Tailwind + Supabase + Vercel
- **Admin login:** admin@dangpestcontrol.com / dang123 → /admin/login

## HOW TO INTERACT
- Say "next" when ready for next task → just build it, no questions
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
  usePlan.tsx              — React Context (PlanProvider) → reads settings.subscription.tier
  FeatureGate.tsx          — Tier-gating wrapper with lock UI
  TierToggle.tsx           — Session 10 → S/G/P/E pill toggle in sidebar footer
  DemoMode.tsx             — Session 10 → useDemoMode hook + DemoBanner component
  DemoSeed.ts              — Session 10 → seedDemoData() + resetToLive()
  ReportsTab.tsx           — Session 10 → real charts, tier-gated analytics
  SEOTab.tsx               — tier-2 full gate, tier-3 on Keywords + AIO
  SocialTab.tsx            — tier-2 full gate, tier-3 AI/Campaign/Connections, tier-4 Analytics
  LeadsTab.tsx             — tap-to-contact links + sms: tap-to-text link + SMS consent badges
  SettingsTab.tsx          — Demo Mode section added
  BlogTab.tsx              —
  ContentTab.tsx           —
  LocationsTab.tsx         —
  KeywordPowerBox.tsx      —
  PageHelpBanner.tsx       —
  TeamTab.tsx              —
  TestimonialsTab.tsx      —
  seo/
    AIOTab.tsx             —
    KeywordResearch.tsx    —

src/pages/
  AdminLogin.tsx
  AdminPage.tsx
  QuotePage.tsx            — Session 11 → TCPA dual consent checkboxes, SMS fires on submit
  admin/
    Onboarding.tsx
```

## KEY ARCHITECTURAL NOTES
- **Sidebar + main layout file:** find it by running `find src -name "*.tsx" | xargs grep -l "TierToggle"` → it is NOT Dashboard.tsx or AdminSidebar.tsx
- **usePlan is a React Context** → PlanProvider wraps the admin layout, all components share one tier state. Never revert to standalone hook.
- **Tier stored in settings table, key = `subscription`** → value = `{ tier: 1|2|3|4, plan_name, monthly_price }`
- **DemoBanner** is placed in the main admin layout file above tab content area
- **Two Claude Code instances** → always confirm you are in `dang-pest-control` repo before running, not `pestflow-platform`
- **LeadsTab.tsx is the CRM lead detail file** → NOT AdminCrm.tsx (that file does not exist in this repo)

---

## SUPABASE — DANG PEST CONTROL
- **Tenant ID:** `1282b822-825b-4713-9dc9-6d14a2094d06`
- **Key tables:** `leads`, `site_config`, `social_posts`, `blog_posts`, `location_data`, `testimonials`, `page_snapshots`, `seo_meta`, `settings`
- **leads table extra columns (Session 11):**
  - `sms_transactional_consent` boolean DEFAULT false
  - `sms_marketing_consent` boolean DEFAULT false
- **settings keys:**
  - `subscription` → `{ tier: 1|2|3|4, plan_name, monthly_price, upgraded_at }`
  - `demo_mode` → `{ active: true|false, seeded_at, went_live_at }`
- **Edge functions deployed:**
  - `notify-new-lead` → Resend integration, fires on contact + quote form submit (verify still working)
  - `weekly-seo-report` → weekly SEO digest
  - `send-sms-confirmation` → SimpleTexting SMS confirmation, fires on quote submit if transactional consent given

---

## SIMPLETEXTING — SMS
- **Provider:** SimpleTexting (not Twilio → Twilio is PestFlow Pro only)
- **Sending number:** 9032181938
- **API endpoint:** https://api-app2.simpletexting.com/v2/api/messages
- **Secret name:** `SIMPLETEXTING_API_KEY` → set directly in Supabase dashboard secrets
- **Confirmed working:** tested via Supabase Test panel ✅
- **Twilio:** dropped from Dang build → PestFlow Pro spec item only

---

## VERCEL ENV VARS
- `RESEND_API_KEY` → set, all environments
- `VITE_ANTHROPIC_API_KEY` → set, all environments

---

## COMPLETED WORK — ALL SESSIONS

### Sessions 1–7
- Full public-facing site: Home, Services, About, Contact, Blog, Location pages
- Admin dashboard: Leads, Settings, Locations, Testimonials, Team, Blog, Content, Reports
- AI keyword research (KeywordPowerBox + KeywordResearch)
- Social media scheduler (demo mode)
- PageSpeed optimizations, SEO meta seeding
- Location pages with Supabase CRUD
- 5-step client onboarding wizard at `/admin/onboarding`

### Session 8
- SEOTab fully upgraded: 3-tab layout (Overview/Pages/Connect), Lighthouse rings, CWV, GSC connect
- SocialTab connections modal: Export/DIY/Buffer/Ayrshare tabs
- LeadsTab tap-to-contact email + phone links

### Session 9
- SocialTab campaign batch posting wizard (single vs campaign, AI generates JSON, bulk insert)
- `campaign_title` column on `social_posts`
- Plan gating system: usePlan hook + FeatureGate component + sidebar lock icons

### Session 10
- **usePlan converted to React Context (PlanProvider)** → fixes tier toggle reactivity across all components
- **TierToggle component** → S/G/P/E pill in sidebar footer, writes to `settings.subscription`, all gates react instantly
- **ReportsTab upgraded** → 4 stat cards, lead volume bar chart (tier 1), SEO & content trends (tier 2), advanced analytics (tier 3)
- **Demo Mode system** → seedDemoData() seeds 18 leads / 5 blogs / 12 social posts / 6 testimonials / 10 SEO keywords
- **DemoBanner** → yellow banner across all admin pages when demo_mode.active = true
- **Go-Live reset** → clears all seeded demo records, sets demo_mode.active = false
- **Resend integration** → `notify-new-lead` Supabase edge function deployed; contact + quote forms fire email to `info@dangpestcontrol.com`

### Session 11
- **sms: tap-to-text link** → added to lead detail in LeadsTab.tsx alongside existing tel: call link
- **TCPA dual consent checkboxes** → replaced single checkbox on QuotePage.tsx with two compliant checkboxes (transactional + marketing), matching Kirk's live site language
- **SMS consent columns** → `sms_transactional_consent` + `sms_marketing_consent` added to `leads` table
- **send-sms-confirmation edge function** → deployed, wired to SimpleTexting API (api-app2.simpletexting.com), fires after successful quote form insert if transactional consent checked
- **SMS consent badges** → green/blue badges on lead detail showing opt-in status
- **_session-context/ directory created** → session-current.md and history/ now live in repo

---

## PENDING — WHAT'S LEFT TO BUILD

| Item | Priority | Notes |
|---|---|---|
| **Verify Resend live** | High | Test real form submit, confirm email arrives at info@dangpestcontrol.com → notify-new-lead function |
| **LeadFusion Local** | Medium | Live Google reviews widget on public site, Elite tier gate in admin |
| **Facebook token** | Low | Social posting is still demo mode → needs real FB token to go live |
| **Twilio** | ❌ Dropped | PestFlow Pro spec item only → SimpleTexting handles SMS for Dang |

---

## PRICING TIERS

| Feature | Starter $149 | Grow $249 | Pro $349 | Elite $499 |
|---|---|---|---|---|
| Professional website | ✅ | ✅ | ✅ | ✅ |
| Lead capture + CRM | ✅ | ✅ | ✅ | ✅ |
| Site settings & branding | ✅ | ✅ | ✅ | ✅ |
| Location pages (up to 3) | ✅ | ✅ | ✅ | ✅ |
| Location pages (unlimited) | ❌ | ✅ | ✅ | ✅ |
| Testimonials + Team | ✅ | ✅ | ✅ | ✅ |
| Basic SEO meta editor | ✅ | ✅ | ✅ | ✅ |
| Basic reports | ✅ | ✅ | ✅ | ✅ |
| Full SEO suite (Lighthouse, CWV, GSC) | 🔒 | ✅ | ✅ | ✅ |
| Blog / content management | 🔒 | ✅ | ✅ | ✅ |
| Social manual scheduling | 🔒 | ✅ | ✅ | ✅ |
| Standard reports | 🔒 | ✅ | ✅ | ✅ |
| AI keyword research | 🔒 | 🔒 | ✅ | ✅ |
| AIO structured data | 🔒 | 🔒 | ✅ | ✅ |
| AI social post generation | 🔒 | 🔒 | ✅ | ✅ |
| AI campaign batch posting | 🔒 | 🔒 | ✅ | ✅ |
| Advanced reports + trends | 🔒 | 🔒 | ✅ | ✅ |
| Social analytics | 🔒 | 🔒 | 🔒 | ✅ |
| Ayrshare all-platform posting | 🔒 | 🔒 | 🔒 | ✅ |
| LeadFusion live reviews | 🔒 | 🔒 | 🔒 | ✅ |
| White-glove onboarding | 🔒 | 🔒 | 🔒 | ✅ |

---

## SAFETY NET — REVERT PROMPT
If SEOTab or SocialTab breaks:
```
1. git log --oneline -10
2. Find commit hash for "BACKUP: pre-dashboard-upgrade snapshot"
   Hash: 697d449
3. git checkout 697d449 -- src/components/admin/SEOTab.tsx src/components/admin/SocialTab.tsx
4. git add, commit -m "Revert: restore SEOTab and SocialTab", push
```

---

## KEY RULES — NEVER BREAK THESE
- Routes in App.tsx must appear before `/:slug` catch-all
- `exec_sql` RPC does not exist → SQL goes through Supabase MCP or Dashboard SQL Editor
- Anthropic model string must always be `claude-sonnet-4-6`
- `has_role()` RPC checks `public.user_roles`, not profiles table
- Claude Code must always end with `git push`
- PageHelpBanner on every admin tab → never remove
- usePlan is a Context (PlanProvider) → never revert to standalone hook
- Always confirm which repo (dang vs pestflow-platform) before running Claude Code
- Session context MD lives in repo: `_session-context/session-current.md`
- LeadsTab.tsx is the CRM file → AdminCrm.tsx does not exist in this repo
- SimpleTexting API base URL is https://api-app2.simpletexting.com (not api.simpletexting.com)

---

## PESTFLOW PRO — BIGGER PICTURE
Dang Pest Control is the proof-of-concept for **PestFlow Pro**, a white-label multi-tenant SaaS platform for pest control companies. Repo: `ironwoodoperations/pestflow-platform`. Full feature reference: `pestflow-pro-pricing-features.md` in PestFlow Pro project knowledge.
