import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const quoteSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(7, "Phone number is required").max(20),
  address: z.string().trim().min(1, "Address is required").max(200),
  city: z.string().trim().min(1, "City is required").max(100),
  state: z.string().trim().min(1, "State is required").max(50),
  zip: z.string().trim().min(5, "ZIP code is required").max(10),
  services: z.array(z.string()).min(1, "Select at least one service"),
  message: z.string().trim().max(1000).optional(),
  consentTransactional: z.boolean().refine((v) => v, "Consent is required"),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const serviceOptions = [
  "General Pest Control",
  "Mosquito Control",
  "Termite Control",
  "Flea & Tick Control",
  "Bed Bug Control",
  "Ant Control",
  "Spider Control",
  "Wasp Control",
  "Hornet Control",
  "Scorpion Control",
  "Rodent Control",
  "Roach Control",
  "Termite Inspections",
];

const labelStyle = { color: 'hsl(20, 40%, 12%)' };
const inputClass = "w-full rounded-xl border border-orange-200 px-4 py-2.5 text-base focus:outline-none focus:border-primary transition-colors";

const QuotePage = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [smsTransactional, setSmsTransactional] = useState(false);
  const [smsMarketing, setSmsMarketing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { services: [], consentTransactional: false },
  });

  const onSubmit = async (data: QuoteFormData) => {
    setSubmitting(true);
    try {
      const leadData = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        service: data.services.join(", "),
        message: data.message || null,
        sms_transactional_consent: smsTransactional,
        sms_marketing_consent: smsMarketing,
      };

      const { error } = await supabase.from("leads").insert(leadData);
      if (error) throw error;

      supabase.functions.invoke("notify-new-lead", { body: { ...leadData, form_type: 'quote' } }).catch(() => {});

      if (smsTransactional && data.phone) {
        supabase.functions.invoke("send-sms-confirmation", {
          body: { phone: data.phone, firstName: data.firstName },
        }).catch(() => {});
      }

      toast({
        title: "Quote Request Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      reset();
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const { seoTitle, seoDescription } = useSiteConfig("/quote");

  return (
    <div className="min-h-screen">
      <SEO
        title={seoTitle || "Get a Free Quote"}
        description={seoDescription || "Request a free pest control quote from Dang Pest Control in Tyler, TX. Fast response, family & pet safe treatments, Super Powered Guarantee."}
        canonical="/quote"
      />
      <Navbar />
      <main>

      {/* Header */}
      <section style={{
        position: 'relative',
        background: `url(/moblie_banner.webp) center/cover no-repeat, hsl(28, 100%, 50%)`,
        paddingTop: '80px',
        paddingBottom: '200px',
        minHeight: '420px',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.18) 1.5px, transparent 1.5px)', backgroundSize: '18px 18px', pointerEvents: 'none' }} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 20px 30px' }}>
          <h1 style={{
            fontFamily: '"Bangers", cursive',
            fontSize: 'clamp(56px, 9vw, 100px)',
            color: 'hsl(45, 95%, 60%)',
            fontStyle: 'italic',
            letterSpacing: '0.05em',
            WebkitTextStroke: '3px #000000',
            textShadow: '3px 3px 0 #000000',
            margin: 0,
            lineHeight: 1,
          }}>
            GET YOUR QUOTE
          </h1>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
          <img fetchPriority="high" width={1200} height={50} src="/banner-img.png" alt="" style={{ width: '100%', display: 'block' }} />
        </div>
      </section>

      {/* Form */}
      <section className="py-16" style={{background: 'hsl(30, 40%, 97%)'}}>
        <div className="container mx-auto px-4 max-w-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-orange-100 p-8 space-y-6">
            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold mb-1 block" style={labelStyle}>First Name *</label>
                <input {...register("firstName")} className={inputClass} />
                {errors.firstName && <p className="text-destructive text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block" style={labelStyle}>Last Name *</label>
                <input {...register("lastName")} className={inputClass} />
                {errors.lastName && <p className="text-destructive text-xs mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold mb-1 block" style={labelStyle}>Email *</label>
                <input type="email" {...register("email")} className={inputClass} />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block" style={labelStyle}>Phone *</label>
                <input type="tel" {...register("phone")} className={inputClass} />
                {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-semibold mb-1 block" style={labelStyle}>Street Address *</label>
              <input {...register("address")} className={inputClass} />
              {errors.address && <p className="text-destructive text-xs mt-1">{errors.address.message}</p>}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-semibold mb-1 block" style={labelStyle}>City *</label>
                <input {...register("city")} className={inputClass} />
                {errors.city && <p className="text-destructive text-xs mt-1">{errors.city.message}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block" style={labelStyle}>State *</label>
                <input {...register("state")} className={inputClass} />
                {errors.state && <p className="text-destructive text-xs mt-1">{errors.state.message}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block" style={labelStyle}>ZIP *</label>
                <input {...register("zip")} className={inputClass} />
                {errors.zip && <p className="text-destructive text-xs mt-1">{errors.zip.message}</p>}
              </div>
            </div>

            {/* Services */}
            <div>
              <label className="text-sm font-semibold mb-2 block" style={labelStyle}>Service(s) Requested *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {serviceOptions.map((service) => (
                  <label key={service} className="flex items-center gap-2 text-sm" style={{color: 'hsl(20, 20%, 35%)'}}>
                    <input type="checkbox" value={service} {...register("services")} className="rounded" />
                    {service}
                  </label>
                ))}
              </div>
              {errors.services && <p className="text-destructive text-xs mt-1">{errors.services.message}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-semibold mb-1 block" style={labelStyle}>Message (Optional)</label>
              <textarea {...register("message")} rows={4} className={inputClass} />
            </div>

            {/* Transactional SMS consent */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("consentTransactional", {
                    onChange: (e) => setSmsTransactional(e.target.checked),
                  })}
                  className="mt-1 w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-600">
                  By checking this box, I consent to receive transactional messages related to Dang Pest Control for my account, orders, or services I have requested. These messages may include appointment reminders, order confirmations, and account notifications among others. Message frequency may vary. Message &amp; Data rates may apply. Reply HELP for help or STOP to opt-out. *
                </span>
              </label>
              {errors.consentTransactional && <p className="text-destructive text-xs mt-1">{errors.consentTransactional.message}</p>}
            </div>

            {/* Marketing SMS consent */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={smsMarketing}
                onChange={e => setSmsMarketing(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-600">
                By checking this box, I consent to receive marketing and promotional messages from Dang Pest Control. Message frequency may vary. Message &amp; Data rates may apply. Reply HELP for help or STOP to opt-out.
              </span>
            </label>

            <button type="submit" disabled={submitting} className="w-full font-bold rounded-full py-3 text-white text-base transition-all hover:brightness-110 disabled:opacity-50" style={{background: 'hsl(var(--primary))'}}>
              <Send className="w-5 h-5 mr-2 inline" /> {submitting ? "Submitting..." : "Submit Quote Request"}
            </button>
          </form>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default QuotePage;
