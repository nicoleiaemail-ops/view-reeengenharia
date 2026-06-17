import { lazy, Suspense } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";

const HeroEye = lazy(() => import("./HeroEye").then((m) => ({ default: m.HeroEye })));

export function Hero() {
  const typed = useTypewriter();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-[5%] pt-16 md:pt-20 pb-6 md:pb-8 text-center relative overflow-hidden">
      <Suspense fallback={<div className="w-[min(680px,90vw)] h-[min(280px,38vw)] mb-4 md:mb-6" />}>
        <HeroEye />
      </Suspense>

      <div className="relative z-[2]">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/[.06] border border-primary/20 rounded-full px-4 py-1.5 mb-5">
          <span className="w-[6px] h-[6px] rounded-full bg-primary shadow-[0_0_8px_hsl(var(--view-accent))]" style={{ animation: "blink 2s infinite" }} />
          <span className="text-[.65rem] tracking-[.1em] text-primary/80 font-display font-semibold">
            Dados · Automação · Sistemas · IA
          </span>
        </div>

        <h1 className="font-display font-extrabold text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.08] tracking-tight mb-4">
          Sua empresa operando{" "}
          <br />
          com{" "}
          <span className="text-accent">{typed}</span>
          <span className="inline-block w-[2px] h-[1em] bg-accent/70 align-middle ml-0.5" style={{ animation: "blink 1s step-end infinite" }} />
        </h1>

        <p className="text-[.95rem] leading-[1.7] text-muted-foreground max-w-[520px] mx-auto mb-6">
          A VIEW nasceu com um propósito: ajudar empresas a enxergar. Enxergar processos, setores, gargalos, custos e oportunidades — com clareza, em tempo real, de qualquer lugar. Porque você não pode melhorar o que não consegue ver.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <a
            href="#diagnostico"
            className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-md font-display font-extrabold text-[.86rem] tracking-[.07em] no-underline hover:opacity-88 hover:-translate-y-0.5 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
            </svg>
            Quero enxergar minha operação
          </a>
          <a
            href="#distip"
            className="inline-flex items-center gap-2 border border-muted-foreground/20 text-muted-foreground px-6 py-3 rounded-md font-display font-medium text-[.82rem] tracking-[.05em] no-underline hover:text-foreground hover:border-foreground/30 transition-all"
          >
            Conheça a metodologia DISTIPP
          </a>
        </div>
      </div>
    </section>
  );
}
