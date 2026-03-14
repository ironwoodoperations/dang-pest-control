import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, BarChart3, Globe } from "lucide-react";

const targetKeywords = [
  { keyword: "pest control near me", volume: "18,100", difficulty: "High" },
  { keyword: "termite inspection Texas", volume: "4,400", difficulty: "Medium" },
  { keyword: "ant exterminator", volume: "6,600", difficulty: "Medium" },
  { keyword: "scorpion control", volume: "2,900", difficulty: "Low" },
  { keyword: "bed bug treatment", volume: "8,100", difficulty: "High" },
  { keyword: "rodent removal service", volume: "3,600", difficulty: "Medium" },
  { keyword: "mosquito yard treatment", volume: "5,400", difficulty: "Medium" },
  { keyword: "spider pest control", volume: "1,900", difficulty: "Low" },
];

const difficultyColors: Record<string, string> = {
  Low: "bg-[hsl(160,70%,92%)] text-[hsl(160,70%,35%)]",
  Medium: "bg-[hsl(234,85%,95%)] text-[hsl(234,85%,50%)]",
  High: "bg-destructive/15 text-destructive",
};

const SEOTab = () => {
  return (
    <div className="space-y-6">
      <h2 className="font-body text-2xl font-bold" style={{ color: "hsl(var(--admin-text))" }}>SEO Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-body font-medium" style={{ color: "hsl(var(--admin-text-muted))" }}>Target Keywords</CardTitle>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(234, 85%, 95%)", color: "hsl(234, 85%, 60%)" }}>
              <Search className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>{targetKeywords.length}</div>
          </CardContent>
        </Card>
        <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-body font-medium" style={{ color: "hsl(var(--admin-text-muted))" }}>Pages Indexed</CardTitle>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(160, 70%, 92%)", color: "hsl(160, 70%, 40%)" }}>
              <Globe className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>18</div>
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

      <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
        <CardHeader>
          <CardTitle className="font-body text-lg" style={{ color: "hsl(var(--admin-text))" }}>Keyword Targets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {targetKeywords.map((kw) => (
              <div key={kw.keyword} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-body font-medium text-sm" style={{ color: "hsl(var(--admin-text))" }}>{kw.keyword}</p>
                  <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Monthly volume: {kw.volume}</p>
                </div>
                <Badge className={`font-body border-0 ${difficultyColors[kw.difficulty]}`}>
                  {kw.difficulty}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOTab;
