import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SiteConfig {
  seoTitle: string;
  seoDescription: string;
  heroVideoUrl: string;
  heroVideoType: string;
  meetKirkYoutubeId: string;
  loading: boolean;
}

/**
 * Fetches site_config for the first tenant (public-facing).
 * Used by homepage and other public pages to pull dynamic SEO & media.
 */
export const useSiteConfig = (): SiteConfig => {
  const [config, setConfig] = useState<SiteConfig>({
    seoTitle: "",
    seoDescription: "",
    heroVideoUrl: "",
    heroVideoType: "youtube",
    meetKirkYoutubeId: "",
    loading: true,
  });

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("site_config")
        .select("key, value")
        .in("key", ["hero_media", "seo_pages"]);

      if (!data) { setConfig((c) => ({ ...c, loading: false })); return; }

      let heroVideoUrl = "";
      let heroVideoType = "youtube";
      let meetKirkYoutubeId = "";
      let seoTitle = "";
      let seoDescription = "";

      for (const row of data) {
        const val = row.value as Record<string, unknown>;
        if (row.key === "hero_media") {
          heroVideoUrl = (val.hero_video_url as string) || "";
          heroVideoType = (val.hero_video_type as string) || "youtube";
          meetKirkYoutubeId = (val.meet_kirk_youtube_id as string) || "";
        }
        if (row.key === "seo_pages") {
          const pages = val as unknown as Array<{ slug: string; meta_title: string; meta_description: string }>;
          if (Array.isArray(pages)) {
            const home = pages.find((p) => p.slug === "/");
            if (home) {
              seoTitle = home.meta_title || "";
              seoDescription = home.meta_description || "";
            }
          }
        }
      }

      setConfig({ heroVideoUrl, heroVideoType, meetKirkYoutubeId, seoTitle, seoDescription, loading: false });
    };
    fetch();
  }, []);

  return config;
};
