# Dang Pest Control — Session 18 Context

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

## START OF SESSION ROUTINE
```
cat _session-context/session-current.md
```

---

## ✅ SITE STATUS — PRODUCTION READY

The Dang Pest Control site is fully built, tested, and clean. All integrations confirmed live. All mobile bugs fixed. All hardcoded URLs replaced. Build passing with zero errors.

**One manual step remaining before DNS cutover:**
- Add `VITE_SITE_URL=https://dangpestcontrol.com` in Vercel dashboard → Settings → Environment Variables → all environments
- Trigger a redeploy after adding

**DNS Cutover Checklist:**
- [ ] Add `VITE_SITE_URL` env var in Vercel + redeploy
- [ ] Vercel dashboard → project → Settings → Domains → add `dangpestcontrol.com` + `www.dangpestcontrol.com`
- [ ] At domain registrar: CNAME `www` → `cname.vercel-dns.com` / A record `@` → `76.76.21.21`
- [ ] Confirm SSL active after propagation (5–30 min)
- [ ] Submit test quote form — confirm email arrives at `info@dangpestcontrol.com`
- [ ] Spot check homepage, one service page, quote form on mobile

---

## INTEGRATIONS — ALL CONFIRMED

| Integration | Status | Notes |
|---|---|---|
| Resend email | ✅ LIVE | Quote + contact forms → info@dangpestcontrol.com |
| SimpleTexting SMS | ✅ LIVE | Quote form + transactional consent → lead's phone |
| Google Reviews (LeadFusion) | ✅ LIVE | Elite tier, 5.0 stars / 42 reviews |
| Lighthouse / PageSpeed | ✅ LIVE | Reads VITE_SITE_URL, fallback dangpestcontrol.com |
| Ayrshare | ⏳ Not connected | Elite tier, not blocking launch |
| Facebook token | ⏳ Not connected | Demo mode works indefinitely |

---

## ADMIN DASHBOARD — FILE STRUCTURE
```
src/components/admin/
  usePlan.tsx              ✅ React Context (PlanProvider)
  FeatureGate.tsx          ✅ Tier-gating wrapper
  TierToggle.tsx           ✅ S/G/P/E pill toggle in sidebar footer
  DemoMode.tsx             ✅ useDemoMode hook + DemoBanner
  DemoSeed.ts              ✅ seedDemoData() + resetToLive()
  ReportsTab.tsx           ✅ real charts, tier-gated analytics
  SEOTab.tsx               ✅ tier-2 full gate, tier-3 Keywords + AIO
  SocialTab.tsx            ✅ tier-2 full gate, tier-3 AI/Campaign, tier-4 Analytics
  LeadsTab.tsx             ✅ tap-to-contact + sms: link + SMS consent badges
  SettingsTab.tsx          ✅
  BlogTab.tsx              ✅
  ContentTab.tsx           ✅
  LocationsTab.tsx         ✅
  KeywordPowerBox.tsx      ✅
  PageHelpBanner.tsx       ✅
  TeamTab.tsx              ✅
  TestimonialsTab.tsx      ✅
  ReviewsTab.tsx           ✅ Elite gated, live Google reviews, Sync to Testimonials
  ClientOnboardingWizard.tsx ✅ 11-slide wizard, plan gating, MD export
  seo/
    AIOTab.tsx             ✅
    KeywordResearch.tsx    ✅
```

## KEY ARCHITECTURAL NOTES
- **usePlan is a React Context (PlanProvider)** — never revert to standalone hook
- **Tier stored in `settings` table, key = `subscription`**
- **LeadsTab.tsx is the CRM file** — AdminCrm.tsx does not exist
- **ScrollToTop** is first child inside Router in App.tsx
- **Admin sidebar file:** `AdminSidebar.tsx`
- **ClientOnboardingWizard.tsx** retains inline grid styles intentionally — do not convert

---

## SUPABASE
- **Tenant ID:** `1282b822-825b-4713-9dc9-6d14a2094d06`
- **Key tables:** `leads`, `site_config`, `social_posts`, `blog_posts`, `location_data`, `testimonials`, `page_snapshots`, `seo_meta`, `settings`
- **Edge functions:** `notify-new-lead` ✅, `send-sms-confirmation` ✅, `fetch-google-reviews` ✅, `weekly-seo-report`
- **Secrets:** `GOOGLE_PLACES_API_KEY`, `SIMPLETEXTING_API_KEY`, `RESEND_API_KEY`
- **Vercel env vars:** `VITE_ANTHROPIC_API_KEY`, `VITE_PAGESPEED_API_KEY`, `VITE_SITE_URL` (⚠️ add before cutover)

---

## COMPLETED WORK — ALL SESSIONS

### Sessions 1–13
- Full public site + admin dashboard, all tabs, AI tools, Demo Mode, plan gating, SMS, email, Google Reviews, ScrollToTop, ClientOnboardingWizard, Lighthouse

### Sessions 14–15
- Full mobile QA + 29-file responsive overhaul: process step cards, Why Choose Us cards, footer nav, demo seed leak, About page duplicate heading, hero image, navbar logo, section padding, all page grids

### Session 16
- Resend + SMS confirmed live; converted all 9 remaining inline `gridTemplateColumns` to responsive Tailwind; build clean

### Session 17 ✅ COMPLETED — PRE-LAUNCH CLEANUP
- Audited entire codebase for external URL references before DNS cutover
- Found and fixed 6 hardcoded `pestflow-pro.vercel.app` references:
  - `ContactPage.tsx` — SMS body link
  - `QuotePage.tsx` — SMS body link
  - `StepReview.tsx` — Terms + Privacy links
  - `SeoConnectTab.tsx` — placeholder URL
  - `useSeoAudit.ts` — PageSpeed audit URL → now reads `VITE_SITE_URL` with `dangpestcontrol.com` fallback
- Zero `dangpestcontrol.com` hardcoded references found (clean)
- 2 `pestflowpro.com` references left intentionally (platform branding)
- Build passing, zero TS errors

**Site is fully production-ready for DNS cutover.**

---

## PENDING — SESSION 18

| Item | Priority | Notes |
|---|---|---|
| **DNS cutover** | High | See checklist above — one env var to add first |
| **Post-launch smoke test** | High | Quote form, email, SMS, mobile spot check after cutover |
| **PestFlow Pro Session 1** | Medium | New Claude project, seed with pestflow-pro.md |
| Ayrshare token | Low | Elite tier, not blocking |

---

## SAFETY NET
```
git checkout 697d449 -- src/components/admin/SEOTab.tsx src/components/admin/SocialTab.tsx
git add -am "Revert: restore SEOTab and SocialTab" && git push
```

---

## KEY RULES — NEVER BREAK THESE
- Routes in App.tsx before `/:slug` catch-all
- No `exec_sql` RPC — SQL via Supabase MCP or Dashboard SQL Editor
- Anthropic model string: `claude-sonnet-4-6`
- Claude Code always ends with `git push`
- PageHelpBanner on every admin tab
- usePlan is a Context (PlanProvider) — never standalone hook
- Always confirm repo (dang vs pestflow-platform) before running
- Session context MD: `_session-context/session-current.md`
- LeadsTab.tsx is the CRM file — AdminCrm.tsx does not exist
- SimpleTexting base URL: https://api-app2.simpletexting.com
- ScrollToTop is first child inside Router in App.tsx
- ClientOnboardingWizard.tsx keeps inline grid styles — do not convert

---

## PESTFLOW PRO — BIGGER PICTURE
Dang is the proof-of-concept for **PestFlow Pro**, white-label multi-tenant SaaS. Repo: `ironwoodoperations/pestflow-platform`.
