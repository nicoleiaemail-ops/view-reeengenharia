import { useEffect } from "react";
import { BUSINESS_JSONLD_BASE } from "@/lib/business";
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
import { SolucoesJoaoPessoa } from "@/components/SolucoesJoaoPessoa";
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
  name: BUSINESS_JSONLD_BASE.name,
  alternateName: BUSINESS_JSONLD_BASE.alternateName,
  url: "https://reengenhariaview.com.br/",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  ...BUSINESS_JSONLD_BASE,
  description:
    "Parceira de evolução empresarial: desenha o processo, integra os sistemas, automatiza a rotina e entrega o dado que muda a decisão. Metodologia exclusiva DISTIPP.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: BUSINESS_JSONLD_BASE.telephone,
    contactType: "customer service",
    availableLanguage: "Portuguese",
  },
  foundingDate: "2024",
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
  // O catalogo listava tres servicos da estrutura antiga. Passa a listar as
  // cinco frentes, com as descricoes aprovadas, mais o diagnostico gratuito,
  // que continua sendo a oferta de entrada do site.
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
            "Mapeamento do nível de maturidade da empresa nas 7 dimensões do DISTIPP, sem custo e sem compromisso.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "VIEW 360",
          description:
            "Antes de comprar qualquer ferramenta, você descobre onde o processo trava, quanto isso custa por mês e em que ordem resolver.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "VIEW FLOW",
          description:
            "O processo sai da cabeça das pessoas e vira fluxo escrito. Depois disso, a parte repetitiva passa a rodar sozinha.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "VIEW ONE",
          description:
            "Os sistemas que você já paga passam a conversar entre si. Conforme os fornecedores saem, o custo deles vira investimento na sua operação.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "VIEW INSIGHTS",
          description:
            "Indicador que muda a decisão de segunda-feira. Se ninguém abre o relatório, ele não conta como informação.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "VIEW ACADEMY",
          description:
            "Sua equipe aprende a operar e a decidir sem depender de fornecedor para cada ajuste.",
        },
      },
    ],
  },

  // O Search Console passou a sinalizar "Review sem aggregateRating" aqui.
  // A causa raiz não era a nota ausente: segundo a documentação do Google
  // (Review snippet — self-serving reviews), uma página é inelegível para o
  // rich result de estrelas quando a própria entidade descrita controla as
  // avaliações sobre si mesma — é exatamente este caso (a VIEW marcando
  // depoimentos de clientes seus na sua própria página). Isso vale com ou sem
  // aggregateRating: adicionar uma nota de "5,0 com 2 avaliações" não
  // destravaria o rich result, só fabricaria uma média que nem é elegível e
  // que, à parte, é o padrão que o Google trata como abusivo quando o volume
  // é baixo. A marcação Review foi removida; os depoimentos continuam
  // visíveis na página (componente Testimonials), só sem o schema.org por
  // cima deles.
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  ...BUSINESS_JSONLD_BASE,
  priceRange: "$$",
  description: "Parceira de evolução empresarial: desenho de processos, integração de sistemas, automação com IA e dados para dar controle da operação a quem decide.",
  geo: {
    "@type": "GeoCoordinates",
    latitude: "-7.1193777",
    longitude: "-34.8592312",
  },
};

const speakableJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Consultoria, Software Sob Medida e IA | João Pessoa",
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
        title="Consultoria, Software Sob Medida e IA | João Pessoa"
        description="A VIEW é uma consultoria de processos em João Pessoa: desenha o processo, depois entrega software sob medida e agentes de IA. Atende todo o Brasil."
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
      <SolucoesJoaoPessoa />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppFloat />
      <StickyMobileCTA />
    </>
  );
};

export default Landing;
