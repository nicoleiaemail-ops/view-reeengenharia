export function Solution() {
  return (
    <section className="bg-secondary py-28 px-[7%] border-t border-b border-view-line">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        {/* Left */}
        <div className="scroll-reveal">
          <div className="text-[.65rem] tracking-[.22em] uppercase text-muted-foreground mb-4">O que a VIEW faz</div>
          <h2 className="font-display font-extrabold text-[clamp(1.9rem,3vw,2.8rem)] leading-[1.08] mb-8">
            Damos a você o <em className="not-italic text-accent">controle</em><br />da sua empresa.
          </h2>

          <div className="flex flex-col mb-10">
            {[
              { num: "01", title: "Você enxerga", desc: "Visibilidade total da sua operação — processos, setores, gargalos — em tempo real, de qualquer lugar.", titleCls: "text-accent" },
              { num: "02", title: "Você decide", desc: "Com dados confiáveis na mão, as decisões deixam de ser intuição e passam a ser estratégia.", titleCls: "text-primary/70" },
              { num: "03", title: "Você cresce", desc: "Escale com confiança. Processos que funcionam sem depender de você.", titleCls: "text-view-green" },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-5 py-5 border-b border-view-line last:border-b-0">
                <div className="font-display font-extrabold text-[1.8rem] leading-none text-foreground/[.06] flex-shrink-0 w-9">{s.num}</div>
                <div>
                  <div className={`font-display font-bold text-[.95rem] mb-1 ${s.titleCls}`}>{s.title}</div>
                  <div className="text-[.82rem] text-muted-foreground leading-relaxed">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start gap-3">
            <a href="#diagnostico" className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-sm font-display font-extrabold text-[.86rem] tracking-[.07em] no-underline hover:opacity-88 hover:-translate-y-0.5 transition-all">
              Quero o controle da minha empresa →
            </a>
            <span className="text-[.72rem] text-muted-foreground">
              Diagnóstico gratuito <span className="mx-1.5 text-foreground/50">|</span> Sem compromisso
            </span>
          </div>
        </div>

        {/* Right: Before/After */}
        <div className="scroll-reveal" style={{ transitionDelay: ".15s" }}>
          <div className="flex flex-col gap-px bg-view-line border border-view-line rounded overflow-hidden">
            {/* Before */}
            <div className="bg-destructive/[.04]">
              <div className="text-[.58rem] tracking-[.18em] uppercase p-3 px-5 bg-foreground/[.03] border-b border-view-line text-destructive/60">Antes</div>
              <div className="flex flex-col gap-px bg-view-line">
                {["Planilha desatualizada", "Processo manual e repetitivo", "Decisão sem dados", "Equipe sobrecarregada"].map((t, i) => (
                  <div key={i} className="bg-background/95 px-5 py-3.5 flex items-center gap-3 text-[.75rem] text-foreground/45">
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive/60 flex-shrink-0" />{t}
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className="bg-secondary py-3 flex items-center justify-center font-display font-bold text-[.7rem] tracking-[.1em] text-primary gap-2">
              ↓ VIEW TRANSFORMA ↓
            </div>

            {/* After */}
            <div className="bg-view-green/[.03]">
              <div className="text-[.58rem] tracking-[.18em] uppercase p-3 px-5 bg-foreground/[.03] border-b border-view-line text-view-green/60">Depois</div>
              <div className="flex flex-col gap-px bg-view-line">
                {[
                  { t: "Dashboard em tempo real", tag: "Automático" },
                  { t: "Processos digitais e rastreáveis", tag: "Governança" },
                  { t: "Indicadores claros para decisão", tag: "BI" },
                  { t: "Equipe focada no estratégico", tag: "Escala" },
                ].map((item, i) => (
                  <div key={i} className="bg-background/95 px-5 py-3.5 flex items-center gap-3 text-[.75rem] text-foreground/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-view-green/70 flex-shrink-0" />
                    {item.t}
                    <span className="ml-auto text-[.58rem] tracking-[.1em] uppercase text-view-green/70 whitespace-nowrap">{item.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tagline full width */}
        <div className="scroll-reveal lg:col-span-2 border border-foreground/12 rounded p-6 bg-foreground/[.03] flex items-center gap-5" style={{ transitionDelay: ".25s" }}>
          <div className="w-[3px] h-10 rounded-sm flex-shrink-0 bg-gradient-to-b from-primary to-primary/50" />
          <div className="font-display font-semibold text-[clamp(.88rem,1.3vw,1.05rem)] text-foreground leading-relaxed">
            Automatizamos fluxos manuais, planilhas e rotinas desconectadas em processos digitais orientados a dados —{" "}
            <span className="text-muted-foreground font-normal">governança, escala e margem.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
