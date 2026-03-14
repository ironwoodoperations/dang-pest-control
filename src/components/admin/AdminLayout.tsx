import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminSidebar } from "./AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Settings } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminLayout = ({ children, activeTab, onTabChange }: AdminLayoutProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) navigate("/admin/login");
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) navigate("/admin/login");
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
