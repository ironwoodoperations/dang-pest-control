import { useState } from "react";
import { useTenant } from "@/hooks/useTenant";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Facebook, Instagram, Star, Plus, Trash2, Send, Clock, CheckCircle2, FileEdit, Sparkles, ArrowLeft, Globe, Eye } from "lucide-react";
import PageHelpBanner from "./PageHelpBanner";

interface SocialPost {
  id: string;
  caption: string;
  image_url: string;
  template_id: string;
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

const TOPIC_SUGGESTIONS = [
  "Mosquito control tips for summer",
  "Free termite inspection offer",
  "5-star customer review spotlight",
  "Spring pest prevention checklist",
  "Spider control in East Texas",
];

// SVG Templates
const TEMPLATES = [
  {
    id: "orange-bold",
    label: "Bold Promo",
    svg: (caption: string) => `
      <svg width="600" height="600" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.15)"/>
          </pattern>
        </defs>
        <rect width="600" height="600" fill="hsl(28,100%,50%)"/>
        <rect width="600" height="600" fill="url(#dots)"/>
        <rect x="0" y="0" width="600" height="8" fill="hsl(45,95%,52%)"/>
        <rect x="0" y="592" width="600" height="8" fill="hsl(45,95%,52%)"/>
        <text x="300" y="80" text-anchor="middle" font-size="52" font-weight="900" fill="white" letter-spacing="-1">DANG!</text>
        <text x="300" y="108" text-anchor="middle" font-size="14" fill="rgba(255,255,255,0.8)" letter-spacing="4">PEST CONTROL</text>
        <rect x="40" y="130" width="520" height="3" fill="hsl(45,95%,52%)"/>
        <foreignObject x="40" y="155" width="520" height="320">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:22px;font-weight:700;color:white;line-height:1.45;word-wrap:break-word;">${caption.slice(0, 180)}${caption.length > 180 ? "…" : ""}</div>
        </foreignObject>
        <rect x="40" y="490" width="520" height="3" fill="hsl(45,95%,52%)"/>
        <text x="300" y="530" text-anchor="middle" font-size="18" font-weight="700" fill="hsl(45,95%,52%)">(903) 871-0550</text>
        <text x="300" y="560" text-anchor="middle" font-size="14" fill="rgba(255,255,255,0.7)">dangpestcontrol.com</text>
      </svg>`,
  },
  {
    id: "yellow-card",
    label: "Yellow Feature",
    svg: (caption: string) => `
      <svg width="600" height="600" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
        <rect width="600" height="600" fill="hsl(45,95%,52%)"/>
        <rect x="0" y="0" width="600" height="180" fill="hsl(28,100%,50%)"/>
        <circle cx="300" cy="90" r="55" fill="rgba(255,255,255,0.15)"/>
        <text x="300" y="72" text-anchor="middle" font-size="42" font-weight="900" fill="white">DANG!</text>
        <text x="300" y="96" text-anchor="middle" font-size="12" fill="rgba(255,255,255,0.85)" letter-spacing="3">SUPER POWERED PEST CONTROL</text>
        <text x="300" y="130" text-anchor="middle" font-size="11" fill="rgba(255,255,255,0.7)">Tyler, TX · (903) 871-0550</text>
        <rect x="30" y="195" width="540" height="340" rx="16" fill="white" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.12))"/>
        <foreignObject x="50" y="215" width="500" height="290">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:21px;font-weight:600;color:#1a1a1a;line-height:1.5;word-wrap:break-word;">${caption.slice(0, 180)}${caption.length > 180 ? "…" : ""}</div>
        </foreignObject>
        <rect x="30" y="548" width="540" height="36" rx="18" fill="hsl(28,100%,50%)"/>
        <text x="300" y="571" text-anchor="middle" font-size="14" font-weight="700" fill="white">Get Your Free Quote Today →</text>
      </svg>`,
  },
  {
    id: "dark-pro",
    label: "Dark Pro",
    svg: (caption: string) => `
      <svg width="600" height="600" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
        <defs>
          <pattern id="grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
          </pattern>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0d1117"/>
            <stop offset="100%" stop-color="#1a2332"/>
          </linearGradient>
        </defs>
        <rect width="600" height="600" fill="url(#grad)"/>
        <rect width="600" height="600" fill="url(#grid)"/>
        <rect x="0" y="0" width="6" height="600" fill="hsl(28,100%,50%)"/>
        <rect x="0" y="0" width="600" height="6" fill="hsl(28,100%,50%)"/>
        <text x="50" y="80" font-size="40" font-weight="900" fill="hsl(28,100%,50%)">DANG!</text>
        <text x="50" y="102" font-size="11" fill="rgba(255,255,255,0.5)" letter-spacing="3">PEST CONTROL · TYLER TX</text>
        <rect x="50" y="120" width="500" height="2" fill="rgba(255,120,20,0.4)"/>
        <foreignObject x="50" y="145" width="500" height="320">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:22px;font-weight:600;color:white;line-height:1.5;word-wrap:break-word;">${caption.slice(0, 180)}${caption.length > 180 ? "…" : ""}</div>
        </foreignObject>
        <rect x="50" y="488" width="500" height="2" fill="rgba(255,120,20,0.4)"/>
        <rect x="50" y="508" width="200" height="44" rx="8" fill="hsl(28,100%,50%)"/>
        <text x="150" y="535" text-anchor="middle" font-size="15" font-weight="700" fill="white">Call Now</text>
        <text x="370" y="526" font-size="16" font-weight="700" fill="hsl(45,95%,52%)">(903) 871-0550</text>
        <text x="370" y="546" font-size="12" fill="rgba(255,255,255,0.4)">dangpestcontrol.com</text>
      </svg>`,
  },
  {
    id: "split-clean",
    label: "Clean Split",
    svg: (caption: string) => `
      <svg width="600" height="600" xmlns="http://www.w3.org/2000/svg" font-family="Arial, sans-serif">
        <rect width="600" height="600" fill="white"/>
        <rect width="600" height="220" fill="hsl(28,100%,50%)"/>
        <defs>
          <pattern id="d2" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="rgba(255,255,255,0.18)"/>
          </pattern>
        </defs>
        <rect width="600" height="220" fill="url(#d2)"/>
        <polygon points="0,220 600,170 600,220" fill="hsl(45,95%,52%)"/>
        <text x="300" y="95" text-anchor="middle" font-size="58" font-weight="900" fill="white" letter-spacing="-2">DANG!</text>
        <text x="300" y="125" text-anchor="middle" font-size="13" fill="rgba(255,255,255,0.85)" letter-spacing="4">PEST CONTROL</text>
        <text x="300" y="158" text-anchor="middle" font-size="13" fill="rgba(255,255,255,0.7)">Tyler, TX · Family Owned Since 2018</text>
        <foreignObject x="40" y="240" width="520" height="260">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:21px;font-weight:600;color:#1a1a1a;line-height:1.5;word-wrap:break-word;">${caption.slice(0, 160)}${caption.length > 160 ? "…" : ""}</div>
        </foreignObject>
        <rect x="0" y="540" width="600" height="60" fill="hsl(28,100%,50%)"/>
        <text x="300" y="564" text-anchor="middle" font-size="14" font-weight="700" fill="white">(903) 871-0550  ·  dangpestcontrol.com</text>
        <text x="300" y="585" text-anchor="middle" font-size="11" fill="rgba(255,255,255,0.7)">Super Powered Pest Control · East Texas</text>
      </svg>`,
  },
];

type Step = "queue" | "wizard-topic" | "wizard-generating" | "wizard-review" | "wizard-template" | "wizard-schedule" | "wizard-confirm" | "facebook-preview";

const SvgCard = ({ templateId, caption, size = 200 }: { templateId: string; caption: string; size?: number }) => {
  const t = TEMPLATES.find((t) => t.id === templateId);
  if (!t) return null;
  const svg = t.svg(caption);
  const encoded = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  return <img src={encoded} width={size} height={size} style={{ borderRadius: 8, display: "block" }} alt="Post graphic" />;
};

const SAMPLE_POSTS: SocialPost[] = [
  {
    id: "1",
    caption: "🦟 Mosquito season is here! Don't let bugs ruin your backyard fun. Our Super Powered mosquito treatments keep your yard bite-free all season long. Call us today! #DangPestControl #TylerTX",
    image_url: "",
    template_id: "orange-bold",
    platforms: ["facebook", "instagram"],
    scheduled_at: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
    status: "scheduled",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    caption: "⭐ Another 5-star review from a happy customer in Longview! 'Kirk and his team were professional, thorough, and the results speak for themselves.' Thank you! #CustomerLove #EastTexas",
    image_url: "",
    template_id: "yellow-card",
    platforms: ["facebook", "google"],
    scheduled_at: new Date(Date.now() + 172800000).toISOString().slice(0, 16),
    status: "scheduled",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    caption: "Did you know termites cause over $5 billion in property damage every year in the US? Protect your home with a FREE termite inspection from Dang Pest Control. 🏠🔍",
    image_url: "",
    template_id: "dark-pro",
    platforms: ["facebook", "instagram", "google"],
    scheduled_at: new Date(Date.now() - 86400000).toISOString().slice(0, 16),
    status: "posted",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    caption: "Spring special: Get your first general pest control treatment for just $49. Covering ants, spiders, roaches, and more. Serving Tyler, Longview, Jacksonville & surrounding East Texas.",
    image_url: "",
    template_id: "split-clean",
    platforms: ["facebook"],
    scheduled_at: "",
    status: "draft",
    created_at: new Date().toISOString(),
  },
];

export default function SocialTab() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<SocialPost[]>(SAMPLE_POSTS);
  const [step, setStep] = useState<Step>("queue");
  const [topic, setTopic] = useState("");
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("orange-bold");
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
            content: `You are a social media manager for Dang Pest Control, a family-owned pest control company in Tyler, TX serving East Texas. Write a single engaging Facebook/Instagram post about: "${topic}". Requirements: 2-4 sentences max, conversational and friendly tone, include 1-2 relevant emojis, end with a call to action, include 2-3 relevant hashtags at the end, phone number if relevant: (903) 871-0550. Do NOT include quotes, just write the post directly.`
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
    if (!scheduledAt) { toast({ title: "Please pick a date and time", variant: "destructive" }); return; }
    const newPost: SocialPost = {
      id: Date.now().toString(),
      caption: generatedCaption,
      image_url: "",
      template_id: selectedTemplate,
      platforms: selectedPlatforms,
      scheduled_at: scheduledAt,
      status: "scheduled",
      created_at: new Date().toISOString(),
    };
    setPosts((prev) => [newPost, ...prev]);
    setPreviewPost(newPost);
    setStep("wizard-confirm");
  };

  const handleDelete = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Post removed" });
  };

  const handleReset = () => {
    setTopic(""); setGeneratedCaption(""); setSelectedTemplate("orange-bold");
    setSelectedPlatforms(["facebook", "instagram"]); setScheduledAt("");
    setPreviewPost(null); setStep("queue");
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
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "hsl(var(--admin-sidebar-border))" }}>
          <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: "#e4e6eb" }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 flex items-center gap-2 bg-white rounded-full px-3 py-1 text-xs font-body mx-4" style={{ color: "#606770" }}>
              <Globe className="w-3 h-3" /> facebook.com/DangPestControl
            </div>
          </div>
          <div style={{ background: "#f0f2f5", minHeight: 560 }} className="p-4">
            <div className="flex items-center justify-between mb-4 bg-white rounded-xl px-4 py-2 shadow-sm">
              <span className="font-bold text-xl" style={{ color: "#1877F2" }}>facebook</span>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div className="w-8 h-8 rounded-full bg-gray-200" />
              </div>
            </div>
            <div className="max-w-lg mx-auto space-y-3">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="h-20 w-full" style={{ background: "linear-gradient(135deg, hsl(28,100%,50%), hsl(45,95%,52%))" }} />
                <div className="px-4 pb-3 flex items-end gap-3 -mt-8">
                  <div className="w-14 h-14 rounded-full border-2 border-white bg-white flex items-center justify-center shadow">
                    <span className="font-bold text-lg" style={{ color: "hsl(28,100%,50%)" }}>D!</span>
                  </div>
                  <div className="pb-1">
                    <p className="font-bold text-sm" style={{ color: "#050505" }}>Dang Pest Control</p>
                    <p className="text-xs" style={{ color: "#606770" }}>Pest Control Service · Tyler, TX</p>
                  </div>
                  <button className="ml-auto mb-1 px-3 py-1 rounded text-xs font-bold text-white" style={{ background: "#1877F2" }}>Follow</button>
                </div>
              </div>

              {/* THE POST with graphic */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border-2" style={{ borderColor: "#1877F2" }}>
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: "hsl(28,100%,50%)" }}>D!</div>
                    <div>
                      <p className="font-bold text-sm" style={{ color: "#050505" }}>Dang Pest Control</p>
                      <p className="text-xs flex items-center gap-1" style={{ color: "#606770" }}>
                        {previewPost && new Date(previewPost.scheduled_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })} · <Globe className="w-3 h-3" />
                      </p>
                    </div>
                    <Badge className="ml-auto text-xs border-0" style={{ background: "#e7f3ff", color: "#1877F2" }}>Scheduled</Badge>
                  </div>
                  <p className="text-sm mb-3" style={{ color: "#050505", lineHeight: 1.6 }}>{previewPost?.caption}</p>
                </div>
                {/* Graphic */}
                {previewPost && (
                  <div style={{ width: "100%", lineHeight: 0 }}>
                    <SvgCard templateId={previewPost.template_id} caption={previewPost.caption} size={500} />
                  </div>
                )}
                <div className="p-3 border-t flex gap-4" style={{ borderColor: "#e4e6eb" }}>
                  {["👍 Like", "💬 Comment", "↗ Share"].map((action) => (
                    <button key={action} className="flex-1 text-xs font-bold py-1 rounded hover:bg-gray-100 transition-colors" style={{ color: "#606770" }}>{action}</button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden opacity-50">
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full" style={{ background: "hsl(28,100%,50%)" }} />
                    <div><p className="font-bold text-xs" style={{ color: "#050505" }}>Dang Pest Control</p><p className="text-xs" style={{ color: "#606770" }}>Mar 26 · 🌐</p></div>
                  </div>
                  <p className="text-xs mb-2" style={{ color: "#050505" }}>Did you know termites cause over $5 billion in property damage every year? Get a FREE inspection today. 🏠🔍</p>
                </div>
                <SvgCard templateId="dark-pro" caption="Did you know termites cause over $5 billion in property damage every year? Get a FREE inspection today." size={500} />
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

  // ── CONFIRM ────────────────────────────────────────────────────
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
              Going live {previewPost && new Date(previewPost.scheduled_at).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" })}
            </p>
          </div>
        </div>
        <Card style={{ background: "hsl(var(--admin-card-bg))", borderColor: "hsl(var(--admin-sidebar-border))" }} className="border rounded-2xl overflow-hidden">
          <CardContent className="pt-4 space-y-3">
            <div className="flex gap-2">
              {PLATFORMS.filter((p) => previewPost?.platforms.includes(p.key)).map(({ key, icon: Icon, color, label }) => (
                <span key={key} className="flex items-center gap-1 text-xs font-body font-semibold px-2 py-1 rounded-full" style={{ background: `${color}18`, color }}>
                  <Icon className="w-3 h-3" /> {label}
                </span>
              ))}
            </div>
            <p className="text-sm font-body" style={{ color: "hsl(var(--admin-text))" }}>{previewPost?.caption}</p>
            {previewPost && <SvgCard templateId={previewPost.template_id} caption={previewPost.caption} size={280} />}
            <p className="text-xs font-body flex items-center gap-1" style={{ color: "hsl(var(--admin-text-muted))" }}>
              <Clock className="w-3 h-3" />
              {previewPost && new Date(previewPost.scheduled_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
            </p>
          </CardContent>
        </Card>
        <div className="flex gap-3">
          <Button onClick={() => setStep("facebook-preview")} className="font-body gap-2" style={{ background: "#1877F2", color: "#fff" }}>
            <Eye className="w-4 h-4" /> Preview on Facebook
          </Button>
          <Button onClick={handleReset} variant="outline" className="font-body" style={{ borderColor: "hsl(var(--admin-sidebar-border))", color: "hsl(var(--admin-text))" }}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // ── SCHEDULE ───────────────────────────────────────────────────
  if (step === "wizard-schedule") {
    return (
      <div className="space-y-6 max-w-xl">
        <button onClick={() => setStep("wizard-template")} className="flex items-center gap-1.5 text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h2 className="text-xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>Schedule Your Post</h2>
        <Card style={{ background: "hsl(var(--admin-card-bg))", borderColor: "hsl(var(--admin-sidebar-border))" }} className="border rounded-2xl">
          <CardContent className="pt-5 space-y-4">
            <div>
              <p className="text-xs font-body font-semibold mb-2 uppercase tracking-wider" style={{ color: "hsl(var(--admin-text-muted))" }}>Post to</p>
              <div className="flex gap-2 flex-wrap">
                {PLATFORMS.map(({ key, label, icon: Icon, color }) => (
                  <button key={key} onClick={() => togglePlatform(key)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-semibold border transition-all"
                    style={{ borderColor: selectedPlatforms.includes(key) ? color : "hsl(var(--admin-sidebar-border))", background: selectedPlatforms.includes(key) ? `${color}18` : "transparent", color: selectedPlatforms.includes(key) ? color : "hsl(var(--admin-text-muted))" }}>
                    <Icon className="w-3.5 h-3.5" /> {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-body font-semibold mb-2 uppercase tracking-wider" style={{ color: "hsl(var(--admin-text-muted))" }}>Date & Time</p>
              <input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)}
                className="rounded-xl border px-3 py-2 text-sm font-body focus:outline-none w-full"
                style={{ background: "hsl(var(--admin-bg))", borderColor: "hsl(var(--admin-sidebar-border))", color: "hsl(var(--admin-text))" }} />
            </div>
            <Button onClick={handleSchedule} className="font-body gap-2" style={{ background: "hsl(var(--admin-teal))", color: "#fff" }}>
              <Send className="w-4 h-4" /> Confirm & Schedule
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── TEMPLATE PICKER ────────────────────────────────────────────
  if (step === "wizard-template") {
    return (
      <div className="space-y-6">
        <button onClick={() => setStep("wizard-review")} className="flex items-center gap-1.5 text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div>
          <h2 className="text-xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>Pick a Template</h2>
          <p className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Choose a branded graphic for your post.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {TEMPLATES.map((t) => (
            <button key={t.id} onClick={() => setSelectedTemplate(t.id)}
              className="rounded-2xl overflow-hidden border-2 transition-all text-left"
              style={{ borderColor: selectedTemplate === t.id ? "hsl(28,100%,50%)" : "hsl(var(--admin-sidebar-border))", boxShadow: selectedTemplate === t.id ? "0 0 0 3px hsla(28,100%,50%,0.2)" : "none" }}>
              <SvgCard templateId={t.id} caption={generatedCaption} size={260} />
              <div className="px-3 py-2 flex items-center justify-between" style={{ background: "hsl(var(--admin-card-bg))" }}>
                <span className="text-xs font-body font-semibold" style={{ color: "hsl(var(--admin-text))" }}>{t.label}</span>
                {selectedTemplate === t.id && <CheckCircle2 className="w-4 h-4" style={{ color: "hsl(28,100%,50%)" }} />}
              </div>
            </button>
          ))}
        </div>
        <Button onClick={() => setStep("wizard-schedule")} className="font-body gap-2" style={{ background: "hsl(var(--admin-teal))", color: "#fff" }}>
          <Clock className="w-4 h-4" /> Use This Template
        </Button>
      </div>
    );
  }

  // ── REVIEW ─────────────────────────────────────────────────────
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
            <textarea value={generatedCaption} onChange={(e) => setGeneratedCaption(e.target.value)} rows={6}
              className="w-full rounded-xl border px-3 py-2 text-sm font-body resize-none focus:outline-none focus:ring-2"
              style={{ background: "hsl(var(--admin-bg))", borderColor: "hsl(var(--admin-sidebar-border))", color: "hsl(var(--admin-text))" }} />
            <p className="text-xs mt-1" style={{ color: "hsl(var(--admin-text-muted))" }}>{generatedCaption.length} characters</p>
          </CardContent>
        </Card>
        <div className="flex gap-2">
          <Button onClick={() => setStep("wizard-template")} className="font-body gap-2" style={{ background: "hsl(var(--admin-teal))", color: "#fff" }}>
            Choose Template →
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

  // ── TOPIC ──────────────────────────────────────────────────────
  if (step === "wizard-topic") {
    return (
      <div className="space-y-6 max-w-xl">
        <button onClick={handleReset} className="flex items-center gap-1.5 text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div>
          <h2 className="text-xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>What's this post about?</h2>
          <p className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Enter a topic or promotion — AI will write the post.</p>
        </div>
        <Card style={{ background: "hsl(var(--admin-card-bg))", borderColor: "hsl(var(--admin-sidebar-border))" }} className="border rounded-2xl">
          <CardContent className="pt-5 space-y-4">
            <textarea value={topic} onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. 'Mosquito season is starting — promote our monthly treatment plan'"
              rows={3} className="w-full rounded-xl border px-3 py-2 text-sm font-body resize-none focus:outline-none focus:ring-2"
              style={{ background: "hsl(var(--admin-bg))", borderColor: "hsl(var(--admin-sidebar-border))", color: "hsl(var(--admin-text))" }} />
            <div>
              <p className="text-xs font-body mb-2" style={{ color: "hsl(var(--admin-text-muted))" }}>Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {TOPIC_SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => setTopic(s)}
                    className="text-xs px-3 py-1 rounded-full border font-body transition-all"
                    style={{ borderColor: "hsl(var(--admin-sidebar-border))", color: topic === s ? "hsl(185,65%,42%)" : "hsl(var(--admin-text-muted))", background: topic === s ? "hsla(185,65%,42%,0.1)" : "transparent" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={handleGenerate} disabled={!topic.trim()} className="font-body gap-2 w-full" style={{ background: "hsl(var(--admin-teal))", color: "#fff" }}>
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
      <PageHelpBanner tab="social" />
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
                <SvgCard templateId={post.template_id} caption={post.caption} size={56} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body line-clamp-2 mb-1" style={{ color: "hsl(var(--admin-text))" }}>{post.caption}</p>
                  <div className="flex items-center gap-2">
                    {PLATFORMS.filter((p) => post.platforms.includes(p.key)).map(({ key, icon: Icon, color }) => (
                      <Icon key={key} className="w-3.5 h-3.5" style={{ color }} />
                    ))}
                    {post.scheduled_at && (
                      <p className="text-xs font-body flex items-center gap-1" style={{ color: "hsl(var(--admin-text-muted))" }}>
                        <Clock className="w-3 h-3" />
                        {new Date(post.scheduled_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                      </p>
                    )}
                  </div>
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
