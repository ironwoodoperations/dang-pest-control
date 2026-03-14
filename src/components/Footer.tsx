const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-6">
      <div className="container mx-auto px-4 text-center text-sm opacity-80">
        © {new Date().getFullYear()} Dang Pest Control. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
