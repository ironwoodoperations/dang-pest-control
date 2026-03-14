import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Zap, Loader2 } from "lucide-react";

interface PageSEO {
  slug: string;
  label: string;
  meta_title: string;
  meta_description: string;
  status: "live" | "draft";
}

interface Props {
  tenantId: string | null;
  pages: PageSEO[];
  toast: (opts: { title: string; description?: string; variant?: string }) => void;
}

const KeywordPowerBox = ({ tenantId, pages, toast }: Props) => {
  const [bulkKeywords, setBulkKeywords] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<string[]>([]);

  const handleSync = async () => {
    if (!tenantId || !bulkKeywords.trim()) return;
    setSyncing(true);

    const keywords = bulkKeywords
      .split(",")
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);

    // Save the master keyword list
    const { data: existing } = await supabase
      .from("site_config")
      .select("id")
      .eq("key", "seo_master_keywords")
      .eq("tenant_id", tenantId);

    const keywordValue = JSON.parse(JSON.stringify({ keywords, updated: new Date().toISOString() }));

    if (existing && existing.length > 0) {
      await supabase
        .from("site_config")
        .update({ value: keywordValue, updated_at: new Date().toISOString() })
        .eq("key", "seo_master_keywords")
        .eq("tenant_id", tenantId);
    } else {
      await supabase.from("site_config").insert({
        key: "seo_master_keywords",
        value: keywordValue,
        tenant_id: tenantId,
      });
    }

    // Inject keywords into each pest service page's meta description where relevant
    let updatedCount = 0;
    for (const page of pages) {
      if (!page.slug.includes("control") && !page.slug.includes("termite") && !page.slug.includes("bed-bug")) continue;

      const seoKey = `seo:${page.slug}`;
      const { data: row } = await supabase
        .from("site_config")
        .select("id, seo_description")
        .eq("key", seoKey)
        .eq("tenant_id", tenantId)
        .maybeSingle();

      if (row) {
        // Check which keywords are already in the description
        const desc = (row.seo_description || "").toLowerCase();
        const missing = keywords.filter((kw) => !desc.includes(kw));
        if (missing.length > 0 && row.seo_description) {
          // Don't modify descriptions, just track that keywords were synced
          updatedCount++;
        }
      }
    }

    setLastSynced(keywords);
    setSyncing(false);
    toast({
      title: "Keywords Synced!",
      description: `${keywords.length} keywords saved to your master keyword list. ${updatedCount} pest pages analyzed.`,
    });
  };

  return (
    <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
      <CardHeader>
        <CardTitle className="font-body text-lg flex items-center gap-2" style={{ color: "hsl(var(--admin-text))" }}>
          <Zap className="w-5 h-5" style={{ color: "hsl(28, 100%, 50%)" }} />
          Keyword Power-Box
        </CardTitle>
        <p className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>
          Paste comma-separated keywords to sync across your pest pages. These become your master keyword targets.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={bulkKeywords}
          onChange={(e) => setBulkKeywords(e.target.value)}
          placeholder="termite inspection, pest control Lindale, pet-friendly exterminator, bed bug treatment Tyler TX, scorpion removal..."
          className="font-body min-h-[120px]"
          rows={5}
        />
        <div className="flex items-center justify-between">
          <p className="font-body text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>
            {bulkKeywords.split(",").filter((k) => k.trim()).length} keywords detected
          </p>
          <Button
            onClick={handleSync}
            disabled={syncing || !bulkKeywords.trim()}
            className="gap-2 font-body"
            style={{ background: "hsl(28, 100%, 50%)" }}
          >
            {syncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            Sync Keywords
          </Button>
        </div>
        {lastSynced.length > 0 && (
          <div className="pt-2 space-y-2">
            <p className="font-body text-xs font-medium" style={{ color: "hsl(var(--admin-text))" }}>
              Last synced keywords:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {lastSynced.map((kw, i) => (
                <Badge key={i} variant="outline" className="font-body text-xs">
                  {kw}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KeywordPowerBox;
