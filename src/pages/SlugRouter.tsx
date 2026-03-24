import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { servicesData } from "@/data/servicesData";
import { supabase } from "@/integrations/supabase/client";
import ServicePage from "./ServicePage";
import LocationPage from "./LocationPage";
import NotFound from "./NotFound";

const SlugRouter = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isLocation, setIsLocation] = useState<boolean | null>(null);

  useEffect(() => {
    if (!slug || servicesData[slug]) {
      setIsLocation(false);
      return;
    }
    // Check if slug exists in location_data and is live
    supabase
      .from("location_data")
      .select("slug")
      .eq("slug", slug)
      .eq("is_live", true)
      .maybeSingle()
      .then(({ data }) => {
        setIsLocation(!!data);
      });
  }, [slug]);

  if (!slug) return <NotFound />;

  if (servicesData[slug]) {
    return <ServicePage />;
  }

  if (isLocation === null) {
    return null; // loading
  }

  if (isLocation) {
    return <LocationPage />;
  }

  return <NotFound />;
};

export default SlugRouter;
