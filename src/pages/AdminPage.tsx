import { useState } from "react";
import { TenantProvider } from "@/hooks/useTenant";
import { PlanProvider } from "@/components/admin/usePlan";
import AdminLayout from "@/components/admin/AdminLayout";
import DashboardTab from "@/components/admin/DashboardTab";
import LeadsTab from "@/components/admin/LeadsTab";
import SEOTab from "@/components/admin/SEOTab";
import SettingsTab from "@/components/admin/SettingsTab";
import TeamTab from "@/components/admin/TeamTab";
import ContentTab from "@/components/admin/ContentTab";
import TestimonialsTab from "@/components/admin/TestimonialsTab";
import BlogTab from "@/components/admin/BlogTab";
import LocationsTab from "@/components/admin/LocationsTab";
import SocialTab from "@/components/admin/SocialTab";
import ReportsTab from "@/components/admin/ReportsTab";
import ReviewsTab from "@/components/admin/ReviewsTab";
import ClientOnboardingWizard from "@/components/admin/ClientOnboardingWizard";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <TenantProvider>
      <PlanProvider>
        <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
          {activeTab === "dashboard" && <DashboardTab />}
          {activeTab === "leads" && <LeadsTab />}
          {activeTab === "content" && <ContentTab />}
          {activeTab === "blog" && <BlogTab />}
          {activeTab === "locations" && <LocationsTab />}
          {activeTab === "social" && <SocialTab />}
          {activeTab === "testimonials" && <TestimonialsTab />}
          {activeTab === "seo" && <SEOTab />}
          {activeTab === "reviews" && <ReviewsTab />}
          {activeTab === "reports" && <ReportsTab />}
          {activeTab === "settings" && <SettingsTab />}
          {activeTab === "team" && <TeamTab />}
          {activeTab === "client-setup" && <ClientOnboardingWizard />}
        </AdminLayout>
      </PlanProvider>
    </TenantProvider>
  );
};

export default AdminPage;
