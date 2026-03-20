import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QuotePage from "./pages/QuotePage";
import About from "./pages/About";
import AdminPage from "./pages/AdminPage";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import SlugRouter from "./pages/SlugRouter";
import RedirectLegacy from "./pages/RedirectLegacy";
import ServiceArea from "./pages/ServiceArea";
import ReviewsPage from "./pages/ReviewsPage";
import BlogPage from "./pages/BlogPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import AccessibilityPage from "./pages/AccessibilityPage";
import AdminOnboarding from "./pages/AdminOnboarding";
import FloatingTextUs from "./components/FloatingTextUs";
import MosquitoControl from "./pages/MosquitoControl";
import SpiderControl from "./pages/SpiderControl";
import AntControl from "./pages/AntControl";
import WaspHornetControl from "./pages/WaspHornetControl";
import RoachControl from "./pages/RoachControl";
import FleaTickControl from "./pages/FleaTickControl";
import RodentControl from "./pages/RodentControl";
import ScorpionControl from "./pages/ScorpionControl";
import BedBugControl from "./pages/BedBugControl";
import TermiteControl from "./pages/TermiteControl";
import TermiteInspections from "./pages/TermiteInspections";
import PestControlPage from "./pages/PestControlPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/onboarding" element={<AdminOnboarding />} />
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
          <Route path="/:slug" element={<SlugRouter />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
