import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Zap, Loader2, HelpCircle, ChevronDown, ChevronUp, Bot } from "lucide-react";

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
  toast: (opts: { title: string; description?: string; variant?: "default" | "destructive" }) => void;
}

interface Placement {
  keyword: string;
  page_slug: string;
  placement_type: string;
  suggested_text: string;
  selected: boolean;
}

const KeywordPowerBox = ({ tenantId, pages, toast }: Props) => {
  const [bulkKeywords, setBulkKeywords] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<string[]>([]);
  const [helpOpen, setHelpOpen] = useState(false);
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [autoPlacing, setAutoPlacing] = useState(false);
  const [applying, setApplying] = useState(false);

  const handleSync = async () => {
    if (!tenantId || !bulkKeywords.trim()) return;
    setSyncing(true);

    try {
      const keywords = bulkKeywords
        .split(",")
        .map((k) => k.trim().toLowerCase())
        .filter(Boolean);

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
          const desc = (row.seo_description || "").toLowerCase();
          const missing = keywords.filter((kw) => !desc.includes(kw));
          if (missing.length > 0 && row.seo_description) {
            updatedCount++;
          }
        }
      }

      setLastSynced(keywords);
      toast({
        title: "Keywords Synced!",
        description: `${keywords.length} keywords saved to your master keyword list. ${updatedCount} pest pages analyzed.`,
      });
    } catch (err) {
      toast({ title: "Sync failed", description: err instanceof Error ? err.message : "An unexpected error occurred.", variant: "destructive" });
    } finally {
      setSyncing(false);
    }
  };

  const handleAutoPlace = async () => {
    if (!tenantId || !lastSynced.length) {
      toast({ title: "Sync keywords first", description: "Paste and sync your keywords before auto-placing.", variant: "destructive" });
      return;
    }
    setAutoPlacing(true);

    const pageList = pages.map((p) => `${p.slug} — ${p.label}`).join("\n");
    const prompt = `Given these SEO keywords: ${lastSynced.join(", ")}
And these website pages:
${pageList}

Map each keyword to the best page and placement. Return ONLY valid JSON:
{
  "placements": [
    {
      "keyword": "pest control tyler tx",
      "page_slug": "/tyler-tx",
      "placement_type": "meta_title",
      "suggested_text": "Pest Control Tyler TX | Dang Pest Control"
    }
  ]
}

Rules:
- Primary/money keywords → meta_title (include in page title)
- Secondary keywords → meta_description
- Long-tail local keywords → location pages
- Service keywords → corresponding pest service pages
- Match keyword to the most topically relevant page
- One keyword can appear on multiple pages if highly relevant
- placement_type must be one of: meta_title, meta_description, h1`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 2000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      const text = data.content?.[0]?.text || "";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        const results: Placement[] = (parsed.placements || []).map((p: any) => ({
          keyword: p.keyword,
          page_slug: p.page_slug,
          placement_type: p.placement_type,
          suggested_text: p.suggested_text,
          selected: true,
        }));
        setPlacements(results);

        // Save to keyword_placements table
        const toInsert = results.map((p) => ({
          tenant_id: tenantId,
          keyword: p.keyword,
          page_slug: p.page_slug,
          placement_type: p.placement_type,
          suggested_text: p.suggested_text,
          applied: false,
        }));
        await supabase.from("keyword_placements" as any).upsert(toInsert, {
          onConflict: "tenant_id,keyword,page_slug,placement_type",
        });

        toast({ title: "Auto-placement complete", description: `${results.length} keyword placements suggested.` });
      }
    } catch (err) {
      toast({ title: "Auto-placement failed", description: err instanceof Error ? err.message : String(err), variant: "destructive" });
    } finally {
      setAutoPlacing(false);
    }
  };

  const handleApplySelected = async () => {
    if (!tenantId) return;
    setApplying(true);

    try {
      const selected = placements.filter((p) => p.selected);

      for (const placement of selected) {
        const seoKey = `seo:${placement.page_slug}`;
        const field = placement.placement_type === "meta_title" ? "seo_title" : "seo_description";

        const { data: existing } = await supabase
          .from("site_config")
          .select("id")
          .eq("key", seoKey)
          .eq("tenant_id", tenantId)
          .maybeSingle();

        if (existing) {
          await supabase
            .from("site_config")
            .update({ [field]: placement.suggested_text, updated_at: new Date().toISOString() })
            .eq("key", seoKey)
            .eq("tenant_id", tenantId);
        } else {
          await supabase.from("site_config").insert({
            key: seoKey,
            [field]: placement.suggested_text,
            value: {},
            tenant_id: tenantId,
          });
        }

        await supabase
          .from("keyword_placements" as any)
          .update({ applied: true })
          .eq("tenant_id", tenantId)
          .eq("keyword", placement.keyword)
          .eq("page_slug", placement.page_slug)
          .eq("placement_type", placement.placement_type);
      }

      toast({ title: "Placements applied", description: `${selected.length} keyword placements applied to SEO fields.` });
      setPlacements((prev) => prev.map((p) => (p.selected ? { ...p, selected: false } : p)));
    } catch (err) {
      toast({ title: "Apply failed", description: err instanceof Error ? err.message : "An unexpected error occurred.", variant: "destructive" });
    } finally {
      setApplying(false);
    }
  };

  const togglePlacement = (idx: number) => {
    setPlacements((prev) => prev.map((p, i) => (i === idx ? { ...p, selected: !p.selected } : p)));
  };

  return (
    <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
      <CardHeader>
        <button
          onClick={() => setHelpOpen((v) => !v)}
          className="w-full flex items-center justify-between mb-3 px-0 gap-3 hover:opacity-80 transition-opacity"
          style={{ background: "transparent" }}
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(var(--admin-teal))" }} />
            <span className="font-body text-xs font-semibold" style={{ color: "hsl(var(--admin-teal))" }}>How to use Keyword Power-Box</span>
            <span className="font-body text-xs hidden sm:inline" style={{ color: "hsl(var(--admin-text-muted))" }}>— bulk-sync keywords across all your pest pages at once</span>
          </div>
          {helpOpen
            ? <ChevronUp className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(var(--admin-text-muted))" }} />
            : <ChevronDown className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(var(--admin-text-muted))" }} />
          }
        </button>
        {helpOpen && (
          <div className="grid sm:grid-cols-2 gap-2 mb-4 pb-4 border-b" style={{ borderColor: "hsl(var(--admin-sidebar-border))" }}>
            {[
              { title: "What it does", detail: "Lets you paste a list of keywords once and saves them as your master keyword targets — the single source of truth for what your site is trying to rank for." },
              { title: "How to use it", detail: "Paste a comma-separated list of keywords into the text box (e.g. 'pest control tyler tx, termite inspection, mosquito treatment east texas') then click Sync Keywords." },
              { title: "Where do keywords come from", detail: "Use the AI Keyword Research tool above to generate ideas, then copy the ones you want and paste them here to save them all at once." },
              { title: "What happens when you sync", detail: "Your keywords are saved to the database as your master list. They appear in the Keyword Targets table above and are available site-wide for SEO reference." },
              { title: "How it helps your ranking", detail: "Having a master keyword list keeps your SEO strategy focused. Use these exact phrases in your page titles, meta descriptions, blog posts, and intro text to signal relevance to Google." },
              { title: "How often to update", detail: "Update your keyword list seasonally — before spring (ant/mosquito season) and fall (rodent season). Add new city names as you expand your service area." },
              { title: "Don't over-stuff", detail: "Only add keywords you genuinely plan to use on the site. 10–20 focused, relevant keywords outperform 100 random ones. Quality beats quantity every time." },
              { title: "After syncing", detail: "Go to the SEO tab and update your page meta descriptions to naturally include these keywords. Then use the Blog tab to write content targeting the informational keywords." },
            ].map((item) => (
              <div key={item.title} className="flex gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "hsl(var(--admin-teal))", marginTop: "6px" }} />
                <div>
                  <span className="font-body text-xs font-semibold" style={{ color: "hsl(var(--admin-text))" }}>{item.title}</span>
                  <span className="font-body text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>{" — "}{item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        )}
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
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-body text-xs font-medium" style={{ color: "hsl(var(--admin-text))" }}>
                Last synced keywords:
              </p>
              <Button
                size="sm"
                onClick={handleAutoPlace}
                disabled={autoPlacing}
                className="gap-1.5 font-body text-xs"
                style={{ background: "hsl(var(--admin-indigo))" }}
              >
                {autoPlacing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Bot className="w-3.5 h-3.5" />}
                Auto-Place Keywords
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {lastSynced.map((kw, i) => (
                <Badge key={i} variant="outline" className="font-body text-xs">
                  {kw}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Auto-Placement Results */}
        {placements.length > 0 && (
          <div className="pt-4 space-y-3 border-t" style={{ borderColor: "hsl(var(--admin-sidebar-border))" }}>
            <div className="flex items-center justify-between">
              <p className="font-body text-sm font-medium" style={{ color: "hsl(var(--admin-text))" }}>
                Suggested Placements ({placements.filter((p) => p.selected).length} selected)
              </p>
              <Button
                size="sm"
                onClick={handleApplySelected}
                disabled={applying || !placements.some((p) => p.selected)}
                className="gap-1.5 font-body text-xs"
                style={{ background: "hsl(160, 70%, 35%)" }}
              >
                {applying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
                Apply Selected
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8"></TableHead>
                  <TableHead className="font-body text-xs">Keyword</TableHead>
                  <TableHead className="font-body text-xs">Page</TableHead>
                  <TableHead className="font-body text-xs">Placement</TableHead>
                  <TableHead className="font-body text-xs">Suggested Text</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {placements.map((p, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Checkbox checked={p.selected} onCheckedChange={() => togglePlacement(idx)} />
                    </TableCell>
                    <TableCell className="font-body text-xs font-medium" style={{ color: "hsl(var(--admin-text))" }}>{p.keyword}</TableCell>
                    <TableCell className="font-mono text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>{p.page_slug}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-body text-xs">{p.placement_type}</Badge>
                    </TableCell>
                    <TableCell className="font-body text-xs max-w-[200px] truncate" style={{ color: "hsl(var(--admin-text-muted))" }}>{p.suggested_text}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KeywordPowerBox;
