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
  Low: "bg-accent/20 text-accent-foreground",
  Medium: "bg-primary/20 text-primary",
  High: "bg-destructive/20 text-destructive",
};

const SEOTab = () => {
  return (
    <div className="space-y-6">
      <h2 className="font-body text-2xl font-bold">SEO Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-body font-medium">Target Keywords</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-body">{targetKeywords.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-body font-medium">Pages Indexed</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-body">18</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-body font-medium">Analytics</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground font-body">Connect Google Analytics to see live data</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-body text-lg">Keyword Targets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {targetKeywords.map((kw) => (
              <div key={kw.keyword} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="font-body font-medium text-sm">{kw.keyword}</p>
                  <p className="text-xs text-muted-foreground font-body">Monthly volume: {kw.volume}</p>
                </div>
                <Badge className={`font-body ${difficultyColors[kw.difficulty]}`}>
                  {kw.difficulty}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-dashed">
        <CardContent className="p-8 text-center">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-body font-semibold text-lg mb-2">Google Analytics Integration</h3>
          <p className="text-muted-foreground font-body text-sm">
            Connect your Google Analytics account to display real-time traffic data, top pages, and conversion metrics here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOTab;
