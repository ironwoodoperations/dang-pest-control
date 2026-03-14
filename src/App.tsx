import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QuotePage from "./pages/QuotePage";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import SlugRouter from "./pages/SlugRouter";
import RedirectLegacy from "./pages/RedirectLegacy";
import ServiceAreaPage from "./pages/ServiceAreaPage";
import ReviewsPage from "./pages/ReviewsPage";
import BlogPage from "./pages/BlogPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import AccessibilityPage from "./pages/AccessibilityPage";
import AdminOnboarding from "./pages/AdminOnboarding";
import FloatingTextUs from "./components/FloatingTextUs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/service-area" element={<ServiceAreaPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/onboarding" element={<AdminOnboarding />} />
          {/* Legacy redirects: /services/:slug → /:slug, /locations/:slug → /:slug */}
          <Route path="/services/:slug" element={<RedirectLegacy />} />
          <Route path="/locations/:slug" element={<RedirectLegacy />} />
          {/* Dynamic slug router for services & locations */}
          <Route path="/:slug" element={<SlugRouter />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
