export function Testimonials() {
  const testimonials = [
    {
      text: "Manter o ISO 9001 era uma corrida contra o tempo a cada auditoria. Com a VIEW, cada etapa da obra gera um registro automático. Hoje acompanho o andamento de qualquer projeto em tempo real — de onde estiver.",
      result: "✓ ISO 9001 mantido sem retrabalho · ✓ Planejamento de obras em tempo real",
      initials: "AM", name: "Ana M.", role: "Diretora · Construtora, Paraíba", tag: "Construção Civil",
    },
    {
      text: "Eu contava estoque na mão e anotava num caderno. Os números nunca batiam. Agora vejo em tempo real o nível de cada insumo, recebo alertas antes de faltar e nunca mais fui pega de surpresa no meio do movimento.",
      result: "✓ Controle de estoque em tempo real · ✓ Fim das perdas por falta de insumos",
      initials: "CR", name: "Carla R.", role: "Proprietária · Cafeteria, Recife", tag: "Alimentação",
    },
  ];

  return (
    <section className="bg-secondary py-28 px-[7%] border-t border-view-line">
      <div className="scroll-reveal text-center mb-14">
        <h2 className="font-display font-extrabold text-[clamp(1.8rem,2.8vw,2.4rem)] leading-[1.1] mb-3">
          Quem já enxerga diferente.
        </h2>
        <p className="text-[.9rem] text-muted-foreground max-w-[480px] mx-auto leading-relaxed">
          Empresas reais, resultados reais — da construção civil à alimentação.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-view-line border border-view-line">
        {testimonials.map((t, i) => (
          <div key={i} className="scroll-reveal bg-background p-10 flex flex-col gap-6 hover:bg-secondary transition-colors" style={{ transitionDelay: `${i * 0.15}s` }}>
            <div>
              <div className="text-[3rem] leading-none text-primary/35 mb-1">"</div>
              <div className="text-[.88rem] text-muted-foreground leading-relaxed italic flex-1">{t.text}</div>
            </div>
            <div className="bg-primary/[.08] border-l-2 border-primary py-3 px-4 text-[.78rem] text-primary/85 leading-relaxed">{t.result}</div>
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-secondary border border-view-line flex items-center justify-center font-display font-extrabold text-[.85rem] text-primary/80 flex-shrink-0">
                {t.initials}
              </div>
              <div>
                <div className="font-display text-[.85rem] font-bold">{t.name}</div>
                <div className="text-[.72rem] text-muted-foreground mt-0.5">{t.role}</div>
              </div>
              <div className="ml-auto text-[.6rem] tracking-[.12em] uppercase border border-view-line px-2.5 py-1 text-muted-foreground whitespace-nowrap">{t.tag}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
