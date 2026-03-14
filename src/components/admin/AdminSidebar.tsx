import { LayoutDashboard, Users, Search, Settings, LogOut, UserCog, FileEdit, MessageSquareQuote, BookOpen, MapPin } from "lucide-react";
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
import { useHolidayMode } from "@/hooks/useHolidayMode";

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
  accentColor,
  accentLightColor,
}: {
  label: string;
  items: typeof mainNav;
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed: boolean;
  accentColor: string;
  accentLightColor: string;
}) => (
  <SidebarGroup>
    {!collapsed && (
      <SidebarGroupLabel
        className="text-[10px] font-body uppercase tracking-widest px-3 pt-4 pb-1"
        style={{ color: "hsl(var(--admin-sidebar-text-muted))" }}
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
                  background: isActive ? accentLightColor : "transparent",
                  color: isActive ? accentColor : "hsl(var(--admin-sidebar-text))",
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
  const { enabled: holidayOn } = useHolidayMode();

  // When holiday mode is on, shift accent to festive red
  const accentColor = holidayOn ? "hsl(0, 80%, 55%)" : "hsl(var(--admin-accent))";
  const accentLightColor = holidayOn ? "hsla(0, 80%, 55%, 0.15)" : "hsla(150, 40%, 93%, 0.15)";

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
        <img src={dangLogo} alt="DANG!" className="w-8 h-8 object-contain shrink-0" />
        {!collapsed && (
          <span className="font-display text-lg tracking-wide uppercase" style={{ color: "hsl(var(--admin-sidebar-text))" }}>
            DANG!
          </span>
        )}
      </div>

      <SidebarContent className="py-1">
        <NavGroup label="Overview" items={mainNav} activeTab={activeTab} onTabChange={onTabChange} collapsed={collapsed} accentColor={accentColor} accentLightColor={accentLightColor} />
        <NavGroup label="Content" items={contentNav} activeTab={activeTab} onTabChange={onTabChange} collapsed={collapsed} accentColor={accentColor} accentLightColor={accentLightColor} />
        <NavGroup label="System" items={systemNav} activeTab={activeTab} onTabChange={onTabChange} collapsed={collapsed} accentColor={accentColor} accentLightColor={accentLightColor} />
      </SidebarContent>

      <SidebarFooter className="border-t px-3 py-3" style={{ borderColor: "hsl(var(--admin-sidebar-border))" }}>
        {!collapsed && (
          <div className="flex items-center gap-2 mb-2 px-1">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-body text-white shrink-0"
              style={{ background: accentColor }}
            >
              {(userEmail || "A")[0].toUpperCase()}
            </div>
            <p className="text-xs truncate font-body" style={{ color: "hsl(var(--admin-sidebar-text-muted))" }}>
              {userEmail}
            </p>
          </div>
        )}
        <SidebarMenuButton
          onClick={onLogout}
          className="font-body text-[13px] rounded-md px-2.5 py-1.5 h-8 transition-colors"
          style={{ color: "hsl(var(--admin-sidebar-text-muted))" }}
        >
          <LogOut className="h-3.5 w-3.5 shrink-0" />
          {!collapsed && <span className="ml-2.5">Logout</span>}
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
