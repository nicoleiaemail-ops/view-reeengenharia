import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const solucoes = [
  {
    id: "ia-automacao",
    icon: "🤖",
    tag: "IA & Automação",
    headline: "Sua equipe parou de fazer o que só humano pode fazer?",
    problem:
      "Se sua equipe passa horas fazendo tarefas repetitivas — copiar dados, responder sempre as mesmas perguntas, preencher planilhas — você está pagando um ser humano para fazer o que uma máquina faria melhor, mais rápido e sem erro.",
    solution:
      "A VIEW constrói agentes de IA e automações que assumem essas tarefas. Sua equipe para de ser operacional e começa a ser estratégica.",
    services: [
      { name: "Agentes de IA", desc: "Sistemas autônomos que executam tarefas complexas sem intervenção humana constante." },
      { name: "Chatbot com IA", desc: "Atendimento automatizado que responde, filtra e qualifica sem depender da equipe." },
      { name: "Automações de fluxos", desc: "Tarefas manuais e repetitivas eliminadas — o processo roda sozinho." },
      { name: "Consultoria em IA", desc: "Identificamos onde a IA gera mais retorno no seu negócio específico." },
      { name: "Treinamento de equipes", desc: "Sua equipe aprende a trabalhar com IA no dia a dia, sem depender de terceiros." },
    ],
    color: "primary",
    borderColor: "border-primary/25",
    bgColor: "bg-primary/[.06]",
    tagColor: "text-primary",
    accentColor: "text-primary",
  },
  {
    id: "sistemas-dados",
    icon: "💻",
    tag: "Sistemas & Dados",
    headline: "Você toma decisão baseado em achismo ou em dados?",
    problem:
      "Sem um sistema centralizado, cada decisão vira um chute. Você não sabe quais produtos vendem mais, qual funcionário performa melhor, onde o dinheiro está saindo. O problema não é falta de informação — é que ela está espalhada em WhatsApp, planilhas e cabeças de pessoas.",
    solution:
      "A VIEW centraliza seus dados em dashboards em tempo real e constrói sistemas sob medida para a sua operação — não um software genérico, mas uma ferramenta que reflete exatamente como seu negócio funciona.",
    services: [
      { name: "Sistemas personalizados", desc: "Software feito para o seu fluxo, não para um fluxo genérico que você precisa se adaptar." },
      { name: "Dashboards e BI", desc: "Indicadores do seu negócio visíveis em tempo real, de qualquer lugar, no celular." },
      { name: "Análise de maturidade digital", desc: "Diagnóstico de onde seus dados estão, como são usados e o que falta para você tomar decisões melhores." },
    ],
    color: "view-green",
    borderColor: "border-view-green/25",
    bgColor: "bg-view-green/[.06]",
    tagColor: "text-view-green",
    accentColor: "text-view-green",
  },
  {
    id: "reengenharia",
    icon: "🔁",
    tag: "Reengenharia de Processos",
    headline: "Sua empresa trava sempre no mesmo ponto?",
    problem:
      "Se os mesmos problemas se repetem todo mês — atraso, retrabalho, equipe sobrecarregada, cliente insatisfeito — o problema não é a equipe. É o processo. E processo ruim não melhora com mais esforço, melhora com redesign.",
    solution:
      "A VIEW mapeia cada etapa da sua operação, encontra onde ela trava e redesenha o fluxo para que funcione sem depender de você. Processos claros, padronizados e escaláveis.",
    services: [
      { name: "Padronização", desc: "Cada processo documentado e replicável — sem depender da memória de ninguém." },
      { name: "Auditoria de processo", desc: "Análise completa de onde a operação perde tempo e dinheiro sem que você perceba." },
      { name: "Arquitetura empresarial", desc: "Redesign estrutural da empresa: departamentos, responsabilidades e fluxos alinhados." },
    ],
    color: "accent",
    borderColor: "border-accent/25",
    bgColor: "bg-accent/[.06]",
    tagColor: "text-accent",
    accentColor: "text-accent",
  },
  {
    id: "consultoria-estrategica",
    icon: "🎯",
    tag: "Consultoria Estratégica",
    headline: "Você sabe se seu negócio está crescendo de forma saudável?",
    problem:
      "Faturamento subindo não significa lucro aumentando. Muitas empresas crescem e ficam mais frágeis — mais custo, mais complexidade, menos margem. Sem visão estratégica clara, crescimento vira risco.",
    solution:
      "A VIEW analisa o seu negócio de cima: onde está o dinheiro, onde está o risco, o que faz sentido escalar e o que precisa ser cortado. Decisão estratégica com base em dado.",
    services: [
      { name: "Planejamento estratégico", desc: "Definição clara de onde o negócio vai, por qual caminho e com quais recursos." },
      { name: "Viabilidade de negócio", desc: "Análise antes de investir: o projeto tem retorno real ou é uma aposta?" },
      { name: "Finanças corporativas", desc: "Visão clara de margem, custo, fluxo de caixa e saúde financeira do negócio." },
      { name: "Desenvolvimento de governança", desc: "Estrutura de decisão clara — quem decide o quê, com base em quê." },
    ],
    color: "primary",
    borderColor: "border-primary/25",
    bgColor: "bg-primary/[.06]",
    tagColor: "text-primary",
    accentColor: "text-primary",
  },
  {
    id: "capacitacao",
    icon: "🎓",
    tag: "Capacitação",
    headline: "Sua equipe sabe usar as ferramentas que existem hoje?",
    problem:
      "IA não é só para grandes empresas. Mas a maioria das equipes ainda não sabe como usá-la no dia a dia — e continua fazendo tudo manualmente enquanto o concorrente já automatizou.",
    solution:
      "A VIEW treina sua equipe para adotar IA de forma prática e aplicada à realidade do seu negócio. Do conceito ao uso real, sem teoria desnecessária.",
    services: [
      { name: "Treinamento de IA", desc: "Capacitação prática: sua equipe aprende a usar IA nas tarefas do dia a dia." },
      { name: "Construção de agentes próprios", desc: "Sua equipe sai capaz de criar e ajustar agentes sem depender de fornecedor externo." },
      { name: "Adoção de IA no dia a dia", desc: "Implementação guiada: ferramentas certas, para o time certo, no momento certo." },
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
  url: "https://viewprocessos.com.br",
  telephone: "+55-83-99565-0051",
  email: "admin@reengenhariaview.com.br",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://viewprocessos.com.br/" },
      { "@type": "ListItem", position: 2, name: "Soluções", item: "https://viewprocessos.com.br/solucoes" },
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
      url: `https://viewprocessos.com.br/solucoes#${s.id}`,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "IA & Automação",
    serviceType: "Automação de processos com Inteligência Artificial",
    provider: providerRef,
    description: "Agentes de IA autônomos, chatbots com IA para atendimento, automação de fluxos repetitivos e treinamento de equipes para uso prático de inteligência artificial no dia a dia operacional.",
    areaServed: { "@type": "Country", name: "Brasil" },
    url: "https://viewprocessos.com.br/solucoes#ia-automacao",
    offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceSpecification: { "@type": "PriceSpecification", priceCurrency: "BRL" } },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Sistemas & Dados",
    serviceType: "Desenvolvimento de sistemas de gestão e Business Intelligence",
    provider: providerRef,
    description: "Sistemas de gestão personalizados (não genéricos), dashboards de Business Intelligence em tempo real acessíveis pelo celular e análise de maturidade digital da empresa.",
    areaServed: { "@type": "Country", name: "Brasil" },
    url: "https://viewprocessos.com.br/solucoes#sistemas-dados",
    offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceSpecification: { "@type": "PriceSpecification", priceCurrency: "BRL" } },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Reengenharia de Processos",
    serviceType: "Consultoria em reengenharia e padronização de processos empresariais",
    provider: providerRef,
    description: "Mapeamento, padronização e redesign completo dos fluxos operacionais. Eliminação de retrabalho, auditoria de processos e arquitetura empresarial com documentação clara (SOPs, checklists, fluxogramas).",
    areaServed: { "@type": "Country", name: "Brasil" },
    url: "https://viewprocessos.com.br/solucoes#reengenharia",
    offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceSpecification: { "@type": "PriceSpecification", priceCurrency: "BRL" } },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Consultoria Estratégica",
    serviceType: "Consultoria estratégica, planejamento e finanças corporativas para PMEs",
    provider: providerRef,
    description: "Planejamento estratégico, análise de viabilidade de negócio, finanças corporativas (margem, custo, fluxo de caixa) e desenvolvimento de estruturas de governança baseadas em dados.",
    areaServed: { "@type": "Country", name: "Brasil" },
    url: "https://viewprocessos.com.br/solucoes#consultoria-estrategica",
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
    name: "Capacitação em IA",
    serviceType: "Treinamento e capacitação de equipes em Inteligência Artificial",
    provider: providerRef,
    description: "Treinamentos práticos de IA para equipes, capacitação para construção de agentes próprios e implementação guiada de ferramentas de IA no cotidiano operacional da empresa.",
    areaServed: { "@type": "Country", name: "Brasil" },
    url: "https://viewprocessos.com.br/solucoes#capacitacao",
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
                {s.headline}
              </h2>
              <p className="text-[.88rem] text-muted-foreground leading-relaxed mb-4">{s.problem}</p>
              <p className="text-[.88rem] text-foreground leading-relaxed font-medium">{s.solution}</p>

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
                  <div className="text-[.79rem] text-muted-foreground leading-relaxed">{srv.desc}</div>
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
