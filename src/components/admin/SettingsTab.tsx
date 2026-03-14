import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { TreePine, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SettingsTab = () => {
  const [holidayMode, setHolidayMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("site_config")
        .select("value")
        .eq("key", "holiday_mode")
        .single();
      if (data) {
        setHolidayMode((data.value as { enabled: boolean }).enabled);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const toggleHolidayMode = async (enabled: boolean) => {
    setHolidayMode(enabled);
    const { error } = await supabase
      .from("site_config")
      .update({ value: { enabled }, updated_at: new Date().toISOString() })
      .eq("key", "holiday_mode");

    if (error) {
      setHolidayMode(!enabled);
      toast({ title: "Error", description: "Failed to update holiday mode", variant: "destructive" });
    } else {
      toast({
        title: enabled ? "🎄 Holiday Mode ON" : "Holiday Mode OFF",
        description: enabled
          ? "The homepage now uses festive red accents!"
          : "The homepage is back to normal green accents.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-body text-2xl font-bold">Site Settings</h2>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <TreePine className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <CardTitle className="font-body text-lg">Holiday Mode</CardTitle>
              <CardDescription className="font-body">
                Switch the homepage from green accents to red/festive accents
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <Sparkles className={`w-5 h-5 ${holidayMode ? "text-destructive" : "text-muted-foreground"}`} />
              <Label htmlFor="holiday-mode" className="font-body font-medium cursor-pointer">
                {holidayMode ? "Holiday Mode is ON" : "Holiday Mode is OFF"}
              </Label>
            </div>
            <Switch
              id="holiday-mode"
              checked={holidayMode}
              onCheckedChange={toggleHolidayMode}
              disabled={loading}
            />
          </div>
          {holidayMode && (
            <p className="mt-3 text-sm text-destructive font-body flex items-center gap-2">
              <TreePine className="w-4 h-4" />
              The homepage is currently displaying festive red accents.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="border-dashed">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground font-body text-sm">
            More site settings coming soon — business hours, contact info, service areas, etc.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;
