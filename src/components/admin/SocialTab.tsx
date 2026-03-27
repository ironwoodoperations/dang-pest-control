import { useState } from "react";
import { useTenant } from "@/hooks/useTenant";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Facebook, Instagram, Star, Plus, Trash2, Send, Clock, CheckCircle2, FileEdit, Sparkles, ArrowLeft, Globe, Eye } from "lucide-react";

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
    image_url: "",
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

type Step = "queue" | "wizard-topic" | "wizard-generating" | "wizard-review" | "wizard-schedule" | "wizard-confirm" | "facebook-preview";

const TOPIC_SUGGESTIONS = [
  "Mosquito control tips for summer",
  "Free termite inspection offer",
  "5-star customer review spotlight",
  "Spring pest prevention checklist",
  "Spider control in East Texas",
];

export default function SocialTab() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<SocialPost[]>(SAMPLE_POSTS);
  const [step, setStep] = useState<Step>("queue");
  const [topic, setTopic] = useState("");
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["facebook", "instagram"]);
  const [scheduledAt, setScheduledAt] = useState("");
  const [previewPost, setPreviewPost] = useState<SocialPost | null>(null);

  const togglePlatform = (key: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setStep("wizard-generating");

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are a social media manager for Dang Pest Control, a family-owned pest control company in Tyler, TX serving East Texas. Write a single engaging Facebook/Instagram post about: "${topic}".

Requirements:
- 2-4 sentences max
- Conversational and friendly tone
- Include 1-2 relevant emojis
- End with a call to action (call us, get a quote, etc.)
- Include 2-3 relevant hashtags at the end
- Phone number if relevant: (903) 871-0550
- Do NOT include quotes around the post, just write the post directly`
          }],
        }),
      });
      const data = await response.json();
      const caption = data.content?.[0]?.text?.trim() || "Great pest control starts with prevention! Contact Dang Pest Control today. #DangPestControl #TylerTX";
      setGeneratedCaption(caption);
      setStep("wizard-review");
    } catch {
      setGeneratedCaption("🐛 Bugs don't take a day off — and neither do we! Dang Pest Control keeps your home pest-free year-round. Call us at (903) 871-0550 or get a free quote online. #DangPestControl #TylerTX #PestControl");
      setStep("wizard-review");
    }
  };

  const handleSchedule = () => {
    if (!scheduledAt) {
      toast({ title: "Please pick a date and time", variant: "destructive" });
      return;
    }
    const newPost: SocialPost = {
      id: Date.now().toString(),
      caption: generatedCaption,
      image_url: "",
      platforms: selectedPlatforms,
      scheduled_at: scheduledAt,
      status: "scheduled",
      created_at: new Date().toISOString(),
    };
    setPosts((prev) => [newPost, ...prev]);
    setPreviewPost(newPost);
    setStep("wizard-confirm");
  };

  const handleViewFacebook = () => {
    setStep("facebook-preview");
  };

  const handleReset = () => {
    setTopic("");
    setGeneratedCaption("");
    setSelectedPlatforms(["facebook", "instagram"]);
    setScheduledAt("");
    setPreviewPost(null);
    setStep("queue");
  };

  const handleDelete = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Post removed" });
  };

  const scheduled = posts.filter((p) => p.status === "scheduled");
  const drafts = posts.filter((p) => p.status === "draft");
  const posted = posts.filter((p) => p.status === "posted");

  // ── FACEBOOK PREVIEW ──────────────────────────────────────────
  if (step === "facebook-preview") {
    return (
      <div className="space-y-4">
        <button onClick={() => setStep("wizard-confirm")} className="flex items-center gap-1.5 text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Fake browser chrome */}
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "hsl(var(--admin-sidebar-border))" }}>
          <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: "#f0f2f5" }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 flex items-center gap-2 bg-white rounded-full px-3 py-1 text-xs font-body mx-4" style={{ color: "#606770" }}>
              <Globe className="w-3 h-3" />
              facebook.com/DangPestControl
            </div>
          </div>

          {/* Facebook UI */}
          <div style={{ background: "#f0f2f5", minHeight: 500 }} className="p-4">
            {/* FB Nav bar */}
            <div className="flex items-center justify-between mb-4 bg-white rounded-xl px-4 py-2 shadow-sm">
              <span className="font-bold text-xl" style={{ color: "#1877F2" }}>facebook</span>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div className="w-8 h-8 rounded-full bg-gray-200" />
              </div>
            </div>

            <div className="max-w-lg mx-auto space-y-3">
              {/* Page header */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="h-20 w-full" style={{ background: "linear-gradient(135deg, hsl(28,100%,50%), hsl(45,95%,52%))" }} />
                <div className="px-4 pb-3 flex items-end gap-3 -mt-8">
                  <div className="w-14 h-14 rounded-full border-2 border-white overflow-hidden bg-white flex items-center justify-center shadow">
                    <span className="font-bold text-lg" style={{ color: "hsl(28,100%,50%)" }}>D!</span>
                  </div>
                  <div className="pb-1">
                    <p className="font-bold text-sm" style={{ color: "#050505" }}>Dang Pest Control</p>
                    <p className="text-xs" style={{ color: "#606770" }}>Pest Control Service · Tyler, TX</p>
                  </div>
                  <button className="ml-auto mb-1 px-3 py-1 rounded text-xs font-bold text-white" style={{ background: "#1877F2" }}>Follow</button>
                </div>
              </div>

              {/* THE POST */}
              <div className="bg-white rounded-xl shadow-sm p-4 border-2" style={{ borderColor: "#1877F2" }}>
                {/* Post header */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: "hsl(28,100%,50%)" }}>D!</div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "#050505" }}>Dang Pest Control</p>
                    <p className="text-xs flex items-center gap-1" style={{ color: "#606770" }}>
                      {previewPost && new Date(previewPost.scheduled_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })} · <Globe className="w-3 h-3" />
                    </p>
                  </div>
                  <Badge className="ml-auto text-xs border-0" style={{ background: "#e7f3ff", color: "#1877F2" }}>Scheduled</Badge>
                </div>

                {/* Caption */}
                <p className="text-sm mb-3" style={{ color: "#050505", lineHeight: 1.6 }}>{previewPost?.caption}</p>

                {/* Divider */}
                <div className="border-t pt-2 flex gap-4" style={{ borderColor: "#e4e6eb" }}>
                  {["👍 Like", "💬 Comment", "↗ Share"].map((action) => (
                    <button key={action} className="flex-1 text-xs font-bold py-1 rounded hover:bg-gray-100 transition-colors" style={{ color: "#606770" }}>
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              {/* Older post (grayed out) */}
              <div className="bg-white rounded-xl shadow-sm p-4 opacity-50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full" style={{ background: "hsl(28,100%,50%)" }} />
                  <div>
                    <p className="font-bold text-xs" style={{ color: "#050505" }}>Dang Pest Control</p>
                    <p className="text-xs" style={{ color: "#606770" }}>Mar 26 · 🌐</p>
                  </div>
                </div>
                <p className="text-xs" style={{ color: "#050505" }}>Did you know termites cause over $5 billion in property damage every year in the US? Protect your home with a FREE termite inspection. 🏠🔍</p>
              </div>
            </div>
          </div>
        </div>

        <Button onClick={handleReset} className="font-body" style={{ background: "hsl(var(--admin-teal))", color: "#fff" }}>
          Back to Social Dashboard
        </Button>
      </div>
    );
  }

  // ── CONFIRM SCREEN ─────────────────────────────────────────────
  if (step === "wizard-confirm") {
    return (
      <div className="space-y-6 max-w-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "hsla(140,55%,42%,0.15)" }}>
            <CheckCircle2 className="w-5 h-5" style={{ color: "hsl(140,55%,42%)" }} />
          </div>
          <div>
            <h2 className="text-xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>Post Scheduled!</h2>
            <p className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
              Your post will go live on {previewPost && new Date(previewPost.scheduled_at).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" })}
            </p>
          </div>
        </div>

        <Card style={{ background: "hsl(var(--admin-card-bg))", borderColor: "hsl(var(--admin-sidebar-border))" }} className="border rounded-2xl">
          <CardContent className="pt-4 space-y-3">
            <div className="flex gap-2">
              {PLATFORMS.filter((p) => previewPost?.platforms.includes(p.key)).map(({ key, icon: Icon, color, label }) => (
                <span key={key} className="flex items-center gap-1 text-xs font-body font-semibold px-2 py-1 rounded-full" style={{ background: `${color}18`, color }}>
                  <Icon className="w-3 h-3" /> {label}
                </span>
              ))}
            </div>
            <p className="text-sm font-body" style={{ color: "hsl(var(--admin-text))" }}>{previewPost?.caption}</p>
            <p className="text-xs font-body flex items-center gap-1" style={{ color: "hsl(var(--admin-text-muted))" }}>
              <Clock className="w-3 h-3" />
              {previewPost && new Date(previewPost.scheduled_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
            </p>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button onClick={handleViewFacebook} className="font-body gap-2" style={{ background: "#1877F2", color: "#fff" }}>
            <Eye className="w-4 h-4" /> Preview on Facebook
          </Button>
          <Button onClick={handleReset} variant="outline" className="font-body" style={{ borderColor: "hsl(var(--admin-sidebar-border))", color: "hsl(var(--admin-text))" }}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // ── SCHEDULE PICKER ────────────────────────────────────────────
  if (step === "wizard-schedule") {
    return (
      <div className="space-y-6 max-w-xl">
        <button onClick={() => setStep("wizard-review")} className="flex items-center gap-1.5 text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h2 className="text-xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>Schedule Your Post</h2>

        <Card style={{ background: "hsl(var(--admin-card-bg))", borderColor: "hsl(var(--admin-sidebar-border))" }} className="border rounded-2xl">
          <CardContent className="pt-5 space-y-4">
            <div>
              <p className="text-xs font-body font-semibold mb-2 uppercase tracking-wider" style={{ color: "hsl(var(--admin-text-muted))" }}>Post to</p>
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
                    <Icon className="w-3.5 h-3.5" /> {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-body font-semibold mb-2 uppercase tracking-wider" style={{ color: "hsl(var(--admin-text-muted))" }}>Date & Time</p>
              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                className="rounded-xl border px-3 py-2 text-sm font-body focus:outline-none w-full"
                style={{
                  background: "hsl(var(--admin-bg))",
                  borderColor: "hsl(var(--admin-sidebar-border))",
                  color: "hsl(var(--admin-text))",
                }}
              />
            </div>

            <div className="pt-1 flex gap-2">
              <Button onClick={handleSchedule} className="font-body gap-2" style={{ background: "hsl(var(--admin-teal))", color: "#fff" }}>
                <Send className="w-4 h-4" /> Confirm & Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── REVIEW GENERATED POST ──────────────────────────────────────
  if (step === "wizard-review") {
    return (
      <div className="space-y-6 max-w-xl">
        <button onClick={() => setStep("wizard-topic")} className="flex items-center gap-1.5 text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div>
          <h2 className="text-xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>Review Your Post</h2>
          <p className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>AI-generated from your topic. Edit as needed.</p>
        </div>

        <Card style={{ background: "hsl(var(--admin-card-bg))", borderColor: "hsl(var(--admin-sidebar-border))" }} className="border rounded-2xl">
          <CardContent className="pt-5">
            <textarea
              value={generatedCaption}
              onChange={(e) => setGeneratedCaption(e.target.value)}
              rows={6}
              className="w-full rounded-xl border px-3 py-2 text-sm font-body resize-none focus:outline-none focus:ring-2"
              style={{
                background: "hsl(var(--admin-bg))",
                borderColor: "hsl(var(--admin-sidebar-border))",
                color: "hsl(var(--admin-text))",
              }}
            />
            <p className="text-xs mt-1" style={{ color: "hsl(var(--admin-text-muted))" }}>{generatedCaption.length} characters</p>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button onClick={() => setStep("wizard-schedule")} className="font-body gap-2" style={{ background: "hsl(var(--admin-teal))", color: "#fff" }}>
            <Clock className="w-4 h-4" /> Schedule This Post
          </Button>
          <Button onClick={handleGenerate} variant="outline" className="font-body gap-2" style={{ borderColor: "hsl(var(--admin-sidebar-border))", color: "hsl(var(--admin-text))" }}>
            <Sparkles className="w-4 h-4" /> Regenerate
          </Button>
        </div>
      </div>
    );
  }

  // ── GENERATING ─────────────────────────────────────────────────
  if (step === "wizard-generating") {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center animate-pulse" style={{ background: "hsla(185,65%,42%,0.15)" }}>
          <Sparkles className="w-6 h-6" style={{ color: "hsl(185,65%,42%)" }} />
        </div>
        <p className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>Writing your post with AI...</p>
      </div>
    );
  }

  // ── TOPIC INPUT ────────────────────────────────────────────────
  if (step === "wizard-topic") {
    return (
      <div className="space-y-6 max-w-xl">
        <button onClick={handleReset} className="flex items-center gap-1.5 text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div>
          <h2 className="text-xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>What's this post about?</h2>
          <p className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Enter a topic, promotion, or paste a webpage URL — AI will write the post.</p>
        </div>

        <Card style={{ background: "hsl(var(--admin-card-bg))", borderColor: "hsl(var(--admin-sidebar-border))" }} className="border rounded-2xl">
          <CardContent className="pt-5 space-y-4">
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. 'Mosquito season is starting — promote our monthly treatment plan' or paste a URL"
              rows={3}
              className="w-full rounded-xl border px-3 py-2 text-sm font-body resize-none focus:outline-none focus:ring-2"
              style={{
                background: "hsl(var(--admin-bg))",
                borderColor: "hsl(var(--admin-sidebar-border))",
                color: "hsl(var(--admin-text))",
              }}
            />

            <div>
              <p className="text-xs font-body mb-2" style={{ color: "hsl(var(--admin-text-muted))" }}>Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {TOPIC_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setTopic(s)}
                    className="text-xs px-3 py-1 rounded-full border font-body transition-all hover:border-current"
                    style={{
                      borderColor: "hsl(var(--admin-sidebar-border))",
                      color: "hsl(var(--admin-text-muted))",
                      background: topic === s ? "hsla(185,65%,42%,0.1)" : "transparent",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!topic.trim()}
              className="font-body gap-2 w-full"
              style={{ background: "hsl(var(--admin-teal))", color: "#fff" }}
            >
              <Sparkles className="w-4 h-4" /> Generate Post with AI
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── MAIN QUEUE ─────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>Social Media</h2>
          <p className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Compose, schedule, and manage posts across all platforms.</p>
        </div>
        <Button onClick={() => setStep("wizard-topic")} className="font-body gap-2" style={{ background: "hsl(var(--admin-teal))", color: "#fff" }}>
          <Plus className="w-4 h-4" /> New Post
        </Button>
      </div>

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

      <Card style={{ background: "hsl(var(--admin-card-bg))", borderColor: "hsl(var(--admin-sidebar-border))" }} className="border rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="font-body text-base" style={{ color: "hsl(var(--admin-text))" }}>Post Queue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {posts.map((post) => {
            const statusStyle = STATUS_STYLES[post.status];
            return (
              <div key={post.id} className="flex gap-3 p-3 rounded-xl border" style={{ borderColor: "hsl(var(--admin-sidebar-border))", background: "hsl(var(--admin-bg))" }}>
                <div className="flex flex-col gap-1 pt-0.5 shrink-0">
                  {PLATFORMS.filter((p) => post.platforms.includes(p.key)).map(({ key, icon: Icon, color }) => (
                    <Icon key={key} className="w-4 h-4" style={{ color }} />
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body line-clamp-2 mb-1" style={{ color: "hsl(var(--admin-text))" }}>{post.caption}</p>
                  {post.scheduled_at && (
                    <p className="text-xs font-body flex items-center gap-1" style={{ color: "hsl(var(--admin-text-muted))" }}>
                      <Clock className="w-3 h-3" />
                      {new Date(post.scheduled_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <Badge className="font-body text-xs border-0 rounded-full px-2" style={{ background: `${statusStyle.color}22`, color: statusStyle.color }}>
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
