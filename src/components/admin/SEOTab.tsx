import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTenant } from "@/hooks/useTenant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Search, Globe, Plus, Trash2, Save, ExternalLink, TrendingUp,
  AlertCircle, CheckCircle2, RotateCcw, Monitor, Smartphone,
  RefreshCw, Shield, BarChart3, Link2, Zap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import KeywordPowerBox from "@/components/admin/KeywordPowerBox";
import PageHelpBanner from "./PageHelpBanner";
import KeywordResearch from "./seo/KeywordResearch";
import AIOTab from "./seo/AIOTab";

// —— Types ————————————————————————————————————————————————————————————————

interface Keyword {
  keyword: string;
  volume: string;
  difficulty: string;
  notes: string;
}

interface PageSEO {
  slug: string;
  label: string;
  meta_title: string;
  meta_description: string;
  status: "live" | "draft";
}

const allSitePages: Omit<PageSEO, "meta_title" | "meta_description" | "status">[] = [
  { slug: "/", label: "Home" },
  { slug: "/about", label: "About Us" },
  { slug: "/quote", label: "Get a Quote" },
  { slug: "/contact", label: "Contact" },
  { slug: "/service-area", label: "Service Area" },
  { slug: "/reviews", label: "Reviews" },
  { slug: "/blog", label: "Blog" },
  { slug: "/faq", label: "FAQ" },
  { slug: "/accessibility", label: "Accessibility" },
  { slug: "/pest-control", label: "General Pest Control" },
  { slug: "/termite-control", label: "Termite Control" },
  { slug: "/termite-inspections", label: "Termite Inspections" },
  { slug: "/ant-control", label: "Ant Control" },
  { slug: "/spider-control", label: "Spider Control" },
  { slug: "/wasp-hornet-control", label: "Wasp & Hornet Control" },
  { slug: "/scorpion-control", label: "Scorpion Control" },
  { slug: "/rodent-control", label: "Rodent Control" },
  { slug: "/mosquito-control", label: "Mosquito Control" },
  { slug: "/flea-tick-control", label: "Flea & Tick Control" },
  { slug: "/roach-control", label: "Roach Control" },
  { slug: "/bed-bug-control", label: "Bed Bug Control" },
  { slug: "/longview-tx", label: "Longview, TX" },
  { slug: "/jacksonville-tx", label: "Jacksonville, TX" },
  { slug: "/lindale-tx", label: "Lindale, TX" },
  { slug: "/bullard-tx", label: "Bullard, TX" },
  { slug: "/whitehouse-tx", label: "Whitehouse, TX" },
];

// —— Constants ———————————————————————————————————————————————————————————

const SITE_DOMAIN = "dangpestcontrol.com";
const SITE_URL = `https://${SITE_DOMAIN}`;

const SERVICE_SLUGS = [
  "/pest-control","/termite-control","/termite-inspections","/ant-control",
  "/spider-control","/wasp-hornet-control","/scorpion-control","/rodent-control",
  "/mosquito-control","/flea-tick-control","/roach-control","/bed-bug-control",
];
const LOCATION_SLUGS = allSitePages.filter(p => /^\/[a-z]+-tx$/.test(p.slug)).map(p => p.slug);

const statusColors: Record<string, string> = {
  live: "bg-[hsl(160,70%,92%)] text-[hsl(160,70%,35%)]",
  draft: "bg-[hsl(40,100%,92%)] text-[hsl(40,100%,35%)]",
};
const difficultyColors: Record<string, string> = {
  Low: "bg-[hsl(160,70%,92%)] text-[hsl(160,70%,35%)]",
  Medium: "bg-[hsl(234,85%,95%)] text-[hsl(234,85%,50%)]",
  High: "bg-destructive/15 text-destructive",
};

// —— Sub-components ——————————————————————————————————————————————————————

const ScoreRing = ({ score, label }: { score: number | null; label: string }) => {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = score !== null ? circ - (score / 100) * circ : circ;
  const col = score === null ? "#9ca3af" : score >= 90 ? "#16a34a" : score >= 50 ? "#d97706" : "#dc2626";
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="88" height="88" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        {score !== null && (
          <circle cx="48" cy="48" r={r} fill="none" stroke={col} strokeWidth="8"
            strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
            transform="rotate(-90 48 48)" style={{ transition: "stroke-dashoffset 0.6s ease" }} />
        )}
        <text x="48" y="54" textAnchor="middle" fontSize="20" fontWeight="700" fill={col}>
          {score ?? "–"}
        </text>
      </svg>
      <p className="text-xs font-body text-center font-medium" style={{ color: "hsl(var(--admin-text))" }}>{label}</p>
    </div>
  );
};

const VitalRow = ({ label, value, note }: { label: string; value: string | null; note: string }) => (
  <div className="flex items-center justify-between py-2.5 border-b last:border-0" style={{ borderColor: "hsl(var(--admin-sidebar-border))" }}>
    <div>
      <p className="text-sm font-body font-medium" style={{ color: "hsl(var(--admin-text))" }}>{label}</p>
      <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>{note}</p>
    </div>
    <span className="text-sm font-body font-semibold" style={{ color: value ? "hsl(var(--admin-text))" : "hsl(var(--admin-text-muted))" }}>
      {value ?? "–"}
    </span>
  </div>
);

const ConnectCard = ({
  icon: Icon, title, status, description, children,
}: {
  icon: React.ElementType; title: string;
  status: "active" | "connected" | "not-connected";
  description: string; children?: React.ReactNode;
}) => {
  const cfg = {
    active: { label: "Active — No Setup Required", color: "hsl(160,70%,35%)", bg: "hsl(160,70%,92%)" },
    connected: { label: "Connected", color: "hsl(160,70%,35%)", bg: "hsl(160,70%,92%)" },
    "not-connected": { label: "Not Connected", color: "hsl(var(--admin-text-muted))", bg: "hsl(var(--admin-sidebar-border))" },
  }[status];
  return (
    <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
      <CardContent className="pt-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 shrink-0" style={{ color: "hsl(var(--admin-text-muted))" }} />
            <h3 className="font-body font-semibold text-sm" style={{ color: "hsl(var(--admin-text))" }}>{title}</h3>
          </div>
          <Badge className="font-body text-xs border-0 shrink-0" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</Badge>
        </div>
        <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>{description}</p>
        {children}
      </CardContent>
    </Card>
  );
};

// —— Main Component ——————————————————————————————————————————————————————

const SEOTab = () => {
  // Existing state
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [pages, setPages] = useState<PageSEO[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddKeyword, setShowAddKeyword] = useState(false);
  const [editingPage, setEditingPage] = useState<PageSEO | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showAllPages, setShowAllPages] = useState(false);
  const [newKw, setNewKw] = useState<Keyword>({ keyword: "", volume: "", difficulty: "Medium", notes: "" });
  const [seoSnapshots, setSeoSnapshots] = useState<Record<string, { meta_title: string; meta_description: string }>>({});

  // New state
  const [activeTab, setActiveTab] = useState<"overview" | "pages" | "connect">("overview");
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");
  const [lighthouseData, setLighthouseData] = useState<{
    performance: number; accessibility: number; bestPractices: number; seo: number;
    lcp: string | null; cls: string | null; tbt: string | null;
  } | null>(null);
  const [lighthouseLoading, setLighthouseLoading] = useState(false);
  const [lighthouseCheckedAt, setLighthouseCheckedAt] = useState<Date | null>(null);
  const [gscUrl, setGscUrl] = useState("");
  const [ga4Id, setGa4Id] = useState("");
  const [integrationsSaving, setIntegrationsSaving] = useState<string | null>(null);

  const { toast } = useToast();
  const { tenantId } = useTenant();
  const snapshotsLoaded = useRef(false);

  // —— Fetch SEO data ———————————————————————————————————————
  useEffect(() => {
    if (!tenantId) return;
    const fetchSEO = async () => {
      const { data } = await supabase
        .from("site_config")
        .select("key, value, seo_title, seo_description")
        .eq("tenant_id", tenantId);

      const savedPageMap: Record<string, { seo_title: string; seo_description: string; status: string }> = {};
      let savedKeywords: Keyword[] = [];
      let savedStatuses: Record<string, string> = {};

      if (data) {
        for (const row of data) {
          if (row.key === "seo_keywords") savedKeywords = (row.value as unknown as Keyword[]) || [];
          if (row.key === "seo_statuses") savedStatuses = (row.value as unknown as Record<string, string>) || {};
          if (row.key === "seo_integrations") {
            const v = row.value as any;
            setGscUrl(v?.gsc_url || "");
            setGa4Id(v?.ga4_id || "");
          }
          if (row.key.startsWith("seo:")) {
            const slug = row.key.replace("seo:", "");
            savedPageMap[slug] = { seo_title: row.seo_title || "", seo_description: row.seo_description || "", status: "draft" };
          }
          if (row.key === "seo_pages") {
            const raw = (row.value as unknown as PageSEO[]) || [];
            for (const p of raw) {
              if (!savedPageMap[p.slug]) {
                savedPageMap[p.slug] = { seo_title: p.meta_title || "", seo_description: p.meta_description || "", status: p.status || "draft" };
              }
            }
          }
        }
      }

      const merged = allSitePages.map((p) => {
        const found = savedPageMap[p.slug];
        const status = savedStatuses[p.slug] || found?.status || "draft";
        return { ...p, meta_title: found?.seo_title || "", meta_description: found?.seo_description || "", status: status as "live" | "draft" };
      });

      setPages(merged);
      setKeywords(savedKeywords);
      setLoading(false);
    };
    fetchSEO();
  }, [tenantId]);

  // —— Save snapshots ———————————————————————————————————————
  useEffect(() => {
    if (!tenantId || !pages.length || loading || snapshotsLoaded.current) return;
    snapshotsLoaded.current = true;
    const saveSnapshots = async () => {
      const { data: existing } = await supabase.from("page_snapshots" as any).select("page_slug, snapshot_data").eq("tenant_id", tenantId).eq("snapshot_type", "seo");
      const existingMap: Record<string, any> = {};
      if (existing) { for (const row of existing as any[]) existingMap[row.page_slug] = row.snapshot_data; }
      setSeoSnapshots(existingMap);
      const toInsert = pages
        .filter((p) => (p.meta_title || p.meta_description) && !existingMap[p.slug])
        .map((p) => ({ tenant_id: tenantId, page_slug: p.slug, snapshot_type: "seo", snapshot_data: { meta_title: p.meta_title, meta_description: p.meta_description } }));
      if (toInsert.length > 0) {
        const { data: inserted } = await supabase.from("page_snapshots" as any).insert(toInsert).select("page_slug, snapshot_data");
        if (inserted) {
          const updated = { ...existingMap };
          for (const row of inserted as any[]) updated[row.page_slug] = row.snapshot_data;
          setSeoSnapshots(updated);
        }
      }
    };
    saveSnapshots();
  }, [tenantId, pages, loading]);

  // —— Lighthouse ———————————————————————————————————————————
  const runLighthouse = async () => {
    setLighthouseLoading(true);
    try {
      const apiKey = (import.meta as any).env?.VITE_PAGESPEED_API_KEY || "";
      const keyParam = apiKey ? `&key=${apiKey}` : "";
      const url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(SITE_URL)}&strategy=${strategy}&category=performance&category=accessibility&category=best-practices&category=seo${keyParam}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`PageSpeed API error: ${res.status}`);
      const data = await res.json();
      const cats = data.lighthouseResult?.categories;
      const audits = data.lighthouseResult?.audits;
      if (!cats) throw new Error("No Lighthouse data");
      setLighthouseData({
        performance: Math.round((cats.performance?.score || 0) * 100),
        accessibility: Math.round((cats.accessibility?.score || 0) * 100),
        bestPractices: Math.round((cats["best-practices"]?.score || 0) * 100),
        seo: Math.round((cats.seo?.score || 0) * 100),
        lcp: audits?.["largest-contentful-paint"]?.displayValue || null,
        cls: audits?.["cumulative-layout-shift"]?.displayValue || null,
        tbt: audits?.["total-blocking-time"]?.displayValue || null,
      });
      setLighthouseCheckedAt(new Date());
    } catch {
      setLighthouseData(null);
    } finally {
      setLighthouseLoading(false);
    }
  };

  // —— Existing functions ———————————————————————————————————

  const handleRevertSEO = async (page: PageSEO) => {
    const snapshot = seoSnapshots[page.slug];
    if (!snapshot) { toast({ title: "No original found", description: "No snapshot exists for this page.", variant: "destructive" }); return; }
    await supabase.from("site_config").update({ seo_title: snapshot.meta_title, seo_description: snapshot.meta_description, updated_at: new Date().toISOString() }).eq("key", `seo:${page.slug}`).eq("tenant_id", tenantId);
    setPages((prev) => prev.map((p) => p.slug === page.slug ? { ...p, meta_title: snapshot.meta_title || "", meta_description: snapshot.meta_description || "" } : p));
    toast({ title: "Restored original SEO ✓", description: `Reverted meta tags for ${page.label}.` });
  };

  const saveToConfig = async (key: string, value: unknown) => {
    if (!tenantId) return;
    setSaving(true);
    try {
      const jsonValue = JSON.parse(JSON.stringify(value));
      const { data: existing } = await supabase.from("site_config").select("id").eq("key", key).eq("tenant_id", tenantId);
      if (existing && existing.length > 0) {
        await supabase.from("site_config").update({ value: jsonValue, updated_at: new Date().toISOString() }).eq("key", key).eq("tenant_id", tenantId);
      } else {
        await supabase.from("site_config").insert({ key, value: jsonValue, tenant_id: tenantId });
      }
    } catch { /* callers show their own toasts */ }
    finally { setSaving(false); }
  };

  const saveIntegration = async (field: string, value: string, label: string) => {
    if (!tenantId) return;
    setIntegrationsSaving(field);
    try {
      const { data: existing } = await supabase.from("site_config").select("id, value").eq("key", "seo_integrations").eq("tenant_id", tenantId).maybeSingle();
      const current = (existing?.value as any) || {};
      const updated = { ...current, [field]: value };
      if (existing?.id) {
        await supabase.from("site_config").update({ value: updated, updated_at: new Date().toISOString() }).eq("key", "seo_integrations").eq("tenant_id", tenantId);
      } else {
        await supabase.from("site_config").insert({ key: "seo_integrations", value: updated, tenant_id: tenantId });
      }
      toast({ title: `${label} saved!` });
    } catch (err) {
      toast({ title: "Save failed", description: String(err), variant: "destructive" });
    } finally { setIntegrationsSaving(null); }
  };

  const addKeyword = () => {
    if (!newKw.keyword.trim()) return;
    const updated = [...keywords, newKw];
    setKeywords(updated);
    saveToConfig("seo_keywords", updated);
    setNewKw({ keyword: "", volume: "", difficulty: "Medium", notes: "" });
    setShowAddKeyword(false);
  };

  const removeKeyword = (idx: number) => {
    const updated = keywords.filter((_, i) => i !== idx);
    setKeywords(updated);
    saveToConfig("seo_keywords", updated);
  };

  const savePageSEO = async () => {
    if (!editingPage || !tenantId) return;
    setSaving(true);
    try {
      const seoKey = `seo:${editingPage.slug}`;
      const { data: existing } = await supabase.from("site_config").select("id").eq("key", seoKey).eq("tenant_id", tenantId);
      if (existing && existing.length > 0) {
        await supabase.from("site_config").update({ seo_title: editingPage.meta_title, seo_description: editingPage.meta_description, updated_at: new Date().toISOString() }).eq("key", seoKey).eq("tenant_id", tenantId);
      } else {
        await supabase.from("site_config").insert({ key: seoKey, value: {}, seo_title: editingPage.meta_title, seo_description: editingPage.meta_description, tenant_id: tenantId });
      }
      const updated = pages.map((p) => (p.slug === editingPage.slug ? editingPage : p));
      setPages(updated);
      await saveToConfig("seo_statuses", Object.fromEntries(updated.map((p) => [p.slug, p.status])));
      if ((editingPage.slug.startsWith("/blog/") || editingPage.slug.match(/^\/[a-z]+-tx$/)) && tenantId) {
        await supabase.from("seo_meta" as any).upsert({ tenant_id: tenantId, page_slug: editingPage.slug, meta_title: editingPage.meta_title, meta_description: editingPage.meta_description, user_edited: true }, { onConflict: "tenant_id,page_slug" });
      }
      toast({ title: "SEO metadata saved!", description: `Updated meta tags for ${editingPage.label}.` });
      setEditingPage(null);
    } catch (err) {
      toast({ title: "Save failed", description: err instanceof Error ? err.message : "An unexpected error occurred.", variant: "destructive" });
    } finally { setSaving(false); }
  };

  // —— Computed ———————————————————————————————————————————————
  const filteredPages = pages.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (p.label.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q)) && (statusFilter === "all" || p.status === statusFilter);
  });
  const liveCount = pages.filter((p) => p.status === "live").length;
  const configuredCount = pages.filter((p) => p.meta_title || p.meta_description).length;
  const issuesCount = pages.filter((p) => p.status === "live" && (!p.meta_title || !p.meta_description)).length;
  const servicePages = pages.filter(p => SERVICE_SLUGS.includes(p.slug));
  const locationPages = pages.filter(p => LOCATION_SLUGS.includes(p.slug));
  const otherPages = pages.filter(p => !SERVICE_SLUGS.includes(p.slug) && !LOCATION_SLUGS.includes(p.slug));

  if (loading) return <p className="font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Loading…</p>;

  const tabBtn = (t: typeof activeTab) => ({
    className: `flex items-center gap-1.5 px-4 py-2 text-sm font-body font-medium rounded-lg transition-all`,
    style: activeTab === t
      ? { background: "hsl(var(--admin-indigo))", color: "white" }
      : { color: "hsl(var(--admin-text-muted))" },
    onClick: () => setActiveTab(t),
  });

  return (
    <div className="space-y-6">
      <PageHelpBanner tab="seo" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="font-body text-2xl font-bold" style={{ color: "hsl(var(--admin-text))" }}>SEO Dashboard</h2>
        <div className="flex items-center gap-2">
          {lighthouseCheckedAt && (
            <span className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
              Checked {lighthouseCheckedAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
            </span>
          )}
          <Button size="sm" variant="outline" className="gap-1.5 font-body text-xs" onClick={runLighthouse} disabled={lighthouseLoading}
            style={{ borderColor: "hsl(var(--admin-sidebar-border))", color: "hsl(var(--admin-text))" }}>
            <RefreshCw className={`w-3.5 h-3.5 ${lighthouseLoading ? "animate-spin" : ""}`} /> Refresh
          </Button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit" style={{ background: "hsl(var(--admin-sidebar-border))" }}>
        <button {...tabBtn("overview")}><TrendingUp className="w-3.5 h-3.5" /> Overview</button>
        <button {...tabBtn("pages")}><Globe className="w-3.5 h-3.5" /> Pages</button>
        <button {...tabBtn("connect")}><Link2 className="w-3.5 h-3.5" /> Connect</button>
      </div>

      {/* —— OVERVIEW ——————————————————————————————————————————— */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Lighthouse Scores */}
          <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-body text-base" style={{ color: "hsl(var(--admin-text))" }}>Lighthouse Scores</CardTitle>
                <div className="flex items-center gap-1 p-0.5 rounded-lg border" style={{ borderColor: "hsl(var(--admin-sidebar-border))" }}>
                  {(["mobile", "desktop"] as const).map((s) => (
                    <button key={s} onClick={() => { setStrategy(s); setLighthouseData(null); }}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-body font-medium transition-all"
                      style={{ background: strategy === s ? "hsl(var(--admin-text))" : "transparent", color: strategy === s ? "white" : "hsl(var(--admin-text-muted))" }}>
                      {s === "mobile" ? <Smartphone className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {lighthouseLoading ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <RefreshCw className="w-8 h-8 animate-spin" style={{ color: "hsl(var(--admin-text-muted))" }} />
                  <p className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Running Lighthouse audit…</p>
                </div>
              ) : lighthouseData ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-2">
                    <ScoreRing score={lighthouseData.performance} label="Performance" />
                    <ScoreRing score={lighthouseData.accessibility} label="Accessibility" />
                    <ScoreRing score={lighthouseData.bestPractices} label="Best Practices" />
                    <ScoreRing score={lighthouseData.seo} label="SEO" />
                  </div>
                  <p className="text-xs font-body mt-3 text-center" style={{ color: "hsl(var(--admin-text-muted))" }}>Powered by Google Lighthouse</p>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <Shield className="w-10 h-10" style={{ color: "hsl(var(--admin-text-muted))" }} />
                  <p className="text-sm font-body text-center" style={{ color: "hsl(var(--admin-text-muted))" }}>
                    Lighthouse scores require a live domain + PageSpeed API.<br />
                    Connect your domain at <strong>{SITE_DOMAIN}</strong> to enable.
                  </p>
                  <Button size="sm" variant="outline" onClick={runLighthouse} className="gap-1.5 font-body text-xs"
                    style={{ borderColor: "hsl(var(--admin-sidebar-border))", color: "hsl(var(--admin-text))" }}>
                    <RefreshCw className="w-3.5 h-3.5" /> Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Core Web Vitals */}
          <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
            <CardHeader className="pb-2">
              <CardTitle className="font-body text-base" style={{ color: "hsl(var(--admin-text))" }}>Core Web Vitals</CardTitle>
            </CardHeader>
            <CardContent>
              {!lighthouseData ? (
                <p className="text-sm font-body py-4 text-center" style={{ color: "hsl(var(--admin-text-muted))" }}>
                  Core Web Vitals will appear once Lighthouse scores are available.
                </p>
              ) : (
                <>
                  <VitalRow label="Largest Contentful Paint (LCP)" value={lighthouseData.lcp} note="Good: < 2.5s" />
                  <VitalRow label="Cumulative Layout Shift (CLS)" value={lighthouseData.cls} note="Good: < 0.1" />
                  <VitalRow label="Total Blocking Time (TBT)" value={lighthouseData.tbt} note="Good: < 200ms" />
                </>
              )}
            </CardContent>
          </Card>

          {/* SEO Pages Health */}
          <div>
            <h3 className="font-body font-semibold text-sm mb-3" style={{ color: "hsl(var(--admin-text-muted))" }}>SEO Pages Health</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Total Pages", value: pages.length, icon: Globe, color: "hsl(234,85%,60%)", bg: "hsl(234,85%,95%)" },
                { label: "Live Pages", value: liveCount, icon: CheckCircle2, color: "hsl(160,70%,40%)", bg: "hsl(160,70%,92%)" },
                { label: "SEO Configured", value: configuredCount, icon: TrendingUp, color: "hsl(28,100%,50%)", bg: "hsl(28,100%,93%)" },
                { label: "Issues Found", value: issuesCount, icon: AlertCircle, color: issuesCount > 0 ? "hsl(40,100%,40%)" : "hsl(160,70%,40%)", bg: issuesCount > 0 ? "hsl(40,100%,92%)" : "hsl(160,70%,92%)" },
              ].map(({ label, value, icon: Icon, color, bg }) => (
                <Card key={label} style={{ background: "hsl(var(--admin-card-bg))" }}>
                  <CardContent className="pt-4 pb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: bg, color }}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className="text-2xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>{value}</p>
                    <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>{label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Content Coverage */}
          <div>
            <h3 className="font-body font-semibold text-sm mb-3" style={{ color: "hsl(var(--admin-text-muted))" }}>Content Coverage</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Service Pages", pages: servicePages },
                { label: "Location Pages", pages: locationPages },
                { label: "Other Pages", pages: otherPages },
              ].map(({ label, pages: pg }) => (
                <Card key={label} style={{ background: "hsl(var(--admin-card-bg))" }}>
                  <CardContent className="pt-4 pb-3">
                    <p className="text-2xl font-bold font-body" style={{ color: "hsl(234,85%,60%)" }}>{pg.length}</p>
                    <p className="text-xs font-body font-medium" style={{ color: "hsl(var(--admin-text))" }}>{label}</p>
                    <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>{pg.filter(p => p.meta_title).length} configured</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pages preview */}
          <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="font-body text-base" style={{ color: "hsl(var(--admin-text))" }}>Pages</CardTitle>
                <button onClick={() => setActiveTab("pages")} className="text-xs font-body font-medium" style={{ color: "hsl(var(--admin-indigo))" }}>
                  View all {pages.length} pages in Pages tab →
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-body pl-6">Page</TableHead>
                    <TableHead className="font-body text-center">Title</TableHead>
                    <TableHead className="font-body text-center">Description</TableHead>
                    <TableHead className="font-body text-center pr-6">Keywords</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pages.slice(0, 10).map((page) => (
                    <TableRow key={page.slug} className="cursor-pointer" onClick={() => setEditingPage({ ...page })}>
                      <TableCell className="pl-6 font-body text-sm font-medium" style={{ color: "hsl(var(--admin-text))" }}>{page.label}</TableCell>
                      <TableCell className="text-center">
                        {page.meta_title ? <CheckCircle2 className="w-4 h-4 mx-auto" style={{ color: "hsl(160,70%,40%)" }} /> : <div className="w-4 h-4 rounded-full border-2 mx-auto" style={{ borderColor: "hsl(var(--admin-sidebar-border))" }} />}
                      </TableCell>
                      <TableCell className="text-center">
                        {page.meta_description ? <CheckCircle2 className="w-4 h-4 mx-auto" style={{ color: "hsl(160,70%,40%)" }} /> : <div className="w-4 h-4 rounded-full border-2 mx-auto" style={{ borderColor: "hsl(var(--admin-sidebar-border))" }} />}
                      </TableCell>
                      <TableCell className="text-center pr-6">
                        <CheckCircle2 className="w-4 h-4 mx-auto" style={{ color: "hsl(160,70%,40%)" }} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* —— PAGES —————————————————————————————————————————————— */}
      {activeTab === "pages" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Total Pages", value: pages.length },
              { label: "Live", value: liveCount },
              { label: "SEO Configured", value: `${configuredCount}/${pages.length}` },
              { label: "Not Configured", value: pages.length - configuredCount },
            ].map(({ label, value }) => (
              <Card key={label} style={{ background: "hsl(var(--admin-card-bg))" }}>
                <CardContent className="pt-4 pb-3">
                  <p className="text-2xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>{value}</p>
                  <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>{label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <CardTitle className="font-body text-lg" style={{ color: "hsl(var(--admin-text))" }}>All Pages</CardTitle>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "hsl(var(--admin-text-muted))" }} />
                    <Input placeholder="Search pages…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 font-body" />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-36 font-body"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-body pl-6">Page</TableHead>
                    <TableHead className="font-body">URL</TableHead>
                    <TableHead className="font-body">Status</TableHead>
                    <TableHead className="font-body">SEO</TableHead>
                    <TableHead className="font-body text-right pr-6">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(showAllPages ? filteredPages : filteredPages.slice(0, 10)).map((page) => (
                    <TableRow key={page.slug} className="cursor-pointer" onClick={() => setEditingPage({ ...page })}>
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-body" style={{ background: "hsl(var(--admin-indigo-light))", color: "hsl(var(--admin-indigo))" }}>
                            {page.label.charAt(0)}
                          </div>
                          <p className="font-body font-medium text-sm" style={{ color: "hsl(var(--admin-text))" }}>{page.label}</p>
                        </div>
                      </TableCell>
                      <TableCell><span className="font-body text-xs font-mono" style={{ color: "hsl(var(--admin-text-muted))" }}>{page.slug}</span></TableCell>
                      <TableCell>
                        <Badge className={`font-body border-0 text-xs ${statusColors[page.status]}`}>{page.status === "live" ? "Live" : "Draft"}</Badge>
                      </TableCell>
                      <TableCell>
                        {page.meta_title || page.meta_description
                          ? <Badge className="bg-[hsl(160,70%,92%)] text-[hsl(160,70%,35%)] border-0 text-xs font-body">Configured</Badge>
                          : <Badge variant="outline" className="text-xs font-body"><AlertCircle className="w-3 h-3 mr-1" />Not set</Badge>}
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-1">
                          {seoSnapshots[page.slug] && (
                            <Button size="icon" variant="ghost" className="h-8 w-8" title="Revert to original SEO"
                              onClick={(e) => { e.stopPropagation(); handleRevertSEO(page); }}>
                              <RotateCcw className="w-3.5 h-3.5" style={{ color: "hsl(40,80%,45%)" }} />
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="gap-1.5 font-body text-xs"
                            onClick={(e) => { e.stopPropagation(); setEditingPage({ ...page }); }}>
                            <ExternalLink className="w-3 h-3" /> Edit SEO
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredPages.length > 10 && (
                <div className="flex justify-center py-3 border-t" style={{ borderColor: "hsl(var(--admin-sidebar-border))" }}>
                  <button onClick={() => setShowAllPages(v => !v)} className="font-body text-xs font-medium flex items-center gap-1.5 hover:opacity-70 transition-opacity" style={{ color: "hsl(var(--admin-teal))" }}>
                    {showAllPages ? "Show less ↑" : `Show all ${filteredPages.length} pages ↓`}
                  </button>
                </div>
              )}
              {filteredPages.length === 0 && (
                <p className="text-center py-8 font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>No pages match your search.</p>
              )}
            </CardContent>
          </Card>

          {/* Keyword Tracker */}
          <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-body text-lg" style={{ color: "hsl(var(--admin-text))" }}>Keyword Targets</CardTitle>
              <Button size="sm" className="gap-1 font-body" style={{ background: "hsl(var(--admin-indigo))" }} onClick={() => setShowAddKeyword(true)}>
                <Plus className="w-4 h-4" /> Add Keyword
              </Button>
            </CardHeader>
            <CardContent>
              {keywords.length === 0 ? (
                <p className="text-center py-8 font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>No keywords tracked yet. Add your first keyword target above.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-body">Keyword</TableHead>
                      <TableHead className="font-body">Volume</TableHead>
                      <TableHead className="font-body">Difficulty</TableHead>
                      <TableHead className="font-body">Notes</TableHead>
                      <TableHead className="font-body w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {keywords.map((kw, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-body font-medium" style={{ color: "hsl(var(--admin-text))" }}>{kw.keyword}</TableCell>
                        <TableCell className="font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>{kw.volume || "—"}</TableCell>
                        <TableCell><Badge className={`border-0 text-xs font-body ${difficultyColors[kw.difficulty] || ""}`}>{kw.difficulty}</Badge></TableCell>
                        <TableCell className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>{kw.notes || "—"}</TableCell>
                        <TableCell>
                          <Button size="icon" variant="ghost" onClick={() => removeKeyword(idx)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <h3 className="font-body text-lg font-bold" style={{ color: "hsl(var(--admin-text))" }}>Keyword Research</h3>
          <KeywordResearch onAddKeyword={(kw) => { const updated = [...keywords, { ...kw, keyword: kw.keyword }]; setKeywords(updated); saveToConfig("seo_keywords", updated); }} />
          <KeywordPowerBox tenantId={tenantId} pages={pages} toast={toast} />
          <AIOTab />
        </div>
      )}

      {/* —— CONNECT —————————————————————————————————————————————— */}
      {activeTab === "connect" && (
        <div className="space-y-4">
          <p className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Each source unlocks more insight into how your site is performing.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <ConnectCard icon={Search} title="Google Search Console" status={gscUrl ? "connected" : "not-connected"}
              description="Clicks, impressions, CTR, avg position, top keywords, index coverage from Google's perspective.">
              <Input placeholder="GSC Property URL (e.g. https://dangpestcontrol.com)" value={gscUrl} onChange={(e) => setGscUrl(e.target.value)} className="font-body text-sm" />
              <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Go to search.google.com/search-console → Add Property → paste your site URL here to verify</p>
              <div className="flex gap-2">
                <Button size="sm" className="font-body" style={{ background: "hsl(var(--admin-indigo))" }}
                  onClick={() => saveIntegration("gsc_url", gscUrl, "Google Search Console")}
                  disabled={integrationsSaving === "gsc_url"}>
                  {integrationsSaving === "gsc_url" ? "Saving…" : "Save"}
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5 font-body text-xs" style={{ borderColor: "hsl(var(--admin-sidebar-border))", color: "hsl(var(--admin-text))" }}
                  onClick={() => window.open("https://search.google.com/search-console", "_blank")}>
                  <ExternalLink className="w-3.5 h-3.5" /> Open Google Search Console
                </Button>
              </div>
            </ConnectCard>

            <ConnectCard icon={BarChart3} title="Google Analytics 4" status={ga4Id ? "connected" : "not-connected"}
              description="Users, sessions, engagement rate, top pages, traffic sources, conversions, scroll depth.">
              <Input placeholder="Measurement ID (G-XXXXXXXXXX)" value={ga4Id} onChange={(e) => setGa4Id(e.target.value)} className="font-body text-sm" />
              <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>GA4 Admin → Data Streams → your stream → Measurement ID</p>
              <div className="flex gap-2">
                <Button size="sm" className="font-body" style={{ background: "hsl(var(--admin-indigo))" }}
                  onClick={() => saveIntegration("ga4_id", ga4Id, "Google Analytics 4")}
                  disabled={integrationsSaving === "ga4_id"}>
                  {integrationsSaving === "ga4_id" ? "Saving…" : "Save"}
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5 font-body text-xs" style={{ borderColor: "hsl(var(--admin-sidebar-border))", color: "hsl(var(--admin-text))" }}
                  onClick={() => window.open("https://analytics.google.com", "_blank")}>
                  <ExternalLink className="w-3.5 h-3.5" /> Open GA4
                </Button>
              </div>
            </ConnectCard>

            <ConnectCard icon={Zap} title="Google PageSpeed Insights" status="active"
              description="Performance scores, Core Web Vitals, Lighthouse audit, accessibility and SEO scores. Powers the Overview tab.">
              <Button size="sm" variant="outline" className="gap-1.5 font-body text-xs" style={{ borderColor: "hsl(var(--admin-sidebar-border))", color: "hsl(var(--admin-text))" }}
                onClick={() => { setActiveTab("overview"); runLighthouse(); }}>
                <RefreshCw className="w-3.5 h-3.5" /> Run Check Now
              </Button>
            </ConnectCard>

            <ConnectCard icon={TrendingUp} title="Vercel Analytics" status="active"
              description="Page views, unique visitors, top pages, geography, device types. Built into your Vercel hosting.">
              <Button size="sm" variant="outline" className="gap-1.5 font-body text-xs" style={{ borderColor: "hsl(var(--admin-sidebar-border))", color: "hsl(var(--admin-text))" }}
                onClick={() => window.open("https://vercel.com/analytics", "_blank")}>
                <ExternalLink className="w-3.5 h-3.5" /> View Vercel Analytics
              </Button>
            </ConnectCard>

            <ConnectCard icon={Link2} title="Ahrefs Webmaster Tools" status="not-connected"
              description="Backlink profile, referring domains, broken backlinks, organic keywords, technical site audit. Free for site owners.">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="gap-1.5 font-body text-xs" style={{ borderColor: "hsl(var(--admin-sidebar-border))", color: "hsl(var(--admin-text))" }}
                  onClick={() => window.open("https://ahrefs.com/webmaster-tools", "_blank")}>
                  <ExternalLink className="w-3.5 h-3.5" /> Sign Up Free
                </Button>
                <span className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Free — just verify site ownership</span>
              </div>
            </ConnectCard>

            <ConnectCard icon={Globe} title="Bing Webmaster Tools" status="not-connected"
              description="Bing search performance, backlink data (Bing shares this, Google doesn't), SEO analyzer, keyword research.">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="gap-1.5 font-body text-xs" style={{ borderColor: "hsl(var(--admin-sidebar-border))", color: "hsl(var(--admin-text))" }}
                  onClick={() => window.open("https://www.bing.com/webmasters", "_blank")}>
                  <ExternalLink className="w-3.5 h-3.5" /> Sign Up Free
                </Button>
                <span className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Free — gives backlink data Google won't show you</span>
              </div>
            </ConnectCard>
          </div>
        </div>
      )}

      {/* —— EDIT DRAWER (outside tabs — always available) —————————— */}
      <Sheet open={!!editingPage} onOpenChange={(open) => { if (!open) setEditingPage(null); }}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto" style={{ background: "hsl(var(--admin-bg))" }}>
          {editingPage && (
            <div className="space-y-6 py-4">
              <SheetHeader>
                <SheetTitle className="font-body text-xl" style={{ color: "hsl(var(--admin-text))" }}>{editingPage.label}</SheetTitle>
                <p className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>{SITE_DOMAIN}{editingPage.slug}</p>
              </SheetHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-body" style={{ color: "hsl(var(--admin-text))" }}>Meta Title</Label>
                  <Input value={editingPage.meta_title} onChange={(e) => setEditingPage({ ...editingPage, meta_title: e.target.value })} placeholder="Page title for search engines (max 60 chars)" maxLength={60} className="font-body" />
                  <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>{editingPage.meta_title.length}/60 characters</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-body" style={{ color: "hsl(var(--admin-text))" }}>Meta Description</Label>
                  <Textarea value={editingPage.meta_description} onChange={(e) => setEditingPage({ ...editingPage, meta_description: e.target.value })} placeholder="Page description for search results (max 160 chars)" maxLength={160} className="font-body" rows={3} />
                  <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>{editingPage.meta_description.length}/160 characters</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-body" style={{ color: "hsl(var(--admin-text))" }}>Status</Label>
                  <Select value={editingPage.status} onValueChange={(v) => setEditingPage({ ...editingPage, status: v as PageSEO["status"] })}>
                    <SelectTrigger className="font-body"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
                <CardHeader className="pb-2"><CardTitle className="font-body text-sm" style={{ color: "hsl(var(--admin-text))" }}>Google Preview</CardTitle></CardHeader>
                <CardContent className="space-y-1">
                  <p className="text-sm font-body" style={{ color: "hsl(234,85%,50%)" }}>{editingPage.meta_title || "Page Title"}</p>
                  <p className="text-xs font-body" style={{ color: "hsl(160,70%,35%)" }}>{SITE_DOMAIN}{editingPage.slug}</p>
                  <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>{editingPage.meta_description || "No description set."}</p>
                </CardContent>
              </Card>
              <Button onClick={savePageSEO} className="w-full gap-2 font-body" style={{ background: "hsl(var(--admin-indigo))" }} disabled={saving}>
                <Save className="w-4 h-4" /> Save Changes
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* —— ADD KEYWORD DIALOG ——————————————————————————————————— */}
      <Dialog open={showAddKeyword} onOpenChange={setShowAddKeyword}>
        <DialogContent>
          <DialogHeader><DialogTitle className="font-body">Add Keyword Target</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-body">Keyword</Label>
              <Input value={newKw.keyword} onChange={(e) => setNewKw({ ...newKw, keyword: e.target.value })} className="font-body" placeholder="e.g. pest control tyler tx" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-body">Monthly Volume</Label>
                <Input value={newKw.volume} onChange={(e) => setNewKw({ ...newKw, volume: e.target.value })} className="font-body" placeholder="e.g. 1,200" />
              </div>
              <div className="space-y-2">
                <Label className="font-body">Difficulty</Label>
                <Select value={newKw.difficulty} onValueChange={(v) => setNewKw({ ...newKw, difficulty: v })}>
                  <SelectTrigger className="font-body"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-body">Notes</Label>
              <Textarea value={newKw.notes} onChange={(e) => setNewKw({ ...newKw, notes: e.target.value })} className="font-body" rows={2} />
            </div>
            <Button onClick={addKeyword} className="w-full gap-2 font-body" style={{ background: "hsl(var(--admin-indigo))" }}>
              <Plus className="w-4 h-4" /> Add Keyword
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SEOTab;
