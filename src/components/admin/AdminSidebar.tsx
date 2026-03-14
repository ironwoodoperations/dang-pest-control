import { LayoutDashboard, Users, Search, Settings, LogOut, UserCog, FileEdit, MessageSquareQuote } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import dangLogo from "@/assets/dang-logo.png";

const navItems = [
  { title: "Dashboard", value: "dashboard", icon: LayoutDashboard },
  { title: "Leads", value: "leads", icon: Users },
  { title: "Page Content", value: "content", icon: FileEdit },
  { title: "SEO", value: "seo", icon: Search },
  { title: "Site Settings", value: "settings", icon: Settings },
  { title: "Team", value: "team", icon: UserCog },
];

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userEmail: string;
  onLogout: () => void;
}

export function AdminSidebar({ activeTab, onTabChange, userEmail, onLogout }: AdminSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className="border-r"
      style={{
        background: "hsl(var(--admin-sidebar-bg))",
        borderColor: "hsl(var(--admin-sidebar-border))",
      }}
    >
      <div className="p-4 flex items-center gap-3 border-b" style={{ borderColor: "hsl(var(--admin-sidebar-border))" }}>
        <img src={dangLogo} alt="DANG!" className="w-9 h-9 object-contain" />
        {!collapsed && (
          <span className="font-body font-bold text-base" style={{ color: "hsl(var(--admin-text))" }}>
            DANG! Admin
          </span>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-body uppercase tracking-wider px-4 pt-4 pb-2" style={{ color: "hsl(var(--admin-text-muted))" }}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = activeTab === item.value;
                return (
                  <SidebarMenuItem key={item.value}>
                    <SidebarMenuButton
                      onClick={() => onTabChange(item.value)}
                      className="font-body text-sm rounded-lg mx-2 transition-colors"
                      style={{
                        background: isActive ? "hsl(var(--admin-indigo-light))" : "transparent",
                        color: isActive ? "hsl(var(--admin-indigo))" : "hsl(var(--admin-text-muted))",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4" style={{ borderColor: "hsl(var(--admin-sidebar-border))" }}>
        {!collapsed && (
          <p className="text-xs truncate mb-2 font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
            {userEmail}
          </p>
        )}
        <SidebarMenuButton
          onClick={onLogout}
          className="font-body text-sm rounded-lg transition-colors hover:bg-muted"
          style={{ color: "hsl(var(--admin-text-muted))" }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {!collapsed && <span>Logout</span>}
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
