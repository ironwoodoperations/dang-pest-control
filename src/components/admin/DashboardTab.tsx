import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, TreePine, Clock } from "lucide-react";

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
        <h2 className="font-body text-3xl font-bold">Admin</h2>
        <p className="text-muted-foreground font-body">{today}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-accent/10 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-body font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-body">{leadCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-primary/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-body font-medium">New Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-body">{newLeads}</div>
            <p className="text-xs text-muted-foreground font-body">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-body font-medium">Holiday Mode</CardTitle>
            <TreePine className={`h-4 w-4 ${holidayMode ? "text-destructive" : "text-muted-foreground"}`} />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold font-body">{holidayMode ? "🎄 ON" : "OFF"}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-body font-medium">Service Pages</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-body">12</div>
            <p className="text-xs text-muted-foreground font-body">Active services</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardTab;
