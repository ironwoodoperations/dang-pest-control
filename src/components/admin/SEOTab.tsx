import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, BarChart3, Globe, Plus, Trash2, Save, FileText, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Keyword {
  keyword: string;
  volume: string;
  difficulty: string;
  notes: string;
}

interface PageSEO {
  slug: string;
  meta_title: string;
  meta_description: string;
}

const difficultyColors: Record<string, string> = {
  Low: "bg-[hsl(160,70%,92%)] text-[hsl(160,70%,35%)]",
  Medium: "bg-[hsl(234,85%,95%)] text-[hsl(234,85%,50%)]",
  High: "bg-destructive/15 text-destructive",
};

const defaultPages: PageSEO[] = [
  { slug: "home", meta_title: "", meta_description: "" },
  { slug: "about", meta_title: "", meta_description: "" },
  { slug: "quote", meta_title: "", meta_description: "" },
  { slug: "pest-control", meta_title: "", meta_description: "" },
  { slug: "termite-control", meta_title: "", meta_description: "" },
  { slug: "ant-control", meta_title: "", meta_description: "" },
  { slug: "spider-control", meta_title: "", meta_description: "" },
  { slug: "rodent-control", meta_title: "", meta_description: "" },
  { slug: "scorpion-control", meta_title: "", meta_description: "" },
  { slug: "bed-bug-control", meta_title: "", meta_description: "" },
  { slug: "roach-control", meta_title: "", meta_description: "" },
  { slug: "flea-tick-control", meta_title: "", meta_description: "" },
  { slug: "wasp-control", meta_title: "", meta_description: "" },
  { slug: "snake-control", meta_title: "", meta_description: "" },
];

const SEOTab = () => {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [pages, setPages] = useState<PageSEO[]>(defaultPages);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [showAddKeyword, setShowAddKeyword] = useState(false);
  const [editingPage, setEditingPage] = useState<PageSEO | null>(null);
  const [newKw, setNewKw] = useState<Keyword>({ keyword: "", volume: "", difficulty: "Medium", notes: "" });
  const { toast } = useToast();

  useEffect(() => {
    const fetchSEO = async () => {
      const { data } = await supabase.from("site_config").select("key, value");
      if (data) {
        for (const row of data) {
          if (row.key === "seo_keywords") {
            setKeywords((row.value as unknown as Keyword[]) || []);
          } else if (row.key === "seo_pages") {
            const saved = (row.value as unknown as PageSEO[]) || [];
            // Merge saved with defaults
            const merged = defaultPages.map((dp) => {
              const found = saved.find((s) => s.slug === dp.slug);
              return found || dp;
            });
            setPages(merged);
          }
        }
      }
      setLoading(false);
    };
    fetchSEO();
  }, []);

  const saveToConfig = async (key: string, value: unknown) => {
    setSaving(key);
    const jsonValue = JSON.parse(JSON.stringify(value));
    const { data: existing } = await supabase.from("site_config").select("id").eq("key", key);
    if (existing && existing.length > 0) {
      await supabase.from("site_config").update({ value: jsonValue, updated_at: new Date().toISOString() }).eq("key", key);
    } else {
      await supabase.from("site_config").insert({ key, value: jsonValue });
    }
    toast({ title: "Saved!" });
    setSaving(null);
  };

  const addKeyword = () => {
    if (!newKw.keyword.trim()) return;
    const updated = [...keywords, newKw];
    setKeywords(updated);
    saveToConfig("seo_keywords", updated);
    setNewKw({ keyword: "", volume: "", difficulty: "Medium", notes: "" });
    setShowAddKeyword(false);
  };

  const removeKeyword = (idx: number) => {
    const updated = keywords.filter((_, i) => i !== idx);
    setKeywords(updated);
    saveToConfig("seo_keywords", updated);
  };

  const savePageSEO = () => {
    if (!editingPage) return;
    const updated = pages.map((p) => (p.slug === editingPage.slug ? editingPage : p));
    setPages(updated);
    saveToConfig("seo_pages", updated);
    setEditingPage(null);
  };

  if (loading) return <p className="font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Loading...</p>;

  return (
    <div className="space-y-6">
      <h2 className="font-body text-2xl font-bold" style={{ color: "hsl(var(--admin-text))" }}>SEO Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-body font-medium" style={{ color: "hsl(var(--admin-text-muted))" }}>Target Keywords</CardTitle>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(234, 85%, 95%)", color: "hsl(234, 85%, 60%)" }}>
              <Search className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>{keywords.length}</div>
          </CardContent>
        </Card>
        <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-body font-medium" style={{ color: "hsl(var(--admin-text-muted))" }}>Pages Configured</CardTitle>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(160, 70%, 92%)", color: "hsl(160, 70%, 40%)" }}>
              <Globe className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>
              {pages.filter((p) => p.meta_title || p.meta_description).length} / {pages.length}
            </div>
          </CardContent>
        </Card>
        <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-body font-medium" style={{ color: "hsl(var(--admin-text-muted))" }}>Analytics</CardTitle>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(28, 100%, 93%)", color: "hsl(28, 100%, 50%)" }}>
              <BarChart3 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Connect Google Analytics</p>
          </CardContent>
        </Card>
      </div>

      {/* Keyword Tracker */}
      <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-body text-lg" style={{ color: "hsl(var(--admin-text))" }}>Keyword Targets</CardTitle>
            <CardDescription className="font-body">Track your target keywords and their metrics</CardDescription>
          </div>
          <Button size="sm" className="gap-1 font-body" style={{ background: "hsl(var(--admin-indigo))" }} onClick={() => setShowAddKeyword(true)}>
            <Plus className="w-4 h-4" /> Add Keyword
          </Button>
        </CardHeader>
        <CardContent>
          {keywords.length === 0 ? (
            <p className="text-center py-8 font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>
              No keywords tracked yet. Add your first keyword target above.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-body">Keyword</TableHead>
                  <TableHead className="font-body">Volume</TableHead>
                  <TableHead className="font-body">Difficulty</TableHead>
                  <TableHead className="font-body">Notes</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywords.map((kw, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-body font-medium" style={{ color: "hsl(var(--admin-text))" }}>{kw.keyword}</TableCell>
                    <TableCell className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>{kw.volume || "—"}</TableCell>
                    <TableCell>
                      <Badge className={`font-body border-0 text-xs ${difficultyColors[kw.difficulty] || ""}`}>{kw.difficulty}</Badge>
                    </TableCell>
                    <TableCell className="font-body text-sm max-w-[200px] truncate" style={{ color: "hsl(var(--admin-text-muted))" }}>{kw.notes || "—"}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => removeKeyword(idx)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Page Meta Editor */}
      <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
        <CardHeader>
          <div>
            <CardTitle className="font-body text-lg" style={{ color: "hsl(var(--admin-text))" }}>Page Meta Tags</CardTitle>
            <CardDescription className="font-body">Set meta title and description for each page</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {pages.map((page) => (
              <div
                key={page.slug}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => setEditingPage({ ...page })}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" style={{ color: "hsl(var(--admin-text-muted))" }} />
                  <div>
                    <p className="font-body font-medium text-sm" style={{ color: "hsl(var(--admin-text))" }}>/{page.slug}</p>
                    <p className="text-xs font-body truncate max-w-[400px]" style={{ color: "hsl(var(--admin-text-muted))" }}>
                      {page.meta_title || "No meta title set"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {(page.meta_title || page.meta_description) ? (
                    <Badge className="bg-[hsl(160,70%,92%)] text-[hsl(160,70%,35%)] border-0 text-xs font-body">Configured</Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs font-body">Not set</Badge>
                  )}
                  <Edit className="w-4 h-4" style={{ color: "hsl(var(--admin-text-muted))" }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Keyword Dialog */}
      <Dialog open={showAddKeyword} onOpenChange={setShowAddKeyword}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-body" style={{ color: "hsl(var(--admin-text))" }}>Add Keyword Target</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-body" style={{ color: "hsl(var(--admin-text))" }}>Keyword *</Label>
              <Input value={newKw.keyword} onChange={(e) => setNewKw({ ...newKw, keyword: e.target.value })} placeholder="e.g. pest control near me" className="font-body" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="font-body" style={{ color: "hsl(var(--admin-text))" }}>Monthly Volume</Label>
                <Input value={newKw.volume} onChange={(e) => setNewKw({ ...newKw, volume: e.target.value })} placeholder="e.g. 8,100" className="font-body" />
              </div>
              <div className="space-y-2">
                <Label className="font-body" style={{ color: "hsl(var(--admin-text))" }}>Difficulty</Label>
                <Select value={newKw.difficulty} onValueChange={(v) => setNewKw({ ...newKw, difficulty: v })}>
                  <SelectTrigger className="font-body"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-body" style={{ color: "hsl(var(--admin-text))" }}>Notes</Label>
              <Input value={newKw.notes} onChange={(e) => setNewKw({ ...newKw, notes: e.target.value })} placeholder="Optional notes" className="font-body" />
            </div>
            <Button onClick={addKeyword} className="w-full gap-2 font-body" style={{ background: "hsl(var(--admin-indigo))" }}>
              <Plus className="w-4 h-4" /> Add Keyword
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Page Meta Dialog */}
      <Dialog open={!!editingPage} onOpenChange={(open) => !open && setEditingPage(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-body" style={{ color: "hsl(var(--admin-text))" }}>
              Edit Meta — /{editingPage?.slug}
            </DialogTitle>
          </DialogHeader>
          {editingPage && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="font-body" style={{ color: "hsl(var(--admin-text))" }}>Meta Title</Label>
                <Input
                  value={editingPage.meta_title}
                  onChange={(e) => setEditingPage({ ...editingPage, meta_title: e.target.value })}
                  placeholder="Page title for search engines (max 60 chars)"
                  maxLength={60}
                  className="font-body"
                />
                <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>{editingPage.meta_title.length}/60 characters</p>
              </div>
              <div className="space-y-2">
                <Label className="font-body" style={{ color: "hsl(var(--admin-text))" }}>Meta Description</Label>
                <Textarea
                  value={editingPage.meta_description}
                  onChange={(e) => setEditingPage({ ...editingPage, meta_description: e.target.value })}
                  placeholder="Page description for search results (max 160 chars)"
                  maxLength={160}
                  className="font-body"
                />
                <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>{editingPage.meta_description.length}/160 characters</p>
              </div>
              {/* Google Preview */}
              <div className="space-y-1 p-3 rounded-lg bg-muted/30">
                <p className="text-xs font-body font-medium" style={{ color: "hsl(var(--admin-text-muted))" }}>Google Preview</p>
                <p className="text-sm font-body" style={{ color: "hsl(234, 85%, 50%)" }}>{editingPage.meta_title || "Page Title"}</p>
                <p className="text-xs font-body" style={{ color: "hsl(160, 70%, 35%)" }}>dangpestcontrol.com/{editingPage.slug}</p>
                <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>{editingPage.meta_description || "No description set."}</p>
              </div>
              <Button onClick={savePageSEO} className="w-full gap-2 font-body" style={{ background: "hsl(var(--admin-indigo))" }}>
                <Save className="w-4 h-4" /> Save Meta Tags
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SEOTab;
