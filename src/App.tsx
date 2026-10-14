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
const FabricaSoftwareJoaoPessoa = lazy(() => import("./pages/FabricaSoftwareJoaoPessoa"));
const AgentesIAWhatsappJoaoPessoa = lazy(() => import("./pages/AgentesIAWhatsappJoaoPessoa"));
const AutomacaoProcessosJoaoPessoa = lazy(() => import("./pages/AutomacaoProcessosJoaoPessoa"));
const ConsultoriaISO9001Construtoras = lazy(() => import("./pages/ConsultoriaISO9001Construtoras"));
const EngenhariaProducaoAgroindustriaParaiba = lazy(() => import("./pages/EngenhariaProducaoAgroindustriaParaiba"));
const CasoTerreISO9001 = lazy(() => import("./pages/CasoTerreISO9001"));
const CasoAcompanhamentoObras = lazy(() => import("./pages/CasoAcompanhamentoObras"));
const CasoRestauranteProcessos = lazy(() => import("./pages/CasoRestauranteProcessos"));
const MetodoDistipp = lazy(() => import("./pages/MetodoDistipp"));
const EstudoMaturidadePB = lazy(() => import("./pages/EstudoMaturidadePB"));
const Equipe = lazy(() => import("./pages/Equipe"));
const SetorConstrutoras = lazy(() => import("./pages/SetorConstrutoras"));
const SetorClinicasSaude = lazy(() => import("./pages/SetorClinicasSaude"));
const SetorVarejo = lazy(() => import("./pages/SetorVarejo"));
const SetorIndustria = lazy(() => import("./pages/SetorIndustria"));
const SetorEmpresasServicos = lazy(() => import("./pages/SetorEmpresasServicos"));
const AtendimentoCampinaGrande = lazy(() => import("./pages/AtendimentoCampinaGrande"));
const AtendimentoRecife = lazy(() => import("./pages/AtendimentoRecife"));
const AtendimentoNatal = lazy(() => import("./pages/AtendimentoNatal"));
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
            <Route path="/fabrica-de-software-sob-medida-joao-pessoa" element={<FabricaSoftwareJoaoPessoa />} />
            <Route path="/agentes-de-ia-whatsapp-joao-pessoa" element={<AgentesIAWhatsappJoaoPessoa />} />
            <Route path="/automacao-de-processos-joao-pessoa" element={<AutomacaoProcessosJoaoPessoa />} />
            <Route path="/consultoria-iso-9001-construtoras" element={<ConsultoriaISO9001Construtoras />} />
            <Route path="/engenharia-de-producao-agroindustria-paraiba" element={<EngenhariaProducaoAgroindustriaParaiba />} />
            <Route path="/casos/construtora-terre-iso-9001" element={<CasoTerreISO9001 />} />
            <Route path="/casos/construtora-acompanhamento-de-obras" element={<CasoAcompanhamentoObras />} />
            <Route path="/casos/restaurante-processos" element={<CasoRestauranteProcessos />} />
            <Route path="/metodo-distipp" element={<MetodoDistipp />} />
            <Route path="/estudos/maturidade-operacional-paraiba-2026" element={<EstudoMaturidadePB />} />
            <Route path="/equipe" element={<Equipe />} />
            <Route path="/setores/construtoras" element={<SetorConstrutoras />} />
            <Route path="/setores/clinicas-e-saude" element={<SetorClinicasSaude />} />
            <Route path="/setores/varejo" element={<SetorVarejo />} />
            <Route path="/setores/industria" element={<SetorIndustria />} />
            <Route path="/setores/empresas-de-servicos" element={<SetorEmpresasServicos />} />
            <Route path="/atendimento/campina-grande" element={<AtendimentoCampinaGrande />} />
            <Route path="/atendimento/recife" element={<AtendimentoRecife />} />
            <Route path="/atendimento/natal" element={<AtendimentoNatal />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
