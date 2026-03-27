import { useState } from "react";
import { Sparkles, Plus, ExternalLink, Loader2, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResearchKeyword {
  keyword: string;
  intent: "informational" | "commercial" | "local" | "transactional";
  volume: string;
  difficulty: "Low" | "Medium" | "High";
  notes: string;
}

interface Props {
  onAddKeyword: (kw: { keyword: string; volume: string; difficulty: string; notes: string }) => void;
}

const INTENT_COLORS: Record<string, string> = {
  informational: "bg-blue-50 text-blue-700",
  commercial: "bg-orange-50 text-orange-700",
  local: "bg-green-50 text-green-700",
  transactional: "bg-purple-50 text-purple-700",
};

const FREE_TOOLS = [
  { name: "Google Keyword Planner", url: "https://ads.google.com/home/tools/keyword-planner/", desc: "Free — real Google search volume data" },
  { name: "Ubersuggest", url: "https://neilpatel.com/ubersuggest/", desc: "Free tier — competitor keywords + trends" },
  { name: "Answer The Public", url: "https://answerthepublic.com/", desc: "Free searches/day — question-based keywords" },
  { name: "Google Trends", url: "https://trends.google.com/", desc: "Free — see what's trending right now" },
  { name: "Semrush Free", url: "https://www.semrush.com/", desc: "Limited free tier — full competitor analysis" },
];

const KeywordResearch = ({ onAddKeyword }: Props) => {
  const [competitors, setCompetitors] = useState("");
  const [location, setLocation] = useState("Tyler, TX");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ResearchKeyword[]>([]);
  const [added, setAdded] = useState<Set<string>>(new Set());
  const [helpOpen, setHelpOpen] = useState(false);
  const { toast } = useToast();

  const generate = async () => {
    if (!competitors.trim()) {
      toast({ title: "Enter at least one competitor name", variant: "destructive" });
      return;
    }
    setLoading(true);
    setResults([]);
    try {
      const prompt = `You are an SEO expert for a pest control company in ${location} competing with: ${competitors}.

Return ONLY a JSON array of exactly 12 keywords. No markdown, no backticks, no explanation, no text before or after the array. Start your response with [ and end with ].

Each object must have exactly these fields with these exact types:
- "keyword": string
- "intent": one of exactly "informational", "commercial", "local", or "transactional"
- "volume": string like "200-500/mo"
- "difficulty": one of exactly "Low", "Medium", or "High"
- "notes": string under 10 words

Example of the exact format required:
[{"keyword":"pest control tyler tx","intent":"local","volume":"500-1k/mo","difficulty":"Medium","notes":"High intent local service keyword"}]`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY || "",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("API error response:", JSON.stringify(data));
        throw new Error(data?.error?.message || "API error");
      }
      const text = data.content?.[0]?.text || "[]";
      const clean = text.replace(/```json|```/g, "").trim();
      let parsed: ResearchKeyword[] = [];
      try {
        parsed = JSON.parse(clean);
      } catch {
        const match = clean.match(/\[[\s\S]*\]/);
        if (match) {
          parsed = JSON.parse(match[0]);
        } else {
          throw new Error("Could not parse keyword response");
        }
      }
      setResults(parsed);
    } catch (err) {
      console.error("Keyword research error:", err);
      toast({ title: "Generation failed", description: String(err), variant: "destructive" });
    }
    setLoading(false);
  };

  const handleAdd = (kw: ResearchKeyword) => {
    onAddKeyword({ keyword: kw.keyword, volume: kw.volume, difficulty: kw.difficulty, notes: kw.notes });
    setAdded((prev) => new Set(prev).add(kw.keyword));
    toast({ title: `Added "${kw.keyword}" to your keyword tracker` });
  };

  return (
    <div className="space-y-5">
      <div
        className="rounded-xl border mb-4 overflow-hidden"
        style={{ borderColor: "hsl(var(--admin-sidebar-border))", background: "hsl(var(--admin-card-bg))" }}
      >
        <button
          onClick={() => setHelpOpen((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-2.5 gap-3 hover:opacity-80 transition-opacity"
          style={{ background: "transparent" }}
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(var(--admin-teal))" }} />
            <span className="font-body text-xs font-semibold" style={{ color: "hsl(var(--admin-teal))" }}>How to use Keyword Research</span>
            <span className="font-body text-xs hidden sm:inline" style={{ color: "hsl(var(--admin-text-muted))" }}>— find the best keywords to rank higher than your competitors</span>
          </div>
          {helpOpen
            ? <ChevronUp className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(var(--admin-text-muted))" }} />
            : <ChevronDown className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(var(--admin-text-muted))" }} />
          }
        </button>
        {helpOpen && (
          <div className="px-4 pb-4 pt-1 grid sm:grid-cols-2 gap-2 border-t" style={{ borderColor: "hsl(var(--admin-sidebar-border))" }}>
            {[
              { title: "What this does", detail: "Uses AI to generate a list of high-value search keywords your pest control company should target — based on what your competitors rank for and what customers in your area are searching." },
              { title: "Enter competitors", detail: "Type the names of 1–3 local or national competitors (e.g. 'Orkin, Terminix, Bug-A-Way Tyler'). The AI uses these to find gaps and opportunities you can outrank them on." },
              { title: "Service area", detail: "Keep this set to your city and state (e.g. 'Tyler, TX'). This ensures the keywords are locally relevant and match what people in your area are actually searching." },
              { title: "Reading the results", detail: "Each keyword shows its search intent (local, informational, commercial, transactional), estimated monthly search volume, difficulty to rank for, and a note on why it matters." },
              { title: "Adding to your tracker", detail: "Click the + button on any keyword to add it to your Keyword Targets list above. Use that list to track which keywords you're actively optimizing for." },
              { title: "How to improve your site", detail: "Use these keywords in your page titles, meta descriptions (SEO tab), blog posts (Blog tab), and page intro text (Page Content tab). The more naturally you use them, the higher Google will rank you." },
              { title: "Free tools below", detail: "The links below the generator open free external tools (Google Keyword Planner, Ubersuggest, etc.) for deeper research with real search volume data straight from Google." },
              { title: "Run it often", detail: "Search trends change seasonally — run a new report before spring (mosquito/ant season) and fall (rodent season) to stay ahead of competitors year-round." },
            ].map((item) => (
              <div key={item.title} className="flex gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "hsl(var(--admin-teal))" }} />
                <div>
                  <span className="font-body text-xs font-semibold" style={{ color: "hsl(var(--admin-text))" }}>{item.title}</span>
                  <span className="font-body text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>{" — "}{item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* AI Generator */}
      <div
        className="rounded-xl border p-4 space-y-4"
        style={{ borderColor: "hsl(var(--admin-sidebar-border))", background: "hsl(var(--admin-card-bg))" }}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: "hsl(var(--admin-teal))" }} />
          <h3 className="font-body text-sm font-semibold" style={{ color: "hsl(var(--admin-text))" }}>
            AI Keyword Research
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="font-body text-xs font-medium" style={{ color: "hsl(var(--admin-text))" }}>
              Competitor names <span style={{ color: "hsl(var(--admin-text-muted))" }}>(comma separated)</span>
            </label>
            <input
              value={competitors}
              onChange={(e) => setCompetitors(e.target.value)}
              placeholder="e.g. Terminix, Orkin, Bug-A-Way Tyler"
              className="w-full h-9 px-3 rounded-lg border font-body text-sm"
              style={{
                borderColor: "hsl(var(--admin-sidebar-border))",
                background: "hsl(var(--admin-bg))",
                color: "hsl(var(--admin-text))",
              }}
            />
          </div>
          <div className="space-y-1">
            <label className="font-body text-xs font-medium" style={{ color: "hsl(var(--admin-text))" }}>
              Service area
            </label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Tyler, TX"
              className="w-full h-9 px-3 rounded-lg border font-body text-sm"
              style={{
                borderColor: "hsl(var(--admin-sidebar-border))",
                background: "hsl(var(--admin-bg))",
                color: "hsl(var(--admin-text))",
              }}
            />
          </div>
        </div>

        <button
          onClick={generate}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm font-medium text-white disabled:opacity-50 transition-opacity"
          style={{ background: "hsl(var(--admin-teal))" }}
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          {loading ? "Researching keywords..." : "Generate Keyword Ideas"}
        </button>

        {results.length > 0 && (
          <div className="space-y-2 pt-1">
            <p className="font-body text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>
              {results.length} keywords generated — click + to add any to your tracker
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {results.map((kw) => (
                <div
                  key={kw.keyword}
                  className="flex items-start justify-between gap-2 p-2.5 rounded-lg border"
                  style={{ borderColor: "hsl(var(--admin-sidebar-border))", background: "hsl(var(--admin-bg))" }}
                >
                  <div className="min-w-0 space-y-1">
                    <p className="font-body text-xs font-semibold truncate" style={{ color: "hsl(var(--admin-text))" }}>
                      {kw.keyword}
                    </p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-body font-medium px-1.5 py-0.5 rounded ${INTENT_COLORS[kw.intent] || ""}`}>
                        {kw.intent}
                      </span>
                      <span className="font-body text-[10px]" style={{ color: "hsl(var(--admin-text-muted))" }}>
                        {kw.volume}
                      </span>
                      <span className="font-body text-[10px]" style={{ color: "hsl(var(--admin-text-muted))" }}>
                        · {kw.difficulty} difficulty
                      </span>
                    </div>
                    <p className="font-body text-[10px]" style={{ color: "hsl(var(--admin-text-muted))" }}>
                      {kw.notes}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAdd(kw)}
                    disabled={added.has(kw.keyword)}
                    className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center disabled:opacity-40 transition-opacity"
                    style={{ background: "hsl(var(--admin-teal))", color: "white" }}
                    title="Add to tracker"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Free tools links */}
      <div
        className="rounded-xl border p-4 space-y-3"
        style={{ borderColor: "hsl(var(--admin-sidebar-border))", background: "hsl(var(--admin-card-bg))" }}
      >
        <h3 className="font-body text-sm font-semibold" style={{ color: "hsl(var(--admin-text))" }}>
          Free Keyword Research Tools
        </h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {FREE_TOOLS.map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start justify-between gap-2 p-2.5 rounded-lg border transition-opacity hover:opacity-80"
              style={{ borderColor: "hsl(var(--admin-sidebar-border))", background: "hsl(var(--admin-bg))" }}
            >
              <div>
                <p className="font-body text-xs font-semibold" style={{ color: "hsl(var(--admin-teal))" }}>
                  {tool.name}
                </p>
                <p className="font-body text-[10px]" style={{ color: "hsl(var(--admin-text-muted))" }}>
                  {tool.desc}
                </p>
              </div>
              <ExternalLink className="w-3 h-3 shrink-0 mt-0.5" style={{ color: "hsl(var(--admin-text-muted))" }} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeywordResearch;
