import { useState, useEffect } from "react";
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
  { label: "View All", href: "/pest-control" },
];

const termiteLinks = [
  { label: "Termite Inspections", href: "/termite-inspections" },
  { label: "Termite Control", href: "/termite-control" },
];

const aboutLinks = [
  { label: "About Us", href: "/about" },
  { label: "Service Area", href: "/service-area" },
  { label: "Customer Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Frequently Asked Questions", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white 
        shadow-sm transition-all duration-300">
        <div className="mx-auto max-w-[1400px] px-4 flex items-center 
          justify-between py-2">

          {/* Left nav links */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative"
              onMouseEnter={() => setOpenDropdown("pests")}
              onMouseLeave={() => setOpenDropdown(null)}>
              <button className="navbar-link flex items-center gap-1">
                Pests <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {openDropdown === "pests" && (
                <div className="navbar-dropdown">
                  {pestLinks.map((l) => (
                    <Link key={l.href} to={l.href}
                      className="navbar-dropdown-item">{l.label}</Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/mosquito-control" className="navbar-link">
              Mosquitos
            </Link>
            <div className="relative"
              onMouseEnter={() => setOpenDropdown("termites")}
              onMouseLeave={() => setOpenDropdown(null)}>
              <button className="navbar-link flex items-center gap-1">
                Termites <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {openDropdown === "termites" && (
                <div className="navbar-dropdown">
                  {termiteLinks.map((l) => (
                    <Link key={l.href} to={l.href}
                      className="navbar-dropdown-item">{l.label}</Link>
                  ))}
                </div>
              )}
            </div>
            <div className="relative"
              onMouseEnter={() => setOpenDropdown("about")}
              onMouseLeave={() => setOpenDropdown(null)}>
              <button className="navbar-link flex items-center gap-1">
                About <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {openDropdown === "about" && (
                <div className="navbar-dropdown">
                  {aboutLinks.map((l) => (
                    <Link key={l.href} to={l.href}
                      className="navbar-dropdown-item">{l.label}</Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center small logo */}
          <Link to="/" className="hidden md:block absolute left-1/2 
            -translate-x-1/2">
            <img src={dangLogo} alt="Dang Pest Control"
              className="w-16 h-auto drop-shadow-md" />
          </Link>

          {/* Mobile small logo */}
          <Link to="/" className="md:hidden">
            <img src={dangLogo} alt="Dang Pest Control"
              className="w-12 h-auto" />
          </Link>

          {/* Right: phone + CTA */}
          <div className="hidden md:flex items-center gap-5">
            <a href="tel:9038710550"
              className="flex items-center gap-2 font-bold"
              style={{ color: 'hsl(20, 40%, 12%)' }}>
              <Phone className="w-4 h-4" />
              <div className="leading-tight">
                <div className="text-xs font-semibold">Call us</div>
                <div className="text-sm font-bold">(903) 871-0550</div>
              </div>
            </a>
            <Link to="/quote" className="btn-cta-cyan text-sm px-5 py-2">
              Get Your Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: 'hsl(20, 40%, 12%)' }}>
            {mobileOpen
              ? <X className="w-6 h-6" />
              : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <header className="hero-bg relative z-50 pt-14 pb-0 mt-[52px]">
      <div className="mx-auto max-w-[1400px] px-4">
        <nav className="navbar-pill flex items-center justify-between 
          px-6 md:px-8 py-3.5 relative z-0">

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative"
              onMouseEnter={() => setOpenDropdown("pests")}
              onMouseLeave={() => setOpenDropdown(null)}>
              <button className="navbar-link flex items-center gap-1">
                Pests <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {openDropdown === "pests" && (
                <div className="navbar-dropdown">
                  {pestLinks.map((l) => (
                    <Link key={l.href} to={l.href}
                      className="navbar-dropdown-item">
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/mosquito-control" className="navbar-link">
              Mosquitos
            </Link>

            <div className="relative"
              onMouseEnter={() => setOpenDropdown("termites")}
              onMouseLeave={() => setOpenDropdown(null)}>
              <button className="navbar-link flex items-center gap-1">
                Termites <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {openDropdown === "termites" && (
                <div className="navbar-dropdown">
                  {termiteLinks.map((l) => (
                    <Link key={l.href} to={l.href}
                      className="navbar-dropdown-item">
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative"
              onMouseEnter={() => setOpenDropdown("about")}
              onMouseLeave={() => setOpenDropdown(null)}>
              <button className="navbar-link flex items-center gap-1">
                About <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {openDropdown === "about" && (
                <div className="navbar-dropdown">
                  {aboutLinks.map((l) => (
                    <Link key={l.href} to={l.href}
                      className="navbar-dropdown-item">
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center logo */}
          <Link to="/" className="hidden md:block absolute left-1/2 
            -translate-x-1/2 -top-10 z-10">
            <img src={dangLogo} alt="Dang Pest Control"
              className="w-60 h-auto drop-shadow-lg" />
          </Link>

          {/* Right: phone + CTA */}
          <div className="hidden md:flex items-center gap-5">
            <a href="tel:9038710550"
              className="flex items-center gap-2 font-bold"
              style={{ color: 'hsl(20, 40%, 12%)' }}>
              <Phone className="w-5 h-5" />
              <div className="leading-tight">
                <div className="text-xs font-semibold">Call us</div>
                <div className="text-sm font-bold">(903) 871-0550</div>
              </div>
            </a>
            <Link to="/quote" className="btn-cta-cyan text-base px-7 py-3">
              Get Your Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: 'hsl(20, 40%, 12%)' }}>
            {mobileOpen
              ? <X className="w-6 h-6" />
              : <Menu className="w-6 h-6" />}
          </button>

          <span className="md:hidden text-comic text-lg"
            style={{ color: 'hsl(20, 40%, 12%)' }}>
            DANG!
          </span>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-yellow-200 
          px-4 pb-4 mx-4 rounded-b-2xl shadow-lg">
          <button className="w-full text-left py-2 text-sm font-bold 
            flex justify-between"
            onClick={() => setOpenDropdown(
              openDropdown === "pests" ? null : "pests"
            )}>
            Pests <ChevronDown className={`w-4 h-4 transition-transform 
              ${openDropdown === "pests" ? "rotate-180" : ""}`} />
          </button>
          {openDropdown === "pests" && (
            <div className="pl-4">
              {pestLinks.map((l) => (
                <Link key={l.href} to={l.href}
                  className="block py-1.5 text-sm text-muted-foreground 
                  hover:text-primary"
                  onClick={() => setMobileOpen(false)}>
                  {l.label}
                </Link>
              ))}
            </div>
          )}
          <Link to="/mosquito-control"
            className="block py-2 text-sm font-bold"
            onClick={() => setMobileOpen(false)}>
            Mosquitos
          </Link>
          <Link to="/termite-inspections"
            className="block py-2 text-sm font-bold"
            onClick={() => setMobileOpen(false)}>
            Termites
          </Link>
          <button className="w-full text-left py-2 text-sm font-bold 
            flex justify-between"
            onClick={() => setOpenDropdown(
              openDropdown === "about" ? null : "about"
            )}>
            About <ChevronDown className={`w-4 h-4 transition-transform 
              ${openDropdown === "about" ? "rotate-180" : ""}`} />
          </button>
          {openDropdown === "about" && (
            <div className="pl-4">
              {aboutLinks.map((l) => (
                <Link key={l.href} to={l.href}
                  className="block py-1.5 text-sm text-muted-foreground 
                  hover:text-primary"
                  onClick={() => setMobileOpen(false)}>
                  {l.label}
                </Link>
              ))}
            </div>
          )}
          <Link to="/quote"
            className="block py-2 text-sm font-bold text-primary"
            onClick={() => setMobileOpen(false)}>
            Get Your Quote
          </Link>
          <a href="tel:9038710550"
            className="flex items-center gap-1.5 py-2 text-sm font-bold 
            text-primary">
            <Phone className="w-4 h-4" /> (903) 871-0550
          </a>
          <a href="sms:9038710550"
            className="flex items-center gap-1.5 py-2 text-sm font-bold 
            text-primary">
            Text Us
          </a>
        </div>
      )}
    </header></>
  );
};

export default Navbar;