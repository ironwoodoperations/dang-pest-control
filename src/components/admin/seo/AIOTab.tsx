import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, Eye, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SchemaPage {
  slug: string;
  label: string;
  schemas: string[];
}

const schemaPages: SchemaPage[] = [
  { slug: "/", label: "Home", schemas: ["LocalBusiness"] },
  { slug: "/spider-control", label: "Spider Control", schemas: ["Service", "FAQPage"] },
  { slug: "/mosquito-control", label: "Mosquito Control", schemas: ["Service", "FAQPage"] },
  { slug: "/ant-control", label: "Ant Control", schemas: ["Service", "FAQPage"] },
  { slug: "/wasp-hornet-control", label: "Wasp & Hornet Control", schemas: ["Service", "FAQPage"] },
  { slug: "/roach-control", label: "Roach Control", schemas: ["Service", "FAQPage"] },
  { slug: "/flea-tick-control", label: "Flea & Tick Control", schemas: ["Service", "FAQPage"] },
  { slug: "/rodent-control", label: "Rodent Control", schemas: ["Service", "FAQPage"] },
  { slug: "/scorpion-control", label: "Scorpion Control", schemas: ["Service", "FAQPage"] },
  { slug: "/bed-bug-control", label: "Bed Bug Control", schemas: ["Service", "FAQPage"] },
  { slug: "/termite-control", label: "Termite Control", schemas: ["Service", "FAQPage"] },
  { slug: "/termite-inspections", label: "Termite Inspections", schemas: ["Service", "FAQPage"] },
  { slug: "/pest-control", label: "General Pest Control", schemas: ["Service", "FAQPage"] },
  { slug: "/blog", label: "Blog", schemas: ["Blog", "BlogPosting"] },
  { slug: "/longview-tx", label: "Longview, TX", schemas: ["PestControlService"] },
  { slug: "/jacksonville-tx", label: "Jacksonville, TX", schemas: ["PestControlService"] },
  { slug: "/lindale-tx", label: "Lindale, TX", schemas: ["PestControlService"] },
  { slug: "/bullard-tx", label: "Bullard, TX", schemas: ["PestControlService"] },
  { slug: "/whitehouse-tx", label: "Whitehouse, TX", schemas: ["PestControlService"] },
];

const schemaColors: Record<string, string> = {
  LocalBusiness: "bg-[hsl(28,100%,93%)] text-[hsl(28,100%,40%)]",
  Service: "bg-[hsl(234,85%,95%)] text-[hsl(234,85%,50%)]",
  FAQPage: "bg-[hsl(160,70%,92%)] text-[hsl(160,70%,35%)]",
  Blog: "bg-[hsl(280,70%,93%)] text-[hsl(280,70%,40%)]",
  BlogPosting: "bg-[hsl(280,70%,93%)] text-[hsl(280,70%,40%)]",
  PestControlService: "bg-[hsl(185,65%,90%)] text-[hsl(185,65%,35%)]",
};

const AIOTab = () => {
  const [previewPage, setPreviewPage] = useState<SchemaPage | null>(null);
  const { toast } = useToast();

  const totalSchemas = schemaPages.reduce((sum, p) => sum + p.schemas.length, 0);
  const pagesWithSchema = schemaPages.length;

  const handleRegenerate = () => {
    toast({
      title: "Schemas regenerated",
      description: `${totalSchemas} schema definitions refreshed across ${pagesWithSchema} pages.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-body text-lg font-bold" style={{ color: "hsl(var(--admin-text))" }}>
            AI Search Optimization (AIO)
          </h3>
          <p className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>
            JSON-LD structured data for AI search visibility
          </p>
        </div>
        <Button
          size="sm"
          className="gap-1.5 font-body"
          style={{ background: "hsl(var(--admin-indigo))" }}
          onClick={handleRegenerate}
        >
          <RefreshCw className="w-3.5 h-3.5" /> Regenerate All
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
          <CardContent className="pt-5">
            <p className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Pages with Schema</p>
            <p className="text-2xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>{pagesWithSchema}</p>
          </CardContent>
        </Card>
        <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
          <CardContent className="pt-5">
            <p className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Total Schemas</p>
            <p className="text-2xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>{totalSchemas}</p>
          </CardContent>
        </Card>
        <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
          <CardContent className="pt-5">
            <p className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Coverage</p>
            <p className="text-2xl font-bold font-body" style={{ color: "hsl(160, 70%, 35%)" }}>100%</p>
          </CardContent>
        </Card>
      </div>

      {/* Pages Table */}
      <Card style={{ background: "hsl(var(--admin-card-bg))" }}>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-body pl-6">Page</TableHead>
                <TableHead className="font-body">Schemas</TableHead>
                <TableHead className="font-body">Status</TableHead>
                <TableHead className="font-body text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schemaPages.map((page) => (
                <TableRow key={page.slug}>
                  <TableCell className="pl-6">
                    <div>
                      <p className="font-body font-medium text-sm" style={{ color: "hsl(var(--admin-text))" }}>{page.label}</p>
                      <p className="font-mono text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>{page.slug}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {page.schemas.map((s) => (
                        <Badge key={s} className={`border-0 text-xs font-body ${schemaColors[s] || ""}`}>
                          <CheckCircle2 className="w-3 h-3 mr-1" /> {s}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-[hsl(160,70%,92%)] text-[hsl(160,70%,35%)] border-0 text-xs font-body">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-1 font-body text-xs"
                      onClick={() => setPreviewPage(page)}
                    >
                      <Eye className="w-3 h-3" /> Preview
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Schema Preview Modal */}
      <Dialog open={!!previewPage} onOpenChange={(open) => !open && setPreviewPage(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-body">Schema Preview — {previewPage?.label}</DialogTitle>
          </DialogHeader>
          {previewPage && (
            <pre
              className="text-xs font-mono p-4 rounded-lg overflow-auto"
              style={{ background: "hsl(var(--admin-bg))", color: "hsl(var(--admin-text))", maxHeight: "400px" }}
            >
              {JSON.stringify(
                {
                  "@context": "https://schema.org",
                  schemas: previewPage.schemas.map((s) => ({
                    "@type": s,
                    name: `Dang Pest Control - ${previewPage.label}`,
                    url: `https://dangpestcontrol.com${previewPage.slug}`,
                  })),
                },
                null,
                2,
              )}
            </pre>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIOTab;
