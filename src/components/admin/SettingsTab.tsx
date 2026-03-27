import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTenant } from "@/hooks/useTenant";
import { HOLIDAYS } from "@/hooks/useHolidayMode";
import { cn } from "@/lib/utils";
import SettingsBranding from "./settings/SettingsBranding";
import SettingsHeroMedia from "./settings/SettingsHeroMedia";
import SettingsCampaigns from "./settings/SettingsCampaigns";
import SettingsContact from "./settings/SettingsContact";
import SettingsMediaLibrary from "./settings/SettingsMediaLibrary";
import PageHelpBanner from "./PageHelpBanner";

export interface SettingsData {
  // Branding
  logo_url: string;
  favicon_url: string;
  // Hero Media
  hero_video_url: string;
  hero_video_type: string;
  hero_video_start: string;
  hero_video_end: string;
  meet_kirk_youtube_id: string;
  // Campaigns / Holiday
  holiday_enabled: boolean;
  holiday_key: string;
  holiday_greeting: string;
  // Contact
  company_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  hours: string;
  service_area: string;
  // Social
  facebook: string;
  instagram: string;
  google: string;
  yelp: string;
  // Notifications
  notify_email: string;
}

const defaultSettings: SettingsData = {
  logo_url: "",
  favicon_url: "",
  hero_video_url: "",
  hero_video_type: "youtube",
  hero_video_start: "",
  hero_video_end: "",
  meet_kirk_youtube_id: "",
  holiday_enabled: false,
  holiday_key: "",
  holiday_greeting: "",
  company_name: "Dang Pest Control",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "TX",
  zip: "",
  hours: "Mon-Fri 8am-6pm, Sat 9am-2pm",
  service_area: "",
  facebook: "",
  instagram: "",
  google: "",
  yelp: "",
  notify_email: "",
};

const sections = [
  { id: "branding", label: "Branding" },
  { id: "hero-media", label: "Hero Media" },
  { id: "media-library", label: "Media Library" },
  { id: "campaigns", label: "Campaigns" },
  { id: "contact", label: "Contact Info" },
] as const;

type SectionId = (typeof sections)[number]["id"];

const SettingsTab = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("branding");
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { tenantId } = useTenant();

  useEffect(() => {
    if (!tenantId) return;
    const fetchAll = async () => {
      const { data } = await supabase.from("site_config").select("key, value").eq("tenant_id", tenantId);
      if (data) {
        const s = { ...defaultSettings };
        for (const row of data) {
          const val = row.value as Record<string, unknown>;
          if (row.key === "holiday_mode") {
            s.holiday_enabled = !!val.enabled;
            s.holiday_key = (val.holiday as string) || "";
            s.holiday_greeting = (val.greeting as string) || "";
          } else if (row.key === "business_info") {
            s.company_name = (val.company_name as string) || s.company_name;
            s.phone = (val.phone as string) || "";
            s.email = (val.email as string) || "";
            s.address = (val.address as string) || "";
            s.city = (val.city as string) || "";
            s.state = (val.state as string) || "TX";
            s.zip = (val.zip as string) || "";
            s.hours = (val.hours as string) || s.hours;
            s.service_area = (val.service_area as string) || "";
          } else if (row.key === "notification_email") {
            s.notify_email = (val.email as string) || "";
          } else if (row.key === "social_links") {
            s.facebook = (val.facebook as string) || "";
            s.instagram = (val.instagram as string) || "";
            s.google = (val.google as string) || "";
            s.yelp = (val.yelp as string) || "";
          } else if (row.key === "branding") {
            s.logo_url = (val.logo_url as string) || "";
            s.favicon_url = (val.favicon_url as string) || "";
          } else if (row.key === "hero_media") {
            s.hero_video_url = (val.hero_video_url as string) || "";
            s.hero_video_type = (val.hero_video_type as string) || "youtube";
            s.hero_video_start = (val.hero_video_start as string) || "";
            s.hero_video_end = (val.hero_video_end as string) || "";
            s.meet_kirk_youtube_id = (val.meet_kirk_youtube_id as string) || "";
          }
        }
        setSettings(s);
      }
      setLoading(false);
    };
    fetchAll();
  }, [tenantId]);

  const saveConfig = async (key: string, value: Record<string, unknown>) => {
    if (!tenantId) return false;
    const jsonValue = JSON.parse(JSON.stringify(value));
    const { data: existing } = await supabase.from("site_config").select("id").eq("key", key).eq("tenant_id", tenantId);
    let err: unknown = null;
    if (existing && existing.length > 0) {
      const { error } = await supabase.from("site_config").update({ value: jsonValue, updated_at: new Date().toISOString() }).eq("key", key).eq("tenant_id", tenantId);
      err = error;
    } else {
      const { error } = await supabase.from("site_config").insert({ key, value: jsonValue, tenant_id: tenantId });
      err = error;
    }
    return !err;
  };

  const handleSave = async () => {
    setSaving(true);
    const results = await Promise.all([
      saveConfig("branding", { logo_url: settings.logo_url, favicon_url: settings.favicon_url }),
      saveConfig("hero_media", { hero_video_url: settings.hero_video_url, hero_video_type: settings.hero_video_type, hero_video_start: settings.hero_video_start, hero_video_end: settings.hero_video_end, meet_kirk_youtube_id: settings.meet_kirk_youtube_id }),
      saveConfig("holiday_mode", { enabled: settings.holiday_enabled, holiday: settings.holiday_key, greeting: settings.holiday_greeting }),
      saveConfig("business_info", { company_name: settings.company_name, phone: settings.phone, email: settings.email, address: settings.address, city: settings.city, state: settings.state, zip: settings.zip, hours: settings.hours, service_area: settings.service_area }),
      saveConfig("social_links", { facebook: settings.facebook, instagram: settings.instagram, google: settings.google, yelp: settings.yelp }),
      saveConfig("notification_email", { email: settings.notify_email }),
    ]);
    setSaving(false);
    if (results.every(Boolean)) {
      toast({ title: "Saved!", description: "All settings updated." });
    } else {
      toast({ title: "Error", description: "Some settings failed to save.", variant: "destructive" });
    }
  };

  const update = (patch: Partial<SettingsData>) => setSettings((prev) => ({ ...prev, ...patch }));

  const saveHolidayInstant = async (patch: Partial<SettingsData>) => {
    if (!tenantId) return;
    const merged = { ...settings, ...patch };
    const value = { enabled: merged.holiday_enabled, holiday: merged.holiday_key, greeting: merged.holiday_greeting };
    const jsonValue = JSON.parse(JSON.stringify(value));
    const { data: existing } = await supabase.from("site_config").select("id").eq("key", "holiday_mode").eq("tenant_id", tenantId);
    if (existing && existing.length > 0) {
      await supabase.from("site_config").update({ value: jsonValue, updated_at: new Date().toISOString() }).eq("key", "holiday_mode").eq("tenant_id", tenantId);
    } else {
      await supabase.from("site_config").insert({ key: "holiday_mode", value: jsonValue, tenant_id: tenantId });
    }
  };

  if (loading) {
    return <p className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>Loading settings...</p>;
  }

  return (
    <>
    <PageHelpBanner tab={`settings-${activeSection}`} />
    <div className="flex gap-6">
      {/* Left nav */}
      <nav className="w-44 shrink-0 hidden md:block">
        <p className="text-[10px] font-display uppercase tracking-widest mb-3" style={{ color: "hsl(var(--admin-text-muted))" }}>
          Settings
        </p>
        <ul className="space-y-0.5">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => setActiveSection(s.id)}
                className={cn(
                  "w-full text-left px-3 py-1.5 rounded-md text-[13px] font-body transition-colors",
                  activeSection === s.id ? "font-semibold" : "hover:bg-muted/50"
                )}
                style={{
                  background: activeSection === s.id ? "hsla(185, 100%, 35%, 0.1)" : undefined,
                  color: activeSection === s.id ? "hsl(var(--admin-teal))" : "hsl(var(--admin-orange))",
                }}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content area */}
      <div className="flex-1 min-w-0 space-y-5">
        {/* Mobile section selector */}
        <div className="flex gap-1 md:hidden overflow-x-auto pb-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-body whitespace-nowrap transition-colors",
                activeSection === s.id ? "font-semibold" : ""
              )}
              style={{
                background: activeSection === s.id ? "hsla(185, 100%, 35%, 0.1)" : "hsl(var(--admin-card-bg))",
                color: activeSection === s.id ? "hsl(var(--admin-teal))" : "hsl(var(--admin-orange))",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {activeSection === "branding" && <SettingsBranding settings={settings} update={update} />}
        {activeSection === "hero-media" && <SettingsHeroMedia settings={settings} update={update} />}
        {activeSection === "media-library" && <SettingsMediaLibrary />}
        {activeSection === "campaigns" && <SettingsCampaigns settings={settings} update={(patch) => { update(patch); saveHolidayInstant(patch); }} />}
        {activeSection === "contact" && <SettingsContact settings={settings} update={update} />}

        <button
          onClick={handleSave}
          disabled={saving}
          className="font-body text-sm font-medium px-5 py-2 rounded-lg text-white transition-opacity disabled:opacity-50"
          style={{ background: "hsl(var(--admin-accent))" }}
        >
          {saving ? "Saving..." : "Save All Settings"}
        </button>
      </div>
    </div>
    </>
  );
};

export default SettingsTab;
