import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
const Index = lazy(() => import("./pages/Index"));
const QuotePage = lazy(() => import("./pages/QuotePage"));
const About = lazy(() => import("./pages/About"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SlugRouter = lazy(() => import("./pages/SlugRouter"));
const RedirectLegacy = lazy(() => import("./pages/RedirectLegacy"));
const ServiceArea = lazy(() => import("./pages/ServiceArea"));
const ReviewsPage = lazy(() => import("./pages/ReviewsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AccessibilityPage = lazy(() => import("./pages/AccessibilityPage"));
const AdminOnboarding = lazy(() => import("./pages/AdminOnboarding"));
const Onboarding = lazy(() => import("./pages/admin/Onboarding"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const FloatingTextUs = lazy(() => import("./components/FloatingTextUs"));
const MosquitoControl = lazy(() => import("./pages/MosquitoControl"));
const SpiderControl = lazy(() => import("./pages/SpiderControl"));
const AntControl = lazy(() => import("./pages/AntControl"));
const WaspHornetControl = lazy(() => import("./pages/WaspHornetControl"));
const RoachControl = lazy(() => import("./pages/RoachControl"));
const FleaTickControl = lazy(() => import("./pages/FleaTickControl"));
const RodentControl = lazy(() => import("./pages/RodentControl"));
const ScorpionControl = lazy(() => import("./pages/ScorpionControl"));
const BedBugControl = lazy(() => import("./pages/BedBugControl"));
const TermiteControl = lazy(() => import("./pages/TermiteControl"));
const TermiteInspections = lazy(() => import("./pages/TermiteInspections"));
const PestControlPage = lazy(() => import("./pages/PestControlPage"));
const JacksonvilleTX = lazy(() => import("./pages/JacksonvilleTX"));
const LongviewTX = lazy(() => import("./pages/LongviewTX"));
const LindaleTX = lazy(() => import("./pages/LindaleTX"));
const BullardTX = lazy(() => import("./pages/BullardTX"));
const WhitehouseTX = lazy(() => import("./pages/WhitehouseTX"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div style={{ minHeight: "100vh", background: "#fff" }} />}>
          <FloatingTextUs />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quote" element={<QuotePage />} />
            <Route path="/service-area" element={<ServiceArea />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
            <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
            <Route path="/admin/setup" element={<AdminOnboarding />} />
            {/* Legacy redirects: /services/:slug → /:slug, /locations/:slug → /:slug */}
            <Route path="/services/:slug" element={<RedirectLegacy />} />
            <Route path="/locations/:slug" element={<RedirectLegacy />} />
            {/* Dynamic slug router for services & locations */}
            <Route path="/mosquito-control" element={<MosquitoControl />} />
            <Route path="/spider-control" element={<SpiderControl />} />
            <Route path="/ant-control" element={<AntControl />} />
            <Route path="/wasp-hornet-control" element={<WaspHornetControl />} />
            <Route path="/roach-control" element={<RoachControl />} />
            <Route path="/flea-tick-control" element={<FleaTickControl />} />
            <Route path="/rodent-control" element={<RodentControl />} />
            <Route path="/termite-control" element={<TermiteControl />} />
            <Route path="/scorpion-control" element={<ScorpionControl />} />
            <Route path="/bed-bug-control" element={<BedBugControl />} />
            <Route path="/pest-control" element={<PestControlPage />} />
            <Route path="/termite-inspections" element={<TermiteInspections />} />
            <Route path="/about" element={<About />} />
            <Route path="/jacksonville-tx" element={<JacksonvilleTX />} />
            <Route path="/longview-tx" element={<LongviewTX />} />
            <Route path="/lindale-tx" element={<LindaleTX />} />
            <Route path="/bullard-tx" element={<BullardTX />} />
            <Route path="/whitehouse-tx" element={<WhitehouseTX />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/:slug" element={<SlugRouter />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
