import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTenant } from "@/hooks/useTenant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Save, ArrowLeft, Video, FileText, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { serviceKeys, servicesData } from "@/data/servicesData";
import PageHelpBanner from "./PageHelpBanner";

const nonServicePages = [
  { slug: "/", label: "Home" },
  { slug: "/about", label: "About Us" },
  { slug: "/contact", label: "Contact" },
  { slug: "/quote", label: "Get a Quote" },
  { slug: "/faq", label: "FAQ" },
  { slug: "/blog", label: "Blog" },
  { slug: "/reviews", label: "Reviews" },
  { slug: "/service-area", label: "Service Area" },
];

interface PageContent {
  id?: string;
  slug: string;
  label?: string;
  title: string | null;
  subtitle: string | null;
  intro: string | null;
  video_url: string | null;
  video_type: string;
}

const ContentTab = () => {
  const [pages, setPages] = useState<PageContent[]>([]);
  const [editing, setEditing] = useState<PageContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [hasSnapshot, setHasSnapshot] = useState(false);
  const { toast } = useToast();
  const { tenantId } = useTenant();

  // Ensure page_snapshots table exists
  const migrationRan = useRef(false);
  useEffect(() => {
    if (!tenantId || migrationRan.current) return;
    migrationRan.current = true;
    supabase.rpc("exec_sql" as any, {
      query: `CREATE TABLE IF NOT EXISTS page_snapshots (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        tenant_id uuid NOT NULL,
        page_slug text NOT NULL,
        snapshot_type text NOT NULL DEFAULT 'content',
        snapshot_data jsonb NOT NULL,
        created_at timestamptz DEFAULT now(),
        UNIQUE(tenant_id, page_slug, snapshot_type)
      );`
    }).then(() => {});
  }, [tenantId]);

  // Save original snapshot if none exists when editing starts
  const saveSnapshotIfNeeded = async (page: PageContent) => {
    if (!tenantId || !page.id) { setHasSnapshot(false); return; }
    const { data: existing } = await supabase
      .from("page_snapshots" as any)
      .select("id")
      .eq("tenant_id", tenantId)
      .eq("page_slug", page.slug)
      .eq("snapshot_type", "content")
      .maybeSingle();

    if (existing) {
      setHasSnapshot(true);
      return;
    }

    // Save initial content as snapshot
    await supabase.from("page_snapshots" as any).insert({
      tenant_id: tenantId,
      page_slug: page.slug,
      snapshot_type: "content",
      snapshot_data: { title: page.title, subtitle: page.subtitle, intro: page.intro, video_url: page.video_url, video_type: page.video_type },
    });
    setHasSnapshot(true);
  };

  const handleRevertContent = async () => {
    if (!editing || !tenantId) return;
    const { data: snapshot } = await supabase
      .from("page_snapshots" as any)
      .select("snapshot_data")
      .eq("tenant_id", tenantId)
      .eq("page_slug", editing.slug)
      .eq("snapshot_type", "content")
      .single();

    if (!snapshot) {
      toast({ title: "No original found", description: "No snapshot exists for this page.", variant: "destructive" });
      return;
    }

    const d = (snapshot as any).snapshot_data;
    const reverted = { ...editing, title: d.title, subtitle: d.subtitle, intro: d.intro, video_url: d.video_url, video_type: d.video_type || "youtube" };
    setEditing(reverted);
    toast({ title: "Restored original content", description: "Click Save to apply." });
  };

  useEffect(() => {
    fetchPages();
  }, [tenantId]);

  const fetchPages = async () => {
    if (!tenantId) return;
    const { data } = await supabase.from("page_content").select("*").eq("tenant_id", tenantId);
    const existingMap = new Map((data || []).map((d: any) => [d.slug, d]));

    // Build non-service page entries
    const nonServiceMerged = nonServicePages.map((p) => {
      const existing = existingMap.get(p.slug);
      return {
        id: existing?.id,
        slug: p.slug,
        label: p.label,
        title: existing?.title || null,
        subtitle: existing?.subtitle || null,
        intro: existing?.intro || null,
        video_url: existing?.video_url || null,
        video_type: existing?.video_type || "youtube",
      };
    });

    // Merge with all service keys so every page shows up
    const merged = serviceKeys.map((key) => {
      const existing = existingMap.get(key);
      return {
        id: existing?.id,
        slug: key,
        title: existing?.title || null,
        subtitle: existing?.subtitle || null,
        intro: existing?.intro || null,
        video_url: existing?.video_url || null,
        video_type: existing?.video_type || "youtube",
      };
    });
    setPages([...nonServiceMerged, ...merged]);
  };

  const handleEdit = (page: PageContent) => {
    setEditing({ ...page });
    saveSnapshotIfNeeded(page);
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);

    try {
      const payload = {
        slug: editing.slug,
        title: editing.title,
        subtitle: editing.subtitle,
        intro: editing.intro,
        video_url: editing.video_url,
        video_type: editing.video_type,
        updated_at: new Date().toISOString(),
        tenant_id: tenantId,
      };

      let error;
      if (editing.id) {
        ({ error } = await supabase.from("page_content").update(payload).eq("id", editing.id));
      } else {
        ({ error } = await supabase.from("page_content").insert(payload));
      }

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Saved!", description: `${editing.slug} content updated.` });
        setEditing(null);
        fetchPages();
      }
    } catch (err) {
      toast({ title: "Save failed", description: err instanceof Error ? err.message : "An unexpected error occurred.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !editing) return;
    const file = e.target.files[0];
    setUploading(true);

    const path = `${editing.slug}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("videos").upload(path, file);

    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } else {
      const { data: urlData } = supabase.storage.from("videos").getPublicUrl(path);
      setEditing({ ...editing, video_url: urlData.publicUrl, video_type: "upload" });
      toast({ title: "Video uploaded!" });
    }
    setUploading(false);
  };

  return (
    <div className="space-y-6">
      <PageHelpBanner tab="content" />
      <h2 className="font-body text-2xl font-bold" style={{ color: "hsl(var(--admin-text))" }}>
        Page Content Manager
      </h2>
      <p className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>
        Edit content and add videos to individual pest/service pages.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map((page) => {
          const defaultData = servicesData[page.slug];
          return (
            <Card
              key={page.slug}
              className="cursor-pointer hover:shadow-md transition-shadow"
              style={{ background: "hsl(var(--admin-card-bg))" }}
              onClick={() => handleEdit(page)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="font-body text-sm flex items-center gap-2" style={{ color: "hsl(var(--admin-orange))" }}>
                  <FileText className="w-4 h-4" style={{ color: "hsl(var(--admin-orange))" }} />
                  {page.label || defaultData?.subtitle || page.slug}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
                  {page.id ? "✏️ Custom content set" : "📄 Using default content"}
                </p>
                {page.video_url && (
                  <p className="text-xs font-body mt-1 flex items-center gap-1" style={{ color: "hsl(var(--admin-indigo))" }}>
                    <Video className="w-3 h-3" /> Video added
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-body flex items-center gap-2">
              <button onClick={() => setEditing(null)}>
                <ArrowLeft className="w-4 h-4" />
              </button>
              Edit: {editing?.slug}
            </DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label className="font-body">Page Title (leave blank to use default)</Label>
                <Input
                  value={editing.title || ""}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value || null })}
                  placeholder={servicesData[editing.slug]?.title || "Page title..."}
                />
              </div>

              <div className="space-y-2">
                <Label className="font-body">Subtitle</Label>
                <Input
                  value={editing.subtitle || ""}
                  onChange={(e) => setEditing({ ...editing, subtitle: e.target.value || null })}
                  placeholder={servicesData[editing.slug]?.subtitle || "Subtitle..."}
                />
              </div>

              <div className="space-y-2">
                <Label className="font-body">Intro Text</Label>
                <Textarea
                  value={editing.intro || ""}
                  onChange={(e) => setEditing({ ...editing, intro: e.target.value || null })}
                  placeholder={servicesData[editing.slug]?.intro?.slice(0, 100) + "..." || "Intro text..."}
                  rows={5}
                />
              </div>

              {/* Video Section */}
              <div className="space-y-3 p-4 rounded-lg border">
                <Label className="font-body font-semibold flex items-center gap-2">
                  <Video className="w-4 h-4" /> Intro Image Video — shows play button on the pest photo
                </Label>

                <div className="space-y-2">
                  <Label className="font-body text-sm">Video Source</Label>
                  <Select
                    value={editing.video_type}
                    onValueChange={(v) => setEditing({ ...editing, video_type: v, video_url: "" })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="youtube">YouTube Link</SelectItem>
                      <SelectItem value="upload">File Upload</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {editing.video_type === "youtube" ? (
                  <div className="space-y-2">
                    <Label className="font-body text-sm">YouTube URL</Label>
                    <Input
                      value={editing.video_url || ""}
                      onChange={(e) => setEditing({ ...editing, video_url: e.target.value || null })}
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Upload Video File</Label>
                    <Input type="file" accept="video/*" onChange={handleVideoUpload} disabled={uploading} />
                    {uploading && <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Uploading...</p>}
                    {editing.video_url && editing.video_type === "upload" && (
                      <p className="text-xs font-body truncate" style={{ color: "hsl(var(--admin-indigo))" }}>
                        ✅ {editing.video_url.split("/").pop()}
                      </p>
                    )}
                  </div>
                )}

                {editing.video_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-body"
                    onClick={() => setEditing({ ...editing, video_url: null })}
                  >
                    Remove Video
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                {hasSnapshot && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="gap-2 font-body" style={{ borderColor: "hsl(40, 100%, 50%)", color: "hsl(40, 80%, 35%)" }}>
                        <RotateCcw className="w-4 h-4" /> Revert to Original
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Restore original content?</AlertDialogTitle>
                        <AlertDialogDescription>Your changes will be lost. The form will be populated with the original content — click Save to apply.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleRevertContent}>Restore</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                <Button onClick={handleSave} disabled={saving} className="gap-2 font-body flex-1" style={{ background: "hsl(var(--admin-indigo))" }}>
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentTab;
