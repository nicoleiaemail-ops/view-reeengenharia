import { lazy, Suspense } from "react";
import { PrimaryCTA, Reassurance, SecondaryCTA } from "./CTA";

const HeroEye = lazy(() => import("./HeroEye").then((m) => ({ default: m.HeroEye })));

/**
 * A dobra tem três segundos para responder: o que é, para quem, e qual o
 * próximo passo.
 *
 * A versão anterior falhava nas três. O H1 era animado em loop ("operando com
 * dados / IA / escala / margem / lucro / conectividade"), então nunca ficava
 * parado para ser lido, e terminava em palavras que não dizem nada para um
 * dono de construtora. O parágrafo abaixo contava a história de fundação da
 * VIEW — copy de "Sobre nós" ocupando o espaço mais caro do site.
 */
export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-[5%] pt-16 md:pt-20 pb-6 md:pb-8 text-center relative overflow-hidden">
      <Suspense fallback={<div className="w-[min(680px,90vw)] h-[min(280px,38vw)] mb-4 md:mb-6" />}>
        <HeroEye />
      </Suspense>

      <div className="relative z-[2]">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/[.06] border border-primary/20 rounded-full px-4 py-1.5 mb-5">
          <span
            className="w-[6px] h-[6px] rounded-full bg-primary shadow-[0_0_8px_hsl(var(--view-accent))]"
            style={{ animation: "blink 2s infinite" }}
          />
          <span className="text-[.68rem] tracking-[.1em] text-primary/90 font-display font-semibold">
            Consultoria em processos, automação e dados
          </span>
        </div>

        <h1 className="font-display font-extrabold text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.08] tracking-tight mb-5 max-w-[16ch] mx-auto">
          Sua operação inteira em uma tela, <span className="text-accent">em tempo real</span>.
        </h1>

        <p className="text-[.98rem] leading-[1.7] text-muted-foreground max-w-[560px] mx-auto mb-4">
          Sua empresa cresceu e a operação se espalhou por planilha, sistema e grupo de WhatsApp. A VIEW
          desenha o processo primeiro. Depois constrói o sistema que sustenta ele.
        </p>

        <p className="text-[1.02rem] leading-[1.6] text-foreground font-semibold max-w-[560px] mx-auto mb-3">
          Você para de perguntar como está a operação e passa a ver.
        </p>

        <p className="text-[.85rem] leading-relaxed text-muted-foreground/90 max-w-[520px] mx-auto mb-7">
          Atendimento presencial em PB, PE e RN · Remoto em todo o Brasil
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-3">
          <PrimaryCTA location="hero" />
          <SecondaryCTA location="hero" />
        </div>

        {/*
          Rótulo de porte. A especificação pedia Cinza Chumbo (#5A6476), que dá
          3,12:1 sobre o fundo escuro daqui — abaixo do mínimo AA. Usado o token
          do projeto, que existe justamente para este papel e passa de 7:1.
        */}
        <div className="text-[.68rem] tracking-[.12em] uppercase text-muted-foreground font-display font-semibold mb-3">
          Empresas de 20 a 300 pessoas
        </div>

        <Reassurance />
      </div>
    </section>
  );
}
