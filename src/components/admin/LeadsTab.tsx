import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

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

const statusStyles: Record<string, string> = {
  new: "bg-[hsl(234,85%,95%)] text-[hsl(234,85%,50%)]",
  contacted: "bg-[hsl(160,70%,92%)] text-[hsl(160,70%,35%)]",
  closed: "bg-muted text-muted-foreground",
};

const LeadsTab = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads((data as Lead[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("leads").update({ status }).eq("id", id);
    fetchLeads();
  };

  const deleteLead = async (id: string) => {
    await supabase.from("leads").delete().eq("id", id);
    fetchLeads();
  };

  if (loading) return <p className="font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Loading leads...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-body text-2xl font-bold" style={{ color: "hsl(var(--admin-text))" }}>Leads</h2>
        <Badge variant="secondary" className="font-body">{leads.length} total</Badge>
      </div>

      {leads.length === 0 ? (
        <Card className="p-12 text-center" style={{ background: "hsl(var(--admin-card-bg))" }}>
          <p className="font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
            No leads yet. They'll appear here when customers submit quote requests.
          </p>
        </Card>
      ) : (
        <Card className="overflow-hidden" style={{ background: "hsl(var(--admin-card-bg))" }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-body">Name</TableHead>
                <TableHead className="font-body">Email</TableHead>
                <TableHead className="font-body">Phone</TableHead>
                <TableHead className="font-body">Service</TableHead>
                <TableHead className="font-body">Status</TableHead>
                <TableHead className="font-body">Date</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-body font-medium">{lead.name}</TableCell>
                  <TableCell className="font-body">{lead.email || "—"}</TableCell>
                  <TableCell className="font-body">{lead.phone || "—"}</TableCell>
                  <TableCell className="font-body">{lead.service || "—"}</TableCell>
                  <TableCell>
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className={`text-xs font-semibold font-body rounded-full px-3 py-1 border-0 cursor-pointer ${statusStyles[lead.status] || ""}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </TableCell>
                  <TableCell className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
                    {new Date(lead.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => deleteLead(lead.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
};

export default LeadsTab;
