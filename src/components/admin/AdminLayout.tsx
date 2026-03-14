import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminSidebar } from "./AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Settings, ShieldAlert } from "lucide-react";
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
      // Check admin or editor role
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
        <p className="font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  if (authorized === false) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(var(--admin-bg))" }}>
        <div className="text-center space-y-4 max-w-md">
          <div className="mx-auto w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: "hsl(0, 80%, 95%)", color: "hsl(0, 80%, 55%)" }}>
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="font-body text-xl font-bold" style={{ color: "hsl(var(--admin-text))" }}>Access Denied</h2>
          <p className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>
            Your account doesn't have admin or editor permissions. Contact an administrator to request access.
          </p>
          <button
            onClick={handleLogout}
            className="font-body text-sm underline"
            style={{ color: "hsl(var(--admin-indigo))" }}
          >
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
        <div className="flex-1 flex flex-col">
          <header
            className="h-14 flex items-center justify-between border-b px-6"
            style={{
              background: "hsl(var(--admin-header-bg))",
              borderColor: "hsl(var(--admin-sidebar-border))",
            }}
          >
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h1 className="font-body text-lg font-semibold capitalize" style={{ color: "hsl(var(--admin-text))" }}>
                {activeTab}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-muted transition-colors" style={{ color: "hsl(var(--admin-text-muted))" }}>
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors" style={{ color: "hsl(var(--admin-text-muted))" }}>
                <Settings className="h-5 w-5" />
              </button>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-body text-white"
                style={{ background: "hsl(var(--admin-indigo))" }}
              >
                {(user.email || "A")[0].toUpperCase()}
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
