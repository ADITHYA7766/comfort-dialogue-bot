
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MindfulAI from "./pages/MindfulAI";
import MedKitAI from "./pages/MedKitAI";
import NotFound from "./pages/NotFound";
import Docs from "./pages/Docs";
import { ThemeProvider } from "./components/ThemeProvider";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="health-companion-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mindfulai" element={<MindfulAI />} />
              <Route path="/medkitai" element={<MedKitAI />} />
              <Route path="/docs" element={<Docs />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
