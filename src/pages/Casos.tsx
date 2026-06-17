import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const casos = [
  {
    id: "construtora-iso-9001",
    tag: "Construção Civil",
    color: "primary",
    borderColor: "border-primary/25",
    bgColor: "bg-primary/[.05]",
    accentColor: "text-primary",
    tagBg: "bg-primary/10",
    icon: "🏗️",
    client: "Vitória D.",
    role: "Diretora · Construtora · Paraíba",
    headline: "ISO 9001 mantido sem retrabalho — registros automáticos em cada etapa da obra",
    challenge:
      "A cada ciclo de auditoria ISO 9001, a equipe precisava reunir registros dispersos em papel, planilhas e WhatsApp. Era uma corrida contra o tempo que consumia dias de trabalho, gerava erros e colocava o certificado em risco. Além disso, a diretoria não tinha visibilidade do andamento real dos projetos sem ligar para cada encarregado.",
    solution:
      "A VIEW mapeou cada etapa do processo de obra — do início ao entregável — e desenvolveu um sistema sob medida que gera registros automáticos em tempo real. Cada marco, inspeção e aprovação passa a ser documentado digitalmente no momento em que acontece, não depois.",
    results: [
      "ISO 9001 mantido sem retrabalho em auditoria",
      "Planejamento de obras acompanhado em tempo real de qualquer lugar",
      "Eliminação de registros manuais em papel",
      "Rastreabilidade completa por projeto e etapa",
    ],
    quote:
      "Manter o ISO 9001 era uma corrida contra o tempo a cada auditoria. Com a VIEW, cada etapa da obra gera um registro automático. Hoje acompanho o andamento de qualquer projeto em tempo real — de onde estiver.",
    solutions_used: ["Sistemas de Gestão Customizados", "Automação de Processos", "Dashboards em Tempo Real"],
  },
  {
    id: "construtora-gestao-obra",
    tag: "Construção Civil",
    color: "view-green",
    borderColor: "border-view-green/25",
    bgColor: "bg-view-green/[.05]",
    accentColor: "text-view-green",
    tagBg: "bg-view-green/10",
    icon: "📱",
    client: "Aguinaldo S.",
    role: "Supervisor de Obra · Construtora · Paraíba",
    headline: "Gestão completa de obra pelo celular — visibilidade total sem uma única ligação",
    challenge:
      "O supervisor precisava ligar para cada encarregado individualmente para saber o que estava acontecendo na obra. Sem visibilidade centralizada, era impossível identificar atrasos com antecedência, alocar equipes com eficiência ou apresentar relatórios de progresso precisos para clientes.",
    solution:
      "A VIEW implementou um aplicativo de gestão de obra que centraliza em tempo real: atividades concluídas, atrasos identificados, localização de equipes e progresso por etapa. Cada encarregado registra o avanço direto no sistema — o supervisor visualiza tudo em um único painel, de qualquer lugar.",
    results: [
      "Gestão completa pelo celular — sem dependência de ligações",
      "Acompanhamento em tempo real de atividades e atrasos",
      "Visibilidade de localização e alocação de equipes",
      "Relatórios de progresso gerados automaticamente",
    ],
    quote:
      "Antes eu precisava ligar pra cada encarregado pra saber o que tava acontecendo. Agora abro o aplicativo e vejo tudo: o que foi feito, o que atrasou, quem tá onde. Mudou completamente a forma como eu gerencio a obra.",
    solutions_used: ["Sistemas de Gestão Customizados", "Dashboards em Tempo Real", "Automação de Processos"],
  },
  {
    id: "restaurante-operacao-cozinha",
    tag: "Alimentação",
    color: "accent",
    borderColor: "border-accent/25",
    bgColor: "bg-accent/[.05]",
    accentColor: "text-accent",
    tagBg: "bg-accent/10",
    icon: "🍽️",
    client: "Restaurante",
    role: "Proprietário · Setor de Alimentação",
    headline: "Caos na cozinha eliminado — atendimento mais rápido e custos reduzidos",
    challenge:
      "No horário de pico do almoço, a cozinha operava no limite: pedidos atrasavam, a equipe ficava estressada, clientes reclamavam e o proprietário não tinha dados sobre o fluxo real da operação — do pedido ao pagamento. Sem visibilidade dos gargalos, cada melhoria era tentativa e erro.",
    solution:
      "A VIEW mapeou cada etapa da operação — do recebimento do pedido à finalização do pagamento — e identificou onde o fluxo travava. A solução combinou redesign do processo de cozinha, reorganização do layout físico e um sistema de controle de pedidos que dá visibilidade em tempo real a cada etapa.",
    results: [
      "Atendimento mais rápido no horário de pico",
      "Redução de custos operacionais mensurada",
      "Gargalos da cozinha identificados e eliminados",
      "Dados do pedido ao pagamento em tempo real",
      "Equipe menos estressada, cliente mais satisfeito",
    ],
    quote:
      "A cozinha vivia em caos na hora do almoço. A VIEW mapeou cada etapa — do pedido ao pagamento — e reorganizou o layout. Hoje o atendimento é mais rápido, os custos caíram e o cliente percebe a diferença.",
    solutions_used: ["Reengenharia de Processos", "Sistemas de Gestão Customizados", "Dashboards em Tempo Real"],
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://viewprocessos.com.br/" },
      { "@type": "ListItem", position: 2, name: "Casos", item: "https://viewprocessos.com.br/casos" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Casos de sucesso VIEW — Resultados reais de reengenharia operacional",
    itemListElement: casos.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.headline,
      description: c.challenge,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VIEW Reengenharia de Processos",
    url: "https://viewprocessos.com.br",
    review: casos.map((c) => ({
      "@type": "Review",
      author: { "@type": "Person", name: c.client },
      reviewBody: c.quote,
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: String(casos.length),
      bestRating: "5",
    },
  },
];

export default function Casos() {
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
        title="Casos de Sucesso — VIEW Reengenharia de Processos"
        description="Veja como a VIEW transformou operações reais: construção civil com ISO 9001 automatizado, gestão de obra pelo celular e restaurante com fluxo do pedido ao pagamento em tempo real."
        path="/casos"
        jsonLd={jsonLd}
      />
      <Navbar />

      {/* Hero */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center px-[7%] pt-28 pb-16 text-center">
        <div className="text-[.65rem] tracking-[.22em] uppercase text-muted-foreground mb-4">Resultados reais</div>
        <h1 className="font-display font-extrabold text-[clamp(1.9rem,3.5vw,3rem)] leading-[1.1] mb-5 max-w-[760px]">
          Empresas reais.<br />
          <em className="not-italic text-primary">Resultados que você pode ver.</em>
        </h1>
        <p className="text-[.95rem] text-muted-foreground leading-relaxed max-w-[560px]">
          Da construção civil à alimentação — veja como a reengenharia operacional transforma o dia a dia de empresas como a sua.
        </p>
      </section>

      {/* Casos */}
      <section className="px-[7%] pb-24 space-y-24">
        {casos.map((c, idx) => (
          <article
            key={c.id}
            id={c.id}
            className="scroll-reveal"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <span className={`inline-flex items-center gap-2 text-[.6rem] tracking-[.2em] uppercase font-bold ${c.accentColor} ${c.tagBg} border border-current/20 rounded-full px-4 py-1.5`}>
                <span>{c.icon}</span> {c.tag}
              </span>
            </div>

            <h2 className="font-display font-extrabold text-[clamp(1.5rem,2.5vw,2.1rem)] leading-[1.15] mb-10 max-w-[800px]">
              {c.headline}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left: challenge + solution */}
              <div className="space-y-8">
                <div>
                  <div className="text-[.6rem] tracking-[.2em] uppercase text-muted-foreground mb-3 font-semibold">O desafio</div>
                  <p className="text-[.9rem] text-muted-foreground leading-relaxed">{c.challenge}</p>
                </div>
                <div>
                  <div className="text-[.6rem] tracking-[.2em] uppercase text-muted-foreground mb-3 font-semibold">A solução VIEW</div>
                  <p className="text-[.9rem] text-foreground leading-relaxed font-medium">{c.solution}</p>
                </div>
                <div>
                  <div className="text-[.6rem] tracking-[.2em] uppercase text-muted-foreground mb-3 font-semibold">Soluções aplicadas</div>
                  <div className="flex flex-wrap gap-2">
                    {c.solutions_used.map((s) => (
                      <span key={s} className={`text-[.68rem] tracking-[.08em] ${c.accentColor} ${c.tagBg} border border-current/20 rounded-full px-3 py-1`}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: results + quote */}
              <div className="space-y-6">
                <div className={`${c.bgColor} border ${c.borderColor} rounded-xl p-6`}>
                  <div className="text-[.6rem] tracking-[.2em] uppercase text-muted-foreground mb-4 font-semibold">Resultados obtidos</div>
                  <ul className="space-y-3">
                    {c.results.map((r) => (
                      <li key={r} className="flex items-start gap-3 text-[.88rem] text-foreground">
                        <span className={`w-5 h-5 rounded-sm border ${c.borderColor} flex items-center justify-center text-[.6rem] ${c.accentColor} flex-shrink-0 mt-0.5`}>✓</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <blockquote className="border-l-2 border-foreground/15 pl-5">
                  <p className="text-[.88rem] text-muted-foreground leading-relaxed italic mb-4">"{c.quote}"</p>
                  <footer className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-secondary border border-view-line flex items-center justify-center font-display font-extrabold text-[.8rem] text-primary/80">
                      {c.client.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-display font-bold text-[.85rem]">{c.client}</div>
                      <div className="text-[.72rem] text-muted-foreground">{c.role}</div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>

            {idx < casos.length - 1 && (
              <div className="mt-24 border-t border-view-line" />
            )}
          </article>
        ))}
      </section>

      {/* CTA */}
      <section className="py-20 px-[7%] border-t border-view-line bg-secondary text-center">
        <h2 className="scroll-reveal font-display font-extrabold text-[clamp(1.6rem,2.8vw,2.2rem)] mb-4">
          Sua empresa pode ser o próximo caso.
        </h2>
        <p className="scroll-reveal text-[.93rem] text-muted-foreground max-w-[480px] mx-auto mb-8 leading-relaxed" style={{ transitionDelay: ".1s" }}>
          Diagnóstico gratuito em 48h. Entendemos sua operação antes de propor qualquer solução.
        </p>
        <div className="scroll-reveal flex gap-4 justify-center flex-wrap" style={{ transitionDelay: ".2s" }}>
          <a
            href="/#diagnostico"
            className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-sm font-display font-extrabold text-[.86rem] tracking-[.07em] no-underline hover:opacity-85 transition-opacity"
          >
            👁️ Diagnóstico gratuito — 48h
          </a>
          <Link
            to="/solucoes"
            className="text-foreground border border-view-line px-8 py-4 rounded-sm font-display font-bold text-[.86rem] tracking-[.07em] no-underline hover:border-foreground/35 transition-colors"
          >
            Ver todas as soluções →
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
