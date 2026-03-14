import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SettingsData } from "../SettingsTab";

interface Props {
  settings: SettingsData;
  update: (patch: Partial<SettingsData>) => void;
}

const SettingsBranding = ({ settings, update }: Props) => (
  <div className="space-y-5">
    <div>
      <h3 className="font-display text-lg tracking-wide uppercase" style={{ color: "hsl(var(--admin-text))" }}>Branding</h3>
      <p className="font-body text-xs mt-0.5" style={{ color: "hsl(var(--admin-text-muted))" }}>Logo and favicon URLs used across the site.</p>
    </div>
    <div className="grid grid-cols-1 gap-4">
      <div className="space-y-1.5">
        <Label className="font-body text-xs font-medium" style={{ color: "hsl(var(--admin-text))" }}>Logo URL</Label>
        <Input value={settings.logo_url} onChange={(e) => update({ logo_url: e.target.value })} placeholder="https://..." className="font-body text-sm h-9" />
      </div>
      <div className="space-y-1.5">
        <Label className="font-body text-xs font-medium" style={{ color: "hsl(var(--admin-text))" }}>Favicon URL</Label>
        <Input value={settings.favicon_url} onChange={(e) => update({ favicon_url: e.target.value })} placeholder="https://..." className="font-body text-sm h-9" />
      </div>
    </div>
  </div>
);

export default SettingsBranding;
