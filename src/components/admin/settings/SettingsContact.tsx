import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, MapPin, Bell, Facebook, Instagram, Shield, Award } from "lucide-react";
import type { SettingsData } from "../SettingsTab";

interface Props {
  settings: SettingsData;
  update: (patch: Partial<SettingsData>) => void;
}

const Field = ({ label, value, onChange, placeholder, icon: Icon }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; icon?: React.ElementType;
}) => (
  <div className="space-y-1.5">
    <Label className="font-body text-xs font-medium flex items-center gap-1" style={{ color: "hsl(var(--admin-text))" }}>
      {Icon && <Icon className="w-3 h-3" />} {label}
    </Label>
    <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="font-body text-sm h-9" />
  </div>
);

const SettingsContact = ({ settings, update }: Props) => (
  <div className="space-y-5">
    <div>
      <h3 className="font-display text-lg tracking-wide uppercase" style={{ color: "hsl(var(--admin-text))" }}>Contact Info</h3>
      <p className="font-body text-xs mt-0.5" style={{ color: "hsl(var(--admin-text-muted))" }}>Business details and social links shown on the website.</p>
    </div>

    {/* Notification */}
    <Field label="Notification Email" icon={Bell} value={settings.notify_email} onChange={(v) => update({ notify_email: v })} placeholder="admin@dangpestcontrol.com" />

    {/* Company */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Company Name" value={settings.company_name} onChange={(v) => update({ company_name: v })} />
      <Field label="Phone" value={settings.phone} onChange={(v) => update({ phone: v })} placeholder="(555) 123-4567" />
      <Field label="Email" value={settings.email} onChange={(v) => update({ email: v })} placeholder="info@dangpestcontrol.com" />
      <Field label="Address" value={settings.address} onChange={(v) => update({ address: v })} />
      <Field label="City" value={settings.city} onChange={(v) => update({ city: v })} />
      <div className="grid grid-cols-2 gap-3">
        <Field label="State" value={settings.state} onChange={(v) => update({ state: v })} />
        <Field label="ZIP" value={settings.zip} onChange={(v) => update({ zip: v })} />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Business Hours" icon={Clock} value={settings.hours} onChange={(v) => update({ hours: v })} />
      <Field label="Service Area" icon={MapPin} value={settings.service_area} onChange={(v) => update({ service_area: v })} placeholder="Greater Austin, TX" />
    </div>

    {/* Extended Business Info */}
    <div>
      <p className="text-[10px] font-body uppercase tracking-widest font-medium mb-3" style={{ color: "hsl(var(--admin-text-muted))", opacity: 0.6 }}>
        Business Details
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Business License #" icon={Shield} value={(settings as any).license_number || ""} onChange={(v) => update({ license_number: v } as any)} placeholder="TX-12345" />
        <Field label="Insurance / Bonding Status" value={(settings as any).insurance_status || ""} onChange={(v) => update({ insurance_status: v } as any)} placeholder="Fully insured & bonded" />
        <Field label="Founded Year" value={(settings as any).founded_year || ""} onChange={(v) => update({ founded_year: v } as any)} placeholder="2018" />
        <Field label="Number of Technicians" value={(settings as any).num_technicians || ""} onChange={(v) => update({ num_technicians: v } as any)} placeholder="5" />
        <Field label="Emergency/After-Hours Phone" value={(settings as any).emergency_phone || ""} onChange={(v) => update({ emergency_phone: v } as any)} placeholder="(903) 555-1234" />
        <div className="space-y-1.5">
          <Label className="font-body text-xs font-medium" style={{ color: "hsl(var(--admin-text))" }}>Service Radius (miles)</Label>
          <Select value={(settings as any).service_radius || "50"} onValueChange={(v) => update({ service_radius: v } as any)}>
            <SelectTrigger className="font-body text-sm h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="25">25 miles</SelectItem>
              <SelectItem value="50">50 miles</SelectItem>
              <SelectItem value="75">75 miles</SelectItem>
              <SelectItem value="100">100 miles</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Field label="Company Tagline/Slogan" value={(settings as any).tagline || ""} onChange={(v) => update({ tagline: v } as any)} placeholder="Super Powered Pest Control" />
      </div>
      <div className="flex gap-6 mt-4">
        <div className="flex items-center gap-2">
          <Switch checked={(settings as any).npma_member || false} onCheckedChange={(v) => update({ npma_member: v } as any)} />
          <Label className="font-body text-xs flex items-center gap-1"><Award className="w-3 h-3" /> NPMA Member</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={(settings as any).tpca_member || false} onCheckedChange={(v) => update({ tpca_member: v } as any)} />
          <Label className="font-body text-xs flex items-center gap-1"><Award className="w-3 h-3" /> TPCA Member</Label>
        </div>
      </div>
    </div>

    {/* Social */}
    <div>
      <p className="text-[10px] font-body uppercase tracking-widest font-medium mb-3" style={{ color: "hsl(var(--admin-text-muted))", opacity: 0.6 }}>
        Social Media
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Facebook" icon={Facebook} value={settings.facebook} onChange={(v) => update({ facebook: v })} placeholder="https://facebook.com/..." />
        <Field label="Instagram" icon={Instagram} value={settings.instagram} onChange={(v) => update({ instagram: v })} placeholder="https://instagram.com/..." />
        <Field label="Google Business" value={settings.google} onChange={(v) => update({ google: v })} placeholder="https://g.page/..." />
        <Field label="Yelp" value={settings.yelp} onChange={(v) => update({ yelp: v })} placeholder="https://yelp.com/biz/..." />
      </div>
    </div>
  </div>
);

export default SettingsContact;
