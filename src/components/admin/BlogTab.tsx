import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  published: boolean;
  author: string;
  created_at: string;
  updated_at: string;
}

const emptyForm = { slug: "", title: "", excerpt: "", content: "", featured_image: "", published: false, author: "Dang Pest Control" };

const BlogTab = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setPosts(data as BlogPost[]);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (p: BlogPost) => {
    setEditing(p);
    setForm({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      featured_image: p.featured_image || "",
      published: p.published,
      author: p.author,
    });
    setOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      featured_image: form.featured_image || null,
      updated_at: new Date().toISOString(),
    };

    if (editing) {
      const { error } = await supabase.from("blog_posts").update(payload).eq("id", editing.id);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Post updated" });
    } else {
      const { error } = await supabase.from("blog_posts").insert(payload);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Post created" });
    }
    setSaving(false);
    setOpen(false);
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (!error) { toast({ title: "Post deleted" }); fetchPosts(); }
  };

  const togglePublished = async (p: BlogPost) => {
    await supabase.from("blog_posts").update({ published: !p.published }).eq("id", p.id);
    fetchPosts();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-body font-bold" style={{ color: "hsl(var(--admin-text))" }}>Blog Posts</h2>
          <p className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Create and manage blog content</p>
        </div>
        <Button className="gap-2 font-body" style={{ background: "hsl(var(--admin-indigo))" }} onClick={openNew}>
          <Plus className="h-4 w-4" /> New Post
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-body">{editing ? "Edit" : "New"} Blog Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label className="font-body">Title</Label>
              <Input
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm({ ...form, title, slug: editing ? form.slug : generateSlug(title) });
                }}
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="font-body">Slug</Label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
              <p className="text-xs font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>URL: /blog/{form.slug}</p>
            </div>
            <div className="space-y-2">
              <Label className="font-body">Excerpt</Label>
              <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} required />
            </div>
            <div className="space-y-2">
              <Label className="font-body">Content (HTML supported)</Label>
              <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={12} className="font-mono text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-body">Featured Image URL</Label>
                <Input value={form.featured_image} onChange={(e) => setForm({ ...form, featured_image: e.target.value })} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label className="font-body">Author</Label>
                <Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
              <Label className="font-body">Published</Label>
            </div>
            <Button type="submit" className="w-full font-body" disabled={saving} style={{ background: "hsl(var(--admin-indigo))" }}>
              {saving ? "Saving..." : editing ? "Update Post" : "Create Post"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Card className="overflow-hidden" style={{ background: "hsl(var(--admin-card-bg))" }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-body">Title</TableHead>
              <TableHead className="font-body">Slug</TableHead>
              <TableHead className="font-body">Status</TableHead>
              <TableHead className="font-body">Date</TableHead>
              <TableHead className="font-body w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Loading...</TableCell>
              </TableRow>
            ) : posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>No blog posts yet</TableCell>
              </TableRow>
            ) : (
              posts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-body font-medium max-w-[200px] truncate" style={{ color: "hsl(var(--admin-text))" }}>{p.title}</TableCell>
                  <TableCell className="font-mono text-xs" style={{ color: "hsl(var(--admin-text-muted))" }}>/blog/{p.slug}</TableCell>
                  <TableCell>
                    <Badge
                      className="font-body border-0 cursor-pointer"
                      style={{
                        background: p.published ? "hsl(160, 70%, 92%)" : "hsl(var(--admin-sidebar-border))",
                        color: p.published ? "hsl(160, 70%, 35%)" : "hsl(var(--admin-text-muted))",
                      }}
                      onClick={() => togglePublished(p)}
                    >
                      {p.published ? <><Eye className="h-3 w-3 mr-1" /> Live</> : <><EyeOff className="h-3 w-3 mr-1" /> Draft</>}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
                    {new Date(p.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} className="hover:text-destructive">
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

export default BlogTab;
