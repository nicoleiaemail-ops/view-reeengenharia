import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Servicos } from "@/components/Servicos";
import { Pains } from "@/components/Pains";
import { CostOfNotSeeing } from "@/components/CostOfNotSeeing";
import { Solution } from "@/components/Solution";
import { DISTIP } from "@/components/DISTIP";
import { Results } from "@/components/Results";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

const faqs = [
  { q: "O que é reengenharia de processos?", a: "Reengenharia de processos é o redesign completo de como sua empresa funciona — substituindo rotinas manuais, planilhas descentralizadas e decisões baseadas em achismo por fluxos digitais, automatizados e orientados a dados em tempo real." },
  { q: "Quanto tempo leva para ver resultados?", a: "O diagnóstico gratuito é concluído em 48 horas. Projetos de automação costumam ter primeiros resultados visíveis entre 3 e 6 meses após o início da implementação." },
  { q: "A VIEW atende empresas de qualquer segmento?", a: "Sim. Já atuamos em construção civil, alimentação, indústria, serviços e varejo. Atendemos presencialmente em PB, PE e RN, e remotamente em todo o Brasil." },
  { q: "A VIEW vende software?", a: "Não. Entregamos execução completa: diagnóstico, redesign de processos, automação, sistema sob medida e acompanhamento contínuo. O software é uma consequência." },
  { q: "Qual o investimento?", a: "O diagnóstico é 100% gratuito e sem compromisso. O investimento do projeto é definido após entender o escopo. O retorno sobre o investimento é mensurável desde as primeiras semanas." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VIEW Reengenharia de Processos",
  url: "https://viewprocessos.com.br/",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "VIEW Reengenharia de Processos",
  alternateName: "VIEW",
  url: "https://viewprocessos.com.br",
  logo: "https://viewprocessos.com.br/favicon.ico",
  description:
    "Empresa especializada em reengenharia de processos, automação operacional e visibilidade em tempo real para gestores de PMEs. Metodologia exclusiva DISTIPP.",
  foundingDate: "2024",
  areaServed: [
    { "@type": "State", name: "Paraíba" },
    { "@type": "State", name: "Pernambuco" },
    { "@type": "State", name: "Rio Grande do Norte" },
    { "@type": "Country", name: "Brasil" },
  ],
  knowsAbout: [
    "Reengenharia de processos",
    "Automação de processos",
    "Business Intelligence",
    "Transformação digital",
    "Visibilidade operacional",
    "Sistemas de gestão personalizados",
    "Metodologia DISTIPP",
  ],
  serviceType: [
    "Reengenharia de Processos",
    "Automação de Processos",
    "Business Intelligence",
    "Sistemas de Gestão Customizados",
    "Diagnóstico Operacional Gratuito",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços VIEW",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Diagnóstico Gratuito de Maturidade Operacional",
          description:
            "Mapeamento do nível de maturidade digital da empresa em 48h, sem custo e sem compromisso.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Reengenharia de Processos",
          description:
            "Redesign completo dos fluxos operacionais, eliminando rotinas manuais e planilhas por processos digitais orientados a dados.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sistemas de Gestão Customizados",
          description:
            "Desenvolvimento de sistemas sob medida para iOS, Android e Desktop, adaptados à realidade operacional da empresa.",
        },
      },
    ],
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Vitória D." },
      reviewBody:
        "Manter o ISO 9001 era uma corrida contra o tempo a cada auditoria. Com a VIEW, cada etapa da obra gera um registro automático. Hoje acompanho o andamento de qualquer projeto em tempo real — de onde estiver.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Aguinaldo S." },
      reviewBody:
        "Antes eu precisava ligar pra cada encarregado pra saber o que tava acontecendo. Agora abro o aplicativo e vejo tudo: o que foi feito, o que atrasou, quem tá onde. Mudou completamente a forma como eu gerencio a obra.",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "2",
    bestRating: "5",
  },
};

const Landing = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEO
        title="VIEW — Visibilidade e Controle Operacional para Empresas"
        description="A VIEW entrega visibilidade operacional, controle de processos e informação em tempo real com IA, automação e sistemas sob medida."
        path="/"
        jsonLd={[websiteJsonLd, organizationJsonLd, faqJsonLd]}
      />
      <Navbar />
      <Hero />
      <Servicos />
      <Results />
      <DISTIP />
      <Pains />
      <CostOfNotSeeing />
      <Solution />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppFloat />
      <StickyMobileCTA />
    </>
  );
};

export default Landing;
