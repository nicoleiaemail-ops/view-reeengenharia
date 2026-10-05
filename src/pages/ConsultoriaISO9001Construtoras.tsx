import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { EVENTS, track } from "@/lib/analytics";
import { BUSINESS_JSONLD_BASE, breadcrumbJsonLd, faqPageJsonLd, whatsappUrl } from "@/lib/business";
import { ComoAVIEWTrabalha, CasesSection, FAQSection, LinksRelacionados, CTAFinal, NAPFooterBlock } from "@/components/LandingKit";

/**
 * Única das 4 landings sem "João Pessoa" no H1/title — o briefing pediu
 * explicitamente "construtoras" e "Brasil" no título e na description desta
 * página, em vez do recorte geográfico das outras três.
 */

const PATH = "/consultoria-iso-9001-construtoras";
const TITLE = "Consultoria ISO 9001 para Construtoras | VIEW";
const DESCRIPTION =
  "Consultoria ISO 9001 para construtoras: auditoria sem retrabalho, com sistema que conecta administrativo e obra. Atendemos todo o Brasil.";

const WHATSAPP_URL = whatsappUrl("Olá, eu quero preparar a minha construtora para a auditoria ISO 9001.");

const problemas = [
  {
    titulo: "Documentação de obra espalhada em papel e WhatsApp",
    desc: "Checklist, registro de inspeção e aprovação ficam soltos, sem um lugar único, até alguém precisar reunir tudo às pressas.",
  },
  {
    titulo: "Retrabalho a cada ciclo de auditoria",
    desc: "A equipe para o que está fazendo para montar a documentação da auditoria ISO 9001 do zero, correndo contra o prazo.",
  },
  {
    titulo: "Administrativo sem visibilidade real da obra",
    desc: "A diretoria só sabe o andamento de um canteiro ligando para o encarregado — sem registro de quem fez o quê, quando.",
  },
  {
    titulo: "Sistema de qualidade que existe no papel, não na rotina",
    desc: "O procedimento documentado não é o que de fato acontece na obra, e isso aparece exatamente na hora da auditoria.",
  },
];

const entregas = [
  "Consultoria para preparar a construtora para a auditoria ISO 9001, mapeando o que falta documentar e padronizar.",
  "Sistema próprio que conecta administrativo e obra, com gestão de documentos e checklists em um só lugar.",
  "Registro automático a cada etapa da obra — inspeção, aprovação, marco —, no momento em que acontece, não depois.",
  "Padronização dos procedimentos de qualidade alinhados ao que a obra de fato executa.",
  "Apoio também para quem busca certificação PBQP-H, com a mesma lógica de documentação na origem.",
  "Acompanhamento contínuo entre auditorias, para a certificação não depender de um esforço pontual a cada ciclo.",
];

const diferenciais = [
  "Consultoria de processos e desenvolvimento do sistema de gestão no mesmo time — o procedimento documentado é o mesmo que o sistema registra na prática.",
  "Sistema sob medida para a rotina real da obra, não um sistema de qualidade genérico adaptado à força.",
  "Implantação por etapas, homologada com a equipe de obra e com o administrativo.",
  "Atendimento presencial em João Pessoa (PB) e remoto para construtoras de todo o Brasil.",
];

const faqs = [
  {
    q: "A VIEW substitui o auditor ou o certificador da ISO 9001?",
    a: "Não. A VIEW prepara a construtora para a auditoria — organiza processo, documentação e sistema — mas a certificação em si é emitida por um organismo certificador independente.",
  },
  {
    q: "Quanto custa a consultoria ISO 9001?",
    a: "Depende do tamanho da construtora e de quanto já está documentado, então não dá para cravar um número aqui. Fale com a gente no WhatsApp ou faça o diagnóstico gratuito para ver o que se aplica à sua obra.",
    links: [
      { label: "Mini-diagnóstico DISTIPP gratuito", href: "/avaliacao-maturidade" },
      { label: "Falar no WhatsApp", href: WHATSAPP_URL, external: true },
    ],
  },
  {
    q: "Quanto tempo leva para preparar a construtora para a auditoria?",
    a: "Varia conforme o quanto já existe de processo documentado. A implantação é por etapas, e o prazo exato entra na proposta depois do diagnóstico.",
  },
  {
    q: "Vocês atendem construtoras fora de João Pessoa?",
    a: "Sim. A VIEW atende construtoras de todo o Brasil, presencialmente e remotamente.",
  },
  {
    q: "Precisamos de um sistema novo ou dá para usar o que já temos?",
    a: "Depende do que já existe. Muitas vezes o sistema atual é aproveitado e integrado; quando a rotina de obra não encaixa em nenhum sistema existente, a VIEW desenvolve um sob medida.",
  },
  {
    q: "A consultoria serve também para o PBQP-H?",
    a: "Sim. A lógica é a mesma: documentação e registro organizados na origem, na rotina da obra, em vez de montados às pressas para a avaliação.",
  },
  {
    q: "Como funciona o diagnóstico gratuito?",
    a: "É o Mini-diagnóstico DISTIPP: uma conversa de 30 minutos que mapeia onde a documentação e o processo de qualidade da obra travam hoje. Sem custo e sem compromisso.",
  },
];

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Consultoria de preparação para certificação ISO 9001 em construtoras",
  provider: { "@type": "Organization", ...BUSINESS_JSONLD_BASE },
  areaServed: BUSINESS_JSONLD_BASE.areaServed,
  description:
    "Consultoria ISO 9001 para construtoras em todo o Brasil: preparação para auditoria com processo mapeado e sistema próprio de gestão de documentos e checklists de obra.",
};

export default function ConsultoriaISO9001Construtoras() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEO
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        jsonLd={[breadcrumbJsonLd("Consultoria ISO 9001 para Construtoras", PATH), professionalServiceJsonLd, faqPageJsonLd(faqs)]}
      />
      <Navbar />

      <section className="bg-view-navy text-white px-[7%] pt-28 pb-16 text-center">
        <div className="max-w-[760px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-[.68rem] tracking-[.14em] uppercase font-display font-semibold">
            VIEW · Construção Civil · Brasil
          </div>
          <h1 className="font-display font-extrabold text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.15] mb-5">
            Consultoria ISO 9001 para construtoras
          </h1>
          <p className="text-[.95rem] leading-relaxed text-white/80 max-w-[600px] mx-auto mb-8">
            A VIEW prepara construtoras de todo o Brasil para a auditoria ISO 9001, com sede em João Pessoa
            (PB). O diferencial é desenhar o processo de qualidade da obra primeiro e só depois construir o
            sistema que sustenta a documentação — não um sistema genérico de qualidade por cima do caos.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(EVENTS.whatsappClick, { location: "iso9001-construtoras-hero" })}
            className="inline-flex items-center gap-2 bg-white text-view-navy px-7 py-3.5 rounded-full font-display font-extrabold text-[.86rem] tracking-[.05em] no-underline hover:opacity-90 transition-opacity"
          >
            Fazer diagnóstico gratuito →
          </a>
        </div>
      </section>

      <div className="max-w-[880px] mx-auto px-[6%]">
        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            O problema
          </h2>
          <div className="flex flex-col gap-3">
            {problemas.map((p) => (
              <div key={p.titulo} className="bg-foreground/[.03] border border-foreground/[.07] rounded-lg p-4">
                <div className="font-display font-bold text-[.9rem] text-foreground mb-1">{p.titulo}</div>
                <div className="text-[.85rem] text-muted-foreground leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <ComoAVIEWTrabalha />

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            O que entregamos
          </h2>
          <ul className="flex flex-col gap-3">
            {entregas.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 bg-foreground/[.03] border border-foreground/[.07] rounded-lg p-4 text-[.9rem] text-muted-foreground leading-relaxed"
              >
                <span className="text-primary font-bold flex-shrink-0 mt-0.5" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            Para quem é
          </h2>
          <p className="text-[.92rem] text-muted-foreground leading-relaxed">
            Construtoras em crescimento de todo o Brasil que precisam manter ou conquistar a certificação
            ISO 9001 (ou PBQP-H) sem que cada auditoria vire uma corrida contra o tempo.
          </p>
        </section>

        <CasesSection
          cases={[
            { id: "construtora-iso-9001", tag: "Construção Civil", headline: "ISO 9001 mantido sem retrabalho — registros automáticos em cada etapa da obra" },
            { id: "construtora-gestao-obra", tag: "Construção Civil", headline: "Gestão completa de obra pelo celular — visibilidade total sem uma única ligação" },
          ]}
        />

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            Diferenciais
          </h2>
          <ul className="flex flex-col gap-3">
            {diferenciais.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[.9rem] text-muted-foreground leading-relaxed">
                <span className="text-view-green font-bold flex-shrink-0 mt-0.5" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <FAQSection faqs={faqs} />
        <LinksRelacionados exceto={PATH} />
        <CTAFinal whatsappUrl={WHATSAPP_URL} location="iso9001-construtoras-rodape" />
        <NAPFooterBlock />
      </div>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
