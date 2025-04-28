import { Suspense, lazy } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// The landing page is the first thing anyone sees, so we ship it eagerly.
import Index from "./pages/Index";

// Everything else is lazy-loaded so the initial bundle stays lean. Each route
// becomes its own chunk that only downloads when a visitor actually asks for it.
const PersonPage = lazy(() => import("./pages/PersonPage"));
const WorkspacePage = lazy(() => import("./pages/WorkspacePage"));
const ModalPage = lazy(() => import("./pages/ModalPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TaskPage = lazy(() => import("./pages/TaskPage"));
const CalendarPage = lazy(() => import("./pages/CalendarPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CareersTestPage = lazy(() => import("./pages/CareersTestPage"));
const PTestPage = lazy(() => import("./pages/PTestPage"));
const ApiTestPage = lazy(() => import("./pages/ApiTestPage"));
const CareerApplyPage = lazy(() => import("./pages/CareerApplyPage"));
const CareerSuccessPage = lazy(() => import("./pages/CareerSuccessPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const JobDetailPage = lazy(() => import("./pages/JobDetailPage"));
const AIMarketingPage = lazy(() => import("./pages/AIMarketingPage"));
const FashionCaseStudyPage = lazy(() => import("./pages/FashionCaseStudyPage"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-foreground" />
    <span className="sr-only">Loading…</span>
  </div>
);

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="build-teams-theme">
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/person" element={<PersonPage />} />
              <Route path="/workspace" element={<WorkspacePage />} />
              <Route path="/modal" element={<ModalPage />} />
              <Route path="/task" element={<TaskPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/careers/test" element={<CareersTestPage />} />
              <Route path="/ptest" element={<PTestPage />} />
              <Route path="/api-test" element={<ApiTestPage />} />
              <Route path="/career/apply" element={<CareerApplyPage />} />
              <Route path="/career/success" element={<CareerSuccessPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/careers/:jobId" element={<JobDetailPage />} />
              <Route path="/ai-marketing" element={<AIMarketingPage />} />
              <Route path="/fashion-case-study" element={<FashionCaseStudyPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
