import { Link } from "react-router-dom";
import { EVENTS, track } from "@/lib/analytics";
import { SECONDARY_HREF, SECONDARY_LABEL } from "./CTA";

/**
 * O blog tinha seis artigos e nenhuma chamada — todo o investimento em SEO
 * chegava numa página sem saída. Quem lê um artigo sobre maturidade
 * operacional está exatamente no estado mental certo para a avaliação DISTIPP,
 * que é a oferta mais próxima do conteúdo e a de menor compromisso.
 */
export function BlogCTA({ location }: { location: string }) {
  return (
    <aside className="border border-primary/25 rounded-xl bg-primary/[.05] p-6 md:p-8 my-12">
      <div className="text-[.68rem] tracking-[.2em] uppercase text-primary mb-3 font-display font-semibold">
        Antes de sair
      </div>
      <h2 className="font-display font-extrabold text-[1.15rem] text-foreground leading-snug mb-2">
        Quer saber onde a sua empresa está nisso tudo?
      </h2>
      <p className="text-[.9rem] text-muted-foreground leading-relaxed mb-6 max-w-[52ch]">
        A avaliação DISTIPP mede a maturidade da sua operação em 7 dimensões. Leva menos de 5 minutos e o
        score aparece na hora, na própria tela — o relatório com o plano de ação chega em até 48h.
      </p>
      <Link
        to={SECONDARY_HREF}
        onClick={() => track(EVENTS.blogCtaClick, { location })}
        className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-md font-display font-extrabold text-[.85rem] tracking-[.05em] no-underline hover:opacity-90 transition-opacity"
      >
        {SECONDARY_LABEL} →
      </Link>
      <p className="text-[.75rem] text-muted-foreground mt-3">Gratuita · Sem compromisso</p>
    </aside>
  );
}
