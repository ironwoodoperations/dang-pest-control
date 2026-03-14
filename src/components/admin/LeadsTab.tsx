import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTenant } from "@/hooks/useTenant";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Users, UserCheck, Archive, Eye, Search, Mail, Phone, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  service: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  new: { label: "New", className: "bg-[hsl(234,85%,95%)] text-[hsl(234,85%,50%)]" },
  contacted: { label: "Contacted", className: "bg-[hsl(160,70%,92%)] text-[hsl(160,70%,35%)]" },
  converted: { label: "Converted", className: "bg-[hsl(28,100%,93%)] text-[hsl(28,100%,45%)]" },
  closed: { label: "Closed", className: "bg-muted text-muted-foreground" },
};

const LeadsTab = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const { toast } = useToast();
  const { tenantId } = useTenant();

  const fetchLeads = async () => {
    if (!tenantId) return;
    const { data } = await supabase
      .from("leads")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("created_at", { ascending: false });
    setLeads((data as Lead[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, [tenantId]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("leads").update({ status }).eq("id", id);
    fetchLeads();
    toast({ title: "Status updated" });
  };

  const deleteLead = async (id: string) => {
    await supabase.from("leads").delete().eq("id", id);
    setSelectedLead(null);
    fetchLeads();
    toast({ title: "Lead deleted" });
  };

  const filtered = leads.filter((l) => {
    const matchesSearch = !search || 
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email?.toLowerCase().includes(search.toLowerCase()) ||
      l.service?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || l.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const counts = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    converted: leads.filter((l) => l.status === "converted").length,
  };

  if (loading) return <p className="font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Loading leads...</p>;

  return (
    <div className="space-y-6">
      <h2 className="font-body text-2xl font-bold" style={{ color: "hsl(var(--admin-text))" }}>Leads CRM</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Leads", value: counts.total, icon: Users, bg: "hsl(234, 85%, 95%)", color: "hsl(234, 85%, 60%)" },
          { label: "New", value: counts.new, icon: Users, bg: "hsl(234, 85%, 95%)", color: "hsl(234, 85%, 50%)" },
          { label: "Contacted", value: counts.contacted, icon: UserCheck, bg: "hsl(160, 70%, 92%)", color: "hsl(160, 70%, 40%)" },
          { label: "Converted", value: counts.converted, icon: Archive, bg: "hsl(28, 100%, 93%)", color: "hsl(28, 100%, 50%)" },
        ].map((stat) => (
          <Card key={stat.label} style={{ background: "hsl(var(--admin-card-bg))" }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-body font-medium" style={{ color: "hsl(var(--admin-text-muted))" }}>{stat.label}</CardTitle>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: stat.bg, color: stat.color }}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "hsl(var(--admin-text-muted))" }} />
          <Input
            placeholder="Search by name, email, or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 font-body"
          />
        </div>
        <div className="flex gap-2">
          {["all", "new", "contacted", "converted", "closed"].map((s) => (
            <Button
              key={s}
              variant={filterStatus === s ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus(s)}
              className="font-body capitalize text-xs"
              style={filterStatus === s ? { background: "hsl(var(--admin-indigo))" } : {}}
            >
              {s === "all" ? "All" : s}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <Card className="p-12 text-center" style={{ background: "hsl(var(--admin-card-bg))" }}>
          <p className="font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
            {leads.length === 0 ? "No leads yet. They'll appear here when customers submit quote requests." : "No leads match your filters."}
          </p>
        </Card>
      ) : (
        <Card className="overflow-hidden" style={{ background: "hsl(var(--admin-card-bg))" }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-body">Name</TableHead>
                <TableHead className="font-body">Contact</TableHead>
                <TableHead className="font-body">Service</TableHead>
                <TableHead className="font-body">Status</TableHead>
                <TableHead className="font-body">Date</TableHead>
                <TableHead className="font-body text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lead) => (
                <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/30" onClick={() => setSelectedLead(lead)}>
                  <TableCell className="font-body font-medium" style={{ color: "hsl(var(--admin-text))" }}>{lead.name}</TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      {lead.email && <div className="text-xs font-body flex items-center gap-1" style={{ color: "hsl(var(--admin-text-muted))" }}><Mail className="w-3 h-3" />{lead.email}</div>}
                      {lead.phone && <div className="text-xs font-body flex items-center gap-1" style={{ color: "hsl(var(--admin-text-muted))" }}><Phone className="w-3 h-3" />{lead.phone}</div>}
                    </div>
                  </TableCell>
                  <TableCell className="font-body text-sm">{lead.service || "—"}</TableCell>
                  <TableCell>
                    <Badge className={`font-body border-0 text-xs ${statusConfig[lead.status]?.className || ""}`}>
                      {statusConfig[lead.status]?.label || lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
                    {new Date(lead.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); }}>
                      <Eye className="w-4 h-4" style={{ color: "hsl(var(--admin-indigo))" }} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); deleteLead(lead.id); }}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Lead Detail Modal */}
      <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-body text-lg" style={{ color: "hsl(var(--admin-text))" }}>Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-body text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>Name</Label>
                  <p className="font-body font-medium">{selectedLead.name}</p>
                </div>
                <div>
                  <Label className="font-body text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>Status</Label>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => {
                      updateStatus(selectedLead.id, e.target.value);
                      setSelectedLead({ ...selectedLead, status: e.target.value });
                    }}
                    className={`mt-1 text-xs font-semibold font-body rounded-full px-3 py-1 border-0 cursor-pointer ${statusConfig[selectedLead.status]?.className || ""}`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-body text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>Email</Label>
                  <p className="font-body text-sm">{selectedLead.email || "—"}</p>
                </div>
                <div>
                  <Label className="font-body text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>Phone</Label>
                  <p className="font-body text-sm">{selectedLead.phone || "—"}</p>
                </div>
              </div>
              <div>
                <Label className="font-body text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>Service Requested</Label>
                <p className="font-body text-sm">{selectedLead.service || "—"}</p>
              </div>
              <div>
                <Label className="font-body text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>Message</Label>
                <p className="font-body text-sm whitespace-pre-wrap rounded-lg p-3 bg-muted/30">{selectedLead.message || "No message provided."}</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
                <Calendar className="w-3 h-3" />
                Submitted {new Date(selectedLead.created_at).toLocaleString()}
              </div>
              <div className="flex justify-end gap-2 pt-2">
                {selectedLead.email && (
                  <Button variant="outline" size="sm" className="font-body gap-1" asChild>
                    <a href={`mailto:${selectedLead.email}`}><Mail className="w-3 h-3" />Email</a>
                  </Button>
                )}
                {selectedLead.phone && (
                  <Button variant="outline" size="sm" className="font-body gap-1" asChild>
                    <a href={`tel:${selectedLead.phone}`}><Phone className="w-3 h-3" />Call</a>
                  </Button>
                )}
                <Button variant="destructive" size="sm" className="font-body gap-1" onClick={() => deleteLead(selectedLead.id)}>
                  <Trash2 className="w-3 h-3" />Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadsTab;
