/**
 * Instrumentação de analytics do site.
 *
 * O GA4 em si (gtag.js + dataLayer + config) é carregado direto no <head> de
 * index.html, de forma síncrona — não aqui. Isso é proposital: antes, este
 * arquivo recriava `window.gtag` como arrow function, que não tem `arguments`
 * próprio, e empurrava um array comum para o dataLayer em vez do objeto
 * `arguments` que o snippet oficial do Google usa. O GA4 simplesmente
 * ignorava os eventos. Agora este módulo só CHAMA o `window.gtag` global que
 * já existe desde o carregamento da página — nunca o redefine.
 *
 * Microsoft Clarity continua carregado sob demanda por aqui (adiado até a
 * primeira interação ou 3s de ociosidade), porque é puramente uma gravação de
 * sessão: não há perda em atrasar o carregamento dele por alguns segundos, e
 * isso mantém o hero e o texto acima da dobra como prioridade da thread
 * principal. Sem VITE_CLARITY_ID definido, vira no-op.
 *
 * Configure em .env / painel da Vercel:
 *   VITE_GA4_ID=G-XXXXXXXXXX      (consumido por index.html, não por aqui)
 *   VITE_CLARITY_ID=xxxxxxxxxx
 */

const CLARITY_ID = import.meta.env.VITE_CLARITY_ID as string | undefined;

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

function loadClarity() {
  if (!CLARITY_ID) return;
  if (!window.clarity) {
    // Fila temporária: chamadas feitas antes de o script do Clarity terminar
    // de carregar são reproduzidas por ele a partir de `.q`.
    const fila: unknown[] = [];
    const stub = (...args: unknown[]) => {
      fila.push(args);
    };
    (stub as unknown as { q: unknown[] }).q = fila;
    window.clarity = stub;
  }
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(s);
}

let clarityLoaded = false;
function flushClarity() {
  if (clarityLoaded) return;
  clarityLoaded = true;
  loadClarity();
}

/** Inicializa o carregamento adiado do Clarity. Idempotente. */
export function initAnalytics() {
  if (typeof window === "undefined") return;
  if (!CLARITY_ID) return;

  const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
  const onFirstInteraction = () => {
    events.forEach((e) => window.removeEventListener(e, onFirstInteraction));
    flushClarity();
  };
  events.forEach((e) => window.addEventListener(e, onFirstInteraction, { once: true, passive: true }));
  window.setTimeout(flushClarity, 3000);
}

/**
 * Registra um evento de conversão. `window.gtag` já existe desde o <head> de
 * index.html, então não há fila nem espera — chama direto.
 */
export function track(name: string, params?: Params) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
  // O Clarity recebe o nome do evento como tag, o que permite filtrar
  // gravações de sessão por quem converteu.
  window.clarity?.("event", name);
}

/** Registra a mudança de rota em SPAs (o GA4 só conta a carga inicial). */
export function trackPageView(path: string, title?: string) {
  track("page_view", { page_path: path, page_title: title ?? document.title });
}

/**
 * Nomes de evento centralizados. Manter aqui evita que o mesmo clique seja
 * registrado com nomes diferentes em componentes diferentes — foi exatamente
 * esse tipo de divergência que tornava o funil ilegível.
 */
export const EVENTS = {
  ctaClick: "cta_click",
  formStart: "form_start",
  leadSubmit: "lead_submit",
  quizStart: "quiz_start",
  quizStep: "quiz_step",
  quizComplete: "quiz_complete",
  quizResultView: "quiz_result_view",
  calculatorUse: "calculator_use",
  whatsappClick: "whatsapp_click",
  blogCtaClick: "blog_cta_click",
} as const;
