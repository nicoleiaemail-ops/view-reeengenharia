import { PrimaryCTA, Reassurance } from "./CTA";

export function MidCTA() {
  return (
    <section className="py-12 px-[5%] text-center">
      <div className="scroll-reveal max-w-[580px] mx-auto p-10 bg-primary/[.05] border border-primary/15 rounded-2xl">
        <p className="font-display text-[clamp(1.1rem,2vw,1.4rem)] font-bold text-foreground leading-tight mb-3">
          Reconheceu sua empresa aqui?
        </p>
        <p className="text-[.9rem] text-muted-foreground mb-6 leading-relaxed">
          Nossa equipe analisa sua operação gratuitamente e mostra exatamente onde você está perdendo
          tempo e dinheiro — sem compromisso.
        </p>
        <PrimaryCTA location="mid_cta" className="px-8 py-4" />
        <Reassurance className="block mt-3" />
      </div>
    </section>
  );
}
