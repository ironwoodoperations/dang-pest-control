import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TeamMember {
  id: string;
  user_id: string;
  role: "admin" | "editor" | "viewer";
  created_at: string;
  email?: string;
}

const TeamTab = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"editor" | "viewer">("editor");
  const [inviting, setInviting] = useState(false);
  const { toast } = useToast();

  const fetchMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("user_roles")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setMembers(data as TeamMember[]);
    setLoading(false);
  };

  useEffect(() => { fetchMembers(); }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviting(true);

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      toast({ title: "Error", description: signUpError.message, variant: "destructive" });
      setInviting(false);
      return;
    }

    if (signUpData.user) {
      const { error: roleError } = await supabase.from("user_roles").insert({ user_id: signUpData.user.id, role });
      if (roleError) {
        toast({ title: "User created but role assignment failed", description: roleError.message, variant: "destructive" });
      } else {
        toast({ title: "Team member invited", description: `${email} added as ${role}` });
      }
    }

    setEmail("");
    setPassword("");
    setRole("editor");
    setOpen(false);
    setInviting(false);
    fetchMembers();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("user_roles").delete().eq("id", id);
    if (!error) {
      toast({ title: "Role removed" });
      fetchMembers();
    }
  };

  const roleBadgeColor = (r: string) => {
    if (r === "admin") return "bg-[hsl(234,85%,95%)] text-[hsl(234,85%,50%)]";
    if (r === "editor") return "bg-[hsl(160,70%,92%)] text-[hsl(160,70%,35%)]";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-body font-bold" style={{ color: "hsl(var(--admin-text))" }}>Team Management</h2>
          <p className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Manage user access and roles</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 font-body" style={{ background: "hsl(var(--admin-indigo))" }}>
              <UserPlus className="h-4 w-4" />
              Invite New User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-body">Invite Team Member</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleInvite} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="invite-email" className="font-body">Email</Label>
                <Input id="invite-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invite-password" className="font-body">Password</Label>
                <Input id="invite-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 6 characters" minLength={6} required />
              </div>
              <div className="space-y-2">
                <Label className="font-body">Role</Label>
                <Select value={role} onValueChange={(v) => setRole(v as "editor" | "viewer")}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full font-body" disabled={inviting} style={{ background: "hsl(var(--admin-indigo))" }}>
                {inviting ? "Creating..." : "Create & Assign Role"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="overflow-hidden" style={{ background: "hsl(var(--admin-card-bg))" }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-body">User ID</TableHead>
              <TableHead className="font-body">Role</TableHead>
              <TableHead className="font-body">Added</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Loading...</TableCell>
              </TableRow>
            ) : members.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>No team members yet</TableCell>
              </TableRow>
            ) : (
              members.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-mono text-xs">{m.user_id.slice(0, 8)}...</TableCell>
                  <TableCell>
                    <Badge className={`font-body border-0 ${roleBadgeColor(m.role)}`}>{m.role}</Badge>
                  </TableCell>
                  <TableCell className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
                    {new Date(m.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(m.id)} className="hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default TeamTab;
