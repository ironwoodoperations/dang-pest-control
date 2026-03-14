import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TreePine, Sparkles, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { HOLIDAYS } from "@/hooks/useHolidayMode";

const SettingsTab = () => {
  const [holidayEnabled, setHolidayEnabled] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState("");
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchConfig = async () => {
      const { data } = await supabase
        .from("site_config")
        .select("value")
        .eq("key", "holiday_mode")
        .single();
      if (data) {
        const val = data.value as Record<string, unknown>;
        setHolidayEnabled(!!val.enabled);
        setSelectedHoliday((val.holiday as string) || "");
        setGreeting((val.greeting as string) || "");
      }
      setLoading(false);
    };
    fetchConfig();
  }, []);

  const saveHolidayConfig = async () => {
    setSaving(true);
    const value = {
      enabled: holidayEnabled,
      holiday: selectedHoliday,
      greeting,
    };
    const { error } = await supabase
      .from("site_config")
      .update({ value, updated_at: new Date().toISOString() })
      .eq("key", "holiday_mode");

    if (error) {
      toast({ title: "Error", description: "Failed to save holiday settings", variant: "destructive" });
    } else {
      toast({ title: "Saved!", description: "Holiday settings updated successfully." });
    }
    setSaving(false);
  };

  const activeTheme = HOLIDAYS.find((h) => h.key === selectedHoliday);

  return (
    <div className="space-y-6">
      <h2 className="font-body text-2xl font-bold" style={{ color: "hsl(var(--admin-text))" }}>Site Settings</h2>

      <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "hsl(0, 80%, 95%)", color: "hsl(0, 80%, 55%)" }}
            >
              <TreePine className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="font-body text-lg" style={{ color: "hsl(var(--admin-text))" }}>Holiday Mode</CardTitle>
              <CardDescription className="font-body">
                Add themed decorations around the header and hero video with a greeting banner
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5" style={{ color: holidayEnabled ? activeTheme?.borderColor : "hsl(var(--admin-text-muted))" }} />
              <Label htmlFor="holiday-toggle" className="font-body font-medium cursor-pointer" style={{ color: "hsl(var(--admin-text))" }}>
                {holidayEnabled ? "Holiday Mode is ON" : "Holiday Mode is OFF"}
              </Label>
            </div>
            <Switch
              id="holiday-toggle"
              checked={holidayEnabled}
              onCheckedChange={setHolidayEnabled}
              disabled={loading}
            />
          </div>

          {/* Holiday Selector */}
          {holidayEnabled && (
            <div className="space-y-4 p-4 rounded-lg border" style={{ borderColor: activeTheme?.borderColor || "hsl(var(--border))" }}>
              <div className="space-y-2">
                <Label className="font-body font-medium" style={{ color: "hsl(var(--admin-text))" }}>Select Holiday</Label>
                <Select value={selectedHoliday} onValueChange={setSelectedHoliday}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a holiday..." />
                  </SelectTrigger>
                  <SelectContent>
                    {HOLIDAYS.map((h) => (
                      <SelectItem key={h.key} value={h.key}>
                        {h.emoji} {h.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="font-body font-medium" style={{ color: "hsl(var(--admin-text))" }}>Holiday Greeting</Label>
                <Input
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  placeholder={activeTheme ? `e.g. ${activeTheme.emoji} ${activeTheme.name} from Dang Pest Control!` : "Enter a greeting message..."}
                />
                <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
                  This text appears in a banner above the navigation bar.
                </p>
              </div>

              {/* Preview */}
              {activeTheme && (
                <div className="space-y-2">
                  <Label className="font-body font-medium" style={{ color: "hsl(var(--admin-text))" }}>Preview</Label>
                  <div
                    className="rounded-lg p-3 text-center text-sm font-body font-semibold text-white"
                    style={{ background: activeTheme.bannerBg }}
                  >
                    {greeting || `${activeTheme.emoji} ${activeTheme.name} from Dang Pest Control!`}
                  </div>
                </div>
              )}
            </div>
          )}

          <Button onClick={saveHolidayConfig} disabled={saving || loading} className="gap-2 font-body" style={{ background: "hsl(var(--admin-indigo))" }}>
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Holiday Settings"}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-dashed" style={{ background: "hsl(var(--admin-card-bg))" }}>
        <CardContent className="p-8 text-center">
          <p className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>
            More site settings coming soon — business hours, contact info, service areas, etc.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;
