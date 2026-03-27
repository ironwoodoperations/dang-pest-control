import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface HelpStep {
  title: string;
  detail: string;
}

interface HelpContent {
  summary: string;
  steps: HelpStep[];
}

const HELP: Record<string, HelpContent> = {
  dashboard: {
    summary: "A live overview of your site's activity and health.",
    steps: [
      { title: "Recent Leads", detail: "Shows the latest quote form submissions. Click any row to jump to the Leads tab for full details." },
      { title: "SEO Configuration", detail: "Displays how many pages have SEO metadata filled in. Click 'Go to SEO tab' to fix any gaps." },
      { title: "Stats cards", detail: "Quick counts for total leads, blog posts, locations, and testimonials — all pulled live from your database." },
    ],
  },
  leads: {
    summary: "View and manage every quote form submission from your website.",
    steps: [
      { title: "View a lead", detail: "Click any row to see the full submission — name, contact info, service requested, and message." },
      { title: "Change status", detail: "Use the status dropdown on each row to mark leads as New, Contacted, or Closed." },
      { title: "Filter & search", detail: "Use the search box to find leads by name or service. Use the status filter to narrow results." },
      { title: "Delete a lead", detail: "Open a lead and click Delete to remove it permanently." },
    ],
  },
  content: {
    summary: "Edit the title, subtitle, intro text, and video for any page on your site.",
    steps: [
      { title: "Select a page", detail: "Choose a page from the dropdown at the top. All pest pages, location pages, and content pages are listed." },
      { title: "Edit fields", detail: "Update the title, subtitle, or intro text. Changes are saved per page and override the defaults." },
      { title: "Video settings", detail: "Paste a YouTube ID or video URL to replace the homepage mid-page video. Choose the video type from the dropdown." },
      { title: "Save", detail: "Click 'Save Changes' — your edits go live immediately on the site." },
    ],
  },
  blog: {
    summary: "Create, edit, and publish blog posts that appear on your /blog page.",
    steps: [
      { title: "Create a post", detail: "Click 'New Post', fill in the title, slug, content, and featured image URL, then save." },
      { title: "Edit a post", detail: "Click the pencil icon on any post row to open the editor." },
      { title: "Publish / unpublish", detail: "Toggle the 'Published' switch to control whether a post appears on the live site." },
      { title: "Delete a post", detail: "Click the trash icon on any post row. This is permanent." },
      { title: "Slug", detail: "The slug is the URL path — e.g. 'spring-pest-tips' becomes /blog/spring-pest-tips. Keep it lowercase with hyphens." },
    ],
  },
  locations: {
    summary: "Manage city-specific landing pages that each get their own URL (e.g. /tyler-tx).",
    steps: [
      { title: "Add a location", detail: "Click 'Add Location', choose a city from the dropdown — the slug and hero title auto-populate. Fill in the local intro, pest description, map embed URL, and a local testimonial quote." },
      { title: "Go live", detail: "Toggle 'Is Live' to make the page visible on the site and listed in the Service Area page." },
      { title: "Edit a location", detail: "Click the pencil icon on any row to update its content." },
      { title: "Map embed", detail: "Get the embed URL from Google Maps: search the city → Share → Embed a map → copy the src URL only." },
      { title: "Delete", detail: "Click the trash icon. The URL will return a 404 immediately." },
    ],
  },
  testimonials: {
    summary: "Add and manage customer reviews that appear on your Reviews page and homepage.",
    steps: [
      { title: "Add a testimonial", detail: "Click 'Add Testimonial', fill in the customer name, location, rating (1–5), and their review text." },
      { title: "Feature a testimonial", detail: "Toggle 'Featured' to show a review in the homepage testimonials section." },
      { title: "Edit or delete", detail: "Use the pencil and trash icons on each row." },
    ],
  },
  seo: {
    summary: "Set the meta title and description for every page — what Google shows in search results.",
    steps: [
      { title: "Edit a page's SEO", detail: "Click the pencil icon on any page row. Fill in the meta title (50–60 chars) and meta description (150–160 chars)." },
      { title: "Status", detail: "Mark a page as 'Live' once its SEO is finalized. Draft pages are still indexed — this is just a tracking tool." },
      { title: "Keywords tab", detail: "Track target keywords, their search volume, and difficulty. This is for your reference only — it doesn't affect the site." },
      { title: "Filter", detail: "Use the search and status filter to find pages quickly across all pest, location, and content pages." },
    ],
  },
  settings: {
    summary: "Control your site's branding, hero media, holiday campaigns, contact info, and more.",
    steps: [
      { title: "Branding", detail: "Upload your logo and favicon URLs. These appear site-wide." },
      { title: "Hero Media", detail: "Set the YouTube video that plays on the homepage hero, including start/end timestamps." },
      { title: "Campaigns", detail: "Enable Holiday Mode and pick a holiday. A branded banner appears at the top of the site and a ribbon decorates the homepage video." },
      { title: "Contact Info", detail: "Update your phone, email, address, hours, and service area. These populate the footer and contact page." },
      { title: "Save", detail: "Always click 'Save All Settings' at the bottom — all sections save together." },
    ],
  },
  team: {
    summary: "Add and manage admin users who can log into this dashboard.",
    steps: [
      { title: "Add a user", detail: "Click 'Add Team Member', enter their email and a temporary password. They can log in at /admin/login." },
      { title: "Roles", detail: "Admin users have full access. Editor users have access to content tabs only (Blog, Locations, Testimonials, Page Content)." },
      { title: "Remove a user", detail: "Click the trash icon on any team member row to revoke their access." },
    ],
  },
};

interface PageHelpBannerProps {
  tab: string;
}

const PageHelpBanner = ({ tab }: PageHelpBannerProps) => {
  const [open, setOpen] = useState(false);
  const help = HELP[tab];
  if (!help) return null;

  return (
    <div
      className="rounded-xl border mb-5 overflow-hidden"
      style={{
        borderColor: "hsl(var(--admin-sidebar-border))",
        background: "hsl(var(--admin-card-bg))",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 gap-3 transition-colors hover:opacity-80"
        style={{ background: "transparent" }}
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(var(--admin-teal))" }} />
          <span className="font-body text-xs font-semibold" style={{ color: "hsl(var(--admin-teal))" }}>
            How to use this page
          </span>
          <span className="font-body text-xs hidden sm:inline" style={{ color: "hsl(var(--admin-text-muted))" }}>
            — {help.summary}
          </span>
        </div>
        {open
          ? <ChevronUp className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(var(--admin-text-muted))" }} />
          : <ChevronDown className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(var(--admin-text-muted))" }} />
        }
      </button>

      {open && (
        <div
          className="px-4 pb-4 pt-1 grid sm:grid-cols-2 gap-2 border-t"
          style={{ borderColor: "hsl(var(--admin-sidebar-border))" }}
        >
          {help.steps.map((step) => (
            <div key={step.title} className="flex gap-2">
              <span
                className="mt-0.5 w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "hsl(var(--admin-teal))", marginTop: "6px" }}
              />
              <div>
                <span className="font-body text-xs font-semibold" style={{ color: "hsl(var(--admin-text))" }}>
                  {step.title}
                </span>
                <span className="font-body text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>
                  {" — "}{step.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PageHelpBanner;
