import { useEffect, useRef, useState } from "react";

const costs = [
  {
    icon: "🔄",
    title: "Retrabalho",
    amount: "R$ 8.000",
    period: "/mês",
    desc: "Tarefas refeitas por falta de registro, padrão ou rastreabilidade.",
    color: "destructive",
  },
  {
    icon: "🐌",
    title: "Decisões tardias",
    amount: "R$ 12.000",
    period: "/mês",
    desc: "Oportunidades perdidas porque a informação chegou depois da hora.",
    color: "accent",
  },
  {
    icon: "👻",
    title: "Gargalos invisíveis",
    amount: "R$ 15.000",
    period: "/mês",
    desc: "Processos travados que ninguém vê — até o cliente reclamar.",
    color: "primary",
  },
  {
    icon: "🧠",
    title: "Processos na cabeça das pessoas",
    amount: "R$ 20.000",
    period: "/mês",
    desc: "Quando alguém sai, leva junto o processo. A empresa recomeça do zero.",
    color: "green",
  },
];

function AnimatedCounter({ target }: { target: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            setValue(Math.floor(current));
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{value.toLocaleString("pt-BR")}</span>;
}

export function CostOfNotSeeing() {
  const colorStyles: Record<string, { border: string; glow: string; iconBg: string; amountColor: string }> = {
    destructive: {
      border: "border-destructive/30 hover:border-destructive/60",
      glow: "group-hover:shadow-[0_0_40px_hsla(0,84%,60%,.15)]",
      iconBg: "bg-destructive/15",
      amountColor: "text-destructive",
    },
    accent: {
      border: "border-accent/30 hover:border-accent/60",
      glow: "group-hover:shadow-[0_0_40px_hsla(40,70%,66%,.15)]",
      iconBg: "bg-accent/15",
      amountColor: "text-accent",
    },
    primary: {
      border: "border-primary/30 hover:border-primary/60",
      glow: "group-hover:shadow-[0_0_40px_hsla(222,100%,65%,.15)]",
      iconBg: "bg-primary/15",
      amountColor: "text-primary",
    },
    green: {
      border: "border-view-green/30 hover:border-view-green/60",
      glow: "group-hover:shadow-[0_0_40px_hsla(145,63%,58%,.15)]",
      iconBg: "bg-view-green/15",
      amountColor: "text-view-green",
    },
  };

  return (
    <section className="py-28 px-[7%] relative overflow-hidden">
      {/* Background dramatic glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-destructive/[.04] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1100px] mx-auto">
        {/* Header — dramatic, urgent */}
        <div className="scroll-reveal text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-destructive/10 border border-destructive/25 rounded-full py-2 px-5 mb-6">
            <span className="w-2 h-2 rounded-full bg-destructive shadow-[0_0_8px_hsl(var(--destructive))]" style={{ animation: "blink 1.5s infinite" }} />
            <span className="text-[.65rem] tracking-[.1em] uppercase text-destructive/90 font-display font-semibold">Alerta operacional</span>
          </div>
          <h2 className="font-display font-extrabold text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.05] mb-4">
            Quanto custa <em className="not-italic text-destructive">não enxergar</em><br />sua operação?
          </h2>
          <p className="text-[.95rem] text-muted-foreground leading-relaxed max-w-[560px] mx-auto">
            Cada dia sem visibilidade é dinheiro saindo pelo ralo. Esses números são reais — e provavelmente estão acontecendo na sua empresa <strong className="text-foreground">agora mesmo.</strong>
          </p>
        </div>

        {/* Running total */}
        <div className="scroll-reveal text-center mb-14" style={{ transitionDelay: ".1s" }}>
          <div className="inline-flex flex-col items-center bg-destructive/[.06] border border-destructive/20 rounded-2xl py-6 px-10">
            <span className="text-[.6rem] tracking-[.2em] uppercase text-destructive/70 mb-1">Prejuízo estimado por mês</span>
            <span className="font-display font-extrabold text-[clamp(2.2rem,4vw,3.2rem)] text-destructive leading-none">
              R$ <AnimatedCounter target={55} />.000<span className="text-[1rem] text-destructive/60">+</span>
            </span>
            <span className="text-[.7rem] text-muted-foreground mt-2">em uma operação de médio porte típica</span>
          </div>
        </div>

        {/* Cost cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {costs.map((c, i) => {
            const s = colorStyles[c.color];
            return (
              <div
                key={i}
                className={`scroll-reveal group relative rounded-xl p-7 bg-foreground/[.02] border ${s.border} transition-all duration-300 hover:-translate-y-2 cursor-default ${s.glow}`}
                style={{ transitionDelay: `${0.15 + i * 0.1}s` }}
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] ${s.iconBg} opacity-60 group-hover:opacity-100 transition-opacity`} />

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-[1.4rem] ${s.iconBg} mb-4`}>
                  {c.icon}
                </div>
                <div className="font-display font-bold text-[.95rem] text-foreground mb-1">{c.title}</div>
                <div className={`font-display font-extrabold text-[1.5rem] leading-none mb-3 ${s.amountColor}`}>
                  {c.amount}<span className="text-[.7rem] font-semibold opacity-60">{c.period}</span>
                </div>
                <div className="text-[.8rem] text-muted-foreground leading-relaxed">{c.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Bottom urgency strip */}
        <div className="scroll-reveal" style={{ transitionDelay: ".5s" }}>
          <div className="border border-destructive/20 rounded-xl bg-destructive/[.04] p-6 md:p-8 flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
            <div className="flex-1 text-center lg:text-left">
              <div className="font-display font-extrabold text-[1.15rem] text-foreground mb-2">
                E o pior: você pode nem saber que está perdendo.
              </div>
              <p className="text-[.87rem] text-muted-foreground leading-relaxed">
                Sem um sistema que centralize dados e mostre a operação em tempo real, esses custos ficam <strong className="text-foreground">invisíveis</strong> — até se tornarem irreversíveis.
                Não é falta de esforço da sua equipe. É falta de <strong className="text-foreground">estrutura para enxergar.</strong>
              </p>
            </div>
            <a href="#diagnostico" className="flex-shrink-0 inline-flex items-center gap-2 bg-foreground text-background px-6 md:px-8 py-4 rounded-sm font-display font-extrabold text-[.82rem] md:text-[.86rem] tracking-[.07em] no-underline hover:opacity-88 hover:-translate-y-0.5 transition-all text-center">
              Descobrir meus custos ocultos →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
