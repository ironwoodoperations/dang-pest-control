import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminSidebar } from "./AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ShieldAlert } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminLayout = ({ children, activeTab, onTabChange }: AdminLayoutProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async (userId: string) => {
      const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
      if (isAdmin) return true;
      const { data: isEditor } = await supabase.rpc("has_role", { _user_id: userId, _role: "editor" });
      return !!isEditor;
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (!currentUser) {
        setLoading(false);
        setAuthorized(false);
        navigate("/admin/login");
        return;
      }
      const hasAccess = await checkRole(currentUser.id);
      setAuthorized(hasAccess);
      setLoading(false);
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (!currentUser) {
        setLoading(false);
        setAuthorized(false);
        navigate("/admin/login");
        return;
      }
      const hasAccess = await checkRole(currentUser.id);
      setAuthorized(hasAccess);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(var(--admin-bg))" }}>
        <p className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  if (authorized === false) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(var(--admin-bg))" }}>
        <div className="text-center space-y-4 max-w-md">
          <div className="mx-auto w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "hsl(0, 80%, 95%)", color: "hsl(0, 80%, 55%)" }}>
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="font-body text-lg font-bold" style={{ color: "hsl(var(--admin-text))" }}>Access Denied</h2>
          <p className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>
            Your account doesn't have admin or editor permissions.
          </p>
          <button onClick={handleLogout} className="font-body text-sm underline" style={{ color: "hsl(var(--admin-indigo))" }}>
            Sign out and try a different account
          </button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full" style={{ background: "hsl(var(--admin-bg))" }}>
        <AdminSidebar
          activeTab={activeTab}
          onTabChange={onTabChange}
          userEmail={user.email || ""}
          onLogout={handleLogout}
        />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Slim top bar */}
          <header
            className="h-12 flex items-center justify-between border-b px-4 shrink-0"
            style={{
              background: "hsl(var(--admin-header-bg))",
              borderColor: "hsl(var(--admin-sidebar-border))",
            }}
          >
            <div className="flex items-center gap-2">
              <SidebarTrigger className="h-7 w-7" />
              <span className="text-[11px] font-body uppercase tracking-widest font-medium" style={{ color: "hsl(var(--admin-text-muted))" }}>
                {activeTab}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold font-body text-white"
                style={{ background: "hsl(var(--admin-indigo))" }}
              >
                {(user.email || "A")[0].toUpperCase()}
              </div>
            </div>
          </header>
          <main className="flex-1 p-5 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
