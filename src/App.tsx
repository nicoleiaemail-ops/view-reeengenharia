import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";

const About = lazy(() => import("./pages/About"));
const Solucoes = lazy(() => import("./pages/Solucoes"));
const AvaliacaoMaturidade = lazy(() => import("./pages/AvaliacaoMaturidade"));
const Casos = lazy(() => import("./pages/Casos"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/solucoes" element={<Solucoes />} />
            <Route path="/avaliacao-maturidade" element={<AvaliacaoMaturidade />} />
            <Route path="/casos" element={<Casos />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
