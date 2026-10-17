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
  "/fabrica-de-software-sob-medida-joao-pessoa",
  "/agentes-de-ia-whatsapp-joao-pessoa",
  "/automacao-de-processos-joao-pessoa",
  "/consultoria-iso-9001-construtoras",
  "/engenharia-de-producao-agroindustria-paraiba",
  "/aumentar-capacidade-produtiva",
  "/metodo-distipp",
  "/equipe",
  "/estudos/maturidade-operacional-paraiba-2026",
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

// Slugs de rotas aninhadas (um nível: /prefixo/slug) repetidos aqui de
// propósito. O bundler do middleware do Vercel não resolve import de
// src/content/* ou src/pages/* (moduleResolution node16 exige extensão
// explícita) e emite o import literal, que quebra em runtime — o resultado
// seria 404 em toda página do grupo. Um teste em src/test/middleware.test.ts
// falha se qualquer uma destas listas divergir da fonte de verdade (blog.ts
// para BLOG_SLUGS; o array de casos/setores/cidades nas próprias páginas).
const BLOG_SLUGS = new Set([
  "metodologia-distipp-7-dimensoes-maturidade-operacional",
  "reengenharia-de-processos-o-que-e-quando-sua-empresa-precisa",
  "automacao-de-processos-para-pmes-por-onde-comecar",
  "visibilidade-operacional-em-tempo-real",
  "software-sob-medida-ou-sistema-pronto-como-decidir",
  "ia-no-whatsapp-quando-vale-a-pena",
  "7-perguntas-antes-de-automatizar-qualquer-processo",
  "agente-de-ia-sem-processo-mapeado-por-que-falha",
  "fabricas-bem-montadas-escondem-capacidade",
  "fim-da-escala-6x1-o-que-muda-para-a-producao",
]);

const CASOS_SLUGS = new Set([
  "construtora-terre-iso-9001",
  "construtora-acompanhamento-de-obras",
  "restaurante-processos",
]);

const SETORES_SLUGS = new Set([
  "construtoras",
  "clinicas-e-saude",
  "varejo",
  "industria",
  "empresas-de-servicos",
]);

const ATENDIMENTO_SLUGS = new Set(["campina-grande", "recife", "natal"]);

export const __BLOG_SLUGS_FOR_TESTS = BLOG_SLUGS;
export const __CASOS_SLUGS_FOR_TESTS = CASOS_SLUGS;
export const __SETORES_SLUGS_FOR_TESTS = SETORES_SLUGS;
export const __ATENDIMENTO_SLUGS_FOR_TESTS = ATENDIMENTO_SLUGS;

// Arquivos servidos direto de public/ (llms.txt, favicon.ico, og-image.png…).
// O matcher não consegue distinguir "rota inexistente" de "arquivo estático",
// então qualquer caminho com extensão passa adiante sem virar 404.
const HAS_EXTENSION = /\.[a-z0-9]{2,5}$/i;

// Prefixos de rota aninhada (um nível: /prefixo/slug) e o conjunto de slugs
// válidos de cada um.
const NESTED_ROUTE_GROUPS: [string, Set<string>][] = [
  ["/blog/", BLOG_SLUGS],
  ["/casos/", CASOS_SLUGS],
  ["/setores/", SETORES_SLUGS],
  ["/atendimento/", ATENDIMENTO_SLUGS],
];

function isKnownRoute(pathname: string): boolean {
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  if (STATIC_ROUTES.has(clean) || PRIVATE_ROUTES.has(clean)) return true;
  for (const [prefix, slugs] of NESTED_ROUTE_GROUPS) {
    if (clean.startsWith(prefix)) return slugs.has(clean.slice(prefix.length));
  }
  return false;
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
