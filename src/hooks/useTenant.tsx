import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface TenantContextValue {
  user: User | null;
  tenantId: string | null;
  companyName: string | null;
  profileLoading: boolean;
  createOrganization: (name: string) => Promise<boolean>;
}

const TenantContext = createContext<TenantContextValue>({
  user: null,
  tenantId: null,
  companyName: null,
  profileLoading: true,
  createOrganization: async () => false,
});

export const useTenant = () => useContext(TenantContext);

export const TenantProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const loadProfile = useCallback(async (userId: string) => {
    // Fetch profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("tenant_id")
      .eq("id", userId)
      .single();

    if (!profile?.tenant_id) {
      setTenantId(null);
      setCompanyName(null);
      setProfileLoading(false);
      return;
    }

    setTenantId(profile.tenant_id);

    // Fetch tenant
    const { data: tenant } = await supabase
      .from("tenants")
      .select("company_name")
      .eq("id", profile.tenant_id)
      .single();

    setCompanyName(tenant?.company_name || null);
    setProfileLoading(false);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        await loadProfile(u.id);
      } else {
        setTenantId(null);
        setCompanyName(null);
        setProfileLoading(false);
      }
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        await loadProfile(u.id);
      } else {
        setProfileLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [loadProfile]);

  const createOrganization = useCallback(async (name: string): Promise<boolean> => {
    if (!user) return false;

    // Create tenant
    const { data: tenant, error: tenantErr } = await supabase
      .from("tenants")
      .insert({ company_name: name, owner_id: user.id })
      .select("id")
      .single();

    if (tenantErr || !tenant) return false;

    // Ensure profile exists, then update with tenant_id
    await supabase.from("profiles").upsert({ id: user.id, tenant_id: tenant.id });

    setTenantId(tenant.id);
    setCompanyName(name);
    return true;
  }, [user]);

  return (
    <TenantContext.Provider value={{ user, tenantId, companyName, profileLoading, createOrganization }}>
      {children}
    </TenantContext.Provider>
  );
};
