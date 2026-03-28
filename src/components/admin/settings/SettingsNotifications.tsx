import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SettingsData } from "../SettingsTab";

interface Props {
  settings: SettingsData;
  update: (patch: Partial<SettingsData>) => void;
}

const SettingsNotifications = ({ settings, update }: Props) => (
  <div className="space-y-5">
    <div>
      <h3 className="font-display text-lg tracking-wide uppercase" style={{ color: "hsl(var(--admin-text))" }}>Notifications</h3>
      <p className="font-body text-xs mt-0.5" style={{ color: "hsl(var(--admin-text-muted))" }}>Configure email notifications and automated digests.</p>
    </div>

    <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
      <CardHeader>
        <CardTitle className="font-body text-sm" style={{ color: "hsl(var(--admin-text))" }}>Lead Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label className="font-body text-xs" style={{ color: "hsl(var(--admin-text))" }}>Lead notification email</Label>
          <Input value={settings.notify_email} onChange={(e) => update({ notify_email: e.target.value })} placeholder="admin@dangpestcontrol.com" className="font-body text-sm h-9" />
        </div>
        <div className="space-y-1.5">
          <Label className="font-body text-xs" style={{ color: "hsl(var(--admin-text))" }}>CC email for lead notifications</Label>
          <Input value={settings.cc_email} onChange={(e) => update({ cc_email: e.target.value })} placeholder="manager@dangpestcontrol.com" className="font-body text-sm h-9" />
        </div>
      </CardContent>
    </Card>

    <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
      <CardHeader>
        <CardTitle className="font-body text-sm" style={{ color: "hsl(var(--admin-text))" }}>Reports & Digests</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label className="font-body text-xs" style={{ color: "hsl(var(--admin-text))" }}>Monthly report recipient email</Label>
          <Input value={settings.monthly_report_email} onChange={(e) => update({ monthly_report_email: e.target.value })} placeholder="owner@dangpestcontrol.com" className="font-body text-sm h-9" />
        </div>
        <div className="flex items-center justify-between">
          <Label className="font-body text-sm" style={{ color: "hsl(var(--admin-text))" }}>Notify on new Google review</Label>
          <Switch checked={settings.notify_new_review} onCheckedChange={(v) => update({ notify_new_review: v })} />
        </div>
        <div className="flex items-center justify-between">
          <Label className="font-body text-sm" style={{ color: "hsl(var(--admin-text))" }}>Weekly SEO digest email</Label>
          <Switch checked={settings.weekly_seo_digest} onCheckedChange={(v) => update({ weekly_seo_digest: v })} />
        </div>
      </CardContent>
    </Card>
  </div>
);

export default SettingsNotifications;
