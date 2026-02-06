import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Cantieri from "./pages/Cantieri";
import Investimenti from "./pages/Investimenti";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/proprieta" element={<Properties />} />
        <Route path="/proprieta/:id" element={<PropertyDetail />} />
        <Route path="/servizi" element={<Services />} />
        <Route path="/contatti" element={<Contact />} />
        <Route path="/cantieri" element={<Cantieri />} />
        <Route path="/investimenti" element={<Investimenti />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
