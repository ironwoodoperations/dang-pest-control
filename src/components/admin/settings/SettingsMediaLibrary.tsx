import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Copy, Trash2, Image, Film } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaFile {
  name: string;
  url: string;
  type: string;
  created_at: string;
}

const SettingsMediaLibrary = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage.from("videos").list("media", {
        sortBy: { column: "created_at", order: "desc" },
      });
      if (!error && data) {
        const mediaFiles: MediaFile[] = data
          .filter((f) => f.name !== ".emptyFolderPlaceholder")
          .map((f) => {
            const { data: urlData } = supabase.storage.from("videos").getPublicUrl(`media/${f.name}`);
            return {
              name: f.name,
              url: urlData.publicUrl,
              type: f.metadata?.mimetype || (f.name.match(/\.(mp4|webm|mov)$/i) ? "video" : "image"),
              created_at: f.created_at || "",
            };
          });
        setFiles(mediaFiles);
      }
    } catch (err) {
      console.error("Failed to fetch media files:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setUploading(true);

    try {
      for (const file of Array.from(e.target.files)) {
        const path = `media/${Date.now()}-${file.name}`;
        const { error } = await supabase.storage.from("videos").upload(path, file);
        if (error) {
          toast({ title: "Upload failed", description: `${file.name}: ${error.message}`, variant: "destructive" });
        }
      }
      toast({ title: "Upload complete!" });
      e.target.value = "";
      fetchFiles();
    } catch (err) {
      toast({ title: "Upload failed", description: err instanceof Error ? err.message : "An unexpected error occurred.", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({ title: "URL copied!", description: "Paste it into Hero Media, page content, or blog posts." });
  };

  const deleteFile = async (name: string) => {
    const { error } = await supabase.storage.from("videos").remove([`media/${name}`]);
    if (!error) {
      toast({ title: "Deleted" });
      fetchFiles();
    }
  };

  const isVideo = (name: string) => /\.(mp4|webm|mov|avi)$/i.test(name);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-display text-lg tracking-wide uppercase" style={{ color: "hsl(var(--admin-text))" }}>
          Media Library
        </h3>
        <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
          Upload images or videos, then copy the URL to use in Hero Media, page content, or anywhere else.
        </p>
      </div>

      <div className="space-y-2">
        <Label className="font-body text-sm">Upload Files</Label>
        <Input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleUpload}
          disabled={uploading}
          className="font-body"
        />
        {uploading && (
          <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Uploading...</p>
        )}
      </div>

      {loading ? (
        <p className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Loading media...</p>
      ) : files.length === 0 ? (
        <Card className="p-6 text-center" style={{ background: "hsl(var(--admin-card-bg))" }}>
          <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: "hsl(var(--admin-text-muted))" }} />
          <p className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
            No media uploaded yet. Upload images or videos above.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {files.map((file) => (
            <Card
              key={file.name}
              className="p-3 flex items-start gap-3"
              style={{ background: "hsl(var(--admin-card-bg))" }}
            >
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 overflow-hidden"
                style={{ background: "hsl(var(--admin-accent-light))" }}
              >
                {isVideo(file.name) ? (
                  <Film className="w-6 h-6" style={{ color: "hsl(var(--admin-teal))" }} />
                ) : (
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover rounded-lg" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-body font-medium truncate" style={{ color: "hsl(var(--admin-text))" }}>
                  {file.name.replace(/^\d+-/, "")}
                </p>
                <p className="text-[10px] font-body truncate mt-0.5" style={{ color: "hsl(var(--admin-text-muted))" }}>
                  {file.url}
                </p>
                <div className="flex gap-1.5 mt-1.5">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 px-2 text-[10px] font-body gap-1"
                    onClick={() => copyUrl(file.url)}
                  >
                    <Copy className="w-3 h-3" /> Copy URL
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 px-2 text-[10px] font-body gap-1 hover:text-destructive"
                    onClick={() => deleteFile(file.name)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SettingsMediaLibrary;
