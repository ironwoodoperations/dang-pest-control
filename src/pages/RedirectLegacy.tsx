import { useParams, Navigate } from "react-router-dom";

/** Redirects /services/:slug → /:slug and /locations/:slug → /:slug */
const RedirectLegacy = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/${slug || ""}`} replace />;
};

export default RedirectLegacy;
