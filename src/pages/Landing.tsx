import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
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
  url: "https://view-reeengenharia.com/",
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
        jsonLd={[websiteJsonLd, faqJsonLd]}
      />
      <Navbar />
      <Hero />
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
