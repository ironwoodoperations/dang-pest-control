import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

    {/* Brand Colors */}
    <div>
      <p className="text-[10px] font-body uppercase tracking-widest font-medium mb-3" style={{ color: "hsl(var(--admin-text-muted))", opacity: 0.6 }}>Brand Colors</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="font-body text-xs font-medium" style={{ color: "hsl(var(--admin-text))" }}>Primary Color</Label>
          <div className="flex gap-2 items-center">
            <Input value={(settings as any).primary_color || "#ff8c00"} onChange={(e) => update({ primary_color: e.target.value } as any)} placeholder="#ff8c00" className="font-mono text-sm h-9 flex-1" />
            <div className="w-9 h-9 rounded-lg border" style={{ background: (settings as any).primary_color || "#ff8c00", borderColor: "hsl(var(--admin-sidebar-border))" }} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="font-body text-xs font-medium" style={{ color: "hsl(var(--admin-text))" }}>Accent Color</Label>
          <div className="flex gap-2 items-center">
            <Input value={(settings as any).accent_color || "#e6c619"} onChange={(e) => update({ accent_color: e.target.value } as any)} placeholder="#e6c619" className="font-mono text-sm h-9 flex-1" />
            <div className="w-9 h-9 rounded-lg border" style={{ background: (settings as any).accent_color || "#e6c619", borderColor: "hsl(var(--admin-sidebar-border))" }} />
          </div>
        </div>
      </div>
    </div>

    {/* Email Footer */}
    <div className="space-y-1.5">
      <Label className="font-body text-xs font-medium" style={{ color: "hsl(var(--admin-text))" }}>Email Footer Signature</Label>
      <Textarea
        value={(settings as any).email_footer || ""}
        onChange={(e) => update({ email_footer: e.target.value } as any)}
        placeholder="Tokens: {phone}, {address}, {website}"
        className="font-body text-sm"
        rows={3}
      />
      <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
        Available tokens: {"{phone}"}, {"{address}"}, {"{website}"}
      </p>
    </div>
  </div>
);

export default SettingsBranding;
