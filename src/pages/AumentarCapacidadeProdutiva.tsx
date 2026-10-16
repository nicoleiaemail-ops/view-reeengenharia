import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { EVENTS, track } from "@/lib/analytics";
import { BUSINESS_JSONLD_BASE, breadcrumbJsonLd, faqPageJsonLd, whatsappUrl } from "@/lib/business";
import { FAQSection, LinksRelacionados, NAPFooterBlock, NumerosSection } from "@/components/LandingKit";

/**
 * Complementa /engenharia-de-producao-agroindustria-paraiba: aquela página
 * fala do serviço de engenharia de produção em geral; esta foca na pergunta
 * específica "dá para produzir mais sem comprar máquina" e na simulação de
 * cenários como ferramenta de decisão. Por isso as duas se linkam uma à
 * outra (ver "Serviço relacionado" abaixo e LinksRelacionados).
 */

const PATH = "/aumentar-capacidade-produtiva";
const TITLE = "Aumentar a Produção sem Comprar Máquinas | VIEW";
const DESCRIPTION =
  "Sua fábrica pode produzir mais com o que já tem. Engenharia de produção com simulação de cenários em João Pessoa, Campina Grande, Paraíba e todo o Brasil.";

const WHATSAPP_URL = whatsappUrl("Olá! Quero saber quanto minha fábrica pode produzir a mais.");

const ondeEsconde = [
  {
    titulo: "Transporte interno desnecessário",
    desc: "Produto, insumo ou operador percorrendo mais distância do que o processo exigiria, se o layout acompanhasse o fluxo real.",
  },
  {
    titulo: "Estoque parado entre etapas (WIP)",
    desc: "Material em processamento se acumula esperando a próxima etapa, escondendo quanto tempo a produção realmente perde ali.",
  },
  {
    titulo: "Postos desbalanceados",
    desc: "Um posto sobrecarregado, outro esperando — a capacidade da linha inteira fica presa no ritmo do posto mais lento.",
  },
  {
    titulo: "Setup e troca de produto demorados",
    desc: "Cada troca de produto ou de ferramenta consome tempo de produção que nunca é contado como perda, mas é.",
  },
  {
    titulo: "Sequência de produção mal planejada",
    desc: "A ordem em que os produtos são feitos influencia quantas trocas de setup acontecem no dia — e isso raramente é calculado.",
  },
  {
    titulo: "Fadiga e postura ruim no fim do turno",
    desc: "O ritmo cai nas últimas horas do turno não por desânimo, mas porque o posto de trabalho exige um esforço que o corpo não sustenta por tanto tempo.",
  },
];

const comoTrabalhamos = [
  { titulo: "Medir", desc: "Tempos, fluxo, capacidade por posto e o gargalo real — não o gargalo que todo mundo acha que é." },
  { titulo: "Modelar", desc: "Representar o processo como ele é hoje: capacidade, balanceamento e fluxo de cada etapa." },
  { titulo: "Simular cenários", desc: "Testar layouts, sequências e turnos diferentes antes de mexer em qualquer coisa na fábrica de verdade." },
  { titulo: "Escolher com números", desc: "Comparar as alternativas simuladas e escolher a de maior ganho pelo menor investimento." },
  { titulo: "Implantar e medir de novo", desc: "Comparar o resultado real contra o estimado, para o próximo ciclo partir de dado, não de suposição." },
];

const escada = [
  { titulo: "Organizar", desc: "Fluxo, layout, ergonomia e POPs — a base sem a qual nenhuma medição ou simulação futura é confiável." },
  { titulo: "Medir", desc: "Indicadores de produção (VIEW INSIGHTS) — o que acontece na fábrica passa a ter número, não impressão." },
  { titulo: "Simular e otimizar", desc: "Cenários de capacidade, layout e programação, testados antes de qualquer investimento real." },
  { titulo: "Automatizar e usar IA", desc: "Controle da produção, alertas e agentes de IA — depois que organizar, medir e simular já sustentam a decisão." },
];

const paraQuem = [
  "Polpas de frutas",
  "Laticínios",
  "Engenhos e destilarias",
  "Usinas",
  "Frigoríficos",
  "Rações",
  "Fábricas em geral",
];

const diagnosticoEntrega = [
  "Um dia na unidade, observando o processo real.",
  "Mapa do fluxo produtivo, do recebimento à expedição.",
  "O gargalo identificado — o real, não o mais visível.",
  "As 5 melhorias prioritárias, em ordem de impacto.",
  "Ganho de capacidade estimado por cenário simulado.",
  "Próximos passos, para decidir com clareza o que fazer primeiro.",
];

const faqs = [
  {
    q: "Precisa parar a produção para fazer o diagnóstico?",
    a: "Não. O diagnóstico é feito observando a produção em andamento, sem interromper o que já está rodando.",
  },
  {
    q: "Quanto dá para ganhar sem comprar máquinas?",
    a: "Depende do processo de cada fábrica — não existe um número único que sirva para todas. O diagnóstico estima o ganho por cenário simulado, a partir dos dados reais da sua produção.",
  },
  {
    q: "O que é simulação de cenários e por que ela evita investimento errado?",
    a: "É testar, num modelo do processo, o efeito de mudar layout, sequência ou turno antes de mexer na fábrica de verdade. Isso evita comprar máquina ou ampliar galpão para resolver um gargalo que, na simulação, se mostra estar em outro lugar.",
  },
  {
    q: "Vocês atendem fábricas pequenas?",
    a: "Sim. O método — medir, modelar, simular, escolher com números — vale para qualquer porte; o escopo do projeto é dimensionado conforme o tamanho da operação.",
  },
  {
    q: "Atendem Campina Grande, o interior e outros estados?",
    a: "Sim. Atendemos João Pessoa e Região Metropolitana, Campina Grande e o Agreste, e também o Brejo, o Sertão e o restante do interior da Paraíba, com visitas presenciais programadas. Fora da Paraíba, atendemos projetos em todo o Brasil, com presença nas etapas-chave e acompanhamento remoto.",
  },
  {
    q: "Quanto custa?",
    a: "Depende do porte da fábrica e do escopo do diagnóstico, então não dá para cravar um valor aqui. Fale com a gente no WhatsApp para receber uma proposta.",
    links: [{ label: "Falar no WhatsApp", href: WHATSAPP_URL, external: true }],
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Aumento de capacidade produtiva / Engenharia de produção",
  provider: { "@type": "Organization", ...BUSINESS_JSONLD_BASE },
  areaServed: BUSINESS_JSONLD_BASE.areaServed,
  description:
    "Engenharia de produção com simulação de cenários para aumentar a capacidade produtiva sem comprar máquinas: medição, modelagem, simulação de layout e sequência, em João Pessoa, Campina Grande, na Paraíba e no Brasil.",
};

export default function AumentarCapacidadeProdutiva() {
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
        jsonLd={[
          breadcrumbJsonLd("Aumentar a Produção sem Comprar Máquinas", PATH),
          serviceJsonLd,
          faqPageJsonLd(faqs),
        ]}
      />
      <Navbar />

      <section className="bg-view-navy text-white px-[7%] pt-28 pb-16 text-center">
        <div className="max-w-[780px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-[.68rem] tracking-[.14em] uppercase font-display font-semibold">
            VIEW · Engenharia de Produção · Paraíba e Brasil
          </div>
          <h1 className="font-display font-extrabold text-[clamp(1.8rem,3.4vw,2.7rem)] leading-[1.15] mb-5">
            Sua fábrica pode produzir mais com o que já tem
          </h1>
          <p className="text-[.95rem] leading-relaxed text-white/80 max-w-[620px] mx-auto mb-8">
            Mesmo fábricas bem montadas escondem capacidade. Antes de comprar máquinas ou ampliar o galpão, a
            VIEW encontra o gargalo, testa alternativas e mostra, com números, quanto dá para ganhar.
            Atendemos João Pessoa, Campina Grande, toda a Paraíba e o Brasil.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(EVENTS.whatsappClick, { location: "capacidade-produtiva-hero" })}
            className="inline-flex items-center gap-2 bg-white text-view-navy px-7 py-3.5 rounded-full font-display font-extrabold text-[.86rem] tracking-[.05em] no-underline hover:opacity-90 transition-opacity"
          >
            Agendar Diagnóstico de Produtividade →
          </a>
        </div>
      </section>

      <div className="max-w-[880px] mx-auto px-[6%]">
        <NumerosSection
          numero1={{ valor: "20+", label: "Processos automatizados desde 2024" }}
          numero2={{ valor: "+50%", label: "Ganho de produtividade no processo automatizado" }}
        />

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            Onde a capacidade se esconde
          </h2>
          <div className="flex flex-col gap-3">
            {ondeEsconde.map((o) => (
              <div key={o.titulo} className="bg-foreground/[.03] border border-foreground/[.07] rounded-lg p-4">
                <div className="font-display font-bold text-[.9rem] text-foreground mb-1">{o.titulo}</div>
                <div className="text-[.85rem] text-muted-foreground leading-relaxed">{o.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            Como trabalhamos: engenharia com método
          </h2>
          <ol className="flex flex-col gap-5">
            {comoTrabalhamos.map((p, i) => (
              <li key={p.titulo} className="flex gap-4">
                <span className="font-display font-extrabold text-primary text-lg leading-none pt-0.5 w-6 flex-shrink-0">
                  {i + 1}
                </span>
                <div>
                  <div className="font-display font-bold text-foreground text-[.92rem] mb-1">{p.titulo}</div>
                  <div className="text-muted-foreground text-[.85rem] leading-relaxed">{p.desc}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-4">
            Escada de maturidade
          </h2>
          <p className="text-[.9rem] text-muted-foreground leading-relaxed mb-6">
            Cada fábrica está em um degrau. A VIEW começa de onde você está.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {escada.map((e, i) => (
              <div key={e.titulo} className="relative">
                <div className="bg-foreground/[.03] border border-foreground/[.08] rounded-lg p-4 h-full">
                  <div className="font-display font-extrabold text-primary text-[.7rem] tracking-[.12em] uppercase mb-2">
                    Degrau {i + 1}
                  </div>
                  <div className="font-display font-bold text-foreground text-[.92rem] mb-1.5">{e.titulo}</div>
                  <div className="text-[.82rem] text-muted-foreground leading-relaxed">{e.desc}</div>
                </div>
                {i < escada.length - 1 && (
                  <ArrowRight
                    className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 w-4 h-4 text-primary/50"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            Para quem
          </h2>
          <p className="text-[.9rem] text-muted-foreground leading-relaxed mb-4">
            Agroindústrias e fábricas em geral, de todos os portes, entre elas:
          </p>
          <div className="flex flex-wrap gap-2">
            {paraQuem.map((p) => (
              <span
                key={p}
                className="text-[.78rem] font-display font-semibold text-foreground bg-foreground/[.04] border border-foreground/[.08] rounded-full px-4 py-1.5"
              >
                {p}
              </span>
            ))}
          </div>
        </section>

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            O que você recebe no Diagnóstico de Produtividade
          </h2>
          <ul className="flex flex-col gap-3">
            {diagnosticoEntrega.map((item, i) => (
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

        {/*
          TODO: primeiro case de agroindústria (antes/depois de capacidade,
          investimento e prazo). Nenhum número foi inventado -- quando o
          primeiro projeto for concluído e autorizado pelo cliente, substituir
          esta seção pelo card real, no mesmo padrão de src/content/casos.ts.
        */}
        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            Resultados
          </h2>
          <div className="bg-foreground/[.03] border border-foreground/[.07] rounded-lg p-5 text-[.9rem] text-muted-foreground leading-relaxed">
            <div className="text-[.65rem] tracking-[.15em] uppercase text-primary font-bold mb-2">
              Cases em andamento
            </div>
            Este é um serviço novo da VIEW, com os primeiros projetos de aumento de capacidade em andamento.
            Assim que o primeiro case de agroindústria for concluído e autorizado pelo cliente, o resultado
            completo — capacidade antes e depois, investimento e prazo — aparece aqui.
          </div>
        </section>

        <section className="py-10 border-t border-view-line">
          <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.15] mb-6">
            Serviço relacionado
          </h2>
          <Link
            to="/engenharia-de-producao-agroindustria-paraiba"
            className="block bg-foreground/[.03] border border-foreground/[.08] rounded-lg p-5 no-underline hover:border-primary/30 hover:bg-primary/[.03] transition-all"
          >
            <div className="text-[.65rem] tracking-[.15em] uppercase text-primary font-bold mb-2">
              Engenharia de produção
            </div>
            <div className="text-[.92rem] text-foreground font-medium leading-snug">
              Engenharia de produção para agroindústria na Paraíba — fluxo, layout, ergonomia e padronização →
            </div>
          </Link>
        </section>

        <FAQSection faqs={faqs} />
        <LinksRelacionados exceto={PATH} />

        <section className="py-12 border-t border-view-line text-center">
          <h2 className="font-display font-extrabold text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.2] mb-3">
            Quanto a sua fábrica pode produzir sem comprar máquina?
          </h2>
          <p className="text-[.9rem] text-muted-foreground leading-relaxed max-w-[520px] mx-auto mb-7">
            O Diagnóstico de Produtividade mede o fluxo real, simula cenários e mostra o ganho estimado antes
            de qualquer investimento.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cta-location="capacidade-produtiva-rodape"
            onClick={() => track(EVENTS.whatsappClick, { location: "capacidade-produtiva-rodape" })}
            className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3.5 rounded-full font-display font-extrabold text-[.86rem] tracking-[.05em] no-underline hover:opacity-88 transition-opacity"
          >
            Agendar Diagnóstico de Produtividade →
          </a>
        </section>

        <NAPFooterBlock />
      </div>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
