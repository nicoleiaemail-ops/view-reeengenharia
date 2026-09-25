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
import { FAQ, faqItems } from "@/components/FAQ";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

/*
  As perguntas eram declaradas duas vezes: aqui, para o JSON-LD, e outra vez
  dentro do componente FAQ, para a tela. As duas cópias já haviam divergido em
  quatro respostas — o que o Google lia não era mais o que o visitante lia.
  Agora o schema é gerado a partir da mesma lista que renderiza a seção.
*/
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VIEW Reengenharia de Processos",
  url: "https://reengenhariaview.com.br/",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "VIEW Reengenharia de Processos",
  alternateName: "VIEW",
  url: "https://reengenhariaview.com.br",
  logo: "https://reengenhariaview.com.br/og-image.png",
  description:
    "Empresa especializada em reengenharia de processos, automação operacional e visibilidade em tempo real para gestores de PMEs. Metodologia exclusiva DISTIPP.",
  telephone: "+55-83-99322-4878",
  email: "admin@reengenhariaview.com.br",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55-83-99322-4878",
    contactType: "customer service",
    availableLanguage: "Portuguese",
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
    "Evolução empresarial",
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
  // Havia aqui um aggregateRating de "5,0 com 2 avaliações". Nota máxima
  // apoiada em duas avaliações é o padrão que o Google trata como rich snippet
  // abusivo, e para um leitor humano soa pior do que não ter nota nenhuma. Os
  // depoimentos individuais continuam declarados acima, que é o que de fato
  // existe. Reintroduza a nota agregada quando houver volume real.
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "VIEW Reengenharia de Processos",
  image: "https://reengenhariaview.com.br/og-image.png",
  url: "https://reengenhariaview.com.br",
  telephone: "+55-83-99322-4878",
  email: "admin@reengenhariaview.com.br",
  priceRange: "$$",
  description: "Consultoria especializada em reengenharia de processos, automação operacional, IA e visibilidade em tempo real para PMEs no Nordeste do Brasil.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Pres. Epitácio Pessoa, 1251, Sala 101, Bairro dos Estados",
    addressLocality: "João Pessoa",
    addressRegion: "PB",
    postalCode: "58030-000",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "-7.1193777",
    longitude: "-34.8592312",
  },
  areaServed: [
    { "@type": "State", name: "Paraíba" },
    { "@type": "State", name: "Pernambuco" },
    { "@type": "State", name: "Rio Grande do Norte" },
    { "@type": "Country", name: "Brasil" },
  ],
  sameAs: [
    "https://www.instagram.com/reengenhariaview",
    "https://maps.app.goo.gl/3eS9uGY33MLKijYL9",
  ],
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
  url: "https://reengenhariaview.com.br/",
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
        description="A VIEW devolve o controle da operação para quem toma decisão."
        path="/"
        jsonLd={[websiteJsonLd, organizationJsonLd, localBusinessJsonLd, faqJsonLd, speakableJsonLd]}
      />
      <Navbar />
      <Hero />
      {/*
        A ordem anterior era Hero → Serviços → Resultados → DISTIPP → Dores →
        Custo → Solução → Prova → FAQ → Form: as cinco áreas de serviço e a
        metodologia apareciam antes de o problema ter sido estabelecido, e o
        visitante era apresentado à solução de algo que ainda não tinha
        reconhecido como dor.

        Agora: dor → custo da dor → solução → como fazemos → prova → método →
        dúvidas → oferta.
      */}
      <Pains />
      <CostOfNotSeeing />
      <Solution />
      <Servicos />
      <Results />
      <Testimonials />
      <DISTIP />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppFloat />
      <StickyMobileCTA />
    </>
  );
};

export default Landing;
