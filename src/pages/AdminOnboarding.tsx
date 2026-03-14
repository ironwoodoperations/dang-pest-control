import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useTenant } from "@/hooks/useTenant";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Building2, Palette, Rocket, ChevronRight, ChevronLeft, Check } from "lucide-react";
import dangLogo from "@/assets/dang-logo.png";

const STEPS = [
  { label: "Account Setup", icon: Building2 },
  { label: "Business Profile", icon: Palette },
  { label: "Dashboard Ready", icon: Rocket },
];

const AdminOnboarding = () => {
  const { user, tenantId, profileLoading } = useTenant();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Step 1 fields
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");

  // Step 2 fields
  const [logoUrl, setLogoUrl] = useState("");
  const [brandColor, setBrandColor] = useState("#00838f");

  // Redirect if already has tenant or not logged in
  useEffect(() => {
    if (profileLoading) return;
    if (!user) { navigate("/admin/login"); return; }
    if (tenantId) { navigate("/admin"); return; }
  }, [user, tenantId, profileLoading, navigate]);

  const canAdvanceStep1 = companyName.trim().length > 0;

  const handleSubmit = async () => {
    if (!user) return;
    setSubmitting(true);

    try {
      // 1. Create tenant
      const { data: tenant, error: tenantErr } = await supabase
        .from("tenants")
        .insert({ company_name: companyName.trim(), owner_id: user.id })
        .select("id")
        .single();

      if (tenantErr || !tenant) throw new Error(tenantErr?.message || "Failed to create organization");

      // 2. Update profile with tenant_id
      const { error: profileErr } = await supabase
        .from("profiles")
        .update({ tenant_id: tenant.id })
        .eq("id", user.id);

      if (profileErr) throw new Error(profileErr.message);

      // 3. Create default site_config rows
      const defaults = [
        { key: "business_phone", value: JSON.stringify(phone.trim() || ""), tenant_id: tenant.id },
        { key: "business_email", value: JSON.stringify(businessEmail.trim() || ""), tenant_id: tenant.id },
        { key: "logo_url", value: JSON.stringify(logoUrl.trim() || ""), tenant_id: tenant.id },
        { key: "brand_color", value: JSON.stringify(brandColor), tenant_id: tenant.id },
        { key: "company_name", value: JSON.stringify(companyName.trim()), tenant_id: tenant.id },
      ];

      await supabase.from("site_config").insert(defaults);

      // 4. Move to success step
      setStep(2);

      toast({ title: "Welcome aboard! 🎉", description: `${companyName} is all set up.` });

      // Brief pause then redirect
      setTimeout(() => navigate("/admin"), 1800);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(var(--admin-bg))" }}>
        <p className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "hsl(var(--admin-bg))" }}>
      {/* Header */}
      <header
        className="h-14 flex items-center justify-center border-b shrink-0"
        style={{ background: "hsl(var(--admin-teal))", borderColor: "hsl(var(--admin-sidebar-border))" }}
      >
        <img src={dangLogo} alt="Dang Pest Control" className="h-8 brightness-0 invert" />
      </header>

      {/* Progress Bar */}
      <div className="w-full max-w-2xl mx-auto px-6 pt-10 pb-2">
        <div className="flex items-center justify-between relative">
          {/* Connector lines */}
          <div className="absolute top-5 left-0 right-0 h-0.5 mx-12" style={{ background: "hsl(var(--admin-sidebar-border))" }} />
          <div
            className="absolute top-5 left-0 h-0.5 mx-12 transition-all duration-500"
            style={{
              background: "hsl(var(--admin-teal))",
              width: step === 0 ? "0%" : step === 1 ? "calc(50% - 3rem)" : "calc(100% - 6rem)",
            }}
          />

          {STEPS.map((s, i) => {
            const isComplete = i < step;
            const isCurrent = i === step;
            const Icon = s.icon;

            return (
              <div key={s.label} className="flex flex-col items-center gap-2 z-10">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2"
                  style={{
                    background: isComplete
                      ? "hsl(var(--admin-teal))"
                      : isCurrent
                        ? "hsl(var(--admin-card-bg))"
                        : "hsl(var(--admin-bg))",
                    borderColor: isComplete || isCurrent
                      ? "hsl(var(--admin-teal))"
                      : "hsl(var(--admin-sidebar-border))",
                    color: isComplete
                      ? "white"
                      : isCurrent
                        ? "hsl(var(--admin-teal))"
                        : "hsl(var(--admin-text-muted))",
                  }}
                >
                  {isComplete ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span
                  className="text-[11px] font-body font-semibold uppercase tracking-wider"
                  style={{
                    color: isComplete || isCurrent
                      ? "hsl(var(--admin-text))"
                      : "hsl(var(--admin-text-muted))",
                  }}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-start justify-center px-4 pt-6 pb-16">
        <div
          className="w-full max-w-lg rounded-2xl shadow-xl overflow-hidden"
          style={{ background: "hsl(var(--admin-card-bg))", border: "1px solid hsl(var(--admin-sidebar-border) / 0.3)" }}
        >
          {/* Step 1: Company Details */}
          {step === 0 && (
            <div className="p-8 space-y-6">
              <div className="text-center space-y-1">
                <h2
                  className="font-display text-3xl tracking-wide uppercase"
                  style={{ color: "hsl(var(--admin-text))" }}
                >
                  Company Details
                </h2>
                <p className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>
                  Tell us about your pest control business.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="font-body text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--admin-text-muted))" }}>
                    Company Name *
                  </Label>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Dang Pest Control"
                    className="h-11 font-body"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="font-body text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--admin-text-muted))" }}>
                    Phone Number
                  </Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    type="tel"
                    className="h-11 font-body"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="font-body text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--admin-text-muted))" }}>
                    Business Email
                  </Label>
                  <Input
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    placeholder="info@yourcompany.com"
                    type="email"
                    className="h-11 font-body"
                  />
                </div>
              </div>

              <Button
                onClick={() => setStep(1)}
                disabled={!canAdvanceStep1}
                className="w-full h-11 font-body text-sm font-semibold text-white gap-2"
                style={{ background: "hsl(var(--admin-teal))" }}
              >
                Continue <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Step 2: Branding */}
          {step === 1 && (
            <div className="p-8 space-y-6">
              <div className="text-center space-y-1">
                <h2
                  className="font-display text-3xl tracking-wide uppercase"
                  style={{ color: "hsl(var(--admin-text))" }}
                >
                  Branding
                </h2>
                <p className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>
                  Upload your logo and choose your brand color.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="font-body text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--admin-text-muted))" }}>
                    Logo URL
                  </Label>
                  <Input
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="https://yoursite.com/logo.png"
                    className="h-11 font-body"
                  />
                  <p className="text-[11px] font-body" style={{ color: "hsl(var(--admin-text-muted))" }}>
                    Paste a link to your company logo. You can update this later in Settings.
                  </p>
                </div>

                {logoUrl && (
                  <div
                    className="w-full h-20 rounded-lg flex items-center justify-center"
                    style={{ background: "hsl(var(--admin-bg))", border: "1px dashed hsl(var(--admin-sidebar-border))" }}
                  >
                    <img src={logoUrl} alt="Logo preview" className="max-h-16 max-w-[200px] object-contain" />
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label className="font-body text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--admin-text-muted))" }}>
                    Primary Brand Color
                  </Label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      className="w-11 h-11 rounded-lg border cursor-pointer p-1"
                      style={{ borderColor: "hsl(var(--admin-sidebar-border))" }}
                    />
                    <Input
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      placeholder="#00838f"
                      className="h-11 font-body font-mono flex-1"
                    />
                    <div
                      className="h-11 w-24 rounded-lg"
                      style={{ background: brandColor }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(0)}
                  variant="outline"
                  className="flex-1 h-11 font-body text-sm gap-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 h-11 font-body text-sm font-semibold text-white gap-2"
                  style={{ background: "hsl(var(--admin-teal))" }}
                >
                  {submitting ? "Setting up..." : "Launch Dashboard"} <Rocket className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 2 && (
            <div className="p-12 text-center space-y-4">
              <div
                className="mx-auto w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "hsl(var(--admin-teal))" }}
              >
                <Check className="w-8 h-8 text-white" />
              </div>
              <h2
                className="font-display text-3xl tracking-wide uppercase"
                style={{ color: "hsl(var(--admin-text))" }}
              >
                You're All Set!
              </h2>
              <p className="font-body text-sm" style={{ color: "hsl(var(--admin-text-muted))" }}>
                <strong>{companyName}</strong> is ready. Redirecting you to your dashboard…
              </p>
              <div className="flex justify-center">
                <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "hsl(var(--admin-teal))", borderTopColor: "transparent" }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOnboarding;
