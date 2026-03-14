import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import dangLogo from "@/assets/dang-logo.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate("/admin");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "hsl(var(--admin-teal))" }}
    >
      <Card className="w-full max-w-sm shadow-2xl border-0 rounded-2xl overflow-hidden" style={{ background: "hsl(var(--admin-card-bg))" }}>
        {/* Branded header */}
        <div className="flex flex-col items-center pt-10 pb-6 px-6" style={{ background: "hsl(var(--admin-sidebar-bg))" }}>
          <img src={dangLogo} alt="DANG! Pest Control" className="w-20 h-20 object-contain mb-3" />
          <h1 className="font-display text-2xl tracking-wide uppercase text-white">
            DANG! Pest Control
          </h1>
          <p className="font-body text-xs mt-1" style={{ color: "hsl(var(--admin-sidebar-text-muted))" }}>
            Admin Dashboard
          </p>
        </div>

        <CardContent className="p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-body">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-body text-sm" style={{ color: "hsl(var(--admin-text))" }}>Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@dangpestcontrol.com" required className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-body text-sm" style={{ color: "hsl(var(--admin-text))" }}>Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="h-11" />
            </div>
            <Button
              type="submit"
              className="w-full h-11 font-body font-semibold text-white"
              disabled={loading}
              style={{ background: "hsl(var(--admin-accent))" }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
