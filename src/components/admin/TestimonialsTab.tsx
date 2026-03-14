import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTenant } from "@/hooks/useTenant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Star, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  text: string;
  rating: number;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

const emptyForm = { name: "", title: "", text: "", rating: 5, is_featured: true, sort_order: 0 };

const TestimonialsTab = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { tenantId } = useTenant();

  const fetch = async () => {
    if (!tenantId) return;
    setLoading(true);
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("sort_order", { ascending: true });
    if (data) setTestimonials(data as Testimonial[]);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, [tenantId]);

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyForm, sort_order: testimonials.length + 1 });
    setOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({ name: t.name, title: t.title, text: t.text, rating: t.rating, is_featured: t.is_featured, sort_order: t.sort_order });
    setOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (editing) {
      const { error } = await supabase.from("testimonials").update(form).eq("id", editing.id);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Testimonial updated" });
    } else {
      const { error } = await supabase.from("testimonials").insert({ ...form, tenant_id: tenantId });
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Testimonial added" });
    }
    setSaving(false);
    setOpen(false);
    fetch();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (!error) { toast({ title: "Testimonial deleted" }); fetch(); }
  };

  const toggleFeatured = async (t: Testimonial) => {
    await supabase.from("testimonials").update({ is_featured: !t.is_featured }).eq("id", t.id);
    fetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-body font-bold" style={{ color: "hsl(var(--admin-text))" }}>Testimonials</h2>
          <p className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Manage customer reviews displayed on the site</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 font-body" style={{ background: "hsl(var(--admin-indigo))" }} onClick={openNew}>
              <Plus className="h-4 w-4" /> Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-body">{editing ? "Edit" : "Add"} Testimonial</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-body">Customer Name</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label className="font-body">Review Title</Label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-body">Review Text</Label>
                <Textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={4} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-body">Rating (1-5)</Label>
                  <Input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) || 5 })} />
                </div>
                <div className="space-y-2">
                  <Label className="font-body">Sort Order</Label>
                  <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.is_featured} onCheckedChange={(v) => setForm({ ...form, is_featured: v })} />
                <Label className="font-body">Show on homepage</Label>
              </div>
              <Button type="submit" className="w-full font-body" disabled={saving} style={{ background: "hsl(var(--admin-indigo))" }}>
                {saving ? "Saving..." : editing ? "Update" : "Add"} Testimonial
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="overflow-hidden" style={{ background: "hsl(var(--admin-card-bg))" }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-body w-8">#</TableHead>
              <TableHead className="font-body">Customer</TableHead>
              <TableHead className="font-body">Title</TableHead>
              <TableHead className="font-body">Rating</TableHead>
              <TableHead className="font-body">Featured</TableHead>
              <TableHead className="font-body w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Loading...</TableCell>
              </TableRow>
            ) : testimonials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>No testimonials yet</TableCell>
              </TableRow>
            ) : (
              testimonials.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>
                    <GripVertical className="h-4 w-4 inline" /> {t.sort_order}
                  </TableCell>
                  <TableCell className="font-body font-medium" style={{ color: "hsl(var(--admin-text))" }}>{t.name}</TableCell>
                  <TableCell className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>{t.title}</TableCell>
                  <TableCell>
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className="font-body border-0 cursor-pointer"
                      style={{
                        background: t.is_featured ? "hsl(160, 70%, 92%)" : "hsl(var(--admin-sidebar-border))",
                        color: t.is_featured ? "hsl(160, 70%, 35%)" : "hsl(var(--admin-text-muted))",
                      }}
                      onClick={() => toggleFeatured(t)}
                    >
                      {t.is_featured ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(t)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)} className="hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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

export default TestimonialsTab;
