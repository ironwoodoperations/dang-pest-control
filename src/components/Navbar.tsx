import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Menu, X, ChevronDown } from "lucide-react";

const pestLinks = [
  { label: "General Pest Control", href: "/services/pest-control" },
  { label: "Ant Control", href: "/services/ant-control" },
  { label: "Spider Control", href: "/services/spider-control" },
  { label: "Roach Control", href: "/services/roach-control" },
  { label: "Scorpion Control", href: "/services/scorpion-control" },
  { label: "Wasp & Hornet Control", href: "/services/wasp-hornet-control" },
  { label: "Rodent Control", href: "/services/rodent-control" },
  { label: "Flea & Tick Control", href: "/services/flea-tick-control" },
  { label: "Bed Bug Control", href: "/services/bed-bug-control" },
  { label: "Snake Control", href: "/services/snake-control" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pestsOpen, setPestsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-comic text-2xl text-primary font-bold tracking-wider">
          DANG PEST CONTROL
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">Home</Link>

          {/* Services dropdown */}
          <div className="relative group">
            <button
              className="text-sm font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-1"
              onMouseEnter={() => setPestsOpen(true)}
              onMouseLeave={() => setPestsOpen(false)}
              onClick={() => setPestsOpen(!pestsOpen)}
            >
              Services <ChevronDown className="w-4 h-4" />
            </button>
            <div
              className={`absolute top-full left-0 mt-1 w-56 bg-card rounded-lg shadow-lg border border-border py-2 transition-all ${pestsOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
              onMouseEnter={() => setPestsOpen(true)}
              onMouseLeave={() => setPestsOpen(false)}
            >
              {pestLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                  onClick={() => setPestsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/services/termite-inspections"
                className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                onClick={() => setPestsOpen(false)}
              >
                Termite Inspections
              </Link>
              <Link
                to="/services/mosquito-control"
                className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                onClick={() => setPestsOpen(false)}
              >
                Mosquito Control
              </Link>
            </div>
          </div>

          <Link to="/about" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">About</Link>
          <Link to="/quote" className="btn-cta text-sm !px-6 !py-2">Get Your Quote</Link>
          <a href="tel:9038710550" className="flex items-center gap-1.5 text-sm font-bold text-primary">
            <Phone className="w-4 h-4" /> (903) 871-0550
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4">
          <Link to="/" className="block py-2 text-sm font-semibold" onClick={() => setMobileOpen(false)}>Home</Link>
          <button
            className="w-full text-left py-2 text-sm font-semibold flex items-center justify-between"
            onClick={() => setPestsOpen(!pestsOpen)}
          >
            Services <ChevronDown className={`w-4 h-4 transition-transform ${pestsOpen ? "rotate-180" : ""}`} />
          </button>
          {pestsOpen && (
            <div className="pl-4">
              {pestLinks.map((link) => (
                <Link key={link.href} to={link.href} className="block py-1.5 text-sm text-muted-foreground hover:text-primary" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <Link to="/services/termite-inspections" className="block py-1.5 text-sm text-muted-foreground hover:text-primary" onClick={() => setMobileOpen(false)}>Termite Inspections</Link>
              <Link to="/services/mosquito-control" className="block py-1.5 text-sm text-muted-foreground hover:text-primary" onClick={() => setMobileOpen(false)}>Mosquito Control</Link>
            </div>
          )}
          <Link to="/about" className="block py-2 text-sm font-semibold" onClick={() => setMobileOpen(false)}>About</Link>
          <Link to="/quote" className="block py-2 text-sm font-semibold text-primary" onClick={() => setMobileOpen(false)}>Get Your Quote</Link>
          <a href="tel:9038710550" className="flex items-center gap-1.5 py-2 text-sm font-bold text-primary">
            <Phone className="w-4 h-4" /> (903) 871-0550
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
