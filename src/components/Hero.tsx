import { HeroEye } from "./HeroEye";
import { useTypewriter } from "@/hooks/useTypewriter";

export function Hero() {
  const typewriterText = useTypewriter();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-[5%] pt-24 md:pt-32 pb-12 md:pb-16 text-center relative overflow-hidden">
      <HeroEye />

      <div className="relative z-[2]">
        <h1 className="font-display font-extrabold text-[clamp(2.5rem,4.2vw,3.8rem)] leading-[1.05] tracking-tight mb-6">
          Sua empresa operando<br />com{" "}
          <em className="not-italic text-accent">{typewriterText}</em>
          <span className="text-accent font-light" style={{ animation: "cursorBlink .7s step-end infinite" }}>|</span>
        </h1>
        <p className="text-[.98rem] leading-[1.85] text-muted-foreground max-w-[460px] mx-auto mb-10">
          A VIEW nasceu com um propósito: <strong className="text-foreground font-medium">ajudar empresas a enxergar.</strong>{" "}
          Enxergar processos, setores, gargalos, custos e oportunidades — com clareza, em tempo real, de qualquer lugar.
          Porque você não pode melhorar o que não consegue ver.
        </p>
        <a href="#diagnostico" className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-sm font-display font-extrabold text-[.86rem] tracking-[.07em] no-underline hover:opacity-88 hover:-translate-y-0.5 transition-all">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
          </svg>
          Quero enxergar minha empresa
        </a>

        <div className="inline-flex items-center gap-2.5 mt-5 bg-foreground/[.04] border border-foreground/10 rounded-full py-2 px-5">
          <span className="text-[1.1rem] font-display font-extrabold text-foreground">+50%</span>
          <span className="w-px h-3.5 bg-foreground/15" />
          <span className="text-[.65rem] text-foreground/55 tracking-[.08em] uppercase">aumento de produtividade</span>
        </div>
      </div>
    </section>
  );
}
