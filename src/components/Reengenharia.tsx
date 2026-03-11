export function Reengenharia() {
  const cards = [
    { emoji: "🔍", title: "O que é", text: "Reengenharia de processos é o redesign completo dos fluxos operacionais — substituindo rotinas manuais, planilhas soltas e decisões no achismo por processos <strong>digitais, automatizados e orientados a dados</strong> em tempo real." },
    { emoji: "⚡", title: "O que muda", text: "Empresas que passam pela reengenharia ganham <strong>visibilidade</strong> do que acontece em cada setor, <strong>controle</strong> para decidir com dados e <strong>escala</strong> para crescer sem contratar proporcionalmente." },
    { emoji: "🗺️", title: "Como a VIEW faz", text: "Diagnóstico gratuito → mapeamento dos processos atuais → redesign digital → automação → sistema sob medida → dashboards em tempo real → acompanhamento contínuo." },
    { emoji: "🏢", title: "Para quem é", text: "Empresas de médio porte em <strong>construção civil, indústria, alimentação, serviços e varejo</strong> — presencialmente em PB, PE e RN, ou remotamente em todo o Brasil." },
  ];

  return (
    <section className="py-20 px-[5%]" id="reengenharia">
      <div className="max-w-[900px] mx-auto">
        <div className="scroll-reveal text-center mb-14">
          <div className="text-[.65rem] tracking-[.22em] uppercase text-muted-foreground mb-3">Entenda o processo</div>
          <h2 className="font-display font-extrabold text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.1] mb-5">
            O que é <em className="not-italic text-primary">reengenharia de processos</em><br />e por que sua empresa precisa agora
          </h2>
          <p className="text-[.92rem] text-muted-foreground max-w-[620px] mx-auto leading-relaxed">
            Não é sobre comprar software. É sobre mudar a forma como sua operação enxerga a si mesma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((c, i) => (
            <div key={i} className="scroll-reveal bg-foreground/[.03] border border-foreground/[.08] rounded-xl p-8" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="text-[1.6rem] mb-4">{c.emoji}</div>
              <h3 className="font-display font-bold text-foreground mb-3">{c.title}</h3>
              <p className="text-[.87rem] text-muted-foreground leading-relaxed [&_strong]:text-foreground" dangerouslySetInnerHTML={{ __html: c.text }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
