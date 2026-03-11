export function Pains() {
  const pains = [
    { icon: "⏳", title: "Demora para ter uma informação", desc: "Precisa perguntar para alguém, procurar numa planilha ou esperar um relatório. A decisão fica travada.", color: "gold" },
    { icon: "📉", title: "Não sabe o desempenho da sua operação", desc: "Cada setor funciona de forma isolada. Você não tem visão clara do que está indo bem — nem do que está saindo do controle.", color: "blue" },
    { icon: "📋", title: "Equipe perde horas preenchendo Excel", desc: "Tempo valioso gasto em tarefas que não geram resultado. A operação real fica sem atenção.", color: "green" },
    { icon: "🗂️", title: "Tem dado, mas não sabe o que fazer", desc: "Informações espalhadas em arquivos e mensagens, sem padrão. Impossível tomar decisão com isso.", color: "gold" },
  ];

  const colorMap: Record<string, { bg: string; border: string; iconBg: string; title: string }> = {
    gold: { bg: "bg-accent/[.07]", border: "border-accent/20", iconBg: "bg-accent/15 border border-accent/30", title: "text-accent" },
    blue: { bg: "bg-primary/[.07]", border: "border-primary/20", iconBg: "bg-primary/15 border border-primary/30", title: "text-primary/70" },
    green: { bg: "bg-view-green/[.06]", border: "border-view-green/20", iconBg: "bg-view-green/12 border border-view-green/28", title: "text-view-green" },
  };

  return (
    <section className="py-28 px-[7%]">
      <div className="scroll-reveal text-center mb-14">
        <h2 className="font-display font-extrabold text-[clamp(1.8rem,2.8vw,2.4rem)] leading-[1.1] mb-3">
          Você reconhece alguma dessas situações?
        </h2>
        <p className="text-[.93rem] text-muted-foreground leading-relaxed max-w-[520px] mx-auto">
          Não é falta de esforço. É falta de estrutura — e ela tem um custo que cresce todo dia.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pains.map((p, i) => {
          const c = colorMap[p.color];
          return (
            <div key={i} className={`scroll-reveal rounded-md p-8 flex flex-col gap-5 ${c.bg} ${c.border} border hover:-translate-y-1 transition-transform`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className={`w-11 h-11 rounded-[10px] flex items-center justify-center text-[1.3rem] ${c.iconBg}`}>{p.icon}</div>
              <div>
                <div className={`font-display font-bold text-[.92rem] leading-tight mb-1 ${c.title}`}>{p.title}</div>
                <div className="text-[.82rem] text-muted-foreground leading-relaxed">{p.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
