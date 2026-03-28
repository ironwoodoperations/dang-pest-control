import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import type { SettingsData } from "../SettingsTab";

interface Props {
  settings: SettingsData;
  update: (patch: Partial<SettingsData>) => void;
}

const SettingsIntegrations = ({ settings, update }: Props) => {
  const [fbTesting, setFbTesting] = useState(false);
  const [fbStatus, setFbStatus] = useState<"idle" | "success" | "error">("idle");
  const [fbPageName, setFbPageName] = useState("");

  const testFacebookConnection = async () => {
    const token = (settings as any).fb_access_token;
    const pageId = (settings as any).fb_page_id;
    if (!token || !pageId) return;

    setFbTesting(true);
    setFbStatus("idle");
    try {
      const res = await fetch(`https://graph.facebook.com/v18.0/${pageId}?fields=name&access_token=${token}`);
      const data = await res.json();
      if (data.name) {
        setFbPageName(data.name);
        setFbStatus("success");
      } else {
        setFbStatus("error");
      }
    } catch {
      setFbStatus("error");
    }
    setFbTesting(false);
  };

  return (
    <div className="space-y-6">
      <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
        <CardHeader>
          <CardTitle className="font-body text-base" style={{ color: "hsl(var(--admin-text))" }}>
            Facebook Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="font-body text-sm">Facebook Page Access Token</Label>
            <Input
              type="password"
              value={(settings as any).fb_access_token || ""}
              onChange={(e) => update({ fb_access_token: e.target.value } as any)}
              placeholder="EAA..."
              className="font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-body text-sm">Facebook Page ID</Label>
            <Input
              value={(settings as any).fb_page_id || ""}
              onChange={(e) => update({ fb_page_id: e.target.value } as any)}
              placeholder="123456789..."
              className="font-body text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              onClick={testFacebookConnection}
              disabled={fbTesting || !(settings as any).fb_access_token || !(settings as any).fb_page_id}
              className="gap-1.5 font-body"
              variant="outline"
            >
              {fbTesting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
              Test Connection
            </Button>
            {fbStatus === "success" && (
              <span className="flex items-center gap-1 text-xs font-body" style={{ color: "hsl(160, 70%, 35%)" }}>
                <CheckCircle2 className="w-3.5 h-3.5" /> Connected as {fbPageName}
              </span>
            )}
            {fbStatus === "error" && (
              <span className="flex items-center gap-1 text-xs font-body text-destructive">
                <XCircle className="w-3.5 h-3.5" /> Connection failed
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
        <CardHeader>
          <CardTitle className="font-body text-base" style={{ color: "hsl(var(--admin-text))" }}>
            Google Business
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="font-body text-sm">Google Place ID</Label>
            <Input
              value={(settings as any).google_place_id || ""}
              onChange={(e) => update({ google_place_id: e.target.value } as any)}
              placeholder="ChIJ..."
              className="font-body text-sm"
            />
            <a href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank" rel="noopener noreferrer" className="text-xs font-body" style={{ color: "hsl(var(--admin-teal))" }}>
              Find your Place ID
            </a>
          </div>
          <div className="space-y-2">
            <Label className="font-body text-sm">Google API Key</Label>
            <Input
              type="password"
              value={(settings as any).google_api_key || ""}
              onChange={(e) => update({ google_api_key: e.target.value } as any)}
              placeholder="AIza..."
              className="font-mono text-sm"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsIntegrations;
