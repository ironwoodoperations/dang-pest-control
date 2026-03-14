import { useParams } from "react-router-dom";
import { servicesData } from "@/data/servicesData";
import ServicePage from "./ServicePage";
import LocationPage from "./LocationPage";
import NotFound from "./NotFound";

const locationSlugs = ["longview-tx", "jacksonville-tx", "lindale-tx", "bullard-tx", "whitehouse-tx"];

const SlugRouter = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <NotFound />;

  if (servicesData[slug]) {
    return <ServicePage />;
  }

  if (locationSlugs.includes(slug)) {
    return <LocationPage />;
  }

  return <NotFound />;
};

export default SlugRouter;
