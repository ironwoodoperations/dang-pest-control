import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTenant } from "@/hooks/useTenant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Mail, Loader2, Users, PenSquare, MapPin, MessageSquare, Search, BarChart3, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageHelpBanner from "./PageHelpBanner";
import { FeatureGate } from './FeatureGate';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend,
} from "recharts";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface ReportData {
  leads: { count: number; items: { name: string; email: string; phone: string; created_at: string }[] };
  blogPosts: { count: number; items: { title: string; created_at: string }[] };
  keywords: { count: number };
  locations: { count: number };
  testimonials: { count: number };
}

interface OverviewStats {
  totalLeads: number;
  leadsThisMonth: number;
  locationPages: number;
  blogPosts: number;
}

interface MonthBucket {
  month: string;
  count: number;
}

function getLast6Months(): { label: string; year: number; month: number }[] {
  const now = new Date();
  const result: { label: string; year: number; month: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    result.push({ label: SHORT_MONTHS[d.getMonth()], year: d.getFullYear(), month: d.getMonth() });
  }
  return result;
}

function bucketByMonth(rows: { created_at: string }[], months: { label: string; year: number; month: number }[]): MonthBucket[] {
  return months.map(({ label, year, month }) => {
    const count = rows.filter((r) => {
      const d = new Date(r.created_at);
      return d.getFullYear() === year && d.getMonth() === month;
    }).length;
    return { month: label, count };
  });
}

function SkeletonCard() {
  return (
    <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
      <CardContent className="pt-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-muted animate-pulse" />
        <div className="space-y-2">
          <div className="h-6 w-12 bg-muted rounded animate-pulse" />
          <div className="h-3 w-20 bg-muted rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}

const ReportsTab = () => {
  const now = new Date();
  const [month, setMonth] = useState(String(now.getMonth()));
  const [year, setYear] = useState(String(now.getFullYear()));
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const { toast } = useToast();
  const { tenantId } = useTenant();

  // --- Dashboard data ---
  const [statsLoading, setStatsLoading] = useState(true);
  const [overview, setOverview] = useState<OverviewStats>({ totalLeads: 0, leadsThisMonth: 0, locationPages: 0, blogPosts: 0 });
  const [leadsOverTime, setLeadsOverTime] = useState<MonthBucket[]>([]);
  const [blogOverTime, setBlogOverTime] = useState<MonthBucket[]>([]);
  const [seoStats, setSeoStats] = useState({ keywords: 0, locations: 0, testimonials: 0 });
  const [leadsByService, setLeadsByService] = useState<{ month: string; [key: string]: string | number }[]>([]);
  const [serviceNames, setServiceNames] = useState<string[]>([]);
  const [socialOverTime, setSocialOverTime] = useState<MonthBucket[]>([]);

  useEffect(() => {
    if (!tenantId) return;
    const months = getLast6Months();
    const sixMonthsAgo = new Date(months[0].year, months[0].month, 1).toISOString();
    const nowMonth = now.getMonth();
    const nowYear = now.getFullYear();
    const monthStart = new Date(nowYear, nowMonth, 1).toISOString();
    const monthEnd = new Date(nowYear, nowMonth + 1, 0, 23, 59, 59).toISOString();

    Promise.all([
      supabase.from("leads").select("created_at, service").eq("tenant_id", tenantId),
      supabase.from("leads").select("id").eq("tenant_id", tenantId).gte("created_at", monthStart).lte("created_at", monthEnd),
      supabase.from("location_data").select("id").eq("tenant_id", tenantId),
      supabase.from("blog_posts").select("created_at").eq("tenant_id", tenantId),
      supabase.from("site_config").select("value").eq("key", "seo_keywords").eq("tenant_id", tenantId).maybeSingle(),
      supabase.from("testimonials").select("id").eq("tenant_id", tenantId),
      supabase.from("social_posts" as any).select("created_at").eq("tenant_id", tenantId).gte("created_at", sixMonthsAgo),
    ]).then(([allLeads, monthLeads, locs, blogs, kwRes, testRes, socialRes]) => {
      const allLeadsData = (allLeads.data || []) as { created_at: string; service?: string }[];
      const blogsData = (blogs.data || []) as { created_at: string }[];
      const socialData = (socialRes.data || []) as { created_at: string }[];

      // Overview stats
      setOverview({
        totalLeads: allLeadsData.length,
        leadsThisMonth: monthLeads.data?.length || 0,
        locationPages: locs.data?.length || 0,
        blogPosts: blogsData.length,
      });

      // Leads over time
      setLeadsOverTime(bucketByMonth(allLeadsData, months));

      // Blog over time
      setBlogOverTime(bucketByMonth(blogsData, months));

      // SEO stats
      setSeoStats({
        keywords: ((kwRes.data?.value as any)?.length || 0),
        locations: locs.data?.length || 0,
        testimonials: testRes.data?.length || 0,
      });

      // Lead source breakdown by service
      const services = new Set<string>();
      allLeadsData.forEach((l) => { if (l.service) services.add(l.service); });
      const topServices = Array.from(services).slice(0, 3);
      setServiceNames(topServices);
      const serviceData = months.map(({ label, year: y, month: m }) => {
        const row: { month: string; [key: string]: string | number } = { month: label };
        topServices.forEach((s) => {
          row[s] = allLeadsData.filter((l) => {
            const d = new Date(l.created_at);
            return d.getFullYear() === y && d.getMonth() === m && l.service === s;
          }).length;
        });
        return row;
      });
      setLeadsByService(serviceData);

      // Social over time
      setSocialOverTime(bucketByMonth(socialData, months));

      setStatsLoading(false);
    });
  }, [tenantId]);

  // --- Existing report generator ---
  const generateReport = async () => {
    if (!tenantId) return;
    setLoading(true);
    try {
      const m = parseInt(month);
      const y = parseInt(year);
      const startDate = new Date(y, m, 1).toISOString();
      const endDate = new Date(y, m + 1, 0, 23, 59, 59).toISOString();

      const [leadsRes, blogRes, kwRes, locRes, testRes] = await Promise.all([
        supabase.from("leads").select("name, email, phone, created_at").eq("tenant_id", tenantId).gte("created_at", startDate).lte("created_at", endDate),
        supabase.from("blog_posts").select("title, created_at").eq("tenant_id", tenantId).gte("created_at", startDate).lte("created_at", endDate),
        supabase.from("site_config").select("value").eq("key", "seo_keywords").eq("tenant_id", tenantId).maybeSingle(),
        supabase.from("location_data").select("id").eq("tenant_id", tenantId),
        supabase.from("testimonials").select("id").eq("tenant_id", tenantId).gte("created_at", startDate).lte("created_at", endDate),
      ]);

      setReport({
        leads: { count: leadsRes.data?.length || 0, items: (leadsRes.data || []) as any },
        blogPosts: { count: blogRes.data?.length || 0, items: (blogRes.data || []) as any },
        keywords: { count: ((kwRes.data?.value as any)?.length || 0) },
        locations: { count: locRes.data?.length || 0 },
        testimonials: { count: testRes.data?.length || 0 },
      });
    } catch (err) {
      console.error("Failed to generate report:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!report) return;
    setDownloading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      const monthName = MONTHS[parseInt(month)];

      // Header
      doc.setFontSize(20);
      doc.setTextColor(232, 120, 0);
      doc.text("Dang Pest Control", 20, 25);
      doc.setFontSize(14);
      doc.setTextColor(60, 60, 60);
      doc.text(`Monthly Report: ${monthName} ${year}`, 20, 35);
      doc.setDrawColor(232, 120, 0);
      doc.line(20, 40, 190, 40);

      let y = 55;

      // Leads Summary
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text("Leads Summary", 20, y);
      y += 8;
      doc.setFontSize(11);
      doc.setTextColor(80, 80, 80);
      doc.text(`Total leads this month: ${report.leads.count}`, 20, y);
      y += 8;

      if (report.leads.items.length > 0) {
        for (const lead of report.leads.items.slice(0, 10)) {
          doc.text(`  - ${lead.name || "Unknown"} | ${lead.email || "—"} | ${lead.phone || "—"}`, 20, y);
          y += 6;
          if (y > 270) { doc.addPage(); y = 20; }
        }
      }
      y += 8;

      // SEO Activity
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text("SEO Activity", 20, y);
      y += 8;
      doc.setFontSize(11);
      doc.setTextColor(80, 80, 80);
      doc.text(`Keywords tracked: ${report.keywords.count}`, 20, y);
      y += 6;
      doc.text(`Location pages: ${report.locations.count}`, 20, y);
      y += 12;

      // Content Activity
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text("Content Activity", 20, y);
      y += 8;
      doc.setFontSize(11);
      doc.setTextColor(80, 80, 80);
      doc.text(`Blog posts published: ${report.blogPosts.count}`, 20, y);
      y += 6;
      doc.text(`New testimonials: ${report.testimonials.count}`, 20, y);
      y += 6;

      for (const post of report.blogPosts.items) {
        doc.text(`  - ${post.title}`, 20, y);
        y += 6;
        if (y > 270) { doc.addPage(); y = 20; }
      }

      doc.save(`dang-pest-control-report-${monthName.toLowerCase()}-${year}.pdf`);
      toast({ title: "PDF downloaded!" });
    } catch (err) {
      toast({ title: "Download failed", description: String(err), variant: "destructive" });
    } finally {
      setDownloading(false);
    }
  };

  const handleEmailReport = async () => {
    toast({ title: "Email report", description: "Configure Resend API key in Supabase Edge Function to enable email delivery." });
  };

  const monthName = MONTHS[parseInt(month)];
  const SERVICE_COLORS = ["#E87800", "#185FA5", "#534AB7"];

  return (
    <div className="space-y-6">
      <PageHelpBanner tab="reports" />

      {/* ===== SECTION 1: OVERVIEW STATS (tier 1) ===== */}
      <div>
        <h2 className="text-2xl font-bold font-body mb-4" style={{ color: "hsl(var(--admin-text))" }}>Reports & Analytics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            [
              { label: "Total Leads", value: overview.totalLeads, icon: Users, color: "#E87800" },
              { label: "Leads This Month", value: overview.leadsThisMonth, icon: TrendingUp, color: "#185FA5" },
              { label: "Active Location Pages", value: overview.locationPages, icon: MapPin, color: "hsl(140, 55%, 42%)" },
              { label: "Blog Posts Published", value: overview.blogPosts, icon: PenSquare, color: "#534AB7" },
            ].map(({ label, value, icon: Icon, color }) => (
              <Card key={label} style={{ background: "hsl(var(--admin-card-bg))" }}>
                <CardContent className="pt-5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}22` }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>{value}</p>
                    <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>{label}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* ===== SECTION 2: LEADS OVER TIME (tier 1) ===== */}
      <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
        <CardHeader>
          <CardTitle className="font-body text-base flex items-center gap-2" style={{ color: "hsl(var(--admin-text))" }}>
            <BarChart3 className="w-4 h-4" style={{ color: "#E87800" }} />
            Lead Volume — Last 6 Months
          </CardTitle>
        </CardHeader>
        <CardContent>
          {statsLoading ? (
            <div className="h-64 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={leadsOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" name="Leads" fill="#E87800" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* ===== SECTION 3: SEO + CONTENT TRENDS (tier 2) ===== */}
      <FeatureGate minTier={2} featureName="SEO & Content Performance">
        <div>
          <h3 className="text-lg font-bold font-body mb-4 flex items-center gap-2" style={{ color: "hsl(var(--admin-text))" }}>
            <TrendingUp className="w-4 h-4" style={{ color: "#185FA5" }} />
            SEO & Content Performance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Blog posts over time */}
            <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
              <CardHeader>
                <CardTitle className="font-body text-sm" style={{ color: "hsl(var(--admin-text))" }}>Blog Posts Published</CardTitle>
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <div className="h-52 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={blogOverTime}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" name="Posts" stroke="#185FA5" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* SEO summary stats */}
            <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
              <CardHeader>
                <CardTitle className="font-body text-sm" style={{ color: "hsl(var(--admin-text))" }}>SEO Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <div className="h-52 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="space-y-6 py-4">
                    {[
                      { label: "Total Keywords Tracked", value: seoStats.keywords, icon: Search, color: "#185FA5" },
                      { label: "Location Pages", value: seoStats.locations, icon: MapPin, color: "#185FA5" },
                      { label: "Testimonials Collected", value: seoStats.testimonials, icon: MessageSquare, color: "#185FA5" },
                    ].map(({ label, value, icon: Icon, color }) => (
                      <div key={label} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
                          <Icon className="w-5 h-5" style={{ color }} />
                        </div>
                        <div>
                          <p className="text-2xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>{value}</p>
                          <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>{label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </FeatureGate>

      {/* ===== SECTION 4: ADVANCED ANALYTICS (tier 3) ===== */}
      <FeatureGate minTier={3} featureName="Advanced Analytics">
        <div>
          <h3 className="text-lg font-bold font-body mb-4 flex items-center gap-2" style={{ color: "hsl(var(--admin-text))" }}>
            <BarChart3 className="w-4 h-4" style={{ color: "#534AB7" }} />
            Advanced Analytics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Lead source breakdown */}
            <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
              <CardHeader>
                <CardTitle className="font-body text-sm" style={{ color: "hsl(var(--admin-text))" }}>Lead Source Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <div className="h-52 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                  </div>
                ) : serviceNames.length === 0 ? (
                  <div className="h-52 flex items-center justify-center text-sm text-muted-foreground">No service data available</div>
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={leadsByService}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      {serviceNames.map((s, i) => (
                        <Line key={s} type="monotone" dataKey={s} stroke={SERVICE_COLORS[i]} strokeWidth={2} dot={{ r: 3 }} />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* Social posts scheduled */}
            <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
              <CardHeader>
                <CardTitle className="font-body text-sm" style={{ color: "hsl(var(--admin-text))" }}>Social Posts Scheduled</CardTitle>
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <div className="h-52 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={socialOverTime}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="count" name="Posts" fill="#534AB7" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </FeatureGate>

      {/* ===== DIVIDER ===== */}
      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-bold font-body mb-4" style={{ color: "hsl(var(--admin-text))" }}>Monthly Report Generator</h3>
      </div>

      {/* ===== EXISTING: Monthly Report Generator (tier 2) ===== */}
      <FeatureGate minTier={2} featureName="Reports">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Generate and download monthly activity reports.</p>
        </div>
      </div>

      {/* Controls */}
      <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
        <CardContent className="pt-5">
          <div className="flex items-end gap-4">
            <div className="space-y-1">
              <label className="font-body text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>Month</label>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger className="w-40 font-body"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {MONTHS.map((m, i) => <SelectItem key={i} value={String(i)}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="font-body text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>Year</label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="w-28 font-body"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[2024, 2025, 2026, 2027].map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={generateReport} disabled={loading} className="gap-2 font-body" style={{ background: "hsl(var(--admin-indigo))" }}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Preview */}
      {report && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Leads", value: report.leads.count, icon: Users, color: "hsl(28, 100%, 50%)" },
              { label: "Blog Posts", value: report.blogPosts.count, icon: PenSquare, color: "hsl(234, 85%, 60%)" },
              { label: "Keywords", value: report.keywords.count, icon: Search, color: "hsl(185, 65%, 42%)" },
              { label: "Locations", value: report.locations.count, icon: MapPin, color: "hsl(140, 55%, 42%)" },
              { label: "Reviews", value: report.testimonials.count, icon: MessageSquare, color: "hsl(45, 95%, 45%)" },
            ].map(({ label, value, icon: Icon, color }) => (
              <Card key={label} style={{ background: "hsl(var(--admin-card-bg))" }}>
                <CardContent className="pt-5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}22` }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>{value}</p>
                    <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>{label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Leads table */}
          {report.leads.items.length > 0 && (
            <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
              <CardHeader>
                <CardTitle className="font-body text-base" style={{ color: "hsl(var(--admin-text))" }}>Leads — {monthName} {year}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-body">Name</TableHead>
                      <TableHead className="font-body">Email</TableHead>
                      <TableHead className="font-body">Phone</TableHead>
                      <TableHead className="font-body">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.leads.items.map((lead, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-body" style={{ color: "hsl(var(--admin-text))" }}>{lead.name || "—"}</TableCell>
                        <TableCell className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>{lead.email || "—"}</TableCell>
                        <TableCell className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>{lead.phone || "—"}</TableCell>
                        <TableCell className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>
                          {new Date(lead.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button onClick={handleDownloadPDF} disabled={downloading} className="gap-2 font-body" style={{ background: "hsl(28, 100%, 50%)" }}>
              {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              Download PDF
            </Button>
            <Button onClick={handleEmailReport} variant="outline" className="gap-2 font-body">
              <Mail className="w-4 h-4" /> Email Report
            </Button>
          </div>
        </>
      )}
      </FeatureGate>
    </div>
  );
};

export default ReportsTab;
