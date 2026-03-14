import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Save, ArrowLeft, Video, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { serviceKeys, servicesData } from "@/data/servicesData";

interface PageContent {
  id?: string;
  slug: string;
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
  const { toast } = useToast();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    const { data } = await supabase.from("page_content").select("*");
    const existingMap = new Map((data || []).map((d: any) => [d.slug, d]));

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
    setPages(merged);
  };

  const handleEdit = (page: PageContent) => {
    setEditing({ ...page });
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);

    const payload = {
      slug: editing.slug,
      title: editing.title,
      subtitle: editing.subtitle,
      intro: editing.intro,
      video_url: editing.video_url,
      video_type: editing.video_type,
      updated_at: new Date().toISOString(),
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
    setSaving(false);
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
                <CardTitle className="font-body text-sm flex items-center gap-2" style={{ color: "hsl(var(--admin-text))" }}>
                  <FileText className="w-4 h-4" style={{ color: "hsl(var(--admin-indigo))" }} />
                  {defaultData?.subtitle || page.slug}
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
                  <Video className="w-4 h-4" /> Page Video (optional)
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

              <Button onClick={handleSave} disabled={saving} className="gap-2 font-body w-full" style={{ background: "hsl(var(--admin-indigo))" }}>
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentTab;
