import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(var(--admin-bg))" }}>
      <Card className="w-full max-w-md shadow-lg" style={{ background: "hsl(var(--admin-card-bg))" }}>
        <CardHeader className="text-center">
          <div
            className="mx-auto mb-4 w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: "hsl(var(--admin-indigo-light))", color: "hsl(var(--admin-indigo))" }}
          >
            <Lock className="w-6 h-6" />
          </div>
          <CardTitle className="font-body text-2xl" style={{ color: "hsl(var(--admin-text))" }}>
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm font-body">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-body">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-body">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button
              type="submit"
              className="w-full font-body text-white"
              disabled={loading}
              style={{ background: "hsl(var(--admin-indigo))" }}
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
