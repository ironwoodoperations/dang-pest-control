import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Star, ExternalLink, ShieldCheck, Landmark, Linkedin, Youtube } from "lucide-react";
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
  { label: "Termite Inspections", slug: "termite-inspections" },
  { label: "Ant Control", slug: "ant-control" },
  { label: "Spider Control", slug: "spider-control" },
  { label: "Scorpion Control", slug: "scorpion-control" },
  { label: "Rodent Control", slug: "rodent-control" },
  { label: "Mosquito Control", slug: "mosquito-control" },
  { label: "Bed Bug Control", slug: "bed-bug-control" },
  { label: "Roach Control", slug: "roach-control" },
  { label: "Flea & Tick", slug: "flea-tick-control" },
  { label: "Wasp & Hornet Control", slug: "wasp-hornet-control" },
];

const linkStyle = { color: 'hsl(20, 30%, 25%)' };
const headingStyle = { color: 'hsl(var(--primary))' };
const iconStyle = { color: 'hsl(var(--primary))' };
const socialBg = { background: 'hsl(var(--primary))' };

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
    <footer className="bg-white py-12 border-t border-orange-100">
      <div className="container mx-auto px-4" style={{color: 'hsl(20, 40%, 12%)'}}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={dangLogo} alt={companyName} className="w-40 h-auto object-contain" />
            </Link>
            <p className="text-sm leading-relaxed mt-3" style={{color: 'hsl(20, 20%, 40%)'}}>
              Professional pest control services protecting your home and family. Licensed, insured, and locally owned.
            </p>
            <div className="flex gap-3">
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:brightness-110" style={socialBg}>
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:brightness-110" style={socialBg}>
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {social.google && (
                <a href={social.google} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:brightness-110" style={socialBg}>
                  <Star className="w-4 h-4" />
                </a>
              )}
              {social.yelp && (
                <a href={social.yelp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:brightness-110" style={socialBg}>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <a
                href="https://www.linkedin.com/company/dangpestcontrol/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:brightness-110"
                style={socialBg}
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@dangpestcontrol"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:brightness-110"
                style={socialBg}
              >
                <Youtube className="w-4 h-4" />
              </a>
              {!social.facebook && !social.instagram && !social.google && !social.yelp && (
                <>
                  <span className="w-10 h-10 rounded-full flex items-center justify-center text-white opacity-40" style={socialBg}><Facebook className="w-4 h-4" /></span>
                  <span className="w-10 h-10 rounded-full flex items-center justify-center text-white opacity-40" style={socialBg}><Instagram className="w-4 h-4" /></span>
                </>
              )}
            </div>
            {/* Trust badges */}
            <div className="flex gap-3 pt-2">
              <a href="https://www.bbb.org/us/tx/tyler/profile/pest-control/dang-pest-control-1075-28152342" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:brightness-110" style={socialBg} title="BBB Accredited">
                <ShieldCheck className="w-4 h-4" />
              </a>
              <a href="https://www.tylertexas.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:brightness-110" style={socialBg} title="Tyler Chamber of Commerce">
                <Landmark className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-comic text-sm uppercase mb-4" style={headingStyle}>Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((s) => (
                <li key={s.slug}>
                  <Link to={`/${s.slug}`} className="text-sm block mb-2 transition-colors hover:text-primary" style={linkStyle}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-comic text-sm uppercase mb-4" style={headingStyle}>Company</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm block mb-2 transition-colors hover:text-primary" style={linkStyle}>Home</Link></li>
              <li><Link to="/about" className="text-sm block mb-2 transition-colors hover:text-primary" style={linkStyle}>About Us</Link></li>
              <li><Link to="/quote" className="text-sm block mb-2 transition-colors hover:text-primary" style={linkStyle}>Get a Quote</Link></li>
              <li><Link to="/contact" className="text-sm block mb-2 transition-colors hover:text-primary" style={linkStyle}>Contact</Link></li>
              <li><Link to="/service-area" className="text-sm block mb-2 transition-colors hover:text-primary" style={linkStyle}>Service Area</Link></li>
              <li><Link to="/reviews" className="text-sm block mb-2 transition-colors hover:text-primary" style={linkStyle}>Reviews</Link></li>
              <li><Link to="/blog" className="text-sm block mb-2 transition-colors hover:text-primary" style={linkStyle}>Blog</Link></li>
              <li><Link to="/faq" className="text-sm block mb-2 transition-colors hover:text-primary" style={linkStyle}>FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-comic text-sm uppercase mb-4" style={headingStyle}>Contact</h4>
            <ul className="space-y-3">
              {biz.phone && (
                <li>
                  <a href={`tel:${biz.phone}`} className="flex items-center gap-2 text-sm font-bold hover:brightness-110 transition-all" style={{color: 'hsl(var(--primary))'}}>
                    <Phone className="w-4 h-4 flex-shrink-0" style={iconStyle} /> {biz.phone}
                  </a>
                </li>
              )}
              {biz.email && (
                <li>
                  <a href={`mailto:${biz.email}`} className="flex items-center gap-2 text-sm transition-colors hover:text-primary" style={linkStyle}>
                    <Mail className="w-4 h-4 flex-shrink-0" style={iconStyle} /> {biz.email}
                  </a>
                </li>
              )}
              {fullAddress && (
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={iconStyle} />
                  <span className="text-sm" style={linkStyle}>{fullAddress}</span>
                </li>
              )}
              {biz.hours && (
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" style={iconStyle} />
                  <span className="text-sm" style={linkStyle}>{biz.hours}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 text-center text-xs border-t border-gray-100" style={{color: 'hsl(20, 10%, 55%)'}}>
          © {new Date().getFullYear()} {companyName}. All rights reserved.
          <span className="mx-2">·</span>
          <Link to="/accessibility" className="hover:text-primary transition-colors" style={{color: 'hsl(20, 10%, 55%)'}}>Accessibility</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
