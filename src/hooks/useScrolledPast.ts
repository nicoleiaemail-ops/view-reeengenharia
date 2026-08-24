import { useEffect, useState } from "react";

/**
 * Retorna true quando a página passou de `threshold` pixels de rolagem.
 *
 * Compartilhado pelo CTA fixo do mobile e pelo botão flutuante do WhatsApp:
 * os dois precisam concordar sobre o mesmo ponto de virada, senão o botão do
 * WhatsApp fica por cima da barra de CTA (era o que acontecia — a barra ocupa
 * os ~70px de baixo e o botão ficava a 32px do fundo).
 */
export function useScrolledPast(threshold: number) {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const onScroll = () => setPassed(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return passed;
}

/** Ponto em que a barra de CTA do mobile aparece. */
export const STICKY_CTA_THRESHOLD = 600;
