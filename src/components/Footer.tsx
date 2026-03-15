import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
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

const aboutLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Get a Quote", href: "/quote" },
  { label: "Contact", href: "/contact" },
  { label: "Service Area", href: "/service-area" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

const linkStyle = { color: "hsl(20, 30%, 25%)" };
const headingStyle = { color: "hsl(var(--primary))" };
const socialBg = { background: "hsl(var(--primary))" };

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

  const footerBg = "https://www.dangpestcontrol.com/wp-content/uploads/2025/03/footer_bg.jpg";

  return (
    <footer
      className="py-12 border-t border-orange-100"
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4" style={{ color: "hsl(20, 40%, 12%)" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: SERVICES */}
          <div>
            <h4 className="text-comic text-sm uppercase mb-4" style={headingStyle}>
              Services
            </h4>
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

          {/* Column 2: Logo + description + social */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img src={dangLogo} alt={companyName} className="w-40 h-auto object-contain" />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(20, 20%, 40%)" }}>
              Professional pest control services protecting your home and family. Licensed, insured, and locally owned.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href={social.facebook || "https://www.facebook.com/dangpestcontrol"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:brightness-110"
                style={socialBg}
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={social.instagram || "https://www.instagram.com/dangpestcontrol"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:brightness-110"
                style={socialBg}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/dangpestcontrol/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:brightness-110"
                style={socialBg}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/dangpestcontrol"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:brightness-110"
                style={socialBg}
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 3: ABOUT */}
          <div>
            <h4 className="text-comic text-sm uppercase mb-4" style={headingStyle}>
              About
            </h4>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm block mb-2 transition-colors hover:text-primary" style={linkStyle}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-100 text-center text-xs" style={{ color: "hsl(20, 10%, 55%)" }}>
          © {new Date().getFullYear()} {companyName}. All rights reserved.
          <span className="mx-1">|</span>
          <Link to="/privacy" className="hover:text-primary transition-colors" style={{ color: "hsl(20, 10%, 55%)" }}>
            Privacy Policy
          </Link>
          <span className="mx-1">|</span>
          <Link to="/privacy-settings" className="hover:text-primary transition-colors" style={{ color: "hsl(20, 10%, 55%)" }}>
            Privacy Settings
          </Link>
          <span className="mx-1">|</span>
          <Link to="/cookies" className="hover:text-primary transition-colors" style={{ color: "hsl(20, 10%, 55%)" }}>
            Cookie Policy
          </Link>
          <span className="mx-1">|</span>
          <Link to="/terms" className="hover:text-primary transition-colors" style={{ color: "hsl(20, 10%, 55%)" }}>
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
