import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface HolidayConfig {
  enabled: boolean;
  holiday: string;
  greeting: string;
}

export interface HolidayTheme {
  name: string;
  key: string;
  emoji: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  bannerBg: string;
}

export const HOLIDAYS: HolidayTheme[] = [
  { name: "Happy New Year", key: "new-year", emoji: "🎆", borderColor: "#FFD700", bgColor: "#1a1a2e", textColor: "#FFD700", bannerBg: "linear-gradient(135deg, #1a1a2e, #16213e)" },
  { name: "Valentine's Day", key: "valentines", emoji: "💕", borderColor: "#e91e63", bgColor: "#fce4ec", textColor: "#c2185b", bannerBg: "linear-gradient(135deg, #e91e63, #f06292)" },
  { name: "St. Patrick's Day", key: "st-patricks", emoji: "🍀", borderColor: "#4caf50", bgColor: "#e8f5e9", textColor: "#2e7d32", bannerBg: "linear-gradient(135deg, #2e7d32, #66bb6a)" },
  { name: "Easter", key: "easter", emoji: "🐣", borderColor: "#ab47bc", bgColor: "#f3e5f5", textColor: "#7b1fa2", bannerBg: "linear-gradient(135deg, #ce93d8, #f48fb1)" },
  { name: "Memorial Day", key: "memorial-day", emoji: "🇺🇸", borderColor: "#1565c0", bgColor: "#e3f2fd", textColor: "#0d47a1", bannerBg: "linear-gradient(135deg, #1565c0, #c62828)" },
  { name: "4th of July", key: "4th-july", emoji: "🎇", borderColor: "#d32f2f", bgColor: "#fff3e0", textColor: "#bf360c", bannerBg: "linear-gradient(135deg, #1565c0, #d32f2f)" },
  { name: "Labor Day", key: "labor-day", emoji: "⚒️", borderColor: "#ff8f00", bgColor: "#fff8e1", textColor: "#e65100", bannerBg: "linear-gradient(135deg, #e65100, #ff8f00)" },
  { name: "Halloween", key: "halloween", emoji: "🎃", borderColor: "#ff6f00", bgColor: "#1a1a1a", textColor: "#ff6f00", bannerBg: "linear-gradient(135deg, #1a1a1a, #4a148c)" },
  { name: "Thanksgiving", key: "thanksgiving", emoji: "🦃", borderColor: "#8d6e63", bgColor: "#efebe9", textColor: "#4e342e", bannerBg: "linear-gradient(135deg, #8d6e63, #d84315)" },
  { name: "Christmas", key: "christmas", emoji: "🎄", borderColor: "#c62828", bgColor: "#e8f5e9", textColor: "#c62828", bannerBg: "linear-gradient(135deg, #c62828, #2e7d32)" },
];

export function useHolidayMode() {
  const [config, setConfig] = useState<HolidayConfig>({ enabled: false, holiday: "", greeting: "" });

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("site_config")
        .select("value")
        .eq("key", "holiday_mode")
        .single();
      if (data) {
        const val = data.value as Record<string, unknown>;
        setConfig({
          enabled: !!val.enabled,
          holiday: (val.holiday as string) || "",
          greeting: (val.greeting as string) || "",
        });
      }
    };
    fetch();
  }, []);

  const activeTheme = config.enabled
    ? HOLIDAYS.find((h) => h.key === config.holiday) || null
    : null;

  return { ...config, activeTheme };
}
