import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CampaignPage from "./pages/CampaignPage";
import CampaignDetailPage from "./pages/CampaignDetailPage";
import DonatePage from "./pages/DonatePage";
import AuthPage from "./pages/AuthPage";
import AdminPanel from "./pages/AdminPanel";
import DashboardPage from "@/pages/DashboardPage";
import { AuthProvider, PrivateRoute, AuthContext } from "@/lib/AuthContext";
import PaymentPage from "@/pages/PaymentPage";
import NotFound from "./pages/NotFound";
import OurStoryPage from "@/pages/OurStoryPage";
import HowItWorksPage from "@/pages/HowItWorksPage";
import StartFundraiserPage from "@/pages/StartFundraiserPage";
import ContactPage from "@/pages/ContactPage";
import ImpactPage from "@/pages/ImpactPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/campaigns" element={<CampaignPage />} />
            <Route path="/campaign/:slug" element={<CampaignDetailPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute
                  element={
                    <AuthContext.Consumer>
                      {({ role }) => (role === "admin" ? <AdminPanel /> : <DashboardPage />)}
                    </AuthContext.Consumer>
                  }
                />
              }
            />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/start-fundraiser" element={<StartFundraiserPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/impact" element={<ImpactPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
