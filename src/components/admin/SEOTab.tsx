import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTenant } from "@/hooks/useTenant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Globe, Plus, Trash2, Save, ExternalLink, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Keyword {
  keyword: string;
  volume: string;
  difficulty: string;
  notes: string;
}

interface PageSEO {
  slug: string;
  label: string;
  meta_title: string;
  meta_description: string;
  status: "live" | "draft";
}

const allSitePages: Omit<PageSEO, "meta_title" | "meta_description" | "status">[] = [
  { slug: "/", label: "Home" },
  { slug: "/about", label: "About Us" },
  { slug: "/quote", label: "Get a Quote" },
  { slug: "/contact", label: "Contact" },
  { slug: "/service-area", label: "Service Area" },
  { slug: "/reviews", label: "Reviews" },
  { slug: "/blog", label: "Blog" },
  { slug: "/faq", label: "FAQ" },
  { slug: "/accessibility", label: "Accessibility" },
  { slug: "/pest-control", label: "General Pest Control" },
  { slug: "/termite-control", label: "Termite Control" },
  { slug: "/termite-inspections", label: "Termite Inspections" },
  { slug: "/ant-control", label: "Ant Control" },
  { slug: "/spider-control", label: "Spider Control" },
  { slug: "/wasp-hornet-control", label: "Wasp & Hornet Control" },
  { slug: "/scorpion-control", label: "Scorpion Control" },
  { slug: "/rodent-control", label: "Rodent Control" },
  { slug: "/mosquito-control", label: "Mosquito Control" },
  { slug: "/flea-tick-control", label: "Flea & Tick Control" },
  { slug: "/roach-control", label: "Roach Control" },
  { slug: "/bed-bug-control", label: "Bed Bug Control" },
  { slug: "/snake-control", label: "Snake Control" },
  { slug: "/longview-tx", label: "Longview, TX" },
  { slug: "/jacksonville-tx", label: "Jacksonville, TX" },
  { slug: "/lindale-tx", label: "Lindale, TX" },
  { slug: "/bullard-tx", label: "Bullard, TX" },
  { slug: "/whitehouse-tx", label: "Whitehouse, TX" },
];

const statusColors: Record<string, string> = {
  live: "bg-[hsl(160,70%,92%)] text-[hsl(160,70%,35%)]",
  draft: "bg-[hsl(40,100%,92%)] text-[hsl(40,100%,35%)]",
};

const statusLabels: Record<string, string> = {
  live: "Live",
  draft: "Draft",
};

const difficultyColors: Record<string, string> = {
  Low: "bg-[hsl(160,70%,92%)] text-[hsl(160,70%,35%)]",
  Medium: "bg-[hsl(234,85%,95%)] text-[hsl(234,85%,50%)]",
  High: "bg-destructive/15 text-destructive",
};

const SEOTab = () => {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [pages, setPages] = useState<PageSEO[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddKeyword, setShowAddKeyword] = useState(false);
  const [editingPage, setEditingPage] = useState<PageSEO | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [newKw, setNewKw] = useState<Keyword>({ keyword: "", volume: "", difficulty: "Medium", notes: "" });
  const { toast } = useToast();

  useEffect(() => {
    const fetchSEO = async () => {
      const { data } = await supabase.from("site_config").select("key, value");
      const savedPages: PageSEO[] = [];
      let savedKeywords: Keyword[] = [];
      if (data) {
        for (const row of data) {
          if (row.key === "seo_keywords") savedKeywords = (row.value as unknown as Keyword[]) || [];
          if (row.key === "seo_pages") {
            const raw = (row.value as unknown as PageSEO[]) || [];
            savedPages.push(...raw);
          }
        }
      }
      // Merge defaults with saved, migrating old ranking_status to status
      const merged = allSitePages.map((p) => {
        const found = savedPages.find((s) => s.slug === p.slug);
        if (found) {
          // Migrate old ranking_status field if present
          const legacy = found as PageSEO & { ranking_status?: string };
          if (!found.status && legacy.ranking_status) {
            return { ...found, status: legacy.ranking_status === "indexed" ? "live" as const : "draft" as const };
          }
          return found;
        }
        return { ...p, meta_title: "", meta_description: "", status: "draft" as const };
      });
      setPages(merged);
      setKeywords(savedKeywords);
      setLoading(false);
    };
    fetchSEO();
  }, []);

  const saveToConfig = async (key: string, value: unknown) => {
    setSaving(true);
    const jsonValue = JSON.parse(JSON.stringify(value));
    const { data: existing } = await supabase.from("site_config").select("id").eq("key", key);
    if (existing && existing.length > 0) {
      await supabase.from("site_config").update({ value: jsonValue, updated_at: new Date().toISOString() }).eq("key", key);
    } else {
      await supabase.from("site_config").insert({ key, value: jsonValue });
    }
    toast({ title: "Saved!" });
    setSaving(false);
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

  const filteredPages = pages.filter((p) => {
    const matchesSearch = p.label.toLowerCase().includes(searchQuery.toLowerCase()) || p.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const liveCount = pages.filter((p) => p.status === "live").length;
  const configuredCount = pages.filter((p) => p.meta_title || p.meta_description).length;

  if (loading) return <p className="font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Loading...</p>;

  return (
    <div className="space-y-6">
      <h2 className="font-body text-2xl font-bold" style={{ color: "hsl(var(--admin-text))" }}>SEO Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-body font-medium" style={{ color: "hsl(var(--admin-text-muted))" }}>Total Pages</CardTitle>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(234, 85%, 95%)", color: "hsl(234, 85%, 60%)" }}>
              <Globe className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>{pages.length}</div>
          </CardContent>
        </Card>
        <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-body font-medium" style={{ color: "hsl(var(--admin-text-muted))" }}>Live</CardTitle>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(160, 70%, 92%)", color: "hsl(160, 70%, 40%)" }}>
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>{liveCount} / {pages.length}</div>
          </CardContent>
        </Card>
        <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-body font-medium" style={{ color: "hsl(var(--admin-text-muted))" }}>SEO Configured</CardTitle>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(28, 100%, 93%)", color: "hsl(28, 100%, 50%)" }}>
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>{configuredCount} / {pages.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Pages Table */}
      <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <CardTitle className="font-body text-lg" style={{ color: "hsl(var(--admin-text))" }}>All Pages</CardTitle>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "hsl(var(--admin-text-muted))" }} />
                <Input
                  placeholder="Search pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 font-body"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36 font-body"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-body pl-6">Page</TableHead>
                <TableHead className="font-body">URL</TableHead>
                <TableHead className="font-body">Status</TableHead>
                <TableHead className="font-body">SEO</TableHead>
                <TableHead className="font-body text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPages.map((page) => (
                <TableRow key={page.slug} className="cursor-pointer" onClick={() => setEditingPage({ ...page })}>
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-body"
                        style={{ background: "hsl(var(--admin-indigo-light))", color: "hsl(var(--admin-indigo))" }}
                      >
                        {page.label.charAt(0)}
                      </div>
                      <p className="font-body font-medium text-sm" style={{ color: "hsl(var(--admin-text))" }}>{page.label}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-body text-xs font-mono" style={{ color: "hsl(var(--admin-text-muted))" }}>{page.slug}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={`font-body border-0 text-xs ${statusColors[page.status]}`}>
                      {statusLabels[page.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {page.meta_title || page.meta_description ? (
                      <Badge className="bg-[hsl(160,70%,92%)] text-[hsl(160,70%,35%)] border-0 text-xs font-body">Configured</Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs font-body">
                        <AlertCircle className="w-3 h-3 mr-1" /> Not set
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5 font-body text-xs"
                      onClick={(e) => { e.stopPropagation(); setEditingPage({ ...page }); }}
                    >
                      <ExternalLink className="w-3 h-3" /> Edit Meta Tags
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredPages.length === 0 && (
            <p className="text-center py-8 font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>
              No pages match your search.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Side Drawer for editing SEO */}
      <Sheet open={!!editingPage} onOpenChange={(open) => { if (!open) setEditingPage(null); }}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto" style={{ background: "hsl(var(--admin-bg))" }}>
          {editingPage && (
            <div className="space-y-6 py-4">
              <SheetHeader>
                <SheetTitle className="font-body text-xl" style={{ color: "hsl(var(--admin-text))" }}>
                  {editingPage.label}
                </SheetTitle>
                <p className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>
                  dangpestcontrol.com{editingPage.slug}
                </p>
              </SheetHeader>

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
                  <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
                    {editingPage.meta_title.length}/60 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="font-body" style={{ color: "hsl(var(--admin-text))" }}>Meta Description</Label>
                  <Textarea
                    value={editingPage.meta_description}
                    onChange={(e) => setEditingPage({ ...editingPage, meta_description: e.target.value })}
                    placeholder="Page description for search results (max 160 chars)"
                    maxLength={160}
                    className="font-body"
                    rows={3}
                  />
                  <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
                    {editingPage.meta_description.length}/160 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="font-body" style={{ color: "hsl(var(--admin-text))" }}>Status</Label>
                  <Select value={editingPage.status} onValueChange={(v) => setEditingPage({ ...editingPage, status: v as PageSEO["status"] })}>
                    <SelectTrigger className="font-body"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Google Preview */}
              <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
                <CardHeader className="pb-2">
                  <CardTitle className="font-body text-sm" style={{ color: "hsl(var(--admin-text))" }}>Google Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <p className="text-sm font-body" style={{ color: "hsl(234, 85%, 50%)" }}>
                    {editingPage.meta_title || "Page Title"}
                  </p>
                  <p className="text-xs font-body" style={{ color: "hsl(160, 70%, 35%)" }}>
                    dangpestcontrol.com{editingPage.slug}
                  </p>
                  <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
                    {editingPage.meta_description || "No description set."}
                  </p>
                </CardContent>
              </Card>

              <Button onClick={savePageSEO} className="w-full gap-2 font-body" style={{ background: "hsl(var(--admin-indigo))" }} disabled={saving}>
                <Save className="w-4 h-4" /> Save Changes
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Keyword Tracker */}
      <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-body text-lg" style={{ color: "hsl(var(--admin-text))" }}>Keyword Targets</CardTitle>
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
                  <TableHead className="font-body w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywords.map((kw, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-body font-medium" style={{ color: "hsl(var(--admin-text))" }}>{kw.keyword}</TableCell>
                    <TableCell className="font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>{kw.volume || "—"}</TableCell>
                    <TableCell>
                      <Badge className={`border-0 text-xs font-body ${difficultyColors[kw.difficulty] || ""}`}>{kw.difficulty}</Badge>
                    </TableCell>
                    <TableCell className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>{kw.notes || "—"}</TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost" onClick={() => removeKeyword(idx)}>
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

      {/* Add Keyword Dialog */}
      <Dialog open={showAddKeyword} onOpenChange={setShowAddKeyword}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-body">Add Keyword Target</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-body">Keyword</Label>
              <Input value={newKw.keyword} onChange={(e) => setNewKw({ ...newKw, keyword: e.target.value })} className="font-body" placeholder="e.g. pest control tyler tx" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-body">Monthly Volume</Label>
                <Input value={newKw.volume} onChange={(e) => setNewKw({ ...newKw, volume: e.target.value })} className="font-body" placeholder="e.g. 1,200" />
              </div>
              <div className="space-y-2">
                <Label className="font-body">Difficulty</Label>
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
              <Label className="font-body">Notes</Label>
              <Textarea value={newKw.notes} onChange={(e) => setNewKw({ ...newKw, notes: e.target.value })} className="font-body" rows={2} />
            </div>
            <Button onClick={addKeyword} className="w-full gap-2 font-body" style={{ background: "hsl(var(--admin-indigo))" }}>
              <Plus className="w-4 h-4" /> Add Keyword
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SEOTab;
