import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DashboardTab from "@/components/admin/DashboardTab";
import LeadsTab from "@/components/admin/LeadsTab";
import SEOTab from "@/components/admin/SEOTab";
import SettingsTab from "@/components/admin/SettingsTab";
import TeamTab from "@/components/admin/TeamTab";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "dashboard" && <DashboardTab />}
      {activeTab === "leads" && <LeadsTab />}
      {activeTab === "seo" && <SEOTab />}
      {activeTab === "settings" && <SettingsTab />}
      {activeTab === "team" && <TeamTab />}
    </AdminLayout>
  );
};

export default AdminPage;
