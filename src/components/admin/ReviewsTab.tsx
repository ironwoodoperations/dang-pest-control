import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FeatureGate } from "./FeatureGate";
import PageHelpBanner from "./PageHelpBanner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, Star, Loader2, CheckCircle2 } from "lucide-react";

const TENANT_ID = "1282b822-825b-4713-9dc9-6d14a2094d06";

interface GoogleReview {
  authorAttribution?: { displayName?: string };
  rating?: number;
  text?: { text?: string };
  relativePublishTimeDescription?: string;
}

interface PlacesResponse {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  reviews?: GoogleReview[];
  error?: string;
}

const ReviewsTab = () => {
  return (
    <FeatureGate minTier={4} featureName="LeadFusion Live Reviews">
      <ReviewsContent />
    </FeatureGate>
  );
};

const ReviewsContent = () => {
  const [data, setData] = useState<PlacesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncedIdx, setSyncedIdx] = useState<Set<number>>(new Set());
  const [syncing, setSyncing] = useState<number | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error: fnError } = await supabase.functions.invoke("fetch-google-reviews");
      if (fnError) throw fnError;
      if (result?.error) throw new Error(result.error);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  const syncToTestimonials = async (review: GoogleReview, idx: number) => {
    setSyncing(idx);
    try {
      const { error: insertErr } = await supabase.from("testimonials").insert({
        tenant_id: TENANT_ID,
        name: review.authorAttribution?.displayName || "Google Reviewer",
        text: review.text?.text || "",
        rating: review.rating || 5,
        is_featured: false,
        sort_order: 0,
      });
      if (insertErr) throw insertErr;
      setSyncedIdx((prev) => new Set(prev).add(idx));
    } catch (err) {
      console.error("Sync failed:", err);
    } finally {
      setSyncing(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin" style={{ color: "hsl(var(--admin-teal))" }} />
        <span className="ml-2 font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>Loading Google reviews…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="font-body text-sm text-red-500">{error}</p>
        <Button variant="outline" size="sm" onClick={fetchReviews}>
          <RefreshCw className="w-4 h-4 mr-2" /> Retry
        </Button>
      </div>
    );
  }

  const reviews = (data?.reviews || []).slice(0, 5);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg tracking-wide uppercase" style={{ color: "hsl(var(--admin-text))" }}>
          LeadFusion Local — Live Google Reviews
        </h2>
        <Button variant="outline" size="sm" onClick={fetchReviews}>
          <RefreshCw className="w-4 h-4 mr-2" /> Refresh Reviews
        </Button>
      </div>

      <PageHelpBanner tab="reviews" />

      {/* Overall rating card */}
      <Card className="p-5 mb-6 flex items-center gap-4" style={{ background: "hsl(var(--admin-card-bg))", borderColor: "hsl(var(--admin-sidebar-border))" }}>
        <div className="text-4xl font-bold font-display" style={{ color: "hsl(var(--admin-text))" }}>
          {data?.rating?.toFixed(1) || "—"}
        </div>
        <div>
          <div className="flex gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5" fill={i < Math.round(data?.rating || 0) ? "hsl(28, 100%, 50%)" : "none"} stroke={i < Math.round(data?.rating || 0) ? "hsl(28, 100%, 50%)" : "hsl(var(--admin-text-muted))"} />
            ))}
          </div>
          <p className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>
            {data?.userRatingCount || 0} reviews on Google
          </p>
        </div>
      </Card>

      {/* Review cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, idx) => (
          <Card key={idx} className="p-4 flex flex-col justify-between" style={{ background: "hsl(var(--admin-card-bg))", borderColor: "hsl(var(--admin-sidebar-border))" }}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-body text-sm font-semibold" style={{ color: "hsl(var(--admin-text))" }}>
                  {review.authorAttribution?.displayName || "Anonymous"}
                </span>
                <span className="font-body text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>
                  {review.relativePublishTimeDescription || ""}
                </span>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5" fill={i < (review.rating || 0) ? "hsl(28, 100%, 50%)" : "none"} stroke={i < (review.rating || 0) ? "hsl(28, 100%, 50%)" : "hsl(var(--admin-text-muted))"} />
                ))}
              </div>
              <p className="font-body text-xs leading-relaxed mb-3" style={{ color: "hsl(var(--admin-text-muted))" }}>
                {review.text?.text || ""}
              </p>
            </div>
            {syncedIdx.has(idx) ? (
              <div className="flex items-center gap-1.5 text-green-500 font-body text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Review synced to testimonials!
              </div>
            ) : (
              <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => syncToTestimonials(review, idx)} disabled={syncing === idx}>
                {syncing === idx ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> : null}
                Sync to Testimonials
              </Button>
            )}
          </Card>
        ))}
      </div>

      {reviews.length === 0 && (
        <p className="font-body text-sm text-center py-10" style={{ color: "hsl(var(--admin-text-muted))" }}>
          No reviews found.
        </p>
      )}
    </div>
  );
};

export default ReviewsTab;
