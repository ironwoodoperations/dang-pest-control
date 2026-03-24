import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTenant } from "@/hooks/useTenant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Pencil, Plus, Trash2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LocationRow {
  id?: string;
  slug: string;
  city: string;
  hero_title: string;
  hero_description: string;
  intro: string;
  local_pest_description: string;
  map_embed_url: string;
  local_testimonial_quote: string;
  meta_title: string;
  meta_description: string;
  is_live: boolean;
}

const emptyLocation: LocationRow = {
  slug: "",
  city: "",
  hero_title: "",
  hero_description: "",
  intro: "",
  local_pest_description: "",
  map_embed_url: "",
  local_testimonial_quote: "",
  meta_title: "",
  meta_description: "",
  is_live: true,
};

const LocationsTab = () => {
  const [locations, setLocations] = useState<LocationRow[]>([]);
  const [editing, setEditing] = useState<LocationRow | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { tenantId } = useTenant();

  useEffect(() => {
    fetchLocations();
  }, [tenantId]);

  const fetchLocations = async () => {
    if (!tenantId) return;
    const { data } = await supabase.from("location_data").select("*").eq("tenant_id", tenantId).order("city");
    if (data) setLocations(data as LocationRow[]);
  };

  const handleEdit = (loc: LocationRow) => {
    setEditing({ ...loc });
    setIsNew(false);
  };

  const handleNew = () => {
    setEditing({ ...emptyLocation });
    setIsNew(true);
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);

    const payload = {
      slug: editing.slug,
      city: editing.city,
      hero_title: editing.hero_title,
      hero_description: editing.hero_description,
      intro: editing.intro,
      local_pest_description: editing.local_pest_description,
      map_embed_url: editing.map_embed_url,
      local_testimonial_quote: editing.local_testimonial_quote,
      meta_title: editing.meta_title,
      meta_description: editing.meta_description,
      is_live: editing.is_live,
      tenant_id: tenantId,
    };

    let error;
    if (isNew) {
      ({ error } = await supabase.from("location_data").insert(payload));
    } else {
      ({ error } = await supabase.from("location_data").update(payload).eq("id", editing.id!));
    }

    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved", description: `${editing.city} location saved.` });
      setEditing(null);
      fetchLocations();
    }
  };

  const handleDelete = async (loc: LocationRow) => {
    if (!confirm(`Delete ${loc.city}? This cannot be undone.`)) return;
    const { error } = await supabase.from("location_data").delete().eq("id", loc.id!);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: `${loc.city} removed.` });
      fetchLocations();
    }
  };

  const updateField = (field: keyof LocationRow, value: string) => {
    if (!editing) return;
    setEditing({ ...editing, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-body" style={{ color: "hsl(var(--admin-text))" }}>
            Location Pages
          </h2>
          <p className="text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>
            Manage local landing pages for each service area.
          </p>
        </div>
        <Button onClick={handleNew} className="gap-2">
          <Plus className="w-4 h-4" /> Add Location
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>City</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Hero Title</TableHead>
                <TableHead>Live</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locations.map((loc) => (
                <TableRow key={loc.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      {loc.city}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">/{loc.slug}</TableCell>
                  <TableCell className="text-muted-foreground truncate max-w-[200px]">{loc.hero_title}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${loc.is_live ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                      {loc.is_live ? "Live" : "Draft"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(loc)}>
                        <Pencil className="w-3 h-3 mr-1" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(loc)} className="text-destructive hover:text-destructive">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {locations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No locations yet. Click "Add Location" to create one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit / New Drawer */}
      <Sheet open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{isNew ? "New Location" : `Edit ${editing?.city}`}</SheetTitle>
          </SheetHeader>
          {editing && (
            <div className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City Name</Label>
                  <Input value={editing.city} onChange={(e) => {
                    const city = e.target.value;
                    setEditing({
                      ...editing,
                      city,
                      ...(isNew ? { slug: city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-tx' } : {}),
                    });
                  }} placeholder="Longview" />
                </div>
                <div className="space-y-2">
                  <Label>URL Slug</Label>
                  <Input value={editing.slug} onChange={(e) => updateField("slug", e.target.value)} placeholder="longview-tx" disabled={!isNew} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Hero Title</Label>
                <Input value={editing.hero_title} onChange={(e) => updateField("hero_title", e.target.value)} placeholder="Expert Pest Control in Longview, TX" />
              </div>

              <div className="space-y-2">
                <Label>Hero Description</Label>
                <Textarea value={editing.hero_description} onChange={(e) => updateField("hero_description", e.target.value)} rows={2} placeholder="Short description shown below hero title..." />
              </div>

              <div className="space-y-2">
                <Label>Local Intro</Label>
                <Textarea value={editing.intro} onChange={(e) => updateField("intro", e.target.value)} rows={3} placeholder="A paragraph about this specific community..." />
              </div>

              <div className="space-y-2">
                <Label>Common Local Pests</Label>
                <Textarea value={editing.local_pest_description} onChange={(e) => updateField("local_pest_description", e.target.value)} rows={3} placeholder="Describe pests specific to this city's climate..." />
              </div>

              <div className="space-y-2">
                <Label>Google Maps Embed URL</Label>
                <Input value={editing.map_embed_url} onChange={(e) => updateField("map_embed_url", e.target.value)} placeholder="https://www.google.com/maps/embed?pb=..." />
              </div>

              <div className="space-y-2">
                <Label>Local Testimonial Quote</Label>
                <Textarea value={editing.local_testimonial_quote} onChange={(e) => updateField("local_testimonial_quote", e.target.value)} rows={3} placeholder="A review from a customer in this city..." />
              </div>

              <div className="space-y-2">
                <Label>Meta Title (SEO)</Label>
                <Input value={editing.meta_title} onChange={(e) => updateField("meta_title", e.target.value)} placeholder="Pest Control in Longview, TX | Dang Pest Control" />
              </div>

              <div className="space-y-2">
                <Label>Meta Description (SEO)</Label>
                <Textarea value={editing.meta_description} onChange={(e) => updateField("meta_description", e.target.value)} rows={2} placeholder="Professional pest control services in Longview, TX..." />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  role="switch"
                  aria-checked={editing.is_live}
                  onClick={() => setEditing({ ...editing, is_live: !editing.is_live })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${editing.is_live ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${editing.is_live ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
                <Label>{editing.is_live ? "Live" : "Draft"}</Label>
              </div>

              <Button onClick={handleSave} disabled={saving || !editing.slug || !editing.city} className="w-full gap-2">
                <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Location"}
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default LocationsTab;
