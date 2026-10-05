import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { EVENTS, track } from "@/lib/analytics";
import { BUSINESS_JSONLD_BASE, breadcrumbJsonLd, faqPageJsonLd, whatsappUrl } from "@/lib/business";
import { ComoAVIEWTrabalha, CasesSection, FAQSection, LinksRelacionados, CTAFinal, NAPFooterBlock } from "@/components/LandingKit";

const PATH = "/automacao-de-processos-joao-pessoa";
const TITLE = "Automação de Processos com IA em João Pessoa | VIEW";
const DESCRIPTION =
  "Automação de processos em João Pessoa, com e sem IA: primeiro o processo desenhado, depois a automação certa para cada etapa.";

const WHATSAPP_URL = whatsappUrl("Olá, eu quero automatizar um processo da minha empresa.");

const problemas = [
  {
    titulo: "Tarefa repetitiva tomando o tempo de gente boa",
    desc: "Copiar dado de um sistema para outro, montar relatório toda semana, conferir planilha manualmente — trabalho que uma máquina faz melhor e sem erro.",
  },
  {
    titulo: "Processo manual que não escala",
    desc: "Funciona com o volume de hoje. Quando a empresa cresce, a mesma rotina manual vira gargalo e exige contratar mais gente só para sustentar o que já existe.",
  },
  {
    titulo: "IA aplicada sem processo por trás",
    desc: "A empresa comprou uma ferramenta de IA achando que ela resolveria sozinha, sem redesenhar o processo primeiro — e o resultado não apareceu.",
  },
  {
    titulo: "Retrabalho que se repete todo mês",
    desc: "O mesmo erro acontece sempre no mesmo ponto do processo, e a correção é sempre manual, porque ninguém parou para redesenhar aquela etapa.",
  },
];

const entregas = [
  "Mapeamento do processo atual, para identificar o que pode ser eliminado antes de automatizar.",
  "Automação tradicional (sem IA) para tarefas de regra fixa: preenchimento de sistema, geração de relatório, conferência de dados, alertas.",
  "Agentes e assistentes de IA para as etapas que exigem interpretar texto, decidir entre opções ou lidar com variação — só onde a automação tradicional não é suficiente.",
  "Integração entre os sistemas que já existem: Excel ou Google Sheets, ERP, CRM, e-mail, WhatsApp.",
  "Alertas automáticos para quando algo sair do esperado, em vez de alguém descobrir o problema dias depois.",
  "Medição do resultado: horas devolvidas à equipe, erro reduzido, tempo de ciclo menor.",
];

const diferenciais = [
  "A automação entra depois do processo mapeado, nunca antes — é o que evita acelerar um erro em vez de resolvê-lo.",
  "Consultoria de processos e implementação técnica no mesmo time.",
  "Automação tradicional sempre que ela resolver: IA só entra onde é realmente necessária, nunca por moda.",
  "Atendimento presencial em João Pessoa (PB) e remoto para todo o Brasil.",
];

const faqs = [
  {
    q: "Automação de processos e reengenharia de processos são a mesma coisa?",
    a: "Não. A reengenharia redesenha o processo em si — o que é feito, por quem, em que ordem. A automação entra depois, para que a parte repetitiva do processo já redesenhado rode sozinha.",
  },
  {
    q: "Preciso de IA ou uma automação tradicional resolve?",
    a: "Na maioria dos casos, uma automação tradicional resolve com menos custo e menos risco. A IA entra quando a tarefa exige interpretar algo que varia — um texto, uma imagem, uma decisão com múltiplos critérios.",
  },
  {
    q: "Quanto custa automatizar um processo?",
    a: "Depende de quantas etapas e sistemas estão envolvidos, então não dá para cravar um número aqui. Fale com a gente no WhatsApp ou faça o diagnóstico gratuito para descobrir o que se aplica à sua operação.",
    links: [
      { label: "Mini-diagnóstico DISTIPP gratuito", href: "/avaliacao-maturidade" },
      { label: "Falar no WhatsApp", href: WHATSAPP_URL, external: true },
    ],
  },
  {
    q: "Quanto tempo leva para ver resultado?",
    a: "A implantação é por etapas, então os primeiros ganhos costumam aparecer antes do projeto inteiro terminar. O prazo exato depende do que for mapeado no diagnóstico.",
  },
  {
    q: "Vocês atendem empresas fora de João Pessoa?",
    a: "Sim. A VIEW é de João Pessoa (PB) e atende empresas de todo o Brasil, presencialmente e remotamente.",
  },
  {
    q: "Dá para automatizar sem trocar os sistemas que já uso?",
    a: "Na maior parte dos casos, sim. A automação costuma integrar os sistemas existentes em vez de substituí-los — a troca de sistema é uma frente separada, quando for realmente necessária.",
  },
  {
    q: "Como funciona o diagnóstico gratuito?",
    a: "É o Mini-diagnóstico DISTIPP: uma conversa de 30 minutos que mapeia onde o processo trava, antes de qualquer proposta de automação. Sem custo e sem compromisso.",
  },
];

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Automação de processos empresariais, com e sem inteligência artificial",
  provider: { "@type": "Organization", ...BUSINESS_JSONLD_BASE },
  areaServed: BUSINESS_JSONLD_BASE.areaServed,
  description:
    "Automação de processos em João Pessoa: processo mapeado primeiro, depois automação tradicional ou IA aplicada apenas onde for necessária.",
};

export default function AutomacaoProcessosJoaoPessoa() {
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
        jsonLd={[breadcrumbJsonLd("Automação de Processos com IA em João Pessoa", PATH), professionalServiceJsonLd, faqPageJsonLd(faqs)]}
      />
      <Navbar />

      <section className="bg-view-navy text-white px-[7%] pt-28 pb-16 text-center">
        <div className="max-w-[760px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-[.68rem] tracking-[.14em] uppercase font-display font-semibold">
            VIEW · João Pessoa · PB
          </div>
          <h1 className="font-display font-extrabold text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.15] mb-5">
            Automação de processos com IA em João Pessoa
          </h1>
          <p className="text-[.95rem] leading-relaxed text-white/80 max-w-[600px] mx-auto mb-8">
            A VIEW é uma empresa de João Pessoa que automatiza processos de empresas de todo o Brasil — com
            e sem inteligência artificial. A ordem é sempre a mesma: o processo é mapeado e simplificado
            antes de qualquer automação ou IA entrar.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(EVENTS.whatsappClick, { location: "automacao-processos-hero" })}
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
            Empresas em crescimento de João Pessoa e de todo o Brasil com processos manuais que não escalam:
            construtoras, indústrias, distribuidoras e serviços com equipe gastando tempo em tarefa
            repetitiva em vez de decisão.
          </p>
        </section>

        <CasesSection
          cases={[
            { id: "construtora-iso-9001", tag: "Construção Civil", headline: "ISO 9001 mantido sem retrabalho — registros automáticos em cada etapa da obra" },
            { id: "construtora-gestao-obra", tag: "Construção Civil", headline: "Gestão completa de obra pelo celular — visibilidade total sem uma única ligação" },
            { id: "restaurante-operacao-cozinha", tag: "Alimentação", headline: "Caos na cozinha eliminado — atendimento mais rápido e custos reduzidos" },
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
        <CTAFinal whatsappUrl={WHATSAPP_URL} location="automacao-processos-rodape" />
        <NAPFooterBlock />
      </div>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
