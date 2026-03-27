import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTenant } from "@/hooks/useTenant";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Facebook, Instagram, Star, Plus, Trash2, Send, Clock, CheckCircle2, FileEdit } from "lucide-react";

interface SocialPost {
  id: string;
  caption: string;
  image_url: string;
  platforms: string[];
  scheduled_at: string;
  status: "draft" | "scheduled" | "posted";
  created_at: string;
}

const PLATFORMS = [
  { key: "facebook", label: "Facebook", icon: Facebook, color: "#1877F2" },
  { key: "instagram", label: "Instagram", icon: Instagram, color: "#E1306C" },
  { key: "google", label: "Google Business", icon: Star, color: "#FBBC05" },
];

const STATUS_STYLES: Record<string, { label: string; color: string }> = {
  draft: { label: "Draft", color: "hsl(45, 95%, 52%)" },
  scheduled: { label: "Scheduled", color: "hsl(185, 65%, 42%)" },
  posted: { label: "Posted", color: "hsl(140, 55%, 42%)" },
};

const SAMPLE_POSTS: SocialPost[] = [
  {
    id: "1",
    caption: "🦟 Mosquito season is here! Don't let bugs ruin your backyard fun. Our Super Powered mosquito treatments keep your yard bite-free all season long. Call us today! #DangPestControl #TylerTX #MosquitoControl",
    image_url: "https://www.dangpestcontrol.com/wp-content/uploads/2025/05/mosquito-control-tyler-tx.jpg",
    platforms: ["facebook", "instagram"],
    scheduled_at: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
    status: "scheduled",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    caption: "⭐ Another 5-star review from a happy customer in Longview! 'Kirk and his team were professional, thorough, and the results speak for themselves.' Thank you for trusting Dang Pest Control! #CustomerLove #EastTexas",
    image_url: "",
    platforms: ["facebook", "google"],
    scheduled_at: new Date(Date.now() + 172800000).toISOString().slice(0, 16),
    status: "scheduled",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    caption: "Did you know termites cause over $5 billion in property damage every year in the US? Protect your home with a FREE termite inspection from Dang Pest Control. Link in bio! 🏠🔍",
    image_url: "",
    platforms: ["facebook", "instagram", "google"],
    scheduled_at: new Date(Date.now() - 86400000).toISOString().slice(0, 16),
    status: "posted",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    caption: "Spring special: Get your first general pest control treatment for just $49. Covering ants, spiders, roaches, and more. Serving Tyler, Longview, Jacksonville & surrounding East Texas communities.",
    image_url: "",
    platforms: ["facebook"],
    scheduled_at: "",
    status: "draft",
    created_at: new Date().toISOString(),
  },
];

export default function SocialTab() {
  const { tenantId } = useTenant();
  const { toast } = useToast();
  const [posts, setPosts] = useState<SocialPost[]>(SAMPLE_POSTS);
  const [showComposer, setShowComposer] = useState(false);
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["facebook"]);
  const [scheduledAt, setScheduledAt] = useState("");
  const [saving, setSaving] = useState(false);

  const togglePlatform = (key: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  const handleSave = (status: "draft" | "scheduled") => {
    if (!caption.trim()) {
      toast({ title: "Caption required", variant: "destructive" });
      return;
    }
    if (status === "scheduled" && !scheduledAt) {
      toast({ title: "Please pick a schedule date/time", variant: "destructive" });
      return;
    }
    setSaving(true);
    const newPost: SocialPost = {
      id: Date.now().toString(),
      caption,
      image_url: imageUrl,
      platforms: selectedPlatforms,
      scheduled_at: scheduledAt,
      status,
      created_at: new Date().toISOString(),
    };
    setTimeout(() => {
      setPosts((prev) => [newPost, ...prev]);
      setCaption("");
      setImageUrl("");
      setSelectedPlatforms(["facebook"]);
      setScheduledAt("");
      setShowComposer(false);
      setSaving(false);
      toast({ title: status === "draft" ? "Saved as draft" : "Post scheduled!" });
    }, 600);
  };

  const handleDelete = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Post removed" });
  };

  const scheduled = posts.filter((p) => p.status === "scheduled");
  const drafts = posts.filter((p) => p.status === "draft");
  const posted = posts.filter((p) => p.status === "posted");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>
            Social Media
          </h2>
          <p className="text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>
            Compose, schedule, and manage posts across all platforms.
          </p>
        </div>
        <Button
          onClick={() => setShowComposer((v) => !v)}
          className="font-body gap-2"
          style={{ background: "hsl(var(--admin-teal))", color: "#fff" }}
        >
          <Plus className="w-4 h-4" /> New Post
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Scheduled", count: scheduled.length, color: "hsl(185, 65%, 42%)", icon: Clock },
          { label: "Drafts", count: drafts.length, color: "hsl(45, 95%, 52%)", icon: FileEdit },
          { label: "Posted", count: posted.length, color: "hsl(140, 55%, 42%)", icon: CheckCircle2 },
        ].map(({ label, count, color, icon: Icon }) => (
          <Card key={label} style={{ background: "hsl(var(--admin-card-bg))", borderColor: "hsl(var(--admin-sidebar-border))" }} className="border rounded-2xl">
            <CardContent className="pt-5 pb-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}22` }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <div>
                <p className="text-2xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>{count}</p>
                <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Composer */}
      {showComposer && (
        <Card style={{ background: "hsl(var(--admin-card-bg))", borderColor: "hsl(var(--admin-sidebar-border))" }} className="border rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="font-body text-base" style={{ color: "hsl(var(--admin-text))" }}>Compose Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Platform toggles */}
            <div className="flex gap-2 flex-wrap">
              {PLATFORMS.map(({ key, label, icon: Icon, color }) => (
                <button
                  key={key}
                  onClick={() => togglePlatform(key)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-semibold border transition-all"
                  style={{
                    borderColor: selectedPlatforms.includes(key) ? color : "hsl(var(--admin-sidebar-border))",
                    background: selectedPlatforms.includes(key) ? `${color}18` : "transparent",
                    color: selectedPlatforms.includes(key) ? color : "hsl(var(--admin-text-muted))",
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>

            {/* Caption */}
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write your post caption..."
              rows={4}
              className="w-full rounded-xl border px-3 py-2 text-sm font-body resize-none focus:outline-none focus:ring-2"
              style={{
                background: "hsl(var(--admin-bg))",
                borderColor: "hsl(var(--admin-sidebar-border))",
                color: "hsl(var(--admin-text))",
              }}
            />

            {/* Image URL */}
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Image URL (optional)"
              className="w-full rounded-xl border px-3 py-2 text-sm font-body focus:outline-none focus:ring-2"
              style={{
                background: "hsl(var(--admin-bg))",
                borderColor: "hsl(var(--admin-sidebar-border))",
                color: "hsl(var(--admin-text))",
              }}
            />

            {/* Schedule time */}
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 shrink-0" style={{ color: "hsl(var(--admin-text-muted))" }} />
              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                className="rounded-xl border px-3 py-2 text-sm font-body focus:outline-none"
                style={{
                  background: "hsl(var(--admin-bg))",
                  borderColor: "hsl(var(--admin-sidebar-border))",
                  color: "hsl(var(--admin-text))",
                }}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <Button
                onClick={() => handleSave("scheduled")}
                disabled={saving}
                className="font-body gap-2"
                style={{ background: "hsl(var(--admin-teal))", color: "#fff" }}
              >
                <Send className="w-4 h-4" /> Schedule
              </Button>
              <Button
                onClick={() => handleSave("draft")}
                disabled={saving}
                variant="outline"
                className="font-body"
                style={{ borderColor: "hsl(var(--admin-sidebar-border))", color: "hsl(var(--admin-text))" }}
              >
                Save Draft
              </Button>
              <Button
                onClick={() => setShowComposer(false)}
                variant="ghost"
                className="font-body ml-auto"
                style={{ color: "hsl(var(--admin-text-muted))" }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Post Queue */}
      <Card style={{ background: "hsl(var(--admin-card-bg))", borderColor: "hsl(var(--admin-sidebar-border))" }} className="border rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="font-body text-base" style={{ color: "hsl(var(--admin-text))" }}>Post Queue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {posts.length === 0 && (
            <p className="text-sm font-body text-center py-6" style={{ color: "hsl(var(--admin-text-muted))" }}>
              No posts yet. Click "New Post" to get started.
            </p>
          )}
          {posts.map((post) => {
            const statusStyle = STATUS_STYLES[post.status];
            return (
              <div
                key={post.id}
                className="flex gap-3 p-3 rounded-xl border"
                style={{ borderColor: "hsl(var(--admin-sidebar-border))", background: "hsl(var(--admin-bg))" }}
              >
                {/* Platform icons */}
                <div className="flex flex-col gap-1 pt-0.5 shrink-0">
                  {PLATFORMS.filter((p) => post.platforms.includes(p.key)).map(({ key, icon: Icon, color }) => (
                    <Icon key={key} className="w-4 h-4" style={{ color }} />
                  ))}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body line-clamp-2 mb-1" style={{ color: "hsl(var(--admin-text))" }}>
                    {post.caption}
                  </p>
                  {post.scheduled_at && (
                    <p className="text-xs font-body flex items-center gap-1" style={{ color: "hsl(var(--admin-text-muted))" }}>
                      <Clock className="w-3 h-3" />
                      {new Date(post.scheduled_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                    </p>
                  )}
                </div>

                {/* Status + delete */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <Badge
                    className="font-body text-xs border-0 rounded-full px-2"
                    style={{ background: `${statusStyle.color}22`, color: statusStyle.color }}
                  >
                    {statusStyle.label}
                  </Badge>
                  <button onClick={() => handleDelete(post.id)} className="opacity-40 hover:opacity-100 transition-opacity">
                    <Trash2 className="w-3.5 h-3.5" style={{ color: "hsl(var(--admin-text-muted))" }} />
                  </button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
