import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, MapPin, Bell, Facebook, Instagram } from "lucide-react";
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
