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
  { q: "O que é a metodologia DISTIPP?", a: "DISTIPP é a metodologia exclusiva da VIEW para diagnóstico de maturidade empresarial. Analisa sete dimensões: Dados, Integração, Sistemas, Tecnologia, Inovação, Pessoas e Processos. Com base nesse mapeamento, a VIEW define quais áreas priorizar para gerar mais resultado." },
  { q: "Quanto tempo leva para ver resultados?", a: "O diagnóstico gratuito é concluído em 48 horas. Projetos de automação costumam ter primeiros resultados visíveis entre 3 e 6 meses após o início da implementação." },
  { q: "Qual a diferença entre automação e reengenharia de processos?", a: "Reengenharia redesenha como o processo funciona — elimina etapas desnecessárias, padroniza fluxos e define responsabilidades. Automação executa processos já bem definidos sem intervenção humana. A VIEW sempre faz reengenharia antes de automatizar: não automatizamos o caos." },
  { q: "A VIEW atende empresas de qualquer segmento?", a: "Sim. Já atuamos em construção civil, alimentação, indústria, serviços e varejo. Atendemos presencialmente em PB, PE e RN, e remotamente em todo o Brasil." },
  { q: "Como funciona o diagnóstico gratuito?", a: "O diagnóstico é uma análise inicial da sua operação feita pela equipe VIEW. Em até 48 horas identificamos os principais gargalos, custos ocultos e oportunidades de automação — e apresentamos um caminho claro, sem compromisso e sem jargão técnico." },
  { q: "A VIEW vende software?", a: "Não. Entregamos execução completa: diagnóstico, redesign de processos, automação, sistema sob medida e acompanhamento contínuo. O software é uma consequência do processo bem estruturado, não o ponto de partida." },
  { q: "O que é maturidade operacional de uma empresa?", a: "Maturidade operacional é o grau em que uma empresa tem seus processos documentados, dados centralizados, tecnologia integrada e equipes orientadas por indicadores. Empresas com alta maturidade tomam decisões mais rápidas, cometem menos erros e escalam com mais controle." },
  { q: "Qual o investimento?", a: "O diagnóstico é 100% gratuito e sem compromisso. O investimento do projeto é definido após entender o escopo. O retorno sobre o investimento é mensurável desde as primeiras semanas." },
  { q: "A VIEW atende pequenas e médias empresas?", a: "Sim. A VIEW foi criada especificamente para PMEs que querem operar com a mesma inteligência das grandes corporações, sem precisar de um departamento de TI próprio. Atendemos empresas de 5 a 200 funcionários." },
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
  logo: "https://viewprocessos.com.br/og-image.png",
  description:
    "Empresa especializada em reengenharia de processos, automação operacional e visibilidade em tempo real para gestores de PMEs. Metodologia exclusiva DISTIPP.",
  telephone: "+55-83-99565-0051",
  email: "admin@reengenhariaview.com.br",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55-83-99565-0051",
    contactType: "customer service",
    availableLanguage: "Portuguese",
    contactOption: "TollFree",
  },
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

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "VIEW Reengenharia de Processos",
  image: "https://viewprocessos.com.br/og-image.png",
  url: "https://viewprocessos.com.br",
  telephone: "+55-83-99565-0051",
  email: "admin@reengenhariaview.com.br",
  priceRange: "$$",
  description: "Consultoria especializada em reengenharia de processos, automação operacional, IA e visibilidade em tempo real para PMEs no Nordeste do Brasil.",
  address: {
    "@type": "PostalAddress",
    addressRegion: "PB",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "-7.2249",
    longitude: "-35.8809",
  },
  areaServed: [
    { "@type": "State", name: "Paraíba" },
    { "@type": "State", name: "Pernambuco" },
    { "@type": "State", name: "Rio Grande do Norte" },
    { "@type": "Country", name: "Brasil" },
  ],
  sameAs: [],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
};

const speakableJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "VIEW — Visibilidade e Controle Operacional para Empresas",
  url: "https://viewprocessos.com.br/",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", "#faq", "#distip"],
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
        jsonLd={[websiteJsonLd, organizationJsonLd, localBusinessJsonLd, faqJsonLd, speakableJsonLd]}
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
