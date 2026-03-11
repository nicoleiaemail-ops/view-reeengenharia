import { Link } from "react-router-dom";
import { Database, Link2, Monitor, Cpu, Lightbulb, Users } from "lucide-react";

const pillars = [
  {
    letter: "D",
    title: "Dados",
    desc: "Uso estratégico de dados para tomada de decisão.",
    detail: "Transforme dados brutos em insights acionáveis para decisões mais rápidas e seguras.",
    icon: Database,
    color: "from-primary/20 to-primary/5",
    border: "border-primary/30",
    accent: "text-primary",
  },
  {
    letter: "I",
    title: "Integração",
    desc: "Integração entre áreas, processos e sistemas.",
    detail: "Elimine silos organizacionais conectando departamentos, fluxos e ferramentas.",
    icon: Link2,
    color: "from-view-green/20 to-view-green/5",
    border: "border-view-green/30",
    accent: "text-view-green",
  },
  {
    letter: "S",
    title: "Sistemas",
    desc: "Sistemas de gestão que suportam e organizam as operações.",
    detail: "ERPs e plataformas configuradas para refletir a realidade do seu negócio.",
    icon: Monitor,
    color: "from-view-gold/20 to-view-gold/5",
    border: "border-view-gold/30",
    accent: "text-view-gold",
  },
  {
    letter: "T",
    title: "Tecnologia",
    desc: "Digitalização e automação dos processos empresariais.",
    detail: "Substitua processos manuais por fluxos digitais eficientes e rastreáveis.",
    icon: Cpu,
    color: "from-primary/20 to-primary/5",
    border: "border-primary/30",
    accent: "text-primary",
  },
  {
    letter: "I",
    title: "Inovação",
    desc: "Capacidade da empresa de evoluir continuamente.",
    detail: "Cultive uma cultura de melhoria contínua e experimentação orientada por resultados.",
    icon: Lightbulb,
    color: "from-view-gold/20 to-view-gold/5",
    border: "border-view-gold/30",
    accent: "text-view-gold",
  },
  {
    letter: "P",
    title: "Pessoas",
    desc: "Equipes alinhadas, responsáveis e orientadas por resultados.",
    detail: "Desenvolva times autônomos com papéis claros, metas visíveis e accountability.",
    icon: Users,
    color: "from-view-green/20 to-view-green/5",
    border: "border-view-green/30",
    accent: "text-view-green",
  },
];

export function DISTIP() {
  return (
    <section id="distip" className="py-16 md:py-28 px-[7%] relative overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[.04] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* header */}
        <div className="scroll-reveal text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block font-display text-[.65rem] tracking-[.25em] uppercase text-primary mb-4 border border-primary/20 rounded-full px-4 py-1.5">
            Metodologia Exclusiva
          </span>
          <h2 className="font-display font-extrabold text-[clamp(1.6rem,3.5vw,2.6rem)] leading-[1.15] text-foreground mb-5">
            Metodologia DISTIP:{" "}
            <span className="text-primary">o modelo estratégico</span> para empresas que querem evoluir com tecnologia, dados e gestão inteligente
          </h2>
          <p className="text-muted-foreground text-[.92rem] leading-relaxed">
            Um framework que analisa e desenvolve os pilares essenciais da maturidade empresarial.
          </p>
        </div>

        {/* two columns */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* left – text */}
          <div className="scroll-reveal space-y-6">
            <p className="text-foreground/80 text-[.92rem] leading-[1.75]">
              A metodologia DISTIP foi criada para avaliar o nível de maturidade empresarial e identificar oportunidades de melhoria que aumentem a eficiência, integrem áreas do negócio e fortaleçam a tomada de decisão baseada em dados.
            </p>
            <p className="text-foreground/80 text-[.92rem] leading-[1.75]">
              Ela analisa <strong className="text-foreground">seis dimensões fundamentais</strong> para empresas modernas e competitivas.
            </p>
            <p className="text-muted-foreground text-[.85rem] leading-[1.75]">
              Ao avaliar esses pilares de forma estruturada, é possível identificar gargalos operacionais, melhorar processos internos e utilizar tecnologia de forma estratégica para impulsionar resultados.
            </p>
            <p className="text-muted-foreground text-[.85rem] leading-[1.75]">
              Empresas que evoluem nesses pilares conseguem reduzir desperdícios, integrar melhor suas áreas, aumentar produtividade e tomar decisões com mais velocidade e segurança.
            </p>

            {/* CTA */}
            <div className="pt-6">
              <Link
                to="/avaliacao-maturidade"
                className="inline-block bg-primary text-primary-foreground font-display font-extrabold text-[.82rem] tracking-[.06em] px-8 py-4 rounded-sm hover:opacity-90 transition-opacity no-underline"
              >
                Descobrir o nível de maturidade da minha empresa
              </Link>
              <p className="text-muted-foreground text-[.7rem] mt-3 tracking-wide">
                Avaliação gratuita • Leva menos de 5 minutos
              </p>
            </div>
          </div>

          {/* right – pillar cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className={`scroll-reveal group relative bg-gradient-to-br ${p.color} border ${p.border} rounded-lg p-5 hover:scale-[1.04] transition-all duration-300 cursor-default`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className={`${p.accent} font-display font-black text-2xl mb-1`}>{p.letter}</div>
                  <Icon className={`${p.accent} w-5 h-5 mb-2 opacity-70`} />
                  <h3 className="font-display font-bold text-foreground text-[.85rem] mb-1">{p.title}</h3>
                  <p className="text-muted-foreground text-[.72rem] leading-snug">{p.desc}</p>
                  {/* hover detail */}
                  <div className="absolute inset-0 flex items-center justify-center bg-background/95 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                    <p className="text-foreground/90 text-[.75rem] text-center leading-relaxed">{p.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
