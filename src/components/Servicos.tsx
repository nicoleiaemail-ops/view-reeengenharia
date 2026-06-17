import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const areas = [
  {
    icon: "🤖",
    tag: "IA & Automação",
    pain: "Sua equipe ainda faz tarefas que deveriam ser automáticas?",
    services: ["Agentes de IA", "Chatbot com IA", "Automações de fluxos", "Consultoria em IA"],
    href: "/solucoes#ia-automacao",
    color: "border-primary/20 hover:border-primary/40 hover:bg-primary/[.04]",
    accent: "text-primary",
  },
  {
    icon: "💻",
    tag: "Sistemas & Dados",
    pain: "Você decide com dados ou com achismo?",
    services: ["Sistemas personalizados", "Dashboards em tempo real", "Análise de maturidade digital"],
    href: "/solucoes#sistemas-dados",
    color: "border-view-green/20 hover:border-view-green/40 hover:bg-view-green/[.04]",
    accent: "text-view-green",
  },
  {
    icon: "🔁",
    tag: "Reengenharia de Processos",
    pain: "Os mesmos problemas se repetem todo mês?",
    services: ["Padronização de processos", "Auditoria operacional", "Arquitetura empresarial"],
    href: "/solucoes#reengenharia",
    color: "border-accent/20 hover:border-accent/40 hover:bg-accent/[.04]",
    accent: "text-accent",
  },
  {
    icon: "🎯",
    tag: "Consultoria Estratégica",
    pain: "Você sabe se está crescendo de forma saudável?",
    services: ["Planejamento estratégico", "Viabilidade de negócio", "Finanças corporativas"],
    href: "/solucoes#consultoria-estrategica",
    color: "border-primary/20 hover:border-primary/40 hover:bg-primary/[.04]",
    accent: "text-primary",
  },
  {
    icon: "🎓",
    tag: "Capacitação",
    pain: "Sua equipe sabe usar IA no dia a dia?",
    services: ["Treinamento de IA", "Construção de agentes próprios", "Adoção de IA no dia a dia"],
    href: "/solucoes#capacitacao",
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
          Cinco áreas.<br />
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
              <div className={`font-display font-bold text-[.8rem] tracking-[.04em] mb-1 ${a.accent}`}>{a.tag}</div>
              <div className="font-display font-semibold text-[.9rem] text-foreground leading-snug mb-3">{a.pain}</div>
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
            href="#diagnostico"
            className="inline-flex items-center gap-2 bg-background text-foreground px-5 py-3 rounded-md font-display font-extrabold text-[.8rem] tracking-[.06em] no-underline hover:opacity-85 transition-opacity self-start"
          >
            Diagnóstico grátis →
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
