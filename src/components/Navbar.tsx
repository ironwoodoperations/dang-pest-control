import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import dangLogo from "@/assets/dang-logo.png";

const pestLinks = [
  { label: "General Pest Control", href: "/pest-control" },
  { label: "Ant Control", href: "/ant-control" },
  { label: "Spider Control", href: "/spider-control" },
  { label: "Roach Control", href: "/roach-control" },
  { label: "Scorpion Control", href: "/scorpion-control" },
  { label: "Wasp & Hornet Control", href: "/wasp-hornet-control" },
  { label: "Rodent Control", href: "/rodent-control" },
  { label: "Flea & Tick Control", href: "/flea-tick-control" },
  { label: "Bed Bug Control", href: "/bed-bug-control" },
  { label: "Snake Control", href: "/snake-control" },
];

const termiteLinks = [
  { label: "Termite Inspections", href: "/termite-inspections" },
  { label: "Termite Control", href: "/termite-control" },
];

const aboutLinks = [
  { label: "About Us", href: "/about" },
  { label: "Get a Quote", href: "/quote" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="hero-bg relative z-50 pt-6 pb-0">
      {/* Yellow pill navbar with logo inline */}
      <div className="container mx-auto px-4">
        <nav className="navbar-pill flex items-center justify-between px-4 md:px-8 py-1.5 mx-4 md:mx-8 relative z-0">
          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {/* Pests dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("pests")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="navbar-link flex items-center gap-1">
                Pests <ChevronDown className="w-4 h-4" />
              </button>
              {openDropdown === "pests" && (
                <div className="navbar-dropdown">
                  {pestLinks.map((link) => (
                    <Link key={link.href} to={link.href} className="navbar-dropdown-item">
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mosquitos link */}
            <Link to="/mosquito-control" className="navbar-link">
              Mosquitos
            </Link>

            {/* Termites dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("termites")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="navbar-link flex items-center gap-1">
                Termites <ChevronDown className="w-4 h-4" />
              </button>
              {openDropdown === "termites" && (
                <div className="navbar-dropdown">
                  {termiteLinks.map((link) => (
                    <Link key={link.href} to={link.href} className="navbar-dropdown-item">
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* About dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("about")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="navbar-link flex items-center gap-1">
                About <ChevronDown className="w-4 h-4" />
              </button>
              {openDropdown === "about" && (
                <div className="navbar-dropdown">
                  {aboutLinks.map((link) => (
                    <Link key={link.href} to={link.href} className="navbar-dropdown-item">
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center logo - overlaps above the pill */}
          <Link to="/" className="hidden md:block absolute left-1/2 -translate-x-1/2 -top-14 z-10">
            <img
              src={dangLogo}
              alt="Dang Pest Control"
              className="w-48 h-auto drop-shadow-lg"
            />
          </Link>

          {/* Right side: phone + CTA */}
          <div className="hidden md:flex items-center gap-6">
            <a href="tel:9038710550" className="flex items-center gap-2 text-foreground font-bold text-sm">
              <Phone className="w-5 h-5" />
              <div className="leading-tight">
                <div className="text-xs font-semibold">Call us</div>
                <div className="font-bold">(903) 871-0550</div>
              </div>
            </a>
            <Link to="/quote" className="btn-cta-cyan">
              Get Your Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Mobile: show logo text as fallback */}
          <span className="md:hidden text-comic text-lg text-foreground">DANG!</span>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 mx-8 rounded-b-2xl shadow-lg">
          <button
            className="w-full text-left py-2 text-sm font-semibold flex items-center justify-between"
            onClick={() => setOpenDropdown(openDropdown === "pests" ? null : "pests")}
          >
            Pests <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === "pests" ? "rotate-180" : ""}`} />
          </button>
          {openDropdown === "pests" && (
            <div className="pl-4">
              {pestLinks.map((link) => (
                <Link key={link.href} to={link.href} className="block py-1.5 text-sm text-muted-foreground hover:text-primary" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>
          )}
          <Link to="/mosquito-control" className="block py-2 text-sm font-semibold" onClick={() => setMobileOpen(false)}>Mosquitos</Link>
          <Link to="/termite-inspections" className="block py-2 text-sm font-semibold" onClick={() => setMobileOpen(false)}>Termites</Link>
          <Link to="/about" className="block py-2 text-sm font-semibold" onClick={() => setMobileOpen(false)}>About</Link>
          <Link to="/quote" className="block py-2 text-sm font-semibold text-primary" onClick={() => setMobileOpen(false)}>Get Your Quote</Link>
          <a href="tel:9038710550" className="flex items-center gap-1.5 py-2 text-sm font-bold text-primary">
            <Phone className="w-4 h-4" /> (903) 871-0550
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
