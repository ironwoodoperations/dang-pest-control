import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminSidebar } from "./AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ShieldAlert } from "lucide-react";
import { useHolidayMode } from "@/hooks/useHolidayMode";
import { useTenant } from "@/hooks/useTenant";
import { useToast } from "@/hooks/use-toast";
import { DemoBanner } from "./DemoMode";

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminLayout = ({ children, activeTab, onTabChange }: AdminLayoutProps) => {
  const { user, tenantId, companyName, profileLoading } = useTenant();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();
  const { enabled: holidayOn } = useHolidayMode();
  const { toast } = useToast();

  const accentColor = holidayOn ? "hsl(0, 80%, 55%)" : "hsl(var(--admin-accent))";

  useEffect(() => {
    if (profileLoading) return;
    if (!user) {
      setAuthorized(false);
      setAuthLoading(false);
      return;
    }

    const checkRole = async () => {
      const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      if (isAdmin) { setAuthorized(true); setAuthLoading(false); return; }
      const { data: isEditor } = await supabase.rpc("has_role", { _user_id: user.id, _role: "editor" });
      setAuthorized(!!isEditor);
      setAuthLoading(false);
    };
    checkRole();
  }, [user, profileLoading]);

  // Redirect to onboarding if no tenant
  useEffect(() => {
    if (!profileLoading && !authLoading && authorized && !tenantId) {
      navigate("/admin/onboarding");
    }
  }, [profileLoading, authLoading, authorized, tenantId, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (profileLoading || authLoading) {
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
          <h2 className="font-display text-2xl tracking-wide uppercase" style={{ color: "hsl(var(--admin-text))" }}>Access Denied</h2>
          <p className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>
            Your account doesn't have admin or editor permissions.
          </p>
          <button onClick={handleLogout} className="font-body text-sm underline" style={{ color: accentColor }}>
            Sign out and try a different account
          </button>
        </div>
      </div>
    );
  }

  if (!tenantId) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full" style={{ background: "hsl(var(--admin-bg))" }}>
        <AdminSidebar
          activeTab={activeTab}
          onTabChange={onTabChange}
          userEmail={user.email || ""}
          companyName={companyName || "Dashboard"}
          onLogout={handleLogout}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <header
            className="h-12 flex items-center justify-between border-b px-4 shrink-0"
            style={{
              background: "hsl(var(--admin-header-bg))",
              borderColor: "hsl(var(--admin-sidebar-border))",
            }}
          >
            <div className="flex items-center gap-2">
              <SidebarTrigger className="h-7 w-7" />
              <span className="text-[11px] font-display uppercase tracking-widest" style={{ color: "hsl(var(--admin-text-muted))" }}>
                {activeTab}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
                {companyName}
              </span>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold font-body text-white"
                style={{ background: accentColor }}
              >
                {(user.email || "A")[0].toUpperCase()}
              </div>
            </div>
          </header>
          <main className="flex-1 p-5 overflow-auto">
            <DemoBanner />
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
