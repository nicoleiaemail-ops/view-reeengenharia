import { Database, Link2, Monitor, Cpu, Lightbulb, Users, Workflow, CheckCircle } from "lucide-react";
import { SecondaryCTA } from "./CTA";

/**
 * Duas mudanças além do visual:
 *
 * 1. Saiu o framer-motion. Ele existia só para o fade-in destes sete cards, e
 *    custava 127KB no bundle carregado na home. O mesmo efeito já existe em
 *    CSS puro na classe `.scroll-reveal`, alimentada pelo IntersectionObserver
 *    da página.
 *
 * 2. Saíram os percentuais. "Reduza incertezas e tome decisões 3x mais
 *    rápido", "aumente a velocidade em até 40%", "reduza custos em até 30%",
 *    "acelere entregas em 35%" — nenhum tinha origem, e um comprador que
 *    desconfia de um passa a desconfiar dos sete. O benefício descrito em
 *    palavras concretas sustenta escrutínio; o número inventado não.
 */
const pillars = [
  {
    letter: "D",
    title: "Dados",
    headline: "Decisões baseadas em evidências",
    desc: "Transforme dados brutos em indicadores que orientam a decisão com precisão.",
    benefit: "Você para de decidir por intuição",
    icon: Database,
    color: "from-primary/25 to-primary/5",
    border: "border-primary/30",
    accent: "text-primary",
    bgAccent: "bg-primary/10",
  },
  {
    letter: "I",
    title: "Integração",
    headline: "Operação conectada e fluida",
    desc: "Elimine silos entre departamentos e crie fluxos de trabalho integrados.",
    benefit: "A informação chega antes da cobrança",
    icon: Link2,
    color: "from-view-green/25 to-view-green/5",
    border: "border-view-green/30",
    accent: "text-view-green",
    bgAccent: "bg-view-green/10",
  },
  {
    letter: "S",
    title: "Sistemas",
    headline: "Tecnologia alinhada ao negócio",
    desc: "Sistemas de gestão configurados para refletir a realidade da sua operação.",
    benefit: "Acaba a planilha paralela ao ERP",
    icon: Monitor,
    color: "from-view-gold/25 to-view-gold/5",
    border: "border-view-gold/30",
    accent: "text-view-gold",
    bgAccent: "bg-view-gold/10",
  },
  {
    letter: "T",
    title: "Tecnologia",
    headline: "Automação inteligente",
    desc: "Digitalize e automatize processos para escalar sem aumentar o custo fixo.",
    benefit: "Mais volume sem mais gente",
    icon: Cpu,
    color: "from-primary/25 to-primary/5",
    border: "border-primary/30",
    accent: "text-primary",
    bgAccent: "bg-primary/10",
  },
  {
    letter: "I",
    title: "Inovação",
    headline: "Evolução contínua",
    desc: "Cultura de melhoria constante, com espaço e orçamento para testar.",
    benefit: "Mudança deixa de acontecer só em crise",
    icon: Lightbulb,
    color: "from-view-gold/25 to-view-gold/5",
    border: "border-view-gold/30",
    accent: "text-view-gold",
    bgAccent: "bg-view-gold/10",
  },
  {
    letter: "P",
    title: "Pessoas",
    headline: "Equipes de alta performance",
    desc: "Times alinhados, autônomos e orientados por resultados claros.",
    benefit: "Reconhecer e corrigir com base em fato",
    icon: Users,
    color: "from-view-green/25 to-view-green/5",
    border: "border-view-green/30",
    accent: "text-view-green",
    bgAccent: "bg-view-green/10",
  },
  {
    letter: "P",
    title: "Processos",
    headline: "Fluxos padronizados e escaláveis",
    desc: "Documentação clara e execução consistente, sem depender da memória de ninguém.",
    benefit: "O processo não depende de quem está na sala",
    icon: Workflow,
    color: "from-primary/25 to-primary/5",
    border: "border-primary/30",
    accent: "text-primary",
    bgAccent: "bg-primary/10",
  },
];

export function DISTIP() {
  return (
    <section
      id="distip"
      className="py-10 md:py-16 px-[5%] relative overflow-hidden bg-gradient-to-b from-background via-background to-secondary/20"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/[.03] blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-view-green/[.03] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <span className="scroll-reveal inline-flex items-center gap-2 font-display text-[.72rem] tracking-[.2em] uppercase text-primary mb-5 border border-primary/20 rounded-full px-5 py-2 bg-primary/[.03]">
            <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
            Metodologia exclusiva VIEW
          </span>

          <h2
            className="scroll-reveal font-display font-extrabold text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] text-foreground mb-5"
            style={{ transitionDelay: ".08s" }}
          >
            O modelo <span className="text-primary">DISTIPP</span>: maturidade empresarial em 7 pilares
          </h2>

          <p
            className="scroll-reveal text-muted-foreground text-[.95rem] md:text-[1.05rem] leading-relaxed max-w-2xl mx-auto"
            style={{ transitionDelay: ".16s" }}
          >
            Framework de diagnóstico que analisa sete dimensões críticas para empresas que querem escalar
            com eficiência, controle e decisões baseadas em dados.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-12">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className={`scroll-reveal group relative bg-gradient-to-br ${pillar.color} border ${pillar.border} rounded-xl p-5 md:p-6 hover:-translate-y-1 transition-transform duration-300 cursor-default overflow-hidden`}
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <div
                  className={`absolute top-4 right-4 w-10 h-10 rounded-lg ${pillar.bgAccent} flex items-center justify-center`}
                  aria-hidden="true"
                >
                  <span className={`${pillar.accent} font-display font-black text-lg`}>{pillar.letter}</span>
                </div>

                <div className="relative z-10">
                  <div className={`${pillar.accent} mb-3`}>
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>

                  <h3 className={`font-display font-bold text-[1rem] mb-1 ${pillar.accent}`}>{pillar.title}</h3>

                  <p className="font-medium text-foreground/90 text-[.84rem] mb-2 leading-tight">
                    {pillar.headline}
                  </p>

                  <p className="text-muted-foreground text-[.79rem] leading-relaxed mb-3">{pillar.desc}</p>

                  <div
                    className={`inline-flex items-center gap-1.5 text-[.74rem] ${pillar.accent} font-medium bg-background/50 rounded-full px-3 py-1`}
                  >
                    <CheckCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                    {pillar.benefit}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="scroll-reveal max-w-xl mx-auto">
          <div className="bg-gradient-to-br from-primary/[.08] to-primary/[.02] border border-primary/20 rounded-xl p-6 text-center">
            <h3 className="font-display font-bold text-foreground text-[1.05rem] mb-1">
              Quer o raio-x completo antes de falar com a gente?
            </h3>
            <p className="text-muted-foreground text-[.85rem] mb-5 leading-relaxed">
              Responda a avaliação DISTIPP e veja seu score nas 7 dimensões na hora, na própria tela. O
              relatório com o plano de ação chega em até 48h.
            </p>

            <SecondaryCTA
              location="distipp"
              className="border-primary/40 text-primary hover:text-primary hover:border-primary bg-primary/[.06]"
            />
          </div>
        </div>

        <div className="scroll-reveal mt-12 flex flex-wrap items-center justify-center gap-6 text-[.79rem] text-muted-foreground">
          <span className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-view-green" aria-hidden="true" />
            Sete dimensões, 40 perguntas
          </span>
          <span className="hidden sm:block w-px h-4 bg-border" />
          <span className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-view-green" aria-hidden="true" />
            Score na tela ao terminar
          </span>
          <span className="hidden sm:block w-px h-4 bg-border" />
          <span className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-view-green" aria-hidden="true" />
            Gratuita e sem compromisso
          </span>
        </div>
      </div>
    </section>
  );
}
