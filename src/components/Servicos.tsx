import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PRIMARY_HREF, PRIMARY_LABEL } from "./CTA";
import { EVENTS, track } from "@/lib/analytics";

/*
  A ordem aqui é o argumento, não uma preferência de layout: é a ordem em que
  os problemas aparecem na empresa. A versão anterior abria por "IA &
  Automação", que é vender a última etapa primeiro — automação antes de o
  processo estar desenhado. "Consultoria Estratégica" deixou de existir como
  nome de área: o que ela fazia é o VIEW 360.

  Cada card mostra até quatro serviços; a lista completa das cinco frentes
  está em /solucoes, que é a mesma densidade que os cards já tinham.
*/
const areas = [
  {
    icon: "🎯",
    tag: "VIEW 360",
    sub: "Diagnóstico da operação",
    desc: "Antes de comprar qualquer ferramenta, você descobre onde o processo trava, quanto isso custa por mês e em que ordem resolver.",
    services: ["Análise de maturidade digital", "Auditoria de processo", "Arquitetura empresarial", "Planejamento estratégico"],
    href: "/solucoes#view-360",
    color: "border-primary/20 hover:border-primary/40 hover:bg-primary/[.04]",
    accent: "text-primary",
  },
  {
    icon: "🔁",
    tag: "VIEW FLOW",
    sub: "Processos e automação",
    desc: "O processo sai da cabeça das pessoas e vira fluxo escrito. Depois disso, a parte repetitiva passa a rodar sozinha.",
    services: ["Padronização de processos", "Automações de fluxos", "Agentes de IA", "Chatbot com IA"],
    href: "/solucoes#view-flow",
    color: "border-accent/20 hover:border-accent/40 hover:bg-accent/[.04]",
    accent: "text-accent",
  },
  {
    icon: "💻",
    tag: "VIEW ONE",
    sub: "Sistemas e integração",
    desc: "Os sistemas que você já paga passam a conversar entre si. Conforme os fornecedores saem, o custo deles vira investimento na sua operação.",
    services: ["Sistemas personalizados", "Integração e centralização de sistemas"],
    href: "/solucoes#view-one",
    color: "border-view-green/20 hover:border-view-green/40 hover:bg-view-green/[.04]",
    accent: "text-view-green",
  },
  {
    icon: "📈",
    tag: "VIEW INSIGHTS",
    sub: "Dados e decisão",
    desc: "Indicador que muda a decisão de segunda-feira. Se ninguém abre o relatório, ele não conta como informação.",
    services: ["Dashboards e BI"],
    href: "/solucoes#view-insights",
    color: "border-primary/20 hover:border-primary/40 hover:bg-primary/[.04]",
    accent: "text-primary",
  },
  {
    icon: "🎓",
    tag: "VIEW ACADEMY",
    sub: "Capacitação",
    desc: "Sua equipe aprende a operar e a decidir sem depender de fornecedor para cada ajuste.",
    services: ["Treinamento de equipes", "Treinamento de IA"],
    href: "/solucoes#view-academy",
    color: "border-view-green/20 hover:border-view-green/40 hover:bg-view-green/[.04]",
    accent: "text-view-green",
  },
];


export function Servicos() {
  return (
    <section className="py-10 md:py-16 px-[7%]" id="solucoes">
      <div className="scroll-reveal text-center mb-12">
        <div className="text-[.65rem] tracking-[.22em] uppercase text-muted-foreground mb-3">O que a VIEW faz</div>
        <h2 className="font-display font-extrabold text-[clamp(1.6rem,2.8vw,2.2rem)] leading-[1.1] mb-4">
          Cinco frentes.<br />
          <em className="not-italic text-primary">Um único objetivo: sua empresa operando com clareza.</em>
        </h2>
        <p className="text-[.9rem] text-muted-foreground max-w-[520px] mx-auto leading-relaxed">
          Não importa onde sua operação trava — dados, processos, tecnologia ou equipe. A VIEW identifica o problema e resolve.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {areas.map((a, i) => (
          <Link
            key={i}
            to={a.href}
            className={`scroll-reveal group bg-foreground/[.02] border rounded-xl p-6 flex flex-col gap-4 no-underline transition-all ${a.color}`}
            style={{ transitionDelay: `${i * 0.07}s` }}
          >
            <div className="flex items-start justify-between">
              <span className="text-[1.8rem]">{a.icon}</span>
              <ArrowRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 ${a.accent}`} />
            </div>
            <div>
              <div className={`font-display font-bold text-[.8rem] tracking-[.04em] mb-1 ${a.accent}`}>
                {a.tag} <span className="text-foreground/50 font-semibold">· {a.sub}</span>
              </div>
              <div className="text-[.82rem] text-muted-foreground leading-relaxed mb-3">{a.desc}</div>
              <ul className="flex flex-col gap-1">
                {a.services.map((s) => (
                  <li key={s} className="text-[.75rem] text-muted-foreground flex items-center gap-2">
                    <span className={`w-1 h-1 rounded-full flex-shrink-0 ${a.accent} opacity-60`} style={{ background: "currentColor" }} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}

        {/* CTA card */}
        <div className="scroll-reveal bg-foreground text-background rounded-xl p-6 flex flex-col justify-between gap-6" style={{ transitionDelay: `${areas.length * 0.07}s` }}>
          <div>
            <div className="text-[.7rem] tracking-[.15em] uppercase text-background/50 mb-3">Não sabe por onde começar?</div>
            <p className="font-display font-bold text-[1rem] leading-snug text-background">
              Faça o diagnóstico gratuito. Em 48h você sabe exatamente onde sua operação está perdendo.
            </p>
          </div>
          <a
            href={PRIMARY_HREF}
            onClick={() => track(EVENTS.ctaClick, { cta: "primary", location: "servicos" })}
            className="inline-flex items-center gap-2 bg-background text-foreground px-5 py-3 rounded-md font-display font-extrabold text-[.82rem] tracking-[.06em] no-underline hover:opacity-85 transition-opacity self-start"
          >
            {PRIMARY_LABEL} →
          </a>
        </div>
      </div>

      <div className="scroll-reveal text-center">
        <Link
          to="/solucoes"
          className="inline-flex items-center gap-2 text-[.82rem] text-muted-foreground hover:text-foreground transition-colors font-display font-semibold"
        >
          Ver todas as soluções em detalhe <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
