export function MidCTA() {
  return (
    <section className="py-12 px-[5%] text-center">
      <div className="scroll-reveal max-w-[580px] mx-auto p-10 bg-primary/[.05] border border-primary/15 rounded-2xl">
        <p className="font-display text-[clamp(1.1rem,2vw,1.4rem)] font-bold text-foreground leading-tight mb-3">
          Reconheceu sua empresa aqui?
        </p>
        <p className="text-[.87rem] text-muted-foreground mb-6 leading-relaxed">
          Nossa equipe analisa sua operação gratuitamente e mostra exatamente onde você está perdendo tempo e dinheiro — sem compromisso.
        </p>
        <a href="#diagnostico" className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-sm font-display font-extrabold text-[.86rem] tracking-[.07em] no-underline hover:opacity-88 transition-opacity">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
          </svg>
          Quero meu diagnóstico gratuito
        </a>
        <p className="text-[.6rem] text-foreground/30 mt-3 tracking-[.06em]">Sem compromisso · Resultado em 48h · Apenas 3 vagas por semana</p>
      </div>
    </section>
  );
}
