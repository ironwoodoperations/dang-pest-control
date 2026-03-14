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

  const loadProfile = useCallback(async (currentUser: User) => {
    // Try to fetch profile
    let { data: profile } = await supabase
      .from("profiles")
      .select("tenant_id")
      .eq("id", currentUser.id)
      .single();

    // Auto-create profile if missing (existing users before trigger was added)
    if (!profile) {
      await supabase.from("profiles").upsert({
        id: currentUser.id,
        full_name: currentUser.user_metadata?.full_name || currentUser.email?.split("@")[0] || "",
      });
      // Re-fetch
      const { data: newProfile } = await supabase
        .from("profiles")
        .select("tenant_id")
        .eq("id", currentUser.id)
        .single();
      profile = newProfile;
    }

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
    let initialSessionLoaded = false;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      // Skip auth state changes until we've loaded the initial session
      if (!initialSessionLoaded) return;
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        await loadProfile(u);
      } else {
        setTenantId(null);
        setCompanyName(null);
        setProfileLoading(false);
      }
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      initialSessionLoaded = true;
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        await loadProfile(u);
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

    // Update profile with tenant_id
    const { error: profileErr } = await supabase
      .from("profiles")
      .update({ tenant_id: tenant.id })
      .eq("id", user.id);

    if (profileErr) return false;

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
