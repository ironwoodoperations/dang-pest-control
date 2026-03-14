import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, TreePine, Clock } from "lucide-react";

const StatCard = ({
  icon: Icon,
  label,
  value,
  subtitle,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subtitle?: string;
  color: string;
}) => (
  <Card style={{ background: "hsl(var(--admin-card-bg))" }} className="border shadow-sm">
    <CardContent className="p-5 flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: color + "20", color }}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-xs font-body font-medium uppercase tracking-wide" style={{ color: "hsl(var(--admin-text-muted))" }}>
          {label}
        </p>
        <p className="text-2xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>
          {value}
        </p>
        {subtitle && (
          <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
            {subtitle}
          </p>
        )}
      </div>
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
        <h2 className="font-body text-2xl font-bold" style={{ color: "hsl(var(--admin-text))" }}>
          Welcome back 👋
        </h2>
        <p className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>
          {today}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Leads"
          value={leadCount}
          color="hsl(234, 85%, 60%)"
        />
        <StatCard
          icon={TrendingUp}
          label="New Leads"
          value={newLeads}
          subtitle="Awaiting response"
          color="hsl(160, 70%, 45%)"
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
        />
      </div>
    </div>
  );
};

export default DashboardTab;
