import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useTenant } from "@/hooks/useTenant";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, ChevronLeft, ChevronDown, ChevronUp, Info, Rocket, Check } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────
interface StepConfig {
  title: string;
  subtitle: string;
}

const STEPS: StepConfig[] = [
  { title: "Business Info", subtitle: "Tell us about your pest control business." },
  { title: "Branding", subtitle: "Set your logo and brand colors." },
  { title: "Notifications", subtitle: "Where should we send new leads?" },
  { title: "Integrations", subtitle: "Connect your social and review accounts (all optional)." },
  { title: "Review & Launch", subtitle: "Double-check everything, then go live!" },
];

// ── Help Dropdown ──────────────────────────────────────────────────
const HelpDropdown = ({ what, where, tip }: { what: string; where: string; tip?: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-1">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-xs font-body text-orange-500 hover:text-orange-600 transition-colors"
      >
        <Info className="w-3 h-3" />
        How do I find this?
        {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
      {open && (
        <div className="mt-1.5 p-3 rounded-lg bg-orange-50 border border-orange-200 text-xs font-body text-gray-700 space-y-1.5">
          <p><strong>What it is:</strong> {what}</p>
          <p><strong>Where to find it:</strong> {where}</p>
          {tip && <p><strong>Tip:</strong> {tip}</p>}
        </div>
      )}
    </div>
  );
};

// ── Field Component ────────────────────────────────────────────────
const WizardField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  helpWhat,
  helpWhere,
  helpTip,
  optional,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  helpWhat: string;
  helpWhere: string;
  helpTip?: string;
  optional?: boolean;
  children?: React.ReactNode;
}) => (
  <div className="space-y-1">
    <Label className="font-body text-sm font-medium text-gray-700">
      {label} {optional && <span className="text-gray-400 font-normal">(optional)</span>}
    </Label>
    {children || (
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        className="h-10 font-body text-sm border-gray-300 focus:border-orange-400 focus:ring-orange-400"
      />
    )}
    <HelpDropdown what={helpWhat} where={helpWhere} tip={helpTip} />
  </div>
);

// ── Color Field ────────────────────────────────────────────────────
const ColorField = ({
  label,
  value,
  onChange,
  helpWhat,
  helpWhere,
  helpTip,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  helpWhat: string;
  helpWhere: string;
  helpTip?: string;
}) => (
  <div className="space-y-1">
    <Label className="font-body text-sm font-medium text-gray-700">{label}</Label>
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer p-0.5"
      />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#FF6B00"
        className="h-10 font-body font-mono text-sm flex-1 border-gray-300"
      />
      <div className="h-10 w-16 rounded-lg border border-gray-200" style={{ background: value }} />
    </div>
    <HelpDropdown what={helpWhat} where={helpWhere} tip={helpTip} />
  </div>
);

// ── Main Component ─────────────────────────────────────────────────
const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { tenantId } = useTenant();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);

  // Step 1: Business Info
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [hours, setHours] = useState("");
  const [tagline, setTagline] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [foundedYear, setFoundedYear] = useState("");

  // Step 2: Branding
  const [logoUrl, setLogoUrl] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#FF6B00");
  const [accentColor, setAccentColor] = useState("#FFD700");

  // Step 3: Notifications
  const [leadEmail, setLeadEmail] = useState("");
  const [ccEmail, setCcEmail] = useState("");

  // Step 4: Integrations
  const [fbAccessToken, setFbAccessToken] = useState("");
  const [fbPageId, setFbPageId] = useState("");
  const [googlePlaceId, setGooglePlaceId] = useState("");
  const [googleApiKey, setGoogleApiKey] = useState("");
  const [heroVideoId, setHeroVideoId] = useState("");

  // Load existing settings on mount
  useEffect(() => {
    if (!tenantId) return;
    const load = async () => {
      const { data } = await supabase.from("site_config").select("key, value").eq("tenant_id", tenantId);
      if (!data) return;
      for (const row of data) {
        const val = row.value as Record<string, unknown>;
        if (row.key === "business_info") {
          setBusinessName((val.company_name as string) || "");
          setPhone((val.phone as string) || "");
          setEmail((val.email as string) || "");
          setAddress((val.address as string) || "");
          setHours((val.hours as string) || "");
        }
        if (row.key === "business_extended") {
          setTagline((val.tagline as string) || "");
          setLicenseNumber((val.license_number as string) || "");
          setFoundedYear((val.founded_year as string) || "");
        }
        if (row.key === "branding") {
          setLogoUrl((val.logo_url as string) || "");
        }
        if (row.key === "branding_extended") {
          setPrimaryColor((val.primary_color as string) || "#FF6B00");
          setAccentColor((val.accent_color as string) || "#FFD700");
        }
        if (row.key === "notification_email") {
          setLeadEmail((val.email as string) || "");
        }
        if (row.key === "notifications") {
          setCcEmail((val.cc_email as string) || "");
        }
        if (row.key === "integrations") {
          setFbAccessToken((val.fb_access_token as string) || "");
          setFbPageId((val.fb_page_id as string) || "");
          setGooglePlaceId((val.google_place_id as string) || "");
          setGoogleApiKey((val.google_api_key as string) || "");
        }
        if (row.key === "hero_media") {
          setHeroVideoId((val.hero_video_url as string) || "");
        }
      }
    };
    load();
  }, [tenantId]);

  // Save helper — matches existing SettingsTab pattern
  const saveConfig = useCallback(
    async (key: string, value: Record<string, unknown>) => {
      if (!tenantId) return false;
      const jsonValue = JSON.parse(JSON.stringify(value));
      const { data: existing } = await supabase
        .from("site_config")
        .select("id")
        .eq("key", key)
        .eq("tenant_id", tenantId);
      let err: unknown = null;
      if (existing && existing.length > 0) {
        const { error } = await supabase
          .from("site_config")
          .update({ value: jsonValue, updated_at: new Date().toISOString() })
          .eq("key", key)
          .eq("tenant_id", tenantId);
        err = error;
      } else {
        const { error } = await supabase
          .from("site_config")
          .insert({ key, value: jsonValue, tenant_id: tenantId });
        err = error;
      }
      return !err;
    },
    [tenantId]
  );

  // Save step data
  const saveStep = async (stepIndex: number) => {
    setSaving(true);
    try {
      let results: boolean[] = [];
      if (stepIndex === 0) {
        results = await Promise.all([
          saveConfig("business_info", {
            company_name: businessName,
            phone,
            email,
            address,
            hours,
          }),
          saveConfig("business_extended", {
            tagline,
            license_number: licenseNumber,
            founded_year: foundedYear,
          }),
        ]);
      } else if (stepIndex === 1) {
        results = await Promise.all([
          saveConfig("branding", { logo_url: logoUrl }),
          saveConfig("branding_extended", { primary_color: primaryColor, accent_color: accentColor }),
        ]);
      } else if (stepIndex === 2) {
        results = await Promise.all([
          saveConfig("notification_email", { email: leadEmail }),
          saveConfig("notifications", { cc_email: ccEmail }),
        ]);
      } else if (stepIndex === 3) {
        results = await Promise.all([
          saveConfig("integrations", {
            fb_access_token: fbAccessToken,
            fb_page_id: fbPageId,
            google_place_id: googlePlaceId,
            google_api_key: googleApiKey,
          }),
          saveConfig("hero_media", { hero_video_url: heroVideoId }),
        ]);
      }
      if (!results.every(Boolean)) {
        toast({ title: "Error", description: "Some settings failed to save.", variant: "destructive" });
        return false;
      }
      return true;
    } catch {
      toast({ title: "Save failed", description: "An unexpected error occurred.", variant: "destructive" });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleNext = async () => {
    const ok = await saveStep(step);
    if (ok) setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);

  const handleLaunch = async () => {
    setSaving(true);
    const ok = await saveConfig("onboarding_complete", { completed: true });
    setSaving(false);
    if (ok) {
      toast({ title: "You're all set!", description: "Your site is ready to go." });
      navigate("/admin");
    }
  };

  // ── Progress Bar ─────────────────────────────────────────────────
  const ProgressBar = () => (
    <div className="w-full max-w-3xl mx-auto px-6 pt-8 pb-4">
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 mx-10 bg-gray-200" />
        {/* Active line */}
        <div
          className="absolute top-5 left-0 h-0.5 mx-10 bg-orange-500 transition-all duration-500"
          style={{ width: `calc(${(step / (STEPS.length - 1)) * 100}% - 5rem)` }}
        />
        {STEPS.map((s, i) => {
          const isComplete = i < step;
          const isCurrent = i === step;
          return (
            <div key={s.title} className="flex flex-col items-center gap-1.5 z-10">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-body transition-all duration-300 border-2"
                style={{
                  background: isComplete ? "#f97316" : isCurrent ? "white" : "#f9fafb",
                  borderColor: isComplete || isCurrent ? "#f97316" : "#e5e7eb",
                  color: isComplete ? "white" : isCurrent ? "#f97316" : "#9ca3af",
                }}
              >
                {isComplete ? <Check className="w-5 h-5" /> : i + 1}
              </div>
              <span
                className="text-[10px] font-body font-semibold uppercase tracking-wider hidden sm:block"
                style={{ color: isComplete || isCurrent ? "#374151" : "#9ca3af" }}
              >
                {s.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── Step 1: Business Info ────────────────────────────────────────
  const Step1 = () => (
    <div className="space-y-5">
      <WizardField
        label="Business Name"
        value={businessName}
        onChange={setBusinessName}
        placeholder="Dang Pest Control"
        helpWhat="This appears in your site header and footer."
        helpWhere="Use your official business name exactly as it appears on your license."
      />
      <WizardField
        label="Phone Number"
        value={phone}
        onChange={setPhone}
        placeholder="(903) 555-1234"
        type="tel"
        helpWhat="Displayed on every page — customers click this to call you."
        helpWhere="Enter your main business phone number including area code. Example: (903) 555-1234"
      />
      <WizardField
        label="Email Address"
        value={email}
        onChange={setEmail}
        placeholder="info@yourcompany.com"
        type="email"
        helpWhat="Used for customer-facing contact info on your website."
        helpWhere="Use the email address you want customers to contact you at."
      />
      <WizardField
        label="Address"
        value={address}
        onChange={setAddress}
        placeholder="123 Main St, Tyler, TX 75701"
        helpWhat="Your business address shown on the Contact page."
        helpWhere="Enter your full street address, city, state, and zip."
      />
      <WizardField
        label="Business Hours"
        value={hours}
        onChange={setHours}
        placeholder="Mon-Fri 8am-6pm, Sat 9am-3pm, Sun Closed"
        helpWhat="Shown on your Contact page and Google listing."
        helpWhere='Example: Mon-Fri 8am-6pm, Sat 9am-3pm, Sun Closed'
      />
      <WizardField
        label="Tagline"
        value={tagline}
        onChange={setTagline}
        placeholder="East Texas's Most Trusted Pest Control"
        helpWhat="A short catchy phrase shown in your site header."
        helpWhere="Keep it under 10 words. Example: East Texas's Most Trusted Pest Control"
      />
      <WizardField
        label="License Number"
        value={licenseNumber}
        onChange={setLicenseNumber}
        placeholder="TX-12345"
        helpWhat="Your state pest control license number — builds trust with customers."
        helpWhere="Find this on your state-issued pest control license certificate."
      />
      <WizardField
        label="Founded Year"
        value={foundedYear}
        onChange={setFoundedYear}
        placeholder="2008"
        helpWhat="How long you've been in business — shown on the About page."
        helpWhere="Enter the 4-digit year your company was founded. Example: 2008"
      />
    </div>
  );

  // ── Step 2: Branding ─────────────────────────────────────────────
  const Step2 = () => (
    <div className="space-y-5">
      <WizardField
        label="Logo URL"
        value={logoUrl}
        onChange={setLogoUrl}
        placeholder="https://yoursite.com/logo.png"
        helpWhat="Your logo image shown in the site header."
        helpWhere="Upload your logo to any image host (Google Drive, Dropbox, your website's media library) and paste the direct image link here. The URL should end in .png, .jpg, or .webp."
        helpTip="Right-click your logo image online, then choose Copy Image Address."
      />
      {logoUrl && (
        <div className="w-full h-20 rounded-lg flex items-center justify-center bg-gray-50 border border-dashed border-gray-300">
          <img src={logoUrl} alt="Logo preview" className="max-h-16 max-w-[200px] object-contain" />
        </div>
      )}
      <ColorField
        label="Primary Color"
        value={primaryColor}
        onChange={setPrimaryColor}
        helpWhat="The main brand color used for buttons and headers."
        helpWhere="Use a hex color code. Example: #FF6B00 for orange. If you don't know your brand color, check your existing website or ask your designer."
        helpTip="You can use htmlcolorcodes.com to pick one."
      />
      <ColorField
        label="Accent Color"
        value={accentColor}
        onChange={setAccentColor}
        helpWhat="Secondary color used for highlights and accents."
        helpWhere="Usually a complementary color to your primary. Example: #FFD700 for yellow."
      />
    </div>
  );

  // ── Step 3: Notifications ────────────────────────────────────────
  const Step3 = () => (
    <div className="space-y-5">
      <WizardField
        label="Lead Notification Email"
        value={leadEmail}
        onChange={setLeadEmail}
        placeholder="owner@yourcompany.com"
        type="email"
        helpWhat="Every time a customer submits a quote request, an email is sent here."
        helpWhere="Enter the email address where you want to receive new customer leads. This is usually the owner or office manager's email."
      />
      <WizardField
        label="CC Email"
        value={ccEmail}
        onChange={setCcEmail}
        placeholder="assistant@yourcompany.com"
        type="email"
        optional
        helpWhat="A second email address that also gets a copy of each lead."
        helpWhere="Optional. Leave blank if you only need one email. Useful for sending leads to a second person like an office assistant."
      />
    </div>
  );

  // ── Step 4: Integrations ─────────────────────────────────────────
  const Step4 = () => (
    <div className="space-y-5">
      <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
        <p className="text-xs font-body text-blue-700">
          These are all optional — you can skip any of these and set them up later in Admin &rarr; Settings &rarr; Integrations.
        </p>
      </div>
      <WizardField
        label="Facebook Page Access Token"
        value={fbAccessToken}
        onChange={setFbAccessToken}
        placeholder="EAAxxxxxxx..."
        optional
        helpWhat="Allows you to post directly to your Facebook business page from your admin dashboard."
        helpWhere="Step 1: Go to developers.facebook.com/tools/explorer and log in with the Facebook account that manages your business page. Step 2: Click 'Generate Access Token' and select your business page. Step 3: Check these permissions: pages_manage_posts, pages_read_engagement, pages_show_list. Step 4: Copy the token and paste it here."
        helpTip="Contact your web admin to exchange this for a permanent token that never expires."
      />
      <WizardField
        label="Facebook Page ID"
        value={fbPageId}
        onChange={setFbPageId}
        placeholder="123456789012345"
        optional
        helpWhat="The unique ID number for your Facebook business page."
        helpWhere="Step 1: Go to your Facebook business page. Step 2: Click 'About' in the left menu. Step 3: Scroll to the bottom — you'll see 'Page ID' with a long number. Step 4: Copy that number and paste it here."
      />
      <WizardField
        label="Google Place ID"
        value={googlePlaceId}
        onChange={setGooglePlaceId}
        placeholder="ChIJxxxxxxxxxxxxxxx"
        optional
        helpWhat="Used to automatically import your Google reviews into your website."
        helpWhere="Step 1: Go to developers.google.com/maps/documentation/places/web-service/place-id. Step 2: Scroll down to the 'Find a Place ID' map tool. Step 3: Search for your business name and city. Step 4: Click your business in the results — your Place ID appears. It starts with 'ChIJ'. Step 5: Copy and paste it here."
      />
      <WizardField
        label="Google API Key"
        value={googleApiKey}
        onChange={setGoogleApiKey}
        placeholder="AIzaSyxxxxxxxxx..."
        optional
        helpWhat="Required alongside your Place ID to pull in Google reviews automatically."
        helpWhere="Step 1: Go to console.cloud.google.com and sign in with your Google account. Step 2: Create a project (or select an existing one). Step 3: Go to APIs & Services, then Credentials, then Create Credentials, then API Key. Step 4: Enable the 'Places API' under APIs & Services, then Library. Step 5: Copy the API key and paste it here."
        helpTip="Ask your web admin if you need help with this step."
      />
      <WizardField
        label="Hero Video YouTube ID"
        value={heroVideoId}
        onChange={setHeroVideoId}
        placeholder="dQw4w9WgXcQ"
        optional
        helpWhat="A YouTube video that plays in the homepage hero section."
        helpWhere="Step 1: Open your YouTube video. Step 2: Look at the URL in your browser: youtube.com/watch?v=XXXXXXXXXXX. Step 3: Copy only the letters/numbers after 'v=' — that's your Video ID. Example: For youtube.com/watch?v=dQw4w9WgXcQ, the ID is dQw4w9WgXcQ"
      />
    </div>
  );

  // ── Step 5: Review & Launch ──────────────────────────────────────
  const SummaryItem = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between items-start py-1.5 border-b border-gray-100 last:border-0">
      <span className="text-xs font-body text-gray-500">{label}</span>
      <span className="text-xs font-body text-gray-800 text-right max-w-[60%]">{value || "—"}</span>
    </div>
  );

  const IntegrationStatus = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
      <span className="text-xs font-body text-gray-500">{label}</span>
      <span className="text-xs font-body">
        {value ? <span className="text-green-600">&#x2705; Connected</span> : <span className="text-gray-400">&#x2B1C; Not set</span>}
      </span>
    </div>
  );

  const Step5 = () => (
    <div className="space-y-5">
      {/* Business Info */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="text-sm font-body font-semibold text-gray-800 mb-2">Business Info</h4>
        <SummaryItem label="Name" value={businessName} />
        <SummaryItem label="Phone" value={phone} />
        <SummaryItem label="Email" value={email} />
        <SummaryItem label="Address" value={address} />
        <SummaryItem label="Hours" value={hours} />
        <SummaryItem label="Tagline" value={tagline} />
        <SummaryItem label="License #" value={licenseNumber} />
        <SummaryItem label="Founded" value={foundedYear} />
      </div>

      {/* Branding */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="text-sm font-body font-semibold text-gray-800 mb-2">Branding</h4>
        {logoUrl ? (
          <div className="flex items-center gap-3 py-1.5 border-b border-gray-100">
            <span className="text-xs font-body text-gray-500">Logo</span>
            <img src={logoUrl} alt="Logo" className="h-8 object-contain" />
          </div>
        ) : (
          <SummaryItem label="Logo" value="Not set" />
        )}
        <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
          <span className="text-xs font-body text-gray-500">Primary Color</span>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded border border-gray-200" style={{ background: primaryColor }} />
            <span className="text-xs font-body font-mono text-gray-800">{primaryColor}</span>
          </div>
        </div>
        <div className="flex justify-between items-center py-1.5">
          <span className="text-xs font-body text-gray-500">Accent Color</span>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded border border-gray-200" style={{ background: accentColor }} />
            <span className="text-xs font-body font-mono text-gray-800">{accentColor}</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="text-sm font-body font-semibold text-gray-800 mb-2">Notifications</h4>
        <SummaryItem label="Lead Email" value={leadEmail} />
        <SummaryItem label="CC Email" value={ccEmail} />
      </div>

      {/* Integrations */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="text-sm font-body font-semibold text-gray-800 mb-2">Integrations</h4>
        <IntegrationStatus label="Facebook Token" value={fbAccessToken} />
        <IntegrationStatus label="Facebook Page ID" value={fbPageId} />
        <IntegrationStatus label="Google Place ID" value={googlePlaceId} />
        <IntegrationStatus label="Google API Key" value={googleApiKey} />
        <IntegrationStatus label="Hero Video" value={heroVideoId} />
      </div>
    </div>
  );

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <h1 className="font-display text-xl tracking-wide uppercase text-gray-900">Setup Wizard</h1>
          <button
            onClick={() => navigate("/admin")}
            className="text-xs font-body text-gray-400 hover:text-gray-600 transition-colors"
          >
            Skip &rarr; Go to Dashboard
          </button>
        </div>
      </header>

      <ProgressBar />

      {/* Card */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Card Header */}
          <div className="px-8 pt-8 pb-4">
            <h2 className="font-display text-2xl tracking-wide uppercase text-gray-900">
              {STEPS[step].title}
            </h2>
            <p className="font-body text-sm text-gray-500 mt-1">{STEPS[step].subtitle}</p>
          </div>

          {/* Card Body */}
          <div className="px-8 pb-6">
            {step === 0 && <Step1 />}
            {step === 1 && <Step2 />}
            {step === 2 && <Step3 />}
            {step === 3 && <Step4 />}
            {step === 4 && <Step5 />}
          </div>

          {/* Card Footer */}
          <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            {step > 0 && step < 4 ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 font-body text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : step === 4 ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 font-body text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={handleNext}
                disabled={saving}
                className="flex items-center gap-1.5 font-body text-sm font-semibold text-white px-6 py-2.5 rounded-lg transition-opacity disabled:opacity-50"
                style={{ background: "#f97316" }}
              >
                {saving ? "Saving..." : "Next"} <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleLaunch}
                disabled={saving}
                className="flex items-center gap-2 font-body text-sm font-bold text-white px-8 py-3 rounded-lg transition-all hover:scale-[1.02] disabled:opacity-50"
                style={{ background: "#f97316" }}
              >
                {saving ? "Launching..." : "Launch My Site"} <Rocket className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
