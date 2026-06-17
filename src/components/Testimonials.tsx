export function Testimonials() {
  const testimonials = [
    {
      text: "Manter o ISO 9001 era uma corrida contra o tempo a cada auditoria. Com a VIEW, cada etapa da obra gera um registro automático. Hoje acompanho o andamento de qualquer projeto em tempo real — de onde estiver.",
      result: "✓ ISO 9001 mantido sem retrabalho · ✓ Planejamento de obras em tempo real",
      initials: "VD", name: "Vitória D.", role: "Diretora · Construtora, Paraíba", tag: "Construção Civil",
    },
    {
      text: "Antes eu precisava ligar pra cada encarregado pra saber o que tava acontecendo. Agora abro o aplicativo e vejo tudo: o que foi feito, o que atrasou, quem tá onde. Mudou completamente a forma como eu gerencio a obra.",
      result: "✓ Acompanhamento em tempo real · ✓ Gestão completa pelo celular",
      initials: "AS", name: "Aguinaldo S.", role: "Supervisor de Obra · Construtora, Paraíba", tag: "Construção Civil",
    },
    {
      text: "A cozinha vivia em caos na hora do almoço. Pedidos atrasavam, cliente reclamava, equipe estressada. A VIEW mapeou cada etapa — do pedido ao pagamento — e reorganizou o layout da cozinha. Hoje o atendimento é mais rápido, os custos caíram e o cliente percebe a diferença.",
      result: "✓ Atendimento mais rápido · ✓ Redução de custos operacionais · ✓ Gargalos da cozinha eliminados · ✓ Dados do pedido ao pagamento em tempo real",
      initials: "RS", name: "Restaurante", role: "Proprietário · Setor de Alimentação", tag: "Alimentação",
    },
  ];

  return (
    <section className="bg-secondary py-10 md:py-16 px-[7%] border-t border-view-line">
      <div className="scroll-reveal text-center mb-14">
        <h2 className="font-display font-extrabold text-[clamp(1.8rem,2.8vw,2.4rem)] leading-[1.1] mb-3">
          Quem já enxerga diferente.
        </h2>
        <p className="text-[.9rem] text-muted-foreground max-w-[480px] mx-auto leading-relaxed">
          Empresas reais, resultados reais — da construção civil à alimentação.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-view-line border border-view-line">
        {testimonials.map((t, i) => (
          <div key={i} className="scroll-reveal bg-background p-6 md:p-10 flex flex-col gap-6 hover:bg-secondary transition-colors" style={{ transitionDelay: `${i * 0.15}s` }}>
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
