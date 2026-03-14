import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SettingsData } from "../SettingsTab";

interface Props {
  settings: SettingsData;
  update: (patch: Partial<SettingsData>) => void;
}

const isValidUrl = (str: string) => {
  if (!str.trim()) return true; // empty is ok
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const SettingsHeroMedia = ({ settings, update }: Props) => {
  const [urlError, setUrlError] = useState("");

  const handleVideoUrlChange = (value: string) => {
    update({ hero_video_url: value });
    if (value && !isValidUrl(value)) {
      setUrlError("Please enter a valid URL (https://...)");
    } else {
      setUrlError("");
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-lg tracking-wide uppercase" style={{ color: "hsl(var(--admin-text))" }}>Hero Media</h3>
        <p className="font-body text-xs mt-0.5" style={{ color: "hsl(var(--admin-text-muted))" }}>Background video and promotional video settings.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="font-body text-xs font-medium" style={{ color: "hsl(var(--admin-text))" }}>Background Video URL</Label>
          <Input
            value={settings.hero_video_url}
            onChange={(e) => handleVideoUrlChange(e.target.value)}
            placeholder="https://..."
            className={`font-body text-sm h-9 ${urlError ? "border-destructive" : ""}`}
          />
          {urlError && <p className="text-xs font-body text-destructive">{urlError}</p>}
        </div>
        <div className="space-y-1.5">
          <Label className="font-body text-xs font-medium" style={{ color: "hsl(var(--admin-text))" }}>Video Type</Label>
          <Select value={settings.hero_video_type} onValueChange={(v) => update({ hero_video_type: v })}>
            <SelectTrigger className="h-9 text-sm font-body"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="supabase">Supabase Storage</SelectItem>
              <SelectItem value="direct">Direct URL</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="font-body text-xs font-medium" style={{ color: "hsl(var(--admin-text))" }}>Start Time (seconds)</Label>
          <Input
            value={settings.hero_video_start}
            onChange={(e) => update({ hero_video_start: e.target.value.replace(/[^0-9]/g, "") })}
            placeholder="e.g. 5"
            className="font-body text-sm h-9"
          />
          <p className="text-[11px] font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Video starts at this second</p>
        </div>
        <div className="space-y-1.5">
          <Label className="font-body text-xs font-medium" style={{ color: "hsl(var(--admin-text))" }}>End Time (seconds)</Label>
          <Input
            value={settings.hero_video_end}
            onChange={(e) => update({ hero_video_end: e.target.value.replace(/[^0-9]/g, "") })}
            placeholder="e.g. 30"
            className="font-body text-sm h-9"
          />
          <p className="text-[11px] font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Video stops at this second</p>
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label className="font-body text-xs font-medium" style={{ color: "hsl(var(--admin-text))" }}>Meet Kirk YouTube ID</Label>
          <Input value={settings.meet_kirk_youtube_id} onChange={(e) => update({ meet_kirk_youtube_id: e.target.value })} placeholder="e.g. dQw4w9WgXcQ" className="font-body text-sm h-9" />
        </div>
      </div>
    </div>
  );
};

export default SettingsHeroMedia;
