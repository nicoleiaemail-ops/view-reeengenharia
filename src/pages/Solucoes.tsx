import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

/*
  As cinco frentes, na ordem em que os problemas aparecem na empresa. Antes
  eram cinco areas tecnicas e a pagina abria por IA, que e a ultima etapa do
  metodo. "Consultoria Estrategica" deixou de existir: o que ela entregava
  virou o VIEW 360.

  Cada frente perdeu o par problema/solucao que tinha. Nao foi corte
  editorial: os textos antigos estavam colados nos agrupamentos antigos, e no
  reagrupamento dois deles cairiam na mesma frente (FLOW) enquanto o INSIGHTS
  ficaria sem nenhum. Manter exigiria escrever texto novo, que nao esta
  aprovado. Ficou a descricao de cada frente, que esta.

  Nenhum servico foi removido: os 18 que existiam continuam aqui, com as
  descricoes que ja tinham.
*/
const solucoes = [
  {
    id: "view-360",
    icon: "🎯",
    tag: "VIEW 360",
    sub: "Diagnóstico da operação",
    desc: "Antes de comprar qualquer ferramenta, você descobre onde o processo trava, quanto isso custa por mês e em que ordem resolver.",
    services: [
      { name: "Análise de maturidade digital", desc: "Diagnóstico de onde seus dados estão, como são usados e o que falta para você tomar decisões melhores." },
      { name: "Auditoria de processo", desc: "Análise completa de onde a operação perde tempo e dinheiro sem que você perceba." },
      { name: "Arquitetura empresarial", desc: "Redesign estrutural da empresa: departamentos, responsabilidades e fluxos alinhados." },
      { name: "Desenvolvimento de governança", desc: "Estrutura de decisão clara — quem decide o quê, com base em quê." },
      { name: "Planejamento estratégico", desc: "Definição clara de onde o negócio vai, por qual caminho e com quais recursos." },
      { name: "Viabilidade de negócio", desc: "Análise antes de investir: o projeto tem retorno real ou é uma aposta?" },
      { name: "Finanças corporativas", desc: "Visão clara de margem, custo, fluxo de caixa e saúde financeira do negócio." },
      { name: "Construção de agentes próprios", desc: "Sua equipe sai capaz de criar e ajustar agentes sem depender de fornecedor externo." },
      { name: "Adoção de IA no dia a dia", desc: "Implementação guiada: ferramentas certas, para o time certo, no momento certo." },
    ],
    color: "primary",
    borderColor: "border-primary/25",
    bgColor: "bg-primary/[.06]",
    tagColor: "text-primary",
    accentColor: "text-primary",
  },
  {
    id: "view-flow",
    icon: "🔁",
    tag: "VIEW FLOW",
    sub: "Processos e automação",
    desc: "O processo sai da cabeça das pessoas e vira fluxo escrito. Depois disso, a parte repetitiva passa a rodar sozinha.",
    services: [
      { name: "Padronização de processos", desc: "Cada processo documentado e replicável — sem depender da memória de ninguém." },
      { name: "Automações de fluxos", desc: "Tarefas manuais e repetitivas eliminadas, depois do processo desenhado." },
      { name: "Agentes de IA", desc: "Sistemas autônomos que executam tarefas complexas sem intervenção humana constante." },
      { name: "Chatbot com IA", desc: "Atendimento automatizado que responde, filtra e qualifica sem depender da equipe." },
      { name: "Consultoria em IA", desc: "Identificamos onde a IA gera mais retorno no seu negócio específico." },
    ],
    color: "accent",
    borderColor: "border-accent/25",
    bgColor: "bg-accent/[.06]",
    tagColor: "text-accent",
    accentColor: "text-accent",
  },
  {
    id: "view-one",
    icon: "💻",
    tag: "VIEW ONE",
    sub: "Sistemas e integração",
    desc: "Os sistemas que você já paga passam a conversar entre si. Conforme os fornecedores saem, o custo deles vira investimento na sua operação.",
    services: [
      { name: "Sistemas personalizados", desc: "Software construído em cima do fluxo que a sua empresa já executa." },
      // Servico que a especificacao lista e que nao existia na pagina. O nome
      // veio aprovado; a descricao nao, e escrever uma seria inventar.
      { name: "Integração e centralização de sistemas" },
    ],
    color: "view-green",
    borderColor: "border-view-green/25",
    bgColor: "bg-view-green/[.06]",
    tagColor: "text-view-green",
    accentColor: "text-view-green",
  },
  {
    id: "view-insights",
    icon: "📈",
    tag: "VIEW INSIGHTS",
    sub: "Dados e decisão",
    desc: "Indicador que muda a decisão de segunda-feira. Se ninguém abre o relatório, ele não conta como informação.",
    services: [
      { name: "Dashboards e BI", desc: "Indicadores do seu negócio visíveis em tempo real, de qualquer lugar, no celular." },
    ],
    color: "primary",
    borderColor: "border-primary/25",
    bgColor: "bg-primary/[.06]",
    tagColor: "text-primary",
    accentColor: "text-primary",
  },
  {
    id: "view-academy",
    icon: "🎓",
    tag: "VIEW ACADEMY",
    sub: "Capacitação",
    desc: "Sua equipe aprende a operar e a decidir sem depender de fornecedor para cada ajuste.",
    services: [
      { name: "Treinamento de equipes", desc: "Sua equipe aprende a trabalhar com IA no dia a dia, sem depender de terceiros." },
      { name: "Treinamento de IA", desc: "Capacitação prática: sua equipe aprende a usar IA nas tarefas do dia a dia." },
    ],
    color: "view-green",
    borderColor: "border-view-green/25",
    bgColor: "bg-view-green/[.06]",
    tagColor: "text-view-green",
    accentColor: "text-view-green",
  },
];


const solucoesFaqs = [
  {
    q: "A VIEW constrói aplicativos para celular?",
    a: "Sim. A VIEW desenvolve sistemas sob medida disponíveis para iOS, Android e Desktop — não softwares genéricos, mas ferramentas construídas para o fluxo específico da sua operação.",
  },
  {
    q: "Preciso ter conhecimento em tecnologia para contratar a VIEW?",
    a: "Não. A VIEW cuida de toda a parte técnica: mapeamento, automação, sistema e implementação. Você só precisa conhecer o seu negócio — a equipe VIEW traduz isso em tecnologia.",
  },
  {
    q: "Qual é a diferença entre automação e reengenharia de processos?",
    a: "Reengenharia redesenha como o processo funciona — elimina etapas desnecessárias, padroniza fluxos e define responsabilidades. Automação executa processos já bem definidos sem intervenção humana. A VIEW sempre faz reengenharia antes de automatizar: não automatizamos o caos.",
  },
  {
    q: "A VIEW atende empresas de qualquer segmento?",
    a: "Sim. Já atendemos construção civil, alimentação, indústria, serviços, varejo e logística. Atendemos presencialmente em PB, PE e RN, e remotamente em todo o Brasil.",
  },
  {
    q: "Quanto tempo leva para ver resultados depois de contratar a VIEW?",
    a: "O diagnóstico gratuito é concluído em até 48 horas. Projetos de automação e sistema sob medida costumam ter primeiros resultados visíveis entre 3 e 6 meses após o início da implementação.",
  },
];

const providerRef = {
  "@type": "Organization",
  name: "VIEW Reengenharia de Processos",
  url: "https://reengenhariaview.com.br",
  telephone: "+55-83-99322-4878",
  email: "admin@reengenhariaview.com.br",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://reengenhariaview.com.br/" },
      { "@type": "ListItem", position: 2, name: "Soluções", item: "https://reengenhariaview.com.br/solucoes" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Soluções VIEW — Serviços de transformação operacional",
    itemListElement: solucoes.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.tag,
      url: `https://reengenhariaview.com.br/solucoes#${s.id}`,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "VIEW 360",
    serviceType: "Diagnóstico da operação",
    provider: providerRef,
    description: "Antes de comprar qualquer ferramenta, você descobre onde o processo trava, quanto isso custa por mês e em que ordem resolver.",
    areaServed: { "@type": "Country", name: "Brasil" },
    url: "https://reengenhariaview.com.br/solucoes#view-360",
    offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceSpecification: { "@type": "PriceSpecification", priceCurrency: "BRL" } },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "VIEW FLOW",
    serviceType: "Processos e automação",
    provider: providerRef,
    description: "O processo sai da cabeça das pessoas e vira fluxo escrito. Depois disso, a parte repetitiva passa a rodar sozinha.",
    areaServed: { "@type": "Country", name: "Brasil" },
    url: "https://reengenhariaview.com.br/solucoes#view-flow",
    offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceSpecification: { "@type": "PriceSpecification", priceCurrency: "BRL" } },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "VIEW ONE",
    serviceType: "Sistemas e integração",
    provider: providerRef,
    description: "Os sistemas que você já paga passam a conversar entre si. Conforme os fornecedores saem, o custo deles vira investimento na sua operação.",
    areaServed: { "@type": "Country", name: "Brasil" },
    url: "https://reengenhariaview.com.br/solucoes#view-one",
    offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceSpecification: { "@type": "PriceSpecification", priceCurrency: "BRL" } },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "VIEW INSIGHTS",
    serviceType: "Dados e decisão",
    provider: providerRef,
    description: "Indicador que muda a decisão de segunda-feira. Se ninguém abre o relatório, ele não conta como informação.",
    areaServed: { "@type": "Country", name: "Brasil" },
    url: "https://reengenhariaview.com.br/solucoes#view-insights",
    offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceSpecification: { "@type": "PriceSpecification", priceCurrency: "BRL" } },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: solucoesFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "VIEW ACADEMY",
    serviceType: "Capacitação",
    provider: providerRef,
    description: "Sua equipe aprende a operar e a decidir sem depender de fornecedor para cada ajuste.",
    areaServed: { "@type": "Country", name: "Brasil" },
    url: "https://reengenhariaview.com.br/solucoes#view-academy",
    offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceSpecification: { "@type": "PriceSpecification", priceCurrency: "BRL" } },
  },
];

export default function Solucoes() {
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
        title="Soluções VIEW — Automação, Reengenharia de Processos e IA para PMEs"
        description="Reengenharia de processos, automação com IA, sistemas sob medida e dashboards em tempo real para pequenas e médias empresas. Atendemos PB, PE, RN e todo o Brasil."
        path="/solucoes"
        jsonLd={jsonLd}
      />
      <Navbar />

      {/* Hero */}
      <section className="min-h-[55vh] flex flex-col items-center justify-center px-[7%] pt-28 pb-16 text-center">
        <div className="text-[.65rem] tracking-[.22em] uppercase text-muted-foreground mb-4">O que a VIEW faz</div>
        <h1 className="font-display font-extrabold text-[clamp(1.9rem,3.5vw,3rem)] leading-[1.1] mb-5 max-w-[820px]">
          Sua empresa está deixando dinheiro na mesa.<br />
          <em className="not-italic text-primary">A VIEW encontra onde — e resolve.</em>
        </h1>
        <p className="text-[.95rem] text-muted-foreground leading-relaxed max-w-[580px]">
          Não importa o setor. Se sua equipe trabalha muito e o resultado não aparece, há um processo ineficiente, um dado que não existe ou uma tarefa que deveria ser automática. A VIEW cuida de tudo isso.
        </p>
      </section>

      {/* Soluções */}
      <section className="px-[7%] pb-24 space-y-16">
        {solucoes.map((s, idx) => (
          <div
            key={s.id}
            id={s.id}
            className={`scroll-reveal grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start ${idx % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
          >
            {/* Text side */}
            <div className={idx % 2 === 1 ? "lg:col-start-2" : ""}>
              <div className={`inline-flex items-center gap-2 text-[.6rem] tracking-[.2em] uppercase font-bold ${s.tagColor} border border-current/20 rounded-full px-4 py-1.5 mb-4 opacity-80`}>
                <span>{s.icon}</span> {s.tag}
              </div>
              <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.15] mb-4">
                {s.sub}
              </h2>
              <p className="text-[.9rem] text-foreground leading-relaxed">{s.desc}</p>

              <div className="mt-8 flex gap-3 flex-wrap">
                <a
                  href="/#diagnostico"
                  className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-md font-display font-extrabold text-[.82rem] tracking-[.07em] no-underline hover:opacity-85 transition-opacity"
                >
                  Quero este serviço →
                </a>
              </div>
            </div>

            {/* Services card side */}
            <div className={`${s.bgColor} border ${s.borderColor} rounded-xl p-6 flex flex-col gap-3 ${idx % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
              <div className="text-[.6rem] tracking-[.18em] uppercase text-muted-foreground mb-1">O que inclui</div>
              {s.services.map((srv) => (
                <div key={srv.name} className="bg-background/60 border border-foreground/[.06] rounded-lg p-4">
                  <div className={`font-display font-bold text-[.88rem] mb-1 ${s.accentColor}`}>{srv.name}</div>
                  {srv.desc && <div className="text-[.79rem] text-muted-foreground leading-relaxed">{srv.desc}</div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section className="px-[7%] py-20 border-t border-view-line">
        <div className="max-w-[800px] mx-auto">
          <div className="scroll-reveal text-center mb-12">
            <div className="text-[.65rem] tracking-[.22em] uppercase text-muted-foreground mb-4">Dúvidas frequentes</div>
            <h2 className="font-display font-extrabold text-[clamp(1.6rem,2.5vw,2.1rem)] leading-[1.1]">
              Perguntas sobre os serviços
            </h2>
          </div>
          <div className="flex flex-col divide-y divide-view-line">
            {solucoesFaqs.map((faq, i) => (
              <details key={i} className="scroll-reveal group py-5" style={{ transitionDelay: `${i * 0.08}s` }}>
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-display font-bold text-[.93rem] text-foreground hover:text-primary transition-colors">
                  {faq.q}
                  <span className="text-primary/60 text-[1.1rem] flex-shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <p className="mt-3 text-[.85rem] text-muted-foreground leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-[7%] border-t border-view-line bg-secondary text-center">
        <h2 className="scroll-reveal font-display font-extrabold text-[clamp(1.6rem,2.8vw,2.2rem)] mb-4">
          Não sabe por onde começar?
        </h2>
        <p className="scroll-reveal text-[.93rem] text-muted-foreground max-w-[500px] mx-auto mb-8 leading-relaxed" style={{ transitionDelay: ".1s" }}>
          Faça o diagnóstico gratuito. Em 48h você sabe exatamente onde sua operação está perdendo dinheiro — e qual solução faz mais sentido para o seu momento.
        </p>
        <div className="scroll-reveal flex gap-4 justify-center flex-wrap" style={{ transitionDelay: ".2s" }}>
          <a
            href="/#diagnostico"
            className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-sm font-display font-extrabold text-[.86rem] tracking-[.07em] no-underline hover:opacity-85 transition-opacity"
          >
            👁️ Diagnóstico gratuito — 48h
          </a>
          <Link
            to="/avaliacao-maturidade"
            className="text-foreground border border-view-line px-8 py-4 rounded-sm font-display font-bold text-[.86rem] tracking-[.07em] no-underline hover:border-foreground/35 transition-colors"
          >
            Avaliação de maturidade →
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
