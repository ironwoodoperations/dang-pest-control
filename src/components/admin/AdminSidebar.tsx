import { LayoutDashboard, Users, Search, Settings, LogOut, UserCog, FileEdit, MessageSquareQuote, BookOpen, MapPin, Share2, BarChart3, Lock, Star, ClipboardList } from "lucide-react";
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
import { usePlan } from './usePlan';
import TierToggle from './TierToggle';

const GATED_TABS: Record<string, number> = {
  blog: 2,
  seo: 2,
  social: 2,
  reports: 2,
  reviews: 4,
};

const mainNav = [
  { title: "Leads", value: "leads", icon: Users },
  { title: "Dashboard", value: "dashboard", icon: LayoutDashboard },
];

const contentNav = [
  { title: "Page Content", value: "content", icon: FileEdit },
  { title: "Blog", value: "blog", icon: BookOpen },
  { title: "Locations", value: "locations", icon: MapPin },
  { title: "Testimonials", value: "testimonials", icon: MessageSquareQuote },
  { title: "Social Media", value: "social", icon: Share2 },
];

const systemNav = [
  { title: "SEO", value: "seo", icon: Search },
  { title: "Reviews", value: "reviews", icon: Star },
  { title: "Reports", value: "reports", icon: BarChart3 },
  { title: "Client Setup", value: "client-setup", icon: ClipboardList },
  { title: "Settings", value: "settings", icon: Settings },
  { title: "Team", value: "team", icon: UserCog },
];

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userEmail: string;
  companyName: string;
  onLogout: () => void;
}

const NavGroup = ({
  label,
  items,
  activeTab,
  onTabChange,
  collapsed,
  activeColor,
  inactiveColor,
  activeBgColor,
  canAccess,
}: {
  label: string;
  items: typeof mainNav;
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed: boolean;
  activeColor: string;
  inactiveColor: string;
  activeBgColor: string;
  canAccess: (minTier: number) => boolean;
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
          const requiredTier = GATED_TABS[item.value];
          const locked = requiredTier ? !canAccess(requiredTier) : false;
          return (
            <SidebarMenuItem key={item.value}>
              <SidebarMenuButton
                onClick={() => onTabChange(item.value)}
                className={`font-body text-[13px] rounded-md mx-1 px-2.5 py-1.5 h-8 transition-all duration-150 ${locked ? 'opacity-50' : ''}`}
                style={{
                  background: isActive ? activeBgColor : "transparent",
                  color: isActive ? activeColor : inactiveColor,
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                <item.icon className="h-3.5 w-3.5 shrink-0" />
                {!collapsed && <span className="ml-2.5 flex-1 text-left">{item.title}</span>}
                {!collapsed && locked && <Lock className="w-3.5 h-3.5 shrink-0" />}
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
);

export function AdminSidebar({ activeTab, onTabChange, userEmail, companyName, onLogout }: AdminSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { enabled: holidayOn } = useHolidayMode();
  const { canAccess } = usePlan();

  const activeColor = holidayOn ? "hsl(0, 80%, 55%)" : "hsl(var(--admin-teal))";
  const activeBgColor = holidayOn ? "hsla(0, 80%, 55%, 0.15)" : "hsla(185, 100%, 35%, 0.15)";
  const inactiveColor = "hsl(var(--admin-orange))";

  return (
    <Sidebar
      collapsible="icon"
      className="border-r"
      style={{
        background: "hsl(var(--admin-sidebar-bg))",
        borderColor: "hsl(var(--admin-sidebar-border))",
      }}
    >
      {/* Logo header with company name */}
      <div
        className="h-14 flex items-center gap-2.5 px-3 border-b shrink-0"
        style={{ borderColor: "hsl(var(--admin-sidebar-border))" }}
      >
        <img src={dangLogo} alt="Logo" className={collapsed ? "w-9 h-9 object-contain" : "w-11 h-11 object-contain shrink-0"} />
        {!collapsed && (
          <span className="font-display text-sm tracking-wide uppercase truncate" style={{ color: "hsl(var(--admin-sidebar-text))" }}>
            {companyName}
          </span>
        )}
      </div>

      <SidebarContent className="py-1">
        <NavGroup label="Overview" items={mainNav} activeTab={activeTab} onTabChange={onTabChange} collapsed={collapsed} activeColor={activeColor} inactiveColor={inactiveColor} activeBgColor={activeBgColor} canAccess={canAccess} />
        <NavGroup label="Content" items={contentNav} activeTab={activeTab} onTabChange={onTabChange} collapsed={collapsed} activeColor={activeColor} inactiveColor={inactiveColor} activeBgColor={activeBgColor} canAccess={canAccess} />
        <NavGroup label="System" items={systemNav} activeTab={activeTab} onTabChange={onTabChange} collapsed={collapsed} activeColor={activeColor} inactiveColor={inactiveColor} activeBgColor={activeBgColor} canAccess={canAccess} />
      </SidebarContent>

      <SidebarFooter className="border-t px-3 py-3" style={{ borderColor: "hsl(var(--admin-sidebar-border))" }}>
        {!collapsed && <TierToggle />}
        {!collapsed && (
          <div className="flex items-center gap-2 mb-2 px-1">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-body text-white shrink-0"
              style={{ background: activeColor }}
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
