import { PrimaryCTA, Reassurance } from "./CTA";

/*
  Esta seção passou a ser a assinatura da marca na página.

  Antes ela trazia "Você enxerga / Você decide / Você cresce" — quase a
  assinatura oficial, mas não ela. Como "Enxergue. Simplifique. Evolua." não
  aparecia em lugar nenhum do site, havia duas versões da mesma ideia
  competindo, e a que estava no ar era a não oficial.

  O fechamento também mudou de lado. Ele abria com "Automatizamos fluxos
  manuais..." — automação primeiro, exatamente o erro que a seção de ofertas
  logo abaixo corrige ao explicar que o processo vem antes. Duas seções
  adjacentes vendiam ordens opostas; agora as duas vendem a mesma.
*/
const ETAPAS = [
  {
    num: "01",
    verbo: "Enxergue",
    titulo: "Primeiro a operação fica visível",
    desc: "Mapeamos onde o trabalho realmente passa, onde ele trava e quanto cada trava custa por mês. Sem isso, qualquer ferramenta é aposta.",
    cls: "text-accent",
  },
  {
    num: "02",
    verbo: "Simplifique",
    titulo: "Depois o processo é redesenhado",
    desc: "Etapa que não agrega sai. O que fica vira fluxo escrito, com responsável e prazo — e deixa de morar na cabeça de uma pessoa só.",
    cls: "text-primary",
  },
  {
    num: "03",
    verbo: "Evolua",
    titulo: "Só então a tecnologia entra",
    desc: "Com o processo de pé, o sistema sustenta ele e a parte repetitiva roda sozinha. A operação cresce em volume sem crescer em custo fixo.",
    cls: "text-view-green",
  },
];

export function Solution() {
  return (
    <section className="bg-secondary py-10 md:py-16 px-[7%] border-t border-b border-view-line">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left */}
        <div className="scroll-reveal">
          <div className="text-[.65rem] tracking-[.22em] uppercase text-muted-foreground mb-4">Como a VIEW trabalha</div>
          <h2 className="font-display font-extrabold text-[clamp(1.9rem,3vw,2.8rem)] leading-[1.08] mb-3">
            Enxergue. <em className="not-italic text-accent">Simplifique.</em> Evolua.
          </h2>
          <p className="text-[.92rem] text-muted-foreground leading-relaxed mb-8 max-w-[46ch]">
            Nesta ordem, sempre. É o que separa uma operação que melhora de uma que só troca de
            ferramenta.
          </p>

          <div className="flex flex-col mb-10">
            {ETAPAS.map((s) => (
              <div key={s.num} className="flex items-start gap-5 py-5 border-b border-view-line last:border-b-0">
                <div className="font-display font-extrabold text-[1.8rem] leading-none text-foreground/[.12] flex-shrink-0 w-9">
                  {s.num}
                </div>
                <div>
                  <div className={`font-display font-bold text-[1rem] mb-0.5 ${s.cls}`}>{s.verbo}</div>
                  <div className="font-display font-semibold text-[.88rem] text-foreground mb-1">{s.titulo}</div>
                  <div className="text-[.84rem] text-muted-foreground leading-relaxed">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start gap-3">
            <PrimaryCTA location="solucao" className="px-8 py-4" />
            <Reassurance />
          </div>
        </div>

        {/* Right: Before/After */}
        <div className="scroll-reveal" style={{ transitionDelay: ".15s" }}>
          <div className="flex flex-col gap-px bg-view-line border border-view-line rounded overflow-hidden">
            {/* Before */}
            <div className="bg-destructive/[.04]">
              <div className="text-[.6rem] tracking-[.18em] uppercase p-3 px-5 bg-foreground/[.03] border-b border-view-line text-destructive/80">
                Antes
              </div>
              <div className="flex flex-col gap-px bg-view-line">
                {["Planilha desatualizada", "Processo manual e repetitivo", "Decisão sem dados", "Equipe sobrecarregada"].map(
                  (t, i) => (
                    <div
                      key={i}
                      className="bg-background/95 px-5 py-3.5 flex items-center gap-3 text-[.78rem] text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-destructive/60 flex-shrink-0" />
                      {t}
                    </div>
                  )
                )}
              </div>
            </div>

            {/*
              Aqui dizia "↓ VIEW TRANSFORMA ↓". "Transformação" é o termo que o
              rebranding aposentou justamente por competir com a categoria.
            */}
            <div className="bg-secondary py-3 flex items-center justify-center font-display font-bold text-[.7rem] tracking-[.1em] text-accent gap-2">
              ↓ PROCESSO ANTES DA FERRAMENTA ↓
            </div>

            {/* After */}
            <div className="bg-view-green/[.03]">
              <div className="text-[.6rem] tracking-[.18em] uppercase p-3 px-5 bg-foreground/[.03] border-b border-view-line text-view-green">
                Depois
              </div>
              <div className="flex flex-col gap-px bg-view-line">
                {[
                  { t: "Fluxo escrito, com responsável e prazo", tag: "Processo" },
                  { t: "Sistemas falando entre si", tag: "Integração" },
                  { t: "Indicador que muda a decisão da semana", tag: "Dados" },
                  { t: "Parte repetitiva rodando sozinha", tag: "Automação" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-background/95 px-5 py-3.5 flex items-center gap-3 text-[.78rem] text-foreground/80"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-view-green/70 flex-shrink-0" />
                    {item.t}
                    <span className="ml-auto text-[.6rem] tracking-[.1em] uppercase text-view-green/80 whitespace-nowrap">
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tagline full width */}
        <div
          className="scroll-reveal lg:col-span-2 border border-foreground/12 rounded p-5 md:p-6 bg-foreground/[.03] flex items-center gap-4 md:gap-5"
          style={{ transitionDelay: ".25s" }}
        >
          <div className="w-[3px] h-10 rounded-sm flex-shrink-0 bg-gradient-to-b from-accent to-accent/40" />
          <div className="font-display font-semibold text-[clamp(.88rem,1.3vw,1.05rem)] text-foreground leading-relaxed">
            Desenhamos o processo primeiro. Depois construímos o sistema que sustenta ele —{" "}
            <span className="text-muted-foreground font-normal">
              e aí a automação tem onde se apoiar.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
