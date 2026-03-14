import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles } from "lucide-react";
import { HOLIDAYS } from "@/hooks/useHolidayMode";
import type { SettingsData } from "../SettingsTab";

interface Props {
  settings: SettingsData;
  update: (patch: Partial<SettingsData>) => void;
}

const SettingsCampaigns = ({ settings, update }: Props) => {
  const activeTheme = HOLIDAYS.find((h) => h.key === settings.holiday_key);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg tracking-wide uppercase" style={{ color: "hsl(var(--admin-text))" }}>Campaigns</h3>
        <p className="font-body text-xs mt-0.5" style={{ color: "hsl(var(--admin-text-muted))" }}>Holiday decorations and seasonal promotions.</p>
      </div>

      <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: "hsl(var(--admin-bg))" }}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: settings.holiday_enabled ? activeTheme?.borderColor : "hsl(var(--admin-text-muted))" }} />
          <Label htmlFor="holiday-toggle" className="font-body text-sm cursor-pointer" style={{ color: "hsl(var(--admin-text))" }}>
            Holiday Mode
          </Label>
        </div>
        <Switch id="holiday-toggle" checked={settings.holiday_enabled} onCheckedChange={(v) => update({ holiday_enabled: v })} />
      </div>

      {settings.holiday_enabled && (
        <div className="space-y-4 p-3 rounded-lg border" style={{ borderColor: activeTheme?.borderColor || "hsl(var(--admin-sidebar-border))" }}>
          <div className="space-y-1.5">
            <Label className="font-body text-xs font-medium" style={{ color: "hsl(var(--admin-text))" }}>Holiday</Label>
            <Select value={settings.holiday_key} onValueChange={(v) => update({ holiday_key: v })}>
              <SelectTrigger className="h-9 text-sm font-body"><SelectValue placeholder="Choose..." /></SelectTrigger>
              <SelectContent>
                {HOLIDAYS.map((h) => (
                  <SelectItem key={h.key} value={h.key}>{h.emoji} {h.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="font-body text-xs font-medium" style={{ color: "hsl(var(--admin-text))" }}>Greeting</Label>
            <Input
              value={settings.holiday_greeting}
              onChange={(e) => update({ holiday_greeting: e.target.value })}
              placeholder={activeTheme ? `${activeTheme.emoji} ${activeTheme.name} from Dang Pest Control!` : "Enter greeting..."}
              className="font-body text-sm h-9"
            />
          </div>
          {activeTheme && (
            <div className="rounded-lg p-2.5 text-center text-xs font-body font-semibold text-white" style={{ background: activeTheme.bannerBg }}>
              {settings.holiday_greeting || `${activeTheme.emoji} ${activeTheme.name} from Dang Pest Control!`}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SettingsCampaigns;
