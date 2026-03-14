import { LayoutDashboard, Users, Search, Settings, LogOut, UserCog } from "lucide-react";
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
    <Sidebar collapsible="icon" className="border-r border-primary/20 bg-gradient-to-b from-primary to-[hsl(var(--orange-dark))]">
      <div className="p-4 flex items-center gap-3 border-b border-primary-foreground/20">
        <img src={dangLogo} alt="DANG!" className="w-10 h-10 object-contain" />
        {!collapsed && <span className="font-body font-bold text-lg text-accent">DANG! Admin</span>}
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-accent/60">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.value)}
                    className={
                      activeTab === item.value
                        ? "bg-accent/20 text-accent font-semibold"
                        : "text-accent/80 hover:bg-accent/10 hover:text-accent"
                    }
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-primary-foreground/20 p-4">
        {!collapsed && (
          <p className="text-xs text-accent/60 truncate mb-2">{userEmail}</p>
        )}
        <SidebarMenuButton onClick={onLogout} className="text-accent/80 hover:bg-accent/10 hover:text-accent">
          <LogOut className="mr-2 h-4 w-4" />
          {!collapsed && <span>Logout</span>}
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
