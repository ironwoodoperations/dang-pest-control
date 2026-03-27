import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, TreePine, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useHolidayMode } from "@/hooks/useHolidayMode";
import { useTenant } from "@/hooks/useTenant";
import PageHelpBanner from "./PageHelpBanner";

interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  service: string | null;
  status: string;
  created_at: string;
}

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const h = 28;
  const w = 64;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} className="shrink-0">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const StatCard = ({
  icon: Icon, label, value, subtitle, color, sparkData,
}: {
  icon: React.ElementType; label: string; value: string | number; subtitle?: string; color: string; sparkData?: number[];
}) => (
  <Card
    className="border shadow-sm hover:shadow-md transition-shadow rounded-2xl"
    style={{ background: "hsl(var(--admin-card-bg))", borderColor: "hsl(var(--admin-sidebar-border))" }}
  >
    <CardContent className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: color + "18", color }}>
          <Icon className="h-4 w-4" />
        </div>
        {sparkData && <Sparkline data={sparkData} color={color} />}
      </div>
      <p className="text-[11px] font-body font-medium uppercase tracking-wider mb-0.5" style={{ color: "hsl(var(--admin-text-muted))" }}>
        {label}
      </p>
      <p className="text-xl font-bold font-body leading-tight" style={{ color: "hsl(var(--admin-text))" }}>
        {value}
      </p>
      {subtitle && (
        <p className="text-[11px] font-body mt-0.5" style={{ color: "hsl(var(--admin-text-muted))" }}>{subtitle}</p>
      )}
    </CardContent>
  </Card>
);

const statusColors: Record<string, string> = {
  new: "bg-[hsl(160,70%,92%)] text-[hsl(160,70%,35%)]",
  contacted: "bg-[hsl(234,85%,95%)] text-[hsl(234,85%,50%)]",
  closed: "bg-[hsl(220,9%,90%)] text-[hsl(220,9%,46%)]",
};

const DashboardTab = () => {
  const [leadCount, setLeadCount] = useState(0);
  const [newLeads, setNewLeads] = useState(0);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [seoConfigured, setSeoConfigured] = useState(0);
  const [seoTotal, setSeoTotal] = useState(0);
  const [holidayMode, setHolidayMode] = useState(false);
  const { enabled: holidayOn } = useHolidayMode();
  const { tenantId } = useTenant();

  const accent = holidayOn ? "hsl(0, 80%, 55%)" : "hsl(150, 45%, 30%)";

  useEffect(() => {
    if (!tenantId) return;
    const fetchData = async () => {
      const [
        { count: total },
        { count: newCount },
        { data: recent },
        { data: config },
        { data: seoRows },
      ] = await Promise.all([
        supabase.from("leads").select("*", { count: "exact", head: true }).eq("tenant_id", tenantId),
        supabase.from("leads").select("*", { count: "exact", head: true }).eq("tenant_id", tenantId).eq("status", "new"),
        supabase.from("leads").select("*").eq("tenant_id", tenantId).order("created_at", { ascending: false }).limit(8),
        supabase.from("site_config").select("value").eq("key", "holiday_mode").eq("tenant_id", tenantId).single(),
        supabase.from("site_config").select("key, seo_title, seo_description").eq("tenant_id", tenantId).like("key", "seo:%"),
      ]);

      setLeadCount(total || 0);
      setNewLeads(newCount || 0);
      setRecentLeads((recent as Lead[]) || []);
      if (config) setHolidayMode((config.value as { enabled: boolean }).enabled);
      if (seoRows) {
        setSeoTotal(seoRows.length);
        setSeoConfigured(seoRows.filter(r => r.seo_title && r.seo_description).length);
      }
    };
    fetchData();
  }, [tenantId]);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="space-y-6">
      <PageHelpBanner tab="dashboard" />
      {/* Greeting */}
      <div>
        <h2 className="font-display text-2xl tracking-wide uppercase" style={{ color: "hsl(var(--admin-text))" }}>
          Welcome back 👋
        </h2>
        <p className="font-body text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>{today}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Leads" value={leadCount} color={accent} sparkData={[2, 4, 3, 7, 5, 8, 6, 9]} />
        <StatCard icon={TrendingUp} label="New Leads" value={newLeads} subtitle="Awaiting response" color="hsl(160, 70%, 45%)" sparkData={[1, 3, 2, 4, 3, 5, 4, 6]} />
        <StatCard icon={TreePine} label="Holiday Mode" value={holidayMode ? "ON" : "OFF"} color={holidayMode ? "hsl(0, 80%, 55%)" : "hsl(220, 9%, 46%)"} />
        <StatCard icon={Clock} label="SEO Health" value={`${seoConfigured}/${seoTotal}`} subtitle="Pages configured" color="hsl(28, 100%, 50%)" />
      </div>

      {/* Recent Leads Table */}
      <Card style={{ background: "hsl(var(--admin-card-bg))", borderColor: "hsl(var(--admin-sidebar-border))" }} className="border rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="font-body text-lg" style={{ color: "hsl(var(--admin-text))" }}>Recent Leads</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-body pl-6">Name</TableHead>
                <TableHead className="font-body">Service</TableHead>
                <TableHead className="font-body">Status</TableHead>
                <TableHead className="font-body text-right pr-6">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLeads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>
                    No leads yet.
                  </TableCell>
                </TableRow>
              ) : (
                recentLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="pl-6">
                      <p className="font-body font-medium text-sm" style={{ color: "hsl(var(--admin-text))" }}>{lead.name}</p>
                      <p className="font-body text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>{lead.email || lead.phone}</p>
                    </TableCell>
                    <TableCell>
                      <span className="font-body text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>
                        {lead.service ? (lead.service.length > 30 ? lead.service.slice(0, 30) + "…" : lead.service) : "—"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={`font-body border-0 text-xs ${statusColors[lead.status] || statusColors.new}`}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <span className="font-body text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>
                        {new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* SEO Health Summary */}
      <Card style={{ background: "hsl(var(--admin-card-bg))", borderColor: "hsl(var(--admin-sidebar-border))" }} className="border rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="font-body text-lg" style={{ color: "hsl(var(--admin-text))" }}>SEO Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            {seoConfigured === seoTotal && seoTotal > 0 ? (
              <CheckCircle2 className="w-5 h-5" style={{ color: "hsl(160, 70%, 40%)" }} />
            ) : (
              <AlertCircle className="w-5 h-5" style={{ color: "hsl(28, 100%, 50%)" }} />
            )}
            <p className="font-body text-sm" style={{ color: "hsl(var(--admin-text))" }}>
              {seoConfigured === seoTotal && seoTotal > 0
                ? `All ${seoTotal} pages have complete SEO metadata.`
                : `${seoConfigured} of ${seoTotal} pages have SEO metadata configured. Go to the SEO tab to fill in the rest.`}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardTab;
