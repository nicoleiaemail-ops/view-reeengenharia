/**
 * Instrumentação de analytics do site.
 *
 * Carrega GA4 e Microsoft Clarity sob demanda, apenas se os IDs estiverem
 * definidos em variáveis de ambiente. Sem IDs configurados, tudo aqui vira
 * no-op — nenhum script de terceiro é baixado e nenhum erro é lançado.
 *
 * Configure em .env / painel da Vercel:
 *   VITE_GA4_ID=G-XXXXXXXXXX
 *   VITE_CLARITY_ID=xxxxxxxxxx
 *
 * O carregamento é adiado até a primeira interação (ou 3s de ociosidade) para
 * não competir com o LCP — o hero e o texto acima da dobra continuam sendo a
 * prioridade da thread principal.
 */

const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID as string | undefined;

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

/** Eventos disparados antes dos scripts carregarem ficam nesta fila. */
const queue: Array<{ name: string; params?: Params }> = [];
let loaded = false;

function loadGA4() {
  if (!GA4_ID) return;
  window.dataLayer = window.dataLayer || [];
  // O snippet oficial empurra o objeto `arguments`; um array comum é
  // equivalente para o gtag.js, que só lê por índice e `length`.
  window.gtag = (...args: unknown[]) => {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA4_ID, { send_page_view: true });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(s);
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

function flush() {
  if (loaded) return;
  loaded = true;
  loadGA4();
  loadClarity();
  queue.splice(0).forEach(({ name, params }) => window.gtag?.("event", name, params));
}

/** Inicializa o carregamento adiado. Idempotente. */
export function initAnalytics() {
  if (typeof window === "undefined") return;
  if (!GA4_ID && !CLARITY_ID) return;

  const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
  const onFirstInteraction = () => {
    events.forEach((e) => window.removeEventListener(e, onFirstInteraction));
    flush();
  };
  events.forEach((e) => window.addEventListener(e, onFirstInteraction, { once: true, passive: true }));
  window.setTimeout(flush, 3000);
}

/**
 * Registra um evento de conversão. Seguro para chamar a qualquer momento —
 * eventos anteriores ao carregamento ficam enfileirados.
 */
export function track(name: string, params?: Params) {
  if (typeof window === "undefined") return;
  if (loaded) {
    window.gtag?.("event", name, params);
  } else {
    queue.push({ name, params });
  }
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
