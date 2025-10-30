
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Challenge from "./pages/Challenge";
import Teams from "./pages/Teams";
import Admin from "./pages/Admin";
import AgeVerification from "@/pages/pages_age/AgeVerification"
import Verify from "@/pages/pages_age/Verify";

import Contact_App from "./pages/Contact_App";




const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={<Index />} />
          <Route path="/AgeVerification" element={<AgeVerification />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/Contact" element={<Contact_App />} />
  
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
           
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
