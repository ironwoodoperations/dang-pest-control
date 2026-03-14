import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TreePine, Sparkles, Save, Building2, Bell, Clock, MapPin, Share2, Facebook, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { HOLIDAYS } from "@/hooks/useHolidayMode";

interface BusinessInfo {
  company_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  hours: string;
  service_area: string;
}

const defaultBiz: BusinessInfo = {
  company_name: "Dang Pest Control",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "TX",
  zip: "",
  hours: "Mon-Fri 8am-6pm, Sat 9am-2pm",
  service_area: "",
};

const SettingsTab = () => {
  // Holiday state
  const [holidayEnabled, setHolidayEnabled] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState("");
  const [greeting, setGreeting] = useState("");

  // Business info state
  const [biz, setBiz] = useState<BusinessInfo>(defaultBiz);

  // Notification state
  const [notifyEmail, setNotifyEmail] = useState("");

  // Social media state
  const [social, setSocial] = useState({ facebook: "", instagram: "", google: "", yelp: "" });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAll = async () => {
      const { data } = await supabase.from("site_config").select("key, value");
      if (data) {
        for (const row of data) {
          const val = row.value as Record<string, unknown>;
          if (row.key === "holiday_mode") {
            setHolidayEnabled(!!val.enabled);
            setSelectedHoliday((val.holiday as string) || "");
            setGreeting((val.greeting as string) || "");
          } else if (row.key === "business_info") {
            setBiz({ ...defaultBiz, ...(val as unknown as BusinessInfo) });
          } else if (row.key === "notification_email") {
            setNotifyEmail((val.email as string) || "");
          } else if (row.key === "social_links") {
            setSocial({ facebook: "", instagram: "", google: "", yelp: "", ...(val as Record<string, string>) });
          }
        }
      }
      setLoading(false);
    };
    fetchAll();
  }, []);

  const saveConfig = async (key: string, value: Record<string, unknown>) => {
    setSaving(key);
    const jsonValue = JSON.parse(JSON.stringify(value));
    const { data: existing } = await supabase.from("site_config").select("id").eq("key", key);
    let updateError: unknown = null;
    if (existing && existing.length > 0) {
      const { error } = await supabase.from("site_config").update({ value: jsonValue, updated_at: new Date().toISOString() }).eq("key", key);
      updateError = error;
    } else {
      const { error } = await supabase.from("site_config").insert({ key, value: jsonValue });
      updateError = error;
    }

    if (updateError) {
      toast({ title: "Error", description: `Failed to save ${key}`, variant: "destructive" });
    } else {
      toast({ title: "Saved!", description: "Settings updated successfully." });
    }
    setSaving(null);
  };

  const activeTheme = HOLIDAYS.find((h) => h.key === selectedHoliday);

  return (
    <div className="space-y-6">
      <h2 className="font-body text-2xl font-bold" style={{ color: "hsl(var(--admin-text))" }}>Site Settings</h2>

      {/* Notification Email */}
      <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(234, 85%, 95%)", color: "hsl(234, 85%, 60%)" }}>
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="font-body text-lg" style={{ color: "hsl(var(--admin-text))" }}>Lead Notifications</CardTitle>
              <CardDescription className="font-body">Get notified when new quote requests come in</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="font-body font-medium" style={{ color: "hsl(var(--admin-text))" }}>Notification Email</Label>
            <Input
              type="email"
              value={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.value)}
              placeholder="admin@dangpestcontrol.com"
              className="font-body"
            />
            <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
              New lead notifications will be sent to this address.
            </p>
          </div>
          <Button
            onClick={() => saveConfig("notification_email", { email: notifyEmail })}
            disabled={saving === "notification_email" || loading}
            className="gap-2 font-body"
            style={{ background: "hsl(var(--admin-indigo))" }}
          >
            <Save className="w-4 h-4" />
            {saving === "notification_email" ? "Saving..." : "Save"}
          </Button>
        </CardContent>
      </Card>

      {/* Business Info */}
      <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(160, 70%, 92%)", color: "hsl(160, 70%, 40%)" }}>
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="font-body text-lg" style={{ color: "hsl(var(--admin-text))" }}>Business Information</CardTitle>
              <CardDescription className="font-body">Company details shown across the website</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-body font-medium" style={{ color: "hsl(var(--admin-text))" }}>Company Name</Label>
              <Input value={biz.company_name} onChange={(e) => setBiz({ ...biz, company_name: e.target.value })} className="font-body" />
            </div>
            <div className="space-y-2">
              <Label className="font-body font-medium" style={{ color: "hsl(var(--admin-text))" }}>Phone</Label>
              <Input value={biz.phone} onChange={(e) => setBiz({ ...biz, phone: e.target.value })} placeholder="(555) 123-4567" className="font-body" />
            </div>
            <div className="space-y-2">
              <Label className="font-body font-medium" style={{ color: "hsl(var(--admin-text))" }}>Email</Label>
              <Input type="email" value={biz.email} onChange={(e) => setBiz({ ...biz, email: e.target.value })} placeholder="info@dangpestcontrol.com" className="font-body" />
            </div>
            <div className="space-y-2">
              <Label className="font-body font-medium" style={{ color: "hsl(var(--admin-text))" }}>Address</Label>
              <Input value={biz.address} onChange={(e) => setBiz({ ...biz, address: e.target.value })} className="font-body" />
            </div>
            <div className="space-y-2">
              <Label className="font-body font-medium" style={{ color: "hsl(var(--admin-text))" }}>City</Label>
              <Input value={biz.city} onChange={(e) => setBiz({ ...biz, city: e.target.value })} className="font-body" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="font-body font-medium" style={{ color: "hsl(var(--admin-text))" }}>State</Label>
                <Input value={biz.state} onChange={(e) => setBiz({ ...biz, state: e.target.value })} className="font-body" />
              </div>
              <div className="space-y-2">
                <Label className="font-body font-medium" style={{ color: "hsl(var(--admin-text))" }}>ZIP</Label>
                <Input value={biz.zip} onChange={(e) => setBiz({ ...biz, zip: e.target.value })} className="font-body" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-body font-medium flex items-center gap-1" style={{ color: "hsl(var(--admin-text))" }}>
                <Clock className="w-3 h-3" /> Business Hours
              </Label>
              <Input value={biz.hours} onChange={(e) => setBiz({ ...biz, hours: e.target.value })} className="font-body" />
            </div>
            <div className="space-y-2">
              <Label className="font-body font-medium flex items-center gap-1" style={{ color: "hsl(var(--admin-text))" }}>
                <MapPin className="w-3 h-3" /> Service Area
              </Label>
              <Input value={biz.service_area} onChange={(e) => setBiz({ ...biz, service_area: e.target.value })} placeholder="Greater Austin, TX area" className="font-body" />
            </div>
          </div>

          <Button
            onClick={() => saveConfig("business_info", biz as unknown as Record<string, unknown>)}
            disabled={saving === "business_info" || loading}
            className="gap-2 font-body"
            style={{ background: "hsl(var(--admin-indigo))" }}
          >
            <Save className="w-4 h-4" />
            {saving === "business_info" ? "Saving..." : "Save Business Info"}
          </Button>
        </CardContent>
      </Card>

      {/* Holiday Mode */}
      <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(0, 80%, 95%)", color: "hsl(0, 80%, 55%)" }}>
              <TreePine className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="font-body text-lg" style={{ color: "hsl(var(--admin-text))" }}>Holiday Mode</CardTitle>
              <CardDescription className="font-body">Add themed decorations around the header and hero video</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5" style={{ color: holidayEnabled ? activeTheme?.borderColor : "hsl(var(--admin-text-muted))" }} />
              <Label htmlFor="holiday-toggle" className="font-body font-medium cursor-pointer" style={{ color: "hsl(var(--admin-text))" }}>
                {holidayEnabled ? "Holiday Mode is ON" : "Holiday Mode is OFF"}
              </Label>
            </div>
            <Switch id="holiday-toggle" checked={holidayEnabled} onCheckedChange={setHolidayEnabled} disabled={loading} />
          </div>

          {holidayEnabled && (
            <div className="space-y-4 p-4 rounded-lg border" style={{ borderColor: activeTheme?.borderColor || "hsl(var(--border))" }}>
              <div className="space-y-2">
                <Label className="font-body font-medium" style={{ color: "hsl(var(--admin-text))" }}>Select Holiday</Label>
                <Select value={selectedHoliday} onValueChange={setSelectedHoliday}>
                  <SelectTrigger><SelectValue placeholder="Choose a holiday..." /></SelectTrigger>
                  <SelectContent>
                    {HOLIDAYS.map((h) => (
                      <SelectItem key={h.key} value={h.key}>{h.emoji} {h.name}</SelectItem>
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
                <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>This text appears in a banner above the navigation bar.</p>
              </div>
              {activeTheme && (
                <div className="space-y-2">
                  <Label className="font-body font-medium" style={{ color: "hsl(var(--admin-text))" }}>Preview</Label>
                  <div className="rounded-lg p-3 text-center text-sm font-body font-semibold text-white" style={{ background: activeTheme.bannerBg }}>
                    {greeting || `${activeTheme.emoji} ${activeTheme.name} from Dang Pest Control!`}
                  </div>
                </div>
              )}
            </div>
          )}

          <Button
            onClick={() => saveConfig("holiday_mode", { enabled: holidayEnabled, holiday: selectedHoliday, greeting })}
            disabled={saving === "holiday_mode" || loading}
            className="gap-2 font-body"
            style={{ background: "hsl(var(--admin-indigo))" }}
          >
            <Save className="w-4 h-4" />
            {saving === "holiday_mode" ? "Saving..." : "Save Holiday Settings"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;
