import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useHolidayMode() {
  const [holidayMode, setHolidayMode] = useState(false);

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
    };
    fetch();
  }, []);

  return holidayMode;
}
