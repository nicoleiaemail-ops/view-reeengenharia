// Negociação de conteúdo para agentes (Markdown for Agents).
//
// Requisição normal de navegador → HTML, exatamente como antes.
// Requisição com `Accept: text/markdown` → devolve o espelho Markdown gerado no
// build (dist/_md/<rota>.md pelo scripts/prerender.mjs), com Content-Type
// text/markdown e uma estimativa de tokens em x-markdown-tokens.
//
// Qualquer falha (rota sem espelho, build sem pré-renderização, erro de rede)
// cai de volta no HTML — o site nunca quebra por causa disto.
//
// Também resolve o soft 404: o rewrite de SPA do vercel.json manda qualquer
// caminho para /index.html com status 200, então URLs inexistentes respondiam
// 200 com o conteúdo da home. Aqui as rotas desconhecidas devolvem o mesmo HTML
// com status 404 de verdade, que é o que os crawlers precisam ver.

import { next } from "@vercel/edge";

export const config = {
  // Tudo que não é asset, arquivo estático ou rota interna do Vercel: as rotas
  // conhecidas seguem o fluxo normal, o resto vira 404.
  matcher: ["/((?!_md/|\\.well-known/|assets/|_vercel/|api/).*)"],
};

// Rotas públicas em HTML que existem de fato.
const STATIC_ROUTES = new Set([
  "/",
  "/sobre",
  "/solucoes",
  "/avaliacao-maturidade",
  "/casos",
  "/blog",
  "/privacidade",
  "/ia-para-empresas-joao-pessoa",
  // Destino do link da bio do Instagram. É noindex (a própria página já
  // declara isso via <meta name="robots">), mas continua publica e com
  // espelho Markdown -- por isso entra aqui, não em PRIVATE_ROUTES, que é
  // para paginas administrativas que nao devem vazar Link headers nem
  // markdown.
  "/links",
]);

// Rotas reais que não devem receber Link headers nem espelho Markdown
// (são privadas e já saem com noindex).
const PRIVATE_ROUTES = new Set(["/admin", "/admin-login"]);

// Slugs do blog repetidos aqui de propósito. O bundler do middleware do Vercel
// não resolve o import de src/content/blog (moduleResolution node16 exige
// extensão explícita) e emite o import literal, que quebra em runtime — o
// resultado seria 404 em todos os artigos. Um teste em src/test/middleware.test.ts
// falha se esta lista divergir de src/content/blog.
const BLOG_SLUGS = new Set([
  "metodologia-distipp-7-dimensoes-maturidade-operacional",
  "reengenharia-de-processos-o-que-e-quando-sua-empresa-precisa",
  "automacao-de-processos-para-pmes-por-onde-comecar",
  "visibilidade-operacional-em-tempo-real",
]);

export const __BLOG_SLUGS_FOR_TESTS = BLOG_SLUGS;

// Arquivos servidos direto de public/ (llms.txt, favicon.ico, og-image.png…).
// O matcher não consegue distinguir "rota inexistente" de "arquivo estático",
// então qualquer caminho com extensão passa adiante sem virar 404.
const HAS_EXTENSION = /\.[a-z0-9]{2,5}$/i;

function isKnownRoute(pathname: string): boolean {
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  if (STATIC_ROUTES.has(clean) || PRIVATE_ROUTES.has(clean)) return true;
  const blogMatch = clean.match(/^\/blog\/([^/]+)$/);
  return blogMatch ? BLOG_SLUGS.has(blogMatch[1]) : false;
}

const LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</llms.txt>; rel="service-doc"; type="text/markdown"; title="Contexto da VIEW para LLMs"',
  '</llms.txt>; rel="describedby"; type="text/markdown"',
  '</.well-known/agent-skills/index.json>; rel="service-desc"; type="application/json"; title="Agent Skills"',
].join(", ");

function wantsMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  // Aceita text/markdown desde que não esteja explicitamente recusado (q=0).
  return /(^|,)\s*text\/markdown\s*(;[^,]*)?/i.test(accept) && !/text\/markdown\s*;[^,]*q=0(\.0+)?(\s|,|$)/i.test(accept);
}

// Devolve o HTML da SPA com status 404 real. O React Router já renderiza a
// página NotFound para estes caminhos — só faltava o status correto.
async function notFound(request: Request, origin: string): Promise<Response> {
  const headers: Record<string, string> = {
    "Content-Type": "text/html; charset=utf-8",
    "X-Robots-Tag": "noindex",
    "Cache-Control": "public, max-age=0, s-maxage=60",
  };
  try {
    const res = await fetch(new URL("/index.html", origin));
    const body = res.ok ? await res.text() : "";
    if (body) {
      return new Response(request.method === "HEAD" ? null : body, { status: 404, headers });
    }
  } catch {
    /* cai no corpo mínimo abaixo */
  }
  return new Response(request.method === "HEAD" ? null : "<!doctype html><title>404</title>", {
    status: 404,
    headers,
  });
}

export default async function middleware(request: Request): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") return next();

  const url = new URL(request.url);

  if (!isKnownRoute(url.pathname)) {
    // Arquivo estático de public/ segue o fluxo normal; rota inventada vira 404.
    if (HAS_EXTENSION.test(url.pathname)) return next();
    return notFound(request, url.origin);
  }

  // Rotas privadas não expõem Link headers nem espelho Markdown.
  if (PRIVATE_ROUTES.has(url.pathname.replace(/\/$/, ""))) return next();

  if (!wantsMarkdown(request.headers.get("accept"))) {
    // HTML: sinaliza aos caches que a resposta varia conforme o Accept.
    return next({ headers: { Vary: "Accept", Link: LINK_HEADER } });
  }

  const mdPath = url.pathname === "/" ? "/_md/index.md" : `/_md${url.pathname.replace(/\/$/, "")}.md`;

  try {
    const res = await fetch(new URL(mdPath, url.origin), {
      headers: { "user-agent": request.headers.get("user-agent") ?? "middleware" },
    });
    if (!res.ok) return next({ headers: { Vary: "Accept", Link: LINK_HEADER } });

    const body = await res.text();
    // O rewrite de SPA devolve index.html com status 200 para arquivos ausentes:
    // sem esta verificação, uma rota sem espelho serviria HTML rotulado de Markdown.
    if (!body.trim() || /^\s*<(!doctype|html)/i.test(body)) {
      return next({ headers: { Vary: "Accept", Link: LINK_HEADER } });
    }
    return new Response(request.method === "HEAD" ? null : body, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Content-Language": "pt-BR",
        // Estimativa (~4 caracteres por token) — não há tokenizador no edge.
        "x-markdown-tokens": String(Math.ceil(body.length / 4)),
        Vary: "Accept",
        Link: LINK_HEADER,
        "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return next({ headers: { Vary: "Accept", Link: LINK_HEADER } });
  }
}
