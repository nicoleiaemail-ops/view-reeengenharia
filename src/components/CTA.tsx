import { Link } from "react-router-dom";
import { EVENTS, track } from "@/lib/analytics";

/**
 * CTAs do site.
 *
 * Antes cada seção inventava o próprio rótulo — "Quero enxergar minha
 * operação", "Descobrir meus custos ocultos", "Quero o controle da minha
 * empresa", "Diagnóstico Grátis", "Avaliação Gratuita" — para dois destinos
 * diferentes. O visitante não conseguia saber se eram a mesma oferta, e o
 * relatório de cliques ficava impossível de ler.
 *
 * Agora existem exatamente duas ofertas, com um rótulo cada:
 *
 *  - PRIMÁRIA   "Diagnóstico gratuito"      → #diagnostico (formulário de 4 campos)
 *  - SECUNDÁRIA "Ver meu score de maturidade" → /avaliacao-maturidade (DISTIPP)
 *
 * O parâmetro `location` identifica de qual seção veio o clique, que é o dado
 * que responde "qual parte da página converte".
 */

export const PRIMARY_LABEL = "Diagnóstico gratuito";
export const SECONDARY_LABEL = "Ver meu score de maturidade";
export const PRIMARY_HREF = "#diagnostico";
export const SECONDARY_HREF = "/avaliacao-maturidade";

/** Reforço curto abaixo do botão. Mesma promessa em todo lugar. */
export const PRIMARY_REASSURANCE = "Resposta em até 48h · Sem compromisso";

function EyeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

interface CTAProps {
  location: string;
  className?: string;
  /** Some o ícone de olho quando o botão está num espaço apertado. */
  withIcon?: boolean;
}

const primaryBase =
  "inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3.5 rounded-md font-display font-extrabold text-[.86rem] tracking-[.06em] no-underline hover:opacity-[.88] hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const secondaryBase =
  "inline-flex items-center justify-center gap-2 border border-muted-foreground/30 text-muted-foreground px-6 py-3.5 rounded-md font-display font-semibold text-[.84rem] tracking-[.04em] no-underline hover:text-foreground hover:border-foreground/40 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

/** Oferta primária: leva ao formulário curto de diagnóstico. */
export function PrimaryCTA({ location, className = "", withIcon = true }: CTAProps) {
  return (
    <a
      href={PRIMARY_HREF}
      onClick={() => track(EVENTS.ctaClick, { cta: "primary", location })}
      className={`${primaryBase} ${className}`}
    >
      {withIcon && <EyeIcon />}
      {PRIMARY_LABEL} →
    </a>
  );
}

/** Oferta secundária: leva à avaliação DISTIPP com score imediato. */
export function SecondaryCTA({ location, className = "" }: CTAProps) {
  return (
    <Link
      to={SECONDARY_HREF}
      onClick={() => track(EVENTS.ctaClick, { cta: "secondary", location })}
      className={`${secondaryBase} ${className}`}
    >
      {SECONDARY_LABEL} →
    </Link>
  );
}

/** Linha de reforço padrão. Usada logo abaixo do CTA primário. */
export function Reassurance({ className = "" }: { className?: string }) {
  return (
    <span className={`text-[.75rem] text-muted-foreground ${className}`}>{PRIMARY_REASSURANCE}</span>
  );
}
