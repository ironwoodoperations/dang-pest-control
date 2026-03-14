import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, TreePine, Clock } from "lucide-react";

/* Tiny SVG sparkline */
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
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  subtitle,
  color,
  sparkData,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subtitle?: string;
  color: string;
  sparkData?: number[];
}) => (
  <Card
    className="border shadow-none hover:shadow-sm transition-shadow"
    style={{ background: "hsl(var(--admin-card-bg))", borderColor: "hsl(var(--admin-sidebar-border))" }}
  >
    <CardContent className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: color + "18", color }}
        >
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
        <p className="text-[11px] font-body mt-0.5" style={{ color: "hsl(var(--admin-text-muted))" }}>
          {subtitle}
        </p>
      )}
    </CardContent>
  </Card>
);

const DashboardTab = () => {
  const [leadCount, setLeadCount] = useState(0);
  const [newLeads, setNewLeads] = useState(0);
  const [holidayMode, setHolidayMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { count: total } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true });
      setLeadCount(total || 0);

      const { count: newCount } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .eq("status", "new");
      setNewLeads(newCount || 0);

      const { data: config } = await supabase
        .from("site_config")
        .select("value")
        .eq("key", "holiday_mode")
        .single();
      if (config) {
        setHolidayMode((config.value as { enabled: boolean }).enabled);
      }
    };
    fetchData();
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-body text-xl font-semibold" style={{ color: "hsl(var(--admin-text))" }}>
          Welcome back 👋
        </h2>
        <p className="font-body text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>
          {today}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Leads"
          value={leadCount}
          color="hsl(234, 85%, 60%)"
          sparkData={[2, 4, 3, 7, 5, 8, 6, 9]}
        />
        <StatCard
          icon={TrendingUp}
          label="New Leads"
          value={newLeads}
          subtitle="Awaiting response"
          color="hsl(160, 70%, 45%)"
          sparkData={[1, 3, 2, 4, 3, 5, 4, 6]}
        />
        <StatCard
          icon={TreePine}
          label="Holiday Mode"
          value={holidayMode ? "ON" : "OFF"}
          color={holidayMode ? "hsl(0, 80%, 55%)" : "hsl(220, 9%, 46%)"}
        />
        <StatCard
          icon={Clock}
          label="Service Pages"
          value={12}
          subtitle="Active services"
          color="hsl(28, 100%, 50%)"
          sparkData={[8, 9, 10, 10, 11, 11, 12, 12]}
        />
      </div>
    </div>
  );
};

export default DashboardTab;
