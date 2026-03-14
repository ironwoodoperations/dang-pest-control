import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Star, ExternalLink } from "lucide-react";
import dangLogo from "@/assets/dang-logo.png";

interface BusinessInfo {
  company_name?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  hours?: string;
  service_area?: string;
}

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  google?: string;
  yelp?: string;
}

const serviceLinks = [
  { label: "General Pest Control", slug: "pest-control" },
  { label: "Termite Control", slug: "termite-control" },
  { label: "Ant Control", slug: "ant-control" },
  { label: "Spider Control", slug: "spider-control" },
  { label: "Scorpion Control", slug: "scorpion-control" },
  { label: "Rodent Control", slug: "rodent-control" },
  { label: "Bed Bug Control", slug: "bed-bug-control" },
  { label: "Roach Control", slug: "roach-control" },
  { label: "Flea & Tick", slug: "flea-tick-control" },
  { label: "Wasp Control", slug: "wasp-control" },
  { label: "Snake Control", slug: "snake-control" },
];

const Footer = () => {
  const [biz, setBiz] = useState<BusinessInfo>({});
  const [social, setSocial] = useState<SocialLinks>({});

  useEffect(() => {
    supabase
      .from("site_config")
      .select("key, value")
      .in("key", ["business_info", "social_links"])
      .then(({ data }) => {
        if (data) {
          for (const row of data) {
            if (row.key === "business_info") setBiz(row.value as unknown as BusinessInfo);
            if (row.key === "social_links") setSocial(row.value as unknown as SocialLinks);
          }
        }
      });
  }, []);

  const companyName = biz.company_name || "Dang Pest Control";
  const fullAddress = [biz.address, biz.city, biz.state, biz.zip].filter(Boolean).join(", ");

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={dangLogo} alt={companyName} className="w-10 h-10 object-contain" />
              <span className="text-comic text-xl text-background">{companyName}</span>
            </Link>
            <p className="text-sm opacity-70 leading-relaxed">
              Professional pest control services protecting your home and family. Licensed, insured, and locally owned.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-body font-bold text-sm uppercase tracking-wider mb-4 opacity-60">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body font-bold text-sm uppercase tracking-wider mb-4 opacity-60">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Home</Link></li>
              <li><Link to="/about" className="text-sm opacity-70 hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link to="/quote" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Get a Quote</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-bold text-sm uppercase tracking-wider mb-4 opacity-60">Contact</h4>
            <ul className="space-y-3">
              {biz.phone && (
                <li>
                  <a href={`tel:${biz.phone}`} className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity">
                    <Phone className="w-4 h-4 shrink-0" /> {biz.phone}
                  </a>
                </li>
              )}
              {biz.email && (
                <li>
                  <a href={`mailto:${biz.email}`} className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity">
                    <Mail className="w-4 h-4 shrink-0" /> {biz.email}
                  </a>
                </li>
              )}
              {fullAddress && (
                <li className="flex items-start gap-2 text-sm opacity-70">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" /> {fullAddress}
                </li>
              )}
              {biz.hours && (
                <li className="flex items-start gap-2 text-sm opacity-70">
                  <Clock className="w-4 h-4 shrink-0 mt-0.5" /> {biz.hours}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 text-center text-xs opacity-50">
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
