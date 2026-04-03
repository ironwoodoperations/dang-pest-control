// src/components/admin/DashboardTab.tsx
import { useEffect, useState } from 'react'
import { Check, ChevronDown, ChevronUp, Users, TrendingUp, TreePine, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { usePlan, TIER_NAMES, TIER_PRICES, TIER_FEATURES, TIER_COLORS, PlanTier } from './usePlan'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useHolidayMode } from '@/hooks/useHolidayMode'
import { useTenant } from '@/hooks/useTenant'
import { useNavigate } from 'react-router-dom'
import PageHelpBanner from './PageHelpBanner'

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
  const [newLeads, setNewLeads] = useState(0);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [seoConfigured, setSeoConfigured] = useState(0);
  const [seoTotal, setSeoTotal] = useState(0);
  const [holidayMode, setHolidayMode] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(true);
  const { enabled: holidayOn } = useHolidayMode();
  const { tenantId } = useTenant();
  const navigate = useNavigate();

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

      // Check onboarding status
      const { data: obRow } = await supabase
        .from("site_config")
        .select("value")
        .eq("key", "onboarding_complete")
        .eq("tenant_id", tenantId)
        .single();
      setOnboardingComplete(!!(obRow?.value as Record<string, unknown>)?.completed);
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

      {/* Onboarding Banner */}
      {!onboardingComplete && (
        <button
          onClick={() => navigate("/admin/onboarding")}
          className="w-full text-left rounded-xl p-4 border-2 border-yellow-300 transition-colors hover:border-yellow-400"
          style={{ background: "hsl(45, 95%, 92%)" }}
        >
          <p className="font-body text-sm font-semibold text-gray-800">
            New here? Start with the Setup Wizard to get your site ready in 10 minutes.
          </p>
          <p className="font-body text-xs text-gray-500 mt-0.5">Click here to launch the guided setup &rarr;</p>
        </button>
      )}

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
  )
}
