import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { trackPageView } from "@/lib/analytics";
import Landing from "./pages/Landing";

const About = lazy(() => import("./pages/About"));
const Solucoes = lazy(() => import("./pages/Solucoes"));
const AvaliacaoMaturidade = lazy(() => import("./pages/AvaliacaoMaturidade"));
const Casos = lazy(() => import("./pages/Casos"));
const Blog = lazy(() => import("./pages/Blog"));
const Privacidade = lazy(() => import("./pages/Privacidade"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Admin = lazy(() => import("./pages/Admin"));
const Links = lazy(() => import("./pages/Links"));
const IAJoaoPessoa = lazy(() => import("./pages/IAJoaoPessoa"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

/**
 * O GA4 só conta a carga inicial do documento. Em SPA, cada troca de rota
 * precisa ser registrada à mão — sem isto todo o tráfego de /solucoes, /casos
 * e /blog ficava invisível no relatório.
 */
function RouteTracker() {
  const { pathname } = useLocation();
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <RouteTracker />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/solucoes" element={<Solucoes />} />
            <Route path="/avaliacao-maturidade" element={<AvaliacaoMaturidade />} />
            <Route path="/casos" element={<Casos />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/privacidade" element={<Privacidade />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/links" element={<Links />} />
            <Route path="/ia-para-empresas-joao-pessoa" element={<IAJoaoPessoa />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
