import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTenant } from "@/hooks/useTenant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Mail, Loader2, Users, PenSquare, MapPin, MessageSquare, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageHelpBanner from "./PageHelpBanner";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

interface ReportData {
  leads: { count: number; items: { name: string; email: string; phone: string; created_at: string }[] };
  blogPosts: { count: number; items: { title: string; created_at: string }[] };
  keywords: { count: number };
  locations: { count: number };
  testimonials: { count: number };
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

  return (
    <div className="space-y-6">
      <PageHelpBanner tab="reports" />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>Monthly Reports</h2>
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
    </div>
  );
};

export default ReportsTab;
