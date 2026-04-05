// src/components/admin/DashboardTab.tsx
import { useEffect, useState } from 'react'
import { Check, ChevronDown, ChevronUp, Users, TrendingUp, CalendarDays, Percent, CheckCircle2, AlertCircle, BarChart3, Share2, Database } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { usePlan, TIER_NAMES, TIER_PRICES, TIER_FEATURES, TIER_COLORS, PlanTier } from './usePlan'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useHolidayMode } from '@/hooks/useHolidayMode'
import { useTenant } from '@/hooks/useTenant'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import PageHelpBanner from './PageHelpBanner'
import { seedDemoData } from './DemoSeed'

const TENANT_ID = '1282b822-825b-4713-9dc9-6d14a2094d06'

const TIER_DESCRIPTIONS: Record<PlanTier, string> = {
  1: 'Website + CRM + basic SEO',
  2: 'Full SEO + Blog + Social scheduling',
  3: 'AI tools + campaigns + advanced reports',
  4: 'All platforms + live reviews + priority support',
}

const ALL_TIERS: PlanTier[] = [1, 2, 3, 4]

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

export default function DashboardTab() {
  const { tier, planName, loading, refreshPlan } = usePlan()
  const [upgrading, setUpgrading] = useState<PlanTier | null>(null)
  const [featuresOpen, setFeaturesOpen] = useState(false)

  const [leadCount, setLeadCount] = useState(0);
  const [newThisMonth, setNewThisMonth] = useState(0);
  const [newThisWeek, setNewThisWeek] = useState(0);
  const [conversionRate, setConversionRate] = useState('0%');
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [seoConfigured, setSeoConfigured] = useState(0);
  const [seoTotal, setSeoTotal] = useState(0);
  const [lastSeoScore, setLastSeoScore] = useState<number | null>(null);
  const [scheduledPostCount, setScheduledPostCount] = useState(0);
  const [monthlyLeads, setMonthlyLeads] = useState<{ month: string; count: number }[]>([]);
  const [loadingDemo, setLoadingDemo] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(true);
  const { enabled: holidayOn } = useHolidayMode();
  const { tenantId } = useTenant();
  const navigate = useNavigate();
  const { toast } = useToast();

  const accent = holidayOn ? "hsl(0, 80%, 55%)" : "hsl(150, 45%, 30%)";

  useEffect(() => {
    if (!tenantId) return;
    const fetchData = async () => {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 86400000).toISOString();

      const [
        { count: total },
        { count: monthCount },
        { count: weekCount },
        { data: allLeads },
        { data: recent },
        { data: seoRows },
        { data: snapshots },
        { count: scheduledCount },
      ] = await Promise.all([
        supabase.from("leads").select("*", { count: "exact", head: true }).eq("tenant_id", tenantId),
        supabase.from("leads").select("*", { count: "exact", head: true }).eq("tenant_id", tenantId).gte("created_at", startOfMonth),
        supabase.from("leads").select("*", { count: "exact", head: true }).eq("tenant_id", tenantId).gte("created_at", sevenDaysAgo),
        supabase.from("leads").select("status, created_at").eq("tenant_id", tenantId),
        supabase.from("leads").select("*").eq("tenant_id", tenantId).order("created_at", { ascending: false }).limit(5),
        supabase.from("site_config").select("key, seo_title, seo_description").eq("tenant_id", tenantId).like("key", "seo:%"),
        supabase.from("page_snapshots" as any).select("score").eq("tenant_id", tenantId).order("created_at", { ascending: false }).limit(1),
        supabase.from("social_posts" as any).select("*", { count: "exact", head: true }).eq("tenant_id", tenantId).eq("status", "scheduled"),
      ]);

      setLeadCount(total || 0);
      setNewThisMonth(monthCount || 0);
      setNewThisWeek(weekCount || 0);
      setScheduledPostCount(scheduledCount || 0);

      // Conversion rate
      if (allLeads && allLeads.length > 0) {
        const converted = allLeads.filter((l: any) => l.status === 'converted').length;
        setConversionRate(`${Math.round((converted / allLeads.length) * 100)}%`);
      }

      // Monthly leads for chart (last 6 months)
      if (allLeads) {
        const months: Record<string, number> = {};
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const key = d.toLocaleDateString('en-US', { month: 'short' });
          months[key] = 0;
        }
        allLeads.forEach((l: any) => {
          const d = new Date(l.created_at);
          const key = d.toLocaleDateString('en-US', { month: 'short' });
          if (key in months) months[key]++;
        });
        setMonthlyLeads(Object.entries(months).map(([month, count]) => ({ month, count })));
      }

      setRecentLeads((recent as Lead[]) || []);
      if (seoRows) {
        setSeoTotal(seoRows.length);
        setSeoConfigured(seoRows.filter(r => r.seo_title && r.seo_description).length);
      }
      if (snapshots && snapshots.length > 0) {
        setLastSeoScore((snapshots[0] as any).score);
      }
    };
    fetchData();
  }, [tenantId]);

  const handleUpgrade = async (newTier: PlanTier) => {
    if (newTier === tier || newTier < tier) return
    setUpgrading(newTier)
    try {
      await supabase
        .from('site_config')
        .upsert({
          tenant_id: TENANT_ID,
          key: 'plan',
          value: {
            tier: newTier,
            plan_name: TIER_NAMES[newTier],
            monthly_price: TIER_PRICES[newTier],
            upgraded_at: new Date().toISOString(),
          },
        }, { onConflict: 'key,tenant_id' })
      await refreshPlan()
    } finally {
      setUpgrading(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 border-t-foreground animate-spin" />
      </div>
    )
  }

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="space-y-8 p-6">

      {/* ── Plan Selector ── */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-xl font-semibold text-foreground">Your Plan</h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
            ● Active
          </span>
          <span className="text-sm text-muted-foreground ml-1">
            Currently on <strong>{planName}</strong>
          </span>
        </div>

        {/* 4-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {ALL_TIERS.map((t) => {
            const isCurrent = t === tier
            const isHigher = t > tier
            const isLower = t < tier
            const colors = TIER_COLORS[t]
            const isUpgrading = upgrading === t

            return (
              <div
                key={t}
                className={`
                  relative flex flex-col rounded-xl border-2 p-5 transition-all
                  ${isCurrent ? `${colors.border} shadow-md` : 'border-border'}
                  ${isLower ? 'opacity-50' : ''}
                `}
              >
                {/* Current badge */}
                {isCurrent && (
                  <div className={`absolute -top-3 left-4 flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${colors.badge}`}>
                    <Check className="w-3 h-3" /> Current Plan
                  </div>
                )}

                <div className="mb-3">
                  <p className={`text-xs font-semibold uppercase tracking-wide mb-0.5 ${colors.text}`}>
                    {TIER_NAMES[t]}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    ${TIER_PRICES[t]}<span className="text-sm font-normal text-muted-foreground">/mo</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{TIER_DESCRIPTIONS[t]}</p>
                </div>

                <ul className="flex-1 space-y-1.5 mb-4">
                  {TIER_FEATURES[t].slice(0, 5).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isCurrent || isLower ? colors.text : 'text-muted-foreground/40'}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                {isCurrent && (
                  <div className={`text-center text-xs font-semibold py-2 rounded-lg ${colors.badge}`}>
                    ✓ Current Plan
                  </div>
                )}
                {isHigher && (
                  <button
                    onClick={() => handleUpgrade(t)}
                    disabled={!!upgrading}
                    className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    {isUpgrading ? 'Upgrading…' : `Upgrade to ${TIER_NAMES[t]}`}
                  </button>
                )}
                {isLower && (
                  <div className="text-center text-xs text-muted-foreground py-2 rounded-lg border border-dashed border-border">
                    Downgrade
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Collapsible feature list */}
        <div className="mt-4 border border-border rounded-xl overflow-hidden">
          <button
            onClick={() => setFeaturesOpen((o) => !o)}
            className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-medium text-foreground hover:bg-muted/40 transition-colors"
          >
            <span>What's included in {planName}</span>
            {featuresOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {featuresOpen && (
            <div className="px-5 pb-5 pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TIER_FEATURES[tier].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className={`w-4 h-4 shrink-0 ${TIER_COLORS[tier].text}`} />
                  {f}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Existing Stats / Widgets ── */}

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
        <StatCard icon={TrendingUp} label="New This Month" value={newThisMonth} subtitle="Since 1st of month" color="hsl(160, 70%, 45%)" sparkData={[1, 3, 2, 4, 3, 5, 4, 6]} />
        <StatCard icon={CalendarDays} label="New This Week" value={newThisWeek} subtitle="Last 7 days" color="hsl(210, 70%, 50%)" sparkData={[2, 1, 3, 2, 4, 3, 5]} />
        <StatCard icon={Percent} label="Conversion Rate" value={conversionRate} subtitle="Converted / total" color="hsl(28, 100%, 50%)" />
      </div>

      {/* Quick Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* SEO Performance */}
        <Card style={{ background: "hsl(var(--admin-card-bg))", borderColor: "hsl(var(--admin-sidebar-border))" }} className="border rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4" style={{ color: "hsl(28, 100%, 50%)" }} />
              <p className="text-sm font-body font-semibold" style={{ color: "hsl(var(--admin-text))" }}>SEO Performance</p>
            </div>
            <p className="text-sm font-body mb-3" style={{ color: "hsl(var(--admin-text-muted))" }}>
              {lastSeoScore !== null ? `Last audit score: ${lastSeoScore}` : "No audit run yet"}
            </p>
            <button
              onClick={() => navigate('/admin', { state: { tab: 'seo' } })}
              className="text-sm font-body font-medium"
              style={{ color: "hsl(var(--admin-teal))" }}
            >
              Run SEO Audit →
            </button>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card style={{ background: "hsl(var(--admin-card-bg))", borderColor: "hsl(var(--admin-sidebar-border))" }} className="border rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Share2 className="w-4 h-4" style={{ color: "hsl(260, 55%, 55%)" }} />
              <p className="text-sm font-body font-semibold" style={{ color: "hsl(var(--admin-text))" }}>Social Media</p>
            </div>
            <p className="text-sm font-body mb-3" style={{ color: "hsl(var(--admin-text-muted))" }}>
              {scheduledPostCount > 0 ? `${scheduledPostCount} post${scheduledPostCount === 1 ? '' : 's'} scheduled` : "No posts scheduled yet"}
            </p>
            <button
              onClick={() => navigate('/admin', { state: { tab: 'social' } })}
              className="text-sm font-body font-medium"
              style={{ color: "hsl(var(--admin-teal))" }}
            >
              Go to Social →
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Load Demo Data */}
      <Card style={{ background: "hsl(var(--admin-card-bg))", borderColor: "hsl(var(--admin-sidebar-border))" }} className="border rounded-2xl">
        <CardContent className="p-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "hsla(260,55%,55%,0.15)" }}>
              <Database className="h-4 w-4" style={{ color: "hsl(260, 55%, 55%)" }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-body font-semibold" style={{ color: "hsl(var(--admin-text))" }}>Demo Data</p>
              <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Populate leads, blog posts, social posts, and testimonials with realistic demo content.</p>
            </div>
            <Button
              onClick={async () => {
                if (!tenantId) return;
                setLoadingDemo(true);
                try {
                  await seedDemoData(tenantId, supabase);
                  toast({ title: "Demo data loaded!" });
                  window.location.reload();
                } catch (err) {
                  toast({ title: "Failed to load demo data", variant: "destructive" });
                } finally {
                  setLoadingDemo(false);
                }
              }}
              disabled={loadingDemo}
              size="sm"
              className="font-body"
              style={{ background: "hsl(var(--admin-teal))", color: "#fff" }}
            >
              {loadingDemo ? "Loading..." : "Load Demo Data"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leads Per Month Chart */}
      {monthlyLeads.length > 0 && (
        <Card style={{ background: "hsl(var(--admin-card-bg))", borderColor: "hsl(var(--admin-sidebar-border))" }} className="border rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="font-body text-lg" style={{ color: "hsl(var(--admin-text))" }}>Leads Per Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-3 h-40">
              {monthlyLeads.map(({ month, count }) => {
                const maxCount = Math.max(...monthlyLeads.map(m => m.count), 1);
                const heightPct = (count / maxCount) * 100;
                return (
                  <div key={month} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs font-body font-medium" style={{ color: "hsl(var(--admin-text))" }}>{count}</span>
                    <div
                      className="w-full rounded-t-md transition-all"
                      style={{
                        height: `${Math.max(heightPct, 4)}%`,
                        background: accent,
                        minHeight: '4px',
                      }}
                    />
                    <span className="text-[10px] font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>{month}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

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

    </div>
  )
}
