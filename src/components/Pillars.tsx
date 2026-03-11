export function Pillars() {
  const pillars = [
    { icon: "⚙️", num: "01", title: "Governança", sub: "Operacional", desc: "Quem fez, quando fez, o que fez — registrado automaticamente. Sem surpresas.", badge: "Zero retrabalho" },
    { icon: "🗂️", num: "02", title: "Documentação", sub: "Automática", desc: "O processo fica na empresa, não na cabeça das pessoas. Tudo acessível, sempre.", badge: "100% documentado" },
    { icon: "📡", num: "03", title: "Visibilidade", sub: "Em Tempo Real", desc: "Sua operação inteira na palma da mão. De qualquer lugar, a qualquer hora.", badge: "24/7 monitorado" },
    { icon: "📈", num: "04", title: "Previsibilidade", sub: "Para Escalar", desc: "Processos que funcionam sem você presente — e prontos para crescer sem travar.", badge: "ROI garantido" },
  ];

  const borderColors = [
    "border-primary/45",
    "border-primary/38",
    "border-primary/32",
    "border-accent/38",
  ];

  return (
    <section className="py-16 md:py-28 px-[7%]">
      <div className="scroll-reveal text-center max-w-[600px] mx-auto mb-16">
        <h2 className="font-display font-extrabold text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.1] mb-4">
          Os 4 Pilares da Transformação
        </h2>
        <p className="text-[.9rem] text-muted-foreground leading-relaxed">
          Cada pilar resolve um problema real — e juntos, transformam como sua empresa opera.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {pillars.map((p, i) => (
          <div key={i}
            className={`scroll-reveal rounded-2xl p-6 flex flex-col gap-3.5 min-h-[260px] bg-foreground/[.02] border ${borderColors[i]} hover:-translate-y-1 transition-transform cursor-default`}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-start justify-between">
              <div className="w-[52px] h-[52px] rounded-xl flex items-center justify-center text-[1.5rem] bg-primary/15">{p.icon}</div>
              <div className="font-display font-extrabold text-[.85rem] text-foreground/20">{p.num}</div>
            </div>
            <div>
              <div className="font-display font-extrabold text-[1.2rem] leading-[1.1] text-foreground">{p.title}</div>
              <div className="text-[.78rem] font-medium text-primary/70 mt-0.5">{p.sub}</div>
            </div>
            <div className="text-[.8rem] text-foreground/50 leading-relaxed flex-1">{p.desc}</div>
            <span className="self-start text-[.68rem] font-bold py-1.5 px-4 rounded-full bg-primary/12 text-primary/80 border border-primary/20">
              {p.badge}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
