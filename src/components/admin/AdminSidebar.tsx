import { LayoutDashboard, Users, Search, Settings, LogOut, UserCog, FileEdit, MessageSquareQuote, BookOpen, MapPin, ChevronLeft } from "lucide-react";
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

const mainNav = [
  { title: "Dashboard", value: "dashboard", icon: LayoutDashboard },
  { title: "Leads", value: "leads", icon: Users },
];

const contentNav = [
  { title: "Page Content", value: "content", icon: FileEdit },
  { title: "Blog", value: "blog", icon: BookOpen },
  { title: "Locations", value: "locations", icon: MapPin },
  { title: "Testimonials", value: "testimonials", icon: MessageSquareQuote },
];

const systemNav = [
  { title: "SEO", value: "seo", icon: Search },
  { title: "Settings", value: "settings", icon: Settings },
  { title: "Team", value: "team", icon: UserCog },
];

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userEmail: string;
  onLogout: () => void;
}

const NavGroup = ({
  label,
  items,
  activeTab,
  onTabChange,
  collapsed,
}: {
  label: string;
  items: typeof mainNav;
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed: boolean;
}) => (
  <SidebarGroup>
    {!collapsed && (
      <SidebarGroupLabel
        className="text-[10px] font-body uppercase tracking-widest px-3 pt-4 pb-1"
        style={{ color: "hsl(var(--admin-text-muted))", opacity: 0.6 }}
      >
        {label}
      </SidebarGroupLabel>
    )}
    <SidebarGroupContent>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = activeTab === item.value;
          return (
            <SidebarMenuItem key={item.value}>
              <SidebarMenuButton
                onClick={() => onTabChange(item.value)}
                className="font-body text-[13px] rounded-md mx-1 px-2.5 py-1.5 h-8 transition-all duration-150"
                style={{
                  background: isActive ? "hsl(var(--admin-indigo-light))" : "transparent",
                  color: isActive ? "hsl(var(--admin-indigo))" : "hsl(var(--admin-text-muted))",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                <item.icon className="h-3.5 w-3.5 shrink-0" />
                {!collapsed && <span className="ml-2.5">{item.title}</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
);

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
      {/* Logo header */}
      <div
        className="h-14 flex items-center gap-2.5 px-3 border-b shrink-0"
        style={{ borderColor: "hsl(var(--admin-sidebar-border))" }}
      >
        <img src={dangLogo} alt="DANG!" className="w-7 h-7 object-contain shrink-0" />
        {!collapsed && (
          <span className="font-body font-semibold text-sm" style={{ color: "hsl(var(--admin-text))" }}>
            DANG! Admin
          </span>
        )}
      </div>

      <SidebarContent className="py-1">
        <NavGroup label="Overview" items={mainNav} activeTab={activeTab} onTabChange={onTabChange} collapsed={collapsed} />
        <NavGroup label="Content" items={contentNav} activeTab={activeTab} onTabChange={onTabChange} collapsed={collapsed} />
        <NavGroup label="System" items={systemNav} activeTab={activeTab} onTabChange={onTabChange} collapsed={collapsed} />
      </SidebarContent>

      <SidebarFooter className="border-t px-3 py-3" style={{ borderColor: "hsl(var(--admin-sidebar-border))" }}>
        {!collapsed && (
          <div className="flex items-center gap-2 mb-2 px-1">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-body text-white shrink-0"
              style={{ background: "hsl(var(--admin-indigo))" }}
            >
              {(userEmail || "A")[0].toUpperCase()}
            </div>
            <p className="text-xs truncate font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
              {userEmail}
            </p>
          </div>
        )}
        <SidebarMenuButton
          onClick={onLogout}
          className="font-body text-[13px] rounded-md px-2.5 py-1.5 h-8 transition-colors hover:bg-muted"
          style={{ color: "hsl(var(--admin-text-muted))" }}
        >
          <LogOut className="h-3.5 w-3.5 shrink-0" />
          {!collapsed && <span className="ml-2.5">Logout</span>}
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
