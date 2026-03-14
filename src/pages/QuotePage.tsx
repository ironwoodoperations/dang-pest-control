import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

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

const QuotePage = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { services: [], consentTransactional: false },
  });

  const onSubmit = (data: QuoteFormData) => {
    console.log("Quote request submitted:", data);
    toast({
      title: "Quote Request Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    reset();
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="hero-bg text-primary-foreground py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-comic text-4xl md:text-5xl mb-4">Get Your Quote</h1>
          <p className="text-lg opacity-90 max-w-xl mx-auto">
            Fill out the form below and our team will get back to you quickly with a customized quote for your pest control needs.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">First Name *</label>
                <input {...register("firstName")} className="w-full border border-input rounded-lg px-4 py-2.5 bg-background" />
                {errors.firstName && <p className="text-destructive text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Last Name *</label>
                <input {...register("lastName")} className="w-full border border-input rounded-lg px-4 py-2.5 bg-background" />
                {errors.lastName && <p className="text-destructive text-xs mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Email *</label>
                <input type="email" {...register("email")} className="w-full border border-input rounded-lg px-4 py-2.5 bg-background" />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Phone *</label>
                <input type="tel" {...register("phone")} className="w-full border border-input rounded-lg px-4 py-2.5 bg-background" />
                {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold mb-1">Street Address *</label>
              <input {...register("address")} className="w-full border border-input rounded-lg px-4 py-2.5 bg-background" />
              {errors.address && <p className="text-destructive text-xs mt-1">{errors.address.message}</p>}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">City *</label>
                <input {...register("city")} className="w-full border border-input rounded-lg px-4 py-2.5 bg-background" />
                {errors.city && <p className="text-destructive text-xs mt-1">{errors.city.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">State *</label>
                <input {...register("state")} className="w-full border border-input rounded-lg px-4 py-2.5 bg-background" />
                {errors.state && <p className="text-destructive text-xs mt-1">{errors.state.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">ZIP *</label>
                <input {...register("zip")} className="w-full border border-input rounded-lg px-4 py-2.5 bg-background" />
                {errors.zip && <p className="text-destructive text-xs mt-1">{errors.zip.message}</p>}
              </div>
            </div>

            {/* Services */}
            <div>
              <label className="block text-sm font-semibold mb-2">Service(s) Requested *</label>
              <div className="grid grid-cols-2 gap-2">
                {serviceOptions.map((service) => (
                  <label key={service} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" value={service} {...register("services")} className="rounded" />
                    {service}
                  </label>
                ))}
              </div>
              {errors.services && <p className="text-destructive text-xs mt-1">{errors.services.message}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold mb-1">Message (Optional)</label>
              <textarea {...register("message")} rows={4} className="w-full border border-input rounded-lg px-4 py-2.5 bg-background" />
            </div>

            {/* Consent */}
            <div>
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" {...register("consentTransactional")} className="mt-1 rounded" />
                <span>I consent to receive transactional communications from Dang Pest Control regarding my service request. *</span>
              </label>
              {errors.consentTransactional && <p className="text-destructive text-xs mt-1">{errors.consentTransactional.message}</p>}
            </div>

            <button type="submit" className="btn-cta w-full">
              <Send className="w-5 h-5 mr-2" /> Submit Quote Request
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QuotePage;
