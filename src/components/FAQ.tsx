export function FAQ() {
  const faqs = [
    { q: "O que é reengenharia de processos?", a: "Reengenharia de processos é o redesign completo de como sua empresa funciona — substituindo rotinas manuais, planilhas descentralizadas e decisões baseadas em achismo por fluxos digitais, automatizados e orientados a dados em tempo real." },
    { q: "Quanto tempo leva para ver resultados?", a: "O diagnóstico gratuito é concluído em 48 horas. Projetos de automação costumam ter <strong>primeiros resultados visíveis entre 3 e 6 meses</strong> após o início da implementação." },
    { q: "A VIEW atende empresas de qualquer segmento?", a: "Sim. Já atuamos em construção civil, alimentação, indústria, serviços e varejo. Atendemos presencialmente em PB, PE e RN, e remotamente em todo o Brasil." },
    { q: "A VIEW vende software?", a: "Não. Entregamos execução completa: diagnóstico, redesign de processos, automação, sistema sob medida e acompanhamento contínuo. O software é uma consequência." },
    { q: "Qual o investimento?", a: "O diagnóstico é 100% gratuito e sem compromisso. O investimento do projeto é definido após entender o escopo. O <strong>retorno sobre o investimento é mensurável desde as primeiras semanas.</strong>" },
  ];

  return (
    <section className="py-10 md:py-16 px-[5%]" id="faq">
      <div className="max-w-[760px] mx-auto">
        <div className="scroll-reveal text-center mb-12">
          <div className="text-[.65rem] tracking-[.22em] uppercase text-muted-foreground mb-3">Tire suas dúvidas</div>
          <h2 className="font-display font-extrabold text-[clamp(1.6rem,2.8vw,2.2rem)] leading-[1.1]">
            Perguntas frequentes sobre<br /><em className="not-italic text-primary">reengenharia de processos</em>
          </h2>
        </div>

        <div className="scroll-reveal flex flex-col gap-0.5">
          {faqs.map((f, i) => (
            <details key={i} className="faq-item bg-foreground/[.03] border border-foreground/[.07] rounded-[10px] overflow-hidden transition-all">
              <summary className="p-5 px-6 cursor-pointer list-none flex justify-between items-center gap-4 font-display font-bold text-[.92rem] text-foreground select-none [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="faq-chevron text-[1.1rem] text-primary/70 flex-shrink-0 transition-transform duration-300">＋</span>
              </summary>
              <div className="faq-body px-6 pb-5 text-[.87rem] text-muted-foreground leading-relaxed [&_strong]:text-foreground" dangerouslySetInnerHTML={{ __html: f.a }} />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
